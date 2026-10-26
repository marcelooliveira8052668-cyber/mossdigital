// Estou criando o rodapé: fechamento visual do site com créditos,
// horários e um resumo das seções (também ajuda no SEO).

import './Rodape.css'

export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="container rodape-grade">
        <div>
          <h3 className="rodape-logo">🍔 MOSS <b>Burger</b></h3>
          <p>Sabor de verdade, do primeiro ao último pedaço.</p>
        </div>

        <div>
          <h4>Navegação</h4>
          <a href="#cardapio">Cardápio</a>
          <a href="#promocoes">Promoções</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#contato">Contato</a>
        </div>

        <div>
          <h4>Atendimento</h4>
          <p>Terça a Domingo</p>
          <p>18h às 23h30</p>
          <p>Rua das Palmeiras, 123</p>
        </div>
      </div>

      <div className="rodape-base">
        <p>© 2026 MOSS Burger — Todos os direitos reservados</p>
        <p>Site desenvolvido por <b>MOSS Digital</b> ⚡</p>
      </div>
    </footer>
  )
}
