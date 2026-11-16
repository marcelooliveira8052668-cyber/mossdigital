/* VidaFarma — interatividade da demonstração.
   Tudo fica neste navegador: nenhum pedido é enviado a servidor. */
(function () {
  'use strict';

  var produtos = window.PRODUTOS || [];
  var categorias = ['Todos','Dor e febre','Vitaminas','Primeiros socorros','Higiene e cuidados','Bebê e mamãe','Bem-estar'];
  var estado = { categoria: 'Todos', busca: '', carrinho: [] };
  var CHAVE_PEDIDOS = 'vidafarma-pedidos';
  var CHAVE_LEMBRETES = 'vidafarma-lembretes';

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function (v) { return 'R$ ' + v.toFixed(2).replace('.', ','); };
  var semAcento = function (s) {
    return (s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  /* ---------- Catálogo ---------- */
  function filtrados() {
    var q = semAcento(estado.busca.trim());
    return produtos.filter(function (p) {
      var okCat = estado.categoria === 'Todos' || p.categoria === estado.categoria;
      var texto = semAcento(p.nome + ' ' + p.desc + ' ' + p.categoria);
      var okBusca = !q || texto.indexOf(q) !== -1;
      return okCat && okBusca;
    });
  }

  function renderCategorias() {
    var box = $('#filtros-lista');
    if (!box) return;
    box.innerHTML = categorias.map(function (c) {
      var n = c === 'Todos' ? produtos.length : produtos.filter(function (p) { return p.categoria === c; }).length;
      return '<button type="button" class="cat-btn' + (estado.categoria === c ? ' ativo' : '') +
        '" data-cat="' + c + '" aria-pressed="' + (estado.categoria === c) + '">' + c + '<span>' + n + '</span></button>';
    }).join('');
    $$('.cat-btn', box).forEach(function (b) {
      b.addEventListener('click', function () {
        estado.categoria = b.getAttribute('data-cat');
        renderCategorias(); renderProdutos();
      });
    });
  }

  function renderProdutos() {
    var grid = $('#produtos');
    if (!grid) return;
    var lista = filtrados();
    $('#contador').textContent = lista.length + (lista.length === 1 ? ' produto' : ' produtos');
    if (!lista.length) {
      grid.innerHTML = '<div class="vazio">Nenhum produto encontrado. Tente outra busca ou categoria.</div>';
      return;
    }
    grid.innerHTML = lista.map(function (p) {
      return '<article class="card">' +
        '<img class="card-img" src="assets/img/' + p.img + '" alt="' + p.nome + '">' +
        (p.selo ? '<span class="card-selo">' + p.selo + '</span>' : '') +
        '<span class="card-lupa">🔍 ver ficha</span>' +
        '<div class="card-body">' +
        '<span class="card-cat">' + p.categoria + '</span>' +
        '<h3>' + p.nome + '</h3>' +
        '<p>' + p.desc + '</p>' +
        '<div class="card-preco"><b>' + money(p.preco) + '</b><small>/ un.</small></div>' +
        '<button type="button" class="card-add" data-add="' + p.id + '">+ Adicionar à encomenda</button>' +
        '</div>' +
        '<button type="button" class="card-click" data-ver="' + p.id + '" aria-label="Ver ficha de ' + p.nome + '"></button>' +
        '</article>';
    }).join('');
    $$('[data-add]', grid).forEach(function (b) {
      b.addEventListener('click', function () { adicionar(b.getAttribute('data-add'), 1); abrirCarrinho(); });
    });
    $$('[data-ver]', grid).forEach(function (b) {
      b.addEventListener('click', function () { abrirFicha(b.getAttribute('data-ver')); });
    });
  }

  /* ---------- Ficha ---------- */
  var ultimoFoco = null, fichaAtual = null;
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
    $('#modal-apresentacao').textContent = p.apresentacao || 'Conforme embalagem';
    $('#modal-cuidado').textContent = p.cuidado || 'Leia a bula e siga a orientação do farmacêutico.';
    $('#modal-qtd').value = 1;
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
    var q = parseInt($('#modal-qtd').value, 10) || 1;
    $('#modal-qtd-label').textContent = q + (q === 1 ? ' unidade' : ' unidades');
    $('#modal-total').textContent = money(fichaAtual.preco * q);
  }

  /* ---------- Carrinho ---------- */
  function adicionar(id, qtd) {
    var p = produtos.filter(function (x) { return x.id === id; })[0];
    if (!p || !qtd || qtd <= 0) return;
    var atual = estado.carrinho.filter(function (i) { return i.id === id; })[0];
    if (atual) atual.qtd += qtd;
    else estado.carrinho.push({ id: id, qtd: qtd });
    renderCarrinho();
  }
  function totalCarrinho() {
    return estado.carrinho.reduce(function (s, i) {
      var p = produtos.filter(function (x) { return x.id === i.id; })[0];
      return s + (p ? p.preco * i.qtd : 0);
    }, 0);
  }
  function qtdItens() { return estado.carrinho.reduce(function (s, i) { return s + i.qtd; }, 0); }

  function renderCarrinho() {
    var box = $('#carrinho-itens'), gav = $('#gaveta-itens');
    $('#badge-carrinho').textContent = qtdItens();
    var html;
    if (!estado.carrinho.length) {
      html = '<div class="carrinho-vazio">Sua sacola está vazia.<br>Escolha os produtos e adicione aqui.</div>';
      if (box) box.innerHTML = html;
      if (gav) gav.innerHTML = html;
      if ($('#total-carrinho')) $('#total-carrinho').textContent = money(0);
      if ($('#gaveta-total')) $('#gaveta-total').textContent = money(0);
      return;
    }
    html = estado.carrinho.map(function (i) {
      var p = produtos.filter(function (x) { return x.id === i.id; })[0];
      return '<div class="item">' +
        '<img src="assets/img/' + p.img + '" alt="">' +
        '<div><b>' + p.nome + '</b><small>' + money(p.preco) + ' / un.</small>' +
        '<div class="quant">' +
        '<button type="button" data-menor="' + p.id + '" aria-label="Diminuir ' + p.nome + '">−</button>' +
        '<span>' + i.qtd + ' un.</span>' +
        '<button type="button" data-maior="' + p.id + '" aria-label="Aumentar ' + p.nome + '">+</button>' +
        '</div></div>' +
        '<button type="button" class="item-remover" data-remover="' + p.id + '">remover</button>' +
        '</div>';
    }).join('');
    if (box) box.innerHTML = html;
    if (gav) gav.innerHTML = html;
    if ($('#total-carrinho')) $('#total-carrinho').textContent = money(totalCarrinho());
    if ($('#gaveta-total')) $('#gaveta-total').textContent = money(totalCarrinho());
    [box, gav].forEach(function (raiz) {
      if (!raiz) return;
      $$('[data-maior]', raiz).forEach(function (b) {
        b.addEventListener('click', function () { mudarQtd(b.getAttribute('data-maior'), 1); });
      });
      $$('[data-menor]', raiz).forEach(function (b) {
        b.addEventListener('click', function () { mudarQtd(b.getAttribute('data-menor'), -1); });
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
  function mudarQtd(id, delta) {
    estado.carrinho.forEach(function (i) { if (i.id === id) i.qtd += delta; });
    estado.carrinho = estado.carrinho.filter(function (i) { return i.qtd > 0; });
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

  /* ---------- Encomenda ---------- */
  function initForm() {
    var f = $('#form-encomenda');
    if (!f) return;
    $('#enc-data').min = new Date().toISOString().slice(0, 10);
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var erro = $('#erro-form');
      if (!estado.carrinho.length) { erro.textContent = 'Adicione pelo menos um produto antes de encomendar.'; return; }
      if (!f.checkValidity()) { erro.textContent = 'Preencha os campos obrigatórios.'; f.reportValidity(); return; }
      erro.textContent = '';
      var codigo = 'VF-' + new Date().getFullYear() + '-' + String(Math.floor(1000 + Math.random() * 9000));
      var pedido = {
        codigo: codigo, nome: $('#enc-nome').value, telefone: $('#enc-tel').value,
        retirada: $('#enc-tipo').value, quando: $('#enc-data').value + ' ' + $('#enc-hora').value,
        itens: estado.carrinho.slice(), total: totalCarrinho()
      };
      try {
        var salvos = JSON.parse(localStorage.getItem(CHAVE_PEDIDOS) || '[]');
        salvos.push(pedido);
        localStorage.setItem(CHAVE_PEDIDOS, JSON.stringify(salvos));
      } catch (e) {}
      $('#ok-codigo').textContent = codigo;
      $('#ok-resumo').textContent = pedido.nome + ' · ' + qtdItens() + ' itens · ' + money(pedido.total);
      $('#ok-encomenda').style.display = 'block';
      estado.carrinho = [];
      renderCarrinho();
      f.reset();
      $('#ok-encomenda').scrollIntoView({ block: 'center', behavior: 'smooth' });
    });
  }

  /* ---------- Lembrete local ---------- */
  function initLembrete() {
    var f = $('#form-lembrete');
    if (!f) return;
    function render() {
      var lista = [];
      try { lista = JSON.parse(localStorage.getItem(CHAVE_LEMBRETES) || '[]'); } catch (e) {}
      var ul = $('#lista-lembretes');
      if (!lista.length) {
        ul.innerHTML = '<li style="color:#bfe3d8">Nenhum lembrete salvo neste navegador.</li>';
        return;
      }
      ul.innerHTML = lista.map(function (r, i) {
        return '<li><span><b>' + r.hora + '</b> · ' + r.nome + '</span><button type="button" data-del-lem="' + i + '">remover</button></li>';
      }).join('');
      $$('[data-del-lem]', ul).forEach(function (b) {
        b.addEventListener('click', function () {
          lista.splice(parseInt(b.getAttribute('data-del-lem'), 10), 1);
          localStorage.setItem(CHAVE_LEMBRETES, JSON.stringify(lista));
          render();
        });
      });
    }
    f.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var nome = $('#lem-nome').value.trim(), hora = $('#lem-hora').value;
      if (!nome || !hora) return;
      var lista = [];
      try { lista = JSON.parse(localStorage.getItem(CHAVE_LEMBRETES) || '[]'); } catch (e) {}
      lista.push({ nome: nome, hora: hora });
      lista.sort(function (a, b) { return a.hora.localeCompare(b.hora); });
      localStorage.setItem(CHAVE_LEMBRETES, JSON.stringify(lista));
      f.reset(); render();
    });
    render();
  }

  /* ---------- UI geral ---------- */
  function initUI() {
    $$('[data-nec]').forEach(function (b) {
      b.addEventListener('click', function () {
        estado.categoria = b.getAttribute('data-nec');
        renderCategorias(); renderProdutos();
        $('#produtos').scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    });
    var galeria = $('#galeria');
    if (galeria) {
      $$('[data-galeria]').forEach(function (b) {
        b.addEventListener('click', function () {
          galeria.scrollBy({ left: Number(b.getAttribute('data-galeria')) * 262, behavior: 'smooth' });
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
          menu.classList.remove('aberto'); btn.setAttribute('aria-expanded', 'false');
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
    $('#modal-qtd').addEventListener('input', atualizarFicha);
    $('#modal-add').addEventListener('click', function () {
      if (!fichaAtual) return;
      adicionar(fichaAtual.id, parseInt($('#modal-qtd').value, 10) || 1);
      fecharFicha(); abrirCarrinho();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key !== 'Escape') return;
      if ($('#modal-overlay').classList.contains('aberto')) fecharFicha();
      else fecharCarrinho();
    });
    var busca = $('#busca');
    if (busca) busca.addEventListener('input', function () { estado.busca = busca.value; renderProdutos(); });
  }

  renderCategorias(); renderProdutos(); renderCarrinho();
  initForm(); initLembrete(); initUI();
})();
