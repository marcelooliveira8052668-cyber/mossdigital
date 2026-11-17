"""Baixa duas opções de rampa e gera contato para escolha."""
import json
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

BASE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao")
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"
OPTS = [
    ("opcao1", "Handicap accessible", "accessible ramp building entrance", 1),
    ("opcao2", "Ramp for those in need", "wheelchair ramp sidewalk", 4),
    ("opcao3", "Blue painted curb ramp", "ramp for wheelchair", 0),
]
tmp = BASE / "tools" / "tmp-rampa"
tmp.mkdir(exist_ok=True)
imagens = []
for nome, rotulo, termo, indice in OPTS:
    url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode({"q": termo, "page_size": 10, "license": "cc0,by,by-sa"})
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        itens = json.load(r)["results"]
    item = itens[indice]
    print(nome, item["title"], item["url"])
    bruto = tmp / (nome + ".jpg")
    req = urllib.request.Request(item["url"], headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r, open(bruto, "wb") as f:
        f.write(r.read())
    with Image.open(bruto) as im:
        im = ImageOps.fit(im.convert("RGB"), (500, 333), Image.LANCZOS)
        imagens.append((nome, im.copy(), item))

sheet = Image.new("RGB", (len(imagens) * 500, 360), "white")
draw = ImageDraw.Draw(sheet)
for i, (nome, im, item) in enumerate(imagens):
    sheet.paste(im, (i * 500, 0))
    draw.text((i * 500 + 6, 336), nome + ": " + item["title"][:40], fill="black")
saida = BASE / "tools" / "contatos" / "opcoes-rampa.jpg"
sheet.save(saida, "JPEG", quality=85)
print("contato:", saida)
