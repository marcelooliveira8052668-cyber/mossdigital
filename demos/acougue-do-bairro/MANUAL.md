# Manual — Açougue do Bairro

Modelo de site para açougue da **MOSS Digital**: 25 cortes com fotos, ficha individual do produto, calculadora de quilos e encomenda demonstrativa.

> **Leia antes:** esta é uma **demonstração fictícia**. Nome, preços, endereço, telefones e textos são inventados. Nenhum pedido é enviado e nenhum pagamento é cobrado. As fotos são reais (Wikimedia Commons), usadas **apenas como ilustração** do segmento — não representam o açougue, a equipe ou produtos reais.

---

## 1. Começo rápido

- Abra `index.html` no navegador — funciona sem instalar nada.
- Melhor ainda: na pasta da demo, rode `python -m http.server 8000` e acesse `http://localhost:8000`.
- Clique em um card para abrir a **ficha do corte**; use a calculadora e "Adicionar à encomenda"; depois preencha o formulário na seção "Sua encomenda".

**Endereço publicado:** `https://mossdigital.com.br/demos/acougue-do-bairro/`

---

## 2. O que vem na pasta

```
acougue-do-bairro/
├── index.html                  página única (todo o site)
├── MANUAL.md                   este manual
├── README.md                   resumo e atalhos
├── assets/
│   ├── css/style.css           identidade visual e responsividade
│   ├── js/produtos.js          catálogo: 25 produtos + detalhes de cada corte
│   ├── js/app.js               filtros, ficha, calculadora, balcão e formulário
│   └── img/                    25 fotos WebP + FONTES.md (fonte e licença)
└── entrega/
    ├── card-acougue-do-bairro.webp   card do catálogo (1200×750)
    └── captura-instagram.webp        captura usada na capa
```

A capa do Instagram, a fonte editável e a legenda ficam em `divulgacao/instagram/acougue-do-bairro/`, com cópia em `../04 - Divulgacao/`.

---

## 3. O que funciona hoje

| Recurso | Como funciona | Onde editar |
|---|---|---|
| Catálogo com 25 cortes | Busca + filtros por Bovinos, Suínos, Aves, Linguiças e Peixes | `assets/js/produtos.js` |
| Ficha do corte | Clique no card: foto grande, ideal para, dica de preparo, rendimento e calculadora | `produtos.js` (campos `uso`, `dica`) e `app.js` (`RENDIMENTO`) |
| Calculadora | Preço por kg × quantidade (0,2 a 10 kg) | `app.js` |
| Balcão (carrinho) | Adiciona 0,5 kg; `+`/`−` ajustam; remover funciona | `app.js` |
| Encomenda | Nome, telefone, retirada/entrega, data e horário → código `AC-2026-XXXX` | `index.html` (formulário) e `app.js` |
| Menu / galeria | Hambúrguer no celular, galeria com setas | `app.js` |

---

## 4. Checklist de teste antes de entregar

- [ ] Filtros e busca retornam os cortes certos
- [ ] Clicar em qualquer card abre a ficha com os dados corretos
- [ ] Na ficha, o valor recalcula ao mudar os quilos; "Adicionar à encomenda" abre o balcão
- [ ] `Esc`, clique fora e `✕` fecham a ficha; o foco volta ao card
- [ ] `Adicionar 0,5 kg` funciona sem abrir a ficha
- [ ] `+`, `−` e `remover` no balcão atualizam o total
- [ ] A calculadora da seção principal recalcula
- [ ] Formulário exige nome, telefone, data e horário e gera o código
- [ ] Galeria e setas funcionam; menu mobile abre/fecha
- [ ] Sem rolagem horizontal em 320 px, 390 px, tablet e desktop
- [ ] Sem erros no console do navegador

---

## 5. Se um cliente pedir este site — o que trocar

