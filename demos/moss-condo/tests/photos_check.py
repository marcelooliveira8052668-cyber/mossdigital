# Importa caminhos para consultar as fotos incluídas somente nesta demonstração.
from pathlib import Path
# Importa o leitor de JSON para verificar o registro das fontes e licenças.
import json
# Importa o navegador automatizado e as verificações de interface.
from playwright.sync_api import sync_playwright, expect
# Localiza a pasta principal da MOSS CONDO.
ROOT = Path(__file__).resolve().parents[1]
# Define o endereço de teste do build estático em subdiretório.
BASE = 'http://127.0.0.1:8796/dist/'
# Lê a ficha de origem gerada durante a preparação das fotografias.
sources = json.loads((ROOT / 'docs' / 'photo-sources.json').read_text(encoding='utf-8'))
# Confere que as nove fotos selecionadas possuem origem e licença documentadas.
assert len(sources) == 9 and all(item['source'] and item['license'] for item in sources)
# Confere a existência de três variantes locais para cada fotografia.
assert len(list((ROOT / 'src' / 'assets' / 'photos').glob('*.webp'))) == 27
# Guarda eventuais requisições externas que não deveriam existir durante a visita.
external = []
# Inicia uma sessão independente para verificar as fotografias.
with sync_playwright() as playwright:
    # Usa o navegador Chrome já instalado no ambiente.
    browser = playwright.chromium.launch(channel='chrome')
    # Cria um contexto novo sem usar o armazenamento pessoal do navegador.
    context = browser.new_context(viewport={'width': 1440, 'height': 1000})
    # Registra acessos externos para conferir a independência dos provedores de fotos.
    context.on('request', lambda request: external.append(request.url) if not request.url.startswith('http://127.0.0.1:8796/') else None)
    # Abre uma aba para visitar todas as experiências com fotografia.
    page = context.new_page()
    # Testa entrada, perfis e módulos administrativos sem pular nenhuma foto contextual.
    for route in ['/', '/sindico/painel', '/morador/painel', '/portaria/painel', '/sindico/moradores', '/sindico/financeiro', '/sindico/ocorrencias', '/sindico/mural', '/portaria/visitantes', '/portaria/entregas']:
        # Abre a rota correspondente ao cenário atual.
        page.goto(BASE + '#' + route)
        # Aguarda um título principal para não confundir carregamento com a tela pronta.
        expect(page.locator('main h1')).to_be_visible()
        # Aguarda a conclusão real de todas as fotografias presentes na tela atual.
        page.wait_for_function("[...document.querySelectorAll('.condo-photo img')].length > 0 && [...document.querySelectorAll('.condo-photo img')].every(image => image.complete && image.naturalWidth > 0)")
        # Confere que todas as fotos possuem uma descrição alternativa útil.
        assert page.locator('.condo-photo img').evaluate_all("images => images.every(image => image.alt.length > 15)")
    # Abre a galeria de áreas comuns com suas cinco fotos diferentes.
    page.goto(BASE + '#/sindico/reservas')
    # Confere a quantidade exata de cartões reserváveis.
    expect(page.locator('.condo-area-card')).to_have_count(5)
    # Faz cada foto entrar na área visível para disparar seu carregamento sob demanda.
    for image in page.locator('.condo-area-card img').all():
        # Rola até a foto atual sem depender de pausas artificiais no teste.
        image.scroll_into_view_if_needed()
        # Confere que o navegador terminou de decodificar a imagem.
        expect(image).to_have_js_property('complete', True)
        # Confere que o arquivo carregado é uma imagem válida, não uma resposta de erro.
        assert image.evaluate('image => image.naturalWidth > 0')
    # Seleciona a quadra por sua ação fotográfica funcional.
    page.get_by_role('button', name='Ver disponibilidade: Quadra', exact=True).click()
    # Confere o filtro selecionado no campo de disponibilidade.
    expect(page.get_by_label('Área comum', exact=True)).to_have_value('Quadra')
    # Confere o anúncio acessível de seleção do cartão.
    expect(page.get_by_role('button', name='Ver disponibilidade: Quadra', exact=True)).to_have_attribute('aria-pressed', 'true')
    # Aciona novamente a seleção para remover o filtro da galeria.
    page.get_by_role('button', name='Ver disponibilidade: Quadra', exact=True).click()
    # Confere que todas as áreas voltaram a aparecer na disponibilidade.
    expect(page.get_by_label('Área comum', exact=True)).to_have_value('')
    # Salva uma evidência desktop com as fotografias das áreas comuns.
    page.screenshot(path=str(ROOT / 'docs' / 'screenshots' / 'reservas-desktop.png'), full_page=True)
    # Confere fotos e layout nas larguras de celular mais estreitas e de tablet.
    for width in [320, 390, 768]:
        # Altera somente o tamanho da janela de teste.
        page.set_viewport_size({'width': width, 'height': 900})
        # Aguarda a aplicação recalcular o layout responsivo.
        page.wait_for_function('document.documentElement.scrollWidth <= window.innerWidth')
        # Confere que as cinco ações continuam disponíveis, inclusive com teclado.
        expect(page.get_by_role('button', name='Ver disponibilidade:', exact=False)).to_have_count(5)
    # Fecha a sessão de navegação normal.
    context.close()
    # Cria uma sessão sem cache para simular arquivos indisponíveis.
    broken = browser.new_context()
    # Bloqueia apenas as fotografias, sem alterar arquivos da aplicação.
    broken.route('**/*.webp', lambda route: route.abort())
    # Abre uma aba que deverá exibir a mensagem de recuperação.
    failure = broken.new_page()
    # Visita a entrada com as imagens deliberadamente bloqueadas.
    failure.goto(BASE)
    # Confere que a alternativa visual é apresentada em vez de uma imagem quebrada.
    expect(failure.get_by_text('Fotografia ilustrativa indisponível', exact=True)).to_be_visible()
    # Confere que a falha de imagem não impede a entrada na demonstração.
    expect(failure.get_by_role('button', name='Acessar demonstração')).to_be_enabled()
    # Encerra a sessão de falha controlada.
    broken.close()
    # Fecha o navegador de teste.
    browser.close()
# Recusa dependências externas durante a navegação da aplicação compilada.
assert not external, external
# Resume somente as verificações efetivamente realizadas.
print('OK: 9 fotos, 27 variantes WebP, todos os módulos, galeria funcional, descrições, fallback, responsividade e nenhuma requisição externa.')
