"""Baixa as fotos explicitamente selecionadas no manifesto e otimiza para WebP.

Não edita HTML, não publica e não apaga arquivos existentes.
Requer ffmpeg e acesso ao CDN de imagens Pexels.
"""
import json
from pathlib import Path
import subprocess
from urllib.request import Request, urlopen

ROOT = Path(__file__).resolve().parent.parent
FOLDER = ROOT / 'assets/img/demo-photos'

def main():
    manifest = json.loads((FOLDER / 'manifest.json').read_text(encoding='utf-8'))
    for photo in manifest['photos']:
        target = FOLDER / (photo['name'] + '.webp')
        if target.exists():
            subprocess.run(['ffprobe','-v','error',str(target)],check=True)
            print('PRESERVADA: ' + target.name,flush=True)
            continue
        url = f"https://images.pexels.com/photos/{photo['id']}/pexels-photo-{photo['id']}.jpeg?auto=compress&cs=tinysrgb&w=1400"
        request = Request(url,headers={'User-Agent':'Mozilla/5.0'})
        with urlopen(request,timeout=45) as response:
            if not response.headers.get('Content-Type','').startswith('image/'):
                raise RuntimeError('Resposta não é uma imagem: ' + url)
            image = response.read()
        # A saída só é criada depois de a conversão em memória terminar com sucesso.
        converted = subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-i','pipe:0','-frames:v','1','-c:v','libwebp','-quality','82','-f','webp','pipe:1'],input=image,stdout=subprocess.PIPE,check=True).stdout
        if len(converted)<1000:
            raise RuntimeError('Imagem inválida: ' + url)
        with target.open('xb') as file:
            file.write(converted)
        print(f"FOTO: {target.name} ({len(converted)} bytes)",flush=True)
    # Miniaturas independentes evitam carregar fotos grandes nos cartões do catálogo.
    cards = FOLDER / 'cards'
    cards.mkdir(exist_ok=True)
    for photo in manifest['photos']:
        destination = cards / (photo['name'] + '.webp')
        if destination.exists():
            subprocess.run(['ffprobe','-v','error',str(destination)],check=True)
            continue
        subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-n','-i',str(FOLDER / (photo['name'] + '.webp')),'-vf','scale=800:500:force_original_aspect_ratio=increase,crop=800:500','-frames:v','1','-c:v','libwebp','-quality','80',str(destination)],check=True)
    print('Miniaturas 800 x 500 preparadas.',flush=True)

if __name__=='__main__':
    main()
