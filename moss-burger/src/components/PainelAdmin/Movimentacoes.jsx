// Estou criando a tela de ENTRADAS E SAÍDAS de mercadoria.
// Um único formulário com botão de tipo (entrada/saída) — é mais
// rápido de usar do que duas telas separadas.
// Entrada = comprou mercadoria (aumenta estoque e gasto).
// Saída = usou/vendeu mercadoria (diminui estoque).

import { useState } from 'react'
import { produtos } from '../../data/produtos'
import { formatarMoeda, dataBR, hoje } from '../../utils/formatar'

const UNIDADES = ['kg', 'un', 'L', 'pct']

export default function Movimentacoes({ movimentacoes, onAdd, onRemove }) {
  const [tipo, setTipo] = useState('entrada')

  const [form, setForm] = useState({
    produto: produtos[0].nome,
    outro: '',
    quantidade: '',
    unidade: 'kg',
    valor: '',
    data: hoje(),
    obs: '',
  })

  // Atualizo um campo do formulário mantendo os demais intactos
  function atualizar(campo, valor) {
    setForm({ ...form, [campo]: valor })
  }

  function handleSubmit(e) {
    e.preventDefault() // impedindo o recarregamento da página

    // Se escolheu "Outro", uso o texto digitado; senão, o do cardápio
    const nomeProduto = form.produto === 'Outro' ? form.outro.trim() : form.produto
    if (!nomeProduto || !form.quantidade) {
      alert('Preencha o produto e a quantidade.')
      return
    }

    onAdd({
      tipo,
      produto: nomeProduto,
      quantidade: Number(form.quantidade),
      unidade: form.unidade,
      valor: Number(form.valor) || 0, // saída pode vir sem valor
      data: form.data,
      obs: form.obs.trim(),
    })

    // Limpo só os campos que a pessoa vai trocar de novo
    setForm({ ...form, quantidade: '', valor: '', obs: '', outro: '' })
  }

  return (
    <div className="admin-secao">
      <h2>↔️ Entradas e saídas de mercadoria</h2>

      {/* Interruptor de tipo */}
      <div className="alternar-tipo">
        <button
          type="button"
          className={tipo === 'entrada' ? 'ativo entrada' : ''}
          onClick={() => setTipo('entrada')}
        >
          ➕ Entrada (compra)
        </button>
        <button
          type="button"
          className={tipo === 'saida' ? 'ativo saida' : ''}
          onClick={() => setTipo('saida')}
        >
          ➖ Saída (uso)
        </button>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <label>
          Produto
          <select value={form.produto} onChange={e => atualizar('produto', e.target.value)}>
            {produtos.map(p => (
              <option key={p.id} value={p.nome}>{p.nome}</option>
            ))}
            <option value="Outro">Outro (digitar)</option>
          </select>
        </label>

        {/* Campo extra aparece só quando "Outro" está selecionado */}
        {form.produto === 'Outro' && (
          <label>
            Nome do produto
            <input
              value={form.outro}
              onChange={e => atualizar('outro', e.target.value)}
              placeholder="Ex.: Molho especial"
            />
          </label>
        )}

        <label>
          Quantidade
          <input
            type="number" min="0.01" step="0.01" required
            value={form.quantidade}
            onChange={e => atualizar('quantidade', e.target.value)}
            placeholder="0"
          />
        </label>

        <label>
          Unidade
          <select value={form.unidade} onChange={e => atualizar('unidade', e.target.value)}>
            {UNIDADES.map(u => <option key={u}>{u}</option>)}
          </select>
        </label>

        <label>
          Valor total (R$) {tipo === 'saida' && <em>— opcional</em>}
          <input
            type="number" min="0" step="0.01"
            value={form.valor}
            onChange={e => atualizar('valor', e.target.value)}
            placeholder="0,00"
          />
        </label>

        <label>
          Data
          <input type="date" value={form.data} onChange={e => atualizar('data', e.target.value)} />
        </label>

        <label className="campo-largo">
          Observação
          <input
            value={form.obs}
            onChange={e => atualizar('obs', e.target.value)}
            placeholder="Opcional — ex.: fornecedor, lote..."
          />
        </label>

        <button className="btn btn-primario admin-btn" type="submit">
          Registrar {tipo === 'entrada' ? 'entrada' : 'saída'}
        </button>
      </form>

      {/* Histórico (mais recente primeiro, pois inserimos no início) */}
      <div className="tabela-envolucro">
        <table className="admin-tabela">
          <thead>
            <tr>
              <th>Data</th><th>Tipo</th><th>Produto</th><th>Qtd.</th><th>Valor</th><th></th>
            </tr>
          </thead>
          <tbody>
            {movimentacoes.length === 0 && (
              <tr><td colSpan="6" className="vazio">Nenhuma movimentação ainda.</td></tr>
            )}
            {movimentacoes.map(m => (
              <tr key={m.id}>
                <td>{dataBR(m.data)}</td>
                <td>
                  <span className={`tipo tipo-${m.tipo}`}>
                    {m.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td>
                  {m.produto}
                  {m.obs && <small className="obs"> — {m.obs}</small>}
                </td>
                <td>{m.quantidade} {m.unidade}</td>
                <td>{m.valor > 0 ? formatarMoeda(m.valor) : '—'}</td>
                <td>
                  <button className="btn-remover" onClick={() => onRemove(m.id)} aria-label="Remover">🗑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
