#!/usr/bin/env python3
"""Copy project.html and its referenced media into public/openresearch/project0/."""

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC_ROOT = ROOT.parents[1] / "project0"
SRC_HTML = SRC_ROOT / "project.html"
DEST_DIR = ROOT / "public" / "openresearch" / "project0"
SRC_ATTR = re.compile(r"""(?:src|href)=["']([^"']+)["']""")


def main() -> int:
    if not SRC_HTML.is_file():
        if (DEST_DIR / "index.html").is_file():
            print(f"kept {DEST_DIR} (no cluster project.html)")
            return 0
        print("missing project.html and no committed copy", file=sys.stderr)
        return 1

    DEST_DIR.mkdir(parents=True, exist_ok=True)
    html = SRC_HTML.read_text(encoding="utf-8")
    (DEST_DIR / "index.html").write_text(html, encoding="utf-8")
    print(f"synced {SRC_HTML} -> {DEST_DIR / 'index.html'}")

    copied = 0
    missing = 0
    for rel in dict.fromkeys(SRC_ATTR.findall(html)):
        if rel.startswith(("#", "http://", "https://", "mailto:", "data:")):
            continue
        src = SRC_ROOT / rel
        if not src.is_file():
            print(f"missing media {rel}", file=sys.stderr)
            missing += 1
            continue
        dest = DEST_DIR / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        copied += 1
        print(f"  {rel}")
    print(f"copied {copied} media files" + (f", {missing} missing" if missing else ""))
    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
