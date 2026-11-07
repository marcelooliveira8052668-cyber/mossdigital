# Publicação autorizada da MOSS CONDO

O usuário aprovou a demonstração e autorizou sua publicação, incluindo os commits e pushes necessários. Essa autorização não inclui postagem da capa no Instagram.

## Separação entre fonte e produção

- Repositório: `marcelooliveira8052668-cyber/mossdigital`.
- Fonte didática: branch `feat/moss-condo`, pasta `demos/moss-condo/`.
- Produção: apenas o build compilado e as referências das fotografias em `main`, na pasta `demos/moss-condo/`.
- Endereço: <https://mossdigital.com.br/demos/moss-condo/>.
- Publicação existente do site: GitHub Pages, branch `main`, diretório raiz. Essa configuração não será alterada.

Uma árvore de trabalho separada, criada a partir de `origin/main`, recebe o build. Assim, o `index.html` de desenvolvimento e os comentários didáticos permanecem preservados na branch de fontes. Não se deve mesclar integralmente a branch de fontes sobre `main`, pois isso substituiria o HTML compilado pelo HTML de desenvolvimento.

## Escopo estrito

Somente arquivos dentro de `demos/moss-condo/` foram enviados à branch publicada. `index.html` da MOSS Digital, `sistemas.html`, outras demos, logotipos, CNAME, configurações globais e diretórios não rastreados não fazem parte dessa publicação.

O cartão continua preparado, mas não integrado ao catálogo. A postagem em redes sociais exige autorização separada.

## Preparação reproduzível

Na pasta de fontes da demo:

```powershell
npm run build
npm test
python tools/prepare_release.py CAMINHO_DO_WORKTREE
```

`prepare_release.py` exige um destino explícito, copia para uma pasta nova e recusa sobrescrever arquivos existentes. Ele não faz commit nem push.

Antes do commit de produção, revisar `git diff --cached --name-only` e confirmar que todos os arquivos pertencem exclusivamente à nova demo. O envio para `main` deve ser normal, sem force push; se houver alteração remota concorrente, parar e revisar antes de continuar.

Após o GitHub Pages concluir a implantação, conferir o HTML público, os arquivos JavaScript/CSS, as fotografias, os três perfis e a atualização das rotas com hash. O envio ao GitHub não é, sozinho, confirmação de que o endereço público já está funcionando.

## Resultado confirmado

- Commit de produção: `3f2dad20a7a3fcf01af5bafbfcaa6b74c9eab6d8`.
- Fontes iniciais preservadas: `484a204`, branch `feat/moss-condo`.
- GitHub Pages concluído com sucesso: <https://github.com/marcelooliveira8052668-cyber/mossdigital/actions/runs/42373071281>.
- Resposta HTTPS pública: HTTP 200.
- `python tests/publication_check.py`: aprovado no endereço público, verificando entrada, fotografia principal, galeria, três perfis, atualização de rota e navegação móvel.
- Nenhuma resposta HTTP de erro dos arquivos da demo nem erro JavaScript durante essa verificação.
- Catálogo de sistemas preservado: o acesso publicado é pelo link direto, ainda sem cartão em `sistemas.html`.

Na comparação entre `32c10ed` e `3f2dad2`, todas as 37 adições pertencem exclusivamente à nova pasta `demos/moss-condo/`. Nenhum arquivo anterior foi modificado ou excluído.

## Integração posterior ao catálogo, também autorizada

Depois de publicar a demo isolada, o usuário autorizou expressamente adicionar seu cartão e publicar a integração. Essa segunda etapa foi concluída no commit `883ef3ae0e7c52203d8a4f508dc6b063f922ee84`, alterando apenas `sistemas.html` e adicionando `assets/img/previas/moss-condo.webp`.

- Catálogo: <https://mossdigital.com.br/sistemas.html>.
- Implantação concluída: <https://github.com/marcelooliveira8052668-cyber/mossdigital/actions/runs/42373811210>.
- Verificação pública: `tests/portfolio_check.py` aprovado, incluindo imagem válida, texto, link em nova aba, responsividade e preservação exata de todos os cartões anteriores.
- A capa de Instagram não foi postada.

As observações de “catálogo preservado” nas seções anteriores descrevem a primeira publicação isolada. A autorização posterior permitiu acrescentar somente o cartão da MOSS CONDO, sem redesenhar a página ou modificar os outros sistemas.
