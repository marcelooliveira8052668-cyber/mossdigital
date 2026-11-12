"""Gera capas de Instagram a partir das próprias demos, uma identidade por segmento."""
from pathlib import Path
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from threading import Thread
from io import BytesIO
from PIL import Image
from playwright.sync_api import sync_playwright
import shutil

REPO=Path(__file__).resolve().parent.parent  # Raiz mossdigital usada como servidor local.
OUT=REPO/'divulgacao/instagram'  # Fontes editáveis, PNG e legendas.
COPY=REPO.parent/'04 - Divulgacao'  # Cópia de fácil acesso pedida pelo proprietário.

# Cada demonstração tem cores, título e segmento próprios, extraídos do próprio projeto.
DEMOS=[
  {'slug':'academia-pulse','rota':'academia-pulse/','nome':'PULSE Academia','segmento':'ACADEMIA E BEM-ESTAR','fundo':'#16201b','acento':'#d5fa36','texto':'#f8f9f5','sub':'Estrutura completa, da musculação à piscina.','recursos':['FOTOS CLICÁVEIS','PISCINA E LUTAS','PLANOS E HORÁRIOS']},
  {'slug':'moss-vision-prime','rota':'demos/moss-vision-prime/','nome':'MOSS Vision Prime','segmento':'ÓTICA E ESTILO','fundo':'#101114','acento':'#d7b779','texto':'#f7f6f2','sub':'Ótica com curadoria e atendimento organizado.','recursos':['CATÁLOGO DE MARCAS','CONSULTAS','ÁREA DO CLIENTE']},
  {'slug':'moss-home-prime','rota':'demos/moss-home-prime/','nome':'MOSS Home Prime','segmento':'MÓVEIS E DECORAÇÃO','fundo':'#11120f','acento':'#c6a876','texto':'#f6f1e7','sub':'Catálogo de móveis com espaços por ambiente.','recursos':['CATÁLOGO','FILTROS E FAVORITOS','CARRINHO WHATSAPP']},
  {'slug':'moss-city','rota':'demos/moss-city/','nome':'MOSS City','segmento':'GESTÃO URBANA','fundo':'#071525','acento':'#00d4ff','texto':'#eaf7ff','sub':'Painel urbano com dados e indicadores de cidade.','recursos':['MAPA E DADOS','INDICADORES','OPERAÇÃO DEMONSTRATIVA']},
  {'slug':'moss-edu','rota':'demos/moss-edu/','nome':'MOSS Edu','segmento':'GESTÃO ESCOLAR','fundo':'#0a2342','acento':'#bfff00','texto':'#f5f7fa','sub':'Rotina escolar com turmas, notas e secretaria.','recursos':['TURMAS E NOTAS','COMUNICAÇÃO','PAINEL LOCAL']},
  {'slug':'moss-agro','rota':'demos/moss-agro/','nome':'MOSS Agro','segmento':'GESTÃO RURAL','fundo':'#14532d','acento':'#d4a017','texto':'#f8fafc','sub':'Campo, safras e gestão rural em um só lugar.','recursos':['SAFRAS E TALHÕES','CUSTOS','RELATÓRIOS']},
  {'slug':'moss-sports','rota':'demos/moss-sports/','nome':'MOSS Sports','segmento':'LOJA ESPORTIVA','fundo':'#071a30','acento':'#bfff00','texto':'#f5f7f9','sub':'Loja esportiva com produtos, variantes e carrinho.','recursos':['CATÁLOGO ESPORTIVO','VARIANTES','PEDIDO VIA WHATSAPP']},
]

class Quiet(SimpleHTTPRequestHandler):
    def log_message(self,*args):
        pass  # Sem ruído de requisições na saída.

