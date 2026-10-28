# Fotos entre Amigos — álbum digital

**Produto MOSS Digital** — página estática completa, sem build, sem dependências, sem servidor: é só abrir o `index.html` no navegador.

> 📦 Esta é a versão **sem fotos**: as pastas `fotos/` e `videos/` vêm vazias, prontas para você colocar as suas próprias mídias.

---

## Como abrir

**Mais simples:** clique duplo em `index.html`.

**Servidor local** (recomendado, evita bloqueios de `file://` em alguns navegadores):

```bash
python -m http.server 8000
# depois abra http://localhost:8000
```

## Capacidade

| Tipo | Espaços |
|---|---|
| Fotos | **500** |
| Vídeos | **50** |

Os contadores do site (topo, rodapé e espaços livres) se atualizam sozinhos.

## Estrutura

```
fotos-amigos/
├── index.html    estrutura da página
├── style.css     visual (moderno & minimalista)
├── script.js     lightbox, filtros, busca, espaços reservados
├── data.js       catálogo das mídias (começa vazio)
├── fotos/        coloque aqui as suas fotos
└── videos/       coloque aqui os seus vídeos
```

## Funcionalidades

- **Grid masonry** — fotos paisagem e retrato lado a lado, **sem corte** de nenhuma imagem.
- **Lightbox** com setas, teclado (`←` `→` `Esc` `Home` `End`), swipe no celular, miniaturas e **apresentação automática de 4s por foto** (ideal para telão em evento).
- **Busca** por nome de arquivo e **filtros por coleção** (Fotos · Momentos · Memórias).
- **500 espaços reservados** para as próximas fotos e **50 espaços de vídeo**.
- Barra de progresso, botão de voltar ao topo e animação de entrada.
- Responsivo e acessível (`aria-*`, foco visível, `prefers-reduced-motion`).

## Como adicionar fotos

### 1. Rápido (só neste navegador)

Clique em um **espaço vazio**, no botão **+ Adicionar fotos**, ou **arraste as imagens para cima da página**.

> ⚠️ Essas fotos aparecem na hora, mas **não são salvas** — valem enquanto a aba estiver aberta.

### 2. Definitivo (fica no álbum)

1. Copie os arquivos para dentro da pasta `fotos/`.
2. Abra o `data.js` e coloque o nome de cada arquivo entre aspas na lista `PHOTOS`:

```js
const PHOTOS = [
  "foto-02.jpeg",
  "foto-03.jpeg"
];
```

3. Faça o mesmo com os vídeos: arquivos em `videos/` e nomes na lista `VIDEOS`.

> 💡 Os nomes de coleção vêm do início do arquivo: `foto-*` → Fotos, `IMG_*` → Momentos, resto → Memórias (função `getCollection` no `data.js`).

## Publicar no GitHub Pages

1. Crie um repositório no GitHub e envie esta pasta para ele.
2. No GitHub: **Settings → Pages**
3. Em *Source*, escolha **Deploy from a branch**
4. Selecione a branch `main` e a pasta `/ (root)` → **Save**

Pronto: o álbum fica em `https://<usuario>.github.io/<repositorio>/`.

> ⚠️ O GitHub Pages é indicado para até **~1 GB** por repositório. Vídeos pesados consomem rápido — compactule os arquivos se precisar de muitos.

## Tecnologias

HTML, CSS e JavaScript puros. As fontes vêm do Google Fonts (Inter e Instrument Serif).

---

**Suporte:** MOSS Digital · [WhatsApp (11) 94203-8103](https://wa.me/5511942038103)
