# Lina — Tutor de Inglês com IA

Demonstração MOSS Digital de um app de tutoria de inglês. HTML, CSS e JavaScript
puros, sem framework e sem dependências de instalação.

## O que já funciona sem nenhuma configuração

O app abre e responde em **modo offline**, sem chave de API e sem internet:

- correção de frases em inglês (o que acertou, o que errou e como o nativo diria);
- cenários de conversa (trabalho, aeroporto, entrevista, restaurante, viagem);
- temas de aula rápida, simulação de fala e mergulho só em inglês;
- vocabulário novo guardado, XP, dias seguidos e nível de A1 a C2;
- pronúncia pelo microfone e leitura em voz alta (recursos do navegador);
- histórico, progresso e preferências guardados no próprio navegador.

Nenhum dado sai do aparelho do visitante: histórico, XP e vocabulário ficam no
`localStorage` do navegador e podem ser apagados a qualquer momento.

## Para o cliente: a conexão é a única etapa

Para a Lina passar a responder com IA de verdade, o responsável faz **uma única
conexão**. O app não precisa ser reescrito, nem receber tela nova, nem mudar
layout. A chave da IA fica **no servidor**, nunca no navegador e nunca no repositório.

### Opção A — servidor local (para testar no computador)

1. Copie a pasta inteira e rode `node server.js` (sem dependências para instalar).
2. Defina a chave no ambiente, sem gravá-la em arquivo versionado:

   ```bash
   # Windows (PowerShell)
   $env:LINA_GEMINI_KEY = "AIza..."
   # Mac / Linux
   export LINA_GEMINI_KEY="AIza..."
   ```

   Alternativa: um arquivo `local-secret.js` na mesma pasta, que já está no
   `.gitignore`. Nunca versione esse arquivo.

3. Abra `http://localhost:3000`. O servidor entrega a página e repassa as
   chamadas à IA com a chave guardada.

### Opção B — publicação na internet (Firebase Hosting + Cloud Function)

1. Configure a chave como segredo, fora do código:

   ```bash
   npx firebase functions:secrets:set LINA_GEMINI_KEY --project SEU-PROJETO
   ```

2. Publique:

   ```bash
   npx firebase deploy --project SEU-PROJETO
   ```

3. Em `js/chave.js`, aponte a constante para o endereço publicado:

   ```js
   window.LINA_API = "https://SEU-PROJETO.web.app";
   ```

4. Recarregue a página. O botão de configurações passa a mostrar
   “modo servidor ativo” e os campos de chave somem sozinhos.

### Opção C — chave no navegador (só para teste rápido)

Na aba de configurações do app dá para colar uma chave da Gemini
(`aistudio.google.com/apikey`) ou do OpenRouter (`openrouter.ai/keys`). Ela fica
no `localStorage` daquele navegador. **Não é a forma recomendada**: qualquer
pessoa com acesso ao aparelho pode lê-la. Prefira as opções A e B.

## O que a demo pública NÃO faz

- Não pede chave de API ao visitante: o campo de chave fica escondido e a aba de
  configurações mostra apenas o passo a passo da conexão.
- Não há chave, servidor ou conta de IA configurados nesta demonstração.
- Não há cadastro, login, backend, banco de dados nem cobrança.
- A correção e o Histórico ficam no navegador: em outro aparelho, recomeça.

## Estrutura

```
lina-tutor-ingles/
├── index.html          página única do app
├── server.js           servidor local sem dependências: serve o app e protege a chave
├── css/estilo.css      visual claro/escuro e responsivo
└── js/
    ├── chave.js        configuração da API (endereço do servidor e chave local opcional)
    ├── conversas.js    persona da Lina, níveis, cenários, temas e o modo offline
    ├── ia.js           integração com a API, com retorno ao modo offline
    └── app.js          chat, voz, microfone, XP e progresso
```

Ordem de carregamento importa: `conversas.js` → `chave.js` → `ia.js` → `app.js`.

## Regras de publicação

- Não comite `local-secret.js`, `.env` ou qualquer chave de API.
- Se o site for publicado como produto do cliente, remova o `noindex` de `index.html`
  apenas quando a versão com IA estiver pronta e testada. Mantenha o aviso de
  demonstração no topo até essa publicação real acontecer.
- Antes de entregar, teste no celular: chat, microfone, voz alta, painel,
  cenários, busca por capítulo, tema claro/escuro e o pedido de conexão.

## Acessibilidade

Foco visível em todos os botões e campos, `Esc` fecha as janelas, o foco fica
preso dentro da janela aberta e volta ao fechar, a conversa é anunciada pelo
leitor de tela (`role="log"`) e o zoom do celular não é bloqueado.

## Licença

Projeto educacional livre, com textos autorais criados para fins de ensino.
HTML, CSS e JavaScript são marcas registradas de seus respectivos proprietários.
