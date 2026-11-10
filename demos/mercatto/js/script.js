
"use strict"; // Exige declaração explícita de variáveis e ajuda a encontrar erros.

// Dados de demonstração: nenhuma consulta é feita a um estoque ou catálogo remoto.
const PRODUTOS = [
  {
    "id": 1,
    "nome": "Teclado Compact",
    "preco": 129.0,
    "categoria": "Informática"
  },
  {
    "id": 2,
    "nome": "Mouse Ergo",
    "preco": 89.9,
    "categoria": "Informática"
  },
  {
    "id": 3,
    "nome": "Cadeira Office",
    "preco": 459.0,
    "categoria": "Escritório"
  },
  {
    "id": 4,
    "nome": "Organizador Desk",
    "preco": 59.9,
    "categoria": "Escritório"
  },
  {
    "id": 5,
    "nome": "Maleta Ferramentas",
    "preco": 249.0,
    "categoria": "Ferramentas"
  },
  {
    "id": 6,
    "nome": "Furadeira Compact",
    "preco": 389.0,
    "categoria": "Ferramentas"
  },
  {
    "id": 7,
    "nome": "Air Fryer Compact",
    "preco": 399.0,
    "categoria": "Cozinha"
  },
  {
    "id": 8,
    "nome": "Cafeteira Moka",
    "preco": 149.0,
    "categoria": "Cozinha"
  }
];
const CATEGORIAS = ["Todos", "Informática", "Escritório", "Ferramentas", "Cozinha"];
const MODO = 80;
const NOME_LOJA = "Mercatto";
const TELEFONE = "5511942038103"; // WhatsApp autorizado para demonstrar o atendimento da MOSS.
const CHAVE = `moss-${MODO}-loja`; // Cada projeto tem espaço de armazenamento exclusivo.

// Converte valores para reais com pontuação brasileira.
const reais = valor => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(valor);
const porId = id => PRODUTOS.find(produto => produto.id === Number(id));

// Leitura segura dos dados locais: se estiverem corrompidos, começamos com uma lista vazia.
function carregar(sufixo, padrao) {
  try {
    const valor = JSON.parse(localStorage.getItem(`${CHAVE}-${sufixo}`));
    return Array.isArray(valor) ? valor : padrao;
  } catch (erro) {
    return padrao;
  }
}

// Gravação local: não sincroniza dispositivos e não substitui banco de dados profissional.
function guardar(sufixo, valor) {
  try { localStorage.setItem(`${CHAVE}-${sufixo}`, JSON.stringify(valor)); }
  catch (erro) { avisar("O navegador não permitiu salvar esta seleção."); }
}

// Impede registros inválidos e preços inventados vindos do armazenamento.
let carrinho = carregar("carrinho", []).filter(item => porId(item.id) && Number.isInteger(item.qtd) && item.qtd > 0 && item.qtd <= 99).map(item => ({ id:Number(item.id), qtd:item.qtd, tamanho:String(item.tamanho || "") }));
let favoritos = carregar("favoritos", []).map(Number).filter(id => !!porId(id));
let comparados = carregar("comparar", []).map(Number).filter(id => !!porId(id)).slice(0, 3);
let categoriaAtual = "Todos"; // Filtro inicial mostra todos os departamentos.
let termoBusca = ""; // O termo nunca é exibido como HTML injetado.
let ordenacao = "featured";
let somenteFavoritos = false;
let toastTempo;

// Retorna um aviso visual acessível após cada interação.
function avisar(mensagem) {
  const aviso = document.getElementById("toast");
  aviso.textContent = mensagem;
  aviso.classList.add("show");
  clearTimeout(toastTempo);
  toastTempo = setTimeout(() => aviso.classList.remove("show"), 2600);
}

