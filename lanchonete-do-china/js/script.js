/* ============================================
   LANCHONETE DO CHINA — Lógica do site
   Carrinho, cardápio e envio via WhatsApp
   ============================================ */

/* ---------- 1. O CARDÁPIO (dados) ----------
   Tudo num ARRAY (lista) — fácil de editar!
   Pra adicionar produto novo: copie um bloco { } e mude os dados */
const produtos = [
  // CATEGORIA: LANCHES
  { id:1, nome:"X-Burguer",   categoria:"lanches", emoji:"🍔", descricao:"Pão, hambúrguer 150g, queijo, alface e tomate", preco:18, destaque:true },
  { id:2, nome:"X-Salada",    categoria:"lanches", emoji:"🍔", descricao:"X-Burguer + ovo, milho e batata palha", preco:22 },
  { id:3, nome:"X-Bacon",     categoria:"lanches", emoji:"🥓", descricao:"X-Burguer + bacon crocante", preco:24, maisVendido:true, destaque:true },
  { id:4, nome:"X-Egg",       categoria:"lanches", emoji:"🍳", descricao:"X-Burguer + ovo frito", preco:21 },
  { id:5, nome:"X-Tudo",      categoria:"lanches", emoji:"⭐", descricao:"Tudo que tem na casa!", preco:28, maisVendido:true, destaque:true },

  // CATEGORIA: PORÇÕES
  { id:6,  nome:"Batata Frita",              categoria:"porcoes", emoji:"🍟", descricao:"Porção 300g crocante", preco:15 },
  { id:7,  nome:"Batata com Cheddar e Bacon",categoria:"porcoes", emoji:"🧀", descricao:"Porção 400g cremosa", preco:25, destaque:false },
  { id:8,  nome:"Calabresa Acebolada",       categoria:"porcoes", emoji:"🌭", descricao:"Porção 400g suculenta", preco:22 },

  // CATEGORIA: BEBIDAS
  { id:9,  nome:"Coca-Cola Lata 350ml",  categoria:"bebidas", emoji:"🥤", descricao:"Gelada", preco:6 },
  { id:10, nome:"Guaraná Lata 350ml",    categoria:"bebidas", emoji:"🥤", descricao:"Gelado", preco:5 },
  { id:11, nome:"Suco Natural 500ml",    categoria:"bebidas", emoji:"🧃", descricao:"Laranja ou maracujá", preco:8 },
  { id:12, nome:"Água Mineral 500ml",    categoria:"bebidas", emoji:"💧", descricao:"Com ou sem gás", preco:4 },
];

/* ---------- 2. REGRAS DE NEGÓCIO ----------
   Vêm todas do BRIEFING. Num site real, mudam aqui e pronto */
const PEDIDO_MINIMO = 25;   // pedido mínimo em R$
const TAXA_ENTREGA  = 5;    // taxa fixa
const ENTREGA_GRATIS = 45;  // a partir deste valor, entrega grátis
const WHATSAPP = "5500900000000"; // número do cliente (placeholder)

/* ---------- 3. O CARRINHO ----------
   Array vazio que guarda { produto, quantidade } */
let carrinho = [];

/* ---------- 4. FUNÇÕES DO CARDÁPIO ---------- */

// Mostra os 3 destaques na home
function mostrarDestaques() {
  const destaques = produtos.filter(p => p.destaque); // filter = "selecione os que têm destaque"
  const area = document.getElementById("destaques");
  area.innerHTML = destaques.map(p => `
    <div class="card-produto">
      ${p.maisVendido ? '<span class="tag">🔥 MAIS VENDIDO</span>' : ''}
      <div class="foto">${p.emoji}</div>
      <h3>${p.nome}</h3>
      <p>${p.descricao}</p>
      <div class="preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
      <button class="btn btn-primario" onclick="adicionar(${p.id})">＋ Adicionar</button>
    </div>
  `).join('');
}

// Mostra a lista do cardápio conforme a categoria escolhida
function mostrarCategoria(categoria) {
  const lista = produtos.filter(p => p.categoria === categoria);
  const area = document.getElementById("lista-produtos");
  area.innerHTML = lista.map(p => `
    <div class="item-lista">
      <div class="emoji">${p.emoji}</div>
      <div class="dados">
        <h3>${p.nome} ${p.maisVendido ? '🔥' : ''}</h3>
        <p>${p.descricao}</p>
      </div>
      <div class="preco">R$ ${p.preco.toFixed(2).replace('.', ',')}</div>
      <button class="btn-add" onclick="adicionar(${p.id})" aria-label="Adicionar ${p.nome}">＋</button>
    </div>
  `).join('');
}

// Troca a aba ativa e recarrega a lista
function mudarCategoria(categoria, botao) {
  document.querySelectorAll(".categoria").forEach(b => b.classList.remove("ativa"));
  botao.classList.add("ativa");
  mostrarCategoria(categoria);
}

/* ---------- 5. FUNÇÕES DO CARRINHO ---------- */

