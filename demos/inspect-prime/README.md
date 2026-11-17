# INSPECT PRIME — Demonstração 15 (última do ciclo)

Site institucional premium de inspeção predial: imóveis fictícios, checklists
interativos, registro de ocorrências com prioridade, galeria ilustrativa,
agenda, histórico e relatório visual para impressão.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Serviços | Array `SERVICOS` (JS) |
| Imóveis | Array `IMOVEIS_FICTICIOS` (JS) |
| Categorias do checklist | `CHECKLIST_CATEGORIAS` (JS) |
| Ocorrências iniciais | `OCORRENCIAS_FICTICIAS` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |

## Funcionalidades reais
- Seleção de imóvel atualiza checklist e pendências (teclado e mouse).
- Checklists interativos agrupados por categoria.
- Registro de observações com descrição e prioridade ilustrativa; a ocorrência
  aparece na lista de pendências com etiqueta de prioridade.
- Cadastro de vistoria fictícia com validação e persistência local.
- Calendário navegável; clique em data marcada filtra o histórico.
- Relatório visual para impressão (`@media print`).
- Galeria com 3 ilustrações SVG originais de ocorrências.
- Formulário de orçamento com validação e confirmação local.

## Segurança
- Relatórios, imóveis, ocorrências e prioridades são **exemplos sem valor de
  laudo técnico oficial** — aviso visível no hero, no painel e no rodapé.
- Nada é enviado a servidor. Dados locais são fictícios.
- Para versão comercial: laudos assinados por responsável técnico, backend
  autenticado, anexação de fotos reais com consentimento e verificação das
  normas aplicáveis.

## Acessibilidade
Skip link, foco visível, imóveis selecionáveis por `Enter`/`Espaço`,
calendário navegável por teclado, `aria-live` nas confirmações,
`prefers-reduced-motion`.

## Fotografias ilustrativas (6 por demo)

Foram adicionadas 6 fotografias reais de fachadas, fissuras, umidade, plantas e vistorias, obtidas via Openverse com licenças que permitem uso comercial (CC0, CC BY ou CC BY-SA). Cada imagem foi redimensionada para 1200×800 e convertida em WebP, com fonte, licença e autor registrados em `CREDITOS.md` e `img/fotos/fontes.json`.

As fotos são **imagens de referência**: não representam a empresa fictícia, sua equipe, instalações ou trabalhos reais. Aviso visível na seção `Fotografias ilustrativas`.
