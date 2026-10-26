// ============================================================
// CARRINHO CONTEXT — o "cérebro" compartilhado do site
// ============================================================
// Estou usando o Context API do React porque o carrinho precisa ser
// acessado de vários lugares (cabeçalho, cardápio, promoções e painel).
// Sem Context eu teria que "puxar" props por muitos componentes,
// o que fica confuso rápido (chamamos de "prop drilling").
// Aqui centralizedi: estado + todas as regras de negócio do pedido.

import { createContext, useContext, useState } from 'react'

// ---------- Regras de negócio (vêm do briefing do cliente) ----------
const PEDIDO_MINIMO = 30      // pedido mínimo em reais
const TAXA_ENTREGA = 6        // taxa fixa de entrega
const ENTREGA_GRATIS = 60     // a partir deste valor, entrega grátis
// Número fictício — em um projeto real, o cliente fornece o dele.
// NÃO uso dados pessoais reais sem autorização (regra do projeto).
const WHATSAPP = '5500900000000'

// Crio o Contexto (o "canal" onde o carrinho será compartilhado)
const CarrinhoContext = createContext()

export function CarrinhoProvider({ children }) {
  // Estado do carrinho: lista de { produto, quantidade }
  const [itens, setItens] = useState([])
  const [painelAberto, setPainelAberto] = useState(false)

  // ---------- AÇÕES DO CARRINHO ----------

  // Ao adicionar, verifico se o produto já existe: se sim, só some 1;
  // se não, crio a entrada nova com quantidade 1.
  function adicionar(produto) {
    setItens(atual => {
      const existente = atual.find(i => i.produto.id === produto.id)
      if (existente) {
        return atual.map(i =>
          i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
        )
      }
      return [...atual, { produto, quantidade: 1 }]
    })
    setPainelAberto(true) // já abro o painel pra pessoa ver que funcionou
  }

  // Aumento ou diminuo a quantidade; ao chegar em 0, REMOVO o item.
  function mudarQuantidade(id, mudanca) {
    setItens(atual =>
      atual
        .map(i => (i.produto.id === id ? { ...i, quantidade: i.quantidade + mudanca } : i))
        .filter(i => i.quantidade > 0)
    )
  }

  function limparCarrinho() {
    setItens([])
    setPainelAberto(false)
  }

  // ---------- CÁLCULOS ----------
  // Uso reduce para somar: (acumulador, item atual) => novo acumulador
  const subtotal = itens.reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0)
  // Entrega grátis quando passa do limite ou quando o pedido está vazio
  const taxa = subtotal >= ENTREGA_GRATIS || subtotal === 0 ? 0 : TAXA_ENTREGA
  const total = subtotal + taxa
  const totalItens = itens.reduce((soma, i) => soma + i.quantidade, 0)
  // Regra do pedido mínimo: bloqueia o envio se não atingir o valor
  const abaixoDoMinimo = subtotal > 0 && subtotal < PEDIDO_MINIMO

  // ---------- MONTAGEM DA MENSAGEM DO WHATSAPP ----------
  function montarMensagem() {
    let texto = '*🍔 NOVO PEDIDO — MOSS BURGER*\n──────────────\n'
    itens.forEach(i => {
      texto += `• ${i.quantidade}x ${i.produto.nome} — ${formatarLocal(i.produto.preco * i.quantidade)}\n`
    })
    texto += '──────────────\n'
    texto += `Subtotal: ${formatarLocal(subtotal)}\n`
    texto += `Entrega: ${taxa === 0 ? 'GRÁTIS 🎉' : formatarLocal(taxa)}\n`
    texto += `*TOTAL: ${formatarLocal(total)}*\n`
    texto += '\n📍 *Meu endereço:* \n💳 *Pagamento:* '
    return texto
  }

  // Pequena função interna: transforma 27.9 em "R$ 27,90"
  function formatarLocal(valor) {
    return 'R$ ' + valor.toFixed(2).replace('.', ',')
  }

  // Envio o pedido: abro o WhatsApp com a mensagem já formatada.
  // encodeURIComponent deixa acentos, espaços e quebras de linha seguros na URL.
  function enviarPedido() {
    if (itens.length === 0 || abaixoDoMinimo) return
    const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(montarMensagem())}`
    window.open(url, '_blank')
  }

  // Exponho tudo pelo "canal" do Contexto
  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        painelAberto,
        setPainelAberto,
        adicionar,
        mudarQuantidade,
        limparCarrinho,
        enviarPedido,
        subtotal,
        taxa,
        total,
        totalItens,
        abaixoDoMinimo,
        PEDIDO_MINIMO,
        ENTREGA_GRATIS,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  )
}

// Este hook encurta o acesso: em vez de importar Context + useContext
// toda vez, basta escrever useCarrinho() dentro do componente.
export function useCarrinho() {
  return useContext(CarrinhoContext)
}
