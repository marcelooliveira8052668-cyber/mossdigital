// Importa apenas endereços locais; nenhuma fotografia será carregada de um domínio externo na visita.
const assets = import.meta.glob('../assets/photos/*.webp', { eager: true, query: '?url', import: 'default' });
// Descreve com precisão as imagens conferidas durante a seleção visual.
export const photos = {
  cidade: { alt: 'Edifícios residenciais e vegetação na paisagem urbana de São Paulo', position: '50% 48%', label: 'São Paulo · foto ilustrativa' }, // Contextualiza cidades brasileiras sem apresentar a foto como parte da cidade fictícia.
  avenida: { alt: 'Avenida Paulista ao entardecer, com luzes de veículos entre os edifícios', position: '50% 54%', label: 'São Paulo · foto ilustrativa' }, // Não transforma a fotografia de trânsito em informação de tráfego ao vivo.
  parque: { alt: 'Vista aérea da região do Parque Ibirapuera com áreas verdes, vias e edifícios', position: '50% 45%', label: 'São Paulo · foto ilustrativa' }, // Relaciona natureza, infraestrutura e cidade na mesma imagem.
  mobilidade: { alt: 'Ônibus urbano em uma rua de São Paulo, visto de frente', position: '50% 45%', label: 'Transporte · foto ilustrativa' }, // Não apresenta a linha fotografada como operada pela plataforma.
  obras: { alt: 'Vista aérea de canteiro de obras com estruturas, máquinas e uma via ao lado', position: '50% 50%', label: 'Infraestrutura · foto ilustrativa' }, // Evita atribuir uma localização não confirmada à imagem de infraestrutura.
}; // Encerra o catálogo de fotografias desta prévia.
// Localiza uma variante da fotografia sem depender do endereço de publicação.
export const photoUrl = (key, width = 1120) => assets[`../assets/photos/${key}-${width}.webp`];
