# Registro de alterações — TOPO PRIME

## 17/11/2026 — Versão inicial (concluída)

### O que foi criado

- `index.html` — demo completa em arquivo único (HTML5 semântico, CSS3
  responsivo e JavaScript puro, todos comentados em português).
- `README.md` — instruções de edição e documentação de funcionalidades.
- `CREDITOS.md` — inventário e origem das ilustrações.
- `REGISTRO-ALTERACOES.md` — este arquivo.
- `RELATORIO-TESTES.md` — resultados dos testes executados.
- `tests/` — scripts de verificação e screenshots gerados.

### Decisões de implementação

1. **Arquivo único:** HTML, CSS e JS juntos para facilitar o uso no Koder do
   iPhone e evitar dependências de build.
2. **SVGs inline:** ilustrações originais embutidas, sem imagens externas.
3. **Paleta:** azul-petróleo (`#0d3b4f`), areia (`#e4d5b8`) e branco, com cobre
   (`#b9782f`) como acento — coerente com o público de engenharia.
4. **Calculadora:** parâmetros concentados em `CONFIG_ORCAMENTO` para facilitar
   a configuração comercial. Aviso explícito de que são estimativas ilustrativas.
5. **Formulário:** confirmado localmente, com resumo copiável. Nenhum dado é
   enviado ou armazenado em `LocalStorage` (evita dados pessoais reais em
   aplicação pública).
6. **Contato MOSS:** botão do rodapé com mensagem preenchida que identifica a
   demo, sem confundir com o atendimento da empresa fictícia.

### Correções durante o desenvolvimento

| Item | Antes | Depois | Motivo |
|------|-------|--------|--------|
| Linha inválida no JS | `document.querySelectorAll('.ponto-visivel').ponto => 0;` | removida | Era erro de sintaxe que impedia o script de executar |
| Regex do teste da calculadora | `/R\\$|R\\s?\\$/.test(calc)` | `calc.includes('R$') && /\d/.test(calc)` | O regex estava escapado incorretamente e gerava falso negativo |
| Ilustrações repetidas no portfólio | 'rural' e 'estrada' apareciam 2× cada | adicionados tipos 'preservacao' e 'ponte' | Evitar imagens repetidas sem necessidade |

### Arquivos e linhas das alterações importantes

- `index.html` — bloco `<script>`, seção 6 (planta interativa): remoção da linha
  inválida (aprox. linha 690 do arquivo).
- `index.html` — arrays `PROJETOS` e função `ilustracaoProjeto` (aprox. linhas
  480 e 610): novos tipos de ilustração.
- `tests/cdp-smoke.js` — verificação da calculadora (aprox. linha 100).
- `tests/capturar.js` — novo script de captura de screenshots.

### Próximo passo

Demo 02 — PERÍCIA JUDICIAL PRIME (`pericia-prime/`).
