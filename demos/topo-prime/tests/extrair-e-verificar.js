/* Extrai o <script> do index.html e verifica a sintaxe com Node (vm). */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const match = html.match(/<script>([\s\S]*?)<\/script>/);
if (!match) { console.error('ERRO: nenhum <script> encontrado'); process.exit(1); }
try {
  new vm.Script(match[1]);
  console.log('OK: sintaxe JavaScript válida (' + match[1].split('\n').length + ' linhas)');
} catch (e) {
  console.error('ERRO de sintaxe:', e.message);
  process.exit(1);
}
