# PAC-MAN//NEON

Homenagem arcade ao clássico, refeita do zero em **HTML, CSS e JavaScript puro** — sem frameworks, sem bibliotecas, sem imagens externas. Roda em computador e celular, offline, direto do navegador.

**Demo ao vivo:** https://marcelooliveira8052668-cyber.github.io/pacman/

---

## O que o jogo tem

- **5 fases desenhadas à mão** (labirintos diferentes, cada vez mais rápidos) e **modo infinito** a partir da fase 6, com dificuldade crescente sem limite.
- **4 caçadores com personalidade de verdade**, como no original:
  - **Blinky** (vermelho) vai direto na sua cola.
  - **Pinky** (rosa) tenta emboscar 4 células à sua frente.
  - **Inky** (ciano) usa um vetor dobrado a partir do Blinky — imprevisível.
  - **Clyde** (laranja) é corajoso de longe e foge quando chega perto de você.
- **Ciclos espalhar/perseguir** e liberação escalonada dos fantasmas da casa.
- **Pastilhas de medo**: fantasma vira azul, combo vale **200 → 400 → 800 → 1600** pontos (com pisca-pisca antes de voltar ao normal).
- **Frutas de bônus** por fase: cereja, morango, laranja, maçã, melancia, sino, chave — 100 até 5000 pontos.
- **Vida extra a cada 10.000 pontos.**
- **Login do jogador** e **ranking top 10** salvos no aparelho (localStorage).
- **Efeitos sonoros originais** gerados na hora (WebAudio) — nada de arquivos de áudio.
- **Pausa** por teclado, botão ou ao trocar de aba (pausa automática).

## Controles

| Ação | Computador | Celular |
| --- | --- | --- |
| Mover | Setas ou W/A/S/D | Joystick na tela ou deslizar o dedo no labirinto |
| Pausar | P, Esc ou botão ⏸ | Botão ⏸ |
| Som | Botão 🔊 no topo | Botão 🔊 no topo |

## Fases e dificuldade

| Fase | Labirinto | Velocidade do Pac-Man | Velocidade dos fantasmas | Medo |
| --- | --- | --- | --- | --- |
| 1 | Clássico | 7,4 | 6,6 | 7,0 s |
| 2 | Colmeia | 7,5 | 7,0 | 6,0 s |
| 3 | Túneis | 7,6 | 7,4 | 5,5 s |
| 4 | Labirinto | 7,8 | 7,8 | 5,0 s |
| 5 | Fortaleza | 8,0 | 8,2 | 4,0 s |
| 6+ | Fase 5 + escalada | até 9,0 | até 10,5 | até 2,0 s |

*(Velocidades em células por segundo.)*

## Estrutura de arquivos

```
index.html   → página, telas e HUD
style.css    → tema neon, gabinete, joystick e responsividade
maps.js      → as 5 plantas + tabela de fases + fase infinita
audio.js     → motor de efeitos sonoros (WebAudio)
game.js      → motor do jogo (canvas, IA dos fantasmas, telas, ranking)
favicon.svg  → ícone neon
```

## Como rodar

Basta abrir o `index.html` no navegador. Para publicar em qualquer hospedagem estática (GitHub Pages, Netlify, servidor), é só enviar os 6 arquivos — não há etapa de build.

## Qualidade

O motor foi validado por **51 checagens automatizadas** executadas em navegador headless: contagem exata de moedas por fase, medo e combos, liberação e personalidade dos fantasmas, retorno dos olhos à casa por caminho mínimo, ciclos, frutas, pausa, morte/vidas, bônus de fase, ranking, troca de jogador e carregamento de todas as fases — zero falhas e zero erros de JavaScript.

---

Feito com HTML, CSS e JavaScript puro. Licença de uso: entre em contato para compra/licenciamento — projeto integrante do portfólio **Sites Profissionais** (36 projetos).
