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

// Catálogo de preços demonstrativos da distribuidora fictícia.
const produtos={ // Produtos e valores de referência.
 cubo5:{nome:'Gelo em cubos — 5 kg',preco:17}, // Item 1.
 cubo10:{nome:'Gelo em cubos — 10 kg',preco:30}, // Item 2.
 escama10:{nome:'Gelo em escamas — 10 kg',preco:26}, // Item 3.
 kit20:{nome:'Kit Festa — 20 kg',preco:55} // Item 4.
};
const itens=new Map(); // Itens apenas na página.
const lista=document.getElementById('cart-items'); // Carrinho visível.
const regiao=document.getElementById('region'); // Frete ilustrativo.
const frete={retirada:0,centro:8,bairro:16}; // Valores fictícios.
function calcular(){ // Atualiza total e contagem.
  lista.replaceChildren(); // Remove a interface antiga.
  let soma=0;let quantidade=0; // Acumuladores.
  if(!itens.size)lista.textContent='Adicione produtos para montar seu pedido.'; // Estado vazio.
  for(const [id,qtd] of itens){ // Percorre produtos escolhidos.
    const produto=produtos[id];soma+=produto.preco*qtd;quantidade+=qtd; // Totais.
    const linha=document.createElement('div');linha.className='cart-row'; // Linha.
    const nome=document.createElement('div');nome.textContent=produto.nome; // Nome seguro.
    const unidade=document.createElement('small');unidade.textContent=`${dinheiro(produto.preco)} cada`;nome.append(unidade); // Preço unitário.
    const numero=document.createElement('input');numero.type='number';numero.min='1';numero.max='99';numero.value=qtd;numero.setAttribute('aria-label',`Quantidade de ${produto.nome}`); // Campo.
    numero.addEventListener('change',()=>{itens.set(id,Math.max(1,Math.min(99,Number(numero.value)||1)));calcular();}); // Recalcula.
    const valor=document.createElement('strong');valor.textContent=dinheiro(produto.preco*qtd); // Subtotal.
    const excluir=document.createElement('button');excluir.type='button';excluir.textContent='×';excluir.setAttribute('aria-label',`Remover ${produto.nome}`); // Exclusão.
    excluir.addEventListener('click',()=>{itens.delete(id);calcular();}); // Remove item.
    linha.append(nome,numero,valor,excluir);lista.append(linha); // Exibe.
  }
  const taxa=frete[regiao.value]||0; // Frete escolhido.
  document.getElementById('subtotal').textContent=dinheiro(soma); // Produtos.
  document.getElementById('shipping').textContent=dinheiro(taxa); // Entrega.
  document.getElementById('total').textContent=dinheiro(soma+taxa); // Total.
  document.getElementById('cart-count').textContent=quantidade; // Indicador no menu.
}
document.querySelectorAll('[data-add]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.add;itens.set(id,(itens.get(id)||0)+1);calcular();document.getElementById('carrinho').scrollIntoView({behavior:'smooth'});})); // Adicionar.
document.querySelectorAll('[data-category-filter]').forEach(b=>b.addEventListener('click',()=>{const cat=b.dataset.categoryFilter;document.querySelectorAll('[data-category-filter]').forEach(x=>x.classList.toggle('active',x===b));document.querySelectorAll('.products article').forEach(card=>card.hidden=cat!=='todos'&&card.dataset.category!==cat);})); // Filtro.
regiao.addEventListener('change',calcular); // Recalcula frete.
document.getElementById('order-form').addEventListener('submit',(e)=>{ // Pedido assistido.
 e.preventDefault();if(!e.currentTarget.reportValidity())return; // Campos obrigatórios.
 if(!itens.size){alert('Selecione pelo menos um produto.');return;} // Impede vazio.
 const msg=['Olá! Gostaria de cotar gelo pela demo Gelo Express.']; // Texto inicial.
 msg.push(`Nome: ${document.getElementById('name').value.trim()}`); // Quem consulta.
 for(const [id,qtd] of itens)msg.push(`• ${produtos[id].nome}: ${qtd}`); // Resumo de itens.
 msg.push(`Região: ${regiao.options[regiao.selectedIndex].text}`); // Destino.
 msg.push(`Data preferida: ${document.getElementById('date').value}`); // Data.
 msg.push(`Turno: ${document.getElementById('turno').value}`); // Turno.
 const obs=document.getElementById('notes').value.trim();if(obs)msg.push(`Observações: ${obs}`); // Complemento.
 msg.push(`Total apenas ilustrativo: ${document.getElementById('total').textContent}. Confirmar disponibilidade, frete, entrega e preço.`); // Aviso.
 abrirWhatsApp(msg.join('\n')); // Encaminha ao vendedor sem efetuar a venda.
});
calcular(); // Mostra estado inicial.
