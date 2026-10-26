# 📖 GUIA DO CÓDIGO — MOSS BURGER (linha por linha)

> Guia de estudo do projeto. Leia com o VS Code aberto lado a lado.  
> Cada seção explica um arquivo: o que ele é, o que cada parte faz e por quê.

---

## 🗺️ MAPA MENTAL: como as peças se conectam

Imagine o site como um **corpo humano**:

| Arquivo | Analogia | Função |
|---------|----------|--------|
| `index.html` | Os ossos | Estrutura da página (a div `#root`) |
| `src/main.jsx` | O sistema nervoso | Liga o React ao HTML |
| `src/App.jsx` | O esqueleto ordenado | Monta as seções na ordem certa |
| CSS (`*.css`) | A roupa e a pele | Visual: cores, fontes, posições |
| `src/data/produtos.js` | A memória | Todos os dados do cardápio |
| `src/context/CarrinhoContext.jsx` | O cérebro | Regras do carrinho e do pedido |
| Componentes (`*.jsx`) | Os órgãos | Cada um faz uma função específica |

**Fluxo de uma compra (o mais importante):**

```
Cliente clica "＋ Adicionar"
        ↓
ProdutoCard chama adicionar(produto)
        ↓
CarrinhoContext salva no estado `itens`
        ↓
React "redesenha" a tela (carrinho, contador, total)
        ↓
Cliente clica "Enviar pedido no WhatsApp"
        ↓
montarMensagem() formata o texto → window.open(wa.me)
```

---

## 1. `index.html` — a porta de entrada

O React é injetado dentro dele; ele mesmo quase não tem conteúdo.

```html
<html lang="pt-BR">
```
- `lang="pt-BR"`: diz ao navegador e ao Google que o site é em português do Brasil. Importante para **leitores de tela** (acessibilidade) e **SEO**.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```
- **A linha mais importante do site mobile.** Sem ela, o celular "acha" que é um computador e mostra tudo minúsculo. Com ela, o site se adapta à largura do aparelho.

```html
<div id="root"></div>
```
- Uma div vazia. É dentro dela que o React desenha **todo o site**. Se você apagar essa linha, o site fica em branco.

```html
<script type="module" src="/src/main.jsx"></script>
```
- Aponta pro arquivo que liga o React. `type="module"` permite usar `import/export` (importações modernas).

---

## 2. `src/main.jsx` — o "liga" do site

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
```
- Importo as ferramentas do React. `StrictMode` é um "fiscal" que avisa erros comuns durante o desenvolvimento. `createRoot` é a porta de entrada do React 18+.

```jsx
import './index.css'
```
- Importo o CSS global **antes de tudo**, para que as variáveis de cor estejam disponíveis em qualquer componente.

```jsx
import { CarrinhoProvider } from './context/CarrinhoContext.jsx'
```
- Importo o "provedor" do carrinho: ele que vai disponibilizar o carrinho para todos os componentes.

```jsx
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CarrinhoProvider>
      <App />
    </CarrinhoProvider>
  </StrictMode>,
)
```
- `document.getElementById('root')` = "ache a div #root no HTML".
- `.render(...)` = "desenhe isto dentro dela".
- A ordem dos "envelopes" importa:
  - `StrictMode` envolve tudo (fiscal).
  - `CarrinhoProvider` envolve o `App` (carrinho disponível em qualquer lugar).
  - `App` é o site.

---

## 3. `src/App.jsx` — a montagem do site

```jsx
export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Destaques />
        <Cardapio />
        <Promocoes />
        <Sobre />
        <Contato />
      </main>
      <Rodape />
      <Carrinho />
      <BotaoWhats />
    </>
  )
}
```

- `export default` = "exporto uma função chamada App como principal deste arquivo". É o que permite o `import App` no main.jsx.
- `<>...</>` = **Fragmento React**: agrupa elementos SEM criar uma `<div>` extra na página (preserva o layout limpo).
- `<main>` = tag semântica HTML5: diz "isto é o conteúdo principal" (bom para acessibilidade e SEO).
- `<Carrinho />` e `<BotaoWhats />` ficam **fora** do `<main>` porque são elementos flutuantes (painel e botão fixo na tela).
- Regra de ouro: **App só monta** — toda a lógica mora nos componentes.

---

## 4. `src/index.css` — as regras de casa

