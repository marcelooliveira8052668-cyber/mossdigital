# Estaciona+ — Como transformar a demo em sistema real

## Estado atual
Front-end em HTML/CSS/JavaScript sem backend. WhatsApp é o destino dos pedidos e orçamentos. Nem a mensagem do WhatsApp significa pedido confirmado.

## Sequência de estudos recomendada
1. **Hospedagem e domínio:** começar com GitHub Pages/Netlify/Vercel; registrar domínio no Registro.br; configurar DNS `A` ou `CNAME`, HTTPS e testar em dispositivos diferentes.
2. **Supabase e banco de dados:** modelar tabelas e relacionamentos antes de programar; usar autenticação e Row Level Security (RLS) para proteger registros.
3. **Serviços e APIs:** separar front-end, regras de negócio e validação no servidor. Nunca guardar chaves administrativas em JavaScript do navegador.
4. **Pix e cartão:** preferir checkout hospedado por intermediador de pagamentos; receber webhooks no servidor para atualizar pedidos; não capturar nem armazenar número de cartão.
5. **Automação:** criar alertas, relatórios, confirmações e notificações apenas após integrar os dados no backend.
6. **Operação:** backups, logs, testes de falhas, permissões, política de privacidade e cuidados com a LGPD.

## Como explicar ao cliente
"Esta versão recebe pedidos/orçamentos pelo WhatsApp. Podemos fazer uma proposta separada para integrar agenda, banco de dados, painel, Pix e cartão, após analisar custos, segurança e necessidades."

**Não afirmar** que as integrações já funcionam. Só publicar com autorização do proprietário da MOSS Digital.
