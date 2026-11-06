"""Verifica visualmente a nav e a faixa fixa do índice (sem publicar)."""
import asyncio
import sys
from pathlib import Path

from playwright.async_api import async_playwright

OUT = Path(__file__).parent
BASE = 'http://127.0.0.1:8784/'


async def main():
    errors, failed = [], []
    import os
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
        await page.goto(BASE, wait_until='networkidle')

        # 1. Botão "Criar meu site" removido da nav
        assert await page.locator('nav a.nav-create').count() == 0, 'nav-create ainda existe'
        print('OK nav-create removido')

        # 2. Faixa fixa: cores e texto novos
        strip = page.locator('.top-cta')
        assert await strip.count() == 1, 'faixa top-cta ausente'
        text = await strip.locator('.top-cta-text').inner_text()
        assert text == 'Crie seu site grátis!', f'texto errado: {text}'
        bg = await strip.evaluate('el => getComputedStyle(el).backgroundColor')
        fg = await strip.evaluate('el => getComputedStyle(el).color')
        print(f'OK faixa: texto="{text}" bg={bg} cor={fg}')
        assert bg == 'rgb(255, 239, 138)', f'bg inesperado: {bg}'
        assert fg == 'rgb(13, 43, 82)', f'cor inesperada: {fg}'

        # 3. Links da nav e da faixa continuam válidos
        assert await page.locator('a[href="criar/index.html"]').count() >= 1, 'link para o criador sumiu'
        print('OK link para o criador presente na faixa')

        # 4. Sem transbordamento e sem erro de JS
        for width in (1440, 390, 320):
            await page.set_viewport_size({'width': width, 'height': 900})
            await page.evaluate('window.scrollTo(0, 0)')
            assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'transbordamento em {width}px'
        print('OK sem rolagem horizontal em 1440/390/320px')

        # 5. Screenshots
        await page.set_viewport_size({'width': 1440, 'height': 900})
        await page.screenshot(path=str(OUT / 'btn-desktop-topo.png'))
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUT / 'btn-desktop-fundo.png'))
        await page.set_viewport_size({'width': 390, 'height': 844})
        await page.evaluate('window.scrollTo(0, 0)')
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUT / 'btn-mobile-topo.png'))
        await page.evaluate('window.scrollTo(0, document.body.scrollHeight)')
        await page.wait_for_timeout(300)
        await page.screenshot(path=str(OUT / 'btn-mobile-fundo.png'))

        assert not errors, errors
        assert not failed, failed
        await browser.close()
    print('TUDO OK — sem erros de JS nem de rede')


asyncio.run(main())
