"""Adiciona verificação das 6 fotografias aos testes das 3 demos."""
from pathlib import Path

HOME = Path(r"C:\Users\Sylvia Camillo")
CHECK = """
// Fotografias licenciadas (6 por demo)
const fotos=await av(`JSON.stringify({n:document.querySelectorAll('#fotografias img').length,
 comAlt:Array.from(document.querySelectorAll('#fotografias img')).filter(i=>i.alt&&i.alt.length>5).length,
 locais:Array.from(document.querySelectorAll('#fotografias img')).filter(i=>i.getAttribute('src').startsWith('img/fotos/')).length})`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas presentes',fo.n===6&&fo.comAlt===6&&fo.locais===6,JSON.stringify(fo));

"""

for demo in ["restaura-prime", "acesso-prime", "inspect-prime"]:
    arquivo = HOME / demo / "tests" / "cdp-smoke.js"
    texto = arquivo.read_text(encoding="utf-8")
    if "6 fotografias licenciadas presentes" not in texto:
        marker = "console.log('\\n===== RELATÓRIO DE TESTES"
        if marker not in texto:
            raise SystemExit("marker não encontrado: " + str(arquivo))
        texto = texto.replace(marker, CHECK + marker, 1)
        arquivo.write_text(texto, encoding="utf-8")
        print("teste de fotos adicionado:", arquivo)
