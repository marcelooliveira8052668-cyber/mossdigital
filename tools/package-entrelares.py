"""Prepara imagem social, capa 1080x1350, copia local e ZIP da EntreLares. Nao faz push."""
from pathlib import Path
from PIL import Image
import base64,shutil,subprocess,uuid,zipfile,struct

repo=Path(__file__).resolve().parents[1];root=repo.parent;source=repo/'demos/entrelares'
presentation=root/'04 - Divulgacao/EntreLares - Apresentacao e Instagram';presentation.mkdir(parents=True,exist_ok=True)
folder='EntreLares - Agencia de Profissionais'
local=root/'02 - Demos de sites'/folder
temp=Path.home()/'AppData/Local/Temp/opencode'

# Eu uso a captura real dos testes como previa; nao invento fotos de candidatos ou clientes.
image=Image.open(presentation/'01 - Site EntreLares.png').convert('RGB')
image.crop((0,0,image.width,int(image.width*630/1200))).resize((1200,630),Image.Resampling.LANCZOS).save(source/'assets/social.png')
preview=base64.b64encode((presentation/'01 - Site EntreLares.png').read_bytes()).decode()
cover=f'''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>MOSS Digital — EntreLares</title><style>*{{box-sizing:border-box}}html,body{{margin:0;width:1080px;height:1350px;overflow:hidden}}body{{background:#44374f;color:#fff8ef;font-family:'Segoe UI',Arial,sans-serif;padding:66px 70px}}header{{display:flex;justify-content:space-between;align-items:center;font-size:18px;letter-spacing:2px}}header b{{font-size:32px;letter-spacing:-1px}}header span{{color:#edc6ae}}.tag{{display:inline-block;background:#edc6ae;color:#44374f;padding:12px 20px;font-size:18px;font-weight:800;border-radius:4px;margin-top:48px}}h1{{font-size:74px;line-height:1.06;letter-spacing:-3px;margin:27px 0 20px}}h1 em{{font-family:Georgia,serif;font-weight:400;font-style:normal;color:#edc6ae}}.sub{{font-size:27px;line-height:1.5;color:#e3d6e2;margin:0 0 30px}}.screen{{background:#fff;border:1px solid #8d7d92;border-radius:16px;overflow:hidden;box-shadow:0 25px 70px #0004}}.bar{{height:32px;background:#f1e8e2;color:#51465a;display:flex;align-items:center;padding-left:16px;font-size:13px}}.screen img{{display:block;width:100%;height:458px;object-fit:cover;object-position:top}}.chips{{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}}.chips span{{border:1px solid #8d7d92;padding:9px 14px;border-radius:28px;font-size:18px}}.call{{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #ffffff40;margin-top:29px;padding-top:27px}}.call strong{{font-size:26px}}.call b{{background:#edc6ae;color:#44374f;padding:16px 22px;border-radius:7px;font-size:21px}}footer{{font-size:15px;color:#cbbccd;margin-top:26px;line-height:1.5}}</style><header><b>MOSS <span>DIGITAL</span></b><span>PROFISSIONAIS PARA A SUA CASA</span></header><div class="tag">ENTRELARES · NOVA DEMONSTRAÇÃO</div><h1>Alguém de confiança<br>para <em>sua casa.</em></h1><p class="sub">Diarista, passadeira, cozinheira e organização.<br>Dois caminhos: preciso de ajuda e quero trabalhar.</p><div class="screen"><div class="bar">Prévia real do modelo EntreLares</div><img src="data:image/png;base64,{preview}" alt="Prévia de demonstração do site EntreLares"></div><div class="chips"><span>Diarista e passadeira</span><span>Cozinha e organização</span><span>Sem banco de currículos</span></div><div class="call"><strong>Um site útil.<br>Uma identidade só sua.</strong><b>Conheça os modelos ↗</b></div><footer><strong>mossdigital.com.br</strong> · Layout demonstrativo personalizável.<br>Dados fictícios · Artes autorais · Sem contratação automática.</footer></html>'''
html=presentation/'06 - Capa Instagram EntreLares.html';html.write_text(cover,encoding='utf-8')
png=presentation/'06 - Capa Instagram EntreLares.png'
profile=temp/('entrelares-cover-'+uuid.uuid4().hex[:10]);edge=Path(r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')
if not edge.exists():edge=Path(r'C:\Program Files\Microsoft\Edge\Application\msedge.exe')
try:
    subprocess.run([str(edge),'--headless=new','--disable-gpu','--no-first-run','--hide-scrollbars','--force-device-scale-factor=1',f'--user-data-dir={profile}','--virtual-time-budget=1800','--window-size=1080,1350',f'--screenshot={png}',html.as_uri()],capture_output=True,timeout=60,check=True)
finally:shutil.rmtree(profile,ignore_errors=True)
assert png.exists() and struct.unpack('>II',png.read_bytes()[16:24])==(1080,1350)
publish=repo/'divulgacao/instagram/entrelares';publish.mkdir(parents=True,exist_ok=True)
for p in [png,html]:shutil.copy2(p,publish/p.name)
caption='''ENTRELARES — MOSS DIGITAL

Alguém de confiança para cuidar da sua casa: conheça nossa demonstração de site para pedir um trabalhador doméstico — diarista, passadeira, cozinheira, organização e auxiliar. Veja as categorias e teste os dois caminhos — "Preciso de ajuda em casa" e "Quero trabalhar" — em um formulário guiado em três etapas.

Teste o modelo: https://mossdigital.com.br/demos/entrelares/
Peça uma proposta de personalização para o seu negócio em mossdigital.com.br.

Demonstração fictícia da MOSS Digital. Não há agência em funcionamento, candidatos, vagas ou contratação: os formulários montam um resumo local e o contato é com a MOSS. Não envie documentos ou dados reais.

Publique o PNG 1080 x 1350. Use o link na bio; links em legendas não são clicáveis.
Texto alternativo: Capa da MOSS Digital com prévia do modelo EntreLares e chamada "Alguém de confiança para sua casa", com diarista, passadeira, cozinheira e organização.
'''
(presentation/'LEGENDA E INSTRUCOES.txt').write_text(caption,encoding='utf-8')
(publish/'LEGENDA E INSTRUCOES.txt').write_text(caption,encoding='utf-8')

shutil.copytree(source,local,dirs_exist_ok=True)
package=root/'05 - Entregas/Pacotes para entregar - EntreLares';package.mkdir(parents=True,exist_ok=True)
zipname=package/(folder+'.zip')
with zipfile.ZipFile(zipname,'w',zipfile.ZIP_DEFLATED) as z:
    for p in source.rglob('*'):
        if p.is_file() and '__pycache__' not in p.parts:z.write(p,Path(folder)/p.relative_to(source))
with zipfile.ZipFile(zipname) as z:assert z.testzip() is None
publicpackage=repo/'entregas/entrelares';publicpackage.mkdir(parents=True,exist_ok=True)
shutil.copy2(zipname,publicpackage/zipname.name)
shutil.copy2(source/'ENTREGA-AO-CLIENTE.md',publicpackage/'LEIA-ANTES-DE-ENTREGAR.md')
print('Capa, imagem social, copia local e ZIP preparados. Pasta local:',local)
