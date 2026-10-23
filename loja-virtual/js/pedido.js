/* ==========================================================================
   ACOMPANHAMENTO DO PEDIDO
   --------------------------------------------------------------------------
   pedido.html?numero=NX2026-123456
   Mostra a linha do tempo da venda até a entrega, o comprovante e o mapa
   de onde o pedido sai.
   ========================================================================== */

(() => {

  const ETAPAS = [
    { icone: "clipboard-check", nome: "Pedido confirmado",
      texto: "Recebemos seu pedido e já estamos com ele na fila." },
    { icone: "credit-card", nome: "Pagamento aprovado",
      texto: "O pagamento caiu e a reserva dos produtos foi garantida." },
    { icone: "box-open", nome: "Em separação e preparação",
      texto: "Estamos conferindo e embalando cada item do seu pedido." },
    { icone: "truck-fast", nome: "Enviado",
      texto: "Saiu do nosso centro de distribuição a caminho do transporte." },
    { icone: "truck", nome: "Saiu para entrega",
      texto: "Está com o entregador, a caminho do seu endereço." },
    { icone: "house", nome: "Entregue",
      texto: "Pedido entregue. Obrigado por comprar com a gente!" }
  ];

  let pedido = null;

  function acharPedido() {
    const numero = new URLSearchParams(location.search).get("numero");
    let lista = [];
    try { lista = JSON.parse(localStorage.getItem("nexa:pedidos") || "[]"); } catch (e) { lista = []; }

    if (numero) {
      const achado = lista.find(p => p.numero === numero);
      if (achado) return achado;
    }
    /* sem número na URL, ou número não encontrado: o pedido mais recente */
    return lista[0] || null;
  }

  function naoEncontrado() {
    document.title = "Pedido não encontrado | " + CONFIG.loja.nome;
    const alvo = document.getElementById("area-pedido");
    if (!alvo) return;
    alvo.innerHTML =
      '<div class="nao-encontrado">' +
        '<i class="fa-regular fa-folder-open" aria-hidden="true"></i>' +
        '<h1>Não achamos esse pedido por aqui</h1>' +
        '<p>Pode ser que o link tenha ficado incompleto, ou que você esteja em outro ' +
          'navegador — o pedido fica guardado no aparelho onde a compra foi feita.</p>' +
        '<p class="nao-encontrado-dica">Se preferir, fale com a gente que consultamos pra você.</p>' +
        '<div class="nao-encontrado-acoes">' +
          '<a class="btn" href="index.html#produtos">Continuar comprando</a>' +
          '<a class="btn btn-claro" target="_blank" rel="noopener" href="' +
            linkWhats("Olá! Quero ajuda para acompanhar meu pedido " +
              (new URLSearchParams(location.search).get("numero") || "")) + '">' +
            '<i class="fa-brands fa-whatsapp" aria-hidden="true"></i> Falar com a loja</a>' +
        '</div>' +
      '</div>';
  }

  function dataHora(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
      " às " + d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  }

  function metodoLegivel(m) {
    if (m === "pix") return "Pix";
    if (m === "debito") return "Cartão de débito";
    if (m === "credito") return "Cartão de crédito";
    return m || "—";
  }

  /* ---------- LINHA DO TEMPO ---------- */

  function montarLinha() {
    const alvo = document.getElementById("linha-tempo");
    if (!alvo) return;

    const atual = Math.min(pedido.etapa || 0, ETAPAS.length - 1);

    alvo.innerHTML = ETAPAS.map(function (e, i) {
      const feito = i < atual;
      const agora = i === atual;
      return '' +
        '<li class="etapa' + (feito ? " feita" : "") + (agora ? " atual" : "") + '">' +
          '<span class="etapa-marca" aria-hidden="true">' +
            '<i class="fa-solid fa-' + (feito ? "check" : e.icone) + '"></i>' +
          '</span>' +
          '<div class="etapa-corpo">' +
            '<p class="etapa-nome">' + e.nome +
              (agora ? ' <span class="etiqueta-agora">etapa atual</span>' : '') + '</p>' +
            '<p class="etapa-texto">' + e.texto + '</p>' +
          '</div>' +
        '</li>';
    }).join("");

    alvo.setAttribute("aria-label",
      "Etapa " + (atual + 1) + " de " + ETAPAS.length + ": " + ETAPAS[atual].nome);
  }

  function montarResumo() {
    document.getElementById("pedido-numero").textContent = pedido.numero;
    document.getElementById("pedido-data").textContent = "Feito em " + dataHora(pedido.data);
    document.title = "Pedido " + pedido.numero + " | " + CONFIG.loja.nome;

    const min = pedido.entrega.prazoMin;
    const max = pedido.entrega.prazoMax;
    const previsao = document.getElementById("pedido-previsao");

    if ((pedido.etapa || 0) >= ETAPAS.length - 1) {
      previsao.innerHTML =
        '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ' +
        '<span><strong>Entregue</strong><br>Obrigado por comprar com a gente.</span>';
    } else if (pedido.retirada) {
      previsao.innerHTML =
        '<i class="fa-solid fa-store" aria-hidden="true"></i> ' +
        '<span>Retirada na loja<br><strong>' + UI.escapar(CONFIG.endereco.rua) + '</strong></span>';
    } else {
      previsao.innerHTML =
        '<i class="fa-solid fa-truck-fast" aria-hidden="true"></i> ' +
        '<span>Previsão de entrega<br><strong>' + min + ' a ' + max + ' dias úteis</strong></span>';
    }
  }

  function montarItens() {
    const alvo = document.getElementById("pedido-itens");
    if (!alvo) return;

    alvo.innerHTML = pedido.itens.map(function (it) {
      return '<li>' +
        '<img src="' + UI.escapar(it.imagem) + '" alt="" aria-hidden="true">' +
        '<div><a href="produto.html?id=' + encodeURIComponent(it.id) + '">' +
          UI.escapar(it.nome) + '</a>' +
        '<p>' + it.qtd + ' x ' + UI.dinheiro(it.unitario) + '</p></div>' +
        '<strong>' + UI.dinheiro(it.subtotal) + '</strong>' +
      '</li>';
    }).join("");

    const t = pedido.totais;
    document.getElementById("pedido-totais").innerHTML =
      '<div><dt>Subtotal</dt><dd>' + UI.dinheiro(t.subtotal) + '</dd></div>' +
      (t.descontoCupom > 0
        ? '<div class="desconto"><dt>Cupom ' + UI.escapar(t.cupom) +
          '</dt><dd>− ' + UI.dinheiro(t.descontoCupom) + '</dd></div>' : '') +
      '<div><dt>Frete</dt><dd>' +
        (t.frete === 0 ? '<span class="gratuito">grátis</span>' : UI.dinheiro(t.frete)) +
      '</dd></div>' +
      '<div class="resumo-total"><dt>Total pago</dt><dd>' + UI.dinheiro(t.total) + '</dd></div>';
  }

  function montarPagamento() {
    const alvo = document.getElementById("pedido-pagamento");
    if (!alvo) return;
    const p = pedido.pagamento;

    alvo.innerHTML =
      '<p><i class="fa-solid fa-' + (p.metodo === "pix" ? "qrcode" : "credit-card") +
        '" aria-hidden="true"></i> <strong>' + metodoLegivel(p.metodo) + '</strong></p>' +
      (p.finalCartao
        ? '<p class="pag-detalhe">' + UI.escapar(p.bandeira || "Cartão") + ' terminado em ' +
          UI.escapar(p.finalCartao) + '</p>' : '') +
      (p.metodo === "credito" && p.parcelas > 1
        ? '<p class="pag-detalhe">' + p.parcelas + 'x sem juros</p>'
        : '<p class="pag-detalhe">Pagamento confirmado</p>');
  }

  function montarDestino() {
    const alvo = document.getElementById("pedido-destino");
    if (!alvo) return;
    const c = pedido.cliente;

    if (pedido.retirada) {
      alvo.innerHTML =
        '<h2><i class="fa-solid fa-store" aria-hidden="true"></i> Retirada na loja</h2>' +
        '<p><strong>' + UI.escapar(CONFIG.endereco.titulo) + '</strong></p>' +
        '<p>' + UI.escapar(CONFIG.endereco.rua) + '<br>' +
          UI.escapar(CONFIG.endereco.bairro) + '<br>' +
          UI.escapar(CONFIG.endereco.cidade) + ' — ' + UI.escapar(CONFIG.endereco.uf) + '</p>' +
        '<p class="destino-dica">Combinamos o melhor horário pelo WhatsApp.</p>';
    } else {
      alvo.innerHTML =
        '<h2><i class="fa-solid fa-location-dot" aria-hidden="true"></i> Entrega em</h2>' +
        '<p><strong>' + UI.escapar(c.nome) + '</strong></p>' +
        '<p>' + UI.escapar(c.rua) + ', ' + UI.escapar(c.numero) + '<br>' +
          UI.escapar(c.bairro) + '<br>' +
          UI.escapar(c.cidade) + (c.uf ? ' — ' + UI.escapar(c.uf) : '') + '<br>' +
          'CEP ' + UI.escapar(c.cep) + '</p>' +
        '<p class="destino-dica"><i class="fa-solid fa-phone" aria-hidden="true"></i> ' +
          UI.escapar(c.telefone) + '<br><i class="fa-solid fa-envelope" aria-hidden="true"></i> ' +
          UI.escapar(c.email) + '</p>';
    }
  }

  /* Mapa mostrando de onde o pedido sai — venda, preparação e entrega. */
  function montarMapa() {
    const alvo = document.getElementById("pedido-mapa");
    if (!alvo) return;
    alvo.innerHTML =
      '<iframe title="Centro de distribuição e rota de entrega" loading="lazy" ' +
        'src="' + UI.escapar(linkMapa(0.01)) + '"></iframe>' +
      '<div class="mapa-legenda">' +
        '<p><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ' +
          UI.escapar(CONFIG.endereco.rua) + ' — ' +
          UI.escapar(CONFIG.endereco.cidade) + '/' + UI.escapar(CONFIG.endereco.uf) + '</p>' +
        '<p class="mapa-dica">É aqui que separamos e embalamos cada pedido antes do envio.</p>' +
      '</div>';
  }

  /* ---------- CONTROLES ---------- */

  function rotuloAvancar(btn) {
    const fim = pedido.etapa >= ETAPAS.length - 1;
    btn.textContent = fim ? "Pedido entregue" : "Simular próxima etapa";
    if (fim) btn.disabled = true;
  }

  function salvar() {
    try {
      const lista = JSON.parse(localStorage.getItem("nexa:pedidos") || "[]");
      const i = lista.findIndex(function (p) { return p.numero === pedido.numero; });
      if (i >= 0) {
        lista[i].etapa = pedido.etapa;
        localStorage.setItem("nexa:pedidos", JSON.stringify(lista));
      }
    } catch (e) { /* segue sem persistir */ }
  }

  function montarControles() {
    const avancar = document.getElementById("btn-avancar");
    if (avancar) {
      rotuloAvancar(avancar);
      avancar.addEventListener("click", function () {
        const max = ETAPAS.length - 1;
        if ((pedido.etapa || 0) >= max) {
          UI.toast("Este pedido já chegou ao destino.", "aviso");
          return;
        }
        pedido.etapa = (pedido.etapa || 0) + 1;
        salvar();
        montarLinha();
        montarResumo();
        rotuloAvancar(avancar);
        UI.toast("Pedido agora em: " + ETAPAS[pedido.etapa].nome);
      });
    }

    const imprimir = document.getElementById("btn-imprimir");
    if (imprimir) imprimir.addEventListener("click", function () { window.print(); });

    const whats = document.getElementById("pedido-whats");
    if (whats) {
      whats.href = linkWhats("Olá! Tenho uma dúvida sobre o pedido " + pedido.numero + ": ");
    }
  }

  /* ---------- INÍCIO ---------- */

  document.addEventListener("DOMContentLoaded", function () {
    pedido = acharPedido();
    if (!pedido) { naoEncontrado(); return; }

    montarResumo();
    montarLinha();
    montarItens();
    montarPagamento();
    montarDestino();
    montarMapa();
    montarControles();
  });
})();
