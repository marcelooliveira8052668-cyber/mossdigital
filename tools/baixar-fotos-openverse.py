"""Baixa 6 fotos licenciadas por demo via Openverse, otimiza WebP e registra fontes."""
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

BASE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao")
API = "https://api.openverse.org/v1/images/"
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"
LICENCAS = "cc0,by,by-sa"

TERMOS = {
    "restaura-prime": [
        "woodworking workshop", "furniture restoration", "antique wooden chair",
        "carpenter tools wood", "sanding wood furniture", "wooden furniture antique",
    ],
    "acesso-prime": [
        "wheelchair ramp", "tactile paving", "handrail stairs",
        "accessible toilet", "accessibility sign wheelchair", "elevator accessibility",
    ],
    "inspect-prime": [
        "building facade", "wall crack building", "water damaged wall",
        "architectural blueprint", "building inspector", "rusty pipe building",
    ],
}

SLUGS = {
    "restaura-prime": ["bancada", "restauracao", "cadeira-antiga", "ferramentas", "lixamento", "moveis-antigos"],
    "acesso-prime": ["rampa", "piso-tatil", "corrimao", "sanitario", "sinalizacao", "elevador"],
    "inspect-prime": ["fachada", "trinca", "umidade", "planta", "vistoria", "corrosao"],
}


def buscar(termo):
    params = {"q": termo, "page_size": 8, "license": LICENCAS}
    url = API + "?" + urllib.parse.urlencode(params)
    for atraso in [2, 5, 10]:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r).get("results", [])
        except Exception as e:
            print(f"    aguardando {atraso}s ({e})...")
            time.sleep(atraso)
    return []


def baixar(url, destino):
    for atraso in [2, 5, 10, 20]:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as r, open(destino, "wb") as f:
                f.write(r.read())
            return True
        except Exception as e:
            print(f"    aguardando {atraso}s ({e})...")
            time.sleep(atraso)
    return False


for demo, termos in TERMOS.items():
    selecionados = []
    vistos = set()
    for termo in termos:
        for item in buscar(termo):
            if item["id"] in vistos:
                continue
            if item.get("width", 0) < 800 or item.get("height", 0) < 600:
                continue
            if not str(item.get("url", "")).startswith("http"):
                continue
            if item.get("mature"):
                continue
            vistos.add(item["id"])
            selecionados.append(item)
            break
        time.sleep(0.8)
        if len(selecionados) >= 6:
            break

    destino_dir = BASE / "demos" / demo / "img" / "fotos"
    destino_dir.mkdir(parents=True, exist_ok=True)
    registros = []

    for i, item in enumerate(selecionados[:6]):
        slug = SLUGS[demo][i]
        legenda = item.get("title", "")[:110] or "Imagem ilustrativa"
        bruto = destino_dir / (slug + ".tmp")
        if not baixar(item["url"], bruto):
            print(f"  FALHOU {demo}/{slug}")
            continue
        try:
            with Image.open(bruto) as im:
                im = ImageOps.fit(im.convert("RGB"), (1200, 800), Image.LANCZOS)
                saida = destino_dir / (slug + ".webp")
                im.save(saida, "WEBP", quality=80, method=6)
        except Exception as e:
            print(f"  FALHOU ao converter {demo}/{slug}: {e}")
            bruto.unlink(missing_ok=True)
            continue
        bruto.unlink(missing_ok=True)

        registros.append({
            "arquivo": "img/fotos/" + slug + ".webp",
            "legenda": "Imagem ilustrativa — não representa a empresa fictícia",
            "titulo_original": legenda,
            "fonte": item.get("foreign_landing_url") or item.get("detail_url") or "",
            "licenca": (item.get("license", "?") + " " + str(item.get("license_version", ""))).strip(),
            "autor": item.get("creator") or "?",
            "url_imagem": item["url"],
        })
        print(f"  OK {demo}/{slug} ({saida.stat().st_size // 1024} KB) - {registros[-1]['licenca']}")
        time.sleep(1)

    with open(destino_dir / "fontes.json", "w", encoding="utf-8") as f:
        json.dump(registros, f, ensure_ascii=False, indent=2)
    print(f"{demo}: {len(registros)} fotos registradas\n")
