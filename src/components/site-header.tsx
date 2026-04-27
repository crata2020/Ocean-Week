import Link from "next/link";
import { ChevronDown } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, publicAssetPath } from "@/lib/utils";
import { navigationLinks, utilityLinks } from "@/lib/site-content";

import Image from "next/image";

function OceanWeekMark() {
  return (
    <Link
      href="/"
      className="inline-flex flex-col items-center transition-opacity hover:opacity-80"
      aria-label="2026 해양주간 홈"
    >
      <div className="relative h-[36px] w-[156px] mb-2">
        <Image
          src={publicAssetPath("/images/logos/해양주간 로고만.svg")}
          alt="2026 해양주간"
          fill
          className="object-contain"
          priority
        />
      </div>
      <div className="flex flex-col items-center gap-1.5">
        <span
          style={{ fontFamily: "var(--font-ssurround)" }}
          className="text-[22px] font-bold leading-none tracking-tight text-primary"
        >
          2026 해양주간
        </span>
        <span
          style={{ fontFamily: "var(--font-pretendard)" }}
          className="text-[14px] font-bold tracking-[0.05em] leading-none mt-1 text-muted-foreground"
        >
          OCEAN WEEK
        </span>
      </div>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="h-1 w-full bg-[linear-gradient(90deg,rgba(122,201,187,0.85)_0%,rgba(52,126,191,0.85)_58%,rgba(241,187,95,0.8)_100%)]" />
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-4 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-start">
          <div className="hidden lg:block" />

          <div className="flex justify-center">
            <OceanWeekMark />
          </div>

          <div className="flex flex-wrap justify-center gap-2 lg:justify-end">
            {utilityLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  buttonVariants({
                    variant: "outline",
                    size: "lg",
                    className:
                      "h-10 min-w-28 rounded-md border-border bg-white px-4 text-sm font-semibold text-primary shadow-[0_12px_26px_-22px_rgba(29,84,111,0.45)] hover:border-primary/35 hover:bg-accent hover:text-accent-foreground",
                  }),
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Separator className="bg-border/80" />

        <nav aria-label="주요 메뉴">
          <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[1rem] font-semibold text-foreground sm:gap-x-5">
            {navigationLinks.map((link) => (
              <li key={link.href} className="relative group">
                <Link
                  href={link.href}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent/65 hover:text-accent-foreground"
                >
                  {link.label}
                  {link.label === "행사일정" && <ChevronDown className="h-4 w-4 opacity-50" />}
                </Link>
                {link.label === "행사일정" && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="w-72 rounded-md border border-border bg-white p-2 shadow-lg ring-1 ring-black/5 flex flex-col gap-1">
                      <Link href="/schedule?modal=leader" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">기관장토크</Link>
                      <div className="px-3 py-2">
                        <span className="text-[13px] font-bold text-slate-400">해양경제포럼</span>
                        <div className="mt-1 flex flex-col gap-1">
                          <Link href="/schedule?modal=arctic-route-presentation" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 북극항로 비연안국의 권리</Link>
                          <Link href="/schedule?modal=blue-carbon-am" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 블루카본의 잠재력과 탄소시장화 전략</Link>
                          <Link href="/schedule?modal=offshore-wind" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 해상풍력 특별법 시대 개막</Link>
                        </div>
                      </div>
                      <Link href="/schedule?modal=ocean-awards" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">제 2회 대한민국해양지도자 대상 시상식</Link>
                      <Link href="/schedule?modal=summit" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">해양산업리더스 서밋</Link>
                      <Link href="/schedule?modal=arctic-industry" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">온라인 컨퍼런스</Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
