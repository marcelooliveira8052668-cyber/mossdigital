"""Gera as cinco demos independentes. Revise antes de executar: sobrescreve apenas os IDs desta coleção."""
from pathlib import Path
from html import escape as esc
import json
import re
import shutil

REPO = Path(__file__).resolve().parents[1]
LOCAL = REPO.parent / 'Demos de sites'
COLLECTION = [
    dict(id='reciclo', folder='Reciclagem e Ecopontos', brand='ReCiclo', category='Utilidade pública', type='recycle', icon='↻', color='#174c36', accent='#d9f476', bg='#f3f3e9', eyebrow='MENOS DESCARTE. MAIS FUTURO.', title='O próximo destino<br>não precisa ser<br><em>o lixo.</em>', description='Descubra onde entregar seus materiais, organize o descarte e faça parte de uma cidade mais circular.', action='Encontrar um ponto', tool='Planejar meu descarte', catalog='Pontos de coleta', helper='Busque por material e região. Todos os pontos, endereços e horários desta demonstração são fictícios.', tags=['Economia circular','Coleta consciente','Sem cadastro'], stats=[('06','pontos de exemplo'),('05','tipos de material'),('01','atitude que faz diferença')]),
    dict(id='junto', folder='Voluntariado e Impacto Social', brand='junto.', category='Utilidade pública', type='volunteer', icon='✳', color='#453397', accent='#f5b8a2', bg='#fbf7f2', eyebrow='GENTE QUE SOMA. CAUSAS QUE MOVEM.', title='Seu tempo tem<br><em>um lugar no mundo.</em>', description='Uma hora, uma habilidade, uma boa conversa. Encontre uma forma possível de contribuir — do seu jeito.', action='Encontrar minha causa', tool='Meu plano de participação', catalog='Uma causa para chamar de sua', helper='Oportunidades ilustrativas de projetos fictícios. Nenhuma inscrição é enviada ou vaga garantida por este site.', tags=['Remoto ou presencial','Pequenos compromissos','Grandes encontros'], stats=[('06','oportunidades de exemplo'),('04','causas para descobrir'),('Você','no seu próprio ritmo')]),
    dict(id='raizfeira', folder='Feira de Produtores Locais', brand='raiz / feira', category='Empreendedorismo', type='market', icon='◒', color='#833e26', accent='#f2c75c', bg='#faf4e5', eyebrow='DA MÃO DE QUEM CULTIVA PARA A SUA.', title='Comida de perto.<br>Histórias de verdade.<br><em>Uma boa feira.</em>', description='Monte uma cesta com produtos de pequenos produtores. Menos intermediários, mais conversa e sabor na sua semana.', action='Montar minha cesta', tool='Minha cesta da semana', catalog='Fresquinho na banca', helper='Produtos, produtores, preços e estoques fictícios. O pedido é uma consulta; disponibilidade e retirada precisam ser confirmadas.', tags=['Pequenos produtores','Retirada combinada','Pedido sem aplicativo'], stats=[('04','produtores de exemplo'),('06','produtos na banca'),('R$ 30','pedido mínimo ilustrativo')]),
    dict(id='pontocomum', folder='Coworking e Salas de Reuniao', brand='ponto comum', category='Empreendedorismo', type='cowork', icon='↗', color='#172e38', accent='#bbef87', bg='#f2f0e9', eyebrow='UM LUGAR PARA O SEU PRÓXIMO PASSO.', title='Boas ideias<br>precisam de<br><em>espaço.</em>', description='Mesa para focar. Sala para decidir. Estrutura para você trabalhar melhor, sem carregar um escritório nas costas.', action='Explorar os espaços', tool='Simular minha visita', catalog='Encontre o seu ponto', helper='Ambientes e preços ilustrativos. O simulador não consulta calendário real nem bloqueia horários.', tags=['Wi-Fi e café','Planos flexíveis','Sem reserva automática'], stats=[('06','ambientes de exemplo'),('01–10','pessoas por ambiente'),('Flexível','do encontro ao dia inteiro')]),
    dict(id='acessoaberto', folder='Guia de Acessibilidade Urbana', brand='acesso aberto', category='Utilidade pública', type='access', icon='＋', color='#123e68', accent='#ffe28a', bg='#f0f5f9', eyebrow='INFORMAÇÃO PARA ESCOLHER COM AUTONOMIA.', title='A cidade é melhor<br>quando cabe<br><em>todo mundo.</em>', description='Explore espaços por recursos de acessibilidade e monte seu roteiro. Informação clara, sem promessas de acesso perfeito.', action='Explorar os espaços', tool='Meu roteiro de visita', catalog='O que importa para a sua visita?', helper='Guia demonstrativo sem vínculo com órgãos públicos. Locais fictícios; recursos não foram auditados e precisam de confirmação.', tags=['Recursos por espaço','Sem localização automática','Informação transparente'], stats=[('06','lugares de exemplo'),('05','recursos para filtrar'),('Sempre','confirme antes de sair')]),
]

DATA = {
'reciclo':[
 dict(id='r1',name='Estação Verde',category='Papel',region='Vila Aurora',description='Recebimento separado de papel, plástico e metal. Consulte as condições de limpeza e embalagem.',address='Rua das Sementes, 120 — endereço fictício',hours='Seg a sex · 9h às 17h',materials=['Papel','Plástico','Metal'],label='Cooperativa · exemplo'),
 dict(id='r2',name='Ponto Circular',category='Vidro',region='Centro Novo',description='Ponto de entrega de embalagens de vidro. Não inclui lâmpadas, espelhos ou resíduos perigosos.',address='Praça do Recomeço, 45 — endereço fictício',hours='Ter a sáb · 10h às 16h',materials=['Vidro'],label='Entrega voluntária · exemplo'),
 dict(id='r3',name='Reinicia Tech',category='Eletrônicos',region='Vila Aurora',description='Orientação para entrega de equipamentos pequenos. Apague dados pessoais e confirme os itens aceitos.',address='Alameda do Ipê, 210 — endereço fictício',hours='Seg, qua e sex · 9h às 15h',materials=['Eletrônicos'],label='Logística reversa · exemplo'),
 dict(id='r4',name='Casa do Reuso',category='Papel',region='Jardim Horizonte',description='Triagem de papelão e plásticos de embalagem. Materiais especiais precisam de consulta prévia.',address='Rua do Amanhã, 88 — endereço fictício',hours='Sáb · 8h às 13h',materials=['Papel','Plástico'],label='Projeto comunitário · exemplo'),
 dict(id='r5',name='Galpão Semente',category='Metal',region='Centro Novo',description='Recebimento de latas e embalagens metálicas. Não recebe cilindros, perfurocortantes ou químicos.',address='Travessa das Árvores, 16 — endereço fictício',hours='Seg a sex · 8h às 16h',materials=['Metal'],label='Cooperativa · exemplo'),
 dict(id='r6',name='Quintal Circular',category='Plástico',region='Jardim Horizonte',description='Separação de embalagens plásticas e de vidro, com orientação antes da entrega.',address='Avenida do Parque, 360 — endereço fictício',hours='Ter e qui · 10h às 18h',materials=['Plástico','Vidro'],label='Ponto de bairro · exemplo'),
],
'junto':[
 dict(id='j1',name='Uma conversa que aproxima',category='Convivência',region='Remoto',description='Encontros de conversa acompanhados pela equipe de um projeto fictício. Não é atendimento psicológico.',hours='1 hora por semana',duration=1,organization='Projeto Pontes',label='Escuta e convivência'),
 dict(id='j2',name='Reforço para novos caminhos',category='Educação',region='Vila Aurora',description='Apoio em leitura e organização dos estudos, com supervisão e regras de proteção de crianças.',hours='2 horas por semana',duration=2,organization='Casa Aprender',label='Apoio educativo'),
 dict(id='j3',name='Design que conta histórias',category='Comunicação',region='Remoto',description='Ajude a organizar peças de divulgação de uma iniciativa social. Escopo combinado antes do início.',hours='3 horas por semana',duration=3,organization='Rede Mosaico',label='Habilidade criativa'),
 dict(id='j4',name='Um sábado mais verde',category='Meio ambiente',region='Jardim Horizonte',description='Atividade educativa sobre separação de materiais. Participação orientada, sem manuseio de resíduos de risco.',hours='2 horas por semana',duration=2,organization='Quintal Vivo',label='Atividade comunitária'),
 dict(id='j5',name='Tecnologia sem barreiras',category='Educação',region='Remoto',description='Apoio básico ao uso de ferramentas digitais. Não solicite senhas, documentos ou acesso bancário.',hours='1 hora por semana',duration=1,organization='Conecta Gente',label='Inclusão digital'),
 dict(id='j6',name='Histórias do nosso bairro',category='Comunicação',region='Centro Novo',description='Produção de textos curtos e entrevistas com autorização para registrar memórias comunitárias.',hours='2 horas por semana',duration=2,organization='Arquivo Afeto',label='Memória e comunicação'),
],
'raizfeira':[
 dict(id='f1',name='Cesta da estação',category='Cestas',region='Sítio Boa Terra',description='Seleção ilustrativa de seis variedades sazonais. A composição real deve ser confirmada pelo produtor.',price=38,unit='cesta',stock=8,label='Boa Terra · exemplo'),
 dict(id='f2',name='Tomate de feira',category='Hortifruti',region='Horta do Vale',description='Tomates para a salada e para o molho. Peso e maturação conferidos na retirada.',price=9.5,unit='kg',stock=12,label='Horta do Vale · exemplo'),
 dict(id='f3',name='Folhas do dia',category='Hortifruti',region='Horta do Vale',description='Um maço de folhas da estação. Consulte composição, origem e cuidados de conservação.',price=6,unit='maço',stock=15,label='Horta do Vale · exemplo'),
 dict(id='f4',name='Mel de florada',category='Despensa',region='Apiário Brisa',description='Pote ilustrativo de 250 g. Antes da compra real, consulte rótulo e procedência. Mel não é indicado para menores de 1 ano.',price=24,unit='pote 250 g',stock=6,label='Apiário Brisa · exemplo'),
 dict(id='f5',name='Geleia de frutas',category='Despensa',region='Cozinha da Serra',description='Pote ilustrativo de 200 g. Ingredientes, alergênicos e validade devem constar no rótulo real.',price=18,unit='pote 200 g',stock=7,label='Cozinha da Serra · exemplo'),
 dict(id='f6',name='Banana da semana',category='Hortifruti',region='Sítio Boa Terra',description='Porção de 1 kg para a fruteira. As imagens e os valores não representam uma oferta comercial real.',price=8,unit='kg',stock=10,label='Boa Terra · exemplo'),
],
'pontocomum':[
 dict(id='p1',name='Mesa janela',category='Mesa individual',region='Térreo',description='Mesa compartilhada perto da luz natural, tomada individual e acesso à área de café.',price=18,capacity=1,label='Foco individual'),
 dict(id='p2',name='Sala Horizonte',category='Sala de reunião',region='Térreo',description='Mesa para quatro pessoas, monitor e quadro branco. Recursos devem ser confirmados na contratação.',price=65,capacity=4,label='Conversas que avançam'),
 dict(id='p3',name='Sala Encontro',category='Sala de reunião',region='Primeiro andar',description='Ambiente para até dez pessoas, apresentações e planejamento. Confirme as condições de acesso ao piso.',price=110,capacity=10,label='Para o time inteiro'),
 dict(id='p4',name='Cabine Pausa',category='Cabine privativa',region='Térreo',description='Espaço individual para videochamadas. Não promete isolamento acústico ou sigilo absoluto.',price=28,capacity=1,label='Uma chamada tranquila'),
 dict(id='p5',name='Mesa jardim',category='Mesa individual',region='Térreo',description='Estação de trabalho na área interna voltada ao jardim. Café e internet incluídos no exemplo.',price=20,capacity=1,label='Respire e produza'),
 dict(id='p6',name='Estúdio Semente',category='Cabine privativa',region='Primeiro andar',description='Espaço para até duas pessoas trabalharem juntas. Disponibilidade e equipamentos sob consulta.',price=45,capacity=2,label='Duas ideias, um espaço'),
],
'acessoaberto':[
 dict(id='a1',name='Biblioteca Horizonte',category='Cultura',region='Vila Aurora',description='Biblioteca de bairro fictícia, com salas de leitura e programação cultural de exemplo.',features=['Entrada sem degrau','Banheiro adaptado','Elevador'],unknown=['Sinalização tátil','Apoio em Libras'],label='Informações de demonstração'),
 dict(id='a2',name='Praça das Águas',category='Ao ar livre',region='Centro Novo',description='Praça fictícia com percurso de passeio. Condições de piso, manutenção e acesso devem ser confirmadas.',features=['Entrada sem degrau','Sinalização tátil'],unknown=['Banheiro adaptado','Apoio em Libras','Elevador'],label='Sem auditoria presencial'),
 dict(id='a3',name='Centro Cultural Semente',category='Cultura',region='Jardim Horizonte',description='Espaço cultural fictício. Serviços de apoio podem exigir agendamento e confirmação com a equipe.',features=['Entrada sem degrau','Banheiro adaptado','Apoio em Libras'],unknown=['Elevador','Sinalização tátil'],label='Informações de demonstração'),
 dict(id='a4',name='Mercado do Bairro',category='Comércio',region='Vila Aurora',description='Mercado de exemplo com circulação no piso térreo. Larguras, obstáculos e apoio não foram medidos.',features=['Entrada sem degrau'],unknown=['Banheiro adaptado','Elevador','Sinalização tátil','Apoio em Libras'],label='Confirme antes de visitar'),
 dict(id='a5',name='Parque dos Ipês',category='Ao ar livre',region='Jardim Horizonte',description='Parque fictício com área de descanso. O roteiro não informa inclinações nem rotas de deslocamento.',features=['Entrada sem degrau','Banheiro adaptado'],unknown=['Sinalização tátil','Apoio em Libras','Elevador'],label='Sem auditoria presencial'),
 dict(id='a6',name='Galeria Entrelaços',category='Cultura',region='Centro Novo',description='Galeria fictícia com visitação em dois pisos. Confirme elevador e condições de uso no dia.',features=['Elevador','Banheiro adaptado','Sinalização tátil'],unknown=['Entrada sem degrau','Apoio em Libras'],label='Confirme antes de visitar'),
]
}

