"""Diagnóstico v2: estrutura DOM dos cards problemáticos de modelos.html."""
import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

URL = 'http://localhost:8784/modelos.html'
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

JS = r"""
() => {
  const grid = document.querySelector('.grid');
  const kids = [...grid.children].map((c, i) => ({
    i, tag: c.tagName,
    cls: (c.className || '').toString().slice(0, 30),
    titulo: ((c.querySelector('h3,h2,strong') || {}).textContent || '').trim().slice(0, 32),
    artigos: c.querySelectorAll('article').length,
    imgs: c.querySelectorAll('img').length,
    h: c.offsetHeight, top: c.offsetTop, left: c.offsetLeft
  }));

  // linhas do grid agrupadas por top
  const linhas = {};
  kids.forEach(k => {
    const chave = String(k.top);
    (linhas[chave] = linhas[chave] || []).push(`${k.titulo || k.tag}(${k.h}px,art=${k.artigos},img=${k.imgs})`);
  });

  // arvore do card Studio de Tatuagem
  const tam = [...grid.children].find(c => c.textContent.includes('Studio de Tatuagem'));
  const arvore = [];
  if (tam) {
    const walk = (el, prof) => {
      if (prof > 5) return;
      for (const f of el.children) {
        arvore.push({
          prof,
          tag: f.tagName,
          cls: (f.className || '').toString().slice(0, 45),
          h: f.offsetHeight, w: f.offsetWidth,
          imgs: f.querySelectorAll('img').length,
          txt: f.children.length === 0 ? (f.textContent || '').trim().slice(0, 35) : ''
        });
        walk(f, prof + 1);
      }
    };
    walk(tam, 0);
  }
  return {kids, linhas, arvore, tamH: tam ? tam.offsetHeight : null};
}
"""

with sync_playwright() as p:
    navegador = p.chromium.launch(executable_path=CHROME, headless=True)
    page = navegador.new_page(viewport={'width': 1440, 'height': 900})
    page.goto(URL, wait_until='networkidle')
    dados = page.evaluate(JS)
    navegador.close()

print('=== FILHOS DIRETOS DO GRID (tag, artigos aninhados, imgs, altura) ===')
aninhados = [k for k in dados['kids'] if k['artigos'] > 1]
print(f'total filhos: {len(dados["kids"])}  |  com >1 article aninhado: {len(aninhados)}')
for k in dados['kids']:
    marca = '  <== ANINHADO' if k['artigos'] > 1 else ''
    if k['artigos'] > 1 or k['h'] > 700 or k['imgs'] > 4:
        print(f'  [{k["i"]:2}] {k["tag"]:8} .{k["cls"]:22} art={k["artigos"]} img={k["imgs"]} h={k["h"]:5} top={k["top"]:5} "{k["titulo"]}"{marca}')

print('\n=== LINHAS DO GRID ===')
for top in sorted(dados['linhas'], key=lambda x: int(x)):
    print(f'  top={top}: {dados["linhas"][top]}')

print('\n=== ARVORE DO CARD "Studio de Tatuagem" ===')
print(f'  altura total do card: {dados["tamH"]}px')
for n in dados['arvore']:
    espaco = '  ' * (n['prof'] + 1)
    extra = f' imgs={n["imgs"]}' if n['imgs'] else ''
    texto = f' "{n["txt"]}"' if n['txt'] else ''
    print(f'{espaco}<{n["tag"]}> .{n["cls"]} h={n["h"]} w={n["w"]}{extra}{texto}')
