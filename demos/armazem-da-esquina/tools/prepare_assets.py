"""Baixa uma foto de banco licenciada para cada produto do ARMAZEM DA ESQUINA.

Uso:  python tools/prepare_assets.py [chave ...]
Consulta o Wikimedia Commons, exige termos coerentes no titulo e registra o credito.
"""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from PIL import Image, ImageOps, ImageDraw
import json
import io
import re

ROOT = Path(__file__).resolve().parent.parent  # Todos os arquivos pertencem a esta demonstracao.
OUT = ROOT / 'assets' / 'img'  # Fotos e miniaturas locais.
API = 'https://commons.wikimedia.org/w/api.php'  # API publica do catalogo de imagens livres.
HEADERS = {'User-Agent': 'MossDigitalDemo/1.0 (contato@mossdigital.com.br)'}  # Identificacao exigida pela API.

# Titulos com estas palavras mostram documento, desenho ou cena que nao representa o produto.
NEGAR = ['engraving', 'engraved', 'illustration', 'drawing', 'sketch', 'book', 'page', 'newspaper', 'journal',
         'advertisement', 'poster', 'liqueur', 'label', 'labeling', 'card ', 'cover', 'stamp', 'banknote',
         'museum', 'archive', 'logo', 'map', 'chart', 'plan of', 'factory', 'plant', 'warehouse', 'machine',
         'painting', 'oil painting', 'woodcut', 'lithograph', 'plate ', 'signature', 'text of', 'catalogue',
         'catalog', 'manual of', 'ornithology', 'workers', 'bottling', 'foodie', 'disorder', 'chicken',
         'cauliflower', 'recipe', 'bolgiano', 'portal for', 'economy of', 'sociology', 'history of']

# Produto, termos de busca, palavra obrigatoria no titulo e termos alternativos.
PRODUTOS = [
  ('pao-frances', 'Pao frances', ['baguette bread bakery', 'baguette'], ['baguette'], ['french bread', 'bread loaf']),
  ('croissant', 'Croissant', ['croissant pastry'], ['croissant'], ['pain au chocolat']),
  ('bolo-chocolate', 'Bolo de chocolate', ['chocolate cake slice'], ['cake'], ['chocolate cake whole']),
  ('bisnaguinha', 'Bisnaguinha', ['biscuit cookies plate'], ['cookie', 'biscuit'], ['butter cookies', 'shortbread']),
  ('banana-prata', 'Banana prata', ['banana fruit bunch'], ['banana'], ['bananas yellow']),
  ('tomate-italiano', 'Tomate italiano', ['tomato red fresh'], ['tomato'], ['tomatoes basket']),
  ('maca-gala', 'Maca gala', ['red apple fruit isolated white background', 'gala apple'], ['apple'], ['apples red']),
  ('alface-crespa', 'Alface crespa', ['lettuce head green fresh'], ['lettuce'], ['salad green leaves']),
  ('batata-inglesa', 'Batata inglesa', ['potato tubers raw closeup', 'potatoes raw pile'], ['potato'], ['potato vegetable']),
  ('limao-tahiti', 'Limao tahiti', ['lemons yellow fruit whole', 'lemon cut half yellow'], ['lemon'], ['citrus lemon']),
  ('arroz-agulha', 'Arroz agulha tipo 1', ['white rice grains closeup', 'basmati rice grains'], ['rice'], ['raw rice']),
  ('feijao-carioca', 'Feijao carioca', ['pinto beans dry'], ['bean'], ['beans raw close']),
  ('macarrao-parafuso', 'Macarrao parafuso', ['penne pasta dry', 'spaghetti pasta dry'], ['pasta', 'penne', 'spaghetti'], ['macaroni']),
  ('azeite-oliva', 'Azeite de oliva extravirgem', ['olive oil bottle kitchen table', 'olive oil glass bottle'], ['olive'], ['olive oil']),
  ('acucar-cristal', 'Acucar cristal', ['white sugar crystals spoon', 'granulated sugar white'], ['sugar'], ['sugar crystals']),
  ('cafe-torrado', 'Cafe torrado e moido', ['roasted coffee beans'], ['coffee'], ['coffee beans roasted pile']),
  ('oleo-soja', 'Oleo de soja', ['sunflower oil bottle clear', 'vegetable oil glass bottle'], ['oil'], ['cooking oil bottle']),
  ('farinha-mandioca', 'Farinha de mandioca', ['flour sack bag white', 'cassava flour bag'], ['flour'], ['manioc flour']),
  ('leite-integral', 'Leite integral', ['milk glass bottle white'], ['milk'], ['milk carton bottle']),
  ('queijo-minas', 'Queijo minas frescal', ['fresh cheese white round'], ['cheese'], ['cheese wheel']),
  ('iogurte-natural', 'Iogurte natural', ['yogurt cup plain white'], ['yogurt', 'yoghurt'], ['yoghurt bowl']),
  ('agua-mineral', 'Agua mineral sem gas', ['mineral water bottles plastic'], ['water'], ['water bottle clear']),
  ('suco-uva', 'Suco de uva integral', ['grape juice glass purple'], ['grape'], ['grape juice bottle']),
  ('detergente', 'Detergente neutro', ['detergent bottle liquid', 'dish soap bottle'], ['detergent', 'soap'], ['liquid soap bottle']),
]  # Vinco e meio; todos os itens sao ficticios.

