"""Verifica a página inicial local sem enviar contatos nem publicar alterações.

Requer Python + Playwright e Chrome ou Edge instalado.
Uso: python tools/test-home.py --output DIRETORIO_DE_RELATORIOS
"""

import argparse
import asyncio
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
from threading import Thread
from urllib.parse import unquote, urlsplit

from playwright.async_api import async_playwright

REPO = Path(__file__).resolve().parent.parent


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


async def test(base, output, browser_path, axe_path):
    checks = []
    errors = []
    failed = []
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=browser_path)
        context = await browser.new_context(reduced_motion='reduce')
        page = await context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('response', lambda response: failed.append(response.url) if response.status >= 400 and response.url.startswith(base) else None)
        requests = []
        page.on('request', lambda request: requests.append(request.url))
        await page.set_viewport_size({'width': 1440, 'height': 1000})
        await page.goto(base, wait_until='networkidle')
        await page.evaluate('document.fonts.ready')
        assert await page.locator('h1').count() == 1
        assert await page.locator('main').count() == 1
        assert await page.locator('#modelos .card').count() == 6
        assert await page.locator('#modelos .card .card-actions a').count() == 12
        assert await page.locator('video').count() == 1
        assert await page.locator('.hero video').count() == 1
        checks.append('vídeo único no topo, dentro da seção principal de apresentação')
        ids = await page.locator('[id]').evaluate_all('(els) => els.map(el => el.id)')
        assert len(ids) == len(set(ids)), 'IDs duplicados'
        json.loads(await page.locator('script[type="application/ld+json"]').inner_text())
        checks.append('semântica, seis projetos, doze ações e metadados válidos')

        links = await page.locator('a[href], img[src], link[href], source[src], track[src], video[poster]').evaluate_all('''els => els.map(el => el.getAttribute('href') || el.getAttribute('src') || el.getAttribute('poster'))''')
        for link in links:
            parsed = urlsplit(link)
            if parsed.scheme or parsed.netloc:
                continue
            if parsed.path:
                # Caminho absoluto (ex.: /criar/) resolve dentro do repositório.
                target = REPO / unquote(parsed.path).lstrip('/')
                assert target.exists(), f'Recurso local ausente: {link}'
                if target.is_dir():
                    assert (target / 'index.html').exists(), f'Índice ausente: {link}'
            elif parsed.fragment:
                assert await page.locator('[id]').evaluate_all('(els, id) => els.some(el => el.id === id)', unquote(parsed.fragment)), f'Âncora ausente: {link}'
        for link in await page.locator('a[href*="wa.me"]').evaluate_all('(els) => els.map(el => el.href)'):
            assert urlsplit(link).path == '/5511942038103'
        checks.append('arquivos, imagens, âncoras e número do WhatsApp conferidos sem enviar mensagens')

        assert not any('.mp4' in url for url in requests), 'Vídeo baixado antes de interação'
        assert await page.locator('video').get_attribute('autoplay') is None
        assert await page.locator('video').get_attribute('preload') == 'none'
        assert await page.locator('video').evaluate('(v) => v.paused')
        checks.append('vídeo não inicia nem baixa automaticamente')

        await page.keyboard.press('Tab')
        assert await page.locator('.skip-link').evaluate('(el) => el === document.activeElement')
        await page.keyboard.press('Enter')
        assert urlsplit(page.url).fragment == 'conteudo'
        summary = page.locator('.faq-list summary').first
        await summary.focus()
        await page.keyboard.press('Enter')
        assert await summary.locator('..').get_attribute('open') is not None
        await page.keyboard.press('Enter')
        assert await summary.locator('..').get_attribute('open') is None
        await summary.evaluate('(el) => el.blur()')
        checks.append('atalho de conteúdo e dúvidas operáveis por teclado')

        for width in [1440, 1024, 768, 390, 320]:
            await page.set_viewport_size({'width': width, 'height': 900})
            await page.evaluate('window.scrollTo(0, 0)')
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Transbordamento em {width}px'
            await page.locator('.home-contact').scroll_into_view_if_needed()
            await page.wait_for_function('Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)')
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Transbordamento no rodapé em {width}px'
            if width in (1440, 390):
                await page.screenshot(path=str(output / f'pagina-inicial-{width}.png'), full_page=True, animations='disabled')
        checks.append('imagens carregadas e sem rolagem horizontal em 320, 390, 768, 1024 e 1440px')

        if axe_path:
            await page.add_script_tag(path=str(axe_path))
            audit = await page.evaluate('''async () => {
                const result = await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'best-practice']}});
                return {violations: result.violations, passes: result.passes.length, incomplete: result.incomplete};
            }''')
            (output / 'acessibilidade-axe.json').write_text(json.dumps(audit, ensure_ascii=False, indent=2), encoding='utf-8')
            assert not audit['violations'], json.dumps(audit['violations'], ensure_ascii=False)
            checks.append('axe-core: nenhuma violação automática nos critérios verificados; revisão manual ainda necessária')

        await page.set_viewport_size({'width': 1440, 'height': 1000})
        await page.locator('#apresentacao').screenshot(path=str(output / 'apresentacao-video.png'))
        await page.locator('#como-funciona').screenshot(path=str(output / 'como-contratar.png'))
        await page.locator('#modelos').screenshot(path=str(output / 'projetos-destaque.png'))
        await page.locator('video').evaluate('(v) => { v.muted = true; return v.play(); }')
        await page.wait_for_function('document.querySelector("video").currentTime > 0.2')
        await page.locator('video').evaluate('(v) => v.pause()')
        assert await page.locator('video').evaluate('(v) => Math.abs(v.duration - 30) < 0.1')
        await page.wait_for_function('document.querySelector("track").readyState === 2')
        assert await page.locator('video').evaluate('(v) => v.textTracks[0].cues.length') == 6
        checks.append('reprodução do MP4 de 30 segundos, seis legendas e transcrição disponíveis')

        nojs = await browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
        fallback = await nojs.new_page()
        await fallback.goto(base, wait_until='networkidle')
        assert await fallback.locator('#modelos .card').count() == 6
        await fallback.locator('.faq-list summary').first.click()
        assert await fallback.locator('.faq-list details').first.get_attribute('open') is not None
        assert await fallback.locator('#contato a[href*="wa.me"]').is_visible()
        checks.append('catálogo, dúvidas e contato acessíveis também sem JavaScript')
        assert not errors, errors
        assert not failed, failed
        await browser.close()
    report = {'checks': checks, 'runtime_errors': errors, 'local_http_errors': failed}
    (output / 'testes-pagina-inicial.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--browser-path', default=None)
    parser.add_argument('--axe-path', type=Path, default=None, help='Cópia local opcional do axe-core para auditoria automática')
    args = parser.parse_args()
    args.output.mkdir(parents=True, exist_ok=True)
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
        asyncio.run(test(f'http://127.0.0.1:{server.server_port}/', args.output, browser_path, args.axe_path))
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
