"""Regressões locais com fotos reais e API Supabase simulada, sem dados reais."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from urllib.parse import urlparse
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '.moss-local/ponto-ajuste'
class H(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
class Server(ThreadingHTTPServer):
    request_queue_size = 128

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    server = Server(('127.0.0.1',0),partial(H,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}'
    errors=[];missing=[];external=[];writes=[]
    with sync_playwright() as p:
        b=p.chromium.launch(channel='msedge')
        c=b.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce')
        c.route('https://**/*',lambda r:(external.append(r.request.url),r.abort())[-1])
        page=c.new_page();page.on('pageerror',lambda e:errors.append(str(e)))
        page.on('response',lambda r:missing.append(r.url) if r.status==404 else None)
        page.on('request',lambda r:writes.append(r.url) if r.method not in ['GET','HEAD'] else None)
        page.goto(base+'/demos/ponto-ajuste/',wait_until='load')
        page.evaluate('window.scrollTo(0,document.body.scrollHeight)')
        page.wait_for_timeout(400);page.evaluate('window.scrollTo(0,0)');page.wait_for_timeout(200)
        page.screenshot(path=str(OUT/'desktop.png'),full_page=True)
        page.screenshot(path=str(OUT/'primeira-tela.png'))
        assert page.locator('main img').count()==8
        quebradas=page.evaluate('Array.from(document.images).filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute("src"))')
        assert not quebradas,quebradas
        for a in page.locator('a[href^="#"]').all():assert page.locator(a.get_attribute('href')).count()==1
        for filtro,qtd in [('maquina',3),('manual',3),('todas',6)]:
            page.locator(f'[data-filtro={filtro}]').click()
            assert page.locator('.foto:visible').count()==qtd
        page.locator('.foto').first.click();assert page.locator('#lightbox').is_visible()
        page.locator('#foto-proxima').click();assert page.locator('#foto-numero').inner_text()=='2 / 6'
        page.keyboard.press('ArrowLeft');assert page.locator('#foto-numero').inner_text()=='1 / 6'
        page.keyboard.press('Escape');assert not page.locator('#lightbox').is_visible()
        page.locator('.foto').last.click();page.locator('#foto-anterior').click();assert page.locator('#foto-numero').inner_text()=='5 / 6'
        page.locator('#fechar-foto').click()
        page.locator('[data-servico=reparos]').click();assert page.locator('#servico').input_value()=='reparos'
        page.locator('#form-pedido button[type=submit]').click();assert page.locator('#mensagem-pronta').is_hidden()
        page.locator('#nome').fill('<script>teste</script>')
        page.locator('#peca').select_option(label='Camisa ou blusa')
        page.locator('#detalhes').fill('Trocar um botão e avaliar uma costura aberta.')
        page.locator('#form-pedido button[type=submit]').click()
        href=page.locator('#abrir-whatsapp').get_attribute('href');assert href.startswith('https://wa.me/5511942038103?text=')
        assert '%3Cscript%3E' in href
        assert 'Nada foi enviado' in page.locator('#form-status').inner_text()
        page.locator('#detalhes').fill('Alteração de teste');assert page.locator('#mensagem-pronta').is_hidden()
        page.locator('#form-pedido button[type=submit]').click()
        page.locator('button[type=reset]').click();assert page.locator('#mensagem-pronta').is_hidden()
        for details in page.locator('details').all():details.locator('summary').click();assert details.get_attribute('open') is not None
        for width in [320,390,768,1024,1440]:
            page.set_viewport_size({'width':width,'height':900});page.goto(base+'/demos/ponto-ajuste/',wait_until='load')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
            if width==390:
                page.screenshot(path=str(OUT/'celular.png'),full_page=True)
                page.locator('.menu-toggle').click();assert page.locator('.menu-toggle').get_attribute('aria-expanded')=='true'
                page.locator('#menu a').first.click();assert page.locator('.menu-toggle').get_attribute('aria-expanded')=='false'
                page.locator('.menu-toggle').click();page.keyboard.press('Escape');assert page.locator('.menu-toggle').get_attribute('aria-expanded')=='false'
        page.goto(base+'/demos/ponto-ajuste/painel.html',wait_until='load')
        assert page.locator('#login button').is_disabled()
        assert 'desativado' in page.locator('#aviso-config').inner_text()
        assert not writes,writes
        assert not external,external
        # Integração: respostas simuladas; não comprova RLS num projeto real.
        servicos=[{'codigo':k,'nome':f'Serviço do banco {i}','descricao':'Texto remoto seguro.'} for i,k in enumerate(['ajustes','reparos','acabamentos','transformacao'])]
        pedidos=[];calls=[];autorizado=True
        def api(route):
            nonlocal autorizado,pedidos
            req=route.request;path=urlparse(req.url).path;calls.append((req.method,path))
            data=[];code=200
            if path.endswith('/token'):
                autorizado=json.loads(req.post_data)['email']=='dono@example.invalid'
                data={'access_token':'token-ficticio','expires_in':3600}
            elif path.endswith('/logout'):code=204;data=None
            elif path.endswith('pa_administradores'):data=[{'id':'dono-teste'}] if autorizado else []
            elif path.endswith('pa_servicos'):data=servicos
            elif path.endswith('pa_pedidos'):
                assert req.headers.get('authorization')=='Bearer token-ficticio'
                if req.method=='POST':
                    item={'id':'00000000-0000-0000-0000-000000000001','criado_em':'2026-11-12T12:00:00Z','status':'novo',**json.loads(req.post_data)};pedidos.append(item);data=[item];code=201
                elif req.method=='PATCH':pedidos[0]['status']=json.loads(req.post_data)['status'];data=pedidos
                elif req.method=='DELETE':data=pedidos.copy();pedidos=[]
                else:data=pedidos
            route.fulfill(status=code,content_type='application/json',body=json.dumps(data) if data is not None else '')
        c.route('https://ponto-ajuste-teste.supabase.co/**',api)
        config="window.PONTO_AJUSTE_CONFIG={usarSupabase:true,supabaseUrl:'https://ponto-ajuste-teste.supabase.co',supabaseChavePublica:'sb_publishable_teste',whatsapp:'5511942038103'};"
        c.route('**/demos/ponto-ajuste/config.js',lambda r:r.fulfill(content_type='text/javascript',body=config))
        page.goto(base+'/demos/ponto-ajuste/',wait_until='networkidle')
        assert 'carregado do Supabase' in page.locator('#modo-banco').inner_text()
        assert 'Serviço do banco' in page.locator('#lista-servicos h3').first.inner_text()
        page.goto(base+'/demos/ponto-ajuste/painel.html',wait_until='load')
        page.locator('#email').fill('outro@example.invalid');page.locator('#senha').fill('senha-ficticia')
        page.locator('#login button').click();page.wait_for_function("document.getElementById('painel-status').textContent.includes('não está autorizado')")
        assert page.locator('#gestao').is_hidden()
        page.locator('#email').fill('dono@example.invalid');page.locator('#senha').fill('senha-ficticia');page.locator('#login button').click()
        page.wait_for_function("!document.getElementById('gestao').hidden")
        page.locator('#cliente').fill('<img src=x onerror=alert(1)>')
        page.locator('#contato').fill('Contato fictício');page.locator('#descricao-pedido').fill('Teste sem dados reais.')
        page.locator('#novo-pedido button').click();page.wait_for_function("document.querySelectorAll('.pedido').length===1")
        assert page.locator('.pedido img').count()==0
        page.locator('.pedido select').select_option('combinado');page.locator('.pedido .salvar').click()
        page.wait_for_function("document.getElementById('painel-status').textContent.includes('Status salvo')")
        page.locator('#filtro-status').select_option('novo');assert page.locator('.pedido').count()==0
        page.locator('#filtro-status').select_option('todos');assert page.locator('.pedido').count()==1
        page.once('dialog',lambda d:d.accept());page.locator('.pedido .excluir').click()
        page.wait_for_function("document.getElementById('painel-status').textContent.includes('Pedido excluído')")
        assert not pedidos
        page.locator('#sair').click();page.wait_for_function("document.getElementById('gestao').hidden")
        assert page.evaluate('localStorage.length===0 && sessionStorage.length===0')
        page.goto(base+'/demos/ponto-ajuste/painel.html',wait_until='load');assert page.locator('#gestao').is_hidden()
        assert page.evaluate("(()=>{window.PONTO_AJUSTE_CONFIG.supabaseChavePublica='sb_secret_proibida';try{PontoBanco.configuracao();return false}catch{return true}})()")
        assert any(method=='POST' and path.endswith('pa_pedidos') for method,path in calls)
        # PDF do manual e verificação das demais rotas.
        for path in ['fontes-fotos.html','MANUAL-DO-CLIENTE.html']:
            page.goto(base+'/demos/ponto-ajuste/'+path,wait_until='load')
            page.set_viewport_size({'width':390,'height':844});assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),path
        page.pdf(path=str(OUT/'Manual-do-comprador.pdf'),format='A4',print_background=True)
        assert not errors,errors
        assert not missing,missing
        b.close()
    server.shutdown()
    print('OK: oito fotos, ancoras, menu, filtros, lightbox/teclado, formulario/WhatsApp sem envio, reset, 320–1440px, painel desativado, API simulada com login autorizado/negado, criar/listar/alterar/excluir, chaves privadas rejeitadas, sessao nao persistida e manual PDF.')
    print('Limite: conexao e RLS reais ainda precisam de projeto Supabase e verificacao do proprietario.')

if __name__=='__main__':main()
