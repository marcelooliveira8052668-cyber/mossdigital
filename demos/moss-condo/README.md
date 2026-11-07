# MOSS CONDO

**Seu condomínio, perfeitamente conectado.**

Primeira versão demonstrativa em React + Vite + JavaScript. Interface Premium Glass independente, com três experiências: síndico, morador e portaria.

> Somente dados fictícios. Sem autenticação de produção, cobranças, documentos pessoais, informações bancárias, reconhecimento facial ou rastreamento. Os registros ficam no navegador; não há sincronização entre aparelhos.

## Abrir localmente

Na pasta `demos/moss-condo/`:

```powershell
npm install
npm run dev -- --port 5196
```

Abra `http://127.0.0.1:5196/`. Escolha um perfil e clique em **Acessar demonstração**. O seletor do cabeçalho permite trocar de experiência.

Não abra `index.html` diretamente pelo Explorador de Arquivos: o código JSX precisa do servidor Vite.

## Funcionalidades desta versão

- **Entrada:** fotografia ilustrativa de edifício residencial, seleção de perfil e acesso sem cadastro.
- **Síndico:** unidades, ocupação baseada nos cadastros, receitas e despesas pagas, saldo, inadimplência vencida, reservas e manutenções.
- **Moradores:** cadastro, vínculo proprietário/inquilino, pesquisa por unidade, edição, histórico e exclusão confirmada.
- **Financeiro:** receitas, despesas, taxas por unidade, pagamentos simulados, filtros por categoria e mês, gráficos dinâmicos e relatório CSV dos dados filtrados.
- **Reservas:** cinco áreas comuns com fotos individuais e seleção de disponibilidade pelos cartões, calendário mensal, validação de conflitos, cancelamento e histórico.
- **Manutenção:** ocorrências, prevenção, datas programadas, prioridades, situação e histórico de atualizações.
- **Morador:** unidade fictícia A · 302, somente suas taxas e solicitações; avisos gerais e do bloco A; suas reservas e calendário de eventos públicos.
- **Portaria:** visitantes inventados, autorizações, entradas/saídas fictícias, entregas e histórico de atualização.
- **Mural:** comunicados gerais, por bloco e para portaria; reuniões, assembleias, eventos e manutenção. Apenas o síndico publica e edita comunicados.
- **Persistência:** chave própria de localStorage, restauração confirmada, estado vazio e recuperação de armazenamento corrompido ou indisponível.
- **Acessibilidade:** teclado, foco visível, diálogo nativo, Escape, controles com rótulos e resumo textual dos gráficos.
- **Fotografias:** fotos nos três painéis e nos módulos de gestão; nove imagens locais em WebP com variantes de 640, 1120 e 1600 pixels, descrições acessíveis e identificação de uso ilustrativo.

### Como interpretar os valores

O **saldo mensal** considera apenas entradas e saídas marcadas como pagas no mês atual. O **gráfico** representa os lançamentos previstos, incluindo os pendentes. Inadimplência significa receita pendente cujo vencimento é anterior ao dia atual.

Há 48 unidades de capacidade demonstrativa, mas apenas quatro moradores iniciais. A ocupação corresponde às unidades distintas efetivamente cadastradas, não a um percentual inventado para parecer uma operação real.

## Organização para estudar

| Pasta / arquivo | Responsabilidade |
| --- | --- |
| `src/main.jsx` | Conecta React, roteador e CSS ao HTML |
| `src/App.jsx` | Rotas, navegação flutuante, permissões e troca de perfil |
| `src/pages/Landing.jsx` | Apresentação e seleção de experiência |
| `src/pages/Dashboard.jsx` | Indicadores e painéis por perfil |
| `src/pages/Records.jsx` | Cadastro, edição, exclusão, filtros e CSV |
| `src/pages/Reservations.jsx` | Calendário, disponibilidade e reservas |
| `src/components/RecordDialog.jsx` | Formulários acessíveis |
| `src/components/FinanceChart.jsx` | Gráfico e resumo textual |
| `src/components/Architecture.jsx` | Ilustração arquitetônica autoral |
| `src/components/Photo.jsx` | Fotos locais responsivas, carregamento e recuperação de falhas |
| `src/components/PhotoBanner.jsx` | Faixas fotográficas contextuais com contraste protegido |
| `src/data/photos.js` | Descrições, enquadramentos e relação de fotos por módulo e área |
| `src/assets/photos/` | Fotografias WebP incluídas no build, sem requisições externas |
| `tools/prepare_photos.py` | Preparo comentado das imagens e registro de fontes |
| `src/data/seed.js` | Dados fictícios pré-carregados |
| `src/data/modules.js` | Campos, listas de opções e colunas dos módulos |
| `src/hooks/useDemo.js` | Leitura e gravação no navegador |
| `src/utils/rules.js` | Moeda, data e regras de conflito |
| `src/styles/condo.css` | Identidade visual exclusiva, comentada em português |

