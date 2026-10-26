// ============================================================
// PAINEL ADMINISTRATIVO — o "escritório do dono" dentro do site
// ============================================================
// Estou criando a rota escondida #admin: quem digita o endereço
// terminando em #admin vê o painel; o cliente comum continua
// vendo a loja normalmente. Os dados ficam no localStorage
// (banco de dados da v1 — grátis e sem servidor).

import { useEffect, useState } from 'react'
import { carregar, salvar, gerarId } from '../../utils/armazenamento'
import Dashboard from './Dashboard'
import Estoque from './Estoque'
import Movimentacoes from './Movimentacoes'
import Vendas from './Vendas'
import Despesas from './Despesas'
import './PainelAdmin.css'

const ABAS = [
  { id: 'painel', nome: '📊 Painel' },
  { id: 'estoque', nome: '📦 Estoque' },
  { id: 'movimentacoes', nome: '↔️ Entradas/Saídas' },
  { id: 'vendas', nome: '💰 Vendas' },
  { id: 'despesas', nome: '🧾 Despesas' },
]

// Chaves fixas do localStorage — nomes que "acham" os dados depois
const CHAVES = { mov: 'moss_movimentacoes', vendas: 'moss_vendas', despesas: 'moss_despesas' }

export default function PainelAdmin() {
  const [aba, setAba] = useState('painel')

  // Carrego os dados do navegador na primeira abertura.
  // A função dentro do useState roda UMA vez só (padrão oficial do React).
  const [movimentacoes, setMovimentacoes] = useState(() => carregar(CHAVES.mov, []))
  const [vendas, setVendas] = useState(() => carregar(CHAVES.vendas, []))
  const [despesas, setDespesas] = useState(() => carregar(CHAVES.despesas, []))

  // Persistência automática: sempre que um estado muda, salvo no navegador
  useEffect(() => salvar(CHAVES.mov, movimentacoes), [movimentacoes])
  useEffect(() => salvar(CHAVES.vendas, vendas), [vendas])
  useEffect(() => salvar(CHAVES.despesas, despesas), [despesas])

  function adicionar(tipo, dados) {
    const novo = { id: gerarId(), ...dados }
    if (tipo === 'mov') setMovimentacoes(atual => [novo, ...atual])
    if (tipo === 'venda') setVendas(atual => [novo, ...atual])
    if (tipo === 'despesa') setDespesas(atual => [novo, ...atual])
  }

  // Toda remoção pede confirmação (ação destrutiva = regra do projeto)
  function remover(tipo, id) {
    if (!window.confirm('Remover este registro? Essa ação não pode ser desfeita.')) return
    if (tipo === 'mov') setMovimentacoes(atual => atual.filter(r => r.id !== id))
    if (tipo === 'venda') setVendas(atual => atual.filter(r => r.id !== id))
    if (tipo === 'despesa') setDespesas(atual => atual.filter(r => r.id !== id))
  }

  function carregarExemplo() {
    const temDados = movimentacoes.length + vendas.length + despesas.length > 0
    if (temDados && !window.confirm('Isso SUBSTITUI os dados atuais pelos de exemplo. Continuar?')) return
    const { mov, ven, des } = dadosExemplo()
    setMovimentacoes(mov)
    setVendas(ven)
    setDespesas(des)
    setAba('painel')
  }

  function limparTudo() {
    if (!window.confirm('APAGAR TODOS os dados do painel? Essa ação não pode ser desfeita.')) return
    setMovimentacoes([])
    setVendas([])
    setDespesas([])
  }

  return (
    <div className="admin">
      {/* Barra superior: identidade + volta pra loja + abas */}
      <header className="admin-topo">
        <div className="admin-logo">🍔 MOSS <b>Painel</b></div>

        {/* Botão em destaque logo ao lado da logo — troca #admin por #inicio */}
        <a className="admin-voltar" href="#inicio">↩ Voltar ao site</a>

        <nav className="admin-abas">
          {ABAS.map(b => (
            <button
              key={b.id}
              className={aba === b.id ? 'ativa' : ''}
              onClick={() => setAba(b.id)}
            >
              {b.nome}
            </button>
          ))}
        </nav>
      </header>

      <main className="admin-conteudo">
        {aba === 'painel' && (
          <Dashboard movimentacoes={movimentacoes} vendas={vendas} despesas={despesas} />
        )}
        {aba === 'estoque' && <Estoque movimentacoes={movimentacoes} />}
        {aba === 'movimentacoes' && (
          <Movimentacoes
            movimentacoes={movimentacoes}
            onAdd={d => adicionar('mov', d)}
            onRemove={id => remover('mov', id)}
          />
        )}
        {aba === 'vendas' && (
          <Vendas
            vendas={vendas}
            onAdd={d => adicionar('venda', d)}
            onRemove={id => remover('venda', id)}
          />
        )}
        {aba === 'despesas' && (
          <Despesas
            despesas={despesas}
            onAdd={d => adicionar('despesa', d)}
            onRemove={id => remover('despesa', id)}
          />
        )}
      </main>

      {/* Rodapé utilitário: volta pra loja + ferramentas + nota de armazenamento */}
      <footer className="admin-rodape">
        <span className="admin-ferramentas">
          <a href="#inicio">↩ Voltar ao site</a>
          <button onClick={carregarExemplo}>🎲 Carregar exemplo</button>
          <button className="perigo" onClick={limparTudo}>🗑 Limpar tudo</button>
        </span>
        <span>💾 Dados salvos neste navegador (localStorage) — v2: nuvem</span>
      </footer>
    </div>
  )
}

