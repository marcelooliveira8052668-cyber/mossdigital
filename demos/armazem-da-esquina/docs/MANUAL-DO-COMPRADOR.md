# ARMAZÉM DA ESQUINA — Manual do comprador

Demonstração de mercadinho online criada pela MOSS Digital.
HTML5, CSS3 e JavaScript puro: **sem frameworks, sem build e sem servidor próprio**.

> Esta demo é fictícia. Produtos, preços, estoque, top 10, ofertas, depoimentos e
> pedidos são exemplos de demonstração. As fotos são referências de bancos de
> imagens, não fotografias de um comércio real.

---

## 1. O que está incluído

| Arquivo | Função |
| --- | --- |
| `index.html` | Home: hero, busca, **Top 10 mais pedidos**, prateleiras, ofertas, destaques, como funciona, depoimentos e chamada comercial |
| `produtos.html` | Catálogo com filtros combináveis (busca sem acento, categoria, preço máximo, top 10, ofertas, disponível) e ordenação |
| `produto.html` | Ficha do produto (`?id=...`): foto, preço, quantidade, adiciona ao carrinho e itens da mesma prateleira |
| `carrinho.html` | Carrinho com quantidades, escolha entre **entrega** e **retirada**, resumo e mensagem pronta |
| `painel.html` | Painel do comerciante (área `noindex`): preço, estoque, top 10, ofertas, pedidos de exemplo e dados da loja |
| `anuncie.html` | Formulário comercial com prévia local do anúncio (não envia nada) |
| `js/data.js` | **Catálogo e configurações** — é aqui que você troca tudo |
| `js/app.js` | Vitrine, carrinho e mensagens |
| `js/panel.js` | Painel local do comerciante |
| `css/style.css` | Identidade visual completa (cores em `:root`) |
| `assets/img/` | Fotos otimizadas em WebP (`<produto>.webp` e `card-<produto>.webp`) |
| `FONTES-FOTOS.json` | Autor, título, origem e licença de cada foto |
| `tools/test_demo.py` | Suíte de testes (Playwright) |
| `tools/make_promo.py` | Gera capa do Instagram e card do portfólio |
| `docs/` | Este manual e material de apoio |

---

## 2. Como instalar

1. Copie a pasta `armazem-da-esquina` para onde o site será servido.
2. Abra `index.html` direto no navegador (funciona assim, em `file://`).
3. Para testar como no endereço público, suba um servidor estático na pasta:
   `python -m http.server 8931` e acesse `http://127.0.0.1:8931/`.
4. Não há dependências para instalar, `npm`, `yarn` nem etapa de compilação.

Requisitos do navegador: qualquer navegador atual (Chrome, Edge, Firefox, Safari).
Com JavaScript desativado, o site avisa que catálogo e carrinho precisam dele.

---

## 3. Como trocar textos, preços e contatos

Tudo fica em `js/data.js`:

```js
const config = {
  nome: 'ARMAZÉM DA ESQUINA',   // nome da loja
  slogan: 'O bairro entrega. Você escolhe.',
  whatsapp: '',                 // número do comerciante (só dígitos, com DDI)
  email: '',                    // e-mail verdadeiro da loja
  endereco: '...',              // texto de endereço/horário
  entrega: { taxa: '...', prazo: '...', retirada: '...', raio: '...' }
};
```

- **WhatsApp:** preencha com o número real, por exemplo `'5511999990000'`.
  Enquanto estiver vazio, o site **não** mostra botão de envio — ele apenas
  copia a mensagem. Nada é enviado automaticamente em nenhuma situação.
- **Produtos:** cada item do array `produtos` aceita `nome`, `categoria`,
  `preco`, `precoOriginal` (para mostrar preço riscado), `unidadeTexto`,
  `estoque`, `top` (posição no ranking, `0` = fora), `oferta`, `destaque`,
  `descricao` e `emoji`.
- **Categorias:** edite o array `categorias` para renomear, trocar o ícone ou
  mudar a descrição das prateleiras.
- **Cores:** `css/style.css`, bloco `:root` (`--verde`, `--vermelho`,
  `--amarelo`, `--creme`, `--carvao`).

---

## 4. Como trocar as fotos

1. Monte uma foto no mesmo formato das atuais (quadrada) com a menor dimensão
   de **800 px** ou mais, no formato WebP ou JPG.
2. Salve como `assets/img/<id>.webp` **e** `assets/img/card-<id>.webp`
   (o card pode ser um recorte 420 × 320 da mesma imagem). O `<id>` é o campo
   `id` do produto em `js/data.js` (ex.: `banana-prata`).
3. Atualize `alt` (texto alternativo) — ele é gerado a partir do nome, mas
   confira se a foto realmente representa o item.
