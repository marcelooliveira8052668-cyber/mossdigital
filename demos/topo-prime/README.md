# TOPO PRIME — Demonstração 01 (Topógrafo)

Demonstração profissional de serviços de topografia, georreferenciamento e levantamentos.
Pertence ao catálogo da **MOSS Digital**.

**Status:** ✅ Concluída em 17/11/2026.

---

## Como abrir

Abra `index.html` no navegador. Não precisa instalar nada, configurar credenciais
nem iniciar servidor. Tudo (HTML, CSS e JavaScript) está em um único arquivo,
pensado inclusive para uso no aplicativo **Koder do iPhone**.

---

## Estrutura de arquivos

```
topo-prime/
├── index.html                  # Demo completa (HTML + CSS + JS + SVGs inline)
├── README.md                   # Este arquivo — instruções de edição
├── CREDITOS.md                 # Créditos das ilustrações
├── REGISTRO-ALTERACOES.md      # Histórico de mudanças
├── RELATORIO-TESTES.md         # Resultado dos testes executados
└── tests/
    ├── extrair-e-verificar.js  # Verificação de sintaxe do JavaScript
    ├── cdp-smoke.js            # Testes automatizados no Chromium headless
    ├── capturar.js             # Captura de screenshots
    ├── topo-prime-mobile.png   # Screenshot 390px (gerado)
    └── topo-prime-desktop.png  # Screenshot 1366px (gerado)
```

---

## Onde editar (guia rápido)

Todas as áreas editáveis estão no `<script>` no final de `index.html`:

| O que mudar | Onde editar | Linha aproximada* |
|-------------|-------------|-------------------|
| Serviços exibidos | Array `SERVICOS` | ~440 |
| Descrição/ícone de um serviço | Objeto dentro de `SERVICOS` + dicionário `ICONES` | ~440 / ~500 |
| Preços da calculadora | Objeto `CONFIG_ORCAMENTO` | ~460 |
| Projetos do portfólio | Array `PROJETOS` | ~480 |
| Equipamentos da galeria | Array `EQUIPAMENTOS` | ~490 |
| WhatsApp da MOSS | Constante `WHATSAPP_MOSS` | ~435 |
| Nome da demo na mensagem | Constante `NOME_DEMO` | ~436 |
| Paleta de cores e fontes | Variáveis em `:root` no CSS | ~30 |

\* Números aproximados — confirme com a busca do editor (Ctrl+F).

### Exemplo: alterar o preço base por m²

**Antes:**
```js
const CONFIG_ORCAMENTO = {
  basePorM2: 1.80,
  taxaMinima: 900,
  ...
```

**Depois:**
```js
const CONFIG_ORCAMENTO = {
  basePorM2: 2.50,   // novo valor ilustrativo
  taxaMinima: 1200,  // nova mobilização mínima
  ...
```

**Explicação:** o valor base é multiplicado pela área informada e pelos
multiplicadores de tipo de serviço e características do terreno. O resultado
nunca fica abaixo da taxa mínima. A alteração reflete imediatamente na
calculadora ao recarregar a página.

### Exemplo: trocar o contato comercial da MOSS

**Antes:**
```js
const WHATSAPP_MOSS = '5511942038103';
```

**Depois:**
```js
const WHATSAPP_MOSS = '5511999999999'; // novo número (somente dígitos, com DDI)
```

**Explicação:** o número é usado para montar o link `https://wa.me/<numero>?text=...`.
A mensagem já identifica a demo (`TOPO PRIME (Demo 01 — Topógrafo)`), atendendo
à regra de identificação comercial da MOSS.

---

## Funcionalidades que realmente funcionam

| Recurso | Comportamento verificável |
|---------|---------------------------|
| Menu mobile | Botão hambúrguer abre/fecha a navegação; fecha ao clicar em um link |
| Calculadora de orçamento | Lê área, tipo e características; valida 100–20.000 m²; calcula valor, faixa e detalhamentos |
| Filtros do portfólio | Botões Urbano/Rural/Infraestrutura mostram/ocultam projetos e atualizam `aria-pressed` |
| Simulação de planta | Liga/desliga camadas, aplica zoom via `viewBox` e mostra coordenadas ao clicar/teclar nos pontos |
| Galeria de equipamentos | Clique/ampliação em modal; fecha por botão, clique fora ou `Esc` |
| Formulário de visita | Valida nome, telefone, e-mail e cidade; exibe confirmação e resumo copiável |
| Botão "Quero um site como este" | Abre WhatsApp da MOSS com mensagem preenchida identificando a demo |

---

## Funcionalidades simuladas (importante)

Esta é uma **demonstração comercial**, não um sistema operacional:

- **Valores da calculadora** são estimativas ilustrativas e configuráveis, não
  medições, propostas técnicas ou orçamentos definitivos.
- **Projetos, coordenadas, cotas, indicadores e prazos** são fictícios.
- **O formulário de visita não envia dados a servidor nem ao WhatsApp.** Ele
  valida, confirma localmente e gera um resumo que o visitante pode copiar.
  Nenhuma informação pessoal é gravada no `LocalStorage`.
- **Ilustrações** são SVG originais desenhados para esta demo — não são fotos
  de equipamentos reais nem representações de marcas comerciais.

### O que falta para uma versão comercial

1. Backend (API + banco de dados) para receber solicitações de orçamento.
2. Área administrativa com autenticação para gerenciar visitas e propostas.
3. Integração com geoserviços oficiais (ex.: SIGEF/INCRA) mediante credenciais
   e conformidade legal — **não incluir credenciais no JavaScript público**.
4. Geração de relatórios PDF assinados por profissional responsável.
5. Política de privacidade e termos de uso (LGPD).

---

## Acessibilidade

- Estrutura semântica (`header`, `main`, `section`, `footer`, `nav`).
- Link "Pular para o conteúdo", foco visível e navegação por teclado.
- `aria-pressed`, `aria-expanded`, `aria-live` e `aria-label` nos controles.
- Pontos da planta acessíveis por `Tab` + `Enter`/`Espaço`.
- Respeito a `prefers-reduced-motion`.
- Contraste verificado visualmente (azul-petróleo sobre areia/branco).

---

## Identidade comercial

- Rodapé traz: **"Demonstração desenvolvida pela MOSS Digital."**
- Botão **"Quero um site como este"** aponta para
  `https://wa.me/5511942038103` com mensagem que identifica esta demo.
- O contato da MOSS **não** é apresentado como suporte da empresa fictícia.
