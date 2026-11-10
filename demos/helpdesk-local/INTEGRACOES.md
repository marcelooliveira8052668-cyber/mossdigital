# Integrações — HelpDesk Local

## 1. O que funciona sem servidor
CRUD local de chamados, filtro por status, métricas da fila e permissões futuras. Contato comercial pelo WhatsApp (11) 94203-8103, apenas após o usuário clicar.

## 2. Caminho de evolução técnica
1. **Domínio e DNS:** comprar domínio, configurar A/CNAME para o serviço de hospedagem, ativar HTTPS e conferir canonical.
2. **Hospedagem:** GitHub Pages para esta versão estática. Para funções de backend, integrar plataforma com API e variáveis de ambiente seguras.
3. **Supabase:** modelar `Tickets, usuários, categorias, anexos e histórico de movimentações.`.
4. **Autenticação:** contas por equipe/empresa, com controles de acesso e Row Level Security (RLS).
5. **Armazenamento:** fotos e anexos em buckets com permissões apropriadas.
6. **Pedidos, Pix e cartão:** usar gateway certificado com checkout hospedado. Não armazenar números completos de cartão nem chaves secretas no navegador.
7. **Webhooks:** confirmação assinada recebida em servidor seguro, atualização idempotente de pedido/serviço.
8. **Segurança/LGPD:** coletar somente dados necessários, oferecer aviso de privacidade, proteger acesso e estabelecer retenção/eliminação de dados.

## 3. Cuidados específicos desta demo
Supabase Auth + Row Level Security por empresa, banco de dados relacional, notificações via backend e auditoria; nunca armazenar senhas no front-end.

## 4. Checklist para atender um cliente
- Entender fluxo de trabalho real e responsáveis.
- Decidir quais recursos exigem banco de dados e quais podem ficar no WhatsApp.
- Orçar domínio, hospedagem, banco, gateway e manutenção.
- Implementar em ambiente de testes, validar erros e permissões.
- Demonstrar em desktop/celular com dados fictícios.
- Publicar somente após aprovação explícita do cliente/proprietário.

## Situação de hoje
**Não há conexão ativa** com Supabase, DNS, servidor de pagamentos, Pix ou cartões. Este arquivo ensina o que seria necessário para integrar, mas não substitui a implementação.
