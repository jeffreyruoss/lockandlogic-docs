"""Generate a Lock & Logic tracked QR code (PNG + self-contained SVG).

Matches the look of the existing QRCode Monkey codes: plain black square
modules on white, 2-module quiet zone, brand logo centred over a white
knockout. Logo is embedded base64 so the SVG is a single portable file.
"""
import base64
import sys
from pathlib import Path

import qrcode
from qrcode.constants import ERROR_CORRECT_H
from PIL import Image

URL = sys.argv[1]
SLUG = sys.argv[2]
OUT = Path(sys.argv[3])

MODULE_PX = 21          # matches the existing codes' 21px module grid
BORDER = 2              # quiet zone in modules
LOGO_MODULES = 16       # logo width; knockout adds 1 module of padding

logo_path = Path(__file__).parent / "qr-logo.png"

qr = qrcode.QRCode(error_correction=ERROR_CORRECT_H, border=BORDER, box_size=MODULE_PX)
qr.add_data(URL)
qr.make(fit=True)
matrix = qr.get_matrix()
n = len(matrix)
size = n * MODULE_PX

logo_px = LOGO_MODULES * MODULE_PX
knock_px = (LOGO_MODULES + 2) * MODULE_PX
logo_xy = (size - logo_px) // 2
knock_xy = (size - knock_px) // 2

# --- PNG ---
img = Image.new("RGB", (size, size), "white")
px = img.load()
for r, row in enumerate(matrix):
    for c, on in enumerate(row):
        if on:
            for y in range(r * MODULE_PX, (r + 1) * MODULE_PX):
                for x in range(c * MODULE_PX, (c + 1) * MODULE_PX):
                    px[x, y] = (0, 0, 0)

logo = Image.open(logo_path).convert("RGBA").resize((logo_px, logo_px), Image.LANCZOS)
img.paste(Image.new("RGB", (knock_px, knock_px), "white"), (knock_xy, knock_xy))
img.paste(logo, (logo_xy, logo_xy), logo)

OUT.mkdir(parents=True, exist_ok=True)
img.save(OUT / f"{SLUG}.png")

# --- SVG ---
rects = []
for r, row in enumerate(matrix):
    c = 0
    while c < n:
        if row[c]:
            run = c
            while run < n and row[run]:
                run += 1
            rects.append(
                f'<rect x="{c * MODULE_PX}" y="{r * MODULE_PX}" '
                f'width="{(run - c) * MODULE_PX}" height="{MODULE_PX}"/>'
            )
            c = run
        else:
            c += 1

b64 = base64.b64encode((logo_path).read_bytes()).decode()
svg = f"""<?xml version="1.0" encoding="utf-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
 width="{size}" height="{size}" viewBox="0 0 {size} {size}">
<rect width="{size}" height="{size}" fill="#ffffff"/>
<g fill="#000000">{''.join(rects)}</g>
<rect x="{knock_xy}" y="{knock_xy}" width="{knock_px}" height="{knock_px}" fill="#ffffff"/>
<image x="{logo_xy}" y="{logo_xy}" width="{logo_px}" height="{logo_px}"
 xlink:href="data:image/png;base64,{b64}"/>
</svg>
"""
(OUT / f"{SLUG}.svg").write_text(svg)

print(f"{SLUG}: QR v{qr.version} ({n}x{n} modules), {size}x{size}px")
print(f"  url : {URL}")
print(f"  png : {(OUT / f'{SLUG}.png').stat().st_size:,} bytes")
print(f"  svg : {(OUT / f'{SLUG}.svg').stat().st_size:,} bytes")