BASE_CSS = '''
/* Eu organizo medidas e cores sem depender de bibliotecas ou fontes externas. */
*{box-sizing:border-box}html{scroll-padding-top:100px;scroll-behavior:smooth}body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 system-ui,-apple-system,'Segoe UI',sans-serif}button,input,select,textarea{font:inherit}button,a,input,select,textarea{touch-action:manipulation}button,a{ -webkit-tap-highlight-color:transparent}a{color:inherit}img,svg{max-width:100%;display:block}button{cursor:pointer}button:disabled{cursor:not-allowed;opacity:.48}h1,h2,h3,p{overflow-wrap:break-word}h1,h2,h3{line-height:1.08;letter-spacing:-.045em}h1{font-size:clamp(2.7rem,5.8vw,5.6rem);font-weight:800;margin:22px 0}h2{font-size:clamp(2rem,3.6vw,3.4rem);margin:12px 0 20px}h3{font-size:1.3rem;margin:8px 0 14px}em{font-family:Georgia,serif;font-weight:400}p{margin:0 0 18px}.wrap{width:min(1180px,calc(100% - 48px));margin:auto}.sr-only{position:absolute;width:1px;height:1px;overflow:hidden;clip-path:inset(50%)}:focus-visible{outline:3px solid var(--focus);outline-offset:5px}.skip{position:fixed;top:-90px;left:20px;padding:12px 20px;background:var(--paper);color:var(--ink);z-index:100}.skip:focus{top:10px}.demo-note{font-size:.72rem;font-weight:650;background:var(--color);color:var(--oncolor);text-align:center;padding:8px 18px;letter-spacing:.01em}.top{background:var(--bg);border-bottom:1px solid var(--line)}.top-inner{display:flex;align-items:center;gap:28px;min-height:90px}.brand{text-decoration:none;font-size:1.6rem;font-weight:850;letter-spacing:-.07em;margin-right:auto;display:flex;align-items:center;gap:10px;white-space:nowrap}.brand-icon{display:grid;place-items:center;width:38px;height:38px;background:var(--color);color:var(--oncolor);border-radius:50%;font-size:1.7rem;font-weight:500}.nav{display:flex;align-items:center;gap:26px}.nav a{text-decoration:none;font-size:.86rem;font-weight:650}.nav a:hover{text-decoration:underline;text-underline-offset:6px}.menu-toggle{display:none;background:none;border:1px solid var(--line);border-radius:9px;padding:9px 13px;color:inherit}.btn{display:inline-flex;align-items:center;justify-content:center;gap:12px;padding:14px 22px;border-radius:var(--radius);background:var(--color);color:var(--oncolor);font-weight:750;text-decoration:none;border:1px solid var(--color);font-size:.91rem;line-height:1.4;min-height:48px;transition:transform .18s,box-shadow .18s}.btn:hover{transform:translateY(-2px);box-shadow:0 6px 0 #00000012}.btn.small{padding:10px 16px;font-size:.82rem;min-height:44px}.btn.ghost{background:transparent;color:var(--ink);border-color:var(--line)}.btn.accent{background:var(--accent);color:var(--ink);border-color:var(--accent)}.hero{padding:70px 0 66px}.hero-grid{display:grid;grid-template-columns:1.12fr 1fr;gap:50px;align-items:center}.eyebrow{font-size:.7rem;font-weight:800;letter-spacing:.17em;text-transform:uppercase;color:var(--color)}.lead{font-size:1.07rem;color:var(--muted);max-width:540px}.actions{display:flex;flex-wrap:wrap;gap:12px;margin:28px 0}.chips{display:flex;flex-wrap:wrap;gap:8px;list-style:none;padding:0;margin:24px 0 0}.chips li,.badge{display:inline-block;font-size:.72rem;border:1px solid var(--line);border-radius:30px;padding:5px 11px;font-weight:650}.hero-art{position:relative;min-width:0}.hero-art img{width:100%;border-radius:var(--art-radius);aspect-ratio:1.05;object-fit:cover}.art-label{position:absolute;bottom:20px;left:20px;right:20px;background:var(--paper);color:var(--ink);border:1px solid var(--line);padding:18px 20px;border-radius:var(--radius);box-shadow:0 8px 32px #0000000c;display:flex;justify-content:space-between;gap:20px;align-items:center}.art-label strong{display:block;font-size:1rem}.art-label span{font-size:.76rem;color:var(--muted)}.art-label b{font-size:1.7rem;color:var(--color)}.stats{border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.stats-inner{display:grid;grid-template-columns:repeat(3,1fr);gap:30px;padding:27px 0}.stat{display:flex;align-items:center;gap:18px}.stat strong{font-size:2.1rem;font-weight:750;letter-spacing:-.06em;color:var(--color)}.stat span{font-size:.8rem;color:var(--muted);max-width:140px}.section{padding:80px 0}.section-head{display:flex;justify-content:space-between;align-items:end;gap:40px;margin-bottom:30px}.section-head p{max-width:410px;font-size:.9rem;color:var(--muted);margin-bottom:8px}.notice{border-left:4px solid var(--color);background:var(--soft);padding:16px 20px;font-size:.86rem;border-radius:0 8px 8px 0;margin:24px 0}.filters{display:grid;grid-template-columns:1.5fr 1fr 1fr auto;gap:14px;align-items:end;padding:22px;background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);margin:24px 0}label,legend{display:block;font-size:.79rem;font-weight:750;margin-bottom:7px}input,select,textarea{border:1px solid var(--line);border-radius:8px;background:var(--paper);color:var(--ink);padding:12px;width:100%;min-height:46px}textarea{resize:vertical;min-height:110px}fieldset{border:0;padding:0;margin:0;min-width:0}.filter-result{font-size:.8rem;color:var(--muted);margin:18px 0}.cards{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.card{border:1px solid var(--line);background:var(--paper);border-radius:var(--radius);overflow:hidden;display:flex;flex-direction:column;transition:transform .2s,box-shadow .2s}.card:hover{transform:translateY(-4px);box-shadow:0 14px 28px #00000009}.card[hidden]{display:none}.card-art{height:148px;background:var(--soft);position:relative;overflow:hidden}.card-art svg{width:100%;height:100%}.card-number{position:absolute;right:14px;top:12px;background:var(--paper);color:var(--color);border:1px solid var(--line);padding:5px 10px;border-radius:30px;font-size:.7rem;font-weight:750}.card-body{padding:24px;display:flex;flex-direction:column;flex:1}.card-body p{font-size:.88rem;color:var(--muted)}.card-meta{font-size:.73rem;color:var(--color);font-weight:750;letter-spacing:.01em}.card-footer{margin-top:auto;padding-top:16px;display:flex;justify-content:space-between;align-items:center;gap:12px}.card-footer .btn{width:100%}.price{font-size:1.5rem;color:var(--color);letter-spacing:-.04em;font-weight:800}.price small{font-size:.7rem;font-weight:550;letter-spacing:0}.details{border-top:1px solid var(--line);margin-top:16px;font-size:.83rem}summary{cursor:pointer;padding:13px 0;font-weight:700;list-style-position:inside}details p{padding-bottom:8px}.features{padding:0;list-style:none;margin:10px 0 0;font-size:.76rem}.features li{margin:5px 0}.features li:before{content:'✓ ';font-weight:850;color:var(--color)}.empty{background:var(--soft);padding:28px;text-align:center;border-radius:var(--radius)}[hidden]{display:none!important}.tool-section{background:var(--soft);border-block:1px solid var(--line)}.tool-layout{display:grid;grid-template-columns:.8fr 1.2fr;gap:60px;align-items:start}.tool-copy{position:sticky;top:30px}.tool-copy p{color:var(--muted)}.tool-card{background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);padding:32px}.form-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px}.form-full{grid-column:1/-1}.hint{font-size:.75rem;color:var(--muted);margin:8px 0 0}.result{background:var(--soft);border:1px solid var(--line);border-radius:8px;padding:20px;margin-top:20px}.result strong{font-size:1.8rem;color:var(--color)}.result p{font-size:.86rem;margin-bottom:8px}.selected-list{list-style:none;padding:0;margin:0}.selected-list li{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 0;border-bottom:1px solid var(--line)}.selected-list small{display:block;font-size:.76rem;color:var(--muted)}.remove,.qty button{border:1px solid var(--line);border-radius:6px;background:var(--paper);color:var(--ink);min-width:44px;min-height:44px;padding:8px;font-weight:700}.qty{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.qty span{min-width:20px;text-align:center}.totals{display:flex;justify-content:space-between;align-items:center;border-top:2px solid var(--line);margin-top:24px;padding-top:20px}.totals strong{font-size:1.8rem}.tool-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.steps{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;counter-reset:steps}.step{padding:28px 0;border-top:2px solid var(--color)}.step:before{counter-increment:steps;content:'0' counter(steps);font-size:.85rem;color:var(--color);font-weight:800}.step h3{margin-top:25px}.step p{font-size:.9rem;color:var(--muted)}.story{display:grid;grid-template-columns:1fr 1fr;gap:70px;align-items:center}.story-art{background:var(--soft);padding:40px;border-radius:var(--art-radius)}.story-art img{width:100%;height:300px;object-fit:cover;border-radius:var(--radius)}.story p{color:var(--muted)}.faq-layout{display:grid;grid-template-columns:.7fr 1.3fr;gap:70px}.faq-list details{border-bottom:1px solid var(--line);padding:8px 0}.faq-list summary{font-size:1rem}.faq-list p{font-size:.9rem;color:var(--muted);max-width:650px}.contact{background:var(--color);color:var(--oncolor);border-radius:var(--art-radius);padding:48px;display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}.contact .eyebrow,.contact h2{color:var(--oncolor)}.contact p{opacity:.86}.contact label{color:var(--oncolor)}.contact input,.contact textarea{background:var(--paper);color:var(--ink)}.contact .check-label{font-weight:450;font-size:.77rem;display:flex;align-items:flex-start;gap:10px}.contact input[type=checkbox]{width:18px;min-height:18px;flex:0 0 18px;accent-color:var(--color)}.contact .btn{background:var(--accent);border-color:var(--accent);color:var(--ink);width:100%;margin-top:15px}.footer{border-top:1px solid var(--line);padding:46px 0 24px;margin-top:60px;font-size:.82rem}.footer-grid{display:grid;grid-template-columns:1.3fr 1fr 1fr;gap:50px}.footer a:not(.brand){display:block;padding:5px 0;text-decoration:none}.footer a:hover{text-decoration:underline}.footer p{color:var(--muted);max-width:320px;margin-top:12px}.footer-bottom{display:flex;justify-content:space-between;gap:20px;border-top:1px solid var(--line);padding-top:24px;margin-top:32px;font-size:.72rem;color:var(--muted)}.status{position:fixed;bottom:22px;left:50%;transform:translateX(-50%);z-index:80;background:var(--color);color:var(--oncolor);border:2px solid var(--accent);padding:13px 22px;border-radius:12px;box-shadow:0 6px 28px #0003;max-width:calc(100vw - 32px);font-size:.85rem}.status:empty{display:none}.legal{max-width:780px;margin:60px auto;padding:0 24px}.legal h1{font-size:2.8rem}.legal h2{font-size:1.4rem;margin-top:35px}.legal p{color:var(--muted)}.no-js{padding:15px;background:var(--soft);border:1px solid var(--line)}
/* Eu adapto a composição sem esconder os recursos no celular. */
@media(max-width:950px){.nav{gap:16px}.nav a{font-size:.78rem}.top-inner{gap:16px}.hero-grid{gap:30px}.cards{grid-template-columns:repeat(2,minmax(0,1fr))}.filters{grid-template-columns:1fr 1fr}.filters>div:first-child{grid-column:1/-1}.tool-layout{gap:30px}.contact{gap:30px;padding:32px}.stat{flex-direction:column;align-items:start;gap:3px}.tool-card{padding:24px}}
@media(max-width:700px){html{scroll-padding-top:20px}.wrap{width:calc(100% - 36px)}.top-inner{min-height:76px;flex-wrap:wrap;padding:12px 0}.brand{font-size:1.4rem}.menu-toggle{display:block}.nav{display:none;flex:0 0 100%;padding:14px 0;border-top:1px solid var(--line);flex-direction:column;align-items:stretch}.nav.open{display:flex}.nav a{font-size:.95rem;padding:8px}.hero{padding:40px 0}.hero-grid,.tool-layout,.story,.faq-layout,.contact{grid-template-columns:1fr}.hero-grid{gap:30px}h1{font-size:clamp(2.65rem,11vw,4rem)}.lead{font-size:1rem}.hero-art img{max-height:380px;aspect-ratio:1.15}.art-label{padding:14px;bottom:16px;left:16px;right:16px}.art-label strong{font-size:.9rem}.art-label b{font-size:1.4rem}.stats-inner{gap:12px}.stat strong{font-size:1.55rem}.stat span{font-size:.69rem}.section{padding:50px 0}.section-head{display:block}.section-head p{max-width:100%}.cards{grid-template-columns:1fr}.card-art{height:170px}.filters{padding:16px;gap:12px}.filters .btn{width:100%}.steps{grid-template-columns:1fr;gap:8px}.step{padding:20px 0 12px}.step h3{margin-top:12px}.tool-copy{position:static}.story,.faq-layout{gap:26px}.story-art{padding:20px}.contact{padding:28px 22px;gap:25px}.footer-grid{grid-template-columns:1fr 1fr;gap:26px}.footer-grid>div:first-child{grid-column:1/-1}.footer-bottom{flex-direction:column;gap:10px}.form-grid{grid-template-columns:1fr}.form-full{grid-column:auto}.tool-actions .btn{flex:1 1 160px}.hero .actions .btn{flex:1 1 170px}}
/* Eu desativo movimento quando a pessoa solicita e preparo uma impressão útil. */
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation:none!important;transition:none!important}}
@media print{.demo-note,.top,.hero,.stats,.catalog-section,.story-section,.steps-section,.faq-section,.contact-section,.footer,.status,.tool-actions,.filters,.remove,.qty button,.btn,.tool-copy{display:none!important}.section{padding:0}.tool-layout,.form-grid{display:block}.tool-card{border:0;padding:0}.tool-section{background:white;border:0}.wrap{width:100%}body{background:white;color:black;font-size:12pt}.tool-card:before{content:'Plano de demonstração — sem confirmação, reserva ou envio automático';display:block;border-bottom:1px solid;padding:12px 0;margin-bottom:16px}input,select{border:0}a{text-decoration:none}.result{background:white}}
'''

