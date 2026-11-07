# Importa caminhos para receber um destino explícito para a nova captura do catálogo.
from pathlib import Path
# Importa os argumentos de execução do gerador.
import sys
# Importa memória temporária para não criar um PNG intermediário no repositório.
from io import BytesIO
# Importa a conversão da captura para WebP otimizado.
from PIL import Image
# Importa o navegador automatizado e as verificações de carregamento.
from playwright.sync_api import sync_playwright, expect
# Exige um endereço de saída explícito antes de gerar qualquer arquivo.
if len(sys.argv) != 2:
    # Explica como usar o gerador sem alterar o destino errado.
    raise SystemExit('Uso: python tools/prepare_portfolio_preview.py CAMINHO_DA_NOVA_CAPA.webp')
# Resolve o nome do arquivo que será adicionado ao catálogo.
target = Path(sys.argv[1]).resolve()
# Impede substituir uma imagem existente ou gerar um formato não previsto.
if target.exists() or target.suffix != '.webp':
    # Solicita um caminho novo para preservar capas e arquivos de outros trabalhos.
    raise SystemExit('Escolha um arquivo WebP ainda inexistente.')
# Confere se a pasta de destino já pertence à estrutura de imagens do site.
if not target.parent.is_dir():
    # Recusa criar diretórios arbitrários fora da estrutura preparada.
    raise SystemExit('A pasta de destino precisa existir.')
# Inicia o navegador em uma sessão isolada dos dados pessoais do usuário.
with sync_playwright() as playwright:
    # Reaproveita o Chrome já instalado no ambiente.
    browser = playwright.chromium.launch(channel='chrome')
    # Define a proporção de imagem usada pelos cartões existentes do catálogo.
    page = browser.new_page(viewport={'width': 1600, 'height': 1000}, device_scale_factor=1)
    # Abre a versão real da demonstração, com dados fictícios iniciais.
    page.goto('https://mossdigital.com.br/demos/moss-condo/#/sindico/painel', wait_until='networkidle')
    # Confere que a captura será da aplicação carregada, não de uma página de erro.
    expect(page.get_by_role('heading', name='Uma gestão à altura.')).to_be_visible()
    # Aguarda o desenho do gráfico para mostrar um painel completo.
    expect(page.locator('.recharts-surface').first).to_be_visible()
    # Aguarda a fotografia arquitetônica para manter o destaque visual aprovado.
    page.wait_for_function("[...document.querySelectorAll('.condo-photo img')].every(image => image.complete && image.naturalWidth > 0)")
    # Captura apenas a janela visível para manter a proporção 1600 por 1000 pixels.
    capture = page.screenshot(full_page=False)
    # Converte a captura em WebP sem deformar a interface nem inventar componentes.
    Image.open(BytesIO(capture)).convert('RGB').save(target, 'WEBP', quality=84, method=6)
    # Fecha a sessão do navegador depois de gerar a imagem.
    browser.close()
# Confirma o destino preparado sem publicar ou fazer commit automaticamente.
print(f'Captura real 1600 x 1000 preparada em {target}')
