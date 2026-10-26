// Estou criando funções utilitárias reutilizáveis em todo o site.
// Separar essas "regrinhas de formatação" evita repetir código
// e facilita a manutenção (se o formato mudar, mudo aqui e pronto).

// Transforma 27.9 em "R$ 27,90" — padrão brasileiro com vírgula
export function formatarMoeda(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',')
}

// Data de hoje no formato AAAA-MM-DD (o formato que o input type="date" entende)
export function hoje() {
  const d = new Date()
  const dia = String(d.getDate()).padStart(2, '0')
  const mes = String(d.getMonth() + 1).padStart(2, '0')
  return `${d.getFullYear()}-${mes}-${dia}`
}

// Transforma AAAA-MM-DD em DD/MM/AAAA para exibir nas tabelas
export function dataBR(iso) {
  if (!iso) return ''
  return iso.split('-').reverse().join('/')
}
