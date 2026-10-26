// Estou criando o DASHBOARD: a primeira tela do painel, que responde
// às perguntas do dono em 5 segundos: "quanto ganhei, quanto gastei,
// quanto sobrou e tem algo acabando no estoque?".
// Todos os valores são CALCULADOS na hora a partir dos registros.

import { useState } from 'react'
import { formatarMoeda, dataBR, hoje } from '../../utils/formatar'
import { calcularEstoque, LIMITE_BAIXO } from '../../utils/estoque'

export default function Dashboard({ movimentacoes, vendas, despesas }) {
  // Filtro de período: mês atual (padrão) ou histórico todo
  const [periodo, setPeriodo] = useState('mes')

  const prefixoMes = hoje().slice(0, 7) // "AAAA-MM" do mês atual

  function noPeriodo(data) {
    // startsWith compara o início do texto: "2026-10".startsWith("2026-10")
    return periodo === 'tudo' ? true : (data || '').startsWith(prefixoMes)
  }

  // ---------- CÁLCULOS DO PERÍODO ----------
  const ganhos = vendas
    .filter(v => noPeriodo(v.data))
    .reduce((s, v) => s + v.valor, 0)

  const custoMercadoria = movimentacoes
    .filter(m => m.tipo === 'entrada' && noPeriodo(m.data))
    .reduce((s, m) => s + (m.valor || 0), 0)

  const custoFixo = despesas
    .filter(d => noPeriodo(d.data))
    .reduce((s, d) => s + d.valor, 0)

  const gastos = custoMercadoria + custoFixo
  const lucro = ganhos - gastos // A fórmula da vida: ganhou − gastou

  // ---------- ALERTAS DE ESTOQUE ----------
  // Só alerto produtos que já tiveram movimentação (senão apareceria
  // alerta de tudo que está "zerado por nunca ter comprado").
  const jaMovimentados = new Set(movimentacoes.map(m => m.produto))
  const alertas = calcularEstoque(movimentacoes).filter(
    e => jaMovimentados.has(e.produto) && e.saldo <= LIMITE_BAIXO
  )

  // ---------- ÚLTIMOS LANÇAMENTOS ----------
  const eventos = [
    ...vendas.map(v => ({ data: v.data, texto: `Venda — ${v.descricao}`, valor: v.valor, sinal: '+' })),
    ...despesas.map(d => ({ data: d.data, texto: `Despesa — ${d.descricao}`, valor: d.valor, sinal: '−' })),
    ...movimentacoes.map(m => ({
      data: m.data,
      texto: `${m.tipo === 'entrada' ? 'Compra' : 'Consumo'} — ${m.produto}`,
      valor: m.valor || 0,
      sinal: m.tipo === 'entrada' ? '−' : '',
    })),
  ]
    .sort((a, b) => (a.data < b.data ? 1 : -1)) // mais recente primeiro
    .slice(0, 6)

  return (
    <div className="admin-secao">
      <div className="admin-cabecalho">
        <h2>📊 Painel geral</h2>
        <select value={periodo} onChange={e => setPeriodo(e.target.value)}>
          <option value="mes">Este mês</option>
          <option value="tudo">Histórico todo</option>
        </select>
      </div>

      {/* Os 4 indicadores principais (KPIs) */}
      <div className="kpi-grade">
        <div className="kpi kpi-verde">
          <span>💚 Ganhos</span>
          <strong>{formatarMoeda(ganhos)}</strong>
          <small>vendas no período</small>
        </div>
        <div className="kpi kpi-vermelho">
          <span>❤️ Gastos</span>
          <strong>{formatarMoeda(gastos)}</strong>
          <small>mercadoria + contas fixas</small>
        </div>
        <div className={`kpi ${lucro >= 0 ? 'kpi-azul' : 'kpi-vermelho'}`}>
          <span>✨ Lucro</span>
          <strong>{formatarMoeda(lucro)}</strong>
          <small>ganhos − gastos</small>
        </div>
        <div className={`kpi ${alertas.length > 0 ? 'kpi-amarelo' : 'kpi-azul'}`}>
          <span>⚠️ Estoque</span>
          <strong>{alertas.length > 0 ? `${alertas.length} item(ns)` : 'Tudo certo'}</strong>
          <small>{alertas.length > 0 ? 'baixo — repita logo' : 'acima do limite'}</small>
        </div>
      </div>

      {/* Alerta detalhado (só aparece quando há problema) */}
      {alertas.length > 0 && (
        <div className="alerta-estoque">
          ⚠️ Estoque baixo: {alertas.map(a => `${a.produto} (${a.saldo})`).join(', ')}
        </div>
      )}

      {/* Lista dos lançamentos mais recentes */}
      <div className="admin-cartao">
        <h3>🕐 Últimos lançamentos</h3>
        {eventos.length === 0 ? (
          <p className="vazio">Nenhum lançamento ainda — carregue o exemplo no rodapé da tela.</p>
        ) : (
          <ul className="lista-eventos">
            {eventos.map((ev, i) => (
              <li key={i}>
                <span className="evento-data">{dataBR(ev.data)}</span>
                <span className="evento-texto">{ev.texto}</span>
                <span className={ev.sinal === '+' ? 'evento-valor positivo' : 'evento-valor negativo'}>
                  {ev.valor > 0 ? `${ev.sinal}${formatarMoeda(ev.valor)}` : '—'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
