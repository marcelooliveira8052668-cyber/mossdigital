"""Baixa 6 fotos licenciadas por demo, otimiza em WebP e registra fontes/licenças."""
import json
import re
import time
import urllib.parse
import urllib.request
from pathlib import Path

from PIL import Image, ImageOps

BASE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao")
API = "https://commons.wikimedia.org/w/api.php"
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"

FOTOS = {
    "restaura-prime": [
        ("bancada", "Woodworking workshop (Unsplash).jpg", "Bancada de madeira com ferramentas — imagem ilustrativa"),
        ("artesania", "Woodworking workshop showcases detailed craftsmanship with tools in use.jpg", "Trabalho artesanal com ferramentas — imagem ilustrativa"),
        ("ferramentas", "Construction-work-carpenter-tools (23697903934).jpg", "Ferramentas de marcenaria — imagem ilustrativa"),
        ("moveis-antigos", "Pendulum clock by Jacob Kock, antique furniture photography, IMG 0931 edit.jpg", "Móvel antigo restaurado — imagem ilustrativa"),
        ("lixamento", "Yellow birch after sanding and wetting.jpg", "Madeira após lixamento — imagem ilustrativa"),
        ("estofado", "Furniture Piece Deewan 01.jpg", "Peça de mobiliário antigo — imagem ilustrativa"),
    ],
    "acesso-prime": [
        ("rampa", "Boarding platform and ramp for wheelchair Moonah St Boulia Central Western Queensland P1080301.jpg", "Rampa para cadeira de rodas — imagem ilustrativa"),
        ("rampa-praia", "Beach accessibility mobi-mat and wheelchair ramp.jpg", "Acesso acessível à praia — imagem ilustrativa"),
        ("corrimao", "Stirling, 8-10 Corn Exchange Road - Wooden handrail and stairs detail.jpg", "Corrimão em escada — imagem ilustrativa"),
        ("piso-tatil", "Tactile Paving colours and Materials.jpg", "Piso tátil de orientação — imagem ilustrativa"),
        ("sanitario", "Changing Places Accessible Toilet for Disabled Inclusion.jpg", "Sanitário acessível — imagem ilustrativa"),
        ("sinalizacao", "Wheelchair accessibility signs on ground.jpg", "Sinalização de acessibilidade — imagem ilustrativa"),
    ],
    "inspect-prime": [
        ("fachada", "Facade of the Conjunto Nacional cropped version.jpg", "Fachada de edifício — imagem ilustrativa"),
        ("predio", "Building facade in Avenida Paulista.jpg", "Fachada predial urbana — imagem ilustrativa"),
        ("trinca", "Crack in the wall.jpg", "Fissura em parede — imagem ilustrativa"),
        ("umidade", "A water damaged public house wall in Broadstairs Kent England.jpg", "Mancha de umidade em parede — imagem ilustrativa"),
        ("planta", "Blueprint of Bishopsfield - geograph.org.uk - 137378.jpg", "Planta arquitetônica — imagem ilustrativa"),
        ("vistoria", "Building inspection, Skilts School - geograph.org.uk - 3457888.jpg", "Vistoria de edificação — imagem ilustrativa"),
    ],
}


def limpar(texto):
    return re.sub(r"<[^>]+>", "", texto or "").strip()


def consultar(titulos):
    params = {
        "action": "query",
        "titles": "|".join("File:" + t for t in titulos),
        "prop": "imageinfo",
        "iiprop": "url|extmetadata",
        "iiurlwidth": "1400",
        "format": "json",
    }
    url = API + "?" + urllib.parse.urlencode(params)
    for tentativa, atraso in enumerate([3, 6, 12, 24]):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code not in (429, 503) or tentativa == 3:
                raise
            print(f"  aguardando {atraso}s (API HTTP {e.code})...")
            time.sleep(atraso)


def baixar(url, destino):
    atrasos = [3, 6, 12, 24]
    for tentativa, atraso in enumerate(atrasos):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as r, open(destino, "wb") as f:
                f.write(r.read())
            return
        except urllib.error.HTTPError as e:
            if e.code not in (429, 503) or tentativa == len(atrasos) - 1:
                raise
            print(f"    aguardando {atraso}s (HTTP {e.code})...")
            time.sleep(atraso)


for demo, fotos in FOTOS.items():
    titulos = [f[1] for f in fotos]
    dados = consultar(titulos)
    paginas = {p["title"].replace("File:", ""): p for p in dados.get("query", {}).get("pages", {}).values()}
    destino_dir = BASE / "demos" / demo / "img" / "fotos"
    destino_dir.mkdir(parents=True, exist_ok=True)
    registros = []

    for slug, titulo, legenda in fotos:
        pagina = paginas.get(titulo)
        if not pagina or "imageinfo" not in pagina:
            print(f"  !! nao encontrada: {titulo}")
            continue
        info = pagina["imageinfo"][0]
        meta = info.get("extmetadata", {})
        origem_url = info.get("thumburl") or info["url"]
        bruto = destino_dir / (slug + ".tmp")
        baixar(origem_url, bruto)
        with Image.open(bruto) as im:
            im = ImageOps.fit(im.convert("RGB"), (1200, 800), Image.LANCZOS)
            saida = destino_dir / (slug + ".webp")
            im.save(saida, "WEBP", quality=80, method=6)
        bruto.unlink()

        registros.append({
            "arquivo": "img/fotos/" + slug + ".webp",
            "legenda": legenda,
            "titulo_original": titulo,
            "fonte": info.get("descriptionurl", ""),
            "licenca": limpar(meta.get("LicenseShortName", {}).get("value", "?")),
            "autor": limpar(meta.get("Artist", {}).get("value", "?"))[:120],
        })
        print(f"  OK {demo}/{slug} ({saida.stat().st_size // 1024} KB) - {registros[-1]['licenca']}")
        time.sleep(3)

    with open(destino_dir / "fontes.json", "w", encoding="utf-8") as f:
        json.dump(registros, f, ensure_ascii=False, indent=2)
    print(f"{demo}: {len(registros)} fotos registradas\n")
