/* ==========================================================================
   CATÁLOGO — leitura dos dados de js/dados.js
   --------------------------------------------------------------------------
   Nenhuma outra parte do site percorre PRODUTOS na mão. Toda consulta passa
   por aqui, então trocar o catálogo nunca quebra as páginas.
   ========================================================================== */

const Catalogo = {

  /* Procura pelo id. Se não achar, devolve null (a página trata). */
  porId(id) {
    if (!id) return null;
    return PRODUTOS.find(p => p.id === id) || null;
  },

  /* Preço que o cliente paga hoje. */
  precoAtual(p) {
    return (p && p.promo) ? p.promo : (p ? p.preco : 0);
  },

  /* Percentual de desconto, ou 0 se não estiver em oferta. */
  desconto(p) {
    if (!p || !p.promo || !p.preco) return 0;
    return Math.round((1 - p.promo / p.preco) * 100);
  },

  /* Valor economizado, em reais. */
  economia(p) {
    if (!p || !p.promo) return 0;
    return p.preco - p.promo;
  },

  todos() {
    return PRODUTOS.slice();
  },

  porCategoria(cat) {
    if (!cat || cat === "todos") return this.todos();
    return PRODUTOS.filter(p => p.categoria === cat);
  },

  emPromocao() {
    return PRODUTOS.filter(p => !!p.promo);
  },

  destaques() {
    const marcados = PRODUTOS.filter(p => p.destaque);
    /* se o cliente marcar poucos, completa com os mais baratos em promoção */
    if (marcados.length >= 8) return marcados.slice(0, 12);
    const extras = this.emPromocao().filter(p => !p.destaque);
    return marcados.concat(extras).slice(0, 12);
  },

  maisVendidos(n) {
    return PRODUTOS.slice()
      .sort((a, b) => (b.vendidos || 0) - (a.vendidos || 0))
      .slice(0, n || 8);
  },

  melhorAvaliados(n) {
    return PRODUTOS.slice()
      .sort((a, b) => (b.nota || 0) - (a.nota || 0))
      .slice(0, n || 8);
  },

  /* Busca por nome e por resumo. Normaliza acento: "fone" acha "Fone". */
  buscar(termo) {
    const chave = this._normalizar(termo);
    if (!chave) return this.todos();
    return PRODUTOS.filter(p =>
      this._normalizar(p.nome).includes(chave) ||
      this._normalizar(p.resumo || "").includes(chave) ||
      this._normalizar(Catalogo.rotuloCategoria(p.categoria)).includes(chave)
    );
  },

  rotuloCategoria(chave) {
    return (CATEGORIAS[chave] && CATEGORIAS[chave].rotulo) || chave;
  },

  /* Aplica filtro, busca e ordenação de uma vez — usado pela vitrine. */
  filtrar(opcoes) {
    const o = opcoes || {};
    let lista = o.categoria ? this.porCategoria(o.categoria) : this.todos();
    if (o.apenasPromocao) lista = lista.filter(p => p.promo);
    if (o.termo) {
      const chave = this._normalizar(o.termo);
      lista = lista.filter(p =>
        this._normalizar(p.nome).includes(chave) ||
        this._normalizar(p.resumo || "").includes(chave));
    }

    const ordem = o.ordenar || "relevancia";
    const ordenadores = {
      relevancia: (a, b) => (b.vendidos || 0) - (a.vendidos || 0),
      "menor-preco": (a, b) => this.precoAtual(a) - this.precoAtual(b),
      "maior-preco": (a, b) => this.precoAtual(b) - this.precoAtual(a),
      desconto: (a, b) => this.desconto(b) - this.desconto(a),
      nota: (a, b) => (b.nota || 0) - (a.nota || 0),
      nome: (a, b) => a.nome.localeCompare(b.nome, "pt-BR")
    };
    return lista.sort(ordenadores[ordem] || ordenadores.relevancia);
  },

  /* Produtos parecidos: mesma categoria primeiro, depois os mais vendidos. */
  relacionados(produto, n) {
    if (!produto) return [];
    const quantos = n || 4;
    const mesmaCategoria = this.porCategoria(produto.categoria)
      .filter(p => p.id !== produto.id)
      .sort((a, b) => (b.vendidos || 0) - (a.vendidos || 0));

    if (mesmaCategoria.length >= quantos) return mesmaCategoria.slice(0, quantos);

    const resto = this.todos()
      .filter(p => p.id !== produto.id && !mesmaCategoria.includes(p))
      .sort((a, b) => (b.nota || 0) - (a.nota || 0));
    return mesmaCategoria.concat(resto).slice(0, quantos);
  },

  /* Avaliações de um produto. Sempre devolve array (nunca undefined). */
  avaliacoes(id) {
    return (AVALIACOES && AVALIACOES[id]) || [];
  },

  /* Média real das avaliações salvas. */
  mediaAvaliacoes(id) {
    const lista = this.avaliacoes(id);
    if (!lista.length) return null;
    const soma = lista.reduce((t, a) => t + a.nota, 0);
    return Math.round((soma / lista.length) * 10) / 10;
  },

  /* Distribuição 5..1 estrelas — alimenta as barrinhas da página do produto. */
  distribuicao(id) {
    const base = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    this.avaliacoes(id).forEach(a => {
      const n = Math.min(5, Math.max(1, a.nota));
      base[n] += 1;
    });
    return base;
  },

  cupom(codigo) {
    if (!codigo) return null;
    const alvo = String(codigo).trim().toUpperCase();
    return (CUPONS || []).find(c => c.codigo.toUpperCase() === alvo) || null;
  },

  _normalizar(txt) {
    return String(txt || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
};
