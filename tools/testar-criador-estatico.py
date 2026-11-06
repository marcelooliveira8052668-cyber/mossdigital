"""Criador no site publicado: domínio estático sem servidor, sem /api, sem backend.

Simula o GitHub Pages servindo _repo-site em mossdigital.test e percorre o
fluxo inteiro: a prévia do passo 3 é montada no próprio navegador.
"""
import asyncio
from datetime import datetime
import json
from pathlib import Path
import struct
import tempfile
import zipfile
from urllib.parse import urlparse
import zlib
from playwright.async_api import async_playwright, expect

FERRAMENTAS = Path(__file__).resolve().parent
SITE = FERRAMENTAS.parent
SAIDA = SITE.parents[0] / '10 - Plataforma MOSS' / 'versao-local' / 'verificacao'
DOMINIO = 'http://mossdigital.test/'


def png_bytes(color=(40, 90, 160), size=(8, 8)):
    def chunk(tag, data):
        block = tag + data
        return struct.pack('>I', len(data)) + block + struct.pack('>I', zlib.crc32(block) & 0xffffffff)
    raw = b''.join(b'\x00' + bytes(color) * size[0] for _ in range(size[1]))
    return (b'\x89PNG\r\n\x1a\n'
            + chunk(b'IHDR', struct.pack('>IIBBBBB', size[0], size[1], 8, 2, 0, 0, 0))
            + chunk(b'IDAT', zlib.compress(raw)) + chunk(b'IEND', b''))


