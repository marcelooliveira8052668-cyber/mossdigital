# VELHA//CORE — jogo da velha futurista

Jogo da velha (tic-tac-toe) com visual neon, inteligência artificial de três
níveis, modo para dois jogadores no mesmo aparelho, placar com sequências,
dica da IA e jogabilidade pelo teclado. Sem cadastro, sem anúncios, sem
coleta de dados — abre e joga.

**Demonstração:** https://marcelooliveira8052668-cyber.github.io/jogo-velha/

---

## O que o jogo tem

| Recurso | Detalhe |
| --- | --- |
| Contra a máquina | Minimax com poda alfa-beta; nunca perde no nível Imbatível |
| Três dificuldades | Fácil (1 casa de análise), Médio (4) e Imbatível (todas as linhas) |
| Dois jogadores | X e O revezam no mesmo celular ou computador |
| Placar | Vitórias de cada lado, empates e faixa de "N seguidas" |
| Linha de vitória | Trilho de luz medido em pixels, girado no ângulo exato da sequência |
| Dica da IA | Mostra a jogada mais forte do momento; a escolha continua sendo sua |
| Teclado | Teclas `1` a `9` marcam a casa correspondente; `N` abre a próxima rodada |
| Acessibilidade | Navegação por Tab, foco visível, `aria-pressed` nos controles, avisos em `role="status"` |
| Movimento | Respeita `prefers-reduced-motion` (desliga animações para quem pedir) |

## Arquivos

```
index.html    estrutura da página (marca, placar, controles, tabuleiro, ajuda)
style.css     tema neon: variáveis de cor, tabuleiro, animações, modo celular
script.js     regras, minimax, placar, dica, teclado e desenho do trilho
favicon.svg   ícone da aba: X ciano e O magenta
```

Nenhuma biblioteca externa: o site funciona offline depois da primeira carga
(a fonte Chakra Petch vem do Google Fonts e tem fallback de sistema).

## Como personalizar

Abra `script.js` e ajuste o bloco `CONFIG` no topo:

```js
const CONFIG = {
    simboloX: 'X',        // símbolo do primeiro jogador
    simboloO: 'O',        // símbolo do segundo jogador
    nomeX: 'VOCÊ',        // apelido do X quando joga contra a máquina
    nomeO: 'MÁQUINA',     // apelido do O quando joga contra a máquina
    esperaMaquina: {      // pausa "de pensamento" da máquina, em ms
        facil: 300, medio: 450, dificil: 600
    }
};
```

As cores ficam em `style.css`, no bloco `:root` (`--ciano`, `--magenta`,
`--fundo`…). Trocando essas duas coisas, o jogo já está com a cara do cliente.

## Como testar na máquina

Basta abrir o `index.html` no navegador. Para subir de novo no GitHub Pages:

1. repositório → **Settings → Pages → Branch: main / pasta: /**;
2. o site fica em `https://SEU-USUARIO.github.io/jogo-velha/`.

## Notas de venda

- é jogo de demonstração: não guarda placar em servidor nem pede login;
- o "Imbatível" é o argumento de venda: empata ou vence, nunca perde;
- serve como vitrine de front-end: HTML semântico, CSS moderno e JavaScript
  puro (ES6), ~17 KB de script, sem dependências.
