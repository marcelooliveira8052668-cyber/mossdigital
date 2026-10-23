# Template de Site Profissional

Template com **23 tipos de negÃ³cio prontos** e **34 exemplos** no portfÃ³lio (23 nichos
do template + 10 projetos reais). VocÃª troca cores, logo, fotos, textos e cards num
Ãºnico arquivo e entrega em minutos. Funciona para **qualquer tipo de negÃ³cio**.

Nota Lighthouse: **Acessibilidade 100 Â· Boas PrÃ¡ticas 100 Â· SEO 100**

---

## Quatro telas, quatro funÃ§Ãµes

| Arquivo | Para que serve | Quem vÃª |
|---------|----------------|---------|
| **index.html** | Seu site de divulgaÃ§Ã£o. Mostra o que vocÃª faz, o preÃ§o e os 34 exemplos. Ã‰ por aqui que o cliente entra | Cliente |
| **portfolio.html** | Redireciona para o `index.html` (link antigo, mantido para nÃ£o quebrar quem jÃ¡ tinha guardado) | Cliente |
| demo.html?preset=lanchonete | O site de exemplo, jÃ¡ preenchido. Ã‰ este link que vocÃª manda pro cliente | Cliente |
| demo.html?preset=X&painel=1 | O site de exemplo com o painel de troca | SÃ³ vocÃª |

---

## Os 23 negÃ³cios prontos

Abra o painel (acrescente `&painel=1` no link) e escolha:

| Preset | Serve pra |
|--------|-----------|
| lanchonete | Lanchonete, hamburguer, comida rapida |
| pizzaria | Pizzaria, restaurante, hamburgueria |
| padaria | Padaria, cafe, confeitaria |
| clinica | Clinica, dentista, medico |
| estetica | Clinica de estetica, spa, beleza |
| fisioterapia | Fisio, RPG, pilates, nutricao |
| academia | Academia, personal, studio, crossfit |
| salao | SalÃ£o de beleza, nails, maquiagem |
| barbearia | Barbearia, cabeleireiro |
| petshop | Pet shop, clinica veterinaria |
| locadora | Locadora de veiculos, taxi, frota |
| imobiliaria | Imobiliaria, corretora |
| advocacia | Escritorio de advocacia, contador |
| escola | Escola, curso, faculdade, CEA |
| hotel | Hotel, pousada, flat |
| oficina | Oficina, borracharia, centro automotivo |
| fotografo | Fotografo, estudio, camera |
| servicos | Qualquer prestador: eletrica, manutencao |
| dentista | Dentista, clinica odontologica |
| veterinario | Veterinario, clinica vet, petshop |
| psicologo | Psicologo, terapeuta, psicopedagogo |
| nutricionista | Nutricionista, nutrologia, coach alimentar |
| arquiteto | Arquiteto, engenheiro, projetista |

Links de exemplo:
```
demo.html?preset=pizzaria
demo.html?preset=barbearia
```

Para mandar pro cliente **sem** que ele veja o painel, use o link sem `&painel=1`.

---

## Os 10 projetos reais do portfÃ³lio

AlÃ©m dos 23 nichos gerados pelo template, o portfÃ³lio mostra **10 projetos que existem
de verdade** e abrem em pÃ¡gina prÃ³pria:

| Projeto | O que Ã© | Pasta |
|---------|---------|-------|
| EducaEnem | Curso online do ENEM: aulas, PDFs, simulados e Ã¡rea do aluno | `educaenem/` |
| CÃ³digo & Conhecimento | Livro didÃ¡tico de programaÃ§Ã£o web, do HTML ao React | `codigo-conhecimento/` |
| M.O Livraria | Livraria online com catÃ¡logo, carrinho, checkout e WhatsApp | `livraria-mo/` |
| NF Control | Sistema de notas fiscais, estoque, financeiro e auditoria | `nf-control/` |
| Gerador de PortfÃ³lio | Ferramenta que monta o site do cliente sem escrever cÃ³digo | `gerador-portfolio/` |
| Lina â€” Tutor de InglÃªs | App de inglÃªs com IA: voz, cenÃ¡rios, correÃ§Ã£o de erros e XP | `tutor-ia/` |
| SkillMatch | Compatibilidade de vagas em % + plano de estudo para o candidato | `skillmatch/` |
| Comanda FÃ¡cil | Comandas, cozinha e caixa: sistema completo para restaurantes | `comandas/` |
| NEXA Store | Loja virtual com 56 produtos, carrinho, cupom e pagamento por Pix | `loja-virtual/` |
| Elaine & Sandra | Site de neuropsicopedagogia clÃ­nica, avaliaÃ§Ã£o, dÃºvidas e mapa | `elaine-sandrinha/` |

