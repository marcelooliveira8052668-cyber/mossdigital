"""Cria MANUAL.md e capas Instagram (1080x1350) para as 3 demos aprovadas."""
import shutil
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

CLONE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao")
HOME = Path(r"C:\Users\Sylvia Camillo")
FONTE = r"C:\Windows\Fonts\arial.ttf"
FONTE_B = r"C:\Windows\Fonts\arialbd.ttf"

DEMOS = {
    "restaura-prime": {
        "titulo": "RESTAURA PRIME",
        "segmento": "Restauração de móveis",
        "chamada": "Compare o antes e depois de cadeiras, mesas e armários restaurados.",
        "cor": "#5A3C22", "cor2": "#B48A3E",
    },
    "acesso-prime": {
        "titulo": "ACESSO PRIME",
        "segmento": "Acessibilidade inclusiva",
        "chamada": "Rampas, corrimãos e sinalização com foco em navegação por teclado.",
        "cor": "#12212F", "cor2": "#FFBF00",
    },
    "inspect-prime": {
        "titulo": "INSPECT PRIME",
        "segmento": "Inspeção predial",
        "chamada": "Checklists, ocorrências por prioridade e relatório visual de exemplo.",
        "cor": "#0A2036", "cor2": "#B87333",
    },
}

MANUAL = """# Manual do comprador — {titulo}

Demonstração desenvolvida pela **MOSS Digital**. Este manual explica como testar,
personalizar e publicar o modelo. **Todos os dados, nomes, preços e imagens de
empresa são fictícios.**

## 1. Como testar
1. Abra `index.html` no navegador (computador ou celular).
2. Navegue pelas seções e teste os botões, filtros e formulários.
3. Preencha os formulários com dados inventados. Nada é enviado a servidor.
4. Confira a versão em telas pequenas (360 px) e grandes (1366 px).

## 2. Checklist de verificação
- [ ] Menu abre e fecha (inclusive no celular)
- [ ] Botões e links levam à seção correta
- [ ] Formulários validam e exibem confirmação **simulada**
- [ ] Imagens carregam e possuem texto alternativo
- [ ] Sem rolagem horizontal indesejada
- [ ] Navegação por teclado funciona

## 3. Como personalizar para um cliente real
- **Textos e serviços:** edite os arrays no `<script>` (ver README.md).
- **Fotografias:** substitua os WebP em `img/fotos/` e atualize `CREDITOS.md`
  com a nova fonte e licença.
- **Preços/valores:** altere os objetos de configuração no JavaScript.
- **Contato:** troque o número em `WHATSAPP_MOSS` e o link do rodapé.
- **Cores:** altere as variáveis CSS em `:root`.

## 4. Publicação
- Demo é independente: basta enviar a pasta inteira para o servidor.
- Use caminhos relativos para imagens e arquivos locais.
- No GitHub Pages, confirme a branch/pasta e depois verifique os links.

## 5. Dependências e limites
- HTML5, CSS3 e JavaScript puro. Sem frameworks, build ou servidor obrigatório.
- Funciona em navegadores modernos. Sem API paga ou credencial no frontend.
- Esta é uma demonstração: não processa pedidos, pagamentos nem dados reais.

## 6. Pedidos e pagamento (simulação)
- Os formulários apenas validam campos e exibem confirmação local.
- **Nenhum pedido é enviado e nenhum pagamento é aprovado.**
- Para pedidos reais: integrar WhatsApp Business, e-mail ou banco/servidor com
  autenticação e regras de acesso (RLS) para dados pessoais.
- Para cobrança real: gateway com chave secreta no servidor, confirmação por
  webhook e autenticação. Nunca expor chave privada no JavaScript público.

## 7. Créditos e licenças das fotos
As 6 fotografias ilustrativas foram obtidas via Openverse com licenças CC0,
CC BY ou CC BY-SA; fontes, autores e licenças estão em `CREDITOS.md` e
`img/fotos/fontes.json`. Elas não representam a empresa fictícia.

## 8. Status da entrega
- Demonstração funcional e testada (larguras 360/390/768/1366 px).
- 6 fotografias licenciadas e otimizadas, com créditos.
- Capa Instagram em `divulgacao/instagram/<demo>/`.
- Publicação no site oficial: somente após autorização explícita desta demo.
"""


def rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


