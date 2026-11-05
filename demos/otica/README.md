# Lumina Ótica — demonstração de site para ótica

Marca fictícia, não uma ótica em funcionamento. Não há loja, estoque, venda, receita, exame de vista ou atendimento real por trás desta página. Os preços do catálogo são ilustrativos e estão marcados como valores de demonstração.

- Coleção de sete armações com filtro entre óculos de grau e de sol.
- Guia de estilo por formato de rosto, com sugestões apenas de apresentação.
- Seção de lentes ilustrativa, sem cálculo de grau, exame ou recomendação de lente.
- Lista de prova gerada localmente a partir de três perguntas. Copiável e baixável em TXT.
- Respostas não são enviadas nem armazenadas. Não há CPF, telefone, e-mail, documento, senha, pagamento, upload, autenticação ou banco de dados.
- O WhatsApp final é exclusivamente da MOSS Digital, para contratar o desenvolvimento do site, não para comprar óculos. A mensagem só é enviada quando o visitante confirmar no WhatsApp externo.
- Sem JavaScript: coleção, lentes e dúvidas permanecem disponíveis; os controles interativos ficam desabilitados.
- Armações do catálogo em ilustrações autorais SVG (`assets/arm-*.svg`). Foto ilustrativa real no destaque, hospedada localmente, sem fontes externas nem análise de visitantes.
- Foto do destaque: [Fashion-sunglasses-summer-eyewear](https://commons.wikimedia.org/wiki/File:Fashion-sunglasses-summer-eyewear_(24326655305).jpg), por Pixel.la / Wikimedia Commons, licença CC0. Não representa produto ou loja reais.

## Conteúdo ilustrativo

- As sugestões de armação por formato de rosto são dicas de estilo comuns no varejo. Não são avaliação oftalmológica, optométrica ou recomendação clínica.
- A página não mede a vista, não calcula grau e não indica lentes. O grau vem de receita emitida por profissional habilitado.
- Nomes, modelos e preços são fictícios, criados para demonstração.

## Experimentar

Abra pelo servidor local na raiz do repositório: `python -m http.server 8769 --bind 127.0.0.1`, depois acesse `/demos/otica/`.

- Filtre a coleção por grau, sol ou todos.
- Escolha finalidade, formato do rosto e preferência de armação e gere a lista de prova.
- Copie o resumo ou baixe em TXT. A ação de WhatsApp exige a página de contato da MOSS Digital e nunca envia a mensagem automaticamente.

## Arquivos de divulgação

- Fonte editável da capa: `divulgacao/instagram/otica/Capa Instagram.html`.
- Legenda e instruções: `divulgacao/instagram/otica/LEGENDA E INSTRUCOES.txt`.
- PNG de 1080 × 1350 e cópia para `../04 - Divulgacao/` gerados por:
  `python tools/render-demo-cover.py --slug otica --page demos/otica/index.html --output "../04 - Divulgacao/Otica - Demonstracao"`.

Criar a capa faz parte da entrega, mas não implica autorização para publicar a demo nem postar nas redes. Publicação depende de aprovação.
