# Integrações futuras — Mercatto

## Funcionamento atual
HTML/CSS/JS locais e botão de WhatsApp. Os produtos e preços são de demonstração. Nenhum pagamento, frete ou estoque real está conectado.

## Caminho de implantação recomendado
1. **Personalização:** logotipo próprio do cliente, identidade, contatos, preços reais, termos de venda, fotografias autorizadas e descrição fiel dos produtos.
2. **Hospedagem e domínio:** domínio no nome do cliente; hospedagem estática com HTTPS e DNS verificados; URLs canônicas, acessibilidade e SEO.
3. **Supabase:** tabelas `products`, `product_images`, `categories`, `inventory`, `carts`, `orders` e `order_items`; esquema de IDs, restrições, índices e trilha de auditoria.
4. **Autenticação:** painel de gestão restrito; habilitar políticas RLS por usuário e função. Jamais expor credencial administrativa ou chave secreta no navegador.
5. **Carrinho e pedidos:** substituir dados fictícios por API e validação de preços/estoque no backend; evitar confiar em totais calculados no cliente.
6. **Pix/cartão:** usar checkout hospedado pelo provedor autorizado; manter segredos no servidor; conferir pagamento exclusivamente por webhook autenticado.
7. **Logística:** integrar CEP, tabelas de frete, regiões e disponibilidade por APIs reais e autorizadas; não inventar prazo de entrega.
8. **LGPD:** coletar o mínimo de informações pessoais necessárias; explicar finalidade, políticas, retenção, segurança e atender solicitações de titulares.
9. **Homologação:** testes de responsividade, acessibilidade, falhas de pagamento, compras concorrentes, controle de estoque, logs e recuperação.

## Quando for marketplace com múltiplos vendedores
A arquitetura muda: cadastro de lojistas, auditoria de vendedores, gestão de comissões, moderação, repasses, suporte, tributação e termos comerciais. **Esta demo não implementa marketplace verdadeiro.**

## Importante
Todas as integrações acima são **orientações de desenvolvimento**, não recursos já implementados. Dimensionar e orçar separadamente conforme a necessidade do cliente.
