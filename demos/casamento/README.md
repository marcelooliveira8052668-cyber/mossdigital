# Clara & Tomás — site de casamento demonstrativo

Casal, história, evento, data e local fictícios. Não há cerimônia, endereço, reserva, lista de convidados, Pix ou lista de presentes real.

- Data ilustrativa: 22/05/2027 às 16h, UTC−03. A contagem é calculada no navegador e fica em zero se a data já passou.
- Formulário nativo com nome fictício limitado a 80 caracteres, participação e acompanhantes. Gera somente uma prévia e um TXT.
- Alterar uma resposta invalida a prévia e exige reconhecer a demonstração novamente.
- Respostas não são enviadas nem armazenadas. O site não pede telefone, e-mail, documento ou endereço.
- O contato final é exclusivamente com a MOSS Digital para conhecer o modelo de site. Uma mensagem só é enviada quando o visitante confirmar no WhatsApp externo.
- Sem JavaScript: história e programação permanecem disponíveis; formulário desabilitado. Nenhuma fonte externa ou análise de visitantes foi adicionada.
- Arte SVG autoral em `assets/monograma.svg`.

Para um evento real: configurar recebimento de confirmações, regras de convidados, acesso restrito, política de privacidade e recursos de presentes conforme o orçamento. Revisar o conteúdo e substituir as informações fictícias. As páginas demonstrativas mantêm `noindex,nofollow` e não entram no sitemap como eventos reais.

Capa, fonte HTML e legenda em `divulgacao/instagram/casamento/`, com cópia em `04 - Divulgacao/Casamento - Demonstracao/`.

Renderizar: `python tools/render-demo-cover.py --slug casamento --page demos/casamento/index.html --output PASTA_DE_DIVULGACAO`.
Testar com Playwright: `python tools/test-novas-demos.py --output PASTA_DE_RELATORIOS`.

Destino planejado: `https://mossdigital.com.br/demos/casamento/`. Confirmar publicação antes de divulgar. Nenhum envio ao GitHub ou às redes sociais está autorizado automaticamente por esta entrega.
