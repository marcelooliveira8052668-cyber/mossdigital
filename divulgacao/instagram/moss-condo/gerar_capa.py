# Importa caminhos para localizar a demo e guardar os materiais de divulgação.
from pathlib import Path
# Importa a conversão da captura para um endereço de imagem independente.
import base64
# Importa memória temporária para recortar a imagem sem criar arquivos intermediários.
from io import BytesIO
# Importa a biblioteca de imagem já disponível no ambiente.
from PIL import Image
# Importa o navegador já instalado para renderizar a capa vetorial em PNG.
from playwright.sync_api import sync_playwright
# Localiza a pasta deste material de divulgação.
HERE = Path(__file__).resolve().parent
# Localiza o repositório correto, sem usar o repositório externo do diretório do usuário.
REPO = HERE.parents[2]
# Localiza a captura real da própria demonstração.
CAPTURE = REPO / 'demos' / 'moss-condo' / 'docs' / 'screenshots' / 'sindico-desktop.png'
# Abre a captura do painel para criar um enquadramento da interface.
image = Image.open(CAPTURE).convert('RGB')
# Recorta o banner, os indicadores e o gráfico completo, sem cortar o conteúdo financeiro da versão com fotos.
crop = image.crop((280, 240, 1420, 1112))
# Reserva memória para a imagem recortada.
buffer = BytesIO()
# Salva o recorte temporariamente em memória no formato PNG.
crop.save(buffer, format='PNG')
# Converte a imagem em texto para que o SVG não dependa de links externos.
embedded = base64.b64encode(buffer.getvalue()).decode('ascii')
# Localiza a foto ilustrativa de fachada usada na própria demonstração.
PHOTO = REPO / 'demos' / 'moss-condo' / 'src' / 'assets' / 'photos' / 'fachada-640.webp'
# Incorpora a fotografia local para manter a fonte SVG independente de sites externos.
photo_embedded = base64.b64encode(PHOTO.read_bytes()).decode('ascii')
# Define a fonte editável; os textos e posições podem ser alterados no SVG gerado.
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1350" viewBox="0 0 1080 1350">
<rect width="1080" height="1350" fill="#111827"/>
<rect x="34" y="34" width="1012" height="1282" rx="28" fill="none" stroke="#c58b5a" stroke-opacity=".35"/>
<!-- Recorta a fotografia de fachada para criar um detalhe visual no topo da capa. -->
<defs><clipPath id="cover-photo"><rect x="720" y="153" width="286" height="280" rx="20"/></clipPath></defs>
<!-- Mostra a mesma foto da entrada, incorporada ao SVG para funcionar offline. -->
<image x="720" y="153" width="286" height="280" href="data:image/webp;base64,{photo_embedded}" preserveAspectRatio="xMidYMid slice" clip-path="url(#cover-photo)"/>
<!-- Mantém a indicação de que a foto não representa um empreendimento cliente. -->
<rect x="796" y="395" width="198" height="26" rx="5" fill="#111827"/>
<!-- Apresenta a identificação com contraste suficiente sobre a fotografia. -->
<text x="895" y="413" text-anchor="middle" fill="#f4efe9" font-family="Segoe UI,Arial" font-size="14">FOTO ILUSTRATIVA</text>
<text x="74" y="110" fill="#c58b5a" font-family="Segoe UI,Arial" font-size="21" letter-spacing="5">MOSS DIGITAL / SISTEMAS</text>
<text x="74" y="216" fill="#f4efe9" font-family="Segoe UI,Arial" font-size="76" letter-spacing="2">MOSS <tspan fill="#c58b5a">CONDO</tspan></text>
<text x="74" y="278" fill="#c8d0dc" font-family="Segoe UI,Arial" font-size="29">Gestão de condomínios</text>
<text x="74" y="365" fill="#f4efe9" font-family="Georgia,serif" font-size="47">Seu condomínio,</text>
<text x="74" y="422" fill="#dfb795" font-family="Georgia,serif" font-size="47" font-style="italic">perfeitamente conectado.</text>
<rect x="65" y="476" width="950" height="608" rx="18" fill="#1f2937" stroke="#c58b5a" stroke-opacity=".45"/>
<image x="75" y="486" width="930" height="588" href="data:image/png;base64,{embedded}" preserveAspectRatio="xMidYMid meet"/>
<rect x="74" y="1120" width="272" height="54" rx="10" fill="#273449"/>
<rect x="404" y="1120" width="272" height="54" rx="10" fill="#273449"/>
<rect x="734" y="1120" width="272" height="54" rx="10" fill="#273449"/>
<text x="210" y="1155" fill="#f4efe9" font-family="Segoe UI,Arial" font-size="23" text-anchor="middle">Síndico</text>
<text x="540" y="1155" fill="#f4efe9" font-family="Segoe UI,Arial" font-size="23" text-anchor="middle">Morador</text>
<text x="870" y="1155" fill="#f4efe9" font-family="Segoe UI,Arial" font-size="23" text-anchor="middle">Portaria</text>
<text x="74" y="1231" fill="#9fd9cd" font-family="Segoe UI,Arial" font-size="21">DEMONSTRAÇÃO • MARCA E VALORES FICTÍCIOS</text>
<text x="74" y="1272" fill="#b1bac8" font-family="Segoe UI,Arial" font-size="18">Prévia local para aprovação. Não publicada.</text>
</svg>'''
# Define o arquivo vetorial que permanece editável e independente.
source = HERE / 'moss-condo-capa-editavel.svg'
# Guarda o SVG sem perder acentos.
source.write_text(svg, encoding='utf-8')
# Abre o navegador para converter o SVG exatamente no tamanho solicitado.
with sync_playwright() as playwright:
    # Reaproveita o Chrome local, sem instalar programas adicionais.
    browser = playwright.chromium.launch(channel='chrome')
    # Cria uma página com o tamanho exato da capa para Instagram.
    page = browser.new_page(viewport={'width': 1080, 'height': 1350}, device_scale_factor=1)
    # Abre a fonte vetorial local da capa.
    page.goto(source.as_uri())
    # Guarda a capa pronta em PNG com 1080 por 1350 pixels.
    page.screenshot(path=str(HERE / 'moss-condo-instagram.png'))
    # Fecha o navegador usado somente para renderização.
    browser.close()
# Define a pasta externa de divulgação solicitada nas instruções do repositório.
COPY = REPO.parent / '04 - Divulgacao' / 'MOSS CONDO'
# Cria somente a subpasta desta nova demonstração, sem reorganizar arquivos existentes.
COPY.mkdir(parents=True, exist_ok=True)
# Oferece uma cópia fácil de encontrar, sem publicar em redes sociais.
(COPY / 'moss-condo-instagram.png').write_bytes((HERE / 'moss-condo-instagram.png').read_bytes())
# Confirma a entrega do material local.
print('Capa PNG 1080 x 1350, fonte SVG e cópia de divulgação criadas localmente.')
