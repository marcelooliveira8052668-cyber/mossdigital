# Verificação da entrega

Verificação automatizada em Chromium com Playwright, em ambiente local, em 12/11/2026:

- Oito guias renderizados e abertos individualmente; pelo menos cinco seções e duas referências por guia.
- Filtro Tecnologia retorna os dois guias esperados.
- Busca sem acento encontra “inteligência”; consulta sem resultados mostra orientação.
- Botão de limpeza restaura a seleção.
- Tema persiste após recarregar.
- Janelas de leitura e transparência abrem e fecham; Escape funciona.
- Link direto `#guia=seguranca-digital` abre o conteúdo correspondente.
- Imagens locais carregam corretamente.
- Arquivo MP4 reconhecido pelo player com duração válida.
- Sem transbordamento horizontal da página nas larguras 320, 375, 768, 1024 e 1440 pixels; menu possui rolagem própria.
- Abertura por `file://` renderiza os oito guias e permite leitura.
- Nenhum erro JavaScript capturado durante os testes.

Prévias: `previa-desktop.png` e `previa-celular.png`.

Limitações: teste local em Chromium, não uma certificação de acessibilidade nem teste em todos os dispositivos. Canais e referências externos não foram auditados integralmente. Compartilhamento nativo varia por navegador, permissão e HTTPS. Revisar hospedagem e materiais antes de publicar.
