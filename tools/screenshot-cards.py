"""Screenshot da região dos cards problemáticos (tema escuro) para conferência visual."""
import sys
from playwright.sync_api import sync_playwright

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

URL = 'http://localhost:8784/modelos.html'
CHROME = r'C:\Program Files\Google\Chrome\Application\chrome.exe'
SAIDA = r'C:\Users\Sylvia Camillo\AppData\Local\Temp\opencode\cards-consertados.png'

with sync_playwright() as p:
    navegador = p.chromium.launch(executable_path=CHROME, headless=True)
    page = navegador.new_page(viewport={'width': 1440, 'height': 1000})
    page.goto(URL, wait_until='networkidle')
    # tema escuro como na foto do usuário
    page.evaluate("() => localStorage.setItem('moss-digital-theme', 'dark')")
    page.reload(wait_until='networkidle')
    # rola até o card da Tatuagem
    page.evaluate("() => { const c = [...document.querySelectorAll('.grid .card')].find(x => x.textContent.includes('Studio de Tatuagem')); c.scrollIntoView({block: 'start'}); window.scrollBy(0, -80); }")
    page.wait_for_timeout(400)
    page.screenshot(path=SAIDA)
    navegador.close()

print('screenshot salvo em', SAIDA)
