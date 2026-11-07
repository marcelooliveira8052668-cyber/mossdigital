# Importa caminhos para localizar a biblioteca de auditoria instalada somente nesta demo.
from pathlib import Path
# Importa JSON para registrar o resultado de maneira reproduzível.
import json
# Importa a automação do navegador e suas verificações.
from playwright.sync_api import sync_playwright, expect
# Define a pasta principal desta demonstração.
ROOT = Path(__file__).resolve().parents[1]
# Guarda as observações da auditoria automatizada.
results = []
# Inicia uma sessão independente de auditoria.
with sync_playwright() as playwright:
    # Reaproveita o Chrome instalado sem alterar o sistema.
    browser = playwright.chromium.launch(channel='chrome')
    # Abre uma aba com a largura de desktop.
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    # Verifica as principais experiências em desktop e celular.
    for width, route in [(1440, '/'), (1440, '/sindico/painel'), (1440, '/sindico/moradores'), (1440, '/morador/painel'), (1440, '/portaria/painel'), (390, '/sindico/reservas')]:
        # Define a largura correspondente ao cenário atual.
        page.set_viewport_size({'width': width, 'height': 1000})
        # Abre a rota compilada em um subdiretório.
        page.goto('http://127.0.0.1:8796/dist/#' + route)
        # Aguarda um título visível para evitar auditar apenas o carregamento.
        expect(page.locator('main h1')).to_be_visible()
        # Insere a ferramenta de análise apenas na sessão de teste, não na aplicação entregue.
        page.add_script_tag(path=str(ROOT / 'node_modules' / 'axe-core' / 'axe.min.js'))
        # Executa verificações WCAG A e AA, incluindo contraste de texto.
        report = page.evaluate("async () => await axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})")
        # Guarda problemas com os trechos de interface necessários para corrigi-los.
        results.append({'width': width, 'route': route, 'violations': [{'id': violation['id'], 'impact': violation['impact'], 'nodes': [{'html': node['html'], 'summary': node['failureSummary']} for node in violation['nodes']]} for violation in report['violations']]})
    # Abre um cadastro para verificar também os campos e o foco do diálogo.
    page.set_viewport_size({'width': 1440, 'height': 1000})
    # Abre os moradores como síndico.
    page.goto('http://127.0.0.1:8796/dist/#/sindico/moradores')
    # Inicia um formulário acessível de exemplo.
    page.get_by_role('button', name='Novo registro').click()
    # Confere que o navegador colocou o foco dentro do diálogo modal.
    assert page.evaluate("document.querySelector('dialog').contains(document.activeElement)")
    # Fecha o diálogo pelo teclado.
    page.keyboard.press('Escape')
    # Confere que Escape fechou o formulário.
    expect(page.locator('dialog')).to_have_count(0)
    # Fecha o navegador depois das verificações.
    browser.close()
# Guarda o relatório completo sem inventar uma certificação de acessibilidade.
(ROOT / 'docs' / 'accessibility-results.json').write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
# Imprime o resultado para a revisão do desenvolvimento.
print(json.dumps(results, ensure_ascii=True, indent=2))
# Interrompe o teste se algum cenário possui uma violação automatizada.
assert all(not result['violations'] for result in results), 'Consulte docs/accessibility-results.json'
