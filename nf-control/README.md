# NF Control

Sistema de gestão de **notas fiscais, empresas, produtos, estoque, financeiro e auditoria** — um arquivo HTML só, sem servidor, sem instalação.

![Módulos](https://img.shields.io/badge/m%C3%B3dulos-9-2563eb) ![Sem servidor](https://img.shields.io/badge/servidor-nenhum-16a34a) ![Offline](https://img.shields.io/badge/funciona-offline-d97706)

---

## O que ele faz

| Módulo | O que resolve |
|--------|---------------|
| **Dashboard** | Visão geral: entradas, saídas, saldo, empresas, itens em estoque e alertas de estoque baixo |
| **Notas Fiscais** | Registro de notas de entrada e saída, com itens, total, empresa e observações |
| **Empresas** | Cadastro de fornecedores, clientes e ambos (razão social, CNPJ, contato) |
| **Produtos / Estoque** | Cadastro com código, unidade, preço, estoque atual e estoque mínimo |
| **Relatórios** | Notas do período, movimentação por produto, resumo por empresa e posição de estoque — com **exportação CSV** e impressão |
| **Financeiro** | Total de entradas, saídas e saldo, com resumo por empresa |
| **Auditoria** | Histórico de tudo que foi feito no sistema, com data e descrição |
| **Backup e Restauração** | Exporta os dados em JSON e restaura de volta, com espelho automático de segurança |

### Controle de estoque

- Não deixa registrar **saída** maior que o estoque disponível
- Ao **editar** uma nota, desconta a movimentação antiga antes de aplicar a nova
- Avisa quando o produto fica **zerado ou abaixo do estoque mínimo**

---

## Como usar

Abra o `index.html` no navegador. Não precisa instalar nada, não precisa internet, não precisa servidor.

Para gerar um link para compartilhar (e testar no celular), rode um servidor local na pasta:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000` (no celular, use o IP do computador na mesma rede).

---

## Onde os dados ficam

Tudo é guardado **no próprio navegador** (`localStorage`), no computador onde o sistema está aberto.

| Chave | Conteúdo |
|-------|----------|
| `notasFiscais` | Notas fiscais |
| `produtos` | Produtos e estoque |
| `empresas` | Empresas cadastradas |
| `nfControlAuditoria` | Histórico de auditoria |
| `nfControlEspelho` | **Cópia de segurança automática** (recupera os dados se o navegador for limpo) |
| `nfControlUltimoBackup` | Data do último backup exportado |
| `nfControlSenhaTrava` | Hash (SHA-256) da senha de trava de tela |

### Faça backup com frequência

O backup automático **não substitui** o arquivo de backup. Sem ele, quem limpa os dados do navegador apaga tudo.

Na aba **Backup**, clique em *Baixar Backup* — isso gera um arquivo `.json` com todos os dados. Guarde esse arquivo no OneDrive, no Google Drive ou no e-mail.

O sistema mostra em vermelho quando o último backup foi há mais de 7 dias.

---

## Trava de tela

A aba **Backup** tem a opção de criar uma senha para travar o sistema quando ele é aberto.

> **Importante:** isso é uma trava de tela, **não é segurança**. Quem tiver acesso ao navegador e ao sistema operacional consegue acessar os dados. Para proteger de verdade, use senha no sistema operacional e faça backup regularly.

---

## Acessibilidade

- Todos os campos têm `<label>` associado, navegáveis por leitor de tela
- Modais com `role="dialog"`, foco preso dentro da janela e **ESC** para fechar
- O foco volta para onde estava quando o modal fecha
- Mensagens de sistema com `aria-live`, para quem usa leitor de tela
- Layout responsivo (celular, tablet e desktop) e folha de estilo específica para impressão

---

## Limites conhecidos

Isso é um **controle interno**, não um sistema fiscal oficial:

- **Não emite NF-e** e não se comunica com a SEFAZ. Serve para organizar e conferir o que já foi emitido.
- **Não é multiusuário.** Os dados ficam no navegador de uma pessoa. Para trabalhar em equipe, o fluxo é exportar e importar o backup.
- **Não valida CNPJ** de verdade nem calcula impostos (ICMS, PIS, COFINS) — os valores são os que você informa.
- **Não tem controle de acesso por usuário** — qualquer pessoa com acesso ao navegador vê tudo.

Se a empresa precisar de multiusuário, integração com a SEFAZ e permissões, o caminho é um backend com banco de dados. A estrutura dos dados e das telas já está pronta para isso.

---

## Detalhes técnicos

- HTML, CSS e JavaScript puro em **um arquivo só**
- Sem framework, sem biblioteca, sem build
- Web Crypto API (SHA-256) para a trava de tela
- Exportação CSV com separador `;` e BOM, para abrir direto no Excel em português
- `@media print` para imprimir só o relatório
