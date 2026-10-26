// Estou criando a seção "Sobre nós": conta a história do negócio
// e reforça a confiança com números (fatos que o cliente valoriza).

import './Sobre.css'

// Dados dos diferenciais — lista reutilizável para fácil edição
const diferenciais = [
  { emoji: '🥩', titulo: 'Blend artesanal', texto: 'Carne moída na hora, tempero da casa' },
  { emoji: '⚡', titulo: 'Entrega rápida', texto: 'Em até 40 minutos no bairro' },
  { emoji: '🌱', titulo: 'Ingredientes frescos', texto: 'Pão do dia, verdura crocante' },
  { emoji: '💬', titulo: 'Pedido sem app', texto: 'Tudo pelo site e WhatsApp' },
]

export default function Sobre() {
  return (
    <section className="secao" id="sobre">
      <div className="container sobre-conteudo">
        <div className="sobre-texto">
          <h2 className="titulo-secao texto-esq">Sobre a MOSS Burger</h2>
          <p>
            Nascemos da paixão por hambúrguer de verdade: pão macio, carne suculenta
            e aquele sabor que faz você voltar no dia seguinte. Sempre com
            ingredientes frescos e aquele capricho de quem faz comida com carinho.
          </p>
          <p>
            Peça pelo site, envie no WhatsApp e receba quentinho na sua casa.
            Simples assim — <b>sabor de verdade, do primeiro ao último pedaço.</b>
          </p>

          {/* Números de credibilidade (dados fictícios) */}
          <div className="sobre-numeros">
            <div><strong>5k+</strong><span>pedidos entregues</span></div>
            <div><strong>4,9</strong><span>avaliação média</span></div>
            <div><strong>30min</strong><span>entrega média</span></div>
          </div>
        </div>

        <div className="sobre-diferenciais">
          {diferenciais.map(d => (
            <div className="diferencial" key={d.titulo}>
              <span className="diferencial-emoji">{d.emoji}</span>
              <div>
                <h3>{d.titulo}</h3>
                <p>{d.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
