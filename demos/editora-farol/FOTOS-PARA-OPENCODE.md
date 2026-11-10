# Fotografias a incluir — Editora Farol

As imagens reais **não estão incluídas**. A demo mostra um SVG local até serem inseridas fotografias devidamente licenciadas.

## Arquivos exatos
- `assets/img/editorial-hero.webp` — ambiente de livros e leitura editorial, opcional 4:3.
- `assets/img/colecao-livros.webp` — coleção de livros próprios autorizados, opcional 4:3.

## Processo orientado para VS Code/OpenCode
1. Buscar imagens com autorização de uso comercial e sem marcas indevidamente reproduzidas.
2. Salvar em `assets/img/` no formato WebP otimizado, com os nomes acima.
3. O `js/script.js` detecta os arquivos `data-photo` automaticamente e os utiliza quando disponíveis; não remova o SVG de fallback.
4. Conferir cortes, texto alternativo e versão de celular; registrar autor, URL, licença e data em `CREDITOS-FOTOS.md`.
5. Não publicar no GitHub nem no site MOSS sem autorização expressa.
