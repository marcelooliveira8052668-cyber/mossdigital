# Modo Supabase (opcional)

A demonstração **local** funciona sem internet, sem cadastro e sem credenciais.
Este direcionamento é apenas para quem quiser estudar uma integração real com banco de dados.

## Como ativar

1. Crie um projeto no Supabase.
2. Execute `supabase/schema.sql` no SQL Editor do projeto.
3. Crie um usuário administrador no Supabase Auth e insira seu `user_id` em `public.admin_users`.
4. Preencha `supabase/config.js` com a **URL** e a **anon key** (pública).
5. Adicione antes dos scripts da aplicação, em `index.html`:

```html
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase/config.js"></script>
```

## Segurança

- A **anon key** é pública e pode ficar no navegador: o acesso é limitado pelas políticas RLS.
- A **service_role key** é secreta e **nunca** deve aparecer em HTML/JS público.
- As políticas impedem que visitantes alterem preços, estoque ou pedidos de outras pessoas.
- Se a conexão falhar, a aplicação continua em modo demonstração com `localStorage`.

## Dados

Todas as entidades são fictícias: produtos, categorias, estoque, clientes de teste,
pedidos, itens, eventos de pagamento, eventos de entrega e usuários administrativos.
