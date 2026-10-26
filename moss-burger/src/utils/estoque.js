// Estou criando o cálculo de ESTOQUE.
// Regra de ouro: o saldo NUNCA é digitado à mão — ele é CALCULADO
// a partir das movimentações (entradas − saídas).
// Assim o estoque nunca mente e o histórico fica auditável.

import { produtos } from '../data/produtos'

// Limite mínimo: abaixo dele, o produto aparece com alerta no painel
export const LIMITE_BAIXO = 5

export function calcularEstoque(movimentacoes) {
  const mapa = {}

  // Começo com todos os produtos do cardápio (mesmo os sem movimento)
  produtos.forEach(p => {
    mapa[p.nome] = { produto: p.nome, emoji: p.emoji, saldo: 0, custo: 0 }
  })

  // Percorro cada movimentação somando entradas e subtraindo saídas
  movimentacoes.forEach(m => {
    if (!mapa[m.produto]) {
      // Produto digitado como "Outro" que não está no cardápio
      mapa[m.produto] = { produto: m.produto, emoji: '📦', saldo: 0, custo: 0 }
    }
    if (m.tipo === 'entrada') {
      mapa[m.produto].saldo += m.quantidade
      mapa[m.produto].custo += m.valor || 0
    } else {
      mapa[m.produto].saldo -= m.quantidade
    }
  })

  // Arredondo para 2 casas (evita erros como 14.999999999999998)
  return Object.values(mapa).map(item => ({
    ...item,
    saldo: Math.round(item.saldo * 100) / 100,
    custo: Math.round(item.custo * 100) / 100,
  }))
}
