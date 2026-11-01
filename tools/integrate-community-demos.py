"""Integra somente os cinco IDs desta coleção, sem duplicar entradas."""
from pathlib import Path
import importlib.util
import re, json

REPO=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('builder',REPO/'tools/build-community-demos.py')
builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
collection=builder.COLLECTION
local=REPO.parent/'Demos de sites'
ids=[c['id'] for c in collection]

p=REPO/'assets/js/portfolio.js';t=p.read_text(encoding='utf-8-sig')
for c in collection:
    if re.search(r"id:\s*'"+c['id']+r"'",t):continue
    marker='\n  ];'
    pos=t.index(marker,t.index('const MODELOS'))
    entry="    { id: '%s', emoji: '%s', foto: 'demos/%s/assets/hero.svg', nome: '%s', desc: '%s', link: 'demos/%s/index.html' }" % (c['id'],c['icon'],c['id'],c['folder'],c['catalog'],c['id'])
    t=t[:pos].rstrip()+',\n'+entry+t[pos:]
t=t.replace('28 nichos','33 nichos')
p.write_text(t,encoding='utf-8')

p=REPO/'demo.html';t=p.read_text(encoding='utf-8')
t=t.replace("['tatuagem', 'assistencia', 'fretes', 'festas', 'bar']","['tatuagem', 'assistencia', 'fretes', 'festas', 'bar', 'reciclo', 'junto', 'raizfeira', 'pontocomum', 'acessoaberto']")
p.write_text(t,encoding='utf-8')

p=REPO/'modelos.html';t=p.read_text(encoding='utf-8')
filter_marker='<button type="button" data-filter="Eventos e fotografia"'
for cat in ['Utilidade pública','Empreendedorismo']:
    if f'data-filter="{cat}"' not in t:
        pos=t.index(filter_marker)
        t=t[:pos]+f'<button type="button" data-filter="{cat}" aria-pressed="false">{cat}</button>'+t[pos:]
for c in collection:
    url=f'demos/{c["id"]}/index.html'
    if f'href="{url}"' in t:continue
    card=f'''<article class="card" data-category="{c['category']}"><img loading="lazy" src="demos/{c['id']}/assets/hero.svg" alt="Ilustração autoral do modelo {c['brand']}"><div class="card-body"><span class="category">{c['category']}</span><h2>{c['brand']} — {c['folder']}</h2><p>{c['catalog']} e planejamento interativo. Dados fictícios, sem confirmação automática.</p><div class="actions"><a class="demo" href="{url}">Ver demonstração ↗</a><a class="wa" href="https://wa.me/5511942038103?text=Quero%20conhecer%20o%20modelo%20{c['id']}" target="_blank" rel="noopener noreferrer">Quero este modelo</a></div></div></article>'''
    pos=t.index('<div class="grid" id="cards">')+len('<div class="grid" id="cards">')
    t=t[:pos]+card+t[pos:]
t=t.replace('24 modelos','33 modelos').replace('28 modelos','33 modelos')
t=t.replace('class="wa"','class="quote"')
p.write_text(t,encoding='utf-8')
p=REPO/'index.html';t=p.read_text(encoding='utf-8').replace('28 modelos prontos','33 modelos prontos');p.write_text(t,encoding='utf-8')

p=local/'INDICE-DAS-DEMOS.csv';t=p.read_text(encoding='utf-8-sig').rstrip()
for c in collection:
    if f'/demos/{c["id"]}/' not in t:t+=f'\n{c["folder"]};{c["folder"]};https://mossdigital.com.br/demos/{c["id"]}/index.html'
p.write_text(t+'\n',encoding='utf-8-sig')
p=local/'ABRIR-DEMOS.html';t=p.read_text(encoding='utf-8-sig')
from urllib.parse import quote
for c in collection:
    if f'data-name="{c["folder"]}"' in t:continue
    url=f'https://mossdigital.com.br/demos/{c["id"]}/index.html'
    card=f'''<article class="card" data-name="{c['folder']}"><span class="tag">Nova · {c['category']}</span><h2>{c['brand']} — {c['folder']}</h2><p>{c['catalog']} e ferramenta de planejamento. Marca e dados fictícios.</p><a class="button" href="{quote(c['folder'])}/index.html">Abrir demo local</a><button class="button button--soft" type="button" data-copy="{url}">Copiar link</button><a class="plain-link" href="{url}" target="_blank" rel="noopener noreferrer">Ver publicado ↗</a></article>\n'''
    pos=t.rindex('</div></main>');t=t[:pos]+card+t[pos:]
p.write_text(t,encoding='utf-8')
p=local/'LEIA PRIMEIRO.txt';t=p.read_text(encoding='utf-8-sig').rstrip()
for i,c in enumerate(collection,29):
    line=f'A pasta "{c["folder"]}" é a demo {i}: {c["brand"]}, com layout exclusivo e ferramenta interativa. Leia ENTREGA-AO-CLIENTE.md antes de adaptar.'
    if f'"{c["folder"]}"' not in t:t+='\n'+line
p.write_text(t+'\n',encoding='utf-8-sig')

p=REPO/'README.md';t=p.read_text(encoding='utf-8').replace('28 nichos','33 nichos').replace('47 exemplos','52 exemplos').replace('TOTAL: 28','TOTAL: 33')
section='''

## Coleção de utilidade pública e empreendedorismo

Cinco modelos independentes com dados fictícios, ferramentas locais, páginas de privacidade e termos e checklist de implantação:

| ID | Projeto | Ferramenta funcional |
| --- | --- | --- |
| reciclo | ReCiclo — reciclagem e ecopontos | Filtros por material, peso informado e plano de descarte |
| junto | junto. — voluntariado | Filtros, seleção de oportunidades e dedicação semanal |
| raizfeira | Raiz Feira — produtores locais | Cesta, quantidades, estoque ilustrativo e consulta por WhatsApp |
| pontocomum | Ponto Comum — coworking | Estimativa por hora, capacidade, datas e lembrete .ics provisório |
| acessoaberto | Acesso Aberto — guia de acessibilidade | Filtros por recurso e roteiro sem navegação geográfica |

Arquivos em `demos/<id>/`; instruções específicas em `ENTREGA-AO-CLIENTE.md`. Cada pacote é independente e funciona sem build. Requer JavaScript para filtros e ferramentas; catálogo e políticas têm conteúdo HTML.
As ações não confirmam inscrição, reserva, pagamento ou recebimento de pedidos. Não há backend nem armazenamento persistente. Marcas, endereços, estoques e preços são fictícios.
As demos ficam com `noindex`; não devem ser adicionadas ao sitemap público como serviços reais.

O gerador `tools/build-community-demos.py` recria apenas estes cinco pacotes. Não execute sobre adaptações de clientes sem backup: ele sobrescreve os arquivos desses IDs. `tools/integrate-community-demos.py` integra a coleção ao catálogo sem duplicar entradas.
'''
if '## Coleção de utilidade pública e empreendedorismo' not in t:t+=section
p.write_text(t,encoding='utf-8')
print('Catálogo integrado: 33 demos; índices locais e links de publicação atualizados.')
