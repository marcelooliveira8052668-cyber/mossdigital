// Importa a data local usada somente para preencher campos que não existiam na primeira prévia.
import { today } from '../utils/domain.js';
// Complementa um cenário antigo sem excluir protocolos ou pontos cadastrados pelo visitante.
export function normalizeScenario(data) {
  const date = data.city.referenceDate || today(); // Preserva a referência temporal original do cenário.
  const points = data.points.map((point) => { // Percorre cada local do cenário antigo ou atual.
    const planned = point.status === 'Planejada'; // Identifica obras ainda sem início previsto.
    const concluded = point.status === 'Concluída'; // Identifica obras finalizadas dentro da demonstração.
    const start = new Date(`${date}T12:00:00`); // Prepara a data de início sem deslocar o dia por conversão UTC.
    if (!planned) start.setMonth(start.getMonth() - 2); // Começa obras em execução há dois meses da referência do cenário.
    const end = new Date(`${date}T12:00:00`); // Prepara a previsão de conclusão de forma independente.
    if (planned) end.setMonth(end.getMonth() + 6); // Dá seis meses de janela a quem ainda não iniciou.
    else if (!concluded) end.setMonth(end.getMonth() + 4); // Mantém quatro meses de previsão para obras em andamento.
    return { ...point, date: point.date || date, startDate: point.startDate || start.toLocaleDateString('sv-SE'), endDate: point.endDate || (concluded ? date : end.toLocaleDateString('sv-SE')), areaHa: point.areaHa ?? (point.kind === 'Parque' ? point.id === 'point-10' ? 12.5 : 8.4 : 0), frequency: point.frequency ?? (point.kind === 'Ponto de ônibus' ? 15 : 0), lengthKm: point.lengthKm ?? (point.kind === 'Ciclovia' ? 4.8 : 0), lineCode: point.lineCode || '', history: point.history || [{ date, text: 'Registro fictício inicial do território.' }] }; // Acrescenta campos ausentes sem substituir valores já preenchidos.
  }); // Encerra a atualização dos locais.
  const requests = data.requests.map((request) => ({ ...request, priority: request.priority || 'Média', sector: request.sector || 'Atendimento' })); // Preserva os protocolos e complementa apenas a triagem que faltava.
  const expenses = data.expenses.map((expense) => ({ ...expense, title: expense.title || `Lançamento fictício — ${expense.sector}`, status: expense.status || 'Registrada', history: expense.history || [{ date: expense.date, text: 'Lançamento demonstrativo inicial.' }] })); // Acrescenta descrição e histórico aos valores existentes.
  const protocolCounters = { ...data.protocolCounters }; // Preserva sequências já utilizadas mesmo após exclusões.
  requests.forEach((request) => { const match = /^DEMO-(\d{4})-(\d+)$/.exec(request.protocol); if (match) protocolCounters[match[1]] = Math.max(protocolCounters[match[1]] || 0, Number(match[2])); }); // Calcula a maior sequência de cada ano sem reutilizar protocolos apagados.
  return { ...data, schemaVersion: 2, points, requests, expenses, protocolCounters }; // Entrega a versão ampliada sem alterar o objeto original.
} // Encerra a evolução não destrutiva dos registros locais.
