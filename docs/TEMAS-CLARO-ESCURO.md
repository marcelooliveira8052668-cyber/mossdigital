# Modo claro e escuro

O botão no menu superior alterna o tema nas páginas `index.html`, `modelos.html` e `sistemas.html`. As demonstrações mantêm sua própria identidade e seus controles existentes.

## Comportamento

- Na primeira visita, usa a preferência de cor do sistema.
- A escolha manual fica na chave `moss-digital-theme` do `localStorage` e vale para as três páginas e outras abas da mesma origem.
- Se o navegador bloquear o armazenamento, a alternância continua funcionando na página atual, mas a escolha pode não persistir após a navegação.
- O script aplica o tema no `head`, antes da montagem da página, para evitar uma troca visível de cores ao carregar.
- Sem JavaScript, permanece a apresentação escura original e não aparece um botão inoperante.
- Os rótulos informam a próxima ação: “Ativar modo claro” ou “Ativar modo escuro”. O botão funciona com mouse, toque e teclado.
- As imagens e o vídeo não recebem filtros de inversão.

## Arquivos

- `assets/js/moss-theme.js`: preferência e botão.
- `assets/css/moss-theme.css`: controle e paleta clara.
- As três páginas carregam esses dois arquivos; a página inicial mantém também `moss-home.css`.

## Testes

Com Playwright para Python e Chrome ou Edge instalado:

```text
python tools/test-theme.py --output CAMINHO_DOS_RELATORIOS
```

Opcional: `--browser-path CAMINHO_DO_NAVEGADOR` e `--axe-path CAMINHO_DO_AXE.MIN.JS`.

O teste verifica os dois temas em quatro larguras nas três páginas, teclado, persistência após recarga e navegação, sincronização entre abas, preferência do sistema e armazenamento bloqueado. A auditoria automática de acessibilidade é complementar à revisão manual.
