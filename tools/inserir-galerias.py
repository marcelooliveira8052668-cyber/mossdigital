"""Insere galerias de 6 fotos licenciadas nas 3 demos e atualiza os créditos."""
import json
import re
from pathlib import Path

HOME = Path(r"C:\Users\Sylvia Camillo")
CLONE = HOME / "mossdigital-publicacao"

DESCRICOES = {
    "restaura-prime": {
        "bancada": "Bancada de marcenaria com ferramentas",
        "artesania": "Plaino sobre madeira em bancada de trabalho",
        "cadeira-antiga": "Cadeiras de madeira com assento estofado",
        "ferramentas": "Paquímetro sobre tábua de madeira",
        "moveis-antigos": "Móveis antigos em ambiente interno",
        "restauracao": "Bancada de trabalho em oficina",
    },
    "acesso-prime": {
        "rampa": "Rampa de acesso sinalizada com símbolo de cadeira de rodas",
        "corrimao": "Escada com corrimão de metal",
        "elevador": "Interior de elevador",
        "piso-tatil": "Piso tátil em calçada",
        "sanitario": "Lavatório em sanitário acessível",
        "sinalizacao": "Sinal de acessibilidade para cadeira de rodas",
    },
    "inspect-prime": {
        "fachada": "Fachada de edifício residencial",
        "trinca": "Fissura em parede",
        "umidade": "Parede com danos por umidade",
        "planta": "Planta baixa arquitetônica",
        "vistoria": "Técnicos com equipamentos em vistoria de obra",
        "corrosao": "Painel metálico com corrosão aparente",
    },
}

CSS = """
    /* ===== Galeria de fotografias ilustrativas (licenciadas) ===== */
    .fotos-secao .cabecalho-secao{max-width:760px}
    .fotos-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1rem}
    .foto-item{margin:0;border:1px solid var(--borda);border-radius:var(--raio);overflow:hidden;background:var(--branco,#fff)}
    .foto-item img{width:100%;height:200px;object-fit:cover;display:block}
    .foto-item figcaption{padding:.7rem .8rem;font-size:.82rem;line-height:1.4}
    .foto-item figcaption small{display:block;color:var(--suave);font-size:.72rem;margin-top:.2rem}
    .fotos-aviso{font-size:.8rem;color:var(--suave);border-left:3px solid var(--destaque,var(--cobre,#b9782f));padding:.7rem .9rem;background:rgba(0,0,0,.03);margin-top:1.2rem}
    @media(max-width:600px){.fotos-grid{grid-template-columns:repeat(2,1fr)}}
    @media(max-width:400px){.fotos-grid{grid-template-columns:1fr}}
"""

TITULO_SECAO = {
    "restaura-prime": "Fotografias do segmento",
    "acesso-prime": "Fotografias ilustrativas de acessibilidade",
    "inspect-prime": "Fotografias ilustrativas de inspeção",
}
SUBTITULO = {
    "restaura-prime": "Imagens de referência sobre marcenaria e móveis antigos, com fonte e licença registradas.",
    "acesso-prime": "Imagens de referência sobre adaptações e acessibilidade, com fonte e licença registradas.",
    "inspect-prime": "Imagens de referência sobre edificações e ocorrências, com fonte e licença registradas.",
}

for demo, descricoes in DESCRICOES.items():
    origem = HOME / demo / "index.html"
    html = origem.read_text(encoding="utf-8")

    # 1. CSS: insere antes da media query de reduced motion
    if ".fotos-grid" not in html:
        m = re.search(r"[ \t]*@media \(prefers-reduced-motion", html)
        if not m:
            raise SystemExit("media query não encontrada em " + str(origem))
        html = html[:m.start()] + CSS + "\n" + html[m.start():]

    # 2. HTML: galeria antes do rodapé
    if 'id="fotografias"' not in html:
        fontes = json.loads((CLONE / "demos" / demo / "img" / "fotos" / "fontes.json").read_text(encoding="utf-8"))
        por_arquivo = {f["arquivo"]: f for f in fontes}
        cards = []
        for slug, desc in descricoes.items():
            arq = "img/fotos/" + slug + ".webp"
            info = por_arquivo.get(arq, {})
            lic = info.get("licenca", "licença registrada")
            cards.append(
                '      <figure class="foto-item">\n'
                f'        <img src="{arq}" alt="{desc}" width="1200" height="800" loading="lazy" decoding="async">\n'
                f'        <figcaption>{desc}<small>Imagem ilustrativa · {lic}</small></figcaption>\n'
                '      </figure>'
            )
        secao = (
            '  <!-- Galeria de fotografias licenciadas — não representam a empresa fictícia -->\n'
            '  <section class="secao secao--fundo" id="fotografias"><div class="container">\n'
            '    <div class="cabecalho-secao centro">\n'
            f'      <span class="eyebrow">Fotografias ilustrativas</span>\n'
            f'      <h2 class="titulo-secao">{TITULO_SECAO[demo]}</h2>\n'
            f'      <p class="subtitulo-secao">{SUBTITULO[demo]}</p>\n'
            '    </div>\n'
            '    <div class="fotos-grid">\n' + "\n".join(cards) + '\n    </div>\n'
            '    <p class="fotos-aviso">⚠ Estas fotografias são imagens de referência licenciadas. '
            'Não representam a empresa fictícia, sua equipe, instalações ou trabalhos reais.</p>\n'
            '  </div></section>\n\n'
        )
        marker = '<footer class="rodape">'
        if marker not in html:
            raise SystemExit("footer não encontrado em " + str(origem))
        html = html.replace(marker, secao + marker, 1)

    origem.write_text(html, encoding="utf-8")
    print("galeria inserida:", origem)

    # 3. Créditos com fonte/licença
    fontes = json.loads((CLONE / "demos" / demo / "img" / "fotos" / "fontes.json").read_text(encoding="utf-8"))
    creditos = CLONE / "demos" / demo / "CREDITOS.md"
    texto = creditos.read_text(encoding="utf-8")
    if "Fotografias ilustrativas licenciadas" not in texto:
        linhas = ["", "## Fotografias ilustrativas licenciadas (6 por demo)", "",
                  "Imagens obtidas via Openverse com licenças que permitem uso comercial. "
                  "Foram redimensionadas e convertidas para WebP. **Não representam a empresa fictícia.**", "",
                  "| Arquivo | Descrição | Fonte | Licença | Autor |", "|---|---|---|---|---|"]
        for f in fontes:
            desc = descricoes.get(Path(f["arquivo"]).stem, f.get("titulo_original", ""))
            fonte = f.get("fonte", "")
            fonte_md = f"[ver fonte]({fonte})" if fonte.startswith("http") else fonte
            autor = (f.get("autor", "?") or "?").replace("|", "/")
            linhas.append(f"| `{f['arquivo']}` | {desc} | {fonte_md} | {f['licenca']} | {autor} |")
        texto = texto.rstrip() + "\n" + "\n".join(linhas) + "\n"
        creditos.write_text(texto, encoding="utf-8")
        print("  creditos atualizados:", creditos)
