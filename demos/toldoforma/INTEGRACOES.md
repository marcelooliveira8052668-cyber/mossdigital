# Conexões e integrações — ToldoForma

## Como funciona HOJE

Escolha do modelo, acabamento e medidas; simulação fictícia e mensagem de orçamento via WhatsApp.

- HTML/CSS/JavaScript puro; sem Node, banco de dados, API ou servidor.
- WhatsApp: **(11) 94203-8103**; envia mensagem apenas após o visitante confirmar no aplicativo.
- Dados de demonstração são fictícios.
- Cadastro local, quando existir, fica no navegador e **não** é seguro para informações de clientes reais.
- Pix/cartão: **não estão integrados**.

## Como funcionaria um sistema comercial de verdade

```text
Navegador (site e formulários)
    ↓ HTTPS
API segura / funções de servidor (regras, autenticação, validação)
    ↓
Banco de dados (Supabase/PostgreSQL)
    ↓ se houver pagamentos
Gateway com checkout hospedado (Pix e cartão)
    ↓ webhook assinado e validado no servidor
Atualização do pedido + painel de gestão
```

### Banco de dados Supabase
Modelo inicial sugerido, a validar com o cliente:

`modelos (id, nome, custo_base), propostas (id, empresa_id, largura, projecao, material, etapa, status), visitas_tecnicas`

Exercício didático: gravar propostas e anexos de visita após login; preços reais calculados por serviço protegido; integração com agenda e checkout hospedado opcional.

**RLS e autorização:** cada empresa acessa apenas os próprios registros. Não coloque chaves secretas, tokens de serviço ou senha no `index.html` ou `js/script.js`.

### Hospedagem e domínio
- Site estático: GitHub Pages, Netlify ou Vercel.
- Backend com webhook: hospedagem que execute funções de servidor.
- Domínio registrado: configurar DNS (A/AAAA ou CNAME conforme o provedor), certificado HTTPS e domínio preferido.
- Testar o caminho do formulário, as rotas e o WhatsApp antes de publicar.

### Pix e cartão
- Nesta demo, o orçamento é encaminhado apenas ao WhatsApp.
- Para cobrança real, usar provedor de pagamento com checkout hospedado, evitando receber números de cartão nos próprios formulários.
- Valores devem ser confirmados no backend; **não confiar nos preços vindos do JavaScript do navegador**.
- Confirmar status por webhook assinado, idempotente, registrado em log. Nunca marcar como pago apenas por redirecionamento de página.

### Segurança e privacidade
- Definir o mínimo de dados necessários (LGPD).
- Criar política de privacidade, controle de acesso, backups, logs e política de retenção antes de trabalhar com dados reais.
- Testar fluxo de erro, falha de pagamento, rede lenta e dispositivos diferentes.

## Checklist para aprender na prática

- [ ] Publicar cópia em endereço de testes.
- [ ] Configurar domínio e HTTPS.
- [ ] Criar projeto de teste no Supabase.
- [ ] Definir tabelas, políticas RLS e regras de validação.
- [ ] Criar API segura para salvar e ler dados.
- [ ] Testar leitura com dois usuários de organizações diferentes.
- [ ] Experimentar checkout de sandbox, sem dinheiro real.
- [ ] Verificar webhook de confirmação e controle de duplicidade.
- [ ] Revisar segurança e custos antes de oferecer ao cliente.

> Guia educacional: não significa que essas integrações já existam neste projeto.
