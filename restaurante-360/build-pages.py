"""Gera a vitrine e os documentos estáticos. Não executa publicação ou integração externa."""
from pathlib import Path
import importlib.util
import json, subprocess
from html import escape

HERE=Path(__file__).resolve().parent
def annotated(text):
    output=[]
    for line in text.splitlines():
        if not line.strip():continue
        output.append(line)
        if '<!--' not in line:output.append('<!-- Eu organizo este trecho para apresentar a experiência e os limites da demonstração. -->')
    return '\n'.join(output)+'\n'

def head(title):return f'''<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, follow">
<meta name="description" content="Restaurante demonstrativo com à la carte, buffet por peso, rodízio e uma operação integrada para experimentar. Modelo MOSS Digital, dados fictícios.">
<meta property="og:title" content="{title}">
<meta property="og:description" content="Conheça a vitrine e experimente a operação de restaurante misto da MOSS Digital. Demonstração fictícia, sem pagamentos reais.">
<meta property="og:type" content="website">
<meta property="og:image" content="https://mossdigital.com.br/restaurante-360/assets/social.png">
<meta name="twitter:card" content="summary_large_image">
<title>{title}</title>
<link rel="icon" href="assets/favicon.svg" type="image/svg+xml">
<link rel="stylesheet" href="assets/site.css">
</head>
<body>'''
brand='<a class="brand" href="index.html"><span aria-hidden="true">b.</span><div>brasa &amp; oliva<small>RESTAURANTE · EXPERIÊNCIA COMPLETA</small></div></a>'
MENU=[('Corte da casa','Proteína bovina na brasa e vegetais da estação.','Pratos',8900),('Massa do chef','Massa fresca com preparação de referência.','Pratos',6900),('Peixe na brasa','Peixe porcionado acompanhado de arroz.','Pratos',7900),('Bowl da estação','Arroz, vegetais e composição de exemplo.','Pratos',4900),('Vegetais na chapa','Uma entrada para compartilhar a mesa.','Entradas',3200),('Doce da casa','Sobremesa de referência; consulte ingredientes.','Sobremesas',2600),('Água mineral','Uma unidade de demonstração.','Bebidas',700),('Suco da estação','Porção de referência de 300 ml.','Bebidas',1400),('Cerveja 600 ml','Venda de bebidas alcoólicas apenas a maiores de 18 anos.','Bebidas',2200),('Taça de vinho','Porção de referência de 150 ml; apenas maiores de 18 anos.','Bebidas',2900)]
def brl(n):return 'R$ '+f'{n/100:.2f}'.replace('.',',')
html=head('Brasa &amp; Oliva — Restaurante 360 | MOSS Digital')+f'''
<a class="skip" href="#conteudo">Pular para o conteúdo</a>
<div class="demo">DEMONSTRAÇÃO MOSS DIGITAL · restaurante, endereço e preços fictícios · não é um estabelecimento em funcionamento</div>
<header><div class="wrap top">{brand}
<button class="mobile-nav" id="public-toggle" type="button" aria-controls="public-nav" aria-expanded="false">Menu ☰</button>
<nav id="public-nav" aria-label="Navegação principal"><a href="#experiencia">A experiência</a><a href="#cardapio">Cardápio</a><a href="#visita">Sua visita</a><a class="btn" href="painel.html">Testar operação 360 ↗</a></nav>
</div></header>
<main id="conteudo">
<section class="hero"><div class="wrap hero-grid"><div><span class="eyebrow">BOA COMIDA. BOA MESA. BOAS CONVERSAS.</span><h1>À sua maneira.<br>Ao nosso<br><em>melhor fogo.</em></h1><p class="lead">O encontro entre a liberdade do buffet, o cuidado do à la carte e o tempo generoso de um rodízio. A mesma mesa, muitas possibilidades.</p><div class="actions"><a class="btn" href="#cardapio">Conhecer o cardápio ↗</a><a class="btn ghost" href="painel.html">Experimentar o sistema</a></div><p class="subline">MARCA FICTÍCIA · ARTES AUTORAIS · MODELO PERSONALIZÁVEL</p></div>
<figure class="hero-art"><img src="assets/mesa.svg" width="700" height="760" alt="Ilustração autoral de prato na brasa, vegetais e talheres sobre uma mesa"><figcaption><strong>Três formas de aproveitar.<br>Um só cuidado em servir.</strong><small>À la carte · Buffet por peso · Rodízio</small></figcaption></figure>
</div></section>
<div class="strip"><div class="wrap strip-inner"><div><strong>À la carte</strong><span>Escolhas com personalidade.</span></div><div><strong>Buffet por peso</strong><span>Você escolhe. A balança orienta.</span></div><div><strong>Rodízio</strong><span>Uma experiência por pessoa.</span></div></div></div>
<section class="section" id="experiencia"><div class="wrap"><div class="section-head"><div><span class="eyebrow">CADA ENCONTRO TEM SEU JEITO</span><h2>Uma casa.<br>Três experiências.</h2></div><p>Um modelo pensado para grandes restaurantes que atendem diferentes públicos e modalidades, sem perder a clareza das informações.</p></div><div class="three"><article class="card"><span class="num">01 / À LA CARTE</span><h3>Seu prato, sua escolha.</h3><p>Produtos com preço individual, preparação e acompanhamento apresentados com clareza.</p><span class="price">A partir de R$ 32<small> / opção de exemplo</small></span><a href="#cardapio">Explorar o menu ↗</a></article><article class="card"><span class="num">02 / BUFFET</span><h3>Um pouco do que você gosta.</h3><p>Na demo operacional, peso bruto e tara calculam o peso líquido do prato em gramas.</p><span class="price">R$ 109,90<small> / kg · ilustrativo</small></span><a href="painel.html">Simular a pesagem ↗</a></article><article class="card"><span class="num">03 / RODÍZIO</span><h3>O tempo de aproveitar.</h3><p>Valores por pessoa, com modalidade adulta e infantil. Faixa etária e regras a definir na implantação.</p><span class="price">R$ 94,90<small> / adulto · ilustrativo</small></span><span class="small">Infantil: R$ 59,90 · valor de demonstração.</span></article></div></div></section>
<section class="section" id="cardapio"><div class="wrap"><div class="section-head"><div><span class="eyebrow">UM MENU COM HISTÓRIA PARA CONTAR</span><h2>A mesa começa<br>pela escolha.</h2></div><p>Valores e preparações fictícios. Na entrega real, o restaurante aprova ingredientes, disponibilidade, preços e informações sobre alergênicos.</p></div>
<div class="tabs" role="group" aria-label="Filtrar cardápio">{''.join('<button type="button" data-filter="'+c+'" aria-pressed="'+str(c=='Todos').lower()+'">'+c+'</button>' for c in ['Todos','Pratos','Entradas','Sobremesas','Bebidas'])}</div>
<p class="subline" id="menu-count" role="status" aria-live="polite">10 opções de demonstração</p>
<div class="menu-list">{''.join('<article class="menu-item" data-category="'+c+'"><div><h3>'+name+'</h3><p>'+desc+'</p></div><strong>'+brl(price)+'</strong></article>' for name,desc,c,price in MENU)}</div>
<div class="notice">Imagens são ilustrações, não fotos dos pratos. Consulte ingredientes, alergênicos e condições de preparo com o responsável real. Não há garantia de ausência de contaminação cruzada.</div>
</div></section>
<section class="section experience"><div class="wrap story"><img src="assets/mesa.svg" alt="Arte gastronômica autoral em tons de verde, terracota e areia" width="700" height="760" loading="lazy"><div><span class="eyebrow">A HOSPITALIDADE ESTÁ NOS DETALHES</span><h2>Da chegada<br>à última conversa.</h2><p>Recepção, salão, cozinha e caixa não podem ser ilhas. Este projeto mostra como uma experiência gastronômica pode ter uma identidade forte por fora e um fluxo claro por dentro.</p><p>Sem avaliações inventadas, números de clientes ou selos fictícios. Aqui, você pode testar o que funciona e conhecer o que ainda depende de integração real.</p><a class="btn ghost" href="painel.html">Conhecer o painel operacional ↗</a></div></div></section>
<section class="section"><div class="wrap operation"><div><span class="eyebrow">POR TRÁS DE UMA BOA MESA</span><h3>Uma operação inteira<br>para experimentar.</h3><p class="lead">Demonstração local com fluxo misto, cálculos em centavos e regras de estoque e caixa.</p><a class="btn" href="painel.html">Abrir operação 360 ↗</a></div><div><ul><li>Mapa com 16 mesas</li><li>À la carte e bebidas</li><li>Buffet com peso e tara</li><li>Rodízio adulto e infantil</li><li>Cozinha e bar separados</li><li>Divisão e pagamentos parciais</li><li>Reservas e fila de espera</li><li>Delivery e retirada</li><li>Estoque e perdas</li><li>Relatórios e perfis de interface</li></ul><div class="notice">Sem backend, autenticação segura, pagamento, emissão fiscal, impressoras ou sincronização entre aparelhos.</div></div></div></section>
<section class="section" id="visita"><div class="wrap callout"><div><span class="eyebrow">INFORMAÇÕES DE EXEMPLO</span><h2>Uma visita<br>bem combinada.</h2><p>Diariamente, 11h às 23h — horário fictício.</p><p>Alameda de Exemplo, 240 — endereço fictício. Não se desloque para esse endereço.</p><p>Recursos de acessibilidade, estacionamento, restrições alimentares e capacidade devem ser confirmados no estabelecimento real.</p></div><div><h3>Este restaurante é uma demonstração.</h3><p>Para contratar um site ou sistema personalizado, fale com a MOSS Digital. O botão não reserva uma mesa nem envia pedidos a um restaurante.</p><a class="btn sand" href="https://wa.me/5511942038103?text=Ol%C3%A1%2C%20MOSS%20Digital%21%20Quero%20conhecer%20o%20projeto%20Restaurante%20360%20para%20o%20meu%20neg%C3%B3cio." target="_blank" rel="noopener noreferrer">Falar com a MOSS Digital ↗</a><a class="btn sand" href="painel.html">Experimentar sem cadastro</a></div></div></section>
<section class="section"><div class="wrap faq"><div><span class="eyebrow">CLAREZA TAMBÉM É SERVIR BEM</span><h2>Antes de<br>começar.</h2></div><div><details><summary>Posso misturar as modalidades na mesma mesa?</summary><p>Sim. Na demo, uma comanda reúne pratos, bebidas, buffet por peso e rodízio por pessoa, com cada lançamento identificado.</p></details><details><summary>Os pagamentos e as reservas são reais?</summary><p>Não. Todos os registros são de demonstração. Não há comunicação com bancos, adquirentes, agenda externa, restaurante real ou entregador.</p></details><details><summary>O painel funciona em vários aparelhos ao mesmo tempo?</summary><p>Não. A sessão acontece nesta aba. O salvamento opcional usa apenas este navegador, sem sincronização. Uma implantação real exige servidor e banco de dados central.</p></details><details><summary>O que preciso para operar um restaurante de verdade?</summary><p>Cadastro e regras reais, infraestrutura central, autenticação, backups e suporte, além de integrações adequadas de pagamentos, emissão fiscal e equipamentos. O checklist de entrega detalha essas etapas.</p></details></div></div></section>
</main>
<footer class="footer"><div class="wrap footer-inner"><div>{brand}<p>© <span id="year">2026</span> · Brasa &amp; Oliva é uma marca fictícia de demonstração criada pela MOSS Digital.</p></div><div><a href="painel.html">Operação 360</a><a href="privacidade.html">Privacidade e limites</a><a href="ENTREGA-AO-CLIENTE.md">Guia de implantação</a><p>Contato demonstrativo: MOSS Digital · (11) 94203-8103</p></div></div></footer>
<script src="assets/site.js"></script>
</body>
</html>'''
html=html.replace('href="ENTREGA-AO-CLIENTE.md"','href="implantacao.html"')
(HERE/'index.html').write_text(annotated(html),encoding='utf-8')
privacy=head('Privacidade e limites — Restaurante 360')+f'''<main class="legal">
{brand}
<h1>Privacidade,<br>transparência e limites.</h1>
<p>Esta é uma demonstração independente da MOSS Digital. A marca, os preços, os endereços e todos os registros operacionais são fictícios.</p>
<h2>1. Sessão temporária ou salvamento opcional</h2>
<p>O painel começa em memória nesta aba. Você pode escolher salvar a demonstração no localStorage deste navegador. O salvamento não é uma conta, banco de dados central, backup em nuvem ou sincronização entre aparelhos. O site não instala cookies de publicidade nem coleta geolocalização.</p>
<h2>2. Não use informações reais</h2>
<p>Os campos de grupo, reserva, endereço e observações devem receber somente exemplos fictícios. Não insira documentos, dados de saúde, senhas, cartões ou dados reais de clientes e colaboradores. Qualquer pessoa com acesso ao mesmo perfil de navegador pode ter acesso ao conteúdo salvo.</p>
<h2>3. Exclusão, cópia e impressão</h2>
<p>O menu Configurações permite desativar o salvamento e remover apenas a chave desta demo, exportar um arquivo JSON para conferência ou reiniciar os dados. Não apagamos outros sites. A exportação não é enviada a servidor; este protótipo não importa/restaura backups. A conferência impressa é fictícia e não comprova pagamento.</p>
<h2>4. Perfis de interface não são autenticação</h2>
<p>Gerente, Garçom, Cozinha, Bar e Caixa são perfis para experimentar restrições de interface e regras locais. Qualquer visitante pode trocar o perfil. Não há login seguro ou autorização aplicada em um servidor.</p>
<h2>5. Valores, estoque e prestação de serviços</h2>
<p>Nenhuma ação efetua compra, venda, reserva real, Pix, cartão, emissão fiscal ou acionamento de entregadores e equipamentos. As fichas técnicas, os pesos informados, o consumo e os custos são referências, não dados de produção ou laudos nutricionais.</p>
<h2>6. Serviços externos</h2>
<p>O WhatsApp é aberto somente ao clicar no contato comercial e é direcionado à MOSS Digital. Você decide se envia a mensagem; o serviço externo tem políticas próprias. A hospedagem GitHub Pages pode processar registros técnicos, como IP, necessários à entrega do conteúdo, conforme suas políticas.</p>
<h2>7. Implantação real</h2>
<p>O responsável pelo restaurante precisa aprovar conteúdo, regras, identificação do fornecedor, condições comerciais e tratamento de dados. A operação real exige segurança, infraestrutura central, backups e integrações próprias. Estes textos-base não substituem revisão jurídica, adequação à LGPD ou certificações.</p>
<h2>8. Contato e direitos</h2>
<p>Para assuntos relacionados à demonstração ou a uma conversa comercial, entre em contato com a MOSS Digital pelo número (11) 94203-8103. Na implantação real, substitua os contatos e defina os canais e procedimentos adequados de atendimento a direitos.</p>
<p><a class="btn" href="index.html">Voltar ao restaurante</a> <a class="btn ghost" href="painel.html">Voltar à demonstração</a></p>
</main>
</body>
</html>'''
(HERE/'privacidade.html').write_text(annotated(privacy),encoding='utf-8')
# Eu mantenho a data selecionada independente da reconstrução do módulo de relatórios.
p=HERE/'assets/panel.js';t=p.read_text(encoding='utf-8');t=t.replace("const date=$('report-date')?.value||E.day(new Date());const m=",'const date=reportDate;const m=');t=t.replace('href="ENTREGA-AO-CLIENTE.md"','href="implantacao.html"');p.write_text(t,encoding='utf-8')
p=HERE/'painel.html';t=p.read_text(encoding='utf-8').replace('href="ENTREGA-AO-CLIENTE.md"','href="implantacao.html"');p.write_text(t,encoding='utf-8')
# Eu disponibilizo o guia também em HTML, sem depender de como a hospedagem trata Markdown.
document=head('Guia de implantação — Restaurante 360')+'\n<main class="legal">\n'+brand+'\n<p><a class="btn ghost" href="painel.html">Voltar ao painel</a></p>\n'
listing=False
for line in (HERE/'ENTREGA-AO-CLIENTE.md').read_text(encoding='utf-8').splitlines():
    if line.startswith('- '):
        if not listing:document+='<ul>\n';listing=True
        document+='<li>'+escape(line[2:])+'</li>\n';continue
    if listing:document+='</ul>\n';listing=False
    if not line.strip():continue
    if line.startswith('# '):document+='<h1>'+escape(line[2:])+'</h1>\n'
    elif line.startswith('## '):document+='<h2>'+escape(line[3:])+'</h2>\n'
    else:document+='<p>'+escape(line)+'</p>\n'
if listing:document+='</ul>\n'
document+='</main>\n</body>\n</html>'
(HERE/'implantacao.html').write_text(annotated(document),encoding='utf-8')
print('Vitrine e privacidade geradas; painel preparado.')
