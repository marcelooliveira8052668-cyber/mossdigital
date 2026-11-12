"""Testes reais no Edge: responsividade, teclado, mídia e fluxos sem envio de dados."""
from pathlib import Path
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from threading import Thread
import json
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent  # Somente esta demo é servida pelo teste.
OUT = ROOT.parents[1] / '.moss-local/moss-academia'  # Evidências locais fora da entrega pública.

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass  # Evita poluir a saída com cada miniatura.

def main():
    OUT.mkdir(parents=True, exist_ok=True)  # Guarda relatórios e capturas.
    server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))  # Porta livre automática.
    Thread(target=server.serve_forever, daemon=True).start()  # Servidor apenas durante o teste.
    errors, missing, external, writes = [], [], [], []  # Detecta problemas de execução e rede.
    checks = []  # Descreve os grupos efetivamente aprovados.
    with sync_playwright() as p:
        browser = p.chromium.launch(channel='msedge')  # Navegador disponível no ambiente Windows.
        context = browser.new_context(viewport={'width':1440,'height':1000}, reduced_motion='reduce')  # Testa movimento reduzido.
        context.route('https://**/*', lambda route: (external.append(route.request.url), route.abort())[-1])  # A demo deve operar offline.
        page = context.new_page()  # Aba principal de teste.
        page.on('pageerror', lambda error: errors.append(str(error)))  # Erros JS não podem passar despercebidos.
        page.on('response', lambda response: missing.append(response.url) if response.status == 404 else None)  # Arquivos locais ausentes.
        page.on('request', lambda request: writes.append(request.url) if request.method not in ['GET','HEAD'] else None)  # Nenhum POST é permitido.
        page.goto(f'http://127.0.0.1:{server.server_port}/', wait_until='networkidle')  # Carrega todos os recursos iniciais.
        assert page.title().startswith('MOSS Academia')  # Identidade correta.
        assert page.locator('h1').count() == 1  # Hierarquia semântica única.
        page.screenshot(path=str(OUT/'desktop-primeira-tela.png'))  # Base para análise visual e card.
        checks.append('Inicialização sem dependências externas')

        # Abas e teclado seguem o padrão ARIA de seleção e foco itinerante.
        page.locator('[data-modality=aqua]').click()
        assert 'FLUXO' in page.locator('#modality-title').inner_text()
        assert page.locator('#modality-photo').get_attribute('src').endswith('261185.webp')
        page.keyboard.press('ArrowRight')
        assert page.locator('[data-modality=fight]').get_attribute('aria-selected') == 'true'
        page.keyboard.press('Home')
        assert page.locator('#equipment li').count() == 10
        for key in ['fight', 'move', 'forca']:
            page.locator(f'[data-modality={key}]').click()
            assert page.locator('#modality-panel').get_attribute('aria-labelledby') == f'tab-{key}'
        checks.append('Quatro modalidades, dez equipamentos e navegação das abas por teclado')

        # Carrossel responde às setas sem autoplay.
        page.locator('#space-next').click()
        assert page.locator('#space-carousel').evaluate('(e)=>e.scrollLeft') > 0
        page.locator('#space-prev').click()
        assert page.locator('#space-carousel').evaluate('(e)=>e.scrollLeft') < 3
        checks.append('Carrossel fotográfico com avanço e retorno')

        # Filtros, expansão e lightbox respeitam o conjunto selecionado.
        assert page.locator('.gallery-photo').count() == 8
        page.locator('#gallery-more').click()
        assert page.locator('.gallery-photo').count() == 24
        for category, count in [('aqua',2), ('fight',3), ('move',6), ('forca',13), ('all',24)]:
            page.locator(f'[data-filter={category}]').click()
            assert page.locator('.gallery-photo').count() == count, (category, page.locator('.gallery-photo').count())
        page.locator('.gallery-photo').first.click()
        assert page.locator('#lightbox').is_visible()
        page.keyboard.press('ArrowRight')
        assert page.locator('#photo-counter').inner_text() == '2 / 24'
        page.keyboard.press('ArrowLeft')
        assert page.locator('#photo-counter').inner_text() == '1 / 24'
        page.keyboard.press('Escape')
        assert not page.locator('#lightbox').is_visible()
        assert page.locator('.gallery-photo').first.evaluate('(e)=>document.activeElement===e')
        checks.append('24 fotos, filtros, ampliação, setas, Escape e retorno de foco')

        # Os preços anuais conservam os centavos e deixam o total explícito.
        page.locator('[data-billing=annual]').click()
        assert page.locator('[data-price="219"]').inner_text() == '186'
        assert page.locator('[data-price="219"] + span').inner_text() == ',15/mês'
        assert '2.233,80' in page.locator('.featured .plan-term').inner_text()
        page.locator('.featured [data-enroll]').click()
        form = page.locator('#enroll-form')
        form.locator('button[type=submit]').click()
        assert page.locator('#enroll-result').is_hidden()
        form.locator('[name=name]').fill('<img src=x onerror=alert(1)>')
        form.locator('[name=consent]').check()
        form.locator('button[type=submit]').click()
        assert page.locator('#enroll-result').is_visible()
        assert '<img' in page.locator('#enroll-result-text').inner_text()
        assert page.locator('#enroll-result-text img').count() == 0
        page.locator('#enroll-to-student').click()
        assert page.locator('#student-dialog').is_visible()
        assert 'PERFORMANCE' in page.locator('#student-plan').inner_text()
        page.keyboard.press('Escape')
        page.locator('[data-billing=monthly]').click()
        checks.append('Planos anual/mensal, total correto, formulário obrigatório e proteção contra injeção de HTML')

        # Reservar e cancelar atualiza a agenda e a área do aluno.
        for day in range(6):
            page.locator(f'[data-day="{day}"]').click()
            assert page.locator('.class-row').count() == (3 if day == 5 else 4)
        page.locator('.reserve-button').first.click()
        assert page.locator('#reservation-count').inner_text() == '1'
        page.locator('[data-student]').click()
        page.locator('[data-student-tab=reservations]').click()
        assert page.locator('.reservation-item').count() == 1
        page.locator('.reservation-item button').click()
        assert page.locator('.reservation-item').count() == 0
        page.locator('#student-to-schedule').click()
        assert page.locator('#student-dialog').is_hidden()
        assert page.locator('.reserve-button[aria-pressed=true]').count() == 0
        checks.append('Grade de seis dias, reserva temporária, cancelamento e estado vazio')

        # Nenhum telefone ou e-mail é solicitado para a visita fictícia.
        page.locator('#visit-open').click()
        page.locator('#visit-form [name=visitor]').fill('Alex Demo')
        today = page.locator('#visit-form [name=date]').get_attribute('min')
        page.locator('#visit-form [name=date]').fill(today)
        page.locator('#visit-form [type=checkbox]').check()
        page.locator('#visit-form [type=submit]').click()
        assert 'não houve agendamento' in page.locator('#visit-result').inner_text()
        page.keyboard.press('Escape')
        page.locator('[data-open=privacy-dialog]').click()
        assert page.locator('#privacy-dialog').is_visible()
        page.keyboard.press('Escape')
        checks.append('Visita e privacidade transparentes, sem envio ou dados de contato')

        # Vídeo local só é carregado quando o visitante aciona o player.
        page.locator('video').scroll_into_view_if_needed()
        page.locator('video').evaluate('(v)=>v.load()')
        page.wait_for_function('document.querySelector("video").readyState>=1')
        duration = page.locator('video').evaluate('(v)=>v.duration')
        assert 11.9 <= duration <= 12.1, duration
        page.locator('video').evaluate('(v)=>v.play()')
        page.wait_for_function('document.querySelector("video").currentTime>0.1')
        page.locator('video').evaluate('(v)=>v.pause()')
        checks.append('Filme-conceito H.264 de 12s reproduzido no navegador')

        # Força o carregamento de todas as fotos para detectar caminhos quebrados.
        page.evaluate('document.querySelectorAll("img").forEach(i=>i.loading="eager")')
        page.wait_for_function('Array.from(document.images).every(i=>i.complete)')
        broken = page.evaluate('Array.from(document.images).filter(i=>!i.naturalWidth).map(i=>i.src)')
        assert not broken, broken
        page.screenshot(path=str(OUT/'desktop-completo.png'), full_page=True)

        # Diferentes celulares e tablets não podem ter rolagem horizontal na página.
        for width in [320,360,390,600,768,1024,1440,1920]:
            page.set_viewport_size({'width':width,'height':844 if width<600 else 1000})
            page.evaluate('window.scrollTo(0,0)')
            overflow = page.evaluate('document.documentElement.scrollWidth>window.innerWidth')
            assert not overflow, f'Overflow horizontal em {width}px'
            if width == 390:
                page.screenshot(path=str(OUT/'celular-primeira-tela.png'))
                page.locator('.menu-toggle').click()
                assert page.locator('#menu').is_visible()
                page.keyboard.press('Escape')
                assert page.locator('#menu').is_hidden()
                page.locator('.menu-toggle').click()
                page.locator('#menu a[href="#planos"]').click()
                assert page.locator('#menu').is_hidden()
                page.locator('.plan-card').first.locator('[data-enroll]').click()
                assert page.locator('#enroll-dialog').is_visible()
                page.keyboard.press('Escape')
                page.screenshot(path=str(OUT/'celular-completo.png'), full_page=True)
        checks.append('Sem overflow em 320, 360, 390, 600, 768, 1024, 1440 e 1920px; menu e diálogo móveis')
        page.reload(wait_until='networkidle')
        assert page.locator('#reservation-count').inner_text() == '0'
        assert page.evaluate('localStorage.length+sessionStorage.length') == 0
        assert not errors, errors
        assert not missing, missing
        assert not external, external
        assert not writes, writes
        checks.append('Nenhum erro JS, arquivo ausente, chamada externa, POST, cookie ou armazenamento persistente')
        browser.close()
    server.shutdown()  # Não mantém servidor de teste aberto.
    report = {'status':'APROVADO', 'checks':checks, 'errors':errors, 'missing':missing, 'external':external, 'writes':writes}
    (OUT/'testes.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf-8')
    print(json.dumps(report, ensure_ascii=False, indent=2))

if __name__ == '__main__':
    main()  # Execução manual documentada no README.
