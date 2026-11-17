"""Troca fotos inadequadas por candidatos mais fiéis ao segmento."""
import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

BASE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\demos")
API = "https://api.openverse.org/v1/images/"
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"

TROCAS = [
    ("acesso-prime", "rampa", "wheelchair ramp entrance building", 4),
    ("acesso-prime", "elevador", "lift elevator inside", 7),
    ("inspect-prime", "vistoria", "construction inspector helmet", 1),
]


def buscar(termo):
    url = API + "?" + urllib.parse.urlencode({"q": termo, "page_size": 10, "license": "cc0,by,by-sa"})
    for atraso in [2, 5, 10]:
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r).get("results", [])
        except Exception as e:
            print("  aguardando", atraso, e)
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
            print("  aguardando", atraso, e)
            time.sleep(atraso)
    return False


for demo, slug, termo, indice in TROCAS:
    candidatos = buscar(termo)
    if len(candidatos) <= indice:
        print("sem candidato:", demo, slug)
        continue
    item = candidatos[indice]
    destino_dir = BASE / demo / "img" / "fotos"
    bruto = destino_dir / (slug + ".tmp")
    if not baixar(item["url"], bruto):
        print("FALHOU download:", demo, slug)
        continue
    try:
        with Image.open(bruto) as im:
            im = ImageOps.fit(im.convert("RGB"), (1200, 800), Image.LANCZOS)
            saida = destino_dir / (slug + ".webp")
            im.save(saida, "WEBP", quality=80, method=6)
    except Exception as e:
        print("FALHOU conversao:", e)
        bruto.unlink(missing_ok=True)
        continue
    bruto.unlink(missing_ok=True)

    arquivo_json = destino_dir / "fontes.json"
    registros = json.loads(arquivo_json.read_text(encoding="utf-8"))
    novo = {
        "arquivo": "img/fotos/" + slug + ".webp",
        "legenda": "Imagem ilustrativa — não representa a empresa fictícia",
        "titulo_original": (item.get("title", "") or "Imagem ilustrativa")[:110],
        "fonte": item.get("foreign_landing_url") or item.get("detail_url") or "",
        "licenca": (item.get("license", "?") + " " + str(item.get("license_version", ""))).strip(),
        "autor": item.get("creator") or "?",
        "url_imagem": item["url"],
    }
    registros = [r for r in registros if r["arquivo"] != novo["arquivo"]] + [novo]
    arquivo_json.write_text(json.dumps(registros, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"OK {demo}/{slug}: {novo['titulo_original'][:50]} ({novo['licenca']})")
    time.sleep(1)

# Remove foto ruim do RESTAURA
ruim = BASE / "restaura-prime" / "img" / "fotos" / "lixamento.webp"
if ruim.exists():
    ruim.unlink()
    print("removida foto inadequada: restaura-prime/lixamento")
    arquivo_json = ruim.parent / "fontes.json"
    registros = json.loads(arquivo_json.read_text(encoding="utf-8"))
    registros = [r for r in registros if r["arquivo"] != "img/fotos/lixamento.webp"]
    arquivo_json.write_text(json.dumps(registros, ensure_ascii=False, indent=2), encoding="utf-8")
