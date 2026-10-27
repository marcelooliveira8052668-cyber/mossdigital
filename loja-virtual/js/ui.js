/* ==========================================================================
   CAMADA COMUM — formatação, moldura da página e card de produto
   --------------------------------------------------------------------------
   Cabeçalho, rodapé e gaveta do carrinho são montados a partir do CONFIG,
   então mudar nome, telefone ou endereço em js/config.js atualiza o site
   inteiro sem tocar em HTML.
   ========================================================================== */

const UI = (() => {

  /* ---------- FORMATAÇÃO ---------- */

  function dinheiro(n) {
    const v = Number(n) || 0;
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  }

  /* Escapa HTML. Texto vindo do catálogo e do cliente passa sempre por aqui. */
  function escapar(txt) {
    return String(txt == null ? "" : txt)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  /* Estrelas visuais (sem depender de fonte de ícone para o preenchimento). */
  function estrelas(nota) {
    const n = Math.round(Number(nota) || 0);
    let saida = "";
    for (let i = 1; i <= 5; i++) {
      saida += '<span class="estrela' + (i <= n ? " cheia" : "") + '" aria-hidden="true">&#9733;</span>';
    }
    return '<span class="estrelas" role="img" aria-label="' + n + ' de 5 estrelas">' + saida + '</span>';
  }

  /* Ícone do Font Awesome. Nome vem do catálogo. */
  function icone(nome, extra) {
    const n = String(nome || "cube").replace(/[^a-z0-9-]/gi, "");
    return '<i class="fa-solid fa-' + n + (extra ? " " + extra : "") + '" aria-hidden="true"></i>';
  }

  /* Quantidade de parcelas legível: 1 -> "à vista", 2 -> "2x". */
  function textoParcelas(valor, vezes) {
    const v = Number(valor) || 0;
    if (!vezes || vezes <= 1) return "à vista no Pix ou no cartão";
    return vezes + "x de " + dinheiro(v / vezes) + " sem juros";
  }

  /* ---------- CAMPOS: MÁSCARAS E ERROS AMIGÁVEIS ---------- */

  /* Máscara de cartão: 4321 4321 4321 4321 */
  function mascaraCartao(valor) {
    return String(valor || "").replace(/\D/g, "").slice(0, 16)
      .replace(/(.{4})/g, "$1 ").trim();
  }

  /* Validade: 12/29 */
  function mascaraValidade(valor) {
    const d = String(valor || "").replace(/\D/g, "").slice(0, 4);
    return d.length > 2 ? d.slice(0, 2) + "/" + d.slice(2) : d;
  }

  function mascaraCep(valor) {
    const d = String(valor || "").replace(/\D/g, "").slice(0, 8);
    return d.length > 5 ? d.slice(0, 5) + "-" + d.slice(5) : d;
  }

  function mascaraTelefone(valor) {
    const d = String(valor || "").replace(/\D/g, "").slice(0, 11);
    if (d.length <= 10) {
      return d.replace(/^(\d{2})(\d{0,4})(\d{0,4}).*/, (m, a, b, c) =>
        "(" + a + ") " + b + (c ? "-" + c : ""));
    }
    return d.replace(/^(\d{2})(\d{0,5})(\d{0,4}).*/, (m, a, b, c) =>
      "(" + a + ") " + b + (c ? "-" + c : ""));
  }

  /* Dígito verificador de cartão. Não é prova de fundos — é só para
     pegar o dedo errado antes de mostrar erro genérico no fim. */
  function luhn(numero) {
    const digitos = String(numero || "").replace(/\D/g, "");
    if (digitos.length < 13) return false;
    let soma = 0, dobro = false;
    for (let i = digitos.length - 1; i >= 0; i--) {
      let d = Number(digitos[i]);
      if (dobro) { d *= 2; if (d > 9) d -= 9; }
      soma += d;
      dobro = !dobro;
    }
    return soma % 10 === 0;
  }

  function bandeira(numero) {
    const d = String(numero || "").replace(/\D/g, "");
    if (/^4/.test(d)) return "Visa";
    if (/^(5[1-5]|2[2-7])/.test(d)) return "Mastercard";
    if (/^3[47]/.test(d)) return "Amex";
    if (/^(4011|4312|5067|6362)/.test(d)) return "Elo";
    if (/^6/.test(d)) return "Hipercard";
    return null;
  }

  /* Marca o campo e escreve a mensagem embaixo dele.
     Mensagem escrita para acalmar, não para culpar. */
  function marcarErro(campo, mensagem) {
    if (!campo) return;
    campo.classList.add("campo-erro");
    campo.setAttribute("aria-invalid", "true");
    let aviso = campo.parentNode.querySelector(".campo-mensagem");
    if (!aviso) {
      aviso = document.createElement("p");
      aviso.className = "campo-mensagem";
      campo.parentNode.appendChild(aviso);
    }
    aviso.textContent = mensagem;
    aviso.classList.add("visivel");
  }

  function limparErro(campo) {
    if (!campo) return;
    campo.classList.remove("campo-erro");
    campo.removeAttribute("aria-invalid");
    const aviso = campo.parentNode.querySelector(".campo-mensagem");
    if (aviso) { aviso.textContent = ""; aviso.classList.remove("visivel"); }
  }

  function limparTodosOsErros(form) {
    if (!form) return;
    form.querySelectorAll(".campo-erro").forEach(c => limparErro(c));
  }

  /* ---------- AVISOS ---------- */

  function toast(mensagem, tipo) {
    let caixa = document.getElementById("toast");
    if (!caixa) {
      caixa = document.createElement("div");
      caixa.id = "toast";
      caixa.setAttribute("role", "status");
      caixa.setAttribute("aria-live", "polite");
      document.body.appendChild(caixa);
    }
    caixa.className = "toast visivel " + (tipo || "ok");
    caixa.innerHTML =
      '<i class="fa-solid fa-' + (tipo === "erro" ? "circle-exclamation" :
                                  tipo === "aviso" ? "info-circle" : "circle-check") +
      '" aria-hidden="true"></i><span>' + escapar(mensagem) + "</span>";
    clearTimeout(toast._t);
    toast._t = setTimeout(() => caixa.classList.remove("visivel"), 4200);
  }

  /* ---------- MOLDURA DA PÁGINA ---------- */

  function montarCabecalho() {
    const alvo = document.getElementById("cabecalho");
    if (!alvo) return;

    const pagina = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    const ativo = nome => (pagina.indexOf(nome) === 0 ? ' class="ativo"' : "");

    alvo.className = "cabecalho";
    alvo.innerHTML =
      '<div style="background:#fff4d6;color:#4f3a13;padding:9px 18px;text-align:center;font-size:12px;line-height:1.5" role="note">Demonstração MOSS Digital · Produtos, preços e avaliações fictícios. Fotografias reais ilustrativas da categoria, não do modelo anunciado.</div>' +
      '<div class="topo-faixa">' +
        '<div class="container topo-faixa-interno">' +
          '<p><i class="fa-solid fa-truck-fast" aria-hidden="true"></i> Frete grátis acima de ' +
            dinheiro(CONFIG.entrega.freteGratisAcima) + '</p>' +
          '<div class="topo-faixa-links">' +
            '<span><i class="fa-regular fa-clock" aria-hidden="true"></i> ' +
              escapar(CONFIG.loja.horario) + '</span>' +
            '<a href="' + linkWhats() + '" target="_blank" rel="noopener">' +
              '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Fale conosco</a>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="container topo-principal">' +
        '<button class="btn-menu" id="btn-menu" aria-label="Abrir menu" aria-expanded="false">' +
          '<i class="fa-solid fa-bars" aria-hidden="true"></i></button>' +

        '<a href="index.html" class="logo" aria-label="' + escapar(CONFIG.loja.nome) + ' — página inicial">' +
          escapar(CONFIG.loja.prefixo) + '<span>' + escapar(CONFIG.loja.sufixo) + '</span></a>' +

        '<form class="busca" role="search" id="form-busca">' +
          '<label class="sr-only" for="campo-busca">Buscar produtos</label>' +
          '<input type="search" id="campo-busca" name="q" placeholder="O que você procura hoje?" autocomplete="off">' +
          '<button type="submit" aria-label="Buscar">' +
            '<i class="fa-solid fa-magnifying-glass" aria-hidden="true"></i></button>' +
        '</form>' +

        '<nav class="menu" id="menu-principal" aria-label="Menu principal">' +
          '<ul>' +
            '<li><a href="index.html"' + ativo("index") + '>Início</a></li>' +
            '<li><a href="ofertas.html"' + ativo("ofertas") + '>Ofertas</a></li>' +
            '<li><a href="index.html#categorias">Categorias</a></li>' +
            '<li><a href="index.html#onde-estamos">Onde estamos</a></li>' +
          '</ul>' +
        '</nav>' +

        '<button class="btn-carrinho" id="btn-carrinho" aria-label="Abrir carrinho de compras">' +
          '<i class="fa-solid fa-cart-shopping" aria-hidden="true"></i>' +
          '<span class="selo-carrinho" id="selo-carrinho" aria-hidden="true">0</span>' +
        '</button>' +
      '</div>';
  }

  function montarRodape() {
    const alvo = document.getElementById("rodape");
    if (!alvo) return;

    const categorias = Object.keys(CATEGORIAS).slice(0, 6).map(k =>
      '<li><a href="index.html?categoria=' + k + '">' + escapar(CATEGORIAS[k].rotulo) + '</a></li>'
    ).join("");

    alvo.className = "rodape";
    alvo.innerHTML =
      '<div class="container rodape-grade">' +
        '<div class="rodape-coluna rodape-sobre">' +
          '<p class="logo">' + escapar(CONFIG.loja.prefixo) +
            '<span>' + escapar(CONFIG.loja.sufixo) + '</span></p>' +
          '<p>' + escapar(CONFIG.loja.slogan) + '</p>' +
          '<p class="rodape-aviso">' + escapar(CONFIG.loja.assinatura) + '</p>' +
          '<div class="rodape-social">' +
            '<a href="' + linkWhats() + '" target="_blank" rel="noopener" aria-label="WhatsApp">' +
              '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i></a>' +
            '<a href="' + escapar(CONFIG.loja.instagram) + '" target="_blank" rel="noopener" aria-label="Instagram">' +
              '<i class="fa-brands fa-instagram" aria-hidden="true"></i></a>' +
            '<a href="mailto:' + escapar(CONFIG.loja.email) + '" aria-label="E-mail">' +
              '<i class="fa-solid fa-envelope" aria-hidden="true"></i></a>' +
          '</div>' +
        '</div>' +

        '<div class="rodape-coluna">' +
          '<h2>Categorias</h2><ul>' + categorias +
          '<li><a href="ofertas.html">Todas as ofertas</a></li></ul></div>' +

        '<div class="rodape-coluna">' +
          '<h2>Atendimento</h2><ul>' +
            '<li><a href="' + linkWhats() + '" target="_blank" rel="noopener">Falar no WhatsApp</a></li>' +
            '<li><a href="mailto:' + escapar(CONFIG.loja.email) + '">' + escapar(CONFIG.loja.email) + '</a></li>' +
            '<li><span>' + escapar(CONFIG.loja.telefone) + '</span></li>' +
            '<li><span>' + escapar(CONFIG.loja.horario) + '</span></li>' +
            '<li><a href="index.html#onde-estamos">Como chegar</a></li>' +
          '</ul></div>' +

        '<div class="rodape-coluna">' +
          '<h2>Onde estamos</h2>' +
          '<p>' + escapar(CONFIG.endereco.rua) + '<br>' +
            escapar(CONFIG.endereco.bairro) + '<br>' +
            escapar(CONFIG.endereco.cidade) + ' — ' + escapar(CONFIG.endereco.uf) + '<br>' +
            'CEP ' + escapar(CONFIG.endereco.cep) + '</p>' +
          '<a class="btn btn-claro btn-pequeno" href="' + escapar(CONFIG.endereco.comoChegar) +
            '" target="_blank" rel="noopener">' +
            '<i class="fa-solid fa-location-dot" aria-hidden="true"></i> Ver no mapa</a>' +
        '</div>' +
      '</div>' +

      '<div class="rodape-base">' +
        '<div class="container rodape-base-interno">' +
          '<p>&copy; ' + new Date().getFullYear() + ' ' + escapar(CONFIG.loja.nome) +
            ' — Todos os direitos reservados.</p>' +
          '<div class="pagamentos" aria-label="Formas de pagamento aceitas">' +
            '<span title="Pix"><i class="fa-brands fa-pix" aria-hidden="true"></i> Pix</span>' +
            '<span title="Visa"><i class="fa-brands fa-cc-visa" aria-hidden="true"></i></span>' +
            '<span title="Mastercard"><i class="fa-brands fa-cc-mastercard" aria-hidden="true"></i></span>' +
            '<span title="Elo"><i class="fa-brands fa-cc-elo" aria-hidden="true"></i></span>' +
            '<span title="Boleto"><i class="fa-solid fa-barcode" aria-hidden="true"></i> Boleto</span>' +
          '</div>' +
        '</div>' +
      '</div>';
  }

  /* Gaveta lateral do carrinho, presente em todas as páginas. */
  function montarGaveta() {
    if (document.getElementById("gaveta-carrinho")) return;

    const fundo = document.createElement("div");
    fundo.className = "fundo";
    fundo.id = "fundo-carrinho";

    const gaveta = document.createElement("aside");
    gaveta.id = "gaveta-carrinho";
    gaveta.className = "gaveta";
    gaveta.setAttribute("role", "dialog");
    gaveta.setAttribute("aria-modal", "true");
    gaveta.setAttribute("aria-label", "Carrinho de compras");
    gaveta.innerHTML =
      '<div class="gaveta-topo">' +
        '<h2><i class="fa-solid fa-cart-shopping" aria-hidden="true"></i> Seu carrinho</h2>' +
        '<button id="fechar-gaveta" aria-label="Fechar carrinho">' +
          '<i class="fa-solid fa-xmark" aria-hidden="true"></i></button>' +
      '</div>' +
      '<div class="gaveta-corpo" id="gaveta-corpo"></div>' +
      '<div class="gaveta-rodape" id="gaveta-rodape"></div>';

    document.body.appendChild(fundo);
    document.body.appendChild(gaveta);

    document.getElementById("fechar-gaveta").addEventListener("click", fecharGaveta);
    fundo.addEventListener("click", fecharGaveta);
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") fecharGaveta();
    });
  }

  function abrirGaveta() {
    document.body.classList.add("gaveta-aberta");
    const g = document.getElementById("gaveta-carrinho");
    if (g) {
      renderizarGaveta();
      const foco = g.querySelector("button, a");
      if (foco) foco.focus();
    }
  }

  function fecharGaveta() {
    document.body.classList.remove("gaveta-aberta");
  }

  /* Desenha os itens dentro da gaveta. Chamado a cada mudança do carrinho. */
  function renderizarGaveta() {
    const corpo = document.getElementById("gaveta-corpo");
    const rodape = document.getElementById("gaveta-rodape");
    if (!corpo || !rodape) return;

    const itens = Carrinho.itens();

    if (!itens.length) {
      corpo.innerHTML =
        '<div class="gaveta-vazio">' +
          '<i class="fa-solid fa-basket-shopping" aria-hidden="true"></i>' +
          '<p>Seu carrinho ainda está vazio.</p>' +
          '<a class="btn" href="index.html#produtos">Ver produtos</a>' +
        '</div>';
      rodape.innerHTML = "";
      return;
    }

    corpo.innerHTML = itens.map(it =>
      '<div class="gaveta-item" data-id="' + escapar(it.id) + '">' +
        '<a class="gaveta-item-img" href="produto.html?id=' + encodeURIComponent(it.id) + '">' +
          '<img src="' + escapar(it.produto.imagem) + '" alt="' + escapar(it.produto.nome) + '" loading="lazy"></a>' +
        '<div class="gaveta-item-info">' +
          '<a class="gaveta-item-nome" href="produto.html?id=' + encodeURIComponent(it.id) + '">' +
            escapar(it.produto.nome) + '</a>' +
          '<p class="gaveta-item-preco">' + dinheiro(it.unitario) + '</p>' +
          '<div class="controle-qtd">' +
            '<button data-menos="' + escapar(it.id) + '" aria-label="Diminuir quantidade">' +
              '<i class="fa-solid fa-minus" aria-hidden="true"></i></button>' +
            '<span aria-live="polite">' + it.qtd + '</span>' +
            '<button data-mais="' + escapar(it.id) + '" aria-label="Aumentar quantidade">' +
              '<i class="fa-solid fa-plus" aria-hidden="true"></i></button>' +
          '</div>' +
        '</div>' +
        '<button class="gaveta-remover" data-remover="' + escapar(it.id) + '" ' +
          'aria-label="Remover ' + escapar(it.produto.nome) + ' do carrinho">' +
          '<i class="fa-regular fa-trash-can" aria-hidden="true"></i></button>' +
      '</div>'
    ).join("");

    const t = Carrinho.totais();
    rodape.innerHTML =
      '<div class="gaveta-total"><span>Subtotal</span><strong>' + dinheiro(t.subtotal) + '</strong></div>' +
      (t.faltaParaFreteGratis > 0
        ? '<p class="gaveta-dica"><i class="fa-solid fa-truck" aria-hidden="true"></i> Faltam ' +
          dinheiro(t.faltaParaFreteGratis) + ' para o frete grátis.</p>'
        : '<p class="gaveta-dica gratis"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Você ganhou frete grátis.</p>') +
      '<a class="btn btn-block" href="checkout.html">Finalizar compra</a>' +
      '<button class="btn-texto" data-limpar-carrinho>Limpar carrinho</button>';
  }

  /* Selo com a contagem, atualizado em qualquer página. */
  function atualizarSelo() {
    const selo = document.getElementById("selo-carrinho");
    if (!selo) return;
    const n = Carrinho.unidades();
    selo.textContent = n > 99 ? "99+" : String(n);
    selo.classList.toggle("vazio", n === 0);
  }

  /* Liga os botões de + / - e remover que aparecem em card, gaveta e página
     do produto. Um só ouvinte global evita religar a cada render. */
  function ligarControlesDeQuantidade() {
    document.addEventListener("click", e => {
      const mais = e.target.closest("[data-mais]");
      const menos = e.target.closest("[data-menos]");

      if (mais) {
        const r = Carrinho.incrementar(mais.dataset.mais);
        if (!r.ok && r.motivo === "estoque") {
          toast("Só temos " + r.disponivel + " unidades deste item no estoque.", "aviso");
        }
        return;
      }
      if (menos) {
        Carrinho.decrementar(menos.dataset.menos);
        return;
      }
    });
  }

  /* ---------- CARD DE PRODUTO (estilo Shopee) ---------- */

  function cardProduto(p) {
    if (!p) return "";
    const preco = Catalogo.precoAtual(p);
    const desconto = Catalogo.desconto(p);
    const id = encodeURIComponent(p.id);
    const avaliacoes = (AVALIACOES[p.id] || []).length;

    const selos = [];
    if (desconto > 0) selos.push('<span class="selo selo-desconto">-' + desconto + '%</span>');
    if (p.vendidos > 800) selos.push('<span class="selo selo-vendido">Mais vendido</span>');

    return '' +
      '<article class="card-produto">' +
        '<a class="card-link" href="produto.html?id=' + id + '" aria-label="Ver ' + escapar(p.nome) + '">' +
          '<div class="card-img">' +
            (selos.length ? '<div class="card-selos">' + selos.join("") + '</div>' : '') +
            '<img src="' + escapar(p.imagem) + '" alt="' + escapar(p.nome) + '" loading="lazy" decoding="async">' +
          '</div>' +
          '<div class="card-corpo">' +
            '<p class="card-categoria">' + escapar(Catalogo.rotuloCategoria(p.categoria)) + '</p>' +
            '<h3 class="card-nome">' + escapar(p.nome) + '</h3>' +
            '<p class="card-resumo">' + escapar(p.resumo || "") + '</p>' +
            '<div class="card-nota">' + estrelas(p.nota) +
              '<span class="nota-numero">' + p.nota.toFixed(1) + '</span>' +
              '<span class="nota-vendidos">' + p.vendidos + ' vendidos</span>' +
            '</div>' +
            '<div class="card-preco">' +
              '<span class="preco-atual">' + dinheiro(preco) + '</span>' +
              (p.promo ? '<s class="preco-antigo">' + dinheiro(p.preco) + '</s>' : '') +
            '</div>' +
            '<p class="card-frete">' +
              (p.freteGratis
                ? '<i class="fa-solid fa-truck-fast" aria-hidden="true"></i> Frete grátis'
                : '<i class="fa-solid fa-truck" aria-hidden="true"></i> Entrega para todo o Brasil') +
            '</p>' +
          '</div>' +
        '</a>' +
        '<div class="card-acoes">' +
          '<button class="btn btn-pequeno btn-block" data-adicionar="' + escapar(p.id) + '">' +
            '<i class="fa-solid fa-cart-plus" aria-hidden="true"></i> Adicionar</button>' +
          '<a class="btn btn-claro btn-pequeno btn-block" target="_blank" rel="noopener" href="' +
            linkWhats("Olá! Tenho uma dúvida sobre o " + p.nome + " (" + dinheiro(preco) + ").") + '">' +
            '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Falar com vendedor</a>' +
        '</div>' +
      '</article>';
  }

  /* Delegação global: qualquer botão [data-adicionar] em qualquer página. */
  function ligarAdicaoRapida() {
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-adicionar]");
      if (!btn) return;
      e.preventDefault();

      const resultado = Carrinho.adicionar(btn.dataset.adicionar, 1);
      if (!resultado.ok) {
        if (resultado.motivo === "estoque") {
          toast("Só temos " + resultado.disponivel + " unidades deste item no estoque.", "aviso");
        } else {
          toast("Não conseguimos localizar esse produto. Recarregue a página.", "erro");
        }
        return;
      }
      toast("Adicionado ao carrinho: " + resultado.produto.nome);
    });
  }

  /* Liga tudo que é comum a qualquer página. */
  function iniciar() {
    montarCabecalho();
    montarRodape();
    montarGaveta();
    atualizarSelo();
    ligarControlesDeQuantidade();
    ligarAdicaoRapida();

    const form = document.getElementById("form-busca");
    if (form) {
      form.addEventListener("submit", e => {
        e.preventDefault();
        const termo = document.getElementById("campo-busca").value.trim();
        location.href = "index.html" + (termo ? "?busca=" + encodeURIComponent(termo) : "") + "#produtos";
      });
    }

    const botaoMenu = document.getElementById("btn-menu");
    const menu = document.getElementById("menu-principal");
    if (botaoMenu && menu) {
      botaoMenu.addEventListener("click", () => {
        const aberto = menu.classList.toggle("aberto");
        botaoMenu.setAttribute("aria-expanded", String(aberto));
      });
    }

    const btnCarrinho = document.getElementById("btn-carrinho");
    if (btnCarrinho) btnCarrinho.addEventListener("click", abrirGaveta);

    document.addEventListener("carrinho:atualizado", () => {
      atualizarSelo();
      if (document.body.classList.contains("gaveta-aberta")) renderizarGaveta();
    });

    document.addEventListener("click", e => {
      const remover = e.target.closest("[data-remover]");
      if (remover) {
        Carrinho.remover(remover.dataset.remover);
        toast("Item removido do carrinho.", "aviso");
        return;
      }
      if (e.target.closest("[data-limpar-carrinho]")) {
        Carrinho.limpar();
        toast("Carrinho esvaziado.", "aviso");
      }
    });
  }

  return {
    dinheiro, escapar, estrelas, icone, textoParcelas,
    mascaraCartao, mascaraValidade, mascaraCep, mascaraTelefone,
    luhn, bandeira, marcarErro, limparErro, limparTodosOsErros,
    toast, cardProduto, iniciar,
    abrirGaveta, fecharGaveta, atualizarSelo, renderizarGaveta
  };
})();

document.addEventListener("DOMContentLoaded", UI.iniciar);
