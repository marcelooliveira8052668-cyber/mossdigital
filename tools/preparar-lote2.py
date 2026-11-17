"""Prepara as 12 demos restantes: fotos, galerias, manuais e capas Instagram."""
import json
import re
import shutil
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont

HOME = Path(r"C:\Users\Sylvia Camillo")
CLONE = HOME / "mossdigital-publicacao"
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"
FONTE = r"C:\Windows\Fonts\arial.ttf"
FONTE_B = r"C:\Windows\Fonts\arialbd.ttf"
EVITAR = ("wikimedia.org", "wikipedia.org")

CONFIG = {
 "topo-prime": {
  "titulo":"TOPO PRIME","segmento":"Topografia de precisão","cor":"#0d3b4f","cor2":"#d99a49",
  "chamada":"Calculadora de orçamento e planta interativa para levantamentos técnicos.",
  "termos":["land surveying","total station surveyor","surveying equipment","topographic map","construction site survey","theodolite"],
  "descs":["Equipe em levantamento de campo","Estação total em uso","Equipamentos de topografia","Mapa topográfico ilustrativo","Canteiro de obras","Teodolito e instrumentos"],
 },
 "pericia-prime": {
  "titulo":"PERÍCIA JUDICIAL PRIME","segmento":"Perícia judicial","cor":"#23272e","cor2":"#c9ab6b",
  "chamada":"Painel de processos fictícios, prazos e checklist documental.",
  "termos":["forensic document examination","courtroom interior","documents folder office","microscope evidence","law books library","clipboard inspection"],
  "descs":["Exame documental ilustrativo","Sala de tribunal","Pastas de documentos","Microscópio de laboratório","Livros de direito","Prancheta de inspeção"],
 },
 "elevatech-prime": {
  "titulo":"ELEVATECH PRIME","segmento":"Manutenção de elevadores","cor":"#0f2233","cor2":"#f07c28",
  "chamada":"Chamados, equipamentos e checklist de manutenção em um painel.",
  "termos":["elevator shaft","elevator cabin interior","elevator maintenance technician","elevator control panel","escalator mall","elevator doors"],
  "descs":["Poço de elevador","Interior de cabine","Técnico em manutenção","Painel de controle","Escada rolante","Portas de elevador"],
 },
 "traduz-prime": {
  "titulo":"TRADUZ PRIME","segmento":"Tradução e interpretação","cor":"#162943","cor2":"#b08a4a",
  "chamada":"Idiomas, documentos e simulador de orçamento com fluxo de entrega.",
  "termos":["translation documents","dictionary books stack","international conference interpreter","typewriter document","language translation desk","passport documents"],
  "descs":["Documentos para tradução","Dicionários empilhados","Conferência internacional","Documento datilografado","Mesa de tradução","Documentos de viagem"],
 },
 "biocontrol-prime": {
  "titulo":"BIOCONTROL PRIME","segmento":"Controle de pragas","cor":"#1e4a34","cor2":"#f2c230",
  "chamada":"Serviços por tipo de praga, planos e agenda de atendimentos.",
  "termos":["pest control professional","insect trap","cockroach insect","mosquito close up","rodent trap","sprayer equipment professional"],
  "descs":["Profissional de controle de pragas","Armadilha para insetos","Inseto ilustrativo","Mosquito em detalhe","Armadilha para roedores","Equipamento profissional"],
 },
 "move-prime": {
  "titulo":"MOVE PRIME","segmento":"Mudanças e transportes","cor":"#1553a0","cor2":"#f2684f",
  "chamada":"Inventário interativo, volume aproximado e estimativa de mudança.",
  "termos":["moving boxes","moving truck","packing boxes home","movers carrying furniture","warehouse boxes","moving company workers"],
  "descs":["Caixas de mudança","Caminhão de mudanças","Caixas embaladas","Mudança de móveis","Caixas em depósito","Equipe de mudanças"],
 },
 "ecoanalytics-prime": {
  "titulo":"ECOANALYTICS PRIME","segmento":"Análises ambientais","cor":"#0f5a5c","cor2":"#5fc9c9",
  "chamada":"Amostras fictícias, resultados ilustrativos e relatório para impressão.",
  "termos":["environmental laboratory water testing","test tubes laboratory","water sample bottle lab","laboratory microscope","chemistry laboratory glassware","environmental water sampling"],
  "descs":["Laboratório ambiental","Tubos de ensaio","Frasco de amostra","Microscópio de laboratório","Vidraria de laboratório","Coleta de amostra de água"],
 },
 "solar-prime": {
  "titulo":"SOLAR PRIME","segmento":"Engenharia solar","cor":"#0c2340","cor2":"#ffc727",
  "chamada":"Dimensionamento técnico, cenários e projeção com gráficos.",
  "termos":["solar panels rooftop","solar panel installation","residential solar roof","solar inverter equipment","solar farm panels","solar energy array"],
  "descs":["Painéis solares","Instalação de painéis","Telhado com geração solar","Inversor solar","Usina solar","Conjunto de painéis"],
 },
 "chaveiro-express-prime": {
  "titulo":"CHAVEIRO EXPRESS PRIME","segmento":"Chaveiro profissional","cor":"#111111","cor2":"#ffd400",
  "chamada":"Mapa de regiões, chamados e orçamento ilustrativo via WhatsApp.",
  "termos":["locksmith tools","key cutting machine","keys keyring","door lock close up","locksmith van","key duplication machine"],
  "descs":["Ferramentas de chaveiro","Máquina de cortar chaves","Chaves em chaveiro","Fechadura de porta","Veículo de chaveiro","Cópia de chave"],
 },
 "aquacare-prime": {
  "titulo":"AQUACARE PRIME","segmento":"Manutenção de piscinas","cor":"#0b8f92","cor2":"#f2c230",
  "chamada":"Volume aproximado, planos, agenda e indicadores ilustrativos.",
  "termos":["swimming pool backyard","pool cleaning maintenance","pool water blue","pool tiles detail","swimming pool resort","pool maintenance equipment"],
  "descs":["Piscina residencial","Limpeza de piscina","Água da piscina","Azulejos da piscina","Piscina de resort","Equipamento de manutenção"],
 },
 "harmonia-tech-prime": {
  "titulo":"HARMONIA TECH PRIME","segmento":"Instrumentos musicais","cor":"#4a1f2e","cor2":"#c9a55c",
  "chamada":"Ordem de serviço, reparos e portfólio da oficina.",
  "termos":["violin repair luthier","guitar workshop repair","piano keys close up","saxophone instrument","drum kit studio","luthier tools workshop"],
  "descs":["Reparo de violino","Oficina de guitarra","Teclas de piano","Saxofone","Bateria","Ferramentas de luthier"],
 },
 "safework-prime": {
  "titulo":"SAFEWORK PRIME","segmento":"Segurança do trabalho","cor":"#163b5e","cor2":"#ed7d31",
  "chamada":"Treinamentos, documentos, vencimentos e relatório administrativo.",
  "termos":["construction safety helmet","workplace safety training","hard hat safety vest","safety inspection construction","safety meeting workers","fire extinguisher training"],
  "descs":["Capacete de segurança","Treinamento de segurança","Capacete e colete","Inspeção de segurança","Reunião de equipe","Treinamento de incêndio"],
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

MANUAL = """# Manual do comprador — {titulo}

Demonstração desenvolvida pela **MOSS Digital**. Todos os dados, nomes, preços
e imagens de empresa são fictícios.

## 1. Como testar
1. Abra `index.html` no navegador (computador ou celular).
2. Navegue pelas seções e teste botões, filtros e formulários.
3. Preencha os formulários com dados inventados: nada é enviado a servidor.
4. Confira telas pequenas (360 px) e grandes (1366 px).

## 2. Checklist de verificação
- [ ] Menu abre e fecha (inclusive no celular)
- [ ] Botões e links levam à seção correta
- [ ] Formulários validam e exibem confirmação **simulada**
- [ ] Imagens carregam e possuem texto alternativo
- [ ] Sem rolagem horizontal indesejada
- [ ] Navegação por teclado funciona

## 3. Personalização
- **Textos/serviços:** edite os arrays no `<script>` (ver README.md).
- **Fotografias:** substitua os WebP em `img/fotos/` e atualize `CREDITOS.md`.
- **Valores:** altere os objetos de configuração no JavaScript.
- **Contato:** troque `WHATSAPP_MOSS` e o link do rodapé.
- **Cores:** altere as variáveis CSS em `:root`.

## 4. Publicação
Pasta independente: envie tudo ao servidor. Use caminhos relativos. No GitHub
Pages, confirme branch/pasta e verifique os links depois.

## 5. Dependências e limites
HTML5, CSS3 e JavaScript puro. Sem frameworks, build ou servidor obrigatório.
Sem API paga ou credencial no frontend. Não processa pedidos nem pagamentos reais.

## 6. Pedidos e pagamento (simulação)
Formulários apenas validam e confirmam localmente. **Nenhum pedido é enviado e
nenhum pagamento é aprovado.** Para pedidos reais: WhatsApp Business, e-mail ou
banco/servidor com autenticação e RLS para dados pessoais. Para cobrança real:
gateway com chave secreta no servidor, webhook de confirmação e autenticação.
Nunca exponha chave privada no JavaScript público.

## 7. Créditos das fotos
6 fotografias ilustrativas obtidas via Openverse (CC0/CC BY/CC BY-SA), com
fonte, autor e licença em `CREDITOS.md` e `img/fotos/fontes.json`. Elas não
representam a empresa fictícia.

## 8. Status
Demonstração funcional e testada em 360/390/768/1366 px, com 6 fotos
licenciadas, manual e capa Instagram. Publicação sujeita à autorização
explícita desta demo.
"""


def buscar(termo):
    url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode(
        {"q": termo, "page_size": 14, "license": "cc0,by,by-sa"})
    for atraso in (2, 5, 10):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=60) as r:
                return json.load(r).get("results", [])
        except Exception as e:
            print("    aguardando", atraso, str(e)[:70])
            time.sleep(atraso)
    return []


def baixar(url, destino):
    for atraso in (2, 5, 10, 20):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA})
            with urllib.request.urlopen(req, timeout=120) as r, open(destino, "wb") as f:
                f.write(r.read())
            return True
        except Exception as e:
            print("    aguardando", atraso, str(e)[:70])
            time.sleep(atraso)
    return False


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


