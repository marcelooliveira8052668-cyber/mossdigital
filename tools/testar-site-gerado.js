/* Verifica o HTML que a MOSS baixa pelo painel privado após receber um projeto. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const documents = require('../acompanhamento/assets/documentos.js');

const css = fs.readFileSync(path.join(__dirname, '../criar/assets/documento.css'), 'utf8');
const content = {
  nome: 'Padaria Central',
  titulo: 'Pães fresquinhos',
  apresentacao: 'Feitos com carinho.',
  itens: 'Pães\nBolos',
  experiencia: '', formacao: '', habilidades: '',
  sobre: 'Desde 2020.',
  contato: 'Telefone (11) 99999-1111',
  acao: 'Entre em contato',
  rodape: 'São Paulo, SP',
};
const data = {
  produto: 'site', conteudo: content,
  personalizacao: {
    cores: {fundo: '#f5f3ef', texto: '#253443', destaque: '#174f92'},
    fotos: [{uri: 'data:image/png;base64,aGVsbG8=', legenda: 'Foto enviada pelo cliente'}],
    video: null,
  },
};

const html = documents.render(data, css);
for (const section of ['site-header', 'site-hero', 'id="servicos"', 'id="sobre"',
  'id="galeria"', 'id="contato"', 'site-footer']) {
  assert.ok(html.includes(section), `Falta a seção ${section}`);
}
assert.ok(html.includes('Foto enviada pelo cliente'));
assert.ok(html.includes('São Paulo, SP'));
assert.ok(!html.includes('undefined'));

const legacy = {...data, conteudo: {...content}};
delete legacy.conteudo.sobre;
delete legacy.conteudo.acao;
delete legacy.conteudo.rodape;
assert.ok(documents.render(legacy, css).includes('site-hero'));

const unsafe = {...data, conteudo: {...content, sobre: '<script>alert(1)</script>'}};
const escaped = documents.render(unsafe, css);
assert.ok(escaped.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
assert.ok(!escaped.includes('<script>'));

console.log('Site completo, pedidos antigos e textos seguros: OK');