### 4.1 Variáveis de cor
```css
:root {
  --grafite: #171717;
  --vermelho: #E63946;
  --amarelo: #FFC857;
  ...
}
```
- `:root` = seletor do elemento raiz (o `<html>`). Variáveis declaradas aqui ficam disponíveis **em todo o site**.
- `--nome: valor` cria a variável. Uso: `background: var(--vermelho)`.
- **Por quê:** se o cliente pedir "trocar o vermelho", muda-se **1 linha** e todo o site atualiza.

### 4.2 Reset
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
```
- `*` = "todos os elementos".
- Zero margens e paddings padrão (cada navegador tem os seus).
- `box-boxing: border-box` = "a borda e o padding entram DENTRO da largura que eu definir" — evita que um card de 300px vire 330px por causa do padding.

### 4.3 Classe utilitária `.container`
```css
.container { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
```
- `max-width: 1120px` = limite de largura (em telas grandes o conteúdo não estica demais).
- `margin: 0 auto` = "margem automática em cima e embaixo, igual dos lados" → **centraliza** o bloco.
- `padding: 0 20px` = respiro lateral (principal no celular, senão o texto encosta na borda).

### 4.4 Classe `.btn`
```css
.btn { display: inline-block; ... transition: transform .15s; }
.btn:active { transform: scale(.96); }
```
- `display: inline-block` = o botão se comporta como texto (fica ao lado de outro) mas aceita largura/altura.
- `transition: transform .15s` = "quando a transformação mudar, faça isso em 0,15s" → animação suave.
- `:active` = estado enquanto o botão está **pressionado** → encolhe 4% (sensação de "apertou de verdade").

### 4.5 Media Query (o celular primeiro)
```css
@media (max-width: 820px) { ... }
```
- "Se a tela tiver **no máximo** 820px de largura, aplique estas regras."
- 820px = limite entre tablet e celular. As regras DENTRO dele desmontam grades, escondem menus e empilham conteúdos.

---

## 5. `src/data/produtos.js` — o banco de dados

```js
export const categorias = [
  { id: 'lanches', nome: 'Lanches', emoji: '🍔' },
  ...
]
```
- Um array (lista) de objetos. Cada objeto = uma categoria com identificador único (`id`).

```js
export const produtos = [
  {
    id: 2,
    nome: 'MOSS Bacon',
    categoria: 'lanches',
    emoji: '🥓',
    descricao: 'Blend 150g, cheddar cremoso, bacon...',
    preco: 27.9,
    destaque: true,
    maisVendido: true,
  },
  ...
]
```
- **Cada produto é um objeto com campos nomeados.** Isso torna o código legível: `produto.preco` é autoexplicativo.
- `preco: 27.9` = número **sem formato** (sem R$, sem vírgula). A formatação acontece na tela, na função `formatarMoeda`. Isso é importante porque o computador precisa somar números, não textos.
- `destaque: true` = flag booleana que faz o produto aparecer na vitrine "Os mais pedidos".
- `maisVendido: true` = ativa a etiqueta 🔥.

### 📸 COMO COLOCAR FOTOS REAIS (passo a passo)

**Passo 1 —** Crie a pasta `public/fotos/` dentro de `moss-burger/`:
```
moss-burger/
└── public/
    └── fotos/          ← crie esta pasta
        ├── moss-bacon.jpg
        ├── moss-classico.jpg
        └── ...
```
> Pasta `public` = área pública: o que está dentro dela é copiado como está pro site final.

**Passo 2 —** Otimize as fotos antes (site rápido = mais vendas):
- Tamanho ideal: **800×600 px**
- Peso ideal: **até 150 KB** por foto
- Formato: `.jpg` (ou `.webp`, ainda mais leve)

**Passo 3 —** Em `produtos.js`, adicione a linha `foto` em cada produto:
```js
{
  id: 2,
  nome: 'MOSS Bacon',
  categoria: 'lanches',
  emoji: '🥓',                          // fica como reserva
  foto: 'fotos/moss-bacon.jpg',         // ← ADICIONE ESTA LINHA
  descricao: '...',
  preco: 27.9,
},
```
**Pronto!** Os componentes já foram preparados: se existir `foto`, usam a imagem; se não, usam o emoji. Zero mudança em outro arquivo.

> ⚠️ O caminho `fotos/...` está **relativo** à pasta `public` — não coloque `public/fotos/...`, senão não acha.

---

## 6. `src/utils/formatar.js` — formatação reutilizável

```js
export function formatarMoeda(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',')
}
```
Linha por linha:
- `valor.toFixed(2)` = arredonda pra **2 casas decimais** e devolve **texto**: `27.9` → `"27.90"`.
- `.replace('.', ',')` = troca o ponto pela vírgula (padrão brasileiro): `"27.90"` → `"27,90"`.
- Concateno o `"R$ "` na frente.
- Resultado: `formatarMoeda(27.9)` → **`R$ 27,90`**.
- **Por quê uma função separada?** Porque a mesma formatação é usada em 6 arquivos diferentes. Se mudar aqui, muda em todos.

---

## 7. `src/context/CarrinhoContext.jsx` — O CÉREBRO

Este é o arquivo mais importante. Leia com calma.

### 7.1 As constantes (regras de negócio)
```js
const PEDIDO_MINIMO = 30
const TAXA_ENTREGA = 6
const ENTREGA_GRATIS = 60
const WHATSAPP = '5500900000000'
```
- Todas vêm do briefing. Separadas no topo para fácil manutenção.
- O número é **fictício** — num projeto real, o cliente fornece o dele (nunca use dados pessoais sem autorização).

### 7.2 O contexto e o estado
```js
const CarrinhoContext = createContext()

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState([])
  const [painelAberto, setPainelAberto] = useState(false)
