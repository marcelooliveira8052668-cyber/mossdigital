"""Regressao do ARMAZEM DA ESQUINA: vitrine, top 10, carrinho, painel e limites."""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import json
import re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent  # Serve apenas esta demo.
OUT = ROOT.parents[1] / '.moss-local/armazem-da-esquina'  # Evidencias fora da entrega.

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass  # Sem ruido de requisicoes.

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}/'
    errors, missing, external, writes = [], [], [], []
    checks = []
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')
        context = browser.new_context(viewport={'width':1440,'height':1000}, reduced_motion='reduce')
        context.route('https://**/*', lambda r: (external.append(r.request.url), r.abort())[-1])
        page = context.new_page()
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: missing.append(r.url) if r.status == 404 else None)
        page.on('request', lambda r: writes.append(r.url) if r.method not in ['GET','HEAD'] else None)
        def go(path=''):
            page.goto(base + path, wait_until='networkidle')

        go()
        assert page.locator('h1').count() == 1
        assert page.locator('.top-card').count() == 10, page.locator('.top-card').count()
        assert page.locator('#shelf-grid .shelf').count() == 6
        assert page.locator('#offers-grid .product-card').count() == 3
        assert page.locator('#featured-grid .product-card').count() == 5
        assert page.evaluate('ARMAZEM.produtos.length') == 24
        top10 = page.locator('.top-card .top-rank').all_text_contents()
        assert top10 == ['1','2','3','4','5','6','7','8','9','10'], top10
        page.screenshot(path=str(OUT/'desktop-inicial.png'))
        checks.append('Home com top 10 ordenado, seis prateleiras, ofertas e destaques')

        # Top 10 refletindo os dados, sem repeticao de posicao.
        go()
        clicks = page.locator('.top-card h3').all_text_contents()
        assert len(set(clicks)) == 10, clicks

        # Catalogo: filtros combinados, ordenacao e estado vazio.
        go('produtos.html')
        assert page.locator('#catalog-grid .product-card').count() == 24
        page.locator('#f-busca').fill('cafe')
        page.wait_for_timeout(120)
        titulos = page.locator('#catalog-grid .product-card h3').all_inner_texts()
        assert len(titulos) >= 1 and 'Café torrado e moído' in titulos, titulos
        page.locator('#f-busca').fill('pao')   # Busca sem acento encontra "pão".
        page.wait_for_timeout(120)
        titulos = page.locator('#catalog-grid .product-card h3').all_inner_texts()
        assert len(titulos) >= 1 and any('Pão' in t for t in titulos), titulos
        page.locator('#f-busca').fill('')
        page.locator('#f-top10').check()
        page.wait_for_timeout(120)
        assert page.locator('#catalog-grid .product-card').count() == 10
        page.locator('#f-ofertas').check()
        page.wait_for_timeout(120)
        assert page.locator('#catalog-grid .product-card').count() == 2  # Azeite e detergente: top 10 e oferta ao mesmo tempo.
        page.locator('#f-top10').uncheck(); page.locator('#f-ofertas').uncheck()
        page.locator('#f-categorias input[value=hortifruti]').check()
        page.wait_for_timeout(120)
        assert page.locator('#catalog-grid .product-card').count() == 6
        page.locator('#f-preco').fill('6')
        page.wait_for_timeout(120)
        assert page.locator('#catalog-grid .product-card').count() < 6
        page.locator('#clear-filters').click()
        page.wait_for_timeout(120)
        assert page.locator('#catalog-grid .product-card').count() == 24
        page.locator('#f-ordem').select_option('barato')
        page.wait_for_timeout(120)
        precos = page.locator('#catalog-grid .price').all_inner_texts()
        numeros = [float(re.findall(r'R\$\s*([\d.,]+)', t)[-1].replace('.', '').replace(',', '.')) for t in precos]
        assert numeros == sorted(numeros), numeros
        page.locator('#f-busca').fill('item inexistente 999')
        page.wait_for_timeout(150)
        assert page.locator('#no-results').is_visible()
        checks.append('Catalogo: busca sem acento, categorias, top 10, ofertas, preco, ordenacao e estado vazio')

        # Detalhe do produto e carrinho.
        go('produto.html?id=banana-prata')
        assert page.locator('.product-detail h1').inner_text() == 'Banana prata'
        detalhe_preco = page.locator('.detail-price').inner_text().replace('\xa0', ' ').strip()
        assert detalhe_preco.startswith('R$ 6,90'), detalhe_preco
        page.locator('.detail-actions .qty button').last.click()
        page.locator('.detail-actions .button').click()
        assert page.locator('#cart-count').inner_text() == '2'
        go('carrinho.html')
        assert page.locator('.cart-row').count() == 1
        page.locator('.cart-row .qty button').last.click()
        assert page.locator('.cart-row').count() == 1
        assert '2' in page.locator('.cart-row .qty span').inner_text()
        page.locator('.delivery-option input[value=retirada]').check()
        page.wait_for_timeout(120)
        assert 'Retirada' in page.locator('#cart-summary').inner_text()
        page.locator('#cart-summary .button').click()
        assert page.locator('#order-dialog').is_visible()
        mensagem = page.locator('#order-message').inner_text()
        assert 'Banana prata' in mensagem and 'PEDIDO DE DEMONSTRAÇÃO' in mensagem
        assert page.locator('#order-send').is_hidden()
        assert 'não configurado' in page.locator('#order-config').inner_text()
        page.keyboard.press('Escape')
        page.reload(wait_until='networkidle')
        assert page.locator('.cart-row').count() == 1
        checks.append('Detalhe, carrinho persistente, quantidades, entrega/retirada e pedido sem envio')

        # O painel do comerciante muda a vitrine real, sem servidor.
        go('painel.html')
        assert page.locator('#panel-rows tr').count() == 24
        primeira_linha = page.locator('#panel-rows tr').first
        preco_campo = primeira_linha.locator('input[type=number]').nth(1)  # O preco vem depois do estoque na linha.
        preco_campo.fill('123.50')
        preco_campo.press('Tab')
        page.wait_for_timeout(200)
        go('produtos.html')
        card_pao = page.locator('#catalog-grid .product-card').filter(has_text='Pão francês').first
        assert '123,50' in card_pao.inner_text(), card_pao.inner_text()
        go('painel.html')
        page.locator('#panel-reset').click()
        page.wait_for_timeout(200)
        assert page.locator('#panel-rows tr').count() == 24
        go('produtos.html')
        assert '123,50' not in page.locator('#catalog-grid').inner_text()
        checks.append('Painel do comerciante altera preco na vitrine local e restaura o original')

        # Anuncie: previa sem envio e sem guardar contato.
        go('anuncie.html')
        form = page.locator('#shop-form')
        form.locator('[name=nome]').fill('Mercearia Exemplo')
        form.locator('[name=contato]').fill('Alex Demo')
        form.locator('[name=bairro]').fill('Bairro Exemplo')
        form.locator('[name=whatsapp]').fill('11999990000')
        form.locator('button[type=submit]').click()
        assert page.locator('#shop-preview').is_visible()
        assert 'não enviada' in page.locator('#shop-text').inner_text().lower()
        # Com numero valido, o link do WhatsApp aparece, mas nada e aberto nem enviado sozinho.
        link = page.locator('#shop-send')
        assert link.is_visible() and 'wa.me/11999990000' in link.get_attribute('href'), link.get_attribute('href')
        # Sem numero, o link some e a previa continua util.
        form.locator('[name=whatsapp]').fill('')
        form.locator('button[type=submit]').click()
        assert page.locator('#shop-preview').is_visible()
        assert page.locator('#shop-send').is_hidden()
        guardado = page.evaluate('JSON.stringify({...localStorage})')
        assert '11999990000' not in guardado and 'Mercearia Exemplo' not in guardado
        checks.append('Anuncie gera previa local, nao envia e nao guarda dados de contato')

        # Paginas, imagens e responsividade.
        for caminho in ['', 'produtos.html', 'produto.html?id=cafe-torrado', 'carrinho.html', 'painel.html', 'anuncie.html']:
            go(caminho)
            assert page.locator('main').count() == 1
            assert page.locator('h1').count() == 1
            for largura in [320, 390, 768, 1440]:
                page.set_viewport_size({'width': largura, 'height': 900})
                transbordo = page.evaluate('document.documentElement.scrollWidth > innerWidth')
                if transbordo:
                    print('FORA DA TELA:', caminho, largura, page.evaluate('Array.from(document.querySelectorAll("body *")).map(e=>({t:e.tagName,c:e.className,r:e.getBoundingClientRect().right})).filter(x=>x.r>innerWidth+1)'))
                assert not transbordo, (caminho, largura)
            if caminho == '':
                page.evaluate('document.querySelectorAll("img").forEach(i=>i.loading="eager")')
                page.wait_for_function('Array.from(document.images).every(i=>i.complete)')
                quebradas = page.evaluate('Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src)')
                assert not quebradas, quebradas
                page.screenshot(path=str(OUT/'desktop-completo.png'), full_page=True)
                page.set_viewport_size({'width':390,'height':844})
                page.goto(base, wait_until='networkidle')
                page.screenshot(path=str(OUT/'celular-inicial.png'))
                page.locator('.menu-toggle').click()
                assert page.locator('#main-menu').is_visible()
                assert page.locator('#main-menu a:visible').count() == 5
                page.keyboard.press('Escape')
                assert page.locator('#main-menu').is_hidden()
        checks.append('Seis rotas, quatro larguras (320-1440px), 24 imagens carregando e menu movel')

        # Armazenamento bloqueado mantem a vitrine funcionando.
        bloqueado = browser.new_context(viewport={'width':390,'height':844})
        bloqueado.add_init_script('Storage.prototype.getItem=function(){throw new Error("bloqueado")};Storage.prototype.setItem=function(){throw new Error("bloqueado")};')
        pagina_bloqueada = bloqueado.new_page()
        pagina_bloqueada.goto(base + 'produtos.html', wait_until='networkidle')
        assert pagina_bloqueada.locator('#catalog-grid .product-card').count() == 24
        pagina_bloqueada.locator('#catalog-grid .add-button').first.click()
        assert pagina_bloqueada.locator('#cart-count').inner_text() == '1'
        bloqueado.close()
        checks.append('Armazenamento bloqueado mantem vitrine e carrinho em memoria')

        assert not errors, errors
        assert not missing, missing
        assert not external, external
        assert not writes, writes
        checks.append('Zero erros JavaScript, 404, dependencias externas ou envio de formularios')
        browser.close()
    server.shutdown()
    report = {'status':'APROVADO','checks':checks,'errors':errors,'missing':missing,'external':external,'writes':writes}
    (OUT/'testes.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()
