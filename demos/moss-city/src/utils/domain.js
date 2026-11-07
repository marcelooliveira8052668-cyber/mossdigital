// Formata números para leitura em português sem alterar seus valores originais.
export const number = (value) => Number(value).toLocaleString('pt-BR');
// Formata os valores fictícios em reais, sem realizar pagamentos.
export const money = (value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
// Retorna a data local sem converter o dia para outro fuso horário.
export const today = () => new Date().toLocaleDateString('sv-SE');
// Produz um identificador interno independente de nomes ou documentos de pessoas.
export const newId = () => crypto.randomUUID();
// Gera um protocolo explicitamente fictício e verifica se ele já foi usado nesta coleção.
export function nextProtocol(requests, year = new Date().getFullYear()) {
  const prefix = `DEMO-${year}-`; // Identifica o ano e o caráter demonstrativo do protocolo.
  const highest = requests.filter((item) => item.protocol.startsWith(prefix)).reduce((max, item) => Math.max(max, Number(item.protocol.slice(prefix.length)) || 0), 0); // Localiza a maior sequência já registrada.
  return `${prefix}${String(highest + 1).padStart(5, '0')}`; // Entrega uma nova sequência sem reutilizar protocolos excluídos do conjunto atual.
} // Encerra a criação de protocolos locais.
// Reserva o próximo protocolo considerando também sequências já excluídas do cenário.
export function reserveProtocol(requests, counters = {}, year = new Date().getFullYear()) {
  const prefix = `DEMO-${year}-`; // Monta o prefixo do ano usado nesta reserva.
  const reserved = { protocol: `${prefix}${String(counters[year] || 0).padStart(5, '0')}` }; // Reapresenta a maior sequência já usada, mesmo que aquele registro tenha sido excluído.
  return nextProtocol([...requests, reserved], year); // Entrega um código maior que tudo o que já existiu neste ano.
} // Encerra a reserva de protocolo demonstrativo.
// Filtra pontos de forma compartilhada entre o mapa e a lista acessível.
export function filterPoints(points, filters) {
  return points.filter((item) => (!filters.category || item.category === filters.category) && (!filters.district || item.district === filters.district) && (!filters.status || item.status === filters.status) && `${item.name} ${item.district}`.toLocaleLowerCase('pt-BR').includes((filters.search || '').toLocaleLowerCase('pt-BR'))); // Aplica todos os filtros ao mesmo conjunto de registros.
} // Encerra os filtros do território.
// Calcula o resumo sem inventar números desvinculados dos registros.
export function summarize(data) {
  const works = data.points.filter((item) => item.category === 'obras'); // Separa as obras do cadastro territorial.
  const done = data.requests.filter((item) => item.status === 'Concluída'); // Conta os serviços finalizados no cenário inteiro.
  return { population: data.city.population, requests: data.requests.length, completed: done.length, pending: data.requests.length - done.length, works: works.filter((item) => item.status === 'Em execução').length, schools: data.points.filter((item) => item.category === 'educacao').length, health: data.points.filter((item) => item.category === 'saude').length, lights: data.points.filter((item) => item.category === 'iluminacao').length, greens: data.points.filter((item) => item.category === 'ambiente' && item.kind === 'Parque').length, budget: works.reduce((sum, item) => sum + item.budget, 0), spent: data.expenses.reduce((sum, item) => sum + item.amount, 0), serviceRate: data.requests.length ? Math.round(done.length / data.requests.length * 100) : 0 }; // Entrega valores derivados para todos os componentes.
} // Encerra o resumo demonstrativo.
// Valida o formulário sem aceitar textos vazios ou excessivamente extensos.
export function requestError(values) {
  if (!values.title?.trim() || !values.description?.trim()) return 'Preencha o assunto e a descrição usando somente informações fictícias.'; // Recusa campos compostos apenas de espaços.
  if (values.title.trim().length < 5 || values.description.trim().length < 15) return 'Use ao menos 5 caracteres no assunto e 15 na descrição.'; // Solicita detalhes suficientes para a simulação.
  if (values.title.length > 100 || values.description.length > 1000) return 'O texto ultrapassou o limite permitido.'; // Evita registros excessivamente grandes no navegador.
  return ''; // Uma resposta vazia significa que o texto está válido.
} // Encerra a validação do formulário.