THEMES={
'reciclo':'''body{--ink:#203c2e;--muted:#526252;--paper:#fffef6;--line:#d5decb;--soft:#e6eddb;--oncolor:#fff;--focus:#a3421b;--radius:14px;--art-radius:80px 14px 80px 14px}.hero h1{font-family:Georgia,serif;font-weight:500;letter-spacing:-.06em}.hero h1 em{color:#3b6b42}.hero-art{transform:rotate(2deg)}.hero-art .art-label{transform:rotate(-2deg)}.card-art{background:#e1ebd2}.catalog-section .section-head h2{font-family:Georgia,serif;font-weight:500}.hero .eyebrow:before{content:'●';color:#598048;margin-right:10px}.story-art{border:1px solid var(--line)}''',
'junto':'''body{--ink:#2e254c;--muted:#6b6276;--paper:#fffdfb;--line:#e3d9df;--soft:#f2e8f3;--oncolor:#fff;--focus:#8b3c16;--radius:24px;--art-radius:120px 120px 24px 24px}.hero-grid{grid-template-columns:1fr}.hero{text-align:center;padding-top:56px}.hero h1{max-width:920px;margin:20px auto;font-size:clamp(3rem,6.7vw,6.2rem);font-weight:850}.hero h1 em{color:#5842a6}.hero .lead{margin-inline:auto;max-width:610px}.hero .actions,.hero .chips{justify-content:center}.hero-art{max-width:900px;margin:12px auto 0;width:100%}.hero-art img{aspect-ratio:2.5;object-fit:cover;border-radius:180px 180px 24px 24px}.hero-art .art-label{left:auto;right:22px;bottom:20px;max-width:330px;text-align:left;border-radius:20px}.stats-inner{max-width:900px}.stats{border:0}.stat{justify-content:center}.card-art{background:#eee4f5}.card:nth-child(2n) .card-art{background:#ffe7d9}.card:nth-child(3n) .card-art{background:#e8edcc}.story-art{border-radius:100px 18px 100px 18px}.btn{border-radius:40px}.eyebrow{color:#5842a6}@media(max-width:700px){.hero-art img{aspect-ratio:1.35;border-radius:100px 100px 24px 24px}.hero-art .art-label{left:16px;right:16px;max-width:none}.stat{align-items:center;text-align:center}}''',
'raizfeira':'''body{--ink:#452b22;--muted:#795e4e;--paper:#fffbef;--line:#e6d6ba;--soft:#f2e5c8;--oncolor:#fff;--focus:#245c3b;--radius:3px;--art-radius:3px}.hero{background:repeating-linear-gradient(90deg,transparent 0,transparent 100px,#833e2605 100px,#833e2605 101px)}.hero h1{font-family:Georgia,serif;font-weight:500;letter-spacing:-.055em;font-size:clamp(2.8rem,5.2vw,5rem)}.hero h1 em{color:#a5462c}.hero-art{padding:18px;background:#f0c35c;transform:rotate(-2deg);box-shadow:10px 10px 0 #833e2610}.hero-art img{border:1px solid #833e2640}.art-label{border:1px dashed #833e2680;transform:rotate(2deg)}.eyebrow{font-family:ui-monospace,monospace}.stats{background:var(--color);color:white;border:0}.stats .stat strong,.stats .stat span{color:white}.card-art{background:#efdba7}.card:nth-child(2n) .card-art{background:#dce7bc}.card{border-bottom:4px solid var(--color)}.section-head h2,.tool-copy h2,.story h2{font-family:Georgia,serif;font-weight:500}.badge{border-radius:2px}.btn{box-shadow:3px 3px 0 #452b2225}.tool-section{background-image:radial-gradient(#833e2610 1px,transparent 1px);background-size:8px 8px}.chips li{border-radius:2px}''',
'pontocomum':'''body{--ink:#22363c;--muted:#617175;--paper:#fffef9;--line:#d5dcd7;--soft:#e2e8df;--oncolor:#fff;--focus:#a14618;--radius:6px;--art-radius:6px}.top{background:#172e38;color:#fff;border-color:#ffffff25}.top .brand-icon{background:#bbef87;color:#172e38}.top .btn{border-color:#ffffff65}.top .nav .btn{color:#fff}.hero{background:#172e38;color:#fff;padding-bottom:80px}.hero .eyebrow{color:#bbef87}.hero .lead{color:#c0cfd0}.hero h1 em{font-family:inherit;color:#bbef87;font-style:normal}.hero .btn:not(.ghost){background:#bbef87;color:#172e38;border-color:#bbef87}.hero .btn.ghost{color:white;border-color:#8a9c9e}.hero .chips li{color:#d1dddd;border-color:#ffffff40}.hero-art img{border-radius:100px 6px 6px 6px}.hero-art .art-label{background:#fffef9}.stats{background:#203b45}.stats strong{color:#bbef87}.stats span{color:#d1dddd}.section-head h2{font-weight:550;letter-spacing:-.055em}.card-art{background:#dce4d9}.card{border:0;box-shadow:0 2px 0 #172e3820}.card .card-body{border:1px solid var(--line);border-top:0}.contact{background:#172e38}.contact .eyebrow{color:#bbef87}@media(max-width:700px){.top .menu-toggle{color:white;border-color:#ffffff55}.top .nav{border-color:#ffffff30}}''',
'acessoaberto':'''body{--ink:#16354f;--muted:#536c7e;--paper:#fff;--line:#cddbe6;--soft:#e4eef7;--oncolor:#fff;--focus:#9e4010;--radius:10px;--art-radius:10px}.brand-icon{border-radius:10px;background:#ffe28a;color:#123e68}.hero{background:linear-gradient(110deg,#f0f5f9 55%,#e0ecf6 55%)}.hero h1{font-size:clamp(2.8rem,5.5vw,5.3rem)}.hero h1 em{font-style:normal;font-family:inherit;text-decoration:underline;text-decoration-color:#e7bd4d;text-decoration-thickness:5px;text-underline-offset:10px}.hero-art{padding:12px;border:2px solid var(--color);border-radius:10px}.hero-art img{aspect-ratio:1.02}.hero .chips li{background:var(--paper)}.stats{border-top:3px solid var(--color)}.filters{border:2px solid var(--color)}.card-number{background:#123e68;color:white;border-color:#123e68}.features{background:var(--soft);padding:12px;border-radius:6px}.features li:before{content:'＋ ';font-size:1rem}.card-art{background:#dceaf5}.card{border-top:5px solid var(--color)}.notice{background:#fff5d3}.step{border-top:3px solid var(--color)}'''
}

def comment_html(lines):
    """Eu associo uma explicação em primeira pessoa a cada linha de HTML."""
    out=[]
    for line in lines.splitlines():
        if not line.strip(): continue
        out.append(line)
        if '<!--' in line: continue
        tag=re.search(r'<([a-zA-Z][\w-]*)',line)
        key=tag.group(1) if tag else ''
        msg={'html':'Eu declaro o idioma português do Brasil.','head':'Eu organizo as informações do documento.','meta':'Eu configuro codificação, exibição ou identificação da demonstração.','title':'Eu identifico a página na aba do navegador.','link':'Eu carrego os recursos locais da identidade visual.','h1':'Eu apresento a proposta principal desta experiência.','h2':'Eu identifico a próxima seção para orientar a navegação.','script':'Eu carrego o comportamento sem dependências externas.','img':'Eu apresento uma ilustração autoral com descrição alternativa.','button':'Eu ofereço uma ação acessível por mouse e teclado.','label':'Eu identifico explicitamente o campo do formulário.','input':'Eu limito os dados ao necessário para esta demonstração.','select':'Eu ofereço opções de escolha com rótulos claros.','article':'Eu apresento um item fictício com informações transparentes.','p':'Eu explico o funcionamento e os limites deste modelo.','a':'Eu ofereço um caminho de navegação ou contato identificado.'}.get(key,'Eu organizo este trecho da página com estrutura semântica.')
        out.append('<!-- '+msg+' -->')
    return '\n'.join(out)+'\n'

