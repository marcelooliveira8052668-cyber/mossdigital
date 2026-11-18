# MOSS Digital — Programação oficial dos temas comemorativos

**Atualização:** 18 de novembro de 2026.

## Calendário automático (horário de São Paulo)

| Período | Aparência | Ação |
|---|---|---|
| 1º a 26 de dezembro | 🎄 Natal | Entrar no tema natalino |
| 27 de dezembro a 6 de janeiro | 🎆 Ano Novo | Mostrar a virada do ano |
| Oito dias antes da terça-feira de Carnaval até o dia seguinte | 🎭 Carnaval | Ativar a campanha carnavalesca |
| Todos os outros dias | 💚 MOSS Original | Restaurar a aparência habitual |

**Exemplo de 2026–2027:** 
- 18 a 30/11/2026: Original.
- 01 a 26/12/2026: Natal.
- 27/12/2026 a 06/01/2027: Ano Novo 2027.
- 07 a 31/01/2027: Original.
- 01 a 10/02/2027: Carnaval.
- A partir de 11/02/2027: Original.

O calendário de Carnaval é **móvel**, calculado a partir da Páscoa de cada ano. Exemplo: em 2028, o tema de Carnaval será exibido de 21/02 a 01/03.

## Onde a programação já funciona

- `assets/js/moss-estacoes.js`: detecta a data em `America/Sao_Paulo` e escolhe `natal`, `ano-novo`, `carnaval` ou `original`.
- `assets/css/moss-estacoes.css`: contém os estilos atuais das três festas.
- `index.html`: já carrega os dois arquivos na página principal.
- Para testar localmente cada aparência: `/?moss-temas=teste`. Este painel de teste muda **só o navegador do visitante**, não todos os acessos.
- O cálculo ocorre ao entrar ou recarregar a página. Uma aba que permanece aberta desde o dia anterior deve ser recarregada para atualizar a aparência.

## Visual fotográfico fiel: preparado, mas ainda NÃO publicado

Ramificação de desenvolvimento: `feature/visual-fiel-3-festas-2026-2027`.

Arquivos de código nessa ramificação:
- `assets/css/moss-festas-fiel.css` — composição visual baseada nas três fotos aprovadas.
- `assets/js/moss-festas-fiel.js` — organiza a faixa de campanha e os motivos para escolher a MOSS.
- `index.html` — referências aos novos arquivos de estilo e comportamento.

**Bloqueio para publicar a versão fiel:** copiar os arquivos WebP do pacote `MOSS_Festas_Fieis_Natal_AnoNovo_Carnaval.zip` para o repositório GitHub, preservando os nomes abaixo. O código aponta para essas imagens, mas elas ainda não foram adicionadas ao GitHub.

| Dentro do pacote | Destino no repositório |
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

### Atenção ao ano de 2028 em diante

A frase do Ano Novo no código já atualiza o ano automaticamente. **A fotografia aprovada mostra “2027” embutido na própria imagem.** Portanto, esse arquivo precisará ser atualizado para a virada de 2027→2028; caso contrário, a foto exibirá um ano antigo, mesmo que o título esteja correto. Evitar prometer atualização anual da imagem sem um mecanismo que substitua o ano na própria arte.

## Verificações antes da versão fotográfica ir ao ar

- [ ] Os nove arquivos WebP acima existem no repositório, com os nomes corretos.
- [ ] Testar o Natal, Ano Novo, Carnaval e Original em `?moss-temas=teste`.
- [ ] Conferir a aparência no computador e no celular sem cortes ou textos sobrepostos.
- [ ] Confirmar os **156 sites do catálogo**, a busca, o carrossel, os depoimentos e todos os links.
- [ ] Confirmar o WhatsApp `5511942038103`.
- [ ] Preservar o modo dia/noite e a logomarca original `moss-logo-horizontal.webp`.
- [ ] Não inventar promoções, descontos ou condições especiais.
- [ ] Só integrar a ramificação visual ao `main` depois dos testes. A programação do calendário atual já está ativa no `main`.

## Regra principal

**O site original nunca é substituído:** os temas são uma camada visual e a página deve voltar ao layout normal fora das datas de campanha.