function adicionar(id) {
  const produto = produtos.find(p => p.id === id); // find = "ache este produto"
  const item = carrinho.find(i => i.produto.id === id);

  if (item) {
    item.quantidade++;        // já existe? só soma 1
  } else {
    carrinho.push({ produto, quantidade: 1 }); // não existe? cria novo
  }

  atualizarCarrinho();
  abrirCarrinho(); // abre o painel pra cliente ver o que adicionou
}

function mudarQuantidade(id, mudanca) {
  const item = carrinho.find(i => i.produto.id === id);
  if (!item) return;

  item.quantidade += mudanca;

  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(i => i.produto.id !== id); // remove se chegar a 0
  }
  atualizarCarrinho();
}

function atualizarCarrinho() {
  const areaItens = document.getElementById("carrinho-itens");

  if (carrinho.length === 0) {
    areaItens.innerHTML = '<p class="carrinho-vazio">Seu pedido está vazio 🥲<br>Adicione um lanche!</p>';
  } else {
    areaItens.innerHTML = carrinho.map(i => `
      <div class="item-carrinho">
        <span>${i.produto.emoji}</span>
        <span class="nome">${i.produto.nome}<small>R$ ${(i.produto.preco * i.quantidade).toFixed(2).replace('.', ',')}</small></span>
        <span class="controle-qtd">
          <button onclick="mudarQuantidade(${i.produto.id}, -1)">−</button>
          <b>${i.quantidade}</b>
          <button onclick="mudarQuantidade(${i.produto.id}, 1)">＋</button>
        </span>
      </div>
    `).join('');
  }

  // ---- Cálculos ----
  const subtotal = carrinho.reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0);
  const taxa = (subtotal >= ENTREGA_GRATIS || subtotal === 0) ? 0 : TAXA_ENTREGA;
  const total = subtotal + taxa;

  document.getElementById("subtotal").textContent = `R$ ${subtotal.toFixed(2).replace('.', ',')}`;
  document.getElementById("taxa").textContent = taxa === 0 && subtotal > 0 ? "GRÁTIS 🎉" : `R$ ${taxa.toFixed(2).replace('.', ',')}`;
  document.getElementById("total").textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  document.getElementById("contador-topo").textContent = carrinho.reduce((soma, i) => soma + i.quantidade, 0);

  // ---- Regra do pedido mínimo (aviso + bloqueio do botão) ----
  const aviso = document.getElementById("aviso-minimo");
  const btn = document.getElementById("btn-whatsapp");
  if (subtotal > 0 && subtotal < PEDIDO_MINIMO) {
    aviso.textContent = `⚠️ Pedido mínimo de R$ ${PEDIDO_MINIMO},00 — faltam R$ ${(PEDIDO_MINIMO - subtotal).toFixed(2).replace('.', ',')}`;
    btn.disabled = true;
  } else {
    aviso.textContent = subtotal >= ENTREGA_GRATIS ? "🎉 Você ganhou entrega GRÁTIS!" : "";
    btn.disabled = carrinho.length === 0;
  }
}

/* ---------- 6. ABRIR/FECHAR CARRINHO ---------- */
function abrirCarrinho() {
  document.getElementById("carrinho").classList.add("aberto");
  document.getElementById("fundo-carrinho").classList.add("aberto");
}
function fecharCarrinho() {
  document.getElementById("carrinho").classList.remove("aberto");
  document.getElementById("fundo-carrinho").classList.remove("aberto");
}

/* ---------- 7. ENVIO VIA WHATSAPP ----------
   Monta o texto do pedido e abre o WhatsApp com tudo pronto */
function enviarPedido() {
  let texto = "*🍔 NOVO PEDIDO — Lanchonete do China*\n───────────────\n";

  carrinho.forEach(i => {
    texto += `• ${i.quantidade}x ${i.produto.nome} — R$ ${(i.produto.preco * i.quantidade).toFixed(2).replace('.', ',')}\n`;
  });

  const subtotal = carrinho.reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0);
  const taxa = subtotal >= ENTREGA_GRATIS ? 0 : TAXA_ENTREGA;

  texto += "───────────────\n";
  texto += `Subtotal: R$ ${subtotal.toFixed(2).replace('.', ',')}\n`;
  texto += `Entrega: ${taxa === 0 ? "GRÁTIS 🎉" : "R$ " + taxa.toFixed(2).replace('.', ',')}\n`;
  texto += `*TOTAL: R$ ${(subtotal + taxa).toFixed(2).replace('.', ',')}*\n`;
  texto += "\n📍 Meu endereço: \n💳 Forma de pagamento: ";

  // encodeURIComponent = transforma o texto pro formato que a URL entende (acentos, espaços, quebras de linha)
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, "_blank");
}

/* ---------- 8. INICIALIZAÇÃO ----------
   Quando a página carrega, já mostra home e cardápio */
mostrarDestaques();
mostrarCategoria("lanches");
atualizarCarrinho();
