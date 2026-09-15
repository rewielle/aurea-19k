"""Generate the scene crops Storytime uses from its own artwork.
   python3 scripts/crops.py
"""
from PIL import Image
def crop(src, name, box, w=1400):
    im = Image.open(src).convert('RGB'); W, H = im.size
    x0, y0, x1, y1 = [int(v) for v in (box[0]*W, box[1]*H, box[2]*W, box[3]*H)]
    c = im.crop((x0, y0, x1, y1))
    if c.width > w: c = c.resize((w, int(c.height * w / c.width)), Image.LANCZOS)
    c.save(f'public/storytime/img/{name}.jpg', quality=84, optimize=True); print('saved', name, c.size)
H = 'public/storytime/img/hero.webp'
crop(H, 'girl_dog',  (0.00, 0.30, 0.42, 0.95))
crop(H, 'mountains', (0.36, 0.05, 0.98, 0.62))
crop(H, 'lake',      (0.36, 0.42, 0.98, 0.98))
crop(H, 'village',   (0.42, 0.50, 0.92, 0.80))
crop(H, 'bedside',   (0.00, 0.60, 0.72, 1.00))
crop('public/storytime/img/lighthouse.webp', 'lighthouse_tower', (0.55, 0.05, 0.98, 0.80))
