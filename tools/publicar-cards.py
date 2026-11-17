"""Adiciona 3 cards ao catálogo e atualiza o contador. Nada é enviado ao remoto."""
from pathlib import Path

INDEX = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\index.html")


def card(categoria, nome, href, capa, alt, descricao):
    wa = ("https://wa.me/5511942038103?text=Ol%C3%A1!%20Gostaria%20de%20um%20site%20como%20a%20demo%20" +
          nome.replace(" ", "%20") + ".")
    return (
        f'<article class="demo-card" data-category="{categoria}">\n'
        f'                   <a class="demo-cover" href="{href}" target="_blank" rel="noopener noreferrer" aria-label="Abrir demo: {nome}"><img src="{capa}" width="1200" height="750" alt="{alt}" loading="lazy" decoding="async"></a>\n'
        f'                   <div class="demo-body"><span class="demo-category">{categoria}</span><h3>{nome}</h3>\n'
        f'                   <details class="demo-details"><summary>Sobre esta demo</summary><p>{descricao}</p></details>\n'
        f'                   <div class="demo-actions"><a href="{href}" target="_blank" rel="noopener noreferrer">Abrir demo <span aria-hidden="true">↗</span></a><a href="{wa}" target="_blank" rel="noopener noreferrer">Quero um assim</a></div></div></article>\n'
    )


ACESSO = card(
    "Utilidade pública", "ACESSO PRIME — Acessibilidade inclusiva",
    "/demos/acesso-prime/index.html", "/demos/acesso-prime/img/capa-card.webp",
    "Captura da própria demonstração ACESSO PRIME, em azul e amarelo de alto contraste",
    "Conheça adaptações de rampas, corrimãos e sinalização, compare ambientes antes e depois e faça um checklist de necessidades. Site com alto contraste e navegação por teclado. Fotos ilustrativas licenciadas."
)
INSPECT = card(
    "Serviços", "INSPECT PRIME — Inspeção predial",
    "/demos/inspect-prime/index.html", "/demos/inspect-prime/img/capa-card.webp",
    "Captura da própria demonstração INSPECT PRIME, em azul-profundo e cobre",
    "Acompanhe imóveis fictícios, registre ocorrências por prioridade e gere um relatório visual de exemplo. Relatórios sem valor de laudo técnico oficial. Fotos ilustrativas licenciadas."
)
RESTAURA = card(
    "Serviços", "RESTAURA PRIME — Restauração de móveis",
    "/demos/restaura-prime/index.html", "/demos/restaura-prime/img/capa-card.webp",
    "Captura da própria demonstração RESTAURA PRIME, em madeira e verde-oliva",
    "Compare o antes e depois de cadeiras, mesas e armários restaurados. Veja as etapas do trabalho e solicite um orçamento demonstrativo. Fotos ilustrativas licenciadas."
)

ANCoras = [
    (ACESSO, 'href="/demo.html?preset=advocacia'),
    (INSPECT, 'href="/demos/jardim-secreto/'),
    (RESTAURA, 'href="/restaurante-360/'),
]

html = INDEX.read_text(encoding="utf-8")

for card_html, ancora in ANCoras:
    if 'href="' + card_html.split('href="')[1].split('"')[0] in html:
        print("ja presente, pulando:", ancora)
        continue
    pos = html.find(ancora)
    if pos == -1:
        raise SystemExit("ancora nao encontrada: " + ancora)
    inicio = html.rfind('<article class="demo-card"', 0, pos)
    if inicio == -1:
        raise SystemExit("article anterior nao encontrado: " + ancora)
    html = html[:inicio] + card_html + html[inicio:]
    print("card inserido antes de:", ancora)

html = html.replace("139 modelos de sites disponíveis", "142 modelos de sites disponíveis")
INDEX.write_text(html, encoding="utf-8")
print("contador atualizado para 142")
