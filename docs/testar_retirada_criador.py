"""Teste local da retirada, sem acessar contas, APIs privadas ou enviar mensagens.

Requer Python, Playwright e Edge no ambiente de revisão.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit
import threading
from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parent.parent

class Silencioso(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass
    def do_GET(self):
        try:
            super().do_GET()
        except (ConnectionAbortedError, ConnectionResetError, BrokenPipeError):
            # O navegador cancela recursos da página anterior ao redirecionar.
            pass

def testar():
    servidor = ThreadingHTTPServer(('127.0.0.1',0),partial(Silencioso,directory=str(REPO)))
    thread = threading.Thread(target=servidor.serve_forever,daemon=True)
    thread.start()
    base = f'http://127.0.0.1:{servidor.server_port}'
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(channel='msedge')
            pagina = browser.new_page()
            erros = []
            pagina.on('pageerror',lambda erro: erros.append(str(erro)))
            for nome in ('index.html','modelos.html','sistemas.html'):
                pagina.goto(base+'/'+nome)
                if nome=='modelos.html':
                    pagina.wait_for_function('document.querySelectorAll("#cards article").length > 0')
                    assert pagina.locator('#cards .quote').count()>0
                    pagina.get_by_role('button',name='Todos',exact=True).click()
                    assert pagina.locator('#cards .btn-create').count()==0, pagina.locator('#cards .btn-create').first.evaluate('(e)=>e.outerHTML')
                texto=pagina.locator('body').inner_text().lower()
                for promessa in ('crie seu site grátis','criar o meu site grátis','baixe grátis após informar'):
                    assert promessa not in texto,(nome,promessa)
                for href in pagina.locator('a[href]').evaluate_all('(links)=>links.map(a=>a.href)'):
                    assert not urlsplit(href).path.startswith('/criar/'),(nome,href)
                if nome=='index.html':
                    assert pagina.locator('.top-cta').count()==0
                    assert 'r$ 400' in texto
                    assert 'r$ 29,90' in texto
                    assert pagina.get_by_role('link',name='Livros digitais',exact=True).count()==1
                for largura in (360,1366):
                    pagina.set_viewport_size({'width':largura,'height':900})
                    assert pagina.evaluate('document.documentElement.scrollWidth <= innerWidth'),(nome,largura)
            for js in (True,False):
                contexto=browser.new_context(java_script_enabled=js)
                pagina_antiga=contexto.new_page()
                pedidos=[]
                pagina_antiga.on('request',lambda req: pedidos.append(req.url))
                for rota in ('/criar/','/criar/index.html','/criar/?demo=salao','/criar/index.html?demo=otica#editor'):
                    pagina_antiga.goto(base+rota,wait_until='domcontentloaded')
                    pagina_antiga.wait_for_url(base+'/index.html')
                    assert pagina_antiga.locator('#creator').count()==0
                assert not any('/criar/assets/' in u or '/acompanhamento/' in u for u in pedidos)
                contexto.close()
            assert not erros,erros
            browser.close()
    finally:
        servidor.shutdown()
        servidor.server_close()
        thread.join()
    print('PASSOU: home e catálogo sem chamadas, filtros/orçamentos preservados, livro e serviço mantidos, layout 360/1366 px e 8 redirecionamentos com/sem JS. Nenhum script do editor carregado.')

if __name__=='__main__':
    testar()
