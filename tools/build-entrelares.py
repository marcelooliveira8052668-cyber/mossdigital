"""Recria somente a demo EntreLares. Não execute sobre adaptações de clientes sem backup."""
from pathlib import Path
from html import escape as esc
import json

REPO=Path(__file__).resolve().parents[1]
DEST=REPO/'demos/entrelares'
ASSETS=DEST/'assets'
ASSETS.mkdir(parents=True,exist_ok=True)
SERVICES=[
 dict(id='diarista',name='Diarista',sector='Residências',tag='A CASA EM DIA',description='Seleção de diaristas para limpeza geral da casa, com frequência, tarefas e áreas combinadas antes do serviço.',skills=['Banheiros e sala','Cozinha e quartos','Uso responsável de produtos'],note='A contratação doméstica deve observar os requisitos e as obrigações aplicáveis. O site não define ou elimina vínculo de emprego.',icon='casa'),
 dict(id='passadeira',name='Passadeira',sector='Residências',tag='ROUPA PRONTA SEM CORRERIA',description='Seleção para lavagem e passagem de roupas, com volume, tecidos e dias combinados antes do serviço.',skills=['Lavagem e separação','Passagem de roupas','Organização do armário'],note='Volume de roupas, tipos de peça e produtos precisam ser combinados. Peças especiais não entram sem orientação adequada.',icon='folha'),
 dict(id='cozinha',name='Cozinheira',sector='Residências',tag='REFEIÇÕES DO DIA A DIA',description='Cozinheiras para preparo das refeições da família, conforme cardápio, restrições e experiência profissional.',skills=['Preparo de refeições','Organização de cozinha','Boas práticas de manipulação'],note='Cardápios, restrições alimentares e cuidados de manipulação precisam ser confirmados. Não inclui prescrição nutricional.',icon='prato'),
 dict(id='organizacao',name='Organização da casa',sector='Residências',tag='CADA COISA NO SEU LUGAR',description='Seleção para organizar ambientes e objetos da casa, com objetivos e limites definidos antes do serviço.',skills=['Organização de espaços','Planejamento de etapas','Conservação de objetos'],note='Não inclui transporte de valores, guarda de chaves ou acesso a documentos sem acordo e procedimentos adequados.',icon='estante'),
 dict(id='auxiliar',name='Auxiliar doméstico',sector='Residências',tag='ROTINA COM APOIO',description='Seleção para o dia a dia da casa: limpeza leve, organização e pequenos afazeres, com jornada combinada.',skills=['Tarefas do dia a dia','Organização e limpeza','Cuidado com a casa'],note='Trabalho doméstico recorrente exige atenção a jornada, condições e obrigações combinadas. O site não define vínculo.',icon='agenda'),
 dict(id='limpeza',name='Limpeza para negócios',sector='Pequenos negócios',tag='AMBIENTES BEM CUIDADOS',description='Seleção de profissionais para limpeza em pequenos espaços comerciais, respeitando as condições e os riscos da atividade.',skills=['Limpeza comercial','Rotina de conservação','Organização de materiais'],note='Não inclui limpeza de risco, trabalho em altura ou atividades que exijam habilitação específica não avaliada.',icon='predio'),
]

