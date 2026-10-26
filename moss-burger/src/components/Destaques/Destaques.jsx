// Estou criando a seção "Mais pedidos": filtro do banco de dados
// pelos produtos marcados com destaque:true e exibo em grade.
// Reaproveito o ProdutoCard — reutilização de componentes em ação.

import { produtos } from '../../data/produtos'
import ProdutoCard from '../ProdutoCard/ProdutoCard'
import './Destaques.css'

export default function Destaques() {
  // filter = "selecione só os produtos com destaque ativado"
  const destaques = produtos.filter(p => p.destaque)

  return (
    <section className="secao destaques">
      <div className="container">
        <h2 className="titulo-secao">🔥 Os mais pedidos</h2>
        <p className="subtitulo-secao">Os queridinhos da galera do bairro</p>

        <div className="grade-cards">
          {/* map = "para cada produto, desenhe um card" */}
          {destaques.map(produto => (
            <ProdutoCard key={produto.id} produto={produto} />
          ))}
        </div>
      </div>
    </section>
  )
}
