"""Gera photos/s1.jpg..s8.jpg a partir de assets/src (Caito Maia + óculos do site oficial da Chilli Beans)."""
import os
from PIL import Image
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = f"{HERE}/assets/src"; OUT = f"{HERE}/photos"; os.makedirs(OUT, exist_ok=True)
W, H = 1608, 1180   # 2x da caixa de imagem (804 x ~590)
caito = Image.open(f"{SRC}/caito.jpg").convert("RGB")      # 1920x1329


def crop(box, name):
    c = caito.crop(box)
    c = c.resize((W, int(W * c.height / c.width)), Image.LANCZOS)
    if c.height > H:
        top = (c.height - H) // 2
        c = c.crop((0, 0 if name in ("s6", "s8") else top, W, (0 if name in ("s6", "s8") else top) + H))
    c.save(f"{OUT}/{name}.jpg", quality=92)


def products(ids, name, bg=(238, 235, 228)):
    from PIL import ImageChops
    canvas = Image.new("RGB", (W, H), bg)
    n = len(ids); cell = W // n
    for i, pid in enumerate(ids):
        p = Image.open(f"{SRC}/prod/{pid}.jpg").convert("RGB").crop((20, 250, 980, 750))
        sc = (cell * 0.92) / p.width
        p = p.resize((int(p.width * sc), int(p.height * sc)), Image.LANCZOS)
        x, y = i * cell + (cell - p.width) // 2, (H - p.height) // 2 - 190 + (i % 2) * 150
        region = canvas.crop((x, y, x + p.width, y + p.height))
        canvas.paste(ImageChops.multiply(region, p.point(lambda v: v)), (x, y))
    canvas.save(f"{OUT}/{name}.jpg", quality=92)


crop((40, 0, 1880, 1329), "s1")                 # Caito, plano geral
products(["575073", "575132"], "s2")  # óculos Chilli Beans
crop((30, 560, 1000, 1262), "s3")               # mesa: óculos, livros, caveira
crop((760, 120, 1900, 950), "s4")              # mãos/relógio
products(["575086", "575141"], "s5")  # outros óculos
crop((560, 0, 1480, 667), "s6")                 # rosto e tronco
crop((560, 380, 1480, 1047), "s7")              # tronco/mesa
crop((700, 20, 1340, 464), "s8")                # rosto
print("ok")
