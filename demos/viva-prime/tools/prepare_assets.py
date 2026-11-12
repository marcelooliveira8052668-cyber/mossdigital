"""Curadoria de referências arquitetônicas: nunca identifica fotos de banco como anúncios reais."""
from pathlib import Path
from urllib.request import Request, urlopen
from concurrent.futures import ThreadPoolExecutor
from PIL import Image, ImageOps, ImageDraw
import json
import io

ROOT = Path(__file__).resolve().parent.parent  # Todas as saídas pertencem exclusivamente à VIVA Prime.
OUT = ROOT / 'assets/img'  # Imagens locais, sem requisições externas durante a visita ao site.
IDS = [106399,1396122,323780,186077,280222,1643383,1571460,271624,2635038,2724749,2102587,280229,2379004,3777943,1239291,1833306,258154,439391,1454806,271795,1571453,1648776,2104151,2480608,2079249,2581922,209296,261102,1029599]

def download(pid):
    url = f'https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=1700'  # Fonte licenciada.
    try:
        existing=OUT/f'{pid}.webp'  # Não baixa de novo o acervo já conferido.
        content = None if existing.exists() else urlopen(Request(url,headers={'User-Agent':'Mozilla/5.0'}),timeout=45).read()  # Download apenas das novas referências.
        image = Image.open(existing if existing.exists() else io.BytesIO(content)).convert('RGB')  # Uniformiza imagens novas e existentes.
        image.thumbnail((1700,1700))  # Tamanho adequado a telas grandes sem peso excessivo.
        image.save(OUT/f'{pid}.webp','WEBP',quality=82,method=6)  # Foto editorial otimizada.
        ImageOps.fit(image,(720,540)).save(OUT/f'card-{pid}.webp','WEBP',quality=78,method=6)  # Miniatura de card.
        return {'id':pid,'arquivo':f'assets/img/{pid}.webp','origem':f'https://www.pexels.com/photo/{pid}/','download':url,'licenca':'https://www.pexels.com/license/','uso':'Referência visual ilustrativa de banco. Não representa o imóvel anunciado ou uma pessoa da equipe real.'}  # Rastreabilidade editorial.
    except Exception as error:
        return {'id':pid,'erro':str(error)}  # Falha explícita para revisão, nunca substituição enganosa.

if __name__ == '__main__':
    OUT.mkdir(parents=True,exist_ok=True)  # Pasta específica sem alterar outras demonstrações.
    records = list(ThreadPoolExecutor(max_workers=5).map(download,IDS))  # Downloads independentes em paralelo.
    (ROOT/'FONTES-FOTOS.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')  # Registro completo de origem.
    sheet = Image.new('RGB',(1200,((len(records)+3)//4)*215),'#f5f0e8')  # Folha de conferência, quatro fotos por linha.
    draw = ImageDraw.Draw(sheet)  # Legendas da curadoria.
    for index,record in enumerate(records):
        x,y = index%4*300,index//4*215  # Coordenadas de cada miniatura.
        if 'erro' not in record:
            sheet.paste(ImageOps.fit(Image.open(ROOT/record['arquivo']),(294,180)),(x,y))  # Imagem inteira conferida em contato.
        draw.text((x+8,y+187),str(record['id']),fill='#123c36')  # ID coincide com a fonte registrada.
    sheet.save(ROOT/'tools/conferencia-fotos.jpg')  # Evidência de conferência, não uma galeria comercial.
    print(json.dumps(records,ensure_ascii=False))  # Resultado visível da preparação.