CSS=r'''
/* Eu estabeleço uma identidade editorial acolhedora, com fontes locais e contraste legível. */
:root{--ink:#302c43;--plum:#44374f;--copper:#9a4934;--peach:#edc6ae;--cream:#f8f3eb;--paper:#fffdf8;--muted:#6c6471;--line:#ded5d9;--soft:#eee5e8;--green:#37634f;--focus:#8a3d13}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:30px}body{margin:0;background:var(--cream);color:var(--ink);font:16px/1.65 system-ui,-apple-system,'Segoe UI',sans-serif}h1,h2,h3,p{overflow-wrap:break-word}h1,h2{font-family:Georgia,'Times New Roman',serif;font-weight:400;line-height:1.05;letter-spacing:-.055em}h1{font-size:clamp(3rem,6.6vw,6.2rem);margin:20px 0 24px}h2{font-size:clamp(2rem,4vw,3.8rem);margin:15px 0 22px}h3{font-size:1.3rem;line-height:1.16;letter-spacing:-.035em;margin:12px 0 14px}em{color:var(--copper)}p{margin:0 0 18px}button,input,select,textarea{font:inherit}button{cursor:pointer}a{color:inherit}img,svg{display:block;max-width:100%}button,input,select{touch-action:manipulation}button:disabled{opacity:.5;cursor:not-allowed}:focus-visible{outline:3px solid var(--focus);outline-offset:5px}[hidden]{display:none!important}.wrap{width:min(1180px,calc(100% - 44px));margin:auto}.skip{position:fixed;top:-80px;left:20px;background:var(--paper);color:var(--ink);padding:12px 20px;z-index:60}.skip:focus{top:12px}.demo-note{background:var(--plum);color:#fff8ed;text-align:center;padding:8px 18px;font-size:.7rem;letter-spacing:.02em}.top{border-bottom:1px solid var(--line)}.top-inner{display:flex;justify-content:space-between;align-items:center;gap:25px;min-height:94px}.brand{text-decoration:none;display:flex;gap:12px;align-items:center;font-size:1.6rem;font-weight:700;letter-spacing:-.07em;line-height:1.05}.brand small{display:block;font-size:.5rem;letter-spacing:.18em;font-weight:550;margin-top:8px}.brand-mark{display:grid;place-items:center;background:var(--plum);color:var(--peach);width:44px;height:44px;border-radius:50% 50% 8px 8px;font-family:Georgia,serif;font-size:1.8rem;font-weight:400}.nav{display:flex;align-items:center;gap:27px}.nav a{font-size:.8rem;font-weight:700;text-decoration:none}.nav a:hover{text-decoration:underline;text-underline-offset:6px}.menu-toggle{display:none;border:1px solid #978b9a;background:none;border-radius:8px;padding:10px 13px;color:var(--ink)}.btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;border:1px solid var(--plum);border-radius:7px;padding:14px 23px;background:var(--plum);color:#fff9ef;font-size:.84rem;font-weight:700;text-decoration:none;min-height:48px;line-height:1.45;transition:transform .2s,box-shadow .2s}.btn:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 6px 0 #44374f10}.btn.ghost{background:transparent;color:var(--ink);border-color:#978b9a}.btn.peach{background:var(--peach);color:var(--ink);border-color:var(--peach)}.btn.small{padding:10px 16px;font-size:.75rem;min-height:44px}.hero{padding:66px 0 75px;overflow:hidden}.hero-grid{display:grid;grid-template-columns:1.1fr 1fr;gap:65px;align-items:center}.eyebrow{font-size:.63rem;font-weight:800;letter-spacing:.17em;text-transform:uppercase;color:var(--copper)}.lead{font-size:1.05rem;max-width:500px;color:var(--muted)}.actions{display:flex;gap:13px;flex-wrap:wrap;margin:28px 0}.micro{font-size:.72rem;color:var(--muted);max-width:510px}.hero-art{position:relative;padding:18px;border:1px solid #c6b6bf;border-radius:200px 200px 20px 20px;background:#eee0da;min-width:0}.hero-art img{width:100%;aspect-ratio:.94;object-fit:cover;border-radius:190px 190px 12px 12px}.art-label{position:absolute;left:-25px;right:20px;bottom:25px;padding:23px;background:var(--paper);border:1px solid var(--line);border-radius:12px;box-shadow:0 12px 45px #44374f10;display:flex;align-items:center;justify-content:space-between;gap:24px}.art-label strong{font-family:Georgia,serif;font-size:1.5rem;font-weight:400;letter-spacing:-.03em;line-height:1.13;display:block}.art-label span{display:block;font-size:.7rem;color:var(--muted);margin-top:8px}.art-label b{color:var(--copper);font-size:2.5rem;font-weight:400}.trustline{border-block:1px solid var(--line)}.trust-inner{display:grid;grid-template-columns:repeat(3,1fr);gap:25px;padding:25px 0}.trust-inner strong{display:block;font-size:.85rem;font-weight:650}.trust-inner span{display:block;font-size:.75rem;color:var(--muted);margin-top:5px}.section{padding:80px 0}.section-head{display:flex;justify-content:space-between;align-items:end;gap:50px;margin-bottom:30px}.section-head p{max-width:400px;color:var(--muted);font-size:.9rem}.two{display:grid;grid-template-columns:1fr 1fr;gap:24px}.path-card{padding:36px;border:1px solid var(--line);border-radius:13px;background:var(--paper)}.path-card:nth-child(2){background:var(--soft)}.path-card .path-number{font:400 2.6rem Georgia,serif;color:var(--copper)}.path-card h3{font:400 2rem Georgia,serif;letter-spacing:-.04em}.path-card p{font-size:.91rem;color:var(--muted)}.path-card ul{font-size:.8rem;color:var(--muted);line-height:2;padding-left:20px;margin:18px 0 24px}.filters{display:grid;grid-template-columns:1.4fr 1fr auto;gap:18px;align-items:end;border:1px solid var(--line);background:var(--paper);padding:22px;border-radius:12px;margin:25px 0 15px}label,legend{font-size:.77rem;font-weight:700;display:block;margin-bottom:7px}input,select,textarea{width:100%;min-height:46px;background:var(--paper);border:1px solid #928797;color:var(--ink);border-radius:7px;padding:11px 13px}textarea{resize:vertical;min-height:110px}.filter-count{font-size:.74rem;color:var(--muted);margin:10px 0 25px}.services{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.service{background:var(--paper);border:1px solid var(--line);border-radius:12px;overflow:hidden;display:flex;flex-direction:column}.service-art{height:154px;background:#ece2dd;position:relative;overflow:hidden}.service-art svg{width:100%;height:100%}.service:nth-child(2n) .service-art{background:#e8e5ed}.service:nth-child(3n) .service-art{background:#eee5d3}.service-art span{position:absolute;top:13px;left:15px;background:#fffaf2;border:1px solid var(--line);padding:4px 10px;border-radius:20px;font-size:.62rem;font-weight:700}.service-body{padding:26px;display:flex;flex-direction:column;flex:1}.service-body .eyebrow{font-size:.57rem;letter-spacing:.12em}.service-body p{font-size:.86rem;color:var(--muted)}.service-body ul{font-size:.74rem;padding-left:18px;color:var(--muted);line-height:1.9;margin:0 0 15px}.service details{font-size:.74rem;border-top:1px solid var(--line);padding:12px 0;margin:0 0 15px}.service details p{font-size:.76rem;margin:10px 0 0}.service .btn{margin-top:auto}.notice{border-left:3px solid var(--copper);background:#efe4da;border-radius:0 8px 8px 0;padding:15px 20px;font-size:.78rem;color:#5e4b45;margin:24px 0}.notice.neutral{background:var(--soft);color:var(--ink);border-color:#766082}.notice strong{display:block;margin-bottom:4px}.empty{text-align:center;padding:35px 24px;border:1px dashed #9b8b9f;border-radius:12px;background:var(--paper)}.empty p{color:var(--muted)}.process{background:var(--plum);color:#fff8ef}.process .eyebrow{color:var(--peach)}.process .section-head p{color:#ded3e2}.steps{display:grid;grid-template-columns:repeat(4,1fr);gap:30px;counter-reset:step}.step{counter-increment:step;border-top:1px solid #ffffff55;padding:25px 0}.step:before{content:'0' counter(step);font-size:.7rem;letter-spacing:.13em;color:var(--peach)}.step h3{margin-top:22px;font-family:Georgia,serif;font-size:1.5rem;font-weight:400}.step p{font-size:.83rem;color:#ded3e2}.story{display:grid;grid-template-columns:1fr 1.2fr;gap:65px;align-items:center}.story-card{background:var(--soft);border-radius:120px 12px 12px 12px;padding:45px 35px}.story-card blockquote{font:400 2.5rem/1.15 Georgia,serif;letter-spacing:-.045em;margin:0 0 25px}.story-card p{font-size:.76rem;color:var(--muted);margin:0}.story-text p{color:var(--muted);font-size:.93rem}.story-text h3{font-size:1rem;letter-spacing:-.01em;margin-bottom:8px}.feature-row{border-bottom:1px solid var(--line);padding:18px 0}.wizard-section{background:#eee7e1;border-block:1px solid var(--line)}.wizard-layout{display:grid;grid-template-columns:.75fr 1.25fr;gap:55px;align-items:start}.wizard-aside{position:sticky;top:30px}.wizard-aside p{color:var(--muted);font-size:.9rem}.wizard-aside a{font-size:.8rem}.wizard{background:var(--paper);border:1px solid var(--line);border-radius:15px;padding:30px;min-width:0}.wizard fieldset{border:0;margin:0;padding:0;min-width:0}.wizard legend{font-family:Georgia,serif;font-size:1.7rem;font-weight:400;line-height:1.15;letter-spacing:-.025em;margin-bottom:22px;float:left;width:100%}.wizard legend:focus{outline-offset:7px}.wizard legend+*{clear:both}.wizard .progress{display:grid;grid-template-columns:repeat(3,1fr);list-style:none;padding:0;margin:0 0 30px;gap:10px}.progress li{border-top:3px solid var(--line);padding-top:11px;color:var(--muted);font-size:.7rem}.progress li[aria-current=step]{border-color:var(--plum);color:var(--ink);font-weight:800}.progress li.done{border-color:var(--copper)}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.full{grid-column:1/-1}.hint{font-size:.71rem;color:var(--muted);margin:8px 0 0}.wizard-actions{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;padding-top:24px;border-top:1px solid var(--line);margin-top:25px}.wizard-tools{display:flex;gap:15px;flex-wrap:wrap;padding-top:18px}.text-button{border:0;background:transparent;color:var(--plum);text-decoration:underline;text-underline-offset:4px;font-size:.72rem;padding:4px;min-height:35px}.check-label{display:flex;align-items:flex-start;gap:11px;font-weight:400;font-size:.76rem}.check-label input{width:18px;min-height:18px;flex:0 0 18px;margin-top:4px;accent-color:var(--plum)}.check-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}.check-grid label{display:flex;align-items:center;gap:10px;padding:11px 13px;border:1px solid #a89bac;border-radius:7px;font-size:.74rem;font-weight:500;margin:0}.check-grid input{width:17px;min-height:17px;flex:0 0 17px;accent-color:var(--plum)}.summary{border:1px solid var(--line);border-radius:9px;padding:20px;background:#f7f2ea;margin-bottom:24px}.summary dl{margin:0}.summary dt{font-size:.67rem;text-transform:uppercase;letter-spacing:.06em;color:var(--muted);margin-top:14px}.summary dt:first-child{margin-top:0}.summary dd{margin:3px 0 0;font-size:.87rem;overflow-wrap:anywhere;white-space:pre-wrap}.summary .button-row{margin-top:20px}.button-row{display:flex;flex-wrap:wrap;gap:10px}.wizard-error{color:#9f302b;font-size:.8rem;margin:18px 0 0}.wizard-error:empty{display:none}input[aria-invalid=true],select[aria-invalid=true],textarea[aria-invalid=true]{border-color:#9f302b;outline:1px solid #9f302b}.candidate-section{background:#f3edf2}.faq-layout{display:grid;grid-template-columns:.75fr 1.25fr;gap:60px}.faq-list details{border-bottom:1px solid var(--line);padding:16px 0}.faq-list summary{cursor:pointer;font-size:.91rem;font-weight:650}.faq-list p{font-size:.85rem;color:var(--muted);margin:15px 0 0}.contact-box{background:var(--plum);color:#fff8ef;border-radius:14px;padding:47px;display:grid;grid-template-columns:1fr .8fr;gap:55px;align-items:center}.contact-box .eyebrow{color:var(--peach)}.contact-box p{color:#e0d3df;font-size:.9rem}.contact-box h2{font-size:clamp(2rem,3.5vw,3.2rem)}.contact-box .btn{width:100%;margin:10px 0}.contact-box small{display:block;font-size:.7rem;color:#e0d3df}.footer{padding:45px 0 25px;border-top:1px solid var(--line);font-size:.8rem}.footer-grid{display:grid;grid-template-columns:1.25fr 1fr 1fr;gap:50px}.footer p{font-size:.77rem;color:var(--muted);max-width:330px;margin:20px 0}.footer a:not(.brand){display:block;padding:5px 0;text-decoration:none;font-size:.77rem}.footer a:hover{text-decoration:underline}.footer-bottom{border-top:1px solid var(--line);margin-top:30px;padding-top:20px;display:flex;justify-content:space-between;gap:20px;font-size:.68rem;color:var(--muted)}.status{position:fixed;bottom:20px;left:50%;transform:translateX(-50%);background:var(--plum);color:#fff8ef;border:2px solid var(--peach);border-radius:10px;padding:13px 22px;max-width:min(600px,calc(100vw - 32px));font-size:.79rem;box-shadow:0 10px 30px #0002;z-index:80}.status:empty{display:none}.legal{max-width:800px;margin:60px auto;padding:0 24px}.legal h1{font-size:clamp(2.5rem,5vw,4rem)}.legal h2{font:650 1.25rem system-ui;letter-spacing:-.025em;margin:30px 0 15px}.legal p,.legal li{font-size:.92rem;color:var(--muted)}.legal .brand{margin-bottom:35px}dialog{border:1px solid var(--line);border-radius:14px;width:min(500px,calc(100vw - 32px));padding:28px;background:var(--paper);color:var(--ink);box-shadow:0 30px 90px #0003}dialog::backdrop{background:#302c43aa}dialog h2{font-size:2rem}dialog p{font-size:.88rem;color:var(--muted)}.print-area{display:none}.no-js{background:#fff0d7;padding:20px;border:1px solid #b09a7a;border-radius:8px;font-size:.83rem}
/* Eu reorganizo a composição sem esconder informações essenciais em telas menores. */
@media(max-width:1000px){.nav{gap:17px}.nav a{font-size:.74rem}.hero-grid{gap:35px}.hero h1{font-size:clamp(3rem,6vw,5rem)}.services{grid-template-columns:repeat(2,minmax(0,1fr))}.wizard-layout{gap:30px}.wizard{padding:24px}.steps{grid-template-columns:repeat(2,minmax(0,1fr))}.contact-box{gap:30px}.story{gap:35px}.art-label{padding:18px;left:-10px}}
@media(max-width:720px){.wrap{width:calc(100% - 36px)}.top-inner{min-height:80px;padding:14px 0;flex-wrap:wrap}.brand{font-size:1.4rem}.menu-toggle{display:block}.nav{display:none;flex:0 0 100%;flex-direction:column;align-items:stretch;padding-top:15px;border-top:1px solid var(--line)}.nav.open{display:flex}.nav a{font-size:.9rem;padding:8px}.hero{padding:40px 0 50px}.hero-grid,.two,.story,.wizard-layout,.faq-layout,.contact-box{grid-template-columns:1fr}.hero h1{font-size:clamp(3rem,12vw,4.8rem)}.hero-art{max-width:470px;margin:15px auto 0;width:100%}.hero-art img{aspect-ratio:1.1;max-height:390px}.art-label{left:10px;right:10px;bottom:16px;padding:16px}.art-label strong{font-size:1.2rem}.art-label b{font-size:1.8rem}.trust-inner{gap:15px}.trust-inner strong{font-size:.73rem}.trust-inner span{font-size:.65rem}.section{padding:50px 0}.section-head{display:block}.section-head p{max-width:100%}.services{grid-template-columns:1fr}.filters{grid-template-columns:1fr 1fr;padding:17px;gap:12px}.filters>div:first-child{grid-column:1/-1}.filters .btn{width:100%;padding:12px}.path-card{padding:27px}.path-card .path-number{font-size:2rem}.steps{gap:20px}.step h3{font-size:1.3rem}.story-card{padding:40px 30px}.story-card blockquote{font-size:2.2rem}.wizard-aside{position:static}.wizard{padding:23px 20px}.faq-layout{gap:20px}.contact-box{padding:30px 24px}.footer-grid{grid-template-columns:1fr 1fr;gap:25px}.footer-grid>div:first-child{grid-column:1/-1}.footer-bottom{display:block}.footer-bottom span{display:block;margin:6px 0}.actions .btn{flex:1 1 160px}.form-grid{gap:16px}.hero-grid .lead{font-size:1rem}}
@media(max-width:420px){.form-grid{grid-template-columns:1fr}.full{grid-column:auto}.wizard .progress{gap:7px}.progress li{font-size:.65rem}.wizard-actions>.btn{flex:1 1 130px}.check-grid{grid-template-columns:1fr}.steps{grid-template-columns:1fr}.step{padding:18px 0}.step h3{margin-top:12px}}
/* Eu respeito menos movimento e preparo apenas o resumo escolhido para impressão. */
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation:none!important;transition:none!important}}
@media print{body>*{display:none!important}.print-area{display:block!important;white-space:pre-wrap;font:12pt/1.6 system-ui;color:#000;padding:15px}.print-area:before{content:'DEMONSTRAÇÃO — NÃO É CADASTRO, CONTRATO OU GARANTIA DE VAGA';display:block;font-weight:800;border-bottom:2px solid;padding-bottom:15px;margin-bottom:15px}}
'''

