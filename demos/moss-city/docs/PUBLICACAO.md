# Publicação autorizada da MOSS CITY

O usuário aprovou a demonstração — incluindo o modo dia/noite — e autorizou a publicação no padrão da MOSS CONDO, com o cartão do catálogo. Em seguida, autorizou e realizou ele mesmo a postagem manual da capa no Instagram (@mossdigital_sites) em 07/11/2026.

## Separação entre fonte e produção

- Repositório: `marcelooliveira8052668-cyber/mossdigital`.
- Fonte didática: branch `feat/moss-city`, pasta `demos/moss-city/`.
- Produção: apenas o build compilado e as referências das fotografias em `main`, na pasta `demos/moss-city/`.
- Endereço: <https://mossdigital.com.br/demos/moss-city/>.
- Publicação existente do site: GitHub Pages, branch `main`, diretório raiz. Essa configuração não foi alterada.

Uma árvore de trabalho separada (`moss-city-publicacao`, branch `publish/moss-city`, criada a partir de `origin/main`) recebeu o build. Assim, o `index.html` de desenvolvimento e os comentários didáticos permanecem preservados na branch de fontes. Não se deve mesclar integralmente a branch de fontes sobre `main`, pois isso substituiria o HTML compilado pelo HTML de desenvolvimento.

## Escopo estrito

- `demos/moss-city/` em `main` (build, `photo-sources.json` e `FOTOGRAFIAS.md`) — commit `beeaf07`.
- Cartão em `sistemas.html` e prévia `assets/img/previas/moss-city.webp` — commit `191de76`.
- Republicação corretiva do rodapé em `demos/moss-city/` (build) — commit `c15fa65`.

Nada além disso foi enviado: nenhuma página inicial, logotipo, CNAME, configuração, fluxo de trabalho, demo existente ou pasta não rastreada. No `sistemas.html`, apenas o novo cartão foi inserido; os cartões existentes permanecem idênticos.

## Como a publicação foi feita

1. `npm run build` na pasta de desenvolvimento, com assets relativos (`base: './'`).
2. Cópia de `dist/index.html` e `dist/assets/` para `demos/moss-city/` na árvore de publicação.
3. `photo-sources.json` copiado para a raiz da demo publicada e `FOTOGRAFIAS.md` adaptado para a árvore publicada (as referências ao código-fonte apontam para a branch `feat/moss-city`).
4. Prévia do catálogo gerada em `assets/img/previas/moss-city.webp` (1600 × 1000, captura real do centro de comando).
5. Commits `beeaf07` e `191de76` na `publish/moss-city`, enviados à `main` como fast-forward (`883ef3a..191de76`).

## Resultado confirmado (07/11/2026)

- GitHub Actions: execução nº 100 "pages build and deployment" com sucesso para o commit `191de76` (<https://github.com/marcelooliveira8052668-cyber/mossdigital/actions/runs/42394254279>).
- <https://mossdigital.com.br/demos/moss-city/> responde com o `index.html` da demo e carrega os assets (HTTP 200).
- A aplicação renderiza no ar: título da entrada visível e alternador dia/noite trocando a classe `theme-day` e a chave `moss-city:theme:v1`.
- <https://mossdigital.com.br/sistemas.html> exibe o cartão "MOSS CITY — Gestão Urbana" com prévia e link para a demonstração; os demais cartões permanecem intactos.
- `python tests/publication_check.py` reproduz essas verificações em produção.
- Postagem da capa1080 × 1350 realizada pelo usuário no Instagram (@mossdigital_sites) em 07/11/2026, manualmente e sem automação do repositório.
- Republicação corretiva (07/11/2026): a entrada mudou de "PRÉVIA 01 · NÃO PUBLICADA" para "PRÉVIA 01 · PUBLICADA" na fonte (commit `84603d6`) e no build publicado (commit `c15fa65`, bundle `index-CWEh-fpY.js`); `python tests/publication_check.py` aprovado com 14 verificações e o texto novo confirmado no ar.

## O que não foi publicado

- Nenhum dado de produção: a demonstração continua com dados fictícios em `localStorage`.
- Nenhuma alteração de infraestrutura: sem fluxos de trabalho novos, sem mudanças de Pages, sem novos pacotes ou dependências.
