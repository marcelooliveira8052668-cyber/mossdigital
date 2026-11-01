"""Exporta capas 4:5, imagens sociais e pacotes independentes a partir das demos testadas."""
from pathlib import Path
import importlib.util
import base64, subprocess, uuid, shutil, struct, zipfile
from PIL import Image

REPO=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('builder',REPO/'tools/build-community-demos.py')
builder=importlib.util.module_from_spec(spec);spec.loader.exec_module(builder)
root=REPO.parent
out=root/'Capas Instagram - Utilidade e Empreendedorismo'
shots=out/'Previas dos sites'
publish=REPO/'divulgacao/instagram/utilidade-empreendedorismo'
publish.mkdir(parents=True,exist_ok=True)
temp=Path.home()/'AppData/Local/Temp/opencode'
edge=Path(r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')
if not edge.exists():edge=Path(r'C:\Program Files\Microsoft\Edge\Application\msedge.exe')
titles={
'reciclo':('01 - Reciclagem e Ecopontos','Menos descarte.\nMais possibilidades.','Um site para conectar pessoas e iniciativas de reciclagem.'),
'junto':('02 - Voluntariado e Impacto','Boas causas merecem\num bom encontro.','Um site para apresentar projetos e aproximar voluntários.'),
'raizfeira':('03 - Feira de Produtores','Da feira para\na sua próxima venda.','Catálogo, cesta e consulta de pedido para pequenos produtores.'),
'pontocomum':('04 - Coworking','Seu espaço pode\nabrir novos caminhos.','Apresente ambientes e facilite a consulta de reservas.'),
'acessoaberto':('05 - Guia de Acessibilidade','Mais informação.\nMais autonomia.','Um guia para explorar recursos de acessibilidade com clareza.')
}
captions=['# Cinco novos modelos — MOSS Digital','', 'Capas em PNG, 1080 × 1350 (4:5). Publique as imagens, não os arquivos HTML. As marcas e dados das demos são fictícios. Não apresente os modelos como clientes reais.', '']
coverpaths=[]
for i,c in enumerate(builder.COLLECTION,1):
    name,title,subtitle=titles[c['id']]
    shot=shots/(c['id']+'-desktop.png')
    image=Image.open(shot).convert('RGB')
    # Eu uso a prévia real como imagem social; não crio fotos ou resultados fictícios.
    social=image.crop((0,0,image.width,min(image.height,int(image.width*630/1200))))
    social=social.resize((1200,630),Image.Resampling.LANCZOS)
    social.save(REPO/'demos'/c['id']/'assets/social.png')
    encoded='data:image/png;base64,'+base64.b64encode(shot.read_bytes()).decode()
    title=title.replace('\n','<br>')
    html=f'''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Capa Instagram — {c['brand']}</title>
<style>*{{box-sizing:border-box}}html,body{{margin:0;width:1080px;height:1350px;overflow:hidden}}body{{font-family:'Segoe UI',Arial,sans-serif;background:{c['color']};color:white;padding:64px 70px;position:relative}}body:before{{content:'';position:absolute;right:-140px;top:-210px;width:650px;height:650px;border:1px solid {c['accent']}60;border-radius:50%;z-index:-1}}header{{display:flex;justify-content:space-between;align-items:center;font-size:18px;letter-spacing:2px}}header strong{{font-size:31px;letter-spacing:-1px}}header b{{color:{c['accent']}}}.tag{{display:inline-block;margin-top:48px;background:{c['accent']};color:{c['color']};font-size:18px;font-weight:800;letter-spacing:1px;padding:12px 20px;border-radius:5px}}h1{{font-size:72px;font-weight:750;line-height:1.08;letter-spacing:-3px;margin:25px 0 18px}}.sub{{font-size:26px;line-height:1.45;color:#ffffffe0;max-width:900px;margin:0 0 30px;min-height:76px}}.screen{{border:1px solid #ffffff65;border-radius:17px;overflow:hidden;background:white;box-shadow:0 25px 65px #0003}}.bar{{height:34px;background:#f4f2ed;color:#50605a;display:flex;align-items:center;padding:0 16px;gap:8px;font-size:13px}}.bar i{{width:8px;height:8px;border-radius:50%;background:#a3afa8}}.bar span{{margin-left:14px}}.screen img{{width:100%;height:462px;object-fit:cover;object-position:top;display:block}}.bottom{{display:flex;justify-content:space-between;align-items:center;margin-top:30px;gap:20px}}.bottom p{{font-size:25px;line-height:1.4;margin:0}}.button{{background:{c['accent']};color:{c['color']};font-size:22px;font-weight:800;padding:19px 24px;border-radius:8px;white-space:nowrap}}footer{{border-top:1px solid #ffffff40;margin-top:28px;padding-top:22px;display:flex;justify-content:space-between;align-items:center;gap:20px}}footer strong{{font-size:26px}}footer span{{font-size:16px;color:#ffffffbf;max-width:320px;text-align:right;line-height:1.4}}</style>
<header><strong>MOSS <b>DIGITAL</b></strong><span>NOVA COLEÇÃO · {i:02d}/05</span></header><div class="tag">{c['folder'].upper()}</div><h1>{title}</h1><p class="sub">{subtitle}</p><div class="screen"><div class="bar"><i></i><i></i><i></i><span>Prévia real do modelo {c['brand']}</span></div><img src="{encoded}" alt="Prévia de demonstração do site"></div><div class="bottom"><p>Um site útil.<br>Uma identidade só sua.</p><div class="button">Conheça os modelos ↗</div></div><footer><strong>mossdigital.com.br</strong><span>Layout demonstrativo personalizável.<br>Dados fictícios · Artes autorais.</span></footer></html>'''
    source=out/(name+'.html');source.write_text(html,encoding='utf-8')
    png=out/(name+'.png')
    cmd=[str(edge),'--headless=new','--disable-gpu','--no-first-run','--hide-scrollbars',f'--user-data-dir={temp / ("community-cover-"+uuid.uuid4().hex[:10])}','--force-device-scale-factor=1','--virtual-time-budget=1800','--window-size=1080,1350',f'--screenshot={png}',source.as_uri()]
    result=subprocess.run(cmd,capture_output=True,timeout=60)
    assert png.exists() and png.stat().st_size>20000,result.stderr[-500:]
    assert struct.unpack('>II',png.read_bytes()[16:24])==(1080,1350)
    shutil.copy2(png,publish/png.name)
    shutil.copy2(source,publish/source.name)
    coverpaths.append(png)
    captions.extend([f'## {i}. {c["folder"]}',f'Conheça o modelo {c["brand"]}, criado pela MOSS Digital. {subtitle} Layout personalizável para sua organização ou negócio. A demonstração usa dados fictícios e não confirma pedidos, inscrições ou reservas.',f'Experimente: https://mossdigital.com.br/demos/{c["id"]}/index.html','Peça uma proposta em mossdigital.com.br. Use o link na bio: links em legendas não são clicáveis.',f'Texto alternativo sugerido: Capa da MOSS Digital com a prévia do modelo de site para {c["folder"].lower()} e chamada para conhecer os modelos.',''])
    local=builder.LOCAL/c['folder'];shutil.copytree(REPO/'demos'/c['id'],local,dirs_exist_ok=True)
    print('Capa 1080x1350 e imagem social prontas:',c['id'],flush=True)

(out/'LEGENDAS-E-INSTRUCOES.md').write_text('\n'.join(captions),encoding='utf-8')
shutil.copy2(out/'LEGENDAS-E-INSTRUCOES.md',publish/'LEGENDAS-E-INSTRUCOES.md')
sheet=Image.new('RGB',(1080,540),'#e8e8e8')
for i,png in enumerate(coverpaths):sheet.paste(Image.open(png).convert('RGB').resize((216,270),Image.Resampling.LANCZOS),(i*216,135))
sheet.save(out/'PREVIA-DAS-5-CAPAS.jpg',quality=90)

packages=root/'Pacotes para entregar - Utilidade e Empreendedorismo';packages.mkdir(exist_ok=True)
publicpackages=REPO/'entregas/utilidade-empreendedorismo';publicpackages.mkdir(parents=True,exist_ok=True)
for c in builder.COLLECTION:
    source=REPO/'demos'/c['id'];target=packages/(c['folder']+'.zip')
    with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED) as archive:
        for p in source.rglob('*'):
            if p.is_file():archive.write(p,Path(c['folder'])/p.relative_to(source))
    shutil.copy2(target,publicpackages/target.name)
    with zipfile.ZipFile(target) as archive:assert archive.testzip() is None
instructions='''# Pacotes independentes para personalização

Os cinco ZIPs contêm HTML, CSS, JavaScript, artes, privacidade, termos e checklist de implantação. Extraia o ZIP e abra index.html na pasta extraída; não abra o HTML ainda dentro do arquivo compactado.

São demonstrações funcionais com dados fictícios, não operações prontas para receber clientes reais sem configuração. Antes de entregar, revise ENTREGA-AO-CLIENTE.md, substitua dados e contatos, adapte as políticas e configure integrações necessárias. Não há backend, confirmação de vagas, pagamento, agenda real ou gestão de estoque compartilhada.

O material de Instagram está em Capas Instagram - Utilidade e Empreendedorismo, na pasta principal da MOSS. No repositório: divulgacao/instagram/utilidade-empreendedorismo/.
'''
(packages/'LEIA-ANTES-DE-ENTREGAR.md').write_text(instructions,encoding='utf-8')
(publicpackages/'LEIA-ANTES-DE-ENTREGAR.md').write_text(instructions,encoding='utf-8')
print('Cinco capas e cinco ZIPs verificados.',flush=True)
