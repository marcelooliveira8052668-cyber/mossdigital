# Como colocar o site no ar

Você terminou o site do cliente. Ele está funcionando no seu computador, com dois
cliques. Mas enquanto ele estiver só no seu computador, **só você vê**. O cliente
não vê, e o celular dele também não.

Colocar no ar é, em português simples, **arrumar um endereço na internet para o
site morar**.

O site já é feito de um jeito que funciona na internet. Não tem nada para
instalar, nada para pagar, nada para configurar. É só escolher uma das opções
abaixo e arrastar o arquivo.

---

## Antes de começar: a pasta tem que estar certa

Seu site precisa ser uma pasta com estas coisas dentro:

```
portfolios/
   ana/
      index.html        <- o site
      foto-ana.jpg      <- as fotos
      trabalho-1.jpg
      trabalho-2.jpg
```

Três regras que não dá para quebrar:

1. **O arquivo tem que se chamar `index.html`.** É por esse nome que o site é
   procurado. Se o seu se chamar `portifolio.html` ou `meusite.html`, não vai
   aparecer. Renomeie.
2. **As fotos na mesma pasta, com o mesmo nome.** Se o site procura
   `foto-ana.jpg` e o arquivo se chama `foto-ana (1).jpg`, não acha.
3. **Nada de pastas dentro.** Se a foto estiver em `fotos/foto-ana.jpg`, o site
   não acha. Deixe tudo solto, junto com o `index.html`.

> Confirme antes: abra o `index.html` com dois cliques e veja se a foto aparece
> e se o botão do WhatsApp funciona. Se funcionar aí, funciona na internet.

---

## Antes de entregar: escreva o endereço do site

Na volta, abra o gerador de novo, escreva o endereço novo no campo
**"Endereço final do site"** e baixe o `index.html` de novo. É esse passo que
faz o Google e o WhatsApp mostrarem a prévia certa da cliente.

## Duas coisas para desligar antes de entregar

No gerador, na parte **Escolha como quer entregar**, ligue **Tirar a tarja de
"Protótipo"** e desligue **Manter as instruções dentro do site**. Depois baixe o
arquivo de novo.

Confirme na prévia que não sobrou aviso amarelo e que o bloco de instruções
desapareceu. Entregar modelo ao cliente é vergonha.

---

## Opção 1 — Netlify Drop (a mais fácil de todas)

É literalmente arrastar e soltar. Sem conta obrigatória, sem cartão, sem
programa instalado. Faça esta.

**O que você faz:**

1. Abra no navegador: **https://app.netlify.com/drop**
2. No Computador, abra a pasta do site (`ana`).
3. Arraste a pasta inteira para dentro da janela do site.
4. Espere um pouquinho. Aparece um nome de site, mais ou menos assim:
   `silly-name-123abc.netlify.app`
5. Copie esse endereço e mande para o cliente.

**Pronto. Site no ar.**

**Como trocar o nome do site** (opcional, mas é o que fica profissional):

1. Crie uma conta no Netlify com o seu e-mail. Você pode deixar de graça.
2. Em vez do *Drop*, use **Add new site** → **Deploy manually**.
3. Faça o mesmo arraste e soltar.
4. Depois vá em **Site configuration** → **Change site name** e escreva o nome
   que quiser, por exemplo `ana-manicure`. Se o nome estiver livre, o endereço
   fica `ana-manicure.netlify.app`.
5. Se o nome não estiver livre, tente com o sobrenome, ou com o nome da cidade:
   `ana-nogueira-goiania`.

**Limites (são generosos, e o seu site é pequeno):**

| | |
|---|---|
| Custo | grátis |
| Cartão | não pede |
| Conta | dá para publicar sem conta; só a conta serve para trocar o nome |
| Tamanho | 100 MB por site |
| Banda (visitas) | 100 GB por mês |

Um portfólio de profissional de serviço recebe algumas centenas de visitas por
mês. Você vai gastar uma fração minúscula disso.

---

## Opção 2 — GitHub Pages (mais complicated, mais controle)

Vale se você já usa o GitHub, ou se o cliente quiser um endereço no domínio
dele. Não é a primeira opção para começar.

**O que você faz:**

1. Crie uma conta em **https://github.com**.
2. New repository → nome, por exemplo `portifolio-ana` → **Public** →
   **Create repository**.
3. **Add file** → **Upload files** → arraste o `index.html` e as fotos.
4. Quando terminar, vá na aba **Settings** → barra lateral **Pages**.
5. Em *Source*, escolha **Deploy from a branch**. Em *Branch*, deixe `main` /
   `root`. Clique **Save**.
