-- Execute somente em um projeto seu após revisar este manual e o schema.
-- Não foi executado em produção pela MOSS nesta entrega.
-- Esta tabela contém apenas catálogo PÚBLICO, nunca clientes ou pedidos.
create table if not exists public.passo_products (
  id text primary key check (id ~ '^[a-z0-9-]{1,60}$'),
  name text not null check (length(name) between 1 and 119),
  category text not null check (category in ('Tênis','Sapatos','Sandálias','Botas')),
  style text not null check (style in ('Clássico','Contemporâneo')),
  color text not null,
  price integer not null check (price > 0 and price < 1000000),
  sizes integer[] not null check (cardinality(sizes)>0 and sizes <@ array[34,35,36,37,38,39,40,41,42,43,44,45,46]),
  image text not null check (image ~ '^[a-z0-9-]+\.webp$'),
  alt text not null,
  tag text not null,
  description text not null,
  active boolean not null default true,
  position integer not null default 0
);
alter table public.passo_products enable row level security;
revoke all on public.passo_products from anon, authenticated;
grant select on public.passo_products to anon, authenticated;
drop policy if exists passo_read_active on public.passo_products;
create policy passo_read_active on public.passo_products
for select to anon, authenticated using (active = true);
-- Não existe policy de INSERT/UPDATE/DELETE: navegador não pode editar catálogo.
-- Administração apenas via painel do projeto/SQL por proprietário autorizado.
insert into public.passo_products
(id,name,category,style,color,price,sizes,image,alt,tag,description,position) values
('urban-air','Urban Air','Tênis','Contemporâneo','Branco + laranja',32990,array[36,37,38,39,40,41,42],'sneaker-claro.webp','Tênis branco com detalhes alaranjados','Cidade em movimento','Referência visual de tênis baixo com cadarço. Produto, preço e grade fictícios.',1),
('scarpin-petroleo','Scarpin Petróleo','Sapatos','Clássico','Azul-petróleo',25990,array[34,35,36,37,38,39],'scarpin.webp','Par de scarpins azul-petróleo de salto fino','Clássico revisitado','Referência visual de bico fino e salto alto. Produto, preço e grade fictícios.',2),
('plataforma-vinho','Plataforma Vinho','Sandálias','Contemporâneo','Vinho + natural',28990,array[34,35,36,37,38,39],'sandalia.webp','Sandálias vinho de tiras largas e plataforma','Formas em destaque','Referência visual de tiras largas e plataforma. Produto, preço e grade fictícios.',3),
('bota-terra','Bota Terra','Botas','Clássico','Marrom',42990,array[35,36,37,38,39,40],'bota.webp','Botas marrons de cano curto','Para atravessar estações','Referência fotográfica de bota em tom terroso. Produto, preço e grade fictícios.',4)
on conflict (id) do nothing;
-- Para verificar RLS, use as chaves públicas em chamadas REST de teste;
-- o SQL Editor do proprietário possui privilégios e não testa o papel anon.
