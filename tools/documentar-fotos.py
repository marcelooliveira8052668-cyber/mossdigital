"""Atualiza README, registro e relatório das 3 demos com as fotografias."""
from pathlib import Path

HOME = Path(r"C:\Users\Sylvia Camillo")
CLONE = HOME / "mossdigital-publicacao"

LEITURA = {
    "restaura-prime": "marcenaria, ferramentas e móveis antigos",
    "acesso-prime": "rampas, corrimãos, piso tátil, sanitário e sinalização",
    "inspect-prime": "fachadas, fissuras, umidade, plantas e vistorias",
}

for demo, tema in LEITURA.items():
    base = HOME / demo
    auxtxt = (
        "\n## Fotografias ilustrativas (6 por demo)\n\n"
        f"Foram adicionadas 6 fotografias reais de {tema}, obtidas via Openverse com "
        "licenças que permitem uso comercial (CC0, CC BY ou CC BY-SA). Cada imagem foi "
        "redimensionada para 1200×800 e convertida em WebP, com fonte, licença e autor "
        "registrados em `CREDITOS.md` e `img/fotos/fontes.json`.\n\n"
        "As fotos são **imagens de referência**: não representam a empresa fictícia, "
        "sua equipe, instalações ou trabalhos reais. Aviso visível na seção "
        "`Fotografias ilustrativas`.\n"
    )
    readme = base / "README.md"
    t = readme.read_text(encoding="utf-8").rstrip()
    if "Fotografias ilustrativas (6 por demo)" not in t:
        readme.write_text(t + "\n" + auxtxt, encoding="utf-8")

    registro = base / "REGISTRO-ALTERACOES.md"
    t = registro.read_text(encoding="utf-8").rstrip()
    if "6 fotografias licenciadas" not in t:
        t += (
            "\n\n## 17/11/2026 — Complemento: fotografias licenciadas\n"
            "- Adicionadas **6 fotografias reais** (WebP 1200×800) em `img/fotos/`.\n"
            "- Fontes via Openverse, licenças CC0/CC BY/CC BY-SA registradas em `CREDITOS.md`.\n"
            "- Galeria `Fotografias ilustrativas` inserida antes do rodapé, com aviso de que "
            "não representam a empresa fictícia.\n"
            "- Testes reforçados: carregamento real das 6 imagens verificado por CDP.\n"
        )
        registro.write_text(t + "\n", encoding="utf-8")

    relatorio = base / "RELATORIO-TESTES.md"
    t = relatorio.read_text(encoding="utf-8").rstrip()
    if "Fotografias licenciadas" not in t:
        t += (
            "\n\n## Fotografias (complemento)\n"
            "| Verificação | Resultado |\n|---|---|\n"
            "| 6 fotos presentes, com `alt` e caminho local | ✅ |\n"
            "| Carregamento real (`naturalWidth > 0`) após rolagem | ✅ 6/6 |\n"
            "| Conferência visual por contato (18 fotos) | ✅ |\n"
        )
        relatorio.write_text(t + "\n", encoding="utf-8")

    # Sincroniza para o clone (que será publicado)
    import shutil
    for nome in ["README.md", "REGISTRO-ALTERACOES.md", "RELATORIO-TESTES.md", "CREDITOS.md", "index.html"]:
        origem = base / nome
        if origem.exists():
            shutil.copy2(origem, CLONE / "demos" / demo / nome)
    # Fotos e testes também
    shutil.copytree(base / "img" / "fotos", CLONE / "demos" / demo / "img" / "fotos", dirs_exist_ok=True)
    shutil.copytree(base / "tests", CLONE / "demos" / demo / "tests", dirs_exist_ok=True)
    print("documentado e sincronizado:", demo)
