# 2026 해양주간 홈페이지

Next.js App Router, Tailwind CSS, Supabase 기반의 행사 홈페이지입니다.

## 시작하기

1. 의존성 설치
   - `pnpm install`
2. 환경변수 설정
   - `.env.example`을 참고해 `.env.local` 파일 생성
3. Supabase SQL 실행
   - `supabase/migrations/20260413_create_registrations.sql`
4. 개발 서버 실행
   - `pnpm dev`

## 주요 페이지

- `/` 홈
- `/intro` 행사소개
- `/schedule` 행사일정
- `/events` 부대행사
- `/sketch` 현장스케치
- `/photos` 부산바다사진
- `/qna` Q&A
- `/register` 사전등록
- `/registration-status` 사전등록현황

## 등록 데이터

- 이름
- 기관
- 직책
- 전화번호
- 이메일

전화번호는 정규화 후 중복을 막고, 같은 번호가 이미 등록되어 있으면 현황 페이지에서 수정하도록 구성했습니다.
