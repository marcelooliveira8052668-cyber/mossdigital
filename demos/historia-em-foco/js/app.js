/* ============================================================
   História em Movimento — motor do livro digital
   Paginação, numeração de páginas, navegação, sumário.
   HTML · CSS · JavaScript puro (sem dependências).
   ============================================================ */
(function () {
  "use strict";

  /* ---------- constantes de página (alinhadas ao CSS) ---------- */
  var PAGE_W = 812;
  var PAGE_H = 1130;
  var PAD_X = 62;
  var CORPO_W = PAGE_W - 2 * PAD_X;
  var EPS = 2;

  /* ---------- referências ---------- */
  var $capaTela = document.getElementById("capa");
  var $leitorTela = document.getElementById("leitor");
  var $paginaEnvolve = document.getElementById("paginaEnvolve");
  var $escurecer = document.getElementById("escurecer");
  var $gaveta = document.getElementById("gavetaSumario");
  var $indice = document.getElementById("indiceConteudo");
  var $filtro = document.getElementById("filtroConteudo");
  var $btnAnt = document.getElementById("btnAnt");
  var $btnProx = document.getElementById("btnProx");
  var $numPagina = document.getElementById("numPagina");
  var $totalPaginas = document.getElementById("totalPaginas");
  var $capituloAtual = document.getElementById("capituloAtual");
  var $progresso = document.getElementById("progressoPreenchido");

  /* ---------- estado ---------- */
  var PAGES = [];          // páginas: {el, corpo, numero, parte, ativo(? )}
  var current = -1;
  var chapterStart = {};   // id do capítulo -> índice de página
  var marcadores = { folha: 0, sumario: 0, sinopse: 0 };
  var CORPO_H = 968;       // calculado em tempo real via sonda
  var fontSize = 16.5;
  var numFront = 0;        // contadores de numeração (página a página)
  var numArab = 0;

  /* ---------- utilitários ---------- */
  function $nova(tag, props, text) {
    var el = document.createElement(tag);
    if (props) for (var k in props) if (props.hasOwnProperty(k)) el.setAttribute(k, props[k]);
    if (text != null) el.appendChild(document.createTextNode(text));
    return el;
  }
  function htmlToNode(html) {
    var tpl = document.createElement("template");
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function roman(n) {
    var r = [[1000, "m"], [900, "cm"], [500, "d"], [400, "cd"], [100, "c"], [90, "xc"], [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"]];
    var s = "";
    for (var j = 0; j < r.length; j++) while (n >= r[j][0]) { s += r[j][1]; n -= r[j][0]; }
    return s;
  }

  /* ---------- área de medição oculta ---------- */
  var ARMZ = document.createElement("div");
  ARMZ.style.cssText = "position:absolute;left:-100000px;top:0;visibility:hidden;";
  document.body.appendChild(ARMZ);

  var MEDIDOR = document.createElement("div");
  MEDIDOR.style.cssText = "position:absolute;left:-100000px;top:0;visibility:hidden;width:" + CORPO_W + "px;";
  document.body.appendChild(MEDIDOR);

  /* ---------- medição do corpo real da página ---------- */
  function medirCorpo() {
    var sonda = $nova("div", { "class": "pagina" });
    sonda.innerHTML = '<div class="pagina-cabecalho"><span>x</span><span class="pagina-parte">y</span></div><div class="pagina-corpo"></div><div class="pagina-rodape"><span class="linha"></span><span class="pagina-num">1</span><span class="linha"></span></div>';
    ARMZ.appendChild(sonda);
    var corpo = sonda.querySelector(".pagina-corpo");
    CORPO_H = corpo.clientHeight;
    ARMZ.removeChild(sonda);
  }

  /* ---------- construção de uma página ---------- */
  function novaPagina(opts) {
    opts = opts || {};
    var numero = "";
    if (opts.tipo === "front") numero = roman(++numFront);
    else if (opts.tipo === "content") numero = String(++numArab);
    var el = $nova("div", { "class": "pagina", "aria-label": numero ? "Página " + numero : "" });
    var parteLabel = opts.parte || "";
    el.innerHTML =
      '<div class="pagina-cabecalho"><span>História em Movimento</span><span class="pagina-parte">' + esc(parteLabel) + "</span></div>" +
      '<div class="pagina-corpo"></div>' +
      '<div class="pagina-rodape"><span class="linha"></span><span class="pagina-num">' + esc(numero) + "</span><span class=\"linha\"></span></div>";
    var corpo = el.querySelector(".pagina-corpo");
    if (!opts.parte) el.querySelector(".pagina-parte").textContent = "";

    var page = { el: el, corpo: corpo, numero: numero, parte: opts.parte || "", inicioCap: opts.inicioCap || null, index: PAGES.length };
    PAGES.push(page);
    if (opts.inicioCap) chapterStart[opts.inicioCap] = page.index;
    if (opts.inicioCap) el.classList.add("cap-inicio"); // queda-de-capital em abertura de capítulo
    ARMZ.appendChild(el);
    return page;
  }

  var bloqueioPartes = {}; // evita duplicar partie

  /* ---------- cabe e esplindo ---------- */
  function cabe(page, node) {
    page.corpo.appendChild(node);
    var ok = page.corpo.scrollHeight <= CORPO_H + EPS;
    if (!ok) page.corpo.removeChild(node);
    return ok;
  }

  function ultimoTextoNo(root) {
    if (root.nodeType === 3) return root.nodeValue.trim() ? root : null;
    for (var i = root.childNodes.length - 1; i >= 0; i--) {
      var r = ultimoTextoNo(root.childNodes[i]);
      if (r) return r;
    }
    return null;
  }

  function coletarTags(tn, root) {
    var tags = {};
    var p = tn.parentNode;
    while (p && p !== root) {
      var n = p.nodeName.toLowerCase();
      if (n === "b" || n === "strong") tags.b = true;
      else if (n === "i" || n === "em") tags.i = true;
      p = p.parentNode;
    }
    return tags;
  }

  function limparVazios(root) {
    var mudou = true;
    while (mudou) {
      mudou = false;
      (function percorrer(node) {
        if (node.nodeType !== 1) return;
        for (var i = node.childNodes.length - 1; i >= 0; i--) {
          var c = node.childNodes[i];
          if (c.nodeType === 1) {
            var n = c.nodeName.toLowerCase();
            if ((n === "b" || n === "strong" || n === "i" || n === "em") && !c.textContent.trim()) {
              node.removeChild(c);
              mudou = true;
            }
            percorrer(c);
          }
        }
      })(root);
    }
  }

  /* tira uma palavra do fim; devolve {text, tags} */
  function popWord(root) {
    var tn = ultimoTextoNo(root);
    if (!tn) return null;
    var txt = tn.nodeValue;
    var m = txt.match(/\s*(\S+)\s*$/);
    if (!m) {
      tn.parentNode.removeChild(tn);
      return popWord(root);
    }
    tn.nodeValue = txt.slice(0, txt.length - m[0].length);
    if (!tn.nodeValue) tn.parentNode.removeChild(tn);
    var tags = coletarTags(tn, root);
    limparVazios(root);
    return { text: m[1], tags: tags };
  }

  function mesmasTags(a, b) { return !!a.b === !!b.b && !!a.i === !!b.i; }

  function tokensParaHtml(tokens) {
    var rev = tokens.slice().reverse();
    if (!rev.length) return "";
    var runs = [];
    var cur = { tags: rev[0].tags, parts: [rev[0].text] };
    for (var i = 1; i < rev.length; i++) {
      if (mesmasTags(rev[i].tags, cur.tags)) cur.parts.push(rev[i].text);
      else { runs.push(cur); cur = { tags: rev[i].tags, parts: [rev[i].text] }; }
    }
    runs.push(cur);
    return runs.map(function (r) {
      var t = esc(r.parts.join(" "));
      if (r.tags.b) t = "<b>" + t + "</b>";
      if (r.tags.i) t = "<i>" + t + "</i>";
      return t;
    }).join(" ");
  }

  function dividirParagrafo(node) {
    var clone = node.cloneNode(true);
    var tokens = [];
    var guarda = 0;
    MEDIDOR.innerHTML = "";
    MEDIDOR.appendChild(clone);
    while (MEDIDOR.scrollHeight > CORPO_H - 14 && guarda++ < 8000) {
      var t = popWord(clone);
      if (!t) break;
      tokens.push(t);
    }
    MEDIDOR.innerHTML = "";
    var rest = tokensParaHtml(tokens);
    var restNode = null;
    if (rest) {
      restNode = $nova(node.tagName.toLowerCase());
      if (node.className) restNode.className = node.className;
      restNode.innerHTML = rest;
    }
    return { fit: clone, rest: restNode };
  }

  /* ---------- escoar blocos ---------- */
  function fluirBloco(page, html, meta) {
    var node = htmlToNode(html);
    if (!node) return page;
    var unbreakable = node.tagName === "H3" || (node.tagName === "DIV" && node.classList && node.classList.contains("caixa"));

    if (unbreakable) {
      if (!cabe(page, node)) page = novaPagina(meta);
      page.corpo.appendChild(node);
      return page;
    }

    if (cabe(page, node)) return page;

    var dividido = dividirParagrafo(node);
    page.corpo.appendChild(dividido.fit);
    var rest = dividido.rest;
    while (rest) {
      page = novaPagina(meta);
      if (cabe(page, rest)) {
        page.corpo.appendChild(rest);
        rest = null;
      } else {
        var d2 = dividirParagrafo(rest);
        page.corpo.appendChild(d2.fit);
        rest = d2.rest;
      }
    }
    return page;
  }

  /* ---------- montagem do livro ---------- */
  function montarLivro() {
    PAGES = [];
    chapterStart = {};
    numFront = 0;
    numArab = 0;
    ARMZ.innerHTML = "";
    medirCorpo();

    var data = window.LIVRO;

    // remove o placeholder estático do index.html (o motor cria as próprias páginas)
    var ph = document.getElementById("pagina");
    if (ph && ph.parentNode === $paginaEnvolve) $paginaEnvolve.removeChild(ph);

    /* Folha de rosto (sem numeração) */
    marcadores.folha = PAGES.length;
    var p = novaPagina({ tipo: "plain", parte: "" });
    var tr = $nova("p", { "class": "capa-colecao", style: "text-align:center;font-family:Arial;font-size:9px;letter-spacing:3px;color:#a97125;margin-top:120px;text-transform:uppercase;" }, "Coleção Didática · Ciências Humanas");
    var titulo = $nova("h2", { "class": "chapter-title", style: "text-align:center;font-size:1.8em;color:#2b2118;margin:18px 0 6px;" }, data.titulo);
    var sub = $nova("p", { "class": "chapter-sub", style: "text-align:center;font-style:italic;color:#7a5430;font-size:1em;" }, data.subtitulo);
    var extra = $nova("p", { "class": "sem-indent", style: "text-align:center;font-family:Arial;font-size:11px;letter-spacing:1px;color:#8a6a3a;" }, data.capa.extra);
    p.corpo.appendChild(tr);
    p.corpo.appendChild(titulo);
    p.corpo.appendChild(sub);
    p.corpo.appendChild(extra);

    /* Sumário (frente, numeral romano) */
    marcadores.sumario = PAGES.length;
    p = novaPagina({ tipo: "front" });
    p.corpo.appendChild($nova("p", { "class": "front-title" }, "Sumário"));
    p.corpo.appendChild($nova("p", { "class": "total-geral" }, "Da Antiguidade Oriental à República Liberal Populista"));

    var metaFront = { tipo: "front" };
    var itensToc = [];
    data.partes.forEach(function (parte) {
      itensToc.push({ html: "<h3 class=\"sec\">" + esc(parte.titulo) + "</h3>", unbreakable: true });
      parte.capitulos.forEach(function (cap) {
        itensToc.push({ html: '<p class="capitulo-linha">' + esc(cap.numero) + " — " + esc(cap.titulo) + "</p>", unbreakable: false });
      });
    });
    itensToc.forEach(function (bloco) {
      if (bloco.unbreakable) {
        var nb = htmlToNode(bloco.html);
        if (!cabe(p, nb)) p = novaPagina(metaFront);
        p.corpo.appendChild(nb);
      } else {
        p = fluirBloco(p, bloco.html, metaFront);
      }
    });

    /* Sinopse (continua a numeração romana da frente) */
    marcadores.sinopse = PAGES.length;
    p = novaPagina({ tipo: "front" });
    p.corpo.appendChild($nova("p", { "class": "front-title" }, "Sinopse"));
    data.sinopse.forEach(function (html) {
      p = fluirBloco(p, html, metaFront);
    });

    /* Partes e capítulos */
    data.partes.forEach(function (parte) {
      var partLabel = "Parte " + /PARTE (\S+)/.exec(parte.titulo)[1];
      var metaCont = { tipo: "content", parte: partLabel };
      p = novaPagina(metaCont);
      var h = $nova("h3", { "class": "parte-titulo" }, parte.titulo);
      var intro = $nova("p", { "class": "parte-intro" }, parte.introducao);
      p.corpo.appendChild(h);
      p.corpo.appendChild(intro);

      parte.capitulos.forEach(function (cap) {
        p = novaPagina({ tipo: "content", parte: partLabel, inicioCap: cap.id });
        p.corpo.appendChild($nova("p", { "class": "capnum" }, cap.numero));
        p.corpo.appendChild($nova("h2", { "class": "chapter-title" }, cap.titulo));
        p.corpo.appendChild($nova("h3", { "class": "chapter-sub" }, cap.subtitulo));
        var primeiro = true;
        cap.blocos.forEach(function (html) {
          if (primeiro && html.indexOf("<p") === 0) {
            var node = htmlToNode(html);
            node.setAttribute("data-primeiro", "1");
            p = fluirBloco(p, node.outerHTML, metaCont);
            primeiro = false;
          } else {
            p = fluirBloco(p, html, metaCont);
          }
        });
      });
    });

    /* Colofão */
    p = novaPagina({ tipo: "content" });
    p.corpo.appendChild($nova("p", { "class": "front-title" }, "Sobre esta edição"));
    data.colofon.forEach(function (html) {
      p = fluirBloco(p, html, { tipo: "content" });
    });

    montarIndiceToc();
  }

  /* ---------- exibição ---------- */
  function mostrar(ix, direcao) {
    if (!PAGES.length) return;
    if (ix < 0) ix = 0;
    if (ix >= PAGES.length) ix = PAGES.length - 1;
    if (ix === current && PAGES[ix].el.parentNode === $paginaEnvolve) return;

    var atual = current >= 0 && current < PAGES.length ? PAGES[current].el : null;
    var proxima = PAGES[ix].el;

    if (atual) {
      atual.classList.add("virando");
      $paginaEnvolve.style.setProperty("--dir", direcao === "volta" ? "26px" : "-26px");
      var a = atual;
      setTimeout(function () { a.classList.remove("virando"); a.parentNode.removeChild(a); ARMZ.appendChild(a); }, 280);
    }

    ARMZ.removeChild(proxima);
    $paginaEnvolve.appendChild(proxima);
    current = ix;
    atualizarTela();
  }

  function atualizarTela() {
    var page = PAGES[current];
    $numPagina.textContent = page.numero || "";
    $totalPaginas.textContent = String(PAGES.length);
    var label = "";
    if (page.inicioCap) {
      label = "Início";
    }
    var caps = listaCapitulos();
    var i = page.index;
    // rotulo do capítulo: busca capítulo a que a página pertence
    var capAtual = null;
    for (var k = caps.length - 1; k >= 0; k--) {
      if (chapterStart[caps[k].id] <= i) { capAtual = caps[k]; break; }
    }
    $capituloAtual.textContent = capAtual ? capAtual.numero + " — " + capAtual.titulo : (page.parte ? page.parte : "");
    $btnAnt.disabled = current === 0;
    $btnProx.disabled = current >= PAGES.length - 1;
    var percent = PAGES.length > 1 ? Math.round((current / (PAGES.length - 1)) * 100) : 0;
    $progresso.style.width = percent + "%";
    marcarItemToc();
  }

  var listaCapCache = null;
  function listaCapitulos() {
    if (listaCapCache) return listaCapCache;
    var caps = [];
    window.LIVRO.partes.forEach(function (parte) {
      parte.capitulos.forEach(function (cap) { caps.push(cap); });
    });
    listaCapCache = caps;
    return caps;
  }

  /* ---------- sumário (gaveta) ---------- */
  var itensTocDOM = [];

  function montarIndiceToc() {
    $indice.innerHTML = "";
    itensTocDOM = [];
    var prefixo = $nova("div", { "class": "indice-grupo-titulo" }, "Apresentação");
    $indice.appendChild(prefixo);

    var extras = [
      { rotulo: "Folha de rosto", alvo: marcadores.folha },
      { rotulo: "Sumário", alvo: marcadores.sumario },
      { rotulo: "Sinopse", alvo: marcadores.sinopse }
    ];
    extras.forEach(function (par) {
      var botao = $nova("button", { "type": "button", "class": "indice-item" });
      botao.innerHTML = esc(par.rotulo);
      botao.addEventListener("click", function () { fecharToc(); mostrar(par.alvo, "ida"); });
      $indice.appendChild(botao);
    });

    window.LIVRO.partes.forEach(function (parte) {
      var tit = $nova("div", { "class": "indice-grupo-titulo" }, parte.titulo);
      var base = document.createDocumentFragment();
      base.appendChild(tit);
      parte.capitulos.forEach(function (cap, j) {
        var ref = chapterStart[cap.id];
        var botao = $nova("button", { "type": "button", "class": "indice-item", "data-id": cap.id });
        var r = esc(cap.numero);
        botao.innerHTML = '<span class="num">' + r + "</span> " + esc(cap.titulo);
        botao.addEventListener("click", function () { fecharToc(); if (ref != null) mostrar(ref, "ida"); });
        base.appendChild(botao);
        itensTocDOM.push({ id: cap.id, el: botao });
      });
      $indice.appendChild(base);
    });
  }

  function marcarItemToc() {
    itensTocDOM.forEach(function (o) { o.el.classList.toggle("ativo", o.id === (PAGES[current] && PAGES[current].inicioCap) || chapterStart[o.id] === current); });
  }

  function abrirToc() { $gaveta.classList.add("ativa"); $escurecer.classList.add("ativo"); $filtro.focus(); }
  function fecharToc() { $gaveta.classList.remove("ativa"); $escurecer.classList.remove("ativo"); $filtro.value = ""; aplicarFiltro(); }

  function aplicarFiltro() {
    var q = ($filtro.value || "").toLowerCase().trim().replace(/\s+/g, " ");
    itensTocDOM.forEach(function (o) {
      var txt = o.el.textContent.toLowerCase();
      o.el.style.display = !q || txt.indexOf(q) !== -1 ? "" : "none";
    });
  }

  /* ---------- escala e responsividade ---------- */
  function recalcularEscala() {
    var pad = 36;
    var s = Math.min(
      (window.innerHeight - pad) / PAGE_H,
      (window.innerWidth - 180 - pad) / PAGE_W,
      1.15
    );
    s = Math.max(0.45, s);
    $paginaEnvolve.style.setProperty("--escala", s.toFixed(3));
  }

  /* ---------- tamanho de fonte & persistência ---------- */
  function capituloDaPagina(idx) {
    var start = 0;
    listaCapitulos().forEach(function (cap) {
      if (chapterStart[cap.id] <= idx) start = chapterStart[cap.id];
    });
    return start;
  }
  function aplicarFonte(novo) {
    fontSize = Math.min(21, Math.max(13, novo));
    document.documentElement.style.setProperty("--fs", fontSize + "px");
    try { localStorage.setItem("hm_fs", String(fontSize)); } catch (e) {}
    var alvo = PAGES[current] ? capituloDaPagina(current) : 0;
    reconstruir(alvo ? chapterStartDo(alvo) : null);
  }

  function chapterStartDo(idxPagina) {
    var caps = listaCapitulos();
    for (var i = caps.length - 1; i >= 0; i--) {
      if (chapterStart[caps[i].id] === idxPagina) return caps[i].id;
    }
    return null;
  }

  function reconstruir(chapId) {
    montarLivro();
    var ix = 0;
    if (chapId && chapterStart[chapId] != null) ix = chapterStart[chapId];
    current = -1;
    mostrar(ix, "ida");
    $totalPaginas.textContent = PAGES.length;
  }

  /* ---------- eventos ---------- */
  function ligarEventos() {
    document.getElementById("btnAbrir").addEventListener("click", function () {
      $capaTela.classList.add("oculto");
      $leitorTela.classList.remove("oculto");
      recalcularEscala();
      if (!PAGES.length) reconstruir(null);
      else { current = -1; mostrar(0, "ida"); }
      $paginaEnvolve.classList.add("aberto");
    });

    document.getElementById("btnCapa").addEventListener("click", function () {
      $leitorTela.classList.add("oculto");
      $capaTela.classList.remove("oculto");
      fecharToc();
    });

    document.getElementById("btnProx").addEventListener("click", function () { if (current < PAGES.length - 1) mostrar(current + 1, "ida"); });
    document.getElementById("btnAnt").addEventListener("click", function () { if (current > 0) mostrar(current - 1, "volta"); });

    document.getElementById("btnToc").addEventListener("click", abrirToc);
    document.getElementById("btnFecharToc").addEventListener("click", fecharToc);
    $escurecer.addEventListener("click", fecharToc);
    $filtro.addEventListener("input", aplicarFiltro);

    document.getElementById("btnFonteMais").addEventListener("click", function () { aplicarFonte(fontSize + 1); });
    document.getElementById("btnFonteMenos").addEventListener("click", function () { aplicarFonte(fontSize - 1); });

    document.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowRight" || ev.key === "PageDown") { if (ev.key === "PageDown") ev.preventDefault(); prox(ev); }
      else if (ev.key === "ArrowLeft" || ev.key === "PageUp") { if (ev.key === "PageUp") ev.preventDefault(); ant(ev); }
      else if (ev.key === " ") { ev.preventDefault(); prox(ev); }
      else if (ev.key === "Home") mostrar(0, "ida");
      else if (ev.key === "End") mostrar(PAGES.length - 1, "ida");
      else if (ev.key === "Escape") fecharToc();
      else if (ev.key.toLowerCase() === "t") { if ($gaveta.classList.contains("ativa")) fecharToc(); else abrirToc(); }
    });
    function prox(ev) { if (!$leitorTela.classList.contains("oculto") && current < PAGES.length - 1) mostrar(current + 1, "ida"); }
    function ant(ev) { if (!$leitorTela.classList.contains("oculto") && current > 0) mostrar(current - 1, "volta"); }

    // deslizar (toque)
    var cx = 0, cy = 0;
    $leitorTela.addEventListener("touchstart", function (ev) {
      var t = ev.touches[0]; cx = t.clientX; cy = t.clientY;
    }, { passive: true });
    $leitorTela.addEventListener("touchend", function (ev) {
      var t = ev.changedTouches[0];
      var dx = t.clientX - cx, dy = t.clientY - cy;
      if (Math.abs(dx) > 44 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0 && current < PAGES.length - 1) mostrar(current + 1, "ida");
        else if (dx > 0 && current > 0) mostrar(current - 1, "volta");
      }
    }, { passive: true });

    window.addEventListener("resize", recalcularEscala);
  }

  /* ---------- inicialização ---------- */
  function init() {
    try {
      var fs = parseInt(localStorage.getItem("hm_fs"), 10);
      if (fs) { fontSize = fs; document.documentElement.style.setProperty("--fs", fontSize + "px"); }
    } catch (e) {}
    ligarEventos();

    // conteúdo carregado? (conteudo.js define window.LIVRO)
    if (!window.LIVRO) {
      document.getElementById("btnAbrir").textContent = "Erro ao carregar conteúdo";
      return;
    }
    // monta o livro (o botão "Abrir", ligado em ligarEventos, exibe a primeira página)
    montarLivro();
    recalcularEscala();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();

  window.LIVRO_APP = { mostrar: mostrar, reconstruir: reconstruir, get current() { return current; }, get pages() { return PAGES; } };
})();