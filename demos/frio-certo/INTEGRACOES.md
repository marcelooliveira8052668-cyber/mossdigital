# Aprendizado de integrações — Frio Certo

## O que funciona agora
A demo abre localmente com HTML, CSS e JavaScript. Formulários montam mensagens para WhatsApp **(11) 94203-8103**. Não há integração com Pix, cartão, estoque remoto ou banco de dados.

## Caminho prático para um cliente real
1. **Hospedagem:** publicar arquivos estáticos em GitHub Pages, Cloudflare Pages, Netlify ou serviço equivalente.
2. **Domínio:** configurar DNS (CNAME ou A conforme o provedor), SSL e redirecionamento.
3. **Supabase:** modelar tabelas com autenticação e RLS para separar dados de clientes. Nunca colocar chave de serviço nem senha no JavaScript do navegador.
4. **API/back-end:** validar dados, criar pedidos e consultar registros com controle de acesso.
5. **Pagamento:** usar checkout hospedado de provedor de pagamentos, sem coletar dados de cartão no site.
6. **Pix:** integrar meio de pagamento suportado por um provedor, com retorno de confirmação no servidor.
7. **Webhook:** validar assinatura, processar eventos repetidos com idempotência e atualizar o status real do pedido.
8. **Testes:** simular pagamento aprovado, recusado, cancelado e eventos atrasados em ambiente de teste.

## Estado específico
Valores, estoques, prazos e disponibilidade são apenas ilustrativos e precisam ser confirmados pelo estabelecimento.

## Modelo de arquitetura
Navegador → API segura → banco Supabase → gateway de pagamento → webhook confirmado → pedido atualizado.

> Não afirmar ao cliente que pagamentos ou sincronização estão funcionando antes de implementar e testar.