6. Espere de 1 a 2 minutos. O GitHub diz que o site está sendo publicado.
7. Recarregue a página: apareceu um endereço verde, tipo
   `https://seu-usuario.github.io/portifolio-ana/`. Esse é o endereço do site.

**O que muda em relação ao Netlify:** o endereço fica com cara de programador
(`github.io`) e o site fica dentro de uma pasta (`/portifolio-ana/`). Todo
caminho interno tem que respeitar isso.

> Se algum dia o site aparecer sem as fotos sendo o Netlify, o problema quase
> sempre é este: o `index.html` está na **raiz** do repositório, e não dentro de
> uma pasta dentro dele.

---

## Opção 3 — Abrir direto do Computador

Não é publicar. É só abrir o arquivo com dois cliques.

Serve para **mostrar para o cliente na sua tela** e para **testar antes de
mandar o endereço**. Não serve para nada mais: o cliente não vai abrir o seu
computador, e mandar o arquivo por WhatsApp faz o site abrir sem as fotos, porque
a imagem vai embora quando o arquivo muda de lugar.

Use como teste. Nunca como entrega.

---

## A lista de conferência antes de mandar o endereço

Percorra tudo. Leva dois minutos e evita a vergonha.

**O conteúdo**

- [ ] O nome da pessoa está certo, com acento.
- [ ] Não sobrou nenhum "Maria Jose" de exemplo em lugar nenhum.
- [ ] O número de WhatsApp é o **dela**, com o 55 da frente e o DDD certo.
- [ ] Os preços, os telefones e os e-mails são os **dela**, não os meus.
- [ ] Não sobrou nenhum texto de exemplo, do tipo "endereço de exemplo".
- [ ] Não tem tarja de "Protótipo".
- [ ] Não tem o bloco de instruções.
- [ ] Não tem painel amarelo de "falta preencher".
- [ ] O campo "Endereço final do site" está com o endereço novo.

**A aparência**

- [ ] As fotos aparecem (não só o desenho no lugar).
- [ ] Dá para ler o texto, inclusive as letras menores.
- [ ] As cores batem com o que o cliente pediu.
- [ ] No celular, o site não fica largo nem com a barra de rolagem de lado.
- [ ] Clicou no botão do WhatsApp e abriu o conversa com o número certo.
- [ ] Ligou e desligou o tema lá em cima: os dois ficaram legíveis.

**Antes de mandar**

- [ ] Abra o endereço novo (não o arquivo do computador) e faça a conferência
      de novo. A internet pode ter dado outro resultado.
- [ ] Abra o endereço no **celular**, com 4G, sem Wi-Fi.
- [ ] Mande para o cliente como mensagem, com uma frase junto.

**O texto para o cliente, sugerido:**

> Oi! Seu site está pronto e no ar: **(cola o endereço aqui)**
>
> Dá para abrir no celular e no computador, à vontade.
> Se quiser mudar alguma cor, algum texto ou alguma foto, é só falar que eu
> ajusto.

---

## Sobre comprar um endereço próprio (`seunome.com.br`)

Não é preciso. O endereço do Netlify já é de verdade e já é seguro, o cliente
não vai estranhar.

Vale a pena **quando** o cliente já tem nome de marca Registered, quer o site
ligado a um e-mail próprio (`oi@marca.com.br`), ou quer trocar o conteúdo sem
mexer no endereço.

Se for o caso:

1. Compre o domínio em um registrador de nome (Registro.br, Cloudflare
   Registrar, Hostinger).
2. No painel do Netlify, vá em **Domain settings** → **Add a domain**.
3. Aponte o domínio para o Netlify. Ele mostra quais registros criar.
4. Esparecer. Em algumas horas, no máximo um dia, o endereço passa a responder.

Custa de 30 a 60 reais por ano,-renewal incluído.

---

## O que NÃO fazer

- **Não** emende o site dentro de uma loja de templates para ganhar comissão.
  Você perde controle, o cliente fica refém, e a comissão come o seu lucro.
- **Não** pague curso caro de "criar sites em 1 hora". Isso é o que você já tem
  aqui, de graça.
- **Não** entregue com o arquivo `index.html` e diga "abre aí". Isso é um
  arquivo, não um site.
- **Não** ponha número de telefone, endereço e nome completo de cliente sem
  autorização. Dado pessoal é responsabilidade sua.
- **Não** use foto de banco de imagens como se fosse do cliente. Use foto que o
  cliente te deu, ou peça autorização por escrito.
- **Não** esqueça de conferir se o número é mesmo o do cliente. Você vai errar
  esse número uma vez.
