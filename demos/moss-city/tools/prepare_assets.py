# Importa caminhos para guardar imagens somente na nova demonstração.
from pathlib import Path
# Importa o cliente HTTP padrão do Python para baixar as fotografias selecionadas.
from urllib.request import Request, urlopen
# Importa memória temporária para converter as imagens sem guardar originais pesados.
from io import BytesIO
# Importa JSON para registrar fontes, autoria confirmada e licenças.
import json
# Importa um gerador determinístico para o desenho cartográfico autoral.
import random
# Importa processamento de imagem já disponível no ambiente de desenvolvimento.
from PIL import Image, ImageOps, ImageDraw
# Localiza a pasta da MOSS CITY dentro da árvore de trabalho independente.
ROOT = Path(__file__).resolve().parents[1]
# Define a pasta exclusiva de fotografias locais.
OUTPUT = ROOT / 'src' / 'assets' / 'photos'
# Cria a pasta de fotos sem mexer em outras demonstrações.
OUTPUT.mkdir(parents=True, exist_ok=True)
# Garante uma pasta para registros e evidências visuais da revisão.
(ROOT / 'docs' / 'screenshots').mkdir(parents=True, exist_ok=True)
# Define fotografias gratuitas cujas páginas de origem foram consultadas na seleção.
SOURCES = {
    'cidade': (24350605, 'Apartment Buildings in Skyline of Sao Paulo, Brazil', 'https://www.pexels.com/photo/apartment-buildings-in-skyline-of-sao-paulo-brazil-24350605/'), # Prioriza uma fotografia urbana brasileira na apresentação.
    'avenida': (18179143, 'Paulista Avenue in Sao Paulo — Pedro Henrique Carreira', 'https://www.pexels.com/photo/paulista-avenue-in-sao-paulo-18179143/'), # Usa arquitetura e iluminação da Avenida Paulista como referência ilustrativa.
    'parque': (35699522, 'Aerial View of Ibirapuera Park in Sao Paulo', 'https://www.pexels.com/photo/aerial-view-of-ibirapuera-park-in-sao-paulo-35699522/'), # Relaciona áreas verdes ao contexto urbano brasileiro.
    'mobilidade': (16984039, 'Bus on Street in City — fabianoshow4', 'https://www.pexels.com/photo/bus-on-street-in-city-16984039/'), # Mostra transporte público de São Paulo sem sugerir integração operacional.
    'obras': (2833686, 'Construction Site Along The Road', 'https://www.pexels.com/photo/construction-site-along-the-road-2833686/'), # Usa um canteiro de obras apenas como imagem contextual, sem afirmar localização brasileira.
}
# Guarda um inventário de origem para cada imagem incorporada ao aplicativo.
manifest = []
# Guarda pequenas imagens para uma folha de conferência visual.
previews = []
# Processa cada fotografia selecionada para o primeiro ponto de revisão.
for key, (photo_id, title, source_page) in SOURCES.items():
    # Solicita uma imagem com tamanho limitado ao CDN oficial do acervo.
    url = f'https://images.pexels.com/photos/{photo_id}/pexels-photo-{photo_id}.jpeg?auto=compress&cs=tinysrgb&w=1920'
    # Identifica o cliente para receber uma imagem compatível.
    request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    # Usa um limite de tempo para que uma falha de rede não deixe o preparo travado.
    with urlopen(request, timeout=45) as response:
        # Corrige a orientação antes de converter a fotografia para RGB.
        image = ImageOps.exif_transpose(Image.open(BytesIO(response.read()))).convert('RGB')
    # Prepara variantes adequadas a telas pequenas, médias e grandes.
    for width in [640, 1120, 1920]:
        # Mantém a proporção e evita ampliar a fotografia além da origem.
        resized = ImageOps.contain(image, (width, width * 3), Image.Resampling.LANCZOS)
        # Salva em WebP, sem copiar metadados pessoais de câmera ou localização.
        resized.save(OUTPUT / f'{key}-{width}.webp', 'WEBP', quality=78, method=6)
    # Registra a página consultada e a licença do acervo em vez de inventar créditos individuais.
    manifest.append({'key': key, 'title': title, 'source_page': source_page, 'download_url': url, 'license': 'https://www.pexels.com/license/', 'commercial_use_reference': 'https://help.pexels.com/hc/en-us/articles/360042295214-Can-I-use-the-photos-and-videos-for-a-commercial-project', 'usage': 'Fotografia ilustrativa, sem vínculo com prefeitura, contrato, obra ou atendimento real.'})
    # Cria uma pequena prévia da fotografia para a seleção visual.
    tile = Image.new('RGB', (384, 260), '#071525')
    # Enquadra a foto mantendo suas proporções.
    tile.paste(ImageOps.fit(image, (364, 220), Image.Resampling.LANCZOS), (10, 10))
    # Acrescenta o identificador do arquivo à folha de conferência.
    ImageDraw.Draw(tile).text((12, 238), key, fill='#eaf7ff')
    # Guarda a miniatura para a composição final.
    previews.append(tile)
    # Informa a conclusão de cada fotografia sem esconder erros.
    print(f'Foto preparada: {key}')
