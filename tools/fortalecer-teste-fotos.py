"""Troca o teste de atributos por teste de carregamento real das fotos."""
from pathlib import Path

HOME = Path(r"C:\Users\Sylvia Camillo")
NOVO = """
// Fotografias licenciadas (6 por demo) — carregamento real
await av(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await av(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({
 ok:i.complete&&i.naturalWidth>0, alt:i.alt.length>5, local:i.getAttribute('src').startsWith('img/fotos/')})));
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(x=>x.ok&&x.alt&&x.local),JSON.stringify(fo.map(x=>x.ok)));

"""

antigo_inicio = "// Fotografias licenciadas (6 por demo)\n"
for demo in ["restaura-prime", "acesso-prime", "inspect-prime"]:
    arquivo = HOME / demo / "tests" / "cdp-smoke.js"
    texto = arquivo.read_text(encoding="utf-8")
    i = texto.find(antigo_inicio)
    if i == -1:
        raise SystemExit("bloco antigo não encontrado: " + str(arquivo))
    j = texto.find("console.log('\\n===== RELATÓRIO DE TESTES", i)
    if j == -1:
        raise SystemExit("fim do bloco não encontrado")
    texto = texto[:i] + NOVO + texto[j:]
    arquivo.write_text(texto, encoding="utf-8")
    print("teste fortalecido:", arquivo)
