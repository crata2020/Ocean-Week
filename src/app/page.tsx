import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { heroContent, partnerLogos } from "@/lib/site-content";
import { cn, publicAssetPath } from "@/lib/utils";


import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export const revalidate = 0; // 항상 최신 설정을 불러오도록 캐시 비활성화

export default async function HomePage() {
  const supabaseAdmin = getSupabaseAdminClient();
  const { data: setting } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "youtube_live")
    .single();

  let isLiveActive = false;
  let finalYoutubeUrl = "";

  // @ts-ignore
  if (setting?.is_active && setting?.youtube_url) {
    isLiveActive = true;
    // @ts-ignore
    let url = setting.youtube_url;
    
    // 일반 유튜브 주소, youtu.be 단축 주소, 라이브 주소에서 영상 ID 추출
    const watchMatch = url.match(/(?:v=|youtu\.be\/|youtube\.com\/live\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/);
    
    if (watchMatch && watchMatch[1]) {
      // 추출한 영상 ID로 올바른 embed 주소 생성
      finalYoutubeUrl = `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&mute=1&rel=0`;
    } else {
      // 매칭되지 않는 경우 (이미 파라미터가 포함된 embed 주소일 수도 있음)
      finalYoutubeUrl = `${url}${url.includes('?') ? '&' : '?'}autoplay=1&mute=1`;
    }
  }

  return (
    <div className="flex min-h-screen flex-col font-sans bg-white dark:bg-slate-950">
      {/* 1. Logo Hero Section (Always visible as the main identity) */}
      <section className="relative flex h-[85vh] min-h-[600px] w-full items-center justify-center overflow-hidden">
        {/* Background Image with Dark Navy Deep Ocean Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroContent.image}
            alt="해양주간 2026 메인 배경"
            fill
            priority
            className="animate-in fade-in zoom-in-105 object-cover object-center duration-1000"
          />
          <div className="absolute inset-0 bg-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.5)_100%)]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center px-4 text-center md:px-8">
          <div className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both duration-700 ease-out">
            <Badge
              variant="outline"
              className="mb-6 rounded-full border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-sky-100 backdrop-blur-md"
            >
              {heroContent.eyebrow}
            </Badge>
          </div>
          <h1 className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both mb-8">
            <span className="sr-only">{heroContent.title}</span>
            <div className="flex flex-col items-center">
              <div className="relative h-[80px] w-[320px] md:h-[120px] md:w-[480px] mb-6">
                <Image
                  src={publicAssetPath("/images/logos/해양주간 로고만.svg")}
                  alt="2026 해양주간 Logo Graphic"
                  fill
                  className="object-contain brightness-0 invert"
                  priority
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <span
                  style={{ fontFamily: "var(--font-ssurround)" }}
                  className="text-[44px] md:text-[72px] font-bold leading-none tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
                >
                  2026 해양주간
                </span>
                <span
                  style={{ fontFamily: "var(--font-pretendard)" }}
                  className="text-[20px] md:text-[32px] font-bold uppercase tracking-[0.05em] text-white opacity-90"
                >
                  OCEAN WEEK
                </span>
              </div>
            </div>
          </h1>
          <div className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both mb-20 flex flex-col items-center gap-4 text-sky-100/90 delay-300 duration-700 ease-out sm:flex-row sm:gap-8">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-sky-400" />
              <span className="text-lg font-medium md:text-xl">{heroContent.period}</span>
            </div>
            <div className="flex items-center gap-2 mt-0">
              <MapPin className="h-5 w-5 text-sky-400" />
              <span className="text-lg font-medium md:text-xl">{heroContent.venue}</span>
            </div>
          </div>
          <div className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both flex flex-wrap justify-center gap-4 delay-500 duration-700 ease-out">
            <Link
              href="/register"
              className={buttonVariants({
                size: "lg",
                className:
                  "h-16 rounded-full bg-sky-500 px-10 text-xl md:text-2xl font-bold text-white shadow-[0_20px_40px_-15px_rgba(14,165,233,0.5)] transition-all hover:translate-y-[-2px] hover:bg-sky-400 tracking-wide",
              })}
            >
              사전등록 바로가기
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2 animate-bounce opacity-50">
          <div className="flex flex-col items-center gap-2">
            <div className="h-9 w-6 rounded-full border-2 border-white/30 flex justify-center p-1.5">
              <div className="h-1.5 w-1 rounded-full bg-white/50" />
            </div>
          </div>
        </div>

        {/* Hero → Content Seamless Fade Out */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-slate-950" />
      </section>

      {/* 2. YouTube Live Section (Visible only when active, below the Hero) */}
      {isLiveActive && (
        <section className="relative flex w-full flex-col items-center justify-center bg-slate-950 px-4 py-20 md:px-8">
          <div className="mb-10 flex flex-col items-center gap-3">
            <Badge variant="outline" className="animate-pulse border-red-500/50 bg-red-500/10 text-red-500">
              LIVE BROADCAST
            </Badge>
            <h2 className="text-3xl font-bold text-white md:text-4xl">실시간 현장 중계</h2>
          </div>
          <div className="relative w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10">
            <iframe 
              src={finalYoutubeUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </div>
        </section>
      )}

      <section className="relative z-20 -mt-8 bg-white dark:bg-slate-950 px-4 pb-20 pt-8">
        <div className="mx-auto max-w-[1400px] space-y-10 text-center">
          <div className="flex flex-col items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-slate-200 bg-slate-50/50 px-4 py-1 text-slate-500 font-semibold dark:border-slate-800"
            >
              PARTNERS
            </Badge>
            <h3 className="text-xl font-bold text-slate-400/80 tracking-tight">함께하는 기관</h3>
          </div>
          <div className="grid grid-cols-3 items-center justify-center gap-x-4 gap-y-2 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9 lg:gap-x-6 lg:gap-y-3">
            {partnerLogos.map((partner) => (
              <div
                key={partner.name}
                className="group relative flex items-center justify-center transition-all duration-300 hover:scale-105"
              >
                <div className={cn(
                  "relative flex items-center justify-center overflow-hidden rounded-md px-1 h-12 w-full md:h-14 lg:h-16",
                  !partner.logo && "bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
                )}>
                  {partner.logo ? (
                    <Image
                      src={publicAssetPath(`/images/logos/${partner.logo}`)}
                      alt={partner.name}
                      fill
                      className="object-contain transition-all duration-300"
                      style={{
                        transform: `scale(${partner.scale || 1}) translate(${partner.xOffset || '0'}, ${partner.yOffset || '0'})`,
                      }}
                    />
                  ) : (
                    <span className="text-[10px] md:text-xs font-bold text-slate-400 dark:text-slate-500 text-center leading-tight break-keep">
                      {partner.name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