O código-fonte tem explicações em português. JSON, bibliotecas e build não recebem comentários manuais.

Veja **[PERSONALIZACAO.md](docs/PERSONALIZACAO.md)** para arquivos e linhas de referência.

## Testes

```powershell
npm test
npm run build
```

Os testes de navegador usam Python, Playwright, Pillow para a capa e Chrome local, disponíveis no ambiente em que esta versão foi produzida. Não são dependências de produção da aplicação. A auditoria usa `axe-core`, instalado apenas como dependência de desenvolvimento.

Para repetir os testes completos, em um terminal separado na pasta da demo:

```powershell
python -m http.server 8796 --bind 127.0.0.1
```

Depois, em outro terminal na mesma pasta:

```powershell
python tests/browser_check.py
python tests/modules_check.py
python tests/accessibility_check.py
python tests/photos_check.py
```

Esses scripts usam `http://127.0.0.1:8796/dist/`, portanto é necessário gerar o build antes. Cada sessão usa dados fictícios isolados do navegador pessoal. As capturas ficam em `docs/screenshots/`.

Resultados e limites: **[VALIDACAO.md](docs/VALIDACAO.md)**.

## Subdiretório e GitHub Pages

O Vite usa `base: './'`. O `HashRouter` mantém as rotas depois de `#`, evitando depender de redirecionamentos do servidor. Por exemplo: `/demos/moss-condo/#/sindico/painel`.

O build é gerado em `dist/`, pasta já ignorada pelas regras existentes do repositório. **O código-fonte não deve substituir o site publicado.** Depois de autorização específica, o conteúdo de `dist/` poderá ser preparado para o endereço final, sem publicar as dependências e os arquivos-fonte por engano. Nenhuma configuração de implantação ou GitHub Actions foi criada ou alterada.

## Materiais de portfólio e divulgação

- Especificação do cartão, ainda não integrado: `docs/CARTAO-PORTFOLIO.md`.
- Capturas locais: `docs/screenshots/`.
- PNG 1080 × 1350, SVG editável, gerador comentado e legenda: `../../divulgacao/instagram/moss-condo/`.
- Cópia fácil da capa: `../../../04 - Divulgacao/MOSS CONDO/`.

A publicação da demo foi autorizada e concluída em <https://mossdigital.com.br/demos/moss-condo/>. Após nova autorização específica, seu cartão foi integrado e publicado em <https://mossdigital.com.br/sistemas.html>, preservando os cartões anteriores. A capa não foi postada em redes sociais. Veja `docs/PUBLICACAO.md` para a separação entre código-fonte e build publicado.

## Limites de segurança

A separação de perfis bloqueia navegação e oculta dados administrativos na interface, mas **não é segurança de backend**. Quem tiver acesso às ferramentas do navegador pode inspecionar o armazenamento. Não use dados pessoais reais.

As reservas são validadas na sessão local. Não há controle concorrente entre abas ou usuários. Uma aplicação comercial exigiria servidor, banco de dados, autenticação, autorização, auditoria e validação transacional.

Não há boletos, pagamentos, envio de mensagens, notificações push nem integrações externas. Os relatórios são CSV locais. As fotografias de terceiros são ilustrativas, provenientes dos acervos gratuitos Unsplash e Pexels, e não retratam um empreendimento cliente da MOSS Digital. As referências de licença e origem estão em `docs/FOTOGRAFIAS.md` e `docs/photo-sources.json`. A ilustração autoral original foi preservada em `Architecture.jsx`, mas não é mais a imagem principal da entrada.

## Preservação do repositório

Branch de fontes: `feat/moss-condo`. Após autorização, o código didático foi commitado e enviado nessa branch; somente o build da nova demo foi publicado em `main`. O site principal, os logotipos, as outras demos e as configurações globais foram preservados. Não mescle a branch de fontes inteira sobre a de produção: consulte `docs/PUBLICACAO.md`.