// Desenha os filtros de categoria de forma dinâmica a partir da lista autorizada.
function desenharFiltros() {
  const alvo = document.getElementById("filter-row");
  if (alvo) {
    alvo.innerHTML = CATEGORIAS.map(cat => `<button type="button" class="filter-btn ${categoriaAtual === cat ? "active" : ""}" data-filter="${cat}">${cat}</button>`).join("");
  }
  const atalhos = document.getElementById("category-shortcuts");
  if (atalhos) {
    const simbolos = ["✨", "🎧", "🏡", "👟", "🧴"];
    atalhos.innerHTML = CATEGORIAS.map((cat, i) => `<button type="button" data-filter="${cat}">${simbolos[i] || "✦"} ${cat}</button>`).join("");
  }
  const ambientes = document.getElementById("room-cards");
  if (ambientes) {
    const simbolos = ["🛋️", "🍽️", "🛏️", "💻"];
    ambientes.innerHTML = CATEGORIAS.slice(1).map((cat, i) => `<button type="button" class="room-card" data-filter="${cat}"><b aria-hidden="true">${simbolos[i]}</b><span>${cat} ↗</span></button>`).join("");
  }
}

// Seleciona produtos por categoria, busca textual e eventual modo de favoritos.
function obterProdutos() {
  let resultados = PRODUTOS.filter(produto =>
    (categoriaAtual === "Todos" || produto.categoria === categoriaAtual) &&
    (!somenteFavoritos || favoritos.includes(produto.id)) &&
    `${produto.nome} ${produto.categoria}`.toLocaleLowerCase("pt-BR").includes(termoBusca.toLocaleLowerCase("pt-BR"))
  );
  if (ordenacao === "low") resultados.sort((a, b) => a.preco - b.preco);
  if (ordenacao === "high") resultados.sort((a, b) => b.preco - a.preco);
  return resultados;
}

// Uma foto .webp poderá substituir cada imagem ilustrativa sem mudar o código de compra.
function imagem(produto) {
  return `assets/img/produto-${String(produto.id).padStart(2, "0")}.svg`;
}

// Cards de produto: os layouts gráficos são diferentes no CSS de cada empresa.
function card(produto, indice) {
  const amado = favoritos.includes(produto.id);
  const marcado = comparados.includes(produto.id);
  const tamanhos = MODO === 82 ? `<div class="sizes-wrap"><label for="tamanho-${produto.id}">Selecione o tamanho</label><select id="tamanho-${produto.id}" aria-label="Tamanho da peça ${produto.nome}"><option value="P">P</option><option value="M">M</option><option value="G">G</option><option value="GG">GG</option></select></div>` : "";
  const favoritar = [80, 82].includes(MODO) ? `<button type="button" class="product-heart ${amado ? "saved" : ""}" data-favorite="${produto.id}" aria-label="${amado ? "Remover dos" : "Adicionar aos"} favoritos de ${produto.nome}" aria-pressed="${amado}">${amado ? "♥" : "♡"}</button>` : "";
  const comparar = MODO === 80 ? `<button type="button" class="compare-btn ${marcado ? "selected" : ""}" data-compare="${produto.id}" aria-pressed="${marcado}">${marcado ? "✓ Na comparação" : "+ Adicionar à comparação"}</button>` : "";
  return `<article class="product-card" data-product="${produto.id}">
    <div class="product-picture"><img src="${imagem(produto)}" data-photo="assets/img/produto-${String(produto.id).padStart(2, "0")}.webp" alt="Ilustração provisória de ${produto.nome}; substituir por foto licenciada" loading="lazy" width="760" height="760"/><span class="product-tag">${indice % 3 === 0 ? "SELEÇÃO" : "VITRINE"}</span>${favoritar}</div>
    <div class="product-info"><span class="product-category">${produto.categoria}</span><h3>${produto.nome}</h3><strong class="product-price">${reais(produto.preco)}</strong><span class="product-caption">Preço demonstrativo</span>${tamanhos}<div class="product-actions"><button type="button" class="quick-add" data-add="${produto.id}">+ Adicionar</button><button type="button" class="quick-view" data-view="${produto.id}">Detalhes</button></div>${comparar}</div>
  </article>`;
}

// Recria a vitrine sem atualizar a página inteira.
function desenharProdutos() {
  const produtos = obterProdutos();
  document.getElementById("products-grid").innerHTML = produtos.map(card).join("");
  document.getElementById("empty-msg").hidden = produtos.length !== 0;
  desenharFiltros();
  desenharComparacao();
}

