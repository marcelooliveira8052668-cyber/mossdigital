"""Diagnóstico da estrutura HTML dos cards de modelos.html (somente leitura)."""
import re
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent
for alvo in [REPO / 'modelos.html', REPO.parents[1] / '_repo-site' / 'modelos.html']:
    if not alvo.exists():
        continue
    t = alvo.read_text(encoding='utf-8')
    abertos = len(re.findall(r'<article\b', t))
    fechados = len(re.findall(r'</article>', t))
    divs_a = len(re.findall(r'<div\b', t))
    divs_f = len(re.findall(r'</div>', t))
    print(f'=== {alvo} ===')
    print(f'  <article>: {abertos}  </article>: {fechados}  {"OK" if abertos == fechados else "DESBALANCEADO!"}')
    print(f'  <div>: {divs_a}  </div>: {divs_f}  {"OK" if divs_a == divs_f else "DESBALANCEADO!"}')

    for alvo_card in ['Studio de Tatuagem', 'Assistência de Celular']:
        i = t.find(alvo_card)
        if i < 0:
            print(f'  [{alvo_card}] nao encontrado')
            continue
        # acha o <article> anterior mais proximo e o </article> posterior
        ini = t.rfind('<article', 0, i)
        fim = t.find('</article>', i)
        html = t[ini:fim + 10]
        print(f'\n  --- {alvo_card} (card inteiro, {len(html)} chars) ---')
        print('  ' + html[:1500])
        # o que vem DEPOIS deste card (proximo irmao)
        resto = t[fim + 10:fim + 400]
        print(f'\n  --- DEPOIS do card ---\n  {resto[:350]}')
        print()
