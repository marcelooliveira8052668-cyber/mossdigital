"""Busca e paginação do catálogo único, acessível também pelo endereço antigo."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent.parent


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass


def main():
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start()
    try:
        with sync_playwright() as p:
            browser=p.chromium.launch(channel='msedge')
            page=browser.new_page()
            page.goto(f'http://127.0.0.1:{server.server_port}/modelos.html',wait_until='networkidle')
            page.wait_for_url('**/#modelos')
            assert page.locator('#cards > article').count()==127
            assert page.locator('#cards > article:visible').count()==6
            field=page.locator('#busca-modelo')
            field.fill('clinica')
            expected=page.locator('#cards > article:visible').count()
            assert expected>0
            field.fill('CLÍNICA')
            assert page.locator('#cards > article:visible').count()==expected
            field.fill('forno a lenha')
            assert page.locator('#cards > article:visible').count()==1
            page.locator('#categoria-modelo').select_option('Serviços')
            assert page.locator('#cards > article:visible').count()==0
            page.locator('[data-reset]').click()
            page.locator('[data-more]').click()
            assert page.locator('#cards > article:visible').count()==12
            field.fill('academia')
            page.locator('[data-clear]').click()
            assert field.input_value()==''
            assert page.locator('#cards > article:visible').count()==6
            assert field.evaluate('(e)=>document.activeElement===e')
            field.fill('pizza');field.press('Escape')
            assert field.input_value()==''
            assert page.locator('label[for="busca-modelo"]').count()==1
            assert field.get_attribute('aria-describedby')=='count'
            assert page.locator('#count').get_attribute('role')=='status'
            browser.close()
        print('OK: catálogo unificado, endereço antigo, busca sem acentos/por descrição, categorias, paginação, limpar, Esc, rótulo e foco.',flush=True)
    finally:
        server.shutdown()
        server.server_close()


if __name__=='__main__': main()
