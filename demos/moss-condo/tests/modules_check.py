# Importa a automação do navegador e suas verificações de conteúdo.
from playwright.sync_api import sync_playwright, expect
# Define os cenários que exercitam os módulos além de moradores e financeiro.
scenarios = [
    # Testa o cadastro de manutenção administrativa e sua prioridade.
    ('sindico/ocorrencias', 'Problema ou serviço', 'Teste de manutenção fictícia', {'Unidade ou Coletivo': 'Coletivo'}),
    # Testa a publicação de um comunicado com texto demonstrativo.
    ('sindico/mural', 'Título do comunicado', 'Teste de assembleia fictícia', {'Mensagem': 'Mensagem inventada para conferir o mural.'}),
    # Testa o cadastro fictício de autorização de visitante.
    ('portaria/visitantes', 'Nome inventado do visitante', 'Visitante de teste fictício', {'Unidade de destino': 'B · 104'}),
    # Testa o controle de uma entrega sem rastreamento real.
    ('portaria/entregas', 'Descrição fictícia do pacote', 'Pacote de teste fictício', {'Unidade de destino': 'C · 203'}),
    # Testa uma solicitação criada pela moradora com unidade fixada pela interface.
    ('morador/ocorrencias', 'Problema ou serviço', 'Solicitação de moradora fictícia', {}),
]
# Abre uma sessão isolada para não interferir nos outros testes.
with sync_playwright() as playwright:
    # Usa o Chrome já instalado no ambiente.
    browser = playwright.chromium.launch(channel='chrome')
    # Cria uma aba de desktop para os formulários.
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    # Executa criação, edição e exclusão em cada módulo selecionado.
    for route, main_label, name, extras in scenarios:
        # Abre o módulo usando o endereço autorizado do perfil correspondente.
        page.goto('http://127.0.0.1:8796/dist/#/' + route)
        # Inicia o cadastro fictício.
        page.get_by_role('button', name='Novo registro', exact=True).click()
        # Preenche o campo principal com um texto inventado.
        page.get_by_label(main_label, exact=True).fill(name)
        # Preenche os demais campos obrigatórios específicos desse módulo.
        for label, value in extras.items():
            # Usa o rótulo visível para encontrar o campo correto.
            page.get_by_label(label, exact=True).fill(value)
        # Confere que a unidade não é um campo editável pelo morador.
        if route.startswith('morador'):
            # Impede atribuir uma solicitação a outra unidade pela interface.
            expect(page.get_by_label('Unidade ou Coletivo', exact=True)).to_have_count(0)
        # Grava o registro demonstrativo.
        page.get_by_role('button', name='Salvar registro').click()
        # Confere que o dado novo aparece na listagem.
        expect(page.get_by_role('cell', name=name, exact=True)).to_be_visible()
        # Abre a edição pelo botão com nome acessível.
        page.get_by_role('button', name='Editar ' + name, exact=True).click()
        # Modifica o conteúdo principal para comprovar a edição.
        page.get_by_label(main_label, exact=True).fill(name + ' editado')
        # Salva a alteração de teste.
        page.get_by_role('button', name='Salvar registro').click()
        # Confere o texto atualizado na tabela.
        expect(page.get_by_role('cell', name=name + ' editado', exact=True)).to_be_visible()
        # Autoriza a exclusão apenas do registro criado neste cenário.
        page.once('dialog', lambda dialog: dialog.accept())
        # Exclui o registro demonstrativo.
        page.get_by_role('button', name='Excluir ' + name + ' editado', exact=True).click()
        # Confere que a exclusão foi concluída.
        expect(page.get_by_role('cell', name=name + ' editado', exact=True)).to_have_count(0)
    # Verifica a navegação da página em três larguras pequenas e intermediárias.
    for width in [320, 768, 1024]:
        # Define o tamanho de tela do cenário atual.
        page.set_viewport_size({'width': width, 'height': 1000})
        # Abre uma tela de cadastros com tabela horizontal.
        page.goto('http://127.0.0.1:8796/dist/#/sindico/moradores')
        # Aguarda os dados da listagem.
        expect(page.locator('table')).to_be_visible()
        # Confere que apenas a região da tabela pode rolar, não a página inteira.
        assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    # Fecha o navegador de teste.
    browser.close()
# Confirma os cenários efetivamente executados.
print('OK: CRUD de manutenção, mural, visitantes, entregas e solicitações do morador; larguras 320, 768 e 1024.')
