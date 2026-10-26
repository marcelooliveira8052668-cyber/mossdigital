# Template de Site Profissional

Template com **23 tipos de negócio prontos** e **42 exemplos** no portfólio (23 nichos
do template + 19 projetos reais). Você troca cores, logo, fotos, textos e cards num
único arquivo e entrega em minutos. Funciona para **qualquer tipo de negócio**.

Nota Lighthouse: **Acessibilidade 100 · Boas Práticas 100 · SEO 100**

---

## Quatro telas, quatro funções

| Arquivo | Para que serve | Quem vê |
|---------|----------------|---------|
| **index.html** | Seu site de divulgação. Mostra o que você faz, o preço e os 37 exemplos. É por aqui que o cliente entra | Cliente |
| **portfolio.html** | Redireciona para o `index.html` (link antigo, mantido para não quebrar quem já tinha guardado) | Cliente |
| demo.html?preset=lanchonete | O site de exemplo, já preenchido. É este link que você manda pro cliente | Cliente |
| demo.html?preset=X&painel=1 | O site de exemplo com o painel de troca | Só você |

---

## Os 23 negócios prontos

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
| salao | Salão de beleza, nails, maquiagem |
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

## Os 19 projetos reais do portfólio

Além dos 23 nichos gerados pelo template, o portfólio mostra **19 projetos que existem
de verdade** e abrem em página própria. Eles aparecem primeiro, na seção
`#reais`, separados dos modelos prontos (`#exemplos`):

