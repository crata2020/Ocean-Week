import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { heroContent } from "@/lib/site-content";
import { cn, publicAssetPath } from "@/lib/utils";
import { PartnerLogoGrid } from "@/components/partner-logo-grid";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { getYoutubeLiveHeroState } from "@/lib/youtube-live";

export const revalidate = 0; // 항상 최신 설정을 불러오도록 캐시 비활성화

export default async function HomePage() {
  const supabaseAdmin = getSupabaseAdminClient();
  const { data: setting } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "youtube_live")
    .single();

  const liveSetting = setting as unknown as {
    is_active?: boolean | null;
    youtube_url?: string | null;
  } | null;
  const liveHero = getYoutubeLiveHeroState({
    isActive: Boolean(liveSetting?.is_active),
    youtubeUrl: liveSetting?.youtube_url,
  });

  return (
    <div className="flex min-h-screen w-full max-w-full flex-col overflow-x-hidden font-sans bg-white dark:bg-slate-950">
      {/* 1. Immersive Hero Section or YouTube Live */}
      {liveHero.mode !== "off" ? (
        <section className="relative flex min-h-[calc(100svh-59px)] w-full items-center justify-center bg-slate-950 px-3 py-6 sm:min-h-[calc(100svh-69px)] md:px-8 md:py-8">
          {liveHero.mode === "video" ? (
            <div className="relative aspect-video w-full max-w-[min(86rem,140vh)] shrink-0 overflow-hidden rounded-xl bg-black shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] ring-1 ring-white/10 md:rounded-2xl">
              <iframe
                src={liveHero.embedUrl}
                title="2026 해양주간 온라인 컨퍼런스 라이브"
                className="absolute inset-0 h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="flex min-h-[min(62vh,640px)] w-full max-w-7xl flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-5 py-12 text-center shadow-[0_0_50px_-16px_rgba(0,0,0,0.85)] sm:min-h-[min(64vh,680px)] md:rounded-2xl md:px-10">
              <Badge
                variant="outline"
                className="mb-5 rounded-full border-sky-300/30 bg-sky-300/10 px-4 py-1.5 text-xs font-bold text-sky-100 md:text-sm"
              >
                ONLINE CONFERENCE
              </Badge>
              <p className="text-[clamp(1.7rem,6vw,3.75rem)] font-black leading-tight text-white">
                {liveHero.message}
              </p>
              <p className="mt-5 text-sm font-medium leading-7 text-sky-100/80 md:text-lg">
                라이브 링크가 준비되면 이 화면에서 바로 시청하실 수 있습니다.
              </p>
            </div>
          )}
        </section>
      ) : (
      <section className="relative flex min-h-[calc(100svh-116px)] w-full max-w-full items-center justify-center overflow-hidden py-9 sm:py-12 md:h-[calc(100vh-160px)] md:min-h-[550px] md:py-0">
        {/* Background Image with Dark Navy Deep Ocean Gradient */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroContent.image}
            alt="해양주간 2026 메인 배경"
            fill
            priority
            className="animate-in fade-in zoom-in-105 object-cover object-center duration-1000 pointer-events-none"
          />
          <div className="absolute inset-0 bg-slate-950/18 md:bg-slate-950/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/18 via-transparent to-slate-950/40 md:bg-gradient-to-r md:from-slate-950/72 md:via-transparent md:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-slate-950/38 via-slate-950/12 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex w-full max-w-full flex-col items-center px-5 text-center md:max-w-7xl md:px-8">
          <div className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both duration-700 ease-out">
            <Badge
              variant="outline"
              className="mb-4 rounded-full border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-sky-100 backdrop-blur-md sm:text-sm md:mb-5 md:px-4"
            >
              {heroContent.eyebrow}
            </Badge>
          </div>
          <h1 className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both mb-6 md:mb-7">
            <span className="sr-only">{heroContent.title}</span>
            <div className="flex flex-col items-center">
              <div className="relative mb-4 h-[54px] w-[min(240px,76vw)] sm:h-[64px] sm:w-[280px] md:mb-5 md:h-[115px] md:w-[440px]">
                <Image
                  src={publicAssetPath("/images/logos/해양주간 로고만.svg")}
                  alt="2026 해양주간 Logo Graphic"
                  fill
                  className="object-contain brightness-0 invert pointer-events-none"
                  priority
                />
              </div>
              <div className="flex flex-col items-center gap-3">
                <span
                  style={{ fontFamily: "var(--font-ssurround)" }}
                  className="text-[clamp(1.95rem,9vw,2.35rem)] font-bold leading-none tracking-tight text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)] md:text-[68px]"
                >
                  2026 해양주간
                </span>
                <span
                  style={{ fontFamily: "var(--font-pretendard)" }}
                  className="text-[clamp(0.95rem,3.6vw,1.1rem)] font-bold uppercase tracking-[0.05em] text-white opacity-95 drop-shadow-[0_3px_12px_rgba(0,0,0,0.55)] md:text-[30px]"
                >
                  OCEAN WEEK
                </span>
              </div>
            </div>
          </h1>
          <div className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both mb-8 flex flex-col items-center gap-2.5 text-sky-100/95 delay-300 duration-700 ease-out sm:flex-row sm:gap-5 md:mb-14 md:gap-8">
            <div className="flex max-w-full items-center gap-2 rounded-full bg-slate-950/44 px-3 py-1.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:bg-transparent sm:p-0 sm:shadow-none">
              <CalendarDays className="h-4 w-4 shrink-0 text-sky-300 md:h-5 md:w-5 md:text-sky-400" />
              <span className="text-sm font-medium sm:text-base md:text-xl">{heroContent.period}</span>
            </div>
            <div className="flex max-w-full items-center gap-2 rounded-full bg-slate-950/44 px-3 py-1.5 shadow-[0_10px_30px_-18px_rgba(0,0,0,0.9)] backdrop-blur-sm sm:bg-transparent sm:p-0 sm:shadow-none">
              <MapPin className="h-4 w-4 shrink-0 text-sky-300 md:h-5 md:w-5 md:text-sky-400" />
              <span className="text-sm font-medium sm:text-base md:text-xl">{heroContent.venue}</span>
            </div>
          </div>
          <div className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both flex w-full flex-wrap justify-center gap-4 delay-500 duration-700 ease-out">
            <Link
              href="/register"
              className={buttonVariants({
                size: "lg",
                className:
                  "h-[3.25rem] min-h-[3.25rem] w-full max-w-[18rem] shrink whitespace-normal rounded-full bg-sky-500 px-6 py-3 text-base font-bold tracking-wide !text-white shadow-[0_20px_40px_-15px_rgba(14,165,233,0.5)] transition-all hover:translate-y-[-2px] hover:bg-sky-400 sm:h-14 sm:max-w-none sm:w-auto sm:text-lg md:h-16 md:px-10 md:text-2xl [&_svg]:!text-white",
              })}
            >
              사전등록 바로가기
              <ChevronRight className="ml-2 h-6 w-6" />
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce opacity-50 sm:block md:bottom-8">
          <div className="flex flex-col items-center gap-2">
            <div className="h-9 w-6 rounded-full border-2 border-white/30 flex justify-center p-1.5">
              <div className="h-1.5 w-1 rounded-full bg-white/50" />
            </div>
          </div>
        </div>

        {/* Hero → Content Seamless Fade Out */}
        <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white via-white/40 to-transparent dark:from-slate-950" />
      </section>
      )}

      <section
        className={cn(
          "relative z-20 w-full max-w-full overflow-x-hidden bg-white px-4 pb-14 pt-8 dark:bg-slate-950 sm:px-5 md:px-4 md:pb-20 lg:px-0 xl:px-4",
          liveHero.mode === "off" && "-mt-6 md:-mt-8",
        )}
      >
        <div className="mx-auto w-full max-w-[1800px] space-y-6 text-center md:space-y-10">
          <div className="flex flex-col items-center gap-2 md:gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-slate-200 bg-slate-50/50 px-4 py-1 text-xs font-semibold text-slate-500 dark:border-slate-800 md:text-sm"
            >
              PARTNERS
            </Badge>
            <h3 className="text-lg font-bold tracking-tight text-slate-400/80 md:text-xl">함께하는 기관</h3>
          </div>
          <PartnerLogoGrid />
        </div>
      </section>

    </div>
  );
}
