// Estou criando a tela de VENDAS: registra quanto entrou de dinheiro
// (receita bruta). Cada venda tem descrição, valor, forma de pagamento
// e data. A soma desses registros é o "quanto ganhou" do painel.

import { useState } from 'react'
import { formatarMoeda, dataBR, hoje } from '../../utils/formatar'

const FORMAS = ['Pix', 'Dinheiro', 'Cartão', 'Outro']

export default function Vendas({ vendas, onAdd, onRemove }) {
  const [form, setForm] = useState({
    descricao: '',
    valor: '',
    forma: 'Pix',
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
      valor,
      forma: form.forma,
      data: form.data,
    })

    setForm({ ...form, descricao: '', valor: '' })
  }

  // Soma de todas as vendas registradas
  const totalVendas = vendas.reduce((s, v) => s + v.valor, 0)

  return (
    <div className="admin-secao">
      <h2>💰 Vendas</h2>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label className="campo-largo">
          Descrição
          <input
            value={form.descricao}
            onChange={e => atualizar('descricao', e.target.value)}
            placeholder="Ex.: Pedidos WhatsApp — sexta"
            required
          />
        </label>

        <label>
          Valor recebido (R$)
          <input
            type="number" min="0.01" step="0.01" required
            value={form.valor}
            onChange={e => atualizar('valor', e.target.value)}
            placeholder="0,00"
          />
        </label>

        <label>
          Forma de pagamento
          <select value={form.forma} onChange={e => atualizar('forma', e.target.value)}>
            {FORMAS.map(f => <option key={f}>{f}</option>)}
          </select>
        </label>

        <label>
          Data
          <input type="date" value={form.data} onChange={e => atualizar('data', e.target.value)} />
        </label>

        <button className="btn btn-primario admin-btn" type="submit">＋ Registrar venda</button>
      </form>

      <p className="total-fita">
        Total registrado: <b>{formatarMoeda(totalVendas)}</b> ({vendas.length} venda(s))
      </p>

      <div className="tabela-envolucro">
        <table className="admin-tabela">
          <thead>
            <tr><th>Data</th><th>Descrição</th><th>Pagamento</th><th>Valor</th><th></th></tr>
          </thead>
          <tbody>
            {vendas.length === 0 && (
              <tr><td colSpan="5" className="vazio">Nenhuma venda registrada ainda.</td></tr>
            )}
            {vendas.map(v => (
              <tr key={v.id}>
                <td>{dataBR(v.data)}</td>
                <td>{v.descricao}</td>
                <td><span className="tipo tipo-entrada">{v.forma}</span></td>
                <td><b className="positivo-tabela">{formatarMoeda(v.valor)}</b></td>
                <td><button className="btn-remover" onClick={() => onRemove(v.id)} aria-label="Remover">🗑</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
