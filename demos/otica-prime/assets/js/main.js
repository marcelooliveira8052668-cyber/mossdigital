'use strict';
/* Lógica compartilhada: header, carrinho, toast, utilidades. */

const OP = {
  moeda(v) {
    return (Number(v) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  },
  $(sel, ctx) { return (ctx || document).querySelector(sel); },
  $$(sel, ctx) { return [...(ctx || document).querySelectorAll(sel)]; },
  async api(path, opts = {}) {
    if (window.OTICA_STATIC && window.LocalAPI) {
      return window.LocalAPI.handle(path, opts);
    }
    const res = await fetch(path, {
      headers: { 'Content-Type': 'application/json' },
      ...opts,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
    });
    let data = null;
    try { data = await res.json(); } catch { data = null; }
    if (!res.ok) {
      const err = new Error((data && data.erro) || 'Erro na requisição.');
      err.status = res.status;
      err.data = data;
      throw err;
    }
    return data;
  },
  toast(msg) {
    let t = document.getElementById('toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._tm);
    t._tm = setTimeout(() => t.classList.remove('show'), 3200);
  },
  cart: {
    KEY: 'op_cart',
    get() { try { return JSON.parse(localStorage.getItem('op_cart') || '[]'); } catch { return []; } },
    save(items) { localStorage.setItem('op_cart', JSON.stringify(items)); updateCartBadge(); },
    add(item) { const items = OP.cart.get(); items.push(item); OP.cart.save(items); },
    remove(i) { const items = OP.cart.get(); items.splice(i, 1); OP.cart.save(items); renderCartDrawer(); },
    setQty(i, qtd) { const items = OP.cart.get(); items[i].qtd = Math.max(1, Number(qtd) || 1); OP.cart.save(items); renderCartDrawer(); },
    clear() { OP.cart.save([]); renderCartDrawer(); },
  },
};
window.OP = OP;

function updateCartBadge() {
  const n = OP.cart.get().reduce((s, i) => s + (Number(i.qtd) || 1), 0);
  document.querySelectorAll('.cart-badge').forEach((el) => { el.textContent = n; el.style.display = n ? 'flex' : 'none'; });
}

const HEADER_HTML = `
<div class="topbar"><div class="container"><span>👓 Óculos de grau com <strong>receita avaliada por profissional</strong></span><span>Entrega para todo o Brasil · Retirada na loja</span></div></div>
<header class="main"><div class="container bar">
  <a class="logo" href="index.html" aria-label="Ótica Prime — início"><img src="assets/img/logo.svg" alt="Ótica Prime"></a>
  <nav class="nav-desk">
    <a href="catalogo.html">Catálogo</a>
    <a href="experimentar.html">Provador Virtual</a>
    <a href="index.html#lentes">Tipos de Lente</a>
    <a href="index.html#loja">Loja</a>
  </nav>
  <form class="search" action="catalogo.html" method="get" role="search">
    <input type="search" name="q" placeholder="Buscar armação, formato, cor..." aria-label="Buscar armações">
    <button type="submit" aria-label="Buscar">🔍</button>
  </form>
  <button class="icon-btn" id="cart-open" aria-label="Abrir carrinho">🛒<span class="cart-badge" style="display:none">0</span></button>
  <a class="icon-btn" href="admin.html" title="Área do profissional" aria-label="Área do profissional">👤</a>
</div></header>`;

const FOOTER_HTML = `
<footer id="loja-footer"><div class="container"><div class="cols">
  <div>
    <img src="assets/img/logo.svg" alt="Ótica Prime" style="height:46px;filter:brightness(0) invert(1);opacity:.92">
    <p style="margin-top:12px">Há 28 anos cuidando da sua visão. Armações, lentes de todos os focos e atendimento humanizado — na loja ou na sua casa.</p>
  </div>
  <div><h4>Atendimento</h4><p>Seg–Sex: 9h às 18h30<br>Sábado: 9h às 13h<br>Dom: fechado</p><p style="margin-top:8px">(11) 4002-8922<br>contato@oticaprime.com.br</p></div>
  <div><h4>Loja física</h4><p>Av. Paulista, 1000 — Loja 12<br>Bela Vista · São Paulo/SP<br>CEP 01310-100</p><a href="https://maps.google.com/?q=Av.+Paulista+1000" target="_blank" rel="noopener" style="color:var(--gold2);font-weight:700">Ver no mapa →</a></div>
  <div><h4>Ajuda</h4><p><a href="receita.html">Enviar receita</a><br><a href="pedido.html">Acompanhar pedido</a><br><a href="/#faq">Perguntas frequentes</a></p></div>
</div><div class="fine">© ${new Date().getFullYear()} Ótica Prime Ltda. · CNPJ 00.000.000/0001-00 · Pagamento com cartão em até 6x · Entrega para todo o Brasil</div></div></footer>`;

const BOTTOM_NAV_HTML = `
<nav class="bottom-nav" aria-label="Navegação rápida">
  <a href="index.html" data-nav="/"><span>🏠</span>Início</a>
  <a href="catalogo.html" data-nav="catalogo"><span>👓</span>Catálogo</a>
  <a href="experimentar.html" data-nav="experimentar"><span>🤳</span>Experimentar</a>
  <a href="receita.html" data-nav="receita"><span>📋</span>Receita</a>
  <a href="#" id="bottom-cart"><span>🛒</span>Carrinho</a>
</nav>`;

const DRAWER_HTML = `
<div class="overlay" id="overlay"></div>
<aside class="drawer" id="cart-drawer" aria-label="Carrinho">
  <div class="drawer-head"><h3>Seu carrinho</h3><button class="icon-btn" id="cart-close" aria-label="Fechar carrinho">✕</button></div>
  <div class="drawer-body" id="cart-items"></div>
  <div class="drawer-foot">
    <div style="display:flex;justify-content:space-between;font-weight:800;font-size:1.05rem;color:var(--navy)"><span>Total</span><span id="cart-total">R$ 0,00</span></div>
    <a href="checkout.html" class="btn btn-gold btn-block">Finalizar compra →</a>
    <a href="catalogo.html" class="btn btn-ghost btn-block" style="font-size:.82rem">Continuar escolhendo</a>
  </div>
</aside>`;

function renderCartDrawer() {
  const box = document.getElementById('cart-items');
  if (!box) return;
  const items = OP.cart.get();
  if (!items.length) {
    box.innerHTML = '<div style="text-align:center;color:var(--muted);padding:40px 10px"><div style="font-size:2.4rem">🛒</div><p style="margin-top:10px">Seu carrinho está vazio.</p><a href="catalogo.html" class="btn btn-navy" style="margin-top:12px">Ver armações</a></div>';
  } else {
    box.innerHTML = items.map((i, idx) => `
      <div class="cart-item">
        <img src="${i.imagem}" alt="${escapeHTML(i.nome)}" onerror="this.onerror=null;this.src='assets/img/glasses/${i.productId}.svg'">
        <div class="grow">
          <b>${escapeHTML(i.nome)}</b>
          <div style="color:var(--muted);font-size:.72rem">${escapeHTML(i.lenteNome || 'Armação')}${i.tratamentos && i.tratamentos.length ? ' · ' + i.tratamentos.length + ' tratamento(s)' : ''}</div>
          <div class="qty">
            <button onclick="OP.cart.setQty(${idx}, ${i.qtd - 1})" aria-label="Diminuir">−</button>
            <b>${i.qtd}</b>
            <button onclick="OP.cart.setQty(${idx}, ${i.qtd + 1})" aria-label="Aumentar">+</button>
            <button onclick="OP.cart.remove(${idx})" style="margin-left:auto;color:var(--bad);border-color:#f3c2c2" aria-label="Remover">✕</button>
          </div>
        </div>
        <div style="font-weight:800;color:var(--navy);font-size:.85rem">${OP.moeda(i.precoUnit * i.qtd)}</div>
      </div>`).join('');
  }
  const total = items.reduce((s, i) => s + i.precoUnit * i.qtd, 0);
  const el = document.getElementById('cart-total');
  if (el) el.textContent = OP.moeda(total);
  updateCartBadge();
}

function escapeHTML(s) {
  return String(s || '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function openCart() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('overlay')?.classList.add('open');
  renderCartDrawer();
}
function closeCart() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('overlay')?.classList.remove('open');
}

document.addEventListener('DOMContentLoaded', () => {
  document.body.insertAdjacentHTML('afterbegin', HEADER_HTML);
  document.body.insertAdjacentHTML('beforeend', DRAWER_HTML + BOTTOM_NAV_HTML + FOOTER_HTML);

  document.getElementById('cart-open')?.addEventListener('click', openCart);
  document.getElementById('cart-close')?.addEventListener('click', closeCart);
  document.getElementById('overlay')?.addEventListener('click', closeCart);
  document.getElementById('bottom-cart')?.addEventListener('click', (e) => { e.preventDefault(); openCart(); });

  updateCartBadge();
});
