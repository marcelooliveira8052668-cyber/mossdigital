/* ═══════════════════════════════════════════════════════
   DevBook — DESAFIOS DE CÓDIGO
   Exercícios com testes ocultos. `validate` roda contra o código do aluno.
   ═══════════════════════════════════════════════════════ */

const CHALLENGES = [
{
  id: "ch-palindrome",
  icon: "🪞",
  title: "Detector de Palíndromos",
  level: "easy",
  minutes: 15,
  track: ["frontend", "fullstack"],
  prompt: "Implemente a função <code>ehPalindromo(texto)</code> que retorna <code>true</code> se o texto lido de trás para frente é o mesmo (ignorando espaços, maiúsculas e acentos).",
  hint: "Normalize com <code>texto.toLowerCase().replace(/\\s/g, '')</code>. Compare com <code>[...limpo].reverse().join('')</code>.",
  starter: "// Implemente e clique em Validar\nfunction ehPalindromo(texto) {\n  // seu código aqui\n}\n\n// Não mexa abaixo\nconst testes = [\n  [\"arara\", true],\n  [\"A man a plan a canal Panama\", true],\n  [\"casa\", false],\n  [\"\", true],\n];\n",
  validate: "if (typeof ehPalindromo !== 'function') throw new Error('Defina a função ehPalindromo');\nif (ehPalindromo.length === 0) throw new Error('Sua funcao precisa receber o texto como parametro');\nconst casos = [['arara',true],['A man a plan a canal Panama',true],['Anita lava la tina',true],['A grama e amarga',true],['A grama é amarga',true],['casa',false],['',true],['12321',true],['roar',false],['javascript',false]];\nlet falhas = 0;\ncasos.forEach(function(c) {\n  var entrada = c[0], esperado = c[1];\n  var got = ehPalindromo(entrada);\n  if (got !== esperado) { console.log('X  ehPalindromo(\"' + entrada + '\") retornou ' + got + ', esperava ' + esperado); falhas++; }\n});\nif (typeof ehPalindromo('arara') !== 'boolean') throw new Error('A funcao deve retornar true ou false');\nif (falhas) throw new Error(falhas + ' de ' + casos.length + ' casos falharam — revise sua logica');\nconsole.log('V  Todos os ' + casos.length + ' casos passaram!');\n",
  xp: 40
},
{
  id: "ch-array-utils",
  icon: "📦",
  title: "Utilitários de Array",
  level: "medium",
  minutes: 20,
  track: ["frontend", "fullstack"],
  prompt: "Crie <code>agruparPor(lista, chave)</code> que retorna um objeto agrupando itens pela propriedade. E <code>estatisticas(numeros)</code> que devolve <code>{media, min, max}</code>.",
  hint: "Use <code>reduce</code> para o agrupamento e um laço simples para média/min/max.",
  starter: "// Implemente e clique em Validar\nfunction agruparPor(lista, chave) {\n  // seu código aqui\n}\n\nfunction estatisticas(numeros) {\n  // seu código aqui\n}\n",
  validate: "if (typeof agruparPor !== 'function') throw new Error('Defina agruparPor');\nif (typeof estatisticas !== 'function') throw new Error('Defina estatisticas');\nconst dados = [{tipo:'fruta',nome:'maçã'},{tipo:'legume',nome:'cenoura'},{tipo:'fruta',nome:'uva'}];\nconst g = agruparPor(dados,'tipo');\nif (!g.fruta || g.fruta.length !== 2) throw new Error('agruparPor: esperado 2 itens em \"fruta\", recebeu '+JSON.stringify(g));\nconst e = estatisticas([10,20,30,40]);\nif (e.media !== 25) throw new Error('estatisticas: media esperada 25, recebeu '+e.media);\nif (e.min !== 10 || e.max !== 40) throw new Error('estatisticas: min/max errados ('+e.min+'/'+e.max+')');\nconsole.log('✓ agruparPor e estatisticas OK!');\n",
  xp: 60
},
{
  id: "ch-fizzbuzz",
  icon: "🎯",
  title: "FizzBuzz em 4 flavors",
  level: "easy",
  minutes: 10,
  track: ["frontend", "fullstack"],
  prompt: "Para 1 a 20: se múltiplo de 3 e 5 → 'FizzBuzz'; só 3 → 'Fizz'; só 5 → 'Buzz'; senão o número. Use <code>resolver()</code> retornando um array.",
  hint: "Verifique o múltiplo de 15 PRIMEIRO, senão o de 3 'captura' o de 5.",
  starter: "// Implemente e clique em Validar\nfunction resolver() {\n  // retorne um array com 20 itens\n}\n",
  validate: "if (typeof resolver !== 'function') throw new Error('Defina resolver');\nconst r = resolver();\nif (!Array.isArray(r) || r.length !== 20) throw new Error('resolver deve retornar array de 20 itens');\nconst esperado = [1,2,'Fizz',4,'Buzz','Fizz',7,8,'Fizz','Buzz',11,'Fizz',13,14,'FizzBuzz',16,17,'Fizz',19,'Buzz'];\nesperado.forEach((e,i)=>{ if(r[i]!==e) throw new Error('posição '+(i+1)+': esperado '+e+', recebeu '+r[i]); });\nconsole.log('✓ FizzBuzz completo!');\n",
  xp: 30
},
{
  id: "ch-dobrar-array",
  icon: "⚡",
  title: "Debounce de Busca",
  level: "hard",
  minutes: 25,
  track: ["frontend"],
  prompt: "Implemente <code>debounce(fn, delay)</code> que retorna uma função que só executa <code>fn</code> após <code>delay</code> ms sem novas chamadas.",
  hint: "Use setTimeout e limpe o timer anterior a cada chamada (clearTimeout).",
  starter: "// Implemente e clique em Validar\nfunction debounce(fn, delay) {\n  // seu código aqui\n}\n",
  validate: "if (typeof debounce !== 'function') throw new Error('Defina debounce');\nlet chamada = 0;\nconst f = debounce(() => chamada++, 60);\nf(); f(); f();\nif (chamada !== 0) throw new Error('debounce não deve executar antes do delay');\nsetTimeout(() => {\n  if (chamada !== 1) throw new Error('esperava 1 execução após o delay, recebeu '+chamada);\n  console.log('✓ debounce OK (executou 1x após 3 chamadas rápidas)!');\n}, 120);\n",
  xp: 80
},
{
  id: "ch-api-crud",
  icon: "🗃️",
  title: "Validador de Payload",
  level: "medium",
  minutes: 20,
  track: ["backend", "fullstack"],
  prompt: "Implemente <code>validar(dados)</code> que retorna <code>{ ok: true, dados }</code> ou <code>{ ok: false, erros: [...] }</code> validando: <code>nome</code> (string, 3-100 chars), <code>email</code> (formato válido), <code>idade</code> (número inteiro 18-120).",
  hint: "Valide campo a campo, acumulando erros num array. Use try/catch para testar email com regex.",
  starter: "// Implemente e clique em Validar\nfunction validar(dados) {\n  // seu código aqui\n}\n",
  validate: "if (typeof validar !== 'function') throw new Error('Defina validar');\nconst ok = validar({nome:'Ana Silva', email:'ana@x.com', idade:25});\nif (!ok.ok) throw new Error('deveria aceitar dados válidos: '+JSON.stringify(ok.erros));\nconst bad1 = validar({nome:'Ab', email:'invalido', idade:10});\nif (bad1.ok) throw new Error('deveria rejeitar dados inválidos');\nif (!Array.isArray(bad1.erros) || bad1.erros.length < 2) throw new Error('esperava relatar os erros encontrados');\nconsole.log('✓ validar aceita válidos e rejeita inválidos com lista de erros!');\n",
  xp: 60
},
{
  id: "ch-slug",
  icon: "🔗",
  title: "Gerador de Slug (URL Amigável)",
  level: "medium",
  minutes: 15,
  track: ["fullstack"],
  prompt: "Crie <code>slugify(texto)</code> que converte 'Olá Mundo!' em 'ola-mundo' — sem acentos, minúsculo, espaços viram hífen, sem hífens duplicados.",
  hint: "Normalize com NFD, remova diacríticos com regex /[\\u0300-\\u036f]/g, depois troque não-alfanuméricos por hífen e limpe.",
  starter: "// Implemente e clique em Validar\nfunction slugify(texto) {\n  // seu código aqui\n}\n",
  validate: "if (typeof slugify !== 'function') throw new Error('Defina slugify');\nconst casos = [['Olá Mundo!','ola-mundo'],['  spaces  aqui ','spaces-aqui'],['Ação & Reação','acao-reacao'],['---ja---','ja']];\ncasos.forEach(([entrada, esp]) => {\n  const got = slugify(entrada);\n  if (got !== esp) throw new Error('slugify(\"'+entrada+'\") → \"'+got+'\", esperava \"'+esp+'\"');\n});\nconsole.log('✓ slugify funciona para todos os casos!');\n",
  xp: 50
}
]
