"""Testes locais da floricultura, sem envio de mensagens ou publicação.

Requer Playwright para Python, Chrome ou Edge. Axe-core local é opcional.
"""
import argparse
import asyncio
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
from threading import Thread
from urllib.parse import parse_qs, urlsplit

from playwright.async_api import async_playwright

REPO = Path(__file__).resolve().parent.parent


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            # Navegar ou fechar a página pode cancelar uma imagem ainda em leitura.
            pass


async def test(base, output, browser_path, axe_path, catalog):
    errors, http_errors, checks, audits = [], [], [], []
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=browser_path)
        context = await browser.new_context(reduced_motion='reduce', accept_downloads=True)
        page = await context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('response', lambda response: http_errors.append(response.url) if response.status >= 400 and response.url.startswith(base) else None)
        await page.set_viewport_size({'width': 1600, 'height': 1000})
        await page.goto(base + 'demos/floricultura/', wait_until='networkidle')
        await page.screenshot(path=str(output / '01-floricultura-desktop.png'))
        assert await page.locator('h1').count() == 1
        assert await page.locator('.product').count() == 6
        assert await page.locator('meta[name="robots"]').get_attribute('content') == 'noindex, nofollow'
        assert await page.locator('#builder-controls').is_enabled()
        assert await page.locator('#bouquet-total').inner_text() == 'R$\xa099,00'
        checks.append('seis composições, aviso de demonstração e subtotal inicial correto')

        await page.locator('#occasion').select_option('amor')
        assert await page.locator('.product:visible').count() == 2
        await page.locator('#budget').select_option('100')
        assert await page.locator('.product:visible').count() == 1
        await page.locator('#budget').select_option('90')
        assert await page.locator('.product:visible').count() == 0
        assert await page.locator('#empty-products').is_visible()
        await page.locator('#clear-empty').click()
        await page.wait_for_function('document.querySelectorAll(".product:not([hidden])").length === 6')
        checks.append('filtros combinados por ocasião e orçamento, estado vazio e limpeza')

        await page.get_by_role('button', name='Personalizar Abraço demorado', exact=True).click()
        assert await page.locator('#bouquet-total').inner_text() == 'R$\xa0166,50'
        assert await page.locator('#wrapping').input_value() == 'tecido'
        assert await page.locator('[name="size"]:checked').input_value() == 'medio'
        assert await page.locator('[name="flower"]:checked').evaluate('(el) => el === document.activeElement')
        await page.locator('[name="flower"][value="girassol"]').check()
        await page.locator('[name="size"][value="grande"]').check()
        await page.locator('#wrapping').select_option('caixa')
        assert await page.locator('#bouquet-total').inner_text() == 'R$\xa0210,00'
        assert await page.locator('#preview-flower').get_attribute('href') == 'assets/florais.svg#girassol'
        assert await page.locator('#bouquet-preview').get_attribute('data-wrap') == 'caixa'
        await page.locator('#receiving').select_option('entrega')
        assert 'Frete sob consulta' in await page.locator('#receiving-summary').inner_text()
        assert await page.locator('#bouquet-total').inner_text() == 'R$\xa0210,00'
        checks.append('catálogo carrega opções, prévia acompanha flores, cálculo usa centavos e não inventa frete')

        message = '<img src=x onerror="window.__xss=1"> Um carinho fictício.'
        await page.locator('#card-message').fill(message)
        assert await page.locator('#card-preview').inner_text() == message
        assert await page.locator('#card-preview img').count() == 0
        assert await page.evaluate('window.__xss || null') is None
        assert await page.locator('#message-count').inner_text() == str(len(message))
        assert await page.locator('#card-message').get_attribute('maxlength') == '160'
        checks.append('mensagem tratada como texto, limite de caracteres e ausência de HTML injetado')

        await page.evaluate('''() => {
          window.__opened = [];
          window.open = (...args) => { window.__opened.push(args); return null; };
        }''')
        await page.locator('#contact-moss').click()
        assert await page.evaluate('window.__opened.length') == 0
        assert await page.locator('#demo-ack').evaluate('(el) => el === document.activeElement')
        await page.locator('#demo-ack').check()
        await page.locator('#contact-moss').click()
        opened = await page.evaluate('window.__opened[0]')
        parsed = urlsplit(opened[0])
        assert parsed.netloc == 'wa.me' and parsed.path == '/5511942038103'
        text = parse_qs(parsed.query)['text'][0]
        assert 'Não é um pedido de flores' in text
        assert 'Quero conhecer este modelo de site com a MOSS Digital' in text
        assert message in text
        assert opened[2] == 'noopener,noreferrer'
        await page.locator('#wrapping').select_option('papel')
        assert not await page.locator('#demo-ack').is_checked()
        checks.append('WhatsApp interceptado, reconhecimento obrigatório e resumo identificado como demo')

        await page.evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.__copied=text;}}})')
        await page.locator('#copy-summary').click()
        assert 'DEMONSTRAÇÃO MOSS DIGITAL' in await page.evaluate('window.__copied')
        async with page.expect_download() as info:
            await page.locator('#download-summary').click()
        download = await info.value
        path = await download.path()
        assert 'Não é um pedido de flores' in Path(path).read_text(encoding='utf-8')
        assert download.suggested_filename == 'flora-afeto-composicao-demo.txt'
        await page.evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{throw Error("bloqueado")}}})')
        async with page.expect_download():
            await page.locator('#copy-summary').click()
        assert 'cópia não foi permitida' in await page.locator('#builder-status').inner_text()
        assert await page.evaluate('localStorage.length') == 0
        assert await page.evaluate('sessionStorage.length') == 0
        checks.append('cópia, TXT, alternativa para clipboard bloqueado e ausência de armazenamento persistente')

        await page.locator('#reset-bouquet').click()
        assert await page.locator('#card-message').input_value() == ''
        assert await page.locator('#bouquet-total').inner_text() == 'R$\xa099,00'
        await page.evaluate('document.activeElement.blur()')
        for width in [1600, 1024, 768, 390, 320]:
            await page.set_viewport_size({'width': width, 'height': 900})
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Transbordamento em {width}'
            if width in (1600, 390):
                await page.locator('.builder-visual').evaluate('(el) => el.style.position = "static"')
                await page.locator('#montador').screenshot(path=str(output / f'02-montador-{width}.png'))
                await page.locator('.builder-visual').evaluate('(el) => el.style.removeProperty("position")')
                await page.locator('#colecao').screenshot(path=str(output / f'03-colecao-{width}.png'))
            if width == 390:
                await page.evaluate('scrollTo(0,0)')
                await page.screenshot(path=str(output / '04-floricultura-celular.png'))
            if axe_path and width in (1600, 390):
                if not await page.evaluate('typeof window.axe !== "undefined"'):
                    await page.add_script_tag(path=str(axe_path))
                result = await page.evaluate('''async () => {
                  const r = await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
                  return {violations:r.violations,passes:r.passes.length};
                }''')
                audits.append({'width': width, **result})
                (output / 'acessibilidade-floricultura.json').write_text(json.dumps(audits, ensure_ascii=False, indent=2), encoding='utf-8')
                assert not result['violations'], json.dumps(result['violations'], ensure_ascii=False)
        checks.append('reinício, cinco larguras e auditoria automática complementar de acessibilidade')

        await page.goto(base + 'demos/floricultura/', wait_until='networkidle')
        await page.keyboard.press('Tab')
        assert await page.locator('.skip').evaluate('(el) => el === document.activeElement')
        await page.keyboard.press('Enter')
        assert urlsplit(page.url).fragment == 'conteudo'
        summary = page.locator('.faq-list summary').first
        await summary.focus()
        await page.keyboard.press('Enter')
        assert await summary.locator('..').get_attribute('open') is not None
        await page.goto(base + 'demos/floricultura/implantacao.html', wait_until='networkidle')
        assert await page.locator('h1').count() == 1
        assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        checks.append('atalho de conteúdo, FAQ por teclado e guia de implantação')

        nojs = await browser.new_context(java_script_enabled=False, viewport={'width': 390, 'height': 844})
        fallback = await nojs.new_page()
        await fallback.goto(base + 'demos/floricultura/', wait_until='networkidle')
        assert await fallback.locator('.product').count() == 6
        assert await fallback.locator('#builder-controls').get_attribute('disabled') is not None
        assert await fallback.locator('#contact-moss').is_disabled()
        assert await fallback.locator('.choose-product:enabled').count() == 0
        assert await fallback.evaluate('document.documentElement.scrollWidth <= innerWidth')
        checks.append('catálogo legível e interações bloqueadas sem JavaScript')

        if catalog:
            await page.goto(base + 'modelos.html', wait_until='networkidle')
            florist = page.locator('.card').filter(has=page.get_by_role('heading', name='Flora & Afeto — Floricultura', exact=True))
            assert await florist.count() == 1
            assert await florist.get_attribute('data-category') == 'Comércio'
            await page.get_by_role('button', name='Comércio', exact=True).click()
            assert await florist.is_visible()
            await page.goto(base + 'demo.html?preset=floricultura', wait_until='networkidle')
            assert '/demos/floricultura/index.html' in page.url
            checks.append('cartão único na categoria Comércio e redirecionamento do preset')
        assert not errors, errors
        assert not http_errors, http_errors
        await browser.close()
    report = {'checks': checks, 'runtime_errors': errors, 'local_http_errors': http_errors}
    (output / 'testes-floricultura.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--browser-path', default=None)
    parser.add_argument('--axe-path', type=Path, default=None)
    parser.add_argument('--skip-catalog', action='store_true')
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
        asyncio.run(test(f'http://127.0.0.1:{server.server_port}/', args.output, browser_path, args.axe_path, not args.skip_catalog))
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
