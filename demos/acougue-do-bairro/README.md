# Açougue do Bairro — manual da demo

Modelo de site para açougue criado pela **MOSS Digital**. Identidade própria (papel de açougue, vermelho e tipografia condensada), 25 cortes com fotos, **ficha individual do corte** ao clicar no card, calculadora de peso e encomenda demonstrativa.

> **Importante:** é uma **demonstração fictícia**. Nome, preços, endereço, telefones e histórias são inventados. Nenhum pedido, pagamento ou entrega acontece de verdade. As fotos são reais (Wikimedia Commons) e usadas **apenas como ilustração** do segmento — não representam o açougue, sua equipe ou seus produtos reais.

---

## 1. O que vem na pasta

```
acougue-do-bairro/
├── index.html                     página única (todo o site)
├── assets/
│   ├── css/style.css              identidade visual e responsividade
│   ├── js/produtos.js             catálogo: 25 produtos (edite aqui)
│   ├── js/app.js                  filtros, carrinho, cálculo e formulário
│   └── img/                       25 fotos WebP + FONTES.md (créditos/licenças)
├── entrega/
│   ├── card-acougue-do-bairro.webp   imagem do card do catálogo (1200×750)
│   └── captura-instagram.webp        captura usada na capa do Instagram
└── README.md                      este manual
```

A capa do Instagram e a legenda ficam em `divulgacao/instagram/acougue-do-bairro/` (na raiz do repositório), com uma cópia em `../04 - Divulgacao/`.

## 2. Como testar

**Sem instalar nada:** abra `index.html` no navegador. Tudo funciona em modo local.

**Recomendado (servidor local estático):** na pasta da demo, rode `python -m http.server 8000` e acesse `http://localhost:8000`. Isso evita diferenças de comportamento entre `file://` e hospedagem real.

Checklist rápido:
- [ ] Filtros por categoria e busca retornam os cortes certos
- [ ] Clicar em qualquer card abre a ficha do corte (foto grande, uso, dica, rendimento)
- [ ] Na ficha, a calculadora recalcula e “Adicionar à encomenda” abre o balcão
- [ ] `Esc` e o clique fora fecham a ficha; o foco volta ao card
- [ ] Botão “Adicionar 0,5 kg” atualiza o balcão e o contador sem abrir a ficha
- [ ] `+` e `−` no balcão ajustam a quantidade em 0,5 kg; `remover` funciona
- [ ] Calculadora recalcula o valor ao mudar corte e quilos
- [ ] Formulário exige nome, telefone, data e horário e gera um código `AC-2026-XXXX`
- [ ] Menu hambúrguer abre/fecha no celular
- [ ] Galeria desliza e as setas funcionam
- [ ] Sem rolagem horizontal em 320 px, 390 px, tablet e desktop
- [ ] Navegação por teclado: `Tab` percorre links/botões, `Esc` fecha o balcão

## 3. Como publicar

1. Envie esta **pasta inteira** para `demos/acougue-do-bairro/` no site da MOSS Digital (via FTP ou deploy do repositório).
2. O endereço previsto é `https://mossdigital.com.br/demos/acougue-do-bairro/`.
3. Depois da publicação, rode `python tools/add_card_acougue.py` na raiz do repositório para inserir o cartão no catálogo e atualizar a contagem de modelos. **O script foi preparado, mas não foi executado** — o cartão e a entrada no catálogo não foram publicados.
4. Confira se o link do card abre a demo antes de divulgar.

**Dependências:** nenhuma biblioteca ou build. Usa apenas HTML, CSS e JavaScript puro. As fontes vêm do Google Fonts; se preferir sem internet, troque `Anton` e `Inter` no CSS por fontes do sistema.

## 4. Como personalizar

### Textos e contatos
Edite `index.html`: título, textos das seções, horários e endereço fictício. Não existe número de WhatsApp real na página — o contato foi direcionado ao formulário de encomenda de propósito. Se for virar site real, troque por um contato verdadeiro e atualize a frase de aviso no topo.

### Produtos e preços
Edite `assets/js/produtos.js`. Cada item tem:
```js
{ id:'picanha', nome:'Picanha', categoria:'Bovinos', preco:89.90,
  img:'picanha-grelha.webp', desc:'...', selo:'Mais pedido' }
```
- `categoria` use exatamente: `Bovinos`, `Suínos`, `Aves`, `Linguiças`, `Peixes`
- `preco` é o valor **por quilo**, sem R$
- `selo` é opcional (aparece na foto)
- Para mudar a ordem das categorias, edite o array `categorias` no início de `app.js`

### Fotos
Substitua os arquivos em `assets/img/` mantendo o mesmo nome, ou troque o campo `img` em `produtos.js`. A recomendação é manter fotos reais e com licença livre. **Ao trocar uma foto, atualize também `assets/img/FONTES.md`** com a nova fonte, autoria e licença. Não use fotos de pessoas, loja ou equipe alheia como se fossem suas.

### Cores e marca
No topo de `assets/css/style.css`, edite as variáveis: `--vermelho`, `--vermelho-esc`, `--creme`, `--tinta`, `--kraft`. O ícone da marca é um SVG inline no cabeçalho do `index.html`.

## 5. Modo local x banco conectado

**Modo local (como a demo está hoje):** a encomenda fica apenas no `localStorage` do navegador. Serve para demonstrar o fluxo. Não é banco de dados, não sincroniza entre dispositivos e some se o visitante limpar os dados do navegador. O texto da página e o manual dizem isso explicitamente — não apresente como “pedido enviado”.

**Se quiser um banco real (opcional, para estudo):** a integração com **Supabase** é possível, mas **não foi configurada nem testada nesta entrega**. Não existe chave, projeto ou tabela criada aqui. O passo a passo resumido seria:

1. Criar projeto no Supabase e uma tabela `encomendas` (id, nome, telefone, tipo, data, itens em JSON, total, criado_em).
2. Ativar **RLS** (Row Level Security) e criar políticas: escr apenas para usuário autenticado; leitura restrita ao próprio registro (ou só administradores).
3. Criar a autenticação (e-mail/senha ou login magic link) para o painel interno. Nunca expor a `service_role` no frontend — apenas a chave `anon`, protegida por RLS.
4. No frontend, substituir o bloco `localStorage.setItem(...)` em `app.js` por uma chamada `supabase.from('encomendas').insert(...)` usando a biblioteca do Supabase.
5. Testar em ambiente de desenvolvimento antes de falar em produção.

Enquanto isso não for feito e testado, mantenha o aviso de modo local visível.

## 6. Limites e honestidade

- Carrinho e encomenda são **demonstrativos**; não há gateway de pagamento, estoque, e-mail ou SMS.
- A calculadora faz só `preço por kg × quantidade` — não inclui taxas de entrega.
- Fotos são ilustrativas e os créditos estão em `assets/img/FONTES.md`.
- Não há depoimentos, resultados ou números reais de clientes.
- Endereço, telefones e “desde 1998” são fictícios.

## 7. Status desta entrega

- Demo criada e testada: **sim** (25 produtos, fotos carregando, carrinho, cálculo, formulário, responsivo, sem erros no console).
- Cartão no catálogo e publicação: **não** — aguardando aprovação explícita.
- Capa do Instagram: pronta como parte da entrega, mas **sem autorização para postar**.
