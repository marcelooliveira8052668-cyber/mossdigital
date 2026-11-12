"""Baixa só fotos explicitamente selecionadas; não usa geração por IA."""
from pathlib import Path
import json
import io
from urllib.request import urlopen, Request
from urllib.error import HTTPError
from html import unescape, escape
import re
from concurrent.futures import ThreadPoolExecutor
import shutil
from PIL import Image, ImageOps, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
config = json.loads((ROOT / 'tools/fotos-revisadas.json').read_text(encoding='utf-8'))
output = ROOT / 'assets/img/fotos-revisadas'
output.mkdir(parents=True, exist_ok=True)
previous = json.loads((output / 'fontes.json').read_text(encoding='utf-8')) if (output / 'fontes.json').exists() else {'photos': []}
known_targets = {target: ROOT / photo['file'] for photo in previous['photos'] for target in photo['targets']}

def download(photo):
    id_ = photo['id']
    url = photo.get('source') or f'https://images.pexels.com/photos/{id_}/pexels-photo-{id_}.jpeg?auto=compress&cs=tinysrgb&w=1200'
    file = output / (photo['key'] + '-' + str(id_) + '.webp')
    if not file.exists():
        try:
            with urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=45) as response:
                content = response.read()
        except HTTPError as error:
            if error.code != 404:
                raise
            # Fotos antigas podem ter nome descritivo, não pexels-photo-ID.jpeg.
            with urlopen(Request(f'https://www.pexels.com/photo/{id_}/', headers={'User-Agent': 'Mozilla/5.0'}), timeout=45) as response:
                page = response.read().decode('utf-8')
            match = re.search(r'<meta[^>]*property="og:image"[^>]*content="([^"]+)"', page)
            if not match:
                raise RuntimeError('URL original não localizada: ' + str(id_))
            url = unescape(match.group(1)).split('?')[0] + '?auto=compress&cs=tinysrgb&w=1200'
            with urlopen(Request(url, headers={'User-Agent': 'Mozilla/5.0'}), timeout=45) as response:
                content = response.read()
        image = Image.open(io.BytesIO(content)).convert('RGB')
        image.thumbnail((1200, 1200))
        image.save(file, 'WEBP', quality=84)
    print('Foto:', photo['key'], id_, flush=True)
    # Fotos são copiadas para os caminhos previstos pelo projeto original.
    # Não substitui SVGs nem fotografias já existentes.
    for target in photo['targets']:
        folder, filename = target.split('/', 1)
        dest = ROOT / 'demos' / folder / 'assets/img' / filename
        dest.parent.mkdir(parents=True, exist_ok=True)
        if dest.exists() and dest.read_bytes() != file.read_bytes():
            known = known_targets.get(target)
            placeholder = dest.stat().st_size < 1000 and dest.read_bytes().lstrip().startswith(b'<!-- Placeholder:')
            if not placeholder and (not known or not known.exists() or dest.read_bytes() != known.read_bytes()):
                raise RuntimeError('Não sobrescrever foto desconhecida: ' + str(dest))
        shutil.copyfile(file, dest)
    return {**photo, 'page': f'https://www.pexels.com/photo/{id_}/', 'download': url, 'file': 'assets/img/fotos-revisadas/' + file.name}

if __name__ == '__main__':
    with ThreadPoolExecutor(max_workers=4) as pool:
        photos = list(pool.map(download, config['photos']))
    manifest = {**config, 'photos': photos}
    (output / 'fontes.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    rows = ''.join('<article><img loading="lazy" src="' + escape(Path(p['file']).name) + '" alt="' + escape(p['alt']) + '"><h2>' + escape(p['alt']) + '</h2><a href="' + p['page'] + '" target="_blank" rel="noopener noreferrer">Foto original no Pexels</a></article>' for p in photos)
    html = '<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Fontes das fotografias revisadas — MOSS Digital</title><style>body{font:16px/1.6 system-ui;margin:0;background:#f4f7fa;color:#152536}main{max-width:1150px;margin:auto;padding:30px 20px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:22px}article{background:white;padding:16px;border-radius:12px}img{width:100%;height:180px;object-fit:cover}h2{font-size:1rem}a{color:#075985}</style></head><body><main><a href="../../../modelos.html">Voltar ao catálogo</a><h1>Fotografias reais e suas fontes</h1><p>' + escape(config['notice']) + '</p><p>Não há vínculo, endosso ou comprovação de estoque pelas pessoas e marcas retratadas. Uso conforme a <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer">licença Pexels</a>. Cada imagem foi selecionada pelo assunto e conferida visualmente.</p><div class="grid">' + rows + '</div></main></body></html>'
    (output / 'fontes.html').write_text(html, encoding='utf-8')
    # Folhas de contato apenas para revisão local, não são capas de demos novas.
    for start in range(0, len(photos), 20):
        group = photos[start:start+20]
        sheet = Image.new('RGB', (1000, 5 * 165), 'white')
        draw = ImageDraw.Draw(sheet)
        for i, photo in enumerate(group):
            image = Image.open(ROOT / photo['file'])
            thumb = ImageOps.fit(image, (240, 130))
            x, y = (i % 4) * 250, (i // 4) * 165
            sheet.paste(thumb, (x, y))
            draw.text((x+3, y+134), photo['key'] + ' / ' + str(photo['id']), fill='black')
        sheet.save(ROOT / '.moss-local' / f'fotos-revisao-{start//20+1}.jpg')
    print(f'{len(photos)} fotos reais; {sum(len(p["targets"]) for p in photos)} posições compatíveis. Fontes e licença registradas.')
