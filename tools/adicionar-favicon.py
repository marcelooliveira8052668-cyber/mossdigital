"""Adiciona <link rel="icon"> às páginas principais (worktree + _repo-site).

Uso: python tools/adicionar-favicon.py [--dry]
"""
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

WORKTREE = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada')
REPO = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\_repo-site')
DRY = '--dry' in sys.argv

# página -> prefixo do caminho do ícone (absoluto só no 404)
PAGINAS = {
    'index.html': 'assets/',
    'modelos.html': 'assets/',
    'sistemas.html': 'assets/',
    'estrutura.html': 'assets/',
    'privacidade.html': 'assets/',
    '404.html': '/assets/',
}

falhas = 0
for raiz, rotulo in [(WORKTREE, 'worktree'), (REPO, '_repo-site')]:
    print(f'=== {rotulo} ===')
    for nome, prefixo in PAGINAS.items():
        caminho = raiz / nome
        if not caminho.exists():
            print(f'  {nome}: AUSENTE')
            falhas += 1
            continue
        t = caminho.read_text(encoding='utf-8')
        if 'rel="icon"' in t:
            print(f'  {nome}: já tem ícone (ok)')
            continue
        icone = f'<link rel="icon" href="{prefixo}img/favicon.svg" type="image/svg+xml">\n    '
        i = t.find('<link rel="stylesheet"')
        if i == -1:
            print(f'  {nome}: ERRO — nenhum stylesheet para ancorar')
            falhas += 1
            continue
        novo = t[:i] + icone + t[i:]
        print(f'  {nome}: ícone inserido')
        if not DRY:
            caminho.write_text(novo, encoding='utf-8')

print('\nDRY-RUN' if DRY else '\ngravado' if not falhas else f'\n{falhas} FALHAS')
sys.exit(1 if falhas else 0)
