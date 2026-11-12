# VIVA Prime Imóveis

**“O lugar perfeito para sua próxima história.”**

Demonstração independente de portal imobiliário em HTML5, CSS3 e JavaScript puro, criada para avaliação. **Publicação autorizada explicitamente pelo proprietário em 12/11/2026, com a mensagem “pode publicar”.** Endereço: <https://mossdigital.com.br/demos/viva-prime/>. A autorização cobre o site e o catálogo; a postagem no Instagram continua exigindo aprovação própria.

## Abrir

Na raiz `mossdigital`:

```powershell
python -m http.server 8931 --bind 127.0.0.1
```

Abra <http://127.0.0.1:8931/demos/viva-prime/>. Se esta porta já estiver em uso, aproveite o servidor existente ou escolha outra. O site não depende de Python: é hospedável como arquivos estáticos, sem build, frameworks, bibliotecas ou fontes externas. Também funciona por abertura direta de `index.html`, com limitações do navegador para clipboard e LocalStorage em arquivos locais.

## Páginas

| Arquivo | Conteúdo |
| --- | --- |
| `index.html` | Home editorial com busca integrada, destaques assimétricos, coleções, MCMV, praia/campo, oportunidades e depoimentos fictícios |
| `imoveis.html` | Busca completa e ordenação, com estados vazios e preferências opcionais |
| `imovel.html?id=VP-101` | Página individual dinâmica por código, galeria identificada, características, despesas e prévias de interesse |
| `favoritos.html` | Favoritos persistentes e seleção para comparação |
| `luxo.html` | VIVA Collection, apresentação diferenciada de alto padrão |
| `minha-casa.html` | Informação MCMV responsável e busca de sinalizações para consulta |
| `corretores.html` | Equipe fictícia, retratos ilustrativos e contatos configuráveis |
| `anuncie.html` | Formulário com prévia, consentimento e nenhum envio por padrão |
| `simulador.html` | Calculadora Price meramente matemática, com taxa informada pelo visitante |
| `sobre.html` | Conceito e transparência da marca fictícia |
| `contato.html` | Prévia de conversa, sem endereço, mapa ou telefone inventados |
| `admin.html` | Gestão demonstrativa local, **sem autenticação ou segurança de produção** |

## O que funciona

- Doze anúncios fictícios diversificados entre venda, aluguel residencial e temporada.
- Vinte e oito tipologias cadastráveis nos três grupos (nem todas possuem um exemplar inicial).
- Filtros combinados de finalidade, cidade, região/bairro, tipologia, preço, quartos, banheiros, vagas, área, terreno, animais informados, piscina, churrasqueira, mobiliado, praia, condomínio fechado, vista, condição e coleções.
- Temporada: capacidade e período de interesse, com calendário nativo, validação de datas e nenhuma confirmação de disponibilidade.
- Ordenação por destaques, menor/maior preço nominal, maior área e mais recentes. Mensagens para filtros inválidos e resultados vazios.
- Favoritos em LocalStorage. Comparação de até três anúncios com tabela rolável e bases de preço explícitas.
- Páginas específicas por código, custos ilustrativos, semelhantes da mesma finalidade, carrossel/miniaturas e lightbox de espaços fotográficos.
- Referência arquitetônica de banco separada da galeria real ainda não cadastrada.
- Mensagem de interesse ou visita com código e link do anúncio. WhatsApp desabilitado até configurar número autorizado.
- Prévia de anúncio do proprietário, sem upload, publicação, transmissão de fotografias ou armazenamento de contatos.
- Cálculo Price com taxa anual **efetiva** convertida à mensal equivalente; tratamento correto para juros zero e entrada inválida.
- Painel local com cadastro, edição, valores, status, organização dos espaços fotográficos, exclusão, restauração e perfis de corretores. Interessados exibidos são exemplos fixos identificados, não mensagens recebidas.
- Alternativa em memória e aviso se LocalStorage estiver indisponível. Limpeza restrita às chaves desta demo, sem apagar dados de outros projetos.

## Fotografias — regra essencial desta entrega

