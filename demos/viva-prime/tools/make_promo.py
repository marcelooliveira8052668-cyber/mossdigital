"""Renderiza capa editorial e card a partir da própria demo, sem publicação."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from PIL import Image, ImageOps
from playwright.sync_api import sync_playwright
import io
import shutil

DEMO=Path(__file__).resolve().parent.parent  # Pasta desta demonstração.
REPO=DEMO.parents[1]  # Raiz mossdigital.
PROMO=REPO/'divulgacao/instagram/viva-prime'  # Fontes editáveis e PNG.
COPY=REPO.parent/'04 - Divulgacao/VIVA Prime Imoveis'  # Cópia de fácil acesso solicitada pelo proprietário.

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass  # Evita mensagens de cada recurso da captura.

def main():
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(REPO)))  # Só recursos locais.
    Thread(target=server.serve_forever,daemon=True).start()  # Servidor temporário e não público.
    base=f'http://127.0.0.1:{server.server_port}'  # Não será divulgado na arte.
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge')  # Mesma renderização usada nos testes de interface.
        page=browser.new_page(viewport={'width':1440,'height':1000},device_scale_factor=1,reduced_motion='reduce')  # Estado estável sem animações.
        page.goto(base+'/demos/viva-prime/',wait_until='networkidle')  # Captura somente a própria home.
        image=Image.open(io.BytesIO(page.screenshot())).convert('RGB')  # Sem fotos externas adicionais na arte.
        image.save(PROMO/'captura-demo.webp','WEBP',quality=90)  # Referência editável, não montagem de supostos clientes.
        ImageOps.fit(image,(1200,750),centering=(.5,0)).save(DEMO/'entrega/card-viva-prime.webp','WEBP',quality=88)  # Card pronto, ainda não inserido no catálogo.
        page.set_viewport_size({'width':1080,'height':1350})  # Dimensão exata do feed 4:5.
        page.goto(base+'/divulgacao/instagram/viva-prime/Capa%20Instagram%20-%20VIVA%20Prime.html',wait_until='networkidle')  # Fonte HTML independente e editável.
        assert page.evaluate('document.documentElement.scrollWidth')==1080  # Não permite corte horizontal da arte.
        page.screenshot(path=str(PROMO/'Capa Instagram - VIVA Prime.png'))  # PNG final.
        browser.close()  # Libera navegador e memória.
    server.shutdown()  # Não mantém servidor temporário aberto.
    COPY.mkdir(parents=True,exist_ok=True)  # Pasta própria, sem alterar divulgações existentes.
    for name in ['Capa Instagram - VIVA Prime.html','Capa Instagram - VIVA Prime.png','captura-demo.webp','LEGENDA E INSTRUCOES.txt']:
        shutil.copy2(PROMO/name,COPY/name)  # A cópia conserva fonte e dependência local da arte.
    print(f'Capa 1080 × 1350, card e legenda preparados. Cópia: {COPY}. Sem publicação.')  # Não sugere postagem automática.

if __name__=='__main__':
    main()  # Ferramenta opcional de desenvolvimento, não dependência do site final.
