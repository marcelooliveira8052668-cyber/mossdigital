/* ============================================================
   lab.js — Laboratório Visual do Código
   ------------------------------------------------------------
   Quatro zonas: diagrama (topo), loja ao vivo (esquerda), código
   (direita) e explicação (baixo). Clicar numa linha mostra sua
   tradução, símbolos, arquivo, localização e resultado visual.
   "Reproduzir" percorre as linhas como se o código executasse.
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;
  const DATA = MOSS.labContent;

  let moduleIdx = 0;
  let lineIdx = 0;
  let timers = [];
  let liveCart = 0;

  function mod() { return DATA.modules[moduleIdx]; }

  function render() {
    const m = mod();
    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">Aprenda vendo</span>' +
        '<h1>Laboratório Visual do Código</h1>' +
        '<p>Veja o código sendo executado enquanto você usa a loja. Clique em qualquer linha ou nó do diagrama.</p></div>' +
        '<span class="badge badge--accent">🔬 Interativo</span></div>' +

      '<div class="lab-shell">' +
        '<div class="lab-modules" id="lab-modules">' +
          DATA.modules.map(function (x, i) {
            return '<button class="lab-module-btn' + (i===moduleIdx?' is-active':'') + '" data-mod="' + i + '">' + x.icon + ' ' + x.title + '</button>';
          }).join('') +
        '</div>' +

        '<div class="flow"><div class="flow__title">Caminho dos dados — clique em cada etapa</div>' +
          '<div class="flow__path" id="flow-path">' + flowHtml() + '</div>' +
        '</div>' +

        '<div class="lab-body">' +
          '<div class="lab-live">' +
            '<div class="lab-live__title">Loja funcionando <span class="lab-live__badge">AO VIVO</span></div>' +
            '<div id="lab-demo">' + liveHtml() + '</div>' +
          '</div>' +
          '<div class="lab-code">' +
            '<div class="lab-code__title">Código responsável pela ação</div>' +
            '<div class="code-source">📄 ' + u.escapeHtml(m.source) + ' ' + tag() + '</div>' +
            '<ol class="code-lines" id="code-lines">' + linesHtml() + '</ol>' +
            '<dl class="line-info" id="line-info">' + infoHtml() + '</dl>' +
          '</div>' +
        '</div>' +

        '<div class="lab-explain">' +
          '<p class="lab-explain__text" id="explain-text">' + u.escapeHtml(m.intro) + '</p>' +
          '<div class="lab-controls">' +
            '<button class="btn btn--navy btn--sm" id="lab-prev">← Anterior</button>' +
            '<button class="btn btn--primary btn--sm" id="lab-next">Próxima linha →</button>' +
            '<button class="btn btn--outline btn--sm" id="lab-play">▶ Reproduzir tudo</button>' +
            '<button class="btn btn--ghost btn--sm" id="lab-reset">Reiniciar</button>' +
            '<div class="lab-dots" id="lab-dots">' + dotsHtml() + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<div class="note" style="margin-top:1rem">💡 <strong>Código simplificado</strong> significa que o trecho foi reduzido para caber na tela — a ideia é a mesma do código real, mas com menos detalhes. O selo verde indica código original do projeto.</div>' +
    '</div>';
  }

  function tag() {
    const m = mod();
    return m.simplified
      ? '<span class="simplified-tag">⚠ código simplificado</span>'
      : '<span class="simplified-tag real-tag">✓ código real (recortado)</span>';
  }

  function flowHtml() {
    return DATA.diagram.map(function (n, i) {
      return '<div class="flow__node" data-node="' + i + '" role="button" tabindex="0" aria-label="Ver código da etapa ' + n.label + '">' +
        '<span class="flow__icon">' + n.icon + '</span><span class="flow__label">' + u.escapeHtml(n.label) + '</span></div>' +
        (i < DATA.diagram.length - 1 ? '<span class="flow__arrow" aria-hidden="true">→</span>' : '');
    }).join('');
  }

  function linesHtml() {
    return mod().lines.map(function (l, i) {
      return '<li class="code-line' + (i===lineIdx?' is-current':'') + '" data-line="' + i + '">' +
        '<span class="code-line__n">' + (i+1) + '</span>' +
        '<span class="code-line__code">' + highlight(l.code) + '</span></li>';
    }).join('');
  }

  /** Coloração sintática bem simples: strings, comentários, números e palavras-chave. */
  function highlight(code) {
    let s = u.escapeHtml(code);
    s = s.replace(/(\/\/.*)$/g, '<span class="tok-com">$1</span>');
    s = s.replace(/('(?:[^'\\]|\\.)*')/g, '<span class="tok-str">$1</span>');
    s = s.replace(/\b(const|let|function|return|if|else|async|await|new|try|catch|throw|for|of|in)\b/g, '<span class="tok-key">$1</span>');
    s = s.replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="tok-num">$1</span>');
    return s;
  }

  function infoHtml() {
    const l = mod().lines[lineIdx];
    if (!l) return '';
    return '<div class="info-row"><dt>Código</dt><dd><code>' + u.escapeHtml(l.code) + '</code></dd></div>' +
      '<div class="info-row"><dt>Tradução</dt><dd class="line-info__en">' + u.escapeHtml(l.en) + '</dd></div>' +
      '<div class="info-row"><dt>Símbolos</dt><dd>' + u.escapeHtml(l.symbols) + '</dd></div>' +
      '<div class="info-row"><dt>Acontece</dt><dd>' + u.escapeHtml(l.meaning) + '</dd></div>' +
      '<div class="info-row"><dt>Arquivo</dt><dd><code>' + u.escapeHtml(l.file) + '</code> · ' + u.escapeHtml(l.loc) + '</dd></div>' +
      '<div class="info-row"><dt>Resultado</dt><dd><em>→ ' + u.escapeHtml(l.result) + '</em></dd></div>';
  }

  function dotsHtml() {
    return mod().lines.map(function (_, i) {
      return '<span class="' + (i===lineIdx?'is-on':'') + '"></span>';
    }).join('');
  }

  function liveHtml() {
    const m = mod();
    const p = MOSS.catalog.all()[0];
    let html = '';

    if (m.live === 'search') {
      html = '<div class="field"><label for="lab-q">Digite: fone, move, cafe…</label>' +
        '<input id="lab-q" placeholder="Pesquisar…" autocomplete="off"></div>' +
        '<ul id="lab-results" class="spec-list">' + searchResults('') + '</ul>' +
        '<p class="small muted">Resultados atualizados abaixo →</p>';
    } else if (m.live === 'form') {
      html = '<div class="field"><label for="lab-email">E-mail (teste)</label><input id="lab-email" placeholder="cliente@exemplo.com"></div>' +
        '<button class="btn btn--navy btn--sm" id="lab-validate">Validar formulário</button>' +
        '<div id="lab-form-msg" class="small" style="margin-top:.6rem" aria-live="polite"></div>';
    } else if (m.live === 'payment') {
      html = '<p class="small muted">Escolha o resultado do pagamento fictício:</p>' +
        '<div class="row"><button class="btn btn--primary btn--sm" data-lab-pay="aprovado">Aprovado</button>' +
        '<button class="btn btn--danger btn--sm" data-lab-pay="recusado">Recusado</button>' +
        '<button class="btn btn--outline btn--sm" data-lab-pay="pendente">Pendente</button></div>' +
        '<div id="lab-pay-msg" class="small" style="margin-top:.7rem" aria-live="polite"></div>';
    } else if (m.live === 'delivery') {
      html = '<p class="small muted">Clique para avançar o pedido:</p>' +
        '<button class="btn btn--navy btn--sm" id="lab-advance">Avançar estado →</button>' +
        '<div id="lab-delivery-msg" class="small" style="margin-top:.7rem">Estado atual: <strong>Pedido recebido</strong></div>';
    } else {
      html = '<div class="lab-mini-card">' + MOSS.catalog.img(p, '', 0) +
        '<div><div class="lab-mini-card__name">' + u.escapeHtml(p.name) + '</div>' +
        '<div class="lab-mini-card__price">' + u.money(p.price) + '</div></div></div>' +
        '<button class="btn btn--primary btn--block" id="lab-add" style="margin-top:.8rem">Adicionar ao carrinho 🛒</button>' +
        '<div class="lab-mini-cart" id="lab-cart"><span>🛒 Carrinho</span><span class="lab-mini-cart__count">' + liveCart + '</span></div>';
    }
    return html;
  }

  function searchResults(term) {
    const t = u.normalize(term);
    const nomes = ['Fone Bluetooth Moss Wave','Smartphone Moss X5','Cafeteira Moss Brew','Notebook Moss Book Air','Tênis Moss Runner'];
    const list = t ? nomes.filter(function (n) { return u.normalize(n).indexOf(t) >= 0; }) : nomes;
    if (!list.length) return '<li><span class="muted">Nenhum resultado</span></li>';
    return list.map(function (n) { return '<li><span>' + u.escapeHtml(n) + '</span><span class="badge badge--green">✓</span></li>'; }).join('');
  }

  function update() {
    const app = document.getElementById('app');
    app.querySelector('#code-lines').innerHTML = linesHtml();
    app.querySelector('#line-info').innerHTML = infoHtml();
    app.querySelector('#lab-dots').innerHTML = dotsHtml();
    app.querySelector('.code-source').innerHTML = '📄 ' + u.escapeHtml(mod().source) + ' ' + tag();
    app.querySelector('#explain-text').textContent = mod().lines[lineIdx].meaning;
    app.querySelectorAll('.flow__node').forEach(function (n, i) {
      const target = Math.round(i / (DATA.diagram.length - 1) * (mod().lines.length - 1));
      n.classList.toggle('is-active', i === Math.round(lineIdx / (mod().lines.length - 1) * (DATA.diagram.length - 1)));
      n.setAttribute('data-target', target);
    });
    const flowNode = app.querySelectorAll('.flow__node')[Math.round(lineIdx / Math.max(1, mod().lines.length - 1) * (DATA.diagram.length - 1))];
    if (flowNode) {
      flowNode.classList.add('is-pulse');
      setTimeout(function () { flowNode.classList.remove('is-pulse'); }, 700);
    }
  }

  function setLine(i) {
    const len = mod().lines.length;
    lineIdx = Math.max(0, Math.min(len - 1, i));
    update();
  }

  function play() {
    stop();
    setLine(0);
    let i = 0;
    const tick = function () {
      if (i >= mod().lines.length - 1) { MOSS.notify.toast('Fim da execução didática.', 'info', 1600); return; }
      i++;
      setLine(i);
      effectForLine(i);
      timers.push(setTimeout(tick, 950));
    };
    timers.push(setTimeout(tick, 600));
  }

  function stop() { timers.forEach(clearTimeout); timers = []; }

  /** Efeito visual vinculado à linha atual. */
  function effectForLine(i) {
    const m = mod();
    if (m.live === 'addToCart' || (!m.live && m.id === 'cart')) {
      if (i === m.lines.length - 1) {
        liveCart++;
        const cart = document.getElementById('lab-cart');
        if (cart) {
          cart.querySelector('.lab-mini-cart__count').textContent = liveCart;
          cart.classList.remove('bump'); void cart.offsetWidth; cart.classList.add('bump');
        }
        flySpark('#lab-add', '#lab-cart');
      }
    }
  }

  function flySpark(fromSel, toSel) {
    const from = document.querySelector(fromSel), to = document.querySelector(toSel);
    if (!from || !to) return;
    const a = from.getBoundingClientRect(), b = to.getBoundingClientRect();
    const spark = document.createElement('div');
    spark.className = 'lab-spark';
    spark.style.left = (a.left + a.width / 2 - 6) + 'px';
    spark.style.top = (a.top + a.height / 2 - 6) + 'px';
    spark.style.setProperty('--dx', (b.left - a.left) + 'px');
    spark.style.setProperty('--dy', (b.top - a.top) + 'px');
    document.body.appendChild(spark);
    spark.classList.add('is-flying');
    setTimeout(function () { spark.remove(); }, 800);
  }

  function bind() {
    const app = document.getElementById('app');
    if (MOSS.cleanups) MOSS.cleanups.push(cleanup);

    // Os módulos usam delegação no container: o HTML é trocado ao selecionar.
    bindModuleButtons();

    const codeBox = app.querySelector('#code-lines');
    codeBox.addEventListener('click', function (e) {
      const li = e.target.closest('[data-line]');
      if (li) { stop(); setLine(Number(li.getAttribute('data-line'))); }
    });

    app.querySelectorAll('.flow__node').forEach(function (n) {
      function activate() { stop(); setLine(Number(n.getAttribute('data-target'))); }
      n.addEventListener('click', activate);
      n.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); } });
    });

    app.querySelector('#lab-next').addEventListener('click', function () { stop(); setLine(lineIdx + 1); effectForLine(lineIdx); });
    app.querySelector('#lab-prev').addEventListener('click', function () { stop(); setLine(lineIdx - 1); });
    app.querySelector('#lab-play').addEventListener('click', play);
    app.querySelector('#lab-reset').addEventListener('click', function () { stop(); lineIdx = 0; liveCart = 0; app.querySelector('#lab-demo').innerHTML = liveHtml(); update(); bindLive(); });

    bindLive();
    update();
  }

  // Delegação dos módulos (evita perder eventos após trocar o HTML).
  function bindModuleButtons() {
    const container = document.querySelector('#lab-modules');
    if (!container || container.dataset.bound) return;
    container.dataset.bound = '1';
    container.addEventListener('click', function (e) {
      const b = e.target.closest('[data-mod]');
      if (!b) return;
      stop();
      moduleIdx = Number(b.getAttribute('data-mod'));
      lineIdx = 0;
      container.querySelectorAll('[data-mod]').forEach(function (x) { x.classList.toggle('is-active', x === b); });
      document.getElementById('lab-demo').innerHTML = liveHtml();
      update();
      bindLive();
    });
  }

  function bindLive() {
    const app = document.getElementById('app');

    const add = app.querySelector('#lab-add');
    if (add) add.addEventListener('click', function () {
      effectForLine(mod().lines.length - 1);
      if (!mod().live) MOSS.notify.toast('Linha executada: passe para a próxima para ver o resultado.', 'info', 1800);
    });

    const q = app.querySelector('#lab-q');
    if (q) q.addEventListener('input', u.debounce(function (e) {
      app.querySelector('#lab-results').innerHTML = searchResults(e.target.value);
    }, 120));

    const val = app.querySelector('#lab-validate');
    if (val) val.addEventListener('click', function () {
      const email = app.querySelector('#lab-email').value;
      const ok = u.isEmail(email);
      const msg = app.querySelector('#lab-form-msg');
      msg.innerHTML = ok
        ? '<span style="color:var(--green-500)">✓ E-mail válido — o checkout avançaria.</span>'
        : '<span style="color:var(--red-500)">Erro: informe um e-mail válido. Campo marcado como aria-invalid.</span>';
    });

    app.querySelectorAll('[data-lab-pay]').forEach(function (b) {
      b.addEventListener('click', function () {
        const r = b.getAttribute('data-lab-pay');
        const msg = app.querySelector('#lab-pay-msg');
        const map = {
          aprovado:['✓ Pagamento aprovado (simulação). Pedido marcado como pago.','var(--green-500)'],
          recusado:['✕ Pagamento recusado (simulação). Nenhuma cobrança real.','var(--red-500)'],
          pendente:['◌ Pagamento pendente (simulação). Aguardando análise.','var(--accent-600)']
        };
        msg.innerHTML = '<span style="color:' + map[r][1] + '">' + map[r][0] + '</span>';
      });
    });

    const adv = app.querySelector('#lab-advance');
    if (adv) adv.addEventListener('click', function () {
      const seq = ['Pedido recebido','Pagamento confirmado','Preparando encomenda','Pedido despachado','Em transporte','Entregue'];
      const cur = app.querySelector('#lab-delivery-msg');
      const idx = Math.min(seq.length - 1, (cur.dataset.i ? Number(cur.dataset.i) : 0) + 1);
      cur.dataset.i = idx;
      cur.innerHTML = 'Estado atual: <strong>' + seq[idx] + '</strong> · evento registrado no histórico.';
      if (idx === seq.length - 1) adv.disabled = true;
    });
  }

  function cleanup() { stop(); }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.lab = { render:render, bind:bind, cleanup:cleanup };
  MOSS.lab = { cleanup:cleanup };
})(window);
