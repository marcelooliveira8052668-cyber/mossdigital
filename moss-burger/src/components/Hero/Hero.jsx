// Estou criando o BANNER PRINCIPAL do site (o "hero").
// Estilo fast-food: fundo claro, título enorme e pesado com destaque
// amarelo, preço-iscão, botão amarelo icônico e a FOTO REAL do lanche.
// Abaixo dele, uma faixa de ofertas que desliza sozinha — o "banner
// promocional" que chama a atenção de quem entra no site.

import './Hero.css'

export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="container hero-conteudo">
        <div className="hero-texto">
          <span className="hero-selo">🔥 Hambúrguer na brasa</span>

          <h1>
            Os melhores lanches <span>do bairro</span>
          </h1>

          <p>
            Blend artesanal, pão brioche tostado e ingredientes frescos.
            Peça pelo site e envie pelo WhatsApp — sem app, sem fila.
          </p>

          {/* Preço-iscão: âncora de preço como nos cardápios de fast-food */}
          <div className="hero-preco">
            a partir de <b>R$ 22,90</b>
          </div>

          <div className="hero-botoes">
            <a href="#cardapio" className="btn btn-primario">🍔 Ver cardápio</a>
            <a href="#promocoes" className="btn btn-secundario">🔥 Promoções</a>
          </div>
        </div>

        {/* Lado visual: foto real do lanche em círculo com anel amarelo */}
        <div className="hero-visual">
          <div className="hero-fundo" aria-hidden="true" />
          <img
            className="hero-foto"
            src="fotos/classico.jpg"
            alt="Hambúrguer MOSS Clássico"
          />
          <div className="hero-etiqueta etq1">🛵 Entrega em 30min</div>
          <div className="hero-etiqueta etq2">⭐ 4,9 no bairro</div>
        </div>
      </div>

      {/* Faixa de ofertas deslizante (estilo banner de campanha) */}
      <div className="faixa-ofertas">
        <div className="faixa-trilho">
          {/* O texto se repete 2x: assim a animação dá a volta sem "buraco" */}
          <span>
            COMBO CASAL R$ 59,90 ★ ENTREGA GRÁTIS ACIMA DE R$ 60 ★
            TERÇA DO BACON COM 25% OFF ★ PEÇA PELO SITE ★
          </span>
          <span aria-hidden="true">
            COMBO CASAL R$ 59,90 ★ ENTREGA GRÁTIS ACIMA DE R$ 60 ★
            TERÇA DO BACON COM 25% OFF ★ PEÇA PELO SITE ★
          </span>
        </div>
      </div>
    </section>
  )
}
