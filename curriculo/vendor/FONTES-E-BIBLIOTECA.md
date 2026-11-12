# Dependências locais do currículo

- jsPDF 4.2.1, MIT: https://cdnjs.cloudflare.com/ajax/libs/jspdf/4.2.1/jspdf.umd.min.js
  SHA-256: `e6551fcdc32f09d6853b2c5126d18d01d9447e0da618a41a11ebeee0f6c20d54`.
  O aviso de licença do projeto permanece no arquivo distribuído.
- Noto Sans Regular e Bold: https://github.com/notofonts/noto-fonts/tree/main/hinted/ttf/NotoSans
  SIL Open Font License 1.1, cópia em `OFL.txt`.
- `notosans.js` é gerado de ambas as fontes pelo script
  `python tools/build-cv-fonts.py`, sem enviar dados a um serviço externo.

PDFs são gerados localmente com texto selecionável, não uma fotografia da página.
As fontes cobrem português e outros alfabetos incluídos no Noto Sans; não se
promete cobertura de todo caractere Unicode ou aprovação em sistemas de seleção.
