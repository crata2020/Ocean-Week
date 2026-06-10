"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn, publicAssetPath } from "@/lib/utils";
import { navigationLinks, utilityLinks } from "@/lib/site-content";

import Image from "next/image";

const NAV_EDGE_OFFSET = 12;
const NAV_RIGHT_CONTROL_RESERVED_WIDTH = 32;
const NAV_ITEM_EDGE_TOLERANCE = 12;

function getNavigationAvailableWidth(scroller: HTMLDivElement) {
  const nav = scroller.closest("nav");
  if (!nav) return scroller.clientWidth;

  const navStyles = window.getComputedStyle(nav);
  return (
    nav.clientWidth -
    Number.parseFloat(navStyles.paddingLeft) -
    Number.parseFloat(navStyles.paddingRight)
  );
}

function getNavigationItems(scroller: HTMLDivElement) {
  const scrollerOffsetLeft = scroller.offsetLeft;

  return Array.from(scroller.querySelectorAll<HTMLLIElement>("li")).map((item) => ({
    left: item.offsetLeft - scrollerOffsetLeft,
    right: item.offsetLeft - scrollerOffsetLeft + item.offsetWidth,
    width: item.offsetWidth,
  }));
}

function getNavigationRightClip(scroller: HTMLDivElement, scrollLeft = scroller.scrollLeft) {
  if (window.matchMedia("(min-width: 640px)").matches) return 0;

  const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
  if (maxScrollLeft <= 2 || scrollLeft >= maxScrollLeft - 2) return 0;

  const availableWidth = getNavigationAvailableWidth(scroller);
  const safeViewportRight = scrollLeft + availableWidth - NAV_RIGHT_CONTROL_RESERVED_WIDTH;
  const items = getNavigationItems(scroller);
  const lastFullRight = items.reduce((rightEdge, item) => {
    if (
      item.right <= safeViewportRight + NAV_ITEM_EDGE_TOLERANCE &&
      item.right > scrollLeft + 1
    ) {
      return Math.max(rightEdge, item.right);
    }

    return rightEdge;
  }, scrollLeft);

  return Math.max(0, Math.ceil(availableWidth - (lastFullRight - scrollLeft) - 2));
}

function getNavigationNextTarget(scroller: HTMLDivElement) {
  const availableWidth = getNavigationAvailableWidth(scroller);
  const safeViewportRight =
    scroller.scrollLeft + availableWidth - NAV_RIGHT_CONTROL_RESERVED_WIDTH;
  const nextItem = getNavigationItems(scroller).find(
    (item) => item.right > safeViewportRight + NAV_ITEM_EDGE_TOLERANCE,
  );

  return nextItem ? nextItem.left - NAV_EDGE_OFFSET : scroller.scrollLeft + availableWidth;
}

function OceanWeekMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className="inline-flex flex-col items-center transition-opacity hover:opacity-80"
      aria-label="2026 해양주간 홈"
    >
      <div
        className={cn(
          "relative mb-1 h-[24px] w-[108px] sm:h-[30px] sm:w-[132px] lg:mb-2 lg:h-[36px] lg:w-[156px]",
          compact && "mb-0 h-[18px] w-[82px] sm:h-[22px] sm:w-[98px] lg:mb-0 lg:h-[24px] lg:w-[110px]",
        )}
      >
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
          className={cn(
            "text-[16px] font-bold leading-none tracking-tight text-primary sm:text-[18px] lg:text-[22px]",
            compact && "text-[13px] sm:text-[15px] lg:text-[16px]",
          )}
        >
          2026 해양주간
        </span>
        <span
          style={{ fontFamily: "var(--font-pretendard)" }}
          className={cn(
            "mt-0.5 text-[10px] font-bold leading-none tracking-[0.05em] text-muted-foreground sm:text-[12px] lg:mt-1 lg:text-[14px]",
            compact && "hidden",
          )}
        >
          OCEAN WEEK
        </span>
      </div>
    </Link>
  );
}

