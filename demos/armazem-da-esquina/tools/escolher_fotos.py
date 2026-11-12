"""Escolhe a foto final de cada produto a partir dos candidatos conferidos."""
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.parse import urlencode
from PIL import Image, ImageOps, ImageDraw
import json
import io
import re
import time

ROOT = Path(__file__).resolve().parent.parent  # Pasta da demo.
SAIDA = ROOT / 'tools' / 'candidatos'  # Candidatos ja baixados.
IMG = ROOT / 'assets' / 'img'  # Fotos finais.
API = 'https://commons.wikimedia.org/w/api.php'  # Catalogo publico.
HEADERS = {'User-Agent': 'MossDigitalDemo/1.0 (contato@mossdigital.com.br)'}  # Identificacao exigida.

# Indice do candidato escolhido na folha de conferencia, com o nome do produto.
ESCOLHAS = {
  'pao-frances': 3, 'croissant': 0, 'bolo-chocolate': 7, 'bisnaguinha': 5, 'banana-prata': 1,
  'tomate-italiano': 4, 'maca-gala': 5, 'alface-crespa': 7, 'batata-inglesa': 2, 'arroz-agulha': 0,
  'feijao-carioca': 4, 'macarrao-parafuso': 4, 'azeite-oliva': 3, 'acucar-cristal': 5, 'cafe-torrado': 5,
  'oleo-soja': 7, 'farinha-mandioca': 5, 'leite-integral': 3, 'iogurte-natural': 4, 'agua-mineral': 6,
  'suco-uva': 3, 'detergente': 3,
}

# Categorias alternativas para os dois itens que ficaram sem candidato.
ALTERNATIVAS = {
  'laranja-largo': (['Category:Oranges'], ['tree', 'blossom', 'leaf', 'juice', 'juicer', 'cake', 'advertisement', 'orchard']),
  'ovos-caixa': (['Category:Egg cartons', 'Category:Eggs'], ['festival', 'easter', 'painting', 'illustration', 'bird', 'embroidery', 'omelette', 'fried', 'boiled', 'scrambled', 'coop', 'nest', 'decorative', 'wooden', 'garden', 'hen']),
}

def arquivos(categoria, limite=80):
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
        lista.append({'titulo':pagina['title'],'arquivo':info['thumburl'],'origem':info.get('descriptionurl',''),
                      'licenca':re.sub('<[^>]+>','',meta.get('LicenseShortName',{}).get('value','')).strip(),
                      'autor':re.sub('<[^>]+>','',meta.get('Artist',{}).get('value','')).strip() or 'Wikimedia Commons',
                      'largura':info.get('width',0),'altura':info.get('height',0)})
    return lista

def buscar_faltantes():
    """Baixa candidatos para os produtos que ficaram sem escolha."""
    for chave, (categorias, negados) in ALTERNATIVAS.items():
        pasta = SAIDA/chave; pasta.mkdir(parents=True, exist_ok=True)
        indice = 0
        for categoria in categorias:
            for item in arquivos(categoria):
                titulo = item['titulo'].lower()
                if any(n in titulo for n in negados) or item['largura'] < 800:
                    continue
                try:
                    dados = urlopen(Request(item['arquivo'], headers=HEADERS), timeout=60).read()
                    imagem = Image.open(io.BytesIO(dados)).convert('RGB')
                    if imagem.width < 700:
                        continue
                    imagem.thumbnail((520, 520))
                    imagem.save(pasta/f'{indice:02d}.jpg', quality=85)
                    (pasta/f'{indice:02d}.json').write_text(json.dumps(item, ensure_ascii=False, indent=2), encoding='utf-8')
                    indice += 1
                    if indice >= 8:
                        break
                except Exception:
                    continue
            if indice >= 8:
                break
            time.sleep(2)  # Respeita o limite de requisicoes da API.
        print(chave, indice, 'candidatos alternativos')

def principal():
    IMG.mkdir(parents=True, exist_ok=True)
    buscar_faltantes()
    # Folha com os candidatos das duas categorias alternativas, para conferencia.
    extras = [chave for chave in ALTERNATIVAS]
    if extras:
        folha = Image.new('RGB', (1200, len(extras)*150), '#fbf7f0')
        desenho = ImageDraw.Draw(folha)
        for linha, chave in enumerate(extras):
            y = linha*150
            desenho.text((6, y+4), chave, fill='#124435')
            x = 150
            for arquivo in sorted((SAIDA/chave).glob('*.jpg'))[:8]:
                folha.paste(ImageOps.fit(Image.open(arquivo), (128, 128)), (x, y+4)); x += 130
        folha.save(ROOT/'tools'/'candidatos-extras.jpg')
        print('Folha de candidatos extras gravada.')

if __name__ == '__main__':
    principal()
