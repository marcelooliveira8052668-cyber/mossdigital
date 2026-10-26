// Estou criando a seção de PROMOÇÕES: combos com preço "riscado"
// (preço cheio + preço com desconto) — técnica de marketing que
// aumenta muito a percepção de economia e as vendas.

import { promocoes } from '../../data/produtos'
import { useCarrinho } from '../../context/CarrinhoContext'
import { formatarMoeda } from '../../utils/formatar'
import './Promocoes.css'

export default function Promocoes() {
  const { adicionar } = useCarrinho()

  return (
    <section className="secao promocoes" id="promocoes">
      <div className="container">
        <h2 className="titulo-secao claro">Promoções da semana</h2>
        <p className="subtitulo-secao claro">Combos com preço especial — enquanto durar o estoco 😏</p>

        <div className="grade-promocoes">
          {promocoes.map(promo => {
            // Cálculo do desconto em % para exibir na etiqueta
            const desconto = Math.round((1 - promo.preco / promo.precoAntigo) * 100)

            return (
              <div className="card-promocao" key={promo.id}>
                <span className="selo-desconto">-{desconto}%</span>
                <div className="promo-emoji">{promo.emoji}</div>
                <h3>{promo.nome}</h3>
                <p>{promo.descricao}</p>
                <div className="promo-precos">
                  <s>{formatarMoeda(promo.precoAntigo)}</s>
                  <strong>{formatarMoeda(promo.preco)}</strong>
                </div>
                <button
                  className="btn btn-secundario"
                  onClick={() => adicionar({ ...promo, categoria: 'promocao' })}
                >
                  Aproveitar oferta
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
