# Horizon Travel — site de agência de viagens

Site institucional para agência de viagens: destinos, pacotes com preço,
galeria, depoimentos, dúvidas e um formulário de orçamento que **funciona de
verdade**.

Site estático, sem banco de dados e sem servidor: copie os arquivos como estão
para qualquer hospedagem (GitHub Pages, Hostinger, hospedagem comprada).

---

## O que o site tem

| Seção | Conteúdo |
|---|---|
| Cabeçalho | Fixo, transparente sobre o herói e sólido ao rolar; botão **Orçamento** |
| Início | Foto real, título, dois botões e três números de confiança |
| Destinos | 6 destinos com foto, estrelas, descrição e **"a partir de"** |
| Pacotes | Econômico / Premium (destacado) / Luxo, com lista do que está incluso |
| Como funciona | As 4 etapas, do pedido até o embarque |
| Galeria | 6 fotos com visualizador em tela cheia |
| Depoimentos | 3 avaliações com estrelas e iniciais |
| Dúvidas | 6 perguntas frequentes em acordeão |
| Contato | Formulário validado + painel com horário, e-mail e transparência |

**Tudo interativo é real.** No site anterior, o formulário e os botões
"Reservar" estouravam um `alert()` fingindo que algo foi enviado — e nada
saía do navegador do visitante. Um cliente que acha que recebe lead e não
recebe é um cliente perdido.

## Como o contato funciona

O formulário **não envia e não guarda nada automaticamente**. Ele valida,
monta a mensagem e entrega pelo canal que existir, nesta ordem:

1. **WhatsApp** — se houver número no `CONFIG`, abre `wa.me` com a mensagem já escrita;
2. **Área de transferência** — se não houver número, copia a mensagem e avisa;
3. **E-mail** — se não houver clipboard, abre o programa de e-mail.

Os botões **"Montar roteiro"** e **"Reservar"** seguem a mesma lógica: sem
número cadastrado, eles rolam até o formulário e já deixam o destino ou o
pacote preenchidos.

---

## Como rodar

```bash
npx serve .
# ou
python -m http.server 8000
```

## O que o cliente vai querer mudar

### 1. WhatsApp da agência — `script.js`, no topo

```js
const CONFIG = {
    whatsapp: '',            // ex.: '5511999999999' (só dígitos, com 55 e DDD)
    email: 'contato@horizontravel.com.br',
    instagram: ''
};
```

Este é o único lugar que precisa ser mexido. Com `whatsapp` preenchido,
**todos** os botões do site passam a abrir conversa no WhatsApp.

### 2. Nome, e-mail e registro

- nome/e-mail: cabeçalho, rodapé e painel de contato;
- registro (CECAD) e nota "Site de demonstração": rodapé.

### 3. Preços e depoimentos

Os valores (R$ 2.999 / 5.999 / 9.999 e os "a partir de" dos destinos) e os
três depoimentos são **conteúdo de demonstração**, para o site ficar pronto
para apresentação. Antes de vender a um cliente real, troque por dados
verdadeiros.

> **Nada foi inventado sobre o cliente**: o site não representa um negócio
> real, então nome, preços e avaliações são de demonstração e estão marcados
> como tal — inclusive no rodapé e na seção de pacotes.

---

## Estrutura

```
index.html      8 seções, JSON-LD TravelAgency, metadados, lightbox
style.css       variáveis de design, grid, responsivo, impressão
script.js       CONFIG, menu, lightbox, formulário, destaque de seção
favicon.svg     avião dourado sobre fundo marinho
img/            13 fotos locais (nenhuma dependência externa de imagem)
```

## Imagens

As 13 fotos vêm do **Unsplash** (licença livre, uso comercial permitido,
sem obrigação de crédito) e estão **dentro da pasta `img/`**, já
redimensionadas para o tamanho de uso.

Isso é deliberado: no site original as imagens vinham de servidor externo a
cada visita — mais lento e fora do ar se o original sair do ar. Agora o site
funciona offline e qualquer pessoa pode trocar as fotos substituindo os
arquivos com o mesmo nome.

Para trocar uma foto: coloque o arquivo com o **mesmo nome** na pasta `img/`
(na proporção 4:3, 1200×900) e pronto.

## Acessibilidade e detalhes de acabamento

- Pular para o conteúdo, foco visível, `aria-expanded`/`aria-current` corretos
- Menu móvel abre/fecha com clique, toque, **Esc** e fecha ao clicar fora
- Visualizador com **←**, **→**, **Esc**, clique fora, foco preso dentro e
  foco devolvido ao fechar
- `prefers-reduced-motion`, folha de impressão e `lang="pt-BR"`
- Metadados SEO, Open Graph e **JSON-LD** `TravelAgency` com as três ofertas
