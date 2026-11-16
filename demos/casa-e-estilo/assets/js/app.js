'use strict';
/* Casa & Estilo — carrinho, checkout, orçamento, pedidos e painel (localStorage). */
const CE = {
  catalogo: window.CE_CATALOGO,
  K_CART: 'ce.carrinho', K_PED: 'ce.pedidos', K_ORC: 'ce.orcamentos',
  cats: [...new Set(window.CE_CATALOGO.map((p) => p.cat))],
};
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const money = (n) => (Number(n) || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const load = (k, fb) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? fb : v; } catch { return fb; } };
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const codigo = (n) => `CE-${new Date().getFullYear()}-${String(n).padStart(4, '0')}`;
const cart = () => load(CE.K_CART, []);
const pedidos = () => load(CE.K_PED, []);
const orcamentos = () => load(CE.K_ORC, []);

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(t._t); t._t = setTimeout(() => t.classList.remove('show'), 3000);
}

let catAtual = '';
function renderFiltros() {
  $('#filtros').innerHTML = ['Todos', ...CE.cats].map((c) =>
    `<button class="chip ${c === catAtual ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
  $$('#filtros .chip').forEach((b) => b.addEventListener('click', () => {
    catAtual = b.dataset.cat === 'Todos' ? '' : b.dataset.cat;
    renderFiltros(); renderCatalogo();
  }));
}
function renderCatalogo() {
  const q = $('#busca').value.trim().toLowerCase();
  const lista = CE.catalogo.filter((p) => {
    if (catAtual && p.cat !== catAtual) return false;
    if (!q) return true;
    return `${p.nome} ${p.desc} ${p.cat} ${(p.tags || []).join(' ')}`.toLowerCase().includes(q);
  });
  $('#contador').textContent = `${lista.length} ${lista.length === 1 ? 'peça' : 'peças'}`;
  $('#produtos').innerHTML = lista.length ? lista.map((p) => `
    <article class="card">
      <img src="assets/img/${p.id}.jpg" alt="${p.nome}" loading="lazy">
      <div class="card-body">
        <span class="tag">${p.cat}</span>
        <h3>${p.nome}</h3>
        <p>${p.desc}</p>
        <div class="price-row">
          <span class="price">${money(p.preco)}</span>
          <button class="btn btn-brand" onclick="adicionar('${p.id}')" aria-label="Adicionar ${p.nome}">+ Adicionar</button>
        </div>
      </div>
    </article>`).join('') : '<p style="color:var(--muted);padding:20px">Nenhuma peça encontrada.</p>';
}
$('#busca').addEventListener('input', renderCatalogo);

function adicionar(id) {
  const p = CE.catalogo.find((x) => x.id === id); if (!p) return;
  const c = cart(); const atual = c.find((x) => x.id === id);
  if (atual) atual.qtd++; else c.push({ id, nome: p.nome, preco: p.preco, imagem: `assets/img/${p.id}.jpg`, qtd: 1 });
  save(CE.K_CART, c); renderCart(); toast(`${p.nome} adicionado! 🛋️`);
}
function alterarQtd(i, delta) { const c = cart(); c[i].qtd += delta; if (c[i].qtd <= 0) c.splice(i, 1); save(CE.K_CART, c); renderCart(); }
function remover(i) { const c = cart(); c.splice(i, 1); save(CE.K_CART, c); renderCart(); }
function totalCarrinho() { return cart().reduce((s, i) => s + i.preco * i.qtd, 0); }
function renderCart() {
  const c = cart(); const n = c.reduce((s, i) => s + i.qtd, 0);
  $('#cart-badge').textContent = n; $('#cart-badge').style.display = n ? 'flex' : 'none';
  $('#cart-itens').innerHTML = c.length ? c.map((i, idx) => `
    <div class="cart-item"><img src="${i.imagem}" alt="${i.nome}">
      <div class="grow"><b>${i.nome}</b><div style="color:var(--muted)">${money(i.preco)} cada</div>
        <div class="qty"><button onclick="alterarQtd(${idx},-1)">−</button><b>${i.qtd}</b>
          <button onclick="alterarQtd(${idx},1)">+</button>
          <button onclick="remover(${idx})" style="margin-left:auto;color:var(--brand);border-color:#e5d5bd">✕</button></div></div>
      <div style="font-weight:800;color:var(--brand);font-size:.85rem">${money(i.preco * i.qtd)}</div>
    </div>`).join('') : '<div style="text-align:center;color:var(--muted);padding:30px"><div style="font-size:2rem">🛒</div><p>Seu carrinho está vazio.</p><a href="#catalogo" class="btn btn-ghost" style="margin-top:10px">Ver móveis</a></div>';
  $('#cart-total').textContent = money(totalCarrinho());
}
function openCart() { $('#cart-drawer').classList.add('open'); $('#overlay').classList.add('open'); }
function closeCart() { $('#cart-drawer').classList.remove('open'); $('#overlay').classList.remove('open'); }
$('#btn-cart').addEventListener('click', openCart);
$('#nav-cart').addEventListener('click', (e) => { e.preventDefault(); openCart(); });
$('#cart-close').addEventListener('click', closeCart);
$('#overlay').addEventListener('click', () => { closeCart(); $('#modal-checkout').classList.add('hidden'); });
$('#btn-esvaziar').addEventListener('click', () => { save(CE.K_CART, []); renderCart(); });
$('#btn-checkout').addEventListener('click', () => {
  if (!cart().length) { toast('Adicione uma peça ao carrinho primeiro.'); return; }
  closeCart(); $('#modal-checkout').classList.remove('hidden');
});
$('#close-checkout').addEventListener('click', () => $('#modal-checkout').classList.add('hidden'));
$('#cl-entrega').addEventListener('change', (e) => $('#endereco-field').classList.toggle('hidden', e.target.value === 'retirada'));

$('#form-checkout').addEventListener('submit', (e) => {
  e.preventDefault();
  const itens = cart(); const entrega = $('#cl-entrega').value;
  const frete = entrega === 'entrega' ? 149 : 0; const total = totalCarrinho() + frete;
  const lista = pedidos();
  const p = {
    id: Date.now().toString(36).slice(-6).toUpperCase(), codigo: codigo(lista.length + 1),
    cliente: { nome: $('#cl-nome').value.trim(), telefone: $('#cl-tel').value.trim() },
    entrega, endereco: $('#cl-end').value.trim(), obs: $('#cl-obs').value.trim(),
    itens: itens.map((i) => ({ ...i })), subtotal: totalCarrinho(), frete, total,
    status: 'confirmado', criadoEm: new Date().toISOString(),
    eventos: [
      { status: 'confirmado', descricao: 'Pedido confirmado. Aguardando separação.', em: new Date().toISOString() },
      { status: 'em_separacao', descricao: 'Peças em separação no estoque.', em: new Date().toISOString() },
    ],
  };
  lista.unshift(p); save(CE.K_PED, lista); save(CE.K_CART, []); renderCart();
  $('#modal-checkout').classList.add('hidden');
  $('#ok-codigo').textContent = p.codigo;
  $('#ok-resumo').textContent = `${money(p.total)} · ${entrega === 'entrega' ? 'Entrega com montagem' : 'Retirada na loja'}`;
  $('#modal-ok').classList.remove('hidden'); renderAdmin();
});
$('#ok-fechar').addEventListener('click', () => {
  $('#modal-ok').classList.add('hidden');
  $('#cod-pedido').value = $('#ok-codigo').textContent; buscarPedido();
  $('#pedidos').scrollIntoView({ behavior: 'smooth' });
});
function buscarPedido() {
  const c = $('#cod-pedido').value.trim().toUpperCase(); if (!c) return;
  const p = pedidos().find((x) => x.codigo === c);
  if (!p) { $('#pedido-resultado').innerHTML = '<p style="color:var(--brand)">Pedido não encontrado.</p>'; return; }
  $('#pedido-resultado').innerHTML = `
    <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:12px">
      <div><strong style="font-size:1.1rem;color:var(--brand)">${p.codigo}</strong><br><small style="color:var(--muted)">${new Date(p.criadoEm).toLocaleDateString('pt-BR')}</small></div>
      <span class="status-pill status-ok">${p.status}</span></div>
    ${p.itens.map((i) => `<div class="cart-item"><img src="${i.imagem}" alt="${i.nome}"><div class="grow"><b>${i.nome}</b><div style="color:var(--muted)">${i.qtd}x ${money(i.preco)}</div></div><strong>${money(i.qtd * i.preco)}</strong></div>`).join('')}
    <p style="margin-top:12px;font-size:.9rem"><strong>Total: ${money(p.total)}</strong> · ${p.entrega === 'entrega' ? 'Entrega: ' + p.endereco : 'Retirada na loja'}</p>
    <h3 style="font-size:.95rem;margin-top:14px">Acompanhe</h3>
    <div class="timeline">${p.eventos.map((ev) => `<div class="tl"><strong>${ev.descricao}</strong><br><small>${new Date(ev.em).toLocaleString('pt-BR')}</small></div>`).join('')}</div>`;
}
$('#btn-pedido').addEventListener('click', buscarPedido);
$('#cod-pedido').addEventListener('keydown', (e) => { if (e.key === 'Enter') buscarPedido(); });
const pre = new URLSearchParams(location.search).get('pedido');
if (pre) { $('#cod-pedido').value = pre; setTimeout(buscarPedido, 300); }

$('#form-orc').addEventListener('submit', (e) => {
  e.preventDefault();
  const lista = orcamentos();
  const o = {
    codigo: 'ORC-' + String(lista.length + 1).padStart(4, '0'),
    nome: $('#oc-nome').value.trim(), telefone: $('#oc-tel').value.trim(), email: $('#oc-email').value.trim(),
    ambiente: $('#oc-ambiente').value, medidas: $('#oc-medidas').value.trim(), descricao: $('#oc-desc').value.trim(),
    status: 'recebido', criadoEm: new Date().toISOString(),
  };
  lista.unshift(o); save(CE.K_ORC, lista);
  $('#form-orc').classList.add('hidden'); $('#orc-ok').classList.remove('hidden');
  $('#oc-codigo').textContent = o.codigo; renderAdmin(); toast('Orçamento enviado! 📐');
});
$('#oc-outro').addEventListener('click', () => {
  $('#form-orc').reset(); $('#form-orc').classList.remove('hidden'); $('#orc-ok').classList.add('hidden');
});

$('#btn-admin').addEventListener('click', () => {
  $('#admin').classList.toggle('hidden'); renderAdmin();
  if (!$('#admin').classList.contains('hidden')) $('#admin').scrollIntoView({ behavior: 'smooth' });
});
$('#btn-fechar-admin').addEventListener('click', () => $('#admin').classList.add('hidden'));
$$('.tab-btn').forEach((b) => b.addEventListener('click', () => {
  $$('.tab-btn').forEach((x) => x.classList.toggle('active', x === b));
  ['pedidos', 'orcamentos', 'catalogo'].forEach((t) => $('#aba-' + t).classList.toggle('hidden', t !== b.dataset.tab));
}));
function renderAdmin() {
  const ps = pedidos(), os = orcamentos();
  $('#badge-ped').textContent = ps.length ? `(${ps.length})` : '';
  $('#badge-orc').textContent = os.length ? `(${os.length})` : '';
  $('#tab-pedidos').innerHTML = ps.length ? ps.map((p) => `
    <tr><td><strong>${p.codigo}</strong><br><small>${new Date(p.criadoEm).toLocaleDateString('pt-BR')}</small></td>
      <td>${p.cliente.nome}<br><small>${p.cliente.telefone}</small></td><td><strong>${money(p.total)}</strong></td>
      <td>${p.entrega === 'entrega' ? '🚚 Entrega' : '🏪 Retirada'}</td>
      <td><select class="status-ped" data-id="${p.id}">
        ${[['confirmado', 'Confirmado'], ['em_separacao', 'Em separação'], ['em_transporte', 'Em transporte'], ['entregue', 'Entregue']]
          .map(([v, l]) => `<option value="${v}" ${v === p.status ? 'selected' : ''}>${l}</option>`).join('')}
      </select></td></tr>`).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--muted)">Nenhum pedido ainda.</td></tr>';
  $$('.status-ped').forEach((s) => s.addEventListener('change', () => {
    const ps2 = pedidos(); const p = ps2.find((x) => x.id === s.dataset.id);
    p.status = s.value;
    p.eventos.push({ status: s.value, descricao: `Status atualizado para ${s.value.replace(/_/g, ' ')}.`, em: new Date().toISOString() });
    save(CE.K_PED, ps2); renderAdmin(); toast('Status atualizado!');
  }));
  $('#tab-orcamentos').innerHTML = os.length ? os.map((o) => `
    <tr><td><strong>${o.codigo}</strong></td><td>${o.nome}<br><small>${o.telefone}</small></td>
      <td>${o.ambiente}</td><td>${o.medidas || '—'}</td><td><span class="status-pill status-warn">${o.status}</span></td></tr>`).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--muted)">Nenhum orçamento ainda.</td></tr>';
  $('#tab-catalogo').innerHTML = `<strong>${CE.catalogo.length} peças cadastradas</strong><p style="font-size:.82rem;color:var(--muted);margin-top:6px">Catálogo demonstrativo. Para editar preços e peças, altere <code>assets/js/data.js</code>.</p>`;
}

renderFiltros(); renderCatalogo(); renderCart(); renderAdmin();
