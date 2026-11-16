'use strict';
/**
 * Backend de demonstração no navegador — usado quando window.OTICA_STATIC === true.
 * Reproduz toda a API do servidor (catálogo, orçamento, receita, pedido, admin)
 * usando os dados embutidos em `window.OTICA_DATA` e localStorage.
 */
(function () {
  const D = window.OTICA_DATA;
  if (!D) return;

  const LS_PED = 'otica.pedidos';
  const LS_REC = 'otica.receitas';
  const SEED = 'otica.seed.v1';

  const parse = (s, fb) => { if (s == null) return fb; try { const v = JSON.parse(s); return v == null ? fb : v; } catch { return fb; } };
  const lerPedidos = () => parse(localStorage.getItem(LS_PED), []);
  const lerReceitas = () => parse(localStorage.getItem(LS_REC), []);
  const salvarPedidos = (p) => localStorage.setItem(LS_PED, JSON.stringify(p));
  const salvarReceitas = (r) => localStorage.setItem(LS_REC, JSON.stringify(r));
  const p2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
  const onlyDigits = (s) => String(s || '').replace(/\D/g, '');
  const nowISO = () => new Date().toISOString();
  const cod = (seq, prefixo) => `${prefixo}-${new Date().getFullYear()}-${String(seq).padStart(4, '0')}`;

  /* ------------------------------ seed de exemplo ------------------------------ */
  function seed() {
    const pedidos = lerPedidos();
    if (pedidos.length) return;
    const rec1 = {
      id: 1, codigo: 'RC-2026-0001', clienteNome: 'Maria Souza', email: 'maria.souza@email.com', telefone: '11999990001',
      od: { esfera: '-2.50', cilindro: '-0.75', eixo: '180', adicao: '' },
      oe: { esfera: '-2.25', cilindro: '-0.50', eixo: '170', adicao: '' },
      dnpOd: '32', dnpOe: '31', alturaPupilar: '18', medico: 'Dra. Lúcia Mendes', crm: 'CRM-SP 123456',
      dataExame: '2026-08-10', validade: '2027-08-10', observacoes: 'Usa óculos para leitura e computador.',
      foto: null, status: 'aprovada', notaRevisor: 'Receita conferida e dentro da validade.', revisadoPor: 'Painel demo', criadaEm: '2026-11-02T10:00:00.000Z', atualizadaEm: '2026-11-02T10:00:00.000Z',
    };
    const rec2 = {
      id: 2, codigo: 'RC-2026-0002', clienteNome: 'Ana Paula Ribeiro', email: 'ana.ribeiro@email.com', telefone: '11999990002',
      od: { esfera: '-1.00', cilindro: '', eixo: '', adicao: '' },
      oe: { esfera: '-1.25', cilindro: '', eixo: '', adicao: '' },
      dnpOd: '30', dnpOe: '30', alturaPupilar: '18', medico: 'Dr. Paulo Andrade', crm: 'CRM-RJ 654321',
      dataExame: '2026-10-02', validade: '2027-10-02', observacoes: '', foto: null,
      status: 'em_analise', notaRevisor: '', revisadoPor: '', criadaEm: '2026-11-10T14:30:00.000Z', atualizadaEm: '2026-11-10T14:30:00.000Z',
    };
    salvarReceitas([rec1, rec2]);

    const hoje = new Date();
    const ped = (seq, status, receitaId, nome, email, telefone, cpf, cep, endereco, numero, complemento, bairro, cidade, uf, entrega, itens, pagamento, eventos) => ({
      id: seq, codigo: `OP-2026-${String(seq).padStart(4, '0')}`, status, receitaId,
      cliente: { nome, email, telefone, cpf }, entrega: { tipo: entrega, cep, endereco, numero, complemento, bairro, cidade, uf },
      cep, endereco, numero, complemento, bairro, cidade, uf,
      frete: entrega === 'retirada' ? 0 : 0, subtotal: itens.reduce((s, i) => s + i.precoTotal, 0), total: itens.reduce((s, i) => s + i.precoTotal, 0),
      itens, pagamento, rastreio: '', criadoEm: new Date(hoje.getTime() - seq * 86400000).toISOString(), atualizadoEm: new Date(hoje.getTime() - seq * 86400000).toISOString(),
      eventos: eventos.map(([status, descricao]) => ({ status, descricao, criado_em: new Date(hoje.getTime() - seq * 86400000).toISOString() })),
    });
    salvarPedidos([
      ped(1, 'em_producao', 1, 'Maria Souza', 'maria.souza@email.com', '11999990001', '123.456.789-00', '01310-100', 'Av. Paulista', '1000', 'Apto 82', 'Bela Vista', 'São Paulo', 'SP', 'casa',
        [{ productId: 'g001', nome: 'Prime Classic Redondo', imagem: 'assets/img/glasses/g001.jpg', qtd: 1, lenteId: 'mono_longe', lenteNome: 'Monofocal — Visão de Longe', foco: 'Monofocal', materialId: 'resina', tratamentos: ['ar'], precoUnit: 649.8, precoTotal: 649.8 }],
        { metodo: 'cartao', bandeira: 'Visa', last4: '4242', parcelas: 3, status: 'aprovado', codigo: 'SBXDEMO1', modo: 'sandbox' },
        [['pagamento_aprovado', 'Pagamento confirmado no cartão.'], ['receita_aprovada', 'Receita aprovada pelo profissional.'], ['em_producao', 'Armação e lentes em fabricação.']]),
      ped(2, 'aguardando_receita', null, 'João Lima', 'joao.lima@email.com', '11999990003', '987.654.321-00', '20040-002', 'Rua do Ouvidor', '50', '', 'Centro', 'Rio de Janeiro', 'RJ', 'retirada',
        [{ productId: 'g015', nome: 'Prime Elegance Preto', imagem: 'assets/img/glasses/g015.jpg', qtd: 1, lenteId: 'multifocal', lenteNome: 'Multifocal Progressiva', foco: 'Multifocal', materialId: 'alto167', tratamentos: ['ar', 'blue'], precoUnit: 1889.6, precoTotal: 1889.6 },
         { productId: 'g031', nome: 'Prime Redondo Metal', imagem: 'assets/img/glasses/g031.jpg', qtd: 1, lenteId: 'mono_perto', lenteNome: 'Monofocal — Visão de Perto', foco: 'Monofocal', materialId: 'resina', tratamentos: [], precoUnit: 699.9, precoTotal: 699.9 }],
        { metodo: 'cartao', bandeira: 'Mastercard', last4: '5555', parcelas: 6, status: 'aprovado', codigo: 'SBXDEMO2', modo: 'sandbox' },
        [['pagamento_aprovado', 'Pagamento confirmado no cartão.'], ['aguardando_receita', 'Aguardando o envio da receita pelo cliente.']]),
      ped(3, 'receita_em_analise', 2, 'Ana Paula Ribeiro', 'ana.ribeiro@email.com', '11999990002', '111.222.333-44', '30130-100', 'Rua da Bahia', '200', 'Sala 3', 'Centro', 'Belo Horizonte', 'MG', 'casa',
        [{ productId: 'g023', nome: 'Prime Rosé Round', imagem: 'assets/img/glasses/g023.jpg', qtd: 1, lenteId: 'bifocal', lenteNome: 'Bifocal', foco: 'Bifocal', materialId: 'policarbonato', tratamentos: ['uv'], precoUnit: 909.8, precoTotal: 909.8 }],
        { metodo: 'cartao', bandeira: 'Elo', last4: '1234', parcelas: 2, status: 'aprovado', codigo: 'SBXDEMO3', modo: 'sandbox' },
        [['pagamento_aprovado', 'Pagamento confirmado no cartão.'], ['receita_em_analise', 'Receita enviada e aguardando análise do profissional.']]),
    ]);
    localStorage.setItem(SEED, '1');
  }

  /* ------------------------------ conversores ------------------------------ */
  const normalizeImg = (p) => (p.imagem || '').replace(/^\/assets\//, 'assets/').replace(/^assets\/img\/glasses\//, 'assets/img/glasses/');
  const pubProduto = (p) => ({ ...p, imagem: normalizeImg(p), overlay: (p.overlay || '').replace(/^\//, '') });

  const prodIdx = {};
  for (const p of D.produtos) prodIdx[p.id] = p;

  function buscarProdutos(q) {
    const termo = String((q.get ? q.get('q') : q.q || '') || '').trim().toLowerCase();
    let lista = D.produtos.filter((p) => {
      if (q.get) {
        if (q.get('categoria') && p.categoria !== q.get('categoria')) return false;
        if (q.get('formato') && p.formato !== q.get('formato')) return false;
        if (q.get('material') && p.material !== q.get('material')) return false;
        if (q.get('cor') && p.cor !== q.get('cor')) return false;
        if (q.get('precoMax') && Number(p.preco) > Number(q.get('precoMax'))) return false;
        if (q.get('destaque') === '1' && !p.destaque) return false;
      }
      if (termo) {
        const hay = `${p.nome} ${p.marca} ${p.cor} ${p.formato} ${(p.tags || []).join(' ')}`.toLowerCase();
        if (!hay.includes(termo)) return false;
      }
      return true;
    });
    const ord = q.get ? q.get('ordenar') : '';
    switch (ord) {
      case 'menor-preco': lista.sort((a, b) => a.preco - b.preco); break;
      case 'maior-preco': lista.sort((a, b) => b.preco - a.preco); break;
      case 'avaliacao': lista.sort((a, b) => b.avaliacao - a.avaliacao); break;
      default: lista.sort((a, b) => (b.destaque - a.destaque) || (b.avaliacao - a.avaliacao));
    }
    return lista.map(pubProduto);
  }

  const precoLente = (lenteId, materialId, tratIds) => {
    const lente = D.LENTES.find((l) => l.id === lenteId) || D.LENTES[0];
    const mat = D.MATERIAIS.find((m) => m.id === materialId) || D.MATERIAIS[0];
    let total = lente.preco * (mat.fator || 1);
    for (const t of tratIds || []) {
      const tr = D.TRATAMENTOS.find((x) => x.id === t);
      if (tr) total += tr.preco;
    }
    return p2(total);
  };

  function mascaraCPF(cpf) {
    const d = onlyDigits(cpf);
    return d.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  const pubPedido = (r, rec) => ({
    id: r.id, codigo: r.codigo, status: r.status, receitaId: r.receitaId,
    cliente: r.cliente,
    entrega: r.entrega,
    frete: r.frete, subtotal: r.subtotal, total: r.total,
    itens: r.itens,
    pagamento: r.pagamento,
    rastreio: r.rastreio || '',
    criadoEm: r.criadoEm, atualizadoEm: r.atualizadoEm,
    eventos: r.eventos || [],
    receita: rec ? { codigo: rec.codigo, status: rec.status, temFoto: !!rec.foto, notaRevisor: rec.notaRevisor, atualizadaEm: rec.atualizadaEm } : null,
  });

  function luhn(num) {
    const d = String(num).replace(/\D/g, '');
    if (d.length < 13) return false;
    let soma = 0, dup = false;
    for (let i = d.length - 1; i >= 0; i--) {
      let n = Number(d[i]);
      if (dup) { n *= 2; if (n > 9) n -= 9; }
      soma += n; dup = !dup;
    }
    return soma % 10 === 0;
  }
  function bandeira(num) {
    const d = String(num).replace(/\D/g, '');
    if (/^4/.test(d)) return 'Visa';
    if (/^5[1-5]/.test(d) || /^2[2-7]/.test(d)) return 'Mastercard';
    if (/^3[47]/.test(d)) return 'Amex';
    if (/^6(?:011|5)/.test(d)) return 'Discover';
    if (/^35/.test(d)) return 'JCB';
    if (/^(636368|438935|504175|451416|636297|5067|4576|4011)/.test(d)) return 'Elo';
    return 'Outra';
  }

  function erro(status, msg, extra = {}) {
    const e = new Error(msg);
    e.status = status;
    e.data = { erro: msg, ...extra };
    throw e;
  }

  function qParams(paramsStr) {
    const m = new URLSearchParams(paramsStr || '');
    return (k) => m.get(k);
  }

  /* ------------------------------ rotas ------------------------------ */
  const routes = [
    ['GET', /^\/api\/produtos\/?$/, (p) => buscarProdutos(qParams(p.rest || p))],
    ['GET', /^\/api\/produtos\/([^/]+)$/, (p) => {
      const r = prodIdx[p.m[1]];
      if (!r) erro(404, 'Produto não encontrado.');
      const relacionados = D.produtos.filter((x) => x.categoria === r.categoria && x.id !== r.id).sort((a, b) => b.avaliacao - a.avaliacao).slice(0, 4).map(pubProduto);
      return { ...pubProduto(r), relacionados };
    }],
    ['GET', /^\/api\/filtros\/?$/, () => D.filtros],
    ['GET', /^\/api\/lentes\/?$/, () => D.LENTES],
    ['GET', /^\/api\/tratamentos\/?$/, () => D.TRATAMENTOS],
    ['GET', /^\/api\/materiais\/?$/, () => D.MATERIAIS],
    ['POST', /^\/api\/orcamento\/?$/, (p, body) => {
      const prod = prodIdx[(body && body.produtoId) || ''];
      if (!prod) erro(400, 'Produto inválido.');
      const lente = D.LENTES.find((l) => l.id === body.lenteId) || D.LENTES[0];
      const tratamentos = Array.isArray(body.tratamentos) ? body.tratamentos : [];
      const precoL = precoLente(lente.id, body.materialId, tratamentos);
      const total = p2(prod.preco + precoL);
      const prazo = 4 + (lente.prazoExtra || 0) + (tratamentos.includes('foto') ? 2 : 0);
      return { armacao: p2(prod.preco), lente: precoL, total, prazoDias: prazo, lenteInfo: { id: lente.id, nome: lente.nome, foco: lente.foco }, tratamentos: tratamentos.map((id) => D.TRATAMENTOS.find((t) => t.id === id)).filter(Boolean) };
    }],
    ['POST', /^\/api\/receitas\/?$/, (p, body) => {
      if (!body.clienteNome || String(body.clienteNome).trim().length < 3) erro(400, 'Dados incompletos.', { erros: ['Informe o nome completo.'] });
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(body.email || ''))) erro(400, 'Dados incompletos.', { erros: ['E-mail inválido.'] });
      const rs = lerReceitas();
      const seq = rs.length + 1;
      const id = seq;
      rs.push({
        id, codigo: cod(seq, 'RC'), clienteNome: String(body.clienteNome).trim(), email: String(body.email).trim(), telefone: body.telefone || '',
        od: { esfera: body.odEsfera || '', cilindro: body.odCilindro || '', eixo: body.odEixo || '', adicao: body.odAdicao || '' },
        oe: { esfera: body.oeEsfera || '', cilindro: body.oeCilindro || '', eixo: body.oeEixo || '', adicao: body.oeAdicao || '' },
        dnpOd: body.dnpOd || '', dnpOe: body.dnpOe || '', alturaPupilar: body.alturaPupilar || '',
        medico: body.medico || '', crm: body.crm || '', dataExame: body.dataExame || '', validade: body.validade || '',
        observacoes: body.observacoes || '', foto: body.foto || null, status: 'em_analise', notaRevisor: '', revisadoPor: '',
        criadaEm: nowISO(), atualizadaEm: nowISO(),
      });
      salvarReceitas(rs);
      const codRec = cod(seq, 'RC');
      return { id, codigo: codRec, status: 'em_analise' };
    }],
    ['GET', /^\/api\/receitas\/([^/]+)$/, (p) => {
      const rec = lerReceitas().find((r) => r.codigo === p.m[1]);
      if (!rec) erro(404, 'Receita não encontrada.');
      return { codigo: rec.codigo, status: rec.status, clienteNome: rec.clienteNome, email: rec.email, od: rec.od, oe: rec.oe, dnpOd: rec.dnpOd, dnpOe: rec.dnpOe, medico: rec.medico, crm: rec.crm, dataExame: rec.dataExame, observacoes: rec.observacoes, temFoto: !!rec.foto, notaRevisor: rec.notaRevisor, atualizadaEm: rec.atualizadaEm };
    }],
    ['POST', /^\/api\/pedidos\/?$/, (p, body) => criarPedido(body)],
    ['GET', /^\/api\/pedidos\/([^/]+)$/, (p) => {
      const pedido = lerPedidos().find((r) => r.codigo === p.m[1]);
      if (!pedido) erro(404, 'Pedido não encontrado.');
      const rec = pedido.receitaId ? lerReceitas().find((r) => r.id === pedido.receitaId) : null;
      return pubPedido(pedido, rec);
    }],
    ['POST', /^\/api\/pedidos\/([^/]+)\/receita\/?$/, (p, body) => {
      const pedido = lerPedidos().find((r) => r.codigo === p.m[1]);
      if (!pedido) erro(404, 'Pedido não encontrado.');
      const rs = lerReceitas();
      const seq = rs.length + 1;
      const id = seq;
      rs.push({
        id, codigo: cod(seq, 'RC'), clienteNome: pedido.cliente.nome, email: pedido.cliente.email, telefone: pedido.cliente.telefone,
        od: { esfera: body.odEsfera || '', cilindro: body.odCilindro || '', eixo: body.odEixo || '', adicao: body.odAdicao || '' },
        oe: { esfera: body.oeEsfera || '', cilindro: body.oeCilindro || '', eixo: body.oeEixo || '', adicao: body.oeAdicao || '' },
        dnpOd: body.dnpOd || '', dnpOe: body.dnpOe || '', alturaPupilar: body.alturaPupilar || '',
        medico: body.medico || '', crm: body.crm || '', dataExame: body.dataExame || '', validade: body.validade || '',
        observacoes: body.observacoes || '', foto: body.foto || null, status: 'em_analise', notaRevisor: '', revisadoPor: '',
        criadaEm: nowISO(), atualizadaEm: nowISO(),
      });
      salvarReceitas(rs);
      const seqPedidos = lerPedidos().map((r) => r);
      const target = seqPedidos.find((r) => r.codigo === p.m[1]);
      target.receitaId = id;
      target.status = 'receita_em_analise';
      target.atualizadoEm = nowISO();
      target.eventos.push({ status: 'receita_em_analise', descricao: 'Receita enviada pelo cliente e encaminhada ao profissional.', criado_em: nowISO() });
      salvarPedidos(seqPedidos);
      return { codigo: cod(seq, 'RC'), status: 'receita_em_analise' };
    }],
    ['POST', /^\/api\/admin\/login\/?$/, () => ({ nome: 'Administrador', login: 'admin' })],
    ['POST', /^\/api\/admin\/logout\/?$/, () => ({ ok: true })],
    ['GET', /^\/api\/admin\/me\/?$/, () => ({ nome: 'Administrador', login: 'admin' })],
    ['GET', /^\/api\/admin\/dashboard\/?$/, () => {
      const peds = lerPedidos();
      const faturamento = peds.filter((x) => x.status !== 'cancelado').reduce((s, x) => s + (x.total || 0), 0);
      const receitasPendentes = lerReceitas().filter((r) => r.status === 'em_analise').length;
      const porStatus = {};
      for (const x of peds) porStatus[x.status] = (porStatus[x.status] || 0) + 1;
      return { faturamento: p2(faturamento), receitasPendentes, totalPedidos: peds.length, totalProdutos: D.produtos.length, pedidosPorStatus: Object.entries(porStatus).map(([status, c]) => ({ status, c })) };
    }],
    ['GET', /^\/api\/admin\/pedidos\/?$/, () => {
      const peds = lerPedidos().slice().sort((a, b) => b.id - a.id);
      const recs = lerReceitas();
      return peds.map((r) => pubPedido(r, r.receitaId ? recs.find((x) => x.id === r.receitaId) : null));
    }],
    ['GET', /^\/api\/admin\/receitas\/?$/, () => {
      return lerReceitas().slice().sort((a, b) => b.id - a.id);
    }],
    ['POST', /^\/api\/admin\/receitas\/(\d+)\/revisar\/?$/, (p, body) => {
      const rs = lerReceitas();
      const rec = rs.find((r) => r.id === Number(p.m[1]));
      if (!rec) erro(404, 'Receita não encontrada.');
      const status = body.status === 'aprovada' || body.status === 'com_pendencia' ? body.status : null;
      if (!status) erro(400, 'Status inválido.');
      rec.status = status;
      rec.notaRevisor = String(body.nota || '');
      rec.revisadoPor = 'Painel demo';
      rec.atualizadaEm = nowISO();
      salvarReceitas(rs);
      const peds = lerPedidos().slice();
      for (const ped of peds) {
        if (ped.receitaId === rec.id) {
          if (status === 'aprovada') ped.status = 'receita_aprovada';
          ped.atualizadoEm = nowISO();
          ped.eventos.push({ status: status === 'aprovada' ? 'receita_aprovada' : 'receita_com_pendencia', descricao: status === 'aprovada' ? 'Receita aprovada pelo profissional.' : ('Receita com pendência: ' + rec.notaRevisor), criado_em: nowISO() });
        }
      }
      salvarPedidos(peds);
      return { ok: true, status };
    }],
    ['POST', /^\/api\/admin\/pedidos\/(\d+)\/status\/?$/, (p, body) => {
      const peds = lerPedidos().slice();
      const ped = peds.find((r) => r.id === Number(p.m[1]));
      if (!ped) erro(404, 'Pedido não encontrado.');
      if (body.status) ped.status = body.status;
      if (body.rastreio) ped.rastreio = String(body.rastreio);
      ped.atualizadoEm = nowISO();
      ped.eventos.push({ status: ped.status, descricao: String(body.descricao || 'Status atualizado pelo painel demo.'), criado_em: nowISO() });
      salvarPedidos(peds);
      return { ok: true, status: ped.status };
    }],
  ];

  function criarPedido(body) {
    const itensBrutos = Array.isArray(body.itens) ? body.itens : [];
    const itens = [];
    const erros = [];
    for (const raw of itensBrutos) {
      const prod = prodIdx[String(raw.produtoId || '')];
      if (!prod) { erros.push('Produto inválido: ' + raw.produtoId); continue; }
      const qtd = Math.max(1, Math.min(10, Number(raw.qtd) || 1));
      const tratamentos = Array.isArray(raw.tratamentos) ? raw.tratamentos.filter((t) => D.TRATAMENTOS.some((x) => x.id === t)) : [];
      const lente = D.LENTES.find((l) => l.id === raw.lenteId) || D.LENTES[0];
      const precoUnit = p2(prod.preco + precoLente(lente.id, raw.materialId || 'resina', tratamentos));
      itens.push({ productId: prod.id, nome: prod.nome, imagem: normalizeImg(prod), qtd, lenteId: lente.id, lenteNome: lente.nome, foco: lente.foco, materialId: raw.materialId || 'resina', tratamentos, precoUnit, precoTotal: p2(precoUnit * qtd) });
    }
    if (erros.length) erro(400, 'Alguns itens são inválidos.', { erros });
    if (!itens.length) erro(400, 'Carrinho vazio.');

    const c = body.cliente || {};
    const errosC = [];
    if (!c.nome || String(c.nome).trim().length < 3) errosC.push('Nome do cliente é obrigatório.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(c.email || ''))) errosC.push('E-mail inválido.');
    const cpfD = onlyDigits(c.cpf);
    if (cpfD.length !== 11) errosC.push('CPF inválido.');
    const tipoEntrega = body.entrega === 'retirada' ? 'retirada' : 'casa';
    if (tipoEntrega === 'casa') {
      if (onlyDigits(c.cep).length !== 8) errosC.push('CEP inválido.');
      if (!c.endereco || !c.numero) errosC.push('Endereço e número são obrigatórios.');
      if (!c.cidade || !c.uf) errosC.push('Cidade e UF são obrigatórios.');
    }
    if (errosC.length) erro(400, 'Dados do cliente incompletos.', { erros: errosC });

    const subtotal = p2(itens.reduce((s, i) => s + i.precoTotal, 0));
    const frete = tipoEntrega === 'retirada' ? 0 : (subtotal >= 500 ? 0 : 29.9);
    const total = p2(subtotal + frete);

    // pagamento (sandbox validado)
    const pag = body.pagamento || {};
    const num = onlyDigits(pag.numero);
    if (!luhn(num)) erro(402, 'Pagamento não autorizado.', { erros: ['Número de cartão inválido.'] });
    const m = String(pag.validade || '').replace(/\s/g, '').match(/^(\d{2})\/?(\d{2})$/);
    if (!m) erro(402, 'Pagamento não autorizado.', { erros: ['Validade inválida (MM/AA).'] });
    const mes = Number(m[1]), ano = 2000 + Number(m[2]);
    if (mes < 1 || mes > 12) erro(402, 'Pagamento não autorizado.', { erros: ['Mês inválido.'] });
    const agora = new Date();
    if (new Date(ano, mes, 0, 23, 59, 59) < agora) erro(402, 'Pagamento não autorizado.', { erros: ['Cartão vencido.'] });
    if (!String(pag.titular || '').trim() || String(pag.titular).trim().length < 5) erro(402, 'Pagamento não autorizado.', { erros: ['Nome impresso no cartão é obrigatório.'] });
    if (num === '4000000000000002') erro(402, 'Pagamento não autorizado.', { erros: ['Cartão recusado pela operadora.'] });
    if (num === '4000000000009995') erro(402, 'Pagamento não autorizado.', { erros: ['Saldo insuficiente.'] });

    // receita: anexam um nova, ou referencia uma existente por código, ou nenhuma
    let receitaId = null;
    let receitas = lerReceitas();
    if (body.receitaCodigo) {
      const alvo = receitas.find((r) => r.codigo === String(body.receitaCodigo).trim().toUpperCase());
      if (!alvo) erro(400, 'Código de receita não encontrado.', { erros: ['Verifique o código RC-...'] });
      receitaId = alvo.id;
    } else if (body.receita) {
      const seq = receitas.length + 1;
      const id = seq;
      receitas.push({
        id, codigo: cod(seq, 'RC'), clienteNome: String(c.nome).trim(), email: String(c.email).trim(), telefone: c.telefone || '',
        od: { esfera: body.receita.odEsfera || '', cilindro: body.receita.odCilindro || '', eixo: body.receita.odEixo || '', adicao: body.receita.odAdicao || '' },
        oe: { esfera: body.receita.oeEsfera || '', cilindro: body.receita.oeCilindro || '', eixo: body.receita.oeEixo || '', adicao: body.receita.oeAdicao || '' },
        dnpOd: body.receita.dnpOd || '', dnpOe: body.receita.dnpOe || '', alturaPupilar: body.receita.alturaPupilar || '',
        medico: body.receita.medico || '', crm: body.receita.crm || '', dataExame: body.receita.dataExame || '', validade: body.receita.validade || '',
        observacoes: body.receita.observacoes || '', foto: body.receita.foto || null, status: 'em_analise', notaRevisor: '', revisadoPor: '',
        criadaEm: nowISO(), atualizadaEm: nowISO(),
      });
      salvarReceitas(receitas);
      receitaId = id;
    }

    const peds = lerPedidos();
    const seq = peds.length + 1;
    const codigo = cod(seq, 'OP');
    const status = receitaId ? 'receita_em_analise' : 'aguardando_receita';
    const pagamento = { metodo: 'cartao', bandeira: bandeira(num), last4: num.slice(-4), parcelas: Number(pag.parcelas) || 1, status: 'aprovado', codigo: 'SBX' + Math.random().toString(36).slice(2, 8).toUpperCase(), modo: 'sandbox' };
    const pedido = {
      id: seq, codigo, status, receitaId,
      cliente: { nome: String(c.nome).trim(), email: String(c.email).trim(), telefone: c.telefone || '', cpf: onlyDigits(c.cpf) },
      entrega: { tipo: tipoEntrega, cep: onlyDigits(c.cep || ''), endereco: c.endereco || '', numero: c.numero || '', complemento: c.complemento || '', bairro: c.bairro || '', cidade: c.cidade || '', uf: String(c.uf || '').toUpperCase() },
      frete, subtotal, total, itens, pagamento, rastreio: '',
      criadoEm: nowISO(), atualizadoEm: nowISO(),
      eventos: [
        { status: 'pagamento_aprovado', descricao: `Pagamento aprovado no cartão ${pagamento.bandeira} ••${pagamento.last4}.`, criado_em: nowISO() },
        receitaId
          ? { status: 'receita_em_analise', descricao: 'Receita recebida e enviada para análise do profissional.', criado_em: nowISO() }
          : { status: 'aguardando_receita', descricao: 'Aguardando o envio da receita.', criado_em: nowISO() },
      ],
    };
    peds.push(pedido);
    salvarPedidos(peds);
    return { codigo, status, total, subtotal, frete, receitaId, pagamento: { bandeira: pagamento.bandeira, last4: pagamento.last4, parcelas: pagamento.parcelas, modo: pagamento.modo }, itens };
  }

  window.LocalAPI = {
    seed,
    handle(fullPath, opts) {
      seed();
      const [pathname, query] = String(fullPath).split('?');
      const body = opts && opts.body && typeof opts.body === 'object' ? opts.body : {};
      const method = (opts && opts.method) ? String(opts.method).toUpperCase() : 'GET';
      for (const [m, rx, fn] of routes) {
        if (m !== method) continue;
        const mm = pathname.match(rx);
        if (!mm) continue;
        const p = { m: mm, rest: query || '' };
        return Promise.resolve().then(() => fn(p, body));
      }
      return Promise.reject(Object.assign(new Error('Rota não encontrada.'), { status: 404, data: { erro: 'Rota não encontrada.' } }));
    },
  };
})();
