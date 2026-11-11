"""Migração idempotente dos botões estáticos no catálogo HTML minificado.

Remove apenas âncoras btn-create que apontam para a rota retirada.
Os links de demonstração e orçamento são preservados.
"""
from pathlib import Path
import re

def migrar():
    p=Path(__file__).resolve().parent.parent/'modelos.html'
    original=p.read_text(encoding='utf-8')
    removidos=[]
    def substituir(m):
        a=m.group(0)
        classe=re.search(r'\bclass=["\']([^"\']*)["\']',a)
        href=re.search(r'\bhref=["\']([^"\']*)["\']',a)
        if classe and 'btn-create' in classe[1].split() and href and href[1].startswith(('criar/','/criar/')):
            removidos.append(href[1])
            return ''
        return a
    texto=re.sub(r'<a\b[^>]*>.*?</a>',substituir,original,flags=re.S|re.I)
    texto=texto.replace('.btn-create{background:#ffc531;color:#0d2b52}.btn-create:hover,.btn-create:focus-visible{background:#f0b41f;color:#0d2b52}','')
    if texto!=original:
        p.write_text(texto,encoding='utf-8')
    print(f'Removidos {len(removidos)} botões estáticos da ferramenta retirada.')

if __name__=='__main__':
    migrar()
