# MOSS Academia — manual de entrega

Site demonstrativo independente em HTML5, CSS3 e JavaScript puro. Marca, preços, horários, depoimentos e estrutura são fictícios. **Publicação autorizada explicitamente pelo proprietário em 12/11/2026, com a mensagem “pode publicar”.** Endereço de publicação: <https://mossdigital.com.br/demos/moss-academia/>. A autorização se refere ao site e catálogo, não à postagem no Instagram.

## Abrir e testar

Na raiz do repositório `mossdigital`, execute:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Abra `http://127.0.0.1:8765/demos/moss-academia/`. Para encerrar, use Ctrl+C no terminal do servidor. Também é possível abrir `index.html` diretamente; recomenda-se HTTP local para testar vídeo e recursos como serão servidos na hospedagem.

O site final não depende de Python, Node, fontes remotas, pacotes ou compilação. Todos os recursos são locais. Python/Pillow/Playwright/FFmpeg são ferramentas opcionais de desenvolvimento, não dependências da hospedagem.

## Estrutura

| Caminho | Função |
| --- | --- |
| `index.html` | Página com seções completas, formulários e diálogos |
| `css/style.css` | Identidade visual, responsividade e movimento reduzido |
| `js/app.js` | Modalidades, galeria, planos, matrícula, agenda e área do aluno |
| `assets/img/` | Fotos WebP e miniaturas de galeria |
| `assets/video/` | Filme-conceito H.264, 12s, montagem fotográfica sem áudio |
| `assets/favicon.svg` | Símbolo original MOSS Academia |
| `FONTES-FOTOS.json` | Origem, URL e licença de cada fotografia |
| `entrega/` | Card, entrada de catálogo e registro de aprovação |
| `tools/` | Preparação de fotos, criação do vídeo e testes |

## Personalização

- **Nome e textos:** editar `index.html`; conteúdos interativos adicionais ficam em `js/app.js`.
- **Cores e margens:** variáveis em `:root`, no começo de `css/style.css`.
- **Planos e preços:** objeto `prices` no JavaScript e cartões HTML. Manter os valores iniciais e `data-price` dos cartões coerentes. O anual aplica 15% de desconto com centavos e informa o total de 12 meses à vista.
- **Modalidades/equipamentos:** objeto `modalities` em `js/app.js`. A primeira modalidade também tem conteúdo inicial no HTML.
- **Horários:** listas `days` e `classes` no JavaScript. As datas 01–06 na barra são índices editoriais dos dias, não datas de calendário.
- **Fotografias:** substituir os arquivos mantendo proporções, textos alternativos e legendas fiéis. Atualizar também miniaturas, a lista `photos` e o manifesto de fontes. Não anunciar fotos de banco como instalações, alunos ou equipe reais.
- **Filme:** é uma montagem editorial das fotos licenciadas, não uma filmagem. Para trocar por um vídeo real autorizado, substituir a origem do `<video>`, o pôster, a descrição e incluir legendas WebVTT se houver fala ou informação sonora.
- **Contatos:** a demo não tem endereço, telefone, WhatsApp ou e-mail de uma academia real. Inserir apenas contatos verificados do comprador. Não direcionar mensagens de academia fictícia para a MOSS Digital sem autorização.

## Funcionalidades e limites

- Hero cinematográfico com imagem, navegação aderente, animações leves, contadores e carrossel manual.
- Quatro modalidades completas e dez tipos de equipamentos descritos na musculação. As fotos são referências do segmento, não prova da disponibilidade de máquinas específicas.
- 24 fotografias distintas, filtros, expansão da galeria, lightbox, setas, Escape e retorno de foco.
- Vídeo local com controles e sem autoplay. Carregamento `preload="none"` para economizar dados.
- Comparação mensal/anual e matrícula **simulada**, sem contrato e sem pagamento.
- Área do aluno **sem autenticação**: exemplo visual de treino e reservas reversíveis apenas na sessão em memória.
- Visita **simulada**, sem envio de agendamento. Solicita somente nome fictício, dia e horário.
- Não existem login real, armazenamento persistente, banco conectado, cobrança, integração com WhatsApp ou envio de e-mail. Recarregar apaga todo o estado. Não digitar dados pessoais reais.
- Treino ilustrativo não constitui prescrição de exercícios. É necessária avaliação de profissional habilitado em uma operação real.
- Fotografia e vídeo respeitam aviso de demonstração; depoimentos usam personagens fictícios explicitamente identificados.

## Licenciamento e mídia

As 24 fotos foram obtidas no Pexels. Consulte `FONTES-FOTOS.json` e a licença em <https://www.pexels.com/license/>. O registro conserva páginas de origem e URLs de download; confira os termos vigentes antes de uso comercial e não sugira endosso das pessoas retratadas. A folha `tools/conferencia-fotos.jpg` documenta a conferência visual. Imagens incompatíveis foram descartadas.

