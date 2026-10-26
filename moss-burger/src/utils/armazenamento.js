// Estou criando os utilitários de PERSISTÊNCIA LOCAL.
// O "banco de dados" da v1 é o localStorage do navegador:
// é grátis, não precisa de servidor e guarda dados neste aparelho.
// Quando precisar de nuvem (v2), troca-se só estas funções
// e o resto do painel continua funcionando (abstração = profissionalismo).

export function carregar(chave, padrao) {
  try {
    const texto = localStorage.getItem(chave)
    return texto ? JSON.parse(texto) : padrao
  } catch {
    // Se os dados estiverem corrompidos, volto ao padrão em vez de quebrar
    return padrao
  }
}

export function salvar(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor))
}

// Gero um identificador único simples: combina hora + caracteres aleatórios
export function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
}
