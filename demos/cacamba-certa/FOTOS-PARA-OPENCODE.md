# Fotos para OpenCode — Caçamba Certa

**Objetivo:** buscar fotos com licença comercial verificada e encaixá-las exatamente nas áreas previstas, sem aumentar o tamanho do card ou alterar o layout.

| Nome dentro de `assets/img` | Local | Resolução sugerida |
|---|---|---|
| `capa-cacamba.webp` | Hero | 1400×1100 |
| `cacamba-3m.webp` | Card 3m³ | 900×560 |
| `cacamba-4m.webp` | Card 4m³ | 900×560 |
| `cacamba-5m.webp` | Card 5m³ | 900×560 |

## Padrão de encaixe
- Priorizar WebP otimizado e nomes exatos acima.
- A relação de corte visual é determinada pelas regras CSS `aspect-ratio` e `object-fit: cover`; as dimensões de tabela são **orientativas**, não regras rígidas.
- Ajustar `object-position` individualmente quando rostos, produtos ou equipamentos ficarem cortados.
- Não esticar imagens nem inventar fotos de empresa real. Não usar imagens com marca d'água.
- Manter `placeholder.svg` como fallback. Atualizar `src` e remover `data-photo` quando as imagens forem aprovadas.
- Conferir visualmente em 390px, 768px e 1366px depois da substituição.
- Registrar fonte, autor e licença de cada foto no README.

**Sem fotos reais nesta entrega, conforme orientação do proprietário.**
