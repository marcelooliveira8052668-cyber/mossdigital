# MOSS Agenda Pro — agenda local ou sincronizada

Esta é a versão profissional da MOSS Agenda Pro. A versão de desenvolvimento está na pasta `MOSS-Agenda-Pro`; a publicação do site MOSS Digital fica em `agenda-pro/`. Cópias antigas em Downloads não são atualizadas automaticamente.

## O que o site faz

- Cadastra cliente, telefone (opcional), serviço, data, hora e observações.
- Permite editar, concluir/reabrir e excluir atendimentos com confirmação.
- Evita dois atendimentos no mesmo horário; busca e filtra por situação ou por um dia escolhido. A data aparece na área da agenda quando um dia é selecionado, sem data fixa no cabeçalho.
- Visual rosa-claro, adaptado para computador e celular.
- Atualiza os indicadores do painel e a lista de clientes automaticamente.
- Baixa um **backup JSON** e permite restaurá-lo sem substituir horários já cadastrados.
- Oferece atalhos **Hoje**, **Anterior** e **Próximo** para navegar entre os dias, incluindo viradas de mês e ano.
- Abre um **lembrete no WhatsApp** para contatos brasileiros com DDD. A mensagem precisa ser revisada e enviada manualmente; nenhum lembrete é disparado automaticamente. Observações internas não entram na mensagem.
- Só confirma alterações locais depois de salvar no navegador. Se a gravação falhar, mantém a agenda anterior e os campos preenchidos; uma importação local também não fica pela metade.
- Se os dados locais estiverem corrompidos, preserva o conteúdo original e bloqueia novas gravações. Não limpe o armazenamento antes de recuperar uma cópia.
- **Sem configuração do Supabase:** continua funcionando só neste navegador, com `localStorage`.
- **Com Supabase configurado:** pede login e salva os agendamentos em um banco de dados online. A mesma conta pode ser usada no PC e no celular; as alterações aparecem ao abrir a página, ao voltar para ela e durante o uso (atualização a cada minuto).

**Importante:** contas diferentes têm agendas diferentes. Se uma empresa quiser funcionários com logins próprios e a **mesma** agenda, será necessário desenvolver permissões de equipe; contratar um plano maior não cria isso automaticamente.

## Arquivos

| Arquivo | Função |
| --- | --- |
| `index.html` | Página, formulário e tela de login. |
| `style.css` | Visual responsivo. |
| `script.js` | Agenda, login, sincronização e backups. |
| `agenda-utils.js` | Validação de datas, navegação e links de lembrete. |
| `tests/agenda.test.cjs` | Testes automatizados sem dependências externas. |
| `config.js` | URL e chave pública do Supabase; começa vazio. |
| `supabase.sql` | Criação da tabela, proteção por usuário e bloqueio de horário duplicado. |
| `README.md` | Este guia. |

Mantenha `index.html`, `style.css`, `script.js`, `agenda-utils.js` e `config.js` juntos. Nenhum pacote `npm` é necessário. Para o modo online, é preciso conexão com a internet, uma conta Supabase e colocar o site em um endereço que o celular consiga abrir.

Os arquivos de texto estão salvos em **UTF-8**, e o HTML declara `<meta charset="UTF-8">`. Se algum acento aparecer quebrado, confira no VS Code se o arquivo foi salvo como UTF-8 e atualize a página; evite editar o código em programas que mudem a codificação. A versão de testes temporária não é a pasta entregue em Downloads.

Na seção **Atendimentos**, escolha uma data no filtro para ver só aquele dia. A indicação “Agenda de ...” aparece apenas enquanto houver um dia selecionado; clique em **Ver todos os dias** para retirá-la. Não há data fixa no topo da página.

## Usar no PC, sem configurar banco de dados

Dê dois cliques em `index.html` para ver a versão local. Para armazenamento mais previsível, abra o **PowerShell** nesta pasta e execute:

```powershell
# Abra o terminal na pasta que contém o index.html da agenda.
python -m http.server 8765 --bind 127.0.0.1
```

Acesse <http://localhost:8765/>. Para parar o servidor, pressione **Ctrl + C** no terminal. Esse servidor apenas entrega a página ao navegador; **não** guarda os agendamentos nem publica o site na internet. Se aparecer “server restarted/cancelled”, ligue-o novamente com o comando acima. Use o mesmo navegador e o mesmo endereço para encontrar os dados locais; abrir por `file://` ou trocar a porta cria outro local de armazenamento.

## Ativar login e banco de dados online sem pagar

