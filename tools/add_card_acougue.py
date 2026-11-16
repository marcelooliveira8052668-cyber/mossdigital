#!/usr/bin/env python3
"""Prepara o cartão do Açougue do Bairro no catálogo da MOSS Digital.

ATENÇÃO: este arquivo foi CRIADO mas NÃO EXECUTADO.
Só rodar depois da aprovação explícita da demo (regra em demos/AGENTS.md).
Uso: python tools/add_card_acougue.py
"""
from pathlib import Path

repo = Path(__file__).resolve().parents[1]
html = repo / 'index.html'
t = html.read_text(encoding='utf-8')

if '/demos/acougue-do-bairro/' in t:
    raise SystemExit('Cartão do açougue já existe. Nada foi alterado.')

marcador = '<article class="demo-card" data-category="Comércio">\n                  <a class="demo-cover" href="/demos/passo-atelier/"'
if marcador not in t:
    raise SystemExit('Marcador (cartão PASSO Atelier) não encontrado')

cartao = '''<article class="demo-card" data-category="Alimentação">
                  <a class="demo-cover" href="/demos/acougue-do-bairro/" target="_blank" rel="noopener noreferrer" aria-label="Abrir demo: Açougue do Bairro — cortes, pesos e encomendas"><img src="/demos/acougue-do-bairro/entrega/card-acougue-do-bairro.webp" width="1200" height="750" alt="Captura da própria demonstração: Açougue do Bairro, com carne na grelha e preço por quilo" loading="lazy" decoding="async"></a>
                  <div class="demo-body"><span class="demo-category">Alimentação</span><h3>Açougue do Bairro — cortes, pesos e encomendas</h3>
                  <details class="demo-details"><summary>Sobre esta demo</summary><p>25 cortes com fotos em bovinos, suínos, aves, linguiças e peixes; busca, filtros, calculadora de quilos e encomenda demonstrativa salva apenas neste navegador. Nomes, preços e endereço fictícios, sem pagamento ou banco conectado.</p></details>
                  <div class="demo-actions"><a href="/demos/acougue-do-bairro/" target="_blank" rel="noopener noreferrer">Abrir demo <span aria-hidden="true">↗</span></a><a href="https://wa.me/5511942038103?text=Quero%20um%20site%20como%20o%20A%C3%A7ougue%20do%20Bairro." target="_blank" rel="noopener noreferrer">Quero um assim</a></div></div></article>
'''

t = t.replace(marcador, cartao + marcador, 1)
t = t.replace('136 modelos de sites disponíveis', '137 modelos de sites disponíveis', 1)
html.write_text(t, encoding='utf-8')
print('Cartão inserido e contagem atualizada para 137.')
