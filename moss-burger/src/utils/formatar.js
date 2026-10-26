// Estou criando funções utilitárias reutilizáveis em todo o site.
// Separar essas "regrinhas de formatação" evita repetir código
// e facilita a manutenção (se o formato mudar, mudo aqui e pronto).

// Transforma 27.9 em "R$ 27,90" — padrão brasileiro com vírgula
export function formatarMoeda(valor) {
  return 'R$ ' + valor.toFixed(2).replace('.', ',')
}
