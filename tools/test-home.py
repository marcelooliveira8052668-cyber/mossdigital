"""Regressão da home unificada: catálogo, imagens, vídeo e acesso por teclado."""
import argparse
import json
import os
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.parse import unquote, urlsplit
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent


class Quiet(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


class Server(ThreadingHTTPServer):
    request_queue_size = 128


def test(base, output, browser_path, axe_path):
    errors, failed, requests, checks = [], [], [], []
    inventory = json.loads((ROOT/'assets/data/catalogo-unificado.json').read_text(encoding='utf-8'))
    total = len(inventory)
    assert total == 127, total
    source = (ROOT/'index.html').read_text(encoding='utf-8')
    assert '.moss-local/' not in source and '127.0.0.1' not in source and 'localhost' not in source
    assert 'noindex' not in source
    with sync_playwright() as p:
        browser = p.chromium.launch(executable_path=browser_path) if browser_path else p.chromium.launch(channel='msedge')
        page = browser.new_page(viewport={'width':1440,'height':1000}, reduced_motion='reduce')
        page.on('pageerror', lambda error: errors.append(str(error)))
        page.on('response', lambda r: failed.append(r.url) if r.status >= 400 and r.url.startswith(base) else None)
        page.on('request', lambda r: requests.append(r.url))
        page.goto(base, wait_until='networkidle')
        assert page.locator('h1').count() == 1
        assert page.locator('main').count() == 1
        ids = page.locator('[id]').evaluate_all('(els)=>els.map(el=>el.id)')
        assert len(ids) == len(set(ids)), 'IDs duplicados'
        json.loads(page.locator('script[type="application/ld+json"]').inner_text())
        assert page.locator('link[rel="canonical"]').get_attribute('href') == 'https://mossdigital.com.br/'
        assert page.locator('.main-nav a').all_text_contents() == ['Demos','Serviços','Contato']
        assert page.locator('#cards > article').count() == total
        assert page.locator('#cards > article:visible').count() == total
        assert page.locator('#cards > article details').count() == total
        assert page.locator('#modelos').get_attribute('data-carousel-motion') == 'paused'
        checks.append('127 demos em HTML, carrossel, menu único, semântica e metadados válidos; movimento reduzido respeitado')

        # Compara todos os destinos com o inventário aprovado, não só as primeiras demos.
        actual = page.locator('#cards > article').evaluate_all('''cards=>cards.map(c=>({
          category:c.dataset.category,
          demo:c.querySelector('.demo-cover').getAttribute('href'),
          image:c.querySelector('img').getAttribute('src')
        }))''')
        expected = [{'category':m['category'],'demo':m['demo'],'image':m['image']} for m in inventory]
        assert actual == expected
        assert len({m['demo'] for m in actual}) == total
        links = page.locator('a[href],img[src],link[href],source[src],track[src],video[poster],script[src]').evaluate_all('''els=>els.map(el=>el.getAttribute('href')||el.getAttribute('src')||el.getAttribute('poster'))''')
        for link in links:
            url = urlsplit(link)
            if url.scheme or url.netloc:
                if url.netloc == 'wa.me':
                    assert url.path == '/5511942038103', link
                continue
            if url.path:
                target = ROOT / unquote(url.path).lstrip('/')
                assert target.exists(), link
            elif url.fragment:
                assert url.fragment in ids, link
        checks.append('127 destinos e capas idênticos ao inventário; arquivos, âncoras e WhatsApp válidos')

        assert page.locator('video').count() == 1
        assert page.locator('video').get_attribute('preload') == 'none'
        assert page.locator('video').get_attribute('autoplay') is None
        assert not any('.mp4' in r for r in requests), 'Download de vídeo antes da interação'
        assert page.locator('video').evaluate('(v)=>v.paused')
        page.keyboard.press('Tab')
        assert page.locator('.skip').evaluate('(el)=>el===document.activeElement')
        page.keyboard.press('Enter')
        assert urlsplit(page.url).fragment == 'conteudo'
        summary = page.locator('.transcript summary')
        summary.focus()
        page.keyboard.press('Enter')
        assert page.locator('.transcript').get_attribute('open') is not None
        page.keyboard.press('Enter')
        assert page.locator('.transcript').get_attribute('open') is None
        checks.append('atalho e transcrição operáveis por teclado; vídeo só baixa após interação')

        # O teste não depende de rolagem para solicitar as imagens fora da primeira página.
        page.locator('#cards img').evaluate_all('(imgs)=>imgs.forEach(i=>{i.loading="eager"})')
        page.wait_for_function('[...document.querySelectorAll("#cards img")].every(i=>i.complete)', timeout=60000)
        broken = page.locator('#cards img').evaluate_all('(imgs)=>imgs.filter(i=>!i.naturalWidth).map(i=>i.src)')
        assert not broken, broken
        checks.append('127 fotos carregadas no navegador, inclusive cards escondidos; nenhuma quebrada')

        search = page.locator('#busca-modelo')
        search.fill('clinica')
        found = page.locator('#cards > article:visible').count()
        assert found > 0
        search.fill('CLÍNICA')
        assert page.locator('#cards > article:visible').count() == found
        page.locator('#categoria-modelo').select_option('Alimentação')
        search.fill('pizza')
        assert page.locator('#cards > article:visible').count() == 1
        search.fill('clinica')
        assert page.locator('#cards > article:visible').count() == 0
        assert page.locator('[data-empty]').is_visible()
        page.locator('[data-reset]').click()
        assert page.locator('#cards > article:visible').count() == total
        # Todas as demos continuam no trilho; as setas e o teclado mudam a posição.
        rail=page.locator('#cards')
        page.locator('[data-next]').click()
        page.wait_for_function('document.querySelector("#cards").scrollLeft>100')
        rail.focus();rail.press('End')
        page.wait_for_function('document.querySelector("#cards").scrollLeft>=document.querySelector("#cards").scrollWidth-document.querySelector("#cards").clientWidth-3')
        rail.press('Home')
        page.wait_for_function('document.querySelector("#cards").scrollLeft<3')
        search.fill('zzzzinexistente')
        assert page.locator('[data-empty]').is_visible()
        page.locator('[data-reset]').click()
        assert page.locator('#cards > article:visible').count() == total
        search.fill('academia')
        search.press('Escape')
        assert search.input_value() == ''
        checks.append('busca sem acentos, categoria combinada, vazio, limpar, Esc e carrossel por setas/teclado com todas as 127 demos')

        for width in [1440,1024,768,390,320]:
            page.set_viewport_size({'width':width,'height':900})
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
            if width in [1440,390]:
                page.evaluate("scrollTo({top:0,behavior:'instant'})")
                page.screenshot(path=str(output/f'home-{width}.png'),full_page=True)
        checks.append('sem rolagem horizontal em 320, 390, 768, 1024 e 1440 px')

        # Movimento contínuo real, em contexto sem redução de movimento.
        automatic=browser.new_context(reduced_motion='no-preference',viewport={'width':1440,'height':1000})
        animated=automatic.new_page()
        animated.goto(base,wait_until='networkidle')
        animated.evaluate('document.querySelector("#cards").scrollIntoView({block:"center",behavior:"instant"})')
        animated.wait_for_function('document.querySelector("#cards").scrollLeft>50',timeout=12000)
        animated.locator('.carousel-play').click()
        assert animated.locator('#modelos').get_attribute('data-carousel-motion')=='paused'
        before=animated.locator('#cards').evaluate('(r)=>r.scrollLeft')
        animated.clock.install();animated.clock.fast_forward(6000)
        assert abs(animated.locator('#cards').evaluate('(r)=>r.scrollLeft')-before)<3
        automatic.close()
        checks.append('deslizamento automático contínuo avança e para ao pausar')

        page.locator('video').evaluate('(v)=>{v.muted=true;return v.play()}')
        page.wait_for_function('document.querySelector("video").currentTime>.2')
        assert page.locator('video').evaluate('(v)=>Math.abs(v.duration-30)<.1')
        page.wait_for_function('document.querySelector("track").readyState===2')
        assert page.locator('video').evaluate('(v)=>v.textTracks[0].cues.length') == 6
        page.locator('video').evaluate('(v)=>v.pause()')
        checks.append('vídeo de sete capas: 30 segundos, reprodução e seis legendas disponíveis')

        page.goto(base+'modelos.html',wait_until='networkidle')
        page.wait_for_url('**/#modelos')
        assert page.locator('#cards > article').count() == total
        checks.append('endereço antigo modelos.html encaminha para a home unificada')
        nojs = browser.new_context(java_script_enabled=False,viewport={'width':390,'height':844})
        fallback = nojs.new_page()
        fallback.goto(base,wait_until='networkidle')
        assert fallback.locator('#cards > article:visible').count() == total
        fallback.locator('.transcript summary').click()
        assert fallback.locator('.transcript').get_attribute('open') is not None
        assert fallback.locator('#contato a[href*="wa.me"]').count() == 1
        fallback.goto(base+'modelos.html',wait_until='networkidle')
        fallback.wait_for_url('**/#modelos')
        checks.append('sem JavaScript: 127 demos, detalhes, contato e encaminhamento acessíveis')
        if axe_path:
            page.goto(base,wait_until='networkidle')
            page.add_script_tag(path=str(axe_path))
            audit = page.evaluate('''async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa']}});return {violations:r.violations,passes:r.passes.length}}''')
            (output/'axe.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2),encoding='utf-8')
            assert not audit['violations'], audit['violations']
            checks.append('auditoria automática axe sem violações nos critérios verificados')
        assert not errors, errors
        assert not failed, failed
        browser.close()
    report = {'checks':checks,'runtime_errors':errors,'local_http_errors':failed}
    (output/'testes-pagina-inicial.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2),flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path,required=True)
    parser.add_argument('--browser-path')
    parser.add_argument('--axe-path',type=Path)
    args = parser.parse_args()
    args.output.mkdir(parents=True,exist_ok=True)
    server = Server(('127.0.0.1',0),partial(Quiet,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start()
    try:
        test(f'http://127.0.0.1:{server.server_port}/',args.output,args.browser_path,args.axe_path)
    finally:
        server.shutdown()
        server.server_close()


if __name__ == '__main__':
    main()
