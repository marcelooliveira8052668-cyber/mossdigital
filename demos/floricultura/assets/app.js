(function () {
  'use strict';

  var flowers = {
      rosa: { name: 'Rosas', cents: 9900, photo: 'rosas' },
      girassol: { name: 'Girassóis', cents: 8900, photo: 'girassois' },
      campo: { name: 'Flores do campo', cents: 7900, photo: 'flores-campo' }
  };
  var sizes = {
    pequeno: { name: 'Pequeno', multiplier: 1 },
    medio: { name: 'Médio', multiplier: 1.5 },
    grande: { name: 'Grande', multiplier: 2 }
  };
  var wrappings = {
    papel: { name: 'Papel natural', cents: 0 },
    tecido: { name: 'Tecido delicado', cents: 1800 },
    caixa: { name: 'Caixa presenteável', cents: 3200 }
  };
  var currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  var form = document.getElementById('bouquet-form');
  var ack = document.getElementById('demo-ack');
  var status = document.getElementById('builder-status');
  var cards = Array.from(document.querySelectorAll('.product'));
  var filterForm = document.getElementById('filters');
  var occasion = document.getElementById('occasion');
  var budget = document.getElementById('budget');

  function money(cents) { return currency.format(cents / 100); }
  function setText(id, text) { document.getElementById(id).textContent = text; }
  function estimate(flower, size, wrapping) {
    var base = Math.round(flowers[flower].cents * sizes[size].multiplier);
    return { base: base, wrapping: wrappings[wrapping].cents, total: base + wrappings[wrapping].cents };
  }
  function state() {
    return {
      flower: form.querySelector('[name="flower"]:checked').value,
      size: form.querySelector('[name="size"]:checked').value,
      wrapping: document.getElementById('wrapping').value,
      message: document.getElementById('card-message').value.slice(0, 160),
      receiving: document.getElementById('receiving').value
    };
  }
  function render() {
    var choice = state();
    var price = estimate(choice.flower, choice.size, choice.wrapping);
    setText('flowers-summary', flowers[choice.flower].name + ' · ' + sizes[choice.size].name);
    setText('flowers-price', money(price.base));
    setText('wrapping-summary', wrappings[choice.wrapping].name);
    setText('wrapping-price', price.wrapping ? money(price.wrapping) : 'Incluído');
    setText('bouquet-total', money(price.total));
    setText('receiving-summary', choice.receiving === 'entrega' ? 'Frete sob consulta' : 'Retirada simulada');
    setText('delivery-note', choice.receiving === 'entrega'
      ? 'Região, prazo e frete dependeriam de confirmação da loja. Nenhuma entrega é realizada por esta demo.'
      : 'Não há endereço de retirada real nesta demonstração. Nenhuma data é reservada.');
    document.getElementById('preview-flower').src = '../../assets/img/demo-photos/' + flowers[choice.flower].photo + '.webp';
    document.getElementById('preview-flower').alt = flowers[choice.flower].name + ' · fotografia de referência, não reproduz exatamente a montagem';
    document.getElementById('bouquet-preview').dataset.wrap = choice.wrapping;
    setText('wrap-badge', wrappings[choice.wrapping].name);
    setText('preview-caption', flowers[choice.flower].name + ' · ' + sizes[choice.size].name + ' · ' + wrappings[choice.wrapping].name);
    setText('card-preview', choice.message.trim() || 'Seu carinho também pode virar palavras.');
    setText('message-count', String(choice.message.length));
    ack.checked = false;
    status.textContent = '';
  }
  function summary() {
    var choice = state();
    var price = estimate(choice.flower, choice.size, choice.wrapping);
    return [
      'DEMONSTRAÇÃO MOSS DIGITAL — FLORA & AFETO',
      'Composição fictícia. Não é um pedido de flores, reserva ou pagamento.',
      '',
      'Flores: ' + flowers[choice.flower].name,
      'Tamanho: ' + sizes[choice.size].name,
      'Flores e tamanho: ' + money(price.base),
      'Embalagem: ' + wrappings[choice.wrapping].name + ' (' + (price.wrapping ? money(price.wrapping) : 'incluída') + ')',
      'Cartão: ' + (choice.message.trim() || 'Sem mensagem'),
      'Recebimento: ' + (choice.receiving === 'entrega' ? 'Entrega — região, prazo e frete sob consulta.' : 'Retirada simulada — sem endereço real.'),
      'Subtotal ilustrativo: ' + money(price.total) + ' — frete não incluído.',
      '',
      'Marcas, produtos e valores fictícios. Fotografias ilustrativas de banco de imagens.',
      'Quero conhecer este modelo de site com a MOSS Digital, não comprar flores.'
    ].join('\n');
  }
  function download() {
    var blob = new Blob([summary()], { type: 'text/plain;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.href = url;
    link.download = 'flora-afeto-composicao-demo.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }
  function filterProducts() {
    var ceiling = Number(budget.value) * 100;
    var count = 0;
    cards.forEach(function (card) {
      var price = estimate(card.dataset.flower, card.dataset.size, card.dataset.wrap).total;
      var show = (occasion.value === 'todas' || card.dataset.occasion === occasion.value) && (!ceiling || price <= ceiling);
      card.hidden = !show;
      if (show) count++;
    });
    setText('filter-count', count + (count === 1 ? ' buquê encontrado' : ' buquês encontrados'));
    document.getElementById('empty-products').hidden = count !== 0;
  }

  form.addEventListener('submit', function (event) { event.preventDefault(); });
  filterForm.addEventListener('submit', function (event) { event.preventDefault(); });
  document.getElementById('builder-controls').addEventListener('input', render);
  document.getElementById('builder-controls').addEventListener('change', render);
  occasion.addEventListener('change', filterProducts);
  budget.addEventListener('change', filterProducts);
  filterForm.addEventListener('reset', function () { window.setTimeout(filterProducts, 0); });
  document.getElementById('clear-empty').addEventListener('click', function () {
    filterForm.reset();
    occasion.focus();
  });
  cards.forEach(function (card) {
    var price = estimate(card.dataset.flower, card.dataset.size, card.dataset.wrap);
    card.querySelector('[data-card-price]').textContent = money(price.total);
    var button = card.querySelector('.choose-product');
    button.disabled = false;
    button.setAttribute('aria-label', 'Personalizar ' + card.querySelector('h3').textContent);
    button.addEventListener('click', function () {
      form.querySelector('[name="flower"][value="' + card.dataset.flower + '"]').checked = true;
      form.querySelector('[name="size"][value="' + card.dataset.size + '"]').checked = true;
      document.getElementById('wrapping').value = card.dataset.wrap;
      render();
      document.getElementById('montador').scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
      form.querySelector('[name="flower"]:checked').focus({ preventScroll: true });
      status.textContent = 'Composição de referência carregada. Você pode personalizar as escolhas.';
    });
  });
  document.getElementById('copy-summary').addEventListener('click', async function () {
    try {
      await navigator.clipboard.writeText(summary());
      status.textContent = 'Composição demonstrativa copiada. Nenhum pedido foi enviado.';
    } catch (error) {
      download();
      status.textContent = 'A cópia não foi permitida. O resumo foi preparado para baixar como arquivo de texto.';
    }
  });
  document.getElementById('download-summary').addEventListener('click', function () {
    download();
    status.textContent = 'Resumo demonstrativo preparado para baixar. Nenhum pedido foi enviado.';
  });
  document.getElementById('contact-moss').addEventListener('click', function () {
    if (!ack.checked) {
      status.textContent = 'Confirme que entendeu a demonstração antes de abrir a conversa com a MOSS Digital.';
      ack.focus();
      return;
    }
    var opened = window.open('https://wa.me/5511942038103?text=' + encodeURIComponent(summary()), '_blank', 'noopener,noreferrer');
    if (opened) opened.opener = null;
    status.textContent = 'A conversa é com a MOSS Digital sobre este modelo. A mensagem só será enviada se você confirmar no WhatsApp.';
  });
  document.getElementById('reset-bouquet').addEventListener('click', function () {
    form.reset();
    render();
    status.textContent = 'Composição reiniciada.';
    form.querySelector('[name="flower"]:checked').focus({ preventScroll: true });
  });

  ['filter-controls', 'builder-controls', 'share-controls'].forEach(function (id) {
    document.getElementById(id).disabled = false;
  });
  render();
  filterProducts();
}());
