"""Smoke test de todas as páginas, isolado e sem enviar formulários/pagamentos."""
import asyncio
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from urllib.parse import quote
import json
import sys
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parent.parent

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

class LocalServer(ThreadingHTTPServer):
    request_queue_size = 128
    def handle_error(self, request, client_address):
        # Fechar uma página de teste interrompe downloads de vídeos/imagens.
        if isinstance(sys.exc_info()[1], (ConnectionAbortedError, ConnectionResetError, BrokenPipeError)):
            return
        super().handle_error(request, client_address)

async def run():
    server = LocalServer(('127.0.0.1', 0), partial(Quiet, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    base = 'http://127.0.0.1:' + str(server.server_port) + '/'
    files = [p.relative_to(ROOT).as_posix() for p in ROOT.rglob('*.html')
             if not any(x in p.relative_to(ROOT).parts for x in ('.git', '.moss-local', 'node_modules'))
             and not p.name.startswith('google')]
    # Inclui os presets: seus componentes são montados em tempo de execução.
    presets = ['lanchonete', 'pizzaria', 'padaria', 'clinica', 'estetica', 'fisioterapia', 'academia', 'salao', 'barbearia', 'petshop', 'locadora', 'imobiliaria', 'advocacia', 'escola', 'hotel', 'oficina', 'fotografo', 'servicos', 'dentista', 'veterinario', 'psicologo', 'nutricionista', 'arquiteto', 'tatuagem', 'assistencia', 'fretes', 'festas', 'bar']
    files += ['demo.html?preset=' + p for p in presets]
    if len(sys.argv) > 1:
        files = sys.argv[1:]
    results = []
    output = ROOT / '.moss-local' / 'audit-browser.json'
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel='msedge', headless=True)
        semaphore = asyncio.Semaphore(2)
        async def check(file):
            async with semaphore:
                context = await browser.new_context(viewport={'width': 1366, 'height': 900})
                async def protect(route):
                    req = route.request
                    # Não testa escrita em serviços reais nem usa dados pessoais.
                    if req.method not in ('GET', 'HEAD', 'OPTIONS') or any(s in req.url for s in ('supabase.co', 'wa.me', 'api.whatsapp', 'api.resend.com', 'api.openai.com', 'mercadopago', 'stripe.com')):
                        await route.abort()
                    else:
                        await route.continue_()
                await context.route('**/*', protect)
                page = await context.new_page()
                item = {'page': file, 'runtime': [], 'missing': [], 'layouts': []}
                page.on('pageerror', lambda error: item['runtime'].append(error.stack))
                page.on('response', lambda r: item['missing'].append(r.url.removeprefix(base)) if r.status == 404 and r.url.startswith(base) else None)
                item['failed_requests'] = []
                page.on('requestfailed', lambda req: item['failed_requests'].append({'url': req.url, 'reason': req.failure}))
                try:
                    await page.goto(base + quote(file, safe='/?=&'), wait_until='domcontentloaded', timeout=18000)
                    try:
                        await page.wait_for_load_state('load', timeout=5000)
                    except Exception:
                        item['external_load_pending'] = True
                    await page.wait_for_timeout(500)
                    for width in (1366, 390):
                        await page.set_viewport_size({'width': width, 'height': 900})
                        await page.wait_for_timeout(100)
                        layout = await page.evaluate('''() => ({width:innerWidth,scroll:document.documentElement.scrollWidth,
                            offenders:Array.from(document.body.querySelectorAll('*')).filter(el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>0&&r.right>innerWidth+2&&s.position!=='fixed'&&s.visibility!=='hidden'}).slice(0,5).map(el=>el.tagName+'.'+el.className)})''')
                        if layout['scroll'] > width + 2:
                            item['layouts'].append(layout)
                    item['broken_images'] = await page.evaluate('''() => Array.from(document.images).filter(img=>img.complete && !img.naturalWidth && img.getAttribute('src')).map(img=>img.getAttribute('src'))''')
                    if file in ('modelos.html', 'sistemas.html'):
                        await page.wait_for_function("document.documentElement.dataset.mossPreviews === 'ready'", timeout=10000)
                        item['catalog'] = await page.evaluate(r'''() => {
                            const grades=Array.from(document.querySelectorAll('#cards,main .grid'));
                            const collator=new Intl.Collator('pt-BR',{sensitivity:'base',numeric:true});
                            return grades.map(g=>{const c=Array.from(g.children).filter(e=>e.matches('article.card'));const names=c.map(e=>(e.querySelector('h2,h3')?.textContent.trim()||'').replace(/^[^\p{L}\p{N}]+/u,''));return {count:names.length,sorted:names.every((n,i)=>!i||collator.compare(names[i-1],n)<=0),names}});
                        }''')
                        item['preview_count'] = await page.locator('img[data-moss-snapshot="true"]').count()
                        if file == 'modelos.html':
                            await page.locator('[data-filter="Comércio"]').click()
                            item['filter'] = await page.locator('#cards .card:visible h2').all_text_contents()
                            await page.locator('[data-filter="Todos"]').click()
                    if file == 'modelos.html':
                        # Detecta links de cartões gerados por JavaScript.
                        item['demo_links'] = await page.locator('#cards a.demo').evaluate_all('(links)=>links.map(a=>a.getAttribute("href"))')
                except Exception as error:
                    item['navigation_error'] = str(error)[:600]
                finally:
                    results.append(item)
                    output.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
                    if len(results) % 25 == 0:
                        print(f'Conferidas {len(results)}/{len(files)} páginas/presets', flush=True)
                    await context.close()
        await asyncio.gather(*(check(file) for file in files))
        await browser.close()
    server.shutdown()
    output.write_text(json.dumps(results, ensure_ascii=False, indent=2), encoding='utf-8')
    failures = [r for r in results if r['runtime'] or r['missing'] or r['layouts'] or r.get('navigation_error')]
    print(json.dumps({'pages_and_presets': len(results), 'flagged': len(failures), 'runtime_errors': sum(len(r['runtime']) for r in results), 'local_404': sum(len(r['missing']) for r in results), 'overflow_pages': sum(bool(r['layouts']) for r in results)}, ensure_ascii=False))
    print(output)

if __name__ == '__main__':
    asyncio.run(run())
