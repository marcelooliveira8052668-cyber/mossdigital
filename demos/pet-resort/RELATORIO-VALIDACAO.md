# Relatório de validação — MOSS Digital (59–63)

## Entrega
- Cinco projetos independentes e com estruturas visuais distintas.
- Nenhuma fotografia final baixada ou criada. Fotos previstas e documentadas em cada `FOTOS-PARA-OPENCODE.md`.
- WhatsApp autorizado: (11) 94203-8103.
- Valores, estabelecimentos, catálogo de filmes e preços totalmente fictícios.
- Não há integração operacional com pagamentos, banco de dados, serviços de streaming ou reservas reais.

## Verificações técnicas executadas
- `node --check` nos cinco scripts: aprovado.
- HTML inspecionado por parser: IDs sem repetição, âncoras internas presentes, caminhos de CSS/JS e pastas corretos.
- Chromium automatizado com HTML, CSS e JS embutidos na página de teste: 5 demos × 2 viewports (1366 px e 390 px) = **10 verificações de tela**.
- Nenhum erro de JavaScript, rolagem horizontal ou imagem de placeholder quebrada nessas verificações.
- Interações exercitadas: busca/filtros/favoritos, sacola, validação do formulário de visita, montagem de sorvetes com limite de sabores e cálculo, e escolha do plano semanal.
- Mensagens WhatsApp das cinco demos verificadas com destino `5511942038103` (simulação de abertura, sem envio).
- Menus móveis das cinco demos testados: abrir, mostrar navegação e fechar após selecionar item.

## Limitações da verificação
O ambiente bloqueou o Chromium de abrir `file:///.../index.html` diretamente. Foram realizados testes com os arquivos injetados em uma página controlada, o que comprova as interações testadas, mas **não** verifica a abertura normal no Edge, a persistência do `localStorage` nem o carregamento de futuras fotografias reais.

## Pendências antes de apresentação/publicação comercial
1. Adicionar fotografias reais com direitos verificados (sem usar pôsteres protegidos de filmes).
2. Confirmar a identidade e as necessidades do cliente real; trocar preços e informações fictícias.
3. Verificar visualmente cada pasta extraída no Edge e no celular.
4. Testar e confirmar cada link, formulário e cenário, inclusive `localStorage` quando aplicável.
5. Para Casa Acolher, verificar licenças, serviços autorizados e linguagem com a instituição.
6. Autorizar explicitamente qualquer publicação no GitHub/site oficial.

## Status
**Estrutura funcional revisada em testes controlados; fotos, revisão real e publicação pendentes.**