Para colocar um card desses no portfÃ³lio, edite a lista `EXEMPLOS` em
`assets/js/portfolio.js` e aponte o campo `link` para a pasta do projeto:

```js
{ id: 'meu-projeto', emoji: 'ðŸŽ¯', foto: 'assets/img/fotos/heroi-meu-projeto.jpg',
  nome: 'Meu Projeto', desc: 'O que o projeto faz', link: 'meu-projeto/index.html' }
```

A foto pode ser um arquivo local (padrÃ£o) ou um link do Unsplash. Card sem `link`
aponta para `demo.html?preset=<id>`.

---

## ComeÃ§ando em 30 segundos

Abra o `demo.html` no navegador. Escolha o negÃ³cio mais parecido com o do seu
cliente, clique em **Copiar configuraÃ§Ã£o** e cole em `assets/js/config.js`.

Para testar no celular e no computador ao mesmo tempo, rode um servidor local:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## Fluxo para entregar um site em 7 dias

| Dia | O que fazer |
|-----|-------------|
| 1 | Cliente escolhe no `demo.html` o preset mais prÃ³ximo |
| 1 | VocÃª copia o preset para `assets/js/config.js` |
| 2â€“3 | Troca nome, cores, logo, fotos e textos no config |
| 4 | Cliente envia o logo e as fotos por WhatsApp |
| 5 | VocÃª coloca os arquivos em `assets/img/` e ajusta os caminhos |
| 6 | Conecta o banco de dados (se o cliente quiser) |
| 7 | Testa no celular, envia o link e cobra |

---

## O que vocÃª edita (e o que nunca mexe)

### Edite sempre
`assets/js/config.js` â€” Ã© o **Ãºnico arquivo** que vocÃª precisa mexer.
Tem tudo comentado, do comeÃ§o ao fim:

- **brand** â€” nome, slogan, logo e favicon
- **theme** â€” as cores, o arredondamento e as fontes
- **meta** â€” tÃ­tulo e descriÃ§Ã£o que aparecem no Google
- **dataSource** â€” qual banco de dados usar (ver abaixo)
- **nav** â€” o menu do site
- **hero** â€” a primeira dobra, a parte que vende
- **stats** â€” os nÃºmeros grandes
- **sections** â€” os tÃ­tulos de cada seÃ§Ã£o
- **services** â€” os cards principais (com preÃ§o opcional)
- **portfolio** â€” as fotos, com filtro automÃ¡tico por categoria
- **about** â€” a histÃ³ria do cliente
- **contact** â€” telefone, e-mail, WhatsApp, endereÃ§o, horÃ¡rios, mapa
- **footer** â€” o rodapÃ©

### NÃ£o mexe nunca
| Arquivo | Para que serve |
|---------|----------------|
| `demo.html` | Estrutura da pÃ¡gina do site do cliente (jÃ¡ estÃ¡ pronta) |
| `assets/css/style.css` | AparÃªncia (ajuste sÃ³ se souber CSS) |
| `assets/js/app.js` | Monta o site a partir do config |
| `assets/js/data.js` | ConexÃ£o com o banco de dados |

---

## Banco de dados: ligue o que o cliente quiser

No `config.js`, dentro de `dataSource`, troque o `provider`:

### `local` (padrÃ£o)
Salva no navegador. Funciona sem servidor. Ã“timo para testar e demonstrar.
Os pedidos do formulÃ¡rio ficam no navegador de quem preencheu.

### `rest` â€” qualquer API sua
```js
provider: 'rest',
rest: { baseUrl: 'https://api.seudominio.com' }
```
O site espera:
- `GET {baseUrl}/portfolio` â†’ devolve um array JSON
- `GET {baseUrl}/services` â†’ devolve um array JSON
- `POST {baseUrl}/leads` â†’ recebe `{ nome, email, mensagem }`

Funciona com PHP, Node, Laravel, Django, WordPress (REST API), qualquer coisa.

### `supabase`
```js
provider: 'supabase',
supabase: {
  url: 'https://xxxxx.supabase.co',
  anonKey: 'sua-chave-anon'
}
```
Precisa de duas tabelas: `portfolio` e `services`, e uma `leads`.

