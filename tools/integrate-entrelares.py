"""Integra a demo EntreLares ao catalogo e aos indices locais, sem duplicar entradas."""
from pathlib import Path
from urllib.parse import quote

repo=Path(__file__).resolve().parents[1];root=repo.parent;local=root/'Demos de sites'
folder='EntreLares - Agencia de Profissionais';url='https://mossdigital.com.br/demos/entrelares/index.html'

p=repo/'README.md';t=p.read_text(encoding='utf-8')
t=t.replace('**53 exemplos**','**54 exemplos**').replace('33 nichos\ndo catálogo + 20 projetos independentes','34 nichos\ndo catálogo + 20 projetos independentes').replace('Além dos 33 nichos gerados pelo template','Além dos 34 nichos gerados pelo template')
section='''

## EntreLares — Profissionais para sua casa

Site demonstrativo em `demos/entrelares/` para encontrar um trabalhador em casa — diarista, passadeira, cozinheira, organização e auxiliar — com uma agência fictícia conduzindo a seleção e o cliente contratando diretamente o profissional.

- Vitrine e dois formulários guiados: `demos/entrelares/index.html`.
- Implantação e limitações: `demos/entrelares/ENTREGA-AO-CLIENTE.md`.
- Dados para personalizar: `demos/entrelares/DADOS-DO-CLIENTE.txt`.
- Validação de demanda antes de vender: `demos/entrelares/VALIDACAO-COMERCIAL.txt`.
- Testes no Edge: `node tools/test-entrelares.cjs` (Windows, Node com WebSocket global).
- Capa e legenda: `divulgacao/instagram/entrelares/`.

Marca e dados fictícios. Não há agência em funcionamento, candidatos, vagas, banco de currículos, contratação ou envio automático: os formulários montam um resumo local e o contato é com a MOSS Digital. Segurança privada, saúde e contratação de menores ficam fora do escopo. Não incluir esta demonstração no sitemap de páginas comerciais reais.
'''
if '## EntreLares — Agência de Profissionais' not in t:t+=section
p.write_text(t,encoding='utf-8')

p=repo/'assets/js/portfolio.js';t=p.read_text(encoding='utf-8')
t=t.replace('MODELOS PRONTOS — 33 nichos do template, abrem no demo.html','MODELOS PRONTOS — 34 nichos do catálogo; os exclusivos têm link próprio')
if "id: 'entrelares'" not in t:
    entry="    { id: 'entrelares', emoji: '🤝', foto: 'demos/entrelares/assets/hero.svg', nome: 'Profissionais para Casa', desc: 'Diarista, passadeira, cozinheira e organização para a sua casa', link: 'demos/entrelares/index.html' },\n"
    marker="link: 'demos/acessoaberto/index.html' }\n"
    assert marker in t;t=t.replace(marker,"link: 'demos/acessoaberto/index.html' },\n"+entry,1)
p.write_text(t,encoding='utf-8')

p=repo/'demo.html';t=p.read_text(encoding='utf-8')
old="'pontocomum', 'acessoaberto']"
if "'entrelares'" not in t and old in t:t=t.replace(old,"'pontocomum', 'acessoaberto', 'entrelares']",1)
p.write_text(t,encoding='utf-8')

p=repo/'modelos.html';t=p.read_text(encoding='utf-8')
if 'href="demos/entrelares/index.html"' not in t:
    card='<article class="card" data-category="Serviços"><img loading="lazy" src="demos/entrelares/assets/hero.svg" alt="Ilustração autoral do modelo EntreLares"><div class="card-body"><span class="category">Serviços</span><h2>EntreLares - Profissionais para sua casa</h2><p>Peça um trabalhador para casa: diarista, passadeira, cozinheira e organização, com dois caminhos guiados. Marca e dados fictícios, sem contratação automática.</p><div class="actions"><a class="demo" href="demos/entrelares/index.html">Ver demonstração ↗</a><a class="quote" href="https://wa.me/5511942038103?text=Quero%20conhecer%20o%20modelo%20entrelares" target="_blank" rel="noopener noreferrer">Quero este modelo</a></div></div></article>'
    marker='<div class="grid" id="cards">';t=t.replace(marker,marker+card,1)
p.write_text(t,encoding='utf-8')

p=repo/'tools/README.md';t=p.read_text(encoding='utf-8')
if 'build-entrelares.py' not in t:
    t=t.rstrip()+'''

## Demo EntreLares (agência de recrutamento)

1. `python tools/build-entrelares.py` — recria `demos/entrelares/` (não altera `assets/app.js`).
2. `node tools/test-entrelares.cjs` — valida as duas jornadas em Edge e grava `TESTES-NAVEGADOR.json`.
3. `python tools/package-entrelares.py` — gera a imagem social, a capa 1080 × 1350, a cópia local e o ZIP.
4. `python tools/integrate-entrelares.py` — integra ao catálogo e aos índices locais, sem duplicar entradas.

**Atenção:** o gerador sobrescreve os arquivos de `demos/entrelares/` (exceto `assets/app.js`, que é mantido à parte). Não execute sobre adaptações de clientes sem backup.
'''
p.write_text(t,encoding='utf-8')

p=local/'INDICE-DAS-DEMOS.csv';t=p.read_text(encoding='utf-8-sig').rstrip()
if 'entrelares' not in t:t+='\n'+folder+';'+folder+';'+url
p.write_text(t+'\n',encoding='utf-8-sig')

p=local/'ABRIR-DEMOS.html';t=p.read_text(encoding='utf-8')
if f'data-name="{folder}"' not in t:
    card=f'''<article class="card" data-name="{folder}"><span class="tag">Nova · Serviços</span><h2>EntreLares - Agência de Profissionais</h2><p>Recrutamento e seleção para residências e pequenos negócios, com caminhos para contratar e para apresentar trabalho. Marca e dados fictícios.</p><a class="button" href="{quote(folder)}/index.html">Abrir demo local</a><button class="button button--soft" type="button" data-copy="{url}">Copiar link</button><a class="plain-link" href="{url}" target="_blank" rel="noopener noreferrer">Ver publicado ↗</a></article>\n'''
    at=t.rindex('</div></main>');t=t[:at]+card+t[at:]
p.write_text(t,encoding='utf-8')

p=local/'LEIA PRIMEIRO.txt';t=p.read_text(encoding='utf-8-sig').rstrip()
if folder not in t:t+='\nA pasta "'+folder+'" é a demo 34: agência de recrutamento fictícia com dois formulários guiados (preciso contratar / quero trabalhar). Leia ENTREGA-AO-CLIENTE.md antes de adaptar.'
p.write_text(t+'\n',encoding='utf-8-sig')
print('EntreLares integrada ao catalogo e aos indices locais.')
