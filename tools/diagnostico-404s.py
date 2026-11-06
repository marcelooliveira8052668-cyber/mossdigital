"""Captura o recurso 404 do index com janela de espera maior (pós-networkidle)."""
import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

URL = 'http://localhost:8784/index.html'
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'

with sync_playwright() as p:
    nav = p.chromium.launch(executable_path=CHROME, headless=True)
    for tentativa in range(1, 4):
        ctx = nav.new_context(viewport={'width': 1440, 'height': 900})
        page = ctx.new_page()
        http_falhas, consoles = [], []
        page.on('response', lambda r: http_falhas.append((r.status, r.url)) if r.status >= 400 else None)
        page.on('requestfailed', lambda r: http_falhas.append(('FAILED', r.url + ' :: ' + str(r.failure))))
        page.on('console', lambda m: consoles.append(m.text) if m.type == 'error' else None)
        page.goto(URL, wait_until='networkidle')
        page.wait_for_timeout(2500)  # janela para favicon/deferred
        print(f'--- tentativa {tentativa} ---')
        print('  http:', http_falhas or '(nenhum)')
        print('  console:', consoles or '(nenhum)')
        ctx.close()
    nav.close()
