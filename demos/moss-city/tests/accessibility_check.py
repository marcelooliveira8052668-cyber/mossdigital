# Importa caminhos para localizar a ferramenta de auditoria instalada apenas nesta demo.
from pathlib import Path
# Importa JSON para registrar os resultados sem comentários em seu conteúdo.
import json
# Importa o navegador automatizado e as verificações de carregamento.
from playwright.sync_api import sync_playwright, expect
# Define a pasta principal desta prévia independente.
ROOT = Path(__file__).resolve().parents[1]
# Guarda problemas encontrados para que não sejam escondidos pelo relatório final.
results = []
# Inicia uma sessão de auditoria independente dos dados pessoais do usuário.
with sync_playwright() as playwright:
    # Reaproveita o Chrome instalado sem alterar o ambiente global.
    browser = playwright.chromium.launch(channel='chrome')
    # Abre uma aba de teste em uma largura de desktop.
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    # Impede qualquer acesso real ao provedor de tiles durante a auditoria automatizada.
    page.route('https://tile.openstreetmap.org/**', lambda route: route.abort())
    # Audita entrada, comando, mapa, portal, cadastros, relatórios e cabeçalhos móveis dos gestores.
    for width, route in [(1440, '/'), (1440, '/administrador/comando'), (1440, '/administrador/mapa'), (1440, '/administrador/obras'), (1440, '/administrador/solicitacoes'), (1440, '/administrador/relatorios'), (1440, '/cidadao/portal'), (390, '/'), (390, '/administrador/mapa'), (390, '/administrador/obras'), (390, '/obras/comando'), (390, '/ambiental/ambiente')]:
        # Define a largura atual antes de abrir a tela.
        page.set_viewport_size({'width': width, 'height': 1000})
        # Abre o build em subdiretório, não apenas o servidor de desenvolvimento.
        page.goto('http://127.0.0.1:8797/dist/#' + route)
        # Aguarda um título principal para evitar auditar somente uma tela de carregamento.
        expect(page.locator('main h1')).to_be_visible()
        # Insere a ferramenta apenas no navegador de teste, sem adicioná-la à aplicação de produção.
        page.add_script_tag(path=str(ROOT / 'node_modules' / 'axe-core' / 'axe.min.js'))
        # Executa regras WCAG A e AA, incluindo verificações automáticas de contraste.
        report = page.evaluate("async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})")
        # Guarda cada falha e os elementos necessários para sua correção.
        results.append({'width': width, 'route': route, 'theme': 'night', 'violations': [{'id': violation['id'], 'impact': violation['impact'], 'nodes': [{'html': node['html'], 'summary': node['failureSummary']} for node in violation['nodes']]} for violation in report['violations']]})
    # Abre uma segunda aba para auditar a variante diurna sem afetar as telas noturnas.
    day_page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    # Impede tiles reais também na sessão do modo dia.
    day_page.route('https://tile.openstreetmap.org/**', lambda route: route.abort())
    # Define a escolha de tema antes de o aplicativo ler o armazenamento local.
    day_page.add_init_script("localStorage.setItem('moss-city:theme:v1', 'day')")
    # Audita a entrada, o comando, os módulos e o cabeçalho móvel com a paleta diurna ativa.
    for width, route in [(1440, '/'), (1440, '/administrador/comando'), (1440, '/administrador/obras'), (1440, '/administrador/relatorios'), (1440, '/administrador/mapa'), (390, '/administrador/comando'), (390, '/administrador/obras')]:
        # Define a largura atual antes de abrir a tela diurna.
        day_page.set_viewport_size({'width': width, 'height': 1000})
        # Abre o build com a variante de tema já aplicada.
        day_page.goto('http://127.0.0.1:8797/dist/#' + route)
        # Confirma que a aplicação carregou com a classe do modo dia.
        expect(day_page.locator('.moss-city')).to_have_class('moss-city theme-day')
        # Aguarda um título principal antes de auditar.
        expect(day_page.locator('main h1')).to_be_visible()
        # Insere a ferramenta de auditoria apenas nesta aba de teste.
        day_page.add_script_tag(path=str(ROOT / 'node_modules' / 'axe-core' / 'axe.min.js'))
        # Executa as mesmas regras WCAG sobre o modo dia.
        report = day_page.evaluate("async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})")
        # Guarda as falhas identificadas na variante diurna.
        results.append({'width': width, 'route': route, 'theme': 'day', 'violations': [{'id': violation['id'], 'impact': violation['impact'], 'nodes': [{'html': node['html'], 'summary': node['failureSummary']} for node in violation['nodes']]} for violation in report['violations']]})
    # Fecha a aba do modo dia ao terminar a auditoria.
    day_page.close()
    # Fecha o navegador ao terminar a auditoria de todas as telas.
    browser.close()
# Guarda o resultado completo, sem sugerir que substitui testes com pessoas e leitores de tela.
(ROOT / 'docs' / 'accessibility-results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
# Exibe o resultado de forma reproduzível no terminal.
print(json.dumps(results, ensure_ascii=True, indent=2))
# Interrompe a verificação se houver qualquer violação automatizada registrada.
assert all(not item['violations'] for item in results), 'Consulte docs/accessibility-results.json'
