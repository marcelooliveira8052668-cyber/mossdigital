// Configurações da demonstração: não há backend ou cobrança automática.
const TELEFONE_MOSS = '5511942038103'; // WhatsApp autorizado.
const dinheiro = (valor) => valor.toLocaleString('pt-BR',{style:'currency',currency:'BRL'}); // Formatação brasileira.
function abrirWhatsApp(mensagem) { // Abre conversa com dados informados pelo visitante.
  const endereco = `https://wa.me/${TELEFONE_MOSS}?text=${encodeURIComponent(mensagem)}`; // Link codificado.
  window.open(endereco, '_blank', 'noopener,noreferrer'); // Abre em nova aba.
}
// Botões de contato genérico utilizam o número autorizado.
document.querySelectorAll('[data-wa]').forEach((botao) => {
  const mensagem = botao.dataset.wa || 'Olá! Vim pela demonstração da MOSS Digital e quero mais informações.'; // Texto padrão.
  botao.href = `https://wa.me/${TELEFONE_MOSS}?text=${encodeURIComponent(mensagem)}`; // Link real.
  botao.target = '_blank'; // Nova aba.
  botao.rel = 'noopener noreferrer'; // Segurança.
});
// Tenta carregar as fotografias locais somente quando forem adicionadas ao projeto.
document.querySelectorAll('img[data-photo]').forEach((img) => {
  const teste = new Image(); // Imagem invisível usada para verificar o caminho.
  teste.onload = () => { img.src = img.dataset.photo; }; // Foto real encontrada.
  teste.onerror = () => {}; // Mantém o placeholder se faltar arquivo.
  teste.src = img.dataset.photo; // Inicia o teste de existência.
});

// Catálogo demonstrativo: preços não são ofertas comerciais.
const produtos = { // Lista de produtos disponíveis para cotação.
  luva:{nome:'Luvas de proteção',preco:19.9}, // Item 1.
  capacete:{nome:'Capacete classe B',preco:49.9}, // Item 2.
  oculos:{nome:'Óculos transparente',preco:17.5}, // Item 3.
  botina:{nome:'Botina de segurança',preco:109.9} // Item 4.
};
const carrinho = new Map(); // Itens apenas nesta sessão; sem cadastro no servidor.
const areaCarrinho = document.getElementById('cart-items'); // Área que recebe as linhas.
const totalElemento = document.getElementById('total'); // Mostra total ilustrativo.
function atualizarCotacao() { // Recria a tabela do carrinho a cada alteração.
  areaCarrinho.replaceChildren(); // Remove linhas antigas com segurança.
  let soma = 0; // Total inicial.
  if(!carrinho.size) areaCarrinho.textContent = 'Adicione produtos para começar.'; // Mensagem vazia.
  for (const [codigo,quantidade] of carrinho) { // Percorre o carrinho.
    const produto=produtos[codigo]; // Busca dados do item.
    soma += produto.preco*quantidade; // Subtotal.
    const linha=document.createElement('div'); // Linha HTML segura.
    linha.className='cart-row'; // Classe da grade.
    const nome=document.createElement('div'); // Nome e preço.
    nome.textContent=produto.nome; // Apenas texto seguro.
    const detalhe=document.createElement('small'); // Nota de unidade.
    detalhe.textContent=`${dinheiro(produto.preco)} por unidade`; // Preço.
    nome.append(detalhe); // Adiciona nota.
    const qtd=document.createElement('input'); // Campo de quantidade.
    qtd.type='number'; qtd.min='1'; qtd.max='200'; qtd.value=quantidade; qtd.setAttribute('aria-label',`Quantidade de ${produto.nome}`); // Restrições.
    qtd.addEventListener('change',()=>{const n=Math.min(200,Math.max(1,Number(qtd.value)||1));carrinho.set(codigo,n);atualizarCotacao();}); // Atualiza valor.
    const subtotal=document.createElement('strong'); // Subtotal da linha.
    subtotal.textContent=dinheiro(produto.preco*quantidade); // Valor formatado.
    const remover=document.createElement('button'); // Excluir item.
    remover.type='button'; remover.textContent='×'; remover.setAttribute('aria-label',`Remover ${produto.nome}`); // Acessibilidade.
    remover.addEventListener('click',()=>{carrinho.delete(codigo);atualizarCotacao();}); // Remove do mapa.
    linha.append(nome,qtd,subtotal,remover); // Monta a linha.
    areaCarrinho.append(linha); // Insere no painel.
  }
  totalElemento.textContent=dinheiro(soma); // Total final.
}
document.querySelectorAll('[data-add]').forEach((botao)=>{ // Vincula os quatro botões.
  botao.addEventListener('click',()=>{const id=botao.dataset.add;carrinho.set(id,(carrinho.get(id)||0)+1);atualizarCotacao();document.getElementById('cotacao').scrollIntoView({behavior:'smooth'});}); // Adiciona unidade.
});
document.querySelectorAll('[data-filter]').forEach((botao)=>{ // Filtros do catálogo.
  botao.addEventListener('click',()=>{const filtro=botao.dataset.filter;document.querySelectorAll('[data-filter]').forEach((b)=>b.classList.toggle('active',b===botao));document.querySelectorAll('.product').forEach((card)=>card.hidden=filtro!=='todos'&&card.dataset.category!==filtro);}); // Mostra apenas categoria escolhida.
});
document.getElementById('send-quote').addEventListener('click',()=>{ // Envio por WhatsApp.
  if(!carrinho.size){alert('Escolha pelo menos um produto.');return;} // Impede pedido vazio.
  const linhas=['Olá! Quero solicitar cotação de EPIs (demo MOSS Digital):']; // Introdução.
  const empresa=document.getElementById('company').value.trim(); // Empresa opcional.
  if(empresa)linhas.push(`Empresa: ${empresa}`); // Identifica quem consultou.
  for(const [codigo,qtd] of carrinho)linhas.push(`• ${produtos[codigo].nome}: ${qtd} unidade(s)`); // Itens.
  const tamanho=document.getElementById('size').value.trim(); // Tamanhos.
  if(tamanho)linhas.push(`Observações: ${tamanho}`); // Detalhes.
  linhas.push(`Total apenas ilustrativo: ${totalElemento.textContent}. Confirmar disponibilidade e preço.`); // Aviso.
  abrirWhatsApp(linhas.join('\n')); // Abre a conversa.
});
atualizarCotacao(); // Primeira exibição.
