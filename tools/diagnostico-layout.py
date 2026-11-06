"""Mede o layout real dos cards de modelos.html no navegador (somente leitura)."""
import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

URL = 'http://localhost:8784/modelos.html'
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

JS = r"""
() => {
  const grid = document.querySelector('.grid');
  if (!grid) return {erro: 'sem .grid'};
  const gs = getComputedStyle(grid);
  const cards = [...grid.children].slice(0, 9).map(c => {
    const t = c.querySelector('h3, h2, strong, .title');
    return {
      titulo: (t ? t.textContent : c.textContent.slice(0, 30)).trim(),
      top: c.offsetTop, left: c.offsetLeft,
      h: c.offsetHeight, w: c.offsetWidth,
      gridRow: getComputedStyle(c).gridRow,
      gridColumn: getComputedStyle(c).gridColumn
    };
  });
  // nos cards altos, achar o elemento interno que ocupa espaco
  const altos = [...grid.children].filter(c => c.offsetHeight > 700).slice(0, 3).map(c => {
    const partes = [...c.querySelectorAll('*')].filter(e => e.offsetHeight > 250).map(e => ({
      tag: e.tagName, cls: (e.className && e.className.toString ? e.className.toString() : '').slice(0, 60),
      h: e.offsetHeight, txt: (e.textContent || '').trim().slice(0, 40)
    }));
    return {titulo: (c.querySelector('h3, h2, strong') || {}).textContent || '', partes};
  });
  return {
    grid: {
      display: gs.display,
      cols: gs.gridTemplateColumns,
      rows: gs.gridTemplateRows,
      autoRows: gs.gridAutoRows,
      autoFlow: gs.gridAutoFlow,
      alignItems: gs.alignItems,
      justifyItems: gs.justifyItems,
      gap: gs.gap,
      height: grid.offsetHeight
    },
    cards,
    altos
  };
}
"""

with sync_playwright() as p:
    navegador = p.chromium.launch(executable_path=CHROME, headless=True)
    page = navegador.new_page(viewport={'width': 1440, 'height': 900})
    page.goto(URL, wait_until='networkidle')
    dados = page.evaluate(JS)
    navegador.close()

if 'erro' in dados:
    print('ERRO:', dados['erro'])
    sys.exit(1)

g = dados['grid']
print('=== GRID ===')
for k, v in g.items():
    print(f'  {k}: {v}')

print('\n=== PRIMEIROS 9 CARDS ===')
print(f'  {"titulo":38} {"top":>6} {"left":>6} {"h":>6} {"w":>6}  row / col')
for c in dados['cards']:
    print(f'  {c["titulo"][:38]:38} {c["top"]:>6} {c["left"]:>6} {c["h"]:>6} {c["w"]:>6}  {c["gridRow"]} / {c["gridColumn"]}')

print('\n=== CARDS ALTOS (>700px) — internos >250px ===')
for a in dados['altos']:
    print(f'  [{a["titulo"].strip()[:40]}]')
    for p2 in a['partes']:
        print(f'    <{p2["tag"]}> .{p2["cls"]} h={p2["h"]} "{p2["txt"]}"')
    if not a['partes']:
        print('    (nenhum interno >250px)')
