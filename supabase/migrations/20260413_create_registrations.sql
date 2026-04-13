create extension if not exists "pgcrypto";

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  organization text not null,
  title text not null,
  phone_raw text not null,
  phone_normalized text not null unique,
  email text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists registrations_set_updated_at on public.registrations;

create trigger registrations_set_updated_at
before update on public.registrations
for each row
execute function public.set_updated_at();
