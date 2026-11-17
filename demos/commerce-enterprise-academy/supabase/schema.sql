-- ============================================================
-- schema.sql — modelo relacional (PostgreSQL / Supabase)
-- ------------------------------------------------------------
-- Estrutura para o MODO SUPABASE (opcional). A demonstração local
-- continua funcionando sem executar este arquivo.
-- Todos os dados são FICTÍCIOS. Nenhuma tabela movimenta dinheiro.
-- ============================================================

create extension if not exists "pgcrypto";

-- Categorias ---------------------------------------------------
create table if not exists public.categories (
  id text primary key,
  name text not null,
  icon text
);

-- Produtos -----------------------------------------------------
create table if not exists public.products (
  id text primary key,
  category_id text references public.categories(id),
  name text not null,
  description text,
  price numeric(12,2) not null check (price >= 0),
  old_price numeric(12,2),
  image text,
  rating numeric(2,1) default 0,
  reviews integer default 0
);

-- Estoque (separado do produto, como em sistemas reais) --------
create table if not exists public.inventory (
  product_id text primary key references public.products(id) on delete cascade,
  quantity integer not null default 0 check (quantity >= 0),
  available boolean not null default true,
  updated_at timestamptz not null default now()
);

-- Clientes de teste --------------------------------------------
create table if not exists public.test_customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

-- Pedidos ------------------------------------------------------
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  customer_name text not null,
  customer_email text not null,
  shipping_id text,
  tracking text,
  status text not null default 'recebido',
  totals jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Itens dos pedidos --------------------------------------------
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id text not null references public.products(id),
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null,
  line_total numeric(12,2) not null
);

-- Histórico de pagamentos fictícios ----------------------------
create table if not exists public.payment_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  method text not null check (method in ('pix','card')),
  status text not null,
  external_id text,
  details jsonb,
  created_at timestamptz not null default now()
);

-- Eventos de entrega -------------------------------------------
create table if not exists public.delivery_events (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  status text not null,
  note text,
  created_at timestamptz not null default now()
);

-- Usuários administrativos -------------------------------------
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin',
  created_at timestamptz not null default now()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------
-- Visitantes podem LER catálogo, mas NÃO podem alterar preços,
-- estoque ou pedidos. Somente admins autenticados fazem escrita.
-- ============================================================

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.inventory enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.payment_events enable row level security;
alter table public.delivery_events enable row level security;
alter table public.admin_users enable row level security;

-- Leitura pública do catálogo ----------------------------------
create policy "catálogo legível por todos" on public.categories for select using (true);
create policy "produtos legíveis por todos" on public.products for select using (true);
create policy "estoque legível por todos" on public.inventory for select using (true);

-- Escrita restrita a administradores ---------------------------
create policy "admin escreve produtos" on public.products
  for all using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'));

create policy "admin escreve estoque" on public.inventory
  for all using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'));

-- Pedidos: o cliente vê apenas os seus (email igual ao do token).
create policy "cliente vê seus pedidos" on public.orders for select
  using (customer_email = auth.jwt() ->> 'email');

create policy "cliente cria pedido" on public.orders for insert
  with check (customer_email = auth.jwt() ->> 'email');

create policy "admin gerencia pedidos" on public.orders for all
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'));

-- Itens, pagamentos e entregas herdam a regra do pedido. -------
create policy "itens do próprio pedido" on public.order_items for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_email = auth.jwt() ->> 'email'));

create policy "pagamentos do próprio pedido" on public.payment_events for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_email = auth.jwt() ->> 'email'));

create policy "entregas do próprio pedido" on public.delivery_events for select
  using (exists (select 1 from public.orders o where o.id = order_id and o.customer_email = auth.jwt() ->> 'email'));

create policy "admin gerencia eventos" on public.payment_events for all
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'));

create policy "admin gerencia entregas" on public.delivery_events for all
  using (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'))
  with check (exists (select 1 from public.admin_users au where au.user_id = auth.uid() and au.role = 'admin'));

-- ============================================================
-- SEGURANÇA
-- ------------------------------------------------------------
-- NUNCA use service_role key no navegador. Chaves privilegiadas
-- pertencem a um backend seguro. Aqui usamos apenas a anon key,
-- que é pública e protegida pelas políticas RLS acima.
-- ============================================================
