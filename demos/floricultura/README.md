# Flora & Afeto — demonstração de floricultura

Demo independente com catálogo de seis composições, filtros por ocasião e valor e montador de buquê. Marca, produtos e preços fictícios; ilustrações SVG autorais, sem dependência de fotos ou fontes externas.

## Experimentar

Abra pelo servidor local na raiz do repositório: `python -m http.server 8769 --bind 127.0.0.1`, depois acesse `/demos/floricultura/`.

- Escolha uma composição ou personalize flores, tamanho e embalagem.
- Adicione uma mensagem fictícia de até 160 caracteres.
- Consulte o subtotal (frete não incluído).
- Copie o resumo ou baixe em TXT.
- A ação de WhatsApp exige reconhecimento da demonstração e usa exclusivamente o contato da MOSS Digital. Nunca envia a mensagem automaticamente.

Sem JavaScript, o catálogo permanece legível e os controles interativos ficam desabilitados.

## Valores e personalização

`assets/app.js` contém a configuração demonstrativa em centavos:

- Rosas: R$ 99; girassóis: R$ 89; flores do campo: R$ 79.
- Tamanho pequeno: base; médio: 1,5 × base; grande: 2 × base.
- Papel: incluído; tecido: R$ 18; caixa: R$ 32.

O catálogo HTML traz alternativas iniciais legíveis sem script. Ao alterar nomes ou valores, atualize esses textos junto com a configuração. O script recalcula os preços dos cartões ao carregar.

As formas de recebimento não calculam frete nem validam disponibilidade. Não há endereço, pedido, reserva, pagamento, upload, banco de dados, armazenamento persistente ou análise de visitantes implementados pela aplicação.

O uso real exige configuração comercial, integrações e revisão das políticas descritas em `implantacao.html`. Não incluir no sitemap como floricultura real; as duas páginas estão com `noindex, nofollow`.

## Testes

A capa 1080 × 1350 e a legenda para Instagram ficam em `divulgacao/instagram/floricultura/`. Toda nova demo deve incluir uma capa, conforme `demos/AGENTS.md`.

Para regenerar a captura do catálogo e a capa, use `python tools/render-floricultura-cover.py --output CAMINHO_DA_PASTA_DE_DIVULGACAO`. Se esses arquivos já existirem, o script os preserva; informe `--overwrite` apenas quando quiser substituir as capturas geradas desta demo. O arquivo HTML da capa permanece editável.

Com Playwright para Python e Chrome ou Edge instalado:

```text
python tools/test-floricultura.py --output CAMINHO_DOS_RELATORIOS
```

Também aceita `--browser-path` e `--axe-path` para auditoria automática complementar. Os testes não enviam mensagens, não fazem pedidos e não publicam arquivos.
