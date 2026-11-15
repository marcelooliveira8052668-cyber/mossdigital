/* =============================================================
   História em Foco — app.js
   Paginação, busca, tema, sumário, swipe e pop-ups.
   ============================================================= */
(function () {
  "use strict";

  /* ------------------------- ELEMENTOS ------------------------- */
  var PALCO   = document.getElementById("palco");
  var FOLHA_E = document.getElementById("folhaEsq");
  var FOLHA_D = document.getElementById("folhaDir");
  var PAG_E   = document.getElementById("pagEsq");
  var PAG_D   = document.getElementById("pagDir");
  var NUM_E   = document.getElementById("numEsq");
  var NUM_D   = document.getElementById("numDir");
  var MED     = document.getElementById("medidor");
  var BTN_ANT = document.getElementById("btnAnt");
  var BTN_PROX= document.getElementById("btnProx");
  var BTN_VOZ = document.getElementById("btnVoz");
  var SETA_E  = document.getElementById("setaE");
  var SETA_D  = document.getElementById("setaD");
  var IND     = document.getElementById("indicador");
  var AVISO   = document.getElementById("avisoBusca");
  var TT      = document.getElementById("tt");
  var DICA    = document.getElementById("dica");
  var BARRA   = document.getElementById("barra");
  var CONTROLES = document.getElementById("controles");
  var TXT     = document.getElementById("txtBusca");
  var SUG     = document.getElementById("sugestoes");
  var PTEMA   = document.getElementById("btnTema");
  var PMENU   = document.getElementById("btnMenu");
  var PAINEL  = document.getElementById("painel");
  var SUMARIO_DIV = document.getElementById("sumarioDiv");
  var CORTINA = document.getElementById("cortina");
  var VIEWER = document.getElementById("viewer");
  var VIEWER_IMG = document.getElementById("viewerImg");
  var VIEWER_CAP = document.getElementById("viewerCap");
  var VIEWER_FECHAR = document.getElementById("viewerFechar");

  var ORDEM = window.ORDEM || [];
  var LIVRO = window.LIVRO || {};
  var IMAGENS = window.IMAGENS || {};

  /* ------------------------- ESTADO ------------------------- */
  var capitulos = [];        /* flat: {num, titulo, parte} */
  var capituloMap = {};      /* num -> capitulo */
  var mapaPag = {};          /* num -> indice da 1a pagina */
  var paginas = [];          /* {html, cap} */
  var pos = 0;
  var termo = "";            /* texto pesquisado */
  var termoOrigem = "";
  var achados = [];
  var oc = 0;
  var SUG_ITENS = [];

  function ehUnico() { return document.documentElement.clientWidth < 560; }

  /* ------------------------- PREPARAÇÃO ------------------------- */
  ORDEM.forEach(function (parte) {
    (parte.capitulos || []).forEach(function (c) {
      capitulos.push(c);
      capituloMap[c.num] = c;
    });
  });

  function escapar(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function removerTags(html) {
    return html.replace(/<[^>]*>/g, " ");
  }

  /* ------------------------- BLOCOS ------------------------- */
  function htmlCapa() {
    var t = (LIVRO.titulo || "");
    return '<div class="capaFolha" data-cap="capa">' +
      '<div class="capa-fundo"></div>' +
      '<div class="capa-num">' + escapar(LIVRO.edicao || "") + '</div>' +
      '<div class="capa-tit">' + escapar(t) + '</div>' +
      '<div class="capa-linha"></div>' +
      '<div class="capa-autor">' + escapar(LIVRO.autor || "") + '</div>' +
      '<div class="capa-baixo">' + escapar(LIVRO.editora || "") + " &middot; " + escapar(LIVRO.capaTexto || "") + '</div>' +
      '</div>';
  }

  function sinopseBlocos() {
    var bs = [];
    bs.push({
      html: '<div class="sin-bloco" data-cap="sinopse"><div class="sin-tit">Sinopse</div>' +
        '<div class="sin-quote">' + escapar(LIVRO.citacao || "") + '</div></div>',
      novo: true,
      cap: "sinopse"
    });
    (LIVRO.sinopse || []).forEach(function (p) {
      bs.push({ html: '<p class="sin-p">' + escapar(p) + '</p>', cap: "sinopse" });
    });
    bs.push({
      html: '<div class="sin-foto" data-cap="sinopse"><div class="sin-foto-quadro">' +
        '<img id="fotoAutor" src="img/professor.webp" alt="Foto ' + escapar(LIVRO.autor || "do autor") + '">' +
        '<div class="sin-foto-vazio">' +
        '<span class="sf-icone">&#128395;</span>' +
        '<div><b>Espaço reservado</b></div>' +
        '<div>para a foto do professor</div>' +
        '<small>Cole o arquivo em <code>img/professor.webp</code></small>' +
        '</div></div></div>',
      cap: "sinopse"
    });
    bs.push({
      html: '<div class="sin-autor">' + escapar(LIVRO.autor || "") + " &mdash; " + escapar(LIVRO.edicao || "") + " &middot; " + escapar(LIVRO.editora || "") + '</div>',
      cap: "sinopse"
    });
    return bs;
  }

  function blocosSumario() {
    var bs = [];
    bs.push({
      html: '<div class="cap-topo" data-cap="sumario"><div class="cap-rot">&#128214;</div><h3 class="cap-tit sum-tit">Sumário</h3></div>',
      novo: true,
      cap: "sumario"
    });
    ORDEM.forEach(function (parte) {
      bs.push({ html: '<div class="sum-parte">' + escapar(parte.nome) + '</div>', cap: "sumario" });
      (parte.capitulos || []).forEach(function (c) {
        var pg = (mapaPag[c.num] !== undefined) ? (mapaPag[c.num] + 1) : "";
        bs.push({
          html: '<div class="sumario-item capitulo" data-cap="' + c.num + '">' +
            '<span class="sum-num">' + c.num + '</span>' +
            '<span>' + escapar(c.titulo) + '</span>' +
            '<span class="sum-pag">' + pg + '</span></div>',
          cap: "sumario"
        });
      });
    });
    return bs;
  }

  function blocosCap(c) {
    var bs = [];
    bs.push({
      html: '<div class="cap-topo" data-cap="' + c.num + '">' +
        '<div class="cap-rot">Capítulo ' + c.num + '</div>' +
        '<h3 class="cap-tit">' + escapar(c.titulo) + '</h3></div>',
      novo: true,
      cap: c.num
    });
    (c.paragrafos || []).forEach(function (par) {
      if (par.indexOf("##") === 0) {
        bs.push({ html: '<h5 class="cap-sub">' + escapar(par.slice(2).trim()) + '</h5>', cap: c.num });
      } else {
        bs.push({ html: '<p>' + par + '</p>', cap: c.num });
      }
    });
    var im = IMAGENS[c.num];
    if (im && im.src) {
      bs.push({
        html: '<figure class="cap-img" data-cap="' + c.num + '">' +
          '<img src="' + im.src + '" alt="' + escapar(im.alt || c.titulo) + '" loading="lazy">' +
          (im.legenda ? '<figcaption>' + escapar(im.legenda) + '</figcaption>' : '') +
          '</figure>',
        cap: c.num
      });
    }
    if (c.vocabulario && c.vocabulario.length) {
      var lis = c.vocabulario.map(function (v) {
        return '<li><b>' + escapar(v[0]) + '</b> — ' + escapar(v[1]) + '</li>';
      }).join("");
      bs.push({
        html: '<div class="cap-voc"><h5>Vocabulário do capítulo</h5><ul>' + lis + '</ul></div>',
        cap: c.num
      });
    }
    return bs;
  }

  function htmlFim() {
    return '<div class="fim-bloco" data-cap="fim">' +
      '<div class="fim-t">Fim do livro</div>' +
      '<div class="fim-s">Obrigado pela leitura! Volte sempre.</div>' +
      '</div>';
  }

  function referenciasBlocos() {
    var R = window.REFERENCIAS || { fontes: [], creditos: [] };
    var bs = [];
    bs.push({
      html: '<div class="ref-bloco" data-cap="ref">' +
        '<div class="ref-rot">&#128214;</div>' +
        '<h3 class="cap-tit sum-tit">Referências e Créditos</h3>' +
        '<p class="ref-obs">' + escapar(R.aviso || "") + '</p>' +
        '</div>',
      novo: true, cap: "ref"
    });
    (R.fontes || []).forEach(function (f) {
      bs.push({ html: '<p class="ref-p">' + escapar(f) + '</p>', cap: "ref" });
    });
    bs.push({ html: '<h5 class="cap-sub">Créditos das imagens (Wikimedia Commons)</h5>', cap: "ref" });
    (R.creditos || []).forEach(function (c) {
      bs.push({
        html: '<p class="cred-p"><b>' + escapar(c.num + " — " + c.titulo) + '</b><br>' +
          '<span>' + escapar(c.arquivo) +
          (c.artista ? " — " + escapar(c.artista) : "") +
          (c.licenca ? " — licença: " + escapar(c.licenca) : "") + '</span>' +
          (c.url ? '<br><a class="cred-link" target="_blank" rel="noopener" href="' + escapar(c.url) + '">Ver arquivo original</a>' : "") +
          '</p>',
        cap: "ref"
      });
    });
    return bs;
  }

  /* ------------------------- AUSTE DO TAMANHO ------------------------- */
  function ajustar() {
    var largura = PALCO.clientWidth;
    var altura = PALCO.clientHeight;
    var cs = getComputedStyle(PALCO);
    var gap = parseFloat(cs.gap) || 0;
    var padX = parseFloat(cs.paddingLeft) || 0;
    var dispW = Math.max(0, largura - padX);
    var dispH = Math.max(0, altura - CONTROLES.offsetHeight - 8);
    var AR = 1400 / 1040; /* altura : largura */

    var l;
    if (ehUnico()) {
      l = Math.min(dispW, 620);
    } else {
      l = Math.min((dispW - gap) / 2, 620);
    }
    l = Math.max(140, l);
    var h = l * AR;
    if (h > dispH) { h = Math.max(140, dispH); l = h / AR; }

    PALCO.style.setProperty("--pw", l + "px");
    PALCO.style.setProperty("--ph", h + "px");
  }

  /* ------------------------- PAGINAÇÃO ------------------------- */
  function paginar(blocos) {
    var pag = [];
    var atual = null;
    MED.style.width = PALCO.style.getPropertyValue("--pw") || "560px";
    MED.style.height = PALCO.style.getPropertyValue("--ph") || "754px";
    var limite = MED.clientHeight;
    if (!limite) limite = 1e6;

    blocos.forEach(function (b) {
      if (atual && b.novo) { pag.push(atual); atual = null; }
      if (!atual) atual = { html: "", cap: b.cap };
      MED.innerHTML = atual.html + b.html;
      var estoura = MED.scrollHeight > limite + 1;
      if (estoura && atual.html) {
        pag.push(atual);
        atual = { html: b.html, cap: b.cap };
      } else {
        atual.html += b.html;
      }
    });
    if (atual) pag.push(atual);
    MED.innerHTML = "";
    return pag;
  }

  function calcMapa(pag) {
    var m = {};
    pag.forEach(function (p, i) {
      if (p.cap && m[p.cap] === undefined) m[p.cap] = i;
    });
    return m;
  }

  function montarBlocos() {
    var bs = [];
    bs.push({ html: htmlCapa(), novo: true, cap: "capa" });
    bs = bs.concat(sinopseBlocos());
    bs = bs.concat(blocosSumario());
    capitulos.forEach(function (c) { bs = bs.concat(blocosCap(c)); });
    bs = bs.concat(referenciasBlocos());
    bs.push({ html: htmlFim(), novo: true, cap: "fim" });
    return bs;
  }

  function construir(reset) {
    var passos = 0;
    var mPrev = null, mNovo = null, p = null;
    do {
      var bs = montarBlocos();
      p = paginar(bs);
      mNovo = calcMapa(p);
      if (mPrev && mapasIguais(mNovo, mPrev)) break;
      mPrev = mNovo;
      passos++;
    } while (passos < 4);
    paginas = p;
    mapaPag = mNovo;
    if (reset) { pos = 0; } else { restaurar(); }
    render();
    preencherPainel();
  }

  function mapasIguais(a, b) {
    var ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (var i = 0; i < ka.length; i++) if (a[ka[i]] !== b[ka[i]]) return false;
    return true;
  }

  function restaurar() {
    if (!paginas.length) { pos = 0; return; }
    if (pos <= 0) { pos = 0; return; }
    var alvo = paginas[Math.min(pos, paginas.length - 1)];
    var capAlvo = alvo ? alvo.cap : null;
    if (!capAlvo) { pos = 0; return; }
    var idx = -1;
    for (var i = 0; i < paginas.length; i++) {
      if (paginas[i].cap === capAlvo) { idx = i; break; }
    }
    pos = idx >= 0 ? idx : 0;
  }

  /* ------------------------- MARCAÇÃO DE BUSCA ------------------------- */
  function marcarTermo(el) {
    if (!termo || termo.length < 2 || !el) return;
    var re;
    try { re = new RegExp("(" + termo + ")", "gi"); } catch (e) { return; }
    var nos = [];
    var w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) nos.push(w.currentNode);
    nos.forEach(function (n) {
      if (n.parentNode && n.parentNode.closest && n.parentNode.closest("mark")) return;
      var txt = n.nodeValue;
      if (!txt) return;
      var partes = txt.split(re);
      if (partes.length === 1) return;
      var frag = document.createDocumentFragment();
      for (var i = 0; i < partes.length; i++) {
        if (partes[i] === "") continue;
        if (i % 2 === 1) {
          var mk = document.createElement("mark");
          mk.textContent = partes[i];
          frag.appendChild(mk);
        } else {
          frag.appendChild(document.createTextNode(partes[i]));
        }
      }
      n.parentNode.replaceChild(frag, n);
    });
  }

  function acharPaginas(termoBusca) {
    var t = termoBusca.toLowerCase();
    var out = [];
    paginas.forEach(function (pg, i) {
      var txt = pg.plain || (pg.plain = removerTags(pg.html).toLowerCase());
      if (txt.indexOf(t) !== -1) out.push(i);
    });
    return out;
  }

  /* ------------------------- NAVEGAÇÃO ------------------------- */
  function avancar() { if (pos < paginas.length - 1) { pos += ehUnico() ? 1 : 2; render(); } }
  function voltar()  { if (pos > 0) { pos -= ehUnico() ? 1 : 2; render(); } }

  function irPara(idx) {
    if (idx < 0 || idx >= paginas.length) return;
    pos = idx;
    render();
  }

  function goCap(num) {
    if (mapaPag[num] === undefined) { aviso("Capítulo " + num + " não encontrado."); return; }
    irPara(mapaPag[num]);
  }

  function render() {
    if (!paginas.length) return;
    var unico = ehUnico();
    pos = Math.max(0, Math.min(pos, paginas.length - 1));
    var a = paginas[pos];
    PAG_E.innerHTML = a ? a.html : "";
    NUM_E.textContent = pos + 1;
    var haB = !unico && pos + 1 < paginas.length;
    FOLHA_D.style.display = haB ? "" : "none";
    if (haB) {
      PAG_D.innerHTML = paginas[pos + 1].html;
      NUM_D.textContent = pos + 2;
    } else {
      PAG_D.innerHTML = "";
      NUM_D.textContent = "";
    }
    marcarTermo(PAG_E);
    if (haB) marcarTermo(PAG_D);
    PALCO.classList.toggle("modo-unico", unico);
    BTN_ANT.disabled = pos <= 0;
    BTN_PROX.disabled = pos >= paginas.length - 1;
    SETA_E.disabled = pos <= 0;
    SETA_D.disabled = pos >= paginas.length - 1;
    IND.textContent = (pos + 1) + " / " + paginas.length;
    esconderTT();
    talvezDica();
    sensorFoto();
    sincronizarVoz();
  }

  /* ------------------------- POP-UP TT (abbr) ------------------------- */
  function mostrarTT(alvo, e) {
    var termoT = alvo.textContent.trim();
    if (!alvo.title) return;
    TT.innerHTML = '<span class="tt-termo">' + escapar(termoT) + '</span>' + escapar(alvo.title);
    TT.hidden = false;
    var rect = alvo.getBoundingClientRect();
    var tx = rect.left;
    var ty = rect.bottom + 10;
    var tw = TT.offsetWidth, th = TT.offsetHeight;
    if (tx + tw > window.innerWidth - 8) tx = Math.max(8, window.innerWidth - tw - 8);
    if (ty + th > window.innerHeight - 8) ty = Math.max(8, rect.top - th - 10);
    TT.style.left = tx + "px";
    TT.style.top = ty + "px";
  }
  function esconderTT() { TT.hidden = true; }

  /* ------------------------- DICA ------------------------- */
  var dicaVez = 0;
  function talvezDica() {
    if (localStorage.getItem("hf_dica")) return;
    if (dicaVez > 2) return;
    var temAbbr = (PAG_E.querySelector("abbr")) || (PAG_D.querySelector("abbr"));
    if (!temAbbr) return;
    dicaVez++;
    DICA.innerHTML = "💡 Toque nas palavras sublinhadas para ver o significado." +
      '<button id="dicaOk" type="button">Entendi</button>';
    DICA.hidden = false;
    requestAnimationFrame(function () {
      setTimeout(function () { DICA.classList.add("mostrando"); }, 300);
      setTimeout(function () { DICA.classList.remove("mostrando"); }, 9000);
    });
  }
  function fecharDica() {
    DICA.hidden = true;
    DICA.classList.remove("mostrando");
    localStorage.setItem("hf_dica", "1");
  }

  /* ------------------------- FOTO DO AUTOR (sinopse) ------------------------- */
  function sensorFoto() {
    var q = PAG_E.querySelector(".sin-foto-quadro");
    if (!q && FOLHA_D.style.display !== "none") q = PAG_D.querySelector(".sin-foto-quadro");
    if (!q || q._fotoFeito) return;
    q._fotoFeito = 1;
    var img = q.querySelector("img");
    if (!img) return;
    function pronto() {
      if (img.naturalWidth > 0) { q.classList.add("tem-foto"); }
      else { q.classList.add("sem-foto"); }
    }
    img.addEventListener("load", pronto);
    img.addEventListener("error", pronto);
    if (img.complete) pronto();
  }

  /* ------------------------- AVISO ------------------------- */
  var avisoT = null;
  function aviso(msg) {
    AVISO.textContent = msg;
    AVISO.hidden = false;
    clearTimeout(avisoT);
    avisoT = setTimeout(function () { AVISO.hidden = true; }, 3500);
  }

  /* ------------------------- TEMA ------------------------- */
  var temaIcone = { escuro: "\u2600", claro: "\u263E" };
  function aplicarTema(t) {
    document.body.classList.toggle("escuro", t === "escuro");
    document.body.classList.toggle("claro", t !== "escuro");
    PTEMA.textContent = t === "escuro" ? "\u2600" : "\u263E";
    PTEMA.title = t === "escuro" ? "Mudar para tema claro" : "Mudar para tema escuro";
  }
  function alternarTema() {
    var novo = document.body.classList.contains("escuro") ? "claro" : "escuro";
    aplicarTema(novo);
    try { localStorage.setItem("livro_tema", novo); } catch (e) {}
  }

  /* ------------------------- SUMÁRIO LATERAL ------------------------- */
  function preencherPainel() {
    var h = "";
    ORDEM.forEach(function (parte) {
      h += '<div class="sum-parte-p">' + escapar(parte.nome) + '</div>';
      (parte.capitulos || []).forEach(function (c) {
        var pg = (mapaPag[c.num] !== undefined) ? (mapaPag[c.num] + 1) : "";
        h += '<div class="sumario-item" data-cap="' + c.num + '">' +
          '<span class="sum-num">' + c.num + '</span>' +
          '<span>' + escapar(c.titulo) + '</span>' +
          '<span class="sum-pag">' + pg + '</span></div>';
      });
    });
    SUMARIO_DIV.innerHTML = h;
  }

  function fecharPainel() {
    PAINEL.classList.remove("aberto");
    CORTINA.hidden = true;
  }
  function abrirPainel() {
    PAINEL.classList.add("aberto");
    CORTINA.hidden = false;
  }

  /* ------------------------- BUSCA ------------------------- */
  function atualizarSugestoes() {
    var v = TXT.value.trim();
    SUG_ITENS = [];
    SUG.innerHTML = "";
    if (v === "") { SUG.classList.remove("aberta"); return; }

    if (/^\d+$/.test(v)) {
      var n = parseInt(v, 10);
      SUG_ITENS.push({
        rotulo: 'Ir para a página <strong>' + n + '</strong>',
        run: function () { if (n >= 1 && n <= paginas.length) irPara(n - 1); else aviso("Só existem " + paginas.length + " páginas."); }
      });
    }

    var m = v.match(/^\d+\.\d+$/);
    if (m && capituloMap[v]) {
      SUG_ITENS.push({
        rotulo: 'Abrir capítulo <strong>' + v + '</strong> — ' + escapar(capituloMap[v].titulo),
        run: function () { goCap(v); }
      });
    }

    if (v.length >= 2) {
      var t = v.toLowerCase();
      var q = 0;
      capitulos.forEach(function (c) {
        if (q >= 6) return;
        var alvo = (c.num + " " + c.titulo).toLowerCase();
        if (alvo.indexOf(t) !== -1 || removerTags(livroTexto(c)).toLowerCase().indexOf(t) !== -1) {
          q++;
          SUG_ITENS.push({
            rotulo: '<strong>' + c.num + '</strong> — ' + escapar(c.titulo),
            run: function (num) { return function () { procurarTexto(TXT.value.trim(), num); }; }(c.num)
          });
        }
      });
    }

    SUG_ITENS.forEach(function (it, i) {
      var d = document.createElement("div");
      d.className = "sug";
      d.innerHTML = it.rotulo;
      if (i === 0) d.classList.add("ativa");
      d.addEventListener("mousedown", function (e) { e.preventDefault(); SUG.classList.remove("aberta"); it.run(); });
      d.addEventListener("click", function () { SUG.classList.remove("aberta"); it.run(); });
      SUG.appendChild(d);
    });
    SUG.classList.toggle("aberta", SUG_ITENS.length > 0);
  }

  function livroTexto(c) {
    return (c.paragrafos || []).join(" ") + " " + ((c.vocabulario || []).map(function (v) { return v[0] + " " + v[1]; }).join(" "));
  }

  function procurarTexto(v, numCap) {
    termo = v;
    termoOrigem = v;
    achados = numCap ? achadosDeCap(numCap, v) : acharPaginas(v);
    if (!achados.length) {
      termo = "";
      aviso("Nada encontrado para \u201C" + v + "\u201D.");
      return;
    }
    oc = 0;
    irPara(achados[0]);
    aviso(achados.length + " página(s) com \u201C" + v + "\u201D — Enter: próxima.");
  }

  function achadosDeCap(num, v) {
    var t = v.toLowerCase();
    var out = [];
    paginas.forEach(function (pg, i) {
      if (pg.cap !== num) return;
      if (removerTags(pg.html).toLowerCase().indexOf(t) !== -1) out.push(i);
    });
    return out;
  }

  function executarBusca() {
    var v = TXT.value.trim();
    if (v === "") return;
    /* se houver sugestão aberta e um termo ativo do mesmo texto, avança */
    if (termo && v === termoOrigem) {
      oc = (oc + 1) % achados.length;
      irPara(achados[oc]);
      return;
    }
    if (/^\d+$/.test(v)) {
      var n = parseInt(v, 10);
      if (n >= 1 && n <= paginas.length) irPara(n - 1);
      else aviso("Só existem " + paginas.length + " páginas.");
      SUG.classList.remove("aberta");
      return;
    }
    if (/^\d+\.\d+$/.test(v)) {
      goCap(v);
      SUG.classList.remove("aberta");
      return;
    }
    if (SUG_ITENS.length && SUG.classList.contains("aberta")) {
      var ativa = SUG.querySelector(".sug.ativa");
      if (ativa) {
        SUG_ITENS[Array.prototype.indexOf.call(SUG.children, ativa)].run();
        return;
      }
    }
    procurarTexto(v);
  }

  /* ------------------------- EVENTOS ------------------------- */
  PTEMA.addEventListener("click", alternarTema);
  PMENU.addEventListener("click", function () {
    if (PAINEL.classList.contains("aberto")) fecharPainel(); else abrirPainel();
  });
  CORTINA.addEventListener("click", fecharPainel);

  BTN_ANT.addEventListener("click", voltar);
  BTN_PROX.addEventListener("click", avancar);
  SETA_E.addEventListener("click", voltar);
  SETA_D.addEventListener("click", avancar);

  document.addEventListener("keydown", function (e) {
    if (document.activeElement === TXT) {
      if (e.key === "Enter") { e.preventDefault(); executarBusca(); }
      if (e.key === "Escape") { TXT.value = ""; termo = ""; SUG.classList.remove("aberta"); render(); }
      return;
    }
    if (e.key === "ArrowRight" && VIEWER.hidden) { e.preventDefault(); avancar(); }
    else if (e.key === "ArrowLeft" && VIEWER.hidden) { e.preventDefault(); voltar(); }
    else if (e.key === "Escape") { if (!VIEWER.hidden) fecharViewer(); else { fecharPainel(); esconderTT(); } }
  });

  TXT.addEventListener("input", atualizarSugestoes);
  TXT.addEventListener("focus", atualizarSugestoes);
  document.addEventListener("click", function (e) {
    if (e.target !== TXT && e.target !== SUG && !SUG.contains(e.target)) SUG.classList.remove("aberta");
    if (e.target !== PAINEL && !PAINEL.contains(e.target) && e.target !== PMENU) fecharPainel();
    if (e.target.id === "dicaOk") { e.stopPropagation(); fecharDica(); }
  });

  /* clique/abbr + sumário + imagem __ dentro do palco */
  PALCO.addEventListener("click", function (e) {
    var im = e.target.closest ? e.target.closest(".cap-img img") : null;
    if (im) { abrirViewer(im); return; }
    var ab = e.target.closest ? e.target.closest("abbr") : null;
    if (ab) { mostrarTT(ab, e); return; }
    var it = e.target.closest ? e.target.closest(".sumario-item") : null;
    if (it && it.getAttribute("data-cap")) { goCap(it.getAttribute("data-cap")); esconderTT(); }
    else if (!ab) esconderTT();
  });

  VIEWER_FECHAR.addEventListener("click", function (e) { e.stopPropagation(); fecharViewer(); });
  VIEWER.addEventListener("click", function (e) { if (e.target !== VIEWER_IMG) fecharViewer(); });

  /* sumário lateral (painel) */
  SUMARIO_DIV.addEventListener("click", function (e) {
    var it = e.target.closest ? e.target.closest(".sumario-item") : null;
    if (it && it.getAttribute("data-cap")) {
      fecharPainel();
      goCap(it.getAttribute("data-cap"));
      esconderTT();
    }
  });

  /* ------------------------- LEITURA EM VOZ ALTA ------------------------- */
  var vozAtiva = false;
  var vozUtt = null;
  var vozesLista = [];
  var vozTimer = null;
  var vozVigiaVezes = 0;

  function carregarVozes() {
    if ("speechSynthesis" in window) vozesLista = window.speechSynthesis.getVoices() || [];
  }
  function vozPortugues() {
    carregarVozes();
    for (var i = 0; i < vozesLista.length; i++) {
      if (/^pt/i.test(vozesLista[i].lang || "")) return vozesLista[i];
    }
    return null;
  }
  function pararVigia() {
    if (vozTimer) { clearTimeout(vozTimer); vozTimer = null; }
    vozVigiaVezes = 0;
  }
  function iniciarVigia() {
    pararVigia();
    var len = (vozUtt && vozUtt.text ? vozUtt.text.length : 120);
    var ms = Math.min(Math.max(6000, Math.round(len * 40)), 120000);
    vozTimer = setTimeout(vigiarVoz, ms);
  }
  function vigiarVoz() {
    vozTimer = null;
    if (!vozAtiva || !vozUtt) return;
    var ss = window.speechSynthesis;
    var falando = false, pausado = false;
    try { falando = !!ss.speaking; pausado = !!ss.paused; } catch (e) {}
    if (falando) {
      vozVigiaVezes++;
      if (vozVigiaVezes < 4) { iniciarVigia(); return; }
    } else if (pausado) {
      try { ss.resume(); } catch (e) {}
      iniciarVigia();
      return;
    } else {
      vozVigiaVezes = 0;
    }
    vozUtt = null;
    try { ss.cancel(); } catch (e) {}
    if (!vozAtiva) return;
    if (pos < paginas.length - 1) { avancar(); lerPaginaAtual(); } else pararVoz();
  }
  function textoDeFolha(elm) {
    if (!elm || elm.style.display === "none") return "";
    var partes = [];
    for (var i = 0; i < elm.children.length; i++) {
      var bloco = elm.children[i];
      var t = (bloco.innerText || "").trim();
      if (!t) continue;
      var linhas = t.split("\n");
      var frases = [];
      for (var j = 0; j < linhas.length; j++) {
        var l = linhas[j].replace(/\s+/g, " ").trim();
        if (!l) continue;
        var ultimo = l.charAt(l.length - 1);
        if (".!?:;…)".indexOf(ultimo) === -1) l += ".";
        frases.push(l);
      }
      if (frases.length) partes.push(frases.join(" "));
    }
    return partes.join("\n");
  }
  function textoDaPagina() {
    var t = textoDeFolha(PAG_E);
    if (FOLHA_D && FOLHA_D.style.display !== "none") {
      var d = textoDeFolha(FOLHA_D);
      if (d) t = t ? t + "\n" + d : d;
    }
    return t.trim();
  }
  function atualizarBotaoVoz() {
    if (vozAtiva) {
      BTN_VOZ.classList.add("ativo");
      BTN_VOZ.innerHTML = "&#9209;";
      BTN_VOZ.title = "Parar a leitura em voz alta";
    } else {
      BTN_VOZ.classList.remove("ativo");
      BTN_VOZ.innerHTML = "&#128266;";
      BTN_VOZ.title = "Ler a página em voz alta";
    }
  }
  function pararVoz() {
    vozAtiva = false;
    pararVigia();
    if (vozUtt) { vozUtt.onend = null; vozUtt.onerror = null; }
    vozUtt = null;
    try { window.speechSynthesis.cancel(); } catch (e) {}
    atualizarBotaoVoz();
  }
  function lerPaginaAtual() {
    if (!("speechSynthesis" in window)) { pararVoz(); aviso("Seu navegador não suporta leitura em voz alta."); return; }
    var txt = textoDaPagina();
    if (!txt) { pararVoz(); return; }
    try { window.speechSynthesis.cancel(); } catch (e) {}
    var u = new SpeechSynthesisUtterance(txt);
    u.lang = "pt-BR";
    var v = vozPortugues();
    if (v) u.voice = v;
    u.rate = 0.95;
    u.onend = function () {
      pararVigia();
      if (!vozAtiva || vozUtt !== u) return;
      vozUtt = null;
      if (pos < paginas.length - 1) avancar();
      else pararVoz();
    };
    u.onerror = function () {
      pararVigia();
      if (vozAtiva && vozUtt === u) pararVoz();
    };
    vozUtt = u;
    vozVigiaVezes = 0;
    try { window.speechSynthesis.speak(u); iniciarVigia(); } catch (e) { pararVoz(); aviso("Não foi possível iniciar a leitura em voz alta."); }
  }
  function sincronizarVoz() {
    if (vozAtiva) {
      pararVigia();
      try { window.speechSynthesis.cancel(); } catch (e) {}
      vozUtt = null;
      lerPaginaAtual();
    }
  }
  function alternarVoz() {
    if (vozAtiva) { pararVoz(); return; }
    vozAtiva = true;
    atualizarBotaoVoz();
    lerPaginaAtual();
  }
  BTN_VOZ.addEventListener("click", alternarVoz);
  if ("speechSynthesis" in window) {
    carregarVozes();
    window.speechSynthesis.onvoiceschanged = carregarVozes;
  }

  /* ------------------------- VISUALIZADOR DE IMAGEM ------------------------- */
  function abrirViewer(im) {
    if (!im || !im.src) return;
    VIEWER_IMG.src = im.src;
    VIEWER_IMG.alt = im.alt || "";
    var fig = im.closest ? im.closest(".cap-img") : null;
    var cap = fig ? fig.querySelector("figcaption") : null;
    VIEWER_CAP.textContent = cap ? cap.textContent.trim() : "";
    VIEWER.hidden = false;
    document.body.classList.add("sem-rolar");
  }
  function fecharViewer() {
    if (VIEWER.hidden) return;
    VIEWER.hidden = true;
    VIEWER_IMG.src = "";
    VIEWER_IMG.alt = "";
    document.body.classList.remove("sem-rolar");
  }

  /* swipe */
  var toque = null;
  document.addEventListener("touchstart", function (e) {
    if (VIEWER && !VIEWER.hidden) return;
    if (e.touches.length === 1) {
      toque = { x: e.touches[0].clientX, y: e.touches[0].clientY, t: Date.now() };
    }
  }, { passive: true });
  document.addEventListener("touchmove", function (e) {
    if (toque) { var dx = e.touches[0].clientX - toque.x; var dy = e.touches[0].clientY - toque.y; if (Math.abs(dx) > 20 && Math.abs(dx) > Math.abs(dy)) e.preventDefault(); }
  }, { passive: false });
  document.addEventListener("touchend", function (e) {
    if (!toque) return;
    var dx = e.changedTouches[0].clientX - toque.x;
    var dy = e.changedTouches[0].clientY - toque.y;
    var dt = Date.now() - toque.t;
    toque = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) && dt < 800) {
      if (dx < 0) avancar(); else voltar();
    }
  }, { passive: true });

  /* ------------------------- INÍCIO ------------------------- */
  var redimension = null;
  window.addEventListener("resize", function () {
    clearTimeout(redimension);
    redimension = setTimeout(function () {
      ajustar();
      construir(false);
    }, 180);
  });

  function iniciar() {
    ajustar();
    construir(true);
    try {
      var t = localStorage.getItem("livro_tema");
      if (t) aplicarTema(t);
    } catch (e) {}
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      ajustar();
      construir(false);
    });
  }
})();