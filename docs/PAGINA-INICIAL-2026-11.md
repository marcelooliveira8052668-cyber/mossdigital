# Página inicial — apresentação comercial

## O que mudou

- Mantida a identidade azul-escura existente, sem alterar as páginas das demos.
- Seis destaques de segmentos diferentes, com capturas reais das demonstrações em WebP: Restaurante 360, salão, NEXA Store, fotografia, EntreLares e Horizon Travel.
- Links diretos para explorar cada demo ou pedir orçamento pelo WhatsApp.
- Apresentação de 30 segundos no topo, ao lado da chamada principal no computador e logo abaixo dela no celular. Vídeo local, imagem de capa, controles, legendas em português e transcrição. Sem autoplay, sem repetição mais abaixo e com `preload="none"`.
- Etapas da contratação, escopo e custos a combinar, apresentação do responsável e perguntas frequentes.
- Diferenciação explícita entre demonstrações e clientes reais. Não foram adicionados depoimentos, certificações ou resultados comerciais.
- Retiradas da página inicial as promessas de prazo fixo e a contagem desatualizada dos metadados.

## Arquivos desta alteração

- `index.html`
- `assets/css/moss-home.css` (complementos exclusivos da página inicial)
- `assets/img/destaques/` (seis capturas e capa do vídeo)
- `assets/video/moss-apresentacao-30s.mp4`
- `assets/video/moss-apresentacao-30s.vtt`
- `tools/test-home.py`

Os arquivos e alterações anteriores de outras tarefas foram preservados. O catálogo completo e as próprias demos ainda podem conter textos promocionais fictícios; esta melhoria não equivale a uma auditoria de todos os projetos.

## Conferência local

Na raiz do repositório, execute `python -m http.server 8000 --bind 127.0.0.1` e abra `http://127.0.0.1:8000/`.

Para os testes automatizados, é necessário Playwright para Python e Chrome ou Edge instalado:

```text
python tools/test-home.py --output CAMINHO_DOS_RELATORIOS
```

Opcionalmente informe `--browser-path CAMINHO_DO_NAVEGADOR` e `--axe-path CAMINHO_DO_AXE.MIN.JS`.

O teste confere layout em cinco larguras, imagens e links locais, navegação por teclado, vídeo, legendas e funcionamento sem JavaScript. Não envia mensagens nem faz pedidos nas demos. A auditoria automática de acessibilidade não substitui avaliação manual.

## Antes de publicar

1. Revisar o conteúdo comercial, especialmente os valores e as condições do orçamento.
2. Assistir ao vídeo e conferir a narração e a sincronização das legendas.
3. Conferir o diff e incluir somente os arquivos desta alteração na publicação; há trabalho anterior no repositório.
4. Publicar pelo fluxo habitual do projeto. Nenhum commit ou push foi feito nesta etapa.

## Próximas melhorias possíveis

- Revisar textos do catálogo completo sobre agendamento, matrícula e pagamentos.
- Acrescentar trabalhos de clientes e depoimentos somente com comprovação e autorização.

## Atualização de 12/11/2026 — vídeo gravado da página atual

- `assets/video/moss-apresentacao-30s.mp4` foi regravado a partir da página inicial atual, que mostra o preço de R$ 500. A gravação antiga (que exibia R$ 400) ficou arquivada em `.moss-local/backup-video-20261112/`.
- Narração refeita com voz neural em português do Brasil (`pt-BR-FranciscaNeural`), em velocidade de conversa, sem menção a preço.
- Cada frase da narração define o início e o fim de um bloco de legenda; `moss-apresentacao-30s.vtt` e as legendas queimadas no vídeo usam os mesmos tempos.
- As cenas do vídeo trocam junto com a narração: página inicial, apresentação, demonstrações em destaque, preço de R$ 500, produtos e contato, fechando com a tela da MOSS Digital.
- `assets/img/destaques/video-poster.webp` foi refeita a partir do novo vídeo.
- Ferramentas reproduzíveis em `tools/`: `gerar-narracao-30s.py` (narração + `.vtt` + tempos) e `recordar-apresentacao-30s.py` (captura vertical, mixagem e capa).
- O teste da página inicial (`tools/test-home.py`) continua verde: o vídeo reproduz, as seis legendas são reconhecidas e a transcrição está disponível.
