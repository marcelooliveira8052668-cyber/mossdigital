# Evolução para uma operação imobiliária real

**Documento de arquitetura, não integração implementada.** A demonstração não usa banco, autenticação ou upload real. LocalStorage pode ser lido e alterado por qualquer pessoa com acesso ao navegador e não pode gerir interessados, permissões ou operações comerciais reais.

## Pré-requisitos

1. Responsável legal e profissionais devidamente registrados, com dados e CRECI verificados quando aplicável.
2. Autorização dos proprietários para anunciar, descrição/valores conferidos, documentação e conjuntos de fotos do mesmo imóvel com licença adequada.
3. Projeto Supabase de desenvolvimento separado de produção, região apropriada e backups configurados.
4. Domínio, HTTPS, provedores de SMTP/contato, consentimentos, política LGPD, bases legais e prazos de retenção definidos.
5. Backend ou Edge Functions para validação, autorização, antispam, limites de envio e operações administrativas.

## Modelo sugerido

| Tabela | Conteúdo e acesso |
| --- | --- |
| `profiles` | Identidade do usuário ligada a `auth.users.id`; perfil próprio, sem permitir editar privilégios |
| `staff_roles` | Papéis administrativos/corretor e atribuições; geridos apenas pelo servidor, nunca pelo próprio usuário |
| `properties` | Dados do imóvel, finalidade, status editorial, autor, datas e comprovações internas |
| `property_media` | Ordem, arquivo, legenda, imóvel vinculado e estado de autorização/validação da foto |
| `brokers` | Dados públicos profissionais verificados, sem expor documentos privados |
| `property_assignments` | Relação entre corretor autorizado e anúncio |
| `leads` | Interesse privado com consentimento, finalidade e prazo de retenção |
| `visit_requests` | Solicitações e estados reais do atendimento, nunca confirmação automática pelo frontend |
| `favorites` | Relações privadas entre usuário autenticado e imóvel |

Comprovações de autorização, contratos, documentos e informações sensíveis não devem ficar em tabelas de leitura pública. Separar dados públicos de documentos privados.

## Autenticação e RLS

- Usar Supabase Auth com e-mail verificado, recuperação de senha, expiração de sessão e MFA para equipe quando apropriado.
- **Ativar RLS em todas as tabelas.** Visitante pode ler apenas anúncios efetivamente publicados e os respectivos dados públicos autorizados.
- Favoritos são privados: cada usuário acessa apenas registros com `user_id = auth.uid()`.
- Perfil público não pode permitir que o usuário se torne administrador. Papéis devem vir de tabela protegida ou claims assinadas e controladas no servidor.
- Corretores só podem acessar interessados dos imóveis explicitamente atribuídos a eles; administradores têm permissões definidas por função, auditadas e testadas.
- Não liberar `SELECT` público em `leads`, solicitações de visita, documentos, e-mails ou telefones pessoais.
- Inserts públicos de interesse devem passar por função com validação, limites, proteção contra abuso e consentimento; não confiar no estado visual do formulário.
- Não substituir o painel demonstrativo por uma senha em JavaScript ou um modal de login fictício. Bloquear o backend é o que efetivamente protege dados.

## Chaves e segredos

A chave pública/publishable pode estar no frontend **apenas com RLS adequada**. Chaves `service_role`, credenciais SMTP, tokens de WhatsApp Business, segredos de captcha e credenciais de serviços não podem entrar no HTML, JS, repositório público ou LocalStorage. Use segredos do ambiente de servidor/Edge Functions.

## Fotografias e armazenamento

- Upload autenticado para bucket privado de revisão, com limites de tamanho, tipo e quantidade.
- Validar conteúdo real do arquivo no servidor, remover metadados sensíveis, otimizar versões e verificar autorização e correspondência ao imóvel.
- Publicar somente mídia aprovada. URLs assinadas para documentos e imagens privadas; não expor originais sensíveis em bucket público.
- Manter histórico de autorização e revogação; não associar fotos de propriedades diferentes para completar uma galeria.
- Separar os arquivos de cada imóvel por identificador interno, com política que impeça alteração de mídia de anúncios de outro corretor.

## Disponibilidade, visitas e temporada

Disponibilidade real depende de uma fonte autorizada e de regras de negócio validadas no backend. Datas do navegador são apenas interesse até confirmação de responsável ou integração com sistema de reservas.

Se houver reservas reais, usar transações e restrições para impedir sobreposição de datas, validar capacidade/preço/tempo de estadia no servidor e registrar mudanças de estado auditáveis. Pagamentos exigem gateway, checkout seguro, webhooks assinados e idempotência. Não armazenar cartão. Não afirmar reserva confirmada apenas porque o frontend mudou de tela.

## Financiamento e MCMV

Manter a calculadora como estimativa ou integrar somente simuladores oficiais/autorizados com condições atualizadas. Não copiar faixas ou regras de posts antigos e não produzir decisão automática de elegibilidade sem um processo legítimo. Solicitações de documentos exigem infraestrutura e tratamento de dados próprios; não adicionar CPF ou comprovante ao formulário local.

## Plano de conexão

1. Criar esquema versionado/migrations em ambiente de desenvolvimento.
2. Configurar Auth, URLs permitidas, SMTP e papéis sem autoelevação.
3. Implementar políticas RLS e testar anonimamente, com dois usuários e dois corretores atribuídos a imóveis diferentes.
4. Criar Edge Functions para solicitações, publicação, revisão de mídia e operações privilegiadas.
5. Substituir o adaptador LocalStorage por repositório autenticado; manter o modo demo claramente separado da produção.
6. Migrar apenas conteúdo validado. Não transformar exemplos fictícios em anúncios públicos reais por engano.
7. Testar abuso, injeção, IDOR, expiração, exclusão, retenção, limites, falhas de upload, capacidade, horários e logs de auditoria.
8. Revisar segurança, acessibilidade, documentação e conformidade profissional antes do uso comercial.

Nenhuma dessas etapas foi executada ou validada em um serviço real nesta entrega. A implantação exige trabalho adicional; **não é uma integração de “colar uma chave”**.
