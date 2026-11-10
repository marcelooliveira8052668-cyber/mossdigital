# Fotos para OpenCode — Uniforme Pro

**Objetivo:** buscar fotos com licença comercial verificada e encaixá-las exatamente nas áreas previstas, sem aumentar o tamanho do card ou alterar o layout.

| Nome dentro de `assets/img` | Local | Resolução sugerida |
|---|---|---|
| `capa-uniformes.webp` | Capa | 1350×1100 |
| `camisa-polo.webp` | Catálogo | 900×675 |
| `jaleco.webp` | Catálogo | 900×675 |
| `avental.webp` | Catálogo | 900×675 |

## Padrão de encaixe
- Priorizar WebP otimizado e nomes exatos acima.
- A relação de corte visual é determinada pelas regras CSS `aspect-ratio` e `object-fit: cover`; as dimensões de tabela são **orientativas**, não regras rígidas.
- Ajustar `object-position` individualmente quando rostos, produtos ou equipamentos ficarem cortados.
- Não esticar imagens nem inventar fotos de empresa real. Não usar imagens com marca d'água.
- Manter `placeholder.svg` como fallback. Atualizar `src` e remover `data-photo` quando as imagens forem aprovadas.
- Conferir visualmente em 390px, 768px e 1366px depois da substituição.
- Registrar fonte, autor e licença de cada foto no README.

**Sem fotos reais nesta entrega, conforme orientação do proprietário.**