def art(icon):
    paths={
      'casa':'<path d="M80 95l80-60 80 60v85H80Z" fill="#44374f"/><path d="M142 180v-55h38v55" fill="#edc6ae"/><path d="M60 97l100-77 100 77" fill="none" stroke="#9a4934" stroke-width="7"/>',
      'folha':'<path d="M100 175q-50-130 110-130 25 120-110 130Z" fill="#7f8c75"/><path d="M105 170l86-102" stroke="#44374f" stroke-width="7"/><path d="M235 45v50m-25-25h50" stroke="#9a4934" stroke-width="6"/>',
      'prato':'<circle cx="160" cy="110" r="65" fill="#fffaf2" stroke="#44374f" stroke-width="6"/><circle cx="160" cy="110" r="43" fill="#edc6ae"/><path d="M70 45v135m-15-135v35q15 20 30 0V45M245 50v130m0-130q-30 30-15 65h15" fill="none" stroke="#44374f" stroke-width="6" stroke-linecap="round"/>',
      'estante':'<path d="M75 40h170v145H75Z" fill="#44374f"/><path d="M84 112h153" stroke="#edc6ae" stroke-width="7"/><rect x="95" y="60" width="25" height="43" fill="#edc6ae"/><rect x="127" y="55" width="35" height="48" fill="#f8f3eb"/><rect x="95" y="130" width="45" height="40" fill="#b39397"/><path d="M180 175v-42m-18 10h36" stroke="#edc6ae" stroke-width="7"/>',
      'predio':'<path d="M80 185V45h125v140M205 105h48v80" fill="#44374f"/><g fill="#edc6ae"><path d="M100 65h25v25h-25zM150 65h25v25h-25zM100 110h25v25h-25zM150 110h25v25h-25zM132 150h25v35h-25z"/></g>',
      'agenda':'<rect x="95" y="40" width="145" height="145" rx="12" fill="#fffaf2" stroke="#44374f" stroke-width="6"/><path d="M130 28v25m70-25v25M95 83h145M122 110h88M122 139h55" stroke="#44374f" stroke-width="7" stroke-linecap="round"/><circle cx="225" cy="164" r="25" fill="#9a4934"/><path d="M213 164l8 8 16-18" fill="none" stroke="#fffaf2" stroke-width="5"/>'
    }
    return '<svg viewBox="0 0 320 220" aria-hidden="true"><circle cx="240" cy="160" r="100" fill="#44374f" opacity=".035"/>'+paths[icon]+'</svg>'

HERO='''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 700" role="img" aria-label="Ilustração autoral de uma casa, uma porta aberta e elementos que representam habilidades profissionais"><rect width="640" height="700" fill="#e7d4c7"/><path d="M0 530q170-120 320-50t320-45v265H0Z" fill="#b7a1a6"/><path d="M170 530V225a150 150 0 0 1 300 0v305Z" fill="#44374f"/><path d="M205 530V225a115 115 0 0 1 230 0v305Z" fill="#fff8ed"/><path d="M245 530V225a75 75 0 0 1 150 0v305Z" fill="#edc6ae"/><path d="M320 530V180l95 40v310Z" fill="#9a4934"/><circle cx="346" cy="362" r="7" fill="#f8f3eb"/><path d="M60 535V390m0 70q-70-25-35-75 55-50 65 12 35 70-30 63" fill="#7f8c75" stroke="#5e735c" stroke-width="7"/><rect x="35" y="520" width="63" height="70" rx="7" fill="#f8f3eb"/><rect x="440" y="95" width="130" height="110" rx="18" fill="#fff8ed" transform="rotate(8 505 150)"/><path d="M464 166q20-70 78-50M472 174h62" fill="none" stroke="#44374f" stroke-width="7" stroke-linecap="round"/><circle cx="145" cy="135" r="48" fill="#9a4934"/><path d="M125 136h40m-20-20v40" stroke="#fff8ed" stroke-width="6" stroke-linecap="round"/><path d="M500 430h83v107h-83Z" fill="#fff8ed"/><path d="M515 450h53m-53 25h53m-53 25h31" stroke="#44374f" stroke-width="6"/><path d="M460 585h145M165 580h280" stroke="#44374f" stroke-width="5" stroke-linecap="round"/><circle cx="520" cy="310" r="15" fill="#9a4934"/><path d="M92 280h38m-19-19v38" stroke="#9a4934" stroke-width="5"/></svg>'''

