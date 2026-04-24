create table public.conference_opinions (
  id uuid default gen_random_uuid() primary key,
  session_id text not null,
  author_name text not null,
  password text not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) 설정
alter table public.conference_opinions enable row level security;

-- 누구나 조회 가능
create policy "Anyone can read conference_opinions"
on public.conference_opinions for select
to public
using (true);

-- 누구나 작성 가능
create policy "Anyone can insert conference_opinions"
on public.conference_opinions for insert
to public
with check (true);

-- 누구나 삭제 가능 (프론트엔드에서 비밀번호 일치 여부 확인 후 삭제 요청)
create policy "Anyone can delete conference_opinions"
on public.conference_opinions for delete
to public
using (true);
