"use client";

import React from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface Speaker {
  id: string;
  name: string;
  org: string;
  image?: string;
}

interface SessionDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const speakers: Speaker[] = [
  { id: "1", name: "해양수산부장관", org: "" },
  { id: "2", name: "부산광역시장", org: "" },
  { id: "3", name: "조승환 국회의원", org: "(부산 영도구)", image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/cho_seung_hwan.jpg" },
  { id: "4", name: "양재생 회장", org: "부산상공회의소", image: "/images/speakers/yang.png" },
  { id: "5", name: "류동근 총장", org: "국립한국해양대학교", image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/ryu_dong_geun.jpg" },
  { id: "6", name: "배상훈 총장", org: "국립부경대학교", image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/bae_sang_hoon.jpg" },
  { id: "7", name: "안병길 사장", org: "한국해양진흥공사", image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/ahn_byung_gil.jpg" },
  { id: "8", name: "최금식 회장", org: "선보패밀리그룹", image: "/images/speakers/choi.png" },
];

export function SessionDetailModal({ isOpen, onClose }: SessionDetailModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/85 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] dark:bg-slate-900 border border-white/20 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Section */}
        <div className="relative bg-emerald-50/50 dark:bg-emerald-950/20 px-6 py-8 text-center border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white dark:bg-slate-800 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:rotate-90 z-20"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold mb-4">
            Special Session
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2">
            기관장 <span className="text-emerald-600">토크 콘서트</span>
          </h2>
          <div className="text-lg font-bold text-slate-500 dark:text-slate-400">
            6월 8일(월) <span className="mx-2 text-slate-300">|</span> 11:00 ~ 12:00
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-8 overflow-y-auto">
          <div className="inline-flex items-center gap-3 mb-6 pb-2 border-b-2 border-emerald-500/10">
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">주제</span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
              '해양수산부 이전과 해양수도 부산의 비전'
            </h3>
          </div>

          {/* Grid Layout (2x4) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-inner">
            {speakers.map((speaker) => (
              <div 
                key={speaker.id} 
                className="flex flex-col bg-white dark:bg-slate-900 group"
              >
                {/* Image Placeholder or Actual Image */}
                <div className="relative aspect-[4/5] overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
                  <div className="relative w-full h-full">
                    {speaker.image ? (
                      <div className="relative w-full h-full rounded-lg overflow-hidden shadow-md ring-1 ring-slate-200 dark:ring-slate-800 bg-white">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover object-[center_20%] bg-white transition-transform duration-500 group-hover:scale-105"
                          style={{ imageRendering: "auto" }}
                          sizes="(max-width: 768px) 50vw, 25vw"
                          quality={100}
                          unoptimized
                          priority
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-lg border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-slate-300 dark:text-slate-700 p-4 text-center">
                        <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-2">
                          <X className="h-5 w-5 opacity-20" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">사진 준비 중</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Description Text */}
                <div className="px-5 py-6 text-center border-t border-slate-50 dark:border-slate-800 grow flex flex-col justify-center">
                  {speaker.org && (
                    <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-tighter mb-1 transform transition-transform group-hover:-translate-y-1">
                      {speaker.org}
                    </div>
                  )}
                  <div className={`text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight ${!speaker.org ? "text-base py-2" : ""}`}>
                    {speaker.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Footer (Subtle) */}
        <div className="h-2 bg-gradient-to-r from-emerald-400 via-sky-500 to-emerald-400" />
      </div>
    </div>
  );
}
