"""Renderiza capa editável, card e cópia de divulgação sem publicar nada."""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import shutil
from PIL import Image, ImageOps
from playwright.sync_api import sync_playwright

DEMO = Path(__file__).resolve().parent.parent  # Pasta da demonstração.
REPO = DEMO.parents[1]  # Raiz mossdigital.
PROMO = REPO / 'divulgacao/instagram/moss-academia'  # Fonte, captura e PNG finais.
COPY = REPO.parent / '04 - Divulgacao/MOSS Academia'  # Cópia solicitada pelo proprietário.

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass  # Suprime ruído do servidor de renderização.

def main():
    server = ThreadingHTTPServer(('127.0.0.1',0), partial(Quiet, directory=str(REPO)))  # Recursos exclusivamente locais.
    Thread(target=server.serve_forever, daemon=True).start()  # Servidor temporário para capturas.
    base = f'http://127.0.0.1:{server.server_port}'  # URL não divulgada publicamente.
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')  # Renderização igual à da demonstração.
        page = browser.new_page(viewport={'width':1440,'height':1000}, device_scale_factor=1, reduced_motion='reduce')  # Evita capturar animação parcial.
        page.goto(base + '/demos/moss-academia/', wait_until='networkidle')  # Espera a primeira tela completa.
        raw = page.screenshot()  # Captura da própria demo; não é mockup inventado.
        import io  # Conversão em memória, sem arquivo temporário solto.
        image = Image.open(io.BytesIO(raw)).convert('RGB')  # Imagem base para todos os materiais.
        image.save(PROMO / 'captura-demo.webp', 'WEBP', quality=88)  # Fonte visual editável da capa.
        ImageOps.fit(image,(1200,750),centering=(.5,0)).save(DEMO / 'entrega/card-moss-academia.webp', 'WEBP', quality=88)  # Card preparado, não inserido no portal.
        page.set_viewport_size({'width':1080,'height':1350})  # Dimensão exata exigida no Instagram.
        page.goto(base + '/divulgacao/instagram/moss-academia/Capa%20Instagram%20-%20MOSS%20Academia.html', wait_until='networkidle')  # Renderiza a fonte editável.
        assert page.evaluate('document.documentElement.scrollWidth') == 1080  # Impede corte horizontal inesperado.
        page.screenshot(path=str(PROMO / 'Capa Instagram - MOSS Academia.png'))  # PNG final 4:5.
        browser.close()  # Libera o navegador.
    server.shutdown()  # Encerra o serviço temporário.
    COPY.mkdir(parents=True, exist_ok=True)  # Pasta exclusiva, sem tocar nas outras divulgações.
    for filename in ['Capa Instagram - MOSS Academia.png','Capa Instagram - MOSS Academia.html','captura-demo.webp','LEGENDA E INSTRUCOES.txt']:
        shutil.copy2(PROMO / filename, COPY / filename)  # A fonte permanece funcional na cópia.
    print(f'Capa 1080 × 1350, card e fontes editáveis preparados. Cópia: {COPY}')  # Confirma somente criação, nunca publicação.

if __name__ == '__main__':
    main()  # Recriação manual documentada.
