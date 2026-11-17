# Registro de alterações — ACESSO PRIME

## 17/11/2026 — Versão inicial (concluída)
- Criado `index.html` com foco em acessibilidade: skip link, marcos semânticos,
  foco visível, controles de alto contraste e tamanho de fonte, ARIA,
  comparador acessível, checklist com progressbar e formulário validado.
- Criados README, CREDITOS, RELATORIO-TESTES e `tests/`.

## Correções antes dos testes
| Antes | Depois |
|-------|--------|
| `if(!window campo)campo.focus();` (sintaxe inválida) | linha removida; foco no primeiro inválido feito após o laço |
| "sanitation adaptado" | "sanitários adaptados" |
| "atendimento a normative específica" | "atendimento a normas específicas" |

### Próximo passo
Demo 14 — SAFEWORK PRIME (`safework-prime/`).

## 17/11/2026 — Complemento: fotografias licenciadas
- Adicionadas **6 fotografias reais** (WebP 1200×800) em `img/fotos/`.
- Fontes via Openverse, licenças CC0/CC BY/CC BY-SA registradas em `CREDITOS.md`.
- Galeria `Fotografias ilustrativas` inserida antes do rodapé, com aviso de que não representam a empresa fictícia.
- Testes reforçados: carregamento real das 6 imagens verificado por CDP.

