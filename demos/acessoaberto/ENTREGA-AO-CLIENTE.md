# Entrega — acesso aberto | Guia de Acessibilidade Urbana

## O que está pronto
- Layout próprio, responsivo, sem bibliotecas ou serviços pagos obrigatórios.
- Ilustrações SVG autorais, ícone e identidade visual.
- Catálogo legível mesmo sem JavaScript; filtros e estados vazios funcionais com JavaScript.
- Ferramenta de planejamento específica do segmento; resumo em texto, cópia e impressão.
- Formulário validado que prepara WhatsApp para a MOSS, sem envio automático.
- Páginas independentes de privacidade e termos.
- Navegação por teclado, foco visível, menu móvel com Escape e preferência por menos movimento.
- Sem rastreamento de marketing, geolocalização automática ou armazenamento persistente.
- `index.html` comentado em primeira pessoa; CSS e JS com comentários de organização.

## Como abrir e editar
Abra `index.html` no navegador. O pacote funciona por arquivo local; cópia de texto pode ser bloqueada pelo navegador, com download como alternativa. Para testar como site, execute `python -m http.server 8080` nesta pasta e abra http://localhost:8080/.

- `index.html`: estrutura e conteúdo inicial do catálogo.
- `assets/site.css`: identidade visual e versão móvel.
- `assets/data.js`: dados usados pelos filtros e cálculos. Ao alterar itens, atualize também os cards estáticos do HTML.
- `assets/app.js`: comportamento. Não é necessário configurar tokens ou chaves.
- `assets/hero.svg` e `assets/favicon.svg`: arte e ícone.
- `privacidade.html` e `termos.html`: textos-base que exigem revisão para a operação real.
- `404.html`: página de erro pronta para configurar como resposta 404 na hospedagem final; não altera sozinha a configuração do servidor da MOSS.

## Limites de demonstração
Todos os dados são fictícios. Não há backend, painel administrativo, login, pagamento, agenda sincronizada ou confirmação de disponibilidade. Planos e cesta existem apenas em memória nesta aba e são apagados ao atualizar a página. As mensagens abrem o WhatsApp da MOSS, não uma entidade fictícia. O contato demonstrativo é 5511942038103; deve ser confirmado antes de compartilhar ou substituído na entrega.

## Checklist obrigatório de implantação
- [ ] Aprovar nome, marca, cores, textos, fotos autorizadas e responsável legal.
- [ ] Substituir todos os dados fictícios por dados verificados e definir quem os atualiza.
- [ ] Validar regras do segmento: aceitação de resíduos, supervisão de voluntariado, rótulos/alergênicos, locação de salas ou recursos de acessibilidade, conforme o projeto.
- [ ] Configurar telefone, e-mail e canal real; retirar referências à MOSS como destinatário se não aplicáveis.
- [ ] Escolher se a operação será manual por WhatsApp ou terá backend. Definir escopo, custos e suporte dessas integrações separadamente.
- [ ] Se houver backend, implementar autenticação, controle de acesso, validação no servidor, segurança, backups e tratamento de erros. Nunca expor chaves privadas no navegador.
- [ ] Adaptar políticas à operação real, incluindo finalidade, base legal, retenção, atendimento a direitos e condições comerciais. Obter revisão jurídica quando necessária.
- [ ] Verificar nomes, horários, endereços, capacidades, preços, estoques e recursos. Nunca publicar um endereço de exemplo como real.
- [ ] Configurar domínio e HTTPS. Testar formulários, links externos, downloads e navegação com teclado e celular.
- [ ] Configurar a resposta 404 da hospedagem e ajustar URLs absolutas das imagens sociais para o domínio final.
- [ ] Auditar acessibilidade, contraste, conteúdo alternativo e desempenho na implantação final; não presumir certificação.
- [ ] A demo usa `noindex`. Somente no site real aprovado: remover `noindex`, definir canonical absoluto, imagem social absoluta e dados estruturados verdadeiros quando aplicáveis.
- [ ] Criar sitemap e robots apropriados ao domínio final e verificar Search Console do cliente. Não pedir indexação desta demo fictícia.
- [ ] Entregar arquivos, acessos de hospedagem e domínio pelo canal seguro apropriado; treinar o responsável e combinar suporte, manutenção e atualização de dados.

## Testes de aceite
1. Abrir em 390 px e 1280 px sem rolagem horizontal inesperada.
2. Navegar por Tab, abrir o menu e fechar com Escape.
3. Buscar termo inexistente, observar estado vazio e limpar filtros.
4. Adicionar/remover itens ou calcular uma estimativa válida; testar entradas inválidas.
5. Copiar/baixar o plano, imprimir e limpar a seleção.
6. Verificar que nenhum dado é enviado ou salvo sem ação e que os avisos de demonstração continuam visíveis.
7. Testar políticas e contato sem enviar mensagens reais durante a homologação.

## Hospedagem prevista na MOSS
`https://mossdigital.com.br/demos/acessoaberto/index.html`
Este endereço só estará disponível após publicação. Arquivos desta pasta local e a cópia publicada precisam ser sincronizados em futuras alterações.
