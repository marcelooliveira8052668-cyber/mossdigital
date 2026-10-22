/* =============================================================================
   EducaEnem — LOJA: compra do curso (completo, por área ou avulso)
   Pagamento via PIX — 100% no navegador (site estático, sem servidor).

   COMO FUNCIONA
   1. O aluno monta o carrinho na vitrine (curso.html).
   2. No checkout informa os dados e clica em "Gerar PIX".
   3. Geramos de verdade o BR Code (código copia-e-cola do Banco Central)
      com a chave PIX do professor e o valor exato da compra: dá para pagar
      em qualquer banco, escaneando o QR Code ou colando o código.
   4. O aluno clica em "Já paguei" — o pedido fica registrado como
      "pagamento informado" e o acesso é liberado automaticamente.
      (A confirmação bancária real é feita pelo professor no extrato.)

   >>> CONFIGURAÇÃO IMPORTANTE <<<
   Troque os dados de PIX_CONFIG abaixo pelos dados reais do recebedor
   antes de colocar o site no ar. O BR Code só funciona com chave PIX válida.
   ============================================================================= */
window.Loja = (() => {
  "use strict";

  /* ======================= CONFIGURAÇÃO =======================
     Os valores abaixo vêm de js/config.js (config.js). Se ele não estiver
     presente, usamos os padrões internos — assim a loja nunca deixa de
     funcionar. EDITE js/config.js, não este arquivo. */
  const CFG = window.EDUCA_CONFIG || {};
  const PIX_CONFIG = Object.assign(
    {
      chave: "pix@educaenem.com",
      beneficiario: "MARCELO OLIVEIRA",
      cidade: "SÃO PAULO",
      whatsapp: "5511999999999",
      expiracaoMin: 30,
    },
    CFG.pix || {},
    { whatsapp: (CFG.pix && CFG.pix.whatsapp) || (CFG.escola && CFG.escola.whatsapp) || "5511999999999" }
  );

  const P = CFG.precos || {};
  const PRECOS = {
    curso: P.curso != null ? P.curso : 597,
    areas: Object.assign(
      { natureza: 249, matematica: 169, linguagens: 189, humanas: 189 },
      P.porArea || {}
    ),
    disciplina: P.disciplina != null ? P.disciplina : 49.9,
    // aula/conteúdo avulso: o aluno compra uma aula só, sem precisar da disciplina
    aula: P.aula != null ? P.aula : 1.9,
  };

  const CUPONS = Object.assign({ ENEM10: 0.1, ENEM20: 0.2, PRIMEIRAAULA: 0.15 }, CFG.cupons || {});

  /* Desconto automático por quantidade de itens no carrinho */
  const DESCONTO_PACOTE = [
    { min: 4, off: 0.1 }, // 4 ou mais itens: 10%
    { min: 2, off: 0.05 }, // 2 ou 3 itens: 5%
  ];

  const LS_CARRINHO = "educaenem_carrinho_v1";
  const LS_PEDIDOS = "educaenem_pedidos_v1";
  const LS_PEDIDO_ATUAL = "educaenem_pedido_atual_v1";

  /* ======================= HELPERS ======================= */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[c]);
  }

  function brl(n) {
    return Number(n || 0).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function precoTela(n) {
    // formato sem R$ (para recibos/impressão) e com 2 casas
    return Number(n || 0).toFixed(2);
  }

  function lsLer(chave, padrao) {
    try {
      const raw = localStorage.getItem(chave);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return padrao;
  }

  function lsGravar(chave, valor) {
    try {
      localStorage.setItem(chave, JSON.stringify(valor));
      return true;
    } catch (e) {
      console.warn("localStorage indisponível — compra fica só nesta sessão.", e);
      return false;
    }
  }

  function novoId(prefixo) {
    return (
      prefixo +
      "-" +
      Date.now().toString(36).toUpperCase() +
      "-" +
      Math.random().toString(36).slice(2, 6).toUpperCase()
    );
  }

  function semAcento(t) {
    return String(t || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  /* ======================= CATÁLOGO =======================
     Monta a vitrine a partir das disciplinas reais do curso
     (dados-acervo.js) — assim a loja nunca fica fora de sincronia. */
  function disciplinas() {
    return Array.isArray(window.DISCIPLINAS) ? window.DISCIPLINAS : [];
  }

  function areas() {
    return Array.isArray(window.AREAS_ENEM) ? window.AREAS_ENEM : [];
  }

  function discDaArea(areaId) {
    return disciplinas().filter((d) => d.area === areaId);
  }

  function itemCurso() {
    return {
      tipo: "curso",
      id: "enem-2026",
      nome: "Curso completo ENEM 2026",
      descricao:
        "Todas as " + disciplinas().length + " disciplinas, 3 trimestres, aulas ao vivo, simulados e Professor Virtual.",
      preco: PRECOS.curso,
      emoji: "🎓",
      cor: "#b8ff4d",
    };
  }

  function itensAreas() {
    return areas().map((a) => ({
      tipo: "area",
      id: a.id,
      nome: "Pacote " + a.sigla,
      descricao:
        discDaArea(a.id).length +
        " disciplinas: " +
        discDaArea(a.id).map((d) => d.nome).join(", ") +
        ".",
      preco: PRECOS.areas[a.id] || 0,
      emoji: a.emoji,
      cor: a.cor,
    }));
  }

  function itensDisciplinas() {
    return disciplinas().map((d) => ({
      tipo: "disciplina",
      id: d.id,
      nome: d.nome,
      descricao: d.resumo + " (" + d.horas + "h)",
      preco: PRECOS.disciplina,
      emoji: d.emoji,
      cor: d.cor,
    }));
  }

  /* Uma aula/conteúdo avulso — o aluno compra só aquela aula que ele quer.
     Chamado pelo curso (conteúdo bloqueado) via link:
       curso.html?item=aula:<id>&nome=<título>&disc=<disciplina>             */
  function itemAula(dados) {
    const d = dados || {};
    const disc = disciplinas().find((x) => x.id === d.disciplina);
    return {
      tipo: "aula",
      id: String(d.id || ""),
      nome: d.nome || "Aula avulsa",
      descricao: d.descricao || (disc ? "Aula avulsa de " + disc.nome : "Aula avulsa"),
      preco: PRECOS.aula,
      emoji: d.emoji || (disc ? disc.emoji : "🎬"),
      cor: (disc && disc.cor) || "#a78bfa",
    };
  }

  /* ======================= CARRINHO ======================= */
  let carrinho = lsLer(LS_CARRINHO, []);

  function salvarCarrinho() {
    lsGravar(LS_CARRINHO, carrinho);
  }

  function noCarrinho(tipo, id) {
    return carrinho.findIndex((i) => i.tipo === tipo && i.id === id);
  }

  function adicionar(item) {
    if (noCarrinho(item.tipo, item.id) >= 0) return { ok: false, erro: "já-no-carrinho" };
    // regra de ouro: curso completo substitui tudo; avulso remove o completo
    if (item.tipo === "curso") carrinho = [];
    if (item.tipo !== "curso") carrinho = carrinho.filter((i) => i.tipo !== "curso");
    carrinho.push({
      tipo: item.tipo,
      id: item.id,
      nome: item.nome,
      descricao: item.descricao || "",
      preco: Number(item.preco) || 0,
      emoji: item.emoji || "📘",
      cor: item.cor || "#a78bfa",
    });
    salvarCarrinho();
    return { ok: true };
  }

  function remover(tipo, id) {
    carrinho = carrinho.filter((i) => !(i.tipo === tipo && i.id === id));
    salvarCarrinho();
  }

  function limparCarrinho() {
    carrinho = [];
    salvarCarrinho();
  }

  function qtdItens() {
    return carrinho.length;
  }

  /* ---- cálculo do pedido ---- */
  function calcular(cupom) {
    const subtotal = carrinho.reduce((s, i) => s + i.preco, 0);
    let descPct = 0;
    DESCONTO_PACOTE.forEach((f) => {
      if (carrinho.length >= f.min) descPct = Math.max(descPct, f.off);
    });
    const descPacote = subtotal * descPct;
    let descCupom = 0;
    let cupomValido = null;
    if (cupom && CUPONS[String(cupom).toUpperCase()]) {
      cupomValido = String(cupom).toUpperCase();
      descCupom = (subtotal - descPacote) * CUPONS[cupomValido];
    }
    const total = subtotal - descPacote - descCupom;
    return {
      subtotal: subtotal,
      descPacote: descPacote,
      descPacotePct: descPct,
      cupom: cupomValido,
      descCupom: descCupom,
      total: total,
    };
  }

  function cupomValido(codigo) {
    return !!CUPONS[String(codigo || "").toUpperCase()];
  }

  /* ======================= PIX — BR CODE =======================
     Implementação do padrão do Banco Central (BR Code / EMV QRCPS):
     cada campo é um TLV (id + tamanho + valor) e o payload termina
     com o CRC16-CCITT do conteúdo. */
  function tlv(id, valor) {
    const s = String(valor);
    return id + String(s.length).padStart(2, "0") + s;
  }

  function crc16(texto) {
    let crc = 0xffff;
    for (let i = 0; i < texto.length; i++) {
      crc ^= texto.charCodeAt(i) << 8;
      for (let b = 0; b < 8; b++) {
        crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff;
      }
    }
    return crc.toString(16).toUpperCase().padStart(4, "0");
  }

  function pixPayload(valor, txid) {
    const chave = semAcento(PIX_CONFIG.chave);
    const benef = semAcento(PIX_CONFIG.beneficio || PIX_CONFIG.beneficiario)
      .replace(/[^A-Za-z0-9 .]/g, "")
      .toUpperCase()
      .slice(0, 25);
    const cidade = semAcento(PIX_CONFIG.cidade)
      .replace(/[^A-Za-z0-9 .]/g, "")
      .toUpperCase()
      .slice(0, 25);
    const id = String(txid || "***").slice(0, 25);

    let p = "";
    p += tlv("00", "01"); // formato do payload
    p += tlv("26", tlv("00", "BR.GOV.BCB.PIX") + tlv("01", chave)); // GUI + chave
    p += tlv("52", "0000"); // categoria do estabelecimento
    p += tlv("53", "986"); // moeda: real
    p += tlv("54", precoTela(valor)); // valor
    p += tlv("58", "BR"); // país
    p += tlv("59", benef); // beneficiário
    p += tlv("60", cidade); // cidade
    p += tlv("62", tlv("05", id)); // txid
    p += "6304";
    return p + crc16(p);
  }

  /* Gera a imagem do QR Code (precisa de js/lib/qrcode.js).
     Usamos SVG em vez do GIF embutido da biblioteca porque o codificador
     GIF falha em alguns navegadores modernos ("Invalid array length").
     O SVG é convertido em data URI e devolvido dentro de um <img>, que
     funciona em qualquer navegador. */
  function qrImagemHTML(texto) {
    if (typeof window.qrcode !== "function") return null;
    for (let versao = 4; versao <= 24; versao++) {
      try {
        const qr = window.qrcode(versao, "M");
        qr.addData(texto);
        qr.make();
        const svg = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
        const uri = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
        return (
          '<img src="' + uri + '" width="220" height="220" ' +
          'alt="QR Code para pagamento PIX" style="display:block">'
        );
      } catch (e) {
        continue; // dados não cabem nesta versão — tenta a próxima
      }
    }
    return null;
  }

  /* ======================= PEDIDOS ======================= */
  function pedidos() {
    return lsLer(LS_PEDIDOS, []);
  }

  function salvarPedido(pedido) {
    const lista = pedidos().filter((p) => p.id !== pedido.id);
    lista.push(pedido);
    lsGravar(LS_PEDIDOS, lista);
    // "porta pronta": se o backend estiver em modo api, espelha o pedido no
    // servidor do cliente (envio em segundo plano; a loja segue funcionando
    // mesmo se o servidor estiver offline).
    if (window.Backend && window.Backend.modo === "api") {
      try {
        window.Backend.salvarPedido(pedido).catch((e) => console.warn("[Loja] não sincronizou o pedido:", e.message));
      } catch (e) {}
    }
    return pedido;
  }

  function pedidoAtual() {
    return lsLer(LS_PEDIDO_ATUAL, null);
  }

  function definirPedidoAtual(pedido) {
    if (pedido) lsGravar(LS_PEDIDO_ATUAL, pedido);
    else {
      try {
        localStorage.removeItem(LS_PEDIDO_ATUAL);
      } catch (e) {}
    }
  }

  /* Confirma o pagamento informado pelo aluno:
     - registra o pedido como "pagamento informado"
     - se o aluno NÃO está logado, cria a conta dele com os dados da compra */
  function confirmarPagamento(pedido, dadosCliente) {
    const user = typeof Store !== "undefined" ? Store.usuarioAtual() : null;
    let conta = null;
    let senhaTemp = null;

    if (!user && typeof Store !== "undefined" && dadosCliente) {
      const base = String(dadosCliente.email || dadosCliente.nome || "aluno")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "")
        .slice(0, 12);
      let login = base || "aluno";
      let n = 1;
      while (Store.usuarios().some((u) => u.login === login)) {
        n++;
        login = base + n;
      }
      senhaTemp = "enem" + String(Math.floor(1000 + Math.random() * 9000));
      const r = Store.criarUsuario({
        nome: dadosCliente.nome || login,
        login: login,
        senha: senhaTemp,
        papel: "aluno",
        email: dadosCliente.email || "",
      });
      if (r.ok) {
        conta = r.usuario;
        Store.entrar(r.usuario.login, senhaTemp); // já deixa logado
      }
    }

    pedido.status = "pagamento informado";
    pedido.pagoEmISO = new Date().toISOString();
    pedido.alunoId = user ? user.id : conta ? conta.id : null;
    pedido.itens = pedido.itens.map((i) => ({ ...i }));
    salvarPedido(pedido);
    definirPedidoAtual(pedido);
    return { pedido: pedido, conta: conta, senhaTemp: senhaTemp };
  }

  function meusPedidos() {
    const user = typeof Store !== "undefined" ? Store.usuarioAtual() : null;
    const todos = pedidos();
    if (user) return todos.filter((p) => p.alunoId === user.id);
    return todos;
  }

  function waLink(pedido) {
    const n = PIX_CONFIG.whatsapp.replace(/\D/g, "");
    const txt =
      "Olá! Acabei de comprar no EducaEnem.\n" +
      "Pedido: " + pedido.id +
      "\nValor: " + brl(pedido.total) +
      "\nItens: " + pedido.itens.map((i) => i.nome).join(", ") +
      (pedido.cliente && pedido.cliente.nome ? "\nNome: " + pedido.cliente.nome : "");
    return "https://wa.me/" + n + "?text=" + encodeURIComponent(txt);
  }

  /* ======================= API PÚBLICA ======================= */
  return {
    PIX_CONFIG: PIX_CONFIG,
    PRECOS: PRECOS,
    CUPONS: CUPONS,
    // catálogo
    itemCurso: itemCurso,
    itensAreas: itensAreas,
    itensDisciplinas: itensDisciplinas,
    itemAula: itemAula,
    disciplinas: disciplinas,
    areas: areas,
    // carrinho
    getCarrinho: () => carrinho.slice(),
    adicionar: adicionar,
    remover: remover,
    limparCarrinho: limparCarrinho,
    qtdItens: qtdItens,
    calcular: calcular,
    cupomValido: cupomValido,
    // pix
    pixPayload: pixPayload,
    qrImagemHTML: qrImagemHTML,
    // pedidos
    pedidos: pedidos,
    salvarPedido: salvarPedido,
    pedidoAtual: pedidoAtual,
    definirPedidoAtual: definirPedidoAtual,
    confirmarPagamento: confirmarPagamento,
    meusPedidos: meusPedidos,
    waLink: waLink,
    brl: brl,
    esc: esc,
  };
})();
