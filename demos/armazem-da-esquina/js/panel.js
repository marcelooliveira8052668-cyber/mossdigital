/* Painel do comerciante: gestao local do catalogo, sem autenticacao real. */
'use strict';
(() => { // Escopo isolado, sem contaminar a vitrine.
  const A = window.ARMAZEM_API; // API minima exposta pela vitrine.
  const { D, elemento, botao, catalogo, guardarCatalogo, porId, leia, grave, avisar, dinheiro } = A; // Utilitarios compartilhados.
  const $ = seletor => document.querySelector(seletor); // Um elemento.
  const $$ = seletor => [...document.querySelectorAll(seletor)]; // Lista de elementos.

  function renderProdutos() {
    const lista = catalogo();
    $('#panel-count').textContent = `${lista.length} itens no catálogo local • edição apenas neste navegador`;
    $('#panel-rows').replaceChildren(...lista.map(produto => {
      const linha = elemento('tr');
      const nome = elemento('td'); nome.append(elemento('strong', produto.nome), elemento('small', `${produto.id} • ${D.categorias.find(c=>c.id===produto.categoria)?.nome ?? ''}`));
      const preco = elemento('td', dinheiro(produto.preco));
      const estoque = elemento('td'); const campo = elemento('input'); campo.type='number'; campo.min='0'; campo.max='9999'; campo.value=String(produto.estoque); campo.style.width='90px'; campo.setAttribute('aria-label', `Estoque de ${produto.nome}`);
      campo.addEventListener('change', () => { const novos = catalogo().map(p=>p.id===produto.id?{...p,estoque:Math.max(0,Math.min(9999,Number(campo.value)||0))}:p); guardarCatalogo(novos); avisar('Estoque atualizado neste navegador.'); renderProdutos(); });
      estoque.append(campo);
      const vitrine = elemento('td');
      const top = botao(produto.top>0?`#${produto.top} no top 10`:'Colocar no top 10', () => { const novos=catalogo().map(p=>p.id===produto.id?{...p,top:p.top>0?0:(contarTop()+1)}:p); guardarCatalogo(novos); avisar('Top 10 atualizado.'); renderProdutos(); renderTop(); });
      if(produto.top>0) top.style.background='var(--amarelo)';
      const oferta = botao(produto.oferta?'Oferta ativa':'Marcar oferta', () => { const novos=catalogo().map(p=>p.id===produto.id?{...p,oferta:!p.oferta}:p); guardarCatalogo(novos); avisar('Ofertas atualizadas.'); renderProdutos(); renderTop(); });
      if(produto.oferta) oferta.style.background='var(--vermelho)';
      vitrine.append(top,document.createTextNode(' '),oferta);
      const acoes = elemento('td');
      const precoCampo = elemento('input'); precoCampo.type='number'; precoCampo.min='0'; precoCampo.step='0.01'; precoCampo.value=String(produto.preco); precoCampo.style.width='110px'; precoCampo.setAttribute('aria-label', `Preço de ${produto.nome}`);
      precoCampo.addEventListener('change', () => { const novos=catalogo().map(p=>p.id===produto.id?{...p,preco:Math.max(0,Number(precoCampo.value)||0)}:p); guardarCatalogo(novos); avisar('Preço atualizado neste navegador.'); renderProdutos(); });
      const esconder = botao('Esgotado', () => { const novos=catalogo().map(p=>p.id===produto.id?{...p,estoque:0}:p); guardarCatalogo(novos); avisar('Item marcado como esgotado.'); renderProdutos(); }, 'danger');
      acoes.append(precoCampo,document.createTextNode(' '),esconder);
      linha.append(nome,preco,estoque,vitrine,acoes);
      return linha;
    }));
  }
  function contarTop() { return catalogo().filter(p=>p.top>0).length; }
  function renderTop() {
    const lista = catalogo().sort((a,b)=>(b.top||0)-(a.top||0));
    $('#panel-top').replaceChildren(...lista.map(produto => {
      const bloco = elemento('div'); bloco.style.cssText='display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--linha)';
      const nome = elemento('div'); nome.style.flex='1'; nome.append(elemento('strong', produto.nome), elemento('small', `posição ${produto.top>0?produto.top:'—'}`));
      const oferta = botao(produto.oferta?'Oferta ativa':'Oferta', () => { const novos=catalogo().map(p=>p.id===produto.id?{...p,oferta:!p.oferta}:p); guardarCatalogo(novos); renderTop(); renderProdutos(); });
      if(produto.oferta) oferta.style.background='var(--vermelho)';
      const top = botao(produto.top>0?'Remover do top 10':'Incluir no top 10', () => { const novos=catalogo().map(p=>p.id===produto.id?{...p,top:p.top>0?0:(contarTop()+1)}:p); guardarCatalogo(novos); renderTop(); renderProdutos(); });
      if(produto.top>0) top.style.background='var(--amarelo)';
      bloco.append(nome,oferta,top); return bloco;
    }));
  }
  function renderPedidos() {
    const exemplos = [['Dona Sônia','3 × Pão francês, 1 × Café torrado', 'R$ 43,50','Exemplo concluído'],['Sr. Aparecido','2 × Arroz agulha, 1 × Açúcar', 'R$ 23,88','Exemplo em separação'],['Júlia','1 × Azeite de oliva', 'R$ 29,90','Exemplo aguardando retirada']];
    $('#panel-orders').replaceChildren(...exemplos.map(([cliente,itens,total,situacao])=>{ const linha=elemento('tr'); linha.append(elemento('td',cliente),elemento('td',itens),elemento('td',total),elemento('td',situacao)); return linha; }));
  }
  function loja() {
    const dados = leia('loja', { nome: D.config.nome, whatsapp: D.config.whatsapp, boasVindas: D.config.slogan, entrega: D.config.entrega.prazo });
    const form = $('#store-form');
    form.elements.nome.value = dados.nome ?? '';
    form.elements.whatsapp.value = dados.whatsapp ?? '';
    form.elements.boasVindas.value = dados.boasVindas ?? '';
    form.elements.entrega.value = dados.entrega ?? '';
    form.addEventListener('submit', evento => {
      evento.preventDefault();
      const telefone = form.elements.whatsapp.value.replace(/\D/g,'');
      const erro = telefone && !/^\d{10,15}$/.test(telefone) ? 'Informe um número com 10 a 15 dígitos ou deixe em branco.' : form.elements.nome.value.trim().length < 2 ? 'Informe o nome da loja.' : '';
      $('#store-error').textContent = erro; if (erro) return;
      grave('loja', { nome: form.elements.nome.value.trim(), whatsapp: telefone, boasVindas: form.elements.boasVindas.value.trim(), entrega: form.elements.entrega.value.trim() });
      avisar('Dados da loja salvos apenas neste navegador.');
    });
  }
  $$('[data-panel-tab]').forEach(controle => controle.addEventListener('click', () => {
    $$('[data-panel-tab]').forEach(botaoPainel => botaoPainel.setAttribute('aria-pressed', String(botaoPainel === controle)));
    ['produtos','destaques','pedidos','loja'].forEach(secao => $(`#panel-${secao}`).hidden = controle.dataset.panelTab !== secao);
  }));
  $('#panel-reset').addEventListener('click', () => {
    A.apague('produtos');
    avisar('Catálogo original restaurado. Favoritos e carrinho foram preservados.');
    renderProdutos(); renderTop();
  });
  renderProdutos(); renderTop(); renderPedidos(); loja();
})();
