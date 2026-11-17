# PERÍCIA JUDICIAL PRIME — Demonstração 02

Painel demonstrativo de gestão de perícias: processos, prazos, documentos,
linha do tempo e indicadores. **Todos os dados são fictícios.**

**Status:** ✅ Concluída em 17/11/2026.

## Como abrir
Abra `index.html` no navegador. Arquivo único, sem instalação, servidor ou
credenciais. Compatível com o aplicativo Koder do iPhone.

## Estrutura
```
pericia-prime/
├── index.html                  # Demo completa (HTML + CSS + JS + SVGs)
├── README.md                   # Instruções de edição
├── CREDITOS.md                 # Ilustrações
├── REGISTRO-ALTERACOES.md      # Histórico
├── RELATORIO-TESTES.md         # Testes executados
└── tests/ (smoke, captura, screenshots)
```

## Onde editar

| O que mudar | Onde | Linha aprox. |
|-------------|------|--------------|
| Processos iniciais | Array `PROCESSOS_FICTICIOS` (JS) | ~430 |
| Perito/apresentação | Seção `#sobre` (HTML) | ~330 |
| WhatsApp da MOSS | Constante `WHATSAPP_MOSS` | ~420 |
| Cores e fontes | `:root` (CSS) | ~25 |

### Exemplo: alterar o número de um processo fictício
```js
// Antes
numero: '0000123-45.2026.8.26.0001',
// Depois
numero: '0999999-99.2026.8.26.0001',
```
**Explicação:** o número é apenas um rótulo ilustrativo. Use sempre valores
obviamente fictícios — nunca insira números de processos reais.

## Funcionalidades que realmente funcionam
- Busca por número, tipo, parte ou descrição fictícia.
- Filtros por prioridade (Alta/Média/Baixa) e situação.
- Cadastro de novas perícias fictícias com validação e persistência no
  `LocalStorage` (apenas neste navegador).
- Checklist de documentos interativo por processo.
- Linha do tempo de atividades.
- Indicadores recalculados a cada alteração.
- Calendário de prazos com navegação entre meses; clique no dia filtra a lista.
- Geração de resumo para impressão (CSS `@media print`).
- Botão "Quero um site como este" → WhatsApp da MOSS com mensagem identificando a demo.

## Funcionalidades simuladas / segurança
- Processos, pessoas, prazos e documentos são **inventados**.
- O painel **não** se conecta a sistemas judiciais, não gera laudos nem
  documentos com validade jurídica.
- O `LocalStorage` guarda **somente dados fictícios**; use "Restaurar dados
  iniciais" para limpar.
- Não insira informações judiciais reais ou confidenciais nesta aplicação pública.

### Para uma versão comercial
1. Backend com autenticação, permissões e trilha de auditoria.
2. Banco de dados criptografado e conformidade com LGPD.
3. Integração segura com sistemas oficiais (credenciais **nunca** no JS público).
4. Geração de PDFs assinados digitalmente por profissional responsável.

## Acessibilidade
Estrutura semântica, skip link, foco visível, `aria-pressed`/`aria-expanded`/
`aria-live`, navegação por teclado na lista e no calendário,
`prefers-reduced-motion`.