O serviço usado é o [Supabase](https://supabase.com/) no plano **Free**. Você precisa criar a conta e configurar o projeto; não envie sua senha ou chave secreta a ninguém. O plano gratuito tem limites e pode pausar o projeto depois de cerca de uma semana de pouca atividade; veja a [página oficial de preços](https://supabase.com/pricing) antes de prometer disponibilidade a um cliente.

### 1. Criar o projeto

1. Entre em <https://supabase.com/dashboard> e crie uma conta.
2. Crie uma organização e um projeto escolhendo **Free**. Guarde a senha do banco em lugar seguro (ela **não** entra no código do site).
3. No projeto, abra **SQL Editor** > **New query**. Copie todo o conteúdo de `supabase.sql`, cole e clique em **Run**. A tabela `moss_agendamentos` será criada com regras de segurança (**RLS**) para cada conta ver só os próprios dados.
4. Em **Authentication > Providers**, confira se o login por e-mail está ativado. A confirmação por e-mail normalmente é exigida; mantenha-a ativada para proteger as contas.

### 2. Ligar o site ao projeto

1. No painel do Supabase, abra as configurações do projeto e procure **Project URL** e a chave **Publishable** (`sb_publishable_...`). Em projetos antigos, a chave **anon** também funciona. Os nomes dos menus podem mudar; procure em **Settings / API Keys**.
2. Abra `config.js` no VS Code e preencha assim (valores abaixo são apenas exemplos):

```js
window.MOSS_SUPABASE = {
    url: "https://SEU-PROJETO.supabase.co",
    publishableKey: "sb_publishable_SUA_CHAVE_PUBLICA"
};
```

3. **Nunca** coloque no site a chave `service_role`, `sb_secret_...`, o token de acesso do painel, nem a senha do banco. A chave *Publishable/anon* pode aparecer no navegador **porque** a tabela está protegida pelas regras de `supabase.sql`.
4. Teste primeiro em <http://localhost:8765/> com o servidor local ligado. Crie uma conta pela tela de login, confirme o e-mail e entre. Se o e-mail abrir uma página errada, configure as URLs de redirecionamento no passo seguinte.

**Atenção à migração:** antes de preencher `config.js`, use **Baixar backup** na versão local e guarde o JSON. Depois de entrar na nuvem, use **Restaurar backup** para levar esses agendamentos à sua conta. Se houver dados locais no mesmo endereço/navegador, aparecerá também o botão **Importar agora**. Nada é apagado da versão local automaticamente.

### 3. Abrir no celular e ativar a versão publicada

O `localhost` do PC não funciona no celular: cada aparelho tem seu próprio `localhost`. A **demonstração** foi incluída no site MOSS Digital, em <https://mossdigital.com.br/agenda-pro/> (repositório `marcelooliveira8052668-cyber/mossdigital`, pasta `agenda-pro/`). Ela abre em **modo local de demonstração** até que o banco seja configurado. **Não cadastre dados reais de clientes na demonstração pública.**

1. Conclua os passos do Supabase acima, inclusive `supabase.sql` e as políticas RLS.
2. Para ativar o login na versão publicada, edite **também** `agenda-pro/config.js` no repositório MOSS Digital e publique essa alteração. Coloque nele somente a URL e a chave **Publishable/anon** do projeto; **nunca** uma senha, chave `service_role` ou `sb_secret_...`. O `config.js` publicado pode ser lido por qualquer visitante, então o banco precisa estar protegido pelas políticas RLS antes da publicação.
3. No Supabase, acesse **Authentication > URL Configuration**. Defina **Site URL** como `https://mossdigital.com.br/agenda-pro/` e adicione em **Redirect URLs** `https://mossdigital.com.br/agenda-pro/**` e, para testes locais, `http://localhost:8765/**`. Isso permite que os links de confirmação de e-mail retornem para o site certo.
4. Abra o endereço HTTPS da agenda no PC e no celular e entre **com a mesma conta** nos dois. Faça um agendamento em um e confira no outro; se necessário, atualize a página. Sem internet ou se o Supabase estiver pausado, a agenda online não carrega até a conexão/projeto voltar.

O GitHub Pages publica os arquivos do site, **não** guarda os agendamentos; estes ficam no Supabase após a configuração. Se um cliente quiser um site separado, outra opção gratuita de hospedagem estática é [Cloudflare Pages por upload](https://developers.cloudflare.com/pages/get-started/direct-upload/): envie apenas `index.html`, `style.css`, `script.js` e `config.js` da versão dele. **Nunca** publique backups JSON, senhas ou dados de clientes. Depois atualize as URLs de redirecionamento do Supabase para o novo endereço HTTPS.

## Fazer e recuperar backup

1. Entre na agenda e clique em **Baixar backup**. Um arquivo `moss-agenda-backup-AAAA-MM-DD.json` será baixado.
2. Guarde-o em um local **privado** fora do site, de preferência com uma segunda cópia. O arquivo contém nomes e telefones; não o compartilhe nem publique.
3. Para recuperar, clique em **Restaurar backup**, escolha o JSON e confirme. Horários já existentes são mantidos; os demais são adicionados à conta atualmente conectada.

No plano **Free**, o Supabase **não faz backup automático para você**. Programe-se para baixar o JSON periodicamente. Este backup é **só dos agendamentos da conta atual**: não inclui usuários, senhas, esquema SQL, nem arquivos externos. Para um backup completo do banco, veja a [documentação oficial de backup com CLI/pg_dump](https://supabase.com/docs/guides/platform/backups). Teste a recuperação antes de depender dela em um negócio.

## Se o cliente precisar de um banco maior: onde contratar e quanto custa?

**Preços consultados em 27/10/2026; valores em dólares americanos, sujeitos a alterações, câmbio, impostos e consumo. Confirme sempre no [site oficial do Supabase](https://supabase.com/pricing) antes de apresentar um orçamento.**

| Plano | Preço inicial | Capacidade incluída | Backup |
| --- | --- | --- | --- |
| **Free** | **US$ 0/mês** | 500 MB de banco, 1 GB para arquivos no Supabase Storage, 5 GB de saída de dados/mês | Manual, pelo botão do site ou ferramenta de banco. Pode pausar por inatividade. |
| **Pro** | **a partir de US$ 25/mês** por organização, com crédito que cobre **um** projeto no compute Micro | 8 GB de banco por projeto, 100 GB de Storage e 250 GB de saída de dados incluídos | Backup diário do banco, com até 7 dias de retenção. Não pausa por inatividade. |
| **Team / Enterprise** | Team a partir de **US$ 599/mês**; Enterprise sob consulta | Recursos para organizações maiores e exigências específicas | Retenção maior ou condições negociadas. |

No **Pro**, ultrapassar 8 GB de disco pode custar **US$ 0,125 por GB/mês**; armazenamento de arquivos acima dos 100 GB pode custar **US$ 0,0213 por GB/mês**. Mais projetos, compute maior, tráfego e complementos podem aumentar a fatura. O Supabase informa que limites de gastos (*Spend Cap*) vêm ligados por padrão no Pro: confira-os no painel antes de permitir cobrança adicional. **O preço inicial não é garantia de custo fixo.** O app atual salva textos e horários; para fotos, vídeos, documentos, faturamento ou muitos tipos de informação, seria necessário desenvolver novas funcionalidades e usar o serviço de arquivos apropriado, não colocar tudo na tabela de agendamentos.

### Como contratar e mudar do Free para o Pro

1. Peça autorização ao cliente e confirme o orçamento atualizado em <https://supabase.com/pricing>. **Para projetos de clientes, prefira que o próprio cliente seja dono da organização e da cobrança.**
2. No [painel do Supabase](https://supabase.com/dashboard), selecione a **organização do projeto** e abra **Billing / Subscription**. Escolha **Upgrade to Pro**, revise a estimativa e cadastre o método de pagamento do responsável. **Não** clique em contratar sem a aprovação do cliente.
3. Confira **Billing > Usage** e o **Spend Cap**. Se precisar de mais desempenho, veja **Project Settings > Compute and Disk** e confirme o custo extra antes de alterar o tamanho do compute.
4. Mantendo o **mesmo projeto**, a URL e a chave pública em `config.js` normalmente não mudam; **não apague o projeto nem crie outro sem planejar a migração**. Confira os agendamentos e o login após a troca de plano.
5. No Pro, consulte **Database > Backups** para verificar os backups diários. Continue usando **Baixar backup** antes de mudanças importantes: o JSON da agenda é uma cópia extra, não substitui um plano de recuperação testado.

Se o cliente pedir muitos usuários, anexos pesados, equipe com permissões diferentes, cobrança integrada ou garantia de disponibilidade, faça um levantamento de requisitos e orçamento específico: aumentar o banco sozinho não implementa esses recursos. Para **muitos milhares de agendamentos**, a tela também precisará de paginação, pesquisa feita no servidor e testes de desempenho; esta versão carrega os registros da conta para exibi-los no navegador.

## Segurança e cuidados

### Validar esta versão

Com Node.js instalado, execute na pasta da agenda:

```powershell
node --test tests/agenda.test.cjs
```

Os testes cobrem datas, navegação, telefone, lembrete manual, cadastro, conflitos, edição, conclusão, exclusão, importação e falhas de armazenamento local. Não substituem um teste do login e das políticas RLS no projeto Supabase real, que depende de configuração e de uma conta de teste.

- Use senhas fortes e HTTPS no site publicado. Não compartilhe a mesma senha com funcionários; a versão atual é para a mesma pessoa usar a **própria conta** em vários aparelhos.
- A pasta antiga e dados no navegador não são transferidos automaticamente para uma URL nova. Exporte o JSON antes e restaure após entrar.
- Cada cliente deve ter projeto/organização e configurações apropriados. Não misture dados de empresas diferentes na mesma conta.
- Nomes, telefones e observações são dados pessoais. Proteja o acesso e os backups e respeite as obrigações aplicáveis da LGPD.

**Fontes para conferir preços e limites:** [Supabase Pricing](https://supabase.com/pricing), [Database Backups](https://supabase.com/docs/guides/platform/backups), [Cloudflare Pages Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).
