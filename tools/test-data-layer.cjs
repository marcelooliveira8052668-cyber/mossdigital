/* Regressões de confirmação de envio; rede e armazenamento são simulados. */
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../assets/js/data.js'), 'utf8');
function setup(config, { blocked = false, fetch = async () => { throw Error('offline'); } } = {}) {
  const store = new Map();
  const context = vm.createContext({
    window: { SITE_CONFIG: config, localStorage: {
      getItem: key => store.get(key) || null,
      setItem: (key, value) => { if (blocked) throw Error('quota'); store.set(key, value); }
    } },
    location: { pathname: '/demo.html' }, fetch, console,
  });
  vm.runInContext(source, context);
  return context.window.DataLayer;
}
(async () => {
  let data = setup({ dataSource: { provider: 'local' } });
  let result = await data.sendLead({ nome: 'Pessoa de teste' });
  assert.equal(result.ok, true); assert.equal(result.persisted, false);
  data = setup({ dataSource: { provider: 'local' } }, { blocked: true });
  result = await data.sendLead({ nome: 'Teste' });
  assert.equal(result.ok, false); assert.equal(result.persisted, false);
  data = setup({});
  assert.equal(data.provider(), 'local');
  data = setup({ dataSource: { provider: 'rest', rest: { baseUrl: 'https://example.invalid' } } });
  result = await data.sendLead({ nome: 'Teste' });
  assert.equal(result.ok, true); assert.equal(result.persisted, false);
  data = setup({ dataSource: { provider: 'rest', rest: { baseUrl: 'https://example.invalid' } } }, { blocked: true });
  result = await data.sendLead({ nome: 'Teste' });
  assert.equal(result.ok, false); assert.equal(result.persisted, false);
  data = setup({ dataSource: { provider: 'sheets', sheets: { url: 'https://example.invalid' } } }, { fetch: async () => ({ type: 'opaque' }) });
  result = await data.sendLead({ nome: 'Teste' });
  assert.equal(result.pending, true); assert.equal(result.persisted, false);
  data = setup({ dataSource: { provider: 'rest', rest: { baseUrl: 'https://example.invalid' } } }, { fetch: async () => ({ ok: true, json: async () => ({ ok: true }) }) });
  result = await data.sendLead({ nome: 'Teste' });
  assert.equal(result.ok, true); assert.equal(result.persisted, true);
  console.log('OK: 7 cenários de envio local, falta de espaço, configuração antiga, API offline, resposta opaca e API confirmada.');
})().catch(e => { console.error(e); process.exitCode = 1; });
