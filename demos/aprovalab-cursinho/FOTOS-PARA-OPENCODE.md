# Fotografias pendentes — AprovaLab

Há apenas placeholders vetoriais locais, sem fotos de terceiros. Para publicar, obter imagens da escola/negócio com **direito de uso comercial**, autorização quando aparecerem pessoas (especialmente crianças e adolescentes) e registro de fontes. Nunca baixar imagens protegidas de instituições reais sem permissão.

## Nomes e enquadramento
- `assets/img/turma.webp` — Turma de cursinho estudando; proporção 16:9.
- `assets/img/estudo.webp` — Estudante com cadernos e material de estudo; proporção 4:3.
- `assets/img/aula.webp` — Professor em aula de revisão; proporção 4:3.

## Instruções para VS Code + OpenCode
1. Obter as imagens licenciadas e registrar as fontes em `CREDITOS-FOTOS.md`.
2. Otimizar cada imagem em WebP, preservar o enquadramento e salvar no caminho indicado.
3. Procurar os atributos `data-photo` no HTML. Substituir `src="assets/img/placeholder.svg"` pelo mesmo nome presente em `data-photo`.
4. Revisar `alt`, corte `object-fit`, telas de 390 px e desktop, contraste e desempenho.
5. Não subir ao GitHub nem modificar `mossdigital.com.br` sem aprovação explícita.
