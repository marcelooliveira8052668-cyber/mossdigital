# SOLAR PRIME — Demonstração 09

**Proposta diferenciada:** o catálogo MOSS já publica "Sol do Bairro — Energia
solar" (simulador de economia + proposta via WhatsApp). Esta demo NÃO repete
essa fórmula — o foco é **dimensionamento técnico ilustrativo**, comparação
de cenários e projeção financeira com gráficos.

**Status:** ✅ Concluída em 17/11/2026.

## Duplicidade registrada
Verificada em 17/11/2026 em https://mossdigital.com.br. Decisão: desenvolver
proposta realmente diferente e registrar para avaliação comercial (seção 10/11
do enunciado). A própria página explica a diferença no FAQ.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Hipóteses de cálculo | Objeto `HIPOTESES` (JS) |
| Cenários de cobertura | Array `CENARIOS` (JS) |
| Instalações da galeria | Array `INSTALACOES` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Hipóteses declaradas na tela (potência do painel, irradiação, área, perdas).
- Dimensionador: consumo, tarifa, região ilustrativa, área do telhado e 3
  cenários de cobertura (60/85/100%) → geração mensal, nº de painéis, potência
  do inversor, área necessária, economia ilustrativa, CO₂ e adequação do telhado.
- Gráfico de barras comparando os 3 cenários.
- Gráfico de linha com projeção acumulada de 10 anos e payback ilustrativo.
- Galeria com 3 SVGs originais e FAQ.

## Simulação e segurança
- Todas as premissas são fixas/configuráveis. **Nenhuma economia é garantida**;
  o aviso aparece na tela.
- Não consulta irradiação real, tarifas oficiais nem APIs. Não emite laudo,
  projeto técnico ou ART.
- Para versão comercial: integrar bases de irradiação confiáveis no servidor
  (chaves protegidas), gerar propostas com responsável técnico e parâmetros
  contratuais claros.

## Acessibilidade
Skip link, foco visível, `aria-pressed` nos cenários, `aria-live` no resultado,
gráficos SVG com `role="img"` e `aria-label`, `prefers-reduced-motion`.
