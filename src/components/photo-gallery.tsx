"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { getPhotosAction } from "@/app/actions";
import { cn } from "@/lib/utils";

interface PhotoGalleryProps {
  folder: string;
}

export function PhotoGallery({ folder }: PhotoGalleryProps) {
  const [images, setImages] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setLoading(true);
        const data = await getPhotosAction(folder);

        if (data.images) {
          const imageUrls = data.images.map((file: any) => {
            let displayName = file.name.replace(/\.[^/.]+$/, "");
            try {
              const base64 = displayName.replace(/-/g, "+").replace(/_/g, "/");
              const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
              displayName = new TextDecoder().decode(bytes);
            } catch (e) {}
            return { name: displayName, url: file.url };
          });
          setImages(imageUrls);
        }
      } catch (err) {
        console.error("Error fetching images:", err);
      } finally {
        setLoading(false);
      }
    }
    if (folder) fetchImages();
  }, [folder]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-sky-500" />
      </div>
    );
  }

  if (images.length === 0) return null;

  // Infinity Row: Duplicate many times for a very long smooth loop
  const displayImages = [...images, ...images, ...images, ...images];
  
  // Calculate duration (approx 18s per unique image for slightly faster speed)
  const duration = images.length * 18;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx - 1 + images.length) % images.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIdx !== null) {
      setSelectedIdx((selectedIdx + 1) % images.length);
    }
  };

  return (
    <div className="relative w-full overflow-hidden pt-2 pb-10 md:pt-4 md:pb-16 animate-in fade-in duration-1000">
      {/* Lightbox Modal ... */}
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
              src={images[selectedIdx].url}
              alt={images[selectedIdx].name}
              fill
              className="object-contain"
              priority
            />
            <div className="absolute -bottom-16 left-0 right-0 text-center animate-in slide-in-from-bottom-4 delay-300">
              <p className="text-white text-xl font-bold tracking-[0.3em] uppercase">{images[selectedIdx].name}</p>
            </div>
          </div>
        </div>
      )}

      {/* Single Row Infinity Marquee */}
      <div 
        className="flex w-fit animate-marquee-left gap-10 pause-on-hover px-10"
        style={{ animationDuration: `${duration}s` }}
      >
        {displayImages.map((img, i) => (
          <div 
            key={`img-${i}`}
            className="flex flex-col gap-6"
          >
            <div 
              className="relative aspect-[16/10] h-48 md:h-56 lg:h-[280px] xl:h-[320px] overflow-hidden rounded-2xl cursor-pointer group shadow-[0_15px_40px_rgba(0,0,0,0.25)] transition-all active:scale-95"
              onClick={() => setSelectedIdx(i % images.length)}
            >
              <Image 
                src={img.url} 
                alt={img.name} 
                fill 
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                sizes="800px"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </div>
            
            {/* Persistent Unified Titles with larger font */}
            <div className="text-center">
               <p className={cn(
                 "text-xs md:text-sm font-black tracking-[0.4em] uppercase transition-opacity whitespace-nowrap",
                 "text-slate-400 dark:text-slate-300 opacity-80 group-hover:opacity-100"
               )}>
                 {img.name}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
