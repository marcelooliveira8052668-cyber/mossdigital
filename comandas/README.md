# 🧾 Comanda Fácil

Sistema completo de comandas, cozinha e caixa para restaurantes, pizzarias,
lanchonetes e balcões de atendimento. Roda **inteiro no navegador**, sem
servidor, sem mensalidade e sem instalação.

**Ponto de venda:** o sistema trabalha com os dados gravados no próprio
computador (armazenamento local do navegador). Não há nuvem, não há banco de
dados e nenhum dado do seu negócio sai da máquina em que você trabalha.

---

## 🚀 Como começar

1. Abra o `index.html` — a tela de login aparece.
2. Entre com o usuário **`ana`** e a senha **`1234`** (funcionária de
   demonstração, tipo administradora).
3. Vá em **Cadastros → Funcionários** e **troque essa senha imediatamente**.
4. Em **Configurações**, renomeie a empresa para o nome do seu
   estabelecimento.

> Em **Configurações → Dados de demonstração** você apaga tudo o que é de
> exemplo (produtos e funcionários) com um clique, sem tocar nas suas
> comandas e vendas.

---

## 📱 Funcionalidades

### Comandas
- Comandas numeradas automaticamente, com cliente/mesa descritivo
- Produtos por categoria, busca e grade de toque
- Controle total de quantidades, remoção de itens e observações
- Status: **Aberta → Enviada à cozinha → Pronta → Fechada**
- Impressão da comanda para cozinha ou para o cliente

### Cozinha
- Fila de preparo em tempo real, sem recarregar a página
- Cronômetro por comanda com alerta visual conforme o tempo passa
- Botão de **Pronto** que atualiza a tela de comandas na hora

### Caixa
- Múltiplas formas de pagamento **na mesma venda** (Dinheiro, Pix, Débito,
  Crédito) com soma automática
- Cálculo de **troco** para pagamento em dinheiro
- Métricas do dia: total, vendas, ticket médio, maior venda, dinheiro
  recebido e troco a devolver
- Faturamento por forma de pagamento, **produtos mais vendidos** e histórico
  com busca
- **Estorno** de venda incorreta com registro do motivo e de quem fez
- Relatório por período (dia, semana ou mês) com exportação **CSV** para
  Excel

### Cadastros
- Produtos com nome, preço, categoria e ativação/desativação
- Funcionários com perfil de administrador (vê tudo) ou operador (não mexe
  em cadastros e configurações)
- Histórico de quem abriu, editou e fechou cada comanda

---

## 🔐 Segurança

- **Senhas nunca ficam gravadas em texto.** São armazenadas como resumo
  criptográfico SHA-256 com sal individual, usando a Web Crypto nativa do
  navegador.
- Tela de login bloqueia tentativas e o campo de senha só é liberado após a
  verificação.
- Comandas e vendas não podem ser apagadas pelo atalho — o caixa trabalha
  com estorno, preservando o histórico.
- Trilha de auditoria: cada comanda guarda quem abriu, quem editou e quem
  fechou.
- **Funcionários e senhas são de uso interno.** Não é um sistema de
  autenticação de usuários finais.

---

## 🔒 LGPD e privacidade

- **Não coletamos dados pessoais de terceiros.** Cliente e mesa são escritos
  apenas pelo próprio operador, em texto livre.
- **Nenhum dado sai do computador.** Tudo vive no armazenamento local do
  navegador — sem servidor, sem nuvem, sem rastreamento, sem cookies de
  terceiros, sem bibliotecas externas de terceiros.
- **Consequência prática:** os dados ficam naquele navegador específico.
  **Use Configurações → Exportar dados** ao final de cada dia e guarde o
  arquivo. É a sua cópia de segurança e é também como você leva os dados
  para outro computador (**Importar dados**).
- Recomenda-se manter apenas um computador como ponto principal, com o
  navegador sempre atualizado e o aparelho de acesso com senha.

---

## 💾 Backup — importante

Como os dados são locais, limpar os dados do navegador ou usar outro
computador apaga o que está salvo. Ao final de cada dia:

**Configurações → Exportar dados**

Salve o arquivo gerado (`.json`) em um pendrive ou pasta segura. Para
restaurar em qualquer máquina, use **Importar dados** no mesmo menu.

---

## 🖨️ Impressão

- A comanda imprime sem cabeçalho do navegador, já com nome da empresa,
  dados e rodapé.
- O recibo do caixa sai no mesmo padrão térmico de 80 mm.

---

## 📋 Requisitos

- Navegador atualizado (Chrome, Edge, Firefox ou Safari)
- Conexão **não é necessária** após a primeira abertura
- Funciona em celular e tablet — a interface se adapta à tela

---

## 🧰 Sobre o código

Projeto **sem dependências externas**: nenhum framework, nenhuma biblioteca,
nenhum CDN. Só HTML, CSS e JavaScript puro.

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Estrutura semântica e telas |
| `css/estilo.css` | Design system com tokens, componentes e impressão |
| `js/util.js` | Funções gerais: formatação, máscaras, modais acessíveis |
| `js/dados.js` | Camada de armazenamento, migração e backup |
| `js/negocio.js` | Regras de negócio: comandas, vendas, caixa, relatórios |
| `js/app.js` | Interface, navegação e eventos |
| `sw.js` | Service Worker para uso offline |
| `manifest.webmanifest` | Instalação como aplicativo (PWA) |

Inclui suporte a **PWA** — pode ser instalado na tela inicial e usado
offline. Acessibilidade: navegação por teclado, foco visível, rótulos nos
campos e contraste alto.

---

Desenvolvido por **Marcelo Oliveira** · Soluções web sob medida —
[marcelo-oliveira.dev](https://marcelo-oliveira.dev)
