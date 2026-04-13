import Image from "next/image";
import Link from "next/link";

import {
  heroContent,
  navigationLinks,
  partnerLogos,
  scheduleOverview,
} from "@/lib/site-content";

const logoPalette = [
  "from-[#f8fbfb] via-white to-[#eef7f6] text-[#0f6e86]",
  "from-[#fffaf2] via-white to-[#fff4de] text-[#9c6510]",
  "from-[#f8f7ff] via-white to-[#edf4ff] text-[#285d9a]",
  "from-[#f4fbf8] via-white to-[#eefcf5] text-[#19735c]",
] as const;

export default function HomePage() {
  return (
    <div className="pb-24">
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-10 pt-8 sm:px-8">
        <div className="relative overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-900">
          <Image
            src={heroContent.image}
            alt="광안리와 광안대교 전경"
            width={1600}
            height={900}
            priority
            className="h-[25rem] w-full object-cover object-center sm:h-[29rem] lg:h-[33rem]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 py-8 text-white sm:px-10 sm:py-10 lg:max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/75">
              {heroContent.eyebrow}
            </p>
            <h1 className="max-w-2xl text-[2rem] font-semibold leading-tight sm:text-[3rem]">
              {heroContent.title}
            </h1>
            <p className="text-lg font-medium text-[#f6c56b]">{heroContent.period}</p>
            <p className="max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
              {heroContent.description}
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/register"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#0f6e86] px-5 text-sm font-semibold text-white transition hover:bg-[#0b5567]"
              >
                사전등록 바로가기
              </Link>
              <Link
                href="/schedule"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/40 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                행사일정 보기
              </Link>
            </div>
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-[1.5rem] border border-slate-200 bg-white px-6 py-7 shadow-[0_25px_60px_-45px_rgba(15,110,134,0.4)]">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f6e86]">
              Main Navigation
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-800 transition hover:border-[#0f6e86] hover:text-[#0f6e86]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-slate-200 bg-[var(--panel-strong)] px-6 py-7">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f6e86]">
              Schedule Preview
            </p>
            <ul className="mt-5 space-y-3">
              {scheduleOverview.map((item) => (
                <li
                  key={item.day}
                  className="flex items-start justify-between gap-3 border-b border-slate-200/70 pb-3 last:border-b-0 last:pb-0"
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                      {item.day}
                    </p>
                    <p className="mt-1 font-semibold text-slate-900">{item.title}</p>
                  </div>
                  <span className="text-sm font-medium text-[#0f6e86]">{item.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-4 sm:px-8">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f6e86]">
            Partners
          </p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
              협력기관 로고 영역
            </h2>
            <p className="max-w-xl text-sm leading-6 text-slate-600">
              현재는 실제 로고 파일을 받기 전 단계라 기관명을 중심으로 임시 배치했습니다. 로고 파일이 준비되면 동일한 그리드에 그대로 교체할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {partnerLogos.map((name, index) => (
            <div
              key={name}
              className={`flex min-h-28 flex-col justify-between rounded-xl border border-slate-200 bg-gradient-to-br px-5 py-4 shadow-[0_18px_40px_-32px_rgba(15,110,134,0.35)] ${
                logoPalette[index % logoPalette.length]
              }`}
            >
              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
                Partner {String(index + 1).padStart(2, "0")}
              </span>
              <p className="text-lg font-semibold leading-snug">{name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
