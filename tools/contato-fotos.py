# Gera contatos visuais das fotos de cada demo.
from pathlib import Path
from PIL import Image, ImageDraw

BASE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\demos")
SAIDA = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\tools\contatos")
SAIDA.mkdir(exist_ok=True)

for demo in ["restaura-prime", "acesso-prime", "inspect-prime"]:
    arquivos = sorted((BASE / demo / "img" / "fotos").glob("*.webp"))
    print(demo, len(arquivos), "fotos")
    if not arquivos:
        continue
    tw, th = 400, 267
    cols = 3
    rows = (len(arquivos) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * tw, rows * (th + 26)), "white")
    draw = ImageDraw.Draw(sheet)
    for i, arq in enumerate(arquivos):
        with Image.open(arq) as im:
            im = im.resize((tw, th), Image.LANCZOS)
            x, y = (i % cols) * tw, (i // cols) * (th + 26)
            sheet.paste(im, (x, y))
            draw.text((x + 5, y + th + 5), arq.stem, fill="black")
    destino = SAIDA / f"contato-{demo}.jpg"
    sheet.save(destino, "JPEG", quality=85)
    print(" ", destino)
