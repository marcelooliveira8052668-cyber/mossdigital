// Estou criando o banner principal (hero): a primeira coisa que o
// cliente vê. Ele precisa responder em 3 segundos: quem somos,
// o que vendemos e onde clicar. Por isso: slogan + 2 botões.

import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-conteudo">
        <div className="hero-texto">
          <span className="hero-selo">🔥 Hambúrguer na brasa</span>
          <h1>
            Sabor de verdade, do primeiro <span>ao último pedaço</span>
          </h1>
          <p>
            Blend artesanal, pão brioche tostado e ingredientes frescos.
            Monte seu pedido pelo site e envie direto no WhatsApp — rápido e sem app.
          </p>
          <div className="hero-botoes">
            <a href="#cardapio" className="btn btn-primario">🍔 Ver cardápio</a>
            <a href="#promocoes" className="btn btn-secundario">🔥 Promoções</a>
          </div>
        </div>

        {/* Área visual do hero: um "prato" estilizado com emoji gigante */}
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-circulo">🍔</div>
          <div className="hero-etiqueta etq1">🛵 Entrega rápida</div>
          <div className="hero-etiqueta etq2">⭐ 4,9 no bairro</div>
        </div>
      </div>
    </section>
  )
}
