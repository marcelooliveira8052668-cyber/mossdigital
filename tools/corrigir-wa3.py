import re
from pathlib import Path
from urllib.parse import quote

INDEX = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\index.html")
nomes = {
    "acesso-prime": "ACESSO PRIME",
    "inspect-prime": "INSPECT PRIME",
    "restaura-prime": "RESTAURA PRIME",
}
linhas = INDEX.read_text(encoding="utf-8").splitlines(keepends=True)
padrao_url = re.compile(r'https://wa\.me/5511942038103\?text=[^"]+')
saida = []
contador = 0
for linha in linhas:
    for demo, nome in nomes.items():
        if f'/demos/{demo}/index.html' in linha:
            novo_link = "https://wa.me/5511942038103?text=" + quote(f"Olá! Gostaria de um site como a demo {nome}.")
            linha = padrao_url.sub(novo_link, linha)
            contador += 1
            break
    saida.append(linha)
INDEX.write_text("".join(saida), encoding="utf-8")
print("links reescritos:", contador)
