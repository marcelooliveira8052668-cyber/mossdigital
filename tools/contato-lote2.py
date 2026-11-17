from pathlib import Path
from PIL import Image, ImageDraw

CLONE = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\demos")
SAIDA = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\tools\contatos")
SAIDA.mkdir(exist_ok=True)
DEMOS = ['topo-prime','pericia-prime','elevatech-prime','traduz-prime','biocontrol-prime','move-prime',
         'ecoanalytics-prime','solar-prime','chaveiro-express-prime','aquacare-prime','harmonia-tech-prime','safework-prime']
for demo in DEMOS:
    arquivos = sorted((CLONE / demo / 'img' / 'fotos').glob('*.webp'))
    tw, th, cols = 360, 240, 3
    rows = (len(arquivos) + cols - 1) // cols
    sheet = Image.new('RGB', (cols*tw, rows*(th+22)), 'white')
    d = ImageDraw.Draw(sheet)
    for i, arq in enumerate(arquivos):
        with Image.open(arq) as im:
            im = im.resize((tw, th), Image.LANCZOS)
            x, y = (i % cols)*tw, (i // cols)*(th+22)
            sheet.paste(im, (x, y))
            d.text((x+4, y+th+4), arq.stem, fill='black')
    saida = SAIDA / f'lote2-{demo}.jpg'
    sheet.save(saida, 'JPEG', quality=82)
    print(saida.name)
