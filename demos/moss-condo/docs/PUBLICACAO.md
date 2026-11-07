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

Somente arquivos dentro de `demos/moss-condo/` serão enviados à branch publicada. `index.html` da MOSS Digital, `sistemas.html`, outras demos, logotipos, CNAME, configurações globais e diretórios não rastreados não fazem parte dessa publicação.

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
