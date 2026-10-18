#!/usr/bin/env python3
"""Studio-clean a front-on artwork photo without changing the artwork itself.

Usage: python3 tools/refine_photo.py <in> <out> [--bg auto|x,y] [--target R,G,B] [--tol N]
         [--neutral N] [--global] [--enhance-only] [--crop l,t,r,b] [--color 1.03] [--contrast 1.05]

--bg auto (default): white canvas if enough shows, else the dominant ground colour.
--ground colour: pale painted grounds (powder blue, taupe, mauve, grey) that auto would mistake for white.
--enhance-only: painted skies/gradients, where evening the light would erase the artwork.

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


def auto_ground(im, force=None):
    """Pick the plain ground: white canvas if enough shows, else the most common colour."""
    small = im.resize((96, max(8, round(96 * im.height / im.width))), Image.BOX)
    px = list(small.getdata())
    whites = [c for c in px if max(c) - min(c) < 22 and sum(c) / 3 > 150]
    if force != 'colour' and (force == 'white' or len(whites) > len(px) * 0.12):
        whites.sort(key=sum)
        return whites[len(whites) // 2], 'white'
    q = small.quantize(colors=8, method=Image.Quantize.MEDIANCUT)
    count, idx = max(q.getcolors())
    pal = q.getpalette()
    return tuple(pal[idx * 3: idx * 3 + 3]), 'colour'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('src'); ap.add_argument('out')
    ap.add_argument('--bg', default='auto', help='auto, or x,y of a plain ground pixel (in the cropped image)')
    ap.add_argument('--target', default='247,247,246')
    ap.add_argument('--tol', type=int, default=45)
    ap.add_argument('--neutral', type=int, help='treat near-grey pixels (after removing the cast) as ground')
    ap.add_argument('--global', dest='glob', action='store_true', help='white balance only, one gain for the whole image')
    ap.add_argument('--enhance-only', action='store_true', help='no lighting or white-balance change')
    ap.add_argument('--ground', choices=['white', 'colour'], help='force the auto mode (colour keeps a painted ground\'s own colour)')
    ap.add_argument('--crop')
    ap.add_argument('--color', type=float, default=1.03)
    ap.add_argument('--contrast', type=float, default=1.05)
    a = ap.parse_args()

    im = ImageOps.exif_transpose(Image.open(a.src)).convert('RGB')
    if a.crop:
        im = im.crop(tuple(int(v) for v in a.crop.split(',')))
    target = [int(v) for v in a.target.split(',')]
    if a.enhance_only:
        note = 'enhance only'
        maps = None
    else:
        if a.bg == 'auto':
            ref, mode = auto_ground(im, a.ground)
            if mode == 'white':
                a.neutral = a.neutral or 16
            else:
                a.neutral = None
                target = [min(250, round(c * 1.04)) for c in ref]
        else:
            bx, by = (int(v) for v in a.bg.split(','))
            ref = im.resize((im.width // 8, im.height // 8), Image.BOX).getpixel((bx // 8, by // 8))
            mode = 'manual'
        if a.glob:
            maps = [Image.new('F', im.size, target[k] / max(ref[k], 1)) for k in range(3)]
            note = f'{mode} ground {ref} → {tuple(target)}, global'
        else:
            fits, n, grid = fit_lighting(im, ref, a.tol, a.neutral)
            maps = gain_maps(im.size, fits, target, grid)
            note = f'{mode} ground {ref} → {tuple(target)}, {n} samples'
    out = im
    if maps:
        bands = []
        for band, g in zip(im.split(), maps):
            f = ImageMath.lambda_eval(lambda e: e['min'](e['float'](e['a']) * e['b'], 255.0), a=band, b=g)
            bands.append(f.convert('L'))
        out = Image.merge('RGB', bands)
    out = ImageEnhance.Color(out).enhance(a.color)
    out = ImageEnhance.Contrast(out).enhance(a.contrast)
    out = out.filter(ImageFilter.UnsharpMask(radius=2, percent=45, threshold=3))
    out.save(a.out, quality=95) if a.out.lower().endswith(('.jpg', '.jpeg')) else out.save(a.out)
    print(f'{note}; saved {out.size} → {a.out}')


if __name__ == '__main__':
    main()
