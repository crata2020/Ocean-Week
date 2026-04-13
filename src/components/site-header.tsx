import Link from "next/link";

import { navigationLinks, utilityLinks } from "@/lib/site-content";

function OceanWeekMark() {
  return (
    <Link
      href="/"
      className="inline-flex flex-col items-center gap-1 text-center"
      aria-label="2026 해양주간 홈"
    >
      <div className="relative h-8 w-40">
        <span className="absolute left-12 top-0 h-3 w-3 rounded-full bg-[#f4b44b]" />
        <span className="absolute left-3 top-4 h-[2px] w-16 -rotate-6 rounded-full bg-[#7ec7b8]" />
        <span className="absolute left-14 top-[14px] h-[2px] w-16 rotate-3 rounded-full bg-[#2a8fd6]" />
        <span className="absolute left-8 top-[9px] h-[2px] w-20 rounded-full bg-[#9bd89d]" />
      </div>
      <span className="font-[family-name:var(--font-display)] text-[1.15rem] uppercase tracking-[0.38em] text-[#0f6e86]">
        Ocean Week
      </span>
      <span className="text-[1.75rem] font-semibold tracking-[-0.02em] text-slate-900 sm:text-[2rem]">
        2026 해양주간
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 pb-6 pt-4 sm:px-8">
        <div className="flex justify-end gap-3">
          {utilityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex min-w-28 items-center justify-center rounded-md border border-[#0f6e86] px-4 py-2 text-sm font-semibold text-[#0f6e86] transition hover:bg-[#0f6e86] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <OceanWeekMark />
        </div>

        <nav aria-label="주요 메뉴">
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-slate-200/80 pt-5 text-[1.05rem] font-semibold text-slate-900">
            {navigationLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition hover:text-[#0f6e86]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
