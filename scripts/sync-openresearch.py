#!/usr/bin/env python3
"""Copy the project0 notes site and referenced media into public/openresearch/project0/.

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
SITE_SUFFIXES = {".html", ".css"}


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


def is_site_file(url: str) -> bool:
    path = url.split("?")[0].split("#")[0]
    return Path(path).suffix.lower() in SITE_SUFFIXES


def rewrite_html(html: str) -> str:
    if "<base " not in html:
        html = html.replace("<head>", f'<head>\n  <base href="{PUBLIC_BASE}" />', 1)

    def repl(match: re.Match[str]) -> str:
        attr, url = match.group(1), match.group(2)
        if url.startswith(("#", "http://", "https://", "mailto:", "/", "data:")):
            return match.group(0)
        if is_site_file(url):
            return match.group(0)
        return f'{attr}="{public_media_url(url)}"'

    return ATTR_RE.sub(repl, html)


def dest_rel(rel: str) -> str:
    rest = rel[4:] if rel.startswith("out/") else rel
    return "media/" + rest


def site_pages(src_root: Path) -> list[Path]:
    names = (
        "project.html",
        "phases.html",
        "results.html",
        "backlog.html",
        "run.html",
        "project.css",
    )
    return [src_root / name for name in names if (src_root / name).is_file()]


def main() -> int:
    src_root = cluster_project0()
    if src_root is None or not (src_root / "project.html").is_file():
        if (DEST_DIR / "index.html").is_file():
            print(f"kept {DEST_DIR} (no cluster project.html)")
            return 0
        print("missing project.html and no committed copy", file=sys.stderr)
        return 1

    DEST_DIR.mkdir(parents=True, exist_ok=True)
    pages = site_pages(src_root)
    for path in pages:
        dest_name = "index.html" if path.name == "project.html" else path.name
        if path.suffix == ".css":
            shutil.copy2(path, DEST_DIR / path.name)
            print(f"synced {path} -> {DEST_DIR / path.name}")
            continue
        html = rewrite_html(path.read_text(encoding="utf-8"))
        (DEST_DIR / dest_name).write_text(html, encoding="utf-8")
        print(f"synced {path} -> {DEST_DIR / dest_name}")
        if path.name == "project.html":
            (DEST_DIR / "project.html").write_text(html, encoding="utf-8")

    copied = 0
    missing = 0
    seen: set[str] = set()
    for path in pages:
        if path.suffix != ".html":
            continue
        for _, url in ATTR_RE.findall(path.read_text(encoding="utf-8")):
            if url in seen:
                continue
            seen.add(url)
            if url.startswith(("#", "http://", "https://", "mailto:", "/", "data:")):
                continue
            if is_site_file(url):
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