```
- `createContext()` = cria o "canal" de compartilhamento.
- `{ children }` = desestruturo a propriedade `children`: são os componentes envolvidos pelo Provider (no caso, o `App` inteiro).
- `itens` = array de `{ produto, quantidade }`. Começa vazio `[]`.
- `painelAberto` = se o painel lateral está visível.

### 7.3 A função adicionar
```js
function adicionar(produto) {
  setItens(atual => {
    const existente = atual.find(i => i.produto.id === produto.id)
    if (existente) {
      return atual.map(i =>
        i.produto.id === produto.id ? { ...i, quantidade: i.quantidade + 1 } : i
      )
    }
    return [...atual, { produto, quantidade: 1 }]
  })
  setPainelAberto(true)
}
```
Linha por linha:
- `setItens(atual => {...})` = "atualize o estado usando o valor ATUAL como base" (forma segura, evita bugs com cliques rápidos).
- `.find(...)` = "procure o primeiro item cujo id do produto seja igual ao id clicado".
- Se **existe**: `.map(...)` percorre todos os itens e, **apenas no item certo** (operador ternário `? :`), soma 1 na quantidade. Os demais ficam iguais.
- Se **não existe**: `[...atual, { produto, quantidade: 1 }]` = copio todos os itens atuais (`...atual`) e acrescento o novo no final.
- `{ ...i }` = "spread": copia todas as propriedades do item e sobrescreve `quantidade` (imutabilidade — nunca mexo no objeto original).
- `setPainelAberto(true)` = abro o painel automaticamente (feedback imediato pro cliente).

### 7.4 mudarQuantidade e a "mágica" do filtro
```js
function mudarQuantidade(id, mudanca) {
  setItens(atual =>
    atual
      .map(i => (i.produto.id === id ? { ...i, quantidade: i.quantidade + mudanca } : i))
      .filter(i => i.quantidade > 0)
  )
}
```
- `.map()` aplica o ajuste (+1 ou −1).
- `.filter()` **remove** qualquer item que tenha chegado a 0 → é assim que o "−" apaga o produto quando chega no zero.

### 7.5 Os cálculos
```js
const subtotal = itens.reduce((soma, i) => soma + i.produto.preco * i.quantidade, 0)
const taxa = subtotal >= ENTREGA_GRATIS || subtotal === 0 ? 0 : TAXA_ENTREGA
const total = subtotal + taxa
const abaixoDoMinimo = subtotal > 0 && subtotal < PEDIDO_MINIMO
```
- `reduce((acumulador, item) => novoAcumulador, 0)` = reduz a lista a **um número**. O `0` é o valor inicial do acumulador. Percorre: soma += preço × quantidade.
- `taxa`: operador ternário — "se passou do limite OU carrinho vazio → 0; senão → R$6".
- `abaixoDoMinimo` = booleano que o componente do carrinho usa para **bloquear** o botão de envio.

### 7.6 A mensagem do WhatsApp
```js
let texto = '*🍔 NOVO PEDIDO — MOSS BURGER*\n──────────────\n'
itens.forEach(i => {
  texto += `• ${i.quantidade}x ${i.produto.nome} — ${formatarLocal(...)}\n`
})
```
- `forEach` = percorro cada item e **concateno** (`+=`) uma linha de texto.
- `\n` = quebra de linha (no WhatsApp vira linha nova).
- `*texto*` = negrito **no WhatsApp** (a convenção dele é asterisco).

```js
const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(montarMensagem())}`
window.open(url, '_blank')
```
- `wa.me/NUMERO` = atalho oficial do WhatsApp.
- `?text=` = parâmetro que carrega a mensagem pronta.
- `encodeURIComponent()` = **obrigatório**: transforma acentos, espaços e quebras de linha em código seguro de URL (`%20`, `%0A`...). Sem ele, a URL quebra.
- `window.open(url, '_blank')` = abre em nova aba.

