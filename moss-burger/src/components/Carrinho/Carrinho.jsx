// Estou criando o PAINEL LATERAL DO CARRINHO: abre deslizando da
// direita, lista os itens com botões de quantidade e mostra o resumo
// com subtotal, taxa e total. Também valida o pedido mínimo antes
// de liberar o botão de enviar pelo WhatsApp.

import { useCarrinho } from '../../context/CarrinhoContext'
import { formatarMoeda } from '../../utils/formatar'
import './Carrinho.css'

export default function Carrinho() {
  const {
    itens, painelAberto, setPainelAberto,
    mudarQuantidade, enviarPedido,
    subtotal, taxa, total, abaixoDoMinimo,
    PEDIDO_MINIMO, ENTREGA_GRATIS,
  } = useCarrinho()

  return (
    <>
      {/* Fundo escuro: clicar nele fecha o painel */}
      <div
        className={`fundo-carrinho ${painelAberto ? 'aberto' : ''}`}
        onClick={() => setPainelAberto(false)}
      />

      <aside className={`painel-carrinho ${painelAberto ? 'aberto' : ''}`}>
        {/* Topo do painel */}
        <div className="painel-topo">
          <h2>🛒 Meu pedido</h2>
          <button onClick={() => setPainelAberto(false)} aria-label="Fechar">✕</button>
        </div>

        {/* Lista de itens (ou aviso de vazio) */}
        <div className="painel-itens">
          {itens.length === 0 ? (
            <p className="carrinho-vazio">
              Seu pedido está vazio 🥲<br />
              <span>Adicione um lanche pra começar!</span>
            </p>
          ) : (
            itens.map(i => (
              <div className="item-carrinho" key={i.produto.id}>
                <span className="item-emoji-mini">
                  {/* Miniatura: foto real se existir; senão, emoji */}
                  {i.produto.foto ? <img src={i.produto.foto} alt="" /> : i.produto.emoji}
                </span>
                <div className="item-info">
                  <strong>{i.produto.nome}</strong>
                  <small>{formatarMoeda(i.produto.preco * i.quantidade)}</small>
                </div>
                {/* Controle de quantidade: − [n] ＋ */}
                <div className="controle-qtd">
                  <button onClick={() => mudarQuantidade(i.produto.id, -1)}>−</button>
                  <span>{i.quantidade}</span>
                  <button onClick={() => mudarQuantidade(i.produto.id, 1)}>＋</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Resumo financeiro — só aparece se houver itens */}
        {itens.length > 0 && (
          <div className="painel-resumo">
            <div className="linha-resumo">
              <span>Subtotal</span><span>{formatarMoeda(subtotal)}</span>
            </div>
            <div className="linha-resumo">
              <span>Entrega</span>
              <span className={taxa === 0 ? 'gratis' : ''}>
                {taxa === 0 ? 'GRÁTIS 🎉' : formatarMoeda(taxa)}
              </span>
            </div>
            <div className="linha-resumo total">
              <span>Total</span><span>{formatarMoeda(total)}</span>
            </div>

            {/* Avisos dinâmicos: falta pro mínimo ou bônus de entrega grátis */}
            {abaixoDoMinimo ? (
              <p className="aviso">
                ⚠️ Pedido mínimo de {formatarMoeda(PEDIDO_MINIMO)} —
                faltam {formatarMoeda(PEDIDO_MINIMO - subtotal)}
              </p>
            ) : subtotal >= ENTREGA_GRATIS ? (
              <p className="aviso sucesso">🎉 Você ganhou entrega GRÁTIS!</p>
            ) : null}

            <button
              className="btn btn-whatsapp"
              onClick={enviarPedido}
              disabled={abaixoDoMinimo} // bloqueado enquanto abaixo do mínimo
            >
              📱 Enviar pedido no WhatsApp
            </button>
          </div>
        )}
      </aside>
    </>
  )
}
