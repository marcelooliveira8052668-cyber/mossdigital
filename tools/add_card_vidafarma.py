#!/usr/bin/env python3
"""Prepara o cartão da VidaFarma no catálogo da MOSS Digital.

ATENÇÃO: CRIADO mas NÃO EXECUTADO. Rodar somente após aprovação explícita
da demo (regra em demos/AGENTS.md). Uso: python tools/add_card_vidafarma.py
"""
from pathlib import Path

repo = Path(__file__).resolve().parents[1]
html = repo / 'index.html'
t = html.read_text(encoding='utf-8')

if '/demos/vidafarma/' in t:
    raise SystemExit('Cartão da VidaFarma já existe. Nada alterado.')

marcador = '<article class="demo-card" data-category="Alimentação">\n                  <a class="demo-cover" href="/demos/acougue-do-bairro/"'
if marcador not in t:
    raise SystemExit('Marcador (cartão Açougue do Bairro) não encontrado')

cartao = '''<article class="demo-card" data-category="Beleza e saúde">
                  <a class="demo-cover" href="/demos/vidafarma/" target="_blank" rel="noopener noreferrer" aria-label="Abrir demo: VidaFarma — farmácia por necessidade, fichas e encomendas"><img src="/demos/vidafarma/entrega/card-vidafarma.webp" width="1200" height="750" alt="Captura da própria demonstração: VidaFarma, farmácia em verde-água com prateleiras" loading="lazy" decoding="async"></a>
                  <div class="demo-body"><span class="demo-category">Beleza e saúde</span><h3>VidaFarma — farmácia por necessidade</h3>
                  <details class="demo-details"><summary>Sobre esta demo</summary><p>21 produtos com fotos em seis necessidades, ficha com apresentação e cuidados, busca sem acento, lembrete e encomenda demonstrativa salva apenas neste navegador. Sem venda, pagamento ou orientação médica; nomes e preços fictícios.</p></details>
                  <div class="demo-actions"><a href="/demos/vidafarma/" target="_blank" rel="noopener noreferrer">Abrir demo <span aria-hidden="true">↗</span></a><a href="https://wa.me/5511942038103?text=Quero%20um%20site%20como%20a%20VidaFarma." target="_blank" rel="noopener noreferrer">Quero um assim</a></div></div></article>
'''

t = t.replace(marcador, cartao + marcador, 1)
t = t.replace('137 modelos de sites disponíveis', '138 modelos de sites disponíveis', 1)
html.write_text(t, encoding='utf-8')
print('Cartão inserido e contagem atualizada para 138.')
