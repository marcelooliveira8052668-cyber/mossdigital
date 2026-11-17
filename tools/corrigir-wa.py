from pathlib import Path
from urllib.parse import quote

INDEX = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\index.html")
nomes = {
    "acesso-prime": "ACESSO PRIME",
    "inspect-prime": "INSPECT PRIME",
    "restaura-prime": "RESTAURA PRIME",
}
texto = INDEX.read_text(encoding="utf-8")
for demo, nome in nomes.items():
    antigo_inicio = "https://wa.me/5511942038103?text=Ol%C3%A1!%20Gostaria%20de%20um%20site%20como%20a%20demo%20" + nome
    i = texto.find(antigo_inicio)
    if i == -1:
        print("nao encontrado:", demo)
        continue
    j = texto.find('"', i)
    novo = "https://wa.me/5511942038103?text=" + quote(f"Olá! Gostaria de um site como a demo {nome}.")
    texto = texto[:i] + novo + texto[j:]
    print("corrigido:", demo)
INDEX.write_text(texto, encoding="utf-8")
