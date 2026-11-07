# Cartão integrado e publicado após autorização

**Título:** MOSS CONDO — Gestão de Condomínios

**Descrição:** Plataforma demonstrativa para síndicos, moradores e portarias, com controle financeiro, reservas, manutenção e comunicação.

**Botão:** Explorar demonstração

**Destino publicado:** `demos/moss-condo/`

**Imagem publicada:** `assets/img/previas/moss-condo.webp`, captura real de 1600 × 1000 pixels, aproximadamente 67 kB.

**Texto alternativo:** Painel demonstrativo da MOSS CONDO, com indicadores financeiros, reservas e avisos em interface escura com detalhes em cobre.

**Revisão com fotografias:** a captura disponível agora inclui um banner arquitetônico ilustrativo. A imagem não representa empreendimento cliente da MOSS Digital. A versão fotográfica das áreas comuns está em `demos/moss-condo/docs/screenshots/reservas-desktop.png`.

## Integração concluída

O usuário autorizou expressamente adicionar o cartão e publicar. O commit `883ef3a` alterou somente `sistemas.html` e adicionou a imagem `assets/img/previas/moss-condo.webp`. Os cartões anteriores foram preservados sem alteração.

Página pública: <https://mossdigital.com.br/sistemas.html>.

O teste `tests/portfolio_check.py` foi aprovado antes e depois da publicação: título, descrição, fotografia, abertura da demo em nova aba, larguras 320/390/768 px e preservação exata dos cartões anteriores.

## Onde personalizar

- Na branch publicada, `sistemas.html`, linhas **70–85**: bloco comentado em português do novo cartão. Título na linha **81**, descrição na **82** e botão na **83**.
- `tools/prepare_portfolio_preview.py`: gerador comentado da captura real, usando um destino novo e explícito.
- A fotografia da capa vem do painel publicado da própria demonstração, não de uma montagem que inventa funcionalidades.

Somente o bloco da MOSS CONDO recebeu comentários nesta tarefa; o restante do arquivo existente foi preservado. As configurações, os logotipos, a página inicial e as outras demos não foram alterados.
