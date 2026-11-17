# Relatório de testes — TOPO PRIME

**Data:** 17/11/2026
**Ambiente:** Windows 11 · Node v26.4.0 · Chromium headless (Playwright build 1254)
**Método:** Chrome DevTools Protocol (CDP) via WebSocket nativa do Node —
sem dependências npm instaladas.

> Executado de fato. Comando:
> `node C:\Users\Sylvia Camillo\topo-prime\tests\cdp-smoke.js`

---

## Resultado geral

| Métrica | Valor |
|---------|-------|
| Verificações executadas | 14 |
| Verificações aprovadas | 14 |
| Falhas | 0 |
| Erros de console / exceções JS | 0 |
| Sintaxe JavaScript | Válida (382 linhas) |

---

## Layout responsivo

Executado com `Emulation.setDeviceMetricsOverride` e medição de
`document.documentElement.scrollWidth` vs. `clientWidth`.

| Largura | Rolagem horizontal | Conteúdo renderizado |
|---------|--------------------|----------------------|
| 360 px | ✅ Nenhuma (360 = 360) | ✅ 6 serviços, 6 projetos, 4 equipamentos |
| 390 px | ✅ Nenhuma (390 = 390) | ✅ 6 serviços, 6 projetos, 4 equipamentos |
| 768 px | ✅ Nenhuma (768 = 768) | ✅ 6 serviços, 6 projetos, 4 equipamentos |
| 1366 px | ✅ Nenhuma (1366 = 1366) | ✅ 6 serviços, 6 projetos, 4 equipamentos |

**Nota:** o menu hambúrguer foi implementado para `max-width: 900px` e as
grades passam a uma coluna em `max-width: 600px`. O comportamento foi conferido
também nos screenshots (390 px e 1366 px) em `tests/`.

---

## Funcionalidades testadas

| Teste | Entrada / ação | Resultado |
|-------|----------------|-----------|
| Calculadora | área 3000 m² + georreferenciamento + submit | ✅ `R$ 7.830` |
| Filtro do portfólio | clique em "Rural" | ✅ 2 projetos visíveis, todos da categoria rural |
| Planta interativa | clique no ponto P01 | ✅ coordenadas E/N/cota exibidas |
| Validação do formulário | submit sem preencher | ✅ 4 mensagens de erro |
| Confirmação do formulário | dados válidos + submit | ✅ painel de confirmação visível |
| Link comercial | leitura de `btnMoss.href` | ✅ `https://wa.me/5511942038103?text=...` |
| Erros de console | captura de `Runtime.exceptionThrown` e `console.error` | ✅ nenhum |

---

## Verificações manuais por inspeção de screenshot

- [x] Hero com texto legível e ilustração alinhada (desktop e celular).
- [x] Barra técnica e cabeçalho não sobrepostos.
- [x] Grade de serviços sem cards cortados.
- [x] Calculadora com painel de resultado legível.
- [x] Portfólio com 6 ilustrações distintas (sem repetição).
- [x] Planta com camadas, controles e legenda visíveis.
- [x] Galeria de equipamentos em 4 colunas (desktop) e 1 coluna (celular).
- [x] Formulário e rodapé com contraste adequado.
- [x] Identidade MOSS e botão "Quero um site como este" presentes.

---

## Limitações

- Testes automatizados cobrem layout, renderização e as interações principais.
  **Não** foi feito teste de leitor de tela real (NVDA/VoiceOver); a
  acessibilidade foi verificada por código (atributos ARIA, foco, teclado) e
  inspeção visual.
- Não foi testado em navegadores Safari/Firefox reais, apenas Chromium.
- O teste "sem rolagem horizontal" mede o documento inteiro; elementos
  posicionados fora da viewport intencionalmente (como o selo flutuante de
  demonstração) não são contabilizados como conteúdo quebrado.
- A confirmação do formulário foi testada apenas no fluxo local (simulação),
  pois não existe backend nesta demonstração.
