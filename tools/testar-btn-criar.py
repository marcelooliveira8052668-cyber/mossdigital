"""Verifica o botão "Criar o meu site grátis" em todos os cards de modelos.html.

- 37 cards estáticos com <a class="btn-create" href="criar/?demo=<id>">
- 6 cards criados pelo JS com o mesmo texto
- id de cada botão existe em criar/assets/mapa-demos.js
- alvo do botão existe (criar/index.html) e demo= resolve no mapa
- sem erros JS, sem overflow, visual no desktop e mobile
"""
import re
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REPO = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada')
URL = 'http://localhost:8784'
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
TEXTO = 'Criar o meu site grátis'
FALHAS = []


def checar(cond, msg):
    print(('  OK   ' if cond else '  FALHA') + ' ' + msg)
    if not cond:
        FALHAS.append(msg)


# ---------- 1. estatico (arquivo) ----------
print('=== CARDS ESTATICOS (arquivo) ===')
html = (REPO / 'modelos.html').read_text(encoding='utf-8')
mapa = (REPO / 'criar' / 'assets' / 'mapa-demos.js').read_text(encoding='utf-8')
ids = set(re.findall(r"'([a-z0-9-]+)'\s*:\s*\{", mapa))

arts = re.findall(r'<article class="card" data-category="[^"]*">.*?</article>', html, re.S)
checar(len(arts) == 37, f'37 cards estaticos (achados: {len(arts)})')

com_botao = [a for a in arts if 'btn-create' in a]
checar(len(com_botao) == 37, f'todos com btn-create ({len(com_botao)})')

hrefs = re.findall(r'<a class="btn-create" href="criar/\?demo=([^"]+)">', html)
checar(len(hrefs) == 37, f'37 hrefs btn-create ({len(hrefs)})')
checar(all(h in ids for h in hrefs), 'todos os ids existem no mapa-demos')
checar(all(TEXTO in a for a in com_botao), f'texto "{TEXTO}" em todos')

# JS do botao dinamico tambem atualizado
checar(f"criar.textContent = '{TEXTO}';" in html, 'texto do JS atualizado')
checar('Criar com este modelo' not in html, 'texto antigo removido')

# alvo do criador existe
checar((REPO / 'criar' / 'index.html').exists(), 'criar/index.html existe')

# arquivo externo (_repo-site) identico
ext = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\_repo-site\modelos.html').read_text(encoding='utf-8')
checar(ext == html, '_repo-site/modelos.html identico ao worktree')

# ---------- 2. navegador ----------
print('\n=== NAVEGADOR ===')
with sync_playwright() as p:
    nav = p.chromium.launch(executable_path=CHROME, headless=True)

    for largura, rot in [(1440, 'desktop'), (390, 'mobile')]:
        ctx = nav.new_context(viewport={'width': largura, 'height': 900})
        page = ctx.new_page()
        erros = []
        page.on('pageerror', lambda e: erros.append(str(e)))
        page.on('console', lambda m: erros.append(m.text) if m.type == 'error' else None)
        page.goto(f'{URL}/modelos.html', wait_until='networkidle')
        page.wait_for_timeout(800)  # cards do JS

        botoes = page.locator('a.btn-create')
        n = botoes.count()
        checar(n >= 43, f'{rot}: >=43 botoes (achados: {n})')

        textos = botoes.all_inner_texts()
        checar(all(TEXTO in t for t in textos), f'{rot}: todos com texto "{TEXTO}"')

        # hrefs validos
        todos = botoes.evaluate_all("els => els.map(e => e.getAttribute('href'))")
        checar(all(h and h.startswith('criar/?demo=') for h in todos), f'{rot}: hrefs criar/?demo=')

        # visiveis e nao sobrepostos
        invisiveis = page.evaluate(
            "() => [...document.querySelectorAll('a.btn-create')].filter(b => {"
            " const r = b.getBoundingClientRect();"
            "  return r.width === 0 || r.height === 0; }).length")
        checar(invisiveis == 0, f'{rot}: nenhum botao oculto ({invisiveis} ocultos)')

        # overflow
        sem_overflow = page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1")
        checar(sem_overflow, f'{rot}: sem overflow horizontal ({largura}px)')

        checar(not erros, f'{rot}: sem erros JS' + (f' -> {erros[:2]}' if erros else ''))
        ctx.close()

    # 3. clicar num botao e conferir a URL do criador
    ctx = nav.new_context(viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()
    page.goto(f'{URL}/modelos.html', wait_until='networkidle')
    page.wait_for_timeout(800)
    page.locator('a.btn-create').first.click()
    page.wait_for_load_state('networkidle')
    ok_url = '/criar/' in page.url and 'demo=' in page.url
    ok_pag = page.evaluate("() => document.title.includes('MOSS') || !!document.querySelector('[data-moss-theme]')")
    checar(ok_url, f'clique leva para o criador ({page.url})')
    checar(ok_pag, 'criador carrega (title/theme)')
    ctx.close()

    ctx = nav.new_context(viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()
    page.goto(f'{URL}/modelos.html', wait_until='networkidle')
    motors = page.locator('#cards article.card').filter(has=page.locator('a[href="demos/moss-motors/"]'))
    checar(motors.count() == 1 and motors.locator('a.btn-create').get_attribute('href') == 'criar/?demo=moss-motors',
           'MOSS Motors presente no catalogo, com link para demo e criador')
    motors.locator('a.demo').click()
    page.wait_for_url('**/demos/moss-motors/')
    checar(page.locator('.vehicle-card').count() == 6 and page.title().startswith('MOSS Motors'),
           'demo MOSS Motors abre e renderiza estoque em destaque')
    page.goto(f'{URL}/criar/?demo=moss-motors', wait_until='networkidle')
    page.locator('#creator').wait_for(state='visible')
    pronto = page.locator('input[name="produto"][value="site"]').is_checked()
    origem = page.locator('#origem-status').inner_text()
    checar(pronto and 'MOSS Motors' in origem,
           f'botao Criar da MOSS Motors prepara o criador gratuito (site={pronto}, origem={origem[:70]!r})')
    ctx.close()

    nav.close()

print('\n' + ('TUDO OK ✅' if not FALHAS else f'{len(FALHAS)} FALHAS ❌'))
for f in FALHAS:
    print('  -', f)
sys.exit(1 if FALHAS else 0)
