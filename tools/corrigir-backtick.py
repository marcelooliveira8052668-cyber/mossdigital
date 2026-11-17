from pathlib import Path

h = Path(r"C:\Users\Sylvia Camillo")
antigo = "startsWith('img/fotos/')})));"
novo = "startsWith('img/fotos/')})))" + chr(96) + ");"
for d in ["restaura-prime", "acesso-prime", "inspect-prime"]:
    p = h / d / "tests" / "cdp-smoke.js"
    t = p.read_text(encoding="utf-8")
    if antigo in t:
        t = t.replace(antigo, novo)
        p.write_text(t, encoding="utf-8")
        print("corrigido", d)
    else:
        print("ja corrigido ou padrao ausente", d)
