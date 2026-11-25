"""Server-side Face ID scans.

The Mini App only streams small JPEG frames. Every decision (frame quality, identity, liveness)
is made here, so a modified page cannot skip a step.

How many good frontal frames a scan needs is set per instance (ENROLL_FRAMES / MATCH_FRAMES; one look by
default, so the photo is taken as soon as the face is clear and recognised).

Optional liveness (LIVENESS=1): after the frontal frames are accepted, the person turns their head to a random side.
A real head moves the nose relative to the eyes (3-D parallax). A photo or a screen held in
front of the camera stays flat, so that ratio barely moves (< 0.06 even with strong tilt),
while a ~20 degree real turn gives about 0.15.
"""
from __future__ import annotations

import asyncio
import base64
import secrets
import time
from dataclasses import dataclass, field
from typing import Callable

import numpy as np

from .face import Observation
from .vectors import normalize, similarity

SCAN_TTL = 90            # seconds a scan may take
MAX_FRAMES = 300
FRAMES_PER_10S = 40
SAME_PERSON = 0.28       # frontal vs turned frame inside one scan
MAX_REJECTS = 6          # good frontal frames that fail to match before giving up


@dataclass
class Policy:
    threshold: float
    liveness: bool
    turn_delta: float
    strict_direction: bool


@dataclass
class Scan:
    id: str
    telegram_id: int
    purpose: str                  # enroll | check_in | check_out
    challenge: str                # left | right
    expires: float
    context: dict = field(default_factory=dict)      # registration data, location, Telegram user
    stage: str = "align"          # align -> turn -> verified -> done | failed
    frames: int = 0
    fronts: list = field(default_factory=list)
    front_yaws: list = field(default_factory=list)
    scores: list = field(default_factory=list)
    best_rejected: float | None = None
    rejects: int = 0
    turn_progress: float = 0.0
    live: float | None = None
    crop: bytes | None = None
    crop_size: float = 0.0
    recent: list = field(default_factory=list)
    result: dict | None = None
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)
    need: int = 0                 # good frontal frames this scan needs (0: 3 to enrol, 2 to check)

    @property
    def needed(self) -> int:
        return self.need or (3 if self.purpose == "enroll" else 2)

    def template(self) -> np.ndarray:
        return normalize(np.mean(np.asarray(self.fronts, dtype=np.float32), axis=0))

    def score(self) -> float | None:
        return round(max(self.scores), 4) if self.scores else None

    def crop_data_url(self) -> str | None:
        return "data:image/jpeg;base64," + base64.b64encode(self.crop).decode() if self.crop else None


def frontal_issue(o: Observation) -> str | None:
    if o.size < 0.16:
        return "move_closer"
    if o.size > 0.80:
        return "move_back"
    if abs(o.cx - 0.5) > 0.18 or not 0.22 <= o.cy <= 0.72:
        return "center_face"
    if o.brightness < 45:
        return "too_dark"
    if o.brightness > 228:
        return "too_bright"
    if abs(o.yaw) > 0.13:
        return "look_straight"
    if o.sharpness < 6:
        return "hold_still"
    return None


