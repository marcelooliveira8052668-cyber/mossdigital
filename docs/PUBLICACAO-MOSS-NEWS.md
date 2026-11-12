# Publicação — MOSS News

## Aprovação e escopo

Em 12/11/2026, após abrir e avaliar a versão local no navegador, o proprietário declarou: “ficou top pode publicar, com todas as formalidades, das demos que vão para o site mossdigtal”.

Autorização: publicação desta demo na MOSS Digital, card na home, entrada no catálogo e materiais da entrega. Não abrange postagem automática em redes sociais nem alterações em outras demos.

Trabalho isolado na branch `demo-moss-news-20261112`, a partir de `origin/main`, preservando as alterações locais de Casa Impecável na pasta original. Nenhuma publicação de Casa Impecável faz parte deste escopo.

## Checklist

- [x] Layout próprio revisado pelo proprietário.
- [x] Oito guias educativos com referências e identificação demonstrativa.
- [x] Fotografias distintas de banco conferidas em folha de contato; procedência em `CREDITOS.md`; JPEGs otimizados localmente.
- [x] Vídeo CC0 local e links externos identificados; sem narrativa jornalística inventada.
- [x] Manual do comprador em `demos/moss-news/manual.html` e README.
- [x] Ausência de banco/CMS explicada; integração futura requer projeto, autenticação, RLS e testes, não apenas chave.
- [x] Card com captura própria na home e no catálogo, destino e WhatsApp específicos.
- [x] Metadados de compartilhamento, canonical e favicon; `noindex, follow` consistente com demos, sem inclusão da demo não indexável no sitemap.
- [x] Capa Instagram 1080 × 1350, fonte editável e legenda; cópia de fácil acesso prevista em `../04 - Divulgacao/MOSS News/`.

## Validação

Teste automatizado em Chromium/Playwright, com `tools/test-moss-news.cjs`: aprovado. Oito guias e referências, abertura por Enter, Escape e retorno de foco; busca sem acentos, filtros, atalhos, ausência de resultados, tema persistente, transparência, links diretos e reprodução efetiva do MP4. Sem overflow da página em 320, 375, 390, 768, 1024 e 1440 pixels. Manual acessível, home com dez cards e catálogo com 122, incluindo busca por MOSS News. Capa conferida visualmente e validada em 1080 × 1350. Nenhum erro JavaScript capturado. Não é certificação de acessibilidade nem teste de todos os navegadores.

Comando local: instalar Playwright e Chromium fora da pasta pública, definir `PLAYWRIGHT_MODULE` caso necessário, servir a raiz em `http://127.0.0.1:8770` e executar `node tools/test-moss-news.cjs`.

Destino aprovado: https://mossdigital.com.br/demos/moss-news/. A conferência do deploy deve ocorrer após merge e build do GitHub Pages. A criação de material publicitário não significa postagem em redes sociais.
