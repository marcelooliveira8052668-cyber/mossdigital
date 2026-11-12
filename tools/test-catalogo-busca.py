"""Busca do catálogo: texto, categorias, ordem A–Z, acessibilidade e responsivo."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
class H(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
class Server(ThreadingHTTPServer):
    request_queue_size = 128

def main():
    server = Server(('127.0.0.1',0),partial(H,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}'
    with sync_playwright() as p:
        b = p.chromium.launch(channel='msedge')
        page = b.new_page(viewport={'width':1366,'height':900})
        erros=[];page.on('pageerror',lambda e:erros.append(str(e)))
        page.goto(base+'/modelos.html',wait_until='load')
        page.wait_for_function("document.documentElement.dataset.mossPreviews==='ready'",timeout=30000)
        total = page.locator('#cards .card').count()
        assert total == 121, total
        assert 'modelos disponíveis' in page.locator('#count').inner_text()
        # Busca por nome, ignorando acentos e maiúsculas.
        page.locator('#busca-modelo').fill('clinica')
        assert page.locator('#cards .card:visible').count() >= 1
        assert 'Clínica' in page.locator('#cards .card:visible h2').first.inner_text()
        # Destaque do termo encontrado.
        assert page.locator('#cards .card:visible mark').count() >= 1
        # Busca por descrição.
        page.locator('#busca-modelo').fill('forno a lenha')
        assert page.locator('#cards .card:visible').count() == 1
        assert 'Pizzaria' in page.locator('#cards .card:visible h2').first.inner_text()
        # Sem resultado mostra aviso e botão de reinício.
        page.locator('#busca-modelo').fill('segmento inexistente 12345')
        assert page.locator('#cards .card:visible').count() == 0
        assert page.locator('[data-sem-resultado]').is_visible()
        assert 'Nenhum modelo encontrado' in page.locator('#count').inner_text()
        assert 'Não encontramos' in page.locator('[data-sem-resultado]').inner_text()
        page.locator('[data-limpar-tudo]').click()
        assert page.locator('#cards .card:visible').count() == total
        assert not page.locator('[data-sem-resultado]').is_visible()
        # Busca combinada com categoria.
        page.locator('[data-filter=Alimentação]').click()
        page.locator('#busca-modelo').fill('pizza')
        assert page.locator('#cards .card:visible').count() == 1
        page.locator('#busca-modelo').fill('clinica')
        assert page.locator('#cards .card:visible').count() == 0
        assert page.locator('[data-sem-resultado]').is_visible()
        # Voltar para Todos mantém a busca.
        page.locator('[data-filter=Todos]').click()
        assert page.locator('#cards .card:visible').count() >= 1
        # Limpar com o X e com Esc.
        page.locator('#busca-modelo').fill('pizza')
        assert page.locator('[data-limpar-busca]').is_visible()
        page.locator('[data-limpar-busca]').click()
        assert page.locator('#busca-modelo').input_value() == ''
        assert page.locator('#cards .card:visible').count() == total
        page.locator('#busca-modelo').fill('pizza');page.locator('#busca-modelo').press('Escape')
        assert page.locator('#busca-modelo').input_value() == ''
        # A ordem A–Z continua valendo depois da busca.
        page.locator('#busca-modelo').fill('a')
        nomes = page.locator('#cards .card:visible h2').all_text_contents()
        # Mesma regra do site: emojis iniciais não contam para a ordem.
        ordenado = page.evaluate("""nomes=>{
            const c=new Intl.Collator('pt-BR',{sensitivity:'base',numeric:true});
            const limpos=nomes.map(n=>n.trim().replace(/^[^\\p{L}\\p{N}]+/u,''));
            return limpos.every((v,i)=>!i||c.compare(limpos[i-1],v)<=0);
        }""",nomes)
        assert ordenado, nomes[:6]
        page.locator('#busca-modelo').fill('')
        # Paginação não é usada: todos os cartões continuam presentes no DOM.
        assert page.locator('#cards .card').count() == total
        # Responsivo.
        for largura in [320,390,768]:
            page.set_viewport_size({'width':largura,'height':900})
            page.wait_for_timeout(150)
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'), largura
        # Acessibilidade: rótulo, descrição e foco visível no campo.
        page.set_viewport_size({'width':1366,'height':900})
        assert page.locator('label[for=busca-modelo]').count() == 1
        assert page.locator('#busca-modelo').get_attribute('aria-describedby') == 'busca-ajuda'
        assert page.locator('#count').get_attribute('aria-live') == 'polite'
        page.locator('#busca-modelo').focus()
        assert page.evaluate('document.activeElement.id') == 'busca-modelo'
        assert not erros,erros
        b.close()
    server.shutdown()
    print('OK: busca por titulo/descricao sem acentos, destaque, categoria combinada, zero resultados com reinicio, limpar por X e Esc, ordem A-Z preservada, responsivo e acessivel.')

if __name__=='__main__':main()
