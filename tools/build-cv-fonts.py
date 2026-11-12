"""Empacota fontes OFL locais para o finalizador também funcionar em file://."""
from pathlib import Path
import base64
import json
root = Path(__file__).resolve().parent.parent / 'curriculo/vendor'
fonts = {name: base64.b64encode((root / file).read_bytes()).decode('ascii') for name, file in [('regular', 'NotoSans-Regular.ttf'), ('bold', 'NotoSans-Bold.ttf')]}
(root / 'notosans.js').write_text('/* Noto Sans — SIL OFL 1.1; licença em OFL.txt. */\nwindow.MOSS_CV_FONTS = Object.freeze(' + json.dumps(fonts) + ');\n', encoding='utf-8')
print('Fontes locais preparadas; sem envio de dados.')
