# Mercatto — Demo nº 80 — MOSS Digital

Uma demonstração independente, original e responsiva, construída em HTML, CSS e JavaScript sem frameworks.

**Estilo:** Marketplace de pesquisa e comparação, com busca proeminente e interface amarela e azul.

**Objetivo:** Facilita encontrar, comparar e selecionar produtos para solicitar uma cotação.

## Abrir
1. Extraia a pasta completa, mantendo `css/`, `js/` e `assets/img/`.
2. Abra `index.html` no Edge ou Chrome; para testes de desenvolvimento, use servidor local estático do VS Code.
3. Teste filtros, busca, cards, gaveta de produtos e link do WhatsApp.
4. Leia `PARA-QUEM-E.md` para entender a proposta comercial.

## Arquivos
- `index.html`: estrutura semântica e áreas específicas da loja.
- `css/style.css`: design responsivo, com comentários didáticos em português.
- `js/script.js`: catálogo de oito produtos fictícios e interações documentadas.
- `assets/img/*.svg`: ilustrações temporárias **não fotográficas** para demonstrar a vitrine.
- `FOTOS-PARA-OPENCODE.md`: roteiro para fotografias licenciadas.
- `CREDITOS-FOTOS.md`: controle documental das licenças.
- `INTEGRACOES.md`: possíveis integrações futuras, ainda não executadas.
- `PARA-QUEM-E.md`: público comprador e proposta de venda.

## Limitações
- **Os preços são exemplos**, não ofertas, nem estoque confirmado. Não exibe descontos fictícios ou temporizadores enganosos.
- O carrinho é mantido via `localStorage` quando o navegador permite e não sincroniza outros aparelhos. Não deve receber dados sensíveis.
- O botão de WhatsApp **abre uma mensagem** para `(11) 94203-8103`; não confirma compra nem cria pedido em servidor.
- Não existe checkout real, autenticação, logística ou banco de dados remoto.
- Fotografias reais e logotipos de terceiros devem ter direitos de uso verificados.
- Antes de entregar ao cliente, adaptar marcas, contatos, catálogo, termos e política de privacidade.

**Status:** Protótipo funcional de front-end, não loja de produção.
