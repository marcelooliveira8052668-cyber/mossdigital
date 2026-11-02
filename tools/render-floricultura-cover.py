"""Atualiza a captura da demo e renderiza sua capa Instagram, sem publicar.

Requer Playwright para Python, Chrome/Edge e ffmpeg no PATH.
Use --overwrite apenas para regenerar os arquivos conhecidos desta demo.
"""
import argparse
import asyncio
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from pathlib import Path
import shutil
import subprocess
from threading import Thread

from playwright.async_api import async_playwright

REPO = Path(__file__).resolve().parent.parent
SOCIAL = REPO / 'divulgacao/instagram/floricultura'
COVER = SOCIAL / 'Capa Instagram - Flora e Afeto.png'
THUMBNAIL = REPO / 'assets/img/previas/floricultura.webp'


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


async def render(base, browser_path, output, overwrite):
    for path in [COVER, THUMBNAIL, output / COVER.name]:
        if path.exists() and not overwrite:
            raise FileExistsError(f'Arquivo existente, preservado: {path}. Use --overwrite para regenerar.')
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=browser_path)
        page = await browser.new_page(viewport={'width': 1600, 'height': 1000}, device_scale_factor=1, reduced_motion='reduce')
        await page.goto(base + 'demos/floricultura/', wait_until='networkidle')
        capture = await page.screenshot(type='png')
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y' if overwrite else '-n', '-i', 'pipe:0', '-frames:v', '1', '-c:v', 'libwebp', '-quality', '85', str(THUMBNAIL)], input=capture, check=True)
        await page.set_viewport_size({'width': 1080, 'height': 1350})
        await page.goto(base + 'divulgacao/instagram/floricultura/Capa%20Instagram%20-%20Flora%20e%20Afeto.html', wait_until='networkidle')
        await page.wait_for_function('Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)')
        metrics = await page.evaluate('''() => {
            const items = Array.from(document.querySelector('.cover').children).map(el => ({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom}));
            return {height:document.documentElement.scrollHeight,width:document.documentElement.scrollWidth,items};
        }''')
        assert metrics['height'] == 1350 and metrics['width'] == 1080, metrics
        assert all(item['top'] >= 0 and item['bottom'] <= 1350 for item in metrics['items']), metrics
        assert all(metrics['items'][i]['bottom'] <= metrics['items'][i+1]['top'] + 1 for i in range(len(metrics['items']) - 1)), 'Elementos sobrepostos na capa'
        await page.screenshot(path=str(COVER))
        await browser.close()
    output.mkdir(parents=True, exist_ok=True)
    shutil.copy2(COVER, output / COVER.name)
    shutil.copy2(SOCIAL / 'LEGENDA E INSTRUCOES.txt', output / 'LEGENDA E INSTRUCOES.txt')
    print(f'CAPA_PRONTA: {COVER}\nCOPIA_PARA_O_USUARIO: {output / COVER.name}')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--browser-path', default=None)
    parser.add_argument('--overwrite', action='store_true')
    args = parser.parse_args()
    candidates = [
        Path(os.environ.get('PROGRAMFILES', 'C:/Program Files')) / 'Google/Chrome/Application/chrome.exe',
        Path(os.environ.get('PROGRAMFILES(X86)', 'C:/Program Files (x86)')) / 'Microsoft/Edge/Application/msedge.exe',
    ]
    browser_path = args.browser_path or next((str(path) for path in candidates if path.exists()), None)
    if not browser_path:
        parser.error('Informe --browser-path com o caminho do Chrome ou Edge.')
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(REPO)))
    Thread(target=server.serve_forever, daemon=True).start()
    try:
        asyncio.run(render(f'http://127.0.0.1:{server.server_port}/', browser_path, args.output, args.overwrite))
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
