# Importa caminhos para salvar as fotos apenas dentro da MOSS CONDO.
from pathlib import Path
# Importa o leitor de endereços da biblioteca padrão do Python.
from urllib.request import Request, urlopen
# Importa memória temporária para processar imagens sem guardar originais pesados.
from io import BytesIO
# Importa JSON para documentar a origem dos arquivos gerados.
import json
# Importa ferramentas de imagem já disponíveis neste ambiente de desenvolvimento.
from PIL import Image, ImageOps, ImageDraw
# Localiza a pasta independente da demonstração.
ROOT = Path(__file__).resolve().parents[1]
# Define a pasta de fotos locais que o Vite incluirá no build.
OUTPUT = ROOT / 'src' / 'assets' / 'photos'
# Cria somente a pasta exclusiva desta demonstração.
OUTPUT.mkdir(parents=True, exist_ok=True)
# Relaciona cada assunto à fotografia selecionada nos acervos gratuitos Unsplash e Pexels.
SOURCES = {
    'fachada': ('photo-1545324418-cc1a3fa10c00', 'Fachada residencial'), # Representa o segmento imobiliário na entrada e no painel do síndico.
    'residencia': ('photo-1600585154340-be6161a56a0c', 'Residência contemporânea'), # Apresenta arquitetura e paisagismo para moradores.
    'recepcao': ('photo-1497366811353-6870744d04b2', 'Ambiente de recepção e convivência'), # Contextualiza a experiência da portaria.
    'salao': ('photo-1519167758481-83f550bb49b3', 'Salão de eventos'), # Ilustra o salão de festas sem vincular o local à marca fictícia.
    'churrasqueira': ('https://images.pexels.com/photos/8021097/pexels-photo-8021097.jpeg?auto=compress&cs=tinysrgb&w=1800', 'Detalhe de churrasqueira a carvão'), # Mostra uma churrasqueira real sem usar fotos de pessoas.
    'quadra': ('https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1800', 'Quadra esportiva'), # Seleciona uma fotografia da área esportiva para conferência visual.
    'gourmet': ('photo-1600607687920-4e2a09cf159d', 'Ambiente gourmet'), # Destaca o ambiente para refeições compartilhadas.
    'reunioes': ('photo-1497366754035-f200968a6e72', 'Ambiente de reuniões'), # Ilustra os espaços comerciais e de trabalho.
    'piscina': ('photo-1576013551627-0cc20b96c2a7', 'Piscina e área de lazer'), # Enriquece o painel do morador e os comunicados.
}
# Guarda a ficha de origem das imagens incluídas nesta versão.
manifest = []
# Guarda pequenas prévias para conferir visualmente os assuntos baixados.
previews = []
# Processa cada fotografia selecionada com uma requisição de tamanho limitado.
for key, (photo_id, subject) in SOURCES.items():
    # Define a origem convencional de cada imagem, sem usar Unsplash+ ou serviços aleatórios.
    url = photo_id if photo_id.startswith('https://') else f'https://images.unsplash.com/{photo_id}?auto=format&fit=crop&w=1800&q=85' # Aceita a origem Pexels documentada e as fotografias convencionais do Unsplash.
    # Identifica a requisição como um navegador para receber uma imagem compatível.
    request = Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    # Lê a fotografia com limite de tempo para não travar o preparo dos assets.
    with urlopen(request, timeout=45) as response:
        # Abre a imagem em memória sem manter conexão externa na aplicação final.
        image = ImageOps.exif_transpose(Image.open(BytesIO(response.read()))).convert('RGB')
    # Cria variantes reais para telas pequenas, médias e grandes.
    for width in [640, 1120, 1600]:
        # Reduz a imagem mantendo suas proporções originais e sem aumentar além da origem.
        resized = ImageOps.contain(image, (width, width * 2), Image.Resampling.LANCZOS)
        # Salva em WebP sem metadados pessoais de câmera ou localização.
        resized.save(OUTPUT / f'{key}-{width}.webp', 'WEBP', quality=79, method=6)
    # Registra URL de origem, licença e assunto sem inventar o nome de um fotógrafo.
    manifest.append({'key': key, 'subject': subject, 'source': url, 'provider': 'Pexels' if 'pexels.com' in url else 'Unsplash', 'source_page': f'https://www.pexels.com/photo/{url.split("/photos/")[1].split("/")[0]}/' if 'pexels.com' in url else url, 'license': 'https://www.pexels.com/license/' if 'pexels.com' in url else 'https://unsplash.com/license', 'usage': 'Imagem ilustrativa; não representa cliente, condomínio ou patrimônio da MOSS Digital.', 'widths': [640, 1120, 1600]}) # Documenta o provedor correto e a licença de cada fotografia.
    # Cria uma miniatura para a folha de conferência visual.
    preview = ImageOps.fit(image, (360, 220), Image.Resampling.LANCZOS)
    # Acrescenta um rótulo fora da fotografia para identificar o assunto.
    tile = Image.new('RGB', (380, 260), '#1f2937')
    # Coloca a fotografia na parte superior da miniatura.
    tile.paste(preview, (10, 10))
    # Desenha o nome do arquivo para facilitar a revisão.
    ImageDraw.Draw(tile).text((12, 237), key, fill='#f4efe9')
    # Guarda a miniatura para compor a folha de conferência.
    previews.append(tile)
    # Informa o avanço sem ocultar falhas de download.
    print(f'OK: {key}')
# Salva um manifesto gerado automaticamente, sem comentários dentro do JSON.
(ROOT / 'docs' / 'photo-sources.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
# Cria uma folha com três colunas de fotografias para a revisão local.
sheet = Image.new('RGB', (1140, 780), '#111827')
# Distribui todas as miniaturas na folha.
for index, tile in enumerate(previews):
    # Calcula a coluna e a linha da miniatura atual.
    sheet.paste(tile, ((index % 3) * 380, (index // 3) * 260))
# Guarda a folha de contato como evidência da seleção visual.
sheet.save(ROOT / 'docs' / 'screenshots' / 'fotos-selecionadas.jpg', quality=85)
