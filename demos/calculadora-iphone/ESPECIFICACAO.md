# Calculadora iPhone Style — Especificação

Demonstração MOSS Digital de uma calculadora científica com visual de iPhone.
HTML, CSS e JavaScript puros, sem framework, sem dependências e sem internet.

## O que já funciona sem nenhuma configuração

A calculadora abre e calcula imediatamente:

- operações básicas, parênteses, potência e divisão por 100;
- percentual relativo (`200 + 20%` = 240);
- trigonometria, logaritmos, raiz, x², x⁻¹, fatorial, inversas e módulo;
- memória (MC, MR, M+, M−, MS);
- histórico de cálculos;
- layout responsivo, com teclado na tela e teclado físico do computador
  (`Enter` calcula, `Esc` limpa).

O motor de cálculo é próprio: **não usa `eval()`**. A expressão é tokenizada,
convertida para notação polonesa reversa pelo algoritmo *shunting-yard* e
avaliada na pilha. Isso evita depender de `eval` e mantém o comportamento
previsível em qualquer navegador.

## Para o cliente: a entrega é a mesma pasta

Não há servidor, chave, cadastro ou banco de dados. Para publicar, o cliente:

1. copia a pasta inteira (`index.html`, `style.css`, `script.js`);
2. publica como site estático em qualquer hospedagem com HTTPS;
3. opcionalmente troca o favicon em `index.html` e o texto da legenda.

Se quiser ajustar a calculadora, os pontos de entrada são:

- cores e medidas em `style.css` (variáveis no topo do arquivo);
- teclas, rótulos e regras de cálculo em `script.js`;
- título, descrição e texto da legenda em `index.html`.

## O que esta demo NÃO faz

- Não é a calculadora do iPhone nem da Apple: é uma reimplementação visual,
  com as teclas redesenhadas e o motor de cálculo próprio.
- Não há histórico sincronizado, conta de usuário, sincronização entre
  aparelhos ou armazenamento em servidor. O histórico vive na aba.
- Não acessa dados pessoais nem envia nada para lugar nenhum.

## Estrutura

```
calculadora-iphone/
├── index.html    página única: telefone, teclado e legenda
├── style.css     visual do iPhone, responsivo
└── script.js     motor de cálculo, histórico, memória e relógio
```

## Checklist antes de publicar

- abrir `index.html` no navegador e testar as operações principais;
- conferir o teclado físico (`Enter`, `Esc`) e o toque no celular;
- testar a rotação da tela e o histórico;
- conferir que o favicon e o título do navegador estão certainos;
- revisar a legenda para o nome do cliente.

## Licença

Projeto original do professor Marcelo Oliveira, para fins de demonstração.
HTML, CSS e JavaScript são marcas registradas de seus respectivos proprietários.
O visual lembra o sistema do iPhone, mas as teclas, os ícones e o código são
próprios: nenhuma marca da Apple está sendo usada como marca do projeto.
