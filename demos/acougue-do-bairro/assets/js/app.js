/* Açougue do Bairro — interatividade da demonstração.
   Tudo acontece neste navegador: nenhum pedido é enviado a servidor. */
(function () {
  'use strict';

  var produtos = window.PRODUTOS || [];
  var categorias = ['Todos', 'Bovinos', 'Suínos', 'Aves', 'Linguiças', 'Peixes'];
  var estado = { categoria: 'Todos', busca: '', carrinho: [] };
  var CHAVE_LOCAL = 'acougue-do-bairro-pedidos';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (v) { return 'R$ ' + v.toFixed(2).replace('.', ','); };

  /* ---------- Catálogo ---------- */
  function produtosFiltrados() {
    var q = estado.busca.trim().toLowerCase();
    return produtos.filter(function (p) {
      var okCat = estado.categoria === 'Todos' || p.categoria === estado.categoria;
      var okBusca = !q || (p.nome + ' ' + p.desc + ' ' + p.categoria).toLowerCase().indexOf(q) !== -1;
      return okCat && okBusca;
    });
  }

  function renderCategorias() {
    var box = $('#filtros-lista');
    if (!box) return;
    box.innerHTML = categorias.map(function (c) {
      var n = c === 'Todos' ? produtos.length : produtos.filter(function (p) { return p.categoria === c; }).length;
      return '<button type="button" class="cat-btn' + (estado.categoria === c ? ' ativo' : '') +
        '" data-cat="' + c + '" aria-pressed="' + (estado.categoria === c) + '">' +
        c + '<span>' + n + '</span></button>';
    }).join('');
    $$('.cat-btn', box).forEach(function (b) {
      b.addEventListener('click', function () {
        estado.categoria = b.getAttribute('data-cat');
        renderCategorias();
        renderProdutos();
      });
    });
  }

  function renderProdutos() {
    var grid = $('#produtos');
    if (!grid) return;
    var lista = produtosFiltrados();
    $('#contador').textContent = lista.length + (lista.length === 1 ? ' corte' : ' cortes');
    if (!lista.length) {
      grid.innerHTML = '<div class="vazio">Nenhum corte encontrado. Tente outro termo ou categoria.</div>';
      return;
    }
    grid.innerHTML = lista.map(function (p) {
      return '<article class="card">' +
        '<div class="card-midia"><img class="card-img" src="assets/img/' + p.img + '" alt="' + p.nome + '">' +
        (p.selo ? '<span class="card-selo">' + p.selo + '</span>' : '') +
        '<span class="card-lupa">🔍 ver detalhes</span></div>' +
        '<div class="card-body">' +
        '<span class="card-cat">' + p.categoria + '</span>' +
        '<h3>' + p.nome + '</h3>' +
        '<p>' + p.desc + '</p>' +
        '<div class="card-preco"><b>' + money(p.preco) + '</b><small>/ kg</small></div>' +
        '<button type="button" class="card-add" data-add="' + p.id + '">+ Adicionar 0,5 kg</button>' +
        '</div>' +
        '<button type="button" class="card-click" data-ver="' + p.id + '" aria-label="Ver detalhes de ' + p.nome + '"></button>' +
        '</article>';
    }).join('');
    $$('[data-add]', grid).forEach(function (b) {
      b.addEventListener('click', function () {
        adicionar(b.getAttribute('data-add'), 0.5);
        abrirCarrinho();
      });
    });
    $$('[data-ver]', grid).forEach(function (b) {
      b.addEventListener('click', function () { abrirFicha(b.getAttribute('data-ver')); });
    });
  }

  /* ---------- Ficha do corte ---------- */
  var RENDIMENTO = {
    Bovinos: '1 kg serve cerca de 3 a 4 pessoas',
    Suínos: '1 kg serve cerca de 3 a 4 pessoas',
    Aves: '1 kg serve cerca de 4 a 5 pessoas',
    Linguiças: '1 kg serve cerca de 4 a 5 pessoas',
    Peixes: '1 kg serve cerca de 3 a 4 pessoas'
  };
  var ultimoFoco = null;
  var fichaAtual = null;

  function abrirFicha(id) {
    var p = produtos.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    fichaAtual = p;
    $('#modal-foto').src = 'assets/img/' + p.img;
    $('#modal-foto').alt = p.nome;
    $('#modal-cat').textContent = p.categoria;
    $('#modal-titulo').textContent = p.nome;
    $('#modal-preco').textContent = money(p.preco);
    $('#modal-desc').textContent = p.desc;
    $('#modal-uso').textContent = p.uso || 'Uso geral';
    $('#modal-dica').textContent = p.dica || 'Tempero a gosto e cozinhe no ponto desejado.';
    $('#modal-rend').textContent = RENDIMENTO[p.categoria] || 'Cerca de 3 a 4 porções por quilo';
    $('#modal-kg').value = 1;
    atualizarFicha();
    ultimoFoco = document.activeElement;
    $('#modal-overlay').classList.add('aberto');
    $('#modal-overlay').setAttribute('aria-hidden', 'false');
    $('#modal-fechar').focus();
  }

  function fecharFicha() {
    $('#modal-overlay').classList.remove('aberto');
    $('#modal-overlay').setAttribute('aria-hidden', 'true');
    fichaAtual = null;
    if (ultimoFoco && ultimoFoco.focus) ultimoFoco.focus();
  }

  function atualizarFicha() {
    if (!fichaAtual) return;
    var kg = parseFloat($('#modal-kg').value) || 0;
    $('#modal-kg-label').textContent = kg.toFixed(1).replace('.', ',') + ' kg';
    $('#modal-total').textContent = money(fichaAtual.preco * kg);
  }

  /* ---------- Calculadora ---------- */
  function initCalculadora() {
    var sel = $('#calc-produto'), slider = $('#calc-kg'), num = $('#calc-num'), total = $('#calc-total');
    if (!sel) return;
    sel.innerHTML = produtos.map(function (p) {
      return '<option value="' + p.id + '">' + p.nome + ' — ' + money(p.preco) + '/kg</option>';
    }).join('');
    function atualizar() {
      var p = produtos.filter(function (x) { return x.id === sel.value; })[0];
      var kg = parseFloat(slider.value) || 0;
      num.value = kg.toFixed(1).replace('.', ',');
      if (p) total.textContent = money(p.preco * kg);
    }
    slider.addEventListener('input', atualizar);
    num.addEventListener('change', function () {
      var v = parseFloat(num.value.replace(',', '.'));
      if (!isNaN(v)) slider.value = Math.min(10, Math.max(0.2, v));
      atualizar();
    });
    sel.addEventListener('change', atualizar);
    $('#calc-add').addEventListener('click', function () {
      adicionar(sel.value, parseFloat(slider.value) || 0.5);
      abrirCarrinho();
    });
    atualizar();
  }

  /* ---------- Carrinho ---------- */
  function adicionar(id, kg) {
    var p = produtos.filter(function (x) { return x.id === id; })[0];
    if (!p || !kg || kg <= 0) return;
    var atual = estado.carrinho.filter(function (i) { return i.id === id; })[0];
    if (atual) atual.kg = Math.round((atual.kg + kg) * 100) / 100;
    else estado.carrinho.push({ id: id, kg: Math.round(kg * 100) / 100 });
    renderCarrinho();
  }

  function totalCarrinho() {
    return estado.carrinho.reduce(function (s, i) {
      var p = produtos.filter(function (x) { return x.id === i.id; })[0];
      return s + (p ? p.preco * i.kg : 0);
    }, 0);
  }
  function qtdItens() {
    return estado.carrinho.reduce(function (s, i) { return s + (i.kg > 0 ? 1 : 0); }, 0);
  }

  function renderCarrinho() {
    var box = $('#carrinho-itens'), gaveta = $('#gaveta-itens');
    $('#badge-carrinho').textContent = qtdItens();
    var html;
    if (!estado.carrinho.length) {
      html = '<div class="carrinho-vazio">Seu balcão está vazio.<br>Escolha os cortes e adicione aqui.</div>';
      if (box) box.innerHTML = html;
      if (gaveta) gaveta.innerHTML = html;
      if ($('#total-carrinho')) $('#total-carrinho').textContent = money(0);
      if ($('#gaveta-total')) $('#gaveta-total').textContent = money(0);
      return;
    }
    html = estado.carrinho.map(function (i) {
      var p = produtos.filter(function (x) { return x.id === i.id; })[0];
      return '<div class="item">' +
        '<img src="assets/img/' + p.img + '" alt="">' +
        '<div><b>' + p.nome + '</b><small>' + money(p.preco) + ' / kg</small>' +
        '<div class="quant">' +
        '<button type="button" data-menor="' + p.id + '" aria-label="Diminuir quantidade de ' + p.nome + '">−</button>' +
        '<span>' + i.kg.toFixed(1).replace('.', ',') + ' kg</span>' +
        '<button type="button" data-maior="' + p.id + '" aria-label="Aumentar quantidade de ' + p.nome + '">+</button>' +
        '</div></div>' +
        '<button type="button" class="item-remover" data-remover="' + p.id + '">remover</button>' +
        '</div>';
    }).join('');
    if (box) box.innerHTML = html;
    if (gaveta) gaveta.innerHTML = html;
    if ($('#total-carrinho')) $('#total-carrinho').textContent = money(totalCarrinho());
    if ($('#gaveta-total')) $('#gaveta-total').textContent = money(totalCarrinho());

    [box, gaveta].forEach(function (raiz) {
      if (!raiz) return;
      $$('[data-maior]', raiz).forEach(function (b) {
        b.addEventListener('click', function () { mudarKg(b.getAttribute('data-maior'), 0.5); });
      });
      $$('[data-menor]', raiz).forEach(function (b) {
        b.addEventListener('click', function () { mudarKg(b.getAttribute('data-menor'), -0.5); });
      });
      $$('[data-remover]', raiz).forEach(function (b) {
        b.addEventListener('click', function () {
          var id = b.getAttribute('data-remover');
          estado.carrinho = estado.carrinho.filter(function (i) { return i.id !== id; });
          renderCarrinho();
        });
      });
    });
  }

  function mudarKg(id, delta) {
    estado.carrinho.forEach(function (i) {
      if (i.id === id) i.kg = Math.round((i.kg + delta) * 100) / 100;
    });
    estado.carrinho = estado.carrinho.filter(function (i) { return i.kg > 0; });
    renderCarrinho();
  }

  function abrirCarrinho() {
    $('#overlay').classList.add('aberto');
    $('#gaveta').classList.add('aberto');
    $('#gaveta').setAttribute('aria-hidden', 'false');
    $('#fechar-carrinho').focus();
  }
  function fecharCarrinho() {
    $('#overlay').classList.remove('aberto');
    $('#gaveta').classList.remove('aberto');
    $('#gaveta').setAttribute('aria-hidden', 'true');
  }

  /* ---------- Encomenda (somente local) ---------- */
  function initForm() {
    var f = $('#form-encomenda');
    if (!f) return;
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var erro = $('#erro-form');
      if (!estado.carrinho.length) { erro.textContent = 'Adicione pelo menos um corte antes de encomendar.'; return; }
      if (!f.checkValidity()) { erro.textContent = 'Preencha os campos obrigatórios.'; f.reportValidity(); return; }
      erro.textContent = '';
      var codigo = 'AC-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
      var pedido = {
        codigo: codigo,
        nome: $('#enc-nome').value,
        telefone: $('#enc-tel').value,
        retirada: $('#enc-tipo').value,
        quando: $('#enc-data').value + ' ' + $('#enc-hora').value,
        itens: estado.carrinho.slice(),
        total: totalCarrinho()
      };
      try {
        var salvos = JSON.parse(localStorage.getItem(CHAVE_LOCAL) || '[]');
        salvos.push(pedido);
        localStorage.setItem(CHAVE_LOCAL, JSON.stringify(salvos));
      } catch (e) { /* navegador sem permissão: segue sem salvar */ }
      $('#ok-codigo').textContent = codigo;
      $('#ok-resumo').textContent = pedido.nome + ' · ' + qtdItens() + ' itens · ' + money(pedido.total);
      $('#ok-encomenda').style.display = 'block';
      estado.carrinho = [];
      renderCarrinho();
      f.reset();
      $('#ok-encomenda').scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
    $('#enc-data').min = new Date().toISOString().slice(0, 10);
  }

  /* ---------- Galeria, menu e carrinho flutuante ---------- */
  function initUI() {
    var galeria = $('#galeria');
    if (galeria) {
      $$('[data-galeria]').forEach(function (b) {
        b.addEventListener('click', function () {
          galeria.scrollBy({ left: Number(b.getAttribute('data-galeria')) * 280, behavior: 'smooth' });
        });
      });
    }
    var btn = $('#btn-menu'), menu = $('#menu-mobile');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        var aberto = menu.classList.toggle('aberto');
        btn.setAttribute('aria-expanded', String(aberto));
        btn.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
      });
      $$('a', menu).forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('aberto');
          btn.setAttribute('aria-expanded', 'false');
        });
      });
    }
    $('#abrir-carrinho').addEventListener('click', abrirCarrinho);
    $('#fechar-carrinho').addEventListener('click', fecharCarrinho);
    $('#overlay').addEventListener('click', fecharCarrinho);

    $('#modal-fechar').addEventListener('click', fecharFicha);
    $('#modal-fechar-2').addEventListener('click', fecharFicha);
    $('#modal-overlay').addEventListener('click', function (e) {
      if (e.target === $('#modal-overlay')) fecharFicha();
    });
    $('#modal-kg').addEventListener('input', atualizarFicha);
    $('#modal-add').addEventListener('click', function () {
      if (!fichaAtual) return;
      var kg = parseFloat($('#modal-kg').value) || 0.5;
      adicionar(fichaAtual.id, kg);
      fecharFicha();
      abrirCarrinho();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if ($('#modal-overlay').classList.contains('aberto')) fecharFicha();
      else fecharCarrinho();
    });
    var busca = $('#busca');
    if (busca) busca.addEventListener('input', function () {
      estado.busca = busca.value;
      renderProdutos();
    });
  }

  /* ---------- Início ---------- */
  renderCategorias();
  renderProdutos();
  initCalculadora();
  renderCarrinho();
  initForm();
  initUI();
})();
