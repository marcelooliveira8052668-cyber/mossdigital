# MOSS Digital — temas fiéis às três fotografias fornecidas

## Situação da integração

Esta é uma **versão de testes**. Não mesclar à main antes de copiar as imagens WebP e testar o resultado no computador e no celular.

O pacote entregue nesta conversa, `MOSS_Festas_Fieis_Natal_AnoNovo_Carnaval.zip`, contém as fotografias decorativas recortadas das referências e três páginas de visualização.

## Arquivos que precisam ser colocados no repositório

| Dentro do ZIP | No GitHub |
|---|---|
| `assets/cena-natal.webp` | `assets/img/temas/foto-natal.webp` |
| `assets/cena-ano-novo.webp` | `assets/img/temas/foto-ano-novo.webp` |
| `assets/cena-carnaval.webp` | `assets/img/temas/foto-carnaval.webp` |
| `assets/luzes-natal.webp` | `assets/img/temas/luzes-natal.webp` |
| `assets/luzes-ano-novo.webp` | `assets/img/temas/luzes-ano-novo.webp` |
| `assets/luzes-carnaval.webp` | `assets/img/temas/luzes-carnaval.webp` |
| `assets/laco-natal.webp` | `assets/img/temas/faixa-natal.webp` |
| `assets/faixa-ano-novo.webp` | `assets/img/temas/faixa-ano-novo.webp` |
| `assets/faixa-carnaval.webp` | `assets/img/temas/faixa-carnaval.webp` |

## O que mudou no código

**Antes:**
- `assets/css/moss-estacoes.css`: cores, desenhos em SVG, faixas.
- `assets/js/moss-estacoes.js`: calendário automático.

**Depois:**
- `assets/css/moss-festas-fiel.css`: imagens das referências, fundo claro no catálogo, cores, cartões, faixa e versão para celular.
- `assets/js/moss-festas-fiel.js`: reorganiza a faixa depois do catálogo e acrescenta os motivos para escolher a empresa.
- `index.html`: acrescenta essas duas importações, sem mexer nos outros 156 cartões.

## Como testar

1. Copiar as nove fotos para as pastas listadas acima, preservando os nomes.
2. Abrir uma versão local da ramificação, ou publicar apenas depois de avaliar a prévia.
3. Acessar `/?moss-temas=teste` e alternar Original, Natal, Ano Novo e Carnaval.
4. Conferir notebook, fotos, links, WhatsApp, os 156 sites e a versão de celular.
5. Mesclar no GitHub somente quando as imagens realmente estiverem disponíveis e o resultado estiver aprovado.

As fotografias de Ano Novo contêm o número **2027** na própria imagem: isso terá de ser atualizado no próximo ano. Os textos do site continuam separados e editáveis.

Não há descontos inventados nem mudanças nas páginas dos clientes.
