"""Gera a capa editável pelo código, com captura da própria demo."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

folder = Path(__file__).resolve().parent
root = folder.parents[2]
card = Image.open(root / "demos/moss-fishing-camping/img/capa-card.webp").convert("RGB")
canvas = Image.new("RGB", (1080, 1350), "#102b21")
photo = card.resize((1080, 675), Image.Resampling.LANCZOS)
canvas.paste(photo, (0, 450))
draw = ImageDraw.Draw(canvas)
font_bold = "C:/Windows/Fonts/arialbd.ttf"
font = "C:/Windows/Fonts/arial.ttf"
draw.text((70, 70), "MOSS DIGITAL  /  MODELO DE SITE", font=ImageFont.truetype(font_bold, 29), fill="#ef983d")
draw.text((70, 135), "PESCA +", font=ImageFont.truetype(font_bold, 94), fill="white")
draw.text((70, 250), "CAMPING", font=ImageFont.truetype(font_bold, 94), fill="white")
draw.text((70, 380), "Uma vitrine para quem ama aventura.", font=ImageFont.truetype(font, 30), fill="#e8f1e7")
draw.rectangle((0, 1125, 1080, 1350), fill="#102b21")
draw.text((70, 1165), "50 produtos fictícios  •  carrinho demonstrativo", font=ImageFont.truetype(font_bold, 29), fill="white")
draw.text((70, 1220), "Sem vendas ou pedidos reais.", font=ImageFont.truetype(font, 26), fill="#e8f1e7")
draw.text((70, 1270), "mossdigital.com.br/demos/moss-fishing-camping/", font=ImageFont.truetype(font, 24), fill="#ef983d")
canvas.save(folder / "capa-instagram.png", optimize=True)
