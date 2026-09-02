#!/usr/bin/env python3
"""Copy public/openresearch into the Next static export dir (out/)."""

from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "public" / "openresearch"
DEST = ROOT / "out" / "openresearch"
FLAT = ROOT / "out" / "openresearch.html"


def main() -> int:
    if not SRC.is_dir():
        print(f"skip: {SRC} missing")
        return 0
    DEST.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(SRC, DEST, dirs_exist_ok=True)
    print(f"copied {SRC} -> {DEST}")
    if FLAT.is_file() and not (DEST / "index.html").is_file():
        shutil.copy2(FLAT, DEST / "index.html")
        print(f"copied {FLAT} -> {DEST / 'index.html'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
