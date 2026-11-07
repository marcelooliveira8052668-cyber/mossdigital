# Validação da primeira versão

Data: 7 de novembro de 2026. Ambiente: Windows, Node 26.4.0, npm 11.17.0, Chrome local e Playwright Python.

## Verificações executadas

| Verificação | Resultado e evidência |
| --- | --- |
| Build Vite | `npm run build` concluído; código de saída 0 |
| Regras de reservas, moeda e dados | `npm test`: 12 testes aprovados |
| Todos os menus dos perfis | Navegação no navegador automatizado |
| Troca de perfil | Síndico → morador → portaria → síndico pelo seletor real |
| Cadastro e edição de moradores | Formulário, listagem e atualização após recarregar |
| Exclusão | Cancelamento preserva registro; confirmação exclui |
| Financeiro | Criação de receita paga, renderização do gráfico e download CSV |
| Outros cadastros | Criação, edição e exclusão de manutenção, mural, visitantes, entregas e solicitação do morador |
| Restrição por perfil | Morador redirecionado ao tentar abrir moradores; financeiro coletivo não aparece; taxas não são editáveis |
| Reservas | Conflito bloqueado, horário consecutivo aceito e cancelamento preservado no histórico |
| Calendário | Navegação entre meses e seleção de data |
| Persistência | Registro editado permanece após recarregar |
| Erro local | Armazenamento inválido produz mensagem e recuperação com exemplos |
| Restauração | Recria quatro moradores iniciais e remove a mensagem de erro |
| Responsividade | Capturas em 390 px e 1440 px; tabelas verificadas também em 320, 768 e 1024 px |
| Acessibilidade automatizada | Axe WCAG A/AA: nenhuma violação nos seis cenários do relatório JSON |
| Teclado do formulário | Foco inicial dentro do diálogo e fechamento com Escape |
| Subdiretório | Build servido e navegado em `http://127.0.0.1:8796/dist/` |

Scripts reproduzíveis: `tests/browser_check.py`, `tests/modules_check.py`, `tests/accessibility_check.py` e `tests/rules.test.js`.

O gráfico usa carregamento separado por imports dinâmicos; o build final não apresentou aviso de pacote acima de 500 kB. A biblioteca React Router emite avisos de diretiva `use client` ignorada pelo Vite; não impediram compilação nem execução, e seus arquivos externos não foram alterados.

## Evidências

- `screenshots/entrada-desktop.png`
- `screenshots/entrada-mobile.png`
- `screenshots/sindico-desktop.png`
- `screenshots/sindico-mobile.png`
- `screenshots/morador-desktop.png`
- `screenshots/portaria-desktop.png`
- `screenshots/reservas-mobile.png`
- `accessibility-results.json`

Algumas capturas incluem registros fictícios criados durante os testes. O botão de restauração devolve os exemplos iniciais.

## Limites desta verificação

- Automação não substitui revisão humana de UX, leitor de tela e contraste em todas as combinações possíveis de dados.
- Não foi realizada certificação WCAG, auditoria de segurança ou teste em aparelhos físicos.
- Os testes de responsividade usaram Chromium; Safari e Firefox ainda precisam de revisão específica antes de uma implantação comercial.
- Não existe autenticação ou autorização de backend. As permissões de interface são demonstrativas.
- Não há concorrência transacional de reservas entre usuários, abas ou dispositivos.
- Não houve publicação no GitHub Pages. O teste foi de hospedagem estática local em subdiretório.

## Preservação

O desenvolvimento foi realizado em `feat/moss-condo`. Alterações novas limitadas à demo, seus materiais de divulgação e à cópia da capa em `04 - Divulgacao/MOSS CONDO/`.

As pastas anteriormente não rastreadas `_interno/` e `criar seu site/` foram preservadas. Nenhum arquivo rastreado anterior foi modificado, nenhum arquivo foi excluído e nenhum commit, push ou deploy foi executado.

**Próximo ponto de aprovação:** revisar CSS, navegação e acabamento profissional. O cartão não está integrado ao catálogo.

## Revisão com fotografias

Após autorização do usuário, foram incluídas fotos na entrada, nos três painéis, em todos os módulos e nas cinco áreas comuns. O componente vetorial original foi preservado, sem exclusões.

Verificações repetidas nesta revisão:

- `npm run build`: aprovado, incluindo assets relativos no subdiretório.
- `npm test`: 12 testes aprovados.
- `tests/browser_check.py`: aprovado; novas capturas desktop e celular.
- `tests/modules_check.py`: aprovado; cadastros e tabelas nas larguras 320, 768 e 1024 px.
- `tests/accessibility_check.py`: nenhuma violação automatizada nos seis cenários, agora com fotografias.
- `tests/photos_check.py`: nove fotos, 27 variantes, carregamento válido em todos os módulos, textos alternativos, cartões que filtram disponibilidade, fallback de imagem quebrada, larguras 320/390/768 px e nenhuma requisição externa na aplicação compilada.

Nova evidência: `screenshots/reservas-desktop.png`. Inventário e fontes em `FOTOGRAFIAS.md` e `photo-sources.json`.

A capa PNG 1080 × 1350, a fonte SVG e a cópia em `04 - Divulgacao/MOSS CONDO/` foram regeneradas com fotografia ilustrativa e captura real da interface atualizada. O cartão continua sendo apenas uma especificação, sem alteração de `sistemas.html`.
