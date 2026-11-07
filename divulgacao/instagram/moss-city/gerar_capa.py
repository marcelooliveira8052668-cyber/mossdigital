# Importa caminhos para localizar capturas e guardar somente a nova divulgação.
from pathlib import Path
# Importa argumentos para receber explicitamente a pasta externa de cópia.
import argparse
# Importa a conversão de imagens para texto, mantendo o SVG independente de links externos.
import base64
# Importa memória temporária para não criar arquivos intermediários pesados.
from io import BytesIO
# Importa o tratamento de imagem já disponível no ambiente de desenvolvimento.
from PIL import Image
# Importa o Chrome automatizado para converter a fonte vetorial em PNG.
from playwright.sync_api import sync_playwright
# Define uma opção de cópia externa explícita para não confundir o worktree com a pasta principal.
parser = argparse.ArgumentParser(description='Gera a capa local da primeira prévia MOSS CITY.')
# Aceita um destino escolhido pelo responsável, sem publicar nas redes sociais.
parser.add_argument('--copy-to', type=Path)
# Lê os argumentos informados na execução do script.
args = parser.parse_args()
# Localiza a pasta desta divulgação exclusiva.
HERE = Path(__file__).resolve().parent
# Localiza o repositório da árvore de trabalho independente.
REPO = HERE.parents[2]
# Localiza a demonstração de gestão urbana.
DEMO = REPO / 'demos' / 'moss-city'
# Abre uma captura real da interface aprovada para revisão, sem inventar resultados.
capture = Image.open(DEMO / 'docs' / 'screenshots' / 'comando-desktop.png').convert('RGB')
# Recorta mapa, indicadores e detalhe para destacar o centro de comando real.
crop = capture.crop((245, 230, 1580, 1020))
# Reserva memória para incorporar a captura ao SVG editável.
buffer = BytesIO()
# Converte a captura recortada para um arquivo PNG em memória.
crop.save(buffer, format='PNG')
# Incorpora a captura para a fonte funcionar sem dependências externas.
embedded = base64.b64encode(buffer.getvalue()).decode('ascii')
# Incorpora a mesma fotografia brasileira de referência usada na apresentação.
photo = base64.b64encode((DEMO / 'src' / 'assets' / 'photos' / 'parque-640.webp').read_bytes()).decode('ascii')
# Define o desenho editável da capa; este conteúdo será exportado como um asset gerado.
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
<!-- Define fundo e moldura técnica da identidade Urban Command. -->
<rect width="1080" height="1350" fill="#071525"/><path d="M44 280V44H1036V1306H44V1190" fill="none" stroke="#254d64"/><path d="M44 160V44H180M900 1306H1036V1180" fill="none" stroke="#00d4ff" stroke-width="3"/>
<!-- Coloca uma fotografia real contextual, sem apresentá-la como registro municipal. -->
<image x="700" y="125" width="305" height="285" href="data:image/webp;base64,{photo}" preserveAspectRatio="xMidYMid slice"/><rect x="745" y="370" width="245" height="28" fill="#071525"/><text x="866" y="390" text-anchor="middle" fill="#eaf7ff" font-family="Arial" font-size="13">SÃO PAULO · FOTO ILUSTRATIVA</text>
<!-- Identifica empresa, produto e segmento sem alterar o logotipo oficial. -->
<text x="77" y="104" fill="#97c7d7" font-family="Arial" font-size="20" letter-spacing="4">MOSS DIGITAL / NOVA EXPERIÊNCIA</text><text x="77" y="210" fill="#eaf7ff" font-family="Arial" font-size="76" letter-spacing="3">MOSS <tspan fill="#00d4ff">CITY</tspan></text><text x="77" y="265" fill="#b4cede" font-family="Arial" font-size="25">Gestão inteligente de cidades</text>
<!-- Destaca o slogan oficial da demonstração. -->
<text x="77" y="350" fill="#eaf7ff" font-family="Arial" font-size="39">O futuro da cidade</text><text x="77" y="402" fill="#00d4ff" font-family="Arial" font-size="44">começa aqui.</text>
<!-- Mostra uma captura verdadeira da prévia, com sua cartografia local fictícia. -->
<rect x="65" y="470" width="950" height="590" fill="#0c2135" stroke="#34708b"/><image x="75" y="480" width="930" height="570" href="data:image/png;base64,{embedded}" preserveAspectRatio="xMidYMid meet"/>
<!-- Resume apenas os recursos que já estão disponíveis neste ponto de revisão. -->
<text x="77" y="1120" fill="#eaf7ff" font-family="Arial" font-size="25">CENTRO DE COMANDO · MAPA · INDICADORES</text><path d="M77 1151H1003" stroke="#254d64"/><text x="77" y="1206" fill="#83e0be" font-family="Arial" font-size="20">PRÉVIA DEMONSTRATIVA · DADOS FICTÍCIOS</text><text x="77" y="1250" fill="#a4bed0" font-family="Arial" font-size="18">Em desenvolvimento. Sem vínculo com órgãos públicos.</text><text x="77" y="1280" fill="#a4bed0" font-family="Arial" font-size="16">Não publicada. Material local para avaliação.</text>
</svg>'''
# Define a fonte vetorial que poderá ser editada em ferramentas de desenho.
source = HERE / 'moss-city-capa-editavel.svg'
# Salva a fonte com suporte a acentos.
source.write_text(svg, encoding='utf-8')
# Converte o SVG usando o mesmo navegador disponível nos testes.
with sync_playwright() as playwright:
    # Reaproveita o Chrome local sem instalar aplicações adicionais.
    browser = playwright.chromium.launch(channel='chrome')
    # Define o tamanho exato do material solicitado para Instagram.
    page = browser.new_page(viewport={'width': 1080, 'height': 1350}, device_scale_factor=1)
    # Abre a fonte vetorial local com fotografias incorporadas.
    page.goto(source.as_uri())
    # Exporta a imagem em PNG de 1080 por 1350 pixels.
    page.screenshot(path=str(HERE / 'moss-city-instagram.png'))
    # Fecha o navegador usado para renderizar a capa.
    browser.close()
# Cria a cópia externa somente quando um destino foi explicitamente informado.
if args.copy_to:
    # Cria apenas a pasta específica desta nova demonstração.
    args.copy_to.mkdir(parents=True, exist_ok=True)
    # Copia o PNG para facilitar sua localização sem publicar o material.
    (args.copy_to / 'moss-city-instagram.png').write_bytes((HERE / 'moss-city-instagram.png').read_bytes())
# Confirma a preparação local sem fazer postagem, commit ou push.
print('Capa 1080 x 1350 e fonte SVG preparadas localmente; nenhuma publicação executada.')
