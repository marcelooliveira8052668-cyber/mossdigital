"""Verifica o site publicado em mossdigital.com.br (somente leitura)."""
import sys
import urllib.request

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE = 'https://mossdigital.com.br'
FALHAS = []


def checar(cond, msg):
    print(('  OK   ' if cond else '  FALHA') + ' ' + msg)
    if not cond:
        FALHAS.append(msg)


def get(caminho):
    req = urllib.request.Request(BASE + caminho, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.status, r.read().decode('utf-8', 'replace')
    except urllib.error.HTTPError as e:
        return e.code, ''
    except Exception as e:
        return 0, str(e)


print('=== PAGINAS ===')
for caminho, esperado in [
    ('/index.html', 200),
    ('/modelos.html', 200),
    ('/sistemas.html', 200),
    ('/estrutura.html', 200),
    ('/privacidade.html', 200),
    ('/404.html', 200),
    ('/sitemap.xml', 200),
    ('/assets/css/moss-futurista.css', 200),
    ('/assets/img/favicon.svg', 200),
]:
    status, corpo = get(caminho)
    checar(status == esperado, f'{caminho} -> {status}')

print('\n=== CONTEUDO ===')
_, idx = get('/index.html')
checar('zap-flutuante' in idx, 'index: botao fixo do WhatsApp')
checar('privacidade.html' in idx[idx.rfind('<footer>'):], 'index: link Privacidade no rodape')
checar('rel="icon"' in idx, 'index: favicon declarado')

_, mod = get('/modelos.html')
n = mod.count('btn-create')
checar(n >= 36, f'modelos: {n} botoes Criar o meu site gratis (>=36)')
checar('Criar o meu site gratis' in mod or 'Criar o meu site gr\u00e1tis' in mod, 'modelos: texto do botao')

_, sis = get('/sistemas.html')
checar('zap-flutuante' in sis, 'sistemas: botao fixo')

_, estr = get('/estrutura.html')
checar('zap-flutuante' in estr, 'estrutura: botao fixo')

_, priv = get('/privacidade.html')
checar('noindex' not in priv[:2000] or 'index, follow' in priv, 'privacidade: indexavel')
checar('MOSS DIGITAL / PRIVACIDADE' in priv, 'privacidade: eyebrow correto')

_, sm = get('/sitemap.xml')
checar('moss-cardapio' not in sm, 'sitemap: moss-cardapio removido')
checar('privacidade.html' in sm, 'sitemap: privacidade presente')
checar(sm.count('<loc>') == 16, f'sitemap: 16 URLs ({sm.count("<loc>")})')

print('\n=== 404 PROFUNDO ===')
status, corpo = get('/pagina-que-nao-existe-verificar')
checar(status == 404, f'caminho inexistente -> {status}')

print('\n' + ('TUDO OK no ar ✅' if not FALHAS else f'{len(FALHAS)} FALHAS ❌'))
for f in FALHAS:
    print('  -', f)
sys.exit(1 if FALHAS else 0)
