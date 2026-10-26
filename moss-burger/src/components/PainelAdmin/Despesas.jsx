// Estou criando a tela de DESPESAS: o que a loja GASTOU fora da
// mercadoria (aluguel, luz, salário...). Separei despesa de mercadoria
// porque elas respondem perguntas diferentes do dono:
// mercadoria = custo do produto; despesa = custo de manter a loja aberta.

import { useState } from 'react'
import { formatarMoeda, dataBR, hoje } from '../../utils/formatar'

const CATEGORIAS = ['Aluguel', 'Luz', 'Água', 'Gás', 'Salário', 'Motoboy', 'Manutenção', 'Marketing', 'Outro']

export default function Despesas({ despesas, onAdd, onRemove }) {
  const [form, setForm] = useState({
    descricao: '',
    categoria: 'Aluguel',
    valor: '',
    data: hoje(),
  })

  function atualizar(campo, valor) {
    setForm({ ...form, [campo]: valor })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const valor = Number(form.valor)
    if (!form.descricao.trim() || !valor || valor <= 0) {
      alert('Preencha a descrição e um valor maior que zero.')
      return
    }

    onAdd({
      descricao: form.descricao.trim(),
      categoria: form.categoria,
      valor,
      data: form.data,
    })

    setForm({ ...form, descricao: '', valor: '' })
  }

  // Soma de todas as despesas registradas
  const totalDespesas = despesas.reduce((s, d) => s + d.valor, 0)

  return (
    <div className="admin-secao">
      <h2>🧾 Despesas</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="campo-largo">
          Descrição
          <input
            value={form.descricao}
            onChange={e => atualizar('descricao', e.target.value)}
            placeholder="Ex.: Conta de luz de outubro"
            required
          />
        </label>

        <label>
          Categoria
          <select value={form.categoria} onChange={e => atualizar('categoria', e.target.value)}>
            {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
          </select>
        </label>

        <label>
          Valor (R$)
          <input
            type="number" min="0.01" step="0.01" required
            value={form.valor}
            onChange={e => atualizar('valor', e.target.value)}
            placeholder="0,00"
          />
        </label>

        <label>
          Data
          <input type="date" value={form.data} onChange={e => atualizar('data', e.target.value)} />
        </label>

        <button className="btn btn-primario admin-btn" type="submit">＋ Registrar despesa</button>
      </form>

      <p className="total-fita">
        Total de despesas: <b>{formatarMoeda(totalDespesas)}</b> ({despesas.length} registro(s))
      </p>

      <div className="tabela-envolucro">
        <table className="admin-tabela">
          <thead>
            <tr><th>Data</th><th>Descrição</th><th>Categoria</th><th>Valor</th><th></th></tr>
          </thead>
          <tbody>
            {despesas.length === 0 && (
              <tr><td colSpan="5" className="vazio">Nenhuma despesa registrada ainda.</td></tr>
            )}
            {despesas.map(d => (
              <tr key={d.id}>
                <td>{dataBR(d.data)}</td>
                <td>{d.descricao}</td>
                <td><span className="tipo tipo-saida">{d.categoria}</span></td>
                <td><b className="negativo-tabela">{formatarMoeda(d.valor)}</b></td>
                <td><button className="btn-remover" onClick={() => onRemove(d.id)} aria-label="Remover">🗑</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
