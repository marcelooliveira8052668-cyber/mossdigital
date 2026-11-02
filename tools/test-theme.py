"""Testa os temas nas três páginas institucionais, sem publicar alterações.

Requer Playwright para Python e Chrome ou Edge. O axe-core é opcional.
"""

import argparse
import asyncio
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
from threading import Thread

from playwright.async_api import async_playwright

REPO = Path(__file__).resolve().parent.parent


class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


async def test(base, output, browser_path, axe_path):
    checks, errors, audits = [], [], []
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=browser_path)
        context = await browser.new_context(color_scheme='dark', reduced_motion='reduce')
        page = await context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        theme = lambda: page.locator('html').get_attribute('data-moss-theme')

        for filename in ['index.html', 'modelos.html', 'sistemas.html', 'estrutura.html']:
            await page.set_viewport_size({'width': 1440, 'height': 1000})
            await page.goto(base + filename, wait_until='networkidle')
            assert await theme() == 'dark'
            assert await page.locator('header .theme-toggle').count() == 1
            button = page.get_by_role('button', name='Ativar modo claro', exact=True)
            await button.focus()
            await page.keyboard.press('Enter')
            assert await theme() == 'light'
            assert await page.evaluate('localStorage.getItem("moss-digital-theme")') == 'light'
            await page.reload(wait_until='networkidle')
            assert await theme() == 'light'
            assert await page.get_by_role('button', name='Ativar modo escuro', exact=True).is_visible()
            assert await page.locator('body').evaluate('(el) => getComputedStyle(el).colorScheme') == 'light'

            for mode in ['light', 'dark']:
                if mode == 'dark':
                    await page.get_by_role('button', name='Ativar modo escuro', exact=True).click()
                assert await theme() == mode
                await page.evaluate('document.activeElement.blur()')
                for width in [1440, 768, 390, 320]:
                    await page.set_viewport_size({'width': width, 'height': 900})
                    assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (filename, mode, width)
                    if width in (1440, 390):
                        await page.evaluate('scrollTo(0,0)')
                        await page.screenshot(path=str(output / f'{Path(filename).stem}-{mode}-{width}.png'))
                await page.set_viewport_size({'width': 1440, 'height': 1000})
                if axe_path:
                    # Após reload a cópia precisa ser carregada novamente.
                    if not await page.evaluate('typeof window.axe !== "undefined"'):
                        await page.add_script_tag(path=str(axe_path))
                    audit = await page.evaluate('''async () => {
                        const result = await axe.run(document, {runOnly: {type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa']}});
                        return {violations: result.violations, passes: result.passes.length};
                    }''')
                    audits.append({'page': filename, 'theme': mode, **audit})
                    (output / 'auditorias-temas.json').write_text(json.dumps(audits, ensure_ascii=False, indent=2), encoding='utf-8')
                    assert not audit['violations'], json.dumps(audits[-1], ensure_ascii=False)
            checks.append(f'{filename}: alternância por teclado, recarga, quatro larguras e dois temas')

        # A última escolha deve acompanhar a navegação entre as três páginas.
        await page.get_by_role('button', name='Ativar modo claro', exact=True).click()
        await page.get_by_role('link', name='Início', exact=True).click()
        assert await theme() == 'light'
        await page.get_by_role('link', name='Modelos de Sites', exact=True).click()
        assert await theme() == 'light'
        await page.get_by_role('link', name='Sistemas', exact=True).first.click()
        assert await theme() == 'light'
        checks.append('escolha mantida ao navegar entre início, modelos e sistemas')

        second = await context.new_page()
        await second.goto(base, wait_until='networkidle')
        await page.get_by_role('button', name='Ativar modo escuro', exact=True).click()
        await second.wait_for_function('document.documentElement.dataset.mossTheme === "dark"')
        checks.append('alteração sincronizada entre abas da mesma origem')

        automatic = await browser.new_context(color_scheme='light')
        auto_page = await automatic.new_page()
        await auto_page.goto(base, wait_until='networkidle')
        assert await auto_page.locator('html').get_attribute('data-moss-theme') == 'light'
        await auto_page.emulate_media(color_scheme='dark')
        await auto_page.wait_for_function('document.documentElement.dataset.mossTheme === "dark"')
        await auto_page.get_by_role('button', name='Ativar modo claro', exact=True).click()
        await auto_page.emulate_media(color_scheme='light')
        await auto_page.emulate_media(color_scheme='dark')
        assert await auto_page.locator('html').get_attribute('data-moss-theme') == 'light'
        checks.append('preferência do sistema respeitada até o visitante escolher um tema')

        blocked = await browser.new_context(color_scheme='dark')
        await blocked.add_init_script('Object.defineProperty(window, "localStorage", {get() {throw new DOMException("Blocked", "SecurityError")}})')
        blocked_page = await blocked.new_page()
        blocked_page.on('pageerror', lambda error: errors.append(str(error)))
        await blocked_page.goto(base, wait_until='networkidle')
        await blocked_page.get_by_role('button', name='Ativar modo claro', exact=True).click()
        assert await blocked_page.locator('html').get_attribute('data-moss-theme') == 'light'
        checks.append('botão funciona mesmo quando o navegador bloqueia o armazenamento')
        assert not errors, errors
        await browser.close()
    report = {'checks': checks, 'runtime_errors': errors, 'axe_audits': len(audits)}
    (output / 'testes-temas.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--browser-path', default=None)
    parser.add_argument('--axe-path', type=Path, default=None)
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
