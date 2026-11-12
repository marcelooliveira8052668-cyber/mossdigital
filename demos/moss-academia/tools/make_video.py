"""Cria um filme-conceito local com fotografias licenciadas, sem simular filmagem real."""
from pathlib import Path
import subprocess
from PIL import Image, ImageOps, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent  # Limita todas as saídas a esta demo.
OUT = ROOT / 'assets/video'  # Vídeo leve, carregado somente ao apertar play.
SCENES = [(1552242, 'MOVIMENTO.'), (260352, 'FORÇA.'), (261185, 'NOVO FLUXO.'), (1544774, 'SEU PRÓXIMO NÍVEL.')]

def main():
    OUT.mkdir(exist_ok=True)  # Diretório específico, sem alterar outras demos.
    font = ImageFont.truetype('C:/Windows/Fonts/impact.ttf', 82)  # Tipografia esportiva do Windows.
    small = ImageFont.truetype('C:/Windows/Fonts/arialbd.ttf', 16)  # Textos de identificação.
    cmd = ['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', '1280x720', '-r', '24', '-i', '-', '-an', '-c:v', 'libx264', '-preset', 'fast', '-crf', '27', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(OUT / 'filme-conceito.mp4')]
    process = subprocess.Popen(cmd, stdin=subprocess.PIPE)  # Codifica H.264 compatível com navegadores.
    for index, (pid, title) in enumerate(SCENES):
        source = Image.open(ROOT / f'assets/img/{pid}.webp').convert('RGB')  # Usa somente fotos conferidas.
        for frame in range(72):
            progress = frame / 72  # Três segundos por cena, sem áudio.
            zoom = 1 + .035 * progress  # Movimento editorial discreto, não uma filmagem de treino.
            photo = ImageOps.fit(source, (int(1280 * zoom), int(720 * zoom)))  # Ampliação lenta.
            photo = ImageOps.fit(photo, (1280, 720))  # Recorte final em 16:9.
            overlay = Image.new('RGBA', photo.size, (8, 9, 13, 75))  # Contraste para os textos.
            d = ImageDraw.Draw(overlay)  # Composição autoral sobre banco licenciado.
            d.rectangle((0, 480, 1280, 720), fill=(8, 9, 13, 205))  # Tarja de leitura.
            d.rectangle((50, 520, 56, 655), fill='#00cfff')  # Assinatura visual da marca.
            d.text((80, 520), title, font=font, fill='#00cfff')  # Chamada exclusiva da cena.
            d.text((82, 630), 'MOSS ACADEMIA / O SEU LIMITE NÃO EXISTE', font=small, fill='#f7f8fa')  # Logotipo textual.
            d.text((50, 35), f'FILME-CONCEITO / {index + 1:02d}', font=small, fill='#f7f8fa')  # Identificação transparente.
            d.text((50, 685), 'MONTAGEM DE FOTOGRAFIAS ILUSTRATIVAS • PROJETO FICTÍCIO • SEM ÁUDIO', font=small, fill='#b7bdc8')  # Não confunde com instalações reais.
            image = Image.alpha_composite(photo.convert('RGBA'), overlay).convert('RGB')  # Quadro final.
            if index == 0 and frame == 0:
                image.save(OUT / 'poster.webp', 'WEBP', quality=85)  # Pôster sem download do vídeo.
            process.stdin.write(image.tobytes())  # Envia um quadro sem arquivos intermediários.
    process.stdin.close()  # Sinaliza o final dos quadros.
    if process.wait() != 0:
        raise RuntimeError('Falha ao codificar o filme-conceito.')  # Não entrega saída silenciosamente inválida.
    print('Filme-conceito H.264 criado: 12 segundos, 720p, sem áudio.')  # Resumo verificável.

if __name__ == '__main__':
    main()  # Execução explícita, sem efeitos em importações.
