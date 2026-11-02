# Guia estrutural e novas demos — conjunto aprovado

**Publicação autorizada pelo usuário após a revisão das prévias.** O conjunto aprovado inclui o guia estrutural, floricultura, casamento e contabilidade, com seus materiais de divulgação. A autorização para o site não inclui postagem automática no Instagram. Novas mudanças fora deste conjunto precisam de nova aprovação.

## Para revisar

1. **Guia estrutural:** `estrutura.html`. Link único e discreto em `index.html`, na seção “Como funciona”. Não foi criado outro bloco grande na página inicial nem outro item no menu principal.
2. **Floricultura:** `demos/floricultura/`. Fundo marrom-claro com detalhes dourados, catálogo e montador ilustrativo.
3. **Casamento:** `demos/casamento/`. Casal e evento fictícios, história, programação e prévia local de confirmação.
4. **Contabilidade:** `demos/contabilidade/`. Marca fictícia, serviços ilustrativos e roteiro de conversa, sem orientação fiscal.

As três demos são integradas ao catálogo. O guia não é apresentado como um novo segmento de negócio: é apenas uma explicação acessível por link.

## Materiais de Instagram

Cada item tem capa PNG de 1080 × 1350, fonte HTML e legenda:

- `divulgacao/instagram/estrutura/`
- `divulgacao/instagram/floricultura/`
- `divulgacao/instagram/casamento/`
- `divulgacao/instagram/contabilidade/`

As cópias fáceis de encontrar ficam em `04 - Divulgacao/`, fora do repositório. Não publicar as capas antes de os destinos serem aprovados e estarem no ar. Os endereços escritos nas legendas são destinos planejados.

## Preservação

- O arquivo original `lanchonete-do-china/wireframe.html` não foi alterado.
- A pasta local `02 - Demos de sites/demo demonstrativo/` não foi alterada.
- A tentativa de integração do modelo “Sua Empresa”, descartada pelo usuário, foi retirada. Não faz parte do catálogo preparado.
- Alterações anteriores de documentação e ferramentas foram preservadas e não devem entrar por engano em uma futura publicação.

## Testes

Requerem Playwright para Python e Chrome ou Edge instalado. A auditoria com axe-core é opcional (`--axe-path`). Nenhum teste envia mensagens ou faz compras.

```text
python tools/test-novas-demos.py --output PASTA_DE_RELATORIOS
python tools/test-floricultura.py --output PASTA_DE_RELATORIOS
python tools/test-home.py --output PASTA_DE_RELATORIOS
python tools/test-theme.py --output PASTA_DE_RELATORIOS
```

As auditorias automáticas complementam a revisão manual. Verificar principalmente os textos comerciais, os exemplos de formulário, as capas e a navegação no celular antes da aprovação.

## Espaço em disco

O disco ficou sem espaço durante a geração das imagens. Foi removido apenas um executável Node duplicado, instalado temporariamente pelo assistente, e a renderização continuou usando o Node já instalado. Documentos e programas do usuário não foram limpos. Recomenda-se liberar espaço com supervisão do usuário antes de gerar mais vídeos ou pacotes grandes.
