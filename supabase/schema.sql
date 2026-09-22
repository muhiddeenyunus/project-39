create table if not exists users (
  id uuid primary key,
  name text not null,
  email text unique not null,
  role text default 'CUSTOMER',
  created_at timestamptz default now()
);

create table if not exists products (
  id bigint primary key,
  brand text,
  title text not null,
  description text,
  price numeric not null,
  stock int default 0,
  category text,
  color text,
  rating numeric,
  image text
);

create table if not exists carts (
  id uuid primary key,
  user_id uuid unique not null,
  created_at timestamptz default now()
);

create table if not exists cart_items (
  id uuid primary key,
  cart_id uuid references carts(id) on delete cascade,
  product_id bigint,
  quantity int not null
);

create table if not exists orders (
  id uuid primary key,
  user_id uuid not null,
  total numeric not null,
  status text default 'PENDING',
  shipping_address text,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key,
  order_id uuid references orders(id) on delete cascade,
  product_id bigint,
  quantity int not null,
  price_at_purchase numeric not null
);

create table if not exists payments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  reference text unique not null,
  amount numeric not null,
  currency text default 'NGN',
  status text default 'PENDING',
  order_id uuid references orders(id) on delete set null,
  created_at timestamptz default now()
);

alter table orders add column if not exists paystack_reference text;
alter table orders add column if not exists payment_status text default 'UNPAID';
