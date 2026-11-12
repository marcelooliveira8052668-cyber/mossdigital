-- Chaveiro Express: executar uma vez no SQL Editor de um projeto Supabase.
-- Não inclui senhas, chaves privadas nem clientes reais.
begin;
create table if not exists public.ce_responsaveis (
  id uuid primary key references auth.users(id) on delete cascade
);
alter table public.ce_responsaveis enable row level security;
revoke all on public.ce_responsaveis from anon, authenticated;
grant select on public.ce_responsaveis to authenticated;
drop policy if exists ce_responsavel_proprio on public.ce_responsaveis;
create policy ce_responsavel_proprio on public.ce_responsaveis for select to authenticated using (id = (select auth.uid()));

create or replace function public.ce_e_responsavel()
returns boolean language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.ce_responsaveis where id = (select auth.uid())); $$;
revoke all on function public.ce_e_responsavel() from public;
grant execute on function public.ce_e_responsavel() to authenticated;

create table if not exists public.ce_servicos (
  codigo text primary key check (codigo in ('abertura','fechaduras','copia','veiculo')),
  nome text not null check (length(nome) between 1 and 100),
  descricao text not null check (length(descricao) between 1 and 400),
  ordem integer not null default 0,
  ativo boolean not null default true
);
alter table public.ce_servicos enable row level security;
revoke all on public.ce_servicos from anon, authenticated;
grant select on public.ce_servicos to anon, authenticated;
grant insert, update, delete on public.ce_servicos to authenticated;
drop policy if exists ce_servicos_publicos on public.ce_servicos;
create policy ce_servicos_publicos on public.ce_servicos for select to anon, authenticated using (ativo = true);
drop policy if exists ce_servicos_responsavel on public.ce_servicos;
create policy ce_servicos_responsavel on public.ce_servicos for all to authenticated
using ((select public.ce_e_responsavel())) with check ((select public.ce_e_responsavel()));

insert into public.ce_servicos (codigo,nome,descricao,ordem) values
 ('abertura','Abertura de portas','Porta com chave, fechadura quebrada ou chave perdida dentro. A viabilidade depende do tipo de fechadura e do local.',1),
 ('fechaduras','Troca de fechaduras','Substituição por modelo mais seguro, com explicação das diferenças entre fechadura de pino, cilindro e trava.',2),
 ('copia','Cópia de chaves','Cópia de chaves de casa, apartamento, armário e de fechaduras comuns. Modelos com chave controladora exigem o original ou o código.',3),
 ('veiculo','Chave de veículo','Chave-presença e programações simples, conforme o modelo do carro. Veículos com chave eletrônica dependem de concessionária ou equipamento compatível.',4)
on conflict (codigo) do nothing;

create table if not exists public.ce_chamados (
  id uuid primary key default gen_random_uuid(),
  cliente text not null check (length(btrim(cliente)) between 1 and 100),
  contato text not null check (length(btrim(contato)) between 3 and 120),
  bairro text not null check (length(btrim(bairro)) between 1 and 120),
  servico text not null references public.ce_servicos(codigo),
  descricao text not null check (length(btrim(descricao)) between 1 and 1000),
  status text not null default 'novo' check (status in ('novo','avaliacao','combinado','atendido','cancelado')),
  criado_em timestamptz not null default now()
);
alter table public.ce_chamados enable row level security;
revoke all on public.ce_chamados from anon, authenticated;
grant select, insert, update, delete on public.ce_chamados to authenticated;
drop policy if exists ce_chamados_responsavel on public.ce_chamados;
create policy ce_chamados_responsavel on public.ce_chamados for all to authenticated
using ((select public.ce_e_responsavel())) with check ((select public.ce_e_responsavel()));
create index if not exists ce_chamados_data on public.ce_chamados(criado_em desc);
commit;

-- DEPOIS: crie o usuário no painel Authentication > Users > Add user.
-- Copie seu UUID e execute separadamente (substitua o UUID de exemplo):
-- insert into public.ce_responsaveis(id) values ('UUID-DO-USUARIO') on conflict do nothing;
-- Nunca habilite autoinscrição de responsáveis nem acesso público a chamados.