**Não foi obtida comprovação de conjuntos autorizados de 4–5 fotos do mesmo imóvel. Não se afirma essa correspondência.**

Conforme a alternativa expressamente autorizada no briefing:

1. Cada anúncio tem **cinco espaços identificados para fotos reais**, com carrossel, miniaturas e lightbox funcionais.
2. Uma referência arquitetônica licenciada de banco aparece separada e rotulada: **não é foto do imóvel anunciado**.
3. As imagens ilustram o segmento e não comprovam fachada, planta, acabamento, paisagem, vista ou proximidade com praia de nenhum anúncio.
4. Nenhuma sequência de propriedades diferentes foi apresentada como galeria de um único imóvel.

Para uso comercial, o proprietário/corretor deve fornecer fotos autorizadas, do mesmo imóvel, com correspondência verificada a cada ambiente. Será necessário adaptar o renderizador para fotos reais e registrar autorização, origem, legenda e data. O painel não faz upload nem valida propriedade de imagens.

Fontes e licença: `FONTES-FOTOS.json`. Banco: Pexels, <https://www.pexels.com/license/>. Conferência visual: `tools/conferencia-fotos.jpg`. Retratos também são de banco e não representam profissionais reais da marca. A licença não implica endosso das pessoas ou dos proprietários fotografados.

## Personalizar

- **Marca, slogan, contato geral e fonte oficial MCMV:** `js/data.js`, objeto `config`.
- **Anúncios:** lista `listings` no mesmo arquivo. Campos comuns em `defaults`; cinco espaços fotográficos por anúncio em `gallery()`.
- **Tipologias:** objeto `types` em três grupos. Todas as opções aparecem nos filtros e no editor, ainda que a busca retorne zero.
- **Equipe:** `brokers`, sem CRECI inventado ou WhatsApp real por padrão.
- **Estilo:** variáveis em `:root`, em `css/style.css`. Tipografia de sistema Georgia/Arial, sem download de fontes proprietárias.
- **Comportamentos públicos:** `js/app.js`. Os dados editáveis são inseridos como texto, não HTML.
- **Painel:** `js/admin.js`. Rascunhos e anúncios ocultos não aparecem na vitrine local. O estado `demo` significa somente “visível como demonstração”, nunca disponibilidade real.
- **Cabeçalho/rodapé/diálogos:** modelos editoriais fixos no início de `js/app.js`.
- **Cidades e bairros:** campos dos anúncios; regiões iniciais são ilustrativas e não têm coordenadas verificadas. Não adicionar mapa sem localização verdadeira e autorização.
- **Valores:** preço de compra é total; aluguel é mensal; temporada é diária. Condomínio e IPTU têm suas bases identificadas. Na comparação de finalidades diferentes, os números nominais não são equivalentes.

### WhatsApp

`config.whatsapp` está vazio. Para habilitar encaminhamento, preencher somente um número autorizado em formato internacional com 10–15 dígitos, sem espaços ou `+`. Contatos individuais podem ser configurados nos perfis. A interface prepara uma mensagem, mostra o conteúdo e só oferece abrir o serviço externo depois de ação explícita. Não há envio automático, automação de atendimento ou agendamento confirmado.

Não usar o número da MOSS Digital como se fosse um corretor real desta marca fictícia.

## Dados locais e privacidade

Prefixo exclusivo: `viva-prime-demo-v1:`.

- `favorites`: códigos dos favoritos.
- `compare`: até três códigos de anúncios.
- `preferences`: somente filtros e ordenação, quando o visitante marca a opção de lembrar.
- `listings`: catálogo fictício editado no painel local.
- `brokers`: perfis demonstrativos editados no painel.

Formulários de contato, visita e anúncio não gravam dados pessoais em LocalStorage nem os enviam a servidor. São prévias em memória. Não use dados reais, CPF, documentos ou comprovantes. Limpar favoritos, preferências ou restaurar catálogo afeta somente a chave correspondente, não o armazenamento inteiro. Não há conta, sincronização, autenticação, pagamento ou banco conectado.

