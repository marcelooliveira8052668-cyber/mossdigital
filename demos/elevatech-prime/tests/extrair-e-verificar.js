/* Extrai o último <script> (o real) e verifica a sintaxe. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const todos=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)];
if(!todos.length){console.error('ERRO: nenhum <script>');process.exit(1);}
const codigo=todos[todos.length-1][1];
try{new vm.Script(codigo);console.log('OK: sintaxe JS válida ('+codigo.split('\n').length+' linhas)');}
catch(e){console.error('ERRO de sintaxe:',e.message);process.exit(1);}
