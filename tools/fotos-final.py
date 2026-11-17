"""Últimos ajustes: substitui fotos restantes e corrige uma legenda."""
import json,re,time,urllib.parse,urllib.request
from pathlib import Path
from PIL import Image,ImageOps

HOME=Path(r"C:\Users\Sylvia Camillo"); CLONE=HOME/"mossdigital-publicacao"
UA="MOSS-Digital-demo/1.0 (mossdigital.com.br)"; EVITAR=("wikimedia.org","wikipedia.org")
TROCAS=[
 ("biocontrol-prime","foto01",["cockroach insect","pest insect closeup"],"Inseto ilustrativo do segmento"),
 ("elevatech-prime","foto02",["elevator inside cabin","lift cabin interior"],"Interior de cabine de elevador"),
 ("aquacare-prime","foto04",["pool mosaic tiles","swimming pool tile blue"],"Azulejos da piscina"),
]
LEGENDA=[
 ("pericia-prime","foto06","Documento histórico ilustrativo"),
]
def buscar(t):
 u="https://api.openverse.org/v1/images/?"+urllib.parse.urlencode({"q":t,"page_size":20,"license":"cc0,by,by-sa"})
 for a in (3,7,15):
  try:
   r=urllib.request.Request(u,headers={"User-Agent":UA})
   with urllib.request.urlopen(r,timeout=60) as x: return json.load(x).get("results",[])
  except Exception as e:
   print("   aguardando",a,str(e)[:50]);time.sleep(a)
 return []
def baixar(u,d):
 for a in (3,7,15):
  try:
   r=urllib.request.Request(u,headers={"User-Agent":UA})
   with urllib.request.urlopen(r,timeout=120) as x,open(d,"wb") as f: f.write(x.read())
   return True
  except Exception as e:
   print("   aguardando",a,str(e)[:50]);time.sleep(a)
 return False

def rebuild(demo,regs):
 fd=CLONE/"demos"/demo/"img"/"fotos"
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
  t=p.read_text(encoding="utf-8");t=re.sub(r'## Fotografias ilustrativas licenciadas.*$',nb,t,flags=re.S);p.write_text(t,encoding="utf-8")

for demo,slug,termos,desc in TROCAS:
 print("\n==",demo,slug)
 fd=CLONE/"demos"/demo/"img"/"fotos";aj=fd/"fontes.json"
 regs=json.loads(aj.read_text(encoding="utf-8"))
 item=None
 for t in termos:
  for c in buscar(t):
   u=str(c.get("url",""))
   if not u.startswith("http") or any(x in u for x in EVITAR) or c.get("mature"):continue
   if c.get("width",0)<600 or c.get("height",0)<400:continue
   if any(x.get("url_imagem")==u for x in regs):continue
   item=c;break
  time.sleep(0.6)
  if item:break
 if not item: print("  sem candidato");continue
 b=fd/(slug+".tmp")
 if not baixar(item["url"],b): print("  falhou download");continue
 with Image.open(b) as im:
  ImageOps.fit(im.convert("RGB"),(1200,800),Image.LANCZOS).save(fd/(slug+".webp"),"WEBP",quality=80,method=6)
 b.unlink(missing_ok=True)
 regs=[r for r in regs if r["arquivo"]!="img/fotos/"+slug+".webp"]
 regs.append({"arquivo":"img/fotos/"+slug+".webp","legenda":"Imagem ilustrativa — não representa a empresa fictícia",
  "titulo_original":(item.get("title","") or "")[:110],"fonte":item.get("foreign_landing_url") or item.get("detail_url") or "",
  "licenca":(item.get("license","?")+" "+str(item.get("license_version",""))).strip(),"autor":item.get("creator") or "?",
  "url_imagem":item["url"],"descricao":desc})
 regs.sort(key=lambda r:r["arquivo"])
 aj.write_text(json.dumps(regs,ensure_ascii=False,indent=2),encoding="utf-8")
 rebuild(demo,regs)
 print("  ok:",desc)

for demo,slug,desc in LEGENDA:
 print("\n==",demo,slug,"legenda")
 fd=CLONE/"demos"/demo/"img"/"fotos";aj=fd/"fontes.json"
 regs=json.loads(aj.read_text(encoding="utf-8"))
 for r in regs:
  if r["arquivo"]=="img/fotos/"+slug+".webp": r["descricao"]=desc
 aj.write_text(json.dumps(regs,ensure_ascii=False,indent=2),encoding="utf-8")
 rebuild(demo,regs)
 print("  legenda ajustada:",desc)
print("\nFINALIZADO")
