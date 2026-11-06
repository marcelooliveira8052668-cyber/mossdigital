"""Renderiza as 20 capas do layout compartilhado (demo-cover.css) com o botao CTA.

Capas: casamento, contabilidade, estrutura, floricultura, otica (1 cada) e
fotos-reais (15 via ?demo=slug). Regenera os PNGs em divulgacao/instagram/.
Nao publica; os PNGs sao copiados depois para _repo-site.

Uso: python tools/renderizar-capas-botao.py [--dry]
"""
import asyncio
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread

from playwright.async_api import async_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REPO = Path(__file__).resolve().parent.parent
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
DRY = '--dry' in sys.argv

SINGLES = [
    ('casamento', 'Capa Instagram.html', 'Capa Instagram - Casamento.png'),
    ('contabilidade', 'Capa Instagram.html', 'Capa Instagram - Contabilidade.png'),
    ('estrutura', 'Capa Instagram.html', 'Capa Instagram - Estrutura.png'),
    ('floricultura', 'Capa Instagram - Flora e Afeto.html', 'Capa Instagram - Flora e Afeto.png'),
    ('otica', 'Capa Instagram.html', 'Capa Instagram - Otica.png'),
]
SLUGS = ['acessoaberto', 'assistencia', 'bar', 'casamento', 'contabilidade',
         'entrelares', 'festas', 'floricultura', 'fretes', 'junto',
         'pontocomum', 'raizfeira', 'reciclo', 'restaurante360', 'tatuagem']


class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


async def render(base, browser):
    context = await browser.new_context(
        viewport={'width': 1080, 'height': 1350}, device_scale_factor=1,
        reduced_motion='reduce')
    page = await context.new_page()
    falhas, total = [], 0

    tarefas = [
        (f'divulgacao/instagram/{pasta}/{html}',
         f'divulgacao/instagram/{pasta}/{png}')
        for pasta, html, png in SINGLES
    ] + [
        (f'divulgacao/instagram/fotos-reais/Capa%20Instagram.html?demo={slug}',
         f'divulgacao/instagram/fotos-reais/Capa Instagram - {slug}.png')
        for slug in SLUGS
    ]

    for url_rel, png_rel in tarefas:
        destino = REPO / png_rel
        if not destino.exists():
            falhas.append(f'PNG de destino ausente: {png_rel}')
            continue
        resp = await page.goto(base + url_rel, wait_until='networkidle')
        if not resp or resp.status != 200:
            falhas.append(f'{url_rel}: HTTP {resp.status if resp else "?"}')
            continue
        # fotos-reais espera o carregamento assincrono do catalogo
        if 'demo=' in url_rel:
            await page.wait_for_function(
                'document.body.dataset.ready === "true"', timeout=15000)
        await page.wait_for_function(
            'Array.from(document.images).every(i => i.complete && i.naturalWidth > 0)',
            timeout=15000)
        m = await page.evaluate('''() => ({
            w: document.documentElement.scrollWidth,
            h: document.documentElement.scrollHeight,
            itens: Array.from(document.querySelector('.cover').children)
                .map(el => { const r = el.getBoundingClientRect();
                             return {top: r.top, bottom: r.bottom}; })})''')
        problemas = []
        if m['w'] != 1080 or m['h'] != 1350:
            problemas.append(f"paginA {m['w']}x{m['h']}")
        if any(i['top'] < -0.5 or i['bottom'] > 1350.5 for i in m['itens']):
            problemas.append('conteudo fora de 1350px (cortado)')
        if any(m['itens'][k]['bottom'] > m['itens'][k + 1]['top'] + 1
               for k in range(len(m['itens']) - 1)):
            problemas.append('irmãos sobrepostos')
        if problemas:
            falhas.append(f'{png_rel}: ' + '; '.join(problemas))
            continue
        if DRY:
            print(f'  [dry] {png_rel}')
        else:
            await page.screenshot(path=str(destino))
            print(f'  ok  {png_rel}')
        total += 1

    await context.close()
    return total, falhas


def main():
    servidor = ThreadingHTTPServer(
        ('127.0.0.1', 0), partial(Handler, directory=str(REPO)))
    Thread(target=servidor.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{servidor.server_port}/'
    try:
        asyncio.run(asyncio_main(base))
    finally:
        servidor.shutdown()
        servidor.server_close()


async def asyncio_main(base):
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=CHROME, headless=True)
        total, falhas = await render(base, browser)
        await browser.close()
    print(f'\n{total}/20 renderizadas' + (' (dry)' if DRY else ''))
    if falhas:
        print('FALHAS:')
        for f in falhas:
            print('  -', f)
        sys.exit(1)
    print('TUDO OK')


if __name__ == '__main__':
    main()