def illustration(c):
    color,accent=c['color'],c['accent']
    common=f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 600" role="img" aria-label="Ilustração autoral de {esc(c["brand"])}"><rect width="640" height="600" fill="{accent}"/><circle cx="530" cy="100" r="170" fill="{color}" opacity=".08"/>'
    if c['type']=='recycle':
        shapes=f'''<path d="M0 430Q160 340 320 420T640 360V600H0Z" fill="#b8cb9d"/><path d="M80 480V260M80 300Q-30 245 55 185Q95 95 134 200Q216 290 80 320" stroke="{color}" stroke-width="12" fill="#83a879"/><rect x="180" y="285" width="115" height="190" rx="20" fill="{color}"/><rect x="305" y="240" width="115" height="235" rx="20" fill="#faf9e8"/><rect x="430" y="305" width="115" height="170" rx="20" fill="#a2bf73"/><path d="M209 355h56m-28-28v56M333 317h58m-29-29v58M461 375h55" stroke="{accent}" stroke-width="10" stroke-linecap="round"/><path d="M220 184q105-92 209-6m-14-36 23 49-55-1" fill="none" stroke="{color}" stroke-width="12" stroke-linecap="round"/><circle cx="365" cy="105" r="25" fill="#faf9e8"/>'''
    elif c['type']=='volunteer':
        shapes=f'''<rect x="55" y="95" width="530" height="400" rx="180" fill="#eee5f5"/><path d="M125 450q45-150 145-75l66 45 68-113q38-55 70-15 18 20-2 57L374 510H160Z" fill="{color}"/><path d="M510 140q-45 150-145 75l-66-45-68 113q-38 55-70 15-18-20 2-57L261 80h214Z" fill="#d89880"/><path d="M322 215c-65-65-130 25-60 84l60 51 60-51c70-59 5-149-60-84Z" fill="{accent}" stroke="#fffaf4" stroke-width="8"/><g fill="{color}"><circle cx="80" cy="280" r="12"/><circle cx="550" cy="400" r="18"/></g><path d="M510 48v54m-27-27h54M83 450v40m-20-20h40" stroke="{color}" stroke-width="8"/>'''
    elif c['type']=='market':
        shapes=f'''<path d="M175 250q30-220 145-220t145 220" fill="none" stroke="{color}" stroke-width="18"/><path d="M100 280h440l-50 240H150Z" fill="{color}"/><path d="M125 340h390M140 400h360M155 460h330M220 290l10 220M320 290v220M420 290l-10 220" stroke="{accent}" stroke-width="5" opacity=".7"/><g><circle cx="230" cy="270" r="70" fill="#c15b3d"/><path d="M230 200q0-55 40-40" fill="none" stroke="#4e7044" stroke-width="13"/><path d="M330 290q-80-170 20-160 80-50 65 105Z" fill="#72965a"/><path d="M345 290q-10-90 30-140" fill="none" stroke="#486d37" stroke-width="7"/><ellipse cx="435" cy="260" rx="60" ry="45" fill="#deb04a"/></g><path d="M65 105h100M115 55v100" stroke="{color}" stroke-width="6"/><circle cx="540" cy="130" r="28" fill="#faf4e5"/>'''
    elif c['type']=='cowork':
        shapes=f'''<rect width="640" height="600" fill="#d8dfcc"/><path d="M70 80h300v300H70Z" fill="#f4f1e7"/><path d="M220 80v300M70 230h300" stroke="#172e38" stroke-width="12"/><path d="M75 315q85-130 145-30t145-55v145H75Z" fill="#9bb080"/><path d="M100 370h430v28H100Z" fill="#172e38"/><path d="M140 398v150M480 398v150" stroke="#172e38" stroke-width="16"/><rect x="240" y="265" width="150" height="95" rx="6" fill="#fffef9" stroke="#172e38" stroke-width="8"/><path d="M305 360v16m-35 0h70" stroke="#172e38" stroke-width="8"/><path d="M440 290v-90l50-30" fill="none" stroke="#172e38" stroke-width="9"/><path d="M460 165l65-5-15 40Z" fill="#172e38"/><path d="M410 440h100v100H410Z" fill="#b8c09d"/><path d="M420 434q-60-160 0-140 80-110 45 130" fill="#55765b"/><circle cx="555" cy="95" r="24" fill="#bbef87"/>'''
    else:
        shapes=f'''<rect x="75" y="140" width="280" height="300" rx="6" fill="#fff"/><path d="M50 150l165-95 165 95Z" fill="{color}"/><rect x="125" y="210" width="62" height="70" rx="4" fill="#b4cfe2"/><rect x="230" y="210" width="62" height="70" rx="4" fill="#b4cfe2"/><rect x="180" y="332" width="72" height="108" fill="{color}"/><path d="M30 520H540V415H360l-60 105" fill="#b1c9db" stroke="{color}" stroke-width="8"/><path d="M300 494l60-115h180" fill="none" stroke="{color}" stroke-width="8"/><circle cx="450" cy="105" r="42" fill="{color}"/><path d="M434 105h32m-16-16v32" stroke="#fff" stroke-width="8" stroke-linecap="round"/><path d="M548 280v220M510 300h76" stroke="{color}" stroke-width="9"/><rect x="490" y="230" width="110" height="62" rx="10" fill="#fff" stroke="{color}" stroke-width="6"/><path d="M515 261h60m-16-15 16 15-16 15" fill="none" stroke="{color}" stroke-width="6"/>'''
    return common+shapes+'</svg>'

def card_art(c,i):
    # Eu produzo variações leves da mesma família gráfica, sem imagens de terceiros.
    n=i%3; color=c['color'];accent=c['accent']
    shape={
      'recycle':f'<rect x="{80+n*12}" y="42" width="100" height="100" rx="18" fill="{color}"/><path d="M110 85h40m-20-20v40" stroke="{accent}" stroke-width="7"/><circle cx="235" cy="62" r="32" fill="{accent}"/><path d="M200 134q30-60 65-20" fill="none" stroke="{color}" stroke-width="8"/>',
      'volunteer':f'<circle cx="120" cy="65" r="25" fill="{color}"/><path d="M70 150q0-70 50-60t50 60" fill="{color}"/><circle cx="220" cy="65" r="25" fill="#b56b55"/><path d="M170 150q0-70 50-60t50 60" fill="#b56b55"/><path d="M152 55q18-25 33 0t-16 38q-42-25-17-38" fill="{accent}"/>',
      'market':f'<ellipse cx="165" cy="126" rx="100" ry="20" fill="{color}" opacity=".13"/><circle cx="130" cy="93" r="40" fill="{color}"/><circle cx="195" cy="86" r="42" fill="{accent}"/><path d="M120 57q-30-55 15-28M185 46q10-40 34-22" fill="none" stroke="#577144" stroke-width="9"/>',
      'cowork':f'<path d="M55 100h230v14H55Z" fill="{color}"/><path d="M80 110v40m170-40v40" stroke="{color}" stroke-width="7"/><rect x="130" y="45" width="80" height="50" rx="4" fill="{accent}" stroke="{color}" stroke-width="4"/><path d="M163 95v12" stroke="{color}" stroke-width="5"/><rect x="45" y="30" width="45" height="55" fill="{color}" opacity=".2"/>',
      'access':f'<rect x="60" y="40" width="100" height="90" rx="7" fill="{color}"/><path d="M85 85h50m-25-25v50" stroke="{accent}" stroke-width="8"/><path d="M180 130l70-65 40 65" fill="none" stroke="{color}" stroke-width="7"/><circle cx="248" cy="42" r="18" fill="{accent}"/>'
    }[c['type']]
    return f'<svg viewBox="0 0 340 170" aria-hidden="true"><circle cx="{260-n*40}" cy="130" r="100" fill="{color}" opacity=".04"/>{shape}</svg>'

def card(c,item,i):
    typ=c['type']; metadata='';details=''; price=''
    if typ=='recycle':
        metadata=' · '.join(item['materials'])
        details=f'<details class="details"><summary>Endereço e cuidados</summary><p>{esc(item["address"])}<br>{esc(item["hours"])}<br>Confirme previamente as regras de recebimento.</p></details>'
    elif typ=='volunteer':
        metadata=item['organization']+' · '+item['hours']
        details='<details class="details"><summary>Antes de participar</summary><p>Esta vaga é fictícia. Em um projeto real, confirme supervisão, acessibilidade, idade mínima, proteção de pessoas vulneráveis e termo de voluntariado antes de se inscrever.</p></details>'
    elif typ=='market':
        metadata=item['unit']+' · '+str(item['stock'])+' unidades de estoque demonstrativo'
        price=f'<div class="price">R$ {item["price"]:.2f}'.replace('.',',')+f'<small> / {esc(item["unit"])}</small></div>'
        details='<details class="details"><summary>Origem e conservação</summary><p>Produtor, estoque e preço de demonstração. Consulte rótulo, ingredientes, alergênicos, procedência e orientações reais de conservação antes de comprar.</p></details>'
    elif typ=='cowork':
        metadata=f'Até {item["capacity"]} pessoa(s) · {item["region"]}'
        price=f'<div class="price">R$ {item["price"]}<small> / hora · exemplo</small></div>'
        details='<details class="details"><summary>Estrutura e condições</summary><p>Internet, tomada e café no exemplo. Acesso ao piso, equipamentos, ruído e política de cancelamento dependem de confirmação real. Não há calendário conectado.</p></details>'
    else:
        metadata=item['region']+' · '+item['category']
        details='<ul class="features">'+''.join('<li>'+esc(f)+' · exemplo</li>' for f in item['features'])+'</ul><details class="details"><summary>Recursos sem informação</summary><p>'+esc(', '.join(item['unknown']))+'. Não informado não significa ausente. Confirme com o local.</p></details>'
    labels={'recycle':'Incluir no meu plano','volunteer':'Quero conhecer o projeto','market':'Adicionar à cesta','cowork':'Simular este espaço','access':'Adicionar ao roteiro'}
    return f'''<article class="card" data-id="{item['id']}">
<div class="card-art">{card_art(c,i)}<span class="card-number">{i+1:02d} / EXEMPLO</span></div>
<div class="card-body">
<span class="card-meta">{esc(item['label'])}</span>
<h3>{esc(item['name'])}</h3>
<p>{esc(item['description'])}</p>
<p class="card-meta">{esc(metadata)}</p>
{price}
{details}
<div class="card-footer"><button class="btn small" data-add="{item['id']}" type="button">{labels[typ]}</button></div>
</div>
</article>'''

def field(label,name,options):
    return f'<div><label for="{name}">{label}</label><select id="{name}" name="{name}">'+''.join(f'<option value="{esc(value)}">{esc(text)}</option>' for value,text in options)+'</select></div>'

def filters(c,items):
    category=sorted(set(x for i in items for x in (i.get('materials') or [i['category']])))
    regions=sorted(set(i['region'] for i in items))
    third=field('Região / modalidade','region',[('','Todas as opções')]+[(x,x) for x in regions])
    if c['type']=='access':
        third=field('Recurso que preciso','feature',[('','Qualquer recurso')]+[(x,x) for x in ['Entrada sem degrau','Banheiro adaptado','Elevador','Sinalização tátil','Apoio em Libras']])
    return f'''<form class="filters" id="filters" role="search">
<div><label for="search">O que você procura?</label><input type="search" id="search" name="search" maxlength="80" placeholder="Busque pelo nome ou descrição" autocomplete="off"></div>
{field('Material' if c['type']=='recycle' else 'Categoria','category',[('','Todas as opções')]+[(x,x) for x in category])}
{third}
<button class="btn ghost" type="reset">Limpar filtros</button>
</form>
<p id="filter-result" class="filter-result" role="status" aria-live="polite">6 resultados de demonstração</p>'''