HTML='''<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<!-- Fonte editável da capa: 1080 x 1350 px, sem depender da demo. -->
<title>Capa Instagram - {nome}</title><style>
*{{box-sizing:border-box}} body{{margin:0;width:1080px;height:1350px;overflow:hidden;background:{fundo};color:{texto};font-family:Arial,Helvetica,sans-serif}}
.poster{{position:relative;width:1080px;height:1350px;padding:60px 64px;overflow:hidden}}
.grid{{position:absolute;inset:0;background-image:linear-gradient(#ffffff08 1px,transparent 1px),linear-gradient(90deg,#ffffff08 1px,transparent 1px);background-size:68px 68px}}
.glow{{position:absolute;right:-180px;top:-140px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,{acento}2e,transparent 70%)}}
header{{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #ffffff26;padding-bottom:22px;position:relative}}
.agency{{font-weight:900;font-size:21px;letter-spacing:3px}} .agency span{{color:{acento}}}
.tag{{font-size:10px;letter-spacing:2px;border:1px solid #ffffff40;padding:11px 15px}}
.eyebrow{{position:relative;margin:44px 0 22px;font-size:12px;letter-spacing:3.5px;color:{acento};font-weight:700}}
h1{{position:relative;font-size:{titulo_tamanho}px;line-height:.98;margin:0;letter-spacing:-3px;font-weight:900;overflow-wrap:anywhere}}
.sub{{position:relative;margin-top:26px;font-size:21px;line-height:1.55;color:#ffffffd9;max-width:820px}}
.browser{{position:relative;margin:44px 0 0;height:560px;border:1px solid #ffffff3d;box-shadow:0 36px 70px #00000059;background:#0d0f12;overflow:hidden}}
.chrome{{height:34px;display:flex;align-items:center;gap:7px;padding:0 15px;border-bottom:1px solid #ffffff1f;background:#ffffff0d}}
.chrome i{{width:7px;height:7px;border-radius:50%;background:#ffffff40}} .chrome i:first-child{{background:{acento}}}
.chrome small{{margin:auto;padding-right:42px;font-size:8px;letter-spacing:2px;color:#ffffff9e}}
.browser img{{width:100%;height:526px;object-fit:cover;object-position:top;display:block}}
.features{{position:relative;display:flex;justify-content:space-between;gap:16px;margin-top:34px;border-bottom:1px solid #ffffff26;padding-bottom:22px;font-size:10px;letter-spacing:1px}}
.features b{{color:{acento};font-size:15px;margin-right:6px}}
.bottom{{position:relative;display:flex;justify-content:space-between;align-items:flex-end;margin-top:28px}}
.bottom strong{{font-size:34px;line-height:1.15;letter-spacing:-.5px}} .bottom span{{color:{acento}}}
.arrow{{font-size:60px;color:{acento};line-height:1}}
.legal{{position:absolute;bottom:30px;left:64px;right:64px;font-size:9px;letter-spacing:.6px;color:#ffffffa8;line-height:1.7}}
.line{{position:absolute;bottom:0;left:0;right:0;height:9px;background:{acento}}}
</style></head><body><main class="poster"><div class="grid"></div><div class="glow"></div>
<header><div class="agency">MOSS<span> DIGITAL</span></div><div class="tag">{segmento}</div></header>
<p class="eyebrow">DEMONSTRAÇÃO DE SITE / {segmento}</p>
<h1>{nome}</h1><p class="sub">{sub}</p>
<div class="browser"><div class="chrome"><i></i><i></i><i></i><small>CAPTURA DA PRÓPRIA DEMONSTRAÇÃO</small></div><img src="captura-demo.webp" alt="Captura real da demonstração {nome}"></div>
<div class="features">{recursos}</div>
<div class="bottom"><strong>SEU NEGÓCIO<br><span>PRONTO PARA O PRÓXIMO PASSO.</span></strong><div class="arrow">↗</div></div>
<p class="legal">CONCEITO MOSS DIGITAL • PROJETO DEMONSTRATIVO • SEM DADOS REAIS DE CLIENTES OU OPERAÇÕES</p>
<div class="line"></div></main></body></html>'''

LEGENDA='''{nome} — CAPA INSTAGRAM

STATUS: arte preparada para análise. A criação da capa não autoriza postagem nas redes sociais.
Formato: PNG de 1080 x 1350 px (4:5).
Fonte editável: Capa Instagram - {nome}.html
Imagem: captura-demo.webp, captura real da própria demonstração ({rota}).

LEGENDA SUGERIDA

{nome}. Um projeto de site para {segmento}, criado pela MOSS Digital.

Cada demonstração tem identidade, navegação e recursos próprios, pensados para o celular e o computador, com foco em clareza e experiência de uso.

⚠️ Projeto demonstrativo. Marcas, dados, clientes e resultados são fictícios ou ilustrativos. Sem operação real, cadastro ou banco de dados conectado.

#MOSSDigital #WebDesign #SitesProfessionais #DesignResponsivo #{segmento}

ENDEREÇO
Conferir o endereço público da demonstração antes de divulgar. Não usar localhost nem inventar link.

IDENTIDADE
A capa usa a captura da própria demo e as cores do projeto. Editar textos no HTML e recriar o PNG na medida 1080 x 1350. Manter a identificação de demonstração e evitar depoimentos, números de registro ou resultados inventados.
'''

