// Centraliza os nomes de perfis fictícios, sem criar contas ou autenticação real.
export const profiles = { administrador: 'Administrador', obras: 'Gestor de obras', ambiental: 'Gestor ambiental', cidadao: 'Cidadão' };
// Define as categorias do território e suas cores contrastantes no mapa escuro.
export const categories = {
  obras: { label: 'Obras', color: '#ffbd69', symbol: 'O', photo: 'obras' }, // Identifica intervenções de infraestrutura fictícias.
  educacao: { label: 'Educação', color: '#a8a2ff', symbol: 'E', photo: 'cidade' }, // Identifica escolas de demonstração.
  saude: { label: 'Saúde', color: '#ff91ad', symbol: 'S', photo: 'cidade' }, // Identifica unidades de saúde inventadas.
  ambiente: { label: 'Meio ambiente', color: '#32d6a0', symbol: 'A', photo: 'parque' }, // Identifica parques e ecopontos fictícios.
  mobilidade: { label: 'Mobilidade', color: '#00d4ff', symbol: 'M', photo: 'mobilidade' }, // Identifica transporte e manutenção viária fictícios.
  iluminacao: { label: 'Iluminação', color: '#e8d374', symbol: 'L', photo: 'avenida' }, // Identifica pontos demonstrativos de iluminação.
}; // Encerra o catálogo de categorias urbanas.
// Define os setores de atendimento usados nos protocolos de demonstração.
export const serviceCategories = ['Iluminação pública', 'Limpeza urbana', 'Buracos nas vias', 'Manutenção de praças', 'Coleta de resíduos', 'Outros serviços'];
// Define bairros completamente fictícios, sem apresentar dados de bairros reais.
export const districts = ['Centro Cívico', 'Jardim Aurora', 'Distrito Norte', 'Vila das Águas'];
// Define o enquadramento geográfico de referência para os marcadores simulados.
export const mapBounds = [[-23.58, -46.67], [-23.52, -46.59]];
// Monta a base cartográfica autoral sem requisitar mapas externos.
export const schematicUrl = new URL('../assets/territorio.svg', import.meta.url).href;
