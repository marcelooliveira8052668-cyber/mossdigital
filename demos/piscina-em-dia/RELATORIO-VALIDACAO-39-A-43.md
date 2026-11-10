# MOSS Digital — Validação do lote 39 a 43

## Resultado da revisão

- **10 de 10 verificações de tela passaram** (5 demos × 2 larguras de referência: 1440 px e 390 px).
- JavaScript: sintaxe verificada com `node --check` em cada projeto.
- Foram verificados: menus móveis, rolagem horizontal, renderização de marcadores de fotos, cadastro de fichas, calculadoras, busca, carrinho, filtros, registros e geração de mensagens para WhatsApp.
- Links locais de HTML, CSS e scripts: conferidos; manuais de fotografias possuem os nomes dos arquivos esperados.
- Nenhuma publicação ou alteração no site oficial foi realizada.

## Limitação honesta dos testes

O Chromium deste ambiente bloqueou o carregamento de arquivos `file:///...` por política administrativa. Para validar componentes, os arquivos HTML, CSS e JS foram **carregados juntos em uma página isolada de testes**. Isso permitiu executar interações reais no DOM, mas **não comprova a abertura normal por duplo clique no Edge do seu notebook**. As fotografias reais ainda não foram inseridas. Faça revisão manual antes de publicar.

## Resultados de cada demo

- **39 — Sola Viva:** fichas criadas, atualizadas e excluídas; persistência simulada verificada; formulário gera WhatsApp.
- **40 — Pedra Exata:** mudança de material, cálculo de área e geração de proposta para WhatsApp.
- **41 — Embalagem Direta:** oito produtos, filtros por texto, adição ao carrinho, total, salvamento local simulado e cotação WhatsApp.
- **42 — ExtinControl:** registros administrativos, métricas, persistência simulada e exclusão. Sem certificação ou laudo técnico.
- **43 — ToldoForma:** seleção de modelo, mudança de etapas, cálculo de área e proposta WhatsApp.

## Pendências antes da aprovação comercial

- [ ] Inserir fotos reais com licença verificada, usando `FOTOS-PARA-OPENCODE.md`.
- [ ] Abrir cada demo extraída no Microsoft Edge (notebook do proprietário).
- [ ] Conferir responsividade e enquadramento das fotos nos cards.
- [ ] Trocar nomes, textos e valores fictícios por informações autorizadas de cliente real.
- [ ] Revisar privacidade e segurança antes de usar dados verdadeiros.
- [ ] Conferir duplicidades com os 51 modelos já publicados.
- [ ] Solicitar autorização explícita antes de publicar qualquer demo no GitHub.

**Situação:** lote de protótipos funcionais e revisados, pendente de fotos e aprovação comercial. **Não confundir com sistemas integrados ou publicados.**
