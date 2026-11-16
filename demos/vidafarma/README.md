# VidaFarma — resumo

Modelo de site para farmácia da MOSS Digital: navegação por necessidade, 21 produtos com fotos, ficha individual, lembrete local e encomenda demonstrativa.

**📖 Manual completo: [`MANUAL.md`](MANUAL.md)** — como testar, personalizar para um cliente, publicar e o que é preciso para pedidos e pagamentos reais (com os cuidados específicos do segmento farmacêutico).

## Curto e grosso

- Abra `index.html` no navegador (ou `python -m http.server 8000` na pasta).
- Clique em uma necessidade para filtrar; clique em um produto para ver a ficha.
- Produtos e preços: `assets/js/produtos.js`. Fotos: `assets/img/` (créditos em `FONTES.md`).
- Textos e contato: `index.html`. Cores: `assets/css/style.css`.
- **Medicamentos com receita** (losartana, indapamida, sinvastatina e caneta GLP-1) aparecem só como informação, sem preço e sem venda simulada.
- **Encomendas e lembretes ficam só no navegador** (`localStorage`). Sem venda, cobrança ou orientação médica.
- Demonstração fictícia: nomes, preços e endereço inventados; fotos reais do Wikimedia Commons usadas apenas como ilustração.

Endereço previsto: `https://mossdigital.com.br/demos/vidafarma/` (publicação após aprovação).
