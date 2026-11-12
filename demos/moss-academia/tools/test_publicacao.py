"""Confere a integração aprovada da MOSS Academia à home e ao catálogo."""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[3]  # Raiz do repositório onde esta cópia está sendo testada.

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass  # Mantém saída legível.

def main():
    server = ThreadingHTTPServer(('127.0.0.1',0), partial(Quiet,directory=str(ROOT)))  # Servidor isolado para o portal.
    Thread(target=server.serve_forever,daemon=True).start()  # Não depende da prévia aberta pelo usuário.
    base = f'http://127.0.0.1:{server.server_port}'  # Porta livre evita interferência em outros trabalhos.
    result = {}  # Resumo verificável sem dados pessoais.
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')  # Edge instalado no Windows.
        page = browser.new_page(viewport={'width':1440,'height':1000}, reduced_motion='reduce')  # Primeira verificação desktop.
        errors = []  # Erros de JavaScript.
        page.on('pageerror', lambda e: errors.append(str(e)))  # Não ignora erro silencioso de renderização.
        for route, container in [('/', '#modelos .grid'), ('/modelos.html', '#cards')]:
            page.goto(base + route,wait_until='load')  # Carrega cada ponto de entrada público.
            if route == '/modelos.html':
                page.wait_for_function('document.documentElement.dataset.mossPreviews === "ready"')  # Apenas o catálogo possui esse marcador.
            card = page.locator(f'{container} article.card').filter(has=page.locator('a[href="demos/moss-academia/"]'))  # Localiza somente esta demo.
            assert card.count() == 1, (route,card.count())  # Impede duplicação de card.
            assert 'MOSS Academia' in card.inner_text()  # Identidade correta.
            image = card.locator('img')  # Captura da própria demo.
            image.scroll_into_view_if_needed()  # Dispara a foto lazy.
            image.evaluate('(i)=>i.loading="eager"')  # Aguarda o mesmo recurso em qualquer viewport.
            page.wait_for_function('(i)=>i.complete && i.naturalWidth>0',arg=image.element_handle())  # Falha se a imagem estiver quebrada.
            assert image.get_attribute('src').endswith('demos/moss-academia/entrega/card-moss-academia.webp')  # Não aceita substituição por foto genérica.
            assert page.locator(f'{container} a[href="academia-pulse/"]').count() == 1  # Preserva a outra academia já publicada.
            for width in [320,390,768,1440]:
                page.set_viewport_size({'width':width,'height':900})  # Portal continua responsivo.
                assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), (route,width)  # Sem overflow de página.
            result[route] = page.locator(f'{container} article.card').count()  # Registra contagem efetiva.
            if route == '/modelos.html':
                page.locator('#busca-modelo').fill('moss academia')  # Busca pelo nome aprovado.
                assert page.locator('#cards .card:visible').count() == 1  # Apenas o novo card corresponde.
                page.locator('[data-filter="Beleza e saúde"]').click()  # Categoria coerente com o segmento.
                assert card.is_visible()  # Busca e filtro combinam corretamente.
                page.locator('[data-filter="Comércio"]').click()  # Categoria incompatível não deve mostrar a academia.
                assert card.is_hidden()  # Respeita filtragem existente.
                page.locator('[data-limpar-busca]').click()  # Restaura Todos e consulta vazia.
                assert page.locator('#cards .card:visible').count() == result[route]  # Não perde os outros modelos.
        assert result['/'] == 13, result  # Contagem do destaque atualizada.
        assert not errors, errors  # Scripts do portal continuam válidos.
        for path in ['/demos/moss-academia/','/demos/moss-academia/css/style.css','/demos/moss-academia/js/app.js','/demos/moss-academia/assets/video/filme-conceito.mp4','/demos/moss-academia/entrega/card-moss-academia.webp']:
            response = page.request.get(base + path)  # Confere os destinos e recursos indispensáveis.
            assert response.status == 200, (path,response.status)  # Sem links locais quebrados.
        browser.close()  # Libera todos os recursos de teste.
    server.shutdown()  # O servidor temporário não fica aberto.
    print(json.dumps({'status':'OK','cards':result,'errors':errors,'checks':['home e catálogo','foto da própria demo','outras demos preservadas','busca e categoria','quatro larguras sem overflow','HTML, CSS, JS, vídeo e card com HTTP 200']},ensure_ascii=False,indent=2))

if __name__ == '__main__':
    main()  # Execução manual na árvore de publicação.
