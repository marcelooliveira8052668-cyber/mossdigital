# PASSO Atelier — publicação aprovada

Aprovação expressa do proprietário em 12/11/2026, após avaliação no navegador: “pode publicar ficou top 10”.

Destino: https://mossdigital.com.br/demos/passo-atelier/.

## Escopo

- Demo de loja com dez fotos locais WebP, categorias, filtros, favoritos, detalhes, tamanhos, sacola e resumo demonstrativo.
- Card com captura própria na home e entrada na categoria Comércio do catálogo; manifesto de prévias atualizado.
- Manual, privacidade, créditos e identificação de marca/preços/grade fictícios.
- Supabase opcional somente para leitura do catálogo público; configuração vazia, schema/RLS/seed documentados. Nenhum banco remoto ou checkout configurado.
- Canonical, metadados de compartilhamento e favicon. Demo permanece `noindex,follow`, sem inclusão no sitemap de páginas indexáveis.
- Capa Instagram 1080 × 1350, fonte HTML e legenda com endereço da demo; cópia em `../04 - Divulgacao/PASSO Atelier/`. Sem postagem automática em redes sociais.

Branch `demo-passo-atelier-20261112`, atualizada a partir de `origin/main`. Preservadas as alterações locais de Casa Impecável na pasta original do projeto.

## Testes

Fluxo local previamente aprovado em Chromium/Playwright: dez fotos e produtos, filtros combinados, busca sem acentos, favoritos persistentes, tamanho obrigatório, variantes, quantidades e subtotais em centavos, cópia de resumo honesto, leitura de todos os produtos por teclado e foco, guia e documentação. Sem overflow em 320, 375, 390, 768, 1024 e 1440 pixels. Conector/fallback validados apenas com respostas simuladas, não em Supabase de produção.

Executar novamente `tools/test-passo-atelier.cjs` antes do envio e conferir home, catálogo, captura, manual, créditos, configuração local e capa no endereço HTTPS após o deploy. Não alegar validação de RLS de produção a partir dos testes simulados.

Revalidação local aprovada antes do envio, incluindo card único na home, entrada única encontrável pela busca no catálogo, respectivas imagens e destinos, e capa 1080 × 1350 sem cortes. Home com onze destaques e catálogo com 123 modelos. Nenhum erro JavaScript capturado.

## Publicação

PR #30, merge `5ed931e2c5b73d5ed86b1904099b57e2e724e81c`; GitHub Pages run `43268249554` concluída com sucesso.

Conferência pública HTTPS aprovada após o deploy: demo respondendo 200 com dez produtos, título, `noindex,follow` e canonical corretos; home com onze destaques, card único da PASSO Atelier apontando para `demos/passo-atelier/`; catálogo com 123 modelos e busca retornando a entrada única na categoria Comércio; manual, créditos com dez itens, capa WebP e fotos de produto respondendo 200. Sem overflow em 320, 390 e 360 pixels. Demo ausente do sitemap de páginas indexáveis. Nenhum erro JavaScript nem resposta HTTP 4xx/5xx capturada.

A suíte `tools/test-passo-atelier.cjs` também foi executada contra o endereço público, após ajuste do tempo de espera da cópia assíncrona para a área de transferência (PR #31, merge `8fa7523c0ef93516c99c7ca96b525b5887438058`): aprovada no ambiente local e no público. A correção afeta apenas o teste; a demo publicada não foi alterada.
