"""Testa as 4 tarefas rápidas: 404, privacidade, botão fixo do zap, links no rodapé e sitemap."""
import sys
import xml.etree.ElementTree as ET
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada')
URL = 'http://localhost:8784'
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
FALHAS = []


def checar(cond, msg):
    print(('  OK   ' if cond else '  FALHA') + ' ' + msg)
    if not cond:
        FALHAS.append(msg)


# ---------- 1. sitemap.xml ----------
print('=== SITEMAP ===')
try:
    raiz = ET.parse(BASE / 'sitemap.xml').getroot()
    ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    locs = [u.find('s:loc', ns).text for u in raiz.findall('s:url', ns)]
    checar(len(locs) == len(set(locs)), f'sem URLs duplicadas ({len(locs)} URLs)')
    checar(not any('moss-cardapio' in l for l in locs), 'moss-cardapio removido')
    for extra in ['privacidade.html', 'site-de-turismo/', 'agenda-pro/', 'moss-burger-online/', 'fotos-amigos/']:
        checar(any(extra in l for l in locs), f'contém {extra}')
    # todo URL local deve existir
    for l in locs:
        caminho = l.replace('https://mossdigital.com.br/', '')
        alvo = BASE / caminho
        if caminho.endswith('/'):
            alvo = alvo / 'index.html'
        checar(alvo.exists(), f'existe no repo: {caminho}')
except Exception as erro:
    checar(False, f'XML válido ({erro})')

# ---------- 2. páginas novas ----------
print('\n=== PAGINAS NOVAS (conteudo) ===')
h404 = (BASE / '404.html').read_text(encoding='utf-8')
checar('noindex' in h404, '404: noindex')
checar('href="/"' in h404 and 'href="/modelos.html"' in h404, '404: caminhos absolutos')
checar('zap-flutuante' in h404, '404: botão fixo')
checar('moss-futurista.css' in h404, '404: CSS da MOSS')

priv = (BASE / 'privacidade.html').read_text(encoding='utf-8')
checar('index, follow' in priv, 'privacidade: indexável')
checar('Google Analytics' in priv and 'pixel' in priv, 'privacidade: afirma sem analytics')
checar('moss-digital-theme' in priv, 'privacidade: menciona localStorage do tema')
checar('30 dias' in priv, 'privacidade: retenção 30 dias')
checar('5511942038103' in priv, 'privacidade: contato LGPD')
checar('zap-flutuante' in priv, 'privacidade: botão fixo')

# ---------- 3. navegador ----------
print('\n=== NAVEGADOR ===')
with sync_playwright() as p:
    nav = p.chromium.launch(executable_path=CHROME, headless=True)

    for pagina in ['index.html', 'modelos.html', 'sistemas.html', 'estrutura.html', 'privacidade.html', '404.html']:
        ctx = nav.new_context(viewport={'width': 1440, 'height': 900})
        page = ctx.new_page()
        erros = []
        page.on('pageerror', lambda e: erros.append(str(e)))
        page.on('console', lambda m: erros.append(m.text) if m.type == 'error' else None)
        page.goto(f'{URL}/{pagina}', wait_until='networkidle')

        zap = page.locator('.zap-flutuante')
        checar(zap.count() == 1, f'{pagina}: 1 botão fixo')
        visivel = zap.is_visible()
        checar(visivel, f'{pagina}: botão visível')
        if visivel:
            zi = page.evaluate("getComputedStyle(document.querySelector('.zap-flutuante')).zIndex")
            checar(zi == '901', f'{pagina}: z-index={zi} (esperado 901)')
            href = zap.get_attribute('href')
            checar('wa.me/5511942038103' in href, f'{pagina}: link wa.me correto')
            # fora da viewport?
            box = zap.bounding_box()
            dentro = box and box['x'] >= 0 and box['y'] >= 0 and box['x'] + box['width'] <= 1441 and box['y'] + box['height'] <= 901
            checar(bool(dentro), f'{pagina}: botão dentro da viewport desktop')

        # link Privacidade no rodapé
        tem_priv = page.evaluate("() => { const f = document.querySelector('footer'); return !!f && f.innerHTML.includes('privacidade.html'); }")
        checar(tem_priv, f'{pagina}: link Privacidade no rodapé')

        # overflow horizontal
        sem_overflow = page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1")
        checar(sem_overflow, f'{pagina}: sem overflow horizontal (1440px)')

        checar(not erros, f'{pagina}: sem erros JS/console' + (f' -> {erros[:2]}' if erros else ''))
        ctx.close()

    # mobile 390 e 320 (só páginas principais)
    for largura in [390, 320]:
        for pagina in ['index.html', 'modelos.html', '404.html']:
            ctx = nav.new_context(viewport={'width': largura, 'height': 844})
            page = ctx.new_page()
            page.goto(f'{URL}/{pagina}', wait_until='networkidle')
            sem_overflow = page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1")
            checar(sem_overflow, f'{pagina}: sem overflow ({largura}px)')
            box = page.locator('.zap-flutuante').bounding_box()
            dentro = box and box['x'] >= -1 and box['x'] + box['width'] <= largura + 1
            checar(bool(dentro), f'{pagina}: botão dentro da tela ({largura}px)')
            ctx.close()

    # página 404 direto (o http.server local não reescreve para 404.html;
    # no GitHub Pages sim — aqui validamos a página em si)
    ctx = nav.new_context(viewport={'width': 1440, 'height': 900})
    page = ctx.new_page()
    page.goto(f'{URL}/404.html', wait_until='networkidle')
    tem_404 = page.evaluate("document.body.innerText.includes('Página não encontrada')")
    checar(tem_404, '404.html: título correto')
    logo_ok = page.evaluate("() => { const i = document.querySelector('.brand-logo'); return !!(i && i.complete && i.naturalWidth > 0); }")
    checar(bool(logo_ok), '404: logo carrega (caminho absoluto)')
    link_raiz = page.evaluate("() => !!document.querySelector('a[href=\"/\"]')")
    checar(link_raiz, '404: link para / (caminho absoluto)')
    ctx.close()

    nav.close()

print('\n' + ('TUDO OK ✅' if not FALHAS else f'{len(FALHAS)} FALHAS ❌'))
for f in FALHAS:
    print('  -', f)
sys.exit(1 if FALHAS else 0)
