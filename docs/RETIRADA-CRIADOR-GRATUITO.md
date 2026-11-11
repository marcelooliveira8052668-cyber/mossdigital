# Retirada do criador gratuito — 11/11/2026

Solicitação expressa do responsável: retirar de circulação a página
`https://mossdigital.com.br/criar/index.html` e suas chamadas no site.

## Alterações

- Removida a faixa “Crie seu site grátis!” da página inicial.
- Removida da home a promessa de montagem e download gratuito.
- Removidos os botões de criação gratuita gerados no catálogo de modelos.
- Removidos também 37 botões estáticos da mesma oferta no catálogo minificado.
- Substituído `criar/index.html` por uma página mínima de desativação, com
  redirecionamento à home por JavaScript e meta refresh, além de link de saída.
- Rota antiga marcada `noindex, nofollow, noarchive`.
- Política de privacidade atualizada para informar a retirada sem alegar que
  registros anteriores foram excluídos.

## Limites e preservação

GitHub Pages é uma hospedagem estática: este redirecionamento é do documento,
não um HTTP 301/410 configurado no servidor. `/criar/`, `index.html` e links com
parâmetros antigos deixam de abrir o editor. Remoção de resultados já indexados
ou caches de terceiros não é instantânea nem garantida por esta alteração.

Os assets antigos foram preservados sem carregamento pela rota desativada.
Há dependência de `criar/assets/documento.css` no painel de acompanhamento;
apagar a pasta indiscriminadamente poderia quebrar visualizações existentes.
Esta retirada não revoga arquivos já baixados nem remove o histórico do Git.

Não foram alterados serviços, preço do site institucional, livro, demos,
área do cliente, painel, dados privados, configurações de banco ou DNS.

## Testes antes da publicação

`python docs/testar_retirada_criador.py` passou em Edge/Chromium para:
home, catálogo e sistemas sem links para a rota; filtros e orçamentos do catálogo;
ofertas do site (R$ 400) e livro (R$ 29,90) preservadas; layout em 360/1366 px;
oito combinações de rota e parâmetros, com e sem JavaScript. O editor e os
scripts de coleta não foram carregados durante esses acessos.
