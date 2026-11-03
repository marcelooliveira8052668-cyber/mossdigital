"""Prepara arquivos independentes, capa e links do Restaurante 360. Não faz push."""
from pathlib import Path
from PIL import Image
import base64,shutil,subprocess,uuid,zipfile,struct
from urllib.parse import quote

repo=Path(__file__).resolve().parents[1];root=repo.parent;source=repo/'restaurante-360'
presentation=root/'04 - Divulgacao/Restaurante 360 - Apresentacao e Capas';presentation.mkdir(parents=True,exist_ok=True)
local=root/'02 - Demos de sites/Restaurante 360 - Operacao Mista'
temp=Path.home()/'AppData/Local/Temp/opencode'

# Eu uso as capturas dos testes para criar imagens reais da interface, não fotos de clientes.
image=Image.open(presentation/'01 - Vitrine do restaurante.png').convert('RGB')
image.crop((0,0,image.width,int(image.width*630/1200))).resize((1200,630),Image.Resampling.LANCZOS).save(source/'assets/social.png')
preview=base64.b64encode((presentation/'03 - Painel da operacao.png').read_bytes()).decode()
cover=f'''<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>MOSS Digital — Restaurante 360</title><style>*{{box-sizing:border-box}}html,body{{margin:0;width:1080px;height:1350px;overflow:hidden}}body{{background:#183d30;color:#f5f0e5;font-family:'Segoe UI',Arial,sans-serif;padding:66px 70px}}header{{display:flex;justify-content:space-between;align-items:center;font-size:18px;letter-spacing:2px}}header b{{font-size:32px;letter-spacing:-1px}}header span{{color:#dceab4}}.tag{{display:inline-block;background:#e8d6b9;color:#183d30;padding:12px 20px;font-size:18px;font-weight:800;border-radius:4px;margin-top:48px}}h1{{font-size:77px;line-height:1.05;letter-spacing:-3px;margin:27px 0 20px}}h1 em{{font-family:Georgia,serif;font-weight:400;color:#dceab4}}.sub{{font-size:27px;line-height:1.5;color:#d4decc;margin:0 0 30px}}.screen{{background:#fff;border:1px solid #c6d3bb;border-radius:16px;overflow:hidden;box-shadow:0 25px 70px #0004}}.bar{{height:32px;background:#e8d6b9;color:#183d30;display:flex;align-items:center;padding-left:16px;font-size:13px}}.screen img{{display:block;width:100%;height:458px;object-fit:cover;object-position:top}}.chips{{display:flex;gap:12px;flex-wrap:wrap;margin-top:28px}}.chips span{{border:1px solid #c6d3bb;padding:9px 14px;border-radius:28px;font-size:18px}}.call{{display:flex;justify-content:space-between;align-items:center;border-top:1px solid #ffffff40;margin-top:29px;padding-top:27px}}.call strong{{font-size:26px}}.call b{{background:#dceab4;color:#183d30;padding:16px 22px;border-radius:7px;font-size:21px}}footer{{font-size:15px;color:#c6d3bb;margin-top:26px;line-height:1.5}}</style><header><b>MOSS <span>DIGITAL</span></b><span>GASTRONOMIA + TECNOLOGIA</span></header><div class="tag">RESTAURANTE 360 · NOVA DEMONSTRAÇÃO</div><h1>Muito além<br><em>do cardápio.</em></h1><p class="sub">À la carte, buffet por peso e rodízio.<br>Uma experiência integrada para conhecer e testar.</p><div class="screen"><div class="bar">Prévia real da demonstração operacional · Brasa &amp; Oliva</div><img src="data:image/png;base64,{preview}" alt="Prévia do painel operacional do restaurante"></div><div class="chips"><span>Salão</span><span>Cozinha e bar</span><span>Caixa</span><span>Estoque</span><span>Gestão</span></div><div class="call"><strong>mossdigital.com.br</strong><b>Conheça o projeto ↗</b></div><footer>Modelo fictício personalizável. Operação local de demonstração.<br>Pagamentos, emissão fiscal e sincronização real exigem integrações próprias.</footer></html>'''
html=presentation/'07 - Capa Instagram Restaurante 360.html';html.write_text(cover,encoding='utf-8')
png=presentation/'07 - Capa Instagram Restaurante 360.png'
profile=temp/('restaurant-cover-'+uuid.uuid4().hex[:10]);edge=Path(r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe')
if not edge.exists():edge=Path(r'C:\Program Files\Microsoft\Edge\Application\msedge.exe')
try:
    subprocess.run([str(edge),'--headless=new','--disable-gpu','--no-first-run','--hide-scrollbars','--force-device-scale-factor=1',f'--user-data-dir={profile}','--virtual-time-budget=1800','--window-size=1080,1350',f'--screenshot={png}',html.as_uri()],capture_output=True,timeout=60,check=True)
finally:shutil.rmtree(profile,ignore_errors=True)
assert png.exists() and struct.unpack('>II',png.read_bytes()[16:24])==(1080,1350)
publish=repo/'divulgacao/instagram/restaurante360';publish.mkdir(parents=True,exist_ok=True)
for p in [png,html]:shutil.copy2(p,publish/p.name)
caption='''RESTAURANTE 360 — MOSS DIGITAL

Muito além do cardápio: conheça nossa demonstração de restaurante com à la carte, buffet por peso e rodízio. Explore salão, cozinha e bar, caixa, estoque e gestão em uma experiência com identidade própria.

Teste o projeto: https://mossdigital.com.br/restaurante-360/
Peça uma proposta de personalização para o seu negócio em mossdigital.com.br.

Demonstração local com dados fictícios. Não processa pagamentos, não emite documentos fiscais nem sincroniza aparelhos. Operação real depende de infraestrutura e integrações contratadas separadamente.

Publique o PNG 1080 x 1350. Use o link na bio; links em legendas não são clicáveis.
Texto alternativo: Capa da MOSS Digital com prévia do painel de um restaurante, chamada Muito além do cardápio e módulos salão, cozinha e bar, caixa, estoque e gestão.
'''
(presentation/'LEGENDA E INSTRUCOES.txt').write_text(caption,encoding='utf-8');(publish/'LEGENDA E INSTRUCOES.txt').write_text(caption,encoding='utf-8')

(source/'LEIA-ME.txt').write_text('''RESTAURANTE 360 — BRASA & OLIVA — MOSS DIGITAL

1. Abra index.html para conhecer o site do restaurante.
2. Abra painel.html para testar a operação. Escolha sessão temporária ou salvamento local opcional.
3. Use Como testar para ver os seis passos do fluxo completo.
4. A mesa pode misturar à la carte, buffet por peso e rodízio.
5. Leia ENTREGA-AO-CLIENTE.md antes de vender, adaptar ou entregar.

Dados e marca fictícios. Não há autenticação segura, pagamentos reais, emissão fiscal ou sincronização multiusuário.
Não use dados reais. O protótipo sozinho não substitui um sistema de produção de grande restaurante.

Os perfis são de demonstração, sem senha. Teste Garçom, Cozinha, Bar, Caixa e Gerente pelo seletor no alto.
O estoque começa com saldos fictícios já ajustados para duas mesas de exemplo.
O backup JSON é apenas para exportação e conferência; não há importação no painel.

Os testes técnicos podem ser executados com Node.js:
node engine.test.cjs
node browser.test.cjs
O teste de navegador exige Windows, Edge e Node com WebSocket global.
''',encoding='utf-8')
(source/'DADOS-DO-CLIENTE.txt').write_text('''DADOS PARA PERSONALIZAR O RESTAURANTE 360

- Identificação comercial e responsável legal; nome, marca e domínio.
- Endereços, áreas e capacidade de mesas, horários e contatos reais.
- Fotos autorizadas e textos aprovados.
- Produtos, preços e disponibilidade do à la carte.
- Buffet: preço/kg, regras de tara, balança e controle de porções.
- Rodízio: preço adulto/infantil, faixa etária, dias e condições.
- Ingredientes, alergênicos, receitas e rendimentos verificados.
- Estoque, unidades-base, fornecedores e rotinas de compra e perdas.
- Regras de serviço opcional, descontos, cancelamentos e fechamento de caixa.
- Reservas, fila, horários, capacidade e regras de não comparecimento.
- Delivery: regiões, taxas, canais, entregadores e condições de retirada.
- Funções da equipe, equipamentos, impressoras e número de terminais.
- Meios de pagamento, provedor e requisitos fiscais validados com profissionais adequados.
- Privacidade, segurança, suporte, manutenção e backup.

A demo não oferece edição pública por um cliente autenticado. O seletor de perfis é aberto apenas para apresentação; não é login.
Servidor, banco de dados, sincronização, autenticação, integrações e homologação devem ter escopo e orçamento separados.
Não publique documentos pessoais, senhas ou chaves privadas. Leia ENTREGA-AO-CLIENTE.md.
''',encoding='utf-8')
url='https://mossdigital.com.br/restaurante-360/'
(source/'LINK-PARA-CLIENTE.txt').write_text(url+'\nPainel: '+url+'painel.html\n\nDisponível após publicação. Demonstração fictícia; explique limites antes de compartilhar.\n',encoding='utf-8')
(source/'Abrir demo online.url').write_text('[InternetShortcut]\nURL='+url+'\n',encoding='utf-8')
shutil.copytree(source,local,dirs_exist_ok=True)
package=root/'05 - Entregas/Pacotes para entregar - Restaurante 360';package.mkdir(parents=True,exist_ok=True)
zipname=package/'Restaurante 360 - Demonstracao Completa.zip'
with zipfile.ZipFile(zipname,'w',zipfile.ZIP_DEFLATED) as z:
    for p in source.rglob('*'):
        if p.is_file() and '__pycache__' not in p.parts:z.write(p,Path('Restaurante 360')/p.relative_to(source))
with zipfile.ZipFile(zipname) as z:assert z.testzip() is None
publicpackage=repo/'entregas/restaurante360';publicpackage.mkdir(parents=True,exist_ok=True)
shutil.copy2(zipname,publicpackage/zipname.name)
shutil.copy2(source/'ENTREGA-AO-CLIENTE.md',publicpackage/'LEIA-ANTES-DE-ENTREGAR.md')
print('Capa, imagem social, documentos e ZIP preparados. Pasta local:',local)
