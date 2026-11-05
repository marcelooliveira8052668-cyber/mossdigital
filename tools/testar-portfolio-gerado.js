/* Confere que o portfólio entregue pela MOSS acompanha a prévia do criador. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const documents = require('../acompanhamento/assets/documentos.js');

const css = fs.readFileSync(path.join(__dirname, '../criar/assets/documento.css'), 'utf8');
const document = {
  produto: 'portfolio',
  conteudo: {
    nome: 'Joana Silva', titulo: 'Fotografia que conta histórias',
    apresentacao: 'Retratos e ensaios.', itens: 'Retratos autorais\nEnsaios de família',
    experiencia: 'Fotografia desde 2022', formacao: 'Curso de fotografia',
    habilidades: 'Edição de fotos', contato: 'joana@example.com',
  },
  personalizacao: {
    cores: {fundo: '#f0f3ec', texto: '#283e32', destaque: '#315f43'},
    fotos: [{uri: 'data:image/png;base64,aGVsbG8=', legenda: 'Imagem do projeto'}],
    video: null,
  },
};

const html = documents.render(document, css);
for (const part of ['portfolio-top', 'portfolio-hero', 'id="projetos"',
  'id="galeria"', 'id="trajetoria"', 'id="contato"', 'portfolio-footer']) {
  assert.ok(html.includes(part), `Faltou ${part}`);
}
assert.ok(html.includes('Imagem do projeto'));
assert.ok(html.includes('joana@example.com'));
assert.ok(!html.includes('undefined'));

const unsafe = {...document, conteudo: {...document.conteudo, itens: '<script>alert(1)</script>'}};
const safeHtml = documents.render(unsafe, css);
assert.ok(safeHtml.includes('&lt;script&gt;alert(1)&lt;/script&gt;'));
assert.ok(!safeHtml.includes('<script>'));

console.log('Portfólio completo, fotos e textos seguros: OK');
