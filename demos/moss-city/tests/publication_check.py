# Verificação da MOSS CITY publicada no ar.
# Este script consulta apenas o site público por requisições GET, sem varreduras
# nem requisições a serviços de mapas. É preciso ter conexão com a internet.
# Reproduz o que foi confirmado na publicação: página, execução do React, CSS,
# alternador dia/noite com persistência, renderização no celular, cartão do
# catálogo e prévia da captura.

import sys  # Para encerrar com código de erro quando alguma verificação falhar.
from playwright.sync_api import sync_playwright  # Navegador usado nos demais testes.

# Endereços verificados no domínio real do portfólio.
URL_DEMO = 'https://mossdigital.com.br/demos/moss-city/'
URL_CATALOGO = 'https://mossdigital.com.br/sistemas.html'
URL_PREVIA = 'https://mossdigital.com.br/assets/img/previas/moss-city.webp'

falhas = []  # Guarda as descrições das verificações que não passaram.


def checar(descricao, condicao):
    """Imprime o resultado de uma verificação e anota a falha, se houver."""
    print(f"[{'OK' if condicao else 'FALHA'}] {descricao}")
    if not condicao:
        falhas.append(descricao)


with sync_playwright() as playwright:
    navegador = playwright.chromium.launch(channel='chrome')  # Chrome local, como nos demais testes.
    pagina = navegador.new_page(viewport={'width': 1600, 'height': 1050})  # Mesma largura das capturas.
    erros_de_pagina = []  # Acumula erros de JavaScript não tratados.
    pagina.on('pageerror', lambda erro: erros_de_pagina.append(str(erro)))

    # 1) A página publicada responde e o React desenha a entrada.
    resposta = pagina.goto(URL_DEMO, wait_until='load', timeout=60000)
    checar('a página publicada responde HTTP 200', resposta is not None and resposta.status == 200)
    titulo = pagina.locator('main h1').first
    titulo.wait_for(state='visible', timeout=30000)
    checar('o React renderizou a entrada no ar', 'O futuro da cidade' in titulo.inner_text())

    # 2) O CSS publicado carregou: a identidade noturna pinta o fundo.
    fundo = pagina.evaluate("getComputedStyle(document.querySelector('.moss-city')).backgroundColor")
    checar('o CSS aplicou o fundo noturno rgb(7, 21, 37)', fundo == 'rgb(7, 21, 37)')

    # 3) O alternador dia/noite funciona na produção e persiste a escolha.
    botao_dia = pagina.get_by_role('button', name='Ativar modo dia')
    checar('o alternador dia/noite está no cabeçalho', botao_dia.count() == 1)
    botao_dia.click()
    pagina.wait_for_timeout(250)  # Espera o estado do React e o efeito de persistência.
    classe = pagina.locator('.moss-city').get_attribute('class') or ''
    checar('a classe theme-day é aplicada após o clique', 'theme-day' in classe)
    valor = pagina.evaluate("localStorage.getItem('moss-city:theme:v1')")
    checar('a chave moss-city:theme:v1 grava o valor day', valor == 'day')
    checar('o rótulo do botão muda para ativar modo noite', pagina.get_by_role('button', name='Ativar modo noite').count() == 1)
    pagina.get_by_role('button', name='Ativar modo noite').click()
    pagina.wait_for_timeout(250)  # Mesma espera para o retorno à noite.
    valor = pagina.evaluate("localStorage.getItem('moss-city:theme:v1')")
    checar('a escolha volta para a noite padrão', valor == 'night')

    # 4) Nenhum erro de JavaScript não tratado durante a entrada.
    checar('nenhum erro de JavaScript não tratado na entrada', not erros_de_pagina)

    # 5) A entrada também renderiza em largura de celular.
    celular = navegador.new_page(viewport={'width': 390, 'height': 844})
    celular.goto(URL_DEMO, wait_until='load', timeout=60000)
    titulo_celular = celular.locator('main h1').first
    titulo_celular.wait_for(state='visible', timeout=30000)
    checar('a entrada renderiza em 390 px', 'O futuro da cidade' in titulo_celular.inner_text())
    celular.close()

    # 6) O catálogo exibe o cartão novo e preserva o da MOSS CONDO.
    pagina.goto(URL_CATALOGO, wait_until='load', timeout=60000)
    cartao = pagina.get_by_role('heading', name='MOSS CITY — Gestão Urbana')
    checar('o catálogo exibe o cartão MOSS CITY', cartao.count() == 1)
    checar('o cartão aponta para demos/moss-city/', pagina.locator('a[href="demos/moss-city/"]').count() >= 1)
    checar('o cartão da MOSS CONDO continua no catálogo', pagina.get_by_role('heading', name='MOSS CONDO — Gestão de Condomínios').count() == 1)

    # 7) A prévia do cartão é servida como imagem.
    requisicoes = playwright.request.new_context()  # Cliente HTTP leve para checar arquivos.
    previa = requisicoes.get(URL_PREVIA, timeout=30000)
    checar('a prévia do cartão responde HTTP 200 como imagem', previa.status == 200 and 'image' in (previa.headers.get('content-type') or ''))
    requisicoes.dispose()

    navegador.close()

# Resultado final: código 0 quando tudo passa, 1 quando algo falha.
print()
if falhas:
    print(f'{len(falhas)} verificação(ões) falhou(aram):')
    for item in falhas:
        print(' -', item)
    sys.exit(1)
print('Todas as verificações de publicação passaram.')
