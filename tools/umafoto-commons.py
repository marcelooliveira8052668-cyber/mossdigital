import json,time,urllib.parse,urllib.request
from pathlib import Path
from PIL import Image,ImageOps

CLONE=Path(r"C:\Users\Sylvia Camillo\mossdigital-publicacao")
HOME=Path(r"C:\Users\Sylvia Camillo")
UA="MOSS-Digital-demo/1.0 (mossdigital.com.br)"
demo,slug="elevatech-prime","foto02"
termos=["elevator cabin interior","lift car interior","elevator inside"]
for termo in termos:
    p={"action":"query","generator":"search","gsrsearch":"filetype:bitmap "+termo,"gsrnamespace":6,
       "gsrlimit":8,"prop":"imageinfo","iiprop":"url|extmetadata","iiurlwidth":1400,"format":"json"}
    u="https://commons.wikimedia.org/w/api.php?"+urllib.parse.urlencode(p)
    try:
        r=urllib.request.Request(u,headers={"User-Agent":UA})
        with urllib.request.urlopen(r,timeout=60) as x: dados=json.load(x)
    except Exception as e:
        print("api falhou",e);time.sleep(4);continue
    paginas=list((dados.get("query",{}).get("pages",{}) or {}).values())
    for pg in paginas:
        ii=pg.get("imageinfo",[{}])[0];meta=ii.get("extmetadata",{})
        titulo=pg.get("title","")
        if not any(k in titulo.lower() for k in ("elevator","lift")):continue
        src=ii.get("thumburl") or ii.get("url")
        if not src:continue
        fd=CLONE/"demos"/demo/"img"/"fotos";b=fd/(slug+".tmp")
        try:
            rq=urllib.request.Request(src,headers={"User-Agent":UA})
            with urllib.request.urlopen(rq,timeout=120) as x,open(b,"wb") as f:f.write(x.read())
            with Image.open(b) as im:
                ImageOps.fit(im.convert("RGB"),(1200,800),Image.LANCZOS).save(fd/(slug+".webp"),"WEBP",quality=80,method=6)
            b.unlink(missing_ok=True)
        except Exception as e:
            print("download falhou",e);b.unlink(missing_ok=True);continue
        aj=fd/"fontes.json";regs=json.loads(aj.read_text(encoding="utf-8"))
        lic=meta.get("LicenseShortName",{}).get("value","?")
        import re
        lic=re.sub(r"<[^>]+>","",lic)
        autor=re.sub(r"<[^>]+>","",meta.get("Artist",{}).get("value","?"))[:60]
        regs=[r for r in regs if r["arquivo"]!="img/fotos/foto02.webp"]
        regs.append({"arquivo":"img/fotos/foto02.webp","legenda":"Imagem ilustrativa — não representa a empresa fictícia",
          "titulo_original":titulo.replace("File:","")[:110],"fonte":ii.get("descriptionurl",""),"licenca":lic,
          "autor":autor,"url_imagem":src.split("?")[0],"descricao":"Interior de cabine de elevador"})
        regs.sort(key=lambda r:r["arquivo"])
        aj.write_text(json.dumps(regs,ensure_ascii=False,indent=2),encoding="utf-8")
        print("OK:",titulo)
        # rebuild gallery + creditos
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
        raise SystemExit
    time.sleep(3)
print("nao encontrada")
