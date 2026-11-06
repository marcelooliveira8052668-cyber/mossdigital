"""Confere ids do mapa-demos (somente leitura)."""
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

t = open(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada\criar\assets\mapa-demos.js', encoding='utf-8').read()
ids = re.findall(r"'([a-z0-9-]+)'\s*:\s*\{", t)
print('total ids:', len(ids))
preset = [i for i in ids if i.startswith('preset-')]
print('preset-*:', len(preset))
print('amostra preset:', preset[:10])
print('tem preset-lanchonete:', 'preset-lanchonete' in ids)
print('tem preset-pizzaria:', 'preset-pizzaria' in ids)

# simula a derivacao para os 29 absolutos de modelos.html
m = open(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada\modelos.html', encoding='utf-8').read()
demos = re.findall(r'<a class="demo" href="([^"]+)"', m)


def id_demo(href):
    if href.startswith(('http://', 'https://', '//')):
        # remove origem
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


faltando = []
for d in demos:
    i = id_demo(d)
    if i not in ids:
        faltando.append((i, d[:70]))
print(f'\nids derivados: {len(demos)} | fora do mapa: {len(faltando)}')
for i, d in faltando:
    print('  FALTA:', i, '<-', d)
