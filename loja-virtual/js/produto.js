/* ==========================================================================
   PÁGINA DO PRODUTO
   --------------------------------------------------------------------------
   produto.html?id=<id-do-produto>
   Se o id não existir, a página explica e sugere caminhos — nunca mostra
   tela em branco.
   ========================================================================== */

(() => {

  let produto = null;
  let qtd = 1;

  function idDaUrl() {
    return new URLSearchParams(location.search).get("id") || "";
  }

  /* ---------- GALERIA ----------
     O catálogo guarda UMA arte por produto. Em vez de fingir que temos
     quatro fotos diferentes, mostramos recortes reais da mesma arte —
     o botão de zoom dá o mesmo efeito de "ver de perto" do Shopee. */
  const VISTAS = [
    { escala: 1,    x: 0,  y: 0  },
    { escala: 1.9,  x: 0,  y: 26 },
    { escala: 2.6,  x: 0,  y: 0  },
    { escala: 1.9,  x: 0,  y: -26 }
  ];

  function montarGaleria() {
    const principal = document.getElementById("galeria-principal");
    const miniaturas = document.getElementById("galeria-miniaturas");
    if (!principal || !miniaturas) return;

    const img = principal.querySelector("img");
    img.src = produto.imagem;
    img.alt = produto.nome;

    miniaturas.innerHTML = VISTAS.map((v, i) =>
      '<button class="miniatura' + (i === 0 ? " ativa" : "") + '" data-vista="' + i + '" ' +
        'aria-label="Ver ' + UI.escapar(produto.nome) + ' — visão ' + (i + 1) + '">' +
        '<img src="' + UI.escapar(produto.imagem) + '" alt="" aria-hidden="true" ' +
          'style="transform: scale(' + v.escala + ') translateY(' + v.y + '%)">' +
      '</button>'
    ).join("");

    function aplicar(i) {
      const v = VISTAS[i] || VISTAS[0];
      img.style.transform = "scale(" + v.escala + ") translateY(" + v.y + "%)";
      miniaturas.querySelectorAll(".miniatura").forEach((b, k) =>
        b.classList.toggle("ativa", k === i));
    }

    miniaturas.addEventListener("click", e => {
      const b = e.target.closest("[data-vista]");
      if (b) aplicar(Number(b.dataset.vista));
    });

    /* lupa: amplia o ponto onde o mouse ou o dedo está */
    principal.addEventListener("mousemove", e => {
      const r = principal.getBoundingClientRect();
      img.style.transformOrigin =
        ((e.clientX - r.left) / r.width * 100) + "% " +
        ((e.clientY - r.top) / r.height * 100) + "%";
    });
    principal.addEventListener("mouseleave", () => {
      img.style.transformOrigin = "50% 50%";
    });
  }

  function montarCabecalhoDoProduto() {
    document.getElementById("prod-nome").textContent = produto.nome;
    document.getElementById("prod-categoria").textContent = Catalogo.rotuloCategoria(produto.categoria);
    document.getElementById("prod-categoria").href =
      "index.html?categoria=" + produto.categoria + "#produtos";
    document.getElementById("prod-resumo").textContent = produto.resumo || "";
    document.getElementById("prod-vendidos").textContent = produto.vendidos + " vendidos";

    const estrelas = document.getElementById("prod-estrelas");
    estrelas.innerHTML = UI.estrelas(produto.nota) +
      '<span class="nota-numero">' + produto.nota.toFixed(1) + '</span>';

    document.getElementById("prod-codigo").textContent =
      "Código: " + produto.id.toUpperCase().slice(0, 18);

    /* preço */
    const preco = Catalogo.precoAtual(produto);
    document.getElementById("prod-preco").textContent = UI.dinheiro(preco);

    const antigo = document.getElementById("prod-preco-antigo");
    if (produto.promo) {
      antigo.textContent = UI.dinheiro(produto.preco);
      antigo.hidden = false;
      document.getElementById("prod-desconto").textContent = "-" + Catalogo.desconto(produto) + "%";
      document.getElementById("prod-desconto").hidden = false;
      document.getElementById("prod-economia").hidden = false;
      document.getElementById("prod-economia").innerHTML =
        '<i class="fa-solid fa-tag" aria-hidden="true"></i> Você economiza ' +
        UI.dinheiro(Catalogo.economia(produto));
    }

    document.getElementById("prod-parcelas").textContent =
      UI.textoParcelas(preco, CONFIG.pagamento.parcelas[CONFIG.pagamento.parcelas.length - 1]);

    /* selo de frete */
    const frete = document.getElementById("prod-frete");
    frete.innerHTML = produto.freteGratis
      ? '<i class="fa-solid fa-truck-fast" aria-hidden="true"></i> <strong>Frete grátis</strong> para todo o Brasil'
      : '<i class="fa-solid fa-truck" aria-hidden="true"></i> Frete calculado na finalização';

    /* estoque — mostrado só quando está curto, para empurrar a decisão */
    const estoque = document.getElementById("prod-estoque");
    if (produto.estoque <= 10) {
      estoque.hidden = false;
      estoque.innerHTML = '<i class="fa-solid fa-fire" aria-hidden="true"></i> Restam apenas ' +
        produto.estoque + ' unidades';
    }

    document.title = produto.nome + " | " + CONFIG.loja.nome;

    /* link do WhatsApp já com o produto escrito */
    document.querySelectorAll("[data-whats-produto]").forEach(a => {
      a.href = linkWhats("Olá! Vi o " + produto.nome + " (" + UI.dinheiro(preco) +
        ") no site e gostaria de mais informações.");
    });
  }

  function montarQuantidade() {
    const campo = document.getElementById("qtd-valor");
    if (!campo) return;
    campo.textContent = "1";

    document.getElementById("qtd-menos").addEventListener("click", () => {
      qtd = Math.max(1, qtd - 1);
      campo.textContent = qtd;
    });

    document.getElementById("qtd-mais").addEventListener("click", () => {
      const limite = produto.estoque || 99;
      if (qtd >= limite) {
        UI.toast("Só temos " + limite + " unidades deste item no estoque.", "aviso");
        return;
      }
      qtd += 1;
      campo.textContent = qtd;
    });
  }

  function montarBotoesDeCompra() {
    const add = document.getElementById("btn-add-carrinho");
    const agora = document.getElementById("btn-comprar-agora");

    add.addEventListener("click", () => {
      const r = Carrinho.adicionar(produto.id, qtd);
      if (!r.ok) {
        UI.toast("Só temos " + r.disponivel + " unidades deste item no estoque.", "aviso");
        return;
      }
      UI.toast("Adicionado ao carrinho: " + produto.nome);
      UI.abrirGaveta();
    });

    agora.addEventListener("click", () => {
      const r = Carrinho.adicionar(produto.id, qtd);
      if (!r.ok) {
        UI.toast("Só temos " + r.disponivel + " unidades deste item no estoque.", "aviso");
        return;
      }
      location.href = "checkout.html";
    });
  }

  /* ---------- ENTREGA: CEP + MAPA ---------- */

  function montarEntrega() {
    const form = document.getElementById("form-cep");
    const resultado = document.getElementById("resultado-cep");
    if (!form) return;

    const campo = document.getElementById("campo-cep");
    campo.addEventListener("input", () => { campo.value = UI.mascaraCep(campo.value); });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const digitos = campo.value.replace(/\D/g, "");

      if (digitos.length !== 8) {
        UI.marcarErro(campo, "O CEP tem 8 números. É só digitar de novo, sem preocupação.");
        resultado.hidden = true;
        return;
      }
      UI.limparErro(campo);

      const [min, max] = prazoPorCep(digitos);
      const frete = produto.freteGratis ? 0 : CONFIG.entrega.taxaFixa;

      resultado.hidden = false;
      resultado.innerHTML =
        '<div class="cep-ok"><i class="fa-solid fa-circle-check" aria-hidden="true"></i>' +
          '<div><strong>Entregamos no seu endereço</strong>' +
          '<p>Prazo estimado: <strong>' + min + ' a ' + max + ' dias úteis</strong> após o envio.</p>' +
          '<p>Frete: ' + (frete === 0
            ? '<strong class="gratuito">grátis</strong>'
            : '<strong>' + UI.dinheiro(frete) + '</strong>') + '</p>' +
          '<p class="cep-dica">Separação e envio saem do nosso centro de distribuição em ' +
            UI.escapar(CONFIG.endereco.cidade) + '.</p>' +
          '</div></div>';
    });

    /* mapa do ponto de venda, preparação e entrega */
    const mapa = document.getElementById("mapa-produto");
    if (mapa) {
      mapa.innerHTML =
        '<iframe title="Local de venda, preparação e entrega" loading="lazy" ' +
          'src="' + UI.escapar(linkMapa()) + '"></iframe>';
    }

    const local = document.getElementById("local-loja");
    if (local) {
      local.innerHTML =
        '<h2><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Onde vendemos e preparamos seu pedido</h2>' +
        '<p><strong>' + UI.escapar(CONFIG.endereco.titulo) + '</strong></p>' +
        '<p>' + UI.escapar(CONFIG.endereco.rua) + '<br>' +
          UI.escapar(CONFIG.endereco.bairro) + '<br>' +
          UI.escapar(CONFIG.endereco.cidade) + ' — ' + UI.escapar(CONFIG.endereco.uf) +
          ' · CEP ' + UI.escapar(CONFIG.endereco.cep) + '</p>' +
        '<p class="local-dica">Você também pode retirar o pedido presencialmente. ' +
          'Combinamos o horário pelo WhatsApp.</p>' +
        '<a class="btn btn-claro" target="_blank" rel="noopener" href="' +
          UI.escapar(CONFIG.endereco.comoChegar) + '">' +
          '<i class="fa-solid fa-diamond-turn-right" aria-hidden="true"></i> Traçar rota</a>';
    }
  }

  /* ---------- DESCRIÇÃO E ESPECIFICAÇÕES ---------- */

  function montarDescricao() {
    const alvo = document.getElementById("prod-descricao");
    if (!alvo) return;
    /* o texto do catálogo já vem com quebras de linha; cada parágrafo vira <p> */
    alvo.innerHTML = String(produto.descricao || produto.resumo || "")
      .split(/\n\s*\n/)
      .map(par => "<p>" + UI.escapar(par.trim()).replace(/\n/g, "<br>") + "</p>")
      .join("");
  }

  function montarEspecificacoes() {
    const tabela = document.getElementById("prod-especificacoes");
    if (tabela) {
      tabela.innerHTML = (produto.especificacoes || []).map(l =>
        "<tr><th scope=\"row\">" + UI.escapar(l[0]) + "</th><td>" + UI.escapar(l[1]) + "</td></tr>"
      ).join("");
    }

    const caixa = document.getElementById("prod-caixa");
    if (caixa) {
      caixa.innerHTML = (produto.naCaixa || []).map(i =>
        '<li><i class="fa-solid fa-circle-check" aria-hidden="true"></i> ' + UI.escapar(i) + "</li>"
      ).join("");
    }
  }

  /* ---------- AVALIAÇÕES ---------- */

  function montarAvaliacoes() {
    const lista = Catalogo.avaliacoes(produto.id);
    const distribuicao = Catalogo.distribuicao(produto.id);
    const total = lista.length || 1;

    const barra = document.getElementById("avaliacao-resumo");
    if (barra) {
      barra.innerHTML =
        '<div class="nota-grande">' +
          '<strong>' + produto.nota.toFixed(1) + '</strong>' +
          UI.estrelas(produto.nota) +
          '<span>' + produto.avaliacoes + ' avaliações</span>' +
        '</div>' +
        '<div class="barras">' + [5, 4, 3, 2, 1].map(n =>
          '<div class="barra-linha">' +
            '<span>' + n + ' <i class="fa-solid fa-star" aria-hidden="true"></i></span>' +
            '<div class="barra-trilho"><div class="barra-preenchida" style="width:' +
              Math.round((distribuicao[n] / total) * 100) + '%"></div></div>' +
            '<span class="barra-numero">' + distribuicao[n] + '</span>' +
          '</div>').join("") +
        '</div>';
    }

    const alvo = document.getElementById("lista-avaliacoes");
    if (!alvo) return;

    if (!lista.length) {
      alvo.innerHTML =
        '<p class="sem-avaliacoes">Este produto ainda não recebeu avaliações. ' +
        'Seja o primeiro a contar como foi!</p>';
      return;
    }

    alvo.innerHTML = lista.map(a =>
      '<article class="avaliacao">' +
        '<header>' +
          '<span class="avatar" aria-hidden="true">' + UI.escapar(a.autor.slice(0, 1)) + '</span>' +
          '<div>' +
            '<p class="avaliacao-autor">' + UI.escapar(a.autor) +
              (a.comprador ? ' <span class="etiqueta-compra"><i class="fa-solid fa-circle-check" ' +
                'aria-hidden="true"></i> Compra verificada</span>' : '') +
            '</p>' +
            '<p class="avaliacao-data">' + UI.escapar(a.data) + '</p>' +
          '</div>' +
          UI.estrelas(a.nota) +
        '</header>' +
        '<p class="avaliacao-texto">' + UI.escapar(a.texto) + '</p>' +
      '</article>'
    ).join("");
  }

  function montarRelacionados() {
    const alvo = document.getElementById("prod-relacionados");
    if (!alvo) return;
    alvo.innerHTML = Catalogo.relacionados(produto, 4).map(UI.cardProduto).join("");
  }

  /* Abas de conteúdo: descrição / especificações / avaliações. */
  function montarAbas() {
    const botoes = document.querySelectorAll("[data-aba]");
    const paineis = document.querySelectorAll(".painel-aba");
    if (!botoes.length) return;

    function abrir(nome) {
      botoes.forEach(b => {
        const ativo = b.dataset.aba === nome;
        b.classList.toggle("ativo", ativo);
        b.setAttribute("aria-selected", String(ativo));
      });
      paineis.forEach(p => { p.hidden = p.id !== "aba-" + nome; });
    }

    botoes.forEach(b => b.addEventListener("click", () => abrir(b.dataset.aba)));
    abrir("descricao");
  }

  /* ---------- PRODUTO NÃO ENCONTRADO ---------- */

  function mostrarNaoEncontrado() {
    document.title = "Produto não encontrado | " + CONFIG.loja.nome;
    const secao = document.querySelector("main .produto-detalhe");
    if (!secao) return;
    secao.innerHTML =
      '<div class="nao-encontrado">' +
        '<i class="fa-regular fa-face-frown-open" aria-hidden="true"></i>' +
        '<h1>Não achamos esse produto</h1>' +
        '<p>Ele pode ter saído do catálogo ou o link veio incompleto. ' +
          'Não se preocupe — dá para continuar navegando.</p>' +
        '<div class="nao-encontrado-acoes">' +
          '<a class="btn" href="index.html#produtos">Ver todos os produtos</a>' +
          '<a class="btn btn-claro" target="_blank" rel="noopener" href="' + linkWhats() + '">' +
            '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Falar com a loja</a>' +
        '</div>' +
      '</div>';
  }

  /* ---------- INÍCIO ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    produto = Catalogo.porId(idDaUrl());

    if (!produto) {
      mostrarNaoEncontrado();
      return;
    }

    montarCabecalhoDoProduto();
    montarGaleria();
    montarQuantidade();
    montarBotoesDeCompra();
    montarEntrega();
    montarDescricao();
    montarEspecificacoes();
    montarAvaliacoes();
    montarRelacionados();
    montarAbas();

    /* rastro de navegação dinâmico */
    const rastro = document.getElementById("prod-rastro");
    if (rastro) {
      rastro.innerHTML =
        '<a href="index.html">Início</a> <i class="fa-solid fa-chevron-right" aria-hidden="true"></i> ' +
        '<a href="index.html?categoria=' + produto.categoria + '#produtos">' +
          UI.escapar(Catalogo.rotuloCategoria(produto.categoria)) + '</a> ' +
        '<i class="fa-solid fa-chevron-right" aria-hidden="true"></i> ' +
        '<span>' + UI.escapar(produto.nome) + '</span>';
    }
  });
})();
