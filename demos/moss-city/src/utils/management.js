// Importa definições usadas tanto na interface quanto nas operações de gravação.
import { modules, permissions, recordsFor, requestScope } from '../data/modules.js';
// Importa as categorias públicas do território para validação consistente.
import { categories } from '../data/scenario.js';
// Importa utilidades de data, identificação e validação do portal.
import { newId, reserveProtocol, requestError, today } from './domain.js';
// Confere se uma data representa um dia válido, incluindo meses com menos dias.
export const validDate = (value) => /^\d{4}-\d{2}-\d{2}$/.test(value || '') && new Date(`${value}T12:00:00`).toLocaleDateString('sv-SE') === value;
// Retorna os campos apropriados ao perfil e ao módulo sem criar cadastros de outro setor.
export function fieldsFor(moduleKey, profile) {
  return modules[moduleKey].fields.map((field) => field.key === 'category' && moduleKey === 'solicitacoes' && requestScope[profile] ? { ...field, options: requestScope[profile] } : field); // Limita a seleção de categorias também dentro do formulário administrativo.
} // Encerra a preparação de campos por perfil.
// Sorteia uma coordenada ilustrativa próxima ao centro do território, para que pontos novos não empilhem no mesmo lugar.
const variedCoord = (center, spread) => Number((center + (Math.random() * 2 - 1) * spread).toFixed(6)); // Devolve um número com seis casas, sempre dentro da faixa informada.
// Monta um registro novo com valores explícitos, sem informações pessoais reais.
export function initialRecord(moduleKey, profile) {
  const config = modules[moduleKey]; // Localiza a estrutura do módulo que será criado.
  const values = Object.fromEntries(fieldsFor(moduleKey, profile).map((field) => [field.key, field.options?.[0] ?? (field.type === 'number' ? field.key === 'lat' ? variedCoord(-23.55, 0.02) : field.key === 'lng' ? variedCoord(-46.63, 0.03) : field.key === 'budget' || field.key === 'amount' ? 1000 : 0 : field.type === 'date' ? today() : '')])); // Define opções iniciais, datas e coordenadas ilustrativas variadas dentro do território.
  return { ...values, ...(config.category ? { category: config.category } : {}) }; // Fixa a categoria dos módulos setoriais.
} // Encerra a criação dos valores iniciais.
// Valida os dados de um formulário antes de alterar o cenário.
export function recordError(moduleKey, values, profile) {
  const config = modules[moduleKey]; // Lê as regras do cadastro solicitado.
  if (!config || !permissions[profile]?.includes(moduleKey)) return 'Este perfil não pode alterar esse módulo demonstrativo.'; // Recusa operações fora das permissões de interface.
  for (const field of fieldsFor(moduleKey, profile)) { // Aplica as mesmas regras a todos os campos visíveis.
    const value = values[field.key]; // Lê o conteúdo digitado no campo atual.
    if (!field.optional && !String(value ?? '').trim()) return `Preencha o campo: ${field.label}.`; // Recusa valores em branco e espaços vazios.
    if (field.options && !field.options.includes(value)) return `Escolha uma opção válida em ${field.label}.`; // Impede categorias desconhecidas ou de outro perfil.
    if (field.type === 'number' && (!Number.isFinite(Number(value)) || Number(value) < field.min || Number(value) > (field.max ?? Infinity))) return `Revise o valor numérico de ${field.label}.`; // Aplica limites antes de qualquer persistência.
    if (field.type === 'date' && !validDate(value)) return `Informe uma data válida em ${field.label}.`; // Recusa dias inexistentes.
    if (typeof value === 'string' && value.length > (field.type === 'textarea' ? 1000 : 120)) return `O texto de ${field.label} está muito longo.`; // Protege o armazenamento de textos desnecessariamente grandes.
  } // Encerra a validação de campos.
  if (moduleKey === 'obras' && values.endDate < values.startDate) return 'A previsão de conclusão não pode ser anterior ao início.'; // Mantém os prazos da obra coerentes.
  if (moduleKey === 'obras' && values.status === 'Planejada' && Number(values.progress) !== 0) return 'Uma obra planejada deve começar com 0% de execução.'; // Diferencia planejamento de execução.
  if (moduleKey === 'obras' && values.status === 'Concluída' && Number(values.progress) !== 100) return 'Uma obra concluída precisa estar com 100% de execução.'; // Exige percentual coerente em vez de corrigir o valor em silêncio.
  if (moduleKey === 'obras' && Number(values.progress) === 100 && values.status !== 'Concluída') return 'Uma obra com 100% de execução precisa estar concluída.'; // Evita divergência entre percentual e situação.
  if (moduleKey === 'solicitacoes') return requestError(values); // Reutiliza a validação de assunto e descrição do portal.
  return ''; // Uma mensagem vazia significa que o registro pode ser salvo.
} // Encerra a validação administrativa.
// Cria ou atualiza registros sem modificar diretamente o estado recebido.
export function saveRecord(data, moduleKey, values, profile) {
  const config = modules[moduleKey]; // Lê a coleção que será atualizada.
  if (!config || !permissions[profile]?.includes(moduleKey)) return { error: 'Este perfil não pode alterar esse módulo demonstrativo.', data }; // Recusa operações fora da navegação demonstrativa.
  const current = values.id ? recordsFor(data, moduleKey, profile).find((record) => record.id === values.id) : null; // Só permite editar um registro que o perfil pode listar.
  if (values.id && !current) return { error: 'Registro indisponível para este perfil.', data }; // Recusa identificadores fora do módulo ou de outro escopo.
  const error = recordError(moduleKey, values, profile); // Aplica as validações de conteúdo somente depois de confirmar o escopo.
  if (error) return { error, data }; // Mantém o cenário original quando há um problema.
  const fields = fieldsFor(moduleKey, profile); // Obtém a lista permitida de propriedades editáveis.
  const payload = Object.fromEntries(fields.map((field) => [field.key, field.type === 'number' ? Number(values[field.key]) : String(values[field.key] ?? '').trim()])); // Converte números e descarta propriedades desconhecidas do formulário.
  const record = { ...current, ...payload, id: current?.id || newId(), date: current?.date || payload.date || today() }; // Preserva a identidade e a data de criação dos protocolos.
  if (config.dateKey === 'date' && payload.date) record.date = payload.date; // Permite editar a referência temporal dos cadastros que não são protocolos.
  if (config.collection === 'points') { record.category = config.category || payload.category; record.budget = moduleKey === 'obras' ? payload.budget : 0; record.progress = moduleKey === 'obras' ? record.status === 'Concluída' ? 100 : payload.progress : 0; record.kind = moduleKey === 'servicos' ? { educacao: 'Escola', saude: 'Unidade de saúde', iluminacao: 'Ponto de iluminação' }[record.category] : payload.kind; } // Conecta o cadastro diretamente aos mesmos pontos usados no mapa.
  if (config.collection === 'points' && !categories[record.category]) return { error: 'Categoria territorial inválida.', data }; // Evita marcadores sem símbolo ou descrição de categoria.
  const year = new Date().getFullYear(); // Define o ano do protocolo novo.
  const counters = { ...data.protocolCounters }; // Copia o maior número utilizado de cada ano.
  if (moduleKey === 'solicitacoes' && !current) { const protocol = reserveProtocol(data.requests, data.protocolCounters, year); record.protocol = protocol; record.owner = 'admin-demo'; counters[year] = Number(protocol.split('-').at(-1)); } // Gera protocolo sem reutilizar códigos apagados e sem atribuir o registro ao cidadão da simulação.
  const note = values.updateNote?.trim(); // Lê uma explicação opcional da atualização administrativa.
  record.history = [...(current?.history || []), { date: today(), text: `${current ? 'Atualizado' : 'Criado'} por ${profile} · ${record.status}${record.sector ? ` · Setor: ${record.sector}` : ''}${note ? ` · ${note}` : ''}` }]; // Acrescenta um evento sem substituir as etapas anteriores do atendimento.
  const collection = current ? data[config.collection].map((item) => item.id === current.id ? record : item) : [record, ...data[config.collection]]; // Atualiza um item existente ou inclui um novo registro.
  return { error: '', data: { ...data, [config.collection]: collection, protocolCounters: counters }, record }; // Devolve uma nova estrutura pronta para o React e a persistência.
} // Encerra a gravação de um cadastro.
// Remove um registro somente depois de a interface obter confirmação explícita.
export function deleteRecord(data, moduleKey, id, profile) {
  const config = modules[moduleKey]; // Localiza a coleção correspondente ao módulo.
  if (!config || !recordsFor(data, moduleKey, profile).some((item) => item.id === id)) return { error: 'Exclusão não permitida para este registro.', data }; // Impede exclusão de registros de outro domínio ou perfil.
  return { error: '', data: { ...data, [config.collection]: data[config.collection].filter((item) => item.id !== id) } }; // Remove somente o registro selecionado e preserva as sequências de protocolo.
} // Encerra a exclusão controlada.
// Aplica os filtros compartilhados pelos cadastros e relatórios.
export function filterRecords(records, filters, dateKey = 'date') {
  return records.filter((record) => (!filters.search || Object.values(record).filter((value) => typeof value !== 'object').join(' ').toLocaleLowerCase('pt-BR').includes(filters.search.toLocaleLowerCase('pt-BR'))) && (!filters.category || (record.kind || record.category || record.sector) === filters.category) && (!filters.status || record.status === filters.status) && (!filters.from || record[dateKey] >= filters.from) && (!filters.to || record[dateKey] <= filters.to)); // Mantém listagem e exportação com exatamente o mesmo resultado.
} // Encerra a filtragem de registros administrativos.