O logotipo vetorial, a composição, o filme editorial e a capa são criações desta entrega. O vídeo reutiliza as fotos Pexels com os mesmos cuidados de licença; não contém música nem voz. A fonte condensada usa famílias instaladas no sistema (Impact/Arial Narrow), sem distribuição de arquivos proprietários.

## Verificação automática

Requer Python, `playwright`, navegador Microsoft Edge e, para recriar mídia, Pillow e FFmpeg disponíveis no PATH.

```powershell
python demos/moss-academia/tools/test_demo.py
```

O teste inicia seu próprio servidor temporário. Verifica abas, teclado, fotos, filtros, lightbox, carrossel, preços, matrícula, segurança de texto, reservas, visita, vídeo, menu móvel e ausência de overflow em oito larguras. Também bloqueia recursos HTTPS para confirmar operação sem serviços externos e detecta erros JS, 404 e envios de dados. Evidências: `.moss-local/moss-academia/`.

Teste manual complementar: percorrer Tab e Shift+Tab, usar zoom de 200%, leitor de tela, modo de movimento reduzido, dispositivos físicos e navegadores de destino. A automatização não substitui auditoria completa WCAG.

## Banco de dados: evolução real, não incluída nesta demo

Se desejar uma versão comercial, uma opção é Supabase com estes pré-requisitos:

1. Projeto separado de desenvolvimento e produção, região adequada, domínio, SMTP, URLs de redirecionamento e política LGPD definidos.
2. Supabase Auth com e-mail verificado, recuperação de conta e sessões seguras. Não transformar o acesso demonstrativo em autenticação.
3. Tabelas sugeridas: `profiles(id -> auth.users.id)`, `plans`, `memberships(user_id, plan_id, status)`, `classes`, `bookings(user_id, class_id)` e `visit_requests`. Minimizar dados coletados e definir retenção/exclusão.
4. Ativar **RLS em todas as tabelas**. Aluno acessa apenas seu perfil e suas reservas com `auth.uid() = user_id`; planos/aulas têm leitura pública apenas do necessário. Alterações de planos, status de matrícula, capacidade e pagamentos são operações administrativas validadas no servidor.
5. Usar chave pública/anon no cliente **somente com RLS correta**. `service_role`, credenciais de SMTP e segredos de gateway nunca podem entrar no HTML/JS. Usar funções de servidor ou Edge Functions para operações privilegiadas.
6. Validar capacidade e unicidade de reserva em transação no banco; impedir corrida, reserva duplicada, manipulação de plano e acesso entre contas. Não confiar no preço enviado pelo navegador.
7. Pagamentos reais exigem gateway, checkout seguro, webhooks assinados, idempotência e conciliação. Não armazenar números de cartão. Matrícula só é confirmada pelo estado validado no backend.
8. Testar recuperação de senha, expiração de sessão, RLS com dois usuários e visitante anônimo, limites, rate limiting e exclusão de dados. Realizar revisão jurídica, acessibilidade e segurança antes de operar.

Não há SQL, conexão Supabase, backend ou autenticação entregues/testados nesta versão. A integração é um novo escopo; não consiste apenas em colar uma chave.

## Publicação autorizada em 12/11/2026

1. Aprovação específica recebida nesta conversa: “pode publicar”.
2. Subir a pasta `demos/moss-academia/` para hospedagem estática com HTTPS, MIME correto para WebP/MP4 e suporte a Range para vídeo. Não é necessário build.
3. Validar os caminhos relativos, cache, carregamento de fotos, controles e navegação no endereço final.
4. Cards incluídos na página inicial e no catálogo da versão de publicação, preservando os outros modelos e usando captura da própria demo. A publicação foi preparada em uma árvore Git isolada a partir da versão mais recente de `main`, sem incluir alterações locais de outras demos.
5. Endereço autorizado: `https://mossdigital.com.br/demos/moss-academia/`. A postagem em redes sociais ainda exige autorização própria.

## Instagram

Capa PNG de 1080 × 1350 e fonte HTML editável em `divulgacao/instagram/moss-academia/`, com cópia em `../04 - Divulgacao/`. A arte divulga apenas o conceito demonstrativo e não inclui URL de uma academia real. Legenda pronta acompanha os arquivos. A criação não autoriza postagem.

## Preferências registradas nesta entrega

- Nome escolhido: **MOSS Academia**; slogan: **O seu limite não existe.**
- Estética premium escura, preto/azul elétrico/vermelho, sem copiar layout de outras demos.
- HTML/CSS/JavaScript puro; código comentado em português nos blocos e operações relevantes.
- Novas demos aguardam aprovação individual antes de publicação e recebem capa de Instagram.
