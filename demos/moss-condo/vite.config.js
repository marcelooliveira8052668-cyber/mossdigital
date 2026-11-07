// Importa a função que ajuda o Vite a reconhecer suas configurações.
import { defineConfig } from 'vite';
// Exporta configurações exclusivas desta demonstração, sem mudar o site principal.
export default defineConfig({
  base: './', // Usa endereços relativos para funcionar também em subdiretórios.
  build: { outDir: 'dist' }, // Guarda o build em dist; os imports dinâmicos separam automaticamente as telas e os gráficos.
}); // Encerra a configuração local.