async def main():
    checks = []; errors = []; externas = []; faltando = []; api404 = []; failure = None
    leads = []
    SAIDA.mkdir(parents=True, exist_ok=True)
    def check(name, ok): checks.append({'teste': name, 'passou': bool(ok)})
    with tempfile.TemporaryDirectory(dir=Path.home() / 'AppData/Local/Temp/opencode') as temp:
        temp = Path(temp)
        try:
            async with async_playwright() as p:
                browser = await p.chromium.launch(executable_path='C:/Program Files/Google/Chrome/Application/chrome.exe')
                try:
                    context = await browser.new_context(viewport={'width': 1440, 'height': 900})

                    async def servir(route):
                        url = route.request.url
                        if url.endswith('/rest/v1/rpc/moss_criador_registrar'):
                            await route.fulfill(status=200, content_type='application/json', body='{"id":"teste-local"}')
                            return
                        if url.endswith('/rest/v1/rpc/moss_criador_capturar_lead'):
                            data = route.request.post_data_json
                            leads.append(data)
                            await route.fulfill(status=200, content_type='application/json',
                                                body=('{"erro":"temporariamente indisponível"}'
                                                      if data['p_produto'] == 'portfolio'
                                                      else '{"id":"lead-teste","recebido":true}'))
                            return
                        if not url.startswith(DOMINIO):
                            externas.append(url)
                            await route.abort()
                            return
                        caminho = urlparse(url).path
                        if caminho.endswith('/'):
                            caminho += 'index.html'
                        arquivo = (SITE / caminho.lstrip('/')).resolve()
                        if str(arquivo).startswith(str(SITE.resolve())) and arquivo.is_file():
                            await route.fulfill(path=str(arquivo))
                        else:
                            (api404 if caminho.startswith('/api/') else faltando).append(caminho)
                            await route.fulfill(status=404, body='não encontrado')

                    await context.route('**/*', servir)
                    page = await context.new_page(); page.set_default_timeout(10000)
                    page.on('pageerror', lambda e: errors.append(str(e)))
                    page.on('console', lambda m: errors.append(m.text) if m.type == 'error' else None)
                    live = page.frame_locator('#live')

                    await page.goto(DOMINIO + 'criar/index.html', wait_until='networkidle')
                    await page.locator('[data-page="0"]').wait_for(state='visible')
                    check('A página do criador abre no domínio publicado', True)

                    check('Grade e painel vivo ativos por caminho relativo',
                          await page.locator('#creator-grid').evaluate("el => el.classList.contains('on')")
                          and await page.locator('#live-wrap').is_visible())
                    await expect(live.locator('body')).to_have_css('background-color', 'rgb(245, 243, 239)')
                    check('Folha do documento carrega sem servidor', True)

                    await page.check('input[name="produto"][value="site"]')
                    await page.click('#next')
                    await page.locator('[data-page="1"]').wait_for(state='visible')
                    check('Editor de site tem sete blocos preenchíveis',
                          await page.locator('#site-editor details').count() == 7
                          and await page.locator('#site-slot-nome #nome').count() == 1
                          and await page.locator('#site-slot-contato #contato').count() == 1)
                    await page.click('#example')
                    await page.fill('#nome', 'Padaria Central')
                    await page.select_option('#entrega', 'ambos')
                    await expect(live.locator('.site-brand')).to_have_text('Padaria Central')
                    await expect(live.locator('.site-hero h1')).to_have_text('Uma apresentação do que meu negócio oferece')
                    check('Prévia ao vivo espelha no site publicado', True)

                    foto = temp / 'foto-teste.png'
                    foto.write_bytes(png_bytes())
                    await page.locator('#site-editor details').nth(4).locator('summary').click()
                    await page.set_input_files('#fotos', str(foto))
                    await expect(live.locator('.site-gallery figure')).to_have_count(1)
                    check('Foto escolhida dentro do bloco 05 entra na galeria', True)

                    await page.click('#next')
                    await page.locator('[data-page="2"]').wait_for(state='visible')
                    await page.click('#next')
                    await page.locator('[data-page="3"]').wait_for(state='visible')
                    previa = page.frame_locator('#preview')
                    await expect(previa.locator('.site-brand')).to_have_text('Padaria Central')
                    check('Prévia do passo 3 montada no próprio navegador', True)
                    await expect(previa.locator('.preview')).to_contain_text('PRÉVIA GRÁTIS')
                    check('Prévia estática avisa que não foi publicada', True)
                    await expect(previa.locator('.site-gallery img')).to_have_count(1)
                    check('Foto aparece na prévia final', True)
                    suporte = page.locator('.preview-support a')
                    href = await suporte.get_attribute('href') or ''
                    check('Suporte da prévia abre WhatsApp sem enviar dados preenchidos',
                          await suporte.is_visible()
                          and href.startswith('https://wa.me/5511942038103?text=')
                          and 'Padaria' not in href
                          and await suporte.get_attribute('target') == '_blank'
                          and 'noopener' in (await suporte.get_attribute('rel') or ''))
                    await page.set_viewport_size({'width': 390, 'height': 844})
                    await suporte.scroll_into_view_if_needed()
                    check('Suporte acessível no celular sem rolagem horizontal',
                          await suporte.is_visible()
                          and await page.evaluate('document.documentElement.scrollWidth <= innerWidth'))
                    await page.screenshot(path=str(SAIDA / 'criador-suporte-celular.png'))
                    await page.set_viewport_size({'width': 1440, 'height': 900})
                    await expect(page.locator('#order-price')).to_have_text('Download grátis, na hora')
                    check('Download gratuito sem Pix', await page.locator('#pix-panel').count() == 0)
                    await page.click('#btn-baixar')
                    check('Nome e WhatsApp são exigidos antes do download',
                          'nome' in (await page.locator('#lead-status').inner_text()).lower()
                          and await page.locator('#download-done').is_hidden())
                    await page.fill('#lead-nome', 'Cliente Teste')
                    await page.fill('#lead-whats', '(11) 99999-9999')
                    await page.click('#btn-baixar')
                    check('Captura só ocorre com autorização explícita',
                          'autorização' in (await page.locator('#lead-status').inner_text()).lower()
                          and not leads)
                    await page.check('#lead-consent')
                    async with page.expect_download() as download_event:
                        await page.click('#btn-baixar')
                    download = await download_event.value
                    zip_path = temp / download.suggested_filename
                    await download.save_as(zip_path)
                    with zipfile.ZipFile(zip_path) as archive:
                        assert archive.testzip() is None
                        files = {name.split('/', 1)[-1]: archive.read(name) for name in archive.namelist()}
                        html_site = files['index.html'].decode('utf-8')
                        check('ZIP do site contém HTML, CSS, foto e guia de publicação',
                              {'index.html', 'css/estilo.css', 'img/foto-1.jpg', 'COMO-PUBLICAR.html'} <= files.keys())
                        check('Arquivo é publicável e mantém crédito apenas no site',
                              'src="img/foto-1.jpg"' in html_site
                              and 'href="css/estilo.css"' in html_site
                              and 'data:image/' not in html_site
                              and 'noindex' not in html_site
                              and 'Site criado com a MOSS Digital' in html_site)
                        check('Guia inclui domínio, DNS e WhatsApp de suporte',
                              all(x in files['COMO-PUBLICAR.html'].decode('utf-8')
                                  for x in ('domínio', 'DNS', 'wa.me/5511942038103')))
                    check('Pós-download oferece suporte e demo',
                          await page.locator('#download-done').is_visible()
                          and await page.locator('#whats-demo-pos').is_visible())
                    await expect(page.locator('#lead-status')).to_contain_text('Contato recebido')
                    check('Contato real envia somente nome, WhatsApp, tipo e chave autorizados',
                          len(leads) == 1
                          and set(leads[0]) == {'p_chave', 'p_nome', 'p_whatsapp', 'p_produto'}
                          and leads[0]['p_nome'] == 'Cliente Teste'
                          and leads[0]['p_whatsapp'] == '11999999999')
                    await page.screenshot(path=str(SAIDA / 'criador-estatico.png'), full_page=True)

                    await page.click('#back')
                    await page.locator('[data-page="2"]').wait_for(state='visible')
                    check('Voltar funciona no site publicado',
                          await page.locator('#creator-grid').evaluate("el => el.classList.contains('on')"))
                    check('Suporte some ao voltar da prévia', await suporte.is_hidden())

                    check('Nenhum arquivo local faltando', not faltando)
                    check('Só /api/... responde 404 (esperado sem backend)',
                          all(caminho.startswith('/api/') for caminho in api404)
                          and '/api/criador/pix' not in api404)
                    check('Sem erros JavaScript ou CSP', not errors)
                    check('Sem chamadas a terceiros', not externas)
                    check('Sem armazenamento no navegador',
                          await page.evaluate('localStorage.length===0 && sessionStorage.length===0')
                          and len(await context.cookies()) == 0)

                    await page.click('.header .back')
                    await page.locator('#hero-title').wait_for(state='visible')
                    check('Botão de voltar leva para a página principal', True)
                    await page.goto(DOMINIO + 'criar/index.html', wait_until='networkidle')
                    await page.check('input[name="produto"][value="curriculo"]')
                    await page.click('#next')
                    check('Catálogo CBO carregado no site estático para o currículo',
                          await page.locator('#occupation').is_visible()
                          and await page.locator('#area-context').is_hidden()
                          and await page.locator('#occupation-list option').count() > 2500)
                    await page.fill('#occupation', 'Enfermeiro')
                    check('Exemplos de currículo acompanham profissão pesquisada',
                          'Enfermeiro' in await page.locator('#example-titulo').inner_text())
                    await page.fill('#nome', 'Ana Oliveira')
                    await page.fill('#titulo', 'Enfermeira')
                    await page.fill('#apresentacao', 'Atendimento humanizado.')
                    await page.click('#next')
                    await page.locator('[data-page="2"]').wait_for(state='visible')
                    await page.click('#next')
                    await page.locator('[data-page="3"]').wait_for(state='visible')
                    await page.fill('#lead-nome', 'Ana Oliveira')
                    await page.fill('#lead-whats', '(11) 98888-7777')
                    await page.check('#lead-consent')
                    async with page.expect_download() as cv_event:
                        await page.click('#btn-baixar')
                    cv_download = await cv_event.value
                    cv_path = temp / cv_download.suggested_filename
                    await cv_download.save_as(cv_path)
                    with zipfile.ZipFile(cv_path) as archive:
                        cv_files = {name.split('/', 1)[-1]: archive.read(name) for name in archive.namelist()}
                        cv_html = cv_files['index.html'].decode('utf-8')
                        check('Currículo entrega HTML imprimível com guia para PDF',
                              'LEIA-ME.html' in cv_files and 'css/estilo.css' in cv_files
                              and 'SALVAR COMO PDF' in cv_html
                              and '@media print' in cv_files['css/estilo.css'].decode('utf-8'))
                        check('Arquivo do currículo não contém marca MOSS nem noindex',
                              'MOSS Digital' not in cv_html and 'noindex' not in cv_html)
                    await page.goto(DOMINIO + 'criar/index.html', wait_until='networkidle')
                    await page.check('input[name="produto"][value="portfolio"]')
                    await page.click('#next')
                    await page.fill('#occupation', 'Fotógrafo')
                    check('Portfólio não mostra menu curto e sugere fotografia',
                          await page.locator('#area-context').is_hidden()
                          and 'Ensaio de família' in await page.locator('#example-itens').inner_text())
                    check('Portfólio começa com visual natural',
                          await page.locator('input[name="modelo"]:checked').get_attribute('value') == 'natural')
                    await page.fill('#nome', 'Joana Silva')
                    await page.fill('#titulo', 'Fotografia que conta histórias')
                    await page.fill('#apresentacao', 'Retratos e ensaios fotográficos.')
                    await page.fill('#itens', 'Retratos autorais\nEnsaios de família')
                    await page.fill('#contato', 'joana@example.com')
                    await expect(live.locator('.portfolio-hero h1')).to_have_text('Fotografia que conta histórias')
                    await page.click('#next')
                    await page.locator('[data-page="2"]').wait_for(state='visible')
                    await page.set_input_files('#fotos', str(foto))
                    await expect(live.locator('.portfolio-gallery figure')).to_have_count(1)
                    await page.click('#next')
                    await page.locator('[data-page="3"]').wait_for(state='visible')
                    portfolio = page.frame_locator('#preview')
                    check('Portfólio com apresentação, projetos e contato próprios',
                          await portfolio.locator('.portfolio-top').count() == 1
                          and await portfolio.locator('#projetos article').count() == 2
                          and await portfolio.locator('#contato').count() == 1
                          and await portfolio.locator('.portfolio-art img').count() == 1
                           and await portfolio.locator('#galeria figure').count() == 1)
                    await page.fill('#lead-nome', 'Joana Silva')
                    await page.fill('#lead-whats', '11999999999')
                    await page.check('#lead-consent')
                    async with page.expect_download() as portfolio_event:
                        await page.click('#btn-baixar')
                    portfolio_download = await portfolio_event.value
                    portfolio_zip = temp / portfolio_download.suggested_filename
                    await portfolio_download.save_as(portfolio_zip)
                    with zipfile.ZipFile(portfolio_zip) as archive:
                        portfolio_html = archive.read(next(name for name in archive.namelist() if name.endswith('/index.html'))).decode('utf-8')
                    check('Portfólio entregue sem crédito no rodapé',
                          'Site criado com a MOSS Digital' not in portfolio_html and 'noindex' not in portfolio_html)
                    await expect(page.locator('#lead-status')).to_contain_text('não recebeu seu contato')
                    check('Falha de captura não bloqueia o ZIP e não é tratada como sucesso',
                          await page.locator('#download-done').is_visible())
                    await page.set_viewport_size({'width': 390, 'height': 844})
                    check('Portfólio sem rolagem horizontal no celular',
                          await page.evaluate('document.documentElement.scrollWidth <= innerWidth')
                          and await portfolio.locator('html').evaluate('el => el.scrollWidth <= innerWidth'))
                finally:
                    await browser.close()
        except Exception as e:
            failure = str(e)
        finally:
            result = {'executado_em': datetime.now().astimezone().isoformat(), 'testes': checks,
                      'erros': errors, 'externas': externas, 'faltando': faltando, 'api404': api404,
                      'falha': failure,
                      'aprovado_nestes_testes': failure is None and bool(checks) and all(c['passou'] for c in checks)}
            (SAIDA / 'resultado-criador-estatico.json').write_text(
                json.dumps(result, ensure_ascii=False, indent=2), encoding='utf-8')
            print(json.dumps(result, ensure_ascii=False, indent=2))
    if not result['aprovado_nestes_testes']:
        raise SystemExit(1)


if __name__ == '__main__':
    asyncio.run(main())
