/* ==========================================================================
   PÁGINA INICIAL E OFERTAS
   --------------------------------------------------------------------------
   Lê os parâmetros da URL (?categoria= e ?busca=), então o link
   "Smartphones" no rodapé já chega filtrado.
   ========================================================================== */

const Vitrine = (() => {

  const POR_PAGINA = 18;
  let estado = { categoria: "todos", termo: "", ordenar: "relevancia", mostrados: POR_PAGINA };

  function param(url, nome) {
    return new URLSearchParams(url.search).get(nome) || "";
  }

  function renderizar() {
    const grade = document.getElementById("grade-produtos");
    const contador = document.getElementById("contador-produtos");
    const btnMais = document.getElementById("btn-carregar-mais");
    if (!grade) return;

    const lista = Catalogo.filtrar({
      categoria: estado.categoria,
      termo: estado.termo,
      ordenar: estado.ordenar,
      apenasPromocao: grade.dataset.apenasPromocao === "1"
    });

    const visiveis = lista.slice(0, estado.mostrados);

    if (!lista.length) {
      grade.innerHTML =
        '<div class="vazio-busca">' +
          '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i>' +
          '<h3>Nada encontrado por aqui</h3>' +
          '<p>Não achamos produto com essa busca. Tente outra palavra ou veja o catálogo inteiro.</p>' +
          '<button class="btn" id="limpar-busca">Ver todos os produtos</button>' +
        '</div>';
      if (contador) contador.textContent = "0 produtos";
      if (btnMais) btnMais.hidden = true;
      const limpar = document.getElementById("limpar-busca");
      if (limpar) limpar.addEventListener("click", () => {
        estado = { categoria: "todos", termo: "", ordenar: estado.ordenar, mostrados: POR_PAGINA };
        const c = document.getElementById("campo-busca");
        if (c) c.value = "";
        sincronizarChips();
        renderizar();
      });
      return;
    }

    grade.innerHTML = visiveis.map(UI.cardProduto).join("");

    if (contador) {
      contador.textContent = lista.length + (lista.length === 1 ? " produto" : " produtos") +
        (estado.termo ? ' para "' + estado.termo + '"' : "");
    }
    if (btnMais) {
      btnMais.hidden = visiveis.length >= lista.length;
      btnMais.textContent = "Carregar mais produtos";
    }
  }

  function sincronizarChips() {
    document.querySelectorAll("[data-categoria]").forEach(btn => {
      btn.classList.toggle("ativo", btn.dataset.categoria === estado.categoria);
      btn.setAttribute("aria-pressed", String(btn.dataset.categoria === estado.categoria));
    });
  }

  function iniciar() {
    const grade = document.getElementById("grade-produtos");
    if (!grade) return;

    const url = new URL(location.href);
    estado.categoria = param(url, "categoria") || "todos";
    estado.termo = param(url, "busca") || "";

    /* a página pode definir outra ordenação padrão no próprio <select> */
    const selInicial = document.getElementById("ordenar-por");
    if (selInicial && selInicial.value) estado.ordenar = selInicial.value;

    const campoBusca = document.getElementById("campo-busca");
    if (campoBusca && estado.termo) campoBusca.value = estado.termo;

    /* chips de categoria, gerados a partir do catálogo */
    const chips = document.getElementById("chips-categoria");
    if (chips) {
      const itens = [{ chave: "todos", rotulo: "Todos" }].concat(
        Object.keys(CATEGORIAS).map(k => ({ chave: k, rotulo: CATEGORIAS[k].rotulo })));
      chips.innerHTML = itens.map(c =>
        '<button class="chip" data-categoria="' + c.chave + '" aria-pressed="false">' +
          escaparSeguro(c.rotulo) + '</button>').join("");
      chips.addEventListener("click", e => {
        const btn = e.target.closest("[data-categoria]");
        if (!btn) return;
        estado.categoria = btn.dataset.categoria;
        estado.mostrados = POR_PAGINA;
        sincronizarChips();
        renderizar();
        grade.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    const ordenar = document.getElementById("ordenar-por");
    if (ordenar) {
      ordenar.addEventListener("change", () => {
        estado.ordenar = ordenar.value;
        renderizar();
      });
    }

    const btnMais = document.getElementById("btn-carregar-mais");
    if (btnMais) {
      btnMais.addEventListener("click", () => {
        estado.mostrados += POR_PAGINA;
        renderizar();
      });
    }

    sincronizarChips();
    renderizar();
  }

  function escaparSeguro(t) { return UI.escapar(t); }

  return { iniciar };
})();

/* ---------- BLOCOS DA HOME ---------- */

function montarCategorias() {
  const alvo = document.getElementById("grade-categorias");
  if (!alvo) return;

  alvo.innerHTML = Object.keys(CATEGORIAS).map(k => {
    const total = Catalogo.porCategoria(k).length;
    return '' +
      '<a class="cartao-categoria" href="index.html?categoria=' + k + '#produtos">' +
        '<span class="categoria-icone">' + UI.icone(CATEGORIAS[k].icone) + '</span>' +
        '<span class="categoria-nome">' + UI.escapar(CATEGORIAS[k].rotulo) + '</span>' +
        '<span class="categoria-total">' + total + ' produtos</span>' +
      '</a>';
  }).join("");
}

function montarDestaques() {
  const alvo = document.getElementById("grade-destaques");
  if (!alvo) return;
  alvo.innerHTML = Catalogo.destaques().slice(0, 8).map(UI.cardProduto).join("");
}

function montarMaisVendidos() {
  const alvo = document.getElementById("grade-mais-vendidos");
  if (!alvo) return;
  alvo.innerHTML = Catalogo.maisVendidos(4).map(UI.cardProduto).join("");
}

/* Três destaques ao lado do texto do hero — menos cards, mais impacto. */
function montarHeroVitrine() {
  const alvo = document.getElementById("hero-vitrine");
  if (!alvo) return;

  const lista = Catalogo.destaques().slice(0, 3);
  alvo.innerHTML = lista.map((p, i) => {
    const preco = Catalogo.precoAtual(p);
    const extras = p.promo
      ? '<p class="de">de ' + UI.dinheiro(p.preco) + '</p>'
      : '<p class="de">' + UI.escapar(Catalogo.rotuloCategoria(p.categoria)) + '</p>';
    return '' +
      '<a class="hero-produto" href="produto.html?id=' + encodeURIComponent(p.id) + '">' +
        '<img src="' + UI.escapar(p.imagem) + '" alt="' + UI.escapar(p.nome) + '" ' +
          'loading="' + (i === 0 ? "eager" : "lazy") + '" decoding="async">' +
        '<div>' +
          '<h3>' + UI.escapar(p.nome) + '</h3>' +
          '<p class="p">' + UI.dinheiro(preco) + '</p>' +
          extras +
        '</div>' +
      '</a>';
  }).join("");
}

/* Grade de promoções da home: só o que está em oferta. */
function montarPromocoes() {
  const alvo = document.getElementById("grade-promocoes");
  if (!alvo) return;
  const lista = Catalogo.emPromocao()
    .sort((a, b) => Catalogo.desconto(b) - Catalogo.desconto(a))
    .slice(0, 8);
  alvo.innerHTML = lista.map(UI.cardProduto).join("");
}

function montarCupons() {
  const alvo = document.getElementById("grade-cupons");
  if (!alvo) return;

  alvo.innerHTML = (CUPONS || []).map(c =>
    '<div class="cupom">' +
      '<span class="cupom-icone">' + UI.icone(c.tipo === "frete" ? "truck-fast" : "percent") + '</span>' +
      '<div>' +
        '<p class="cupom-codigo">' + UI.escapar(c.codigo) + '</p>' +
        '<p class="cupom-texto">' + UI.escapar(c.texto) + '</p>' +
      '</div>' +
      '<button class="btn-copiar" data-cupom="' + UI.escapar(c.codigo) + '">Copiar</button>' +
    '</div>'
  ).join("");

  alvo.addEventListener("click", e => {
    const btn = e.target.closest("[data-cupom]");
    if (!btn) return;
    const codigo = btn.dataset.cupom;
    const pronto = () => { btn.textContent = "Copiado!"; UI.toast("Cupom " + codigo + " copiado."); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(codigo).then(pronto).catch(pronto);
    } else {
      const tmp = document.createElement("textarea");
      tmp.value = codigo; document.body.appendChild(tmp); tmp.select();
      try { document.execCommand("copy"); } catch (err) { /* segue mesmo assim */ }
      document.body.removeChild(tmp); pronto();
    }
  });
}

function montarDepoimentos() {
  const alvo = document.getElementById("grade-depoimentos");
  if (!alvo) return;

  /* pega avaliações reais do catálogo, sem inventar nota */
  const amostra = [];
  Object.keys(AVALIACOES).forEach(id => {
    const p = Catalogo.porId(id);
    if (!p) return;
    const a = AVALIACOES[id][0];
    if (a && amostra.length < 6) amostra.push({ produto: p, avaliacao: a });
  });

  alvo.innerHTML = amostra.map(x =>
    '<figure class="depoimento">' +
      '<figcaption>' + UI.estrelas(x.avaliacao.nota) + '</figcaption>' +
      '<blockquote>&ldquo;' + UI.escapar(x.avaliacao.texto) + '&rdquo;</blockquote>' +
      '<p class="depoimento-autor">' + UI.escapar(x.avaliacao.autor) +
        ' <span>comprou ' + UI.escapar(x.produto.nome) + '</span></p>' +
    '</figure>'
  ).join("");
}

/* Mapa da loja (venda, preparação e entrega). OpenStreetMap: sem chave de API. */
function montarMapa() {
  const alvo = document.getElementById("mapa-loja");
  if (!alvo) return;

  alvo.innerHTML =
    '<iframe title="Mapa da loja e centro de distribuição" ' +
      'src="' + UI.escapar(linkMapa()) + '" loading="lazy"></iframe>';
}

/* Faixa de contagem regressiva das ofertas. Zera à meia-noite, então o
   "termina hoje" é verdadeiro todo dia — sem o cliente precisar configurar. */
function montarContador() {
  const alvo = document.getElementById("contador-ofertas");
  if (!alvo) return;

  function tick() {
    const agora = new Date();
    const fim = new Date(agora);
    fim.setHours(23, 59, 59, 999);
    let s = Math.max(0, Math.floor((fim - agora) / 1000));

    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const seg = String(s % 60).padStart(2, "0");

    const caixa = alvo.querySelector("[data-h]"),
          min = alvo.querySelector("[data-m]"),
          segEl = alvo.querySelector("[data-s]");
    if (caixa) caixa.textContent = h;
    if (min) min.textContent = m;
    if (segEl) segEl.textContent = seg;
  }

  tick();
  setInterval(tick, 1000);
}

document.addEventListener("DOMContentLoaded", () => {
  montarCategorias();
  montarHeroVitrine();
  montarPromocoes();
  montarDestaques();
  montarMaisVendidos();
  montarCupons();
  montarDepoimentos();
  montarMapa();
  montarContador();
  Vitrine.iniciar();
});
