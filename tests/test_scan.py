"""Liveness / scan state machine with synthetic observations. Run: python3 tests/test_scan.py"""
import sys
from pathlib import Path

import numpy as np

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / "server"))
from tma.face import Observation  # noqa: E402
from tma.scans import Policy, Scans  # noqa: E402
from tma.vectors import normalize  # noqa: E402

rng = np.random.default_rng(7)
ME = normalize(rng.normal(size=128))
OTHER = normalize(rng.normal(size=128))
P = Policy(threshold=0.48, liveness=True, turn_delta=0.14, strict_direction=False)
fails = 0


class Engine:
    def crop_jpeg(self, img, obs, size=240):
        return b"\xff\xd8jpeg"


def obs(emb, yaw=0.0, size=0.35, cx=0.5, cy=0.45, faces=1, bright=120.0, sharp=30.0):
    o = Observation(faces=faces, box=(0.3, 0.2, size, size), size=size, cx=cx, cy=cy, yaw=yaw,
                    brightness=bright, sharpness=sharp, embedding=normalize(emb + rng.normal(scale=0.05, size=128)))
    return o


def run(scan, frames, template=None, policy=P):
    s = Scans(lambda: Engine())
    hints = []
    for o in frames:
        hints.append(s._advance(scan, None, o, template, policy, Engine()))
        if scan.stage in ("verified", "failed"):
            break
    return hints


def check(name, ok, detail=""):
    global fails
    print(("ok   " if ok else "FAIL ") + name + ("" if ok else f"  -> {detail}"))
    fails += not ok


S = Scans(lambda: Engine())
sc = S.start(1, "check_in", {})
h = run(sc, [obs(ME), obs(ME), obs(ME, yaw=0.02), obs(ME, yaw=0.09), obs(ME, yaw=0.17)], ME)
check("own face + real head turn -> verified", sc.stage == "verified" and sc.live >= 0.14, (sc.stage, h))

sc = S.start(1, "check_in", {})
flat = [obs(ME), obs(ME)] + [obs(ME, yaw=0.03 + 0.01 * (i % 3)) for i in range(40)]
h = run(sc, flat, ME)
check("photo / screen (yaw barely moves) never passes liveness", sc.stage == "turn", (sc.stage, h[-1]))

sc = S.start(1, "check_in", {})
h = run(sc, [obs(OTHER)] * 6, ME)
check("another person -> no_match after 6 frames", sc.stage == "failed" and sc.result["reason"] == "no_match", (sc.stage, h))

sc = S.start(1, "check_in", {})
h = run(sc, [obs(ME), obs(ME), obs(OTHER, yaw=0.3)], ME)
check("face swapped during the turn -> face_changed", h[-1] == "face_changed" and sc.stage == "turn", h)

sc = S.start(1, "check_in", {})
h = run(sc, [obs(ME, faces=2)], ME)
check("two faces in frame refused", h == ["multiple_faces"], h)

checks = [("move_closer", dict(size=0.1)), ("move_back", dict(size=0.9)), ("center_face", dict(cx=0.8)),
          ("too_dark", dict(bright=20)), ("too_bright", dict(bright=240)), ("look_straight", dict(yaw=0.3)),
          ("hold_still", dict(sharp=2))]
for want, kw in checks:
    sc = S.start(1, "check_in", {})
    h = run(sc, [obs(ME, **kw)], ME)
    check(f"quality gate: {want}", h == [want], h)

sc = S.start(1, "enroll", {})
h = run(sc, [obs(ME), obs(OTHER)], None)
check("enrolment: a second person mid-way restarts collection", h[-1] == "face_changed" and not sc.fronts, h)

sc = S.start(1, "enroll", {})
h = run(sc, [obs(ME), obs(ME), obs(ME), obs(ME, yaw=-0.2)], None)
check("enrolment: 3 frontal frames + turn -> verified", sc.stage == "verified" and len(sc.fronts) == 3, h)

strict = Policy(threshold=0.48, liveness=True, turn_delta=0.14, strict_direction=True)
sc = S.start(1, "check_in", {})
sc.challenge = "left"
h = run(sc, [obs(ME), obs(ME), obs(ME, yaw=-0.2)], ME, strict)
check("strict direction: wrong way is refused", h[-1] == "wrong_way" and sc.stage == "turn", h)

a = S.start(5, "check_in", {})
b = S.start(5, "check_out", {})
check("one scan per person (older one dropped)", S.get(a.id, 5) is None and S.get(b.id, 5) is b)
check("scan of another person not reachable", S.get(b.id, 6) is None)

# ---- one look (production: ENROLL_FRAMES=1, MATCH_FRAMES=1, LIVENESS=0)
ONE = Policy(threshold=0.48, liveness=False, turn_delta=0.14, strict_direction=False)
S1 = Scans(lambda: Engine(), enroll_frames=1, match_frames=1)
sc = S1.start(1, "enroll", {})
h = run(sc, [obs(ME)], None, ONE)
check("one look: enrolment done after one clear frame", sc.stage == "verified" and len(sc.fronts) == 1 and sc.crop, (sc.stage, h))
sc = S1.start(1, "check_in", {})
h = run(sc, [obs(ME, yaw=0.3), obs(ME)], ME, ONE)
check("one look: turned face first is asked to look straight, then one clear frame checks in",
      h[0] == "look_straight" and sc.stage == "verified" and len(sc.fronts) == 1, (sc.stage, h))
sc = S1.start(1, "check_in", {})
h = run(sc, [obs(OTHER)] * 6, ME, ONE)
check("one look: another person is still refused", sc.stage == "failed" and sc.result["reason"] == "no_match", (sc.stage, h))
sc = S1.start(1, "check_in", {})
h = run(sc, [obs(ME, bright=20), obs(ME, size=0.1), obs(ME)], ME, ONE)
check("one look: dark / far frames are skipped, the first good one is used", h[:2] == ["too_dark", "move_closer"] and sc.stage == "verified", h)

print(f"\n{'all passed' if not fails else str(fails) + ' FAILED'}")
sys.exit(1 if fails else 0)