// O usuário pode informar um tamanho; cada tamanho é um item separado no carrinho.
function adicionar(id, tamanho = "") {
  const produto = porId(id);
  if (!produto) return;
  const escolhido = MODO === 82 ? (["P", "M", "G", "GG"].includes(tamanho) ? tamanho : "M") : "";
  const existente = carrinho.find(item => item.id === produto.id && item.tamanho === escolhido);
  if (existente) existente.qtd = Math.min(99, existente.qtd + 1);
  else carrinho.push({ id:produto.id, qtd:1, tamanho:escolhido });
  guardar("carrinho", carrinho);
  desenharCarrinho();
  avisar(`${produto.nome} adicionado à sua lista.`);
}

// Controla a quantidade, sem permitir valores negativos ou maiores que 99.
function mudarQuantidade(indice, alteracao) {
  const item = carrinho[indice];
  if (!item) return;
  item.qtd += alteracao;
  if (item.qtd <= 0) carrinho.splice(indice, 1);
  else item.qtd = Math.min(item.qtd, 99);
  guardar("carrinho", carrinho);
  desenharCarrinho();
}

// Remove uma linha inteira da seleção do visitante.
function remover(indice) {
  if (!carrinho[indice]) return;
  carrinho.splice(indice, 1);
  guardar("carrinho", carrinho);
  desenharCarrinho();
  avisar("Produto removido da lista.");
}

// Cria uma mensagem clara; o valor final e a disponibilidade devem ser confirmados pela loja.
function gerarMensagem() {
  const cabecalho = `Olá! Gostaria de solicitar uma cotação da loja ${NOME_LOJA}:`;
  const itens = carrinho.map(item => {
    const produto = porId(item.id);
    const subtipo = item.tamanho ? ` (tamanho ${item.tamanho})` : "";
    return `• ${produto.nome}${subtipo}: ${item.qtd} un. — ${reais(produto.preco * item.qtd)}`;
  });
  const total = carrinho.reduce((soma, item) => soma + porId(item.id).preco * item.qtd, 0);
  const entrega = MODO === 83 ? `\nPreferência: ${document.querySelector('input[name="entrega"]:checked')?.value || "Entrega"}.` : "";
  return `${cabecalho}\n${itens.join("\n")}\n\nTotal ilustrativo: ${reais(total)}.${entrega}\nPodem confirmar disponibilidade, valores e condições?`;
}

// Atualiza o carrinho, o mini-kit e o link externo do WhatsApp.
function desenharCarrinho() {
  const contagem = carrinho.reduce((total, item) => total + item.qtd, 0);
  document.querySelectorAll(".cart-count").forEach(contador => contador.textContent = String(contagem));
  const total = carrinho.reduce((soma, item) => soma + porId(item.id).preco * item.qtd, 0);
  document.getElementById("cart-total").textContent = reais(total);
  document.getElementById("cart-items").innerHTML = carrinho.length === 0
    ? "<p>Sua lista está vazia. Escolha produtos no catálogo.</p>"
    : carrinho.map((item, i) => {
        const produto = porId(item.id);
        return `<div class="cart-line"><img src="${imagem(produto)}" alt="" width="76" height="76"/><div class="cart-line-info"><strong>${produto.nome}${item.tamanho ? ` · ${item.tamanho}` : ""}</strong><small>${reais(produto.preco)} por unidade</small><div class="cart-controls"><button type="button" data-qty="${i}" data-delta="-1" aria-label="Diminuir quantidade">−</button><span>${item.qtd}</span><button type="button" data-qty="${i}" data-delta="1" aria-label="Aumentar quantidade">+</button><button type="button" class="remove" data-remove="${i}">Remover</button></div></div></div>`;
      }).join("");
  const link = document.getElementById("checkout-link");
  link.href = carrinho.length > 0 ? `https://wa.me/${TELEFONE}?text=${encodeURIComponent(gerarMensagem())}` : "#catalogo";
  link.setAttribute("aria-disabled", carrinho.length ? "false" : "true");
  const mini = document.getElementById("bundle-mini");
  if (mini) {
    mini.innerHTML = carrinho.length ? carrinho.map(item => `<div class="bundle-mini-line"><span>${porId(item.id).nome} × ${item.qtd}</span><strong>${reais(porId(item.id).preco * item.qtd)}</strong></div>`).join("") : "<p>Você ainda não escolheu itens. Comece pelos cards acima.</p>";
    document.getElementById("bundle-total").textContent = reais(total);
  }
}

