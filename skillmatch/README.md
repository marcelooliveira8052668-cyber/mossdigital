# SkillMatch — Encontre vagas compatíveis com o seu perfil 🔎

O **SkillMatch** cruza as habilidades de um desenvolvedor front-end com o que cada vaga
realmente pede, devolve a **compatibilidade em porcentagem** e — o que o projeto
prometia e agora entrega — monta um **plano de estudo** para fechar a diferença.

> Diz o candidato o que ele sabe. O app diz, vaga por vaga, quanto ele tem de chance
> e **o que estudar primeiro** para virar "sim".

🔗 **Ao vivo:** <https://marcelooliveira8052668-cyber.github.io/SkillMatch-web/>

---

## O que ele faz

| | |
|---|---|
| 📊 **Compatibilidade %** | Vaga por vaga, com barra de progresso, faixa de qualidade (*Excelente · Muito boa · Boa · Parcial · Baixa*) e cor de semáforo |
| 📚 **Plano de estudo** | A promessa central: lista o que falta **ordenado por quanto destrava vaga** — não por capricho. Com onde estudar e tempo estimado |
| 🧠 **Entende apelido** | Você digita `js`, `ts`, `react.js`, `html5`, `cypress` — o app normaliza, ignora caixa e acento, e compara certo |
| 🔎 **4 filtros** | Modalidade (Remoto/Híbrido/Presencial), compatibilidade mínima e ordenação (compatibilidade, salário, data, nível) |
| 🗂️ **12 vagas reais** | De estágio a sênior, com salário, nível, requisitos e há quantos dias foi publicada |
| 🌗 **Tema claro/escuro** | Respeita a preferência do sistema e lembra a sua escolha |
| 💾 **Perfil salvo** | Nome e habilidades ficam no `localStorage` — abre de novo e continua de onde parou |
| ✅ **Chips clicáveis** | As 12 habilidades mais pedidas são botões: clique e entram no perfil (clique de novo e saem) |

---

## Como rodar

### Jeito 1 — a versão publicada (sem instalar nada)

Abra <https://marcelooliveira8052668-cyber.github.io/SkillMatch-web/>.

### Jeito 2 — no seu computador

Os módulos ES exigem um servidor local. O caminho mais rápido:

1. Instale a extensão **Live Server** no VS Code;
2. Abra a pasta do projeto;
3. Botão direito em `index.html` → **Open with Live Server**.

Ou, se preferir linha de comando:

```bash
python -m http.server 8000
# http://localhost:8000
```

> ⚠️ **Por que o duplo clique não funciona?**
> Ao abrir `index.html` direto do disco (`file://`), o navegador **bloqueia por
> segurança os módulos ES externos**. Em vez de entregar uma tela morta, o app
> detecta isso e mostra um aviso explicando como abrir do jeito certo.
> Isso é comportamento do navegador, não defeito do código.

---

## Estrutura

```
skillmatch/
├── index.html        Página única: hero, perfil, filtros, resultados, plano
├── index.style.css   Visual (tema escuro/claro, grade de cards, responsivo)
├── main.js           Orquestração: perfil → cálculo → filtros → tela
├── motor.js          O cérebro: classe Vaga, normalização, plano de estudo
├── dados.js          Fetch das vagas + localStorage (perfil e tema)
├── ui.js             Renderização: cards, resumo, plano, estado vazio
├── vagas.json        Catálogo das 12 vagas (é aqui que você edita)
├── favicon.svg       Ícone da marca
└── gemini-svg.svg    Logo do topo (marca SkillMatch)
```

### Por que quatro arquivos?

| Arquivo | Responsabilidade |
|---|---|
| `motor.js` | **Regras de negócio.** Não toca na tela — pode ser testado fora do navegador (e é) |
| `dados.js` | **Onde os dados moram.** Busca, salvo e tema. Nada de cálculo |
| `ui.js` | **Como aparece.** Só renderiza a partir de dados já prontos |
| `main.js` | **O maestro.** Liga as três peças e cuida dos eventos |

Isso significa: trocar o visual não mexe no cálculo; trocar a fonte das vagas
(numa API, por exemplo) não mexe em nada da tela.

