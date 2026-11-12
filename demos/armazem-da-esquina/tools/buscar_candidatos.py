"""Busca fotos de produto por categoria no Wikimedia Commons e monta folha de conferencia."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from PIL import Image, ImageOps, ImageDraw
import json
import io

ROOT = Path(__file__).resolve().parent.parent  # Pasta da demo.
SAIDA = ROOT / 'tools' / 'candidatos'  # Candidatos baixados para conferencia.
API = 'https://commons.wikimedia.org/w/api.php'  # Catalogo publico de midia livre.
HEADERS = {'User-Agent': 'MossDigitalDemo/1.0 (contato@mossdigital.com.br)'}  # Identificacao exigida.

# Produto, categoria principal, categorias extras e termos a evitar no titulo.
PRODUTOS = [
  ('pao-frances', 'Category:Baguettes', ['Category:Bread loaves'], ['slice','toast','sandwich','sandwiche']),
  ('croissant', 'Category:Croissants', ['Category:Pastries'], ['chocolate croissant sandwich']),
  ('bolo-chocolate', 'Category:Chocolate cakes', ['Category:Cakes with chocolate'], ['slice on plate with fork and','cupcake','cupcakes','brownies']),
  ('bisnaguinha', 'Category:Cookies', ['Category:Biscuits'], ['chocolate chip','oreo','brownie']),
  ('banana-prata', 'Category:Bananas', ['Category:Banana fruit'], ['pest','disease','flower','plant','leaf','harvest','label','package']),
  ('tomate-italiano', 'Category:Tomatoes', ['Category:Tomato fruit'], ['plant','greenhouse','pest','disease','seedling','leaf','blossom','sauce','paste','juice']),
  ('maca-gala', 'Category:Apples', ['Category:Apple fruit'], ['tree','orchard','blossom','leaf','pest','juice','cider','pie','cake']),
  ('alface-crespa', 'Category:Lettuce', ['Category:Lactuca sativa'], ['field','farm','plant growing','hydroponic','salad bowl with']),
  ('batata-inglesa', 'Category:Potatoes', ['Category:Solanum tuberosum'], ['seed','history','book','plant flower','pest','fries','chips','mashed','dish','cooked']),
  ('limao-tahiti', 'Category:Lemons', ['Category:Citrus limon'], ['cocktail','drink','juice','juicer','cake','pie','plant','tree','leaf','blossom']),
  ('arroz-agulha', 'Category:Rice', ['Category:Oryza sativa grains'], ['dish','cooked','bowl of','pudding','cake','pest','field','plant','harvest','wine','market','stall','sign','shop','warehouse']),
  ('feijao-carioca', 'Category:Phaseolus vulgaris seeds', ['Category:Dried beans'], ['dish','cooked','soup','chili','pest','field','plant','flower']),
  ('macarrao-parafuso', 'Category:Dried pasta', ['Category:Pasta'], ['sauce','cooked','dish','spaghetti with','salad','canned','boiled','plate','fork','knife','bowl of']),
  ('azeite-oliva', 'Category:Olive oil', ['Category:Bottles of olive oil'], ['press','mill','mill workers','harvest','grove','factory','tin can']),
  ('acucar-cristal', 'Category:Sugar', ['Category:Granulated sugar'], ['cane','beet','plant','factory','brown','refinery','cube','icing']),
  ('cafe-torrado', 'Category:Coffee beans', ['Category:Roasted coffee beans'], ['cup of','latte','espresso','plant','cherries','farm','tree','bag of','grinder','cafe']),
  ('oleo-soja', 'Category:Soybean oil', ['Category:Vegetable oils'], ['press','mill','workers','factory','canola field','soybean field','plant']),
  ('farinha-mandioca', 'Category:Cassava flour', ['Category:Tapioca'], ['person','portrait','worker','field','plant','roots','tuber','manioc roots']),
  ('leite-integral', 'Category:Milk bottles', ['Category:Milk'], ['delivery','historic','vintage','cow','cart','chocolate','strawberry','soy','almond','powder','condensed','laboratory','laboratory','experiment','petri','scientist','sample','test tube','clinic']),
  ('queijo-minas', 'Category:Fresh cheeses', ['Category:Brazilian cheeses'], ['platter','board of','wine','factory','grilled','served with','sandwich']),
  ('iogurte-natural', 'Category:Yogurt', ['Category:Yoghurt'], ['muesli','granola','fruit','dessert','berries','smoothie','drink','parfait','frozen']),
  ('agua-mineral', 'Category:Bottled water', ['Category:Water bottles'], ['chart','atlas','map','label','logo','diagram','graph','source','spring','tap']),
  ('suco-uva', 'Category:Grape juice', ['Category:Grape drinks'], ['liqueur','poster','wine','vineyard','label','concentrate','powder','jam','compote','must','crushed','skins','fork','dessert','jelly']),
  ('detergente', 'Category:Dishwashing liquid', ['Category:Detergents'], ['shop','street','sign','label','brand','powder','laundry','supermarket','aisle','shelf','store','market','price','rack']),
]

def arquivos(categoria, limite=60):
    """Lista imagens de uma categoria com dados de licenca."""
    params = urlencode({'action':'query','generator':'categorymembers','gcmtitle':categoria,'gcmtype':'file','gcmlimit':limite,
                        'prop':'imageinfo','iiprop':'url|extmetadata|size','iiurlwidth':1600,'format':'json'})
    try:
        dados = json.loads(urlopen(Request(API+'?'+params, headers=HEADERS), timeout=60).read())
    except Exception as erro:
        print('  falha em', categoria, erro)
        return []
    lista = []
    for pagina in dados.get('query',{}).get('pages',{}).values():
        info = pagina.get('imageinfo',[{}])[0]
        if not info.get('thumburl'):
            continue
        meta = info.get('extmetadata',{})
        import re
        licenca = re.sub('<[^>]+>','',meta.get('LicenseShortName',{}).get('value','')).strip()
        autor = re.sub('<[^>]+>','',meta.get('Artist',{}).get('value','')).strip() or 'Wikimedia Commons'
        lista.append({'titulo':pagina['title'],'arquivo':info['thumburl'],'origem':info.get('descriptionurl',''),
                      'licenca':licenca,'autor':autor,'largura':info.get('width',0),'altura':info.get('height',0)})
    return lista

def principal():
    import sys
    alvos = [p for p in PRODUTOS if p[0] in sys.argv[1:]] or PRODUTOS  # Refaz tudo ou so os pedidos.
    if not sys.argv[1:]:
        if SAIDA.exists():
            for pasta in SAIDA.iterdir():
                for arquivo in pasta.glob('*'):
                    arquivo.unlink()
    for chave, categoria, extras, negados in alvos:
        pasta = SAIDA/chave
        pasta.mkdir(parents=True, exist_ok=True)
        for antigo in pasta.glob('*'):
            antigo.unlink()  # Sempre parte de candidatos novos para o item refazer.
        candidatos = arquivos(categoria) + [c for e in extras for c in arquivos(e)]
        indice = 0
        for item in candidatos:
            titulo = item['titulo'].lower()
            if any(n in titulo for n in negados):
                continue
            if item['largura'] < 900:
                continue
            try:
                dados = urlopen(Request(item['arquivo'], headers=HEADERS), timeout=60).read()
                imagem = Image.open(io.BytesIO(dados)).convert('RGB')
                imagem.thumbnail((520, 520))
                imagem.save(pasta/f'{indice:02d}.jpg', quality=85)
                (pasta/f'{indice:02d}.json').write_text(json.dumps({**item,'titulo':item['titulo']}, ensure_ascii=False, indent=2), encoding='utf-8')
                indice += 1
                if indice >= 8:
                    break
            except Exception:
                continue
        print(chave, indice, 'candidatos')
    folha = Image.new('RGB', (1200, max(1,len(alvos))*140), '#fbf7f0')
    desenho = ImageDraw.Draw(folha)
    for linha, (chave, *_resto) in enumerate(alvos):
        y = linha*140
        desenho.text((6, y+4), chave, fill='#124435')
        x = 150
        for arquivo in sorted((SAIDA/chave).glob('*.jpg'))[:8]:
            folha.paste(ImageOps.fit(Image.open(arquivo), (128, 128)), (x, y+4)); x += 130
    folha.save(ROOT/'tools'/'candidatos-revisao.jpg')
    print('Folha de candidatos gravada.')

if __name__ == '__main__':
    principal()
