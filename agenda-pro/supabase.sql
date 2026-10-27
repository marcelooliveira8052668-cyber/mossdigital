-- Execute uma vez no SQL Editor do seu projeto Supabase (plano Free).
-- Cada conta acessa apenas os próprios agendamentos graças às políticas RLS.

create table if not exists public.moss_agendamentos (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    nome text not null check (char_length(btrim(nome)) between 1 and 80),
    servico text not null check (char_length(btrim(servico)) between 1 and 80),
    telefone text not null default '' check (char_length(telefone) <= 25),
    data date not null,
    hora time without time zone not null,
    observacoes text not null default '' check (char_length(observacoes) <= 300),
    status text not null default 'pendente' check (status in ('pendente', 'concluido')),
    criado_em timestamptz not null default now(),
    constraint moss_horario_unico unique (user_id, data, hora)
);

create index if not exists moss_agendamentos_usuario_data
    on public.moss_agendamentos (user_id, data, hora);

alter table public.moss_agendamentos enable row level security;
revoke all on public.moss_agendamentos from anon;
grant select, insert, update, delete on public.moss_agendamentos to authenticated;

drop policy if exists "moss_visualizar_proprios" on public.moss_agendamentos;
create policy "moss_visualizar_proprios" on public.moss_agendamentos
    for select to authenticated using ((select auth.uid()) = user_id);

drop policy if exists "moss_criar_proprios" on public.moss_agendamentos;
create policy "moss_criar_proprios" on public.moss_agendamentos
    for insert to authenticated with check ((select auth.uid()) = user_id);

drop policy if exists "moss_editar_proprios" on public.moss_agendamentos;
create policy "moss_editar_proprios" on public.moss_agendamentos
    for update to authenticated
    using ((select auth.uid()) = user_id)
    with check ((select auth.uid()) = user_id);

drop policy if exists "moss_excluir_proprios" on public.moss_agendamentos;
create policy "moss_excluir_proprios" on public.moss_agendamentos
    for delete to authenticated using ((select auth.uid()) = user_id);
