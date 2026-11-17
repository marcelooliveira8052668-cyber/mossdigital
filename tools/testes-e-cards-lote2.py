"""Adiciona teste de fotos às 12 demos e 12 cards ao catálogo (142 -> 154)."""
import json,re
from pathlib import Path
from urllib.parse import quote

HOME=Path(r"C:\Users\Sylvia Camillo"); CLONE=HOME/"mossdigital-publicacao"
DEMOS={
 "topo-prime":("TOPO PRIME — Topografia","Serviços","topografia, planta interativa e orçamento ilustrativo"),
 "pericia-prime":("PERÍCIA JUDICIAL PRIME","Serviços","processos fictícios, prazos e checklist documental"),
 "elevatech-prime":("ELEVATECH PRIME — Elevadores","Serviços","chamados, equipamentos e manutenção demonstrativa"),
 "traduz-prime":("TRADUZ PRIME — Tradução","Serviços","idiomas, documentos e simulador de orçamento"),
 "biocontrol-prime":("BIOCONTROL PRIME — Pragas","Serviços","serviços por praga, planos e agenda ilustrativa"),
 "move-prime":("MOVE PRIME — Mudanças","Serviços","inventário interativo e estimativa ilustrativa de mudança"),
 "ecoanalytics-prime":("ECOANALYTICS PRIME — Ambiental","Serviços","amostras fictícias e relatórios ilustrativos"),
 "solar-prime":("SOLAR PRIME — Engenharia solar","Serviços","dimensionamento técnico, cenários e projeção com gráficos"),
 "chaveiro-express-prime":("CHAVEIRO EXPRESS PRIME","Serviços","mapa de regiões, chamados e orçamento ilustrativo"),
 "aquacare-prime":("AQUACARE PRIME — Piscinas","Serviços","volume aproximado, planos e agenda de manutenção"),
 "harmonia-tech-prime":("HARMONIA TECH PRIME — Instrumentos","Serviços","ordem de serviço e acompanhamento de reparos"),
 "safework-prime":("SAFEWORK PRIME — Segurança","Serviços","treinamentos, documentos e vencimentos ilustrativos"),
}
CHECK="""
// Fotografias licenciadas (6 por demo) — carregamento real
await av(`document.getElementById('fotografias').scrollIntoView()`);
await new Promise(function(r){setTimeout(r,600)});
const fotos=await av(`JSON.stringify(Array.from(document.querySelectorAll('#fotografias img')).map(i=>({ok:i.complete&&i.naturalWidth>0,alt:i.alt.length>5,local:i.getAttribute('src').startsWith('img/fotos/')})))`);
const fo=JSON.parse(fotos);
checar('6 fotografias licenciadas carregam',fo.length===6&&fo.every(function(x){return x.ok&&x.alt&&x.local}),JSON.stringify(fo.map(function(x){return x.ok})));

"""
for demo in DEMOS:
    p=HOME/demo/"tests"/"cdp-smoke.js"
    t=p.read_text(encoding="utf-8")
    if "6 fotografias licenciadas carregam" not in t:
        m="console.log('\\n===== RELATÓRIO DE TESTES"
        if m in t:
            t=t.replace(m,CHECK+m,1);p.write_text(t,encoding="utf-8")
            print("teste:",demo)
    # sincroniza teste no clone
    import shutil
    shutil.copy2(p,CLONE/"demos"/demo/"tests"/"cdp-smoke.js")

def card(nome,categoria,resumo):
    href=f"/demos/{demo_atual}/index.html"
    capa=f"/demos/{demo_atual}/img/capa-card.webp"
    short=nome.split(" —")[0].split(" PRIME")[0]
    wa="https://wa.me/5511942038103?text="+quote(f"Olá! Gostaria de um site como a demo {short}.")
    return (f'<article class="demo-card" data-category="{categoria}">\n'
      f'  <a class="demo-cover" href="{href}" target="_blank" rel="noopener noreferrer" aria-label="Abrir demo: {nome}"><img src="{capa}" width="1200" height="750" alt="Captura da própria demonstração {nome}" loading="lazy" decoding="async"></a>\n'
      f'  <div class="demo-body"><span class="demo-category">{categoria}</span><h3>{nome}</h3>\n'
      f'  <details class="demo-details"><summary>Sobre esta demo</summary><p>Demonstração com {resumo}. Fotos ilustrativas licenciadas e dados fictícios.</p></details>\n'
      f'  <div class="demo-actions"><a href="{href}" target="_blank" rel="noopener noreferrer">Abrir demo <span aria-hidden="true">↗</span></a><a href="{wa}" target="_blank" rel="noopener noreferrer">Quero um assim</a></div></div></article>\n')

index=CLONE/"index.html"
html=index.read_text(encoding="utf-8")
for demo_atual,(nome,categoria,resumo) in DEMOS.items():
    if f'/demos/{demo_atual}/index.html' in html:
        print("card ja existe:",demo_atual);continue
    # insere antes do card de SafeHome (posição S) para manter ordem aproximada
    ancora='href="/demos/safehome/"'
    pos=html.find(ancora)
    if pos==-1: raise SystemExit("ancora nao encontrada")
    ini=html.rfind('<article class="demo-card"',0,pos)
    html=html[:ini]+card(nome,categoria,resumo)+html[ini:]
    print("card:",demo_atual)
html=html.replace("142 modelos de sites disponíveis","154 modelos de sites disponíveis")
index.write_text(html,encoding="utf-8")
print("contador 154")