def consulta(termo, limite=10):
    """Busca imagens de bitmap no catalogo e devolve candidatos com licenca."""
    params = urlencode({'action':'query','generator':'search','gsrsearch':f'filetype:bitmap {termo}','gsrlimit':limite,
                        'gsrnamespace':6,'prop':'imageinfo','iiprop':'url|extmetadata|size','iiurlwidth':1600,'format':'json'})
    dados = json.loads(urlopen(Request(API+'?'+params, headers=HEADERS), timeout=60).read())
    candidatos = []
    for pagina in dados.get('query',{}).get('pages',{}).values():
        info = pagina.get('imageinfo',[{}])[0]
        if not info.get('thumburl'):
            continue
        meta = info.get('extmetadata',{})
        licenca = re.sub('<[^>]+>','',meta.get('LicenseShortName',{}).get('value','')).strip()
        autor = re.sub('<[^>]+>','',meta.get('Artist',{}).get('value','')).strip() or 'Wikimedia Commons'
        if not licenca:
            continue
        titulo = pagina['title'].lower()
        if any(palavra in titulo for palavra in NEGAR):
            continue  # Descarta documento, desenho ou cena industrial.
        candidatos.append({'titulo':pagina['title'],'arquivo':info['thumburl'],'origem':info.get('descriptionurl',''),
                           'licenca':licenca,'autor':autor,'largura':info.get('width',0),'altura':info.get('height',0)})
    return candidatos

def escolhe(candidatos, obrigatorio):
    """Aceita apenas candidato com a palavra obrigatoria no titulo e prefere os melhores."""
    pertinentes = [c for c in candidatos if any(palavra in c['titulo'].lower() for palavra in obrigatorio)]
    if not pertinentes:
        return None  # Melhor sem foto do que com a foto errada.
    def nota(item):
        bonus = 1 if any(m in item['licenca'].upper() for m in ['CC0','PUBLIC DOMAIN','PD']) else 0
        formato = 1 if item['largura'] >= item['altura'] else 0
        grande = 1 if item['largura'] >= 1400 else 0
        return (bonus, formato, grande, item['largura'])
    return max(pertinentes, key=nota)

def baixa(item, destino):
    """Baixa, corrige a cor e grava a versao webp."""
    dados = urlopen(Request(item['arquivo'], headers=HEADERS), timeout=90).read()
    imagem = Image.open(io.BytesIO(dados)).convert('RGB')
    imagem.thumbnail((1500, 1500))
    imagem.save(destino, 'WEBP', quality=84, method=6)
    return imagem

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    registro = []
    alvos = PRODUTOS
    import sys
    if len(sys.argv) > 1:
        alvos = [p for p in PRODUTOS if p[0] in sys.argv[1:]]  # Refaz apenas os itens pedidos.
    for indice, (chave, nome, termos, obrigatorio, alternativos) in enumerate(alvos):
        candidatos = []
        for termo in termos + alternativos:
            candidatos += consulta(termo)
            if candidatos:
                break
        escolhido = escolhe(candidatos, obrigatorio)
        if escolhido is None:
            registro.append({'id':chave,'produto':nome,'erro':'nenhuma imagem pertinente encontrada'})
            print(chave, '-> SEM IMAGEM')
            continue
        try:
            imagem = baixa(escolhido, OUT/f'{chave}.webp')
            ImageOps.fit(imagem, (420, 320)).save(OUT/f'card-{chave}.webp', 'WEBP', quality=80, method=6)
        except Exception as erro:
            registro.append({'id':chave,'produto':nome,'erro':str(erro)})
            continue
        registro.append({'id':chave,'produto':nome,'arquivo':f'assets/img/{chave}.webp','titulo':escolhido['titulo'],
                         'origem':escolhido['origem'],'licenca':escolhido['licenca'],'autor':escolhido['autor'],
                         'uso':'Fotografia de produto do Wikimedia Commons, usada como referencia visual do item ficticio.'})
        print(chave, '->', escolhido['titulo'][:70].encode('ascii','replace').decode(), '|', escolhido['licenca'])
    manifesto = ROOT/'FONTES-FOTOS.json'  # Manifesto completo do acervo.
    if manifesto.exists():
        anteriores = json.loads(manifesto.read_text(encoding='utf-8'))
        combinacao = {r['id']: r for r in anteriores}
        combinacao.update({r['id']: r for r in registro})
        registro = list(combinacao.values())
    manifesto.write_text(json.dumps(registro, ensure_ascii=False, indent=2), encoding='utf-8')
    # Folha de conferencia visual, sempre com os 24 itens.
    todos = sorted((p[0] for p in PRODUTOS))
    folha = Image.new('RGB', (1200, 6 * 200), '#fbf7f0')
    desenho = ImageDraw.Draw(folha)
    for indice, chave in enumerate(todos):
        if not (OUT/f'{chave}.webp').exists():
            continue
        x, y = (indice % 4) * 300, (indice // 4) * 200
        folha.paste(ImageOps.fit(Image.open(OUT/f'{chave}.webp'), (294, 160)), (x, y))
        desenho.text((x + 8, y + 166), chave, fill='#124435')
    folha.save(ROOT/'tools'/'conferencia-fotos.jpg')
    print('Registros no manifesto:', len(registro))

if __name__ == '__main__':
    main()  # Preparacao de midia, executada uma vez por atualizacao de catalogo.
