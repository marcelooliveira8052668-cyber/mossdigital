# Pequenos Encantos Kids 2.0 — demonstração MOSS Digital

Site de demonstração em arquivo único `index.html`, exibido em `/demos/pequenos-encantos-kids/`.

## O que a versão inclui
- Catálogo inicial de **74 produtos ilustrativos** (bebês, moda infantil, brinquedos e kits de presentes).
- Busca, filtros, favoritos, seleção de tamanhos e carrinho.
- Sugestões de presentes, catálogo importável/exportável em JSON.
- Painel administrativo **demonstrativo e sem autenticação**, acessível pela engrenagem do site.
- Links comerciais do WhatsApp apontam para a MOSS Digital; não há checkout nem vendas reais.

## Limitações importantes
- Os produtos, preços, avaliações e estoque são **fictícios/ilustrativos**.
- Alterações de produtos e carrinho usam **localStorage** do navegador. Não ficam sincronizadas entre computadores e podem desaparecer ao limpar os dados locais.
- Qualquer visitante pode abrir o painel demonstrativo, mas suas alterações são locais ao próprio navegador.
- O painel NÃO é um sistema de administração seguro para clientes reais. Para produção, implementar login, autorização por papéis, validação no servidor, regras RLS, banco de dados (por exemplo Supabase), backups e política de dados.
- As fotos são carregadas de serviços externos e podem eventualmente falhar. Validar licenças e substituir por fotos do cliente na entrega comercial.
- Não publicar como loja de cliente nem ativar pagamentos sem aprovação.

## Arquivos
- `index.html`: site e interações, com comentários explicativos em português.
- `capa.svg`: capa exclusiva do cartão no catálogo da MOSS.

## Registro da publicação
- Nova pasta da demonstração criada sem modificar outras demos.
- Apenas um novo cartão no catálogo da página inicial, categoria **Comércio**.
- O cartão informa as limitações do painel de demonstração.
