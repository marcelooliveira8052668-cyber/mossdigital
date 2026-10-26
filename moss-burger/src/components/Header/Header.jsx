// Estou criando o cabeçalho fixo do site: logo, menu de navegação
// e o botão do carrinho com o contador de itens em tempo real.

import { useState } from 'react'
import { useCarrinho } from '../../context/CarrinhoContext'
import './Header.css'

export default function Header() {
  // Estado do menu hambúrguer (fechado por padrão no celular)
  const [menuAberto, setMenuAberto] = useState(false)

  // Acesso o carrinho pelo Context: preciso só do total e do botão abrir
  const { totalItens, setPainelAberto } = useCarrinho()

  return (
    <header className="header">
      <div className="container header-conteudo">

        {/* Logo em SVG: vetor = nítida em qualquer tamanho e pesa bytes */}
        <a href="#inicio" className="logo" onClick={() => setMenuAberto(false)}>
          <svg viewBox="0 0 48 48" width="44" height="44" aria-label="Logo MOSS Burger">
            <rect width="48" height="48" rx="12" fill="#171717" />
            <path d="M10 20 Q24 6 38 20 Z" fill="#FFC857" />
            <rect x="10" y="22" width="28" height="4" rx="2" fill="#E63946" />
            <path d="M10 28 Q24 40 38 28 Z" fill="#FFC857" />
          </svg>
          <span>MOSS <b>Burger</b></span>
        </a>

        {/* Menu: os mesmos números das seções do wireframe */}
        <nav className={`menu ${menuAberto ? 'aberto' : ''}`}>
          <a href="#inicio" onClick={() => setMenuAberto(false)}>Início</a>
          <a href="#cardapio" onClick={() => setMenuAberto(false)}>Cardápio</a>
          <a href="#promocoes" onClick={() => setMenuAberto(false)}>Promoções</a>
          <a href="#sobre" onClick={() => setMenuAberto(false)}>Sobre nós</a>
          <a href="#contato" onClick={() => setMenuAberto(false)}>Contato</a>
        </nav>

        <div className="header-acoes">
          {/* Botão de entrada no Depósito (área do dono) */}
          <a className="btn-deposito" href="#admin" title="Área do dono">
            📦 <span className="txt-deposito">Depósito</span>
          </a>

          {/* Botão do carrinho: abre o painel lateral */}
          <button className="btn-carrinho" onClick={() => setPainelAberto(true)} aria-label="Abrir carrinho">
            🛒 {totalItens > 0 && <span className="badge">{totalItens}</span>}
          </button>

          {/* Hambúrguer: só aparece no celular */}
          <button className="btn-hamburger" onClick={() => setMenuAberto(!menuAberto)} aria-label="Abrir menu">
            {menuAberto ? '✕' : '☰'}
          </button>
        </div>

      </div>
    </header>
  )
}
