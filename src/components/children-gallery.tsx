"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import artData from "@/lib/children-art-data.json";
import { cn } from "@/lib/utils";

export function ChildrenGallery() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['section-rank-1'])); // Initial visible
  const [activeSection, setActiveSection] = useState<string>('rank-1');

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleSections((prev) => {
          const next = new Set(prev);
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              next.add(entry.target.id);
            }
          });
          return next;
        });
      },
      { threshold: 0.25 }
    );

    // Observe after a tiny delay to ensure DOM is ready
    setTimeout(() => {
      document.querySelectorAll('.gallery-section').forEach(el => observer.observe(el));
    }, 100);

    // Second Observer for the Navigation Bar Highlighting
    const navObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            setActiveSection(entry.target.id.replace('section-', ''));
          }
        });
      },
      { threshold: 0.4 }
    );

    setTimeout(() => {
      document.querySelectorAll('.gallery-section').forEach(el => navObserver.observe(el));
    }, 100);

    const updateHeaderHeight = () => {
      // Find the sticky header dynamically
      const header = document.querySelector('header');
      const height = header ? header.clientHeight : 208;
      
      // Apply exact dynamic height to scroll padding and a CSS variable
      document.documentElement.style.scrollPaddingTop = `${height}px`;
      document.documentElement.style.setProperty('--dynamic-header-height', `${height}px`);
    };

    updateHeaderHeight(); // Initial set
    window.addEventListener('resize', updateHeaderHeight); // Update on window resize or zoom

    // Apply scroll snapping to the global HTML element for native feeling
    document.documentElement.classList.add("snap-y", "snap-mandatory", "scroll-smooth");
    
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      document.documentElement.classList.remove("snap-y", "snap-mandatory", "scroll-smooth");
      document.documentElement.style.scrollPaddingTop = "";
      document.documentElement.style.removeProperty('--dynamic-header-height');
      observer.disconnect();
      navObserver.disconnect();
    };
  }, []);

  // Group by rank
  const rank4Items = artData.filter(a => a.rank === 4);
  const rank4Chunks = [];
  for (let i = 0; i < rank4Items.length; i += 10) {
    rank4Chunks.push(rank4Items.slice(i, i + 10));
  }

  const sections: { 
    id: string; 
    rank: number; 
    title: string; 
    items: typeof artData; 
    pageInfo?: string; 
  }[] = [
    { id: 'rank-1', rank: 1, title: "대상", items: artData.filter(a => a.rank === 1) },
    { id: 'rank-2', rank: 2, title: "우수", items: artData.filter(a => a.rank === 2) },
    { id: 'rank-3', rank: 3, title: "장려", items: artData.filter(a => a.rank === 3) },
    ...rank4Chunks.map((chunk, idx) => ({
      id: `rank-4-${idx}`,
      rank: 4,
      title: "입선",
      pageInfo: `${idx + 1} / ${rank4Chunks.length} 페이지`,
      items: chunk
    }))
  ].filter(g => g.items.length > 0);

  // Derive unique categories for the Sidebar
  const navCategories = [
    { targetId: 'rank-1', matchPrefix: 'rank-1', title: "대상" },
    { targetId: 'rank-2', matchPrefix: 'rank-2', title: "우수" },
    { targetId: 'rank-3', matchPrefix: 'rank-3', title: "장려" },
    { targetId: 'rank-4-0', matchPrefix: 'rank-4', title: "입선" },
  ].filter(cat => sections.some(s => s.id.startsWith(cat.matchPrefix)));

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + artData.length) % artData.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % artData.length);
    }
  };

  const openLightbox = (item: any) => {
    const idx = artData.findIndex(a => a.id === item.id);
    if (idx !== -1) setSelectedIdx(idx);
  };

  return (
    <div className="w-full relative animate-in fade-in duration-1000">
      
      {/* Lightbox Modal */}
      {selectedIdx !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-500"
          onClick={() => setSelectedIdx(null)}
        >
          <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]">
            <X className="h-10 w-10" />
          </button>
          
          <button 
            className="absolute left-6 top-1/2 -translate-y-1/2 p-6 text-white/30 hover:text-white transition-colors z-[110]"
            onClick={handlePrev}
          >
            <ChevronLeft className="h-12 w-12" />
          </button>
          
          <button 
            className="absolute right-6 top-1/2 -translate-y-1/2 p-6 text-white/30 hover:text-white transition-colors z-[110]"
            onClick={handleNext}
          >
            <ChevronRight className="h-12 w-12" />
          </button>

          <div className="relative h-[80vh] w-[90vw] animate-in zoom-in-95 duration-500">
            <Image
              src={artData[selectedIdx].url}
              alt={artData[selectedIdx].title}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute -bottom-16 left-0 right-0 text-center animate-in slide-in-from-bottom-4 delay-300">
              <p className="text-white text-xl font-bold tracking-[0.1em] mb-1">{artData[selectedIdx].title}</p>
              <p className="text-white/80 text-sm">{artData[selectedIdx].award} {artData[selectedIdx].name && `| ${artData[selectedIdx].name}`}</p>
            </div>
          </div>
        </div>
      )}

      {/* Left Navigation Bar (Scrollspy) */}
      <div className="fixed left-8 xl:left-12 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col border-l-2 border-slate-200 dark:border-slate-800">
        {navCategories.map((cat) => {
          const isActive = activeSection.startsWith(cat.matchPrefix);
          return (
            <button
              key={`nav-${cat.targetId}`}
              onClick={() => {
                document.getElementById(`section-${cat.targetId}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
              className={cn(
                "relative flex items-center pl-6 py-3 text-left transition-all duration-300 group",
                isActive ? "opacity-100" : "opacity-40 hover:opacity-80"
              )}
            >
              {/* Active Marker on Border */}
              <div className={cn(
                "absolute -left-[2px] top-1/2 -translate-y-1/2 w-[2px] bg-sky-500 transition-all duration-500",
                isActive ? "h-full opacity-100" : "h-0 opacity-0"
              )} />
              
              <span className={cn(
                "text-sm whitespace-nowrap transition-all duration-300",
                isActive 
                  ? "font-black text-sky-600 dark:text-sky-400 scale-110 origin-left" 
                  : "font-medium text-slate-600 dark:text-slate-400"
              )}>
                {cat.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main Snap Flow */}
      <div className="w-full flex flex-col">
        {sections.map((group) => (
          <div 
            key={group.id} 
            id={`section-${group.id}`}
            className="gallery-section w-full snap-start flex flex-col px-2 pt-4 pb-6 md:px-6 overflow-hidden"
            style={{ minHeight: "calc(100vh - var(--dynamic-header-height, 208px))" }}
          >
            <div className={cn(
              "flex flex-col flex-1 w-full max-w-[1800px] mx-auto transition-all duration-[1200ms] ease-out",
              visibleSections.has(`section-${group.id}`) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-24"
            )}>
              <div className="flex items-center justify-between mb-6 flex-shrink-0">
                <div className="flex items-center gap-4">
                  <h2 className={cn(
                    "font-black tracking-tight flex items-end gap-3",
                    group.rank === 1 ? "text-3xl md:text-4xl text-sky-600 dark:text-sky-400" :
                    group.rank === 2 ? "text-2xl md:text-3xl text-blue-600 dark:text-blue-400" :
                    "text-xl md:text-2xl text-slate-700 dark:text-slate-200"
                  )}>
                    {group.title}
                    {group.pageInfo && (
                      <span className="text-sm font-semibold text-slate-400 dark:text-slate-500 pb-0.5 tracking-normal">
                        ({group.pageInfo})
                      </span>
                    )}
                  </h2>
                  <span className="text-sm font-medium px-3 py-1 bg-slate-200/50 dark:bg-slate-800/50 rounded-full text-slate-500 dark:text-slate-400">
                    {group.rank === 4 ? "총 40작품 중 10작품" : `${group.items.length}작품`}
                  </span>
                </div>
                <div className="hidden sm:flex text-xs font-medium text-slate-400 animate-pulse">
                  아래로 스크롤하여 더 보기 ↓
                </div>
              </div>

              <div className={cn(
                "grid gap-4 md:gap-x-8 md:gap-y-10 w-full my-auto",
                group.rank === 1 ? "grid-cols-1 max-w-4xl mx-auto" :
                group.rank === 2 ? "grid-cols-2 max-w-3xl mx-auto" :
                "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
              )}>
                {group.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="group flex flex-col gap-3 cursor-pointer"
                    onClick={() => openLightbox(item)}
                  >
                    <div className={cn(
                      "relative overflow-hidden rounded-xl shadow-sm transition-all duration-500 group-hover:shadow-md group-hover:-translate-y-1 w-full",
                      group.rank === 1 ? "aspect-[16/9] max-h-[70vh]" : 
                      group.rank === 2 ? "aspect-[16/9] max-h-[35vh]" : 
                      "aspect-[4/3]"
                    )}>
                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes={group.rank === 1 ? "100vw" : "(max-width: 768px) 50vw, 20vw"}
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                    <div className="flex flex-col text-center px-1 flex-shrink-0">
                      <span className={cn(
                        "font-bold text-slate-800 dark:text-slate-100 truncate",
                        group.rank === 1 ? "text-lg md:text-xl" : "text-sm"
                      )}>
                        {item.title}
                      </span>
                      {item.name && (
                        <span className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {item.name} 어린이
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