### `sheets` â€” Google Sheets
```js
provider: 'sheets',
sheets: { url: 'https://script.google.com/macros/s/SEU_ID/exec' }
```
Os pedidos caem numa planilha. Bom para cliente pequeno que nÃ£o tem servidor.

### Importante
Se o banco falhar ou estiver fora do ar, **o site continua funcionando** e usa
os dados do `config.js`. O cliente nunca vÃª a pÃ¡gina quebrada.

---

## Dicas para vender mais

### Cores
O site calcula sozinho as variaÃ§Ãµes da cor principal para o texto ficar sempre
legÃ­vel. VocÃª escolhe **uma cor** em `theme.primary` e pronto.

Use <https://coolors.co> para montar paletas. Se o cliente jÃ¡ tem logo, peÃ§a a
cor da marca e coloque em `primary`.

### Fotos
As imagens atuais sÃ£o ilustraÃ§Ãµes de exemplo. Para cada cliente:

1. PeÃ§a as fotos no WhatsApp
2. Otimize em <https://tinypng.com> (deixe abaixo de 300 KB)
3. Salve em `assets/img/`
4. Troque o caminho no `config.js`

Formatos recomendados: `hero` (1200Ã—900), `about` (1000Ã—800), fotos da galeria (800Ã—600).

### Texto
PeÃ§a ao cliente: nome, slogan, histÃ³ria em 3 ou 4 frases, o que ele vende,
telefone, endereÃ§o, horÃ¡rio e Instagram. Com isso vocÃª preenche o config inteiro.

### PreÃ§o dos cards
O campo `price` Ã© opcional. Coloque `"R$ 24,90"` e o preÃ§o aparece no card.
Escreva `""` se aquele card nÃ£o tem preÃ§o.

### Ficha completa (clique no card)
Todo card abre uma ficha completa quando o cliente clica. Para adicionar
fotos, descriÃ§Ã£o longa e caracterÃ­sticas, use estes campos no card:

```js
{
  icon: 'star',
  title: 'Limpeza de Pele',
  badge: 'Mais pedido',              // selo no topo (opcional)
  description: 'Texto curto do card.',
  text: 'DescriÃ§Ã£o longa, que aparece dentro da ficha.',
  price: 'R$ 280',
  image: 'assets/img/foto-1.jpg',    // capa
  gallery: [                          // fotos da ficha (opcional)
    'assets/img/foto-1.jpg',
    'assets/img/foto-2.jpg',
    'assets/img/foto-3.jpg'
  ],
  features: [                         // caracterÃ­sticas (opcional)
    'EsfoliaÃ§Ã£o enzimÃ¡tica',
    { label: 'DuraÃ§Ã£o', value: '90 minutos' }
  ],
  cta: { label: 'Agendar', href: '#contato' }
}
```

Sem `gallery`, a ficha abre com uma foto sÃ³. Sem `features`, abre sÃ³ com o texto.
Funciona igual nos cards de serviÃ§o e nas fotos da galeria.

### Ãcones dos cards
Valor de `icon`:
`code, cart, design, growth, support, shield, phone, star, check, clock,
location, rocket, chart, users, heart, burger, pizza, coffee`

### SeÃ§Ãµes extras
Para criar uma seÃ§Ã£o nova, copie um `<section>` do `index.html` e chame a
funÃ§Ã£o de render no `app.js`. O estilo jÃ¡ estÃ¡ pronto, sÃ³ reaproveitar.

---

## Como publicar (colocar no ar)

OpÃ§Ã£o mais simples, sem custo:

1. Crie uma conta no [Netlify](https://netlify.com) ou [Vercel](https://vercel.com)
2. Arraste a pasta do site para lÃ¡
3. Pronto, o site jÃ¡ estÃ¡ no ar com HTTPS

Para ligar o domÃ­nio do cliente: nas configuraÃ§Ãµes do Netlify/Vercel, adicione o
domÃ­nio e atualize os registros DNS apontando para eles.

Alternativa brasileira com suporte em portuguÃªs:
[Hostinger](https://hostinger.com.br) Â· [Locaweb](https://locaweb.com.br) Â· [King.host](https://king.host)

---

## Checklist antes de entregar

- [ ] Abri o site e nÃ£o apareceu erro no console (F12)
- [ ] Testei no celular (no navegador do celular ou pelo DevTools)
- [ ] Troquei nome, telefone, e-mail e endereÃ§o
- [ ] Coloquei o logo e as fotos do cliente
- [ ] Cliquei nos botÃµes e conferi que vÃ£o para o lugar certo
- [ ] Preenchi o formulÃ¡rio e vi a mensagem de sucesso
- [ ] O texto do Google tÃ¡ certo (tÃ­tulo e descriÃ§Ã£o)
- [ ] NÃ£o sobrou nenhum "Sua Empresa" ou nome de exemplo

---

## Estrutura de arquivos

```
template-site-profissional/
â”œâ”€â”€ index.html              Site de divulgacao SEU (o principal)
â”œâ”€â”€ portfolio.html          Redireciona para o index.html
â”œâ”€â”€ demo.html               Estrutura do site do cliente + painel de presets
â”œâ”€â”€ educaenem/              Projeto real: curso online do ENEM
â”œâ”€â”€ codigo-conhecimento/    Projeto real: livro de programacao web
â”œâ”€â”€ livraria-mo/            Projeto real: livraria online
â”œâ”€â”€ nf-control/             Projeto real: sistema de notas fiscais e estoque
â”œâ”€â”€ gerador-portfolio/      Projeto real: gerador de site para cliente
â”œâ”€â”€ tutor-ia/               Projeto real: app de tutor de ingles com IA
â”œâ”€â”€ skillmatch/             Projeto real: compatibilidade de vagas + plano de estudo
â”œâ”€â”€ assets/
â”‚   â”œâ”€â”€ css/
â”‚   â”‚   â”œâ”€â”€ style.css       Visual do site do cliente
â”‚   â”‚   â”œâ”€â”€ demo.css        Visual do painel
â”‚   â”‚   â””â”€â”€ portfolio.css   Visual do site de divulgacao
â”‚   â”œâ”€â”€ js/
â”‚   â”‚   â”œâ”€â”€ config.js       EDITE ESTE - dados e cores do site do cliente
â”‚   â”‚   â”œâ”€â”€ presets.js      8 dos 23 presets (parte 1)
â”‚   â”‚   â”œâ”€â”€ presets-2.js    10 presets (parte 2)
â”‚   â”‚   â”œâ”€â”€ presets-3.js    5 presets (parte 3) â†’ TOTAL: 23
â”‚   â”‚   â”œâ”€â”€ data.js         Conexao com o banco de dados
â”‚   â”‚   â”œâ”€â”€ app.js          Monta o site
â”‚   â”‚   â”œâ”€â”€ demo.js         Logica do painel
â”‚   â”‚   â””â”€â”€ portfolio.js    Logica do site de divulgacao + lista de exemplos
â”‚   â””â”€â”€ img/                Logotipos, hero e fotos de exemplo
â””â”€â”€ README.md
```

**Para entregar ao cliente:** mande a pasta inteira, **menos** estes arquivos:
`portfolio.html`, `demo.html`, `educaenem/`, `codigo-conhecimento/`, `livraria-mo/`,
`nf-control/`, `gerador-portfolio/`, `tutor-ia/`, `skillmatch/`, `assets/css/demo.css`,
`assets/css/portfolio.css`, `assets/js/presets.js`, `assets/js/presets-2.js`,
`assets/js/presets-3.js`, `assets/js/demo.js`, `assets/js/portfolio.js`,
`README.md` e `.git`.

---

## Perguntas frequentes

**O site funciona abrindo o arquivo direto?**
Sim. Ã‰ HTML, CSS e JavaScript puro, sem build nem framework. SÃ³ a conexÃ£o com
banco de dados externo precisa de servidor (e o site cai para os dados locais
se o banco falhar).

**Preciso pagar alguma coisa?**
NÃ£o. Sem framework, sem biblioteca paga, sem build.

**Como troco a fonte?**
Em `config.js`, `theme.fontHeading` e `theme.fontBody`. Se usar uma fonte nova,
inclua o `<link>` dela no `<head>` do `index.html`.

**Como faÃ§o um site com duas pÃ¡ginas?**
Crie `sobre.html` copiando o `index.html` e mantendo os mesmos scripts. O `config`
pode ter uma seÃ§Ã£o `nav` diferente para cada pÃ¡gina.

**E se o cliente quiser mais que isso?**
DÃ¡ para fazer sim, mas aÃ­ jÃ¡ vira projeto sob medida e nÃ£o cabe nos 7 dias do
pacote bÃ¡sico. Cobre como adicional.