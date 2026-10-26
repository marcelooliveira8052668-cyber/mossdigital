// Estou montando o SITE INTEIRO aqui: como um quebra-cabeça,
// cada componente entra na sua ordem lógica de leitura da página.
// Este é o único lugar que "conhece" todos os componentes.
//
// NOVIDADE: a rota escondida #admin. Se o endereço terminar em
// #admin, o dono vê o PAINEL; caso contrário, vê a LOJA.

import { useEffect, useState } from 'react'

import Header from './components/Header/Header'
import Hero from './components/Hero/Hero'
import Destaques from './components/Destaques/Destaques'
import Cardapio from './components/Cardapio/Cardapio'
import Promocoes from './components/Promocoes/Promocoes'
import Sobre from './components/Sobre/Sobre'
import Extras from './components/Extras/Extras'
import Pagamentos from './components/Pagamentos/Pagamentos'
import Contato from './components/Contato/Contato'
import Rodape from './components/Rodape/Rodape'
import Carrinho from './components/Carrinho/Carrinho'
import BotaoWhats from './components/BotaoWhats/BotaoWhats'
import PainelAdmin from './components/PainelAdmin/PainelAdmin'

export default function App() {
  // Verifico se o endereço tem #admin (estado inicial)
  const [admin, setAdmin] = useState(window.location.hash === '#admin')

  // Escuto mudanças do "#" da URL: assim o visitante pode alternar
  // entre loja (#inicio) e painel (#admin) sem recarregar a página.
  useEffect(() => {
    function verificarHash() {
      setAdmin(window.location.hash === '#admin')
    }
    window.addEventListener('hashchange', verificarHash)
    return () => window.removeEventListener('hashchange', verificarHash)
  }, [])

  // Painel administrativo (rota escondida)
  if (admin) return <PainelAdmin />

  // Loja normal (o que todo mundo vê)
  return (
    <>
      {/* Fragmento <> </> agrupa sem criar uma div extra na página */}

      <Header />

      <main>
        <Hero />
        <Destaques />
        <Cardapio />
        <Promocoes />
        <Sobre />
        <Extras />
        <Pagamentos />
        <Contato />
      </main>

      <Rodape />

      {/* Elementos "flutuantes": existem mas não ocupam espaço no fluxo */}
      <Carrinho />
      <BotaoWhats />
    </>
  )
}
