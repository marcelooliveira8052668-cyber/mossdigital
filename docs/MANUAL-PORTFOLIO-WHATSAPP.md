# Manual MOSS — portfólio pelo WhatsApp, sem mensalidade

## O que está pronto e o que falta

O fluxo não usa Cloudflare, Resend, cadastro ou pagamento automático. O cliente baixa os arquivos e envia manualmente no WhatsApp. O PDF usa uma biblioteca gratuita pela internet. O pedido e a foto não são enviados a um servidor de PDF.

As alterações precisam ser publicadas no GitHub para aparecerem no site. Preparar os arquivos no computador não altera o site no ar.

## 1. O cliente monta e envia

1. Acessa `https://mossdigital.com.br/portfolio/`.
2. Escolhe modelo e cor, adiciona foto (até 3 MB), nome, profissão e projetos.
3. Confere a prévia. A página não salva o preenchimento: não fechar antes de baixar.
4. Clica em **1. Baixar prévia em PDF**. O PDF tem a inscrição “PREVIA - MOSS DIGITAL” em todas as páginas.
5. Clica em **2. Baixar arquivo do pedido**. O arquivo `pedido-portfolio-nome.json` contém textos, modelo, cor e foto. Não é um PDF; não precisa abrir nem editar.
6. Clica em **3. Abrir WhatsApp**.
7. Na conversa, escolhe o clipe ou **+ → Documento / Arquivo**, seleciona o JSON e o PDF na pasta Downloads e toca em **Enviar**. Pode enviar os dois separadamente.

**Importante:** clicar em baixar ou abrir o WhatsApp não confirma recebimento. A MOSS só recebe quando o cliente envia na conversa. Se o aparelho não permitir anexar JSON, peça os dados e a foto separadamente e preencha novamente o montador; gere um novo arquivo de pedido no computador.

## 2. Você recebe e combina o pagamento

1. Confira se recebeu o PDF e, principalmente, o arquivo **.json**. Só o PDF não permite gerar novamente com a foto e os textos originais.
2. Baixe o JSON para uma pasta particular no seu computador.
3. Combine prazo, preço de R$ 39,90 e forma de pagamento na conversa.
4. Confira o pagamento no seu banco. Não considere apenas um comprovante ou uma declaração do cliente.

Mensagem sugerida:

> Recebi seu pedido! Vou conferir as informações. O valor é R$ 39,90 e o prazo combinado é ____. Após confirmar o pagamento, envio o PDF final sem marca-d’água.

## 3. Você gera o PDF final

1. Extraia completamente o pacote da ferramenta em uma pasta particular (não abra de dentro do ZIP).
2. Abra `.moss-local/finalizar.html` com Edge ou Chrome. Mantenha a pasta `portfolio` que acompanha o pacote no mesmo lugar, sem renomear arquivos.
3. Em **Arquivo do pedido**, escolha o JSON recebido pelo WhatsApp.
4. Confira nome, foto, textos, links e projetos na prévia.
5. Marque **Conferi o pedido e confirmei o pagamento na minha conta**.
6. Clique em **Gerar PDF final sem marca-d’água**. O navegador baixa `portfolio-final-nome.pdf`.
7. Abra o PDF e confira **todas as páginas**, especialmente fotos, textos longos e quebras de página.

Você não apaga a marca do PDF do cliente. A ferramenta cria outro PDF a partir dos dados do pedido.

Se precisar corrigir dados, peça ao cliente uma nova versão do pedido ou preencha as correções no montador público e baixe outro JSON. A ferramenta local não é um editor de textos.

## 4. Você entrega

No WhatsApp do cliente, escolha **Anexar → Documento**, selecione **somente o PDF final**, confira o destinatário e envie.

> Seu portfólio está pronto! Segue o PDF final sem marca-d’água. Confira e me avise se encontrar algum erro nos dados combinados.

Não envie a ferramenta de finalização ao cliente. Não envie o JSON como se fosse o produto final. O pacote local não publica sites nem gera domínio ou hospedagem.

## Cuidados e problemas comuns

- **PDF não baixa:** confira a internet, tente Edge/Chrome atualizado, aguarde até um minuto, permita downloads e tente uma foto menor. Se a biblioteca externa estiver bloqueada, a geração falha com aviso; o arquivo do pedido ainda pode ser baixado.
- **Arquivo não abre no finalizador:** use o JSON original, não o PDF, uma imagem ou um arquivo renomeado. Peça novo download se estiver inválido. Limite de importação: 5 MB.
- **Cliente mudou algo após baixar:** peça para baixar e enviar novamente os dois arquivos. A entrega usa o JSON selecionado, não a última prévia de uma aba diferente.
- **Privacidade:** JSON inclui dados e foto. Não publique pedidos no GitHub ou em grupos. Guarde apenas durante o prazo necessário para atendimento e elimine as cópias conforme sua política de privacidade e obrigações aplicáveis.
- **Segurança:** a ferramenta local não é um painel com login. Não coloque `.moss-local` no site. Ela está ignorada pelo Git. A marca-d’água não é proteção anticópia: alguém com conhecimento técnico pode recriar conteúdo exibido no navegador.
- **Limitações do PDF:** o conteúdo é renderizado como imagem, podendo não ter texto selecionável. O arquivo deve ser revisado; o modelo editorial (paisagem) e textos longos podem produzir quantidades diferentes de páginas.
- **Custos:** não há mensalidade ou conta de envio neste fluxo. Internet, banco e WhatsApp continuam sujeitos às condições normais dos respectivos serviços.

## Publicação e arquivos

Publicar alterações em `portfolio/index.html`, `portfolio/portfolio.js`, `portfolio/arquivos.js` e `portfolio/portfolio.css`. Manter os demais arquivos de estilo. A configuração de e-mail pode continuar vazia.

**Nunca publicar** `.moss-local/`, pedidos, PDFs com dados de clientes ou o ZIP da ferramenta. A ferramenta particular precisa de `.moss-local/finalizar.html`, `portfolio/portfolio.js` e `portfolio/arquivos.js`, mantendo essa estrutura de pastas.

Antes de anunciar o recurso, faça um pedido de teste com o modelo editorial (inclusive um pedido antigo com um dos modelos removidos, para conferir o mapeamento), envie para seu WhatsApp, abra o JSON na ferramenta, confira a marca em todas as páginas da prévia e confirme que o final não tem marca. Faça também um teste pelo celular.
