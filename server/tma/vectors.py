"""Face embedding helpers (numpy only, so web handlers can use them without loading the models)."""
from __future__ import annotations

import numpy as np


def normalize(vec) -> np.ndarray:
    vec = np.asarray(vec, dtype=np.float32).ravel()
    return vec / (float(np.linalg.norm(vec)) or 1.0)


def similarity(a: np.ndarray, b: np.ndarray) -> float:
    """Cosine similarity of two L2-normalised embeddings."""
    return float(np.dot(a, b))


def to_blob(vec) -> bytes:
    return normalize(vec).tobytes()


def from_blob(blob) -> np.ndarray | None:
    return np.frombuffer(bytes(blob), dtype=np.float32) if blob else None
