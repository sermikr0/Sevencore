"""Face detection (YuNet) and recognition (SFace) on onnxruntime + Pillow — no OpenCV needed.

Both models come from the OpenCV Model Zoo (YuNet: MIT, SFace: Apache-2.0). The pre- and
post-processing mirrors OpenCV's FaceDetectorYN / FaceRecognizerSF (scripts/check_engine.py
compares the two), which keeps the serverless bundle well under Vercel's size limit.

Images are RGB uint8 arrays (H, W, 3). Embeddings are 128-d float32, L2-normalised.
"""
from __future__ import annotations

import io
import os
import threading
from dataclasses import dataclass
from pathlib import Path

import numpy as np

from .vectors import normalize

YUNET = "face_detection_yunet_2023mar.onnx"
SFACE = "face_recognition_sface_2021dec.onnx"
MAX_SIDE = 640               # = DET_SIZE, so detection runs on the exact frame (no internal rescale)
MAX_PIXELS = 16_000_000
DET_SIZE = 640               # the YuNet graph input is fixed at 640x640, frames are letterboxed into it
STRIDES = (8, 16, 32)
SCORE_THRESHOLD = 0.7
NMS_THRESHOLD = 0.3
TOP_K = 20
# ArcFace 112x112 reference landmarks (eyes, nose tip, mouth corners) used for SFace alignment.
ARCFACE_DST = np.array([[38.2946, 51.6963], [73.5318, 51.5014], [56.0252, 71.7366],
                        [41.5493, 92.3655], [70.7299, 92.2041]], dtype=np.float64)


@dataclass
class Observation:
    faces: int                                   # faces at least half the size of the largest one
    box: tuple[float, float, float, float] | None = None   # x, y, w, h as fractions of the frame
    size: float = 0.0                            # face width / frame width
    cx: float = 0.0
    cy: float = 0.0
    yaw: float = 0.0                             # (nose_x - eye_mid_x) / eye distance, raw (unmirrored) frame
    brightness: float = 0.0
    sharpness: float = 0.0
    embedding: np.ndarray | None = None
    row: np.ndarray | None = None                # x, y, w, h, 5 landmarks, score (OpenCV's layout)

    def public(self) -> dict:
        return {
            "faces": self.faces,
            "box": [round(v, 4) for v in self.box] if self.box else None,
            "yaw": round(self.yaw, 3),
            "size": round(self.size, 3),
        }


def nms(boxes: np.ndarray, scores: np.ndarray, threshold: float, top_k: int) -> np.ndarray:
    x1, y1 = boxes[:, 0], boxes[:, 1]
    x2, y2 = x1 + boxes[:, 2], y1 + boxes[:, 3]
    area = boxes[:, 2] * boxes[:, 3]
    order = np.argsort(-scores)
    keep: list[int] = []
    while order.size and len(keep) < top_k:
        i, rest = order[0], order[1:]
        keep.append(int(i))
        w = np.clip(np.minimum(x2[i], x2[rest]) - np.maximum(x1[i], x1[rest]), 0, None)
        h = np.clip(np.minimum(y2[i], y2[rest]) - np.maximum(y1[i], y1[rest]), 0, None)
        inter = w * h
        order = rest[inter / (area[i] + area[rest] - inter + 1e-9) <= threshold]
    return np.array(keep, dtype=int)


def similarity_transform(src: np.ndarray, dst: np.ndarray = ARCFACE_DST) -> np.ndarray:
    """Least-squares rotation + uniform scale + translation (Umeyama), as OpenCV's alignCrop does."""
    src_mean, dst_mean = src.mean(0), dst.mean(0)
    src_d, dst_d = src - src_mean, dst - dst_mean
    a = dst_d.T @ src_d / len(src)
    d = np.array([1.0, -1.0 if np.linalg.det(a) < 0 else 1.0])
    u, s, vt = np.linalg.svd(a)
    rot = u @ np.diag(d) @ vt
    scale = float((s * d).sum() / src_d.var(0).sum())
    m = np.zeros((2, 3))
    m[:, :2] = rot * scale
    m[:, 2] = dst_mean - scale * rot @ src_mean
    return m


