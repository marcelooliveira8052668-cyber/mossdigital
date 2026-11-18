# Temas comemorativos da MOSS Digital — versão de testes

## O que foi construído
- Quatro aparências: original, Natal, Ano Novo e Carnaval.
- Alternância automática pelo calendário de São Paulo (sem servidor ou banco).
- Prévia com cinco opções para testar manualmente no próprio navegador.
- O dia/noite já existente, links, catálogo de demos e WhatsApp foram preservados.
- Nenhum desconto ou promoção financeira foi inventado.

## Como testar a ramificação, sem publicar
1. A ramificação é `feature/temas-comemorativos-2026-2027`; a branch `main` não foi alterada.
2. Faça checkout dessa ramificação em uma cópia local do repositório.
3. Sirva o projeto na raiz com um servidor local (por exemplo, `python -m http.server 8000`).
4. Abra `http://localhost:8000/?moss-temas=teste`.
5. Clique nos botões Automático, Original, Natal, Ano Novo e Carnaval.
6. Confira as duas versões dia/noite, o carrossel, os contatos e o celular.

## Calendário automático
- 1º a 26 de dezembro: Natal.
- 27 de dezembro a 6 de janeiro: Ano Novo, com ano atualizado dinamicamente.
- 8 dias antes da terça-feira de Carnaval até o dia seguinte: Carnaval.
- Nas demais datas: original. O cálculo do Carnaval acompanha a Páscoa de cada ano.

## Avisos importantes
- O painel de teste muda o tema **somente no navegador do visitante**; não é um painel administrativo.
- Para um dono de site escolher um tema manualmente para **todos os visitantes**, seria necessário publicar uma configuração no GitHub ou integrar um painel com autenticação e uma configuração centralizada.
- Esta ramificação não está publicada no domínio oficial. Não mesclar sem autorização da MOSS.

## Onde estão as mudanças
- `index.html`: acrescentados apenas 1 CSS e 1 JS, mantendo todo o catálogo.
- `assets/css/moss-estacoes.css`: cores, enfeites discretos, banner de campanha e painel de prévia.
- `assets/js/moss-estacoes.js`: calendário, troca do texto de destaque, recuperação do original e testes.

## Antes x depois
Antes no `<head>`: `moss-carrossel.css` e `moss-tema.js`.
Depois: permanecem e ganham `moss-estacoes.css` e `moss-estacoes.js`, ambos isolados.
A frase antiga do hero é restaurada exatamente quando o tema é Original.