// Abre a gaveta sem abandonar a página de compras.
function abrirCarrinho() {
  document.getElementById("drawer-overlay").hidden = false;
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "false");
  document.getElementById("close-cart").focus();
}

// Oculta a gaveta e devolve a navegação para a vitrine.
function fecharCarrinho() {
  document.getElementById("drawer-overlay").hidden = true;
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-drawer").setAttribute("aria-hidden", "true");
}

// Modal mostra informações meramente ilustrativas do produto escolhido.
function verDetalhes(id) {
  const produto = porId(id);
  if (!produto) return;
  const tamanho = MODO === 82 ? `<label>Escolher tamanho <select id="dialog-size"><option>P</option><option>M</option><option>G</option><option>GG</option></select></label>` : "";
  document.getElementById("dialog-content").innerHTML = `<img class="dialog-photo" src="${imagem(produto)}" alt="Ilustração provisória do produto ${produto.nome}"/><span class="product-category">${produto.categoria}</span><h2 class="dialog-title">${produto.nome}</h2><strong class="product-price">${reais(produto.preco)}</strong><p class="dialog-sub">Produto e preço fictícios para demonstração de uma loja virtual. Consulte a empresa sobre características reais.</p><ul class="dialog-feature-list"><li>Categoria: ${produto.categoria}</li><li>Foto e disponibilidade pendentes de validação</li><li>Pedido somente por consulta ao WhatsApp</li></ul>${tamanho}<p><button type="button" class="btn quick-add" data-add="${produto.id}">Adicionar à lista →</button></p>`;
  const janela = document.getElementById("product-dialog");
  if (typeof janela.showModal === "function") janela.showModal();
}

// Favoritos são salvos neste computador; não há login ou sincronização.
function alternarFavorito(id) {
  const numero = Number(id);
  if (!porId(numero)) return;
  if (favoritos.includes(numero)) favoritos = favoritos.filter(item => item !== numero);
  else favoritos.push(numero);
  guardar("favoritos", favoritos);
  desenharProdutos();
  avisar(favoritos.includes(numero) ? "Salvo nos favoritos." : "Removido dos favoritos.");
}

// Mercatto: comparação limitada a três produtos para permanecer legível no celular.
function alternarComparacao(id) {
  const numero = Number(id);
  if (comparados.includes(numero)) comparados = comparados.filter(item => item !== numero);
  else if (comparados.length >= 3) { avisar("Compare no máximo três produtos."); return; }
  else comparados.push(numero);
  guardar("comparar", comparados);
  desenharProdutos();
}

// A tabela se baseia somente nas informações de exemplo do próprio catálogo.
function desenharComparacao() {
  const painel = document.getElementById("compare-output");
  if (!painel) return;
  if (!comparados.length) { painel.innerHTML = "<p>Selecione até três produtos nos cards para comparar.</p>"; return; }
  const dados = comparados.map(porId).filter(Boolean);
  painel.innerHTML = `<table class="compare-table"><tbody><tr><th>Imagem</th>${dados.map(p => `<td><img src="${imagem(p)}" alt="Ilustração ${p.nome}"/></td>`).join("")}</tr><tr><th>Produto</th>${dados.map(p => `<td><strong>${p.nome}</strong></td>`).join("")}</tr><tr><th>Categoria</th>${dados.map(p => `<td>${p.categoria}</td>`).join("")}</tr><tr><th>Preço ilustrativo</th>${dados.map(p => `<td>${reais(p.preco)}</td>`).join("")}</tr></tbody></table>`;
}

