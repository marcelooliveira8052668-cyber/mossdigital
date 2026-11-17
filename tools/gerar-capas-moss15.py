"""Gera capas WebP 1200x750 para as 3 demos publicadas (MOSS Digital)."""
from pathlib import Path
from PIL import Image

BASE = Path(r"C:\Users\Sylvia Camillo")
DEST = BASE / "mossdigital-publicacao" / "demos"

DEMOS = {
    "restaura-prime": BASE / "restaura-prime" / "tests" / "restaura-prime-desktop.png",
    "acesso-prime": BASE / "acesso-prime" / "tests" / "acesso-prime-desktop.png",
    "inspect-prime": BASE / "inspect-prime" / "tests" / "inspect-prime-desktop.png",
}

LARGURA, ALTURA = 1200, 750

for nome, origem in DEMOS.items():
    with Image.open(origem) as img:
        img = img.convert("RGB")
        # Recorta o topo (cabeçalho + hero) com proporção 1.6
        altura_corte = round(img.width / (LARGURA / ALTURA))
        img = img.crop((0, 0, img.width, min(altura_corte, img.height)))
        img = img.resize((LARGURA, ALTURA), Image.LANCZOS)
        saida = DEST / nome / "img" / "capa-card.webp"
        img.save(saida, "WEBP", quality=82, method=6)
        print(f"{nome}: {saida} ({saida.stat().st_size // 1024} KB)")
