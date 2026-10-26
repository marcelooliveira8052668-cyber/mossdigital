// Estou criando a tela de ESTOQUE: mostra o saldo de cada produto,
// calculado em tempo real a partir das movimentações (entradas − saídas),
// junto do custo total investido e do status (OK / Baixo / Zerado).

import { calcularEstoque, LIMITE_BAIXO } from '../../utils/estoque'
import { formatarMoeda } from '../../utils/formatar'

export default function Estoque({ movimentacoes }) {
  const estoque = calcularEstoque(movimentacoes)

  return (
    <div className="admin-secao">
      <h2>📦 Estoque atual</h2>
      <p className="admin-dica">
        O saldo é <b>calculado automaticamente</b>: entradas − saídas.
        Ninguém digita o estoque à mão — assim ele nunca mente.
      </p>

      <div className="tabela-envolucro">
        <table className="admin-tabela">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Saldo</th>
              <th>Custo investido</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map(e => {
              // Regra do status: zerado (≤0), baixo (até o limite) ou OK
              const status = e.saldo <= 0 ? 'zerado' : e.saldo <= LIMITE_BAIXO ? 'baixo' : 'ok'
              const rotulo = { zerado: 'Zerado', baixo: 'Baixo', ok: 'OK' }[status]

              return (
                <tr key={e.produto}>
                  <td><b>{e.emoji}</b> {e.produto}</td>
                  <td><b>{e.saldo}</b></td>
                  <td>{formatarMoeda(e.custo)}</td>
                  <td><span className={`status status-${status}`}>{rotulo}</span></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
