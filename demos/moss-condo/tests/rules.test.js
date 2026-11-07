// Importa o executor de testes que já acompanha o Node, sem instalar bibliotecas extras.
import test from 'node:test';
// Importa verificações que comparam o resultado real ao resultado esperado.
import assert from 'node:assert/strict';
// Importa as regras de negócio que devem funcionar também fora da interface.
import { overlaps, reservationError, today, money } from '../src/utils/rules.js';
// Importa os dados fictícios para conferir sua independência.
import { createSeed } from '../src/data/seed.js';
// Define um horário-base usado somente nos testes automatizados.
const booking = { id: 'test', date: today(), area: 'Quadra', start: '10:00', end: '12:00', status: 'Confirmada' };
// Confere o bloqueio de um horário que começa dentro de uma reserva existente.
test('bloqueia horários sobrepostos', () => { assert.equal(overlaps([booking], { ...booking, id: 'new', start: '11:00', end: '13:00' }), true); });
// Confere que horários consecutivos não são tratados como conflito.
test('permite horários consecutivos', () => { assert.equal(overlaps([booking], { ...booking, id: 'new', start: '12:00', end: '13:00' }), false); });
// Confere que espaços diferentes podem funcionar no mesmo horário.
test('permite áreas diferentes', () => { assert.equal(overlaps([booking], { ...booking, id: 'new', area: 'Churrasqueira' }), false); });
// Confere que o cancelamento libera o horário.
test('ignora reservas canceladas', () => { assert.equal(overlaps([{ ...booking, status: 'Cancelada' }], { ...booking, id: 'new' }), false); });
// Confere que reservas podem coincidir em dias diferentes.
test('permite datas diferentes', () => { assert.equal(overlaps([booking], { ...booking, id: 'new', date: '2099-01-01' }), false); });
// Confere que a duração precisa ser positiva.
test('recusa fim anterior ou igual ao início', () => { assert.match(reservationError([], { ...booking, end: '09:00' }), /final/); assert.match(reservationError([], { ...booking, end: '10:00' }), /final/); });
// Confere que não é possível cadastrar uma reserva nova no passado.
test('recusa reservas no passado', () => { assert.match(reservationError([], { ...booking, date: '2000-01-01' }), /futura/); });
// Confere que um conflito produz uma mensagem compreensível.
test('explica o conflito de reserva', () => { assert.match(reservationError([booking], { ...booking, id: 'new' }), /reservada/); });
// Confere a aprovação de uma reserva válida.
test('aceita reserva válida', () => { assert.equal(reservationError([], booking), ''); });
// Confere o formato de reais sem depender do espaço exato do sistema operacional.
test('formata moeda brasileira', () => { assert.match(money(1234.5), /1\.234,50/); });
// Confere que restaurar a demonstração realmente cria objetos independentes.
test('cria conjuntos independentes de dados fictícios', () => { const first = createSeed(); first.residents.pop(); assert.equal(createSeed().residents.length, 4); });
// Confere o histórico necessário para o gráfico mensal.
test('oferece seis meses de lançamentos fictícios', () => { assert.equal(new Set(createSeed().finances.map((item) => item.date.slice(0, 7))).size, 6); });
