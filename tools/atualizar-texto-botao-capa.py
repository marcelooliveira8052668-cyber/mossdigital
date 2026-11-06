"""Troca o rodape-texto das capas compartilhadas por um botao CTA.

Padrao antigo: <div><strong>mossdigital.com.br</strong><small>Conheca...</small></div>
Padrao novo:  <div><strong>Crie seu site gratis &#8599;</strong><small>mossdigital.com.br</small></div>

Uso: python tools/atualizar-texto-botao-capa.py [--dry]
"""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

WORKTREE = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada')
REPO = Path(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\_repo-site')
DRY = '--dry' in sys.argv

FONTES = [
    'divulgacao/instagram/casamento/Capa Instagram.html',
    'divulgacao/instagram/contabilidade/Capa Instagram.html',
    'divulgacao/instagram/estrutura/Capa Instagram.html',
    'divulgacao/instagram/floricultura/Capa Instagram - Flora e Afeto.html',
    'divulgacao/instagram/otica/Capa Instagram.html',
    'divulgacao/instagram/fotos-reais/Capa Instagram.html',
]

PADRAO = re.compile(
    r'<div><strong>mossdigital\.com\.br</strong><small>[^<]*</small></div>')
NOVO = ('<div><strong>Crie seu site grátis ↗</strong>'
        '<small>mossdigital.com.br</small></div>')

falhas = 0
for raiz, rotulo in [(WORKTREE, 'worktree'), (REPO, '_repo-site')]:
    print(f'=== {rotulo} ===')
    for rel in FONTES:
        caminho = raiz / rel
        if not caminho.exists():
            print(f'  AUSENTE: {rel}')
            falhas += 1
            continue
        t = caminho.read_text(encoding='utf-8')
        if NOVO in t:
            print(f'  já atualizado: {Path(rel).name}')
            continue
        novo, n = PADRAO.subn(NOVO, t)
        if n != 1:
            print(f'  ERRO ({n} ocorrências): {rel}')
            falhas += 1
            continue
        print(f'  atualizado: {Path(rel).name}')
        if not DRY:
            caminho.write_text(novo, encoding='utf-8')

print('\nDRY-RUN' if DRY else '\ngravado' if not falhas else f'\n{falhas} FALHAS')
sys.exit(1 if falhas else 0)
