# Importa o navegador automatizado e verificações de interface.
from playwright.sync_api import sync_playwright, expect
# Define o endereço HTTPS real autorizado para esta demonstração.
BASE = 'https://mossdigital.com.br/demos/moss-condo/'
# Guarda erros de execução e arquivos da demo que falharem em produção.
errors = []
# Abre uma sessão nova, sem acessar dados pessoais do navegador do usuário.
with sync_playwright() as playwright:
    # Reaproveita o Chrome local para visitar o site publicado.
    browser = playwright.chromium.launch(channel='chrome')
    # Abre uma aba de desktop com tempo suficiente para a rede pública.
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    # Define o limite de espera para a primeira carga de cada tela.
    page.set_default_timeout(30000)
    # Registra falhas reais de JavaScript durante o acesso público.
    page.on('pageerror', lambda error: errors.append(str(error)))
    # Registra respostas HTTP de erro apenas dos arquivos desta demonstração.
    page.on('response', lambda response: errors.append(f'{response.status}: {response.url}') if response.url.startswith(BASE) and response.status >= 400 else None)
    # Visita a página pública e obtém sua resposta HTTP.
    response = page.goto(BASE, wait_until='networkidle')
    # Confere que o endereço público devolveu uma página válida.
    assert response.status == 200
    # Confere a apresentação para evitar confundir uma página 404 personalizada com sucesso.
    expect(page.get_by_role('heading', name='Seu condomínio, perfeitamente conectado.')).to_be_visible()
    # Confere que a foto principal também carregou no endereço real.
    page.wait_for_function("document.querySelector('.condo-photo img')?.naturalWidth > 0")
    # Entra no síndico pelo botão público da aplicação.
    page.get_by_role('button', name='Acessar demonstração').click()
    # Confere o painel administrativo.
    expect(page.get_by_role('heading', name='Uma gestão à altura.')).to_be_visible()
    # Recarrega a rota com hash para conferir sua independência de redirecionamentos do servidor.
    page.reload(wait_until='networkidle')
    # Confere que recarregar mantém a rota funcional.
    expect(page.get_by_role('heading', name='Uma gestão à altura.')).to_be_visible()
    # Abre a galeria publicada das cinco áreas comuns.
    page.get_by_role('link', name='Reservas & agenda', exact=True).click()
    # Confere que existem cinco fotografias reserváveis.
    expect(page.locator('.condo-area-card')).to_have_count(5)
    # Confere cada foto no endereço final, inclusive as que usam carregamento sob demanda.
    for image in page.locator('.condo-area-card img').all():
        # Coloca a imagem na área visível para iniciar seu carregamento.
        image.scroll_into_view_if_needed()
        # Aguarda uma imagem válida, não apenas o término de uma requisição com erro.
        expect(image).to_have_js_property('complete', True)
        # Confere que a foto tem dimensões reais depois de carregada.
        assert image.evaluate('element => element.naturalWidth > 0')
    # Confere a troca de perfil no domínio público.
    page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option('morador')
    # Confere a experiência específica do morador.
    expect(page.get_by_role('heading', name='Seu lugar. Sua comunidade.')).to_be_visible()
    # Troca para o terceiro perfil demonstrativo.
    page.get_by_label('Trocar perfil demonstrativo', exact=True).select_option('portaria')
    # Confere a experiência de portaria no site público.
    expect(page.get_by_role('heading', name='Tudo pronto para receber.')).to_be_visible()
    # Confere também o acesso móvel ao endereço final.
    page.set_viewport_size({'width': 390, 'height': 844})
    # Abre a navegação móvel publicada.
    page.get_by_role('button', name='Abrir navegação', exact=True).click()
    # Usa um módulo de portaria pelo menu real.
    page.get_by_role('link', name='Entregas', exact=True).click()
    # Confere o conteúdo do módulo na versão móvel publicada.
    expect(page.get_by_role('heading', name='Cada entrega no seu lugar')).to_be_visible()
    # Confere que a página não ultrapassa a largura do celular.
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
    # Fecha o navegador depois de verificar o endereço público.
    browser.close()
# Recusa considerar a publicação aprovada se algum arquivo da demo ou script falhou.
assert not errors, errors
# Registra o resultado da verificação pública sem confundi-lo com teste somente local.
print('OK PUBLICO: HTTPS 200, entrada, fotos, tres perfis, rotas recarregaveis, galeria e navegacao movel; nenhum erro HTTP ou JavaScript da demo.')
