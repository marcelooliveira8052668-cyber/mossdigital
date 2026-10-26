// Estou criando o botão flutuante de WhatsApp: fica sempre visível
// no canto da tela, como um atalho pra tirar dúvidas rápidas.
// É um dos elementos que MAIS geram conversão em sites de lanchonete.

import './BotaoWhats.css'

export default function BotaoWhats() {
  return (
    <a
      className="zap-flutuante"
      // Mensagem inicial pronta: a pessoa já manda contexto do contato
      href="https://wa.me/5500900000000?text=Oi! Vim pelo site da MOSS Burger 😊"
      target="_blank"   // abre em nova aba
      rel="noreferrer"  // boa prática de segurança ao sair do site
      aria-label="Falar no WhatsApp"
    >
      💬
    </a>
  )
}
