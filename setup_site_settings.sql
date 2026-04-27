CREATE TABLE public.site_settings (
  id text PRIMARY KEY,
  is_active boolean DEFAULT false,
  youtube_url text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- 초기 데이터 삽입
INSERT INTO public.site_settings (id, is_active, youtube_url) 
VALUES ('youtube_live', false, '');

-- RLS (Row Level Security) 설정
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- 누구나 조회 가능 (메인 페이지 로딩 용)
CREATE POLICY "Anyone can read site_settings"
ON public.site_settings FOR SELECT
TO public
USING (true);

-- 관리자만 수정 가능해야 하지만, 임시로 누구나 수정 가능하도록 오픈
CREATE POLICY "Anyone can update site_settings"
ON public.site_settings FOR UPDATE
TO public
USING (true);
