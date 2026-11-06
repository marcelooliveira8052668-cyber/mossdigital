"""Verifica o link do Instagram nos rodapés das 4 páginas (sem publicar)."""
import asyncio
import os
from pathlib import Path

from playwright.async_api import async_playwright

OUT = Path(__file__).parent
BASE = 'http://127.0.0.1:8784/'
URL = 'https://www.instagram.com/mossdigital_sites/'


async def main():
    errors, failed = [], []
    candidates = [
        Path(os.environ.get('PROGRAMFILES', 'C:/Program Files')) / 'Google/Chrome/Application/chrome.exe',
        Path(os.environ.get('PROGRAMFILES(X86)', 'C:/Program Files (x86)')) / 'Microsoft/Edge/Application/msedge.exe',
    ]
    browser_path = next((str(p) for p in candidates if p.exists()), None)
    assert browser_path, 'Chrome/Edge não encontrado'
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=browser_path)
        page = await browser.new_page(viewport={'width': 1440, 'height': 900})
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: failed.append(f'{r.status} {r.url}') if r.status >= 400 and r.url.startswith(BASE) else None)

        for filename in ['index.html', 'modelos.html', 'sistemas.html', 'estrutura.html']:
            await page.goto(BASE + filename, wait_until='networkidle')
            link = page.locator(f'footer a[href="{URL}"]')
            assert await link.count() == 1, f'{filename}: link do Instagram ausente no rodapé'
            text = await link.inner_text()
            assert text == 'Instagram', f'{filename}: texto do link = {text}'
            target = await link.get_attribute('target')
            rel = await link.get_attribute('rel') or ''
            assert target == '_blank' and 'noopener' in rel, f'{filename}: target/rel errados'
            print(f'OK {filename}: rodapé com Instagram (target=_blank, rel={rel})')
            if filename == 'index.html':
                await page.locator('footer').scroll_into_view_if_needed()
                await page.wait_for_timeout(200)
                await page.locator('footer').screenshot(path=str(OUT / 'rodape-index.png'))

        # O botão "Criar meu site" continua removido e a faixa com texto novo
        await page.goto(BASE, wait_until='networkidle')
        assert await page.locator('nav a.nav-create').count() == 0
        assert await page.locator('.top-cta-text').inner_text() == 'Crie seu site grátis!'

        # Sem transbordamento
        for width in (1440, 390, 320):
            await page.set_viewport_size({'width': width, 'height': 900})
            await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'transbordamento em {width}px'

        assert not errors, errors
        assert not failed, failed
        await browser.close()
    print('TUDO OK — Instagram nos 4 rodapés, botões ok, sem erros')


asyncio.run(main())
