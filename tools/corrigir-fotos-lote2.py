"""Substitui fotos inadequadas do lote 2 por buscas mais precisas."""
import json
import re
import shutil
import time
import urllib.parse
import urllib.request
from pathlib import Path
from PIL import Image, ImageOps

HOME = Path(r"C:\Users\Sylvia Camillo")
CLONE = HOME / "mossdigital-publicacao"
UA = "MOSS-Digital-demo/1.0 (mossdigital.com.br)"
EVITAR = ("wikimedia.org", "wikipedia.org")

TROCAS = [
 ("topo-prime","foto06","total station surveying instrument tripod","Estação total em tripé"),
 ("pericia-prime","foto01","forensic scientist examining documents","Exame forense de documentos"),
 ("pericia-prime","foto06","clipboard paperwork report office","Prancheta com relatório"),
 ("elevatech-prime","foto02","elevator cabin interior doors","Interior de cabine de elevador"),
 ("elevatech-prime","foto03","elevator repair technician mechanic","Técnico em manutenção de elevador"),
 ("elevatech-prime","foto04","elevator control panel buttons closeup","Painel de controle do elevador"),
 ("biocontrol-prime","foto01","pest control technician spraying professional","Profissional de controle de pragas"),
 ("biocontrol-prime","foto02","mouse trap rodent device","Armadilha para roedores"),
 ("biocontrol-prime","foto04","mosquito insect macro close up","Mosquito em detalhe"),
 ("biocontrol-prime","foto06","insect monitoring sticky trap","Armadilha de monitoramento de insetos"),
 ("move-prime","foto04","packing moving boxes cardboard home","Caixas de mudança embaladas"),
 ("move-prime","foto06","movers loading truck furniture boxes","Equipe carregando mudança"),
 ("ecoanalytics-prime","foto06","water sample collection bottle laboratory","Coleta de amostra de água"),
 ("solar-prime","foto04","solar inverter electrical equipment","Inversor solar"),
 ("chaveiro-express-prime","foto06","keys keyring close up","Chaves em chaveiro"),
 ("aquacare-prime","foto04","swimming pool blue tile mosaic","Azulejos da piscina"),
 ("aquacare-prime","foto06","pool cleaning net equipment","Equipamento de limpeza de piscina"),
 ("harmonia-tech-prime","foto01","violin instrument close up","Violino em detalhe"),
 ("harmonia-tech-prime","foto02","guitar workshop luthier tools","Oficina de guitarra"),
 ("safework-prime","foto04","construction workers safety training","Treinamento de segurança"),
]

def buscar(termo):
    url = "https://api.openverse.org/v1/images/?" + urllib.parse.urlencode({"q":termo,"page_size":16,"license":"cc0,by,by-sa"})
    for atraso in (2,5,10):
        try:
            req=urllib.request.Request(url,headers={"User-Agent":UA})
            with urllib.request.urlopen(req,timeout=60) as r:
                return json.load(r).get("results",[])
        except Exception as e:
            print("   aguardando",atraso,str(e)[:60]);time.sleep(atraso)
    return []

def baixar(url,destino):
    for atraso in (2,5,10,20):
        try:
            req=urllib.request.Request(url,headers={"User-Agent":UA})
            with urllib.request.urlopen(req,timeout=120) as r,open(destino,"wb") as f:
                f.write(r.read())
            return True
        except Exception as e:
            print("   aguardando",atraso,str(e)[:60]);time.sleep(atraso)
    return False

por_demo = {}
for demo, slug, termo, desc in TROCAS:
    por_demo.setdefault(demo, []).append((slug, termo, desc))

for demo, trocas in por_demo.items():
    print("\n==",demo)
    fotos_dir = CLONE/"demos"/demo/"img"/"fotos"
    arquivo = fotos_dir/"fontes.json"
    registros = json.loads(arquivo.read_text(encoding="utf-8"))
    for slug, termo, desc in trocas:
        item=None
        for cand in buscar(termo):
            u=str(cand.get("url",""))
            if not u.startswith("http") or any(x in u for x in EVITAR) or cand.get("mature"):
                continue
            if cand.get("width",0)<800 or cand.get("height",0)<600: continue
            if any(c.get("url_imagem")==u for c in registros): continue
            item=cand; break
        time.sleep(0.5)
        if not item:
            print("  sem candidato:",slug);continue
        bruto=fotos_dir/(slug+".tmp")
        if not baixar(item["url"],bruto):
            print("  falhou download:",slug);continue
        with Image.open(bruto) as im:
            ImageOps.fit(im.convert("RGB"),(1200,800),Image.LANCZOS).save(fotos_dir/(slug+".webp"),"WEBP",quality=80,method=6)
        bruto.unlink(missing_ok=True)
        novo={
          "arquivo":"img/fotos/"+slug+".webp",
          "legenda":"Imagem ilustrativa — não representa a empresa fictícia",
          "titulo_original":(item.get("title","") or "Imagem ilustrativa")[:110],
          "fonte":item.get("foreign_landing_url") or item.get("detail_url") or "",
          "licenca":(item.get("license","?")+" "+str(item.get("license_version",""))).strip(),
          "autor":item.get("creator") or "?",
          "url_imagem":item["url"],
          "descricao":desc,
        }
        registros=[r for r in registros if r["arquivo"]!=novo["arquivo"]]+[novo]
        print("  trocado:",slug,"->",desc)
        time.sleep(0.6)
    arquivo.write_text(json.dumps(registros,ensure_ascii=False,indent=2),encoding="utf-8")

    # Reconstrói galeria e créditos
    cards=[]
    for r in registros:
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
    for p in [HOME/demo/"index.html", CLONE/"demos"/demo/"index.html"]:
        html=p.read_text(encoding="utf-8")
        html=re.sub(r'  <!-- Galeria de fotografias licenciadas.*?</section>\n\n',secao,html,flags=re.S)
        p.write_text(html,encoding="utf-8")

    # Créditos: reescreve a seção de fotos
    linhas=["## Fotografias ilustrativas licenciadas","",
      "Imagens via Openverse (CC0/CC BY/CC BY-SA), otimizadas em WebP. Não representam a empresa fictícia.","",
      "| Arquivo | Descrição | Fonte | Licença | Autor |","|---|---|---|---|---|"]
    for r in registros:
        f=r["fonte"]
        fm=f"[ver fonte]({f})" if f.startswith("http") else f
        linhas.append(f"| `{r['arquivo']}` | {r['descricao']} | {fm} | {r['licenca']} | {(r['autor'] or '?')[:60]} |")
    novo_bloco="\n".join(linhas)+"\n"
    for p in [CLONE/"demos"/demo/"CREDITOS.md", HOME/demo/"CREDITOS.md"]:
        t=p.read_text(encoding="utf-8")
        t=re.sub(r'## Fotografias ilustrativas licenciadas.*$',novo_bloco,t,flags=re.S)
        p.write_text(t,encoding="utf-8")

print("\nCORRECOES CONCLUIDAS")
