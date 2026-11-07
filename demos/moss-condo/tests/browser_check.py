# Importa o caminho de arquivos para guardar evidências ao lado da demonstração.
from pathlib import Path
# Importa a data local usada nas reservas de teste.
from datetime import date
# Importa o navegador automatizado e suas verificações de interface.
from playwright.sync_api import sync_playwright, expect
# Define a pasta independente da demonstração.
ROOT = Path(__file__).resolve().parents[1]
# Cria uma pasta de evidências sem modificar nenhuma outra demo.
OUTPUT = ROOT / 'docs' / 'screenshots'
# Garante que a pasta de capturas exista.
OUTPUT.mkdir(parents=True, exist_ok=True)
# Testa o build servido dentro de um subdiretório, não apenas o servidor de desenvolvimento.
BASE = 'http://127.0.0.1:8796/dist/'
# Guarda erros inesperados encontrados pelo navegador.
errors = []
# Abre a automação do navegador já disponível no ambiente de desenvolvimento.
with sync_playwright() as playwright:
    # Inicia o Chromium sem janela para executar verificações reproduzíveis.
    browser = playwright.chromium.launch(channel='chrome') # Reaproveita o Chrome local sem instalar navegadores ou mudar configurações globais.
    # Cria uma sessão de desktop com downloads habilitados.
    context = browser.new_context(viewport={'width': 1440, 'height': 1000}, accept_downloads=True)
    # Abre a primeira aba de teste.
    page = context.new_page()
    # Registra erros de execução JavaScript, sem esconder falhas da aplicação.
    page.on('pageerror', lambda error: errors.append(str(error)))
    # Abre a apresentação do build no subdiretório dist.
    page.goto(BASE)
    # Confere que a apresentação carregou de verdade.
    expect(page.get_by_role('heading', name='Seu condomínio, perfeitamente conectado.')).to_be_visible()
    # Guarda a imagem da tela inicial para revisão visual.
    page.screenshot(path=str(OUTPUT / 'entrada-desktop.png'), full_page=True)
    # Entra no perfil administrativo por meio do botão real.
    page.get_by_role('button', name='Acessar demonstração').click()
    # Aguarda o painel carregado com dados fictícios.
    expect(page.get_by_role('heading', name='Uma gestão à altura.')).to_be_visible()
    # Confere que o gráfico financeiro foi desenhado.
    expect(page.locator('.recharts-surface').first).to_be_visible()
    # Guarda a captura principal do produto.
    page.screenshot(path=str(OUTPUT / 'sindico-desktop.png'), full_page=True)
    # Percorre todos os módulos administrativos para detectar rotas quebradas.
    for label in ['Moradores', 'Financeiro', 'Reservas & agenda', 'Manutenção', 'Mural & avisos', 'Visão geral']:
        # Abre o módulo pelo menu, assim como um visitante faria.
        page.get_by_role('link', name=label, exact=True).click()
        # Confere que existe um título visível em cada módulo.
        expect(page.locator('main h1')).to_be_visible()
    # Abre o cadastro de moradores.
    page.get_by_role('link', name='Moradores', exact=True).click()
    # Inicia um cadastro fictício de teste.
    page.get_by_role('button', name='Novo registro').click()
    # Preenche o nome inventado do teste.
    page.get_by_label('Nome fictício', exact=True).fill('Aluno Fictício de Teste')
    # Preenche uma unidade inventada.
    page.get_by_label('Bloco e unidade').fill('C · 401')
    # Salva o cadastro pela interface.
    page.get_by_role('button', name='Salvar registro').click()
    # Confere que o registro foi incluído na tabela.
    expect(page.get_by_role('cell', name='Aluno Fictício de Teste', exact=True)).to_be_visible()
    # Abre a edição do registro recém-criado.
    page.get_by_role('button', name='Editar Aluno Fictício de Teste', exact=True).click()
    # Altera o nome de demonstração.
    page.get_by_label('Nome fictício', exact=True).fill('Aluno Fictício Editado')
    # Confirma a edição.
    page.get_by_role('button', name='Salvar registro').click()
    # Recarrega para verificar a persistência real no localStorage.
    page.reload()
    # Confere que a alteração persistiu depois de recarregar.
    expect(page.get_by_role('cell', name='Aluno Fictício Editado', exact=True)).to_be_visible()
    # Testa o estado vazio da pesquisa.
    page.get_by_placeholder('Pesquisar por nome ou unidade...').fill('sem-resultados-xyz')
    # Confere a mensagem de pesquisa sem correspondência.
    expect(page.get_by_role('heading', name='Nenhum registro encontrado')).to_be_visible()
    # Remove todos os filtros para recuperar a listagem.
    page.get_by_role('button', name='Limpar filtros').click()
    # Cancela a primeira tentativa de exclusão para conferir a confirmação.
    page.once('dialog', lambda dialog: dialog.dismiss())
    # Aciona a exclusão que deverá ser cancelada.
    page.get_by_role('button', name='Excluir Aluno Fictício Editado', exact=True).click()
    # Confere que cancelar preservou o cadastro.
    expect(page.get_by_role('cell', name='Aluno Fictício Editado', exact=True)).to_be_visible()
    # Aceita a segunda tentativa de exclusão.
    page.once('dialog', lambda dialog: dialog.accept())
    # Exclui somente o registro fictício criado pelo teste.
    page.get_by_role('button', name='Excluir Aluno Fictício Editado', exact=True).click()
    # Confere que o cadastro saiu da tabela.
    expect(page.get_by_role('cell', name='Aluno Fictício Editado', exact=True)).to_have_count(0)
    # Abre o financeiro pelo menu.
    page.get_by_role('link', name='Financeiro', exact=True).click()
    # Inicia um lançamento fictício de teste.
    page.get_by_role('button', name='Novo registro').click()
    # Preenche a descrição do lançamento.
    page.get_by_label('Descrição', exact=True).fill('Receita fictícia de teste')
    # Informa um valor financeiro de demonstração.
    page.get_by_label('Valor fictício (R$)', exact=True).fill('120.50')
    # Marca um pagamento apenas simulado.
    page.get_by_label('Pagamento', exact=True).select_option('Pago')
    # Salva o lançamento financeiro.
    page.get_by_role('button', name='Salvar registro').click()
    # Confere o lançamento criado.
    expect(page.get_by_role('cell', name='Receita fictícia de teste', exact=True)).to_be_visible()
    # Aguarda um download ao exportar o relatório filtrado.
    with page.expect_download() as download:
        # Aciona o relatório CSV local, sem enviar dados para servidores.
        page.get_by_role('button', name='Relatório CSV').click()
    # Confere que o arquivo baixado está identificado como demonstração.
    assert 'demo.csv' in download.value.suggested_filename
    # Abre a agenda de áreas comuns.
    page.get_by_role('link', name='Reservas & agenda', exact=True).click()
    # Inicia uma reserva para testar a regra de conflito.
    page.get_by_role('button', name='Reservar espaço', exact=True).click()
    # Seleciona a quadra que já está ocupada no exemplo inicial.
    page.get_by_label('Área comum', exact=True).last.select_option('Quadra')
    # Escolhe a data de hoje, correspondente à reserva inicial.
    page.get_by_label('Data', exact=True).fill(date.today().isoformat())
    # Define um início que se sobrepõe à reserva existente.
    page.get_by_label('Início', exact=True).fill('11:00')
    # Define o término do intervalo conflitante.
    page.get_by_label('Fim', exact=True).fill('13:00')
    # Tenta salvar a reserva conflitante.
    page.get_by_role('button', name='Salvar registro').click()
    # Confere a mensagem de conflito.
    expect(page.get_by_role('alert')).to_contain_text('já está reservada')
    # Move o início para um horário livre.
    page.get_by_label('Início', exact=True).fill('12:00')
    # Salva a reserva consecutiva permitida.
    page.get_by_role('button', name='Salvar registro').click()
    # Confere que o diálogo foi fechado depois do salvamento.
    expect(page.locator('dialog')).to_have_count(0)
    # Aceita a confirmação de cancelamento da reserva criada.
    page.once('dialog', lambda dialog: dialog.accept())
    # Cancela a última reserva, mantendo as iniciais.
    page.get_by_role('button', name='Cancelar', exact=True).last.click()
    # Confere que a situação cancelada continua no histórico.
    expect(page.get_by_text('Cancelada', exact=True)).to_be_visible()
    # Avança o calendário para validar a navegação entre meses.
    page.get_by_role('button', name='Próximo mês').click()
    # Retorna ao mês anterior sem perder o histórico.
    page.get_by_role('button', name='Mês anterior').click()
    # Troca o perfil pela seleção real do cabeçalho.
    page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option('morador')
    # Confere a experiência específica da moradora.
    expect(page.get_by_role('heading', name='Seu lugar. Sua comunidade.')).to_be_visible()
    # Guarda uma captura do painel da moradora.
    page.screenshot(path=str(OUTPUT / 'morador-desktop.png'), full_page=True)
    # Tenta acessar diretamente a gestão de moradores com o perfil restrito.
    page.goto(BASE + '#/morador/moradores')
    # Confere o redirecionamento para o painel permitido.
    expect(page.get_by_role('heading', name='Seu lugar. Sua comunidade.')).to_be_visible()
    # Abre apenas as taxas da unidade fictícia.
    page.get_by_role('link', name='Financeiro', exact=True).click()
    # Confere que o financeiro administrativo não aparece para o morador.
    expect(page.get_by_text('Taxas condominiais — lote demonstrativo', exact=True)).to_have_count(0)
    # Confere que o morador não recebe ações de criação de lançamentos.
    expect(page.get_by_role('button', name='Novo registro')).to_have_count(0)
    # Troca para o perfil de portaria.
    page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option('portaria')
    # Confere a saudação da operação de portaria.
    expect(page.get_by_role('heading', name='Tudo pronto para receber.')).to_be_visible()
    # Guarda uma captura da experiência da portaria.
    page.screenshot(path=str(OUTPUT / 'portaria-desktop.png'), full_page=True)
    # Percorre todos os menus próprios da portaria.
    for label in ['Visitantes & acessos', 'Entregas', 'Mural & avisos', 'Visão geral']:
        # Abre cada módulo permitido.
        page.get_by_role('link', name=label, exact=True).click()
        # Confere que cada rota tem conteúdo real.
        expect(page.locator('main h1')).to_be_visible()
    # Retorna ao perfil administrativo para testar o layout móvel.
    page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option('sindico')
    # Aguarda a conclusão da troca de perfil.
    expect(page.get_by_role('heading', name='Uma gestão à altura.')).to_be_visible()
    # Muda para uma largura típica de celular.
    page.set_viewport_size({'width': 390, 'height': 844})
    # Aguarda o observador responsivo do gráfico recalcular sua largura após a mudança de janela.
    page.wait_for_function('document.documentElement.scrollWidth <= window.innerWidth')
    # Confere a ausência de rolagem horizontal indevida na página.
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    # Guarda a captura móvel do painel principal.
    page.screenshot(path=str(OUTPUT / 'sindico-mobile.png'), full_page=True)
    # Abre o menu móvel por seu botão acessível.
    page.get_by_role('button', name='Abrir navegação', exact=True).click()
    # Confere o estado aberto anunciado pelo botão.
    expect(page.get_by_role('button', name='Fechar navegação', exact=True)).to_have_attribute('aria-expanded', 'true')
    # Abre as reservas pelo menu móvel.
    page.get_by_role('link', name='Reservas & agenda', exact=True).click()
    # Confere que o menu fechou depois da navegação.
    expect(page.get_by_role('button', name='Abrir navegação', exact=True)).to_have_attribute('aria-expanded', 'false')
    # Confere também o calendário sem rolagem indevida da página.
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    # Guarda a captura do calendário móvel.
    page.screenshot(path=str(OUTPUT / 'reservas-mobile.png'), full_page=True)
    # Volta à apresentação para conferir sua adaptação móvel.
    page.goto(BASE)
    # Aguarda o título antes de capturar a entrada móvel.
    expect(page.get_by_role('heading', name='Seu condomínio, perfeitamente conectado.')).to_be_visible()
    # Confere que a apresentação não ultrapassa a largura do celular.
    assert page.evaluate('document.documentElement.scrollWidth <= window.innerWidth')
    # Guarda a imagem móvel da apresentação.
    page.screenshot(path=str(OUTPUT / 'entrada-mobile.png'), full_page=True)
    # Simula uma chave local corrompida para conferir a recuperação amigável.
    page.evaluate("localStorage.setItem('moss-condo:demo:v1', '{invalido')")
    # Abre o painel que precisará recuperar os dados.
    page.goto(BASE + '#/sindico/painel')
    # Recarrega a aplicação para executar a leitura do armazenamento corrompido.
    page.reload()
    # Confere que a falha é explicada em vez de deixar uma tela em branco.
    expect(page.get_by_role('alert')).to_contain_text('Não foi possível recuperar')
    # Abre o menu para acessar a restauração confirmada.
    page.get_by_role('button', name='Abrir navegação', exact=True).click()
    # Autoriza somente a restauração da MOSS CONDO.
    page.once('dialog', lambda dialog: dialog.accept())
    # Aciona a restauração real da demonstração.
    page.get_by_role('button', name='Restaurar demonstração', exact=True).click()
    # Confere que a mensagem de erro foi removida.
    expect(page.get_by_role('alert')).to_have_count(0)
    # Confere o retorno dos quatro moradores fictícios iniciais.
    assert page.evaluate("JSON.parse(localStorage.getItem('moss-condo:demo:v1')).residents.length") == 4
    # Fecha a sessão automatizada.
    context.close()
    # Fecha o navegador de teste.
    browser.close()
# Falha explicitamente se o navegador registrou um erro de execução.
assert not errors, errors
# Resume a aprovação sem afirmar uma auditoria manual que não foi feita.
print('OK: menus, perfis, CRUD, filtros, CSV, reservas, calendário, persistência, restauração, recuperação de erro, responsividade e build em /dist/.')