def annotate(text):
    out=[]
    for line in text.splitlines():
        if not line.strip():continue
        out.append(line)
        if '<!--' not in line:out.append('<!-- Eu organizo esta linha para orientar a navegação e explicar os limites da demonstração. -->')
    return '\n'.join(out)+'\n'

BRAND='<a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">e.</span><span>entrelares<small>PROFISSIONAIS PARA A SUA CASA</small></span></a>'
def head(title):return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<meta name="description" content="Modelo de site para encontrar um trabalhador em casa: diarista, passadeira, cozinheira e organização, com condições combinadas antes do serviço. Marca fictícia da MOSS Digital.">
<meta name="theme-color" content="#44374f">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="Um modelo de site para pedir ajuda em casa ou apresentar trabalho: diarista, passadeira, cozinheira e organização. Demonstração da MOSS Digital.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://mossdigital.com.br/demos/entrelares/assets/social.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<title>{esc(title)}</title>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>'''

def options(values,placeholder='Selecione uma opção'):
    return '<option value="">'+placeholder+'</option>'+''.join('<option value="'+esc(value)+'">'+esc(value)+'</option>' for value in values)
def field(prefix,name,label,typ='text',extra='',full=False):
    return f'<div class="{"full" if full else ""}"><label for="{prefix}-{name}">{label}</label><input id="{prefix}-{name}" name="{name}" type="{typ}" {extra}></div>'
def select(prefix,name,label,values,full=False):
    return f'<div class="{"full" if full else ""}"><label for="{prefix}-{name}">{label}</label><select id="{prefix}-{name}" name="{name}" required>{options(values)}</select></div>'

def wizard(kind):
    hiring=kind=='h';prefix='h' if hiring else 'c'
    if hiring:
        step1=select(prefix,'sector','Onde será o trabalho?',['Residências','Pequenos negócios'])+f'<div><label for="h-service">Tipo de serviço</label><select id="h-service" name="service" required><option value="">Escolha primeiro o ambiente</option></select></div>'+select(prefix,'frequency','Frequência pretendida',['Demanda pontual','1 ou 2 dias por semana','3 ou mais dias por semana','A definir com a agência'])+select(prefix,'period','Período pretendido',['Manhã','Tarde','Integral','A definir com a agência'])
        step2=field(prefix,'name','Identificação fictícia do solicitante',extra='required minlength="2" maxlength="40" placeholder="Ex.: Cliente exemplo" autocomplete="off"')+field(prefix,'city','Cidade e região pretendidas',extra='required minlength="2" maxlength="80" placeholder="Ex.: Cidade exemplo, região central" autocomplete="off"')+f'<div class="full"><label for="h-details">O que precisa ser feito (opcional)</label><textarea id="h-details" name="details" maxlength="300" placeholder="Descreva as tarefas da casa. Não inclua documentos, endereço completo ou critérios discriminatórios."></textarea><p class="hint">Use somente informações de exemplo. Qualificações devem estar relacionadas às tarefas.</p></div>'
        warning='<div id="h-employment" class="notice full" hidden>Para trabalho doméstico recorrente, a frequência é apenas um dos elementos a avaliar. A agência não elimina vínculo ou obrigações trabalhistas. A situação real precisa de análise adequada antes da contratação.</div>'
        step1+=warning
        legends=['Vamos entender a necessidade.','Um pouco mais de contexto.','Revise antes de conversar.']
    else:
        step1=f'<div class="full"><label for="c-service">Principal área de experiência ou interesse</label><select id="c-service" name="service" required><option value="">Selecione uma área</option>'+''.join(f'<option value="{s["id"]}">{s["name"]}</option>' for s in SERVICES)+'</select></div>'+select(prefix,'experience','Experiência na atividade',['Em início de carreira','Até 2 anos de experiência','Mais de 2 anos de experiência'])+select(prefix,'sector','Ambiente de interesse',['Residências','Pequenos negócios','Ambos'])+f'<div class="full"><label for="c-details">Habilidades profissionais (opcional)</label><textarea id="c-details" name="details" maxlength="300" placeholder="Ex.: organização de tarefas e experiência com atendimento. Não inclua documentos ou dados pessoais de referências."></textarea></div>'
        step2=field(prefix,'name','Identificação fictícia do profissional',extra='required minlength="2" maxlength="40" placeholder="Ex.: Profissional exemplo" autocomplete="off"')+field(prefix,'city','Cidade e região de interesse',extra='required minlength="2" maxlength="80" placeholder="Ex.: Cidade exemplo, região norte" autocomplete="off"')+select(prefix,'period','Período de interesse',['Manhã','Tarde','Integral','Flexível, a combinar'])+select(prefix,'availability','Quando pretende conversar?',['Assim que possível','Nas próximas semanas','A combinar'])+f'<div class="full"><label class="check-label"><input type="checkbox" name="adult" id="c-adult" required>Entendo que este modelo é destinado a profissionais maiores de 18 anos. Não devo enviar dados de menores.</label><p class="hint">Não pedimos data de nascimento, documento, foto ou currículo nesta demonstração.</p></div>'
        legends=['Seu trabalho começa pelas habilidades.','Onde e quando faz sentido?','Seu resumo, sob seu controle.']
    return f'''<form id="{prefix}-form" class="wizard" novalidate>
<fieldset id="{prefix}-enabled" disabled>
<ol class="progress" aria-label="Etapas do formulário"><li aria-current="step">01 · Contexto</li><li>02 · Preferências</li><li>03 · Revisão</li></ol>
<fieldset data-step="1"><legend tabindex="-1">{legends[0]}</legend><div class="form-grid">{step1}</div></fieldset>
<fieldset data-step="2" hidden><legend tabindex="-1">{legends[1]}</legend><div class="form-grid">{step2}</div></fieldset>
<fieldset data-step="3" hidden><legend tabindex="-1">{legends[2]}</legend><div class="summary" id="{prefix}-summary"><p>Seu resumo aparecerá aqui. Nenhum dado foi enviado.</p></div><div class="button-row"><button class="btn ghost small" type="button" data-action="copy" data-wizard="{prefix}">Copiar resumo</button><button class="btn ghost small" type="button" data-action="download" data-wizard="{prefix}">Baixar TXT</button><button class="btn ghost small" type="button" data-action="print" data-wizard="{prefix}">Imprimir</button></div><div class="notice neutral"><strong>Não é uma solicitação enviada ou inscrição realizada.</strong>O próximo botão prepara uma mensagem para a MOSS Digital, criadora deste modelo. Não há agência real, processo seletivo aberto ou garantia de contratação.</div><label class="check-label"><input type="checkbox" id="{prefix}-ack" name="ack" required>Entendi que é uma demonstração, que o contato será com a MOSS Digital e li a <a href="privacidade.html" target="_blank" rel="noopener noreferrer">política de privacidade (nova aba)</a>.</label></fieldset>
<p class="wizard-error" id="{prefix}-error" role="alert"></p>
<div class="wizard-actions"><button type="button" class="btn ghost" data-action="back" data-wizard="{prefix}" hidden>← Voltar</button><button type="button" class="btn" data-action="next" data-wizard="{prefix}">Continuar →</button><button type="button" class="btn" data-action="contact" data-wizard="{prefix}" hidden>Preparar conversa com a MOSS ↗</button></div>
<div class="wizard-tools"><button class="text-button" type="button" data-action="example" data-wizard="{prefix}">Preencher um exemplo fictício</button><button class="text-button" type="button" data-action="reset" data-wizard="{prefix}">Limpar este formulário</button></div>
<p class="hint">Rascunho só nesta aba. Ao atualizar ou fechar, o conteúdo é apagado. Não existe banco de currículos, análise automática ou envio silencioso.</p>
</fieldset>
</form>'''

cards=''
for s in SERVICES:
    cards+=f'''<article class="service" data-service="{s['id']}" data-sector="{s['sector']}">
<div class="service-art">{art(s['icon'])}<span>{s['sector']}</span></div>
<div class="service-body"><span class="eyebrow">{s['tag']}</span><h3>{s['name']}</h3><p>{s['description']}</p><ul>{''.join('<li>'+v+'</li>' for v in s['skills'])}</ul><details><summary>Escopo e cuidados</summary><p>{s['note']}</p></details><button type="button" class="btn ghost small" data-select="{s['id']}">Descrever o que preciso ↗</button></div>
</article>'''

