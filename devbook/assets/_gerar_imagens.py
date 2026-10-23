# -*- coding: utf-8 -*-
"""Gera og-cover.png (1200x630) e os icones PNG do manifest a partir do design do og-cover.svg."""
import os
from PIL import Image, ImageDraw, ImageFont

ASSETS = os.path.dirname(os.path.abspath(__file__))

# Fontes do Windows
def fonte(tamanho, negrito=False):
    nome = "arialbd.ttf" if negrito else "arial.ttf"
    for base in (r"C:\Windows\Fonts", r"C:\Windows\Fonts"):
        p = os.path.join(base, nome)
        if os.path.exists(p):
            return ImageFont.truetype(p, tamanho)
    return ImageFont.load_default()

def gradiente(w, h, c1, c2):
    """Gradiente diagonal c1 -> c2."""
    img = Image.new("RGB", (w, h))
    px = img.load()
    passo = max(w + h - 2, 1)
    for y in range(h):
        for x in range(0, w, 4):  # calcula a cada 4 px e preenche
            t = (x + y) / passo
            cor = tuple(int(c1[i] + (c2[i] - c1[i]) * t) for i in range(3))
            for k in range(4):
                if x + k < w:
                    px[x + k, y] = cor
    return img

def circulo(img, cx, cy, r, cor, alpha):
    cam = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(cam)
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=cor + (alpha,))
    img.alpha_composite(cam) if img.mode == "RGBA" else img.paste(
        Image.alpha_composite(img.convert("RGBA"), cam).convert("RGB"), (0, 0))

def pill(d, x, y, w, h, texto, fg, bg):
    d.rounded_rectangle([x, y, x + w, y + h], radius=h // 2, fill=bg)
    f = fonte(21, negrito=True)
    tw = d.textlength(texto, font=f)
    d.text((x + (w - tw) / 2, y + (h - 24) / 2), texto, font=f, fill=fg)

def og_cover():
    W, H = 1200, 630
    img = gradiente(W, H, (23, 26, 33), (43, 49, 64)).convert("RGBA")
    d = ImageDraw.Draw(img)

    circulo(img, 1090, 90, 230, (255, 255, 255), 9)
    circulo(img, 120, 580, 180, (255, 255, 255), 6)
    d = ImageDraw.Draw(img)

    # marca
    d.rounded_rectangle([72, 68, 124, 120], radius=14, fill=(195, 201, 214))
    fm = fonte(26, negrito=True)
    d.text((82, 80), "DB", font=fm, fill=(23, 26, 33))
    fbrand = fonte(30, negrito=True)
    d.text((140, 76), "DevBook", font=fbrand, fill=(255, 255, 255))

    # título
    f1 = fonte(66, negrito=True)
    d.text((72, 212), "Vire desenvolvedor", font=f1, fill=(255, 255, 255))
    d.text((72, 286), "do zero ao deploy.", font=f1, fill=(195, 201, 214))

    # subtítulo
    f2 = fonte(25)
    d.text((72, 366), "Curso Full Stack completo  ·  em português  ·  acesso vitalício",
           font=f2, fill=(163, 171, 189))

    # pills
    fg = (23, 26, 33)
    bg = (195, 201, 214)
    pill(d, 72, 428, 212, 52, "15 capítulos", fg, bg)
    pill(d, 300, 428, 248, 52, "6 desafios de código", fg, bg)
    pill(d, 564, 428, 242, 52, "3 projetos reais", fg, bg)
    pill(d, 822, 428, 188, 52, "Certificado", fg, bg)

    # rodapé
    f3 = fonte(20)
    d.text((72, 542), "HTML · CSS · JavaScript · React · Next.js · Node.js · SQL · TypeScript · Docker",
           font=f3, fill=(111, 120, 140))

    saida = os.path.join(ASSETS, "og-cover.png")
    img.convert("RGB").save(saida, "PNG", optimize=True)
    print("og-cover.png", os.path.getsize(saida), "bytes")

def icone(tam):
    """Ícone do app: fundo escuro + livro aberto estilizado."""
    img = Image.new("RGBA", (tam, tam), (23, 26, 33, 255))
    d = ImageDraw.Draw(img)
    m = tam * 0.16
    larg = tam - 2 * m
    alt = larg * 0.72
    y0 = (tam - alt) / 2
    d.rounded_rectangle([m, y0, tam - m, y0 + alt], radius=tam * 0.09, fill=(195, 201, 214, 255))
    # "lombada"
    d.rectangle([tam / 2 - tam * 0.015, y0 + alt * 0.12, tam / 2 + tam * 0.015, y0 + alt * 0.88],
                fill=(143, 151, 168, 255))
    # linhas de texto
    lh = tam * 0.045
    for i in range(3):
        yy = y0 + alt * (0.28 + i * 0.18)
        d.rectangle([m + larg * 0.14, yy, tam / 2 - tam * 0.06, yy + lh], fill=(143, 151, 168, 255))
        d.rectangle([tam / 2 + tam * 0.06, yy, tam - m - larg * 0.14, yy + lh], fill=(143, 151, 168, 255))
    saida = os.path.join(ASSETS, "icon-%d.png" % tam)
    img.save(saida, "PNG", optimize=True)
    print("icon-%d.png" % tam, os.path.getsize(saida), "bytes")

og_cover()
icone(192)
icone(512)
print("OK")
