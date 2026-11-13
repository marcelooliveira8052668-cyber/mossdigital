# Carrossel suave — 13/11/2026

Publicação autorizada após a aprovação da simulação com deslizamento contínuo.

- Mantém as 127 demos, suas imagens, descrições, destinos, busca e categorias.
- Substitui a paginação de seis cards pelo carrossel horizontal. Nada do catálogo é removido.
- Deslizamento contínuo por `requestAnimationFrame`, com velocidade constante e sem encaixe entre etapas. A animação só roda com os cards na tela e a aba visível.
- Ajuste solicitado após publicação: 56 px/s no celular (até 650 px, antes 28) e 48 px/s no computador (antes 36). Mantém pausa e preferência por movimento reduzido; URL do script versionada para evitar cache antigo.
- Pausa disponível por botão. Foco, clique nos cards, busca, filtros e navegação manual interrompem o movimento; a retomada é explícita.
- A preferência por movimento reduzido é respeitada na abertura. A pessoa pode iniciar pelo botão, se quiser.
- Setas e teclas de navegação continuam disponíveis. No celular, o gesto de deslizar também funciona.
- Sem JavaScript, o catálogo aparece em grade com as 127 demos.
- Vídeo, preços, cores e serviços preservados.

Arquivos: `assets/css/moss-carrossel.css` e `assets/js/moss-carrossel.js`. A nova proposta Portfólio Studio não integra esta publicação; os modelos e atalhos particulares anteriores não foram substituídos.

Backup da home anterior: `.moss-local/backup-antes-carrossel-20261113/`, fora do site e do Git.