for demo, info in DEMOS.items():
    # MANUAL.md
    pasta = CLONE / "demos" / demo
    manual = pasta / "MANUAL.md"
    manual.write_text(MANUAL.format(titulo=info["titulo"]), encoding="utf-8")
    shutil.copy2(manual, HOME / demo / "MANUAL.md")

    # Capa Instagram
    dest = CLONE / "divulgacao" / "instagram" / demo
    dest.mkdir(parents=True, exist_ok=True)
    capa = pasta / "img" / "capa-card.webp"
    shutil.copy2(capa, dest / "captura-demo.webp")

    W, H = 1080, 1350
    img = Image.new("RGB", (W, H), rgb(info["cor"]))
    with Image.open(capa) as shot:
        shot = shot.resize((1000, 625), Image.LANCZOS)
        img.paste(shot, (40, 40))
    d = ImageDraw.Draw(img)
    f_tit = ImageFont.truetype(FONTE_B, 74)
    f_sub = ImageFont.truetype(FONTE, 34)
    f_corpo = ImageFont.truetype(FONTE, 27)
    f_peq = ImageFont.truetype(FONTE, 22)

    y = 720
    d.text((60, y), info["titulo"], font=f_tit, fill=rgb(info["cor2"]))
    y += 95
    d.text((60, y), info["segmento"], font=f_sub, fill="white")
    y += 70
    # quebra de linha simples
    linha, palavras = "", info["chamada"].split()
    for p in palavras:
        teste = (linha + " " + p).strip()
        if d.textlength(teste, font=f_corpo) > 950:
            d.text((60, y), linha, font=f_corpo, fill="white")
            y += 40
            linha = p
        else:
            linha = teste
    if linha:
        d.text((60, y), linha, font=f_corpo, fill="white")
    y += 110
    d.rectangle((60, y, 1020, y + 4), fill=rgb(info["cor2"]))
    y += 40
    d.text((60, y), "Demonstração desenvolvida pela MOSS Digital", font=f_sub, fill="white")
    y += 55
    d.text((60, y), "Imagens, nomes e valores fictícios", font=f_peq, fill="#C9D6DE")
    y += 40
    d.text((60, y), "mossdigital.com.br", font=f_peq, fill=rgb(info["cor2"]))

    png = dest / f"Capa Instagram - {info['titulo']}.png"
    img.save(png, "PNG")

    # Fonte editável (SVG)
    svg = f"""<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
  <rect width="1080" height="1350" fill="{info['cor']}"/>
  <image href="captura-demo.webp" x="40" y="40" width="1000" height="625"/>
  <text x="60" y="800" font-family="Arial" font-weight="bold" font-size="74" fill="{info['cor2']}">{info['titulo']}</text>
  <text x="60" y="895" font-family="Arial" font-size="34" fill="#fff">{info['segmento']}</text>
  <text x="60" y="965" font-family="Arial" font-size="27" fill="#fff">{info['chamada']}</text>
  <rect x="60" y="1075" width="960" height="4" fill="{info['cor2']}"/>
  <text x="60" y="1140" font-family="Arial" font-size="34" fill="#fff">Demonstração desenvolvida pela MOSS Digital</text>
  <text x="60" y="1195" font-family="Arial" font-size="22" fill="#C9D6DE">Imagens, nomes e valores fictícios</text>
  <text x="60" y="1235" font-family="Arial" font-size="22" fill="{info['cor2']}">mossdigital.com.br</text>
</svg>"""
    (dest / "capa-editavel.svg").write_text(svg, encoding="utf-8")

    legenda = (
        f"{info['titulo']} — {info['segmento']}\n\n"
        f"{info['chamada']}\n\n"
        "Demonstração desenvolvida pela MOSS Digital. "
        "Imagens, nomes e valores fictícios — não representam empresa real.\n\n"
        "Saiba mais: mossdigital.com.br\n"
        "#MOSSDigital #Demonstracao #SiteSobMedida\n"
    )
    (dest / "LEGENDA E INSTRUCOES.txt").write_text(legenda, encoding="utf-8")

    # Cópia fácil de encontrar
    copia = HOME / "04 - Divulgacao" / demo
    copia.mkdir(parents=True, exist_ok=True)
    shutil.copy2(png, copia / png.name)
    shutil.copy2(dest / "LEGENDA E INSTRUCOES.txt", copia / "LEGENDA E INSTRUCOES.txt")

    print("entrega complementar:", demo)
