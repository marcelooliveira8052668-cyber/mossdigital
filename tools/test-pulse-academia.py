"""Testes da PULSE: python tools/test-pulse-academia.py [--online]."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
import json
import sys
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '.moss-local/pulse-academia'

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}'
    errors, writes = [], []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')
        context = browser.new_context(viewport={'width': 1440, 'height': 1000}, reduced_motion='reduce')
        if '--online' not in sys.argv:
            context.route('https://**/*', lambda route: route.abort())
        page = context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('request', lambda request: writes.append(request.url) if request.method not in ['GET', 'HEAD'] else None)
        page.goto(base + '/academia-pulse/', wait_until='networkidle')
        assert page.locator('h1').count() == 1
        assert page.locator('.modality-card:visible').count() == 6
        for category, count in [('agua', 2), ('lutas', 1), ('forca', 2), ('bem-estar', 1), ('all', 6)]:
            page.locator(f'[data-filter="{category}"]').click()
            assert page.locator('.modality-card:visible').count() == count
        page.locator('#tab-all').focus()
        page.keyboard.press('ArrowRight')
        assert page.locator('#tab-force').get_attribute('aria-selected') == 'true'
        page.locator('#tab-all').click()
        page.locator('[data-gallery="0"]').click()
        assert page.locator('#gallery-dialog').is_visible()
        page.keyboard.press('ArrowRight')
        assert '02 / 04' in page.locator('#gallery-caption').inner_text()
        page.keyboard.press('ArrowLeft')
        assert '01 / 04' in page.locator('#gallery-caption').inner_text()
        page.keyboard.press('Escape')
        assert not page.locator('#gallery-dialog').is_visible()
        page.locator('[data-modality="Natação"]').click()
        page.locator('#try-modality').click()
        assert page.locator('select[name=interest]').input_value() == 'Aula experimental — Natação'
        page.keyboard.press('Escape')
        page.locator('.plan-card.featured [data-enroll]').click()
        page.locator('input[name=name]').fill('<teste> Maria')
        page.locator('input[name=email]').fill('maria@example.com')
        page.locator('input[name=phone]').fill('abcdefghijk')
        assert not page.locator('input[name=phone]').evaluate('(input) => input.checkValidity()')
        page.locator('input[name=phone]').fill('(11) 99999-9999')
        page.locator('input[type=checkbox]').check()
        assert page.locator('.enroll-form').evaluate('(form) => form.checkValidity()')
        page.locator('.enroll-form button[type=submit]').click()
        assert page.locator('#success-message').is_visible()
        assert '<teste>' in page.locator('#success-message').inner_text()
        assert page.locator('#success-message teste').count() == 0
        profile = page.evaluate('JSON.parse(sessionStorage.getItem("pulse-demo"))')
        assert set(profile) == {'firstName', 'interest'}
        assert profile['interest'] == 'PULSE PLUS'
        page.locator('#success-close').click()
        page.locator('#student-button').click()
        assert 'PULSE PLUS' in page.locator('#student-interest').inner_text()
        page.locator('#clear-profile').click()
        assert page.evaluate('sessionStorage.getItem("pulse-demo")') is None
        page.locator('#day-6').click()
        assert page.locator('.class-row').count() == 2
        page.locator('[data-class]').first.click()
        assert 'Domingo' in page.locator('select[name=interest]').input_value()
        page.keyboard.press('Escape')
        page.locator('[data-video]').first.click()
        assert page.locator('video').is_visible()
        page.keyboard.press('Escape')
        page.locator('#privacy-button').click()
        assert 'PRIVACIDADE' in page.locator('#dialog-content h2').inner_text()
        page.keyboard.press('Escape')
        for width in [1440, 768, 390, 320]:
            page.set_viewport_size({'width': width, 'height': 900})
            # Deixa a media query e o layout assentarem antes de medir a largura.
            page.wait_for_timeout(200)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Overflow: {width}'
        page.locator('.menu-toggle').click()
        assert page.locator('#main-nav').is_visible()
        page.locator('#main-nav a[href="#estrutura"]').click()
        assert page.locator('.menu-toggle').get_attribute('aria-expanded') == 'false'
        page.set_viewport_size({'width': 1440, 'height': 1000})
        page.evaluate('document.querySelector("#toast").classList.remove("visible")')
        page.evaluate('scrollTo(0, 0)')
        page.screenshot(path=str(OUT / 'desktop.png'))
        page.screenshot(path=str(OUT / 'pagina-completa.png'), full_page=True)
        page.set_viewport_size({'width': 390, 'height': 844})
        page.evaluate('scrollTo(0, 0)')
        page.screenshot(path=str(OUT / 'celular.png'))
        if '--online' in sys.argv:
            for image in page.locator('img:visible').all():
                if image.get_attribute('src'):
                    image.scroll_into_view_if_needed()
            page.wait_for_function('Array.from(document.images).filter(i => i.getAttribute("src")).every(i => i.complete)')
            broken = page.evaluate('Array.from(document.images).filter(i => i.getAttribute("src") && !i.naturalWidth).map(i => i.src)')
            assert not broken, broken
        assert not errors, errors
        assert not writes, writes
        page.goto(base + '/', wait_until='domcontentloaded')
        assert page.locator('a[href="academia-pulse/"]').count() == 1
        page.goto(base + '/modelos.html', wait_until='domcontentloaded')
        assert page.locator('a[href="academia-pulse/"]').count() == 1
        card = page.locator('.card').filter(has=page.locator('a[href="academia-pulse/"]'))
        assert 'PULSE Academia' in card.inner_text()
        assert card.locator('img').get_attribute('src') == 'academia-pulse/capa.webp'
        browser.close()
    server.shutdown()
    print(json.dumps({'status': 'OK', 'viewports': [1440, 768, 390, 320], 'javascript_errors': errors, 'data_sent': writes, 'screenshots': str(OUT)}, ensure_ascii=False))

if __name__ == '__main__':
    main()