faq=[
 ('A EntreLares é uma agência em funcionamento?','Não. É uma marca fictícia criada pela MOSS Digital para apresentar um modelo de site. Não existem profissionais disponíveis, vagas abertas ou candidatos cadastrados nesta demo.'),
 ('Quem contrata e remunera o profissional?','No modelo proposto, o cliente contrata diretamente o profissional. A agência presta um serviço de recrutamento e seleção, não fornece equipe própria. Obrigações, condições e documentos devem ser definidos conforme a situação real, com orientação adequada.'),
 ('O site garante candidatos selecionados ou referências verificadas?','Não. A demo apresenta como o processo poderia ser organizado. Em uma agência real, entrevistas e referências dependem de procedimentos efetivamente realizados, tratamento adequado dos dados e informação transparente. Não prometemos verificação concluída ou risco zero.'),
 ('Existe cobrança para o profissional se candidatar?','Nesta proposta demonstrativa, não há cobrança do candidato. O serviço de seleção seria contratado pelo cliente, com escopo, preço e condições previamente definidos. Não há cobrança ou pagamento neste site.'),
 ('Posso solicitar segurança, vigilância ou serviços de saúde?','Não nesta versão. Segurança privada e serviços de saúde têm exigências específicas e estão fora do escopo. Portaria, recepção e apoio administrativo não devem ser anunciados como vigilância ou segurança.'),
 ('O formulário já envia uma solicitação ou currículo?','Não. Ele prepara um resumo na sua aba. Copiar, baixar e imprimir só acontecem por sua ação. O contato abre o WhatsApp da MOSS para você revisar a mensagem; você ainda precisa decidir se deseja enviá-la.'),
 ('Como são tratados documentos e dados pessoais?','A demo não recebe documentos, fotos, referências pessoais ou arquivos de currículo. Não há painel de candidatos ou banco de dados. Uma implantação real precisa de controles de acesso, finalidade, base legal, retenção e medidas de segurança adequadas.'),
 ('O que muda quando eu contratar um site assim?','A MOSS personaliza a identidade, conteúdo e canais conforme o escopo. Banco privado de currículos, login, agenda, pagamentos e gestão de candidatos são integrações adicionais. A operação comercial e jurídica da agência precisa ser definida e revisada pelo responsável real.')
]