### 7.7 O Provider e o hook
```jsx
<CarrinhoContext.Provider value={{ itens, adicionar, ... }}>
  {children}
</CarrinhoContext.Provider>
```
- `value={{...}}` = "tudo que está aqui dentro fica disponível para quem usar o contexto".
- `{children}` = renderizo os componentes filhos (o site).

```js
export function useCarrinho() {
  return useContext(CarrinhoContext)
}
```
- Um **hook personalizado**: em vez de importar 2 coisas em todo componente, basta `useCarrinho()`. Padroniza e encurta o código.

---

## 8. Componentes (um resumo do que cada linha faz)

### 8.1 `Header.jsx`
```jsx
const [menuAberto, setMenuAberto] = useState(false)
```
- Estado do menu hambúrguer (só celular).

```jsx
const { totalItens, setPainelAberto } = useCarrinho()
```
- Pego do contexto **só o que preciso** (boa prática: menos re-renderizações).

```jsx
<svg viewBox="0 0 48 48" ...>
  <rect width="48" height="48" rx="12" fill="#171717" />
  <path d="M10 20 Q24 6 38 20 Z" fill="#FFC857" />
  ...
</svg>
```
- Logo desenhada em **SVG vetorial**: `rect` = retângulo (fundo), `path` = caminho do pão. `rx=12` = cantos arredondados. Vetor = nítida em qualquer tamanho e pesa bytes.

```jsx
<a href="#cardapio" onClick={() => setMenuAberto(false)}>Cardápio</a>
```
- `#cardapio` = link âncora: rola até o elemento com `id="cardapio"`. O `onClick` fecha o menu mobile após o clique.

```jsx
{totalItens > 0 && <span className="badge">{totalItens}</span>}
```
- `&&` mágico do React: "se houver itens, mostre a bolinha; senão, não renderize nada".

### 8.2 `Hero.jsx`
- Seção de banner com título, slogan e 2 botões.
- As classes `hero-circulo`, `etq1`, `etq2` usam a animação `@keyframes flutuar` (translateY de 0 a −12px) — efeito "levitando".

### 8.3 `ProdutoCard.jsx` (componente reutilizável)
```jsx
export default function ProdutoCard({ produto }) {
```
- Recebe o produto via **propriedade** (prop).

```jsx
{produto.maisVendido && <span className="tag-card">🔥 MAIS VENDIDO</span>}
```
- Etiqueta condicional: só aparece se a flag existir.

```jsx
{produto.foto ? <img src={produto.foto} alt={produto.nome} /> : produto.emoji}
```
- Operador ternário que decide foto real ou emoji. `alt` = texto alternativo (acessibilidade + Google Images).

### 8.4 `Cardapio.jsx`
```jsx
const [categoriaAtiva, setCategoriaAtiva] = useState('lanches')
const produtosFiltrados = produtos.filter(p => p.categoria === categoriaAtiva)
```
- Estado da aba + filtro. Ao clicar numa aba, muda o estado → React redesenha a lista automaticamente. **Esse é o padrão de 90% dos filtros em sites.**

```jsx
{categorias.map(cat => (
  <button key={cat.id} className={`categoria ${ativa === cat.id ? 'ativa' : ''}`}>
```
- `key={cat.id}` = identificador único que o React exige em listas (sem ele, aviso no console e bugs de performance).
- Template literal com classe condicional: se for a aba ativa, ganha a classe `ativa` (muda o visual).

