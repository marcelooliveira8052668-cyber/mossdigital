# Integrações — Clean Express

## Situação atual
Esta demo funciona como apresentação comercial estática, com contato via WhatsApp e sem banco de dados.

## O que pode ser conectado depois
1. **Domínio e DNS** — apontar para hospedagem estática ou plataforma full stack.
2. **Hospedagem** — GitHub Pages, Netlify, Vercel, Render ou servidor próprio.
3. **Banco de dados / Supabase** — cadastro de produtos, clientes, pedidos e painel.
4. **Autenticação** — área do cliente, área administrativa e permissões.
5. **Pix e cartão** — checkout hospedado, link de pagamento ou API de gateway.
6. **Webhooks** — confirmação automática de pagamentos e pedidos.
7. **Armazenamento de imagens** — bucket no Supabase, Cloudinary ou S3.

## Recomendação didática
Antes de vender uma integração real, mapear:
- onde os dados nascem;
- onde são guardados;
- como o sistema confirma o pedido;
- qual gateway fará o pagamento;
- como lidar com falhas e segurança.

## Atenção
Ainda não há checkout, nem banco de dados, nem painel administrativo nesta versão.
