# MOSS Digital — Integrações técnicas de Black Diamond

Este documento é um **roteiro de estudo e implementação futura**, não significa que os serviços já estão contratados ou em produção.

## 1. Hospedagem estática

- Hospedar HTML/CSS/JS no GitHub Pages, Cloudflare Pages ou Netlify (verificar condições dos planos).
- Manter `index.html`, `css/`, `js/`, `assets/` juntos na pasta do site.
- Publicar somente depois de testes em celular/desktop e aprovação.
- Verificar `https://`, redirecionamento e carregamento de recursos no site publicado.

## 2. Domínio e DNS

- Registrar ou usar domínio do cliente e confirmar titularidade.
- Ajustar registros DNS (`A`, `AAAA` e/ou `CNAME`) conforme instruções **da hospedagem escolhida**, sem copiar IPs de exemplos.
- Configurar domínio personalizado no provedor, habilitar certificado HTTPS e testar versões `www` e raiz.
- Validar URLs, sitemap e indexação após publicação.

## 3. Banco de dados com Supabase (somente se o escopo exigir)

- Projetar tabelas de `servicos`, `solicitacoes`, `clientes` e, quando fizer sentido, `agendamentos`.
- Definir finalidade, retenção e regras de acesso dos dados coletados; evitar informações sensíveis desnecessárias.
- Criar projeto, tabelas e políticas **Row Level Security (RLS)** antes de disponibilizar qualquer API pública.
- Não colocar `service_role` nem segredos na página web. Chave pública só com permissões mínimas e RLS revisada.
- Se houver escrita pública, proteger contra abuso (ex.: rate limit/CAPTCHA) e validar dados no servidor.
- Não coletar nem enviar informações de saúde de pacientes/pets ou documentos sensíveis pelo formulário desta demo.

## 4. Pagamentos por Pix e cartão (futuro)

- Confirmar empresa recebedora, conta no provedor de pagamentos, taxas, reembolsos e termos.
- Preferir checkout hospedado de provedor confiável (ex.: Mercado Pago), sem armazenar números de cartão no site.
- Criar pedidos no backend e gerar links/sessões de pagamento usando chaves secretas apenas no servidor.
- Confirmar pagamentos por **webhook validado** no backend; não confiar em mensagem do navegador ou query string para marcar como pago.
- Testar primeiro em sandbox com pagamento aprovado, recusado, pendente e reembolso; depois fazer liberação controlada.
- Não exibir promessa de pagamento online enquanto checkout, fluxo e conciliação não estiverem funcionando.

## 5. APIs, webhooks e segurança

- Backend separado, HTTPS, variáveis de ambiente e segredos fora do GitHub.
- Revisar CORS, autenticação, autorização por operação, logs sem dados sensíveis e backups.
- Implementar política de privacidade e adequação à LGPD de acordo com o uso real de informações.
- Monitorar falhas, erros de APIs, mensagens de webhook e manutenção de integrações.

## 6. Fluxo atual (já implementado)

**Visitante → catálogo/formulário → WhatsApp (11) 94203-8103 → atendimento humano.**

A página não envia dados a Supabase, banco, e-mail, gateway de pagamento ou serviços terceiros (exceto navegação para WhatsApp ao clicar).

## 7. Evolução específica deste segmento

Em versão comercial, cadastrar pacotes e serviços, emitir pedidos e confirmar pagamento por checkout externo.