def main():
    server=ThreadingHTTPServer(('127.0.0.1',0),partial(Quiet,directory=str(REPO)))  # Servidor apenas local.
    Thread(target=server.serve_forever,daemon=True).start()  # Temporário durante a geração.
    base=f'http://127.0.0.1:{server.server_port}'  # Endereço interno, nunca divulgado.
    OUT.mkdir(parents=True,exist_ok=True)  # Cria a pasta de divulgação se necessário.
    with sync_playwright() as p:
        browser=p.chromium.launch(channel='msedge')  # Renderização igual à das demos.
        for demo in DEMOS:
            folder=OUT/demo['slug']  # Pasta individual de cada demo.
            folder.mkdir(parents=True,exist_ok=True)  # Guarda fonte, PNG e legenda.
            page=browser.new_page(viewport={'width':1280,'height':900},device_scale_factor=1,reduced_motion='reduce')  # Evita captura com animação pela metade.
            page.goto(base+'/'+demo['rota'],wait_until='networkidle')  # Abre a própria demo.
            page.wait_for_timeout(700)  # Espera a tipografia e as imagens assentarem.
            shot=page.screenshot()  # Foto real da interface da demo.
            Image.open(BytesIO(shot)).convert('RGB').save(folder/'captura-demo.webp','WEBP',quality=90)  # Guarda a captura usada na arte.
            features='<span><b>↗</b> %s</span><span><b>↗</b> %s</span><span><b>↗</b> %s</span>'%tuple(demo['recursos'])  # Três diferenciais da demo.
            # Nomes longos recebem tipografia menor para caber na arte sem corte.
            tamanho=82 if len(demo['nome'])<=13 else 66 if len(demo['nome'])<=18 else 54
            source=folder/f'Capa Instagram - {demo["nome"]}.html'
            source.write_text(HTML.format(nome=demo['nome'],segmento=demo['segmento'],fundo=demo['fundo'],acento=demo['acento'],texto=demo['texto'],sub=demo['sub'],recursos=features,titulo_tamanho=tamanho),encoding='utf-8')  # Fonte editável com a identidade da demo.
            page.set_viewport_size({'width':1080,'height':1350})  # Medida exata do feed.
            page.goto(base+'/divulgacao/instagram/'+demo['slug']+'/'+source.name.replace(' ','%20'),wait_until='networkidle')  # Renderiza a fonte.
            assert page.evaluate('document.documentElement.scrollWidth')==1080  # Garante que o texto cabe.
            page.screenshot(path=str(folder/f'Capa Instagram - {demo["nome"]}.png'))  # PNG final 4:5.
            (folder/'LEGENDA E INSTRUCOES.txt').write_text(LEGENDA.format(nome=demo['nome'],segmento=demo['segmento'].lower(),rota=demo['rota']),encoding='utf-8')  # Legenda pronta e honesta.
            page.close()  # Libera memória entre demos.
            print(f'Capa criada: {demo["nome"]}')  # Confirma progresso por demo.
        browser.close()  # Encerra o navegador.
    server.shutdown()  # Não deixa servidor aberto.
    for demo in DEMOS:
        folder=OUT/demo['slug'];target=COPY/demo['nome']  # Pasta com o nome da demo na divulgação.
        target.mkdir(parents=True,exist_ok=True)  # Cópia fácil de encontrar.
        for file in folder.iterdir():
            shutil.copy2(file,target/file.name)  # Preserva fonte, PNG, captura e legenda.
    print('Capas geradas e copiadas para 04 - Divulgacao. Nenhuma publicação nas redes sociais.')

if __name__=='__main__':
    main()  # Execução manual pela raiz do repositório.
