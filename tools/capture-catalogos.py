"""Capas fiéis: captura cada demo que o cartão realmente abre. Sem envios."""
import asyncio
import hashlib
import io
import json
from pathlib import Path
import re
import unicodedata
import sys
from urllib.parse import urlsplit, urlunsplit, parse_qs, urlencode
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from datetime import datetime, timezone
from PIL import Image, ImageOps
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / 'assets/img/catalogo-fiel'

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

class Server(ThreadingHTTPServer):
    request_queue_size = 128
    def handle_error(self, request, address): pass

def key(url, local_origin):
    u = urlsplit(url)
    own = u.netloc in ('mossdigital.com.br', 'www.mossdigital.com.br', urlsplit(local_origin).netloc)
    path = re.sub(r'index\.html$', '', u.path)
    if not path: path = '/'
    query = parse_qs(u.query)
    suffix = '?' + urlencode({'preset': query['preset'][0]}) if query.get('preset') else ''
    return ('' if own else u.scheme + '://' + u.netloc) + path + suffix

async def main():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    server = Server(('127.0.0.1', 0), partial(Handler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    origin = 'http://127.0.0.1:' + str(server.server_port)
    entries, captures, failures = {}, [], []
    old = json.loads((OUTPUT / 'manifest.json').read_text(encoding='utf-8')) if (OUTPUT / 'manifest.json').exists() else {'previews': []}
    cache = {item['key']: item for item in old['previews'] if (ROOT / item['src']).exists()}
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='msedge', headless=True)
        context = await browser.new_context(viewport={'width':1440, 'height':900}, device_scale_factor=1)
        async def protect(route):
            r = route.request
            if r.method not in ('GET', 'HEAD', 'OPTIONS') or any(s in r.url for s in ('supabase.co', 'wa.me', 'api.whatsapp', 'api.openai.com', 'api.resend.com')):
                await route.abort()
            else: await route.continue_()
        await context.route('**/*', protect)
        page = await context.new_page()
        for catalog in ('modelos.html', 'sistemas.html'):
            await page.goto(origin + '/' + catalog, wait_until='domcontentloaded')
            await page.wait_for_timeout(1000)
            cards = await page.locator('#cards article.card,main .grid article.card').evaluate_all('''cards=>cards.map(c=>({title:c.querySelector('h2,h3')?.textContent.trim(),url:(c.querySelector('a.demo')||c.querySelector('a.access')||c.querySelector('a.preview'))?.href})).filter(x=>x.url)''')
            for item in cards:
                k = key(item['url'], origin)
                entries.setdefault(k, item)
        await page.close()
        print('Destinos únicos a capturar:', len(entries), flush=True)
        semaphore = asyncio.Semaphore(2)
        async def capture(k, item):
            if k in cache and not any(part in k for part in sys.argv[1:]):
                captures.append(cache[k])
                return
            async with semaphore:
                page = await context.new_page()
                actual = item['url']
                u = urlsplit(actual)
                if u.netloc in ('mossdigital.com.br', 'www.mossdigital.com.br'):
                    actual = origin + urlunsplit(('', '', u.path, u.query, ''))
                try:
                    response = await page.goto(actual, wait_until='domcontentloaded', timeout=30000)
                    if response and response.status >= 400: raise RuntimeError('HTTP ' + str(response.status))
                    try: await page.wait_for_load_state('load', timeout=7000)
                    except Exception: pass
                    await page.wait_for_timeout(1200)
                    await page.evaluate('window.scrollTo(0,0)')
                    if len((await page.locator('body').inner_text()).strip()) < 30: raise RuntimeError('Página vazia ou ainda não renderizada')
                    title = re.sub(r'[^a-z0-9]+', '-', unicodedata.normalize('NFKD',item['title']).encode('ascii','ignore').decode().lower()).strip('-')[:65]
                    name = title + '-' + hashlib.sha256(k.encode()).hexdigest()[:10] + '.webp'
                    data = await page.screenshot(animations='disabled', caret='hide', type='png')
                    image = Image.open(io.BytesIO(data)).convert('RGB')
                    image = ImageOps.fit(image, (960, 600), method=Image.Resampling.LANCZOS)
                    image.save(OUTPUT / name, 'WEBP', quality=86)
                    public_url = item['url'].replace(origin, 'https://mossdigital.com.br')
                    captures.append({'key':k, 'title':item['title'], 'src':'assets/img/catalogo-fiel/' + name, 'url':public_url})
                    print('Captura:', item['title'], flush=True)
                except Exception as error:
                    failures.append({'key':k, 'title':item['title'], 'error':str(error)[:500]})
                    print('FALHA:', item['title'], str(error)[:150], flush=True)
                finally:
                    await page.close()
        await asyncio.gather(*(capture(k, item) for k, item in entries.items()))
        await browser.close()
    server.shutdown()
    manifest = {'capturedAt':datetime.now(timezone.utc).isoformat(), 'notice':'Capturas das próprias demonstrações, sem dados reais de clientes.', 'previews':sorted(captures,key=lambda c:c['key'])}
    (OUTPUT / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    (ROOT / '.moss-local' / 'capturas-falhas.json').write_text(json.dumps(failures, ensure_ascii=False, indent=2),encoding='utf-8')
    print(f'CAPTURADAS: {len(captures)}; FALHAS: {len(failures)}')
    if failures: raise SystemExit(1)

if __name__ == '__main__':
    asyncio.run(main())
