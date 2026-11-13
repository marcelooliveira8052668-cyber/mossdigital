"""Compara e sincroniza a pasta de trabalho (staging) com o repositório do site.

Uso:
  python tools/sincronizar-site.py --comparar          # só o relatório
  python tools/sincronizar-site.py --aplicar            # copia staging -> site
  python tools/sincronizar-site.py --aplicar --devolver  # copia site -> staging
"""
import argparse
import filecmp
import hashlib
import shutil
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
STAGING = Path(__file__).resolve().parents[1]

IGNORAR = {'.git', 'node_modules', '__pycache__', '.moss-local', '.pytest_cache'}

# Arquivos que continuam sendo mantidos como estão no destino.
MANTER_NO_DESTINO = {
    'docs/PAGINA-INICIAL-2026-11.md',   # cada cópia descreve o próprio caminho das ferramentas
    'demos/entrelares/TESTES-NAVEGADOR.json',  # a versão do site é mais recente
    'package.json',                     # resíduo do npm install no staging
    'package-lock.json',                # resíduo do npm install no staging
}


def arquivos(raiz: Path):
    base = raiz.resolve()
    achados = {}
    for caminho in base.rglob('*'):
        if not caminho.is_file():
            continue
        if any(parte in IGNORAR for parte in caminho.relative_to(base).parts):
            continue
        achados[str(caminho.relative_to(base)).replace('\\', '/')] = caminho
    return achados


def resumo(caminho: Path):
    return f'{caminho.stat().st_size / 1024:.0f} KB'


def comparar():
    site = arquivos(REPO)
    staging = arquivos(STAGING)
    so_staging = sorted(set(staging) - set(site))
    so_site = sorted(set(site) - set(staging))
    diferentes = []
    for chave in sorted(set(site) & set(staging)):
        if not filecmp.cmp(site[chave], staging[chave], shallow=False):
            diferentes.append(chave)
    print(f'site: {len(site)} arquivos | staging: {len(staging)} arquivos')
    print(f'so no staging: {len(so_staging)} | so no site: {len(so_site)} | diferentes: {len(diferentes)}')
    print('\n--- só no staging')
    for chave in so_staging:
        print(f'  {chave} ({resumo(staging[chave])})')
    print('\n--- só no site')
    for chave in so_site:
        print(f'  {chave} ({resumo(site[chave])})')
    print('\n--- diferentes')
    for chave in diferentes:
        d_site = site[chave].stat().st_mtime
        d_stg = staging[chave].stat().st_mtime
        quem = 'staging' if d_stg >= d_site else 'site'
        print(f'  {chave} ({resumo(site[chave])} | {resumo(staging[chave])}) mais recente: {quem}')
    return site, staging, so_staging, so_site, diferentes


def aplicar(devolver: bool):
    site, staging, so_staging, so_site, diferentes = comparar()
    if devolver:
        alvos = so_site
        origem, destino_raiz = site, STAGING
        print(f'\nDevolvendo {len(alvos)} arquivos do site para o staging')
    else:
        alvos = [c for c in so_staging if c not in MANTER_NO_DESTINO] + [
            c for c in diferentes if c not in MANTER_NO_DESTINO]
        origem, destino_raiz = staging, REPO
        print(f'\nCopiando {len(alvos)} arquivos do staging para o site')
    copiados = 0
    for chave in alvos:
        de = origem[chave]
        para = destino_raiz / chave
        para.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(de, para)
        copiados += 1
    print(f'{copiados} arquivos copiados.')


if __name__ == '__main__':
    ap = argparse.ArgumentParser()
    ap.add_argument('--comparar', action='store_true')
    ap.add_argument('--aplicar', action='store_true')
    ap.add_argument('--devolver', action='store_true')
    args = ap.parse_args()
    if args.aplicar:
        aplicar(args.devolver)
    else:
        comparar()
