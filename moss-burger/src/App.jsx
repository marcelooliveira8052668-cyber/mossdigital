// Estou montando o SITE INTEIRO aqui: como um quebra-cabeça,
// cada componente entra na sua ordem lógica de leitura da página.
// Este é o único lugar que "conhece" todos os componentes.

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

export default function App() {
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
