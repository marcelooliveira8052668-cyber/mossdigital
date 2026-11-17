"""Retry das substituições que não encontraram candidato."""
import json,re,time,urllib.parse,urllib.request
from pathlib import Path
from PIL import Image,ImageOps

HOME=Path(r"C:\Users\Sylvia Camillo"); CLONE=HOME/"mossdigital-publicacao"
UA="MOSS-Digital-demo/1.0 (mossdigital.com.br)"; EVITAR=("wikimedia.org","wikipedia.org")
TROCAS=[
 ("topo-prime","foto06",["theodolite","surveying tripod instrument"],"Instrumento de topografia em tripé"),
 ("pericia-prime","foto01",["forensic documents","document examination evidence"],"Exame forense de documentos"),
 ("pericia-prime","foto06",["clipboard paperwork","inspection report document"],"Prancheta com relatório"),
 ("elevatech-prime","foto03",["elevator mechanic","lift engineer technician"],"Técnico em manutenção de elevador"),
 ("elevatech-prime","foto04",["elevator buttons","elevator control panel"],"Painel de controle do elevador"),
 ("biocontrol-prime","foto01",["exterminator pest control","pest control worker"],"Profissional de controle de pragas"),
 ("biocontrol-prime","foto02",["rat trap","mouse trap device"],"Armadilha para roedores"),
 ("ecoanalytics-prime","foto06",["water sampling","water sample bottle"],"Coleta de amostra de água"),
 ("aquacare-prime","foto06",["pool cleaning","swimming pool maintenance"],"Equipamento de limpeza de piscina"),
]
def buscar(termo):
 url="https://api.openverse.org/v1/images/?"+urllib.parse.urlencode({"q":termo,"page_size":20,"license":"cc0,by,by-sa"})
 for a in (3,7,15):
  try:
   req=urllib.request.Request(url,headers={"User-Agent":UA})
   with urllib.request.urlopen(req,timeout=60) as r: return json.load(r).get("results",[])
  except Exception as e:
   print("    aguardando",a,str(e)[:60]);time.sleep(a)
 return []
def baixar(url,d):
 for a in (3,7,15):
  try:
   req=urllib.request.Request(url,headers={"User-Agent":UA})
   with urllib.request.urlopen(req,timeout=120) as r,open(d,"wb") as f: f.write(r.read())
   return True
  except Exception as e:
   print("    aguardando",a,str(e)[:60]);time.sleep(a)
 return False

agrupado={}
for demo,slug,termos,desc in TROCAS: agrupado.setdefault(demo,[]).append((slug,termos,desc))

for demo,trocas in agrupado.items():
 print("\n==",demo)
 fd=CLONE/"demos"/demo/"img"/"fotos"; aj=fd/"fontes.json"
 regs=json.loads(aj.read_text(encoding="utf-8"))
 for slug,termos,desc in trocas:
  item=None
  for termo in termos:
   for c in buscar(termo):
    u=str(c.get("url",""))
    if not u.startswith("http") or any(x in u for x in EVITAR) or c.get("mature"): continue
    if c.get("width",0)<600 or c.get("height",0)<400: continue
    if any(x.get("url_imagem")==u for x in regs): continue
    item=c;break
   time.sleep(0.6)
   if item: break
  if not item:
   print("  sem candidato:",slug);continue
  bruto=fd/(slug+".tmp")
  if not baixar(item["url"],bruto):
   print("  falhou:",slug);continue
  with Image.open(bruto) as im:
   ImageOps.fit(im.convert("RGB"),(1200,800),Image.LANCZOS).save(fd/(slug+".webp"),"WEBP",quality=80,method=6)
  bruto.unlink(missing_ok=True)
  novo={"arquivo":"img/fotos/"+slug+".webp","legenda":"Imagem ilustrativa — não representa a empresa fictícia",
   "titulo_original":(item.get("title","") or "Imagem ilustrativa")[:110],
   "fonte":item.get("foreign_landing_url") or item.get("detail_url") or "",
   "licenca":(item.get("license","?")+" "+str(item.get("license_version",""))).strip(),
   "autor":item.get("creator") or "?","url_imagem":item["url"],"descricao":desc}
  regs=[r for r in regs if r["arquivo"]!=novo["arquivo"]]+[novo]
  print("  trocado:",slug,"->",desc)
  time.sleep(0.7)
 aj.write_text(json.dumps(regs,ensure_ascii=False,indent=2),encoding="utf-8")

 cards=[]
 for r in regs:
  cards.append('      <figure class="foto-item">\n'
   f'        <img src="{r["arquivo"]}" alt="{r["descricao"]}" width="1200" height="800" loading="lazy" decoding="async">\n'
   f'        <figcaption>{r["descricao"]}<small>Imagem ilustrativa · {r["licenca"]}</small></figcaption>\n'
   '      </figure>')
 secao=('  <!-- Galeria de fotografias licenciadas — não representam a empresa fictícia -->\n'
  '  <section class="secao secao--fundo" id="fotografias"><div class="container">\n'
  '    <div class="cabecalho-secao centro">\n'
  '      <span class="eyebrow">Fotografias ilustrativas</span>\n'
  '      <h2 class="titulo-secao">Fotografias ilustrativas</h2>\n'
  '      <p class="subtitulo-secao">Imagens de referência licenciadas, com fonte e licença registradas.</p>\n'
  '    </div>\n'
  '    <div class="fotos-grid">\n'+"\n".join(cards)+'\n    </div>\n'
  '    <p class="fotos-aviso">⚠ Estas fotografias são imagens de referência licenciadas. '
  'Não representam a empresa fictícia, sua equipe, instalações ou trabalhos reais.</p>\n'
  '  </div></section>\n\n')
 for p in [HOME/demo/"index.html",CLONE/"demos"/demo/"index.html"]:
  h=p.read_text(encoding="utf-8")
  h=re.sub(r'  <!-- Galeria de fotografias licenciadas.*?</section>\n\n',secao,h,flags=re.S)
  p.write_text(h,encoding="utf-8")
 linhas=["## Fotografias ilustrativas licenciadas","","Imagens via Openverse (CC0/CC BY/CC BY-SA), otimizadas em WebP. Não representam a empresa fictícia.","",
  "| Arquivo | Descrição | Fonte | Licença | Autor |","|---|---|---|---|---|"]
 for r in regs:
  f=r["fonte"];fm=f"[ver fonte]({f})" if f.startswith("http") else f
  linhas.append(f"| `{r['arquivo']}` | {r['descricao']} | {fm} | {r['licenca']} | {(r['autor'] or '?')[:60]} |")
 nb="\n".join(linhas)+"\n"
 for p in [CLONE/"demos"/demo/"CREDITOS.md",HOME/demo/"CREDITOS.md"]:
  t=p.read_text(encoding="utf-8")
  t=re.sub(r'## Fotografias ilustrativas licenciadas.*$',nb,t,flags=re.S)
  p.write_text(t,encoding="utf-8")
print("\nRETRY CONCLUIDO")
