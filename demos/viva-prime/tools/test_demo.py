"""Regressão da VIVA Prime: páginas, filtros, privacidade, persistência e painel local."""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import json
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent.parent  # Serve apenas esta demonstração.
OUT=ROOT.parents[1]/'.moss-local/viva-prime'  # Evidências fora da pasta de publicação.

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass  # Suprime requisições de miniaturas na saída.

def main():
    OUT.mkdir(parents=True,exist_ok=True)  # Guarda capturas e relatório local.
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))  # Porta livre para não interferir nas prévias.
    Thread(target=server.serve_forever,daemon=True).start()  # Servidor temporário independente.
    base=f'http://127.0.0.1:{server.server_port}/'  # Origem exclusiva do teste de armazenamento.
    errors,missing,external,writes=[],[],[],[]  # Falhas técnicas e chamadas não autorizadas.
    checks=[]  # Cada item corresponde a asserções executadas.
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge')  # Navegador real disponível no Windows.
        context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')  # Inclui preferência de movimento reduzido.
        context.route('https://**/*',lambda r:(external.append(r.request.url),r.abort())[-1])  # Tudo precisa funcionar sem terceiros.
        page=context.new_page()  # Aba única mantém favoritos e edições entre páginas.
        page.on('pageerror',lambda error:errors.append(str(error)))  # Captura erros JavaScript.
        page.on('response',lambda r:missing.append(r.url) if r.status==404 else None)  # Arquivos inexistentes.
        page.on('request',lambda r:writes.append(r.url) if r.method not in ['GET','HEAD'] else None)  # Formulários não enviam nada.
        def go(path=''):
            page.goto(base+path,wait_until='networkidle')  # Aguarda recursos locais e renderização.
        def apply():
            page.locator('#search-form button[type=submit]').click()  # Usa o fluxo real, não chama funções internas.

        go()
        assert page.locator('h1').count()==1
        assert page.locator('.property-card').count()==5
        assert page.evaluate('VIVA_DATA.listings.length')==16
        assert page.evaluate('VIVA_DATA.listings.every(p=>p.gallery.length===5&&p.gallery.every(g=>g.kind==="placeholder"))')
        page.locator('.more-button').click()
        page.locator('#more-menu a').first.focus()
        page.keyboard.press('Escape')
        assert page.locator('.more-button').evaluate('(e)=>document.activeElement===e')
        page.screenshot(path=str(OUT/'desktop-primeira-tela.png'))
        page.locator('[data-home-purpose=alugar]').click()
        page.locator('#home-search [name=city]').select_option('São Paulo')
        page.locator('#home-search button[type=submit]').click()
        assert 'purpose=alugar' in page.url
        assert page.locator('.property-card').count()==1
        checks.append('Busca integrada ao hero, 16 cadastros e cinco espaços fotográficos honestos por anúncio')

        go('imoveis.html')
        assert page.locator('.property-card').count()==16
        page.locator('#search-form [name=purpose]').select_option('comprar')
        page.locator('#search-form [name=city]').select_option('Campinas')
        page.locator('#search-form [name=maxPrice]').fill('300000')
        apply()
        assert page.locator('.property-card').count()==1
        assert page.locator('.property-card').get_attribute('data-id')=='VP-101'
        page.locator('#search-form [type=reset]').click()
        page.wait_for_function('document.querySelectorAll(".property-card").length===16')
        page.locator('#search-form [name=pool]').check()
        page.locator('#search-form [name=parking]').select_option('2')
        apply()
        assert page.locator('.property-card').count()==6
        page.locator('#sort').select_option('price-asc')
        ids=page.locator('.property-card').evaluate_all('(cards)=>cards.map(c=>c.dataset.id)')
        assert ids==['VP-109','VP-116','VP-111','VP-114','VP-104','VP-103'],ids
        page.locator('#search-form [name=minPrice]').fill('99999999')
        apply()
        assert page.locator('#search-empty').is_visible()
        page.locator('#clear-search').click()
        page.wait_for_function('document.querySelectorAll(".property-card").length===16')
        page.locator('#search-form [name=minArea]').fill('200')
        page.locator('#search-form [name=maxArea]').fill('100')
        apply()
        assert 'área mínima' in page.locator('#filter-error').inner_text()
        checks.append('Filtros combinados, ordenação por preço, estado vazio, limpeza e intervalos inválidos')

        for query,count in [('collection=mcmv',2),('collection=lancamentos',1),('collection=campo&minLand=1000',2),('collection=praia&purpose=temporada&guests=6',2),('type=Kitnet',1),('purpose=alugar&pets=on',2),('purpose=comprar&beds=3&baths=3&gated=on',2)]:
            go('imoveis.html?'+query)
            assert page.locator('.property-card').count()==count,(query,page.locator('.property-card').count())
        go('imoveis.html?purpose=alugar')
        page.locator('#search-form [name=remember]').check()
        apply()
        go('imoveis.html')
        assert page.locator('#search-form [name=purpose]').input_value()=='alugar'
        assert page.locator('.property-card').count()==4
        checks.append('Coleções MCMV/campo/praia/lançamentos, tipologia sem exemplares, comodidades informadas e preferências opcionais')

        # Favoritos persistem e o comparador respeita o limite máximo de três.
        go('imoveis.html?sort=featured')
        for index in range(4):
            page.locator('.property-card').nth(index).locator('[data-favorite]').click()
            page.locator('.property-card').nth(index).locator('[data-compare]').click()
        assert page.locator('#favorite-count').inner_text()=='4'
        assert page.locator('[data-compare]:checked').count()==3
        assert 'até três' in page.locator('#toast').inner_text()
        page.locator('#compare-bar [data-open-compare]').click()
        assert page.locator('#compare-dialog').is_visible()
        assert page.locator('.compare-table thead th').count()==4
        assert 'Banheiros' in page.locator('.compare-table').inner_text()
        page.keyboard.press('Escape')
        go('favoritos.html')
        assert page.locator('.property-card').count()==4
        page.reload(wait_until='networkidle')
        assert page.locator('.property-card').count()==4
        page.locator('#clear-favorites').click()
        assert page.locator('#confirm-dialog').is_visible()
        page.locator('#confirm-no').click()
        assert page.locator('.property-card').count()==4
        page.locator('[data-favorite]').first.click()
        assert page.locator('.property-card').count()==3
        assert page.evaluate('document.activeElement.matches("[data-favorite]")')
        checks.append('Favoritos persistentes, confirmação de limpeza, foco após remoção e comparador de até três imóveis')

        # Todas as páginas individuais têm cinco espaços, navegação e nenhum mapa falso.
        for i in range(101,117):
            go(f'imovel.html?id=VP-{i}')
            assert page.locator('.detail-heading h1').count()==1
            assert page.locator('.gallery-panel .gallery-thumbs button').count()==5
            assert 'SEM FOTO REAL' in page.locator('.gallery-panel').inner_text()
            assert page.locator('iframe').count()==0
        page.locator('.gallery-panel .gallery-next').click()
        assert '2 / 5' in page.locator('.gallery-panel').inner_text()
        page.locator('.gallery-expand').click()
        assert page.locator('#gallery-dialog').is_visible()
        page.locator('#expanded-gallery .gallery-next').click()
        assert '2 / 5' in page.locator('#expanded-gallery').inner_text()
        page.keyboard.press('End')
        assert '5 / 5' in page.locator('#expanded-gallery').inner_text()
        page.keyboard.press('Escape')
        page.locator('.reference-panel').click()
        assert page.locator('#reference-dialog').is_visible()
        assert 'NÃO É FOTO' in page.locator('#reference-dialog').inner_text()
        page.keyboard.press('Escape')
        go('imovel.html?id=VP-inexistente')
        assert 'ainda não faz parte' in page.locator('h1').inner_text()
        checks.append('Dezesseis páginas de detalhes, carrossel/miniaturas/lightbox, referência separada, código inexistente e ausência de mapa inventado')

        go('imovel.html?id=VP-103')
        page.locator('.property-contact button').filter(has_text='FALAR COM CORRETOR').click()
        page.locator('#interest-form [name=name]').fill('<img src=x onerror=alert(1)>')
        page.locator('#interest-form [type=checkbox]').check()
        page.locator('#interest-form [type=submit]').click()
        message=page.locator('#contact-message').inner_text()
        assert 'VP-103' in message and 'imovel.html?id=VP-103' in message
        assert '<img' in message and page.locator('#contact-message img').count()==0
        assert page.locator('#send-message').is_hidden()
        assert 'não configurado' in page.locator('#contact-config-note').inner_text()
        page.keyboard.press('Escape')
        go('imovel.html?id=VP-109')
        date=page.locator('.date-interest [name=checkin]').get_attribute('min')
        from datetime import date as Date,timedelta
        start=Date.fromisoformat(date)+timedelta(days=7)
        page.locator('.date-interest [name=checkin]').fill(start.isoformat())
        page.locator('.date-interest [name=checkout]').fill(start.isoformat())
        page.locator('.date-interest [type=submit]').click()
        assert 'posterior' in page.locator('.date-interest .form-error').inner_text()
        page.locator('.date-interest [name=checkout]').fill((start+timedelta(days=3)).isoformat())
        page.locator('.date-interest [type=submit]').click()
        page.locator('#interest-form [name=name]').fill('Alex Demo')
        page.locator('#interest-form [type=checkbox]').check()
        page.locator('#interest-form [type=submit]').click()
        assert 'Datas não consultadas' in page.locator('#contact-message').inner_text()
        page.keyboard.press('Escape')
        checks.append('Mensagem com código/link, proteção contra HTML injetado, contato não configurado e período sem reserva real')

        go('simulador.html')
        page.locator('#loan-form [name=rate]').fill('0')
        page.locator('#loan-form [type=submit]').click()
        assert '888,89' in page.locator('#loan-result strong').inner_text()
        page.locator('#loan-form [name=rate]').fill('10')
        page.locator('#loan-form [type=submit]').click()
        assert 'Taxa anual efetiva' in page.locator('#loan-result').inner_text()
        page.locator('#loan-form [name=deposit]').fill('500000')
        page.locator('#loan-form [type=submit]').click()
        assert 'entrada deve ser menor' in page.locator('#loan-error').inner_text()
        checks.append('Simulador Price, taxa anual efetiva informada, juros zero e entrada inválida; sem proposta ou MCMV inventado')

        go('anuncie.html')
        form=page.locator('#advertise-form')
        for name,value in [('name','Alex Demo'),('email','alex@example.com'),('phone','11999990000'),('city','Cidade Demo'),('district','Bairro Demo'),('price','500000'),('description','Descrição fictícia para o imóvel de exemplo.')]:
            form.locator(f'[name={name}]').fill(value)
        form.locator('[name=type]').select_option('Apartamento')
        form.locator('[name=consent]').check()
        form.locator('[type=submit]').click()
        assert page.locator('#advertise-preview').is_visible()
        assert 'não enviada' in page.locator('#advertise-text').inner_text()
        assert page.locator('#advertise-send').is_hidden()
        stored=page.evaluate('JSON.stringify({...localStorage})')
        assert 'alex@example.com' not in stored and '11999990000' not in stored
        form.locator('[name=city]').fill('Outra cidade')
        assert page.locator('#advertise-preview').is_hidden()
        checks.append('Anúncio gera prévia, não salva contato, não transmite fotos e invalida prévia quando editado')

        # Painel local: salvar, organizar, ocultar, excluir e restaurar sem tocar em outras chaves.
        go('admin.html')
        assert page.locator('.admin-row').count()==16
        page.evaluate('localStorage.setItem("outro-projeto","preservar")')
        page.locator('.admin-row').first.locator('button').first.click()
        page.locator('#property-editor [name=name]').fill('Apartamento Aurora Editado')
        first_room=page.locator('#admin-gallery li').first.locator('span').inner_text()
        page.locator('#admin-gallery li').first.locator('button').last.click()
        assert page.locator('#admin-gallery li').first.locator('span').inner_text()!=first_room
        page.locator('#property-editor [type=submit]').click()
        go('imovel.html?id=VP-101')
        assert 'Editado' in page.locator('h1').inner_text()
        go('admin.html')
        page.locator('#admin-new').click()
        for name,value in [('name','Casa de Teste'),('city','Cidade Demo'),('district','Bairro Demo'),('price','345000'),('area','100'),('description','Descrição completa e fictícia do cadastro de teste.')]:
            page.locator(f'#property-editor [name={name}]').fill(value)
        page.locator('#property-editor [name=type]').select_option('Casa térrea')
        page.locator('#property-editor [name=status]').select_option('demo')
        page.locator('#property-editor [type=submit]').click()
        assert page.locator('.admin-row').count()==17
        created=page.locator('.admin-row').filter(has_text='Casa de Teste')
        created.locator('button').first.click()
        page.locator('#property-editor [name=status]').select_option('oculto')
        page.locator('#property-editor [type=submit]').click()
        go('imoveis.html?city=Cidade+Demo')
        assert page.locator('.property-card').count()==0
        go('admin.html')
        page.locator('.admin-row').filter(has_text='Casa de Teste').locator('.danger').click()
        page.locator('#confirm-yes').click()
        assert page.locator('.admin-row').count()==16
        page.locator('#admin-reset').click()
        page.locator('#confirm-yes').click()
        assert page.locator('.admin-row').count()==16
        assert page.evaluate('localStorage.getItem("outro-projeto")')=='preservar'
        assert 'Editado' not in page.locator('.admin-row').first.inner_text()
        page.locator('[data-admin-tab=leads]').click()
        assert page.locator('#admin-leads').is_visible()
        page.locator('[data-admin-tab=brokers]').click()
        page.locator('#broker-editor [name=specialty]').fill('Especialidade demonstrativa editada')
        page.locator('#broker-editor [type=submit]').click()
        go('corretores.html')
        assert page.locator('.broker-card').count()==3
        assert 'Especialidade demonstrativa editada' in page.locator('.broker-card').first.inner_text()
        checks.append('Painel local: edição, ordem dos espaços, cadastro, ocultação, exclusão, restauração, interessados fictícios e perfis de corretor')

        # Páginas e elementos não podem extrapolar a tela em nenhum dos breakpoints.
        paths=['','imoveis.html?sort=featured','imovel.html?id=VP-103','imovel.html?id=VP-109','favoritos.html','luxo.html','minha-casa.html','corretores.html','anuncie.html','simulador.html','sobre.html','contato.html','admin.html']
        for path in paths:
            go(path)
            assert page.locator('main').count()==1
            assert page.locator('h1').count()==1
            for width in [320,390,768,1440]:
                page.set_viewport_size({'width':width,'height':900})
                overflow=page.evaluate('document.documentElement.scrollWidth>innerWidth')  # Força cálculo do layout após o redimensionamento.
                if overflow:
                    print('ELEMENTOS FORA DA TELA:',page.evaluate('Array.from(document.querySelectorAll("body *")).map(e=>({tag:e.tagName,classe:e.className,direita:e.getBoundingClientRect().right})).filter(x=>x.direita>innerWidth+1)'))  # Diagnóstico específico, não esconde overflow.
                    page.screenshot(path=str(OUT/'overflow-debug.png'),full_page=True)  # Evidência para correção real.
                assert not overflow,(path,width,page.evaluate('document.documentElement.scrollWidth'))
            if path=='':
                page.evaluate('document.querySelectorAll("img").forEach(i=>i.loading="eager")')
                page.wait_for_function('Array.from(document.images).every(i=>i.complete)')
                assert not page.evaluate('Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src)')
                page.screenshot(path=str(OUT/'desktop-completo.png'),full_page=True)
                page.set_viewport_size({'width':390,'height':844})
                page.evaluate('window.scrollTo(0,0)')
                page.screenshot(path=str(OUT/'celular-primeira-tela.png'))
                page.locator('.menu-toggle').click()
                assert page.locator('#main-menu').is_visible()
                assert page.locator('#main-menu a:visible').count()==11
                page.keyboard.press('Escape')
                assert page.locator('#main-menu').is_hidden()
                page.evaluate('window.scrollTo(0,1800)')
                assert page.locator('#site-header').bounding_box()['y']<1
        checks.append('Treze rotas, quatro larguras (320–1440px), sem overflow, onze links móveis, Escape e menu aderente')

        # Armazenamento corrompido ou bloqueado não pode derrubar a aplicação.
        page.evaluate('localStorage.setItem("viva-prime-demo-v1:preferences","{quebrado")')
        go('imoveis.html?sort=featured')
        assert page.locator('.property-card').count()==16
        blocked=browser.new_context(viewport={'width':390,'height':844})
        blocked.add_init_script('Storage.prototype.getItem=function(){throw new Error("bloqueado")};Storage.prototype.setItem=function(){throw new Error("bloqueado")};')
        blocked_page=blocked.new_page()
        blocked_page.goto(base+'imoveis.html',wait_until='networkidle')
        assert blocked_page.locator('.property-card').count()==16
        assert not blocked_page.locator('.filter-disclosure').evaluate('(e)=>e.open')
        blocked_page.locator('.filter-disclosure>summary').click()
        assert blocked_page.locator('#search-form').is_visible()
        blocked_page.locator('[data-favorite]').first.click()
        assert blocked_page.locator('#favorite-count').inner_text()=='1'
        assert blocked_page.locator('.storage-warning').is_visible()
        blocked.close()
        checks.append('Armazenamento corrompido/bloqueado tem alternativa em memória e aviso; dados de outros projetos preservados')
        assert not errors,errors
        assert not missing,missing
        assert not external,external
        assert not writes,writes
        checks.append('Zero erros JavaScript, 404, dependências externas ou envio de formulários')
        browser.close()
    server.shutdown()  # Não deixa o servidor de teste em execução.
    report={'status':'APROVADO','checks':checks,'errors':errors,'missing':missing,'external':external,'writes':writes}
    (OUT/'testes.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))

if __name__=='__main__':
    main()  # Execução manual, sem instalar dependências na página entregue.
