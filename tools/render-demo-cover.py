"""Renderiza captura e capa de uma prévia local, sem publicar.

Requer Playwright para Python, Chrome ou Edge e ffmpeg no PATH.
Exemplo: --slug casamento --page demos/casamento/index.html --output PASTA
"""
import argparse
import asyncio
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from pathlib import Path
import re
import shutil
import subprocess
from threading import Thread
from playwright.async_api import async_playwright

REPO = Path(__file__).resolve().parent.parent

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

async def render(base, args, browser_path):
    social = REPO / 'divulgacao/instagram' / args.slug
    thumb = REPO / 'assets/img/previas' / (args.slug + '.webp')
    cover = social / ('Capa Instagram - ' + args.slug.title() + '.png')
    source = social / 'Capa Instagram.html'
    assert source.exists(), source
    for path in [thumb, cover, args.output / cover.name]:
        if path.exists() and not args.overwrite:
            raise FileExistsError(f'Arquivo existente, preservado: {path}. Para regenerar, use --overwrite.')
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=browser_path)
        context = await browser.new_context(viewport={'width': 1600, 'height': 1000}, device_scale_factor=1, reduced_motion='reduce', color_scheme='dark')
        page = await context.new_page()
        response = await page.goto(base + args.page, wait_until='networkidle')
        assert response.status == 200
        image = await page.screenshot(type='png')
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y' if args.overwrite else '-n', '-i', 'pipe:0', '-frames:v', '1', '-c:v', 'libwebp', '-quality', '85', str(thumb)], input=image, check=True)
        await page.set_viewport_size({'width': 1080, 'height': 1350})
        await page.goto(base + f'divulgacao/instagram/{args.slug}/Capa%20Instagram.html', wait_until='networkidle')
        await page.wait_for_function('Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)')
        metrics = await page.evaluate('''() => ({width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,items:Array.from(document.querySelector('.cover').children).map(el=>({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom}))})''')
        assert metrics['width'] == 1080 and metrics['height'] == 1350, metrics
        assert all(item['top'] >= 0 and item['bottom'] <= 1350 for item in metrics['items']), metrics
        assert all(metrics['items'][i]['bottom'] <= metrics['items'][i+1]['top'] + 1 for i in range(len(metrics['items']) - 1)), metrics
        await page.screenshot(path=str(cover))
        await browser.close()
    args.output.mkdir(parents=True, exist_ok=True)
    shutil.copy2(cover, args.output / cover.name)
    shutil.copy2(social / 'LEGENDA E INSTRUCOES.txt', args.output / 'LEGENDA E INSTRUCOES.txt')
    print(f'CAPA_PRONTA: {args.output / cover.name}')

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--slug', required=True)
    parser.add_argument('--page', required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--overwrite', action='store_true')
    parser.add_argument('--browser-path')
    args = parser.parse_args()
    if not re.fullmatch('[a-z0-9-]+', args.slug):
        parser.error('Slug inválido.')
    target = (REPO / args.page).resolve()
    if not target.is_relative_to(REPO) or target.suffix != '.html' or not target.exists():
        parser.error('A página deve ser um HTML existente dentro do repositório.')
    args.page = target.relative_to(REPO).as_posix()
    candidates = [Path(os.environ.get('PROGRAMFILES', 'C:/Program Files')) / 'Google/Chrome/Application/chrome.exe', Path(os.environ.get('PROGRAMFILES(X86)', 'C:/Program Files (x86)')) / 'Microsoft/Edge/Application/msedge.exe']
    browser_path = args.browser_path or next((str(path) for path in candidates if path.exists()), None)
    if not browser_path:
        parser.error('Informe --browser-path.')
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Handler, directory=str(REPO)))
    Thread(target=server.serve_forever, daemon=True).start()
    try:
        asyncio.run(render(f'http://127.0.0.1:{server.server_port}/', args, browser_path))
    finally:
        server.shutdown(); server.server_close()

if __name__ == '__main__':
    main()
