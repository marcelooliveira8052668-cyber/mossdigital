# Guia prático de conexões — Forma 3D

## Situação atual
- Segmento: Impressão 3D personalizada.
- Função principal: Simulador ilustrativo por material, peso, tempo, quantidade e acabamento; contato com estúdio por WhatsApp.
- Front-end local: HTML, CSS e JavaScript, sem servidor.
- WhatsApp autorizado: (11) 94203-8103.
- **Não há banco de dados online, pagamento Pix/cartão, agenda real ou sincronização entre dispositivos.**

## 1. Hospedagem e domínio
1. Abrir `index.html` localmente e testar os botões.
2. Publicar em GitHub Pages, Netlify ou Vercel após aprovação.
3. Configurar o domínio no painel de DNS (CNAME ou A conforme o provedor de hospedagem), habilitar HTTPS e aguardar propagação.
4. Testar os caminhos `css/style.css`, `js/script.js`, `assets/img/` e WhatsApp no endereço publicado.

## 2. Supabase — evolução possível
Upload seguro de arquivos, registro de pedidos e checkout hospedado após orçamento.
- Projetar entidades e campos necessários antes de escrever SQL.
- Configurar autenticação e **Row Level Security (RLS)** para impedir que um cliente veja dados de outro.
- Nunca colocar chave `service_role`, segredos, senhas ou tokens de pagamento no JavaScript do navegador.
- Validar entradas e permissões no servidor.
- Implementar backup, exclusão e política de privacidade apropriados quando houver dados pessoais.

## 3. Pix, cartão e webhooks
- O proprietário deve contratar gateway apropriado e usar checkout hospedado/link de pagamento.
- Transações e confirmação de pedidos precisam ser verificadas em servidor ou função segura por **webhook autenticado**.
- Nunca confiar apenas no retorno do navegador para marcar pedido como pago.
- Não armazenar número completo de cartão, CVV ou chaves secretas no front-end.
- Começar em ambiente de testes, configurar a conta de produção e só então ativar para clientes.

## 4. Como oferecer ao cliente
Versão inicial: demonstração funcional e contato por WhatsApp.
Versão conectada: proposta separada após levantar requisitos, prazos, manutenção, segurança e custos dos provedores.

## Check de implantação
- [ ] Revisar nome, endereço, preço e imagens reais do cliente.
- [ ] Testar navegação e formulários em desktop e celular.
- [ ] Testar a URL definitiva com HTTPS e DNS.
- [ ] Revisar segurança e privacidade de dados.
- [ ] Confirmar autorização do proprietário antes de publicar.
