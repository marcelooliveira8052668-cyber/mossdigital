"""Testa guia estrutural, casamento e contabilidade sem publicar nem enviar dados.

Requer Playwright para Python e Chrome ou Edge. Aceita axe-core local opcional.
"""
import argparse
import asyncio
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
from threading import Thread
from playwright.async_api import async_playwright

REPO = Path(__file__).resolve().parent.parent

class Handler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass
    def copyfile(self, source, outputfile):
        try:
            super().copyfile(source, outputfile)
        except (BrokenPipeError, ConnectionResetError, ConnectionAbortedError):
            pass

async def test(base, args, browser_path):
    checks, errors, http_errors, audits = [], [], [], []
    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path=browser_path)
        context = await browser.new_context(color_scheme='dark', reduced_motion='reduce', accept_downloads=True)
        page = await context.new_page()
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('response', lambda response: http_errors.append(response.url) if response.url.startswith(base) and response.status >= 400 else None)
        async def load(path):
            response = await page.goto(base + path, wait_until='networkidle')
            assert response.status == 200
        await load('index.html')
        link = page.locator('#como-funciona a[href="estrutura.html"]')
        assert await link.count() == 1
        assert await page.locator('a[href="estrutura.html"]').count() == 1
        await link.click()
        assert page.url.endswith('/estrutura.html')
        assert await page.locator('.wire-block').count() == 7
        await page.get_by_role('button', name='Celular', exact=True).click()
        assert await page.locator('#wire-page').get_attribute('data-view') == 'mobile'
        await page.get_by_role('button', name='Computador', exact=True).click()
        assert await page.locator('#wire-page').get_attribute('data-view') == 'desktop'
        first = page.locator('.wire-block summary').first
        await first.focus(); await page.keyboard.press('Enter')
        assert await first.locator('..').get_attribute('open') is not None
        await page.keyboard.press('Enter')
        assert await first.locator('..').get_attribute('open') is None
        await page.get_by_role('link', name='Voltar à contratação', exact=False).click()
        assert page.url.endswith('index.html#como-funciona')
        checks.append('guia separado: único link discreto, sete explicações por teclado e dois modos de visualização')

        for slug, path in [('estrutura', 'estrutura.html'), ('casamento', 'demos/casamento/'), ('contabilidade', 'demos/contabilidade/')]:
            await load(path)
            assert await page.locator('h1').count() == 1
            assert await page.locator('main').count() == 1
            for width in [1440, 1024, 768, 390, 320]:
                await page.set_viewport_size({'width': width, 'height': 900})
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'{slug}: transbordou em {width}px'
                if width in (1440, 390):
                    await page.evaluate('scrollTo(0,0)')
                    await page.screenshot(path=str(args.output / f'{slug}-{width}.jpg'), type='jpeg', quality=80)
            if args.axe_path:
                await page.set_viewport_size({'width': 1440, 'height': 1000})
                await page.add_script_tag(path=str(args.axe_path))
                audit = await page.evaluate('''async () => {
                  const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
                  return {violations:r.violations,passes:r.passes.length};
                }''')
                audits.append({'page':slug,**audit})
                (args.output / 'acessibilidade-novas-demos.json').write_text(json.dumps(audits,ensure_ascii=False,indent=2),encoding='utf-8')
                assert not audit['violations'], json.dumps(audits[-1],ensure_ascii=False)
            checks.append(f'{slug}: estrutura, cinco larguras e auditoria automática complementar')

        await load('demos/casamento/')
        assert int(await page.locator('#days').inner_text()) >= 0
        await page.get_by_role('button', name='Gerar minha prévia', exact=False).click()
        assert not await page.locator('#rsvp-preview').is_visible()
        name = '<b>Pessoa Exemplo</b>'
        await page.locator('#guest-name').fill(name)
        await page.locator('#companions').select_option('2')
        await page.locator('#rsvp-ack').check()
        await page.get_by_role('button', name='Gerar minha prévia', exact=False).click()
        assert await page.locator('#rsvp-preview').is_visible()
        assert name in await page.locator('#rsvp-summary').inner_text()
        assert await page.locator('#rsvp-summary b').count() == 0
        assert 'Acompanhantes fictícios: 2' in await page.locator('#rsvp-summary').inner_text()
        async with page.expect_download() as download_event:
            await page.locator('#download-rsvp').click()
        download = await download_event.value
        assert download.suggested_filename == 'casamento-previa-demonstrativa.txt'
        assert 'Não confirma presença' in Path(await download.path()).read_text(encoding='utf-8')
        await page.locator('#attendance').select_option('nao')
        assert not await page.locator('#rsvp-preview').is_visible()
        assert await page.locator('#companions').is_disabled()
        assert await page.locator('#companions').input_value() == '0'
        assert not await page.locator('#rsvp-ack').is_checked()
        await page.locator('#rsvp-ack').check()
        await page.get_by_role('button', name='Gerar minha prévia', exact=False).click()
        assert 'Participação simulada: Não' in await page.locator('#rsvp-summary').inner_text()
        await page.locator('#reset-rsvp').click()
        assert await page.locator('#guest-name').input_value() == ''
        assert await page.evaluate('localStorage.length + sessionStorage.length') == 0
        checks.append('casamento: validação, prévia segura, acompanhantes, revisão obrigatória, TXT e ausência de armazenamento')

        await load('demos/contabilidade/')
        await page.get_by_role('button', name='Montar meu roteiro', exact=False).click()
        assert not await page.locator('#guide-result').is_visible()
        for goal in ['abrir', 'mei', 'empresa']:
            await page.locator('#goal').select_option(goal)
            await page.locator('#guide-ack').check()
            await page.get_by_role('button', name='Montar meu roteiro', exact=False).click()
            assert await page.locator('#guide-result').is_visible()
            assert await page.locator('#checklist li').count() >= 5
        await page.locator('#team').select_option('com')
        assert not await page.locator('#guide-result').is_visible()
        assert not await page.locator('#guide-ack').is_checked()
        await page.locator('#guide-ack').check()
        await page.get_by_role('button', name='Montar meu roteiro', exact=False).click()
        assert 'equipe e contratação' in await page.locator('#checklist').inner_text()
        await page.evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async text=>{window.__copied=text;}}})')
        await page.locator('#copy-guide').click()
        assert 'Não define regime' in await page.evaluate('window.__copied')
        await page.evaluate('Object.defineProperty(navigator,"clipboard",{configurable:true,value:{writeText:async()=>{throw Error("blocked")}}})')
        async with page.expect_download() as download_event:
            await page.locator('#copy-guide').click()
        download = await download_event.value
        assert download.suggested_filename == 'eixo-roteiro-demonstrativo.txt'
        assert 'Não é diagnóstico' in Path(await download.path()).read_text(encoding='utf-8')
        await page.locator('#reset-guide').click()
        assert not await page.locator('#guide-result').is_visible()
        assert await page.evaluate('localStorage.length + sessionStorage.length') == 0
        checks.append('contabilidade: três caminhos, checklist, invalidação, cópia/TXT e nenhum cadastro ou orientação fiscal automática')

        nojs = await browser.new_context(java_script_enabled=False, viewport={'width':390,'height':844})
        fallback = await nojs.new_page()
        for slug in ['casamento','contabilidade']:
            await fallback.goto(base + 'demos/' + slug + '/',wait_until='networkidle')
            assert await fallback.locator('fieldset[disabled]').count() == 1
            assert await fallback.locator('button[type="submit"]').is_disabled()
            assert await fallback.evaluate('document.documentElement.scrollWidth <= innerWidth')
        await fallback.goto(base + 'estrutura.html',wait_until='networkidle')
        assert await fallback.locator('.view-switch').is_hidden()
        await fallback.locator('.wire-block summary').first.click()
        assert await fallback.locator('.wire-block details').first.get_attribute('open') is not None
        checks.append('sem JavaScript: conteúdo legível, guia funcional e formulários bloqueados')

        await load('modelos.html')
        for slug, title, category in [('casamento','Clara & Tomás — Site de casamento','Eventos e fotografia'),('contabilidade','Eixo Contábil — Contabilidade','Serviços')]:
            card = page.locator('.card').filter(has=page.get_by_role('heading',name=title,exact=True))
            assert await card.count() == 1
            await page.get_by_role('button',name=category,exact=True).click()
            assert await card.is_visible()
            await page.get_by_role('button',name='Todos',exact=True).click()
        for slug in ['casamento','contabilidade']:
            await load('demo.html?preset=' + slug)
            assert f'/demos/{slug}/index.html' in page.url
        checks.append('catálogo sem duplicatas, categorias corretas e redirecionamentos de presets')
        assert not errors, errors
        assert not http_errors, http_errors
        await browser.close()
    report={'checks':checks,'runtime_errors':errors,'local_http_errors':http_errors,'axe_audits':len(audits)}
    (args.output / 'testes-novas-demos.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path,required=True)
    parser.add_argument('--axe-path',type=Path)
    parser.add_argument('--browser-path')
    args=parser.parse_args();args.output.mkdir(parents=True,exist_ok=True)
    candidates=[Path(os.environ.get('PROGRAMFILES','C:/Program Files'))/'Google/Chrome/Application/chrome.exe',Path(os.environ.get('PROGRAMFILES(X86)','C:/Program Files (x86)'))/'Microsoft/Edge/Application/msedge.exe']
    browser_path=args.browser_path or next((str(path) for path in candidates if path.exists()),None)
    if not browser_path:parser.error('Informe --browser-path.')
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Handler,directory=str(REPO)))
    Thread(target=server.serve_forever,daemon=True).start()
    try:asyncio.run(test(f'http://127.0.0.1:{server.server_port}/',args,browser_path))
    finally:server.shutdown();server.server_close()

if __name__=='__main__':main()
