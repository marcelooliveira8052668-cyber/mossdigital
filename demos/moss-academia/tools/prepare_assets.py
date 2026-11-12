"""Baixa fotografias ilustrativas e gera uma folha de conferência local."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
from urllib.request import urlopen, Request
from PIL import Image, ImageOps, ImageDraw
import io
import json

ROOT = Path(__file__).resolve().parent.parent  # Pasta exclusiva desta demonstração.
OUT = ROOT / 'assets' / 'img'  # Fotografias otimizadas e servidas localmente.
PHOTOS = [1552242, 1552249, 1552252, 1954524, 4162487, 4162451, 949129, 841130, 841131, 841135, 4162449, 4164512, 4164761, 2261477, 260352, 261185, 863988, 1544774, 4761792, 4753996, 4162491, 1552106, 2294361, 3836861]

def download(pid):
    """Conserva fonte e licença, sem representar o banco de fotos como uma academia real."""
    url = f'https://images.pexels.com/photos/{pid}/pexels-photo-{pid}.jpeg?auto=compress&cs=tinysrgb&w=1500'
    try:
        data = urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=45).read()
        image = Image.open(io.BytesIO(data)).convert('RGB')
        image.thumbnail((1500, 1500))
        image.save(OUT / f'{pid}.webp', 'WEBP', quality=80, method=6)
        thumb = ImageOps.fit(image, (500, 400))  # Recorte econômico da galeria.
        thumb.save(OUT / f'thumb-{pid}.webp', 'WEBP', quality=75, method=6)
        return {'id': pid, 'file': f'assets/img/{pid}.webp', 'source': f'https://www.pexels.com/photo/{pid}/', 'download': url, 'license': 'https://www.pexels.com/license/', 'usage': 'Fotografia ilustrativa de banco; não representa instalações reais da MOSS Academia.'}
    except Exception as error:
        return {'id': pid, 'error': str(error)}

if __name__ == '__main__':
    OUT.mkdir(parents=True, exist_ok=True)
    records = list(ThreadPoolExecutor(max_workers=6).map(download, PHOTOS))
    (ROOT / 'FONTES-FOTOS.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')
    sheet = Image.new('RGB', (1200, 6 * 185), '#171a22')
    draw = ImageDraw.Draw(sheet)
    for i, record in enumerate(records):
        x, y = (i % 4) * 300, (i // 4) * 185
        if 'error' not in record:
            photo = Image.open(ROOT / record['file'])
            sheet.paste(ImageOps.fit(photo, (294, 155)), (x, y))
        draw.text((x + 8, y + 160), str(record['id']), fill='white')
    sheet.save(ROOT / 'tools' / 'conferencia-fotos.jpg')
    print(json.dumps(records, ensure_ascii=False))
