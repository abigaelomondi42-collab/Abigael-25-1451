-- =========================================================
-- GlowUp Hair & Beauty — Supabase schema
-- Run this once in your Supabase project's SQL Editor
-- (Project → SQL Editor → New query → paste → Run)
-- =========================================================

-- ---------------------------------------------------------
-- 1. PROFILES
-- Extends auth.users with the extra info we collect at
-- registration (full name, phone). auth.users itself is
-- managed by Supabase Auth — we never write to it directly.
-- ---------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  phone text,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row the moment someone registers,
-- pulling full_name/phone out of the signup metadata.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'phone'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------
-- 2. SERVICES
-- The price list, editable from the Supabase Table Editor
-- instead of hard-coded in the page.
-- ---------------------------------------------------------
create table if not exists public.services (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  category text not null,
  price_kes numeric not null,
  sort_order int default 0
);

alter table public.services enable row level security;

create policy "Anyone can view services"
  on public.services for select
  using (true);

insert into public.services (name, category, price_kes, sort_order) values
  ('Basic Haircut', 'Hair', 1500, 1),
  ('Full Hair Color', 'Hair', 8000, 2),
  ('Box Braids', 'Braiding', 3000, 3),
  ('Deep Conditioning', 'Treatment', 5000, 4),
  ('Full Face Makeup', 'Makeup', 7000, 5),
  ('Classic Manicure', 'Nails', 1000, 6);

-- ---------------------------------------------------------
-- 3. BOOKINGS
-- Each row belongs to the signed-in user who made it.
-- ---------------------------------------------------------
create table if not exists public.bookings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  service_name text not null,
  price_kes numeric,
  preferred_date date not null,
  notes text,
  status text default 'pending',
  created_at timestamptz default now()
);

alter table public.bookings enable row level security;

create policy "Users can view own bookings"
  on public.bookings for select
  using (auth.uid() = user_id);

create policy "Users can create own bookings"
  on public.bookings for insert
  with check (auth.uid() = user_id);

create policy "Users can cancel own bookings"
  on public.bookings for update
  using (auth.uid() = user_id);
