# MOSS News — versão profissional demonstrativa

## Abrir

Abra `index.html` no navegador. Não requer instalação. HTML, CSS, JavaScript, fotos e vídeo estão incluídos; a leitura e o vídeo demonstrativo funcionam offline. Os links para fontes e canais de vídeo exigem internet.

Se preferir a visualização por servidor local, nesta pasta execute `python -m http.server 8765 --bind 127.0.0.1` e acesse http://127.0.0.1:8765/.

## O que foi entregue

- Identidade editorial azul e amarela compatível com a MOSS Digital.
- Destaques fotográficos, editorias, atalhos de assunto e busca sem diferenciar acentos.
- Oito guias completos, com explicações, checklists e referências institucionais.
- Leitura em janela acessível, navegação por teclado e links diretos para guias.
- Tema claro/escuro com preferência local opcional.
- Um vídeo demonstrativo local com controles; links para canais oficiais NASA e Sebrae.
- Compartilhamento nativo ou cópia, quando o navegador permitir. Arquivos locais não são apresentados como links públicos.
- Informações sobre privacidade, fontes e materiais; nenhum cadastro fictício ou métrica inventada.
- Prévia de desktop e celular em PNG, quando incluídas na entrega.

## Avaliação do original

O arquivo em Downloads é uma base funcional de demonstração: layout responsivo, busca, filtro, leitura em modal e escape de HTML. Entretanto, os nove textos são fictícios, curtos e sem apuração; as imagens são emojis; não há vídeos nem estrutura de produção editorial. Não é adequado publicá-lo como jornal de notícias reais. Tem potencial como modelo de portal para o catálogo MOSS.

A nova versão é indicada para **apresentação ao cliente como modelo de portal informativo**, após sua revisão e aprovação. A escolha de guias educativos evita transformar conteúdo inventado em suposta notícia. Não foi conectado um feed de notícias ou CMS e não existe atualização automática.

## Antes de publicar na MOSS Digital

1. Aprovar textos, identidade e materiais; revisar as permissões de uso e preferir fotos próprias quando possível. Ver `CREDITOS.md`.
2. Definir se será demonstração comercial ou portal real. Para notícias, implementar fontes autorizadas, autores, datas reais, revisão e rotina de atualização.
3. Revisar textos de saúde, finanças e direito com profissionais adequados ao uso pretendido.
4. Definir o endereço definitivo. Esta versão usa `noindex, nofollow` para não indexar inadvertidamente um protótipo; configurar SEO, canonical, metadados de compartilhamento e sitemap conforme a publicação aprovada.
5. Para integração futura, copiar esta pasta para uma rota aprovada, como `/moss-news/`, e adicionar um link ao catálogo. Nenhum arquivo do site existente foi alterado.
6. Rever política de privacidade e dados do responsável conforme hospedagem, analytics ou formulários que forem efetivamente usados.
7. Testar no servidor definitivo, inclusive links externos, reprodução de vídeo e compartilhamento em HTTPS. O servidor deve servir MP4 com suporte adequado a requisições parciais.

## Editar

- `articles.js`: conteúdo, categorias, referências e fotos de cada guia.
- `app.js`: busca, filtros, leitura, compartilhamento e tema.
- `styles.css`: identidade e comportamento responsivo.
- `index.html`: estrutura, vídeos, apresentação e transparência.
- `assets/`: arquivos locais de mídia.

O original em Downloads e o projeto existente MOSS Digital foram preservados. Esta entrega não foi publicada na internet.
