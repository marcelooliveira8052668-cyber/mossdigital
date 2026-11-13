# Página inicial unificada — 13/11/2026

Versão aprovada pelo proprietário: marfim e verde-petróleo, menos texto e todas as demonstrações na mesma página.

- Menu com Demos, Serviços e Contato, apontando para seções da home.
- 127 demos preservadas em HTML estático. Seis aparecem inicialmente; o botão mostra mais seis. Busca e categoria abrangem todas, não apenas as que estão na tela.
- Sem JavaScript, as 127 demos e seus detalhes continuam acessíveis.
- Descrições completas dos cards em detalhes expansíveis; orçamento e demonstração mantêm seus destinos anteriores.
- Vídeo aprovado de sete capas preservado, sem autoplay ou download antes da interação.
- Valores de site, currículo, portfólio e livro preservados. Condições de domínio, hospedagem, escopo e entrega acessíveis na página.
- `modelos.html` passa a encaminhar para `/#modelos`, inclusive sem JavaScript. As páginas das demos não são removidas.
- Nenhuma imagem usa o endereço temporário de geração da prévia. As 127 imagens são verificadas por arquivo e carregamento real no navegador.

## Arquivos

- `assets/css/moss-unificada.css`: identidade visual e responsividade.
- `assets/js/moss-unificada.js`: busca, categoria e paginação combinadas.
- `assets/data/catalogo-unificado.json`: inventário dos 127 cards usados nesta publicação.
- `tools/test-home.py`: regressão da página única, fotos, destinos, vídeo, teclado, responsividade e acesso sem JavaScript.
- `tools/test-catalogo-busca.py`: regressão da busca, filtros e paginação da nova home.

A prévia aprovada e seus arquivos de montagem permanecem em `.moss-local/unificacao/`. O backup anterior está em `.moss-local/backup-home-antes-unificacao-20261113/`. Esses diretórios não são publicados.
