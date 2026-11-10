# 09 — Ocean Prime | Demonstração MOSS Digital

**Segmento:** Experiências e soluções náuticas  
**Status:** implementação funcional local, aguardando fotos autorizadas, validação visual e dados de cliente para apresentação comercial final.  
**Tecnologia:** HTML + CSS + JavaScript puros, sem npm, sem frameworks e sem serviços externos.

## Como abrir

1. Extraia a pasta inteira; não abra arquivos de dentro do ZIP.
2. Abra `index.html` no Edge, Chrome ou outro navegador moderno.
3. Navegue pelos filtros, cards, menu, galeria ilustrativa e formulário.
4. O formulário monta uma mensagem para o WhatsApp **(11) 94203-8103**.

## Fotos reais: basta adicionar os arquivos (sem editar código!)

A página já procura automaticamente cada foto em `assets/img/`. Enquanto não existir, mostra o SVG local de identificação. Use os **mesmos nomes** (incluindo `.webp`):

- [ ] `assets/img/capa.webp` — Foto principal da capa, 1600 x 1200 px, enquadramento horizontal
- [ ] `assets/img/passeio-lancha.webp` — Card: Passeios privativos, 900 x 675 px
- [ ] `assets/img/embarcacao.webp` — Card: Embarcações em destaque, 900 x 675 px
- [ ] `assets/img/manutencao-nautica.webp` — Card: Serviços de manutenção, 900 x 675 px
- [ ] `assets/img/consultoria-nautica.webp` — Card: Consultoria náutica, 900 x 675 px
- [ ] `assets/img/marina.webp` — Galeria — ambiente, 900 x 675 px
- [ ] `assets/img/detalhe-conves.webp` — Galeria — equipe/processo, 900 x 675 px
- [ ] `assets/img/por-do-sol-mar.webp` — Galeria — resultado, 900 x 675 px

- Prefira imagens próprias do cliente ou de bancos com licença comercial verificada; registre autor e licença, quando aplicável.
- Otimize as fotos, idealmente WebP entre 100 e 350 KB por imagem, sem exagerar na compressão.
- Depois de copiar, recarregue a página no navegador. Se a imagem continuar ausente, confira nome, extensão, letras maiúsculas/minúsculas e caminhos.
- Não apresente os espaços reservados, nem imagens geradas, como fotografias de uma empresa real.

## Recursos implementados

- Menu responsivo e navegação interna; filtros de serviços; cards clicáveis com janela de detalhes.
- Galeria com três vagas de fotos; formulário validado; mensagem personalizada no WhatsApp.
- Acessibilidade inicial: textos alternativos, labels, estados de filtros, foco visível e diálogo nativo.
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
- `assets/img/placeholder.svg` — reserva local enquanto a foto não existe.
- `INTEGRACOES.md` — roteiro didático de hospedagem, domínio, Supabase, Pix, cartão e segurança.
