# Prévia e procedimento de publicação

**Status: NÃO PUBLICADO.** O projeto está pronto localmente. Aguardando aprovação da prévia.

## O que foi construído

Aplicação independente em `moss-commerce-academy/`, com loja fictícia completa,
checkout em 7 etapas, pagamentos simulados, rastreamento, painel administrativo,
área de tecnologias, laboratório visual do código e formação Front-End Júnior.

## Cartão para o catálogo da MOSS Digital

- **Nome:** Commerce Enterprise Academy
- **Descrição:** "Uma loja virtual completa para conhecer compras, pagamentos, entregas e aprender como a programação funciona por dentro."
- **Botões:** Acessar a loja · Laboratório de programação
- **Arquivo do cartão:** `cartao-demo.html`

## Inspeção do repositório real (sem alterações)

Repositório: `https://github.com/marcelooliveira8052668-cyber/mossdigital` (branch `main`).
Estrutura confirmada pela API do GitHub: pastas independentes de demonstração
(`demos/`, `loja-virtual/`, `academia-pulse/`, `devbook/`, `skillmatch/` etc.),
além de `assets/`, `index.html`, `README.md`, `CNAME`, `sitemap.xml`.

## Procedimento sugerido (após sua aprovação)

1. Copiar a pasta `moss-commerce-academy/` para dentro do repositório da MOSS Digital,
   mantendo-a como diretório independente (por exemplo `demos/commerce-enterprise-academy/`).
2. **Preservar integralmente:** `index.html` principal, `assets/moss-logo-horizontal.webp`,
   depoimentos, menus, demos existentes, `CNAME`, `robots.txt`, `sitemap.xml` e configurações de domínio/HTTPS.
3. **Não substituir** a página inicial nem alterar DNS.
4. Adicionar o cartão (`cartao-demo.html` ou equivalente) à listagem de demos,
   apontando os links para `demos/commerce-enterprise-academy/index.html#/home`
   e `.../index.html#/laboratorio`.
5. Testar no caminho de publicação real antes de divulgar.
6. Somente após sua aprovação da prévia, fazer o commit/publicação.

> Se não houver acesso ao GitHub ou permissão de escrita, este documento serve como
> procedimento. Nada foi publicado e nada alega ter sido publicado.

## Checklist de publicação

- [ ] Prévia aprovada
- [ ] Pasta copiada sem sobrescrever arquivos existentes
- [ ] Logo `moss-logo-horizontal.webp` preservado
- [ ] Cartão adicionado ao catálogo
- [ ] Links relativos testados no caminho publicado
- [ ] Console do navegador sem erros