for demo, cfg in CONFIG.items():
    print("\n===== " + demo + " =====")
    origem = HOME / demo
    destino = CLONE / "demos" / demo
    destino.mkdir(parents=True, exist_ok=True)

    # Copia arquivos base
    for nome in ["index.html", "README.md", "CREDITOS.md", "REGISTRO-ALTERACOES.md", "RELATORIO-TESTES.md"]:
        f = origem / nome
        if f.exists():
            shutil.copy2(f, destino / nome)
    if (origem / "tests").exists():
        shutil.copytree(origem / "tests", destino / "tests", dirs_exist_ok=True)

    # Capa WebP a partir do screenshot
    shot = origem / "tests" / (demo + "-desktop.png")
    if shot.exists():
        with Image.open(shot) as im:
            im = im.convert("RGB")
            h = round(im.width / 1.6)
            im = im.crop((0, 0, im.width, min(h, im.height))).resize((1200, 750), Image.LANCZOS)
            (destino / "img").mkdir(exist_ok=True)
            im.save(destino / "img" / "capa-card.webp", "WEBP", quality=82, method=6)

    # Fotos
    fotos_dir = destino / "img" / "fotos"
    fotos_dir.mkdir(parents=True, exist_ok=True)
    selecionados, vistos = [], set()
    for termo in cfg["termos"]:
        for item in buscar(termo):
            u = str(item.get("url", ""))
            if item["id"] in vistos or not u.startswith("http"):
                continue
            if any(x in u for x in EVITAR) or item.get("mature"):
                continue
            if item.get("width", 0) < 800 or item.get("height", 0) < 600:
                continue
            vistos.add(item["id"])
            selecionados.append(item)
            break
        time.sleep(0.6)
        if len(selecionados) >= 6:
            break

    registros = []
    for i, item in enumerate(selecionados[:6]):
        slug = f"foto{i+1:02d}"
        bruto = fotos_dir / (slug + ".tmp")
        if not baixar(item["url"], bruto):
            print("  FALHOU download", slug)
            continue
        try:
            with Image.open(bruto) as im:
                ImageOps.fit(im.convert("RGB"), (1200, 800), Image.LANCZOS).save(
                    fotos_dir / (slug + ".webp"), "WEBP", quality=80, method=6)
        except Exception as e:
            print("  FALHOU conversao", slug, e)
            bruto.unlink(missing_ok=True)
            continue
        bruto.unlink(missing_ok=True)
        registros.append({
            "arquivo": "img/fotos/" + slug + ".webp",
            "legenda": "Imagem ilustrativa — não representa a empresa fictícia",
            "titulo_original": (item.get("title", "") or "Imagem ilustrativa")[:110],
            "fonte": item.get("foreign_landing_url") or item.get("detail_url") or "",
            "licenca": (item.get("license", "?") + " " + str(item.get("license_version", ""))).strip(),
            "autor": item.get("creator") or "?",
            "url_imagem": item["url"],
            "descricao": cfg["descs"][i],
        })
        print("  foto", slug, "OK")
        time.sleep(0.8)
    (fotos_dir / "fontes.json").write_text(json.dumps(registros, ensure_ascii=False, indent=2), encoding="utf-8")
    print("  fotos:", len(registros))

    # Galeria no index.html (origem e destino)
    html = (origem / "index.html").read_text(encoding="utf-8")
    if ".fotos-grid" not in html:
        m = re.search(r"[ \t]*@media \(prefers-reduced-motion", html)
        if m:
            html = html[:m.start()] + CSS + "\n" + html[m.start():]
    if 'id="fotografias"' not in html and registros:
        cards = []
        for r in registros:
            cards.append(
                '      <figure class="foto-item">\n'
                f'        <img src="{r["arquivo"]}" alt="{r["descricao"]}" width="1200" height="800" loading="lazy" decoding="async">\n'
                f'        <figcaption>{r["descricao"]}<small>Imagem ilustrativa · {r["licenca"]}</small></figcaption>\n'
                '      </figure>')
        secao = (
            '  <!-- Galeria de fotografias licenciadas — não representam a empresa fictícia -->\n'
            '  <section class="secao secao--fundo" id="fotografias"><div class="container">\n'
            '    <div class="cabecalho-secao centro">\n'
            '      <span class="eyebrow">Fotografias ilustrativas</span>\n'
            f'      <h2 class="titulo-secao">Fotografias de {cfg["segmento"].lower()}</h2>\n'
            '      <p class="subtitulo-secao">Imagens de referência licenciadas, com fonte e licença registradas.</p>\n'
            '    </div>\n'
            '    <div class="fotos-grid">\n' + "\n".join(cards) + '\n    </div>\n'
            '    <p class="fotos-aviso">⚠ Estas fotografias são imagens de referência licenciadas. '
            'Não representam a empresa fictícia, sua equipe, instalações ou trabalhos reais.</p>\n'
            '  </div></section>\n\n')
        m2 = re.search(r'<footer class="rodape"', html)
        if m2:
            html = html[:m2.start()] + secao + html[m2.start():]
    (origem / "index.html").write_text(html, encoding="utf-8")
    shutil.copy2(origem / "index.html", destino / "index.html")

    # Manual
    manual = MANUAL.format(titulo=cfg["titulo"])
    (origem / "MANUAL.md").write_text(manual, encoding="utf-8")
    shutil.copy2(origem / "MANUAL.md", destino / "MANUAL.md")

    # Créditos com fotos
    creditos = destino / "CREDITOS.md"
    texto = creditos.read_text(encoding="utf-8").rstrip()
    if "Fotografias ilustrativas licenciadas" not in texto:
        linhas = ["", "## Fotografias ilustrativas licenciadas", "",
                  "Imagens via Openverse (CC0/CC BY/CC BY-SA), otimizadas em WebP. "
                  "Não representam a empresa fictícia.", "",
                  "| Arquivo | Descrição | Fonte | Licença | Autor |", "|---|---|---|---|---|"]
        for r in registros:
            fonte = r["fonte"]
            fonte_md = f"[ver fonte]({fonte})" if fonte.startswith("http") else fonte
            linhas.append(f"| `{r['arquivo']}` | {r['descricao']} | {fonte_md} | {r['licenca']} | {(r['autor'] or '?')[:60]} |")
        creditos.write_text(texto + "\n" + "\n".join(linhas) + "\n", encoding="utf-8")
        shutil.copy2(creditos, origem / "CREDITOS.md")

    # Capa Instagram
    dst_ig = CLONE / "divulgacao" / "instagram" / demo
    dst_ig.mkdir(parents=True, exist_ok=True)
    capa = destino / "img" / "capa-card.webp"
    shutil.copy2(capa, dst_ig / "captura-demo.webp")
    W, H = 1080, 1350
    img = Image.new("RGB", (W, H), rgb(cfg["cor"]))
    with Image.open(capa) as shot_img:
        img.paste(shot_img.resize((1000, 625), Image.LANCZOS), (40, 40))
    d = ImageDraw.Draw(img)
    ft = ImageFont.truetype(FONTE_B, 62 if len(cfg["titulo"]) > 16 else 74)
    fs = ImageFont.truetype(FONTE, 34)
    fc = ImageFont.truetype(FONTE, 27)
    fp = ImageFont.truetype(FONTE, 22)
    y = 720
    d.text((60, y), cfg["titulo"], font=ft, fill=rgb(cfg["cor2"]))
    y += 95
    d.text((60, y), cfg["segmento"], font=fs, fill="white")
    y += 70
    linha = ""
    for p in cfg["chamada"].split():
        teste = (linha + " " + p).strip()
        if d.textlength(teste, font=fc) > 950:
            d.text((60, y), linha, font=fc, fill="white"); y += 40; linha = p
        else:
            linha = teste
    if linha:
        d.text((60, y), linha, font=fc, fill="white")
    y += 110
    d.rectangle((60, y, 1020, y + 4), fill=rgb(cfg["cor2"]))
    y += 40
    d.text((60, y), "Demonstração desenvolvida pela MOSS Digital", font=fs, fill="white")
    y += 55
    d.text((60, y), "Imagens, nomes e valores fictícios", font=fp, fill="#C9D6DE")
    y += 40
    d.text((60, y), "mossdigital.com.br", font=fp, fill=rgb(cfg["cor2"]))
    png = dst_ig / f"Capa Instagram - {cfg['titulo']}.png"
    img.save(png, "PNG")
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <rect width="1080" height="1350" fill="{cfg['cor']}"/>
  <image href="captura-demo.webp" x="40" y="40" width="1000" height="625"/>
  <text x="60" y="800" font-family="Arial" font-weight="bold" font-size="68" fill="{cfg['cor2']}">{cfg['titulo']}</text>
  <text x="60" y="895" font-family="Arial" font-size="34" fill="#fff">{cfg['segmento']}</text>
  <text x="60" y="965" font-family="Arial" font-size="27" fill="#fff">{cfg['chamada']}</text>
  <rect x="60" y="1075" width="960" height="4" fill="{cfg['cor2']}"/>
  <text x="60" y="1140" font-family="Arial" font-size="34" fill="#fff">Demonstração desenvolvida pela MOSS Digital</text>
  <text x="60" y="1195" font-family="Arial" font-size="22" fill="#C9D6DE">Imagens, nomes e valores fictícios</text>
  <text x="60" y="1235" font-family="Arial" font-size="22" fill="{cfg['cor2']}">mossdigital.com.br</text>
</svg>"""
    (dst_ig / "capa-editavel.svg").write_text(svg, encoding="utf-8")
    legenda = (f"{cfg['titulo']} — {cfg['segmento']}\n\n{cfg['chamada']}\n\n"
               "Demonstração desenvolvida pela MOSS Digital. Imagens, nomes e valores fictícios.\n\n"
               "Saiba mais: mossdigital.com.br\n#MOSSDigital #Demonstracao #SiteSobMedida\n")
    (dst_ig / "LEGENDA E INSTRUCOES.txt").write_text(legenda, encoding="utf-8")
    copia = HOME / "04 - Divulgacao" / demo
    copia.mkdir(parents=True, exist_ok=True)
    shutil.copy2(png, copia / png.name)
    shutil.copy2(dst_ig / "LEGENDA E INSTRUCOES.txt", copia / "LEGENDA E INSTRUCOES.txt")
    print("  preparada:", demo)

print("\nLOTE 2 PREPARADO")
