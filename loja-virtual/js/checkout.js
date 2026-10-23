/* ==========================================================================
   CHECKOUT — Pix, crédito e débito
   --------------------------------------------------------------------------
   Nenhum alert() em lugar nenhum. Erro de campo aparece ao lado do campo,
   escrito para acalmar quem está no meio da compra.
   ========================================================================== */

(() => {

  let metodo = "pix";
  let cupomAplicado = null;
  let retirarNaLoja = false;

  /* Frete escolhido pelo cliente. null = o carrinho calcula sozinho. */
  function freteAtual() {
    return retirarNaLoja ? 0 : null;
  }

  /* ---------- CÓDIGO PIX (BR Code / EMV) ----------
     Monta o payload que o banco lê do QR. Assim que o cliente colocar a
     chave Pix real em js/config.js, o QR já passa a receber pagamento. */

  function campoEmv(id, valor) {
    const v = String(valor);
    return id + String(v.length).padStart(2, "0") + v;
  }

  function normalizar(txt, max) {
    return String(txt || "")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^A-Za-z0-9 .-]/g, "")
      .toUpperCase()
      .slice(0, max);
  }

  function crc16(payload) {
    let crc = 0xFFFF;
    for (let i = 0; i < payload.length; i++) {
      crc ^= payload.charCodeAt(i) << 8;
      for (let b = 0; b < 8; b++) {
        crc = (crc & 0x8000) ? (((crc << 1) ^ 0x1021) & 0xFFFF) : ((crc << 1) & 0xFFFF);
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  function pixPayload(valor) {
    const pix = CONFIG.pagamento.pix;
    const chave = String(pix.chave || "").trim();
    if (!chave) return null;

    const conta = campoEmv("00", "br.gov.bcb.pix") + campoEmv("01", chave);
    const txid = normalizar("LOJA" + Date.now().toString().slice(-12), 25);

    const payload =
      campoEmv("00", "01") +
      campoEmv("26", conta) +
      campoEmv("52", "0000") +
      campoEmv("53", "986") +
      campoEmv("54", (Number(valor) || 0).toFixed(2)) +
      campoEmv("58", "BR") +
      campoEmv("59", normalizar(pix.titular, 25)) +
      campoEmv("60", normalizar(pix.cidade, 15)) +
      campoEmv("62", campoEmv("05", txid));

    return payload + "6304" + crc16(payload + "6304");
  }

  /* ---------- RESUMO ---------- */

  function resumoTotais() {
    const t = Carrinho.totais({ cupom: cupomAplicado, frete: freteAtual() });
    const alvo = document.getElementById("resumo-pedido");
    if (!alvo || !t.itens.length) return t;

    alvo.innerHTML =
      '<ul class="resumo-itens">' + t.itens.map(it =>
        '<li>' +
          '<img src="' + UI.escapar(it.produto.imagem) + '" alt="" aria-hidden="true">' +
          '<div><p class="resumo-nome">' + UI.escapar(it.produto.nome) + '</p>' +
          '<p class="resumo-qtd">' + it.qtd + ' x ' + UI.dinheiro(it.unitario) + '</p></div>' +
          '<strong>' + UI.dinheiro(it.subtotal) + '</strong>' +
        '</li>').join("") + '</ul>' +

      '<dl class="resumo-totais">' +
        '<div><dt>Subtotal</dt><dd>' + UI.dinheiro(t.subtotal) + '</dd></div>' +
        (t.descontoCupom > 0
          ? '<div class="desconto"><dt>Cupom ' + UI.escapar(t.cupom.codigo) +
            '</dt><dd>− ' + UI.dinheiro(t.descontoCupom) + '</dd></div>' : '') +
        '<div><dt>Frete</dt><dd>' +
          (t.frete === 0 ? '<span class="gratuito">grátis</span>' : UI.dinheiro(t.frete)) +
        '</dd></div>' +
        '<div class="resumo-total"><dt>Total</dt><dd id="resumo-valor-total">' +
          UI.dinheiro(t.total) + '</dd></div>' +
      '</dl>' +
      (t.faltaParaFreteGratis > 0
        ? '<p class="resumo-dica"><i class="fa-solid fa-truck" aria-hidden="true"></i> Faltam ' +
          UI.dinheiro(t.faltaParaFreteGratis) + ' para o frete sair de graça.</p>'
        : '');

    return t;
  }

  /* ---------- PAGAMENTO: ABAS E PARCELAS ---------- */

  function ligarAbas() {
    const abas = document.querySelectorAll("[data-metodo]");
    const paineis = document.querySelectorAll("[data-painel]");

    function selecionar(nome) {
      metodo = nome;
      abas.forEach(b => {
        const ativo = b.dataset.metodo === nome;
        b.classList.toggle("ativo", ativo);
        b.setAttribute("aria-selected", String(ativo));
      });
      /* um bloco pode valer para mais de um método: "credito,debito" */
      paineis.forEach(p => {
        const valePara = p.dataset.painel.split(",");
        p.hidden = valePara.indexOf(nome) === -1;
      });
      /* parcelas só existem no crédito */
      const linhaParcelas = document.getElementById("linha-parcelas");
      if (linhaParcelas) linhaParcelas.hidden = (nome !== "credito");
      atualizarCartao();
    }

    abas.forEach(b => b.addEventListener("click", () => selecionar(b.dataset.metodo)));
    selecionar("pix");
  }

  /* Desenha a área do Pix (passos, chave e o espaço do QR). */
  function montarAreaPix() {
    const alvo = document.getElementById("area-pix");
    if (!alvo) return;

    const chave = String(CONFIG.pagamento.pix.chave || "").trim();
    const mascara = chave.length > 6
      ? chave.slice(0, 3) + "••••" + chave.slice(-3)
      : chave;

    alvo.innerHTML =
      '<div class="pix-grade">' +
        '<div class="pix-qr" id="pix-qr" role="img" aria-label="QR Code para pagamento no Pix"></div>' +
        '<div class="pix-info">' +
          '<p class="pix-passo"><strong>1.</strong> Abra o app do seu banco e escolha ' +
            '<em>Pagamento por QR Code</em>.</p>' +
          '<p class="pix-passo"><strong>2.</strong> Aponte a câmera para o código ao lado, ' +
            'ou copie a chave abaixo.</p>' +
          '<p class="pix-passo"><strong>3.</strong> Confira o valor e confirme. ' +
            'O pedido é liberado na hora.</p>' +
          '<div class="pix-chave"><span>Chave Pix</span><code>' + UI.escapar(mascara) + '</code>' +
            '<button id="copiar-pix" type="button">' +
            '<i class="fa-regular fa-copy" aria-hidden="true"></i> Copiar chave</button></div>' +
          '<p class="pix-aviso"><i class="fa-solid fa-lock" aria-hidden="true"></i> ' +
            'Pagamento processado pelo seu banco. Nós não guardamos nenhum dado da sua conta.</p>' +
        '</div>' +
      '</div>';

    document.getElementById("copiar-pix").addEventListener("click", function () {
      const pronto = () => {
        this.innerHTML = '<i class="fa-solid fa-check" aria-hidden="true"></i> Copiada!';
        UI.toast("Chave Pix copiada.");
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(chave).then(pronto).catch(pronto);
      } else { pronto.call(this); }
    });
  }

  function desenharQR(valor) {
    const caixa = document.getElementById("pix-qr");
    if (!caixa || typeof qrcode !== "function") return;

    /* ATENÇÃO: precisa ser pixPayload, não montarPix. montarPix() redesenha
       a área inteira e troca o nó #pix-qr — se referenciarmos o antigo, o
       desenho cai num elemento já solto do documento e a tela fica vazia. */
    const payload = pixPayload(valor);
    if (!payload) {
      caixa.innerHTML = '<p class="qr-indisponivel">Informe a chave Pix em js/config.js ' +
        'para gerar o código.</p>';
      return;
    }
    try {
      const qr = qrcode(0, "M");
      qr.addData(payload);
      qr.make();
      caixa.innerHTML = qr.createSvgTag(6, 2, "QR Code Pix de " + UI.dinheiro(valor));
      caixa.dataset.payload = payload;
    } catch (e) {
      caixa.innerHTML = '<p class="qr-indisponivel">Não foi possível gerar o código agora. ' +
        'Use a chave abaixo.</p>';
    }
  }

  /* Escolha de parcelas. Juros apenas acima de 6x, como é prática de mercado. */
  function montarParcelas() {
    const sel = document.getElementById("sel-parcelas");
    if (!sel) return;

    const total = Carrinho.totais({ cupom: cupomAplicado, frete: freteAtual() }).total;

    sel.innerHTML = CONFIG.pagamento.parcelas.map(n => {
      if (n === 1) return '<option value="1">1x de ' + UI.dinheiro(total) + ' (à vista)</option>';
      const comJuros = n > 6;
      const valorTotal = comJuros ? total * Math.pow(1 + CONFIG.pagamento.jurosCredito, n - 6) : total;
      return '<option value="' + n + '">' + n + 'x de ' + UI.dinheiro(valorTotal / n) +
        (comJuros ? ' com juros' : ' sem juros') + '</option>';
    }).join("");

    sel.value = sel.querySelector('option[value="6"]') ? "6" : "1";
    sel.addEventListener("change", atualizarCartao);
    atualizarCartao();
  }

  /* Mostra ao vivo o valor que vai ser cobrado no cartão escolhido. */
  function atualizarCartao() {
    const destino = document.getElementById("cartao-resumo");
    if (!destino) return;

    const total = Carrinho.totais({ cupom: cupomAplicado, frete: freteAtual() }).total;
    const sel = document.getElementById("sel-parcelas");
    const vezes = (metodo === "credito" && sel) ? Number(sel.value) : 1;

    if (vezes <= 1) {
      destino.innerHTML = 'Vai ser cobrado <strong>' + UI.dinheiro(total) + '</strong> no ' +
        (metodo === "debito" ? "débito" : "crédito") + ', na hora da confirmação.';
      return;
    }
    const comJuros = vezes > 6;
    const valorTotal = comJuros ? total * Math.pow(1 + CONFIG.pagamento.jurosCredito, vezes - 6) : total;
    destino.innerHTML = '<strong>' + vezes + 'x de ' + UI.dinheiro(valorTotal / vezes) + '</strong> ' +
      (comJuros
        ? 'com juros (total ' + UI.dinheiro(valorTotal) + ')'
        : 'sem juros, total ' + UI.dinheiro(valorTotal)) + '.';
  }

  /* ---------- MÁSCARAS DOS CAMPOS ---------- */

  function ligarMascaras() {
    [["#campo-cep", UI.mascaraCep],
     ["#campo-telefone", UI.mascaraTelefone],
     ["#campo-cartao", UI.mascaraCartao],
     ["#campo-validade", UI.mascaraValidade]].forEach(par => {
      const el = document.querySelector(par[0]);
      if (!el) return;
      el.addEventListener("input", () => { el.value = par[1](el.value); UI.limparErro(el); });
    });

    const cvv = document.querySelector("#campo-cvv");
    if (cvv) cvv.addEventListener("input", () => {
      cvv.value = cvv.value.replace(/\D/g, "").slice(0, 4);
      UI.limparErro(cvv);
    });

    document.querySelectorAll("#form-checkout input, #form-checkout select").forEach(c => {
      c.addEventListener("input", () => UI.limparErro(c));
    });
  }

  /* ---------- VALIDAÇÃO ----------
     As mensagens são o coração deste arquivo: o cliente pediu um erro que
     "não assusta o comprador". Nenhuma culpa, nenhuma exclamação. */

  function validarCliente() {
    const f = id => document.getElementById(id);
    const problemas = [];

    const nome = f("campo-nome");
    if (!nome.value.trim()) {
      UI.marcarErro(nome, "Escreve seu nome completo para sabermos para quem enviar.");
      problemas.push(nome);
    }

    const email = f("campo-email");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      UI.marcarErro(email, "Esse e-mail parece ter faltado alguma coisa. Dá uma conferida?");
      problemas.push(email);
    }

    const tel = f("campo-telefone");
    if (tel.value.replace(/\D/g, "").length < 10) {
      UI.marcarErro(tel, "Faltam alguns números no telefone — é o DDD mais o número.");
      problemas.push(tel);
    }

    if (!retirarNaLoja) {
      const cep = f("campo-cep");
      if (cep.value.replace(/\D/g, "").length !== 8) {
        UI.marcarErro(cep, "O CEP tem 8 números. Você pode digitar sem se preocupar com a pontuação.");
        problemas.push(cep);
      }
      [["campo-rua", "Escreve o nome da rua para a entrega."],
       ["campo-numero", "Coloca o número, ou 's/n' se não tiver."],
       ["campo-bairro", "Falta o bairro."],
       ["campo-cidade", "Falta a cidade."]].forEach(par => {
        const el = f(par[0]);
        if (!el || !el.value.trim()) { UI.marcarErro(el, par[1]); problemas.push(el); }
      });
    }

    return problemas;
  }

  function validarCartao() {
    const f = id => document.getElementById(id);
    const problemas = [];

    const numero = f("campo-cartao");
    const digitos = numero.value.replace(/\D/g, "");

    if (!digitos) {
      UI.marcarErro(numero, "Preenche o número do cartão para continuarmos.");
      problemas.push(numero);
    } else if (digitos.length < 16) {
      UI.marcarErro(numero, "Faltam alguns números no cartão — são 16 dígitos no total.");
      problemas.push(numero);
    } else if (!UI.luhn(digitos)) {
      /* o tom importa aqui: não dizemos "número inválido", dizemos "confere" */
      UI.marcarErro(numero, "O número não parece fechar. Dá uma olhada na frente do cartão " +
        "e confere os dígitos, um a um.");
      problemas.push(numero);
    }

    const nome = f("campo-nome-cartao");
    if (nome.value.trim().length < 5) {
      UI.marcarErro(nome, "Escreve o nome exatamente como aparece na frente do cartão.");
      problemas.push(nome);
    }

    const validade = f("campo-validade");
    const v = validade.value;
    if (!/^\d{2}\/\d{2}$/.test(v)) {
      UI.marcarErro(validade, "A validade fica em MM/AA, na frente do cartão. Exemplo: 08/29.");
      problemas.push(validade);
    } else {
      const mes = Number(v.slice(0, 2));
      const ano = 2000 + Number(v.slice(3, 5));
      const fim = new Date(ano, mes, 0, 23, 59);
      if (mes < 1 || mes > 12) {
        UI.marcarErro(validade, "Esse mês não existe. Confere a frente do cartão?");
        problemas.push(validade);
      } else if (fim < new Date()) {
        UI.marcarErro(validade, "Parece que esse cartão já venceu. Às vezes o novo chegou com " +
          "os mesmos dígitos — confere com calma.");
        problemas.push(validade);
      }
    }

    const cvv = f("campo-cvv");
    if (cvv.value.length < 3) {
      UI.marcarErro(cvv, "O código de segurança são os 3 dígitos no verso do cartão.");
      problemas.push(cvv);
    }

    return problemas;
  }

  /* ---------- RETIRAR NA LOJA ---------- */

  function ligarRetirada() {
    const check = document.getElementById("check-retirar");
    if (!check) return;

    check.addEventListener("change", () => {
      retirarNaLoja = check.checked;
      const bloco = document.getElementById("bloco-endereco");
      if (bloco) bloco.hidden = retirarNaLoja;

      if (retirarNaLoja) {
        UI.toast("Sem frete: você retira no nosso endereço em " + CONFIG.endereco.cidade + ".");
      }
      resumoTotais();
      atualizarCartao();
      desenharQR(Carrinho.totais({ cupom: cupomAplicado, frete: freteAtual() }).total);
    });
  }

  /* ---------- CONFIRMAÇÃO ---------- */

  function ligarFormulario() {
    const form = document.getElementById("form-checkout");
    if (!form) return;

    form.addEventListener("submit", e => {
      e.preventDefault();
      UI.limparTodosOsErros(form);

      if (Carrinho.vazio()) {
        UI.toast("Seu carrinho está vazio. Escolha um produto para continuar.", "aviso");
        return;
      }

      const problemas = validarCliente();
      if (metodo !== "pix") problemas.push.apply(problemas, validarCartao());

      if (problemas.length) {
        /* só um aviso gentil no topo — o detalhe já está escrito no campo */
        UI.toast("Faltou preencher alguma coisinha. Olhe os campos destacados, sem pressa.", "aviso");
        problemas[0].focus({ preventScroll: true });
        problemas[0].scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }

      gravarPedido();
    });
  }

  function gravarPedido() {
    const f = id => (document.getElementById(id) || {}).value || "";
    const totais = Carrinho.totais({ cupom: cupomAplicado, frete: freteAtual() });
    const numero = "NX" + new Date().getFullYear() + "-" + String(Date.now()).slice(-6);

    const cep = retirarNaLoja ? "" : f("campo-cep").replace(/\D/g, "");
    const prazo = prazoPorCep(cep);

    const pedido = {
      numero: numero,
      data: new Date().toISOString(),
      etapa: 0,
      retirada: retirarNaLoja,
      itens: totais.itens.map(it => ({
        id: it.id, nome: it.produto.nome, imagem: it.produto.imagem,
        qtd: it.qtd, unitario: it.unitario, subtotal: it.subtotal
      })),
      totais: {
        subtotal: totais.subtotal, descontoCupom: totais.descontoCupom,
        cupom: totais.cupom ? totais.cupom.codigo : null,
        frete: totais.frete, total: totais.total
      },
      pagamento: {
        metodo: metodo,
        parcelas: metodo === "credito" ? Number(f("sel-parcelas") || 1) : 1,
        finalCartao: metodo === "pix" ? null : f("campo-cartao").replace(/\D/g, "").slice(-4),
        bandeira: metodo === "pix" ? null : UI.bandeira(f("campo-cartao"))
      },
      cliente: {
        nome: f("campo-nome").trim(), email: f("campo-email").trim(),
        telefone: f("campo-telefone").trim(), cep: cep,
        rua: f("campo-rua").trim(), numero: f("campo-numero").trim(),
        bairro: f("campo-bairro").trim(), cidade: f("campo-cidade").trim(),
        uf: (f("campo-uf") || "").trim().toUpperCase()
      },
      entrega: { prazoMin: prazo[0], prazoMax: prazo[1] }
    };

    try {
      const anteriores = JSON.parse(localStorage.getItem("nexa:pedidos") || "[]");
      anteriores.unshift(pedido);
      localStorage.setItem("nexa:pedidos", JSON.stringify(anteriores.slice(0, 20)));
      localStorage.setItem("nexa:ultimo-pedido", pedido.numero);
    } catch (e) { /* segue mesmo sem persistir */ }

    Carrinho.limpar();
    location.href = "pedido.html?numero=" + encodeURIComponent(pedido.numero);
  }

  /* ---------- CUPOM ---------- */

  function montarCupom() {
    const form = document.getElementById("form-cupom");
    if (!form) return;
    const campo = document.getElementById("campo-cupom");
    const aviso = document.getElementById("cupom-aviso");

    form.addEventListener("submit", e => {
      e.preventDefault();
      const codigo = campo.value.trim();
      const t = Carrinho.totais({ cupom: codigo, frete: freteAtual() });

      if (codigo && t.cupom && t.cupom.codigo.toUpperCase() === codigo.toUpperCase()) {
        cupomAplicado = codigo;
        aviso.className = "cupom-aviso ok";
        aviso.innerHTML = '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> ' +
          UI.escapar(t.cupom.texto) + ' aplicado!';
      } else if (codigo && !t.cupom && Catalogo.cupom(codigo)) {
        const c = Catalogo.cupom(codigo);
        aviso.className = "cupom-aviso";
        aviso.innerHTML = '<i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> ' +
          'O cupom existe, mas pede um valor mínimo de ' + UI.dinheiro(c.minimo) + '.';
        cupomAplicado = null;
      } else {
        aviso.className = "cupom-aviso";
        aviso.innerHTML = '<i class="fa-solid fa-circle-exclamation" aria-hidden="true"></i> ' +
          'Não encontramos esse cupom. Sem problema — pode seguir sem ele.';
        cupomAplicado = null;
      }
      resumoTotais();
      atualizarCartao();
      desenharQR(Carrinho.totais({ cupom: cupomAplicado, frete: freteAtual() }).total);
    });
  }

  /* ---------- VAZIO ---------- */

  function montarEstadoVazio() {
    const secao = document.getElementById("secao-checkout");
    if (!secao || !Carrinho.vazio()) return false;
    secao.innerHTML =
      '<div class="carrinho-vazio">' +
        '<i class="fa-solid fa-bag-shopping" aria-hidden="true"></i>' +
        '<h1>Seu carrinho está esperando</h1>' +
        '<p>Escolha um produto e volte para cá que a gente cuida do resto.</p>' +
        '<a class="btn" href="index.html#produtos">Ver produtos</a>' +
      '</div>';
    return true;
  }

  /* ---------- INÍCIO ---------- */

  document.addEventListener("DOMContentLoaded", () => {
    if (montarEstadoVazio()) return;

    const t = resumoTotais();
    ligarAbas();
    montarAreaPix();
    montarParcelas();
    desenharQR(t.total);
    ligarMascaras();
    ligarRetirada();
    montarCupom();
    ligarFormulario();
  });
})();
