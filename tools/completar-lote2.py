"""Completa a 6a foto das demos que ficaram com 5 e reconstrói as galerias."""
import json
import re
import shutil
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps

HOME = Path(r"C:\Users\Sylvia Camillo")
CLONE = HOME / "mossdigital-publicacao"
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"
EVITAR = ("wikimedia.org", "wikipedia.org")

FALTANDO = {
    "topo-prime":        (["surveying instrument tripod", "surveyor measuring land", "gis mapping survey"], "Instrumento de topografia em tripé"),
    "biocontrol-prime":  (["exterminator pest control", "fumigation professional", "insect monitoring trap"], "Profissional de controle de pragas"),
    "ecoanalytics-prime":(["environmental testing lab", "water quality laboratory test", "sample analysis laboratory"], "Análise de amostra em laboratório"),
    "harmonia-tech-prime":(["guitar luthier workshop", "musical instrument repair", "violin making workshop"], "Oficina de instrumentos musicais"),
}

CSS_MARK = "/* ===== Galeria de fotografias ilustrativas (licenciadas) ===== */"

def buscar(termo):
    url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
        {"q": termo, "page_size": 16, "license": "cc0,by,by-sa"})
    for atraso in (2, 5, 10):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r).get("results", [])
        except Exception as e:
            print("   aguardando", atraso, str(e)[:60]); time.sleep(atraso)
    return []

def baixar(url, destino):
    for atraso in (2, 5, 10, 20):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as r, open(destino, "wb") as f:
                f.write(r.read())
            return True
        except Exception as e:
            print("   aguardando", atraso, str(e)[:60]); time.sleep(atraso)
    return False

for demo, (termos, desc) in FALTANDO.items():
    print("\n==", demo)
    fotos_dir = CLONE / "demos" / demo / "img" / "fotos"
    arquivo = fotos_dir / "fontes.json"
    registros = json.loads(arquivo.read_text(encoding="utf-8"))
    if len(registros) >= 6:
        print("   ja tem 6"); continue

    item = None
    for termo in termos:
        for cand in buscar(termo):
            u = str(cand.get("url", ""))
            if not u.startswith("http") or any(x in u for x in EVITAR) or cand.get("mature"):
                continue
            if cand.get("width", 0) < 800 or cand.get("height", 0) < 600:
                continue
            if any(c.get("url_imagem") == u for c in registros):
                continue
            item = cand
            break
        time.sleep(0.6)
        if item: break

    if not item:
        print("   FALHOU encontrar candidato"); continue

    bruto = fotos_dir / "foto06.tmp"
    if not baixar(item["url"], bruto):
        print("   FALHOU download"); continue
    with Image.open(bruto) as im:
        ImageOps.fit(im.convert("RGB"), (1200, 800), Image.LANCZOS).save(fotos_dir / "foto06.webp", "WEBP", quality=80, method=6)
    bruto.unlink(missing_ok=True)
    registros.append({
        "arquivo": "img/fotos/foto06.webp",
        "legenda": "Imagem ilustrativa — não representa a empresa fictícia",
        "titulo_original": (item.get("title", "") or "Imagem ilustrativa")[:110],
        "fonte": item.get("foreign_landing_url") or item.get("detail_url") or "",
        "licenca": (item.get("license", "?") + " " + str(item.get("license_version", ""))).strip(),
        "autor": item.get("creator") or "?",
        "url_imagem": item["url"],
        "descricao": desc,
    })
    arquivo.write_text(json.dumps(registros, ensure_ascii=False, indent=2), encoding="utf-8")
    print("   foto06 adicionada:", desc)

    # Atualiza CREDITOS no clone e na origem
    linha = (f"| `img/fotos/foto06.webp` | {desc} | [ver fonte]({registros[-1]['fonte']}) | "
             f"{registros[-1]['licenca']} | {(registros[-1]['autor'] or '?')[:60]} |")
    for p in [CLONE / "demos" / demo / "CREDITOS.md", HOME / demo / "CREDITOS.md"]:
        if p.exists():
            t = p.read_text(encoding="utf-8").rstrip() + "\n" + linha + "\n"
            p.write_text(t, encoding="utf-8")

    # Reconstrói a galeria no index.html (origem e clone)
    cards = []
    for r in registros:
        cards.append(
            '      <figure class="foto-item">\n'
            f'        <img src="{r["arquivo"]}" alt="{r["descricao"]}" width="1200" height="800" loading="lazy" decoding="async">\n'
            f'        <figcaption>{r["descricao"]}<small>Imagem ilustrativa · {r["licenca"]}</small></figcaption>\n'
            '      </figure>')
    nova_secao = (
        '  <!-- Galeria de fotografias licenciadas — não representam a empresa fictícia -->\n'
        '  <section class="secao secao--fundo" id="fotografias"><div class="container">\n'
        '    <div class="cabecalho-secao centro">\n'
        '      <span class="eyebrow">Fotografias ilustrativas</span>\n'
        '      <h2 class="titulo-secao">Fotografias ilustrativas</h2>\n'
        '      <p class="subtitulo-secao">Imagens de referência licenciadas, com fonte e licença registradas.</p>\n'
        '    </div>\n'
        '    <div class="fotos-grid">\n' + "\n".join(cards) + '\n    </div>\n'
        '    <p class="fotos-aviso">⚠ Estas fotografias são imagens de referência licenciadas. '
        'Não representam a empresa fictícia, sua equipe, instalações ou trabalhos reais.</p>\n'
        '  </div></section>\n\n')
    for p in [HOME / demo / "index.html", CLONE / "demos" / demo / "index.html"]:
        html = p.read_text(encoding="utf-8")
        html = re.sub(r'  <!-- Galeria de fotografias licenciadas.*?</section>\n\n', nova_secao, html, flags=re.S)
        p.write_text(html, encoding="utf-8")
    print("   galeria reconstruída com 6 fotos")

print("\nCOMPLEMENTO CONCLUÍDO")
