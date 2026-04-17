import Image from "next/image";
import Link from "next/link";
import { CalendarDays, MapPin, ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { heroContent, partnerLogos } from "@/lib/site-content";




export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-white dark:bg-slate-950">
      {/* 1. Immersive Hero Section */}
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
          <h1 className="animate-in slide-in-from-bottom-8 fade-in fill-mode-both mb-6 max-w-5xl font-heading text-5xl font-bold tracking-tight text-white drop-shadow-xl delay-150 duration-700 ease-out sm:text-6xl md:text-7xl lg:text-8xl whitespace-pre-line">
            {heroContent.title}
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

      {/* Partners Section with refined spacing and background */}
      <section className="relative z-20 -mt-8 bg-white dark:bg-slate-950 px-4 pb-24 pt-8">
        <div className="mx-auto max-w-5xl space-y-12 text-center">
          <div className="flex flex-col items-center gap-3">
            <Badge
              variant="outline"
              className="rounded-full border-slate-200 bg-slate-50/50 px-4 py-1 text-slate-500 font-semibold dark:border-slate-800"
            >
              PARTNERS
            </Badge>
            <h3 className="text-xl font-bold text-slate-400/80 tracking-tight">함께하는 기관</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 tracking-widest text-slate-400 opacity-60 transition-all duration-700 pt-4 grayscale hover:grayscale-0 dark:text-slate-500 dark:opacity-80">
            {partnerLogos.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center text-lg font-bold transition-colors hover:text-sky-600 hover:opacity-100 dark:hover:text-sky-400"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
