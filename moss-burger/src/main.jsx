// Estou usando o StrictMode do React: ele ajuda a encontrar erros
// comuns (como variáveis esquecidas) já durante o desenvolvimento.
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// import global do estilo (variáveis de cor, reset e utilitários)
import './index.css'

// Meu componente principal (App) e o provedor do carrinho
import App from './App.jsx'
import { CarrinhoProvider } from './context/CarrinhoContext.jsx'

// CrioRoot "desenha" a aplicação dentro da div #root do index.html.
// O CarrinhoProvider envolve o App inteiro para que QUALQUER componente
// consiga acessar o carrinho sem precisar passar propriedades por 10 níveis.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </StrictMode>,
)
