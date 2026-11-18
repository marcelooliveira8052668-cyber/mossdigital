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
- O cálculo ocorre ao abrir a página e é conferido novamente a cada 60 segundos. Ao voltar para uma aba aberta, também verifica a data pelo horário de São Paulo.

## Visual fotográfico fiel: integrado ao repositório oficial

Ramificação de origem: `feature/visual-fiel-3-festas-2026-2027`. Alterações integradas à `main` pelo PR #63 em 18/11/2026. Backup anterior: `backup/moss-antes-visual-festas-20261118`.

Arquivos de código disponíveis na `main`:
- `assets/css/moss-festas-fiel.css` — composição visual baseada nas três fotos aprovadas.
- `assets/js/moss-festas-fiel.js` — organiza a faixa de campanha e os motivos para escolher a MOSS.
- `index.html` — referências aos novos arquivos de estilo e comportamento.

**Imagens integradas:** os nove arquivos WebP abaixo foram enviados ao GitHub e conferidos com os arquivos originais. A publicação do GitHub Pages pode levar algum tempo após cada alteração.

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

## Testes e verificações da versão publicada

- [x] Os nove arquivos WebP acima existem no repositório, com os nomes corretos.
- [x] Testar por simulação a troca automática entre Natal, Ano Novo, Carnaval e Original, inclusive na virada do dia. Ainda convém conferir visualmente em `?moss-temas=teste`.
- [ ] Conferir a aparência no computador e no celular sem cortes ou textos sobrepostos.
- [x] Confirmar que os **156 sites do catálogo** permanecem no HTML e que os componentes anteriores não foram alterados. A busca, os links e o carrossel ainda merecem um teste prático no celular.
- [ ] Confirmar o WhatsApp `5511942038103`.
- [ ] Preservar o modo dia/noite e a logomarca original `moss-logo-horizontal.webp`.
- [ ] Não inventar promoções, descontos ou condições especiais.
- [x] Integração da ramificação visual à `main` realizada com backup prévio. O calendário automático está ativo no código oficial.

## Regra principal

**O site original nunca é substituído:** os temas são uma camada visual e a página deve voltar ao layout normal fora das datas de campanha.