# Guarda o inventário gerado sem comentários dentro do JSON.
(ROOT / 'docs' / 'photo-sources.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
# Cria uma folha de contato com as cinco fotos selecionadas.
sheet = Image.new('RGB', (1152, 520), '#071525')
# Distribui as miniaturas em três colunas.
for index, tile in enumerate(previews):
    # Posiciona a foto na coluna e linha correspondentes.
    sheet.paste(tile, ((index % 3) * 384, (index // 3) * 260))
# Guarda a evidência visual local de seleção de fotografias.
sheet.save(ROOT / 'docs' / 'screenshots' / 'fotografias.jpg', quality=87)
# Usa uma sequência fixa para que o mapa autoral seja reproduzível.
rng = random.Random(24)
# Inicia o SVG cartográfico com um fundo escuro e uma grade discreta.
parts = ['<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1100" viewBox="0 0 1600 1100"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M40 0H0V40" fill="none" stroke="#1c364a" stroke-width=".6"/></pattern></defs><rect width="1600" height="1100" fill="#091c2c"/><rect width="1600" height="1100" fill="url(#grid)"/>']
# Desenha quadras com pequenas variações sem copiar dados cartográficos reais.
for x in range(45, 1570, 92):
    # Distribui os quarteirões em linhas regulares com ruas entre eles.
    for y in range(35, 1080, 82):
        # Evita preencher a faixa reservada ao rio e aos parques do cenário.
        if 1050 < x < 1270 or (170 < x < 450 and 160 < y < 360) or (520 < x < 820 and y > 850):
            # Mantém essas regiões livres de edifícios.
            continue
        # Desenha os blocos de edifícios com contornos suaves e tons variados.
        parts.append(f'<rect x="{x}" y="{y}" width="{rng.randint(55, 72)}" height="{rng.randint(45, 62)}" rx="3" fill="{rng.choice(["#102b3e", "#132e42", "#142f44", "#11283a"])}" stroke="#244357" stroke-width="1"/>')
# Desenha o rio fictício, com margens azuladas e sem sugerir um curso real.
parts.append('<path d="M1200-80C1000 160 1260 310 1110 520S1170 850 1000 1180" fill="none" stroke="#163b51" stroke-width="110"/><path d="M1200-80C1000 160 1260 310 1110 520S1170 850 1000 1180" fill="none" stroke="#0b2b40" stroke-width="85"/>')
# Desenha parques de referência dentro da cartografia esquemática.
parts.append('<path d="M170 160H450V350H170Z M520 860H820V1050H520Z" fill="#0e3d36" stroke="#21634e" stroke-width="2"/>')
# Destaca vias estruturais sem simular dados de trânsito ou velocidade.
for path in ['M-40 540 1650 540', 'M770-20 770 1140', 'M-50 1000 1180-60', 'M220-40 1430 1140']:
    # Cria a faixa escura da via com largura consistente.
    parts.append(f'<path d="{path}" fill="none" stroke="#071525" stroke-width="29"/><path d="{path}" fill="none" stroke="#345367" stroke-width="19"/><path d="{path}" fill="none" stroke="#173447" stroke-width="15"/>')
# Acrescenta um eixo cívico e uma ciclovia explicitamente ilustrativos.
parts.append('<path d="M-40 540H1650" stroke="#00d4ff" stroke-width="2" opacity=".55"/><path d="M220 1150V370H600" fill="none" stroke="#32d6a0" stroke-width="3" stroke-dasharray="9 7"/>')
# Define nomes inventados para regiões que serão associados aos marcadores.
for x, y, name in [(540, 175, 'DISTRITO NORTE'), (220, 410, 'JARDIM AURORA'), (740, 640, 'CENTRO CÍVICO'), (1230, 890, 'VILA DAS ÁGUAS')]:
    # Escreve os rótulos com um contorno que preserva sua leitura sobre as vias.
    parts.append(f'<text x="{x}" y="{y}" font-family="Arial,sans-serif" font-size="21" letter-spacing="4" fill="#829ead" stroke="#091c2c" stroke-width="6" paint-order="stroke">{name}</text>')
# Identifica vias fictícias e o caráter esquemático da imagem.
parts.append('<text x="800" y="520" font-family="Arial,sans-serif" font-size="14" fill="#a2c6d5">EIXO CÍVICO • VIA FICTÍCIA</text><text x="45" y="1070" font-family="Arial,sans-serif" font-size="13" fill="#8ca9ba">CARTOGRAFIA AUTORAL • CENÁRIO FICTÍCIO • SEM ESCALA CADASTRAL</text></svg>')
# Guarda o desenho autoral usado por padrão no mapa interativo.
(ROOT / 'src' / 'assets' / 'territorio.svg').write_text(''.join(parts), encoding='utf-8')
# Confirma a criação do mapa sem realizar nenhuma requisição a servidores de tiles.
print('Cartografia esquemática autoral preparada, sem downloads de tiles.')