// ---------- DADOS DE EXEMPLO ----------
// Servem pra demonstrar o painel funcionando sem digitar nada.
function diaISO(atraso) {
  const d = new Date()
  d.setDate(d.getDate() - atraso)
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

function dadosExemplo() {
  return {
    mov: [
      { id: gerarId(), tipo: 'entrada', produto: 'Carne moída', quantidade: 20, unidade: 'kg', valor: 320, data: diaISO(12), obs: 'Fornecedor do bairro' },
      { id: gerarId(), tipo: 'entrada', produto: 'Pão brioche', quantidade: 60, unidade: 'un', valor: 150, data: diaISO(12), obs: 'Padaria central' },
      { id: gerarId(), tipo: 'entrada', produto: 'Queijo prato', quantidade: 8, unidade: 'kg', valor: 176, data: diaISO(8), obs: '' },
      { id: gerarId(), tipo: 'entrada', produto: 'Batata congelada', quantidade: 15, unidade: 'kg', valor: 135, data: diaISO(8), obs: '' },
      { id: gerarId(), tipo: 'saida', produto: 'Carne moída', quantidade: 11, unidade: 'kg', valor: 0, data: diaISO(3), obs: 'Vendas da semana' },
      { id: gerarId(), tipo: 'saida', produto: 'Pão brioche', quantidade: 47, unidade: 'un', valor: 0, data: diaISO(3), obs: '' },
      { id: gerarId(), tipo: 'saida', produto: 'Queijo prato', quantidade: 6, unidade: 'kg', valor: 0, data: diaISO(2), obs: '' },
    ],
    ven: [
      { id: gerarId(), descricao: 'Pedidos WhatsApp — sábado', valor: 414.7, forma: 'Pix', data: diaISO(6) },
      { id: gerarId(), descricao: 'Almoço de domingo', valor: 287.9, forma: 'Cartão', data: diaISO(4) },
      { id: gerarId(), descricao: 'Combos + batata cheddar', valor: 340.5, forma: 'Pix', data: diaISO(2) },
      { id: gerarId(), descricao: 'Noite de terça', valor: 129.9, forma: 'Dinheiro', data: diaISO(1) },
    ],
    des: [
      { id: gerarId(), descricao: 'Aluguel do ponto', categoria: 'Aluguel', valor: 1200, data: diaISO(10) },
      { id: gerarId(), descricao: 'Conta de luz', categoria: 'Luz', valor: 183.4, data: diaISO(7) },
      { id: gerarId(), descricao: 'Gás de cozinha', categoria: 'Gás', valor: 92, data: diaISO(5) },
      { id: gerarId(), descricao: 'Ajuda do motoboy', categoria: 'Motoboy', valor: 240, data: diaISO(2) },
    ],
  }
}
