# Verificação da prévia — 12/11/2026

Executada em Chromium/Playwright com `tools/test-passo-atelier.cjs`:

- Dez produtos e dez fotografias reais locais; imagens decodificadas sem falhas.
- Categorias retornam quantidades esperadas, busca sem acentos, filtros combinados e consulta sem resultados.
- Limpeza de filtros e ordenação por preço.
- Favoritos e sacola com persistência local; não se trata de banco de dados.
- Abertura por teclado, fechamento com Escape, foco inicial e retorno ao produto.
- Seleção obrigatória de tamanho, variantes, quantidades, remoção e subtotais conferidos em centavos.
- Resumo identificando claramente que nenhum pedido foi enviado.
- Guia de escolha, manual e créditos acessíveis.
- Sem overflow da página nas larguras 320, 375, 390, 768, 1024 e 1440 pixels.
- Conector Supabase e fallback exercitados com respostas de rede simuladas. **Não é uma validação de Supabase real, autenticação ou RLS em produção.** O SQL não foi executado em projeto remoto.
- Abertura por arquivo local e leitura de produto verificadas.
- Capa Instagram PNG conferida visualmente e validada em 1080 × 1350 pixels, sem corte de texto.
- Nenhum erro JavaScript capturado no fluxo local.

Não é certificação de acessibilidade nem teste de todos os navegadores. Antes de uma loja real, revisar mercadorias, marcas, fotos, preços, grade, direitos, operação e políticas; testar infraestrutura e integração real separadamente.

## Publicação

Aprovada pelo proprietário em 12/11/2026. Card da home e entrada no catálogo preparados para o endereço `/demos/passo-atelier/`. Registro da publicação em `docs/PUBLICACAO-PASSO-ATELIER.md`. Nenhuma rede social recebeu postagem.
