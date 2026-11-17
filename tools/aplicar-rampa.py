"""Aplica a melhor opção de rampa e atualiza fontes.json."""
import json
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps

BASE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao")
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"
url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
    {"q": "ramp for wheelchair", "page_size": 10, "license": "cc0,by,by-sa"})
req = urllib.request.Request(url, headers={"User-Agent": UA})
with urllib.request.urlopen(req, timeout=60) as r:
    item = json.load(r)["results"][0]

# Usa a imagem baixada no passo anterior
origem = BASE / "tools" / "tmp-rampa" / "opcao3.jpg"
destino_dir = BASE / "demos" / "acesso-prime" / "img" / "fotos"
with Image.open(origem) as im:
    saida = destino_dir / "rampa.webp"
    ImageOps.fit(im.convert("RGB"), (1200, 800), Image.LANCZOS).save(saida, "WEBP", quality=80, method=6)

arquivo = destino_dir / "fontes.json"
registros = json.loads(arquivo.read_text(encoding="utf-8"))
novo = {
    "arquivo": "img/fotos/rampa.webp",
    "legenda": "Imagem ilustrativa — não representa a empresa fictícia",
    "titulo_original": item.get("title", "")[:110],
    "fonte": item.get("foreign_landing_url") or item.get("detail_url") or "",
    "licenca": (item.get("license", "?") + " " + str(item.get("license_version", ""))).strip(),
    "autor": item.get("creator") or "?",
    "url_imagem": item["url"],
}
registros = [r for r in registros if r["arquivo"] != novo["arquivo"]] + [novo]
arquivo.write_text(json.dumps(registros, ensure_ascii=False, indent=2), encoding="utf-8")
print("rampa aplicada:", novo["titulo_original"], "-", novo["licenca"])
print("total de fotos no json:", len(registros))