def to_gray(rgb: np.ndarray) -> np.ndarray:
    return rgb.astype(np.float32) @ np.array([0.299, 0.587, 0.114], dtype=np.float32)


class FaceEngine:
    def __init__(self, models_dir: Path):
        import onnxruntime as ort

        opts = ort.SessionOptions()
        opts.log_severity_level = 3
        opts.intra_op_num_threads = min(4, os.cpu_count() or 1)
        opts.inter_op_num_threads = 1
        providers = ["CPUExecutionProvider"]
        self._lock = threading.Lock()
        self._det = ort.InferenceSession(str(models_dir / YUNET), opts, providers=providers)
        self._rec = ort.InferenceSession(str(models_dir / SFACE), opts, providers=providers)
        self._det_outputs = [o.name for o in self._det.get_outputs()]

    @staticmethod
    def decode(data: bytes) -> np.ndarray | None:
        from PIL import Image, ImageOps

        try:
            img = Image.open(io.BytesIO(data))
            if img.width * img.height > MAX_PIXELS:
                return None
            img.draft("RGB", (MAX_SIDE, MAX_SIDE))      # cheap JPEG downscale while decoding
            img = ImageOps.exif_transpose(img).convert("RGB")
        except (OSError, ValueError, Image.DecompressionBombError):
            return None
        w, h = img.size
        if min(w, h) < 64:
            return None
        scale = MAX_SIDE / max(w, h)
        if scale < 1:
            img = img.resize((round(w * scale), round(h * scale)), Image.Resampling.BILINEAR, reducing_gap=2.0)
        return np.asarray(img, dtype=np.uint8)

    def detect(self, rgb: np.ndarray) -> np.ndarray:
        """Faces as rows of 15 floats: x, y, w, h, 5 (x, y) landmarks, score — same layout as OpenCV."""
        from PIL import Image

        h, w = rgb.shape[:2]
        scale = min(1.0, DET_SIZE / max(h, w))
        img = rgb if scale == 1.0 else np.asarray(
            Image.fromarray(rgb).resize((round(w * scale), round(h * scale)), Image.Resampling.BILINEAR))
        canvas = np.zeros((DET_SIZE, DET_SIZE, 3), dtype=np.float32)
        canvas[: img.shape[0], : img.shape[1]] = img[:, :, ::-1]          # BGR, raw 0..255 like cv2.dnn.blobFromImage
        with self._lock:
            outs = dict(zip(self._det_outputs, self._det.run(self._det_outputs, {"input": canvas.transpose(2, 0, 1)[None]})))
        rows = []
        for s in STRIDES:
            n = DET_SIZE // s
            score = np.sqrt(np.clip(outs[f"cls_{s}"][0, :, 0], 0, 1) * np.clip(outs[f"obj_{s}"][0, :, 0], 0, 1))
            keep = np.nonzero(score >= SCORE_THRESHOLD)[0]
            if not keep.size:
                continue
            r, c = np.divmod(keep, n)
            bbox, kps = outs[f"bbox_{s}"][0, keep], outs[f"kps_{s}"][0, keep]
            bw, bh = np.exp(bbox[:, 2]) * s, np.exp(bbox[:, 3]) * s
            x1, y1 = (c + bbox[:, 0]) * s - bw / 2, (r + bbox[:, 1]) * s - bh / 2
            marks = np.empty((keep.size, 10), dtype=np.float32)
            marks[:, 0::2] = (kps[:, 0::2] + c[:, None]) * s
            marks[:, 1::2] = (kps[:, 1::2] + r[:, None]) * s
            rows.append(np.column_stack([x1, y1, bw, bh, marks, score[keep]]))
        if not rows:
            return np.zeros((0, 15), dtype=np.float32)
        faces = np.concatenate(rows)
        faces = faces[nms(faces[:, :4], faces[:, 14], NMS_THRESHOLD, TOP_K)]
        faces[:, :14] /= scale
        return faces.astype(np.float32)

    def align(self, rgb: np.ndarray, row: np.ndarray) -> np.ndarray:
        """112x112 RGB crop aligned to the ArcFace template (cv2.warpAffine equivalent)."""
        from PIL import Image

        m = np.vstack([similarity_transform(row[4:14].reshape(5, 2).astype(np.float64)), [0.0, 0.0, 1.0]])
        inv = np.linalg.inv(m)
        a, t = inv[:2, :2], inv[:2, 2]
        t = t + 0.5 - a @ np.array([0.5, 0.5])          # OpenCV samples at pixel centres = integers, Pillow at +0.5
        out = Image.fromarray(rgb).transform((112, 112), Image.Transform.AFFINE,
                                             (a[0, 0], a[0, 1], t[0], a[1, 0], a[1, 1], t[1]),
                                             resample=Image.Resampling.BILINEAR)
        return np.asarray(out)

    def embed(self, rgb: np.ndarray, row: np.ndarray) -> np.ndarray:
        blob = self.align(rgb, row).astype(np.float32).transpose(2, 0, 1)[None]   # RGB, raw 0..255
        with self._lock:
            feature = self._rec.run(None, {"data": blob})[0]
        return normalize(feature)

    def observe(self, rgb: np.ndarray, embed: bool = True) -> Observation:
        from PIL import Image

        h, w = rgb.shape[:2]
        faces = self.detect(rgb)
        if not len(faces):
            return Observation(faces=0)
        faces = faces[np.argsort(-(faces[:, 2] * faces[:, 3]))]
        main = faces[0]
        significant = int(np.sum(faces[:, 2] >= 0.5 * main[2]))
        x, y, fw, fh = (float(v) for v in main[:4])
        right_eye, left_eye, nose = main[4:6], main[6:8], main[8:10]
        eye_dist = float(np.hypot(*(right_eye - left_eye))) or 1.0
        yaw = float(nose[0] - (right_eye[0] + left_eye[0]) / 2) / eye_dist

        x0, y0 = max(int(x), 0), max(int(y), 0)
        x1, y1 = min(int(x + fw), w), min(int(y + fh), h)
        brightness = sharpness = 0.0
        if x1 - x0 > 8 and y1 - y0 > 8:
            gray = to_gray(rgb[y0:y1, x0:x1])
            brightness = float(gray.mean())
            g = np.asarray(Image.fromarray(gray.clip(0, 255).astype(np.uint8)).resize((112, 112), Image.Resampling.BILINEAR),
                           dtype=np.float32)
            lap = g[:-2, 1:-1] + g[2:, 1:-1] + g[1:-1, :-2] + g[1:-1, 2:] - 4 * g[1:-1, 1:-1]
            sharpness = float(lap.var())

        obs = Observation(
            faces=significant, box=(x / w, y / h, fw / w, fh / h), size=fw / w,
            cx=(x + fw / 2) / w, cy=(y + fh / 2) / h, yaw=yaw,
            brightness=brightness, sharpness=sharpness, row=main,
        )
        if embed and significant == 1:
            obs.embedding = self.embed(rgb, main)
        return obs

    @staticmethod
    def crop_jpeg(rgb: np.ndarray, obs: Observation, size: int = 256) -> bytes:
        """Square, loosely framed face crop for the dashboard (raw orientation)."""
        from PIL import Image

        h, w = rgb.shape[:2]
        x, y, fw, fh = (float(v) for v in obs.row[:4])
        side = int(min(max(fw, fh) * 1.7, w, h))
        cx, cy = x + fw / 2, y + fh / 2.2
        x0 = int(min(max(cx - side / 2, 0), w - side))
        y0 = int(min(max(cy - side / 2, 0), h - side))
        face = Image.fromarray(rgb[y0:y0 + side, x0:x0 + side]).resize((size, size), Image.Resampling.LANCZOS)
        buf = io.BytesIO()
        face.save(buf, format="JPEG", quality=86)
        return buf.getvalue()