html=head('EntreLares — Profissionais para a sua casa | MOSS Digital')+f'''
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="demo-note">DEMONSTRAÇÃO MOSS DIGITAL · marca fictícia · não há agência, candidatos ou vagas reais neste site</div>
<header class="top"><div class="wrap top-inner">{BRAND}<button class="menu-toggle" id="menu-toggle" aria-expanded="false" aria-controls="navigation" type="button">Menu ☰</button><nav class="nav" id="navigation" aria-label="Navegação principal"><a href="#areas">Áreas de serviço</a><a href="#processo">Como funciona</a><a href="#profissional">Quero trabalhar</a><a class="btn small" href="#contratar">Preciso de ajuda ↗</a></nav></div></header>
<main id="conteudo">
<section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">SUA CASA MERECE MÃOS DE CONFIANÇA.</span><h1>Alguém de confiança<br>para cuidar<br><em>da sua casa.</em></h1><p class="lead">Encontre diaristas, passadeiras, cozinheiras e organização para a sua casa — com a necessidade escutada e as condições combinadas antes de começar.</p><div class="actions"><a class="btn" href="#contratar">Preciso de ajuda em casa ↗</a><a class="btn ghost" href="#profissional">Quero trabalhar</a></div><p class="micro">Seleção com contratação direta pela família. A agência não fornece equipe própria nem substitui obrigações trabalhistas.</p></div><div class="hero-art"><img src="assets/hero.svg" alt="Arte autoral de uma porta aberta, uma casa e símbolos de habilidades profissionais" width="640" height="700" fetchpriority="high"><div class="art-label"><div><strong>Antes de indicar,<br>é preciso entender.</strong><span>Escuta · Experiência · Condições claras</span></div><b aria-hidden="true">↗</b></div></div></div></section>
<div class="trustline"><div class="wrap trust-inner"><div><strong>Diarista, roupa e cozinha</strong><span>Ajuda para a rotina da casa.</span></div><div><strong>Combinação antes de começar</strong><span>Tarefas, frequência e condições claras.</span></div><div><strong>Respeito a quem trabalha</strong><span>Sem currículo público ou documentos.</span></div></div></div>
<section class="section"><div class="wrap"><div class="section-head"><div><span class="eyebrow">DOIS CAMINHOS, A MESMA ATENÇÃO</span><h2>Que ajuda você<br>precisa para casa?</h2></div><p>Peça um profissional ou apresente seu trabalho. Você testa a jornada sem criar cadastro nem compartilhar documentos.</p></div><div class="two"><article class="path-card"><span class="path-number">01.</span><h3>Preciso de um trabalhador.</h3><p>Conte como é a sua casa, o que precisa fazer e com que frequência. Isso orienta a seleção, não garante uma contratação.</p><ul><li>Para a sua casa ou pequenos negócios</li><li>Tarefas e horários bem definidos</li><li>Resumo para conversar com a equipe</li></ul><a class="btn" href="#contratar">Descrever o que preciso ↗</a></article><article class="path-card"><span class="path-number">02.</span><h3>Quero trabalhar com casas.</h3><p>Comece por suas habilidades e pelo tipo de rotina que você atende, sem expor informações pessoais em um catálogo público.</p><ul><li>Experiência com limpeza, roupa ou cozinha</li><li>Região e período de interesse</li><li>Sem promessa de vaga ou contratação</li></ul><a class="btn ghost" href="#profissional">Preparar minha apresentação ↗</a></article></div></div></section>
<section class="section" id="areas"><div class="wrap"><div class="section-head"><div><span class="eyebrow">AJUDA DIFERENTE PARA CADA CASA.</span><h2>O trabalho começa<br>por entender a sua casa.</h2></div><p>Categorias de serviço do modelo. São exemplos de trabalho, não anúncios de profissionais disponíveis nem ofertas de emprego.</p></div>
<form class="filters" id="service-filters" role="search"><div><label for="service-search">Que ajuda você precisa?</label><input type="search" id="service-search" maxlength="80" placeholder="Ex.: diarista, passadeira ou cozinha" autocomplete="off"></div><div><label for="service-sector">Onde é o serviço</label><select id="service-sector"><option value="">Todos os ambientes</option><option>Residências</option><option>Pequenos negócios</option></select></div><button class="btn ghost" type="reset">Limpar filtros</button></form>
<p class="filter-count" id="service-count" role="status" aria-live="polite">6 áreas de seleção demonstrativas</p>
<div class="services" id="services">{cards}</div>
<div class="empty" id="empty-services" hidden><h3>Não encontramos essa atividade.</h3><p>Experimente outro termo ou consulte todas as categorias do modelo.</p><button class="btn ghost" id="reset-search" type="button">Ver todas as áreas</button></div>
<div class="notice"><strong>Não é um catálogo de “qualquer trabalhador”.</strong>Segurança privada, vigilância, atividades de saúde, serviços de risco e contratação de menores não fazem parte deste modelo. Qualificações e condições reais precisam de análise específica.</div>
</div></section>
<section class="section process" id="processo"><div class="wrap"><div class="section-head"><div><span class="eyebrow">SELEÇÃO É PROCESSO, NÃO PROMESSA</span><h2>Um encontro responsável<br>tem etapas claras.</h2></div><p>Como uma agência poderia organizar o atendimento. As etapas abaixo não são executadas de verdade nesta demonstração.</p></div><div class="steps"><article class="step"><h3>Entender o cenário.</h3><p>Tarefas, local, jornada e expectativas precisam ser claros para as duas partes.</p></article><article class="step"><h3>Conduzir a seleção.</h3><p>Entrevistas e referências profissionais exigem procedimentos reais e tratamento adequado dos dados.</p></article><article class="step"><h3>Apresentar possibilidades.</h3><p>Compatibilidade é analisada com base nas atividades e qualificações, sem critérios discriminatórios.</p></article><article class="step"><h3>Formalizar com clareza.</h3><p>O cliente contrata diretamente. Condições, direitos e responsabilidades precisam ser definidos antes do início.</p></article></div></div></section>
<section class="section" id="proposta"><div class="wrap story"><div class="story-card"><blockquote>“Cuidar da sua casa<br>é confiar<br>em alguém.”</blockquote><p>Princípio editorial da marca fictícia EntreLares, não depoimento de cliente ou profissional.</p></div><div class="story-text"><span class="eyebrow">UMA RELAÇÃO QUE PRECISA SER BOA PARA OS DOIS LADOS</span><h2>Confiança não se anuncia.<br>Se constrói.</h2><div class="feature-row"><h3>Experiência antes de aparência.</h3><p>A seleção deve considerar habilidades relacionadas ao trabalho, não raça, religião, aparência ou preferências pessoais discriminatórias.</p></div><div class="feature-row"><h3>Referências com responsabilidade.</h3><p>Nenhum selo de “verificado” é inventado. Na operação real, cada informação precisa de procedimento e finalidade definidos.</p></div><div class="feature-row"><h3>Condições antes do compromisso.</h3><p>Escopo, remuneração, jornada, direitos e eventual contratação do serviço de seleção devem ser esclarecidos entre os responsáveis.</p></div></div></div></section>
<section class="section wizard-section" id="contratar" aria-labelledby="h-title"><div class="wrap wizard-layout"><div class="wizard-aside"><span class="eyebrow">PARA QUEM PRECISA DE AJUDA EM CASA</span><h2 id="h-title">Vamos começar<br>pelo que você precisa.</h2><p>Organize as informações da demanda em três etapas. Você pode revisar, baixar ou copiar o resumo antes de conversar.</p><div class="notice neutral">Este formulário não contrata pessoas, não confirma atendimento e não envia informações automaticamente.</div><a href="termos.html">Entenda o modelo e as responsabilidades ↗</a></div><div><noscript><p class="no-js">Os formulários guiados precisam de JavaScript. <a href="#contato">Use o contato comercial da MOSS</a> para conhecer o modelo, sem enviar documentos.</p></noscript>{wizard('h')}</div></div></section>
<section class="section candidate-section" id="profissional" aria-labelledby="c-title"><div class="wrap wizard-layout"><div class="wizard-aside"><span class="eyebrow">PARA QUEM QUER APRESENTAR SEU TRABALHO</span><h2 id="c-title">Sua experiência<br>merece ser ouvida.</h2><p>Prepare uma apresentação simples sobre seu trabalho e sua disponibilidade. Não existe inscrição, vaga ou avaliação automática nesta demonstração.</p><div class="notice neutral">Não envie CPF, RG, fotos, laudos, documentos, dados de referências ou currículo. Nesta proposta, o candidato não paga para participar.</div><a href="privacidade.html">Como suas informações são tratadas ↗</a></div><div><noscript><p class="no-js">Ative JavaScript para testar a jornada. O catálogo e os documentos podem ser lidos sem ele.</p></noscript>{wizard('c')}</div></div></section>
<section class="section" id="duvidas"><div class="wrap faq-layout"><div><span class="eyebrow">ANTES DE SEGUIR</span><h2>Clareza também<br>é cuidado.</h2><p class="micro">Perguntas sobre o modelo, os dados e o que precisa ser definido numa agência real.</p></div><div class="faq-list">{''.join('<details><summary>'+q+'</summary><p>'+a+'</p></details>' for q,a in faq)}</div></div></section>
<section class="section" id="contato"><div class="wrap contact-box"><div><span class="eyebrow">ESTE PROJETO PODE TER A SUA MARCA</span><h2>Uma presença profissional.<br>Um atendimento humano.</h2><p>Para personalizar este modelo para o seu negócio ou sua operação, converse com a MOSS Digital. O contato abaixo é com quem cria o site, não com uma agência de empregos.</p></div><div><a class="btn peach" href="https://wa.me/5511942038103?text=Ol%C3%A1%2C%20MOSS%20Digital%21%20Quero%20conhecer%20o%20modelo%20EntreLares%20para%20um%20site%20de%20profissionais%20para%20casa." target="_blank" rel="noopener noreferrer">Falar com a MOSS Digital ↗</a><small>WhatsApp da MOSS: (11) 94203-8103.<br>Não envie candidaturas reais ou documentos.</small><a class="btn peach" href="implantacao.html">Ver o que muda na entrega ao cliente</a></div></div></section>
</main>
<footer class="footer"><div class="wrap"><div class="footer-grid"><div>{BRAND}<p>Modelo para encontrar profissionais para a sua casa, com atendimento humano. Marca fictícia criada pela MOSS Digital; não fornece mão de obra própria.</p></div><div><strong>Comece por aqui</strong><a href="#areas">Áreas de serviço</a><a href="#contratar">Preciso de ajuda</a><a href="#profissional">Quero trabalhar</a><a href="#processo">Etapas propostas</a></div><div><strong>Informação transparente</strong><a href="privacidade.html">Privacidade e dados</a><a href="termos.html">Termos e responsabilidades</a><a href="implantacao.html">Guia de implantação</a><a href="https://mossdigital.com.br/modelos.html">Outros modelos da MOSS ↗</a></div></div><div class="footer-bottom"><span>© <span id="year">2026</span> EntreLares · Demonstração fictícia.</span><span>Sem cookies de publicidade · Sem banco de currículos · Sem contratação automática</span></div></div></footer>
<dialog id="reset-dialog" aria-labelledby="reset-title"><h2 id="reset-title">Limpar este rascunho?</h2><p>Somente o formulário escolhido será apagado. O outro caminho continuará como está. Nenhum dado foi enviado ou salvo em servidor.</p><div class="button-row"><button class="btn ghost" type="button" id="reset-cancel">Voltar sem apagar</button><button class="btn" type="button" id="reset-confirm">Limpar este formulário</button></div></dialog>
<div class="status" id="status" role="status" aria-live="polite" aria-atomic="true"></div>
<pre class="print-area" id="print-area"></pre>
<script src="assets/data.js"></script>
<script src="assets/app.js"></script>
</body>
</html>'''
(DEST/'index.html').write_text(annotate(html),encoding='utf-8')
(ASSETS/'site.css').write_text(CSS,encoding='utf-8')
(ASSETS/'hero.svg').write_text(HERO,encoding='utf-8')
(ASSETS/'favicon.svg').write_text('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="20" fill="#44374f"/><path d="M20 34h27q0-20-17-14-20 8-6 25 8 6 19-1" fill="none" stroke="#edc6ae" stroke-width="5" stroke-linecap="round"/></svg>',encoding='utf-8')
(ASSETS/'data.js').write_text('/* Eu forneço somente categorias e textos fictícios, nunca currículos ou dados pessoais. */\nwindow.ENTRELARES_SERVICES = '+json.dumps(SERVICES,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')

def legal_page(title,sections):
    content=head(title+' — EntreLares')+'\n<main class="legal">\n'+BRAND+'\n<h1>'+title+'</h1>\n<p>Modelo fictício da MOSS Digital. Não é uma agência de recrutamento em funcionamento.</p>\n'
    for heading,body in sections:content+='<section><h2>'+heading+'</h2>\n<p>'+body+'</p></section>\n'
    content+='<p><a class="btn ghost" href="index.html">← Voltar ao modelo</a></p>\n</main>\n</body>\n</html>'
    return annotate(content)

privacy=[
 ('Quem responde por este modelo','A MOSS Digital criou esta demonstração. O contato comercial é (11) 94203-8103. A marca EntreLares não representa uma agência real. Ao implantar para um cliente, o responsável deve identificar a organização, os contatos e os procedimentos reais de atendimento.'),
 ('O que fica no navegador','O site não usa banco de dados, cookies de publicidade, localStorage, sessionStorage, analytics ou coleta automática de localização. As respostas dos formulários ficam nos campos e na memória desta aba. Ao atualizar ou fechar, o aplicativo não recupera esses rascunhos. Recursos de preenchimento automático ou restauração do próprio navegador dependem das configurações do usuário.'),
 ('Quais informações o exemplo pede','Pedimos uma identificação fictícia, cidade/região, área de interesse, experiência ou tarefas e preferências profissionais. Não pedimos documentos, endereço completo, data de nascimento, dados de saúde, fotografia, arquivos de currículo ou contatos de referências. O caminho de apresentação profissional é destinado a maiores de 18 anos; não envie dados de menores.'),
 ('Resumo, cópia, download e impressão','Essas ações só ocorrem quando solicitadas. O arquivo e a impressão incluem as respostas que você preencheu; revise antes de compartilhar. A cópia depende do recurso de área de transferência do navegador. Se estiver indisponível, oferecemos um TXT como alternativa. Os arquivos ficam sob seu controle, não são enviados automaticamente.'),
 ('WhatsApp é um serviço externo','Após sua confirmação, o site prepara uma mensagem em um link do WhatsApp direcionado à MOSS Digital. Ao abrir esse link, o serviço externo pode processar o conteúdo e dados técnicos conforme suas próprias políticas, mesmo antes do envio da mensagem. Você ainda decide se deseja enviar a conversa. Não use dados reais, sensíveis ou documentos nesta demonstração.'),
 ('Hospedagem e registros técnicos','Na versão publicada pela MOSS, os arquivos são entregues por GitHub Pages. O provedor de hospedagem pode processar IP e registros técnicos necessários à operação conforme suas políticas. Não declaramos ausência de todo registro de infraestrutura. A demo não instala rastreamento publicitário próprio.'),
 ('Uma operação real exige outro planejamento','A agência precisa definir finalidade, base legal, necessidade, acesso, retenção, segurança e atendimento a direitos conforme a LGPD e sua atuação. Entrevistas, referências e recebimento de currículos exigem procedimentos adequados. Um aceite no formulário não substitui a análise jurídica de todas as operações.'),
 ('Exclusão e contato','Você pode limpar cada formulário pelo botão identificado ou atualizar a página. Isso não apaga arquivos que já baixou, conteúdo copiado ou mensagens enviadas em serviços externos. Para assuntos de uma conversa comercial com a MOSS, use o contato indicado. Na versão real, publique o canal do responsável pelo tratamento e o procedimento de atendimento aos titulares.')
]
terms=[
 ('Finalidade da demonstração','O site demonstra a apresentação de uma agência de recrutamento e seleção para residências e pequenos negócios. Não existem vagas, currículos, profissionais disponíveis, contratação, avaliação de candidatos, referências verificadas ou serviços de seleção efetivamente executados por esta marca fictícia.'),
 ('Quem contrata quem','No modelo comercial proposto, a agência presta um serviço de recrutamento e seleção e o cliente contrata diretamente o profissional. A agência não é apresentada como empregadora de uma equipe própria ou fornecedora de mão de obra terceirizada. A atuação real e os contratos devem corresponder a esse modelo e ser revisados com profissionais adequados.'),
 ('Condições comerciais e remuneração','Qualquer serviço real de seleção deve ter escopo, preço, etapas, entregáveis, condições e responsabilidades esclarecidos previamente em contrato. Nesta proposta não há cobrança do candidato. Não existem pagamentos, promessa de colocação, prazo garantido, reposição gratuita ou devolução assegurada na demo.'),
 ('Obrigações trabalhistas','O site não cria nem afasta vínculo de emprego e não calcula encargos. Trabalho doméstico, atividades empresariais e demandas pontuais têm enquadramentos que dependem dos fatos e das regras aplicáveis. Consulte orientação jurídica e contábil antes de operar. A Lei Complementar 150/2015 pode ser consultada no <a href="https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp150.htm" target="_blank" rel="noopener noreferrer">Planalto (nova aba)</a>.'),
 ('Fora do escopo','Esta versão não oferece vigilância ou segurança privada, serviços de saúde, atividades de risco ou contratação de menores. Segurança privada tem regras e fiscalização próprias; consulte as <a href="https://www.gov.br/pf/pt-br/assuntos/seguranca-privada" target="_blank" rel="noopener noreferrer">informações da Polícia Federal (nova aba)</a>. Recepção e apoio administrativo não são vigilância.'),
 ('Seleção responsável','Critérios devem estar relacionados à atividade e respeitar direitos. Não use raça, religião, aparência ou outras preferências discriminatórias. Referências, documentos, avaliações e verificações precisam de finalidade e procedimentos adequados; não anuncie verificação concluída, certificação ou risco zero sem fundamento real.'),
 ('Contato e candidaturas','Os formulários apenas montam resumos. O contato externo da demo é com a MOSS Digital para apresentação do modelo. Uma mensagem não equivale a inscrição, encaminhamento a empregador, solicitação atendida, contrato ou garantia de vaga. Não envie candidaturas ou documentos reais.'),
 ('Limites técnicos e implantação','Não há cadastro central, painel administrativo, login, armazenamento de currículos, contratação automática, pagamentos ou agenda integrada. A MOSS personaliza os arquivos conforme o escopo contratado. Recursos de gestão e integrações exigem projeto, segurança, operação e orçamento próprios. Este texto é uma base de demonstração, não consultoria jurídica.')
]
(DEST/'privacidade.html').write_text(legal_page('Privacidade e dados',privacy),encoding='utf-8')
(DEST/'termos.html').write_text(legal_page('Termos e responsabilidades',terms),encoding='utf-8')

delivery='''# EntreLares — entrega e implantação

## O que este projeto é

Site demonstrativo para encontrar um trabalhador em casa — diarista, passadeira, cozinheira, organização e auxiliar doméstico — com uma agência fictícia conduzindo a seleção e o cliente contratando diretamente o profissional. Não é empresa de equipe própria, marketplace, agência real ou plataforma de contratação automática.

## Arquivos e edição

- `index.html`: vitrine, categorias e dois formulários guiados. Cada linha lógica tem comentário em primeira pessoa.
- `assets/site.css`: layout, versão móvel, foco e impressão.
- `assets/data.js`: categorias usadas pelos filtros e formulários. Ao editar categorias, atualize também os cartões estáticos no HTML.
- `assets/app.js`: filtros, validação, etapas, resumos e contato. Sem bibliotecas ou servidor.
- `assets/hero.svg`: ilustração original; sem fotos de trabalhadores fictícios.
- `privacidade.html` e `termos.html`: textos-base para revisão da operação real.
- `implantacao.html`: este guia em formato legível no navegador.
- `DADOS-DO-CLIENTE.txt`: roteiro de informações a solicitar.
- `VALIDACAO-COMERCIAL.txt`: roteiro para validar o interesse de agências antes de prometer demanda.

Abra index.html diretamente ou execute `python -m http.server 8080` nesta pasta. Não há instalação obrigatória. Com JavaScript desativado, categorias, textos e documentos continuam disponíveis; os formulários ficam desabilitados para não enviar dados por URL.

## Recursos funcionais da demo

1. Seis categorias com busca sem distinção de acentos, filtro por ambiente e estado vazio.
2. Botão por categoria preenche o ambiente e a atividade na jornada de contratação.
3. Caminho Preciso contratar: contexto, preferências e revisão.
4. Caminho Quero trabalhar: experiência, disponibilidade e revisão.
5. Validação por etapa, campos identificados, erro anunciado e foco no campo relevante.
6. Resumo como texto seguro, sem inserir respostas como HTML.
7. Cópia, download TXT e impressão com aviso de demonstração.
8. Aceite explícito antes do link ao WhatsApp da MOSS; a mensagem precisa ser revisada e enviada no serviço externo.
9. Exemplos fictícios para testar e limpeza independente de cada formulário com confirmação.
10. Sem cookies de publicidade, analytics, geolocalização, banco de currículos ou armazenamento persistente pelo aplicativo.

## O que não existe

Não há candidatos cadastrados, vagas, contratação, seleção executada, disponibilidade verificada, análise de currículos, envio automático, referência checada, pagamentos, agendamento ou login. Não há backend, banco de dados, painel de agência ou acompanhamento multiusuário. Cópia e downloads não são cadastro. Os rascunhos não são recuperados pelo aplicativo após recarregar; o navegador pode ter recursos próprios de restauração/preenchimento.

Não oferecemos segurança privada, vigilância, serviços de saúde, atividades de risco ou contratação de menores. A recepção não deve ser apresentada como segurança. O modelo não determina vínculo ou afasta obrigações trabalhistas. Revisão jurídica e contábil são necessárias para a atuação real.

## Antes de entregar ao cliente final

- [ ] Definir se a empresa realmente atua com recrutamento e seleção e contratação direta pelo cliente. Se fornecer equipe própria, reformular operação, contratos e site.
- [ ] Confirmar responsável, identificação comercial, CNPJ e informações exigíveis, contatos, marca, domínio e regiões efetivamente atendidas.
- [ ] Substituir a marca e os textos fictícios por informações aprovadas; usar apenas imagens autorizadas.
- [ ] Definir categorias, tarefas, critérios relacionados à atividade e o que está fora do escopo.
- [ ] Definir preço do serviço da agência, quem paga, etapas, condições de cancelamento e eventual reposição. Não inventar garantias ou prazos.
- [ ] Definir como a seleção será realizada, quem responde por ela e como referências e documentos serão tratados.
- [ ] Substituir o número 5511942038103 e todas as referências à MOSS como destinatário pelos canais aprovados, quando aplicável.
- [ ] Adaptar o aceite, a privacidade e os termos. Não manter um texto que descreve dados fictícios se a operação passar a receber dados reais.
- [ ] Definir finalidade, base legal, minimização, retenção, direitos e segurança antes de coletar dados de candidatos. Não presumir que um checkbox resolve a LGPD.
- [ ] Não publicar currículos, documentos, contatos de referências ou perfis de candidatos sem avaliação de necessidade, direitos e proteção adequada.
- [ ] Para currículos privados, gestão de candidatos, agenda, pagamentos ou login: contratar backend, autenticação, autorização, armazenamento seguro e backups como escopo próprio.
- [ ] Fazer revisão jurídica/contábil do modelo, contratos e obrigações. Não oferecer serviços regulados sem estrutura adequada.
- [ ] Configurar domínio, HTTPS, contatos, imagem social absoluta e metadados verdadeiros. Só remover noindex no site real aprovado; manter a demo fictícia fora do sitemap público.
- [ ] Testar filtros, etapas, erros, links, downloads, impressão, teclado e telas pequenas. Auditar acessibilidade e segurança antes de afirmar conformidade.
- [ ] Obter aprovação escrita do conteúdo e do escopo; entregar acessos por canal seguro e combinar suporte, atualização e manutenção.

## Como vender com clareza

Site personalizado para quem precisa de um trabalhador em casa: apresentar os serviços, captar pedidos e explicar a seleção, com atendimento humano. Não vender como banco de currículos, intermediação automática ou promessa de profissionais disponíveis. Domínio, hospedagem, manutenção e integrações devem ter condições explícitas.

## Atendimento e direitos

Não fazer filtros ou exigências discriminatórias. Não solicitar documentos, dados de saúde ou antecedentes indiscriminadamente. Procedimentos reais devem ser proporcionais, adequados à atividade e juridicamente revisados. A contratação doméstica e a contratação para uma empresa não são o mesmo enquadramento.
'''
(DEST/'ENTREGA-AO-CLIENTE.md').write_text(delivery,encoding='utf-8')
content=head('Guia de implantação — EntreLares')+'\n<main class="legal">\n'+BRAND+'\n'
listing=False
for line in delivery.splitlines():
    if line.startswith('- '):
        if not listing:content+='<ul>\n';listing=True
        content+='<li>'+esc(line[2:])+'</li>\n';continue
    if listing:content+='</ul>\n';listing=False
    if not line.strip():continue
    if line.startswith('# '):content+='<h1>'+esc(line[2:])+'</h1>\n'
    elif line.startswith('## '):content+='<h2>'+esc(line[3:])+'</h2>\n'
    else:content+='<p>'+esc(line)+'</p>\n'
if listing:content+='</ul>\n'
content+='<p><a class="btn ghost" href="index.html">Voltar ao modelo</a></p>\n</main>\n</body>\n</html>'
(DEST/'implantacao.html').write_text(annotate(content),encoding='utf-8')
(DEST/'DADOS-DO-CLIENTE.txt').write_text('''ENTRELARES — DADOS PARA PERSONALIZAR O SITE

Solicite ao responsável pela agência:
- Nome, marca, identificação comercial, responsável, CNPJ e dados exigíveis conforme a operação.
- Confirmação do modelo: recrutamento e seleção com contratação direta pelo cliente.
- Públicos, funções, tarefas, qualificações e regiões realmente atendidas.
- Etapas reais, responsáveis, canais e horários de atendimento.
- Condições comerciais: quem contrata a agência, preço, cobrança, cancelamento e eventual reposição.
- Critérios profissionais relacionados à atividade, sem discriminação.
- Procedimentos de entrevista, referências e documentos, revisados quanto à necessidade e à proteção dos dados.
- Logotipo, cores, textos, fotos autorizadas e domínio desejado.
- Telefone, e-mail e WhatsApp oficiais.
- Políticas de privacidade, termos e canais de atendimento a direitos.
- Quem atualizará o conteúdo e como será o suporte.

Não solicite senhas por mensagens comuns nem inclua credenciais em arquivos públicos.
Não use currículos ou documentos reais para preencher uma demonstração pública.
Não anuncie candidatos verificados, prazos, garantias ou depoimentos sem fundamento real.
O site não afasta vínculo de emprego e não substitui revisão jurídica/contábil.

A edição dos arquivos é feita pela MOSS ou pelo responsável técnico. Não há painel administrativo de candidatos nesta versão.
Banco de currículos privado, agenda, login, pagamentos e gestão de processos exigem projeto adicional.
Leia ENTREGA-AO-CLIENTE.md antes de fechar preço, prazo ou escopo.
''',encoding='utf-8')
(DEST/'VALIDACAO-COMERCIAL.txt').write_text('''VALIDAR A DEMANDA ANTES DE PROMETER RESULTADOS

A existência de famílias e empresas que contratam profissionais não garante demanda por um site da MOSS, nem garante lucro para uma agência.

Roteiro sugerido de conversa com agências locais:
1. Quem são seus clientes e quais categorias têm procura real?
2. Como chegam solicitações hoje? Indicação, redes sociais, Google ou WhatsApp?
3. Qual dificuldade o site precisaria resolver primeiro?
4. Como são selecionados os profissionais e tratados os dados dos candidatos?
5. Quem contrata o profissional e quem paga pelo serviço da agência?
6. Quanto tempo a equipe tem para responder aos interessados?
7. Existe orçamento para site, domínio, manutenção e eventualmente gestão privada?
8. Quais integrações são indispensáveis, e quais podem esperar?

Mostre a demo como apoio à conversa. Não anuncie volume de buscas, candidatos ou contratações sem pesquisa ou registros reais.
Comece com categorias e regiões que a agência possa atender com responsabilidade.
Resultados dependem da operação, atendimento, concorrência, preço, divulgação e região.
''',encoding='utf-8')
(DEST/'LEIA-ME.txt').write_text('''ENTRELARES — PROFISSIONAIS PARA A SUA CASA — DEMONSTRAÇÃO MOSS DIGITAL

Abra index.html para testar o site. Use Preencher um exemplo fictício em cada formulário para conhecer as três etapas.
Há dois caminhos: Preciso de ajuda em casa e Quero trabalhar.
Os botões de contato levam à MOSS Digital (11) 94203-8103, não a uma agência ou processo seletivo real.

Não há cadastro, currículos, documentos, profissionais disponíveis, vagas, banco de dados ou contratação automática.
Os rascunhos ficam nesta aba; o aplicativo não os salva em armazenamento persistente.
Baixar, copiar e imprimir não enviam solicitações. O WhatsApp exige ação e revisão do usuário.
Não use dados reais ou sensíveis na demonstração.

Leia ENTREGA-AO-CLIENTE.md, DADOS-DO-CLIENTE.txt e VALIDACAO-COMERCIAL.txt antes de vender e adaptar.
O cliente contrata diretamente o profissional. A agência do modelo presta seleção, não fornece equipe própria.
Segurança privada, saúde, serviços de risco e contratação de menores não fazem parte deste modelo.
''',encoding='utf-8')
(DEST/'LINK-PARA-CLIENTE.txt').write_text('https://mossdigital.com.br/demos/entrelares/\n\nLink disponível após publicação. Marca e dados fictícios; revise antes de compartilhar.\n',encoding='utf-8')
(DEST/'Abrir demo online.url').write_text('[InternetShortcut]\nURL=https://mossdigital.com.br/demos/entrelares/\n',encoding='utf-8')
notfound=head('Página não encontrada — EntreLares')+'''
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="demo-note">DEMONSTRAÇÃO MOSS DIGITAL · marca fictícia · não há agência, candidatos ou vagas reais neste site</div>
<main class="legal" id="conteudo">
'''+BRAND+'''
<h1>Esse caminho ainda não existe.</h1>
<p>O endereço pode ter mudado. Volte ao início para conhecer o modelo EntreLares.</p>
<p><a class="btn" href="index.html">Voltar ao início</a></p>
</main>
</body>
</html>'''
(DEST/'404.html').write_text(annotate(notfound),encoding='utf-8')
print('EntreLares: vitrine, formulários, identidade e documentos gerados.')
