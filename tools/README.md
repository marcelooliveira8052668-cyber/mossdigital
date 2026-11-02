# Ferramentas da coleção

Os sites finais são HTML/CSS/JavaScript estáticos: não precisam destas ferramentas para funcionar.

## Requisitos para recriar e testar

- Python 3; Pillow apenas para gerar imagens sociais e capas.
- Node.js com `WebSocket` global (Node 22 ou superior).
- Microsoft Edge instalado no Windows.
- A cópia de trabalho deve permanecer na pasta da MOSS caso queira sincronizar também os diretórios locais de demonstração.

## Ordem de execução

1. `python tools/build-community-demos.py` — recria os cinco pacotes e suas cópias locais.
2. `python tools/integrate-community-demos.py` — integra links e contagens ao catálogo, sem duplicar entradas.
3. `node tools/test-community-demos.cjs` — valida interações em Edge e exporta capturas; não envia WhatsApp real. O relatório fica em `docs/testes/community-demos.json`.
4. `python tools/render-community-covers.py` — usa as capturas do teste para gerar as cinco capas, imagens sociais e ZIPs independentes.

**Atenção:** o gerador sobrescreve os arquivos dos cinco IDs `reciclo`, `junto`, `raizfeira`, `pontocomum` e `acessoaberto`. Não execute sobre adaptações de clientes sem backup. Nenhuma ferramenta publica no GitHub automaticamente; a publicação é uma etapa separada, após revisão.

Os testes verificam comportamentos específicos; não equivalem a auditoria completa de acessibilidade, segurança, revisão jurídica ou certificação de desempenho.

## Demo EntreLares (agência de recrutamento)

1. `python tools/build-entrelares.py` — recria `demos/entrelares/` (não altera `assets/app.js`).
2. `node tools/test-entrelares.cjs` — valida as duas jornadas em Edge e grava `TESTES-NAVEGADOR.json`.
3. `python tools/package-entrelares.py` — gera a imagem social, a capa 1080 × 1350, a cópia local e o ZIP.
4. `python tools/integrate-entrelares.py` — integra ao catálogo e aos índices locais, sem duplicar entradas.

**Atenção:** o gerador sobrescreve os arquivos de `demos/entrelares/` (exceto `assets/app.js`, que é mantido à parte). Não execute sobre adaptações de clientes sem backup.
