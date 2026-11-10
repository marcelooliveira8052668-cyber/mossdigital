# 04 — DentalTech | Demonstração MOSS Digital

**Segmento:** Laboratório de próteses digitais  
**Status:** implementação funcional local com fotos de banco licenciadas já inseridas e documentadas; aguardando validação visual do cliente e dados reais para apresentação comercial final.  
**Tecnologia:** HTML + CSS + JavaScript puros, sem npm, sem frameworks e sem serviços externos.

## Como abrir

1. Extraia a pasta inteira; não abra arquivos de dentro do ZIP.
2. Abra `index.html` no Edge, Chrome ou outro navegador moderno.
3. Navegue pelos filtros, cards, menu, galeria ilustrativa e formulário.
4. O formulário monta uma mensagem para o WhatsApp **(11) 94203-8103**.

## Fotos reais: já inseridas, com licença documentada

As 8 fotografias estão em `assets/img/` em WebP, nos tamanhos abaixo, obtidas no **Pexels** sob a **Pexels License** (uso comercial permitido, sem atribuição obrigatória). Autor, fonte e licença de cada arquivo estão registrados em `assets/img/CREDITOS-FOTOS.md`.

A página procura cada foto automaticamente em `assets/img/` e troca o SVG de reserva. Para **substituir** pelas fotos do cliente, salve o novo arquivo com o **mesmo nome** (incluindo `.webp`):

- [x] `assets/img/capa.webp` — Foto principal da capa, 1600 x 1200 px, enquadramento horizontal
- [x] `assets/img/coroas-ceramicas.webp` — Card: Coroas cerâmicas, 900 x 675 px
- [x] `assets/img/cad-cam.webp` — Card: Fluxo CAD/CAM, 900 x 675 px
- [x] `assets/img/proteses-implantes.webp` — Card: Próteses sobre implantes, 900 x 675 px
- [x] `assets/img/impressao-3d.webp` — Card: Modelos impressos em 3D, 900 x 675 px
- [x] `assets/img/bancada-laboratorio.webp` — Galeria — ambiente, 900 x 675 px
- [x] `assets/img/acabamento-protetico.webp` — Galeria — equipe/processo, 900 x 675 px
- [x] `assets/img/equipamento-digital.webp` — Galeria — resultado, 900 x 675 px

- Prefira imagens próprias do cliente; registre autor e licença em `CREDITOS-FOTOS.md` ao trocar.
- Otimize as fotos, idealmente WebP entre 100 e 350 KB por imagem, sem exagerar na compressão. (As atuais ficaram entre 28 e 306 KB, totalizando cerca de 675 KB.)
- Depois de copiar, recarregue a página no navegador. Se a imagem continuar ausente, confira nome, extensão, letras maiúsculas/minúsculas e caminhos.
- Não apresente as fotos de banco, nem imagens geradas, como fotografias de uma empresa real.

## Recursos implementados

- Menu responsivo e navegação interna; filtros de serviços; **cards inteiros clicáveis** com janela de detalhes.
- Galeria com ampliação de foto em janela própria (mouse e teclado); formulário validado; mensagem personalizada no WhatsApp.
- Acessibilidade inicial: textos alternativos reais, labels, estados de filtros, foco visível, diálogos nativos e trava de rolagem enquanto uma janela está aberta.
- Animacoes leves de entrada e zoom, desativadas automaticamente para quem prefere menos movimento.
- Ancoragem compensada pela barra fixa (o título da seção não fica escondido sob o menu).
- Ícone da aba em SVG (elimina o erro 404 de favicon).
- Briefing de orçamento sem cobrança, armazenamento ou reserva automática.

## O que é demonstrativo ou ainda não está conectado

- Não há checkout, Pix automático, cartão, banco de dados ou autenticação.
- Não há reserva confirmada, envio de e-mails, painel administrativo ou backend.
- Nome comercial, serviços, preços, texto, marca e disponibilidade precisam da aprovação do cliente real.
- Não publique nem altere a MOSS Digital sem autorização expressa do proprietário.

## Arquivos

- `index.html` — conteúdo completo e formulário.
- `css/style.css` — identidade visual, layout desktop e mobile.
- `js/script.js` — navegação, filtros, detalhes, galeria e WhatsApp.
- `favicon.svg` — ícone da aba.
- `assets/img/placeholder.svg` — reserva local enquanto a foto não existe.
- `assets/img/*.webp` — as 8 fotografias inseridas (ver `assets/img/CREDITOS-FOTOS.md`).
- `assets/img/CREDITOS-FOTOS.md` — autor, fonte, licença e tratamento de cada foto.
- `INTEGRACOES.md` — roteiro didático de hospedagem, domínio, Supabase, Pix, cartão e segurança.
