// Estou criando um CARD de produto REUTILIZÁVEL: o mesmo componente
// serve pra seção "Mais pedidos" e poderia servir pra qualquer vitrine.
// Componentes reutilizáveis economizam código e garantem padrão visual.

import { useCarrinho } from '../../context/CarrinhoContext'
import { formatarMoeda } from '../../utils/formatar'
import './ProdutoCard.css'

export default function ProdutoCard({ produto }) {
  // Acesso a função adicionar direto do Context (sem passar prop)
  const { adicionar } = useCarrinho()

  return (
    <div className="card-produto">
      {/* Etiqueta condicional: só aparece se o produto for mais vendido */}
      {produto.maisVendido && <span className="tag-card">🔥 MAIS VENDIDO</span>}

      <div className="card-foto">
        {/* Se existir foto real, mostro a imagem; senão, uso o emoji */}
        {produto.foto ? <img src={produto.foto} alt={produto.nome} /> : produto.emoji}
      </div>

      <div className="card-corpo">
        <h3>{produto.nome}</h3>
        <p>{produto.descricao}</p>
        <div className="card-rodape">
          <strong className="card-preco">{formatarMoeda(produto.preco)}</strong>
          <button className="btn btn-primario btn-add" onClick={() => adicionar(produto)}>
            ＋
          </button>
        </div>
      </div>
    </div>
  )
}