// Trata botões de cards recriados dinamicamente (delegação de eventos).
document.addEventListener("click", event => {
  const botao = event.target.closest("button");
  if (!botao) return;
  if (botao.hasAttribute("data-filter")) {
    categoriaAtual = botao.dataset.filter;
    somenteFavoritos = false;
    desenharProdutos();
    if (botao.closest("#category-shortcuts, #room-cards")) document.getElementById("catalogo").scrollIntoView({ behavior:"smooth" });
  }
  if (botao.hasAttribute("data-add")) {
    const cardAtual = botao.closest(".product-card");
    const tamanho = cardAtual?.querySelector(".sizes-wrap select")?.value || document.getElementById("dialog-size")?.value || "M";
    adicionar(botao.dataset.add, tamanho);
  }
  if (botao.hasAttribute("data-view")) verDetalhes(botao.dataset.view);
  if (botao.hasAttribute("data-favorite")) alternarFavorito(botao.dataset.favorite);
  if (botao.hasAttribute("data-compare")) alternarComparacao(botao.dataset.compare);
  if (botao.hasAttribute("data-qty")) mudarQuantidade(Number(botao.dataset.qty), Number(botao.dataset.delta));
  if (botao.hasAttribute("data-remove")) remover(Number(botao.dataset.remove));
});

// Configuração dos botões fixos de abertura e fechamento.
document.getElementById("open-cart")?.addEventListener("click", abrirCarrinho);
document.getElementById("help-cart")?.addEventListener("click", abrirCarrinho);
document.getElementById("bundle-checkout")?.addEventListener("click", abrirCarrinho);
document.getElementById("close-cart")?.addEventListener("click", fecharCarrinho);
document.getElementById("drawer-overlay")?.addEventListener("click", fecharCarrinho);
document.getElementById("close-dialog")?.addEventListener("click", () => document.getElementById("product-dialog").close());

// O link de orçamento só está disponível quando houver itens escolhidos.
document.getElementById("checkout-link")?.addEventListener("click", event => {
  if (!carrinho.length) { event.preventDefault(); avisar("Selecione um produto antes de pedir a cotação."); }
});

// Permite fechar o carrinho usando a tecla Escape.
document.addEventListener("keydown", event => {
  if (event.key === "Escape") fecharCarrinho();
});

// Conecta os campos de pesquisa, inclusive o segundo campo da CasaNexa.
document.querySelectorAll('#product-search, #secondary-search').forEach(campo => {
  campo.addEventListener("input", () => {
    termoBusca = campo.value.trim();
    document.querySelectorAll('#product-search, #secondary-search').forEach(outro => { if (outro !== campo) outro.value = campo.value; });
    desenharProdutos();
  });
});

// Ordenação sem alterar a lista original nem inventar descontos.
document.getElementById("sort-select")?.addEventListener("change", event => {
  ordenacao = event.target.value;
  desenharProdutos();
});

// Opções específicas: limpar comparador e exibir apenas peças favoritas.
document.getElementById("clear-compare")?.addEventListener("click", () => {
  comparados = []; guardar("comparar", comparados); desenharProdutos(); avisar("Comparação limpa.");
});
document.getElementById("show-favorites")?.addEventListener("click", event => {
  somenteFavoritos = !somenteFavoritos;
  event.currentTarget.setAttribute("aria-pressed", String(somenteFavoritos));
  categoriaAtual = "Todos";
  desenharProdutos();
  document.getElementById("catalogo").scrollIntoView({ behavior:"smooth" });
  avisar(somenteFavoritos ? "Mostrando favoritos neste navegador." : "Exibindo toda a coleção.");
});

// CasaNexa: a preferência de entrega entra na mensagem, sem cálculo de frete inventado.
document.querySelectorAll('input[name="entrega"]').forEach(campo => campo.addEventListener("change", desenharCarrinho));

// Navegação móvel abre e fecha o menu, preservando o atributo acessível.
const botaoMenu = document.querySelector(".nav-toggle");
botaoMenu?.addEventListener("click", () => {
  const menu = document.getElementById(botaoMenu.getAttribute("aria-controls"));
  const aberto = menu.classList.toggle("open");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
});
document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("menu-links")?.classList.remove("open");
  botaoMenu?.setAttribute("aria-expanded", "false");
}));

// Estado inicial do catálogo e da lista ao carregar a demonstração.
desenharProdutos();
desenharCarrinho();
