# Importa caminhos para guardar capturas apenas na nova demo.
from pathlib import Path
# Importa memória para criar tiles locais usados exclusivamente nos testes de mapa.
from io import BytesIO
# Importa a criação de imagens sem requisitar tiles de provedores externos.
from PIL import Image
# Importa o navegador automatizado e verificações de conteúdo.
from playwright.sync_api import sync_playwright, expect
# Define a pasta exclusiva da demonstração.
ROOT = Path(__file__).resolve().parents[1]
# Define o endereço local do build servido em subdiretório.
BASE = 'http://127.0.0.1:8797/dist/'
# Guarda capturas reais da primeira identidade visual.
OUTPUT = ROOT / 'docs' / 'screenshots'
# Garante que a pasta de evidências exista.
OUTPUT.mkdir(parents=True, exist_ok=True)
# Aguarda a imagem cartográfica local, não somente a criação dos marcadores pelo Leaflet.
def wait_for_local_map(page):
    # Confere o término da leitura do SVG antes de gerar evidências visuais.
    page.wait_for_function("[...document.querySelectorAll('.leaflet-image-layer')].length > 0 && [...document.querySelectorAll('.leaflet-image-layer')].every(image => image.complete && image.naturalWidth > 0)")
# Cria memória para um tile de teste que não contém cartografia de terceiros.
buffer = BytesIO()
# Gera uma pequena imagem própria para simular respostas de rede durante a troca de base.
Image.new('RGB', (256, 256), '#dce7eb').save(buffer, format='PNG')
# Guarda erros de aplicação e eventuais conexões externas não previstas.
errors, external = [], []
# Inicia a automação com uma sessão independente do navegador pessoal.
with sync_playwright() as playwright:
    # Usa o Chrome local, sem instalar navegadores ou alterar o sistema.
    browser = playwright.chromium.launch(channel='chrome')
    # Define uma janela de desktop e habilita a verificação de relatórios baixados.
    context = browser.new_context(viewport={'width': 1600, 'height': 1050}, accept_downloads=True)
    # Substitui todos os tiles do OSM por respostas locais, respeitando a política contra varredura automatizada.
    context.route('https://tile.openstreetmap.org/**', lambda route: route.fulfill(status=200, content_type='image/png', body=buffer.getvalue()))
    # Registra somente conexões externas inesperadas, excluindo a rota interceptada localmente.
    context.on('request', lambda request: external.append(request.url) if not request.url.startswith(BASE) and not request.url.startswith('https://tile.openstreetmap.org/') else None)
    # Abre uma aba de testes limpa.
    page = context.new_page()
    # Registra erros de JavaScript sem ocultar problemas de renderização.
    page.on('pageerror', lambda error: errors.append(str(error)))
    # Abre o build no subdiretório para conferir os caminhos relativos.
    page.goto(BASE)
    # Confere o slogan antes de capturar a apresentação.
    expect(page.get_by_role('heading', name='O futuro da cidade começa aqui.')).to_be_visible()
    # Aguarda o carregamento da fotografia principal.
    page.wait_for_function("document.querySelector('.city-landing-visual img')?.naturalWidth > 0")
    # Guarda uma captura da entrada em desktop para avaliação do proprietário.
    page.screenshot(path=str(OUTPUT / 'entrada-desktop.png'), full_page=True)
    # Entra pelo botão principal, sem autenticação real.
    page.get_by_role('button', name='Explorar plataforma', exact=True).click()
    # Confere a abertura do centro de comando.
    expect(page.get_by_role('heading', name='Uma cidade. Todas as conexões.')).to_be_visible()
    # Confere a montagem do mapa e de todos os marcadores iniciais.
    expect(page.locator('.city-map-pin')).to_have_count(18)
    # Confere o desenho real do gráfico dinâmico.
    expect(page.locator('.recharts-surface').first).to_be_visible()
    # Aguarda a foto do detalhe antes da captura.
    page.wait_for_function("document.querySelector('.city-point-detail img')?.naturalWidth > 0")
    # Aguarda também a cartografia autoral para não capturar uma base ainda vazia.
    wait_for_local_map(page)
    # Guarda a imagem real do centro de comando.
    page.screenshot(path=str(OUTPUT / 'comando-desktop.png'), full_page=True)
    # Confere a linha de atalhos com todos os módulos autorizados do administrador.
    expect(page.locator('.city-command-shortcuts a')).to_have_count(7)
    # Confere o histórico demonstrativo no detalhe do ponto selecionado.
    expect(page.locator('.city-point-detail')).to_contain_text('HISTÓRICO DEMONSTRATIVO')
    # Alterna para o modo dia pelo botão real do cabeçalho.
    page.get_by_role('button', name='Ativar modo dia', exact=True).click()
    # Confere a classe que ativa a variante diurna da paleta.
    expect(page.locator('.moss-city')).to_have_class('moss-city theme-day')
    # Confere a persistência da escolha na chave exclusiva do tema.
    assert page.evaluate("localStorage.getItem('moss-city:theme:v1')") == 'day'
    # Recarrega para garantir que a escolha sobrevive à abertura da aplicação.
    page.reload()
    # Confere o painel reaberto ainda no modo dia.
    expect(page.get_by_role('heading', name='Uma cidade. Todas as conexões.')).to_be_visible()
    expect(page.locator('.moss-city')).to_have_class('moss-city theme-day')
    # Aguarda a cartografia local antes da evidência do modo dia.
    wait_for_local_map(page)
    # Volta ao topo para manter elementos fixos fora da evidência.
    page.evaluate('window.scrollTo(0, 0)')
    # Guarda a captura do centro de comando em modo dia para revisão visual.
    page.screenshot(path=str(OUTPUT / 'comando-dia-desktop.png'), full_page=True)
    # Volta ao modo noite padrão da identidade Urban Command.
    page.get_by_role('button', name='Ativar modo noite', exact=True).click()
    # Confirma a volta da chave do tema ao valor noturno padrão.
    assert page.evaluate("localStorage.getItem('moss-city:theme:v1')") == 'night'
    # Filtra a camada de infraestrutura no próprio painel.
    page.get_by_label('Camada de interesse', exact=True).select_option('obras')
    # Confere a quantidade de marcadores sincronizada ao filtro.
    expect(page.locator('.city-map-pin')).to_have_count(4)
    # Confere o prazo demonstrativo exibido no detalhe da obra selecionada.
    expect(page.locator('.city-point-detail')).to_contain_text('Prazo demonstrativo')
    # Altera a janela temporal do gráfico de evolução.
    page.get_by_label('Período do gráfico', exact=True).select_option('3')
    # Troca a distribuição das despesas pelos serviços públicos.
    page.get_by_label('Visualização por setor', exact=True).select_option('servicos')
    # Confere o novo título da distribuição.
    expect(page.get_by_role('heading', name='Serviços públicos', exact=True)).to_be_visible()
    # Abre o explorador pela navegação funcional.
    page.get_by_role('link', name='Mapa inteligente', exact=False).click()
    # Confere a página territorial completa.
    expect(page.get_by_role('heading', name='A cidade em perspectiva.')).to_be_visible()
    # Aplica o filtro rápido de saúde.
    page.locator('.city-category-tabs').get_by_role('button', name='Saúde', exact=False).click() # Diferencia o filtro da categoria dos botões que contêm nomes de unidades de saúde.
    # Confere que mapa e lista mostram os mesmos dois locais.
    expect(page.locator('.city-map-pin')).to_have_count(2)
    # Seleciona uma unidade usando a lista acessível, sem depender do mapa.
    page.get_by_role('button', name='S Unidade Saúde Aurora', exact=False).click()
    # Confere o painel correspondente à seleção.
    expect(page.locator('.city-point-detail h2')).to_have_text('Unidade Saúde Aurora')
    # Testa o estado vazio da pesquisa.
    page.get_by_placeholder('Buscar local ou bairro fictício...').fill('inexistente-xyz')
    # Confere a ausência de marcadores no resultado vazio.
    expect(page.locator('.city-map-pin')).to_have_count(0)
    # Confere a orientação acessível para limpar os filtros.
    expect(page.get_by_role('heading', name='Nenhum local encontrado')).to_be_visible()
    # Retorna ao cenário completo.
    page.get_by_role('button', name='Limpar filtros', exact=True).click()
    # Ativa a camada de regiões fictícias.
    page.get_by_role('button', name='Regiões', exact=True).click()
    # Confere o estado anunciado da camada.
    expect(page.get_by_role('button', name='Regiões', exact=True)).to_have_attribute('aria-pressed', 'true')
    # Aproxima o mapa sem forçar requisições a servidores cartográficos externos.
    page.get_by_role('button', name='Aproximar mapa', exact=True).click()
    # Reenquadra o território pela ação funcional.
    page.get_by_role('button', name='Enquadrar', exact=True).click()
    # Aguarda a cartografia autoral depois dos controles de enquadramento.
    wait_for_local_map(page)
    # Guarda a cartografia local antes de testar a camada opcional.
    page.screenshot(path=str(OUTPUT / 'mapa-desktop.png'), full_page=True)
    # Aceita a explicação da base externa somente na sessão cujos tiles foram substituídos.
    page.once('dialog', lambda dialog: dialog.accept())
    # Aciona a troca para OSM usando respostas locais, sem uma varredura do serviço real.
    page.get_by_role('button', name='Base OSM', exact=True).click()
    # Confere que a atribuição não fica escondida na interface.
    expect(page.get_by_role('link', name='OpenStreetMap contributors', exact=True)).to_be_visible()
    # Retorna à cartografia autoral sem dependência de conexão.
    page.get_by_role('button', name='Base local', exact=True).click()
    # Aguarda e verifica um download real de CSV da seleção.
    with page.expect_download() as download:
        # Exporta os registros que aparecem no mapa e na lista.
        page.get_by_role('button', name='Exportar seleção', exact=True).click()
    # Confere o caráter demonstrativo no nome do arquivo.
    assert 'DEMO.csv' in download.value.suggested_filename
    # Troca para o perfil cidadão pela interface.
    page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option('cidadao')
    # Confere a abertura do portal apropriado ao perfil.
    expect(page.get_by_role('heading', name='Sua perspectiva faz parte.')).to_be_visible()
    # Preenche apenas um assunto inventado.
    page.get_by_label('Assunto fictício', exact=True).fill('Luminária de teste fictícia')
    # Preenche um relato explicitamente demonstrativo, sem dados pessoais.
    page.get_by_label('Descrição fictícia', exact=True).fill('Exemplo inventado de iluminação para testar um protocolo local.')
    # Cria a solicitação que deverá atualizar também o centro de comando.
    page.get_by_role('button', name='Gerar protocolo fictício', exact=True).click()
    # Confere o protocolo local no aviso de sucesso.
    expect(page.get_by_role('status')).to_contain_text('Protocolo fictício DEMO-')
    # Recarrega para conferir persistência de verdade.
    page.reload()
    # Confere que o protocolo criado continua disponível no acompanhamento.
    expect(page.get_by_text('Luminária de teste fictícia', exact=True)).to_be_visible()
    # Guarda a captura da experiência inicial do cidadão.
    page.screenshot(path=str(OUTPUT / 'portal-desktop.png'), full_page=True)
    # Tenta abrir o comando restrito pelo endereço, não apenas pelo menu.
    page.goto(BASE + '#/cidadao/comando')
    # Confere que o cidadão continua no portal permitido.
    expect(page.get_by_role('heading', name='Sua perspectiva faz parte.')).to_be_visible()
    # Confere os perfis de gestores especializados.
    for profile in ['obras', 'ambiental', 'administrador']:
        # Troca a experiência no seletor real.
        page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option(profile)
        # Confere o painel de comando disponível para o gestor.
        expect(page.get_by_role('heading', name='Uma cidade. Todas as conexões.')).to_be_visible()
    # Confere que os indicadores usam o novo registro persistido.
    assert page.evaluate("JSON.parse(localStorage.getItem('moss-city:scenario:v1')).requests.length") == 37
    # Abre o módulo de obras pela navegação demonstrativa.
    page.get_by_role('link', name='Gestão de obras', exact=False).click()
    # Confere o cabeçalho próprio do módulo de infraestrutura.
    expect(page.get_by_role('heading', name='Projetos que transformam.')).to_be_visible()
    # Confere a listagem inicial das quatro obras fictícias.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(4)
    # Volta ao topo para que o atalho fixo de teclado não apareça na evidência.
    page.evaluate('window.scrollTo(0, 0)')
    # Guarda uma captura da tela de cadastro para revisão visual.
    page.screenshot(path=str(OUTPUT / 'obras-desktop.png'), full_page=True)
    # Abre o formulário de novo registro pelo botão real.
    page.get_by_role('button', name='Novo registro', exact=True).click()
    # Preenche apenas o nome do projeto inventado.
    page.get_by_label('Nome do projeto fictício', exact=True).fill('Obra de teste fictícia')
    # Preenche a descrição demonstrativa obrigatória.
    page.get_by_label('Descrição fictícia', exact=True).fill('Criação de teste para validar o cadastro local de obras.')
    # Salva o registro que deve aparecer na tabela e no mapa.
    page.get_by_role('button', name='Salvar registro', exact=True).click()
    # Confere a confirmação acessível da criação.
    expect(page.get_by_role('status')).to_contain_text('Registro fictício criado')
    # Confere a nova linha na listagem.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(5)
    # Abre a edição do registro recém-criado pelo rótulo acessível da linha.
    page.get_by_role('button', name='Editar Obra de teste fictícia', exact=True).click()
    # Muda a situação para execução, mantendo coerência com o percentual.
    page.get_by_label('Situação da obra', exact=True).select_option('Em execução')
    # Informa um percentual final incompatível com a situação escolhida.
    page.get_by_label('Execução (%)', exact=True).fill('100')
    # Tenta salvar para conferir a regra de coerência exibida em texto.
    page.get_by_role('button', name='Salvar alterações', exact=True).click()
    # Confere a mensagem de validação sem perder o formulário aberto.
    expect(page.get_by_role('alert')).to_contain_text('100%')
    # Corrige o percentual para um valor compatível com a execução.
    page.get_by_label('Execução (%)', exact=True).fill('50')
    # Registra uma observação opcional que entra no histórico do cadastro.
    page.get_by_label('Observação da atualização (opcional)', exact=True).fill('Reavaliação fictícia de acompanhamento.')
    # Salva a edição válida.
    page.get_by_role('button', name='Salvar alterações', exact=True).click()
    # Confere a atualização anunciada em uma região de status.
    expect(page.get_by_role('status')).to_contain_text('atualizado')
    # Confirma a exclusão do registro de teste apenas nesta demonstração.
    page.once('dialog', lambda dialog: dialog.accept())
    # Aciona a exclusão pelo rótulo acessível da linha correspondente.
    page.get_by_role('button', name='Excluir Obra de teste fictícia', exact=True).click()
    # Confere a volta ao cenário original de quatro obras.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(4)
    # Abre o módulo de atendimento administrativo.
    page.get_by_role('link', name='Atendimento', exact=False).click()
    # Confere a tela de triagem de solicitações.
    expect(page.get_by_role('heading', name='Do registro à resolução.')).to_be_visible()
    # Confere todos os protocolos visíveis ao administrador: 36 iniciais + 1 do portal.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(37)
    # Filtra o módulo pelo tipo de serviço fictício.
    page.get_by_label('Filtrar tipo de registro', exact=True).select_option('Buracos nas vias')
    # Confere apenas os seis registros da categoria escolhida.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(6)
    # Volta à visão completa antes de criar um novo protocolo.
    page.get_by_label('Filtrar tipo de registro', exact=True).select_option('')
    # Abre o formulário administrativo de solicitações.
    page.get_by_role('button', name='Novo registro', exact=True).click()
    # Preenche o assunto inventado que identificará a linha.
    page.get_by_label('Assunto fictício', exact=True).fill('Pavimento de teste fictício')
    # Preenche uma descrição demonstrativa suficientemente longa.
    page.get_by_label('Descrição fictícia', exact=True).fill('Solicitação criada na administração para validar a triagem local.')
    # Gera o protocolo pelo lado administrativo.
    page.get_by_role('button', name='Salvar registro', exact=True).click()
    # Confere a sequência fictícia anunciada na confirmação.
    expect(page.get_by_role('status')).to_contain_text('Protocolo fictício DEMO-')
    # Confere a nova linha na listagem administrativa.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(38)
    # Remove o protocolo de teste depois de confirmado o descarte.
    page.once('dialog', lambda dialog: dialog.accept())
    # Exclui o registro criado durante esta verificação.
    page.get_by_role('button', name='Excluir Pavimento de teste fictício', exact=True).click()
    # Confere a volta aos 37 protocolos anteriores.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(37)
    # Abre a síntese consolidada dos módulos.
    page.get_by_role('link', name='Relatórios', exact=False).click()
    # Confere a abertura da tela de relatórios.
    expect(page.get_by_role('heading', name='Sínteses para decidir.')).to_be_visible()
    # Confere uma tabela de situação para cada módulo do administrador.
    expect(page.locator('.city-report-table')).to_have_count(6)
    # Reduz a janela dos relatórios para três meses.
    page.get_by_label('Janela dos relatórios', exact=True).select_option('3')
    # Volta ao topo para manter elementos fixos fora da evidência.
    page.evaluate('window.scrollTo(0, 0)')
    # Guarda a captura da síntese para revisão visual.
    page.screenshot(path=str(OUTPUT / 'relatorios-desktop.png'), full_page=True)
    # Aguarda uma exportação real da tabela de obras.
    with page.expect_download() as report:
        # Exporta os registros da janela atual em CSV.
        page.get_by_role('button', name='Exportar CSV').first.click()
    # Confere o nome demonstrativo do arquivo gerado.
    assert 'DEMO.csv' in report.value.suggested_filename
    # Troca para o gestor de obras para conferir o escopo do menu.
    page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option('obras')
    # Confere que o gestor de obras não vê o módulo financeiro.
    expect(page.get_by_role('link', name='Despesas fictícias', exact=False)).to_have_count(0)
    # Abre o atendimento restrito ao escopo desse gestor pelo menu lateral, que é onde o link aparece com esse nome.
    page.locator('.city-sidebar').get_by_role('link', name='Atendimento', exact=False).click()
    # Confere apenas solicitações de vias e outros serviços.
    expect(page.locator('.city-record-table tbody tr')).to_have_count(12)
    # Tenta abrir o cadastro administrativo pelo endereço, não apenas pelo menu.
    page.goto(BASE + '#/cidadao/obras')
    # Confere que o cidadão continua no portal permitido.
    expect(page.get_by_role('heading', name='Sua perspectiva faz parte.')).to_be_visible()
    # Retorna ao comando administrativo antes das verificações de largura.
    page.goto(BASE + '#/administrador/comando')
    # Confere a tela inicial dos gestores após os testes de cadastro.
    expect(page.get_by_role('heading', name='Uma cidade. Todas as conexões.')).to_be_visible()
    # Verifica o cabeçalho e o corpo em várias larguras, incluindo telas pequenas.
    for width in [320, 390, 768, 1024]:
        # Ajusta a janela do navegador de teste.
        page.set_viewport_size({'width': width, 'height': 900})
        # Aguarda o mapa e o gráfico recalcularem suas dimensões.
        page.wait_for_function('document.documentElement.scrollWidth <= innerWidth')
        # Confere que o seletor de perfil continua visível sem cortes.
        expect(page.get_by_label('Trocar perfil demonstrativo', exact=True)).to_be_visible()
    # Captura o painel em uma largura típica de celular.
    page.set_viewport_size({'width': 390, 'height': 844})
    # Aguarda a cartografia local depois da troca de perfil e largura da tela.
    wait_for_local_map(page)
    # Guarda a imagem móvel da identidade de comando.
    page.screenshot(path=str(OUTPUT / 'comando-mobile.png'), full_page=True)
    # Abre o menu da experiência móvel.
    page.get_by_role('button', name='Abrir navegação', exact=True).click()
    # Usa o link do mapa dentro do menu.
    page.get_by_role('link', name='Mapa inteligente', exact=False).click()
    # Confere o fechamento automático depois da navegação.
    expect(page.get_by_role('button', name='Abrir navegação', exact=True)).to_have_attribute('aria-expanded', 'false')
    # Confere que o explorador também respeita a largura do celular.
    page.wait_for_function('document.documentElement.scrollWidth <= innerWidth')
    # Aguarda a base cartográfica da nova tela antes da evidência móvel.
    wait_for_local_map(page)
    # Guarda a evidência móvel do mapa.
    page.screenshot(path=str(OUTPUT / 'mapa-mobile.png'), full_page=True)
    # Reabre o menu móvel para conferir os módulos em tela estreita.
    page.get_by_role('button', name='Abrir navegação', exact=True).click()
    # Escolhe o cadastro de obras pelo menu compacto.
    page.get_by_role('link', name='Gestão de obras', exact=False).click()
    # Confere que a tabela rolável não aumenta a largura da página.
    page.wait_for_function('document.documentElement.scrollWidth <= innerWidth')
    # Guarda a evidência móvel do cadastro administrativo.
    page.screenshot(path=str(OUTPUT / 'obras-mobile.png'), full_page=True)
    # Retorna à entrada para conferir fotografia e slogan no celular.
    page.goto(BASE)
    # Aguarda o título antes da captura da apresentação.
    expect(page.get_by_role('heading', name='O futuro da cidade começa aqui.')).to_be_visible()
    # Confere que o conteúdo não ultrapassa a janela móvel.
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    # Guarda a entrada móvel para revisão visual.
    page.screenshot(path=str(OUTPUT / 'entrada-mobile.png'), full_page=True)
    # Guarda uma chave fictícia de outra aplicação para conferir que a restauração é isolada.
    page.evaluate("localStorage.setItem('teste-outra-demo', 'preservar')")
    # Simula dados corrompidos sem acessar chaves de outros sistemas.
    page.evaluate("localStorage.setItem('moss-city:scenario:v1', '{invalido')")
    # Abre novamente o comando para executar uma leitura completa do armazenamento.
    page.goto(BASE + '#/administrador/comando')
    # Recarrega para que o serviço de persistência encontre o problema simulado.
    page.reload()
    # Confere a recuperação legível em vez de uma tela em branco.
    expect(page.get_by_role('alert')).to_contain_text('Não foi possível recuperar')
    # Abre o menu móvel que contém a ação de restauração.
    page.get_by_role('button', name='Abrir navegação', exact=True).click()
    # Autoriza explicitamente a substituição dos registros fictícios da MOSS CITY.
    page.once('dialog', lambda dialog: dialog.accept())
    # Aciona a restauração pela interface real.
    page.get_by_role('button', name='Restaurar demonstração', exact=True).click()
    # Confere que o aviso foi removido depois da restauração.
    expect(page.get_by_role('alert')).to_have_count(0)
    # Confere a volta dos 36 registros iniciais do cenário.
    assert page.evaluate("JSON.parse(localStorage.getItem('moss-city:scenario:v1')).requests.length") == 36
    # Confere que a restauração não apagou nem alterou o registro de outra aplicação.
    assert page.evaluate("localStorage.getItem('teste-outra-demo')") == 'preservar'
    # Encerra a sessão independente de testes.
    context.close()
    # Abre uma sessão separada para verificar a alternativa de fotografia indisponível.
    broken = browser.new_context()
    # Bloqueia somente arquivos de imagem nesta sessão de teste.
    broken.route('**/*.webp', lambda route: route.abort())
    # Abre a apresentação com as fotos deliberadamente indisponíveis.
    failure = broken.new_page()
    # Carrega o build sem alterar nenhum arquivo da aplicação.
    failure.goto(BASE)
    # Confere que existe uma explicação em vez de uma imagem quebrada sem contexto.
    expect(failure.get_by_text('Fotografia ilustrativa indisponível', exact=True).first).to_be_visible()
    # Confere que o visitante ainda consegue entrar na plataforma.
    expect(failure.get_by_role('button', name='Explorar plataforma', exact=True)).to_be_enabled()
    # Encerra a sessão de falha controlada.
    broken.close()
    # Fecha o navegador local utilizado na verificação.
    browser.close()
# Impede considerar a prévia aprovada se houve erro JavaScript ou conexão externa inesperada.
assert not errors, errors
# Confere que fotos, cartografia inicial e fontes não dependem de domínios externos.
assert not external, external
# Resume somente recursos realmente verificados nesta entrega.
print('OK: entrada, comando com atalhos, modo dia/noite persistente, ponto com prazo e histórico, mapa, filtros, marcadores, camadas, OSM com tiles simulados, CSV, portal, protocolo, cadastros de obras, triagem administrativa, relatórios, escopo de perfis, persistência e responsividade.')
