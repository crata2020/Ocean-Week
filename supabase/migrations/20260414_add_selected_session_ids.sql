alter table public.registrations
add column if not exists selected_session_ids text[] not null default '{}'::text[];
