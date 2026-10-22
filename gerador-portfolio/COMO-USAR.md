# Como usar o Gerador de Portfólio

Este arquivo é o seu passo a passo. Pode imprimir, pode mandar para o celular,
pode mostrar para quem te ensinar. Se você não entender alguma palavra, pergunte
antes de tentar — é mais rápido do que ficar quebrando coisa.

---

## 1. O que é isto

É um arquivo de que você preenche umas caixas de texto e, no fim, o site da
pessoa já fica pronto. Você não escreve uma linha de código.

Quem usa isto hoje em dia monta site de profissional assim: preenche um
formulário, escolhe as cores, clica num botão e entrega.

---

## 2. O que tem nesta pasta

| Arquivo | Para que serve |
|---|---|
| `GERADOR.html` | **É este que você abre.** O gerador propriamente dito. |
| `exemplo-cliente/` | Um site já pronto, feito com o gerador, para você ver como fica. |
| `COMO-USAR.md` | Este passo a passo. |
| `CROQUI.html` | Um desenho do caminho todo, para você se orientar. |
| `PUBLICAR.md` | Como colocar o site no ar depois de pronto. |
| `index.html` | A página de venda do gerador. É o que o cliente abre primeiro. Você não precisa mexer nele. |

> **Nunca abra o `GERADOR.html` com Word ou Google Docs.**
> Word salva com sujeira invisível e estraga o arquivo. Abra com o
> **Bloco de Notas** ou, melhor ainda, dê dois cliques no arquivo que o
> navegador abre sozinho.

---

## 3. O caminho em 5 passos

**Passo 1 — Abra o gerador.**
Dê dois cliques em `GERADOR.html`. Vai abrir no navegador (Chrome, Edge, Firefox).
Se aparecer uma barra pedindo permissão, pode aceitar.

**Passo 2 — Preencha o que o cliente te deu.**
Do lado esquerdo tem as caixas. Comece pelo nome e pela profissão — são as únicas
com asterisco vermelho, e sem elas o site fica sem graça.

**Passo 3 — Escolha as cores.**
Logo embaixo, no lado direito, tem a parte **Cores do site**. Está explicada na
seção 4.

**Passo 4 — Clique em "Baixar meu site".**
Vai baixar um arquivo chamado `index.html`. É o site do seu cliente.

**Passo 5 — Coloque as fotos do lado.**
Crie uma pasta no computador, por exemplo `C:\portfolios\ana`, e coloque dentro
dela o `index.html` baixado **e todas as fotos**. Depois é só dar dois cliques no
`index.html`.

> Se as fotos não estiverem na mesma pasta, o site abre, mas fica sem foto.
> Isso não é defeito: é porque o site não achou o arquivo no lugar.

---

## 4. Cores do site

Esta parte é o que deixa o site parecer com a pessoa, e não com todo mundo igual.

### O jeito mais fácil: conjunto pronto

Em **Cores do site** aparecem umas plaquinhas com nome: *Terracota, Rosa, Lilás,
Azul, Verde, Vinho, Preto e dourado*. Clique na que combinar com o cliente e
pronto.

A prévia ao lado muda na hora, então dá para ver antes de escolher.

### O jeito de ajustar: as 5 caixinhas de cor

Debaixo das plaquinhas tem cinco quadradinhos. Clique neles e escolha a cor
exata. Cada um cuida de uma coisa:

| Cor | O que ela paint |
|---|---|
| **Principal** | Botões, links, destaques, a frase grande do topo. É a cor que a pessoa vai lembrar. |
| **Secundária** | Detalhes, sublinhados, Supporting things. |
| **Fundo** | A cor de trás do site todo. |
| **Fundo 2** | As faixas e os cartões, que ficam um pouco diferentes do fundo. |
| **Texto** | A cor das letras. |

Você não precisa acertar as cinco. As duas primeiras resolvem 90% do resultado.

### O que o gerador faz sozinho por você

Se você escolher só a cor principal, o gerador calcula o resto e não deixa
combinação estragada:

- o **tom clarinho** do destaque (que o site usa em etiquetas e botões suaves);
- as **linhas e bordas** (que precisam ser suaves, não chamativas);
- as **duas cores de texto secundário**, que apagam aos poucos;
- as **sombras**;
- o **brilho do topo** da página;
- e o **tema escuro** inteiro, que o visitante pode ligar lá em cima.

Se você mexer só na cor principal, mesmo assim o site fica bonito nos dois
temas. É para isso que servem essas contas.

### Cuidado com o contraste

O gerador avisa se você escolher um texto claro em cima de um fundo claro:

> **Atenção:** o texto sobre o fundo dá contraste 1.2:1 e fica difícil de ler.

É o aviso que o texto não vai dar para ler. A solução é escolher um **Texto**
mais escuro, ou um **Fundo** mais claro. Não ignore esse aviso para entregar
pro cliente.

### Voltar atrás

Se você se atrapalhar, o botão **Voltar para as cores originais** devolve tudo
ao que estava no começo. Pode mexer à vontade, nada fica gravado.

O botão **Limpar tudo** também apaga as cores.

---

## 5. As listas (os + Adicionar)

Algumas partes do site se repetem: os números, os serviços, as fotos, os
depoimentos, os contatos. Para colocar mais de um, use o botão **+ Adicionar**
que aparece embaixo de cada lista.

