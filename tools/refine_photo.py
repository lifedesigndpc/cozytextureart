#!/usr/bin/env python3
"""Studio-clean a front-on artwork photo without changing the artwork itself.

Usage: python3 tools/refine_photo.py <in> <out> --bg x,y [--target R,G,B] [--tol N]
                                     [--crop l,t,r,b] [--color 1.06] [--contrast 1.04]

Only global, photographic corrections (no retouching of the paint):
  1. Even lighting: fits a smooth surface to the plain ground (the colour at --bg within
     --tol, or any near-neutral pixel with --neutral) and divides it out, removing falloff.
  2. White balance: the ground is mapped to --target (default a warm studio white).
  3. Gentle colour/contrast lift and a fine unsharp mask for crisp knife marks.
Pillow only (no numpy).
"""
import argparse
from PIL import Image, ImageEnhance, ImageFilter, ImageMath, ImageOps

GRID = 96  # sample grid for the lighting fit


def solve(A, b):
    # Gaussian elimination for the small normal-equation system.
    n = len(A)
    M = [row[:] + [b[i]] for i, row in enumerate(A)]
    for c in range(n):
        p = max(range(c, n), key=lambda r: abs(M[r][c]))
        M[c], M[p] = M[p], M[c]
        for r in range(n):
            if r != c and M[c][c]:
                f = M[r][c] / M[c][c]
                M[r] = [x - f * y for x, y in zip(M[r], M[c])]
    return [M[i][n] / M[i][i] for i in range(n)]


def terms(x, y):
    return [1, x, y, x * x, y * y, x * y, x * x * x, y * y * y, x * x * y, x * y * y]


def fit_lighting(im, ref, tol, neutral=None):
    w, h = im.size
    gw = GRID; gh = max(8, round(GRID * h / w))
    small = im.resize((gw, gh), Image.BOX)
    px = small.load()
    pts = []
    # In neutral mode, judge "white" after removing the photo's own colour cast (taken from --bg),
    # scaled by brightness so shadowed canvas still counts.
    rm = sum(ref) / 3
    cast = [ref[k] - rm for k in range(3)]
    for j in range(gh):
        for i in range(gw):
            c = px[i, j]
            if neutral:
                L = sum(c) / 3
                d = [c[k] - cast[k] * L / rm for k in range(3)]
                ok = max(d) - min(d) < neutral and L > 90
            else:
                ok = sum(abs(c[k] - ref[k]) for k in range(3)) < tol
            if ok:
                pts.append((i / (gw - 1), j / (gh - 1), c))
    if len(pts) < 30:
        raise SystemExit(f'only {len(pts)} ground samples; raise --tol or move --bg')
    fits = []
    for k in range(3):
        n = len(terms(0, 0))
        A = [[0.0] * n for _ in range(n)]; b = [0.0] * n
        for x, y, c in pts:
            t = terms(x, y)
            for r in range(n):
                b[r] += t[r] * c[k]
                for s in range(n):
                    A[r][s] += t[r] * t[s]
        fits.append(solve(A, b))
    return fits, len(pts), (gw, gh)


def gain_maps(size, fits, target, grid):
    w, h = size; gw, gh = grid
    maps = []
    for k in range(3):
        g = Image.new('F', (gw, gh))
        gp = g.load()
        for j in range(gh):
            for i in range(gw):
                v = sum(a * t for a, t in zip(fits[k], terms(i / (gw - 1), j / (gh - 1))))
                gp[i, j] = target[k] / max(v, 1.0)
        maps.append(g.resize((w, h), Image.BICUBIC))
    return maps


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('out')
    ap.add_argument('--bg', required=True, help='x,y of a plain ground pixel (in the cropped image)')
    ap.add_argument('--target', default='246,244,239')
    ap.add_argument('--tol', type=int, default=36)
    ap.add_argument('--neutral', type=int, help='use every near-grey pixel with (max-min) below this as ground (white canvases)')
    ap.add_argument('--global', dest='glob', action='store_true', help='white balance only: one gain for the whole image (for photos with hard light patches)')
    ap.add_argument('--crop')
    ap.add_argument('--color', type=float, default=1.06)
    ap.add_argument('--contrast', type=float, default=1.04)
    a = ap.parse_args()

    im = ImageOps.exif_transpose(Image.open(a.src)).convert('RGB')
    if a.crop:
        im = im.crop(tuple(int(v) for v in a.crop.split(',')))
    bx, by = (int(v) for v in a.bg.split(','))
    ref = im.resize((im.width // 8, im.height // 8), Image.BOX).getpixel((bx // 8, by // 8))
    target = [int(v) for v in a.target.split(',')]
    if a.glob:
        n = 1
        maps = [Image.new('F', im.size, target[k] / max(ref[k], 1)) for k in range(3)]
    else:
        fits, n, grid = fit_lighting(im, ref, a.tol, a.neutral)
        maps = gain_maps(im.size, fits, target, grid)
    bands = []
    for band, g in zip(im.split(), maps):
        f = ImageMath.lambda_eval(lambda e: e['min'](e['float'](e['a']) * e['b'], 255.0), a=band, b=g)
        bands.append(f.convert('L'))
    out = Image.merge('RGB', bands)
    out = ImageEnhance.Color(out).enhance(a.color)
    out = ImageEnhance.Contrast(out).enhance(a.contrast)
    out = out.filter(ImageFilter.UnsharpMask(radius=2, percent=45, threshold=3))
    out.save(a.out, quality=95) if a.out.lower().endswith(('.jpg', '.jpeg')) else out.save(a.out)
    print(f'ground ref {ref}, {n} samples, saved {out.size} → {a.out}')


if __name__ == '__main__':
    main()
