"""Generate the scene crops Storytime uses from the hero image.
   python3 scripts/crops.py public/storytime/img/hero.jpg
"""
import sys
from PIL import Image
src = sys.argv[1] if len(sys.argv) > 1 else 'public/storytime/img/hero.jpg'
im = Image.open(src).convert('RGB'); W, H = im.size
def crop(name, box, w=1400):
    x0, y0, x1, y1 = [int(v) for v in (box[0]*W, box[1]*H, box[2]*W, box[3]*H)]
    c = im.crop((x0, y0, x1, y1))
    if c.width > w: c = c.resize((w, int(c.height * w / c.width)), Image.LANCZOS)
    c.save(f'public/storytime/img/{name}.jpg', quality=84, optimize=True); print('saved', name, c.size)
crop('girl_dog',  (0.02, 0.34, 0.44, 0.92))   # portrait: girl + golden
crop('mountains', (0.36, 0.06, 0.98, 0.62))   # the range at sunset
crop('lake',      (0.36, 0.40, 0.98, 0.98))   # water, village lights, pines
crop('village',   (0.44, 0.48, 0.90, 0.78))   # lights along the shore
crop('bedside',   (0.00, 0.62, 0.70, 1.00))   # blanket, plush, warm interior
