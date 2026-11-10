# Integrações previstas — Sentinela Digital

## Situação atual
Front-end HTML/CSS/JavaScript, recursos locais e WhatsApp com texto pré-preenchido. Não existe banco remoto, autenticação, reserva efetivada, transação Pix/cartão nem confirmação automática.

## Caminho para um produto real
1. **Domínio**: de titularidade do cliente, DNS e HTTPS validados.
2. **Hospedagem**: site estático em serviço compatível; configurar caminhos e SEO.
3. **Banco de dados**: se houver necessidade, criar projeto Supabase (PostgreSQL), tabelas próprias para consultoria de segurança da informação defensiva, validação e políticas RLS.
4. **Acesso**: implementar autenticação segura quando houver dados privados; nunca deixar tokens secretos no JavaScript.
5. **API/back-end**: processar pedidos, estados e notificações com autorização; tratar erros e idempotência.
6. **Pagamento**: somente se contratado, provedor autorizado de checkout hospedado, confirmação por webhook no servidor e testes de homologação.
7. **Privacidade**: coletar apenas o necessário e elaborar política de privacidade alinhada à LGPD.
8. **Publicação**: testar no Edge, Safari, Chrome e celular, além de acessibilidade, imagens e desempenho.

## Atenção
Preços, resultados e disponibilidade são ilustrativos. Nunca prometer uma integração que ainda não foi desenvolvida.
