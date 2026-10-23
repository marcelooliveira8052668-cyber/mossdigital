/* ==========================================================================
   CARRINHO
   --------------------------------------------------------------------------
   Guardado no localStorage, então sobrevive à troca de página e ao reload.
   Cada operação dispara o evento "carrinho:atualizado", e a barra superior
   se reenhaixa sozinha em qualquer página.
   ========================================================================== */

const Carrinho = (() => {

  const CHAVE = "nexa:carrinho";

  /* Formato gravado: [{ id, qtd }] — só isso. Preço e nome são lidos
     sempre do catálogo atual, então mudar preço no dados.js não deixa
     preço velho preso no carrinho do cliente. */
  function ler() {
    try {
      const bruto = JSON.parse(localStorage.getItem(CHAVE) || "[]");
      if (!Array.isArray(bruto)) return [];
      /* limpa item inválido ou quantidade absurda */
      return bruto
        .filter(it => it && typeof it.id === "string" && Catalogo.porId(it.id))
        .map(it => ({ id: it.id, qtd: Math.max(1, Math.min(99, parseInt(it.qtd, 10) || 1)) }))
        .filter((it, i, arr) => arr.findIndex(x => x.id === it.id) === i);
    } catch (e) {
      /* storage corrompido ou bloqueado pelo navegador: carrinho novo */
      return [];
    }
  }

  function gravar(lista) {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(lista));
    } catch (e) { /* modo privado: segue sem persistir, sem quebrar */ }
    document.dispatchEvent(new CustomEvent("carrinho:atualizado", { detail: { itens: lista } }));
    return lista;
  }

  function encontrar(lista, id) {
    return lista.find(it => it.id === id);
  }

  return {

    /* ---------- LEITURA ---------- */

    itens() {
      return ler().map(it => {
        const produto = Catalogo.porId(it.id);
        return {
          id: it.id,
          qtd: it.qtd,
          produto: produto,
          unitario: Catalogo.precoAtual(produto),
          subtotal: Catalogo.precoAtual(produto) * it.qtd
        };
      });
    },

    /* Quantidade total de unidades (mostra o selo do carrinho). */
    unidades() {
      return ler().reduce((t, it) => t + it.qtd, 0);
    },

    vazio() {
      return ler().length === 0;
    },

    /* ---------- ESCRITA ---------- */

    adicionar(id, qtd) {
      const produto = Catalogo.porId(id);
      if (!produto) return { ok: false, motivo: "produto" };

      const lista = ler();
      const atual = encontrar(lista, id);
      const pedida = Math.max(1, parseInt(qtd, 10) || 1);
      const jaNoCarrinho = atual ? atual.qtd : 0;
      const disponivel = produto.estoque || 1;

      if (jaNoCarrinho >= disponivel) {
        return { ok: false, motivo: "estoque", disponivel: disponivel, produto: produto };
      }

      const final = Math.min(disponivel, jaNoCarrinho + pedida);
      if (atual) atual.qtd = final;
      else lista.push({ id: id, qtd: final });

      gravar(lista);
      return { ok: true, adicionado: final - jaNoCarrinho, produto: produto };
    },

    definir(id, qtd) {
      const lista = ler();
      const atual = encontrar(lista, id);
      if (!atual) return { ok: false };

      const produto = Catalogo.porId(id);
      const disponivel = produto ? (produto.estoque || 1) : 99;
      const nova = Math.max(0, Math.min(disponivel, parseInt(qtd, 10) || 0));

      if (nova === 0) return this.remover(id);

      atual.qtd = nova;
      gravar(lista);
      return { ok: true, qtd: nova };
    },

    incrementar(id) {
      const atual = encontrar(ler(), id);
      return this.definir(id, (atual ? atual.qtd : 0) + 1);
    },

    decrementar(id) {
      const atual = encontrar(ler(), id);
      if (!atual) return { ok: false };
      return this.definir(id, atual.qtd - 1);
    },

    remover(id) {
      const lista = ler().filter(it => it.id !== id);
      gravar(lista);
      return { ok: true };
    },

    limpar() {
      gravar([]);
    },

    /* ---------- TOTAIS ---------- */

    /* opcoes: { cupom: 'CODIGO', frete: numero }
       Sempre devolve o mesmo formato, inclusive com carrinho vazio,
       para o resumo do checkout nunca precisar tratar caso nulo. */
    totais(opcoes) {
      const o = opcoes || {};
      const itens = this.itens();
      const subtotal = itens.reduce((t, it) => t + it.subtotal, 0);

      let descontoCupom = 0;
      let freteIsento = false;
      let cupomValido = null;

      const cupom = Catalogo.cupom(o.cupom);
      if (cupom && subtotal >= (cupom.minimo || 0)) {
        cupomValido = cupom;
        if (cupom.tipo === "percentual") descontoCupom = subtotal * (cupom.valor / 100);
        if (cupom.tipo === "frete") freteIsento = true;
      }

      const base = Math.max(0, subtotal - descontoCupom);
      let frete = 0;
      if (itens.length) {
        if (o.frete !== undefined && o.frete !== null) {
          frete = Number(o.frete) || 0;
        } else if (base >= CONFIG.entrega.freteGratisAcima) {
          frete = 0;
          freteIsento = freteIsento || true;
        } else {
          frete = CONFIG.entrega.taxaFixa;
        }
      }
      if (freteIsento) frete = 0;

      const total = base + frete;

      return {
        itens: itens,
        unidades: itens.reduce((t, it) => t + it.qtd, 0),
        subtotal: subtotal,
        descontoCupom: Math.round(descontoCupom * 100) / 100,
        cupom: cupomValido,
        frete: frete,
        freteGratis: frete === 0 && itens.length > 0,
        freteIsento: freteIsento,
        total: Math.round(total * 100) / 100,
        faltaParaFreteGratis: Math.max(0, CONFIG.entrega.freteGratisAcima - base)
      };
    }
  };
})();
