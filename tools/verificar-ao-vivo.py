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
checar('Conversar pelo WhatsApp' in idx and 'wa.me/5511942038103' in idx, 'index: contato pelo WhatsApp')
checar('privacidade.html' in idx[idx.rfind('<footer'):], 'index: link Privacidade no rodape')
checar('rel="icon"' in idx, 'index: favicon declarado')
checar(idx.count('class="demo-card"') == 127, 'index: 127 demos na mesma pagina')
checar('/assets/css/moss-unificada.css' in idx, 'index: identidade visual unificada')
checar('127.0.0.1' not in idx and '.moss-local/' not in idx, 'index: sem enderecos temporarios')

_, mod = get('/modelos.html')
checar('http-equiv="refresh"' in mod and './#modelos' in mod, 'modelos: encaminha para a home unificada')
checar('rel="canonical" href="https://mossdigital.com.br/"' in mod, 'modelos: URL principal unica')
checar('demos/armazem-da-esquina/entrega/card-armazem-da-esquina.webp' in idx, 'index: cartao do Armazem da Esquina')

_, sis = get('/sistemas.html')
checar('noindex' in sis and 'url=./' in sis, 'sistemas: redireciona para o inicio com noindex')

_, estr = get('/estrutura.html')
checar('zap-flutuante' in estr, 'estrutura: botao fixo')

_, priv = get('/privacidade.html')
checar('noindex' not in priv[:2000] or 'index, follow' in priv, 'privacidade: indexavel')
checar('MOSS DIGITAL / PRIVACIDADE' in priv, 'privacidade: eyebrow correto')

_, sm = get('/sitemap.xml')
checar('moss-cardapio' not in sm, 'sitemap: moss-cardapio removido')
checar('privacidade.html' in sm, 'sitemap: privacidade presente')
checar(sm.count('<loc>') >= 21, f'sitemap: ao menos 21 URLs ({sm.count("<loc>")})')

print('\n=== DEMOS PUBLICADAS ===')
for demo in ['/demos/moss-academia/', '/demos/viva-prime/', '/demos/armazem-da-esquina/']:
    status, corpo = get(demo)
    checar(status == 200, f'{demo} -> {status}')

print('\n=== 404 PROFUNDO ===')
status, corpo = get('/pagina-que-nao-existe-verificar')
checar(status == 404, f'caminho inexistente -> {status}')

print('\n' + ('TUDO OK no ar ✅' if not FALHAS else f'{len(FALHAS)} FALHAS ❌'))
for f in FALHAS:
    print('  -', f)
sys.exit(1 if FALHAS else 0)
