"""Garante o botão "Criar o meu site grátis" em todos os cards de modelos.html.

Para cada card estático, lê o link da demonstração (.demo), deriva o id usado
por /criar/?demo=<id> e acrescenta o botão dentro de .actions. O id precisa
existir em criar/assets/mapa-demos.js — se qualquer card falhar, nada é
gravado (a tabela completa é impressa para diagnóstico).

Também atualiza o texto do botão criado pelo JS ("Criar com este modelo" →
"Criar o meu site grátis").

Uso: python tools/adicionar-btn-criar.py [--dry]
"""
import re
import sys
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

REPO = Path(__file__).resolve().parent.parent
EXTERNO = REPO.parents[1] / '_repo-site' / 'modelos.html'
ARTEFATOS = [REPO / 'modelos.html', EXTERNO]
TEXTO_NOVO = 'Criar o meu site grátis'
TEXTO_ANTIGO = 'Criar com este modelo'


def ids_do_mapa():
    mapa = (REPO / 'criar' / 'assets' / 'mapa-demos.js').read_text(encoding='utf-8')
    return set(re.findall(r"'([a-z0-9-]+)'\s*:\s*\{", mapa))


def id_demo(href):
    """Deriva o id do criador a partir do href da demonstração.

    Aceita hrefs absolutos (https://mossdigital.com.br/...) removendo a origem.
    """
    if href.startswith(('http://', 'https://', '//')):
        href = re.sub(r'^[a-z]+://[^/]+', '', href)
        if href.startswith('/'):
            href = href[1:]
    if 'preset=' in href:
        found = re.search(r'preset=([^&"]+)', href)
        return 'preset-' + found.group(1) if found else None
    path = href.split('?')[0].split('#')[0]
    parts = [p for p in path.split('/') if p]
    if parts and parts[-1] == 'index.html':
        parts = parts[:-1]
    return parts[-1] if parts else None


def processar(caminho, ids):
    texto = caminho.read_text(encoding='utf-8')
    arts = list(re.finditer(r'<article class="card" data-category="[^"]*">.*?</article>', texto, re.S))
    insercoes, tabela, erros = [], [], []

    for m in arts:
        art = m.group(0)
        titulo = re.search(r'<h2>(.*?)</h2>', art, re.S)
        titulo = re.sub(r'<[^>]+>', '', titulo.group(1))[:44] if titulo else '?'
        if 'btn-create' in art:
            tabela.append(('já tem', titulo, '—'))
            continue
        demo = re.search(r'<a class="demo" href="([^"]+)"', art)
        href = demo.group(1) if demo else None
        idd = id_demo(href) if href else None
        if not idd:
            erros.append(f'{caminho.name}: sem demo id ("{titulo}" href={href})')
            tabela.append(('ERRO', titulo, str(href)))
            continue
        if idd not in ids:
            erros.append(f'{caminho.name}: id "{idd}" fora do mapa-demos ("{titulo}")')
            tabela.append(('ERRO', titulo, idd))
            continue
        novo, n = re.subn(
            r'(<div class="actions">.*?)(</div>)',
            lambda mm: mm.group(1)
            + f'<a class="btn-create" href="criar/?demo={idd}">{TEXTO_NOVO}</a>'
            + mm.group(2),
            art, count=1, flags=re.S)
        if n != 1:
            erros.append(f'{caminho.name}: .actions não encontrado ("{titulo}")')
            tabela.append(('ERRO', titulo, 'sem .actions'))
            continue
        tabela.append(('ok', titulo, idd))
        insercoes.append((m.start(), m.end(), novo))

    for start, end, novo in reversed(insercoes):
        texto = texto[:start] + novo + texto[end:]

    # Texto do botão criado pelo JS
    if TEXTO_ANTIGO in texto:
        texto = texto.replace(
            f"criar.textContent = '{TEXTO_ANTIGO}';",
            f"criar.textContent = '{TEXTO_NOVO}';")
    if TEXTO_ANTIGO in texto:
        erros.append(f'{caminho.name}: restou texto antigo do JS')

    return texto, tabela, erros, len(insercoes)


def main():
    dry = '--dry' in sys.argv
    ids = ids_do_mapa()
    todos_erros, total = [], 0
    for caminho in ARTEFATOS:
        if not caminho.exists():
            todos_erros.append(f'ausente: {caminho}')
            continue
        texto, tabela, erros, n = processar(caminho, ids)
        total += n
        print(f'=== {caminho} — {n} botões a inserir, {len(ids)} ids no mapa ===')
        for estado, titulo, idd in tabela:
            print(f'  [{estado:>6}] {titulo:<46} {idd}')
        todos_erros.extend(erros)

    if todos_erros:
        print('\nFALHAS — nada foi gravado:')
        for erro in todos_erros:
            print('  -', erro)
        sys.exit(1)
    if dry:
        print('\n--dry: nada gravado.')
        return
    for caminho in ARTEFATOS:
        texto, _, _, _ = processar(caminho, ids)
        caminho.write_text(texto, encoding='utf-8', newline='')
        print(f'gravado: {caminho}')
    print(f'\nOK: {total} botões inseridos nos dois arquivos.')


if __name__ == '__main__':
    main()
