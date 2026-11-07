# Importa caminhos para localizar os arquivos da integração ainda não publicada.
from pathlib import Path
# Importa argumentos para escolher entre prévia local e endereço público.
import sys
# Importa a leitura do histórico Git sem alterar arquivos ou branches.
import subprocess
# Importa o navegador automatizado e suas verificações de interface.
from playwright.sync_api import sync_playwright, expect
# Localiza a raiz do repositório que guarda o código didático.
REPO = Path(__file__).resolve().parents[3]
# Define a página real do catálogo de sistemas.
URL = 'https://mossdigital.com.br/sistemas.html'
# Recebe opcionalmente o worktree da prévia, sem modificar o site remoto durante o teste.
preview = Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else None
# Lê o catálogo anterior à integração para conferir todos os cartões já existentes.
baseline = subprocess.check_output(['git', 'show', '3f2dad2:sistemas.html'], cwd=REPO).decode('utf-8')
# Inicia uma sessão de navegador independente dos dados pessoais do usuário.
with sync_playwright() as playwright:
    # Usa o Chrome instalado no ambiente.
    browser = playwright.chromium.launch(channel='chrome')
    # Abre uma aba com largura de desktop.
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    # Substitui somente a resposta HTML na sessão de teste para medir o catálogo anterior.
    page.route('**/sistemas.html*', lambda route: route.fulfill(status=200, content_type='text/html; charset=utf-8', body=baseline))
    # Abre a referência anterior usando os mesmos estilos públicos do site.
    page.goto(URL, wait_until='networkidle')
    # Guarda o HTML de cada cartão antigo para conferir preservação exata.
    previous = page.locator('article.card').evaluate_all('cards => cards.map(card => card.outerHTML)')
    # Remove a substituição da referência antes de testar a nova página.
    page.unroute('**/sistemas.html*')
    # Configura somente os dois novos arquivos locais quando o teste é de pré-publicação.
    if preview:
        # Usa a página modificada no worktree sem enviá-la ao servidor.
        page.route('**/sistemas.html*', lambda route: route.fulfill(status=200, content_type='text/html; charset=utf-8', body=(preview / 'sistemas.html').read_text(encoding='utf-8')))
        # Disponibiliza a nova imagem apenas na sessão do navegador de teste.
        page.route('**/assets/img/previas/moss-condo.webp*', lambda route: route.fulfill(status=200, content_type='image/webp', body=(preview / 'assets' / 'img' / 'previas' / 'moss-condo.webp').read_bytes()))
    # Reabre a página na versão de prévia ou na publicação real, conforme o argumento.
    response = page.goto(URL + '?moss-condo=portfolio', wait_until='networkidle')
    # Confere que o catálogo respondeu sem erro HTTP.
    assert response.status == 200
    # Localiza somente o cartão aprovado da MOSS CONDO.
    card = page.locator('article.card').filter(has=page.get_by_role('heading', name='MOSS CONDO — Gestão de Condomínios', exact=True))
    # Confere que o novo cartão aparece uma única vez.
    expect(card).to_have_count(1)
    # Confere a descrição solicitada pelo usuário.
    expect(card).to_contain_text('Plataforma demonstrativa para síndicos, moradores e portarias, com controle financeiro, reservas, manutenção e comunicação.')
    # Confere o destino do botão sem depender da aparência visual.
    expect(card.get_by_role('link', name='Explorar demonstração', exact=False)).to_have_attribute('href', 'demos/moss-condo/')
    # Aguarda uma imagem real de 1600 pixels de largura, não um ícone quebrado.
    page.wait_for_function("document.querySelector('img[src=\"assets/img/previas/moss-condo.webp\"]')?.naturalWidth === 1600")
    # Guarda os cartões da nova versão para conferir o restante do catálogo.
    current = page.locator('article.card').evaluate_all('cards => cards.map(card => card.outerHTML)')
    # Confere que apenas um cartão foi acrescentado e que todos os anteriores permaneceram iguais.
    assert len(current) == len(previous) + 1 and current[1:] == previous
    # Testa o botão real, que deve abrir a demonstração publicada em uma nova aba.
    with page.expect_popup() as popup:
        # Aciona o botão específico da MOSS CONDO.
        card.get_by_role('link', name='Explorar demonstração', exact=False).click()
    # Confere o título da aplicação na aba aberta pelo catálogo.
    expect(popup.value.get_by_role('heading', name='Seu condomínio, perfeitamente conectado.')).to_be_visible()
    # Fecha a nova aba depois da verificação do destino.
    popup.value.close()
    # Verifica também a apresentação do cartão nas telas pequenas.
    for width in [320, 390, 768]:
        # Ajusta a largura sem alterar os dados do site.
        page.set_viewport_size({'width': width, 'height': 900})
        # Confere que a página não exige rolagem horizontal indevida.
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        # Confere que o acesso à demonstração continua disponível.
        expect(card.get_by_role('link', name='Explorar demonstração', exact=False)).to_be_visible()
    # Fecha o navegador depois dos cenários de integração.
    browser.close()
# Informa o tipo de verificação realmente realizado.
print('OK: cartao, foto 1600 x 1000, descricao, link real, responsividade e todos os cartoes anteriores preservados; modo ' + ('previa' if preview else 'publico'))
