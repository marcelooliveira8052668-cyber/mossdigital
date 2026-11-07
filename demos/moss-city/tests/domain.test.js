// Importa o executor de testes nativo do Node, sem dependências adicionais.
import test from 'node:test';
// Importa comparações que falham quando o resultado é diferente do esperado.
import assert from 'node:assert/strict';
// Importa as regras de negócio independentes da interface.
import { filterPoints, nextProtocol, requestError, summarize } from '../src/utils/domain.js';
// Importa os dados fictícios para verificar consistência entre módulos.
import { createSeed } from '../src/data/seed.js';
// Importa o repositório local com armazenamento substituível nos testes.
import { loadScenario, saveScenario, validScenario, STORAGE_KEY } from '../src/services/repository.js';
// Confere se o cenário possui apenas registros com os campos necessários.
test('a base inicial tem formato válido', () => { assert.equal(validScenario(createSeed()), true); });
// Confere que indicadores não são números independentes do cadastro.
test('indicadores são coerentes com os registros', () => { const data = createSeed(); const summary = summarize(data); assert.equal(summary.requests, 36); assert.equal(summary.works, 2); assert.equal(summary.schools, 3); assert.equal(summary.health, 2); assert.equal(summary.lights, 3); assert.equal(summary.greens, 2); assert.equal(summary.pending + summary.completed, summary.requests); });
// Confere a diferença entre previsão de orçamento e despesas lançadas.
test('orçamento previsto e despesas são calculados separadamente', () => { const summary = summarize(createSeed()); assert.equal(summary.budget, 6260000); assert.equal(summary.spent, 2195000); });
// Confere que um cadastro novo alimenta os indicadores do comando.
test('uma solicitação nova atualiza total e pendências', () => { const data = createSeed(); const before = summarize(data); data.requests.push({ status: 'Aberta' }); const after = summarize(data); assert.equal(after.requests, before.requests + 1); assert.equal(after.pending, before.pending + 1); });
// Confere que os mesmos filtros podem alimentar mapa e lista sem divergência.
test('combina filtros por categoria e bairro fictício', () => { const visible = filterPoints(createSeed().points, { category: 'obras', district: 'Distrito Norte' }); assert.equal(visible.length, 1); assert.equal(visible[0].name, 'Corredor Norte'); });
// Confere pesquisa sem diferenciar letras maiúsculas e minúsculas.
test('pesquisa nomes sem diferenciar maiúsculas', () => { assert.equal(filterPoints(createSeed().points, { search: 'SAÚDE' }).length, 2); });
// Confere o estado vazio sem transformar ausência de resultado em erro.
test('pesquisa sem correspondência entrega lista vazia', () => { assert.deepEqual(filterPoints(createSeed().points, { search: 'inexistente-xyz' }), []); });
// Confere que o protocolo é sequencial dentro do ano e explicitamente demonstrativo.
test('gera protocolo fictício não repetido no conjunto atual', () => { const requests = [{ protocol: 'DEMO-2026-00001' }, { protocol: 'DEMO-2026-00009' }, { protocol: 'DEMO-2025-00099' }]; assert.equal(nextProtocol(requests, 2026), 'DEMO-2026-00010'); });
// Confere o caso inicial sem protocolos anteriores.
test('começa os protocolos em 00001 quando não há registros', () => { assert.equal(nextProtocol([], 2026), 'DEMO-2026-00001'); });
// Confere validações de campos em branco e textos curtos.
test('recusa solicitação sem descrição suficiente', () => { assert.match(requestError({ title: '   ', description: 'Teste' }), /Preencha/); assert.match(requestError({ title: 'Teste', description: 'Curta' }), /15/); });
// Confere um relato demonstrativo válido sem exigir identificação pessoal.
test('aceita solicitação fictícia sem dados pessoais', () => { assert.equal(requestError({ title: 'Luminária fictícia', description: 'Descrição inventada para explorar o formulário.' }), ''); });
// Confere que restaurar cria estruturas independentes das que foram alteradas.
test('a restauração não compartilha objetos anteriores', () => { const original = createSeed(); original.points.pop(); assert.equal(createSeed().points.length, 18); });
// Confere serialização e leitura usando uma memória de teste em vez do navegador pessoal.
test('grava somente a chave exclusiva da MOSS CITY', () => { const values = new Map([['outra-demo', 'preservada']]); const storage = { setItem: (key, value) => values.set(key, value), getItem: (key) => values.get(key) }; saveScenario(createSeed(), storage); assert.equal(loadScenario(storage).points.length, 18); assert.equal(values.get('outra-demo'), 'preservada'); assert.equal(values.has(STORAGE_KEY), true); });
// Confere que um texto JSON corrompido pode ser tratado pela interface.
test('informa erro em armazenamento inválido', () => { assert.throws(() => loadScenario({ getItem: () => '{quebrado' })); assert.throws(() => loadScenario({ getItem: () => '{"city":{}}' })); });
// Importa as regras dos módulos administrativos junto dos testes de domínio.
import { fieldsFor, initialRecord, recordError, saveRecord, deleteRecord, filterRecords } from '../src/utils/management.js';
// Importa a evolução de esquema usada para atualizar dados salvos por versões antigas.
import { normalizeScenario } from '../src/services/schema.js';
// Importa as permissões e a seleção de registros por perfil demonstrativo.
import { permissions, recordsFor } from '../src/data/modules.js';
// Importa a reserva de protocolo que evita reaproveitar códigos excluídos.
import { reserveProtocol } from '../src/utils/domain.js';
// Confere a lista de módulos de cada perfil sem misturar acessos entre perfis.
test('cada perfil recebe apenas seus módulos autorizados', () => { assert.equal(permissions.cidadao.includes('obras'), false); assert.equal(permissions.cidadao.includes('portal'), true); assert.equal(permissions.obras.includes('despesas'), false); assert.equal(permissions.obras.includes('obras'), true); assert.equal(permissions.administrador.includes('relatorios'), true); assert.equal(permissions.ambiental.includes('ambiente'), true); });
// Confere que a listagem respeita permissões e escopo de categorias.
test('registros são filtrados pelo perfil antes da tela', () => { const data = createSeed(); assert.equal(recordsFor(data, 'obras', 'administrador').length, 4); assert.equal(recordsFor(data, 'obras', 'cidadao').length, 0); const escopoObras = recordsFor(data, 'solicitacoes', 'obras'); assert.equal(escopoObras.length, 12); assert.equal(escopoObras.every((item) => ['Buracos nas vias', 'Outros serviços'].includes(item.category)), true); });
// Confere que os campos exibidos também seguem o escopo do perfil.
test('campos de solicitação variam conforme o gestor', () => { const admin = fieldsFor('solicitacoes', 'administrador').find((field) => field.key === 'category').options; const obras = fieldsFor('solicitacoes', 'obras').find((field) => field.key === 'category').options; assert.equal(admin.length, 6); assert.deepEqual(obras, ['Buracos nas vias', 'Outros serviços']); });
// Confere valores iniciais coerentes com as regras de cada cadastro.
test('obra nova começa planejada e dentro do território', () => { const values = initialRecord('obras', 'administrador'); assert.equal(values.status, 'Planejada'); assert.equal(values.progress, 0); assert.equal(values.kind, 'Via'); assert.match(recordError('obras', values, 'administrador'), /Preencha/); values.name = 'Obra de teste fictícia'; assert.match(recordError('obras', values, 'administrador'), /Descrição/); values.description = 'Criação de teste fictício para validar o formulário de obras.'; assert.equal(recordError('obras', values, 'administrador'), ''); });
// Confere as regras de coerência entre prazo, situação e percentual da obra.
test('recusa obras com prazo ou percentual incoerentes', () => { const base = { ...initialRecord('obras', 'administrador'), name: 'Obra de teste fictícia', description: 'Descrição fictícia longa o bastante para passar na validação.' }; assert.match(recordError('obras', { ...base, status: 'Em execução', progress: 100 }, 'administrador'), /100%/); assert.match(recordError('obras', { ...base, status: 'Concluída', progress: 50 }, 'administrador'), /concluída/i); assert.match(recordError('obras', { ...base, startDate: '2026-11-10', endDate: '2026-11-01' }, 'administrador'), /conclusão/); assert.match(recordError('obras', { ...base, status: 'Planejada', progress: 20 }, 'administrador'), /0%/); });
// Confere que uma criação bem-sucedida entra na coleção com histórico e categoria.
test('salva uma obra fictícia com histórico e categoria territorial', () => { const data = createSeed(); const values = { ...initialRecord('obras', 'administrador'), name: 'Obra de teste fictícia', description: 'Criação de teste para validar a persistência local das obras.' }; const result = saveRecord(data, 'obras', values, 'administrador'); assert.equal(result.error, ''); assert.equal(result.data.points.length, 19); assert.equal(result.record.category, 'obras'); assert.equal(result.record.history.length, 1); assert.equal(result.record.history[0].text.includes('administrador'), true); assert.equal(data.points.length, 18); });
// Confere que um perfil não consegue editar registros fora do seu escopo.
test('recusa edição de registro de outro módulo', () => { const data = createSeed(); const parque = data.points.find((point) => point.category === 'ambiente'); const result = saveRecord(data, 'obras', { ...parque, name: 'Alteração indevida' }, 'obras'); assert.match(result.error, /indisponível|permitido/); assert.equal(result.data.points.length, 18); });
// Confere geração e exclusão de protocolo sem reaproveitar códigos.
test('protocolo não é reutilizado depois da exclusão', () => { const data = createSeed(); const ano = new Date().getFullYear(); const esperado = String((data.protocolCounters[ano] || 0) + 1).padStart(5, '0'); const values = { title: 'Buraco fictício para teste', category: 'Buracos nas vias', district: 'Centro Cívico', sector: 'Infraestrutura', priority: 'Alta', status: 'Aberta', description: 'Descrição fictícia longa o bastante para passar na validação.' }; const criado = saveRecord(data, 'solicitacoes', values, 'administrador'); assert.equal(criado.error, ''); assert.equal(criado.record.protocol, `DEMO-${ano}-${esperado}`); assert.equal(criado.record.owner, 'admin-demo'); const apagado = deleteRecord(criado.data, 'solicitacoes', criado.record.id, 'administrador'); assert.equal(apagado.error, ''); assert.equal(apagado.data.requests.length, 36); const proximo = saveRecord(apagado.data, 'solicitacoes', values, 'administrador'); assert.notEqual(proximo.record.protocol, criado.record.protocol); });
// Confere que exclusões também respeitam o escopo do perfil.
test('recusa exclusão de registro fora do escopo', () => { const data = createSeed(); const parque = data.points.find((point) => point.category === 'ambiente'); const result = deleteRecord(data, 'obras', parque.id, 'obras'); assert.match(result.error, /permitida/); assert.equal(result.data.points.length, 18); });
// Confere a reserva de protocolo mesmo sem solicitações correspondentes.
test('reserva de protocolo considera sequências já excluídas', () => { const ano = new Date().getFullYear(); assert.equal(reserveProtocol([], {}, ano), `DEMO-${ano}-00001`); assert.equal(reserveProtocol([], { [ano]: 9 }, ano), `DEMO-${ano}-00010`); });
// Confere filtros combinados usados pela listagem e pela exportação.
test('filtros de módulo combinam texto, situação e período', () => { const requests = createSeed().requests; assert.equal(filterRecords(requests, { search: 'luminária' }).length, 6); assert.equal(filterRecords(requests, { status: 'Aberta' }).length, 9); assert.equal(filterRecords(requests, { category: 'Iluminação pública' }).length, 6); const porPeriodo = filterRecords(requests, { from: '2000-01-01', to: '2000-12-31' }); assert.equal(porPeriodo.length, 0); });
// Confere que dados antigos ganham os campos dos novos sem perder registros.
test('esquema antigo é atualizado sem apagar protocolos', () => { const antigo = createSeed(); antigo.points = antigo.points.map(({ date, startDate, endDate, areaHa, frequency, lengthKm, lineCode, history, ...resto }) => resto); antigo.requests = antigo.requests.map(({ priority, sector, ...resto }) => resto); antigo.expenses = antigo.expenses.map(({ title, status, history, ...resto }) => resto); delete antigo.protocolCounters; const atualizado = normalizeScenario(antigo); assert.equal(atualizado.schemaVersion, 2); assert.equal(atualizado.points.length, 18); assert.equal(typeof atualizado.points[0].startDate, 'string'); assert.equal(atualizado.requests[0].sector, 'Atendimento'); assert.equal(atualizado.expenses[0].title.includes('Lançamento'), true); assert.equal(atualizado.protocolCounters[new Date().getFullYear()] >= 36, true); assert.equal(normalizeScenario(atualizado).points[0].startDate, atualizado.points[0].startDate); });
// Confere datas coerentes por situação depois da atualização de esquema.
test('obra planejada começa na referência do cenário', () => { const atualizado = normalizeScenario(createSeed()); const planejada = atualizado.points.find((point) => point.status === 'Planejada'); const concluida = atualizado.points.find((point) => point.status === 'Concluída'); assert.equal(planejada.startDate, atualizado.city.referenceDate); assert.equal(planejada.endDate > planejada.startDate, true); assert.equal(concluida.endDate, atualizado.city.referenceDate); assert.equal(concluida.startDate < concluida.endDate, true); });
// Confere que coordenadas novas variam para não empilhar marcadores e continuam dentro do território fictício.
test('coordenadas de registros novos variam dentro do território', () => { const amostra = Array.from({ length: 40 }, () => initialRecord('obras', 'administrador')); assert.equal(amostra.every((values) => values.lat >= -23.58 && values.lat <= -23.52 && values.lng >= -46.67 && values.lng <= -46.59), true); assert.equal(new Set(amostra.map((values) => `${values.lat}/${values.lng}`)).size > 1, true); });
