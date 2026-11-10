# Fotografias pendentes — Dojô Essência

Há apenas placeholders vetoriais locais, sem fotos de terceiros. Para publicar, obter imagens da escola/negócio com **direito de uso comercial**, autorização quando aparecerem pessoas (especialmente crianças e adolescentes) e registro de fontes. Nunca baixar imagens protegidas de instituições reais sem permissão.

## Nomes e enquadramento
- `assets/img/dojo.webp` — Foto real autorizada do espaço do dojô, sem detalhes de técnicas; proporção 16:9.
- `assets/img/turma-infantil.webp` — Foto autorizada de turma juvenil em atividade coletiva; proporção 4:3.
- `assets/img/turma-adultos.webp` — Foto autorizada de turma de judô para adultos; proporção 4:3.

## Instruções para VS Code + OpenCode
1. Obter as imagens licenciadas e registrar as fontes em `CREDITOS-FOTOS.md`.
2. Otimizar cada imagem em WebP, preservar o enquadramento e salvar no caminho indicado.
3. Procurar os atributos `data-photo` no HTML. Substituir `src="assets/img/placeholder.svg"` pelo mesmo nome presente em `data-photo`.
4. Revisar `alt`, corte `object-fit`, telas de 390 px e desktop, contraste e desempenho.
5. Não subir ao GitHub nem modificar `mossdigital.com.br` sem aprovação explícita.
