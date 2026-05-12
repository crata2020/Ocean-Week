"use client";

import { partnerLogos } from "@/lib/site-content";
import { publicAssetPath } from "@/lib/utils";

export function PartnerLogoGrid() {
  const rowNumbers = Array.from(
    new Set(
      partnerLogos
        .map((partner) => partner.row)
        .filter((row): row is number => typeof row === "number"),
    ),
  ).sort((a, b) => a - b);

  const prevent = (e: React.MouseEvent | React.DragEvent) => {
    e.preventDefault();
    return false;
  };

  return (
    <div
      className="flex flex-col gap-2 md:gap-4 w-full pt-4"
      onContextMenu={prevent}
      onDragStart={prevent}
    >
      {rowNumbers.map((rowNum) => {
        const rowLogos = partnerLogos.filter((p) => p.row === rowNum);
        if (rowLogos.length === 0) return null;

        return (
          <div
            key={rowNum}
            className="flex flex-wrap lg:flex-nowrap w-full items-center justify-start gap-x-1 gap-y-6 md:gap-x-2 lg:gap-x-2 xl:gap-x-3"
          >
            {rowLogos.map((partner) => (
              <div
                key={partner.name}
                className="group relative flex items-center justify-center transition-all duration-300 hover:scale-105 shrink min-w-0"
              >
                <div
                  className="relative flex items-center justify-center overflow-hidden rounded-md px-1"
                  style={{
                    height: `calc(clamp(1.25rem, 1.2vw + 0.5rem, 2rem) * ${partner.scale || 1})`,
                  }}
                >
                  {partner.logo ? (
                    <>
                      <img
                        src={publicAssetPath(`/images/logos/${partner.logo}`)}
                        alt={`${partner.name} 로고`}
                        className="h-full w-auto max-w-full object-contain transition-all duration-300 opacity-90 hover:opacity-100 pointer-events-none select-none"
                        style={{
                          transform: partner.yOffset
                            ? `translateY(${partner.yOffset})`
                            : undefined,
                          WebkitUserDrag: "none",
                        } as React.CSSProperties}
                        draggable={false}
                      />
                      {/* 다운로드 방지 투명 오버레이 */}
                      <div
                        className="absolute inset-0"
                        onContextMenu={prevent}
                        onDragStart={prevent}
                      />
                    </>
                  ) : partner.name.startsWith("empty") ? (
                    <div className="w-[60px] sm:w-[80px] md:w-[100px] h-full" />
                  ) : (
                    <span
                      className="font-bold text-slate-400 whitespace-nowrap px-1"
                      style={{
                        fontSize: `calc(0.75rem * ${(partner.scale || 1) * 1.2})`,
                      }}
                    >
                      {partner.name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