def tool(c,items):
    kind=c['type']
    listpart='''<h3 id="plan-title">Sua seleção nesta aba</h3>
<ul id="selected-list" class="selected-list" aria-labelledby="plan-title"></ul>
<p id="selection-empty" class="hint">Você ainda não selecionou nenhum item. Explore o catálogo acima para começar.</p>'''
    if kind=='recycle':
        part='''<form id="recycle-form" class="form-grid">
<div><label for="material">Material principal</label><select id="material" required><option>Papel</option><option>Plástico</option><option>Vidro</option><option>Metal</option><option>Eletrônicos</option></select></div>
<div><label for="weight">Peso aproximado (kg)</label><input id="weight" type="number" min="0.1" max="1000" step="0.1" value="5" required inputmode="decimal"></div>
<div class="form-full"><button class="btn" type="submit">Organizar descarte</button></div>
</form>
<div id="estimate" class="result" role="status" aria-live="polite"><p>Informe um peso para preparar uma estimativa simples. Não calculamos créditos ambientais ou economia de CO₂.</p></div>'''+listpart
    elif kind in ['volunteer','access']:
        part=listpart
        if kind=='volunteer':part+='''<div class="result" id="time-total" role="status" aria-live="polite"><p>Compromisso estimado: <strong>0 h/semana</strong></p></div>'''
        else:part+='''<div class="notice">A ordem da lista não é uma rota de deslocamento. Não há cálculo de distância, inclinação ou segurança do trajeto.</div>'''
    elif kind=='market':
        part=listpart+'''<div class="totals"><span>Total ilustrativo</span><strong id="cart-total">R$ 0,00</strong></div>
<p id="minimum-note" class="hint" role="status" aria-live="polite">Pedido mínimo ilustrativo: R$ 30,00. Sem frete, cobrança ou pagamento neste site.</p>
<div class="form-grid" style="margin-top:24px">
<div><label for="pickup">Preferência de retirada</label><select id="pickup"><option>Sábado · 9h às 11h</option><option>Sábado · 11h às 13h</option></select></div>
<div><label for="substitution">Se um item faltar</label><select id="substitution"><option>Prefiro ser consultado</option><option>Prefiro retirar o item</option></select></div>
</div>
<p class="hint">Ponto de retirada: Praça da Colheita — endereço fictício. Não se desloque para este endereço.</p>
<button id="order-market" type="button" class="btn" style="margin-top:20px" disabled>Preparar consulta pelo WhatsApp</button>
<p class="hint">O botão abre uma mensagem para a MOSS Digital. Pedido, estoque e retirada não ficam confirmados.</p>'''
    else:
        part=f'''<form id="booking-form" class="form-grid">
{field('Escolha um ambiente','space',[(i['id'],i['name']) for i in items])}
<div><label for="booking-date">Data pretendida</label><input type="date" id="booking-date" required></div>
<div><label for="booking-time">Horário inicial</label><select id="booking-time">{''.join(f'<option value="{h}">{h:02d}:00</option>' for h in range(8,19))}</select></div>
<div><label for="duration">Duração</label><select id="duration">{''.join(f'<option value="{h}">{h} hora(s)</option>' for h in range(1,9))}</select></div>
<div><label for="people">Número de pessoas</label><input type="number" id="people" min="1" max="10" value="1" required></div>
<div><label for="booking-submit">Confira sua combinação</label><button type="submit" class="btn" id="booking-submit">Calcular estimativa</button></div>
</form>
<div id="booking-result" class="result" role="status" aria-live="polite"><p>Escolha data, espaço e duração. Horário de exemplo: segunda a sábado, das 8h às 19h.</p></div>
<p id="booking-error" class="hint" role="alert"></p>
<button type="button" class="btn ghost" id="download-ics" disabled style="margin-top:16px">Baixar lembrete provisório (.ics)</button>
<p class="hint">O lembrete usa o horário local do seu calendário e não confirma reserva. Capacidade, disponibilidade e orçamento final dependem da equipe.</p>'''
    actions='''<div class="tool-actions">
<button class="btn ghost" id="copy-plan" type="button">Copiar resumo</button>
<button class="btn ghost" id="download-plan" type="button">Baixar resumo (.txt)</button>
<button class="btn ghost" id="print-plan" type="button">Imprimir plano</button>
<button class="btn ghost" id="clear-plan" type="button">Limpar plano</button>
</div>
<p class="hint">A seleção existe apenas nesta aba. Ao atualizar ou fechar a página, ela é apagada. Nenhum dado é enviado automaticamente.</p>'''
    return part+actions

CONTENT={
'recycle':dict(step=[('Separe com cuidado','Escolha o material e confira as restrições. Não misture resíduos perigosos aos recicláveis comuns.'),('Encontre o destino','Use os filtros para descobrir quais pontos de exemplo recebem o material.'),('Confirme antes de sair','Baixe o plano e confirme endereço, horário e regras com o operador real.')],story='Circular é uma forma de pensar a cidade.',storytext='Um guia de coleta precisa ser fácil de consultar e honesto sobre o que sabe. O ReCiclo conecta educação ambiental, orientação de materiais e organização do descarte, sem fingir ser um serviço municipal.',questions=[('Os pontos existem de verdade?','Não. Os nomes, regiões, endereços e horários foram criados para demonstrar o modelo. Não se desloque para esses locais.'),('O simulador calcula meu impacto ambiental?','Não. Ele apenas organiza peso informado e materiais. Não estima CO₂, créditos ou certificações ambientais.'),('Posso levar pilhas, químicos ou materiais cortantes?','Este modelo não orienta o transporte desses resíduos. Procure o fabricante ou o serviço autorizado de sua cidade para instruções específicas.'),('Como cadastrar um ponto real?','Na implantação, o cliente deve validar autorização, horários, materiais aceitos, licença quando aplicável e um canal de atualização dos dados.')]),
'volunteer':dict(step=[('Escolha uma causa','Filtre pelo tema que mobiliza você e pela modalidade que cabe na sua rotina.'),('Monte seu plano','Compare a dedicação semanal ilustrativa e salve sua seleção nesta aba.'),('Converse com a equipe','Em uma operação real, confirme atividade, supervisão e termo antes de se comprometer.')],story='Não precisa fazer tudo. Pode começar com algo.',storytext='O junto. foi pensado para projetos sociais que precisam transformar boa vontade em participação responsável. Nada de contadores de impacto inventados: o foco é clareza de tarefas, tempo e compromisso.',questions=[('Selecionar uma oportunidade já me inscreve?','Não. A lista é um planejamento local, sem envio. As vagas e organizações são fictícias.'),('Existe doação ou cobrança?','Não há pagamento nem chave Pix neste modelo. Se doações forem implantadas, a organização precisará de identificação, prestação de contas e provedor adequado.'),('Menores podem participar?','Regras dependem da atividade e da organização real. Exigem avaliação de segurança, supervisão e autorizações aplicáveis. Esta demo não coleta inscrições de menores.'),('O que muda na entrega a uma ONG?','Substituímos as oportunidades e configuramos o canal real. Cadastro de participantes, proteção de dados e gestão de vagas exigem uma operação e integrações definidas.')]),
'market':dict(step=[('Escolha na banca','Filtre os produtos e conheça os produtores fictícios da nossa feira demonstrativa.'),('Monte sua cesta','Ajuste quantidades, confira o total e indique a preferência de retirada.'),('Combine a retirada','Prepare uma consulta pelo WhatsApp. O produtor precisa confirmar estoque, valor e local.')],story='O melhor ingrediente é saber de onde vem.',storytext='A Raiz Feira dá espaço a quem produz em pequena escala. Uma vitrine com cara de feira, preços legíveis e cesta sem complicação — com transparência sobre origem, ingredientes e condições de retirada.',questions=[('Os produtos estão à venda?','Não. Preços, nomes, produtores e estoques são fictícios. O exemplo não cobra nem reserva mercadorias.'),('O total inclui frete?','Não. O modelo simula retirada e não calcula frete. Na versão real, todas as condições e despesas devem ser informadas antes da confirmação.'),('O produto é orgânico ou livre de alergênicos?','Nenhuma certificação ou ausência de alergênicos é presumida. O produtor real deve fornecer rótulos, procedência, certificações quando existirem e orientações de conservação.'),('Como funcionam trocas e cancelamentos?','Na implantação, o responsável deve definir e divulgar regras compatíveis com o produto e a legislação aplicável. Este modelo não substitui a política comercial real.')]),
'cowork':dict(step=[('Encontre o ambiente','Compare capacidade, uso e preço por hora nos espaços ilustrativos.'),('Faça uma simulação','Escolha data e duração. Validamos capacidade e horário de funcionamento do exemplo.'),('Confirme com a equipe','O lembrete não reserva o espaço. A agenda real, o pagamento e a aprovação são etapas separadas.')],story='Mais que uma mesa. Um ponto de partida.',storytext='O Ponto Comum é uma proposta para espaços de trabalho que valorizam foco, encontros e flexibilidade. Aqui o cliente entende o ambiente antes de perguntar preço, sem encontrar uma reserva ficticiamente confirmada.',questions=[('A simulação bloqueia um horário?','Não. Não há sincronização com agenda ou sistema de reservas. O valor calculado é apenas uma referência ilustrativa.'),('Como é calculado o preço?','Tarifa de exemplo por hora multiplicada pela duração. O simulador não inclui serviços extras, descontos, impostos adicionais ou política de locação real.'),('O arquivo de calendário confirma minha visita?','Não. Ele cria apenas um lembrete provisório, com status tentativo. Não contém convite de equipe nem comprovação de reserva.'),('Os ambientes têm acessibilidade?','Acesso por piso, portas, sanitários e recursos precisam ser conferidos no local real. As descrições desta demo não são laudos ou certificações.')]),
'access':dict(step=[('Escolha o que precisa','Filtre os locais pelos recursos que são importantes para sua visita.'),('Consulte o contexto','Veja o que é informado e o que ainda precisa ser confirmado. Nenhum local foi auditado.'),('Monte seu roteiro','Guarde uma lista local e confirme as condições com cada espaço antes de se deslocar.')],story='Acessibilidade não cabe em um selo genérico.',storytext='O Acesso Aberto apresenta recursos individualmente e admite o que não sabe. A proposta é apoiar escolhas com mais autonomia, sem classificar pessoas nem prometer que um espaço atende todas as necessidades.',questions=[('Este guia é oficial ou certificado?','Não. É uma demonstração independente com lugares fictícios, sem vínculo com órgãos públicos, auditoria ou certificação.'),('Um recurso listado garante acesso?','Não. Dimensões, manutenção, disponibilidade e necessidades individuais variam. Confirme diretamente com o local real.'),('O que significa recurso sem informação?','Significa que não foi informado neste exemplo. Não significa que o recurso inexiste. Informação incompleta deve ser tratada com transparência.'),('O roteiro mostra o caminho acessível?','Não. Ele apenas organiza os locais selecionados. Não calcula rotas, obstáculos, transporte ou condições de segurança.')])
}

def head(c,title=None):
    title=title or c['brand']+' — '+c['folder']
    return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<meta name="description" content="{esc(c['description'])} Demonstração fictícia da MOSS Digital.">
