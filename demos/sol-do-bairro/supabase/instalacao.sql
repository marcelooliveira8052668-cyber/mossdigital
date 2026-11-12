-- Sol do Bairro: executar uma vez no SQL Editor de um projeto Supabase.
-- Não inclui senhas, chaves privadas nem clientes reais.
begin;
create table if not exists public.sb_responsaveis (
  id uuid primary key references auth.users(id) on delete cascade
);
alter table public.sb_responsaveis enable row level security;
revoke all on public.sb_responsaveis from anon, authenticated;
grant select on public.sb_responsaveis to authenticated;
drop policy if exists sb_responsavel_proprio on public.sb_responsaveis;
create policy sb_responsavel_proprio on public.sb_responsaveis for select to authenticated using (id = (select auth.uid()));

create or replace function public.sb_e_responsavel()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.sb_responsaveis where id = (select auth.uid())); $$;
revoke all on function public.sb_e_responsavel() from public;
grant execute on function public.sb_e_responsavel() to authenticated;

create table if not exists public.sb_servicos (
  codigo text primary key check (codigo in ('instalacao','manutencao','monitoramento')),
  nome text not null check (length(nome) between 1 and 100),
  descricao text not null check (length(descricao) between 1 and 400),
  ordem integer not null default 0,
  ativo boolean not null default true
);
alter table public.sb_servicos enable row level security;
revoke all on public.sb_servicos from anon, authenticated;
grant select on public.sb_servicos to anon, authenticated;
grant insert, update, delete on public.sb_servicos to authenticated;
drop policy if exists sb_servicos_publicos on public.sb_servicos;
create policy sb_servicos_publicos on public.sb_servicos for select to anon, authenticated using (ativo = true);
drop policy if exists sb_servicos_responsavel on public.sb_servicos;
create policy sb_servicos_responsavel on public.sb_servicos for all to authenticated
using ((select public.sb_e_responsavel())) with check ((select public.sb_e_responsavel()));

insert into public.sb_servicos (codigo,nome,descricao,ordem) values
 ('instalacao','Instalação completa','Projeto, estrutura, painéis e inversor. Você acompanha cada etapa e recebe a orientação de uso.',1),
 ('manutencao','Manutenção e suporte','Limpeza, revisão elétrica e acompanhamento da geração. Atendimento para o seu sistema, não para o vizinho.',2),
 ('monitoramento','Monitoramento','Acompanhe a geração do celular e saiba quando algo saiu do esperado, antes de receber uma conta alta.',3)
on conflict (codigo) do nothing;

create table if not exists public.sb_propostas (
  id uuid primary key default gen_random_uuid(),
  cliente text not null check (length(btrim(cliente)) between 1 and 100),
  contato text not null check (length(btrim(contato)) between 3 and 120),
  bairro text not null check (length(btrim(bairro)) between 1 and 120),
  servico text not null references public.sb_servicos(codigo),
  detalhes text not null check (length(btrim(detalhes)) between 1 and 1000),
  consumo_kwh integer check (consumo_kwh is null or consumo_kwh between 1 and 100000),
  valor_estimado numeric(12,2) check (valor_estimado is null or valor_estimado >= 0),
  status text not null default 'novo' check (status in ('novo','visita','proposta_enviada','instalado','cancelado')),
  criado_em timestamptz not null default now()
);
alter table public.sb_propostas enable row level security;
revoke all on public.sb_propostas from anon, authenticated;
grant select, insert, update, delete on public.sb_propostas to authenticated;
drop policy if exists sb_propostas_responsavel on public.sb_propostas;
create policy sb_propostas_responsavel on public.sb_propostas for all to authenticated
using ((select public.sb_e_responsavel())) with check ((select public.sb_e_responsavel()));
create index if not exists sb_propostas_data on public.sb_propostas(criado_em desc);
commit;

-- DEPOIS: crie o usuário no painel Authentication > Users > Add user.
-- Copie seu UUID e execute separadamente (substitua o UUID de exemplo):
-- insert into public.sb_responsaveis(id) values ('UUID-DO-USUARIO') on conflict do nothing;
-- Nunca habilite autoinscrição de responsáveis nem acesso público a propostas.
