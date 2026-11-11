# Moss Portfólio — área de criação de portfólios profissionais

**Publicado:** aguardando aprovação do responsável e espaço em disco.
**Página:** `/portfolio/` (neste repositório).

## O que há nesta entrega

- Página própria com três modelos profissionais — **Profissional** (elegante, claro, serifado),
  **Criativo** (editorial, foto em tela cheia, escuro) e **Tecnologia** (dark ciano, estética de terminal).
- Espaços para foto em destaque nos três modelos (upload tipo JPEG/PNG/WebP, máx. 3 MB).
- Montador interativo no navegador: a prévia é gerada localmente;
  **nenhum dado é enviado automaticamente** para a MOSS ou terceiros.
- CTA de finalização por **R$ 39,90** (pagamento único), com conversa no WhatsApp
  (11) 94203-8103. O botão apenas abre o WhatsApp; a cobrança não ocorre pelo site.
- Foto usada na prévia fica na memória do navegador; ao fechar/limpar a aba, é descartada.
- Home apresenta a oferta na seção «Monte o seu portfólio» e no menu
  «Portfólio» (depois de «Livros digitais»).

## Segurança e limites

- Prévia renderizada em iframe com `sandbox="allow-same-origin"` — scripts internos bloqueados.
- Todos os textos de usuário são escapados para HTML antes de entrar na prévia
  (testado contra XSS: `<img src=x onerror=...>`).
- Nenhuma dependência externa (sem CDN, fontes remotas ou imagens externas);
  a página inteira funciona offline.
- Sem upload para servidor: fotos são reduzidas para `data:` URLs em memória.
- O iframe não recebe permissão de scripts; a prévia é só HTML/CSS.

## O que ainda não existe (e não foi inventado)

- Não há cobrança, Pix, cartão, cupom, checkout, lead ou cadastro em formulário.
- Prazo e condições de entrega são combinados no WhatsApp antes do pagamento.
- Não há certificado, garantia de emprego, manutenção inclusa nem publicação em domínio
  (domínio/hospedagem à parte, com orçamento próprio).
- A home apresenta a oferta; a página mantém `noindex, nofollow` até a publicação ser aprovada
  (mesmo comportamento da página do livro antes da aprovação).

## Publicação

A alteração desta rodada está na branch `feat/moss-portfolio-39-90` para revisão.
NÃO foi mesclada nem publicada. Ao publicar:

- A branch contém apenas `portfolio/`, `index.html` (menu + CTA), `docs/MOSS-PORTFOLIO.md` e `docs/testar_portfolio.py`.
- O PDF completo e o ZIP do livro continuam privados; nada relacionado ao livro foi alterado.
- Após publicação: confirmar `/portfolio/` ao vivo, acesso offline e descrição no menu.

## Testes

`python docs/testar_portfolio.py` — Edge/Chromium com servidor local:
zero erros JavaScript, zero dependências externas, prévia responde a campos,
todos os 3 modelos aplicados, XSS escapado, foto aceita/rejeitada, fluxo do WhatsApp correto,
layout sem transbordamento em 360/1366 px.

## Pendência conhecida

O disco C: deste computador está 100% cheio durante esta rodada. Portanto:

- não foi possível commit/push/PR nesta sessão;
- a publicação exige espaço (liberar pelo menos alguns MB no disco antes de publicar);
- a arte de capa na call-to-action fica como rascunho — a oferta da home usa apenas texto.