class Scans:
    def __init__(self, engine: Callable, enroll_frames: int = 3, match_frames: int = 2):
        self._engine = engine          # lazy: the models load on the first frame
        self._scans: dict[str, Scan] = {}
        self.enroll_frames, self.match_frames = max(1, enroll_frames), max(1, match_frames)

    def start(self, telegram_id: int, purpose: str, context: dict) -> Scan:
        now = time.time()
        for key, old in list(self._scans.items()):         # one scan per person; drop expired ones
            if old.telegram_id == telegram_id or old.expires < now - 60:
                self._scans.pop(key, None)
        scan = Scan(id=secrets.token_urlsafe(18), telegram_id=telegram_id, purpose=purpose,
                    challenge=secrets.choice(("left", "right")), expires=now + SCAN_TTL, context=context,
                    need=self.enroll_frames if purpose == "enroll" else self.match_frames)
        self._scans[scan.id] = scan
        return scan

    def get(self, scan_id: str, telegram_id: int) -> Scan | None:
        scan = self._scans.get(scan_id)
        return scan if scan and scan.telegram_id == telegram_id else None

    def drop(self, scan: Scan) -> None:
        self._scans.pop(scan.id, None)

    @staticmethod
    def too_fast(scan: Scan) -> bool:
        now = time.time()
        scan.recent = [t for t in scan.recent if now - t < 10] + [now]
        return len(scan.recent) > FRAMES_PER_10S

    def step(self, scan: Scan, img: np.ndarray, template: np.ndarray | None, policy: Policy) -> tuple[str | None, Observation | None]:
        """Advance a scan by one frame (CPU work; run it in a thread). Returns (hint, observation)."""
        scan.frames += 1
        if scan.stage not in ("align", "turn"):
            return None, None
        if time.time() > scan.expires or scan.frames > MAX_FRAMES:
            self.fail(scan, "timeout")
            return None, None
        engine = self._engine()
        obs = engine.observe(img)
        return self._advance(scan, img, obs, template, policy, engine), obs

    def _advance(self, scan: Scan, img, obs: Observation, template, p: Policy, engine) -> str | None:
        if obs.faces == 0:
            return "no_face"
        if obs.faces > 1:
            return "multiple_faces"

        if scan.stage == "align":
            issue = frontal_issue(obs)
            if issue:
                return issue
            if scan.purpose != "enroll":
                score = similarity(obs.embedding, template)
                if score < p.threshold:
                    scan.rejects += 1
                    scan.best_rejected = max(score, scan.best_rejected or -1.0)
                    if scan.rejects >= MAX_REJECTS:
                        self.fail(scan, "no_match")
                    return "not_recognized"
                scan.scores.append(score)
            elif scan.fronts and similarity(obs.embedding, scan.template()) < 0.5:
                # enrolment frames must all be the same person
                scan.fronts, scan.front_yaws = [], []
                return "face_changed"
            scan.fronts.append([float(v) for v in obs.embedding])
            scan.front_yaws.append(obs.yaw)
            if obs.size >= scan.crop_size:
                scan.crop = engine.crop_jpeg(img, obs, size=240)
                scan.crop_size = obs.size
            if len(scan.fronts) < scan.needed:
                return "hold_still"
            if not p.liveness:
                scan.stage = "verified"
                return None
            scan.stage = "turn"
            return f"turn_{scan.challenge}"

        # stage == "turn"
        if obs.embedding is None or similarity(obs.embedding, scan.template()) < SAME_PERSON:
            return "face_changed"
        delta = obs.yaw - float(np.mean(scan.front_yaws))
        # Raw (unmirrored) frame: turning to the person's left moves the nose to image-right.
        signed = delta if scan.challenge == "left" else -delta
        measured = signed if p.strict_direction else abs(delta)
        scan.turn_progress = max(scan.turn_progress, min(max(measured / p.turn_delta, 0.0), 1.0))
        if measured >= p.turn_delta:
            scan.live = round(abs(delta), 3)
            scan.stage = "verified"
            return None
        if p.strict_direction and -signed >= p.turn_delta:
            return "wrong_way"
        return f"turn_{scan.challenge}"

    @staticmethod
    def fail(scan: Scan, reason: str, **extra) -> None:
        scan.stage = "failed"
        scan.result = {"ok": False, "reason": reason, **extra}

    @staticmethod
    def view(scan: Scan, hint: str | None = None, obs: Observation | None = None) -> dict:
        if scan.stage == "align":
            progress = 0.55 * len(scan.fronts) / scan.needed
        elif scan.stage == "turn":
            progress = 0.55 + 0.4 * scan.turn_progress
        elif scan.stage in ("verified", "done"):
            progress = 1.0
        else:
            progress = 0.0
        return {
            "scan_id": scan.id,
            "purpose": scan.purpose,
            "stage": scan.stage,
            "hint": hint,
            "challenge": scan.challenge,
            "progress": round(progress, 3),
            "face": obs.public() if obs and obs.faces else None,
            "expires_in": max(int(scan.expires - time.time()), 0),
            "result": scan.result,
        }
