"""Integra o projeto independente sem aumentar a contagem de presets de segmentos."""
from pathlib import Path
from urllib.parse import quote

repo=Path(__file__).resolve().parents[1];root=repo.parent;local=root/'02 - Demos de sites'
p=repo/'README.md';t=p.read_text(encoding='utf-8')
t=t.replace('**52 exemplos**','**53 exemplos**').replace('33 nichos\ndo template + 19 projetos reais','33 nichos\ndo catálogo + 20 projetos independentes').replace('## Os 19 projetos reais do portfólio','## Os 20 projetos independentes do portfólio').replace('**19 projetos que existem','**20 projetos que existem')
section='''

## Restaurante 360 — Brasa & Oliva

Projeto independente em `restaurante-360/` para demonstrar uma operação mista de à la carte, buffet por peso e rodízio. Não adiciona um preset genérico: possui vitrine, painel e regras próprios.

- Site público: `restaurante-360/index.html`.
- Operação: `restaurante-360/painel.html`.
- Implantação e limitações: `restaurante-360/ENTREGA-AO-CLIENTE.md`.
- Dados para personalizar: `restaurante-360/DADOS-DO-CLIENTE.txt`.
- Testes de regras: `node restaurante-360/engine.test.cjs`.
- Testes no Edge: `node restaurante-360/browser.test.cjs` (Windows, Node com WebSocket global).
- Capa e legenda: `divulgacao/instagram/restaurante360/`.

São registros locais fictícios. Perfis são de interface, não autenticação. Não há banco de dados central, sincronização entre aparelhos, pagamento real, estorno ou emissão fiscal. Operação de restaurante real requer infraestrutura e integrações próprias. Não incluir esta demonstração no sitemap de páginas comerciais reais.
'''
if '## Restaurante 360 — Brasa & Oliva' not in t:t+=section
p.write_text(t,encoding='utf-8')

p=repo/'modelos.html';t=p.read_text(encoding='utf-8')
if 'href="restaurante-360/"' not in t:
    card='''<article class="card" data-category="Alimentação"><img src="restaurante-360/assets/social.png" width="1200" height="630" alt="Vitrine do modelo Restaurante 360" loading="lazy"><div class="card-body"><span class="category">Alimentação · projeto independente</span><h2>Restaurante 360 — à la carte, buffet e rodízio</h2><p>Site com identidade própria e painel de salão, cozinha/bar, caixa e estoque. Operação demonstrativa local, sem pagamentos ou sincronização reais.</p><div class="actions"><a class="demo" href="restaurante-360/">Conhecer o restaurante ↗</a><a class="quote" href="restaurante-360/painel.html">Testar operação ↗</a></div></div></article>'''
    marker='<div class="grid" id="cards">';t=t.replace(marker,marker+card,1)
p.write_text(t,encoding='utf-8')

folder='Restaurante 360 - Operacao Mista';url='https://mossdigital.com.br/restaurante-360/'
p=local/'INDICE-DAS-DEMOS.csv';t=p.read_text(encoding='utf-8-sig').rstrip()
if 'restaurante-360/' not in t:t+='\n'+folder+';'+folder+';'+url
p.write_text(t+'\n',encoding='utf-8-sig')
p=local/'ABRIR-DEMOS.html';t=p.read_text(encoding='utf-8-sig')
if f'data-name="{folder}"' not in t:
    card=f'''<article class="card" data-name="{folder}"><span class="tag">Projeto independente · operação mista</span><h2>Restaurante 360 — Brasa &amp; Oliva</h2><p>À la carte, buffet por peso, rodízio, salão, cozinha/bar, caixa e estoque. Demonstração local; não opera pagamentos ou emissão fiscal.</p><a class="button" href="{quote(folder)}/index.html">Abrir site local</a><a class="button button--soft" href="{quote(folder)}/painel.html">Testar operação local</a><button class="button button--soft" type="button" data-copy="{url}">Copiar link</button><a class="plain-link" href="{url}" target="_blank" rel="noopener noreferrer">Abrir site publicado ↗</a></article>\n'''
    at=t.rindex('</div></main>');t=t[:at]+card+t[at:]
p.write_text(t,encoding='utf-8')
p=local/'LEIA PRIMEIRO.txt';t=p.read_text(encoding='utf-8-sig').rstrip()
if folder not in t:t+='\nO projeto independente "'+folder+'" reúne site e painel demonstrativo. Abra index.html para apresentar ou painel.html para simular a operação. Leia ENTREGA-AO-CLIENTE.md antes de vender como implantação real.'
p.write_text(t+'\n',encoding='utf-8-sig')
print('Restaurante 360 integrado ao catálogo de sistemas e aos índices locais.')
