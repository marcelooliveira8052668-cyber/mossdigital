"""Teste de currículo com dados fictícios; sem WhatsApp/pagamento reais."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
import base64
import json
import io
from PIL import Image
import pymupdf
from playwright.sync_api import sync_playwright

ROOT=Path(__file__).resolve().parent.parent
OUT=ROOT/'.moss-local'
class H(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
class Server(ThreadingHTTPServer):
    request_queue_size=128

def main():
    server=Server(('127.0.0.1',0),partial(H,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start()
    errors=[]
    with sync_playwright() as p:
        b=p.chromium.launch(channel='msedge');page=b.new_page(viewport={'width':1366,'height':900})
        page.on('pageerror',lambda e:errors.append(str(e)))
        page.goto(f'http://127.0.0.1:{server.server_port}/curriculo/',wait_until='load')
        page.locator('#cv-pedido').click()
        assert 'nome' in page.locator('#cv-status').inner_text()
        page.locator('#cv-nome').fill('João São José')
        page.locator('#cv-titulo').fill('Auxiliar administrativo')
        page.locator('#cv-email').fill('teste@example.invalid')
        page.locator('#cv-resumo').fill('Experiência em organização e atenção ao público. Informação fictícia de teste.')
        page.locator('#cv-habilidades').fill('Organização, comunicação, planilhas')
        page.locator('[data-campo=cargo]').fill('Assistente de teste')
        page.locator('[data-campo=empresa]').fill('Empresa fictícia')
        page.locator('[data-campo=descricao]').fill('Atividades verificáveis de um caso fictício. '*9)
        page.locator('[data-campo=curso]').fill('Ensino médio completo')
        page.locator('[data-campo=instituicao]').fill('Escola fictícia')
        page.evaluate("window.__arquivo=null;window.__nome='';MossCurriculo.baixar=(blob,nome)=>{window.__arquivo=blob;window.__nome=nome};window.__whats=[];window.open=(...a)=>{window.__whats.push(a);return null};true")
        page.locator('#cv-pedido').click()
        pedido=page.evaluate('window.__arquivo.text()')
        data=json.loads(pedido)
        assert data['tipo']=='moss-curriculo'
        assert data['dados']['nome']=='João São José'
        page.locator('#cv-whats').click()
        assert '5511942038103' in page.evaluate('window.__whats[0][0]')
        assert '19%2C90' in page.evaluate('window.__whats[0][0]')
        # Grade visual: cada card de modelo marca o rádio correspondente.
        for i,valor in enumerate(['classico','lateral','topo','minimal','moldura','blocos','semfoto','executivo','trajetoria','retrato']):
            page.locator('.modelo-card').nth(i).click()
            assert page.locator(f'[name=modelo][value={valor}]').is_checked(), valor
        page.locator('[name=publico][value=primeiro-emprego]').check()
        page.locator('#cv-pedido').click()
        first=json.loads(page.evaluate('window.__arquivo.text()'))
        assert not first['dados']['experiencias']
        assert page.locator('#cv-exp-grupo').is_hidden()
        fixture=data['dados']
        fixture['atividades']='Projeto escolar com pesquisa, apresentação e trabalho em equipe.'
        fixture['formacao']*=3
        fixture['experiencias']*=4
        for publico in ['profissional','primeiro-emprego']:
            for modelo in ['classico','lateral','topo','minimal','moldura','blocos','semfoto','executivo','trajetoria','retrato']:
                for previa in [True,False]:
                    f={**fixture,'publico':publico,'modelo':modelo}
                    payload=json.dumps(f,ensure_ascii=False)
                    result=page.evaluate(f"""async()=>{{const b=await MossCurriculo.pdf({payload},{str(previa).lower()});const bytes=new Uint8Array(await b.arrayBuffer());let text='';for(let i=0;i<bytes.length;i++)text+=String.fromCharCode(bytes[i]);return btoa(text)}}""")
                    pdfbytes=base64.b64decode(result)
                    with pymupdf.open(stream=pdfbytes,filetype='pdf') as doc:
                        text='\n'.join(pg.get_text() for pg in doc)
                        assert 'João São José' in text,text[:300]
                        assert 'Auxiliar administrativo' in text
                        assert ('PRÉVIA - MOSS DIGITAL' in text)==previa
                        if publico=='primeiro-emprego':assert 'Assistente de teste' not in text
                        assert all(pg.get_text().strip() for pg in doc)
                        for pg in doc:
                            for block in pg.get_text('dict')['blocks']:
                                if block.get('type')!=0:continue
                                for line in block.get('lines',[]):
                                    for span in line['spans']:
                                        if 'PRÉVIA' in span['text']:continue
                                        x0,y0,x1,y1=span['bbox']
                                        assert x0>=-1 and x1<=pg.rect.width+1,(modelo,span['text'])
                    if not previa:(OUT/f'teste-curriculo-{publico}-{modelo}.pdf').write_bytes(pdfbytes)
        photo=io.BytesIO();Image.new('RGB',(50,60),'#075985').save(photo,'JPEG')
        f={**fixture,'foto':'data:image/jpeg;base64,'+base64.b64encode(photo.getvalue()).decode()}
        result=page.evaluate("async d=>{const b=await MossCurriculo.pdf(d,false);return Array.from(new Uint8Array(await b.arrayBuffer()))}",f)
        with pymupdf.open(stream=bytes(result),filetype='pdf') as doc:assert doc[0].get_images()
        # Os dados importados não podem virar HTML executável nem foto SVG.
        f={**fixture,'nome':'<script>alert(1)</script>'}
        html=page.evaluate('(d)=>MossCurriculo.render(MossCurriculo.validar(MossCurriculo.pacote(d)))',f)
        assert '<script>alert(1)</script>' not in html
        f={**fixture,'foto':'data:image/svg+xml;base64,PHN2Zz4='}
        assert page.evaluate("d=>{try{MossCurriculo.validar(MossCurriculo.pacote(d));return false}catch{return true}}",f)
        for width in [390,320]:
            page.set_viewport_size({'width':width,'height':844})
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth'),width
        page.goto((OUT/'finalizar-curriculo.html').as_uri(),wait_until='load')
        assert page.locator('#cv-final').is_disabled()
        page.locator('#cv-importar').set_input_files({'name':'pedido-curriculo.json','mimeType':'application/json','buffer':pedido.encode('utf-8')})
        page.wait_for_function("!document.getElementById('cv-pago').disabled")
        page.locator('#cv-pago').check()
        with page.expect_download() as dl:
            page.locator('#cv-final').click()
        assert dl.value.suggested_filename.startswith('curriculo-final-')
        assert not errors,errors
        b.close()
    server.shutdown()
    print('OK: pedido, WhatsApp simulado, primeiro emprego sem experiências inventadas, grade visual de 10 modelos, 40 PDFs pesquisáveis/marcados/sem marca, importação/finalização local, 320/390px e validação de dados.')

if __name__=='__main__':main()