| Projeto | O que é | Pasta |
|---------|---------|-------|
| M.O Music | Plataforma de música estilo Spotify: player, playlists, letra na tela e venda via Pix | [demo no ar](https://marcelooliveira8052668-cyber.github.io/mo-music/) |
| NEXA Store | Loja virtual com 56 produtos, carrinho, cupom e pagamento por Pix | `loja-virtual/` |
| Comanda Fácil | Comandas, cozinha e caixa: sistema completo para restaurantes | `comandas/` |
| EducaEnem | Curso online do ENEM: aulas, PDFs, simulados e área do aluno | `educaenem/` |
| NF Control | Sistema de notas fiscais, estoque, financeiro e auditoria | `nf-control/` |
| SkillMatch | Compatibilidade de vagas em % + plano de estudo para o candidato | `skillmatch/` |
| Lina — Tutor de Inglês | App de inglês com IA: voz, cenários, correção de erros e XP | `tutor-ia/` |
| M.O Livraria | Livraria online com catálogo, carrinho, checkout e WhatsApp | `livraria-mo/` |
| Gerador de Portfólio | Ferramenta que monta o site do cliente sem escrever código | `gerador-portfolio/` |
| Elaine & Sandra | Site de neuropsicopedagogia clínica, avaliação, dúvidas e mapa | `elaine-sandrinha/` |
| Código & Conhecimento | Livro didático de programação web, do HTML ao React | `codigo-conhecimento/` |
| Horizon Travel | Agência de viagens: destinos, pacotes, galeria e orçamento | `site-de-turismo/` |
| VELHA//CORE | Jogo da velha com IA em três dificuldades e placar por sequência | `jogo-velha/` |
| PAC-MAN//NEON | Labirinto clássico em neon: 5 fases, 4 fantasmas, frutas e ranking | `pacman/` |
| DevBook | Plataforma de curso Full Stack: 15 capítulos, editor de código, desafios corrigidos sozinhos e certificado | `devbook/` |
| Lanchonete do China | Cardápio digital com carrinho de pedido e envio direto no WhatsApp | `lanchonete-do-china/` |

Para colocar um card desses no portfólio, edite a lista `REAIS` em
`assets/js/portfolio.js` e aponte o campo `link` para a pasta do projeto:

```js
{ id: 'meu-projeto', emoji: '🎯', foto: 'assets/img/fotos/heroi-meu-projeto.jpg',
  nome: 'Meu Projeto', desc: 'O que o projeto faz', link: 'meu-projeto/index.html' }
```

Os modelos prontos ficam na lista `MODELOS`, no mesmo arquivo. Um card sem `link`
aponta para `demo.html?preset=<id>`. Um card com `link` externo (http/https) abre em
outra aba. As contagens da página (`19 projetos no ar`,
`23 modelos prontos`) são calculadas pelo próprio script, então nunca ficam
desatualizadas.

A foto pode ser um arquivo local (padrão) ou um link do Unsplash.

---

## Começando em 30 segundos

Abra o `demo.html` no navegador. Escolha o negócio mais parecido com o do seu
cliente, clique em **Copiar configuração** e cole em `assets/js/config.js`.

Para testar no celular e no computador ao mesmo tempo, rode um servidor local:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

---

## Fluxo para entregar um site em 7 dias

| Dia | O que fazer |
|-----|-------------|
| 1 | Cliente escolhe no `demo.html` o preset mais próximo |
| 1 | Você copia o preset para `assets/js/config.js` |
| 2–3 | Troca nome, cores, logo, fotos e textos no config |
| 4 | Cliente envia o logo e as fotos por WhatsApp |
| 5 | Você coloca os arquivos em `assets/img/` e ajusta os caminhos |
| 6 | Conecta o banco de dados (se o cliente quiser) |
| 7 | Testa no celular, envia o link e cobra |

---

## O que você edita (e o que nunca mexe)

### Edite sempre
`assets/js/config.js` — é o **único arquivo** que você precisa mexer.
Tem tudo comentado, do começo ao fim:

- **brand** — nome, slogan, logo e favicon
- **theme** — as cores, o arredondamento e as fontes
- **meta** — título e descrição que aparecem no Google
- **dataSource** — qual banco de dados usar (ver abaixo)
- **nav** — o menu do site
- **hero** — a primeira dobra, a parte que vende
- **stats** — os números grandes
- **sections** — os títulos de cada seção
- **services** — os cards principais (com preço opcional)
- **portfolio** — as fotos, com filtro automático por categoria
- **about** — a história do cliente
- **contact** — telefone, e-mail, WhatsApp, endereço, horários, mapa
- **footer** — o rodapé

### Não mexe nunca
| Arquivo | Para que serve |
|---------|----------------|
| `demo.html` | Estrutura da página do site do cliente (já está pronta) |
| `assets/css/style.css` | Aparência (ajuste só se souber CSS) |
| `assets/js/app.js` | Monta o site a partir do config |
| `assets/js/data.js` | Conexão com o banco de dados |

---

## Banco de dados: ligue o que o cliente quiser

No `config.js`, dentro de `dataSource`, troque o `provider`:

### `local` (padrão)
Salva no navegador. Funciona sem servidor. Ótimo para testar e demonstrar.
Os pedidos do formulário ficam no navegador de quem preencheu.

### `rest` — qualquer API sua
```js
provider: 'rest',
rest: { baseUrl: 'https://api.seudominio.com' }
```
O site espera:
- `GET {baseUrl}/portfolio` → devolve um array JSON
- `GET {baseUrl}/services` → devolve um array JSON
- `POST {baseUrl}/leads` → recebe `{ nome, email, mensagem }`

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

### `sheets` — Google Sheets
```js
provider: 'sheets',
sheets: { url: 'https://script.google.com/macros/s/SEU_ID/exec' }
```
Os pedidos caem numa planilha. Bom para cliente pequeno que não tem servidor.

### Importante
Se o banco falhar ou estiver fora do ar, **o site continua funcionando** e usa
os dados do `config.js`. O cliente nunca vê a página quebrada.

---

## Dicas para vender mais

### Cores
O site calcula sozinho as variações da cor principal para o texto ficar sempre
legível. Você escolhe **uma cor** em `theme.primary` e pronto.

Use <https://coolors.co> para montar paletas. Se o cliente já tem logo, peça a
cor da marca e coloque em `primary`.

### Fotos
As imagens atuais são ilustrações de exemplo. Para cada cliente:

1. Peça as fotos no WhatsApp
2. Otimize em <https://tinypng.com> (deixe abaixo de 300 KB)
3. Salve em `assets/img/`
4. Troque o caminho no `config.js`

Formatos recomendados: `hero` (1200×900), `about` (1000×800), fotos da galeria (800×600).

### Texto
Peça ao cliente: nome, slogan, história em 3 ou 4 frases, o que ele vende,
telefone, endereço, horário e Instagram. Com isso você preenche o config inteiro.

### Preço dos cards
O campo `price` é opcional. Coloque `"R$ 24,90"` e o preço aparece no card.
Escreva `""` se aquele card não tem preço.

### Ficha completa (clique no card)
Todo card abre uma ficha completa quando o cliente clica. Para adicionar
fotos, descrição longa e características, use estes campos no card:

```js
{
  icon: 'star',
  title: 'Limpeza de Pele',
  badge: 'Mais pedido',              // selo no topo (opcional)
  description: 'Texto curto do card.',
  text: 'Descrição longa, que aparece dentro da ficha.',
  price: 'R$ 280',
  image: 'assets/img/foto-1.jpg',    // capa
  gallery: [                          // fotos da ficha (opcional)
    'assets/img/foto-1.jpg',
    'assets/img/foto-2.jpg',
    'assets/img/foto-3.jpg'
  ],
  features: [                         // características (opcional)
    'Esfoliação enzimática',
    { label: 'Duração', value: '90 minutos' }
  ],
  cta: { label: 'Agendar', href: '#contato' }
}
```

Sem `gallery`, a ficha abre com uma foto só. Sem `features`, abre só com o texto.
Funciona igual nos cards de serviço e nas fotos da galeria.

### Ícones dos cards
Valor de `icon`:
`code, cart, design, growth, support, shield, phone, star, check, clock,
location, rocket, chart, users, heart, burger, pizza, coffee`

### Seções extras
Para criar uma seção nova, copie um `<section>` do `index.html` e chame a
função de render no `app.js`. O estilo já está pronto, só reaproveitar.

---

## Como publicar (colocar no ar)

Opção mais simples, sem custo:

1. Crie uma conta no [Netlify](https://netlify.com) ou [Vercel](https://vercel.com)
2. Arraste a pasta do site para lá
3. Pronto, o site já está no ar com HTTPS

Para ligar o domínio do cliente: nas configurações do Netlify/Vercel, adicione o
domínio e atualize os registros DNS apontando para eles.

Alternativa brasileira com suporte em português:
[Hostinger](https://hostinger.com.br) · [Locaweb](https://locaweb.com.br) · [King.host](https://king.host)

---

## Checklist antes de entregar

- [ ] Abri o site e não apareceu erro no console (F12)
- [ ] Testei no celular (no navegador do celular ou pelo DevTools)
- [ ] Troquei nome, telefone, e-mail e endereço
- [ ] Coloquei o logo e as fotos do cliente
- [ ] Cliquei nos botões e conferi que vão para o lugar certo
- [ ] Preenchi o formulário e vi a mensagem de sucesso
- [ ] O texto do Google tá certo (título e descrição)
- [ ] Não sobrou nenhum "Sua Empresa" ou nome de exemplo

---

## Estrutura de arquivos

```
template-site-profissional/
├── index.html              Site de divulgacao SEU (o principal)
├── portfolio.html          Redireciona para o index.html
├── demo.html               Estrutura do site do cliente + painel de presets
├── educaenem/              Projeto real: curso online do ENEM
├── codigo-conhecimento/    Projeto real: livro de programacao web
├── livraria-mo/            Projeto real: livraria online
├── nf-control/             Projeto real: sistema de notas fiscais e estoque
├── gerador-portfolio/      Projeto real: gerador de site para cliente
├── tutor-ia/               Projeto real: app de tutor de ingles com IA
├── skillmatch/             Projeto real: compatibilidade de vagas + plano de estudo
├── comandas/               Projeto real: comandas, cozinha e caixa
├── loja-virtual/           Projeto real: loja com carrinho e pagamento
├── elaine-sandrinha/       Projeto real: site de neuropsicopedagogia
├── site-de-turismo/        Projeto real: agencia de viagens
├── jogo-velha/             Projeto real: jogo da velha com IA
├── pacman/                 Projeto real: labirinto classico em neon
├── lanchonete-do-china/    Projeto real: cardapio digital com pedido pelo WhatsApp
├── assets/
│   ├── css/
│   │   ├── style.css       Visual do site do cliente
│   │   ├── demo.css        Visual do painel
│   │   └── portfolio.css   Visual do site de divulgacao
│   ├── js/
│   │   ├── config.js       EDITE ESTE - dados e cores do site do cliente
│   │   ├── presets.js      8 dos 23 presets (parte 1)
│   │   ├── presets-2.js    10 presets (parte 2)
│   │   ├── presets-3.js    5 presets (parte 3) → TOTAL: 23
│   │   ├── data.js         Conexao com o banco de dados
│   │   ├── app.js          Monta o site
│   │   ├── demo.js         Logica do painel
│   │   └── portfolio.js    Logica do site de divulgacao + lista de exemplos
│   └── img/                Logotipos, hero e fotos de exemplo
└── README.md
```

**Para entregar ao cliente:** mande a pasta inteira, **menos** as pastas dos projetos
reais (`educaenem/`, `codigo-conhecimento/`, `livraria-mo/`, `nf-control/`,
`gerador-portfolio/`, `tutor-ia/`, `skillmatch/`, `comandas/`, `loja-virtual/`,
`elaine-sandrinha/`, `site-de-turismo/`, `jogo-velha/`, `pacman/`, `lanchonete-do-china/`) e estes arquivos:
`portfolio.html`, `demo.html`, `assets/css/demo.css`, `assets/css/portfolio.css`,
`assets/js/presets.js`, `assets/js/presets-2.js`, `assets/js/presets-3.js`,
`assets/js/demo.js`, `assets/js/portfolio.js`, `README.md` e `.git`.

---

## Perguntas frequentes

**O site funciona abrindo o arquivo direto?**
Sim. É HTML, CSS e JavaScript puro, sem build nem framework. Só a conexão com
banco de dados externo precisa de servidor (e o site cai para os dados locais
se o banco falhar).

**Preciso pagar alguma coisa?**
Não. Sem framework, sem biblioteca paga, sem build.

**Como troco a fonte?**
Em `config.js`, `theme.fontHeading` e `theme.fontBody`. Se usar uma fonte nova,
inclua o `<link>` dela no `<head>` do `index.html`.

**Como faço um site com duas páginas?**
Crie `sobre.html` copiando o `index.html` e mantendo os mesmos scripts. O `config`
pode ter uma seção `nav` diferente para cada página.

**E se o cliente quiser mais que isso?**
Dá para fazer sim, mas aí já vira projeto sob medida e não cabe nos 7 dias do
pacote básico. Cobre como adicional.

## Propriedade intelectual

Todo o codigo-fonte deste portfólio (HTML, CSS, JavaScript, imagens e
textos) é propriedade do autor — veja o arquivo [LICENSE](LICENSE).
É proibida a reprodução, redistribuição ou revenda sem autorização
escrita. Os clientes compram **licença de uso** para o próprio negócio,
não o código para revenda. O site aplica bloqueios simples de cópia
(botão direito, atalhos e seleção) como desincentivo; a proteção
principal é jurídica.
