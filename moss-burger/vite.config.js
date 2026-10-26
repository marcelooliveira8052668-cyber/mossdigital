// Estou configurando o Vite, que é o "empacotador" do projeto:
// ele transforma meu código React em arquivos que o navegador entende
// e sobe um servidor de desenvolvimento super rápido.
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O plugin react adiciona recursos como "Hot Reload"
// (recarregar a página sozinho quando eu salvo uma alteração).
export default defineConfig({
  plugins: [react()],
  // base './' = caminhos RELATIVOS nos arquivos gerados.
  // Motivo: assim o site funciona em qualquer endereço,
  // inclusive em subpastas como mossdigital.com.br/moss-burger-online/
  base: './',
})