4. Registre a nova fonte em `FONTES-FOTOS.json` (autor, título, URL e licença).
   Se a foto for do próprio comércio, escreva `"autor": "Comércio"` e
   `"uso": "Foto do próprio comércio, com autorização"`.

Regras da MOSS Digital: nunca apresentar foto de banco como se fosse o produto
vendido pelo comércio. O rodapé e as áreas de produto já avisam que as imagens
são referências — mantenha esse aviso enquanto houver foto de banco.

---

## 5. Como testar antes de publicar

```bash
python demos/armazem-da-esquina/tools/test_demo.py
```

A suíte abre o site em navegador real e verifica:

- Top 10 com as 10 posições, 6 prateleiras, ofertas e destaques;
- busca sem acento, filtros combinados, ordenação por preço e estado vazio;
- ficha do produto, carrinho persistente, entrega/retirada e pedido **sem envio**;
- painel alterando preço na vitrine local e restaurando o original;
- formulário comercial sem guardar dados de contato;
- 6 rotas em 4 larguras (320 a 1440 px), 24 imagens carregando e menu móvel;
- carrinho funcionando mesmo com armazenamento local bloqueado;
- zero erro de JavaScript, zero 404, zero chamadas externas e zero envios.

Resultado esperado: `"status": "APROVADO"`.

---

## 6. Como publicar

1. Peça **aprovação explícita** desta demo antes de qualquer publicação.
2. Publique a pasta como site estático (mesmo processo das outras demos MOSS):
   suba para o repositório, inclua o card na página inicial e no catálogo,
   atualize o `sitemap.xml` e publique via PR.
3. Depois da publicação, confira o endereço final e só então informe-o na
   legenda da capa do Instagram (`divulgacao/instagram/armazem-da-esquina/`).
4. Gerar a capa e o card: `python demos/armazem-da-esquina/tools/make_promo.py`.

---

## 7. Dependências e limites

**Dependências:** nenhuma além de um servidor HTTP estático (opcional).
Os textos usam fontes do sistema (`Trebuchet MS`/`Segoe UI`), sem download.

**O que a demo faz de verdade:**
- catálogo, filtros, busca, ranking e carrinho funcionam;
- o painel altera preço/estoque/ofertas e a vitrine reflete na hora;
- a mensagem do pedido é montada e pode ser copiada ou aberta no WhatsApp
  **somente quando o visitante clica**.

**O que a demo NÃO faz (por decisão e por segurança):**
- não cobra, não reserva item, não cria conta e não envia pedido sozinho;
- não há login real, banco de dados, e-mail ou servidor: o painel salva apenas
  no `localStorage` deste navegador — por isso a área traz aviso de que **não é
  administração segura**;
- não há analytics, cookies de terceiros nem chamadas a serviços externos;
- o formulário "Anuncie" gera prévia local e não transmite dados.

---

## 8. Integração com banco de dados (quando quiser ir além)

Para uma operação real é preciso um backend. Caminho recomendado (Supabase):

1. **Pré-requisitos:** conta Supabase, projeto criado, `URL` e `anon key`
   públicas (a `service_role key` **nunca** vai para o front-end).
2. **Estrutura sugerida:** tabelas `produtos`, `categorias`, `pedidos`,
   `pedido_itens` e `loja`, com `pedidos` ligados ao cliente.
3. **Autenticação:** auth do Supabase para o comerciante (e-mail + senha ou
   OTP). Sem autenticação não existe painel real.
4. **RLS (Row Level Security):** liberar leitura pública de `produtos` e
   `categorias`; escrita de produtos somente para o papel do comerciante;
   inserção de `pedidos` autenticado ou anônimo controlado; leitura de pedidos
   apenas pelo dono da loja.
5. **Modo local:** esta demo já é o modo local, devidamente identificado. A
   troca por Supabase exige alterar `js/app.js`/`js/panel.js` para ler e gravar
   nas tabelas — não basta "colar uma chave".
6. **Honestidade:** a conexão só funciona depois que você criar o projeto,
   rodar o SQL e testar. Nada disso está configurado ou testado nesta demo.

Detalhamento completo com SQL de exemplo: `demos/viva-prime/docs/INTEGRACAO-REAL.md`.

---

## 9. Capa do Instagram

- Fonte editável e PNG 1080 × 1350: `divulgacao/instagram/armazem-da-esquina/`
- Cópia fácil: `04 - Divulgacao/Armazem da Esquina/`
- Pasta única do disco E: rode `python tools/sync_capas_instagram.py`

Criar a capa **não** autoriza postar no site nem nas redes sociais.

---

## 10. Contato

MOSS Digital — mossdigital.com.br
Dúvidas sobre personalização, integração ou manutenção desta demonstração.