export function SiteHeader({ startsCollapsed = false }: { startsCollapsed?: boolean }) {
  const navScrollRef = useRef<HTMLDivElement>(null);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(startsCollapsed);
  const [canScrollNavigationLeft, setCanScrollNavigationLeft] = useState(false);
  const [canScrollNavigationRight, setCanScrollNavigationRight] = useState(false);
  const [navigationRightClip, setNavigationRightClip] = useState(0);
  const isLiveCollapsible = startsCollapsed;
  const isCollapsed = isLiveCollapsible && isHeaderCollapsed;

  const syncNavigationState = useCallback((nextScrollLeft?: number) => {
    const scroller = navScrollRef.current;
    if (!scroller) return;

    const scrollLeft = nextScrollLeft ?? scroller.scrollLeft;
    const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    setCanScrollNavigationLeft(scrollLeft > 2);
    setCanScrollNavigationRight(maxScrollLeft > 2 && scrollLeft < maxScrollLeft - 2);
    setNavigationRightClip(getNavigationRightClip(scroller, scrollLeft));
  }, []);

  const updateNavigationOverflow = useCallback(() => {
    syncNavigationState();
  }, [syncNavigationState]);

  const scrollNavigationLeft = useCallback(() => {
    const scroller = navScrollRef.current;
    if (!scroller) return;

    const maxScrollLeft = Math.max(0, scroller.scrollWidth - scroller.clientWidth);
    const pageStep = Math.max(120, getNavigationAvailableWidth(scroller) - 96);
    const previousBoundary = scroller.scrollLeft - pageStep * 0.8;
    const previousItems = getNavigationItems(scroller).filter((item) => item.left < previousBoundary);
    const previousItem = previousItems.at(-1);
    const previousScrollLeft = previousItem
      ? previousItem.left - NAV_EDGE_OFFSET
      : scroller.scrollLeft - pageStep;
    const targetScrollLeft = Math.max(0, previousScrollLeft);
    const finalScrollLeft = targetScrollLeft < 40 ? 0 : targetScrollLeft;

    syncNavigationState(finalScrollLeft);

    scroller.scrollTo({
      left: finalScrollLeft,
      behavior: "auto",
    });
  }, [syncNavigationState]);

  const scrollNavigationRight = useCallback(() => {
    const scroller = navScrollRef.current;
    if (!scroller) return;

    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;
    const targetScrollLeft = Math.min(maxScrollLeft, Math.max(0, getNavigationNextTarget(scroller)));
    const finalScrollLeft =
      maxScrollLeft - targetScrollLeft < 40 ? maxScrollLeft : targetScrollLeft;

    syncNavigationState(finalScrollLeft);

    scroller.scrollTo({
      left: finalScrollLeft,
      behavior: "auto",
    });
  }, [syncNavigationState]);

  useEffect(() => {
    const scroller = navScrollRef.current;
    if (!scroller) return;

    const syncFrame = window.requestAnimationFrame(() => syncNavigationState());

    const handleScroll = () => syncNavigationState();
    const handleResize = () => syncNavigationState();
    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(() => syncNavigationState());

    scroller.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    resizeObserver?.observe(scroller);
    if (scroller.firstElementChild) {
      resizeObserver?.observe(scroller.firstElementChild);
    }

    return () => {
      window.cancelAnimationFrame(syncFrame);
      scroller.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      resizeObserver?.disconnect();
    };
  }, [syncNavigationState]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-white/98 backdrop-blur supports-[backdrop-filter]:bg-white/95">
      <div className="h-1 w-full bg-[linear-gradient(90deg,rgba(122,201,187,0.85)_0%,rgba(52,126,191,0.85)_58%,rgba(241,187,95,0.8)_100%)]" />
      <div
        className={cn(
          "mx-auto flex max-w-7xl flex-col px-3 sm:px-5 lg:px-8",
          isCollapsed ? "py-2" : "gap-2 py-2 sm:gap-3 sm:py-3 lg:gap-5 lg:py-4",
        )}
      >
        <div
          className={cn(
            "grid items-center gap-3",
            isCollapsed ? "grid-cols-[1fr_auto_1fr]" : "grid-cols-[1fr_auto_1fr] lg:items-start",
          )}
        >
          <div className="min-w-0">
            {isLiveCollapsible && !isCollapsed ? (
              <button
                type="button"
                aria-label="메뉴 접기"
                aria-expanded="true"
                onClick={() => setIsHeaderCollapsed(true)}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-sky-100 bg-sky-50 px-2.5 text-[11px] font-bold text-sky-800 shadow-[0_12px_26px_-22px_rgba(29,84,111,0.55)] transition-colors hover:bg-sky-100 sm:h-9 sm:text-xs"
              >
                메뉴 접기
                <ChevronUp className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>

          <div className="flex min-w-0 justify-center">
            <OceanWeekMark compact={isCollapsed} />
          </div>

          <div className="flex min-w-0 flex-wrap justify-end gap-1.5 lg:gap-2">
            {isCollapsed ? (
              <button
                type="button"
                aria-label="메뉴 펼치기"
                aria-expanded="false"
                onClick={() => setIsHeaderCollapsed(false)}
                className="inline-flex h-8 items-center gap-1 rounded-md border border-sky-100 bg-white px-2.5 text-[11px] font-bold text-sky-800 shadow-[0_12px_26px_-22px_rgba(29,84,111,0.55)] transition-colors hover:bg-sky-50 sm:h-9 sm:text-xs"
              >
                메뉴 펼치기
                <ChevronDown className="h-3.5 w-3.5" />
              </button>
            ) : (
              utilityLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-label={link.label}
                  className={cn(
                    buttonVariants({
                      variant: "outline",
                      size: "lg",
                      className:
                        "h-8 w-[3.25rem] min-w-0 rounded-md border-border bg-white px-0 text-[12px] font-semibold text-primary shadow-[0_12px_26px_-22px_rgba(29,84,111,0.45)] hover:border-primary/35 hover:bg-accent hover:text-accent-foreground sm:h-9 sm:w-auto sm:px-3 sm:text-sm lg:h-10 lg:min-w-28 lg:px-4",
                    }),
                  )}
                >
                  <span className="sm:hidden">
                    {link.label === "사전등록현황" ? "현황" : "등록"}
                  </span>
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              ))
            )}
          </div>
        </div>

        {!isCollapsed && <Separator className="hidden bg-border/80 md:block" />}

        {!isCollapsed && <nav aria-label="주요 메뉴" className="relative -mx-3 px-3 pb-0.5 sm:mx-0 sm:px-0">
          <div
            ref={navScrollRef}
            onScroll={updateNavigationOverflow}
            style={
              navigationRightClip > 0
                ? { clipPath: `inset(0 ${navigationRightClip}px 0 0)` }
                : undefined
            }
            className="overflow-x-auto pr-14 [-ms-overflow-style:none] [scrollbar-width:none] sm:pr-0 [&::-webkit-scrollbar]:hidden"
          >
            <ul className="flex w-max min-w-full flex-nowrap items-center justify-start gap-x-1 text-sm font-semibold text-foreground sm:justify-center sm:gap-x-2 sm:text-[0.95rem] lg:w-auto lg:flex-wrap lg:gap-x-3 lg:gap-y-2 lg:text-[1rem] xl:gap-x-5">
              {navigationLinks.map((link) => (
                <li key={link.href} className="group relative shrink-0">
                  <Link
                    href={link.href}
                    className="inline-flex items-center gap-1 whitespace-nowrap rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-accent/65 hover:text-accent-foreground sm:px-3 sm:py-2"
                  >
                    {link.label}
                    {link.label === "행사일정" && <ChevronDown className="h-4 w-4 opacity-50" />}
                  </Link>
                  {link.label === "행사일정" && (
                    <div className="invisible absolute left-1/2 top-full z-50 hidden -translate-x-1/2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:block">
                      <div className="w-80 rounded-md border border-border bg-white p-2 shadow-lg ring-1 ring-black/5 flex flex-col gap-1">
                        <Link href="/schedule?modal=leader" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">기관장 토크 콘서트</Link>
                        <div className="px-3 py-2">
                          <span className="text-[13px] font-bold text-slate-400">해양경제포럼</span>
                          <div className="mt-1 flex flex-col gap-1">
                            <Link href="/schedule?modal=arctic-route" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 북극항로 비연안국의 권리</Link>
                            <Link href="/schedule?modal=blue-carbon-am" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 블루카본의 잠재력과 탄소시장화 전략</Link>
                            <Link href="/schedule?modal=blue-carbon-pm" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 블루카본 탄소시장 반영방안</Link>
                            <Link href="/schedule?modal=offshore-wind" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 해상풍력 특별법 시대 개막 - 기회와 도전, 미래전략</Link>
                          </div>
                        </div>
                        <Link href="/schedule?modal=ocean-awards" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">제2회 대한민국해양지도자 대상 시상식</Link>
                        <Link href="/schedule?modal=summit" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">해양산업리더스 서밋</Link>
                        <div className="px-3 py-2">
                          <span className="text-[13px] font-bold text-slate-400">온라인 컨퍼런스</span>
                          <div className="mt-1 flex flex-col gap-1">
                            <Link href="/schedule?modal=arctic-industry" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 북극항로 연관산업 발전 방안</Link>
                            <Link href="/schedule?modal=arctic-industry&focus=opinion" className="block px-2 py-1.5 text-[13px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 rounded-md transition-colors">- 의견 남기기</Link>
                            <Link href="/schedule?modal=arctic-education" className="block px-2 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">- 북극항로시대 극지교육의 방향성</Link>
                            <Link href="/schedule?modal=arctic-education&focus=opinion" className="block px-2 py-1.5 text-[13px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 hover:text-teal-800 rounded-md transition-colors">- 의견 남기기</Link>
                          </div>
                        </div>
                        <Link href="/schedule?modal=youth-presentation" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">청소년 프레젠테이션대회</Link>
                        <Link href="/schedule?modal=polar-lecture" className="block px-3 py-2 text-sm font-medium text-slate-700 hover:bg-sky-50 hover:text-sky-700 rounded-md transition-colors">극지시민강좌</Link>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {canScrollNavigationLeft && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex w-20 items-center justify-start bg-gradient-to-r from-white via-white/95 to-transparent pl-3 sm:hidden">
              <button
                type="button"
                aria-label="왼쪽 메뉴 보기"
                onClick={scrollNavigationLeft}
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white text-sky-700 shadow-[0_10px_24px_-14px_rgba(29,84,111,0.65)] transition-colors hover:bg-sky-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </div>
          )}

          {canScrollNavigationRight && (
            <div className="pointer-events-none absolute inset-y-0 right-0 flex w-20 items-center justify-end bg-gradient-to-l from-white via-white/95 to-transparent pr-3 sm:hidden">
              <button
                type="button"
                aria-label="오른쪽 메뉴 보기"
                onClick={scrollNavigationRight}
                className="pointer-events-auto inline-flex h-8 w-8 items-center justify-center rounded-full border border-sky-100 bg-white text-sky-700 shadow-[0_10px_24px_-14px_rgba(29,84,111,0.65)] transition-colors hover:bg-sky-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </nav>}
      </div>
    </header>
  );
}
