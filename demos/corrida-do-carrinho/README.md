# Corrida do Carrinho — MOSS Digital

Jogo arcade demonstrativo e independente. Capture produtos, desvie de problemas
de e-commerce e some pontos. **Tudo é fictício: nenhum dinheiro é movimentado.**

## Jogar

Abra `index.html` no navegador. Não precisa instalar nada nem configurar credenciais.

- **Setas ← →** ou **A/D** para mover o carrinho.
- Arraste o dedo/mouse na tela no celular.
- **P** pausa, **Espaço** começa/recomeça.
- Botões de seta abaixo do jogo também funcionam no toque.

## Itens

| Item | Efeito |
|---|---|
| 📦 Produtos | +10 pontos × combo (combo sobe a cada 5 capturas) |
| 🚫 Esgotado / ❌ Cupom inválido / 💸 Frete caro | perde 1 vida |
| 🎟️ MOSS10 | +25 pontos e pontos em dobro por 6 segundos |
| 🚚 Frete grátis | escudo por 7 segundos (destrói obstáculos) |

A cada 250 pontos sobe de nível: os itens caem mais rápido. A partida dura 90 segundos
ou termina quando as 3 vidas acabam. O recorde fica salvo no `localStorage`.

## Tecnologia

HTML5 + CSS + JavaScript puro, Canvas 2D e Web Audio (efeitos sonoros opcionais).
Sem frameworks, sem dependências, sem chamadas de rede obrigatórias.

## Publicação

Esta é uma pasta independente no repositório da MOSS Digital:
`demos/corrida-do-carrinho/`. O cartão é adicionado ao catálogo em `index.html`.