### 8.5 `Promocoes.jsx`
```jsx
const desconto = Math.round((1 - promo.preco / promo.precoAntigo) * 100)
```
- Cálculo do % de desconto. Ex.: `1 - 34.9/46.8 = 0.254` → `× 100 = 25.4` → `Math.round = 25` → etiqueta **-25%**.

```jsx
onClick={() => adicionar({ ...promo, categoria: 'promocao' })}
```
- O combo entra no carrinho como um produto qualquer. `{ ...promo }` copia tudo e acrescenta a categoria.

### 8.6 `Contato.jsx` (formulário funcional)
```jsx
const [formulario, setFormulario] = useState({ nome: '', telefone: '', ... })
```
- Um **único objeto** guarda todos os campos (em vez de 4 estados separados).

```jsx
function handleChange(e) {
  setFormulario({ ...formulario, [e.target.name]: e.target.value })
}
```
- `[e.target.name]` = **chave dinâmica**: o `name` do input ("nome", "telefone"...) vira a chave do objeto. Uma função atende todos os campos.

```jsx
function handleSubmit(e) {
  e.preventDefault()
```
- Sem isso, o formulário recarregaria a página (comportamento antigo do HTML) e perderia tudo.

### 8.7 `Carrinho.jsx`
- Usa `painelAberto` para adicionar/remover a classe `aberto` → CSS faz o painel deslizar (`right: -440px` → `right: 0` com `transition`).
- Mostra aviso de mínimo ou bônus de entrega conforme os booleanos vindos do contexto.
- `disabled={abaixoDoMinimo}` = bloqueia o botão enquanto o pedido estiver abaixo de R$30.

### 8.8 `BotaoWhats.jsx` e `Rodape.jsx`
- Botão fixo: CSS `position: fixed` + animação `pulso` (box-shadow crescendo) para chamar atenção.
- Rodapé: links âncora + créditos (SEO e credibilidade).

---

## 9. Perguntas frequentes deste projeto

### 💳 "E se o cliente quiser Pix e cartão?"
| Opção | Como funciona | Custo |
|-------|--------------|-------|
| **Pix estático (v1)** | Cliente gera QR Code no app do banco; site mostra a imagem + chave copia-e-cola | Grátis |
| **Pix/Cartão automático (v2)** | API de gateway (Mercado Pago, Efí, Stripe): site gera cobrança e confirma pagamento sozinho | ~3% por transação + conta cadatrada |

O site **já está preparado** para a v2: bastaria uma nova função "Finalizar pagamento" ao lado do "Enviar no WhatsApp".

### 🗺️ "Dá pra colocar mapa da loja?"
Sim, grátis, sem API:
```html
<iframe src="https://maps.google.com/maps?q=ENDERECO_AQUI&z=15&output=embed"></iframe>
```
Basta trocar `ENDERECO_AQUI` pelo endereço real (com `%20` no lugar dos espaços).

### 🛵 "E monitorar entregas no iFood/99?"
**Não é possível** por site: iFood e 99 são plataformas fechadas, sem acesso externo. O fluxo real de lanchonete pequena: pedido chega no WhatsApp → loja gerencia no app do iFood (se usar) → acompanhamento por WhatsApp com o cliente. O que o site pode fazer é exibir o botão **"Peça também no iFood"** com o link da loja.

### 🎬 "E vídeos promocionais?"
- **Incorporar (embed) vídeo do YouTube**: permitido — o YouTube fornece o código oficial.
- **Baixar vídeo de terceiros e hospedar**: **viol direito autoral**. Fontes seguras: vídeos próprios, Pexels/Pixabay (licença livre), ou campanha paga do próprio estabelecimento.

---

## 10. Comandos essenciais (guia de bolso)

| Comando | O que faz |
|---------|-----------|
| `npm install` | Baixa as bibliotecas do `package.json` (1x por máquina) |
| `npm run dev` | Sobe o site de teste em http://localhost:5173 (com hot reload) |
| `npm run build` | Compila o site pra produção na pasta `dist/` |
| `git add .` | Marca alterações pra salvar |
| `git commit -m "mensagem"` | Salva um ponto no histórico |
| `git push` | Envia pro GitHub (publica!) |

### Regra de publicação deste projeto
```
Mudou algo em moss-burger/src/?  →  npm run build  →  copiar dist/ para moss-burger-online/  →  git add + commit + push
```

---

*Guia criado pela MOSS Digital para estudo. Atualize este arquivo sempre que o projeto evoluir.*
