"""Renderiza capa do Instagram e card do portfólio a partir da própria demo, sem publicação."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from PIL import Image, ImageOps
from playwright.sync_api import sync_playwright
import io
import shutil

DEMO = Path(__file__).resolve().parent.parent  # Pasta desta demonstração.
REPO = DEMO.parents[1]  # Raiz mossdigital.
PROMO = REPO / 'divulgacao/instagram/armazem-da-esquina'  # Fontes editáveis e PNG da capa.
COPY = REPO.parent / '04 - Divulgacao/Armazem da Esquina'  # Cópia de fácil acesso pedida pelo proprietário.
CAPA = 'Capa Instagram - Armazem da Esquina.png'  # Nome final do PNG.

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass  # Evita mensagens de cada recurso da captura.

def main():
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(DEMO)))  # Só recursos desta demo.
    Thread(target=server.serve_forever, daemon=True).start()  # Servidor temporário e não público.
    base = f'http://127.0.0.1:{server.server_port}'  # Endereço local, jamais divulgado na arte.
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')  # Mesma renderização usada nos testes.
        page = browser.new_page(viewport={'width': 1440, 'height': 1000}, device_scale_factor=1, reduced_motion='reduce')
        page.goto(base + '/index.html', wait_until='networkidle')  # Captura somente a própria home.
        assert page.locator('.top-card').count() == 10, 'O ranking da home mudou; confira antes de gerar a arte.'
        image = Image.open(io.BytesIO(page.screenshot())).convert('RGB')  # Sem fotos externas na arte.
        PROMO.mkdir(parents=True, exist_ok=True)
        image.save(PROMO / 'captura-demo.webp', 'WEBP', quality=90)  # Referência editável, não montagem.
        entrega = DEMO / 'entrega'
        entrega.mkdir(exist_ok=True)
        ImageOps.fit(image, (1200, 750), centering=(.5, 0)).save(entrega / 'card-armazem-da-esquina.webp', 'WEBP', quality=88)  # Card pronto, ainda fora do catálogo.
        browser.close()  # Libera navegador; a capa é renderizada pelo servidor do repositório abaixo.
    server.shutdown()  # Não mantém servidor temporário aberto.

    # Servidor na raiz do repositório, para a fonte da capa encontrar a captura.
    raiz = ThreadingHTTPServer(('127.0.0.1', 0), partial(Quiet, directory=str(REPO)))
    Thread(target=raiz.serve_forever, daemon=True).start()
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(channel='msedge')
            page = browser.new_page(viewport={'width': 1080, 'height': 1350}, device_scale_factor=1, reduced_motion='reduce')
            page.goto(f'http://127.0.0.1:{raiz.server_port}/divulgacao/instagram/armazem-da-esquina/Capa%20Instagram%20-%20Armazem%20da%20Esquina.html', wait_until='networkidle')
            page.wait_for_function('Array.from(document.images).every(img => img.complete && img.naturalWidth > 0)')
            assert page.evaluate('document.documentElement.scrollWidth') == 1080  # Sem corte horizontal.
            assert page.evaluate('document.documentElement.scrollHeight') == 1350  # Sem corte vertical.
            page.screenshot(path=str(PROMO / CAPA))  # PNG final da capa.
            browser.close()
    finally:
        raiz.shutdown()  # Nenhum servidor temporário sobra aberto.

    COPY.mkdir(parents=True, exist_ok=True)  # Pasta própria, sem alterar divulgações existentes.
    for nome in ['Capa Instagram - Armazem da Esquina.html', CAPA, 'captura-demo.webp', 'LEGENDA E INSTRUCOES.txt']:
        shutil.copy2(PROMO / nome, COPY / nome)  # Cópia conserva fonte e dependência local da arte.
    print(f'Capa 1080 × 1350 e card preparados. Cópia: {COPY}. Sem publicação.')

if __name__ == '__main__':
    main()  # Ferramenta opcional de desenvolvimento, não dependência do site final.