O número junto do item é o **número do item**, não a ordem de exibição. Se você
apagar o item 1, o 2 vira 1 sozinho.

O botão **Remover** apaga o item. O botão **Limpar tudo** apaga o gerador
inteiro.

---

## 6. Fotos

1. Coloque as fotos numa pasta.
2. No gerador, clique no botão de arquivo do lado do campo da foto. Ele só
   anota o **nome** do arquivo (ex.: `foto-ana.jpg`).
3. **Não** escreva caminho, nem barra, nem `http`.

O gerador mostra embaixo a lista dos nomes de arquivo que você usou, para você
conferir se não esqueceu nenhuma.

Formatos que funcionam: `.jpg`, `.jpeg`, `.png`, `.webp`.

Se não houver foto, o site coloca um desenho no lugar. Ele não fica feio de
propósito — é para o site nunca abrir quebrado.

---

## 7. Entregando limpo ao cliente

Quando o site estiver pronto para entregar, na parte **Escolha como quer
entregar**:

- **Tirar a tarja de "Protótipo"** — ligue. Some a tarja amarela que aparece em
  cima, e junto com ela some o aviso de que o site é modelo.
- **Manter as instruções dentro do site** — desligue. Some aquele bloco enorme
  de texto que é para você, não para o cliente.

Enquanto você ainda está mexendo, deixe os dois ligados. São o seu colete.

Quando entregar ao cliente, os dois desligados. E confira se não sobrou nenhum
aviso amarelo na prévia.

---

## 8. Se quiser editar à mão depois

Cuidado: esta parte é para quando você já tiver treinado. O Bloco de Notas
arruma o site, mas o site não arruma o Bloco de Notas.

1. Abra o `index.html` baixado com o Bloco de Notas.
2. Desça até o bloco que começa com `const DADOS = {`.
3. Cada campo tem um comentário `// EDICAO 04` — o número é a referência do
   campo no gerador.
4. **Todo texto vai entre aspas.** Aspas dentro do texto? Use o sinal de crase
   na frente: `"D'Avila"`, `"d'Ana"`. Sem o crase, a palavra fecha a frase e o
   site para de funcionar.
5. **O que estiver vazio, não aparece.** Deixe `""` e o site esconde aquele
   pedaço. Você não é obrigada a preencher tudo.
6. Em cada lista, um item começa com `{` e termina com `}`. Depois do último
   item, a linha fecha com `]` sozinho, sem vírgula.

O bloco `DADOS` é a única parte que você pode mexer à vontade. O resto do
arquivo é a "roupa" do site: mexer ali é o jeito mais rápido de quebrá-lo.

---

## 8b. O endereço final do site

Depois de publicar, você volta no gerador e escreve o endereço do site no campo
**"Endereço final do site"** (na parte *Foto e contato*). Com ele preenchido:

- o Google sabe qual é o endereço oficial da cliente;
- o WhatsApp e o Instagram mostram a prévia certa quando alguém compartilha.

Vazio? O site funciona do mesmo jeito. Mas, se a cliente já tem um site antigo no
ar, colocar o endereço novo aqui evita que as duas versões fiquem brigando no
Google.

---

## 9. Problemas que podem acontecer

| O que você vê | O que fazer |
|---|---|
| O navegador diz que o arquivo foi bloqueado | Clique em "Avançado" e depois em "Abrir assim mesmo". Só acontece com o gerador. |
| As fotos não aparecem | Confira se a foto está na **mesma pasta** do `index.html`, e se o nome bate exatamente (maiúsculas e minúsculas contam). |
| O site abre todo torto | Você provavelmente abriu com Word. Feche e abra com o Bloco de Notas ou no navegador. |
| Aparece `Maria Jose` no site | Você está com o modelo aberto em vez do site gerado. Baixe de novo pelo gerador. |
| O texto está todo com acento errado | Abra o arquivo pelo Bloco de Notas e salve como "Todos os arquivos", codificação UTF-8. |
| O nome da cliente ficou com acento perdido | Veja a linha 8 deste guia: use o crase antes do apóstrofo. |
| O botão do WhatsApp não abre | O número tem que ter o código do país, com o 55 na frente e só números. |
| Quero voltar tudo ao começo | Botão **Limpar tudo**. Você perde o que preencheu, então salve antes se estiver no meio. |

---

## 10. O que o gerador já garante

- Todo texto entra entre aspas, mesmo se você colar aspas ou barra.
- Todo item de lista ganha a vírgula sozinho, menos o último.
- Se um campo ficar vazio, o site esconde aquele pedaço, em vez de mostrar
  "undefined" ou quebrar.
- As duas paletas (clara e escura) continuam consistentes, mesmo com cor
  escolhida à mão.
- O arquivo baixado tem um só bloco de dados, um só `<style>` e fecha o
  `</html>`. Se alguma troca estragar alguma coisa, ele avisa e volta ao
  modelo inteiro — é melhor um site sem personalização do que um site sem
  roupa.
- O site já sai com **ícone de aba** (o desenho com as iniciais da cliente).
- O link já sai com **prévia de rede social**: quando a cliente mandar no
  WhatsApp, aparece o nome, a frase e a foto dela em vez de um link seco.
- Tem **acessibilidade**: botão de pular para o conteúdo, foco visível no
  teclado e aviso automático quando o contraste fica ruim.

---

## 11. E agora?

O site está pronto e baixado. Falta colocar no ar.
Siga o **`PUBLICAR.md`**.
