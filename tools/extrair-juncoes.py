"""Extrai os trechos exatos das junções para correção (somente leitura)."""
import sys

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

caminho = r'C:\Users\Sylvia Camillo\Downloads\00 - MOSS Digital\10 - Plataforma MOSS\publicacao-controlada\modelos.html'
t = open(caminho, encoding='utf-8').read()

i = t.find('Fretes e Transportes')
fim_fretes = t.find('<article class="card" data-category="Eventos e fotografia"><img loading="lazy" src="assets/img/festas', i)
print('=== JUNCAO FRETES -> CASA (repr, 160 chars antes) ===')
print(repr(t[fim_fretes - 160:fim_fretes + 60]))
print()

j = t.find('Bar e Coquetelaria')
fim_bar = t.find('</article>', j) + 10
print('=== JUNCAO BAR -> EXTRA -> FOTOS (repr) ===')
print(repr(t[fim_bar - 60:fim_bar + 150]))