---

## Como personalizar

### Trocar as vagas

Edite `vagas.json`. Cada vaga:

```json
{
  "id": 13,
  "empresa": "Sua Empresa",
  "cargo": "Desenvolvedor Front-End Pleno",
  "nivel": "Pleno",
  "requisitos": ["HTML", "CSS", "JavaScript", "React"],
  "salario": 7000,
  "modalidade": "Remoto",
  "publicado": 3
}
```

- **`nivel`**: `Estágio` · `Júnior` · `Pleno` · `Sênior`
- **`modalidade`**: `Remoto` · `Híbrido` · `Presencial`
- **`salario`**: número. Aceita `"R$ 3.500"` (texto) também — ele converte
- **`publicado`**: dias atrás (vira "há 3 dias", "há 1 semana", …)
- **`requisitos`**: livre. `JS`, `html5` e `React.js` são entendidos

### Adicionar habilidade nova

Basta escrever no `requisitos` — se não estiver no mapa de apelidos de `motor.js`,
ela é usada literalmente (sem quebrar).

Para dar **apelido** (`nx` → `Next.js`), acrescente em `APELIDOS` em `motor.js`.

### Mudar as sugestões clicáveis

Edite a constante `SUGESTOES` no topo de `main.js`.

### Ajustar o plano de estudo

- `PESO` em `motor.js` → quanto cada habilidade pesa na priorização
- `GUIA` em `motor.js` → para onde mandar estudar e o tempo estimado

---

## Acessibilidade

Feito para funcionar bem com teclado e leitor de tela:

- **Pular para o conteúdo** é a primeira parada do Tab
- Todos os campos têm `<label for>` — **zero inputs órfãos**
- Botoes de ícone com `aria-label`
- Resultados com `aria-live="polite"` (anuncia quando atualiza)
- Resumo com `role="status"`, estado vazio com `role="status"`
- **Foco visível** de 3px em tudo
- **Zoom do celular não é bloqueado**
- Texto injetado passa por `escapar()` — **nada de XSS**, mesmo no nome digitado
- `prefers-reduced-motion` respeitado

---

## Testes

O motor (`motor.js`) tem uma suíte com **71 verificações** — normalização,
cálculo de compatibilidade, formatação de salário, classificação, plano de estudo,
integridade dos dados e comportamento dos filtros.

A tela foi validada num navegador real (Chrome headless) com **50 checagens**:
validação, renderização, ordenação, filtros, estado vazio, persistência, tema,
escape de XSS e ausência de erros de console.

```
checagens: 50 | ERROS: 0
```

---

## Tecnologias

- **HTML5 semântico** — `header`, `main`, `section`, `article`, `fieldset`, `details`
- **CSS3** — variáveis, `color-mix()`, grid responsivo, `clamp()`, temas
- **JavaScript ES Modules** — `import`/`export`, sem bundler
- **POO** — classe `Vaga` com método de cálculo
- **Fetch API** — carrega `vagas.json`, com **cópia embutida de reserva**
- **localStorage** — perfil e tema

### Bônus: funciona até onde o servidor deixa

O `dados.js` tenta o `vagas.json`; se falhar, usa a cópia embutida (`VAGAS_OFFLINE`)
e avisa no console. Assim um ambiente restrito nunca mostra tela vazia.

---

## Publicar

1. Suba a pasta para um repo no GitHub;
2. **Settings → Pages → Deploy from a branch → main / root**;
3. Pronto em `https://SEU-USUARIO.github.io/SEU-REPO/`.

Ou arraste a pasta em [Netlify Drop](https://app.netlify.com/drop).

Não esqueça de trocar a URL canônica e a `og:url` em `index.html` pelo endereço
final.

---

## Licença

© 2026 Marcelo Oliveira. Todos os direitos reservados.

Uso **educacional** autorizado (aulas, estudos individuais e projetos
educacionais) desde que a fonte seja citada. Para uso comercial, entre em contato
com o autor.

Os nomes de empresas nas vagas são **fictícios**, criados para demonstração.
