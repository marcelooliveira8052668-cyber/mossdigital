# Açougue do Bairro — resumo

Modelo de site para açougue da MOSS Digital: 25 cortes com fotos, ficha individual do corte, calculadora de quilos e encomenda demonstrativa.

**📖 Manual completo: [`MANUAL.md`](MANUAL.md)** — como testar, personalizar para um cliente, publicar e o que é preciso para receber pedidos e pagamentos reais.

## Curto e grosso

- Abra `index.html` no navegador (ou `python -m http.server 8000` na pasta).
- Clique em um card para abrir a ficha do corte; use a calculadora e adicione à encomenda.
- Produtos e preços: `assets/js/produtos.js`. Fotos: `assets/img/` (créditos em `FONTES.md`).
- Textos e contato: `index.html`. Cores: `assets/css/style.css`.
- **Pedidos ficam só no navegador** (`localStorage`). Não há servidor, cobrança ou envio real — e o manual explica como deixar isso honesto e o que é necessário para um site comercial.
- Demo fictícia: nomes, preços e endereço inventados; fotos reais do Wikimedia Commons usadas apenas como ilustração.

Publicado em `https://mossdigital.com.br/demos/acougue-do-bairro/`.
