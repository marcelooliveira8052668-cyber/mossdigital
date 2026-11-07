// Importa os endereços locais das imagens; o Vite também os prepara para o build em subdiretório.
const assets = import.meta.glob('../assets/photos/*.webp', { eager: true, query: '?url', import: 'default' });
// Reúne descrições fiéis às fotos selecionadas, sem apresentá-las como um condomínio cliente.
export const photos = {
  fachada: { alt: 'Fachada de edifício residencial contemporâneo com varandas', position: '50% 45%' }, // Descreve a arquitetura da foto principal.
  residencia: { alt: 'Casa contemporânea cercada por jardim e árvores ao entardecer', position: '50% 55%' }, // Contextualiza a experiência residencial sem afirmar que a casa pertence ao condomínio fictício.
  recepcao: { alt: 'Ambiente de convivência com mesas, cadeiras e grandes janelas', position: '50% 58%' }, // Ilustra o acolhimento e a rotina da portaria.
  salao: { alt: 'Salão de eventos vazio, preparado com mesas e cadeiras', position: '50% 55%' }, // Mostra uma referência ilustrativa de salão de festas.
  churrasqueira: { alt: 'Detalhe da grelha de uma churrasqueira com carvão em brasa', position: '50% 50%' }, // Descreve a foto real sem prometer uma instalação específica.
  quadra: { alt: 'Raquete e bola de tênis sobre as linhas de uma quadra de saibro', position: '50% 45%' }, // Explica o detalhe esportivo sem inventar uma vista completa da quadra.
  gourmet: { alt: 'Sala de jantar contemporânea integrada a uma cozinha', position: '50% 60%' }, // Ilustra o espaço gourmet da demonstração.
  reunioes: { alt: 'Escritório com salas envidraçadas e área de circulação', position: '50% 55%' }, // Contextualiza reuniões e espaços comerciais.
  piscina: { alt: 'Piscina ao ar livre cercada por vegetação e espreguiçadeiras', position: '50% 65%' }, // Ilustra lazer e convivência sem acrescentar uma nova área reservável.
}; // Encerra o catálogo de descrições acessíveis.
// Retorna a variante local de tamanho solicitado, evitando links externos em tempo de execução.
export const photoUrl = (key, width = 1120) => assets[`../assets/photos/${key}-${width}.webp`];
// Relaciona as áreas comuns já existentes às fotos, sem mudar as regras das reservas.
export const areaPhotos = { 'Salão de festas': 'salao', Churrasqueira: 'churrasqueira', Quadra: 'quadra', 'Espaço gourmet': 'gourmet', 'Sala de reuniões': 'reunioes' };
// Define uma fotografia contextual para cada módulo administrativo ou operacional.
export const modulePhotos = { residents: 'residencia', finances: 'fachada', issues: 'reunioes', notices: 'piscina', visitors: 'recepcao', deliveries: 'gourmet' };
