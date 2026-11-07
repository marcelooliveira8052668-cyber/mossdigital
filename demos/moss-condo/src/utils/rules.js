// Formata valores fictícios em reais, sem fazer qualquer cobrança.
export const money = (value) => Number(value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
// Retorna a data local no formato usado pelos campos de calendário.
export const today = () => new Date().toLocaleDateString('sv-SE');
// Cria um identificador único para cada novo registro fictício.
export const identifier = () => crypto.randomUUID();
// Verifica se uma reserva ativa ocupa parte do mesmo horário na mesma área.
export const overlaps = (items, candidate) => items.some((item) => item.id !== candidate.id && item.status !== 'Cancelada' && item.area === candidate.area && item.date === candidate.date && item.start < candidate.end && candidate.start < item.end);
// Valida a reserva antes de permitir que ela entre na agenda.
export function reservationError(items, candidate) {
  if (candidate.date < today()) return 'Escolha hoje ou uma data futura.'; // Impede uma nova reserva no passado.
  if (candidate.start >= candidate.end) return 'O horário final precisa ser depois do inicial.'; // Confere a ordem dos horários.
  if (overlaps(items, candidate)) return 'Esta área já está reservada nesse horário.'; // Impede horários sobrepostos.
  return ''; // Uma mensagem vazia significa que os dados passaram na validação.
} // Encerra a validação da reserva.
