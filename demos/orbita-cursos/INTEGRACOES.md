# Guia de integrações — Órbita Cursos

## Funciona hoje
- Site estático responsivo em HTML/CSS/JavaScript; catálogo filtrável, detalhes acessíveis em diálogo e lista de interesse salva no navegador.
- Mensagens pré-preenchidas dirigidas ao WhatsApp da demonstração, quando disponíveis.
- Quando houver dados no navegador, **localStorage é apenas local**, não sincroniza com funcionários e outros dispositivos.

## Ainda não integrado
- Domínio e hospedagem do cliente, painel remoto, agenda sincronizada, gestão de turmas/vagas em tempo real, confirmação de matrículas, pagamentos via Pix/cartão e banco de dados remoto.

## Roteiro futuro (sob orçamento)
1. **Domínio e hospedagem:** registrar domínio em nome do cliente; apontar DNS, habilitar HTTPS, corrigir caminhos relativos e testar mobile.
2. **Banco de dados:** modelar tabelas apenas para as funções necessárias; considerar Supabase com RLS habilitado, permissões mínimas e backups.
3. **Login administrativo:** autenticação segura e autorização para funcionários. Não guardar chaves privadas no front-end.
4. **Pedidos e formulários:** coletar só dados necessários, respeitar LGPD e adotar política de retenção. Para menores de idade, exigir processo adequado e autorização de responsáveis.
5. **Agenda/matrículas (quando aplicável):** checar disponibilidades em servidor e só confirmar após resposta transacional do backend.
6. **Pagamentos (se contratados):** usar checkout de provedor autorizado; validar pagamento via webhooks no backend; não manipular cartões ou segredos no JavaScript.
7. **Homologação:** testar permissões, acessibilidade, rotas, backups e casos de erro antes de clientes reais.

**Importante:** este arquivo é um roteiro de estudo, não uma integração já implementada. Serviços, valores e resultados presentes na demo são apenas exemplos.
