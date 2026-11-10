# Conexões e integrações — Aluga Festa

## Arquitetura atual
HTML, CSS e JavaScript puro. Atendimento via WhatsApp +55 (11) 94203-8103. Nenhum banco de dados, autenticação, reserva, estoque ou pagamento real. Valores e empresas demonstrativos.

## Evolução recomendada
Supabase para disponibilidade por data, contratos, itens alocados, entrega e retirada. Agenda transacional e checkout hospedado requerem backend seguro.

## Trilha prática de aprendizagem MOSS
1. **Domínio:** registrar domínio e configurar os registros DNS com o provedor de hospedagem.
2. **Hospedagem:** publicar a versão estática inicialmente, conferindo caminhos relativos, HTTPS e desempenho.
3. **Supabase:** desenhar tabelas, chaves, índices e autenticação; ativar Row Level Security (RLS) antes de expor qualquer tabela.
4. **Backend e APIs:** validar preços, permissões e entradas no servidor; não confiar nos valores enviados pelo navegador.
5. **Pix e cartão:** integrar um checkout hospedado do provedor de pagamento, jamais salvar números de cartão nem deixar chaves secretas no JavaScript público.
6. **Webhooks:** confirmar eventos de pagamento no servidor com autenticidade validada, idempotência e logs.
7. **LGPD:** coletar somente dados necessários, definir finalidade, retenção, acesso e política de privacidade.

## Antes de vender ao cliente
Criar ambiente de testes, realizar casos de sucesso/erro, testar dispositivos, documentar custos de domínio, hospedagem, gateway e manutenção. A versão presente é **demonstração**, não sistema integrado.
