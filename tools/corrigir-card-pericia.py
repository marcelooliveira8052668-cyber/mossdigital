from pathlib import Path

INDEX = Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao\index.html")
texto = INDEX.read_text(encoding="utf-8")
# Substitui apenas no card da PERÍCIA JUDICIAL PRIME (o card antigo deve continuar apontando para pericia-prime)
inicio = texto.find("PERÍCIA JUDICIAL PRIME")
if inicio == -1:
    raise SystemExit("card nao encontrado")
fim = texto.find("</article>", inicio)
bloco = texto[inicio:fim]
novo_bloco = bloco.replace("/demos/pericia-prime/", "/demos/pericia-judicial-prime/")
texto = texto[:inicio] + novo_bloco + texto[fim:]
INDEX.write_text(texto, encoding="utf-8")
print("card corrigido:", novo_bloco.count("/demos/pericia-judicial-prime/"), "ocorrencias")
