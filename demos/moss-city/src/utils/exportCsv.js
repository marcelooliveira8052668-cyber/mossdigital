// Exporta somente os registros fornecidos pelo componente, preservando seus filtros e permissões de interface.
export default function exportCsv(filename, columns, records) {
  const cell = (value) => `"${String(value ?? '').replace(/^\s*[=+@-]/, "'$&").replaceAll('"', '""')}"`; // Escapa aspas e neutraliza inícios de fórmula em programas de planilha.
  const rows = [columns.map((column) => cell(column.label)).join(';'), ...records.map((record) => columns.map((column) => cell(record[column.key])).join(';'))]; // Monta cabeçalho e linhas com separador usado em planilhas brasileiras.
  const url = URL.createObjectURL(new Blob(['\uFEFF' + rows.join('\r\n')], { type: 'text/csv;charset=utf-8;' })); // Cria um arquivo local em memória, sem enviar dados para servidores.
  const link = document.createElement('a'); // Prepara um link temporário para o download.
  link.href = url; // Aponta o link para o arquivo em memória.
  link.download = filename; // Define um nome explícito para o relatório demonstrativo.
  link.click(); // Inicia o download solicitado pelo visitante.
  URL.revokeObjectURL(url); // Libera a memória reservada para o arquivo.
} // Encerra a exportação local de CSV.
