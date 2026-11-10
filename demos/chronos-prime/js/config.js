// Configurações públicas da loja demonstrativa; nunca inclua segredos ou senhas aqui.
const LOJA = {
  nome: 'CHRONOS PRIME',
  whatsapp: '', // Insira DDI 55 + DDD + número comercial para ativar os links.
  email: 'contato@exemplo.com', // Substituir pelo e-mail real do cliente.
  instagram: '', // Insira a URL completa do Instagram, se houver.
  pixChave: '', // Insira apenas se o proprietário autorizar a divulgação pública.
  pixRecebedor: '', // Nome do recebedor real, a configurar.
  endereco: 'Endereço a configurar',
  moeda: 'BRL',
  // Modo demonstrativo: nenhuma cobrança real é iniciada.
  pagamentos: {
    modo: 'demo', // Altere para 'integrado' somente após configurar um backend seguro.
    apiCheckout: '', // URL HTTPS de endpoint próprio que cria uma cobrança no provedor.
    provedor: 'a configurar', // Exemplo: Mercado Pago, PagBank ou outro provedor.
    chavePublica: '' // Apenas chaves explicitamente públicas; nunca tokens secretos.
  }
};
