"""Completa as fotos que faltaram, evitando hosts da Wikimedia (rate limit)."""
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

BASE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao")
API = "https://api.openverse.org/v1/images/"
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"
evitar = ("wikimedia.org", "wikipedia.org")

FALTANTES = [
    ("restaura-prime", "restauracao", "furniture restoration wood"),
    ("acesso-prime", "piso-tatil", "tactile paving sidewalk"),
    ("acesso-prime", "elevador", "elevator interior accessibility"),
]


def buscar(termo):
    url = API + "?" + urllib.parse.urlencode({"q": termo, "page_size": 20, "license": "cc0,by,by-sa"})
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r).get("results", [])


def baixar(url, destino):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=120) as r, open(destino, "wb") as f:
        f.write(r.read())


for demo, slug, termo in FALTANTES:
    candidatos = [x for x in buscar(termo)
                  if x.get("width", 0) >= 800 and x.get("height", 0) >= 600
                  and str(x.get("url", "")).startswith("http")
                  and not any(h in x.get("url", "") for h in evitar)
                  and not x.get("mature")]
    destino_dir = BASE / "demos" / demo / "img" / "fotos"
    arquivo_json = destino_dir / "fontes.json"
    registros = json.loads(arquivo_json.read_text(encoding="utf-8")) if arquivo_json.exists() else []

    feito = False
    for item in candidatos[:6]:
        bruto = destino_dir / (slug + ".tmp")
        try:
            baixar(item["url"], bruto)
            with Image.open(bruto) as im:
                im = ImageOps.fit(im.convert("RGB"), (1200, 800), Image.LANCZOS)
                saida = destino_dir / (slug + ".webp")
                im.save(saida, "WEBP", quality=80, method=6)
            bruto.unlink(missing_ok=True)
        except Exception as e:
            print(f"  tentativa falhou: {e}")
            bruto.unlink(missing_ok=True)
            time.sleep(1)
            continue

        registros.append({
            "arquivo": "img/fotos/" + slug + ".webp",
            "legenda": "Imagem ilustrativa — não representa a empresa fictícia",
            "titulo_original": (item.get("title", "") or "Imagem ilustrativa")[:110],
            "fonte": item.get("foreign_landing_url") or item.get("detail_url") or "",
            "licenca": (item.get("license", "?") + " " + str(item.get("license_version", ""))).strip(),
            "autor": item.get("creator") or "?",
            "url_imagem": item["url"],
        })
        arquivo_json.write_text(json.dumps(registros, ensure_ascii=False, indent=2), encoding="utf-8")
        print(f"  OK {demo}/{slug} ({saida.stat().st_size // 1024} KB) - {registros[-1]['licenca']}")
        feito = True
        break
    if not feito:
        print(f"  FALHOU {demo}/{slug}")
    time.sleep(1)
