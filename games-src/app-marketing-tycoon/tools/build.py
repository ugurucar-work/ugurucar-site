#!/usr/bin/env python3
"""Build the standalone web page from the single-file game source.

source/marketing-tycoon.html is written as a claude.ai Artifact body (no doctype/head skeleton).
This wraps it in a full HTML document for any static host and writes:
  public/games/app-marketing-tycoon/index.html (site repo)
  public/games/app-marketing-tycoon/favicon.svg
Fonts are self-hosted in public/games/app-marketing-tycoon/fonts (fonts.css), no Google Fonts.

Usage: python3 tools/build.py
"""
import pathlib, re, sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'source' / 'marketing-tycoon.html'
# In the site repo this lives in games-src/app-marketing-tycoon, so write straight into the site's public/ folder.
OUT = ROOT.parent.parent / 'public' / 'games' / 'app-marketing-tycoon'

URL = 'https://www.ugurucar.work/games/app-marketing-tycoon/'
TITLE = 'App Marketing Tycoon'
DESC = ('Launch your app and market it for a year. Make creatives, run Meta, TikTok and Google ads, '
        'hire a team and try to turn a profit in 52 weeks. A free browser game about mobile app marketing.')

FAVICON = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3B4BD8"/><stop offset=".55" stop-color="#E2557A"/><stop offset="1" stop-color="#F5A524"/></linearGradient></defs><rect width="64" height="64" rx="15" fill="url(#g)"/><rect x="12" y="38" width="9" height="14" rx="2.5" fill="#fff" opacity=".75"/><rect x="27.5" y="30" width="9" height="22" rx="2.5" fill="#fff" opacity=".85"/><rect x="43" y="22" width="9" height="30" rx="2.5" fill="#fff"/><path d="M11 30 L26 19 L34 24 L50 11" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><path d="M41 10 H51 V20" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'''


def main():
    src = SRC.read_text(encoding='utf-8')
    # artifact-only meta tag; harmless elsewhere but meaningless
    src = re.sub(r'<meta name="claude:viewport-fit-sides"[^>]*>\n?', '', src)
    src = re.sub(r'<meta charset="utf-8">\n?', '', src, count=1)
    src = re.sub(r'<title>.*?</title>\n?', '', src, count=1)
    # everything up to the first </style> is head material (font links + main stylesheet)
    cut = src.index('</style>') + len('</style>')
    head, body = src[:cut], src[cut:]
    page = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>{TITLE}</title>
<meta name="description" content="{DESC}">
<meta name="theme-color" content="#2E44D4">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="canonical" href="{URL}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{TITLE}">
<meta property="og:url" content="{URL}">
<meta property="og:title" content="{TITLE}">
<meta property="og:description" content="{DESC}">
<meta property="og:image" content="{URL}og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="627">
<meta property="og:image:alt" content="App Marketing Tycoon title screen with a small garage office">
<meta name="author" content="Uğur Uçar">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{TITLE}">
<meta name="twitter:description" content="{DESC}">
<meta name="twitter:image" content="{URL}og-image.jpg">
<style>html,body{{margin:0;padding:0}}</style>
{head.strip()}
</head>
<body>
{body.strip()}
</body>
</html>
'''
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / 'index.html').write_text(page, encoding='utf-8')
    (OUT / 'favicon.svg').write_text(FAVICON, encoding='utf-8')
    print(f'wrote {OUT / "index.html"} ({len(page) // 1024} KB)')


if __name__ == '__main__':
    sys.exit(main())
