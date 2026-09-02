#!/usr/bin/env python3
"""Copy project.html and its referenced media into public/openresearch/project0/.

On DigitalOcean the cluster project0 tree is absent, so this is a no-op
and the committed public/openresearch/project0/ files are used as-is.
"""

from __future__ import annotations

import re
import shutil
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DEST_DIR = ROOT / "public" / "openresearch" / "project0"
PUBLIC_BASE = "/openresearch/project0/"
ATTR_RE = re.compile(r'(src|href)=["\']([^"\']+)["\']')


def cluster_project0() -> Path | None:
    if len(ROOT.parents) < 2:
        return None
    candidate = ROOT.parents[1] / "project0"
    if (candidate / "project.html").is_file():
        return candidate
    return None


def public_media_url(rel: str) -> str:
    rest = rel[4:] if rel.startswith("out/") else rel
    return PUBLIC_BASE + "media/" + rest.replace("@", "%40")


def rewrite_html(html: str) -> str:
    if "<base " not in html:
        html = html.replace("<head>", f'<head>\n  <base href="{PUBLIC_BASE}" />', 1)

    def repl(match: re.Match[str]) -> str:
        attr, url = match.group(1), match.group(2)
        if url.startswith(("#", "http://", "https://", "mailto:", "/", "data:")):
            return match.group(0)
        return f'{attr}="{public_media_url(url)}"'

    return ATTR_RE.sub(repl, html)


def dest_rel(rel: str) -> str:
    rest = rel[4:] if rel.startswith("out/") else rel
    return "media/" + rest


def main() -> int:
    src_root = cluster_project0()
    src_html = (src_root / "project.html") if src_root is not None else None
    if src_html is None or not src_html.is_file():
        if (DEST_DIR / "index.html").is_file():
            print(f"kept {DEST_DIR} (no cluster project.html)")
            return 0
        print("missing project.html and no committed copy", file=sys.stderr)
        return 1

    DEST_DIR.mkdir(parents=True, exist_ok=True)
    html = rewrite_html(src_html.read_text(encoding="utf-8"))
    (DEST_DIR / "index.html").write_text(html, encoding="utf-8")
    print(f"synced {src_html} -> {DEST_DIR / 'index.html'}")

    copied = 0
    missing = 0
    for rel in dict.fromkeys(ATTR_RE.findall(src_html.read_text(encoding="utf-8"))):
        url = rel[1]
        if url.startswith(("#", "http://", "https://", "mailto:", "/", "data:")):
            continue
        src = src_root / url
        if not src.is_file():
            print(f"missing media {url}", file=sys.stderr)
            missing += 1
            continue
        dest = DEST_DIR / dest_rel(url)
        dest.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dest)
        copied += 1
        print(f"  {url} -> {dest.relative_to(DEST_DIR)}")
    stale = DEST_DIR / "out"
    if stale.is_dir():
        shutil.rmtree(stale)
        print(f"removed {stale}")
    print(f"copied {copied} media files" + (f", {missing} missing" if missing else ""))
    return 1 if missing else 0


if __name__ == "__main__":
    raise SystemExit(main())
