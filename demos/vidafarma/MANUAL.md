# Manual — VidaFarma

Modelo de site para farmácia da **MOSS Digital**: navegação por necessidade, 21 produtos com fotos, ficha individual, lembrete local e encomenda demonstrativa.

> **Leia antes:** demonstração **fictícia**. Nome, preços, endereço, telefones e textos são inventados. O site **não vende, não cobra, não envia pedidos e não dá orientação médica**. As fotos são reais (Wikimedia Commons), usadas **apenas como ilustração**; os nomes dos produtos são genéricos e fictícios, e as fotos não mostram os produtos reais da loja, a equipe ou atendimentos reais.

---

## 1. Começo rápido

- Abra `index.html` no navegador (ou rode `python -m http.server 8000` na pasta e acesse `http://localhost:8000`).
- Clique em uma necessidade (ex.: "Primeiros socorros") para filtrar o catálogo.
- Clique em um produto para abrir a ficha; ajuste a quantidade e adicione à sacola.
- Use "Meu lembrete" para anotar nome e horário (fica só neste navegador).
- Em "Sua encomenda", preencha os dados e confirme para gerar um código demonstrativo.

**Endereço previsto:** `https://mossdigital.com.br/demos/vidafarma/` (ainda não publicado).

---

## 2. Arquivos

```
vidafarma/
├── index.html                  página única
├── MANUAL.md                   este manual
├── README.md                   resumo com link para o manual
├── assets/
│   ├── css/style.css           identidade visual e responsividade
│   ├── js/produtos.js          21 produtos + apresentação e cuidados
│   ├── js/app.js               filtros, ficha, sacola, encomenda e lembrete
│   └── img/                    fotos WebP + FONTES.md (fonte e licença)
└── entrega/
    ├── card-vidafarma.webp     card do catálogo (1200×750)
    └── captura-instagram.webp  captura para a capa
```

Capa do Instagram, fonte editável e legenda: `divulgacao/instagram/vidafarma/`, com cópia em `../04 - Divulgacao/`.

---

## 3. O que funciona hoje

| Recurso | Onde editar |
|---|---|
| Necessidades (6 atalhos que filtram o catálogo) | botões `data-nec` no `index.html`; categorias em `app.js` |
| Busca sem acento (ex.: "termometro" acha "Termômetro") | `app.js` (`semAcento`) |
| 21 produtos, 6 categorias | `assets/js/produtos.js` |
| Medicamentos sob prescrição (losartana, indapamida, sinvastatina e caneta GLP-1) — **informativos, sem venda** | seção `#receita` no `index.html` |
| Ficha do produto: apresentação, cuidados, quantidade e total | `produtos.js` (`apresentacao`, `cuidado`) e `app.js` |
| Sacola com `+`, `−` e remover | `app.js` |
| Encomenda com código `VF-2026-XXXX` | `index.html` + `app.js` |
| Lembrete local (nome + horário, ordenado por hora) | `app.js` (`CHAVE_LEMBRETES`) |
| Galeria com setas, menu mobile, `Esc` fecha ficha/sacola | `app.js` |

---

## 4. Checklist antes de entregar

- [ ] Clicar em cada necessidade filtra o catálogo
- [ ] Busca encontra termos com e sem acento
- [ ] Ficha abre com apresentação e cuidados corretos; quantidade recalcula
- [ ] `Adicionar` da ficha abre a sacola com a quantidade certa
- [ ] `+`, `−` e `remover` atualizam o total
- [ ] Formulário exige nome, telefone, data e horário; gera código `VF-`
- [ ] Lembrete adiciona, ordena por horário e remove
- [ ] `Esc`, clique fora e `✕` fecham ficha e sacola; foco volta ao elemento
- [ ] Sem overflow em 320 px, 390 px, tablet e desktop
- [ ] Sem erros no console

---

## 5. Se um cliente pedir este site

