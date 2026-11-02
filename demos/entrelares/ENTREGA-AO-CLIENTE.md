# EntreLares — entrega e implantação

## O que este projeto é

Site demonstrativo para encontrar um trabalhador em casa — diarista, passadeira, cozinheira, organização e auxiliar doméstico — com uma agência fictícia conduzindo a seleção e o cliente contratando diretamente o profissional. Não é empresa de equipe própria, marketplace, agência real ou plataforma de contratação automática.

## Arquivos e edição

- `index.html`: vitrine, categorias e dois formulários guiados. Cada linha lógica tem comentário em primeira pessoa.
- `assets/site.css`: layout, versão móvel, foco e impressão.
- `assets/data.js`: categorias usadas pelos filtros e formulários. Ao editar categorias, atualize também os cartões estáticos no HTML.
- `assets/app.js`: filtros, validação, etapas, resumos e contato. Sem bibliotecas ou servidor.
- `assets/hero.svg`: ilustração original; sem fotos de trabalhadores fictícios.
- `privacidade.html` e `termos.html`: textos-base para revisão da operação real.
- `implantacao.html`: este guia em formato legível no navegador.
- `DADOS-DO-CLIENTE.txt`: roteiro de informações a solicitar.
- `VALIDACAO-COMERCIAL.txt`: roteiro para validar o interesse de agências antes de prometer demanda.

Abra index.html diretamente ou execute `python -m http.server 8080` nesta pasta. Não há instalação obrigatória. Com JavaScript desativado, categorias, textos e documentos continuam disponíveis; os formulários ficam desabilitados para não enviar dados por URL.

## Recursos funcionais da demo

1. Seis categorias com busca sem distinção de acentos, filtro por ambiente e estado vazio.
2. Botão por categoria preenche o ambiente e a atividade na jornada de contratação.
3. Caminho Preciso contratar: contexto, preferências e revisão.
4. Caminho Quero trabalhar: experiência, disponibilidade e revisão.
5. Validação por etapa, campos identificados, erro anunciado e foco no campo relevante.
6. Resumo como texto seguro, sem inserir respostas como HTML.
7. Cópia, download TXT e impressão com aviso de demonstração.
8. Aceite explícito antes do link ao WhatsApp da MOSS; a mensagem precisa ser revisada e enviada no serviço externo.
9. Exemplos fictícios para testar e limpeza independente de cada formulário com confirmação.
10. Sem cookies de publicidade, analytics, geolocalização, banco de currículos ou armazenamento persistente pelo aplicativo.

## O que não existe

Não há candidatos cadastrados, vagas, contratação, seleção executada, disponibilidade verificada, análise de currículos, envio automático, referência checada, pagamentos, agendamento ou login. Não há backend, banco de dados, painel de agência ou acompanhamento multiusuário. Cópia e downloads não são cadastro. Os rascunhos não são recuperados pelo aplicativo após recarregar; o navegador pode ter recursos próprios de restauração/preenchimento.

Não oferecemos segurança privada, vigilância, serviços de saúde, atividades de risco ou contratação de menores. A recepção não deve ser apresentada como segurança. O modelo não determina vínculo ou afasta obrigações trabalhistas. Revisão jurídica e contábil são necessárias para a atuação real.

## Antes de entregar ao cliente final

- [ ] Definir se a empresa realmente atua com recrutamento e seleção e contratação direta pelo cliente. Se fornecer equipe própria, reformular operação, contratos e site.
- [ ] Confirmar responsável, identificação comercial, CNPJ e informações exigíveis, contatos, marca, domínio e regiões efetivamente atendidas.
- [ ] Substituir a marca e os textos fictícios por informações aprovadas; usar apenas imagens autorizadas.
- [ ] Definir categorias, tarefas, critérios relacionados à atividade e o que está fora do escopo.
- [ ] Definir preço do serviço da agência, quem paga, etapas, condições de cancelamento e eventual reposição. Não inventar garantias ou prazos.
- [ ] Definir como a seleção será realizada, quem responde por ela e como referências e documentos serão tratados.
- [ ] Substituir o número 5511942038103 e todas as referências à MOSS como destinatário pelos canais aprovados, quando aplicável.
- [ ] Adaptar o aceite, a privacidade e os termos. Não manter um texto que descreve dados fictícios se a operação passar a receber dados reais.
- [ ] Definir finalidade, base legal, minimização, retenção, direitos e segurança antes de coletar dados de candidatos. Não presumir que um checkbox resolve a LGPD.
- [ ] Não publicar currículos, documentos, contatos de referências ou perfis de candidatos sem avaliação de necessidade, direitos e proteção adequada.
- [ ] Para currículos privados, gestão de candidatos, agenda, pagamentos ou login: contratar backend, autenticação, autorização, armazenamento seguro e backups como escopo próprio.
- [ ] Fazer revisão jurídica/contábil do modelo, contratos e obrigações. Não oferecer serviços regulados sem estrutura adequada.
- [ ] Configurar domínio, HTTPS, contatos, imagem social absoluta e metadados verdadeiros. Só remover noindex no site real aprovado; manter a demo fictícia fora do sitemap público.
- [ ] Testar filtros, etapas, erros, links, downloads, impressão, teclado e telas pequenas. Auditar acessibilidade e segurança antes de afirmar conformidade.
- [ ] Obter aprovação escrita do conteúdo e do escopo; entregar acessos por canal seguro e combinar suporte, atualização e manutenção.

## Como vender com clareza

Site personalizado para quem precisa de um trabalhador em casa: apresentar os serviços, captar pedidos e explicar a seleção, com atendimento humano. Não vender como banco de currículos, intermediação automática ou promessa de profissionais disponíveis. Domínio, hospedagem, manutenção e integrações devem ter condições explícitas.

## Atendimento e direitos

Não fazer filtros ou exigências discriminatórias. Não solicitar documentos, dados de saúde ou antecedentes indiscriminadamente. Procedimentos reais devem ser proporcionais, adequados à atividade e juridicamente revisados. A contratação doméstica e a contratação para uma empresa não são o mesmo enquadramento.