<meta name="theme-color" content="{c['color']}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="Demonstração interativa da MOSS Digital, com dados fictícios e ilustrações autorais.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://mossdigital.com.br/demos/{c['id']}/assets/social.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Prévia do modelo {esc(c['brand'])}, criado pela MOSS Digital.">
<meta name="twitter:card" content="summary_large_image">
<title>{esc(title)}</title>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/site.css">
</head>
<body data-demo="{c['id']}">'''

def brand(c):return f'<a class="brand" href="index.html#inicio"><span class="brand-icon" aria-hidden="true">{c["icon"]}</span>{c["brand"]}</a>'

def page(c):
    content=CONTENT[c['type']];items=DATA[c['id']]
    label={'recycle':'Seu descarte, organizado.','volunteer':'Um plano que cabe na rotina.','market':'Uma cesta com escolhas suas.','cowork':'Uma estimativa, sem compromisso.','access':'Seu roteiro, com informação clara.'}[c['type']]
    storytitle=content['story'];storytext=content['storytext']
    html=head(c)+f'''
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="demo-note">DEMONSTRAÇÃO MOSS DIGITAL · marcas, dados e locais fictícios · sem vínculo com órgãos públicos</div>
<header class="top" id="inicio">
<div class="wrap top-inner">
{brand(c)}
<button class="menu-toggle" id="menu-toggle" type="button" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">☰</span></button>
<nav class="nav" id="navigation" aria-label="Navegação principal">
<a href="#explorar">{c['catalog']}</a>
<a href="#como-funciona">Como funciona</a>
<a href="#sobre">Nossa proposta</a>
<a href="#contato" class="btn small ghost">Fale com a MOSS ↗</a>
</nav>
</div>
</header>
<main id="conteudo">
<section class="hero" aria-labelledby="hero-title">
<div class="wrap hero-grid">
<div class="hero-copy">
<span class="eyebrow">{c['eyebrow']}</span>
<h1 id="hero-title">{c['title']}</h1>
<p class="lead">{c['description']}</p>
<div class="actions"><a class="btn" href="#explorar">{c['action']} <span aria-hidden="true">↗</span></a><a class="btn ghost" href="#planejar">{c['tool']}</a></div>
<ul class="chips">{''.join('<li>'+esc(tag)+'</li>' for tag in c['tags'])}</ul>
</div>
<div class="hero-art">
<img src="assets/hero.svg" width="640" height="600" alt="{esc('Ilustração autoral para '+c['brand']+': '+storytitle)}" fetchpriority="high">
<div class="art-label"><div><strong>{label}</strong><span>Explore, compare e experimente.</span></div><b aria-hidden="true">{c['icon']}</b></div>
</div>
</div>
</section>
<div class="stats"><div class="wrap stats-inner">{''.join('<div class="stat"><strong>'+a+'</strong><span>'+b+'</span></div>' for a,b in c['stats'])}</div></div>
<section id="explorar" class="section catalog-section" aria-labelledby="catalog-title">
<div class="wrap">
<div class="section-head"><div><span class="eyebrow">DESCUBRA POSSIBILIDADES</span><h2 id="catalog-title">{c['catalog']}</h2></div><p>{c['helper']}</p></div>
<noscript><p class="no-js">O catálogo pode ser lido sem JavaScript. Filtros, cálculos e planos precisam de JavaScript ativado. Você também pode falar com a MOSS pelo link no rodapé.</p></noscript>
{filters(c,items)}
<div class="cards" id="catalog">{''.join(card(c,item,i) for i,item in enumerate(items))}</div>
<div class="empty" id="empty-results" hidden><h3>Nenhum resultado por aqui.</h3><p>Experimente outro termo ou limpe os filtros para ver todas as opções.</p><button type="button" class="btn ghost" id="reset-empty">Ver todas as opções</button></div>
</div>
</section>
<section class="section tool-section" id="planejar" aria-labelledby="tool-title">
<div class="wrap tool-layout">
<div class="tool-copy"><span class="eyebrow">EXPERIMENTE DE VERDADE</span><h2 id="tool-title">{c['tool']}</h2><p>{label} Use os controles para experimentar este modelo e leve o resumo com você.</p><div class="notice">Modo de demonstração: nenhum cadastro, pedido, reserva ou inscrição é confirmado automaticamente.</div><a href="#explorar">Voltar ao catálogo ↑</a></div>
<div class="tool-card">{tool(c,items)}</div>
</div>
</section>
<section class="section steps-section" id="como-funciona" aria-labelledby="steps-title">
<div class="wrap"><span class="eyebrow">SEM COMPLICAÇÃO, SEM PROMESSAS VAZIAS</span><h2 id="steps-title">Um caminho simples.</h2><div class="steps">{''.join('<article class="step"><h3>'+a+'</h3><p>'+b+'</p></article>' for a,b in content['step'])}</div></div>
</section>
<section class="section story-section" id="sobre" aria-labelledby="story-title">
<div class="wrap story"><div class="story-art"><img src="assets/hero.svg" alt="Composição gráfica autoral da marca fictícia" width="640" height="600" loading="lazy"></div><div><span class="eyebrow">UMA PROPOSTA COM PROPÓSITO</span><h2 id="story-title">{storytitle}</h2><p>{storytext}</p><p>Esta marca foi criada para apresentar o trabalho da MOSS Digital. Não usamos depoimentos inventados como prova de resultados, selos de certificação ou números de clientes reais.</p><a class="btn ghost" href="#contato">Quero um projeto assim ↗</a></div></div>
</section>
<section class="section faq-section" id="duvidas" aria-labelledby="faq-title">
<div class="wrap faq-layout"><div><span class="eyebrow">BOM SABER ANTES</span><h2 id="faq-title">Clareza também<br>faz parte.</h2><p>Dúvidas, limites e próximos passos.</p></div><div class="faq-list">{''.join('<details><summary>'+q+'</summary><p>'+a+'</p></details>' for q,a in content['questions'])}</div></div>
</section>
<section class="section contact-section" id="contato" aria-labelledby="contact-title">
<div class="wrap contact"><div><span class="eyebrow">FALE COM QUEM CRIA</span><h2 id="contact-title">Essa ideia pode<br>ter a sua marca.</h2><p>Quer adaptar este modelo para sua organização ou negócio? Prepare uma mensagem para a MOSS Digital.</p><p>O formulário não envia nem armazena seus dados. O próximo passo abre o WhatsApp, onde você decide se deseja enviar.</p><a href="https://wa.me/5511942038103" target="_blank" rel="noopener noreferrer">Contato da MOSS: (11) 94203-8103 ↗</a></div>
<form id="contact-form">
<label for="contact-name">Como podemos chamar você?</label>
<input id="contact-name" name="name" autocomplete="given-name" maxlength="60" required placeholder="Seu primeiro nome">
<label for="contact-message" style="margin-top:16px">Conte sua ideia, sem dados sensíveis</label>
<textarea id="contact-message" name="message" maxlength="600" required placeholder="Quero adaptar este modelo para..."></textarea>
<label class="check-label" style="margin-top:16px"><input type="checkbox" id="contact-consent" required>Entendi que o contato é com a MOSS Digital e li a política de privacidade.</label>
<button class="btn" type="submit">Preparar mensagem no WhatsApp ↗</button>
<p class="hint" style="color:inherit">Não envie CPF, documentos, informações de saúde ou senhas.</p>
</form></div>
</section>
</main>
<footer class="footer"><div class="wrap"><div class="footer-grid"><div>{brand(c)}<p>Um modelo com propósito. Uma experiência com informação clara. Criado pela MOSS Digital.</p></div><div><strong>Explore</strong><a href="#explorar">{c['catalog']}</a><a href="#planejar">{c['tool']}</a><a href="#duvidas">Perguntas frequentes</a></div><div><strong>Transparência</strong><a href="privacidade.html">Privacidade e dados</a><a href="termos.html">Termos da demonstração</a><a href="#contato">Contato com a MOSS</a><a href="https://mossdigital.com.br/modelos.html">Outros modelos da MOSS ↗</a></div></div><div class="footer-bottom"><span>© <span id="year">2026</span> {c['brand']} · Marca fictícia de demonstração.</span><span>Sem cookies de publicidade · Sem coleta automática de localização</span></div></div></footer>
<div id="status" class="status" role="status" aria-live="polite" aria-atomic="true"></div>
<script src="assets/data.js"></script>
<script src="assets/app.js"></script>
</body>
</html>'''
    return comment_html(html)

APP_JS = r'''
/* Eu mantenho toda a interação local, sem bibliotecas, rastreadores ou envio silencioso. */
(function () {
  'use strict';
  const config = window.DEMO_CONFIG;
  const items = config.items;
  const byId = new Map(items.map(item => [item.id, item]));
  const selected = new Map();
  const $ = id => document.getElementById(id);
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const currency = value => value.toLocaleString('pt-BR', {style:'currency',currency:'BRL'});
  const originalLabels = new Map();
  const status = $('status');
  let statusTimer;
  let estimate = null;
  let booking = null;
  /* Eu anuncio as ações com texto seguro e sem mover o foco da pessoa. */
  function notify(message) {
    clearTimeout(statusTimer);
    status.textContent = message;
    statusTimer = setTimeout(() => { status.textContent = ''; }, 5000);
  }
  function node(tag, text, className) {
    const element = document.createElement(tag);
    if (text !== undefined) element.textContent = text;
    if (className) element.className = className;
    return element;
  }
  function button(text, label, action) {
    const element = node('button', text, 'remove');
    element.type = 'button';
    element.setAttribute('aria-label', label);
    element.addEventListener('click', action);
    return element;
  }
  function total() {
    return [...selected].reduce((sum,[id,qty]) => sum + (byId.get(id).price || 0)*qty, 0);
  }
  function hours() {
    return [...selected.keys()].reduce((sum,id) => sum+(byId.get(id).duration || 0),0);
  }
  /* Eu mantenho os botões do catálogo coerentes com a seleção e com o estoque fictício. */
  function syncButtons() {
    document.querySelectorAll('[data-add]').forEach(btn => {
      const item = byId.get(btn.dataset.add);
      if (!originalLabels.has(item.id)) originalLabels.set(item.id,btn.textContent);
      if (config.type === 'market') {
        btn.disabled = (selected.get(item.id)||0) >= item.stock;
        btn.textContent = btn.disabled ? 'Limite do estoque de exemplo' : originalLabels.get(item.id);
      } else if (config.type !== 'cowork') {
        const active = selected.has(item.id);
        btn.setAttribute('aria-pressed', String(active));
        btn.textContent = active ? 'No plano ✓ · remover' : originalLabels.get(item.id);
      }
    });
  }
  function renderSelection() {
    const list = $('selected-list');
    if (!list) return;
    list.replaceChildren();
    selected.forEach((qty,id) => {
      const item=byId.get(id);
      const li=node('li');
      const text=node('div');
      text.appendChild(node('strong',item.name));
      const detail=config.type==='market' ? currency(item.price)+' / '+item.unit : (item.hours || item.region);
      text.appendChild(node('small',detail));
      li.appendChild(text);
      if(config.type==='market') {
        const controls=node('div',undefined,'qty');
        controls.appendChild(button('−','Reduzir quantidade de '+item.name,()=>changeQuantity(id,-1)));
        controls.appendChild(node('span',String(qty)));
        const plus=button('+','Aumentar quantidade de '+item.name,()=>changeQuantity(id,1));
        plus.disabled=qty>=item.stock;
        controls.appendChild(plus);
        li.appendChild(controls);
      } else {
        li.appendChild(button('Remover','Remover '+item.name,()=>{selected.delete(id);renderSelection();notify('Item removido do plano.');}));
      }
      list.appendChild(li);
    });
    $('selection-empty').hidden=selected.size>0;
    if(config.type==='volunteer') {
      $('time-total').replaceChildren(node('p','Dedicação semanal ilustrativa:'));
      $('time-total').appendChild(node('strong',hours()+' h/semana'));
    }
    if(config.type==='market') {
      const sum=total();
      $('cart-total').textContent=currency(sum);
      $('minimum-note').textContent=sum>=30 ? 'Mínimo ilustrativo atingido. Estoque, preço final e retirada dependem de confirmação.' : 'Faltam '+currency(30-sum)+' para o pedido mínimo ilustrativo. Sem cobrança neste site.';
      $('order-market').disabled=sum<30;
    }
    syncButtons();
    /* Eu devolvo o foco a um controle persistente quando uma linha é removida. */
    if(document.activeElement===document.body) $('copy-plan').focus({preventScroll:true});
  }
  function changeQuantity(id, delta) {
    const item=byId.get(id);
    const next=(selected.get(id)||0)+delta;
    if(next>item.stock) {notify('Limite do estoque ilustrativo atingido.');return;}
    if(next<=0) selected.delete(id); else selected.set(id,next);
    renderSelection();
    notify(next<=0?'Produto removido da cesta.':'Quantidade atualizada: '+item.name+'.');
  }
  document.querySelectorAll('[data-add]').forEach(btn=>btn.addEventListener('click',()=>{
    const id=btn.dataset.add;
    if(config.type==='cowork') {
      $('space').value=id;
      invalidateBooking();
      $('planejar').scrollIntoView({behavior:'smooth',block:'start'});
      $('space').focus({preventScroll:true});
      notify('Ambiente selecionado. Escolha data e duração para simular.');
    } else if(config.type==='market') {
      changeQuantity(id,1);
    } else {
      if(selected.has(id)){selected.delete(id);notify('Item removido.');}
      else {selected.set(id,1);notify('Incluído no plano. Consulte sua seleção na seção de planejamento.');}
      renderSelection();
    }
  }));
  /* Eu filtro conteúdo já presente no HTML, preservando leitura sem JavaScript. */
  const filters=$('filters');
  function filter() {
    const term=normalize($('search').value.trim());
    const category=$('category').value;
    const region=$('region')?.value || '';
    const feature=$('feature')?.value || '';
    let count=0;
    document.querySelectorAll('#catalog .card').forEach(card=>{
      const item=byId.get(card.dataset.id);
      const categoryMatch=!category || item.category===category || (item.materials||[]).includes(category);
      const haystack=normalize([item.name,item.description,item.region,item.organization||'',...(item.materials||[]),...(item.features||[])].join(' '));
      const match=haystack.includes(term)&&categoryMatch&&(!region||item.region===region)&&(!feature||(item.features||[]).includes(feature));
      card.hidden=!match;
      if(match)count++;
    });
    $('filter-result').textContent=count+' resultado(s) de demonstração';
    $('empty-results').hidden=count>0;
  }
  filters.addEventListener('input',filter);
  filters.addEventListener('change',filter);
  filters.addEventListener('submit',event=>event.preventDefault());
  filters.addEventListener('reset',()=>setTimeout(filter,0));
  $('reset-empty').addEventListener('click',()=>{filters.reset();setTimeout(()=>{$('search').focus();filter();},0);});
  /* Eu simulo descarte apenas com peso informado, sem inventar impactos ambientais. */
  if(config.type==='recycle') {
    const form=$('recycle-form');
    form.addEventListener('input',()=>{estimate=null;$('estimate').replaceChildren(node('p','Valores alterados. Clique em organizar descarte para atualizar o plano.'));});
    form.addEventListener('submit',event=>{
      event.preventDefault();
      if(!form.reportValidity())return;
      const material=$('material').value;
      const weight=Number($('weight').value);
      if(!Number.isFinite(weight)||weight<0.1||weight>1000)return;
      const matches=items.filter(item=>item.materials.includes(material));
      estimate={material,weight};
      $('estimate').replaceChildren(node('strong',weight.toLocaleString('pt-BR')+' kg de '+material.toLowerCase()),node('p',matches.length+' ponto(s) ilustrativo(s) aceitam este material. Peso estimado, sem medição ou garantia de recebimento.'),node('p','Separe os materiais e confirme as condições com o operador real. Resíduos perigosos não fazem parte desta simulação.'));
      $('category').value=material;
      $('region').value='';$('search').value='';filter();
    });
  }
  /* Eu valido a estimativa de coworking sem criar falsa disponibilidade. */
  function localDate(date) {
    return date.getFullYear()+'-'+String(date.getMonth()+1).padStart(2,'0')+'-'+String(date.getDate()).padStart(2,'0');
  }
  function invalidateBooking() {
    booking=null;
    if(!$('booking-result'))return;
    $('booking-result').replaceChildren(node('p','Seleção alterada. Calcule novamente para gerar uma estimativa atualizada.'));
    $('booking-error').textContent='';
    $('download-ics').disabled=true;
  }
  if(config.type==='cowork') {
    const today=new Date();
    const limit=new Date(today.getFullYear(),today.getMonth(),today.getDate()+180);
    $('booking-date').min=localDate(today);
    $('booking-date').max=localDate(limit);
    const form=$('booking-form');
    form.addEventListener('input',invalidateBooking);
    form.addEventListener('change',invalidateBooking);
    form.addEventListener('submit',event=>{
      event.preventDefault();
      invalidateBooking();
      if(!form.reportValidity())return;
      const item=byId.get($('space').value);
      const date=$('booking-date').value;
      const start=Number($('booking-time').value);
      const duration=Number($('duration').value);
      const people=Number($('people').value);
      const day=new Date(date+'T12:00:00');
      let error='';
      if(!date||date<localDate(new Date())||date>localDate(limit)||Number.isNaN(day.getTime())) error='Escolha uma data de hoje até os próximos 180 dias.';
      else if(day.getDay()===0) error='O espaço de exemplo não funciona aos domingos. Escolha de segunda a sábado.';
      else if(!Number.isInteger(people)||people<1||people>item.capacity) error='Este espaço comporta até '+item.capacity+' pessoa(s). Ajuste o grupo ou escolha outro ambiente.';
      else if(!Number.isInteger(duration)||duration<1||duration>8||start<8||start+duration>19)error='A combinação precisa terminar até as 19h. Ajuste horário ou duração.';
      if(error){$('booking-error').textContent=error;return;}
      booking={id:item.id,date,start,duration,people,total:item.price*duration};
      const displayDate=day.toLocaleDateString('pt-BR');
      $('booking-result').replaceChildren(node('strong',currency(booking.total)),node('p',item.name+' · '+displayDate+' · '+String(start).padStart(2,'0')+':00 às '+String(start+duration).padStart(2,'0')+':00 · '+people+' pessoa(s).'),node('p','Estimativa: '+currency(item.price)+'/hora × '+duration+' hora(s). Disponibilidade não consultada. Reserva não confirmada.'));
      $('download-ics').disabled=false;
    });
  }
  /* Eu produzo um resumo com aviso visível para que ele não pareça comprovante. */
  function summary() {
    const lines=[config.brand+' — PLANO DE DEMONSTRAÇÃO','Dados fictícios. Sem pedido, reserva, inscrição ou atendimento confirmado.',''];
    if(estimate)lines.push('Descarte estimado: '+estimate.weight+' kg de '+estimate.material+'.');
    selected.forEach((qty,id)=>{
      const item=byId.get(id);
      let value=item.name+' — '+item.region;
      if(config.type==='market')value=qty+' × '+item.name+' ('+item.unit+') — '+currency(item.price*qty);
      if(config.type==='volunteer')value+=' — '+item.hours;
      if(config.type==='access')value+=' — recursos ilustrativos: '+item.features.join(', ')+'. Recursos não auditados.';
      lines.push(value);
    });
    if(config.type==='volunteer')lines.push('Dedicação estimada: '+hours()+' h/semana.');
    if(config.type==='market')lines.push('Total ilustrativo: '+currency(total())+'. Sem frete ou cobrança.','Retirada pretendida: '+$('pickup').value,'Substituição: '+$('substitution').value,'Estoque e retirada precisam de confirmação. Não visite o endereço fictício.');
    if(config.type==='cowork') {
      if(booking){const item=byId.get(booking.id);lines.push(item.name+' — '+booking.date+' — início '+booking.start+'h — '+booking.duration+' hora(s) — '+booking.people+' pessoa(s).','Total estimado: '+currency(booking.total)+'. Sem consulta a calendário.');}
      else lines.push('Nenhuma estimativa válida calculada.');
    }
    if(!selected.size&&!estimate&&!booking)lines.push('Nenhum item selecionado.');
    lines.push('','Confirme todas as condições com a organização real.','Modelo criado pela MOSS Digital — https://mossdigital.com.br/');
    return lines.join('\n');
  }
  function download(text,name,type) {
    const url=URL.createObjectURL(new Blob([text],{type}));
    const link=node('a');link.href=url;link.download=name;
    document.body.appendChild(link);link.click();link.remove();
    setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  $('download-plan').addEventListener('click',()=>{download(summary(),config.id+'-plano.txt','text/plain;charset=utf-8');notify('Resumo de demonstração preparado para download.');});
  $('copy-plan').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(summary());notify('Resumo copiado. Nenhum dado foi enviado.');}
    catch(error){download(summary(),config.id+'-plano.txt','text/plain;charset=utf-8');notify('Cópia não permitida pelo navegador. Baixamos um arquivo de texto como alternativa.');}
  });
  $('print-plan').addEventListener('click',()=>window.print());
  $('clear-plan').addEventListener('click',()=>{
    selected.clear();estimate=null;
    if(config.type==='cowork'){$('booking-form').reset();invalidateBooking();}
    if(config.type==='recycle'){$('recycle-form').reset();$('estimate').replaceChildren(node('p','Plano limpo. Informe material e peso para recomeçar.'));}
    renderSelection();notify('Plano limpo. Nenhum dado ficou armazenado.');
  });
  /* Eu identifico o destinatário real e mantenho o envio sob controle da pessoa. */
  function openWhatsApp(message) {
    window.open('https://wa.me/5511942038103?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  }
  if(config.type==='market')$('order-market').addEventListener('click',()=>{
    if(total()<30){notify('Adicione itens até o mínimo ilustrativo de R$ 30.');return;}
    openWhatsApp('Olá, MOSS Digital! Estou testando a demo Raiz Feira. Não é um pedido real.\n\n'+summary());
  });
  if(config.type==='cowork')$('download-ics').addEventListener('click',()=>{
    if(!booking)return;
    const pad=value=>String(value).padStart(2,'0');
    const date=booking.date.replace(/-/g,'');
    const start=date+'T'+pad(booking.start)+'0000';
    const end=date+'T'+pad(booking.start+booking.duration)+'0000';
    const stamp=new Date().toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
    const uid='demo-'+Date.now()+'-'+Math.random().toString(36).slice(2)+'@mossdigital.com.br';
    const lines=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//MOSS Digital//Demo Ponto Comum//PT-BR','CALSCALE:GREGORIAN','BEGIN:VEVENT','UID:'+uid,'DTSTAMP:'+stamp,'DTSTART:'+start,'DTEND:'+end,'SUMMARY:Lembrete de DEMO - reserva NAO confirmada','DESCRIPTION:Simulacao ficticia. Sem confirmacao ou consulta a agenda. Horario local do calendario.','STATUS:TENTATIVE','TRANSP:TRANSPARENT','END:VEVENT','END:VCALENDAR'];
    download(lines.join('\r\n')+'\r\n','ponto-comum-lembrete-provisorio.ics','text/calendar;charset=utf-8');
    notify('Lembrete provisório preparado. Isso não confirma reserva.');
  });
  $('contact-form').addEventListener('submit',event=>{
    event.preventDefault();
    const form=event.currentTarget;
    if(!form.reportValidity())return;
    const name=$('contact-name').value.trim();
    const message=$('contact-message').value.trim();
    if(!name||!message){notify('Preencha nome e mensagem com texto, não apenas espaços.');return;}
    openWhatsApp('Olá, MOSS Digital! Meu nome é '+name+'. Conheci a demonstração '+config.brand+'.\n\n'+message);
    notify('WhatsApp aberto para revisão. A mensagem só será enviada se você confirmar lá.');
  });
  /* Eu mantenho o menu móvel operável e o ano atualizado. */
  const menuToggle=$('menu-toggle');
  const navigation=$('navigation');
  function closeMenu(){navigation.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');}
  menuToggle.addEventListener('click',()=>{const open=navigation.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));});
  navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&navigation.classList.contains('open')){closeMenu();menuToggle.focus();}});
  $('year').textContent=new Date().getFullYear();
  syncButtons();
  filter();
})();
'''

def legal(c,kind):
    privacy=kind=='privacidade'
    title='Privacidade e dados' if privacy else 'Termos da demonstração'
    if privacy:
        sections=[('Quem responde por esta demonstração','Este é um modelo fictício criado pela MOSS Digital. O contato comercial demonstrativo é (11) 94203-8103. Antes de implantar para outra organização, substitua o responsável, os contatos e as informações sobre tratamento de dados.'),('O que acontece no seu navegador','Filtros, planos, cesta e cálculos funcionam em memória nesta aba. O site não usa localStorage, banco de dados, cookies de publicidade ou geolocalização. Atualizar ou fechar a página apaga a seleção.'),('Formulários e WhatsApp','Nome e mensagem são usados apenas para preparar um link de WhatsApp após sua ação explícita. Não ficam armazenados nesta demo nem são enviados a um servidor do projeto. Ao abrir o WhatsApp, você passa a usar um serviço externo, sujeito às próprias políticas. A mensagem só é enviada quando você confirmar no serviço.'),('Downloads, área de transferência e impressão','Cópia, downloads e impressão acontecem apenas quando solicitados. Os arquivos contêm sua seleção demonstrativa, não dados de cadastro. A área de transferência depende de permissão do navegador; quando indisponível, oferecemos arquivo de texto.'),('Hospedagem e registros técnicos','A página não instala analytics. A plataforma de hospedagem pode processar IP e registros técnicos necessários à entrega do site, de acordo com suas próprias políticas. Na versão publicada desta demo, a hospedagem é GitHub Pages. Não prometemos ausência de todo registro de infraestrutura.'),('Seus direitos e a versão final','Para informações sobre uma conversa comercial enviada à MOSS, use o contato indicado. Na implantação real, o controlador deve definir finalidade, base legal, acesso, retenção, segurança e atendimento a direitos conforme a operação e a LGPD. Este texto é uma base de demonstração, não consultoria jurídica.'),('Dados sensíveis e crianças','Não informe documentos, dados bancários, senhas, dados de saúde ou dados de menores. Este modelo não realiza inscrição de pessoas vulneráveis nem verificação de consentimento de responsáveis.')]
    else:
        sections=[('Finalidade e identidade','As marcas, organizações, produtos, preços, estoques, locais, regiões e horários são fictícios e servem exclusivamente à apresentação do modelo. Não há vínculo com órgãos públicos, certificação, auditoria ou garantia de resultados.'),('Sem contratação automática','Nenhum filtro, plano, cálculo, download, inscrição, cesta ou arquivo de calendário confirma serviço, vaga, pedido ou reserva. O WhatsApp abre uma consulta à MOSS Digital, não um contato com uma empresa ou organização real apresentada nos exemplos.'),('Informações de utilidade pública','Não use endereços fictícios como destino. No guia de acessibilidade, recursos não auditados e informações ausentes não constituem laudo; a lista não é rota de deslocamento. Para coleta de resíduos, confirme os procedimentos com operador autorizado ou serviço público da sua cidade.'),('Preços e pagamentos','Os valores são referências ilustrativas. O site não cobra, não processa pagamentos e não reserva estoque. Condições finais, taxas, cancelamento, reembolso e obrigações comerciais devem ser definidos pelo responsável na implantação real.'),('Conteúdo e acessibilidade','As ilustrações foram criadas para a demonstração. A interface inclui foco visível, estrutura semântica, rótulos e controles nativos. Não declaramos certificação WCAG ou conformidade jurídica sem auditoria específica e correções da implantação final.'),('Uso responsável','Não envie dados sensíveis. O conteúdo não substitui aconselhamento profissional, aprovação regulatória, avaliação de segurança ou orientação individualizada. Confirme informações e condições com responsáveis reais antes de tomar decisões.'),('Entrega ao cliente','O pacote contém arquivos editáveis e checklist de implantação. Publicar um arquivo não conclui a operação comercial: identidade, dados verificados, políticas, domínio, canais de atendimento e integrações precisam ser aprovados. Contato de criação: MOSS Digital, (11) 94203-8103.')]
    html=head(c,title+' — '+c['brand'])+f'\n<main class="legal">\n{brand(c)}\n<a class="btn ghost" href="index.html">← Voltar à demonstração</a>\n<h1>{title}</h1>\n<p>Versão demonstrativa · Revisão na data de entrega ao cliente.</p>\n'
    for heading,text in sections:html+=f'<section><h2>{heading}</h2>\n<p>{text}</p></section>\n'
    html+='</main>\n</body>\n</html>'
    return comment_html(html)

def docs(c):
    return f'''# Entrega — {c['brand']} | {c['folder']}