1. **Nome e marca:** logo SVG, `<title>`, textos e "VidaFarma" onde aparecer.
2. **Fotos:** troque os `.webp` em `assets/img/` mantendo os nomes (ou mude `img` em `produtos.js`). Use fotos autorizadas pelo cliente e **atualize `assets/img/FONTES.md`**.
3. **Produtos e preços:** `produtos.js` (`nome`, `preco`, `desc`, `apresentacao`, `cuidado`).
4. **Necessidades:** os 6 atalhos em `index.html` e o array `categorias` em `app.js` precisam combinar com as categorias dos produtos.
5. **Contato:** endereço, horários e telefone/WhatsApp reais em `index.html` (hoje não há número real de propósito).
6. **Avisos de demonstração — REMOVER:** faixa do topo, selos "ilustrativo"/"fictício", aviso responsável (se não fizer sentido para o cliente), textos de "modo local", rodapé e o aviso da ficha. **Atenção:** o aviso de que o site não dá orientação médica e o de medicamentos controlados devem ser adaptados à realidade e às exigências legais do cliente — não remova por pura estética.
7. **Cores:** variáveis no início de `assets/css/style.css`.
8. **Card e capa:** refaça/remova a marca MOSS Digital e o "fictício" se for site entregue.
9. **Pedidos reais:** veja a seção 6.

---

## 6. Pedidos e pagamento — honestidade

### Hoje (modo local)
- Encomendas e lembretes ficam **somente no `localStorage` do navegador**.
- Não há servidor, login, e-mail, WhatsApp, estoque ou cobrança.
- O código `VF-2026-XXXX` é apenas demonstrativo. **Nunca diga "pedido enviado" ou "pagamento aprovado" sem confirmação real.**

### Para receber pedidos de verdade
| Caminho | O que fazer | Limite |
|---|---|---|
| WhatsApp | Trocar o envio por link `wa.me` com mensagem montada | Ainda sem pagamento |
| E-mail | `mailto:` com assunto e corpo preenchidos | Depende do recebimento |
| Banco/servidor | Supabase ou API própria | Exige projeto, tabelas e regras de acesso |

### Para cobrar de verdade
- Use um gateway (Stripe, Mercado Pago, PagSeguro etc.) com **chave secreta no servidor**, nunca no frontend.
- A confirmação deve vir por **webhook** do gateway antes de marcar o pedido como pago.
- Se houver dados pessoais, use **autenticação e RLS** no Supabase: o visitante vê só o próprio pedido; o dono vê todos.
- Nada disso está configurado ou testado nesta entrega. Para virar site comercial, é preciso **implementar e testar** o backend.

### Cuidado extra neste segmento
- Farmácia é área sensível: não simule venda de medicamentos controlados, não dê dosagem nem diagnóstico, e mantenha os avisos sobre receita e orientação profissional quando o cliente for real.
- Fotos de embalagens com marcas reais não devem ser usadas como se fossem produtos da loja.

---

## 7. Publicação

1. Envie a pasta para `demos/vidafarma/` no site da MOSS Digital.
2. Confira se `https://mossdigital.com.br/demos/vidafarma/` abre.
3. O cartão no catálogo foi **preparado mas não publicado** — veja `tools/add_card_vidafarma.py` na raiz do repositório. Rodar `python tools/add_card_vidafarma.py` só depois da aprovação.
4. A capa do Instagram faz parte da entrega, mas postar depende de autorização separada.

**Dependências:** nenhuma. HTML, CSS e JS puro; fontes vêm do Google Fonts (troque por fontes do sistema se precisar funcionar offline).

---

## 8. Limites e honestidade

- Sacola, encomenda e lembrete são demonstrativos: sem pagamento, estoque, e-mail ou SMS.
- Preços são fictícios e por unidade.
- Fotos, nomes, endereço e telefones são ilustrativos/fictícios.
- Sem depoimentos, resultados ou números reais de clientes.
- Créditos e licenças: `assets/img/FONTES.md`.

---

## 9. Status

- Demo criada e testada: **sim** (21 produtos, 0 imagens quebradas, 0 erros no console, responsiva, filtros/ficha/sacola/formulário/lembrete conferidos).
- Publicação, cartão no catálogo e postagem no Instagram: **não** — aguardando aprovação explícita.
- Manual incluído desde a primeira versão, conforme a regra em `demos/AGENTS.md`.
