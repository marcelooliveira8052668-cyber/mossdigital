-- Casa Impecavel: executar uma vez no SQL Editor de um projeto Supabase.
-- Não inclui senhas, chaves privadas nem clientes reais.
begin;
create table if not exists public.ci_responsaveis (
  id uuid primary key references auth.users(id) on delete cascade
);
alter table public.ci_responsaveis enable row level security;
revoke all on public.ci_responsaveis from anon, authenticated;
grant select on public.ci_responsaveis to authenticated;
drop policy if exists ci_responsavel_proprio on public.ci_responsaveis;
create policy ci_responsavel_proprio on public.ci_responsaveis for select to authenticated using (id = (select auth.uid()));

create or replace function public.ci_e_responsavel()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.ci_responsaveis where id = (select auth.uid())); $$;
revoke all on function public.ci_e_responsavel() from public;
grant execute on function public.ci_e_responsavel() to authenticated;

create table if not exists public.ci_servicos (
  codigo text primary key check (codigo in ('manutencao','profunda','mudanca','posobra')),
  nome text not null check (length(nome) between 1 and 100),
  descricao text not null check (length(descricao) between 1 and 400),
  ordem integer not null default 0,
  ativo boolean not null default true
);
alter table public.ci_servicos enable row level security;
revoke all on public.ci_servicos from anon, authenticated;
grant select on public.ci_servicos to anon, authenticated;
grant insert, update, delete on public.ci_servicos to authenticated;
drop policy if exists ci_servicos_publicos on public.ci_servicos;
create policy ci_servicos_publicos on public.ci_servicos for select to anon, authenticated using (ativo = true);
drop policy if exists ci_servicos_responsavel on public.ci_servicos;
create policy ci_servicos_responsavel on public.ci_servicos for all to authenticated
using ((select public.ci_e_responsavel())) with check ((select public.ci_e_responsavel()));

insert into public.ci_servicos (codigo,nome,descricao,ordem) values
 ('manutencao','Manutenção semanal','Limpeza de rotina para manter a casa em ordem: superficies, piso, banheiros e louca. Frequencia combinada.',1),
 ('profunda','Limpeza profunda','Reset em detalhes que o dia a dia nao alcanca: atras dos moveis, dentro de gavetas e nas bordas.',2),
 ('mudanca','Pré-mudança e entrega','Limpeza antes de receber o imovel ou antes de mudar: pontos altos, armarios, banheiros e areas de circulacao.',3),
 ('posobra','Pós-obra','Limpeza pesada de reforma e obra, com equipe propria e equipamento adequado.',4)
on conflict (codigo) do nothing;

create table if not exists public.ci_pedidos (
  id uuid primary key default gen_random_uuid(),
  cliente text not null check (length(btrim(cliente)) between 1 and 100),
  contato text not null check (length(btrim(contato)) between 3 and 120),
  bairro text not null check (length(btrim(bairro)) between 1 and 120),
  servico text not null references public.ci_servicos(codigo),
  ambientes text not null default '' check (length(ambientes) <= 400),
  detalhes text not null check (length(btrim(detalhes)) between 1 and 1000),
  status text not null default 'novo' check (status in ('novo','visita','orcamento','agendado','concluido','cancelado')),
  criado_em timestamptz not null default now()
);
alter table public.ci_pedidos enable row level security;
revoke all on public.ci_pedidos from anon, authenticated;
grant select, insert, update, delete on public.ci_pedidos to authenticated;
drop policy if exists ci_pedidos_responsavel on public.ci_pedidos;
create policy ci_pedidos_responsavel on public.ci_pedidos for all to authenticated
using ((select public.ci_e_responsavel())) with check ((select public.ci_e_responsavel()));
create index if not exists ci_pedidos_data on public.ci_pedidos(criado_em desc);
commit;

-- DEPOIS: crie o usuario no painel Authentication > Users > Add user.
-- Copie seu UUID e execute separadamente (substitua o UUID de exemplo):
-- insert into public.ci_responsaveis(id) values ('UUID-DO-USUARIO') on conflict do nothing;
-- Nunca habilite autoinscricao de responsaveis nem acesso publico a pedidos.
