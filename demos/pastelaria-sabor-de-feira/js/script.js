// Defino o número de WhatsApp da pastelaria; mantenho vazio até configurar o cliente.
const WHATSAPP_DA_LOJA = '';
// Registro os produtos fictícios usados nesta demonstração.
const produtos = [
  {id:1,nome:'Pastel de Carne',descricao:'Carne temperadinha, cebola e aquele toque caseiro.',preco:12.9,categoria:'salgados',imagem:'assets/img/pastel-carne.jpg'},
  {id:2,nome:'Pastel de Queijo',descricao:'Queijo derretido em uma massa dourada e crocante.',preco:12.9,categoria:'salgados',imagem:'assets/img/pastel-queijo.jpg'},
  {id:3,nome:'Pastel Especial',descricao:'Recheio caprichado de frango cremoso com queijo.',preco:16.9,categoria:'salgados',imagem:'assets/img/pastel-especial.jpg'},
  {id:4,nome:'Pastel de Chocolate',descricao:'Doce e crocante, com recheio cremoso de chocolate.',preco:14.9,categoria:'doces',imagem:'assets/img/pastel-doce.jpg'},
  {id:5,nome:'Caldo de Cana',descricao:'Refrescante e perfeito para acompanhar seu pastel.',preco:8.9,categoria:'bebidas',imagem:'assets/img/caldo-cana.jpg'},
  {id:6,nome:'Refrigerante Lata',descricao:'Uma bebida geladinha para completar o pedido.',preco:6.9,categoria:'bebidas',imagem:'assets/img/refrigerante.jpg'}
];
// Armazeno temporariamente as quantidades selecionadas na página.
const carrinho = new Map();
// Converto valores numéricos para o padrão monetário brasileiro.
const moeda = valor => valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
// Recupero os elementos de interface que serão atualizados.
const grade = document.querySelector('#produtos');
const itensPedido = document.querySelector('#itens-pedido');
const totalElemento = document.querySelector('#total');
const contador = document.querySelector('#contador');
const aviso = document.querySelector('#aviso');
// Renderizo somente os produtos da categoria escolhida.
function mostrarProdutos(categoria='todos'){
  // Limpo os cartões anteriores antes de montar o filtro atual.
  grade.replaceChildren();
  // Percorro cada produto disponível na categoria solicitada.
  produtos.filter(p => categoria==='todos'||p.categoria===categoria).forEach(p=>{
    // Crio o cartão por marcação estática com conteúdo definido neste arquivo.
    const artigo=document.createElement('article');
    // Atribuo a classe visual usada no CSS.
    artigo.className='produto';
    // Preencho foto, nome, descrição, preço e botão do produto.
    artigo.innerHTML=`<img src="${p.imagem}" alt="${p.nome}" loading="lazy"><div class="produto-conteudo"><h3>${p.nome}</h3><p>${p.descricao}</p><div class="produto-rodape"><span class="preco">${moeda(p.preco)}</span><button class="adicionar" type="button" aria-label="Adicionar ${p.nome} ao pedido">+ Adicionar</button></div></div>`;
    // Conecto o botão à função de adicionar item ao carrinho.
    artigo.querySelector('button').addEventListener('click',()=>adicionar(p.id));
    // Insiro o cartão pronto na grade.
    grade.append(artigo);
  });
}
// Adiciono uma unidade do produto selecionado.
function adicionar(id){
  // Atualizo a quantidade do item sem duplicar seu cadastro.
  carrinho.set(id,(carrinho.get(id)||0)+1);
  // Atualizo imediatamente a visualização do pedido.
  atualizarCarrinho();
}
// Retiro uma unidade do produto selecionado.
function remover(id){
  // Calculo a nova quantidade após a remoção.
  const quantidade=(carrinho.get(id)||0)-1;
  // Excluo o item quando sua quantidade chega a zero.
  if(quantidade<=0)carrinho.delete(id);
  // Caso contrário, guardo a quantidade restante.
  else carrinho.set(id,quantidade);
  // Atualizo a interface com o novo total.
  atualizarCarrinho();
}
// Exibo os itens e o valor total do carrinho.
function atualizarCarrinho(){
  // Limpo a lista para reconstruí-la com as quantidades atuais.
  itensPedido.replaceChildren();
  // Inicio o total em zero reais.
  let total=0;
  // Inicio o contador geral em zero unidades.
  let quantidadeTotal=0;
  // Percorro cada produto incluído no pedido.
  for(const [id,quantidade] of carrinho){
    // Localizo os dados cadastrados para o item selecionado.
    const produto=produtos.find(p=>p.id===id);
    // Somo o subtotal do item ao total do pedido.
    total+=produto.preco*quantidade;
    // Atualizo o número de unidades no carrinho.
    quantidadeTotal+=quantidade;
    // Crio uma linha acessível para o item do pedido.
    const linha=document.createElement('div');
    // Defino a classe usada para posicionar os dados.
    linha.className='item-pedido';
    // Crio o texto do item sem interpretar dados digitados pelo visitante.
    const descricao=document.createElement('span');
    // Mostro quantidade, nome e subtotal do item.
    descricao.textContent=`${quantidade}× ${produto.nome} — ${moeda(produto.preco*quantidade)}`;
    // Crio o botão que diminui a quantidade.
    const botao=document.createElement('button');
    // Defino o texto curto exibido no botão.
    botao.textContent='− 1';
    // Defino uma descrição acessível para o botão.
    botao.setAttribute('aria-label',`Remover uma unidade de ${produto.nome}`);
    // Conecto o clique à remoção da unidade.
    botao.addEventListener('click',()=>remover(id));
    // Acrescento o texto e o botão à linha.
    linha.append(descricao,botao);
    // Acrescento a linha à lista do pedido.
    itensPedido.append(linha);
  }
  // Explico como começar quando nenhum produto foi escolhido.
  if(carrinho.size===0)itensPedido.textContent='Seu carrinho está vazio. Escolha um pastel no cardápio!';
  // Atualizo o total estimado com formatação brasileira.
  totalElemento.textContent=moeda(total);
  // Atualizo o contador no cabeçalho.
  contador.textContent=quantidadeTotal;
}
// Ativo os botões de filtro do cardápio.
document.querySelectorAll('.filtro').forEach(botao=>botao.addEventListener('click',()=>{
  // Atualizo o destaque visual e o estado acessível de cada filtro.
  document.querySelectorAll('.filtro').forEach(b=>{b.classList.toggle('ativo',b===botao);b.setAttribute('aria-pressed',String(b===botao));});
  // Renderizo a categoria associada ao botão selecionado.
  mostrarProdutos(botao.dataset.filtro);
}));
// Preparo a mensagem de pedido quando o visitante solicita o envio.
document.querySelector('#enviar').addEventListener('click',()=>{
  // Impedo o envio de um pedido vazio.
  if(carrinho.size===0){aviso.textContent='Adicione pelo menos um produto ao pedido.';return;}
  // Evito enviar pedidos para números fictícios ou não configurados.
  if(!/^55\d{10,11}$/.test(WHATSAPP_DA_LOJA)){aviso.textContent='Demo: configure o WhatsApp real da pastelaria no JavaScript para habilitar o envio.';return;}
  // Leio o nome informado pelo cliente.
  const nome=document.querySelector('#nome').value.trim();
  // Peço um nome para facilitar a identificação do pedido.
  if(!nome){aviso.textContent='Informe seu nome antes de enviar o pedido.';document.querySelector('#nome').focus();return;}
  // Leio as observações opcionais sem inseri-las como HTML.
  const observacoes=document.querySelector('#observacoes').value.trim();
  // Converto os itens em linhas legíveis no WhatsApp.
  const linhas=[...carrinho].map(([id,q])=>{const p=produtos.find(item=>item.id===id);return `${q}x ${p.nome} — ${moeda(p.preco*q)}`;});
  // Calculo o valor estimado do pedido.
  const total=[...carrinho].reduce((soma,[id,q])=>soma+produtos.find(p=>p.id===id).preco*q,0);
  // Construo uma mensagem completa com os dados escolhidos.
  const mensagem=`Olá! Gostaria de fazer um pedido.\n\nNome: ${nome}\n\n${linhas.join('\n')}\n\nTotal estimado: ${moeda(total)}${observacoes?`\n\nObservações: ${observacoes}`:''}\n\nPor favor, confirmem disponibilidade, entrega/retirada e valor final.`;
  // Abro o WhatsApp em uma nova aba após ação explícita do visitante.
  window.open(`https://wa.me/${WHATSAPP_DA_LOJA}?text=${encodeURIComponent(mensagem)}`,'_blank','noopener,noreferrer');
});
// Exibo o cardápio completo ao carregar a página.
mostrarProdutos();
// Exibo o carrinho vazio na primeira visita.
atualizarCarrinho();
