-- Ponto & Ajuste: executar uma vez no SQL Editor de um projeto Supabase.
-- Não inclui senhas, chaves privadas nem clientes reais.
begin;
create table if not exists public.pa_administradores (
  id uuid primary key references auth.users(id) on delete cascade
);
alter table public.pa_administradores enable row level security;
revoke all on public.pa_administradores from anon, authenticated;
grant select on public.pa_administradores to authenticated;
drop policy if exists pa_admin_proprio on public.pa_administradores;
create policy pa_admin_proprio on public.pa_administradores for select to authenticated using (id = (select auth.uid()));

create or replace function public.pa_eh_administrador()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.pa_administradores where id = (select auth.uid())); $$;
revoke all on function public.pa_eh_administrador() from public;
grant execute on function public.pa_eh_administrador() to authenticated;

create table if not exists public.pa_servicos (
  codigo text primary key check (codigo in ('ajustes','reparos','acabamentos','transformacao')),
  nome text not null check (length(nome) between 1 and 100),
  descricao text not null check (length(descricao) between 1 and 400),
  ordem integer not null default 0,
  ativo boolean not null default true
);
alter table public.pa_servicos enable row level security;
revoke all on public.pa_servicos from anon, authenticated;
grant select on public.pa_servicos to anon, authenticated;
grant insert, update, delete on public.pa_servicos to authenticated;
drop policy if exists pa_servicos_publicos on public.pa_servicos;
create policy pa_servicos_publicos on public.pa_servicos for select to anon, authenticated using (ativo = true);
drop policy if exists pa_servicos_admin on public.pa_servicos;
create policy pa_servicos_admin on public.pa_servicos for all to authenticated
using ((select public.pa_eh_administrador())) with check ((select public.pa_eh_administrador()));

insert into public.pa_servicos (codigo,nome,descricao,ordem) values
 ('ajustes','Ajustes de caimento','Barras, cintura e comprimento: possibilidades avaliadas conforme a modelagem e o tecido da peça.',1),
 ('reparos','Reparos do dia a dia','Costura aberta, botão solto ou pequeno reparo. A viabilidade depende do estado da roupa.',2),
 ('acabamentos','Detalhes e acabamentos','Revisão de acabamentos e pequenos detalhes para recuperar o prazer de vestir uma peça.',3),
 ('transformacao','Uma nova possibilidade','Tem uma ideia de transformação? Conte o que imagina para avaliarmos o que é possível.',4)
on conflict (codigo) do nothing;

create table if not exists public.pa_pedidos (
  id uuid primary key default gen_random_uuid(),
  cliente text not null check (length(btrim(cliente)) between 1 and 100),
  contato text not null check (length(btrim(contato)) between 3 and 120),
  servico text not null references public.pa_servicos(codigo),
  detalhes text not null check (length(btrim(detalhes)) between 1 and 1000),
  status text not null default 'novo' check (status in ('novo','avaliacao','combinado','concluido','cancelado')),
  criado_em timestamptz not null default now()
);
alter table public.pa_pedidos enable row level security;
revoke all on public.pa_pedidos from anon, authenticated;
grant select, insert, update, delete on public.pa_pedidos to authenticated;
drop policy if exists pa_pedidos_admin on public.pa_pedidos;
create policy pa_pedidos_admin on public.pa_pedidos for all to authenticated
using ((select public.pa_eh_administrador())) with check ((select public.pa_eh_administrador()));
create index if not exists pa_pedidos_data on public.pa_pedidos(criado_em desc);
commit;

-- DEPOIS: crie o usuário no painel Authentication > Users > Add user.
-- Copie seu UUID e execute separadamente (substitua o UUID de exemplo):
-- insert into public.pa_administradores(id) values ('UUID-DO-USUARIO') on conflict do nothing;
-- Nunca habilite autoinscrição de administradores ou acesso público a pedidos.