## O que está pronto
- Layout próprio, responsivo, sem bibliotecas ou serviços pagos obrigatórios.
- Ilustrações SVG autorais, ícone e identidade visual.
- Catálogo legível mesmo sem JavaScript; filtros e estados vazios funcionais com JavaScript.
- Ferramenta de planejamento específica do segmento; resumo em texto, cópia e impressão.
- Formulário validado que prepara WhatsApp para a MOSS, sem envio automático.
- Páginas independentes de privacidade e termos.
- Navegação por teclado, foco visível, menu móvel com Escape e preferência por menos movimento.
- Sem rastreamento de marketing, geolocalização automática ou armazenamento persistente.
- `index.html` comentado em primeira pessoa; CSS e JS com comentários de organização.

## Como abrir e editar
Abra `index.html` no navegador. O pacote funciona por arquivo local; cópia de texto pode ser bloqueada pelo navegador, com download como alternativa. Para testar como site, execute `python -m http.server 8080` nesta pasta e abra http://localhost:8080/.

- `index.html`: estrutura e conteúdo inicial do catálogo.
- `assets/site.css`: identidade visual e versão móvel.
- `assets/data.js`: dados usados pelos filtros e cálculos. Ao alterar itens, atualize também os cards estáticos do HTML.
- `assets/app.js`: comportamento. Não é necessário configurar tokens ou chaves.
- `assets/hero.svg` e `assets/favicon.svg`: arte e ícone.
- `privacidade.html` e `termos.html`: textos-base que exigem revisão para a operação real.
- `404.html`: página de erro pronta para configurar como resposta 404 na hospedagem final; não altera sozinha a configuração do servidor da MOSS.

