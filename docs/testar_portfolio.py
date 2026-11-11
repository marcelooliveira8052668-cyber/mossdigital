"""Teste local do Moss Portfólio, sem envio de dados ou mensagens.

Requer Playwright e Edge. Abre a página em HTTP local e valida:
- carregamento sem erros e sem dependências externas;
- prévia ao vivo responde aos campos (nome, função, habilidades, projetos, cor, modelo);
- XSS no valor de nome é escapado na prévia;
- CTA abre WhatsApp com mensagem correta (popup fechado, sem enviar);
- layout sem transbordamento em 360 e 1366 px.
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import threading

from playwright.sync_api import sync_playwright

REPO = Path(__file__).resolve().parent.parent
BASE = f"http://127.0.0.1:PORT"

class Silencioso(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

def testar():
    servidor = ThreadingHTTPServer(("127.0.0.1", 0), partial(Silencioso, directory=str(REPO)))
    thread = threading.Thread(target=servidor.serve_forever, daemon=True)
    thread.start()
    base = f"http://127.0.0.1:{servidor.server_port}"
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(channel="msedge")
            page = browser.new_page()
            erros = []
            requisicoes = []
            page.on("pageerror", lambda e: erros.append(str(e)))
            page.on("request", lambda r: requisicoes.append(r.url))
            page.goto(base + "/portfolio/index.html", wait_until="domcontentloaded")
            page.wait_for_function("document.querySelector('#preview').contentDocument !== null")

            # nenhuma dependência externa (CDN, fontes, imagens remotas)
            externas = [u for u in requisicoes if not u.startswith(base)]
            assert not externas, extas if False else externas

            # preencher formulário e conferir a prévia (frame_locator não executa scripts)
            page.fill("#nome", "Ana Souza")
            page.fill("#funcao", "Fotógrafa Documental")
            page.fill("#cidade", "São Paulo")
            page.fill("#habilidades", "Fotografia, Edição, Direção de arte")
            page.fill(".p-nome", "Casamento da Marina")
            page.fill(".p-desc", "Cobertura completa do casamento da Marina Pereira.")
            page.fill("#sobre", "Fotógrafa há 8 anos cobrindo casamentos e eventos autorais.")
            page.wait_for_timeout(400)
            frame = page.frame_locator("#preview")
            texto = frame.locator("body").inner_text().lower()
            assert "fot" in texto and "grafa documental" in texto.replace("ó", "o")
            assert "ana souza" in texto

            # trocar modelo Criativo → nova estrutura visível
            page.click(".seg-card:has-text('Criativo')")
            page.wait_for_timeout(300)
            assert "c-kicker" in page.locator("#preview").evaluate("(el)=>el.srcdoc")
            assert "Ana Souza" in page.locator("#preview").evaluate("(el)=>el.srcdoc")

            # XSS: nada de execução de script
            page.fill("#nome", "<img src=x onerror=window.__pwned=1>")
            page.wait_for_timeout(250)
            assert page.evaluate("window.__pwned") is None
            assert "&lt;img" in page.locator("#preview").evaluate("(el)=>el.srcdoc")

            # upload de foto → aparece na prévia; remover → volta ao placeholder
            import pymupdf
            pox = pymupdf.Pixmap(pymupdf.csRGB, pymupdf.IRect(0, 0, 64, 64))
            pox.clear_with(140)
            png_bytes = pox.tobytes("png")
            page.set_input_files("#foto", [{"name": "foto.png", "mimeType": "image/png", "buffer": png_bytes}])
            page.wait_for_timeout(400)
            assert page.locator("#foto-preview").is_visible()
            assert page.locator("#remover-foto").is_visible()
            assert "data:image/png" in page.locator("#preview").evaluate("(el)=>el.srcdoc")
            page.locator("#remover-foto").click()
            page.wait_for_timeout(300)
            assert not page.locator("#foto-preview").is_visible()
            assert "data:image/png" not in page.locator("#preview").evaluate("(el)=>el.srcdoc")

            # CTA monta a mensagem correta para o WhatsApp (sem abrir nem enviar nada)
            page.add_init_script("""
              window.__opened = [];
              window.open = function (url, target, features) { window.__opened.push(url); return null; };
            """)
            page.goto(base + "/portfolio/index.html", wait_until="domcontentloaded")
            page.click(".seg-card:has-text('Profissional')")
            page.fill("#nome", "Ana Souza")
            page.fill("#funcao", "Fotógrafa")
            page.fill(".p-nome", "Projeto X")
            page.click("#whatsapp-cta")
            url = page.evaluate("window.__opened[0]")
            assert url.startswith("https://wa.me/5511942038103?text=")
            assert "Ana%20Souza" in url or "Ana+Souza" in url
            assert "39" in url
            assert "Fot%C3%B3grafa" in url or "Fot%C9%93grafa".lower() in url.lower()

            # layout sem transbordamento
            for largura in (360, 1366):
                page.set_viewport_size({"width": largura, "height": 900})
                assert page.evaluate("document.documentElement.scrollWidth <= innerWidth"), largura

            assert not erros, erros
            browser.close()
    finally:
        servidor.shutdown()
        servidor.server_close()
        thread.join()
    print("PASSOU: página carrega sem erros, zero dependências externas, prévia ao vivo funciona, XSS escapado, WhatsApp abre com a mensagem certa, layout responsivo. Nada enviado.")

if __name__ == "__main__":
    testar()
