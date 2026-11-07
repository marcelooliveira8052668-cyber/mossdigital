// Importa a função que ajuda a descrever a configuração local do Vite.
import { defineConfig } from 'vite';
// Exporta uma configuração independente, sem alterar os outros projetos.
export default defineConfig({
  base: './', // Permite servir os arquivos em um subdiretório, como demos/moss-city/.
  build: { outDir: 'dist' }, // Mantém o resultado compilado separado do código didático.
}); // Encerra a configuração desta demonstração.
