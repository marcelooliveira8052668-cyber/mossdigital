# Integrações para a demo Casa Acolher

## O que funciona HOJE
- HTML, CSS e JavaScript no navegador, com WhatsApp para contato.
- Solicitação simples de visitas via WhatsApp, sem coletar diagnósticos
- Não há domínio novo, banco de dados remoto, autenticação, estoque oficial ou checkout real integrado.

## Como transformar em solução profissional (ordem recomendada)
1. **Domínio:** registrar domínio com titularidade do cliente; ajustar registros DNS (`A`, `CNAME`, conforme hospedagem) e verificar HTTPS.
2. **Hospedagem:** publicar arquivos em hospedagem estática, testar caminhos e configurar URL canônica; se houver APIs, incluir backend/serviço apropriado.
3. **Supabase:** criar projeto, tabelas `visitas, disponibilidades, usuarios_internos` com chaves primárias, `created_at`, regras RLS e papéis autorizados.
4. **Login e painel:** autenticação segura para administradores; não deixar gravação pública aberta.
5. **Pagamentos:** checkout hospedado por provedor autorizado; Pix/cartão via backend seguro, com credenciais apenas no servidor.
6. **Webhook:** confirmar pagamento no backend após validação da assinatura do provedor; nunca confiar só no retorno da página.
7. **LGPD:** solicitar somente dados necessários; explicar finalidade, retenção e controle de acesso.
8. **Testes:** realizar testes em ambiente de homologação, revisar cálculos, backups e erros antes de usar com clientes.

## Como ensinar isso passo a passo
- Primeiro entenda entrada → validação → armazenamento → consulta → resposta.
- Depois integre UMA função da demo ao Supabase em modo de testes.
- Só depois implemente autenticação, autorizações e checkout.
- Não guardar números de cartão, senhas, tokens de serviços ou segredos no JavaScript do navegador.

## Particularidades desta demo
Para uso real, validar enquadramento legal e licenças locais, acessibilidade, equipe e serviços. Nunca inventar suporte médico e não coletar dados sensíveis de residentes em formulários públicos.

## Declaração comercial
Esta é uma **demonstração**, não um sistema com automações, pagamentos ou operação real em produção. Os preços, empresas e informações são fictícios, para portfólio.
