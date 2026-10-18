#!/usr/bin/env python3
"""Prepare one artwork's photos for the site.

Usage: python3 tools/add_art.py <slug> <front-image> <room-image>

Writes images/art/<slug>/front.webp, front-sm.webp and room.webp (EXIF stripped,
resized), then prints the `images` block and a suggested palette for data/artworks.js.
HEIC input is converted with macOS `sips` first.
"""
import json, os, subprocess, sys, tempfile
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SIZES = {'front': 1600, 'front-sm': 720, 'room': 1600}


def load(path):
    if path.lower().endswith(('.heic', '.heif')):
        tmp = os.path.join(tempfile.mkdtemp(), 'in.png')
        subprocess.run(['sips', '-s', 'format', 'png', path, '--out', tmp], check=True, capture_output=True)
        path = tmp
    im = ImageOps.exif_transpose(Image.open(path))
    return im.convert('RGB')


def save(im, long_edge, out):
    im = im.copy()
    im.thumbnail((long_edge, long_edge), Image.LANCZOS)
    im.save(out, 'WEBP', quality=82, method=6)
    return im.size


def palette(im, n=4):
    # Centre crop so wall and background around the canvas count less.
    w, h = im.size
    c = im.crop((int(w * .15), int(h * .15), int(w * .85), int(h * .85)))
    c.thumbnail((200, 200))
    q = c.quantize(colors=10, method=Image.Quantize.MEDIANCUT)
    pal = q.getpalette()
    counts = sorted(q.getcolors(), reverse=True)
    out = []
    for count, idx in counts:
        r, g, b = pal[idx * 3: idx * 3 + 3]
        if any(abs(r - o[0]) + abs(g - o[1]) + abs(b - o[2]) < 40 for o in out):
            continue
        out.append((r, g, b))
        if len(out) == n:
            break
    return ['#%02X%02X%02X' % c for c in out]


def main():
    if len(sys.argv) != 4:
        sys.exit(__doc__)
    slug, front_p, room_p = sys.argv[1:]
    d = os.path.join(ROOT, 'images', 'art', slug)
    os.makedirs(d, exist_ok=True)
    front, room = load(front_p), load(room_p)
    fw, fh = save(front, SIZES['front'], os.path.join(d, 'front.webp'))
    save(front, SIZES['front-sm'], os.path.join(d, 'front-sm.webp'))
    rw, rh = save(room, SIZES['room'], os.path.join(d, 'room.webp'))
    base = f'/images/art/{slug}'
    print(json.dumps({
        'images': {
            'front': {'src': f'{base}/front.webp', 'w': fw, 'h': fh, 'alt': ''},
            'room': {'src': f'{base}/room.webp', 'w': rw, 'h': rh, 'alt': ''},
        },
        'palette_hex': palette(front),
    }, indent=2))


if __name__ == '__main__':
    main()