Um servidor de hospedagem pode manter logs técnicos. Links oficiais e abertura explícita de WhatsApp envolvem serviços externos com suas próprias políticas. Para operação real, elaborar política LGPD e implantar base legal, controle de acesso, retenção e exclusão de dados.

## MCMV e financiamento

Fonte oficial consultada em 12/11/2026:
<https://www.gov.br/cidades/pt-br/acesso-a-informacao/acoes-e-programas/habitacao/programa-minha-casa-minha-vida>

Sem faixas de renda, juros oficiais, subsídios ou critérios de aprovação inventados. A marca não tem vínculo institucional com o programa. Sinalização `mcmv` significa **somente consultar enquadramento**, nunca elegibilidade comprovada. Regras vigentes, análise financeira e condições da operação devem ser verificadas nos canais oficiais.

O simulador é uma conta matemática Price, não uma simulação bancária. Não inclui seguros, tarifas, impostos, correção ou custos adicionais, nem determina aprovação. Taxa anual efetiva é preenchida pelo usuário; nenhuma taxa bancária é prometida. A entrada inicialmente sugerida na tela é mero exemplo de preenchimento, não regra de crédito.

## Backend e autenticação futuros

Não há banco configurado ou integração real nesta entrega. Ver `docs/INTEGRACAO-REAL.md` para os pré-requisitos e arquitetura de uma evolução com Supabase. Não basta colar uma chave: são necessários esquema, autenticação, permissões, RLS, armazenamento, validações, políticas e testes de segurança.

## Testes

Ferramentas de desenvolvimento opcionais: Python, Pillow, Playwright com Microsoft Edge instalado. Não são dependências do site final.

```powershell
python demos/viva-prime/tools/test_demo.py
```

O teste cria servidor temporário e navega por treze rotas, incluindo doze códigos individuais, filtros, datas, favoritos, comparação, cálculo, formulários e CRUD local. Testa quatro larguras, teclado, menu aderente, imagens, ausência de 404/erros JavaScript/POST e persistência bloqueada. Capturas e relatório ficam em `.moss-local/viva-prime/`.

Conferir também dispositivos físicos, zoom de 200%, leitor de tela e browsers de destino antes de uma implantação comercial. Não se afirma certificação WCAG por testes automatizados.

## Capa e catálogo — publicados

- Fonte HTML editável, PNG 1080 × 1350, captura e legenda: `divulgacao/instagram/viva-prime/`.
- Cópia fácil: `../04 - Divulgacao/VIVA Prime Imoveis/`.
- Card e entrada de catálogo aplicados na home e no catálogo da versão publicada.
- Endereço publicado: <https://mossdigital.com.br/demos/viva-prime/>. Conferir o endereço no navegador antes de divulgar a arte.
- A criação da arte não autoriza postagem em redes sociais.

## Publicação realizada em 12/11/2026

1. Obter aprovação explícita da VIVA Prime, separada das outras demos.
2. Hospedar `demos/viva-prime/` em serviço estático HTTPS com MIME correto para WebP/SVG/JS. Sem build.
3. Conferir todos os caminhos, parâmetros de anúncio, mídia, privacidade e contatos no endereço real.
4. Aplicar os cards preparados à home e catálogo sem incluir mudanças não relacionadas.
5. Só substituir a marca fictícia e anunciar imóveis reais com documentação, CRECI pertinente, dados verdadeiros, autorização de imagem e infraestrutura segura.

## Preferências e limites do briefing recebido

- Identidade editorial própria em verde-petróleo, bege e champanhe; não reaproveitar o layout da academia.
- Fotografias de um mesmo imóvel só podem ser agrupadas quando houver comprovação; caso contrário, espaços identificados.
- Galerias, equipe, anúncios, preços e características claramente demonstrativos.
- Uma demo de cada vez, apresentação para análise antes de publicar e capa de Instagram incluída.
- O texto recebido terminou em **“17. Outras funcionalidades — Adicionar”**. A implementação atende aos requisitos completos recebidos até o item 16; a continuação pode ser incorporada depois, sem inventar requisitos ausentes.
