# ACESSO PRIME — Demonstração 13

Site institucional demonstrativo de empresa de acessibilidade, com foco em
acessibilidade real: teclado, contraste, rótulos e leitores de tela.

**Status:** ✅ Concluída em 17/11/2026.

## Abrir
Abra `index.html`. Arquivo único, sem dependências.

## Recursos de acessibilidade implementados
- Skip link "Pular para o conteúdo principal".
- Marcos semânticos (`header`, `main`, `nav`, `footer`, `section`) e um único `h1`.
- Foco visível reforçado (4px amarelo) — testado por CDP.
- Botões **Alto contraste** e **A+ texto**, com preferência salva no LocalStorage.
- Rótulos sempre visíveis, `aria-describedby`, `aria-invalid`, `aria-live`,
  `role="progressbar"`, `aria-valuetext` no comparador.
- Comparador antes/depois operável por mouse, toque e teclado.
- Todas as ilustrações SVG têm `role="img"` + `aria-label`.
- `prefers-reduced-motion` respeitado.

## Funcionalidades reais
- Catálogo com 6 adaptações e galeria com 3 projetos ilustrativos.
- Comparador visual antes/depois com controle deslizante acessível.
- Checklist de 7 necessidades com progresso e anúncio por leitor de tela.
- Formulário com validação inline, foco no primeiro campo inválido e
  confirmação — nada é enviado.
- Menu mobile com `aria-expanded`.

## Segurança e ética
- **Não declara conformidade legal ou técnica.** Texto deixa claro que as
  informações são gerais e exigem verificação profissional e das normas vigentes.
- Dados, projetos e necessidades são fictícios.
- Para versão comercial: avaliação técnica por profissional responsável e
  verificação das normas atuais antes de qualquer afirmação de conformidade.

## Onde editar
| O que mudar | Onde |
|-------------|------|
| Adaptações e ícones | `ADAPTACOES` / `ICONES` (JS) |
| Checklist | Array `CHECKLIST` (JS) |
| Projetos | Array `PROJETOS` (JS) |
| WhatsApp MOSS | `WHATSAPP_MOSS` (JS) |
| Cores de contraste | `:root` e `html.contraste-alto` (CSS) |

## Fotografias ilustrativas (6 por demo)

Foram adicionadas 6 fotografias reais de rampas, corrimãos, piso tátil, sanitário e sinalização, obtidas via Openverse com licenças que permitem uso comercial (CC0, CC BY ou CC BY-SA). Cada imagem foi redimensionada para 1200×800 e convertida em WebP, com fonte, licença e autor registrados em `CREDITOS.md` e `img/fotos/fontes.json`.

As fotos são **imagens de referência**: não representam a empresa fictícia, sua equipe, instalações ou trabalhos reais. Aviso visível na seção `Fotografias ilustrativas`.
