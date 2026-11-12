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

Revalidação local aprovada antes do envio, incluindo card único na home, entrada única encontrável pela busca no catálogo, respectivas imagens e destinos, e capa 1080 × 1350 sem cortes. Home com onze destaques e catálogo com 123 modelos. Nenhum erro JavaScript capturado. A validação pública depende do término do build do GitHub Pages.
