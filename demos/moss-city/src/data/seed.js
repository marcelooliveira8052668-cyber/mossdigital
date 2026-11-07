// Importa a data local para os exemplos da demonstração.
import { today } from '../utils/domain.js';
// Importa as categorias de serviços e os bairros fictícios.
import { serviceCategories, districts } from './scenario.js';
// Importa a evolução de esquema para entregar o cenário já no formato completo dos módulos.
import { normalizeScenario } from '../services/schema.js';
// Cria um conjunto independente de dados sempre que a demonstração é restaurada.
export function createSeed() {
  const date = today(); // Guarda a referência de data do cenário inicial.
  const rawPoints = [ // Descreve locais inventados sobre a cartografia esquemática.
    ['Corredor Norte', 'obras', 'Distrito Norte', -23.533, -46.635, 'Em execução', 'Via', 2750000, 68], // Obra viária usada como intervenção principal.
    ['Praça das Conexões', 'obras', 'Centro Cívico', -23.548, -46.627, 'Em execução', 'Praça', 920000, 42], // Obra urbana em fase intermediária.
    ['Drenagem Vila das Águas', 'obras', 'Vila das Águas', -23.565, -46.615, 'Planejada', 'Drenagem', 1850000, 0], // Projeto ainda não iniciado.
    ['Passarela Jardim Aurora', 'obras', 'Jardim Aurora', -23.552, -46.653, 'Concluída', 'Passarela', 740000, 100], // Projeto demonstrativo concluído.
    ['Escola Horizonte', 'educacao', 'Centro Cívico', -23.543, -46.642, 'Operacional', 'Escola', 0, 0], // Unidade educacional fictícia.
    ['Escola Caminhos', 'educacao', 'Distrito Norte', -23.531, -46.616, 'Operacional', 'Escola', 0, 0], // Segunda escola de exemplo.
    ['Escola das Águas', 'educacao', 'Vila das Águas', -23.564, -46.632, 'Operacional', 'Escola', 0, 0], // Terceira escola de exemplo.
    ['Unidade Saúde Central', 'saude', 'Centro Cívico', -23.551, -46.637, 'Operacional', 'Unidade de saúde', 0, 0], // Serviço de saúde fictício.
    ['Unidade Saúde Aurora', 'saude', 'Jardim Aurora', -23.541, -46.657, 'Operacional', 'Unidade de saúde', 0, 0], // Segunda unidade demonstrativa.
    ['Parque das Nascentes', 'ambiente', 'Jardim Aurora', -23.533, -46.654, 'Operacional', 'Parque', 0, 0], // Parque de demonstração sem vínculo com local real.
    ['Parque Linear das Águas', 'ambiente', 'Vila das Águas', -23.568, -46.643, 'Operacional', 'Parque', 0, 0], // Segundo parque do cenário.
    ['Ecoponto Conexão', 'ambiente', 'Distrito Norte', -23.529, -46.646, 'Operacional', 'Ecoponto', 0, 0], // Ponto fictício de coleta seletiva.
    ['Terminal Horizonte', 'mobilidade', 'Centro Cívico', -23.554, -46.621, 'Operacional', 'Terminal', 0, 0], // Terminal fictício de transporte.
    ['Ciclovia Aurora', 'mobilidade', 'Jardim Aurora', -23.549, -46.66, 'Em manutenção', 'Ciclovia', 0, 0], // Trecho cicloviário demonstrativo.
    ['Ponto Avenida Central', 'mobilidade', 'Centro Cívico', -23.543, -46.629, 'Operacional', 'Ponto de ônibus', 0, 0], // Ponto de ônibus do cenário.
    ['Iluminação Alameda Um', 'iluminacao', 'Distrito Norte', -23.537, -46.624, 'Em manutenção', 'Ponto de iluminação', 0, 0], // Ponto com atendimento fictício pendente.
    ['Iluminação Parque Linear', 'iluminacao', 'Vila das Águas', -23.562, -46.653, 'Operacional', 'Ponto de iluminação', 0, 0], // Segundo ponto de iluminação.
    ['Iluminação Centro Cívico', 'iluminacao', 'Centro Cívico', -23.549, -46.645, 'Operacional', 'Ponto de iluminação', 0, 0], // Terceiro ponto de iluminação.
  ]; // Encerra os locais da primeira prévia.
  const points = rawPoints.map(([name, category, district, lat, lng, status, kind, budget, progress], index) => ({ id: `point-${index + 1}`, name, category, district, lat, lng, status, kind, budget, progress, description: `${kind} de demonstração no bairro fictício ${district}. Não representa infraestrutura ou serviço municipal real.` })); // Transforma cada linha em um registro legível pela interface.
  const requests = Array.from({ length: 36 }, (_, index) => { // Cria seis meses com volumes diferentes para alimentar gráficos reais.
    const monthIndex = Math.min(5, Math.floor(Math.sqrt(index / 36) * 6)); // Distribui mais exemplos nos meses recentes sem usar números fixos no componente gráfico.
    const month = new Date(new Date().getFullYear(), new Date().getMonth() - 5 + monthIndex, 3 + (index % 6) * 3); // Define o dia de criação do exemplo dentro do mês correspondente.
    if (month > new Date()) month.setDate(new Date().getDate()); // Impede que uma solicitação inicial pareça ter sido registrada no futuro.
    return { // Entrega um registro independente para cada solicitação fictícia.
      id: `request-${index + 1}`, // Define o identificador interno sem dados pessoais.
      protocol: `DEMO-${month.getFullYear()}-${String(index + 1).padStart(5, '0')}`, // Mantém o ano do protocolo coerente com a data de criação.
      title: ['Luminária demonstrativa apagada', 'Limpeza de praça fictícia', 'Revisão de pavimento simulado', 'Cuidados com jardim demonstrativo', 'Coleta seletiva de exemplo', 'Serviço urbano demonstrativo'][index % 6], // Alterna assuntos compatíveis com as categorias disponíveis.
      category: serviceCategories[index % 6], // Associa cada assunto a uma categoria de atendimento.
      district: districts[index % 4], // Distribui solicitações pelos bairros inventados.
      description: 'Registro inicial inteiramente fictício para explorar o acompanhamento de serviços.', // Explica o caráter demonstrativo da ocorrência.
      status: index % 4 === 0 ? 'Aberta' : index % 4 === 1 ? 'Em atendimento' : 'Concluída', // Cria diferentes situações para testar filtros e indicadores.
      date: month.toLocaleDateString('sv-SE'), // Usa uma data local no formato ano-mês-dia.
      owner: index % 3 === 0 ? 'citizen-demo' : 'seed', // Separa os registros visíveis para o cidadão fictício dos demais exemplos.
      history: [{ date: month.toLocaleDateString('sv-SE'), text: 'Registro fictício incluído no cenário inicial.' }], // Guarda o primeiro evento do acompanhamento.
    }; // Encerra a construção da solicitação atual.
  }); // Encerra a lista de solicitações iniciais.
  return normalizeScenario({ city: { name: 'Nova Aurora', population: 128450, referenceDate: date }, points, requests, expenses: [{ id: 'expense-1', sector: 'Infraestrutura', amount: 1180000, date }, { id: 'expense-2', sector: 'Mobilidade', amount: 480000, date }, { id: 'expense-3', sector: 'Meio ambiente', amount: 325000, date }, { id: 'expense-4', sector: 'Serviços urbanos', amount: 210000, date }], protocolCounters: {} }); // Entrega dados completos, coerentes e independentes, sem informações pessoais reais.
} // Encerra a fábrica de dados demonstrativos.