## Limites de demonstração
Todos os dados são fictícios. Não há backend, painel administrativo, login, pagamento, agenda sincronizada ou confirmação de disponibilidade. Planos e cesta existem apenas em memória nesta aba e são apagados ao atualizar a página. As mensagens abrem o WhatsApp da MOSS, não uma entidade fictícia. O contato demonstrativo é 5511942038103; deve ser confirmado antes de compartilhar ou substituído na entrega.

## Checklist obrigatório de implantação
- [ ] Aprovar nome, marca, cores, textos, fotos autorizadas e responsável legal.
- [ ] Substituir todos os dados fictícios por dados verificados e definir quem os atualiza.
- [ ] Validar regras do segmento: aceitação de resíduos, supervisão de voluntariado, rótulos/alergênicos, locação de salas ou recursos de acessibilidade, conforme o projeto.
- [ ] Configurar telefone, e-mail e canal real; retirar referências à MOSS como destinatário se não aplicáveis.
- [ ] Escolher se a operação será manual por WhatsApp ou terá backend. Definir escopo, custos e suporte dessas integrações separadamente.
- [ ] Se houver backend, implementar autenticação, controle de acesso, validação no servidor, segurança, backups e tratamento de erros. Nunca expor chaves privadas no navegador.
- [ ] Adaptar políticas à operação real, incluindo finalidade, base legal, retenção, atendimento a direitos e condições comerciais. Obter revisão jurídica quando necessária.
- [ ] Verificar nomes, horários, endereços, capacidades, preços, estoques e recursos. Nunca publicar um endereço de exemplo como real.
- [ ] Configurar domínio e HTTPS. Testar formulários, links externos, downloads e navegação com teclado e celular.
- [ ] Configurar a resposta 404 da hospedagem e ajustar URLs absolutas das imagens sociais para o domínio final.
- [ ] Auditar acessibilidade, contraste, conteúdo alternativo e desempenho na implantação final; não presumir certificação.
- [ ] A demo usa `noindex`. Somente no site real aprovado: remover `noindex`, definir canonical absoluto, imagem social absoluta e dados estruturados verdadeiros quando aplicáveis.
- [ ] Criar sitemap e robots apropriados ao domínio final e verificar Search Console do cliente. Não pedir indexação desta demo fictícia.
- [ ] Entregar arquivos, acessos de hospedagem e domínio pelo canal seguro apropriado; treinar o responsável e combinar suporte, manutenção e atualização de dados.

## Testes de aceite
1. Abrir em 390 px e 1280 px sem rolagem horizontal inesperada.
2. Navegar por Tab, abrir o menu e fechar com Escape.
3. Buscar termo inexistente, observar estado vazio e limpar filtros.
4. Adicionar/remover itens ou calcular uma estimativa válida; testar entradas inválidas.
5. Copiar/baixar o plano, imprimir e limpar a seleção.
6. Verificar que nenhum dado é enviado ou salvo sem ação e que os avisos de demonstração continuam visíveis.
7. Testar políticas e contato sem enviar mensagens reais durante a homologação.

## Hospedagem prevista na MOSS
`https://mossdigital.com.br/demos/{c['id']}/index.html`
Este endereço só estará disponível após publicação. Arquivos desta pasta local e a cópia publicada precisam ser sincronizados em futuras alterações.
'''

def build():
    for c in COLLECTION:
        dest=REPO/'demos'/c['id'];assets=dest/'assets';assets.mkdir(parents=True,exist_ok=True)
        (dest/'index.html').write_text(page(c),encoding='utf-8')
        for kind in ['privacidade','termos']:(dest/(kind+'.html')).write_text(legal(c,kind),encoding='utf-8')
        notfound=head(c,'Página não encontrada — '+c['brand'])+'\n<main class="legal">\n'+brand(c)+'\n<h1>Esse caminho ainda não existe.</h1>\n<p>O endereço pode ter mudado. Volte ao início para explorar o modelo.</p>\n<a class="btn" href="index.html">Voltar ao início</a>\n</main>\n</body>\n</html>'
        (dest/'404.html').write_text(comment_html(notfound),encoding='utf-8')
        variables=f':root{{--color:{c["color"]};--accent:{c["accent"]};--bg:{c["bg"]}}}\n'
        (assets/'site.css').write_text(variables+BASE_CSS+'\n/* Eu aplico a composição visual exclusiva deste segmento. */\n'+THEMES[c['id']],encoding='utf-8')
        (assets/'app.js').write_text(APP_JS.replace('\\\\','\\'),encoding='utf-8')
        (assets/'data.js').write_text('/* Eu disponibilizo apenas dados fictícios, sem informações pessoais. */\nwindow.DEMO_CONFIG = '+json.dumps({**c,'items':DATA[c['id']]},ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
        (assets/'hero.svg').write_text(illustration(c),encoding='utf-8')
        (assets/'favicon.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="{c["color"]}"/><path d="M20 32h24M32 20v24" stroke="{c["accent"]}" stroke-width="6" stroke-linecap="round"/></svg>',encoding='utf-8')
        (dest/'ENTREGA-AO-CLIENTE.md').write_text(docs(c),encoding='utf-8')
        (dest/'LEIA-ME.txt').write_text(f'{c["brand"]} — {c["folder"]}\n\nAbra index.html. Leia ENTREGA-AO-CLIENTE.md antes de adaptar e entregar.\nDados, marcas e locais fictícios. Contato demonstrativo com MOSS Digital.\nNão há pagamento, reserva confirmada, inscrição enviada ou backend.\nO plano funciona apenas nesta aba, sem dados persistentes.\n',encoding='utf-8')
        url=f'https://mossdigital.com.br/demos/{c["id"]}/index.html'
        (dest/'LINK-PARA-CLIENTE.txt').write_text(url+'\n\nDemonstração fictícia; revise antes de compartilhar. Disponível após publicação.\n',encoding='utf-8')
        (dest/'Abrir demo online.url').write_text('[InternetShortcut]\nURL='+url+'\n',encoding='utf-8')
        local=LOCAL/c['folder'];local.mkdir(parents=True,exist_ok=True)
        shutil.copytree(dest,local,dirs_exist_ok=True)
        print('Gerado:',c['id'])

if __name__=='__main__':build()
