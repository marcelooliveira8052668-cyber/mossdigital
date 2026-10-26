// Estou criando a seção de CONTATO com um formulário funcional:
// quando a pessoa envia, o site monta a mensagem e abre o WhatsApp.
// Assim o "formulário" na prática vira um pedido de contato —
// sem precisar de servidor, banco de dados ou serviço pago.

import { useState } from 'react'
import './Contato.css'

// Número fictício (sem dados pessoais reais)
const WHATSAPP = '5500900000000'

export default function Contato() {
  // Estado do formulário: um objeto com todos os campos
  const [formulario, setFormulario] = useState({
    nome: '',
    telefone: '',
    assunto: 'Dúvida sobre pedido',
    mensagem: '',
  })

  // Atualizo o campo correto usando uma "chave dinâmica":
  // [e.target.name] pega o name do input (nome, telefone...)
  function handleChange(e) {
    setFormulario({ ...formulario, [e.target.name]: e.target.value })
  }

  // Ao enviar, monto o texto e abro o WhatsApp com tudo pronto
  function handleSubmit(e) {
    e.preventDefault() // impedindo o recarregamento padrão da página

    const texto =
      `*Contato pelo site — MOSS BURGER*\n` +
      `👤 *Nome:* ${formulario.nome}\n` +
      `📞 *Telefone:* ${formulario.telefone}\n` +
      `📌 *Assunto:* ${formulario.assunto}\n` +
      `💬 *Mensagem:* ${formulario.mensagem}`

    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(texto)}`, '_blank')
  }

  return (
    <section className="secao contato" id="contato">
      <div className="container">
        <h2 className="titulo-secao claro">Fale com a gente</h2>
        <p className="subtitulo-secao claro">Dúvidas, elogios ou pedidos especiais? Estamos no WhatsApp</p>

        <div className="contato-grade">
          {/* Coluna 1: informações de localização */}
          <div className="contato-info">
            <div className="cartao-info">📍 <div><h3>Endereço</h3><p>Rua das Palmeiras, 123 — Centro</p></div></div>
            <div className="cartao-info">🕐 <div><h3>Funcionamento</h3><p>Terça a domingo, 18h às 23h30</p></div></div>
            <div className="cartao-info">🛵 <div><h3>Entrega</h3><p>Taxa R$6 até 3km · Grátis acima de R$60</p></div></div>
          </div>

          {/* Coluna 2: formulário */}
          <form className="formulario" onSubmit={handleSubmit}>
            <input
              type="text" name="nome" placeholder="Seu nome" required
              value={formulario.nome} onChange={handleChange}
            />
            <input
              type="tel" name="telefone" placeholder="Seu WhatsApp (com DDD)" required
              value={formulario.telefone} onChange={handleChange}
            />
            <select name="assunto" value={formulario.assunto} onChange={handleChange}>
              <option>Dúvida sobre pedido</option>
              <option>Pedido especial / evento</option>
              <option>Trabalhe conosco</option>
              <option>Outro assunto</option>
            </select>
            <textarea
              name="mensagem" rows="4" placeholder="Escreva sua mensagem..." required
              value={formulario.mensagem} onChange={handleChange}
            />
            <button type="submit" className="btn btn-secundario">
              📱 Enviar pelo WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}
