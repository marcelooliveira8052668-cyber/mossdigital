// Estou construindo o CARDÁPIO — a página principal do site.
// Ele tem abas de categoria (Lanches / Porções / Bebidas) e a lista
// de produtos muda conforme a aba clicada, usando um estado local.

import { useState } from 'react'
import { produtos, categorias } from '../../data/produtos'
import { useCarrinho } from '../../context/CarrinhoContext'
import { formatarMoeda } from '../../utils/formatar'
import './Cardapio.css'

export default function Cardapio() {
  // Estado da aba ativa: começa mostrando "lanches"
  const [categoriaAtiva, setCategoriaAtiva] = useState('lanches')

  // Acesso adicionar direto do Context do carrinho
  const { adicionar } = useCarrinho()

  // Filtra os produtos da categoria selecionada
  const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva)

  return (
    <section className="secao" id="cardapio">
      <div className="container">
        <h2 className="titulo-secao">Nosso cardápio</h2>
        <p className="subtitulo-secao">Escolha, adicione no carrinho e envie pelo WhatsApp</p>

        {/* Abas de categoria — botões reutilizáveis gerados pelo map */}
        <div className="categorias">
          {categorias.map(cat => (
            <button
              key={cat.id}
              // Troco a classe conforme a aba ativa (estilo muda automaticamente)
              className={`categoria ${categoriaAtiva === cat.id ? 'ativa' : ''}`}
              onClick={() => setCategoriaAtiva(cat.id)}
            >
              {cat.emoji} {cat.nome}
            </button>
          ))}
        </div>

        {/* Lista de produtos da categoria escolhida */}
        <div className="lista-produtos">
          {produtosFiltrados.map(produto => (
            <div className="item-produto" key={produto.id}>
              <div className="item-emoji">
                {/* Foto real se existir; senão, emoji de reserva */}
                {produto.foto ? <img src={produto.foto} alt={produto.nome} /> : produto.emoji}
              </div>

              <div className="item-dados">
                <h3>
                  {produto.nome}
                  {produto.maisVendido && <span className="selo-mais">🔥 MAIS VENDIDO</span>}
                </h3>
                <p>{produto.descricao}</p>
              </div>

              <div className="item-acoes">
                <strong className="item-preco">{formatarMoeda(produto.preco)}</strong>
                <button className="btn-add-lista" onClick={() => adicionar(produto)}>
                  ＋
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
