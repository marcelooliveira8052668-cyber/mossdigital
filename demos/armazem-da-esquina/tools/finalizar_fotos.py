"""Aplica as fotos escolhidas na folha de conferencia e grava os creditos."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw
import json
import io

ROOT = Path(__file__).resolve().parent.parent  # Pasta da demo.
CANDIDATOS = ROOT / 'tools' / 'candidatos'  # Candidatos ja baixados.
IMG = ROOT / 'assets' / 'img'  # Fotos finais do catalogo.

# Indice escolhido na folha de conferencia visual, por produto.
ESCOLHAS = {
  'pao-frances': 2, 'croissant': 0, 'bolo-chocolate': 7, 'bisnaguinha': 5, 'banana-prata': 1,
  'tomate-italiano': 4, 'maca-gala': 2, 'alface-crespa': 7, 'batata-inglesa': 2, 'laranja-largo': 0,
  'arroz-agulha': 0, 'feijao-carioca': 4, 'macarrao-parafuso': 0, 'azeite-oliva': 3, 'acucar-cristal': 5,
  'cafe-torrado': 5, 'oleo-soja': 0, 'farinha-mandioca': 5, 'leite-integral': 7, 'ovos-caixa': 0,
  'iogurte-natural': 0, 'agua-mineral': 2, 'suco-uva': 0, 'detergente': 0,
}

def principal():
    from urllib.request import Request, urlopen
    IMG.mkdir(parents=True, exist_ok=True)
    registro = []
    for chave, indice in ESCOLHAS.items():
        pasta = CANDIDATOS/chave
        arquivo = pasta/f'{indice:02d}.jpg'
        if not arquivo.exists():
            print('FALTA', chave, indice)
            continue
        dados = json.loads((pasta/f'{indice:02d}.json').read_text(encoding='utf-8'))
        # Prefere a versao em alta resolucao; se a rede falhar, usa a miniatura local.
        imagem = None
        if dados.get('arquivo'):
            try:
                bruto = urlopen(Request(dados['arquivo'], headers={'User-Agent':'MossDigitalDemo/1.0 (contato@mossdigital.com.br)'}), timeout=90).read()
                imagem = Image.open(io.BytesIO(bruto)).convert('RGB')
            except Exception as erro:
                print('  rede falhou em', chave, '->', erro)
        if imagem is None:
            imagem = Image.open(arquivo).convert('RGB')
        final = imagem.copy()
        final.thumbnail((1500, 1500))
        final.save(IMG/f'{chave}.webp', 'WEBP', quality=84, method=6)
        ImageOps.fit(imagem, (420, 320)).save(IMG/f'card-{chave}.webp', 'WEBP', quality=80, method=6)
        registro.append({'id':chave,'arquivo':f'assets/img/{chave}.webp','capa':f'assets/img/card-{chave}.webp',
                         'titulo':dados['titulo'],'origem':dados['origem'],'licenca':dados['licenca'],'autor':dados['autor'],
                         'uso':'Fotografia do Wikimedia Commons usada como referencia visual do item ficticio do catalogo.'})
    (ROOT/'FONTES-FOTOS.json').write_text(json.dumps(registro, ensure_ascii=False, indent=2), encoding='utf-8')
    # Folha final, com tamanho maior, para conferir o resultado definitivo.
    folha = Image.new('RGB', (1200, 6 * 240), '#fbf7f0')
    desenho = ImageDraw.Draw(folha)
    for indice, chave in enumerate(ESCOLHAS):
        alvo = IMG/f'{chave}.webp'
        if not alvo.exists():
            continue
        x, y = (indice % 4) * 300, (indice // 4) * 240
        folha.paste(ImageOps.fit(Image.open(alvo), (294, 205)), (x, y))
        desenho.text((x + 8, y + 210), chave, fill='#124435')
    folha.save(ROOT/'tools'/'conferencia-fotos.jpg')
    print('Fotos finais:', len(registro), '| manifesto gravado.')

if __name__ == '__main__':
    principal()
