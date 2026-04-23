import Link from "next/link";

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
    <header className="border-b border-border/70 bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-white/95">
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
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-accent/65 hover:text-accent-foreground"
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
