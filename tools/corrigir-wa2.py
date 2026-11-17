import re
from pathlib import Path
from urllib.parse import quote

INDEX = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\index.html")
texto = INDEX.read_text(encoding="utf-8")

padrao = re.compile(r'https://wa\.me/5511942038103\?text=Ol%C3%A1!%20Gostaria%20de%20um%20site%20como%20a%20demo%20[^\"]+')

def substituir(m):
    trecho = m.group(0)
    for nome in ["ACESSO PRIME", "INSPECT PRIME", "RESTAURA PRIME"]:
        if nome in trecho:
            return "https://wa.me/5511942038103?text=" + quote(f"Olá! Gostaria de um site como a demo {nome}.")
    return trecho

novo, n = padrao.subn(substituir, texto)
INDEX.write_text(novo, encoding="utf-8")
print("links corrigidos:", n)