1. **Nome e marca:** logo SVG no cabeçalho, `<title>`, textos e o "desde 1998 (fictício)".
2. **Fotos:** substitua os `.webp` em `assets/img/` mantendo os nomes (ou mude `img` em `produtos.js`). Fotos do cliente precisam de autorização de uso. **Atualize `assets/img/FONTES.md`** com a nova origem/licença.
3. **Valores:** campo `preco` (por kg) em `produtos.js`.
4. **Descrições e ficha:** `desc`, `uso`, `dica` e `rendimento` de cada corte em `produtos.js`.
5. **Contato:** endereço, horários, telefone/WhatsApp e e-mail em `index.html`. Hoje não há número real de propósito — coloque o do cliente.
6. **Avisos de demonstração — REMOVER:** faixa vermelha do topo, selos "Foto ilustrativa"/"Fictício", texto do rodapé, aviso de modo local e a frase "demonstração" na ficha. Se ficarem, o site parece demo.
7. **Cores:** variáveis no começo de `assets/css/style.css` (`--vermelho`, `--creme`, `--tinta`, etc.).
8. **Card e capa do Instagram:** se for site entregue (e não modelo do catálogo), refaça sem a marca MOSS Digital e sem "fictício".
9. **Pedidos reais:** veja a seção 6 — trocar texto não faz o pedido chegar.

---

## 6. Pedidos e pagamento — o que é real e o que não é

### Como está hoje (modo local)
- A encomenda é salva **somente no `localStorage` do navegador** do visitante.
- Não há servidor, login, e-mail, WhatsApp nem cobrança.
- O código `AC-2026-XXXX` é apenas um número demonstrativo.
- Isso está dito explicitamente na página e neste manual. **Nunca apresente como "pedido enviado" ou "pagamento aprovado".**

### Para receber pedidos de verdade (escolha uma)

| Caminho | O que fazer | Limite |
|---|---|---|
| **WhatsApp** | Trocar o link do formulário por `https://wa.me/55DDDNUMERO?text=...` montando a mensagem com os itens e o total | Ainda não há pagamento; o cliente finaliza a conversa |
| **E-mail** | Usar `mailto:` com assunto e corpo preenchidos | Depende do cliente receber e conferir |
| **Banco/servidor** | Salvar pedidos em Supabase ou API própria | Exige projeto, tabelas e regras de acesso |

### Para cobrar de verdade
- Pagamento real **sempre passa por um gateway** (Stripe, Mercado Pago, PagSeguro etc.) com chave **secreta no servidor**. **Nunca** coloque chave privada no frontend.
- O fluxo correto é: servidor cria a cobrança → gateway confirma (geralmente por **webhook**) → só então o pedido muda para "pago".
- Não simule "pagamento aprovado" com botão que apenas muda a tela. Se for demo, deixe claro que é simulação (como em `otica-prime`, que usa cartões de teste e afirma que é simulado).
- Se houver banco com dados pessoais (nome, telefone, endereço), use **autenticação e RLS** no Supabase: o visitante só vê o próprio pedido; o dono vê todos. Nada disso está configurado ou testado nesta entrega.
- Em resumo: para virar site comercial, é preciso **implementar e testar** esse backend. Não basta trocar textos ou "colar uma chave".

---

## 7. Publicação

1. Envie a pasta inteira para `demos/acougue-do-bairro/` no site da MOSS Digital (FTP ou deploy do repositório).
2. Confira se `https://mossdigital.com.br/demos/acougue-do-bairro/` abre.
3. O card e a contagem do catálogo já foram inseridos pelo script `tools/add_card_acougue.py` (commit `e4057bf`).
4. Para um cliente, remova/substitua o card do catálogo e a capa com a marca MOSS Digital.

**Dependências:** nenhuma. HTML, CSS e JavaScript puro. Fontes vêm do Google Fonts; para funcionar sem internet, troque `Anton` e `Inter` por fontes do sistema no CSS.

---

## 8. Limites e honestidade

- Carrinho e encomenda são demonstrativos: sem pagamento, estoque, e-mail ou SMS.
- A calculadora faz só `preço × quilos`; não inclui taxa de entrega.
- Fotos, preços, endereço, telefones e "desde 1998" são fictícios/ilustrativos.
- Não há depoimentos, resultados ou números de clientes reais.
- Créditos e licenças das fotos: `assets/img/FONTES.md`.

---

## 9. Entrega

- Demo, card, capa do Instagram e manuals: **publicados** em 16/11/2026 (commit `e4057bf`).
- Capa do Instagram pronta, mas postar nas redes depende de autorização separada.
- Este manual deve acompanhar **toda** demo que receber pedidos ou pagamento no site, mesmo simulado.
