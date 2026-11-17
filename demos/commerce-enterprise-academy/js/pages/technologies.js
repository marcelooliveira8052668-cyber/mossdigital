/* ============================================================
   technologies.js — "Por dentro de uma operação de e-commerce"
   ------------------------------------------------------------
   Cartões por tecnologia + painel de custos e calculadora.
   Nenhum preço atual é inventado: onde não há valor confirmado,
   mostramos "Consultar fornecedor".
   ============================================================ */
(function (global) {
  'use strict';
  const MOSS = global.MOSS;
  const u = MOSS.utils;

  const calc = { dev:0, hosting:0, gatewayPct:0, orders:100, ticket:200 };

  function render() {
    const T = MOSS.technologies;
    return '<div class="page">' +
      '<div class="page-head"><div><span class="eyebrow">Didático</span><h1>Por dentro de uma operação de comércio eletrônico</h1>' +
        '<p>Uma loja envolve muitas camadas. Cada ferramenta abaixo é uma <strong>alternativa</strong> para um cenário — nenhuma empresa precisa contratar todas.</p></div></div>' +

      '<div class="filter-bar" id="tech-filters">' +
        '<button class="chip is-active" data-group="all">Todas</button>' +
        T.groups.map(function (g) { return '<button class="chip" data-group="' + g.id + '">' + g.name + '</button>'; }).join('') +
      '</div>' +

      '<div id="tech-grid" class="grid grid--auto">' + cards(T.all) + '</div>' +

      '<section class="section section--tight">' +
        '<div class="card card--pad" style="background:linear-gradient(135deg,var(--navy-900),var(--navy-700));color:#fff;border:0">' +
          '<span class="eyebrow" style="color:var(--accent-500)">Arquitetura de pagamentos reais — apenas didático</span>' +
          '<h2 style="color:#fff">Como seria uma integração futura</h2>' +
          '<p style="color:#cbd9ee;max-width:75ch">Este projeto <strong>não cria cobranças reais</strong>. Para integrar Mercado Pago, Stripe, Pagar.me ou Adyen no futuro, é necessário um <strong>backend seguro</strong>: é lá que ficam as credenciais secretas, a criação da cobrança e a verificação de webhooks.</p>' +
          '<div class="flow__path" style="min-width:0;flex-wrap:wrap;margin:1.2rem 0">' +
            ['Cliente','Front-end','Backend seguro','Gateway','Webhook','Banco de dados','Status na loja'].map(function (s, i, a) {
              return '<div class="flow__node" style="flex:0 0 auto;min-width:100px;cursor:default"><span class="flow__label">' + s + '</span></div>' +
                (i < a.length - 1 ? '<span class="flow__arrow">→</span>' : '');
            }).join('') +
          '</div>' +
          '<div class="grid grid--3">' +
            '<div><h4>1 · Criar cobrança</h4><p class="small" style="color:#cbd9ee">O front-end pede ao backend; o backend chama o gateway com a chave secreta. Nunca exponha essa chave no navegador.</p></div>' +
            '<div><h4>2 · Confirmar webhook</h4><p class="small" style="color:#cbd9ee">O gateway avisa o backend que o pagamento foi aprovado. O backend valida a assinatura antes de confiar no evento.</p></div>' +
            '<div><h4>3 · Atualizar pedido</h4><p class="small" style="color:#cbd9ee">Somente após a confirmação segura o status muda para "pago" no banco e aparece para o cliente.</p></div>' +
          '</div>' +
          '<div class="note note--danger" style="color:var(--text)">🚫 Nenhuma chave secreta aparece neste projeto. Nenhum webhook é acionado. Nenhum valor é cobrado.</div>' +
        '</div>' +
      '</section>' +

      '<section class="section section--tight">' +
        '<div class="page-head"><div><span class="eyebrow">Planejamento</span><h2>Painel de custos comerciais</h2>' +
          '<p>Valores de referência não são exibidos porque variam por fornecedor e contrato. Onde não há valor confirmado: <strong>Consultar fornecedor</strong>.</p></div></div>' +
        '<div class="grid grid--2">' +
          '<div class="card"><div class="card__head"><h3>Itens de custo</h3></div><div class="card__body">' +
            '<div class="table-wrap"><table class="data"><thead><tr><th>Item</th><th>Valor</th><th>Observação</th></tr></thead><tbody>' +
              T.costs.map(function (c) {
                return '<tr><td>' + u.escapeHtml(c.item) + '</td><td><strong>' + u.escapeHtml(c.value) + '</strong></td><td class="small muted">' + u.escapeHtml(c.note) + '</td></tr>';
              }).join('') +
            '</tbody></table></div>' +
          '</div></div>' +
          '<div class="card"><div class="card__head"><h3>Calculadora de custos (simulação)</h3></div><div class="card__body">' +
            '<p class="small muted">Preencha valores hipotéticos fornecidos por você. Nada aqui é uma cotação real.</p>' +
            '<div class="cost-grid">' +
              numField('dev','Desenvolvimento (R$)',calc.dev) +
              numField('hosting','Hospedagem mensal (R$)',calc.hosting) +
              numField('gatewayPct','Tarifa do gateway (%)',calc.gatewayPct) +
              numField('orders','Pedidos/mês',calc.orders) +
              numField('ticket','Ticket médio (R$)',calc.ticket) +
            '</div>' +
            '<div id="cost-result">' + costResult() + '</div>' +
          '</div></div>' +
        '</div>' +
      '</section>' +
    '</div>';
  }

  function numField(key, label, val) {
    return '<div class="field"><label for="c-' + key + '">' + label + '</label>' +
      '<input type="number" min="0" id="c-' + key + '" value="' + val + '"></div>';
  }

  function cards(list) {
    return list.map(function (t) {
      return '<article class="card tech-card" data-tech="' + t.group + '">' +
        '<div class="tech-card__top"><span class="tech-card__logo" style="background:' + t.color + '">' + u.escapeHtml(t.name.slice(0,2).toUpperCase()) + '</span>' +
          '<div><div class="tech-card__name">' + u.escapeHtml(t.name) + '</div>' +
          '<span class="badge" style="background:' + t.color + '22;color:' + t.color + '">' + u.escapeHtml(t.groupName) + '</span></div></div>' +
        '<dl>' +
          '<dt>Finalidade</dt><dd>' + u.escapeHtml(t.purpose) + '</dd>' +
          '<dt>Aplicação prática</dt><dd>' + u.escapeHtml(t.usage) + '</dd>' +
          '<dt>Quando vale a pena</dt><dd>' + u.escapeHtml(t.when) + '</dd>' +
        '</dl>' +
        '<a class="tech-card__link" href="' + t.docs + '" target="_blank" rel="noopener">Documentação oficial ↗</a>' +
      '</article>';
    }).join('');
  }

  function costResult() {
    const g = calc.gatewayPct / 100 * calc.orders * calc.ticket;
    const total = Number(calc.dev) + Number(calc.hosting) + g;
    return '<div class="card card--pad" style="background:var(--surface-2)">' +
      '<div class="summary-row"><span>Desenvolvimento (informado)</span><span>' + u.money(calc.dev) + '</span></div>' +
      '<div class="summary-row"><span>Hospedagem mensal (informada)</span><span>' + u.money(calc.hosting) + '</span></div>' +
      '<div class="summary-row"><span>Tarifa estimada do gateway</span><span>' + u.money(u.round2(g)) + '</span></div>' +
      '<div class="summary-row summary-row--total"><span>Total estimado</span><span>' + u.money(u.round2(total)) + '</span></div>' +
      '<p class="tiny muted">Cálculo feito no navegador com valores informados por você. Não é uma proposta comercial.</p>' +
    '</div>';
  }

  function bind() {
    const app = document.getElementById('app');

    app.querySelectorAll('[data-group]').forEach(function (b) {
      b.addEventListener('click', function () {
        const g = b.getAttribute('data-group');
        app.querySelectorAll('[data-group]').forEach(function (x) { x.classList.remove('is-active'); });
        b.classList.add('is-active');
        const list = g === 'all' ? MOSS.technologies.all : MOSS.technologies.all.filter(function (t) { return t.group === g; });
        app.querySelector('#tech-grid').innerHTML = cards(list);
      });
    });

    ['dev','hosting','gatewayPct','orders','ticket'].forEach(function (k) {
      const inp = app.querySelector('#c-' + k);
      if (inp) inp.addEventListener('input', function () {
        calc[k] = Number(inp.value) || 0;
        app.querySelector('#cost-result').innerHTML = costResult();
      });
    });
  }

  MOSS.pages = MOSS.pages || {};
  MOSS.pages.technologies = { render:render, bind:bind };
})(window);
