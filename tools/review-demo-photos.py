"""Valida as fotos nas demos e gera capas atualizadas, sem publicar.

Requer Playwright para Python, Chrome/Edge e ffmpeg. A fonte editável das capas
fica em divulgacao/instagram/fotos-reais/Capa Instagram.html.
Use --overwrite para regenerar somente os arquivos conhecidos desta entrega.
"""
import argparse
import asyncio
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import shutil
import subprocess
from threading import Thread
from playwright.async_api import async_playwright

ROOT=Path(__file__).resolve().parent.parent
SOCIAL=ROOT/'divulgacao/instagram/fotos-reais'
DEMOS=json.loads((ROOT/'assets/img/demo-photos/DEMOS.json').read_text(encoding='utf-8'))

class Handler(SimpleHTTPRequestHandler):
    def log_message(self,*args): pass
    def copyfile(self,source,outputfile):
        try:super().copyfile(source,outputfile)
        except (BrokenPipeError,ConnectionAbortedError,ConnectionResetError):pass

async def run(base,args,browser_path):
    errors=[]; http_errors=[]; checks=[]; audits=[]
    async with async_playwright() as p:
        browser=await p.chromium.launch(executable_path=browser_path)
        context=await browser.new_context(reduced_motion='reduce',color_scheme='dark',viewport={'width':1600,'height':1000})
        page=await context.new_page()
        page.on('pageerror',lambda error:errors.append(str(error)))
        page.on('response',lambda response:http_errors.append(response.url) if response.status>=400 and response.url.startswith(base) else None)
        for demo in DEMOS:
            await page.set_viewport_size({'width':1600,'height':1000})
            await page.goto(base+demo['path'],wait_until='networkidle')
            await page.wait_for_function('document.documentElement.dataset.mossPhotos === "ready"')
            photos=page.locator('img[src*="/demo-photos/"]')
            photo_count=await photos.count()
            assert photo_count>0,demo['slug']
            await page.evaluate('''async()=>{for(let y=0;y<document.body.scrollHeight;y+=1000){scrollTo(0,y);await new Promise(r=>setTimeout(r,25));}scrollTo(0,0)}''')
            await page.wait_for_function("Array.from(document.images).filter(img=>img.src.includes('/demo-photos/')).every(img=>img.complete&&img.naturalWidth>0)")
            for width in [1600,768,390,320]:
                await page.set_viewport_size({'width':width,'height':900})
                assert await page.evaluate('document.documentElement.scrollWidth <= innerWidth'),f"Transbordamento: {demo['slug']} em {width}"
                if width==390:
                    await page.evaluate('scrollTo(0,0)')
                    await page.screenshot(path=str(args.output/(demo['slug']+'-celular.jpg')),type='jpeg',quality=75)
            await page.set_viewport_size({'width':1600,'height':1000})
            await page.evaluate('scrollTo(0,0)')
            # Desativa apenas movimento de entrada na captura, sem mudar o conteúdo.
            await page.add_style_tag(content='[data-reveal],.revela{opacity:1!important;transform:none!important;transition:none!important;animation:none!important}')
            if args.axe_path and demo['slug'] in ['floricultura','casamento','contabilidade']:
                await page.add_script_tag(path=str(args.axe_path))
                audit=await page.evaluate('''async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return{violations:r.violations,passes:r.passes.length}}''')
                audits.append({'demo':demo['slug'],**audit})
                (args.output/'acessibilidade-fotos.json').write_text(json.dumps(audits,ensure_ascii=False,indent=2),encoding='utf-8')
                assert not audit['violations'],json.dumps(audits[-1],ensure_ascii=False)
            thumbnail=ROOT/'assets/img/previas'/('foto-'+demo['slug']+'.webp')
            cover=SOCIAL/('Capa Instagram - '+demo['slug']+'.png')
            for target in [thumbnail,cover,args.output/cover.name]:
                if target.exists() and not args.overwrite:raise FileExistsError(str(target))
            capture=await page.screenshot(type='png')
            subprocess.run(['ffmpeg','-hide_banner','-loglevel','error','-y' if args.overwrite else '-n','-i','pipe:0','-frames:v','1','-c:v','libwebp','-quality','82',str(thumbnail)],input=capture,check=True)
            await page.set_viewport_size({'width':1080,'height':1350})
            await page.goto(base+'divulgacao/instagram/fotos-reais/Capa%20Instagram.html?demo='+demo['slug'],wait_until='networkidle')
            await page.wait_for_function('document.body.dataset.ready === "true"')
            dimensions=await page.evaluate('''()=>({w:document.documentElement.scrollWidth,h:document.documentElement.scrollHeight,items:Array.from(document.querySelector('.cover').children).map(el=>({top:el.getBoundingClientRect().top,bottom:el.getBoundingClientRect().bottom}))})''')
            assert dimensions['w']==1080 and dimensions['h']==1350,dimensions
            assert all(0<=item['top']<=item['bottom']<=1350 for item in dimensions['items']),dimensions
            assert all(dimensions['items'][i]['bottom']<=dimensions['items'][i+1]['top']+1 for i in range(len(dimensions['items'])-1)),dimensions
            await page.screenshot(path=str(cover))
            shutil.copy2(cover,args.output/cover.name)
            caption=(f"Conheça {demo['name']}, um modelo MOSS Digital para {demo['segment'].lower()}.\n\nExplore a demonstração e converse sobre uma versão para a sua marca.\n🌐 mossdigital.com.br\n\nFotos ilustrativas de banco de imagens; não são clientes, equipe, local, produtos ou trabalhos da marca fictícia. Não implica endosso das pessoas retratadas. Sem operações, pagamentos ou confirmações reais. Recursos finais definidos por orçamento.\n\n#MOSSDigital #CriacaoDeSites #PresencaDigital\n\nDESTINO PLANEJADO: https://mossdigital.com.br/{demo['path']}\nConfirmar que a versão com fotos foi aprovada e publicada antes de divulgar.\n")
            (args.output/('Legenda - '+demo['slug']+'.txt')).write_text(caption,encoding='utf-8')
            (SOCIAL/('Legenda - '+demo['slug']+'.txt')).write_text(caption,encoding='utf-8')
            checks.append({'demo':demo['slug'],'photos':photo_count,'layouts':[1600,768,390,320],'cover':'1080x1350'})
            print('DEMO_E_CAPA: '+demo['slug'],flush=True)
        await page.goto(base+'modelos.html',wait_until='networkidle')
        await page.wait_for_function('document.documentElement.dataset.mossPhotos === "ready"')
        assert await page.locator('img.moss-photo-catalog').count()>=len(DEMOS)
        await page.goto(base+'estrutura.html',wait_until='networkidle')
        assert await page.locator('img[src*="/demo-photos/"]').count()==0
        assert not errors,errors
        assert not http_errors,http_errors
        await browser.close()
    report={'checks':checks,'runtime_errors':errors,'local_http_errors':http_errors,'catalog':'com fotos','wireframe':'preservado sem fotos'}
    (args.output/'TESTES-FOTOS.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
    print(json.dumps(report,ensure_ascii=False,indent=2))

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output',type=Path,required=True)
    parser.add_argument('--overwrite',action='store_true')
    parser.add_argument('--axe-path',type=Path)
    parser.add_argument('--browser-path')
    args=parser.parse_args();args.output.mkdir(parents=True,exist_ok=True)
    choices=[Path(os.environ.get('PROGRAMFILES','C:/Program Files'))/'Google/Chrome/Application/chrome.exe',Path(os.environ.get('PROGRAMFILES(X86)','C:/Program Files (x86)'))/'Microsoft/Edge/Application/msedge.exe']
    browser_path=args.browser_path or next((str(p) for p in choices if p.exists()),None)
    if not browser_path:parser.error('Informe --browser-path.')
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Handler,directory=str(ROOT)))
    Thread(target=server.serve_forever,daemon=True).start()
    try:asyncio.run(run(f'http://127.0.0.1:{server.server_port}/',args,browser_path))
    finally:server.shutdown();server.server_close()

if __name__=='__main__':main()
