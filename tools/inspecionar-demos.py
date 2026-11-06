"""Inspeciona hrefs .demo e o botão JS de modelos.html (somente leitura)."""
import re
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

t = open(r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada\modelos.html', encoding='utf-8').read()

demos = re.findall(r'<a class="demo" href="([^"]+)"', t)
abs_ = [d for d in demos if d.startswith('http')]
rel = [d for d in demos if not d.startswith('http')]
print(f'total .demo: {len(demos)} | absolutos: {len(abs_)} | relativos: {len(rel)}')
print('amostra absolutos:')
for d in abs_[:4]:
    print('   ', d)
print('amostra relativos:')
for d in rel[:4]:
    print('   ', d)

m = re.search(r'criar\.textContent\s*=\s*[^;]+;', t)
print('JS botao:', m.group(0) if m else 'NAO ENCONTRADO')

arts = re.findall(r'<article class="card".*?</article>', t, re.S)
sem = sum(1 for a in arts if 'btn-create' not in a)
print(f'articles: {len(arts)} | sem btn-create: {sem}')

# quais cards relativos usam preset
pre = [d for d in rel if 'preset=' in d]
print(f'relativos com preset=: {len(pre)} | sem preset: {len(rel) - len(pre)}')
