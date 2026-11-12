/* ARMAZEM DA ESQUINA: vitrine, carrinho, painel e mensagens honestas. */
'use strict';
(() => { // Aplicação isolada, sem globais acidentais.
  const D = window.ARMAZEM; // Dados e configuracao editaveis em data.js.
  const $ = (seletor, raiz=document) => raiz.querySelector(seletor); // Um elemento.
  const $$ = (seletor, raiz=document) => [...raiz.querySelectorAll(seletor)]; // Lista de elementos.
  const pagina = document.body.dataset.page; // Pagina atual.
  const dinheiro = valor => Number(valor).toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); // Preco em reais.
  const semAcento = texto => String(texto??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); // Busca sem acento.
  const ephemeral = new Map(); // Memoria da sessao quando o navegador bloqueia o armazenamento.
  let avisoTimer; // Um aviso por vez.
  const idValido = valor => typeof valor==='string' && /^[a-z0-9-]{2,40}$/.test(valor); // Chave segura de produto.
  let armazenamentoIndisponivel = false; // Sinaliza persistencia que falhou.

  function elemento(tag, texto, classe) { const no=document.createElement(tag); if(texto!==undefined) no.textContent=texto; if(classe) no.className=classe; return no; } // Montagem sem interpretar HTML.
  function botao(texto, acao, classe) { const no=elemento('button',texto,classe); no.type='button'; no.addEventListener('click',acao); return no; } // Botao que nunca envia formulario.
  function leia(chave, padrao) { if(ephemeral.has(chave)) return ephemeral.get(chave); try { const bruto=localStorage.getItem(D.config.storagePrefix+chave); return bruto===null?padrao:JSON.parse(bruto); } catch { armazenamentoIndisponivel=true; return padrao; } } // Leitura restrita a esta demo.
  function grave(chave, valor) { ephemeral.set(chave,valor); try { localStorage.setItem(D.config.storagePrefix+chave,JSON.stringify(valor)); return true; } catch { armazenamentoIndisponivel=true; avisar('Seu navegador não permitiu salvar. A alteração vale só nesta sessão.'); return false; } } // Nunca guarda dado pessoal de formulario.
  function apague(chave) { ephemeral.set(chave,null); try { localStorage.removeItem(D.config.storagePrefix+chave); } catch { armazenamentoIndisponivel=true; } } // Remove apenas a chave desta demo.
  function avisar(mensagem) { clearTimeout(avisoTimer); $('#toast').textContent=mensagem; $('#toast').classList.add('visible'); avisoTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4200); } // Mensagem temporaria e anunciada.
  function avisoArmazenamento() { if(armazenamentoIndisponivel && !$('.storage-warning')) $('#site-header').prepend(elemento('p','O navegador não permitiu usar o armazenamento local. O carrinho vale apenas nesta sessão.','storage-warning')); } // Explica o limite ao visitante.

  // Catalogo do comerciante: o painel pode alterar precos, estoque e marcacoes.
  function catalogo() {
    const salvo = leia('produtos', null);
    if (!Array.isArray(salvo) || !salvo.length) return D.produtos.map(p=>({...p}));
    const validos = salvo.filter(p=>p && idValido(p.id) && D.produtos.some(original=>original.id===p.id));
    return D.produtos.map(original=>{ const alterado=validos.find(p=>p.id===original.id); return alterado?{...original,...alterado,id:original.id}:{...original}; });
  }
  function guardarCatalogo(lista) { grave('produtos', lista.map(p=>({id:p.id,preco:p.preco,precoOriginal:p.precoOriginal??null,estoque:p.estoque,top:p.top,oferta:p.oferta,destaque:p.destaque,categoria:p.categoria}))); } // Guarda apenas campos uteis.
  const porId = id => catalogo().find(p=>p.id===id); // Produto unico.

  // Carrinho em memoria do navegador: apenas codigo e quantidade.
  function carrinhoAtual() {
    const bruto = leia('carrinho', []);
    if (!Array.isArray(bruto)) return [];
    return bruto.filter(item=>item && idValido(item.id) && Number.isFinite(Number(item.qtd)) && Number(item.qtd)>0 && Number(item.qtd)<=99).map(item=>({id:item.id,qtd:Math.floor(Number(item.qtd))}));
  }
  function gravarCarrinho() { grave('carrinho', carrinhoAtual()); }
  function adicionarCarrinho(id, quantidade=1) {
    const lista = carrinhoAtual(); // Uma unica lista para ler e gravar.
    const item = lista.find(i=>i.id===id);
    const estoque = porId(id)?.estoque ?? 0;
    if (item) item.qtd = Math.min(99, item.qtd + quantidade);
    else lista.push({id,qtd:Math.min(99,Math.max(1,quantidade))});
    grave('carrinho', lista); // Salva a lista atualizada.
    const novo = carrinhoAtual().find(i=>i.id===id);
    if (novo && estoque && novo.qtd > estoque) avisar(`Restam apenas ${estoque} unidades neste exemplo.`);
    atualizarCabecalho();
    return novo;
  }
  function mudarQuantidade(id, delta) {
    const lista = carrinhoAtual();
    const item = lista.find(i=>i.id===id);
    if (!item) return;
    item.qtd += delta;
    if (item.qtd <= 0) lista.splice(lista.indexOf(item),1);
    gravarCarrinho(); atualizarCabecalho();
  }
  function limparCarrinho() { apague('carrinho'); ephemeral.delete('carrinho'); atualizarCabecalho(); }
  const totalItens = () => carrinhoAtual().reduce((soma,i)=>soma+i.qtd,0);
  const subtotal = () => carrinhoAtual().reduce((soma,i)=>soma+(porId(i.id)?.preco ?? 0)*i.qtd, 0);

  // Cabecalho, rodape e dialogos compartilhados por todas as paginas.
  $('#site-header').innerHTML=`<div class="awning" aria-hidden="true"></div><header class="site-header"><div class="wrap header-main"><a class="brand" href="index.html" aria-label="ARMAZEM DA ESQUINA — inicio"><span class="brand-mark" aria-hidden="true">🧺</span><span>${D.config.nome}<small>MERCADINHO DO BAIRRO</small></span></a><nav class="main-nav" id="main-menu" aria-label="Navegacao principal"><a href="index.html">Início</a><a href="produtos.html">Catálogo</a><a href="index.html#top10">Top 10</a><a href="anuncie.html">Anuncie sua loja</a><a href="painel.html">Painel do comerciante</a></nav><div class="header-tools"><a class="cart-button" href="carrinho.html">🛒 <span>Carrinho</span><span class="cart-count" id="cart-count">0</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-menu" aria-label="Abrir menu"><span></span><span></span></button></div></div></header>`;
  $('#site-footer').innerHTML=`<footer class="site-footer"><div class="wrap footer-grid"><div class="footer-intro"><h2>${D.config.nome}</h2><p>${D.config.slogan} Uma demonstração de mercadinho online criada pela MOSS Digital para mostrar como um comércio de bairro pode vender online sem perder a cara de bairro.</p></div><div><h2>Comprar</h2><a href="produtos.html">Catálogo completo</a><a href="index.html#top10">Top 10 mais pedidos</a><a href="carrinho.html">Meu carrinho</a><a href="produtos.html?ofertas=1">Ofertas do dia</a></div><div><h2>Prateleiras</h2>${D.categorias.map(c=>`<a href="produtos.html?categoria=${c.id}">${c.nome}</a>`).join('')}</div><div><h2>Para o comércio</h2><a href="anuncie.html">Anuncie sua loja</a><a href="painel.html">Painel do comerciante</a><a href="FONTES-FOTOS.json" target="_blank" rel="noopener">Créditos das fotos ↗</a></div></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} ${D.config.nome} • CONCEITO DEMONSTRATIVO MOSS DIGITAL</span><span>Produtos, preços, pedidos e dados pessoais são fictícios</span></div></footer>`;
  $('#site-dialogs').innerHTML=`<dialog id="order-dialog" aria-labelledby="order-title"><button class="dialog-close" data-close aria-label="Fechar pedido">×</button><p class="eyebrow">PEDIDO / PRÉVIA LOCAL</p><h2 id="order-title">Seu pedido vai para o WhatsApp</h2><p id="order-note">Nenhum pedido é enviado ou confirmado por esta demonstração. Você revisa a mensagem antes de decidir.</p><pre class="message-box" id="order-message"></pre><p class="form-note" id="order-config"></p><div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:20px"><button class="button" type="button" id="order-copy">COPIAR PEDIDO</button><a class="button secondary" id="order-send" hidden target="_blank" rel="noopener noreferrer">ABRIR WHATSAPP CONFIGURADO ↗</a></div></dialog><div id="toast" class="toast" role="status"></div>`;

  function fecharMenu(restaurar=false) { $('#main-menu').classList.remove('is-open'); $('.menu-toggle').setAttribute('aria-expanded','false'); $('.menu-toggle').setAttribute('aria-label','Abrir menu'); if(restaurar) $('.menu-toggle').focus(); }
  $('.menu-toggle').addEventListener('click',()=>{ const aberto=$('.menu-toggle').getAttribute('aria-expanded')!=='true'; $('#main-menu').classList.toggle('is-open',aberto); $('.menu-toggle').setAttribute('aria-expanded',String(aberto)); $('.menu-toggle').setAttribute('aria-label',aberto?'Fechar menu':'Abrir menu'); });
  document.addEventListener('click',evento=>{ if(!evento.target.closest('.site-header')) fecharMenu(); });
  document.addEventListener('keydown',evento=>{ if(evento.key==='Escape' && !$('dialog[open]')) fecharMenu(true); });
  $$('dialog').forEach(dialogo=>{ $('[data-close]',dialogo).addEventListener('click',()=>dialogo.close()); dialogo.addEventListener('close',()=>requestAnimationFrame(()=>{ if(!$('dialog[open]')) $('.cart-button')?.focus({preventScroll:true}); })); });
  function abrirDialogo(id) { const atual=$('dialog[open]'); if(atual) atual.close(); $(id).showModal(); }

  function atualizarCabecalho() { const contador=$('#cart-count'); if(contador) contador.textContent=totalItens(); }

  // Card de produto reutilizado em toda a vitrine.
  function cardProduto(produto) {
    const cartao=elemento('article',undefined,'product-card');
    const foto=elemento('div',undefined,'product-photo');
    const imagem=elemento('img'); imagem.src=`assets/img/card-${produto.id}.webp`; imagem.alt=`Referencia de banco do item ficticio ${produto.nome}`; imagem.width=420; imagem.height=320; imagem.loading='lazy';
    foto.append(imagem);
    if(produto.top>0){ const selo=elemento('span',`#${produto.top} mais pedido`,'badge top'); foto.append(selo); }
    else if(produto.oferta){ foto.append(elemento('span','Oferta do dia','badge')); }
    else if(produto.estoque===0){ foto.append(elemento('span','Esgotado','badge esgotado')); }
    const corpo=elemento('div',undefined,'product-body');
    corpo.append(elemento('span',D.categorias.find(c=>c.id===produto.categoria)?.nome ?? 'Mercearia','product-cat'),elemento('h3',produto.nome));
    const precos=elemento('div',undefined,'price');
    if(produto.precoOriginal && produto.precoOriginal>produto.preco){ const antigo=elemento('s',dinheiro(produto.precoOriginal)); precos.append(antigo); }
    precos.append(document.createTextNode(dinheiro(produto.preco)),elemento('small',` / ${produto.unidadeTexto}`));
    corpo.append(precos);
    const rodape=elemento('div',undefined,'product-foot');
    const link=elemento('a','VER PRODUTO'); link.href=`produto.html?id=${produto.id}`; link.style.fontWeight='800'; link.style.color='var(--verde)';
    const adicionar=botao('ADICIONAR',()=>{ adicionarCarrinho(produto.id,1); avisar(`${produto.nome} no carrinho. Demo sem compra.`); },'add-button');
    if(produto.estoque===0){ adicionar.disabled=true; adicionar.textContent='ESGOTADO'; }
    rodape.append(link,adicionar); corpo.append(rodape); cartao.append(foto,corpo);
    return cartao;
  }

  // Home: top 10, prateleiras, ofertas e destaques.
  function montarHome() {
    const topo=D.top10().map(p=>porId(p.id)).filter(Boolean).sort((a,b)=>a.top-b.top);
    const grade=$('#top10-grid');
    topo.forEach(produto=>{
      const cartao=elemento('article',undefined,'top-card');
      cartao.append(elemento('span',String(produto.top),'top-rank'));
      const foto=elemento('div',undefined,'top-photo'); const imagem=elemento('img'); imagem.src=`assets/img/card-${produto.id}.webp`; imagem.alt=`Referencia de banco do item ficticio ${produto.nome}`; imagem.width=420; imagem.height=320; imagem.loading='lazy'; foto.append(imagem);
      const info=elemento('div',undefined,'top-info');
      info.append(elemento('h3',produto.nome),elemento('p',`${dinheiro(produto.preco)} / ${produto.unidadeTexto}`));
      const link=elemento('a','VER ↗'); link.href=`produto.html?id=${produto.id}`; link.style.fontWeight='800'; link.style.color='var(--vermelho)'; info.append(link);
      cartao.append(foto,info); grade.append(cartao);
    });
    const prateleiras=$('#shelf-grid');
    D.categorias.forEach(categoria=>{
      const total=catalogo().filter(p=>p.categoria===categoria.id).length;
      const item=elemento('a',undefined,'shelf'); item.href=`produtos.html?categoria=${categoria.id}`;
      item.append(elemento('span',categoria.icone,'shelf-icon'));
      const textos=elemento('div'); textos.append(elemento('h3',categoria.nome),elemento('p',categoria.descricao)); item.append(textos);
      item.append(elemento('span',`${total} itens`,'shelf-count'));
      prateleiras.append(item);
    });
    $('#offers-grid').replaceChildren(...D.ofertas().map(p=>porId(p.id)).filter(Boolean).map(cardProduto));
    $('#featured-grid').replaceChildren(...D.destaques().map(p=>porId(p.id)).filter(Boolean).map(cardProduto));
    const passos=[['1','Escolha no site','Procure pelo que precisa ou abra o top 10 e veja o que mais sai.'],['2','Monte o carrinho','Adicione os itens, ajuste a quantidade e escolha entrega ou retirada.'],['3','Fale com o comércio','A demo prepara a mensagem no WhatsApp. Você decide se envia.']];
    $('#passos-grid').replaceChildren(...passos.map(([numero,titulo,texto])=>{
      const bloco=elemento('div',undefined,'shelf'); const marca=elemento('span',numero,'shelf-icon'); marca.style.background='var(--verde)'; marca.style.color='#fff'; marca.style.fontSize='30px'; marca.style.fontWeight='800';
      const textos=elemento('div'); textos.append(elemento('h3',titulo),elemento('p',texto)); bloco.append(marca,textos); return bloco;
    }));
    const depoimentos=[['“Chego no WhatsApp, mando a lista e o pão chega quentinho. É a mercearia que eu sempre quis.”','Dona Sônia','PERSONAGEM FICTÍCIO • CLIENTA DO BAIRRO'],['“Coloco o preço do dia e aviso quando acaba. Simples assim, sem aplicativo.”','Sr. Aparecido','PERSONAGEM FICTÍCIO • COMERCIANTE'],['“Achei o café no top 10 e voltei pra comprar arroz também.”','Júlia','PERSONAGEM FICTÍCIO • NOVA CLIENTE']];
    $('#quotes-grid').replaceChildren(...depoimentos.map(([frase,autor,rotulo])=>{ const figura=elemento('figure'); figura.append(elemento('blockquote',frase),elemento('figcaption',autor),elemento('small',rotulo)); return figura; }));
    $('#quick-search').addEventListener('submit',evento=>{ evento.preventDefault(); const termo=$('#quick-search [name=busca]').value.trim(); location.href=`produtos.html${termo?`?busca=${encodeURIComponent(termo)}`:''}`; });
  }

  // Catalogo: filtros combinaveis e ordenacao.
  function montarCatalogo() {
    const params=new URLSearchParams(location.search);
    const categorias=$('#f-categorias');
    D.categorias.forEach(categoria=>{ const marca=elemento('label'); const caixa=elemento('input'); caixa.type='checkbox'; caixa.value=categoria.id; marca.append(caixa,document.createTextNode(categoria.nome)); categorias.append(marca); });
    const busca=$('#f-busca'); const preco=$('#f-preco'); const soTop=$('#f-top10'); const soOfertas=$('#f-ofertas'); const soDisponivel=$('#f-disponivel'); const ordem=$('#f-ordem');
    if(params.get('busca')) busca.value=params.get('busca');
    if(params.get('categoria')) { const alvo=$$('#f-categorias input').find(c=>c.value===params.get('categoria')); if(alvo) alvo.checked=true; }
    if(params.get('ofertas')) soOfertas.checked=true;
    if(params.get('top10')) soTop.checked=true;
    function aplicar() {
      const marcadas=$$('#f-categorias input:checked').map(c=>c.value);
      const termo=semAcento(busca.value.trim());
      let lista=catalogo().filter(produto=>{
        if(marcadas.length && !marcadas.includes(produto.categoria)) return false;
        if(termo && !semAcento(`${produto.nome} ${produto.descricao} ${produto.categoria}`).includes(termo)) return false;
        if(preco.value && produto.preco>Number(preco.value)) return false;
        if(soTop.checked && produto.top<=0) return false;
        if(soOfertas.checked && !produto.oferta) return false;
        if(soDisponivel.checked && produto.estoque<=0) return false;
        return true;
      });
      const chave=ordem.value;
      if(chave==='barato') lista.sort((a,b)=>a.preco-b.preco);
      else if(chave==='caro') lista.sort((a,b)=>b.preco-a.preco);
      else if(chave==='top') lista.sort((a,b)=>(b.top||99)-(a.top||99));
      else if(chave==='nome') lista.sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));
      else lista.sort((a,b)=>(b.destaque?1:0)-(a.destaque?1:0)||a.nome.localeCompare(b.nome,'pt-BR'));
      $('#catalog-grid').replaceChildren(...lista.map(cardProduto));
      $('#no-results').hidden=lista.length>0;
      $('#result-count').textContent=`${lista.length} ${lista.length===1?'item encontrado':'itens encontrados'} • catálogo fictício`;
    }
    [busca,preco,soTop,soOfertas,soDisponivel,ordem].forEach(campo=>campo.addEventListener('input',aplicar));
    $$('#f-categorias input').forEach(caixa=>caixa.addEventListener('change',aplicar));
    function limpar() { busca.value=''; preco.value=''; soTop.checked=false; soOfertas.checked=false; soDisponivel.checked=false; $$('#f-categorias input').forEach(c=>c.checked=false); ordem.value='destaque'; aplicar(); }
    $('#clear-filters').addEventListener('click',limpar); $('#reset-filters').addEventListener('click',limpar);
    aplicar();
  }

  // Detalhe do produto.
  function montarProduto() {
    const id=new URLSearchParams(location.search).get('id');
    const produto=porId(id);
    const raiz=$('#product-root');
    if(!produto){ const vazio=elemento('section',undefined,'no-results'); vazio.append(elemento('h2','Produto não encontrado.'),elemento('p','Este código não existe no catálogo de demonstração.'),elemento('a','Voltar ao catálogo','button')); vazio.querySelector('a').href='produtos.html'; raiz.append(vazio); return; }
    document.title=`${produto.nome} — ${D.config.nome}`;
    const trilha=elemento('p',undefined,'form-note'); trilha.style.marginBottom='22px'; trilha.append(elemento('a','Início','text-link')); const t2=elemento('span',' / '); t2.style.margin='0 8px'; trilha.append(t2,elemento('a','Catálogo','text-link')); const t3=elemento('span',' / '); t3.style.margin='0 8px'; trilha.append(t3,document.createTextNode(produto.nome));
    const grade=elemento('div',undefined,'product-detail');
    const foto=elemento('div',undefined,'photo'); const imagem=elemento('img'); imagem.src=`assets/img/${produto.id}.webp`; imagem.alt=`Referencia de banco do item ficticio ${produto.nome}`; imagem.width=1200; imagem.height=1200; foto.append(imagem);
    const info=elemento('div');
    info.append(elemento('p',D.categorias.find(c=>c.id===produto.categoria)?.nome ?? 'Mercearia','eyebrow'),elemento('h1',produto.nome));
    const precos=elemento('div',undefined,'detail-price');
    if(produto.precoOriginal && produto.precoOriginal>produto.preco) precos.append(elemento('s',dinheiro(produto.precoOriginal)));
    precos.append(document.createTextNode(dinheiro(produto.preco)));
    info.append(precos,elemento('p',`por ${produto.unidadeTexto} • ${produto.estoque>0?`${produto.estoque} unidades no exemplo de estoque`:'esgotado no exemplo de estoque'}`,'detail-unit'));
    info.append(elemento('p',produto.descricao,'detail-desc'));
    let quantidade=1;
    const quantidadeEl=elemento('div',undefined,'qty');
    const menos=botao('−',()=>{ quantidade=Math.max(1,quantidade-1); mostrar(); },' ');
    const valor=elemento('span','1'); const mais=botao('+',()=>{ quantidade=Math.min(99,quantidade+1); mostrar(); },' ');
    function mostrar(){ valor.textContent=String(quantidade); }
    quantidadeEl.append(menos,valor,mais);
    const acoes=elemento('div',undefined,'detail-actions');
    acoes.append(quantidadeEl,botao('ADICIONAR AO CARRINHO ↗',()=>{ adicionarCarrinho(produto.id,quantidade); avisar(`${quantidade} × ${produto.nome} no carrinho. Demo sem compra.`); },'button'));
    info.append(acoes);
    const aviso=elemento('div',undefined,'info-box'); aviso.append(elemento('strong','Produto fictício, sem estoque real.'),elemento('p','Preço, unidade e quantidade são exemplos de cadastro. O carrinho não reserva item, não cobra e não envia pedido.')); info.append(aviso);
    if(produto.top>0){ const destaque=elemento('div',undefined,'info-box'); destaque.style.background='var(--areia)'; destaque.append(elemento('strong',`#${produto.top} no top 10 mais pedidos`),elemento('p','Posição fictícia do mês, usada para mostrar a ordenação da vitrine.')); info.append(destaque); }
    grade.append(foto,info); raiz.append(trilha,grade);
    const relacionados=catalogo().filter(p=>p.categoria===produto.categoria && p.id!==produto.id).slice(0,4);
    if(relacionados.length){ const bloco=elemento('section',undefined,'related'); bloco.append(elemento('h2','Da mesma prateleira')); const gradeRel=elemento('div',undefined,'product-grid'); gradeRel.style.marginTop='24px'; relacionados.forEach(p=>gradeRel.append(cardProduto(p))); bloco.append(gradeRel); raiz.append(bloco); }
  }

  // Carrinho: quantidade, entrega ou retirada e mensagem pronta.
  function montarCarrinho() {
    const corpo=$('#cart-body'); const resumo=$('#cart-summary');
    corpo.replaceChildren(); // Sempre recomeca do zero para nao duplicar linhas.
    const itens=carrinhoAtual().map(i=>({...i,produto:porId(i.id)})).filter(i=>i.produto);
    if(!itens.length){ const vazio=elemento('div',undefined,'no-results'); vazio.append(elemento('h2','Seu carrinho está vazio.'),elemento('p','Escolha alguns itens no catálogo e monte seu pedido de exemplo.'),elemento('a','Ver o catálogo','button')); vazio.querySelector('a').href='produtos.html'; corpo.append(vazio); resumo.hidden=true; return; }
    resumo.hidden=false; // O resumo volta a aparecer quando ha itens.
    const lista=elemento('div',undefined,'cart-list');
    itens.forEach(item=>{
      const linha=elemento('div',undefined,'cart-row');
      const imagem=elemento('img'); imagem.src=`assets/img/card-${item.produto.id}.webp`; imagem.alt=`Referencia de banco do item ficticio ${item.produto.nome}`; imagem.width=92; imagem.height=92;
      const textos=elemento('div'); textos.append(elemento('h3',item.produto.nome),elemento('p',`${dinheiro(item.produto.preco)} / ${item.produto.unidadeTexto}`));
      const controle=elemento('div',undefined,'qty');
      const menos=botao('−',()=>{ mudarQuantidade(item.id,-1); montarCarrinho(); },' '); const valor=elemento('span',String(item.qtd)); const mais=botao('+',()=>{ mudarQuantidade(item.id,1); montarCarrinho(); },' ');
      const remover=botao('REMOVER',()=>{ mudarQuantidade(item.id,-item.qtd); montarCarrinho(); },' '); remover.style.cssText='font-size:13px;font-weight:700;color:var(--vermelho);margin-left:10px;min-height:40px;';
      controle.append(menos,valor,mais); const acoes=elemento('div'); acoes.append(controle,remover); acoes.style.textAlign='right';
      linha.append(imagem,textos,acoes); lista.append(linha);
    });
    corpo.append(lista);
    const modo=leia('entrega','entrega');
    resumo.replaceChildren(elemento('h3',undefined,'Resumo do pedido'),elemento('p','Valores fictícios. O frete é um exemplo a combinar com o comércio.','form-note'));
    const opcoes=elemento('div',undefined,'delivery-options');
    [['entrega','Entrega no bairro',D.config.entrega.prazo],['retirada','Retirar na loja',D.config.entrega.retirada]].forEach(([valorRotulo,texto,nota])=>{
      const opcao=elemento('label',undefined,'delivery-option'); const radio=elemento('input'); radio.type='radio'; radio.name='entrega'; radio.value=valorRotulo; radio.checked=modo===valorRotulo;
      radio.addEventListener('change',()=>{ grave('entrega',valorRotulo); montarCarrinho(); });
      const textos=elemento('div'); textos.append(elemento('strong',texto),elemento('small',nota)); opcao.append(radio,textos); opcoes.append(opcao);
    });
    resumo.append(opcoes);
    const linhas=[['Produtos',`${totalItens()} itens`],['Subtotal',dinheiro(subtotal())],[D.config.entrega.taxa,'a combinar']];
    linhas.forEach(([rotulo,valor])=>{ const linha=elemento('div',undefined,'summary-row'); linha.append(elemento('span',rotulo),elemento('span',valor)); resumo.append(linha); });
    const total=elemento('div',undefined,'summary-row total'); total.append(elemento('span','Total dos produtos'),elemento('span',dinheiro(subtotal()))); resumo.append(total);
    const enviar=botao('FINALIZAR NO WHATSAPP ↗',()=>{ prepararPedido(); },'button full'); enviar.style.marginTop='18px'; resumo.append(enviar);
    const vaziar=botao('ESVAZIAR CARRINHO',()=>{ limparCarrinho(); montarCarrinho(); },'text-link'); resumo.append(vaziar);
  }
  function prepararPedido() {
    const itens=carrinhoAtual().map(i=>({...i,produto:porId(i.id)})).filter(i=>i.produto);
    const modo=leia('entrega','entrega');
    const linhas=['PEDIDO DE DEMONSTRAÇÃO — ARMAZÉM DA ESQUINA','','Itens:'];
    itens.forEach(item=>linhas.push(`- ${item.qtd} × ${item.produto.nome} (${dinheiro(item.produto.preco)} / ${item.produto.unidadeTexto}) = ${dinheiro(item.produto.preco*item.qtd)}`));
    linhas.push('','Total dos produtos: '+dinheiro(subtotal()),'Entrega: '+(modo==='retirada'?D.config.entrega.retirada:D.config.entrega.prazo+' '+D.config.entrega.raio),'Frete: '+D.config.entrega.taxa,'','Pedido fictício de demonstração. Nada foi cobrado, reservado ou enviado.');
    $('#order-message').textContent=linhas.join('\n');
    const telefone=leia('whatsapp',D.config.whatsapp);
    const valido=/^\d{10,15}$/.test(telefone||'');
    $('#order-send').hidden=!valido;
    if(valido) $('#order-send').href=`https://wa.me/${telefone}?text=${encodeURIComponent(linhas.join('\n'))}`;
    $('#order-config').textContent=valido?'Ao abrir o WhatsApp, você decide se envia a mensagem. Nenhum pedido foi confirmado aqui.':'Contato do comércio não configurado nesta demonstração. Copie a mensagem e envie ao comerciante pelo canal que preferir.';
    abrirDialogo('#order-dialog');
  }
  async function copiar(texto) { try { if(navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(texto); return true; } } catch {} const area=elemento('textarea'); area.value=texto; area.style.position='fixed'; area.style.opacity='0'; document.body.append(area); area.select(); let ok=false; try { ok=document.execCommand('copy'); } catch {} area.remove(); return ok; }
  $('#order-copy').addEventListener('click',async()=>{ avisar(await copiar($('#order-message').textContent)?'Pedido copiado. Nada foi enviado.':'Não foi possível copiar. Selecione o texto e copie manualmente.'); });

  // Anuncie: previa do anuncio, sem envio automatico.
  function montarAnuncie() {
    const select=$('#shop-categoria'); D.categorias.forEach(c=>{ const opcao=elemento('option',c.nome); opcao.value=c.id; select.append(opcao); });
    const form=$('#shop-form');
    form.addEventListener('submit',evento=>{
      evento.preventDefault();
      const campos=form.elements;
      const telefone=campos.whatsapp.value.replace(/\D/g,'');
      const erro=telefone && (telefone.length<10||telefone.length>15)?'Informe um telefone demonstrativo com 10 a 15 dígitos ou deixe em branco.':campos.nome.value.trim().length<2?'Informe o nome da loja.':'';
      $('#shop-error').textContent=erro; if(erro) return;
      const texto=['ANÚNCIO DE DEMONSTRAÇÃO — ARMAZÉM DA ESQUINA','',`Loja: ${campos.nome.value.trim()}`,`Contato: ${campos.contato.value.trim()}`,`WhatsApp: ${campos.whatsapp.value.trim()||'não informado'}`,`E-mail: ${campos.email.value.trim()||'não informado'}`,`Bairro de atendimento: ${campos.bairro.value.trim()}`,`Categoria principal: ${campos.categoria.options[campos.categoria.selectedIndex].text}`,`Itens no catálogo: ${campos.itens.value}`,`Objetivo: ${campos.objetivo.value}`,`Fotografias: ${campos.fotos.value}`,'','Prévia local, não enviada. Nenhuma foto ou dado foi transmitido.'];
      $('#shop-text').textContent=texto.join('\n');
      $('#shop-preview').hidden=false;
      const telefoneLimpo=telefone; const valido=/^\d{10,15}$/.test(telefoneLimpo);
      $('#shop-send').hidden=!valido;
      if(valido) $('#shop-send').href=`https://wa.me/${telefoneLimpo}?text=${encodeURIComponent(texto.join('\n'))}`;
      $('#shop-preview').scrollIntoView({behavior:'smooth',block:'nearest'});
    });
    form.addEventListener('input',()=>{ $('#shop-preview').hidden=true; });
    $('#shop-copy').addEventListener('click',async()=>{ avisar(await copiar($('#shop-text').textContent)?'Anúncio copiado. Nada foi enviado.':'Selecione o texto e copie manualmente.'); });
  }

  function iniciar() {
    atualizarCabecalho();
    if(pagina==='home') montarHome();
    if(pagina==='catalog') montarCatalogo();
    if(pagina==='product') montarProduto();
    if(pagina==='cart') montarCarrinho();
    if(pagina==='advertise') montarAnuncie();
    avisoArmazenamento();
    window.ARMAZEM_API={D,elemento,botao,catalogo,guardarCatalogo,porId,carrinhoAtual,gravarCarrinho,adicionarCarrinho,mudarQuantidade,limparCarrinho,totalItens,subtotal,leia,grave,apague,avisar,dinheiro,copiar}; // API minima para o painel local.
  }
  iniciar();
})();
