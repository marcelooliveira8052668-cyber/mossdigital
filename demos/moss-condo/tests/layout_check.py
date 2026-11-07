# Importa a automação do navegador para diagnosticar a largura dos elementos.
from playwright.sync_api import sync_playwright
# Abre uma sessão automatizada independente.
with sync_playwright() as playwright:
    # Reaproveita o navegador Chrome instalado na máquina.
    browser = playwright.chromium.launch(channel='chrome')
    # Começa no tamanho de desktop para conferir também a mudança de largura dos gráficos.
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    # Abre o painel administrativo compilado.
    page.goto('http://127.0.0.1:8796/dist/#/sindico/painel')
    # Aguarda o carregamento do painel antes de alterar a largura.
    page.get_by_role('heading', name='Uma gestão à altura.').wait_for()
    # Muda para o tamanho de celular usado no teste principal.
    page.set_viewport_size({'width': 390, 'height': 844})
    # Registra quais elementos ultrapassam a borda direita da janela.
    print(page.evaluate("({width:innerWidth,scroll:document.documentElement.scrollWidth,items:[...document.querySelectorAll('body *')].map(e=>({tag:e.tagName,cls:e.getAttribute('class'),right:e.getBoundingClientRect().right,width:e.getBoundingClientRect().width})).filter(e=>e.right>innerWidth+1).slice(0,30)})"))
    # Guarda uma captura para apoiar a revisão visual do problema.
    page.screenshot(path='docs/screenshots/layout-mobile.png', full_page=True)
    # Fecha o navegador depois do diagnóstico.
    browser.close()
