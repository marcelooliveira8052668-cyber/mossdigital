# MOSS Digital — envio de portfólio pronto por e-mail

**Destino fixo:** marcelo.oliveira8052668@gmail.com

Este módulo prepara o fluxo solicitado pelo proprietário:

1. O cliente cria o portfólio nos três modelos existentes, com foto, projetos e textos.
2. Depois de preencher e autorizar, clica em **Enviar PDF pronto à MOSS por e-mail**.
3. O navegador monta o PDF usando o modelo selecionado. Não disponibiliza botão de download.
4. Um Cloudflare Worker valida o desafio anti-bot e usa Resend para mandar **um PDF anexado ao Gmail da MOSS**.
5. A MOSS confirma o pagamento e envia manualmente o PDF ao cliente.

## Estado inicial, por segurança

**O serviço de e-mail NÃO está ativado.** O arquivo público `portfolio/email-config.js` está com `endpoint` e `turnstileSiteKey` vazios. Por isso, o botão de envio de PDF por e-mail permanece oculto. O envio atual por WhatsApp continua funcionando.

Não basta colocar o endereço Gmail no código HTML: o GitHub Pages não tem um servidor para gerar e enviar e-mails.

## Passos para ativar sem expor senhas

### 1. Criar serviço de envio no Resend

- Criar conta em https://resend.com.
- Adicionar e verificar o domínio próprio `mossdigital.com.br` ou um subdomínio dedicado.
- Configurar os registros DNS fornecidos pelo Resend no provedor que gerencia o domínio.
- Criar chave de API de envio. **Nunca colocar a chave no GitHub ou no código público.**
- Escolher um remetente no domínio verificado, por exemplo `MOSS Digital <portfolios@mossdigital.com.br>`.

O destinatário final já está fixado no Worker como `marcelo.oliveira8052668@gmail.com`.

### 2. Criar verificação Turnstile

- Em https://dash.cloudflare.com, criar widget Turnstile para os hosts `mossdigital.com.br` e `www.mossdigital.com.br`.
- Copiar a **site key (pública)** e a **secret key (privada)**.
- A chave pública será usada em `portfolio/email-config.js`. A chave privada fica apenas nos *Secrets* do Worker.
- O Worker valida o token, a origem, o domínio e a ação `portfolio_email` em cada pedido.

### 3. Publicar o Cloudflare Worker

A pasta deste documento é um projeto Wrangler. Com Node/npm instalado, fazer login no Cloudflare e publicar a partir desta pasta. É possível configurar pelo painel do Cloudflare.

Antes de publicar, configure como **Secrets** do Worker:

- `RESEND_API_KEY` — chave privada de API do Resend.
- `TURNSTILE_SECRET` — segredo privado do widget Cloudflare Turnstile.
- `EMAIL_FROM` — remetente autenticado, por exemplo `MOSS Digital <portfolios@mossdigital.com.br>`.

Com os Secrets já cadastrados no Worker, executar `npx wrangler deploy` na pasta `portfolio-email-worker`. Anotar a URL HTTPS retornada do serviço, por exemplo `https://moss-portfolio-email.seu-subdominio.workers.dev`.

A rota de pedidos é `/pedido-portfolio`.

### 4. Ativar no site depois de testar o serviço

Editar o arquivo público `portfolio/email-config.js`:

```js
window.MOSS_PORTFOLIO_EMAIL = Object.freeze({
  endpoint: "https://moss-portfolio-email.seu-subdominio.workers.dev/pedido-portfolio",
  turnstileSiteKey: "CHAVE_PUBLICA_DO_TURNSTILE"
});
```

**Esses valores são públicos.** Nunca adicionar `RESEND_API_KEY`, `TURNSTILE_SECRET` ou senhas nesse arquivo.

### 5. Teste de ponta a ponta obrigatório

- Abrir `https://mossdigital.com.br/portfolio/`.
- Preencher uma pessoa de teste, escolher cada modelo e adicionar uma foto.
- Confirmar que o botão de e-mail aparece e que a verificação Turnstile funciona.
- Enviar uma única solicitação e verificar se o e-mail chega a `marcelo.oliveira8052668@gmail.com` com PDF correto, foto e dados.
- Repetir testes com os três modelos, em celular e computador, e sem foto.
- Confirmar que o cliente não recebe o PDF e que o WhatsApp continua operando.
- Não anunciar a função como pronta enquanto o teste real de envio não for aprovado.

## Considerações importantes

- O documento final é gerado no navegador para envio. Um usuário com ferramentas de desenvolvedor pode copiar uma prévia; não há forma de proibir completamente isso em site estático.
- A biblioteca `html2pdf.js` gera um PDF semelhante ao modelo visual. O arquivo contém imagens das páginas (texto pode não ser selecionável). Páginas longas e fotos devem ser verificadas antes da ativação.
- O PDF não fica guardado no GitHub. Resend e Gmail processam/armazenam o e-mail e o anexo conforme suas políticas.
- O serviço limita tamanho do PDF, valida domínio, contato, consentimento e CAPTCHA. Limites adicionais de envio podem ser configurados em Cloudflare se a demanda crescer.
- Não há cobrança automática. O cliente paga R$ 39,90 pelas formas combinadas, e a entrega é manual.
- Uma chave do serviço de e-mail não é a senha do Gmail. Não fornecer credenciais de e-mail para ninguém.
- O serviço pode ter cotas gratuitas e limites de uso que mudam. Monitorar consumo.
- O recurso por WhatsApp permanece de alternativa até validar a entrega por e-mail.

## Arquivos

- `portfolio/index.html`: formulário público com envio condicionado e consentimento.
- `portfolio/portfolio.js`: três modelos e prévia já existentes, **não modificados**.
- `portfolio/portfolio.css`: estilos do novo formulário.
- `portfolio/email-pdf.js`: criação do PDF no navegador e encaminhamento ao Worker.
- `portfolio/email-config.js`: configuração pública, inicialmente vazia.
- `portfolio-email-worker/worker.js`: endpoint de envio com destinatário fixo e Resend.
- `portfolio-email-worker/wrangler.toml`: configuração Cloudflare, sem segredos.
