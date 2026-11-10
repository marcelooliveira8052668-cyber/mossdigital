# CHRONOS PRIME — Demo de relojoaria

Site estático independente, desenvolvido em HTML, CSS e JavaScript puros.

## Executar
Abra `index.html` em navegador moderno ou sirva a pasta com `python -m http.server 8000` e acesse `http://localhost:8000`. Pode ser aberto no Koder. Não requer instalação de dependências.

## O que funciona
100 produtos fictícios, filtros, busca, ordenação, modal de detalhes, carrinho com quantidades, armazenamento local e preparação de mensagem por WhatsApp (quando configurado).

## Limitações importantes
**As 100 imagens são ilustrações SVG individuais, não fotografias reais verificadas.** Nenhuma correspondência com produtos comerciais foi comprovada. Os preços, nomes e informações de estoque são fictícios. Pix e cartão NÃO cobram, NÃO confirmam pagamento e NÃO estão integrados. Não use esta versão para vendas reais sem revisão de catálogo, imagens, condições comerciais, privacidade e pagamentos.

## Arquivos
- `index.html`: estrutura HTML.
- `css/style.css`: estilos e responsividade.
- `js/config.js`: dados públicos configuráveis.
- `js/produtos.js`: catálogo.
- `js/carrinho.js`: lógica de armazenamento local.
- `js/script.js`: interface, filtros e eventos.
- `assets/img/produtos/`: 100 ilustrações SVG geradas para a demo.

## Publicação
Nenhum repositório foi criado ou alterado. Este pacote é separado da MOSS Digital. Publicação no GitHub somente mediante autorização.


## Pagamentos preparados

O checkout oferece seleção Pix e cartão com adaptador para backend seguro. O modo padrão é demonstração, sem cobrança. Consulte `INTEGRACAO-PAGAMENTOS.md` para configurar o provedor.

## Fotografias reais
Consulte `COMO-COLOCAR-FOTOS-REAIS.md` e `CATALOGO-FOTOS.csv`. A versão atual usa 100 ilustrações vetoriais originais até que fotos reais com licenças e modelos verificados sejam fornecidas.

## Versão 05 — favoritos
- Botão de coração em cada um dos 100 cards, com seleção acessível.
- Filtro **Meus favoritos** e contador de itens salvos.
- Persistência local no navegador; não exige banco de dados.
- Para modificar os textos e a chave de armazenamento, consulte os comentários em `js/script.js`.
- As 100 imagens continuam ilustrativas; fotografias reais ainda dependem de validação individual.
