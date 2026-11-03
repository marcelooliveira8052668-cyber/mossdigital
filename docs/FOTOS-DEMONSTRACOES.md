# Fotografias reais nas demonstrações

## Escopo desta atualização

- Fotografias reais ilustrativas nos cartões de entrada de 15 modelos que ainda usavam desenhos ou capturas predominantemente ilustradas.
- Fotografias dentro das respectivas demos: floricultura, casamento, contabilidade, EntreLares, coworking, feira, reciclagem, voluntariado, acessibilidade, tatuagem, assistência técnica, fretes, festas, bar e Restaurante 360.
- Logotipos, ícones de interface e diagramas funcionais são preservados. O guia `estrutura.html` continua sem fotos, conforme sua finalidade explicativa. Aplicativos e jogos mantêm capturas de suas interfaces.
- Não foram alterados preços, regras de negócio, contatos ou fluxos de envio. Foram corrigidos dois transbordamentos antigos em telas de 320 px nos modelos de tatuagem e fretes.

## Origem e licença

35 fotos selecionadas no Pexels. A licença foi consultada em <https://www.pexels.com/license/>. Arquivos e identificadores de origem estão em `assets/img/demo-photos/manifest.json`; a página `fontes.html` na mesma pasta apresenta os links ao visitante.

As imagens são referências, não fotos de clientes, profissionais cadastrados, equipes, veículos, locais, produtos ou trabalhos das marcas fictícias. Não devem sugerir endosso das pessoas retratadas. Fotos de sinalização não certificam a acessibilidade de um local. A foto de um buquê não reproduz exatamente a montagem selecionada.

As fotos não fazem parte dos logotipos. Em uma entrega real, confirmar autorização e substituir por material próprio do cliente conforme necessário. A licença de banco não substitui a revisão de eventuais direitos de pessoas, marcas e obras retratadas.

## Arquivos e funcionamento

- Originais otimizados em WebP e miniaturas de 800 × 500 em `assets/img/demo-photos/cards/`.
- `assets/js/demo-photos.js` aplica as fotos nos modelos antigos e nos cartões sem mexer nos formulários. `demo-photos.css` trata somente os elementos convertidos e os avisos de fonte.
- As três demos novas têm fotografias principais no HTML; a prévia de flores acompanha a escolha no montador.
- Se o manifesto não carregar, os modelos antigos preservam suas ilustrações como alternativa. Para visualizar a versão com fotos localmente, usar servidor HTTP, não abrir o HTML diretamente como arquivo.
- `DEMOS.json` lista os 15 destinos revisados.

## Capas e revisão

Cada uma das 15 demos recebeu uma nova capa PNG de 1080 × 1350 e uma legenda em `divulgacao/instagram/fotos-reais/`. A fonte editável comum é `Capa Instagram.html?demo=IDENTIFICADOR`. Os PNGs e legendas também são copiados para `04 - Divulgacao/Demos com fotos reais/`, fora do repositório.

As capas individuais das três demos novas também podem ser regeneradas com seus renderizadores existentes. Nada é publicado automaticamente no Instagram.

## Comandos

```text
python tools/download-demo-photos.py
python tools/review-demo-photos.py --output PASTA_DA_REVISAO --axe-path CAMINHO_DO_AXE
```

O primeiro comando preserva fotos existentes. O segundo exige Playwright, Chrome/Edge e ffmpeg; `--overwrite` regenera apenas as capturas e capas conhecidas. A auditoria automática é complementar à revisão manual.

Após a revisão, executar os testes de floricultura, novas demos, página inicial e temas. Não incluir alterações anteriores de outras tarefas em uma futura publicação. Esta documentação não constitui autorização de commit/push nem de postagem em redes sociais.
