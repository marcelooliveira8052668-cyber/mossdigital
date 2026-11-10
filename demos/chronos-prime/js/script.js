// Seletores centralizados dos principais elementos da página.
const grade=document.querySelector('#productGrid');
const busca=document.querySelector('#search');
const categoria=document.querySelector('#category');
const ordenacao=document.querySelector('#sort');
const modalProduto=document.querySelector('#productDialog');
const modalCarrinho=document.querySelector('#cartDialog');
// Escapa textos ao montar HTML para evitar interpretações indesejadas.
function escapar(valor){return String(valor).replace(/[&<>"']/g,caractere=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[caractere]));}
// Preenche o filtro com as categorias existentes no catálogo.
[...new Set(PRODUTOS.map(p=>p.categoria))].forEach(nome=>{const opcao=document.createElement('option');opcao.value=nome;opcao.textContent=nome;categoria.append(opcao);});
// Cria atalhos acessíveis de categorias sem duplicar o catálogo.
const atalhos = document.querySelector('#categoryShortcuts');
// Adiciona um botão para mostrar todos os relógios.
const categoriasAtalho = ['', ...new Set(PRODUTOS.map(produto => produto.categoria))];
// Monta um botão por categoria, usando textContent para evitar HTML inseguro.
categoriasAtalho.forEach(nome => {
  // Cria um botão de filtro que pode ser ativado pelo teclado.
  const botao = document.createElement('button');
  // Define o tipo para não enviar formulários acidentalmente.
  botao.type = 'button';
  // Guarda o valor da categoria para utilizar no clique.
  botao.dataset.categoryShortcut = nome;
  // Define um texto claro para cada botão.
  botao.textContent = nome || 'Todos os relógios';
  // Atualiza a categoria e a lista quando o botão é selecionado.
  botao.addEventListener('click', () => { categoria.value = nome; renderizarProdutos(); });
  // Adiciona o botão à faixa de categorias.
  atalhos.append(botao);
});
// Retorna à lista completa, removendo busca, categoria e ordenação.
document.querySelector('#resetFilters').addEventListener('click', () => {
  // Limpa o texto pesquisado.
  busca.value = '';
  // Remove o filtro por categoria.
  categoria.value = '';
  // Restaura a ordem inicial do catálogo.
  ordenacao.value = 'default';
  // Desliga também o filtro de favoritos.
  somenteFavoritos = false;
  // Atualiza os cards e os atalhos visuais.
  renderizarProdutos();
});
// ALTERE AQUI: a chave separa os favoritos desta loja dos dados de outros projetos.
const CHAVE_FAVORITOS = 'chronos-prime-favoritos-v1';
// Guarda os IDs dos relógios favoritos, apenas neste navegador.
let favoritos = new Set();
// Controla se o visitante deseja ver somente os produtos favoritos.
let somenteFavoritos = false;
// Recupera os favoritos e descarta IDs que não existem no catálogo.
try {
  // Lê a lista salva anteriormente no armazenamento local.
  const dadosFavoritos = JSON.parse(localStorage.getItem(CHAVE_FAVORITOS) || '[]');
  // Aceita somente uma lista, evitando erros com dados inválidos.
  if (Array.isArray(dadosFavoritos)) {
    // Filtra valores que correspondem a produtos cadastrados.
    favoritos = new Set(dadosFavoritos.filter(id => Number.isInteger(id) && PRODUTOS.some(produto => produto.id === id)));
  } // Encerra a validação da lista recuperada.
} catch (erro) {
  // Mantém a loja funcionando mesmo se os dados locais estiverem corrompidos.
  console.warn('Não foi possível recuperar os favoritos.', erro);
} // Encerra a tentativa de recuperação.
// Atualiza o contador e o estado visual do botão de favoritos.
function atualizarIndicadorFavoritos() {
  // Mostra quantos produtos estão salvos como favoritos.
  document.querySelector('#favoritesCount').textContent = String(favoritos.size);
  // Indica para leitores de tela se o filtro está ativo.
  document.querySelector('#favoritesFilter').setAttribute('aria-pressed', String(somenteFavoritos));
  // Aplica a classe visual quando a lista de favoritos está filtrada.
  document.querySelector('#favoritesFilter').classList.toggle('active', somenteFavoritos);
} // Encerra a atualização do indicador.
// Adiciona ou remove um relógio da lista de favoritos.
function alternarFavorito(id) {
  // Ignora qualquer ID que não exista no catálogo.
  if (!PRODUTOS.some(produto => produto.id === id)) return;
  // Remove o item caso já tenha sido salvo anteriormente.
  if (favoritos.has(id)) favoritos.delete(id);
  // Salva o item caso ainda não esteja na lista.
  else favoritos.add(id);
  // Persiste a lista no dispositivo sem coletar dados pessoais.
  try { localStorage.setItem(CHAVE_FAVORITOS, JSON.stringify([...favoritos])); }
  // Não impede a navegação se o navegador bloquear o armazenamento.
  catch (erro) { console.warn('Não foi possível salvar os favoritos.', erro); }
  // Atualiza a lista e o contador imediatamente.
  renderizarProdutos();
} // Encerra a função de favoritos.
// Alterna a visualização de todos os produtos e somente os favoritos.
document.querySelector('#favoritesFilter').addEventListener('click', () => {
  // Inverte o estado atual do filtro de favoritos.
  somenteFavoritos = !somenteFavoritos;
  // Atualiza a grade de relógios.
  renderizarProdutos();
}); // Encerra o evento do filtro.
// ALTERE AQUI: limite máximo de relógios que podem ser comparados simultaneamente.
const LIMITE_COMPARACAO = 3;
// Guarda apenas IDs dos produtos escolhidos, sem dados pessoais.
const relogiosComparados = new Set();
// Localiza a janela de comparação e os controles do recurso.
const janelaComparacao = document.querySelector('#compareDialog');
// Atualiza o contador, o botão e o conteúdo da comparação.
function atualizarComparacao() {
  // Mostra a quantidade de relógios selecionados.
  document.querySelector('#compareCount').textContent = String(relogiosComparados.size);
  // Habilita a abertura somente quando houver ao menos dois relógios.
  document.querySelector('#compareOpen').disabled = relogiosComparados.size < 2;
  // Obtém apenas produtos existentes no catálogo.
  const selecionados = [...relogiosComparados].map(id => PRODUTOS.find(produto => produto.id === id)).filter(Boolean);
  // Cria cartões acessíveis com as informações demonstrativas de cada modelo.
  document.querySelector('#compareContent').innerHTML = selecionados.map(produto =>     `<article class="compare-item"><img src="${produto.imagem}" alt="Ilustração demonstrativa de ${escapar(produto.nome)}"><h3>${escapar(produto.nome)}</h3><p>${escapar(produto.categoria)}</p><strong>${moeda(produto.preco)}</strong><p>Características técnicas: a confirmar pelo lojista.</p><button type="button" data-uncompare="${produto.id}">Remover</button></article>`).join('');
  // Atualiza os estados visuais dos botões da grade.
  document.querySelectorAll('[data-compare]').forEach(botao => {
    // Verifica se este relógio está selecionado.
    const selecionado = relogiosComparados.has(Number(botao.dataset.compare));
    // Expõe o estado aos leitores de tela.
    botao.setAttribute('aria-pressed', String(selecionado));
    // Atualiza o texto sem alterar o restante do card.
    botao.textContent = selecionado ? '✓ Comparando' : 'Comparar';
  });
} // Encerra a atualização da comparação.
// Alterna a seleção de um relógio para comparação.
function alternarComparacao(id) {
  // Ignora produtos que não existem no catálogo.
  if (!PRODUTOS.some(produto => produto.id === id)) return;
  // Remove o relógio quando ele já estiver selecionado.
  if (relogiosComparados.has(id)) relogiosComparados.delete(id);
  // Adiciona outro relógio somente se houver espaço.
  else if (relogiosComparados.size < LIMITE_COMPARACAO) relogiosComparados.add(id);
  // Informa ao visitante quando o limite for atingido.
  else { window.alert('Você pode comparar até três relógios por vez.'); return; }
  // Atualiza a interface após a escolha.
  atualizarComparacao();
} // Encerra a alternância de seleção.
// Abre a janela de comparação quando o usuário clicar no botão.
document.querySelector('#compareOpen').addEventListener('click', () => { atualizarComparacao(); janelaComparacao.showModal(); });
// Fecha a janela pelo botão dedicado.
document.querySelector('#compareClose').addEventListener('click', () => janelaComparacao.close());
// Trata cliques nos botões de comparação criados dinamicamente.
document.addEventListener('click', evento => {
  // Identifica um botão de comparar ou remover da comparação.
  const botao = evento.target.closest('[data-compare], [data-uncompare]');
  // Ignora cliques fora desses botões.
  if (!botao) return;
  // Descobre o ID do produto escolhido.
  const id = Number(botao.dataset.compare || botao.dataset.uncompare);
  // Altera a seleção do produto.
  alternarComparacao(id);
}); // Encerra os eventos de comparação.
// Mostra somente produtos que atendem aos filtros ativos.
function renderizarProdutos(){const termo=busca.value.trim().toLocaleLowerCase('pt-BR');let lista=PRODUTOS.filter(p=>(!somenteFavoritos||favoritos.has(p.id))&&(!categoria.value||p.categoria===categoria.value)&&(`${p.nome} ${p.categoria}`).toLocaleLowerCase('pt-BR').includes(termo));if(ordenacao.value==='asc')lista.sort((a,b)=>a.preco-b.preco);if(ordenacao.value==='desc')lista.sort((a,b)=>b.preco-a.preco);if(ordenacao.value==='name')lista.sort((a,b)=>a.nome.localeCompare(b.nome,'pt-BR'));grade.innerHTML=lista.map(p=>`<article class="product-card"><button type="button" class="favorite-toggle ${favoritos.has(p.id) ? 'selected' : ''}" data-favorite="${p.id}" aria-pressed="${favoritos.has(p.id)}" aria-label="${favoritos.has(p.id) ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}: ${escapar(p.nome)}">${favoritos.has(p.id) ? '♥' : '♡'}</button><button class="product-image" data-detail="${p.id}" aria-label="Ver detalhes de ${escapar(p.nome)}"><img src="${p.imagem}" alt="${escapar(p.fotoValidada ? `Fotografia verificada de ${p.nome}` : `Ilustração demonstrativa de ${p.nome}`)}" loading="lazy"></button><div class="product-body"><span class="category-label">${escapar(p.categoria)}</span><h3>${escapar(p.nome)}</h3><span class="image-status">${p.fotoValidada ? "Foto verificada" : "Imagem ilustrativa"}</span><div class="price">${moeda(p.preco)}</div><div class="product-actions"><button data-detail="${p.id}">Detalhes</button><button class="add" data-add="${p.id}">+ Carrinho</button><button type="button" class="compare-card-button" data-compare="${p.id}" aria-pressed="false">Comparar</button></div></div></article>`).join('');document.querySelector('#count').textContent=`${lista.length} modelos`;document.querySelector('#empty').hidden=lista.length>0;atualizarIndicadorFavoritos();atualizarComparacao();document.querySelectorAll('[data-category-shortcut]').forEach(botao=>{const ativo=botao.dataset.categoryShortcut===categoria.value;botao.classList.toggle('active',ativo);botao.setAttribute('aria-pressed',String(ativo));});}
// EXPLICAÇÃO: constrói a ficha completa de um relógio sem inventar dados técnicos.
function abrirProduto(id) {
  // Busca o produto pelo identificador escolhido no catálogo.
  const produto = PRODUTOS.find(item => item.id === id);
  // Impede a abertura de fichas para produtos inexistentes.
  if (!produto) return;
  // ALTERE AQUI: campos reais podem ser adicionados aos objetos em js/produtos.js.
  const campos = [
    // Apresenta a categoria já cadastrada no catálogo.
    ['Categoria', produto.categoria],
    // Exibe o código único para facilitar o atendimento ao cliente.
    ['Referência', `CP-${String(produto.id).padStart(3, '0')}`],
    // Não apresenta estoque fictício como disponibilidade comercial real.
    ['Estoque', produto.estoqueReal === undefined ? 'A confirmar com a loja' : String(produto.estoqueReal)],
    // Mostra o material apenas quando tiver sido informado pelo proprietário.
    ['Material', produto.material || 'A confirmar com o fabricante'],
    // Mostra o tipo de mecanismo somente quando cadastrado.
    ['Mecanismo', produto.mecanismo || 'A confirmar com o fabricante'],
    // Mostra a pulseira apenas quando houver informação confiável.
    ['Pulseira', produto.pulseira || 'A confirmar com o fabricante'],
    // Mostra dimensões apenas quando o lojista informar.
    ['Dimensões', produto.dimensoes || 'A confirmar com o fabricante'],
    // Evita afirmar resistência à água sem documentação.
    ['Resistência à água', produto.resistenciaAgua || 'Não informada — não presumir impermeabilidade'],
    // Mostra garantia somente quando houver política cadastrada.
    ['Garantia', produto.garantia || 'A definir pelo lojista']
  ];
  // Monta as linhas da ficha com valores escapados contra inserção de HTML.
  const linhas = campos.map(([rotulo, valor]) => `<div class="spec-row"><dt>${escapar(rotulo)}</dt><dd>${escapar(valor)}</dd></div>`).join('');
  // EXPLICAÇÃO: todas as imagens da versão demonstrativa continuam identificadas como ilustrações.
  const descricaoImagem = produto.fotoValidada ? `Fotografia verificada de ${produto.nome}` : `Ilustração demonstrativa de ${produto.nome}`;
  // Preenche o modal com foto, preço, descrição e especificações documentadas.
  document.querySelector('#dialogContent').innerHTML = `
    <div class="product-detail product-detail-v7">
      <div class="detail-visual">
        <img src="${escapar(produto.imagem)}" alt="${escapar(descricaoImagem)}">
        <p class="detail-caption">${produto.fotoValidada ? 'Fotografia verificada' : 'Imagem ilustrativa — fotografia real pendente'}</p>
      </div>
      <div class="detail-information">
        <span class="category-label">${escapar(produto.categoria)}</span>
        <h2 id="dialogTitle">${escapar(produto.nome)}</h2>
        <strong class="price">${moeda(produto.preco)}</strong>
        <p class="detail-warning">Preço demonstrativo. Não constitui oferta de venda.</p>
        <p>${escapar(produto.descricao)}</p>
        <h3>Ficha do relógio</h3>
        <dl class="detail-specs">${linhas}</dl>
        <p class="detail-warning">Antes de vender, confirme fotografia, estoque, preço e características com o fornecedor.</p>
        <button type="button" class="btn gold" data-add="${produto.id}">Adicionar à sacola demonstrativa</button>
      </div>
    </div>`;
  // Abre o modal nativo do navegador para mostrar os detalhes.
  modalProduto.showModal();
}
// Calcula a quantidade e o total dos itens selecionados.
function atualizarCarrinho(){const itens=Object.entries(carrinho).map(([id,qtd])=>({produto:PRODUTOS.find(p=>p.id===Number(id)),qtd})).filter(i=>i.produto);const total=itens.reduce((soma,i)=>soma+i.produto.preco*i.qtd,0);document.querySelector('#cartCount').textContent=itens.reduce((soma,i)=>soma+i.qtd,0);document.querySelector('#cartTotal').textContent=moeda(total);document.querySelector('#cartItems').innerHTML=itens.length?itens.map(({produto:p,qtd})=>`<div class="cart-item"><img src="${p.imagem}" alt=""><div><strong>${escapar(p.nome)}</strong><span>${moeda(p.preco)}</span><div class="cart-controls"><button data-minus="${p.id}" aria-label="Diminuir ${escapar(p.nome)}">−</button><span>${qtd}</span><button data-plus="${p.id}" aria-label="Aumentar ${escapar(p.nome)}">+</button></div></div><button data-remove="${p.id}" aria-label="Remover ${escapar(p.nome)}">×</button></div>`).join(''):'<p>Sua sacola está vazia.</p>';document.querySelector('#checkout').disabled=!itens.length;document.querySelector('#whatsappCheckout').disabled=!itens.length||!numeroWhatsappValido();atualizarPreviewPagamento();document.querySelector('#checkoutNotice').textContent=!numeroWhatsappValido()?'Configure o WhatsApp comercial para habilitar o envio.':!itens.length?'Adicione produtos para preparar o pedido.':'O pedido será enviado como mensagem; não é uma compra confirmada.';}
// Aceita número brasileiro com código de país e DDD, sem pontuação.
function numeroWhatsappValido(){return /^55\d{10,11}$/.test(String(LOJA.whatsapp).replace(/\D/g,''));}
// Monta uma mensagem demonstrativa sem processar pagamento.
function finalizarPedido(){if(!numeroWhatsappValido()||!Object.keys(carrinho).length)return;const linhas=Object.entries(carrinho).map(([id,qtd])=>{const p=PRODUTOS.find(item=>item.id===Number(id));return p?`${qtd}x ${p.nome} — ${moeda(p.preco*qtd)}`:null;}).filter(Boolean);const total=Object.entries(carrinho).reduce((s,[id,qtd])=>s+(PRODUTOS.find(p=>p.id===Number(id))?.preco||0)*qtd,0);const mensagem=`Olá! Gostaria de consultar estes itens da DEMO CHRONOS PRIME:\n${linhas.join('\n')}\nTotal demonstrativo: ${moeda(total)}\nAguardando confirmação de estoque, preços e pagamento pelo vendedor.`;window.open(`https://wa.me/${String(LOJA.whatsapp).replace(/\D/g,'')}?text=${encodeURIComponent(mensagem)}`,'_blank','noopener,noreferrer');}
// Delegação de eventos para botões criados dinamicamente.
document.addEventListener('click',evento=>{const botao=evento.target.closest('button');if(!botao)return;if(botao.dataset.favorite)alternarFavorito(Number(botao.dataset.favorite));if(botao.dataset.detail)abrirProduto(Number(botao.dataset.detail));if(botao.dataset.add){adicionarProduto(Number(botao.dataset.add));modalProduto.close();modalCarrinho.showModal();}if(botao.dataset.plus)alterarQuantidade(Number(botao.dataset.plus),1);if(botao.dataset.minus)alterarQuantidade(Number(botao.dataset.minus),-1);if(botao.dataset.remove){delete carrinho[botao.dataset.remove];salvarCarrinho();}});
// Registra eventos de filtros, janelas e navegação móvel.
[busca,categoria,ordenacao].forEach(campo=>campo.addEventListener('input',renderizarProdutos));
document.querySelector('#openCart').addEventListener('click',()=>modalCarrinho.showModal());
document.querySelector('#closeCart').addEventListener('click',()=>modalCarrinho.close());
document.querySelector('#closeDialog').addEventListener('click',()=>modalProduto.close());
document.querySelector('#checkout').addEventListener('click',iniciarPagamento);
document.querySelector('#whatsappCheckout').addEventListener('click',finalizarPedido);
document.querySelectorAll('input[name=paymentMethod]').forEach(campo=>campo.addEventListener('change',atualizarPreviewPagamento));
document.querySelector('#menuToggle').addEventListener('click',()=>{const aberto=document.querySelector('#menu').classList.toggle('open');document.querySelector('#menuToggle').setAttribute('aria-expanded',String(aberto));});
document.querySelectorAll('#menu a').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#menu').classList.remove('open');document.querySelector('#menuToggle').setAttribute('aria-expanded','false');}));
// Configura contato comercial apenas quando houver número válido.
const contato=document.querySelector('#contactWhatsapp');if(numeroWhatsappValido()){contato.href=`https://wa.me/${String(LOJA.whatsapp).replace(/\D/g,'')}`;contato.textContent='Falar pelo WhatsApp';contato.removeAttribute('aria-disabled');}else contato.addEventListener('click',evento=>evento.preventDefault());
// Inicializa ano, catálogo e sacola ao abrir a página.
document.querySelector('#year').textContent=new Date().getFullYear();renderizarProdutos();atualizarCarrinho();
