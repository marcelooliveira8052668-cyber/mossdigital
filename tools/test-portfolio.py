"""Teste da página do portfólio no navegador, sem enviar dados nem publicar.

Cobre o que a modernização não pode quebrar: carregamento sem erros,
estouro de tela de 320 a 1440 px, escolha de modelo, cor, projetos,
rascunho local, download do pedido, FAQ e a prévia ao vivo.
Uso: python tools/test-portfolio.py
"""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
import json

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / '.moss-local' / 'relatorio-portfolio'


class H(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Server(ThreadingHTTPServer):
    request_queue_size = 128


def main():
    server = Server(('127.0.0.1', 0), partial(H, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    base = f'http://127.0.0.1:{server.server_port}'
    OUT.mkdir(parents=True, exist_ok=True)
    checks, errors, faltando = [], [], []

    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')
        page = browser.new_page(viewport={'width': 1440, 'height': 950})
        page.on('pageerror', lambda e: errors.append(str(e)))
        page.on('response', lambda r: faltando.append(f'{r.status} {r.url}')
                if r.status >= 400 and r.url.startswith(base) else None)

        page.goto(base + '/portfolio/', wait_until='networkidle')
        assert page.locator('h1').count() == 1
        assert page.locator('.model').count() == 3, 'Os três modelos continuam na vitrine'
        assert page.locator('.steps li').count() == 4
        assert page.locator('#email-panel').is_hidden(), 'Painel de e-mail segue oculto sem serviço'
        checks.append('página carrega com h1, três modelos, quatro passos e painel de e-mail oculto')

        # Sem rolagem horizontal em nenhuma largura.
        for largura in (1440, 1024, 768, 390, 320):
            page.set_viewport_size({'width': largura, 'height': 900})
            page.evaluate('window.scrollTo(0, 0)')
            sem_erro = page.evaluate('document.documentElement.scrollWidth <= innerWidth')
            assert sem_erro, f'Transbordamento em {largura}px'
        checks.append('sem rolagem horizontal em 320, 390, 768, 1024 e 1440px')
        page.set_viewport_size({'width': 1440, 'height': 950})

        # Escolha de modelo muda a prévia ao vivo.
        antes = page.locator('#preview').get_attribute('srcdoc')
        page.locator('label.seg-card').nth(1).click()
        assert page.locator('input[name=template][value=criativo]').is_checked()
        page.wait_for_timeout(400)
        depois = page.locator('#preview').get_attribute('srcdoc')
        assert depois != antes, 'A prévia deve mudar ao trocar de modelo'
        checks.append('trocar de modelo atualiza a prévia ao vivo')

        # Cor principal fica marcada.
        page.locator('.swatch').nth(2).click()
        assert 'active' in (page.locator('.swatch').nth(2).get_attribute('class') or '')
        checks.append('seletor de cor principal responde ao clique')

        # Projetos: adicionar linha e preencher.
        page.locator('#add-projeto').click()
        assert page.locator('.projeto-linha').count() >= 1
        page.locator('.projeto-linha input').first.fill('Projeto de teste fictício')
        checks.append('adicionar projeto cria a linha e aceita texto')

        # Preenchimento mínimo para gerar o pedido.
        page.locator('#nome').fill('Pessoa de Teste')
        page.locator('#funcao').fill('Designer')
        # O rascunho é salvo após os debounces da prévia (120 ms) e do próprio
        # rascunho (400 ms); esperar a condição evita corrida com tempo fixo.
        page.wait_for_function(
            "() => { const l = document.getElementById('rascunho-linha'); return !!l && !l.hidden; }",
            timeout=5000)
        assert page.locator('#rascunho-linha').is_visible(), 'O rascunho local deve aparecer'
        assert 'Rascunho salvo' in page.locator('#rascunho-nota').inner_text()
        checks.append('rascunho local é anunciado no formulário')

        # Download do pedido (.json) e painel de resultado.
        with page.expect_download() as info:
            page.locator('#baixar-pedido').click()
        download = info.value
        assert download.suggested_filename.endswith('.json'), download.suggested_filename
        assert page.locator('#resultado-pdf').is_visible(), 'O resultado deve aparecer após baixar'
        checks.append('download do pedido em .json e painel de resultado visível')

        # Copiar dados mostra aviso honesto, sem envio.
        page.locator('#copiar-pedido').click()
        assert page.locator('#pedido-msg').is_visible()
        checks.append('copiar dados do pedido exibe aviso na própria página')

        # FAQ abre e fecha.
        primeiro = page.locator('.faq details').first
        page.locator('.faq summary').first.click()
        assert primeiro.get_attribute('open') is not None
        checks.append('FAQ opera normalmente')

        page.screenshot(path=str(OUT / 'portfolio-desktop.png'), full_page=True, animations='disabled')
        page.set_viewport_size({'width': 390, 'height': 844})
        page.goto(base + '/portfolio/', wait_until='networkidle')
        page.screenshot(path=str(OUT / 'portfolio-celular.png'), full_page=True, animations='disabled')
        checks.append('capturas desktop e celular salvas')

        # ---------- Currículo ----------
        page.set_viewport_size({'width': 1440, 'height': 950})
        page.goto(base + '/curriculo/', wait_until='networkidle')
        assert page.locator('h1').count() == 1
        assert page.locator('.passos article').count() == 4
        for largura in (1440, 768, 390, 320):
            page.set_viewport_size({'width': largura, 'height': 900})
            page.evaluate('window.scrollTo(0, 0)')
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Transbordamento em {largura}px'
        page.set_viewport_size({'width': 1440, 'height': 950})
        checks.append('currículo sem rolagem horizontal em 320 a 1440px')

        visual_antes = page.locator('#cv-visual').get_attribute('srcdoc') or ''
        page.locator('#cv-nome').fill('Pessoa de Teste')
        page.locator('#cv-titulo').fill('Auxiliar administrativo')
        page.wait_for_timeout(500)
        visual_depois = page.locator('#cv-visual').get_attribute('srcdoc') or ''
        assert visual_depois != visual_antes and 'Pessoa de Teste' in visual_depois
        checks.append('prévia do currículo reflete o que é digitado')

        page.locator('#cv-add-exp').click()
        assert page.locator('#cv-experiencias .item').count() >= 2
        page.locator('.faq summary').first.click()
        assert page.locator('.faq details').first.get_attribute('open') is not None
        page.screenshot(path=str(OUT / 'curriculo-desktop.png'), full_page=True, animations='disabled')
        page.set_viewport_size({'width': 390, 'height': 844})
        page.goto(base + '/curriculo/', wait_until='networkidle')
        page.screenshot(path=str(OUT / 'curriculo-celular.png'), full_page=True, animations='disabled')
        checks.append('currículo: experiência extra, FAQ e capturas desktop/celular')

        assert not errors, errors
        assert not faltando, faltando
        browser.close()

    server.shutdown()
    print(json.dumps({'status': 'APROVADO', 'checks': checks, 'errors': errors, 'missing': faltando},
                     ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
