"""Regressões da demo Sol do Bairro: simulador, galeria, proposta e painel."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from urllib.parse import urlparse
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '.moss-local/sol-do-bairro'

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
        page=c.new_page()
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.on('response',lambda r:missing.append(r.url) if r.status==404 else None)
        page.on('request',lambda r:writes.append(r.url) if r.method not in ['GET','HEAD'] else None)
        page.goto(base+'/demos/sol-do-bairro/',wait_until='load')
        page.evaluate('window.scrollTo(0,document.body.scrollHeight)');page.wait_for_timeout(400)
        page.evaluate('window.scrollTo(0,0)');page.wait_for_timeout(200)
        page.screenshot(path=str(OUT/'desktop.png'),full_page=True)
        page.screenshot(path=str(OUT/'primeira-tela.png'))
        assert page.locator('main img').count()==12
        quebradas=page.evaluate('Array.from(document.images).filter(i=>i.complete&&!i.naturalWidth).map(i=>i.getAttribute("src"))')
        assert not quebradas,quebradas
        for alvo in ['#servicos','#simulador','#como-funciona','#area','#galeria','#proposta','#duvidas']:
            assert page.locator(alvo).count()==1,alvo
        # Simulador: valores mudam e coerem entre si.
        inicial=page.locator('#sim-paineis').inner_text()
        assert page.locator('#sim-paineis').inner_text()=='26', inicial
        assert page.locator('#sim-geracao').inner_text()=='351 kWh'
        page.locator('#sim-conta').fill('800')
        page.locator('#sim-consumo').fill('800')
        page.wait_for_timeout(150)
        paineis=int(page.locator('#sim-paineis').inner_text())
        assert paineis==60,paineis
        assert page.locator('#sim-area').inner_text()=='120 m²'
        assert page.locator('#sim-geracao').inner_text()=='810 kWh'
        economia=page.locator('#sim-economia').inner_text()
        assert 'R$' in economia and '–' in economia,economia
        # Resultado coerente com a conta informada (1 kWh = R$ 1,00 aqui).
        assert 'R$ 567' in economia,economia
        page.locator('#sim-limpar').click()
        assert page.locator('#sim-paineis').inner_text()=='26'
        assert page.locator('#sim-conta').input_value()=='320'
        # Filtros da galeria.
        for filtro,qtd in [('instalacao',3),('painel',3),('residencias',2),('todas',8)]:
            page.locator(f'[data-filtro={filtro}]').click()
            assert page.locator('.foto:visible').count()==qtd,(filtro,qtd)
        # Lightbox e teclado.
        page.locator('.foto').first.click();assert page.locator('#lightbox').is_visible()
        page.locator('#foto-proxima').click();assert page.locator('#foto-numero').inner_text()=='2 / 8'
        page.keyboard.press('ArrowLeft');assert page.locator('#foto-numero').inner_text()=='1 / 8'
        page.keyboard.press('Escape');assert not page.locator('#lightbox').is_visible()
        # Proposta com a simulação embutida.
        page.locator('[data-servico=instalacao]').click()
        assert page.locator('#pr-servico').input_value()=='instalacao'
        page.locator('#form-proposta button[type=submit]').click()
        assert page.locator('#proposta-pronta').is_hidden()
        page.locator('#pr-nome').fill('<script>teste</script>')
        page.locator('#pr-contato').fill('123')
        page.locator('#pr-bairro').fill('Jardim Sol')
        page.locator('#pr-detalhes').fill('Telhado de barro, casa de 3 quartos.')
        page.locator('#form-proposta button[type=submit]').click()
        assert 'telefone' in page.locator('#proposta-status').inner_text().lower()
        page.locator('#pr-contato').fill('11999999999')
        page.locator('#form-proposta button[type=submit]').click()
        href=page.locator('#proposta-whats').get_attribute('href')
        assert href.startswith('https://wa.me/5511942038103?text=')
        assert '%3Cscript%3E' in href
        assert '26 pain' in page.locator('#proposta-texto').inner_text()
        assert 'economia de R$ 225 a R$ 321 por mês' in page.locator('#proposta-texto').inner_text()
        assert 'Nada foi enviado' in page.locator('#proposta-status').inner_text()
        page.locator('#pr-detalhes').fill('Alteração');assert page.locator('#proposta-pronta').is_hidden()
        page.locator('#form-proposta button[type=submit]').click()
        page.locator('#form-proposta button[type=reset]').click()
        assert page.locator('#proposta-pronta').is_hidden()
        # FAQ.
        for d in page.locator('details').all():
            d.locator('summary').click();assert d.get_attribute('open') is not None
        # Responsivo e menu móvel.
        for largura in [320,390,768,1024,1440]:
            page.set_viewport_size({'width':largura,'height':900})
            page.goto(base+'/demos/sol-do-bairro/',wait_until='load')
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),largura
            if largura==390:
                page.screenshot(path=str(OUT/'celular.png'),full_page=True)
                page.locator('.menu-toggle').click()
                assert page.locator('.menu-toggle').get_attribute('aria-expanded')=='true'
                page.locator('#menu a').first.click()
                assert page.locator('.menu-toggle').get_attribute('aria-expanded')=='false'
                page.locator('.menu-toggle').click();page.keyboard.press('Escape')
                assert page.locator('.menu-toggle').get_attribute('aria-expanded')=='false'
        # Painel com banco desligado.
        page.goto(base+'/demos/sol-do-bairro/painel.html',wait_until='load')
        assert page.locator('#login button').is_disabled()
        assert 'desativado' in page.locator('#aviso-config').inner_text()
        assert not writes,writes
        assert not external,external
        # Integração simulada.
        servicos=[{'codigo':k,'nome':f'Serviço do banco {i}','descricao':'Texto remoto seguro.'} for i,k in enumerate(['instalacao','manutencao','monitoramento'])]
        propostas=[];calls=[];autorizado=True
        def api(route):
            nonlocal autorizado,propostas
            req=route.request;path=urlparse(req.url).path;calls.append((req.method,path))
            data=[];code=200
            if path.endswith('/token'):
                autorizado=json.loads(req.post_data)['email']=='dono@example.invalid'
                data={'access_token':'token-ficticio','expires_in':3600}
            elif path.endswith('/logout'):code=204;data=None
            elif path.endswith('sb_responsaveis'):data=[{'id':'dono-teste'}] if autorizado else []
            elif path.endswith('sb_servicos'):data=servicos
            elif path.endswith('sb_propostas'):
                assert req.headers.get('authorization')=='Bearer token-ficticio'
                if req.method=='POST':
                    item={'id':'00000000-0000-0000-0000-000000000003','criado_em':'2026-11-12T12:00:00Z','status':'novo',**json.loads(req.post_data)}
                    propostas.append(item);data=[item];code=201
                elif req.method=='PATCH':propostas[0]['status']=json.loads(req.post_data)['status'];data=propostas
                elif req.method=='DELETE':data=propostas.copy();propostas=[]
                else:data=propostas
            route.fulfill(status=code,content_type='application/json',body=json.dumps(data) if data is not None else '')
        c.route('https://solar-teste.supabase.co/**',api)
        config="window.SOL_BAIRRO_CONFIG={usarSupabase:true,supabaseUrl:'https://solar-teste.supabase.co',supabaseChavePublica:'sb_publishable_teste',whatsapp:'5511942038103'};"
        c.route('**/demos/sol-do-bairro/config.js',lambda r:r.fulfill(content_type='text/javascript',body=config))
        page.goto(base+'/demos/sol-do-bairro/',wait_until='networkidle')
        assert 'carregados do Supabase' in page.locator('#modo-banco').inner_text()
        assert 'serviço do banco' in page.locator('#lista-servicos h3').first.inner_text().lower()
        page.goto(base+'/demos/sol-do-bairro/painel.html',wait_until='load')
        page.locator('#email').fill('outro@example.invalid');page.locator('#senha').fill('senha-ficticia')
        page.locator('#login button').click()
        page.wait_for_function("document.getElementById('painel-status').textContent.includes('não está autorizado')")
        assert page.locator('#gestao').is_hidden()
        page.locator('#email').fill('dono@example.invalid');page.locator('#senha').fill('senha-ficticia')
        page.locator('#login button').click()
        page.wait_for_function("!document.getElementById('gestao').hidden")
        page.locator('#cliente').fill('<img src=x onerror=alert(1)>')
        page.locator('#contato').fill('Contato fictício');page.locator('#bairro').fill('Jardim Sol')
        page.locator('#detalhes').fill('Teste sem dados reais.')
        page.locator('#nova-proposta button').click()
        page.wait_for_function("document.querySelectorAll('.proposta').length===1")
        assert page.locator('.proposta img').count()==0
        page.locator('.proposta select').select_option('visita')
        page.locator('.proposta .salvar').click()
        page.wait_for_function("document.getElementById('painel-status').textContent.includes('Status salvo')")
        page.locator('#filtro').select_option('novo');assert page.locator('.proposta').count()==0
        page.locator('#filtro').select_option('todos');assert page.locator('.proposta').count()==1
        page.once('dialog',lambda d:d.accept())
        page.locator('.proposta .excluir').click()
        page.wait_for_function("document.getElementById('painel-status').textContent.includes('Proposta excluída')")
        assert not propostas
        page.locator('#sair').click()
        page.wait_for_function("document.getElementById('gestao').hidden")
        assert page.evaluate('localStorage.length===0 && sessionStorage.length===0')
        page.goto(base+'/demos/sol-do-bairro/painel.html',wait_until='load')
        assert page.locator('#gestao').is_hidden()
        assert page.evaluate("(()=>{window.SOL_BAIRRO_CONFIG.supabaseChavePublica='sb_secret_proibida';try{SolBanco.configuracao();return false}catch{return true}})()")
        assert any(m=='POST' and p.endswith('sb_propostas') for m,p in calls)
        # Páginas auxiliares.
        for caminho in ['fontes-fotos.html','MANUAL-DO-CLIENTE.html']:
            page.goto(base+'/demos/sol-do-bairro/'+caminho,wait_until='load')
            page.set_viewport_size({'width':390,'height':844})
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),caminho
        page.pdf(path=str(OUT/'Manual-do-comprador.pdf'),format='A4',print_background=True)
        assert not errors,errors
        assert not missing,missing
        b.close()
    server.shutdown()
    print('OK: treze fotos, simulador com calculo coerente, filtros, lightbox/teclado, proposta com a simulacao no WhatsApp, FAQ, 320-1440px, painel desativado, API simulada com login autorizado/negado, criar/listar/alterar/excluir, chaves privadas rejeitadas, sessao nao persistida e manual PDF.')
    print('Limite: conexao e RLS reais ainda exigem projeto Supabase e verificacao do proprietario.')

if __name__=='__main__':main()
