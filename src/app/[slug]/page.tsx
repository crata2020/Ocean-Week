"use client";

import React, { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { CalendarDays, MapPin, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { contentPages, type ContentSlug } from "@/lib/site-content";
import { oceanScheduleTimeline } from "@/lib/ocean-data";
import { SessionDetailModal } from "@/components/session-detail-modal";
import { DynamicScheduleModal } from "@/components/dynamic-schedule-modal";
import { scheduleModalData } from "@/lib/modal-data";

export default function ContentPage() {
  const params = useParams();
  const slug = params?.slug as string;
  
  const [isLeaderModalOpen, setIsLeaderModalOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null);

  if (!slug || !(slug in contentPages)) {
    notFound();
  }

  const page = contentPages[slug as ContentSlug];

  return (
    <div className="flex min-h-screen flex-col font-sans bg-slate-50 dark:bg-slate-950 pb-24">
      <SessionDetailModal isOpen={isLeaderModalOpen} onClose={() => setIsLeaderModalOpen(false)} />
      <DynamicScheduleModal 
        isOpen={!!selectedSessionId} 
        content={selectedSessionId ? scheduleModalData[selectedSessionId] : null}
        onClose={() => setSelectedSessionId(null)} 
      />

      {/* Soft Header Section */}
      <section className="relative w-full bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-8 sm:py-10 md:py-12">
          <Badge
            variant="outline"
            className="mb-6 rounded-full border-sky-300 dark:border-sky-700 bg-sky-100/50 dark:bg-sky-900/30 px-4 py-1.5 text-sm font-semibold text-sky-700 dark:text-sky-300"
          >
            {page.eyebrow}
          </Badge>
          <h1 className="mb-6 font-heading text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl">
            {page.title}
          </h1>
          <p className="max-w-3xl text-lg sm:text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-400">
            {page.summary}
          </p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="mx-auto w-full max-w-5xl px-6 py-16 sm:py-20">
        {slug === "schedule" ? (
          <div className="space-y-12">
            {/* --- Schedule At a Glance Table --- */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-6 flex items-center gap-3">
                <div className="h-6 w-1.5 rounded-full bg-sky-500" />
                행사일정 한눈에 보기
              </h2>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
                <table className="w-full min-w-[760px] text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="w-20 bg-slate-50 dark:bg-slate-800/50 border-b border-r border-slate-200 dark:border-slate-800 p-4 text-center font-bold text-slate-500">
                        구분
                      </th>
                      <th className="w-[30%] bg-rose-50/50 dark:bg-rose-900/10 border-b border-r border-slate-200 dark:border-slate-800 p-4 text-center leading-relaxed">
                        <div className="text-lg font-bold text-rose-900 dark:text-rose-100">6월 8일(월)</div>
                        <div className="text-xs sm:text-sm font-medium text-rose-600/80 dark:text-rose-400/80 mt-1">벡스코 2전시관 320~324호</div>
                      </th>
                      <th className="w-[30%] bg-amber-50/50 dark:bg-amber-900/10 border-b border-r border-slate-200 dark:border-slate-800 p-4 text-center leading-relaxed">
                        <div className="text-lg font-bold text-amber-900 dark:text-amber-100">6월 9일(화)</div>
                        <div className="text-xs sm:text-sm font-medium text-amber-600/80 dark:text-amber-400/80 mt-1">벡스코 2전시관 320~324호</div>
                      </th>
                      <th className="w-[30%] bg-teal-50/50 dark:bg-teal-900/10 border-b border-slate-200 dark:border-slate-800 p-4 text-center leading-relaxed">
                        <div className="text-lg font-bold text-teal-900 dark:text-teal-100">6월 10일(수)</div>
                        <div className="text-xs sm:text-sm font-medium text-teal-600/80 dark:text-teal-400/80 mt-1">벡스코 2전시관 320~324호</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Morning Row */}
                    <tr>
                      <td className="bg-slate-50 dark:bg-slate-800/50 border-b border-r border-slate-200 dark:border-slate-800 p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                        오전
                      </td>
                      <td className="p-5 align-top border-b border-r border-slate-200 dark:border-slate-800">
                        <div className="space-y-4">
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">개회식 및 공연</div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:00~11:00</div>
                          </div>
                          <div 
                            className="group/item cursor-pointer hover:bg-sky-50 dark:hover:bg-sky-900/20 -m-2 p-2 rounded-lg transition-colors"
                            onClick={() => setIsLeaderModalOpen(true)}
                          >
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-sky-300">
                              기관장 토크 콘서트
                              <ExternalLink className="h-3 w-3 text-sky-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">11:00~12:00</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 align-top border-b border-r border-slate-200 dark:border-slate-800 bg-amber-50/10">
                        <div className="space-y-4">
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">개회식 및 공연</div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:00~10:20</div>
                          </div>
                          <div 
                            className="group/item cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 -m-2 p-2 rounded-lg transition-colors"
                            onClick={() => setSelectedSessionId("blue-carbon")}
                          >
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-blue-300">
                              해양경제포럼
                              <ExternalLink className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">
                              <span className="text-[11px] font-bold text-blue-600">①</span> 블루카본과 탄소마켓
                            </div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:20~12:00</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 align-top border-b border-slate-200 dark:border-slate-800 bg-teal-50/10">
                        <div className="space-y-4">
                          <div 
                            className="group/item cursor-pointer hover:bg-teal-50 dark:hover:bg-teal-900/10 -m-2 p-2 rounded-lg transition-colors"
                            onClick={() => setSelectedSessionId("ocean-awards")}
                          >
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-teal-300">
                              대한민국해양지도자대상 시상식
                              <ExternalLink className="h-3 w-3 text-teal-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">10:00~11:00</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">해양산업리더스서밋</div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">11:00~12:00</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* Afternoon Row */}
                    <tr>
                      <td className="bg-slate-50 dark:bg-slate-800/50 border-r border-slate-200 dark:border-slate-800 p-4 text-center font-bold text-slate-700 dark:text-slate-300">
                        오후
                      </td>
                      <td className="p-5 align-top border-r border-slate-200 dark:border-slate-800">
                        <div className="space-y-4">
                          <div 
                            className="group/item cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 -m-2 p-2 rounded-lg transition-colors"
                            onClick={() => setSelectedSessionId("arctic-route")}
                          >
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-blue-300">
                              해양경제포럼
                              <ExternalLink className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">
                              <span className="text-[11px] font-bold text-blue-600">①</span> 북극항로 비연안국의 권리
                            </div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">13:30~16:50</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 align-top border-r border-slate-200 dark:border-slate-800 bg-amber-50/10">
                        <div className="space-y-4">
                          <div 
                            className="group/item cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 -m-2 p-2 rounded-lg transition-colors"
                            onClick={() => setSelectedSessionId("blue-carbon")}
                          >
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-blue-300">
                              해양경제포럼
                              <ExternalLink className="h-3 w-3 text-blue-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5">
                              <span className="text-[11px] font-bold text-blue-600">②</span> 패널토론 (블루카본)
                            </div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">13:30~15:00</div>
                          </div>
                          <div 
                            className="group/item cursor-pointer hover:bg-amber-50 dark:hover:bg-amber-900/10 -m-2 p-2 rounded-lg transition-colors"
                            onClick={() => setSelectedSessionId("polar-lecture")}
                          >
                            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 underline-offset-4 group-hover/item:underline decoration-amber-300">
                              극지시민강좌
                              <ExternalLink className="h-3 w-3 text-amber-500 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                            </div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">16:00~18:00</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 align-top border-slate-200 dark:border-slate-800 bg-teal-50/10">
                        <div className="space-y-4">
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">온라인컨퍼런스</div>
                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5"><span className="text-[11px]">①</span>해상풍력 특별법시대 개막</div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mb-1.5 mt-0.5">14:00~15:30</div>
                            <div className="text-[13px] text-slate-600 dark:text-slate-400 mt-0.5"><span className="text-[11px]">②</span>북극항로 연관산업 발전방안</div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">16:00~17:30</div>
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 dark:text-slate-200">청소년 프레젠테이션 대회</div>
                            <div className="text-sm font-medium text-sky-600 dark:text-sky-400 mt-0.5">14:00~17:00</div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* --- Detailed Timeline Loop --- */}
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 mt-8 flex items-center gap-3">
              <div className="h-6 w-1.5 rounded-full bg-slate-800 dark:bg-slate-300" />
              세부 스케줄표
            </h2>
            <div className="space-y-16">
              {oceanScheduleTimeline.map((dayPlan) => (
                <div key={dayPlan.day} className="relative">
                  {/* Day Header */}
                  <div className="mb-6 flex items-center">
                    <span className="mr-3 text-2xl font-black text-sky-600 dark:text-sky-400">
                      {dayPlan.day}
                    </span>
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      {dayPlan.date}
                    </span>
                  </div>

                  <div className="relative space-y-10 ml-2 pl-8">
                    {/* Visual Vertical Line */}
                    <div className="absolute left-0 top-3 bottom-0 w-[2px] bg-slate-300 dark:bg-slate-700" />
                    {dayPlan.sessions.map((session, sIndex) => {
                      const isLeaderSession = session.title.includes("기관장 토크 콘서트");
                      const isArcticSession = session.title.includes("북극항로 비연안국");
                      const isBlueCarbonSession = session.title.includes("블루카본");
                      const isPolarSession = session.title.includes("극지시민강좌");
                      const isAwardsSession = session.title.includes("해양지도자대상 시상식");
                      
                      const clickable = isLeaderSession || isArcticSession || isBlueCarbonSession || isPolarSession || isAwardsSession;
                      const modalType = isLeaderSession ? "leader" :
                                        isArcticSession ? "arctic-route" :
                                        isBlueCarbonSession ? "blue-carbon" :
                                        isPolarSession ? "polar-lecture" :
                                        isAwardsSession ? "ocean-awards" : null;

                      return (
                        <div key={sIndex} className="relative group">
                          {/* Timeline Dot */}
                          <div className={`absolute -left-[38px] top-1.5 h-3.5 w-3.5 rounded-full border-[3px] bg-white dark:bg-slate-950 transition-colors duration-300 ${
                            clickable ? 'border-sky-500 group-hover:bg-sky-500' : 'border-slate-300'
                          }`} />
                          
                          <div className="flex flex-col mb-2">
                            <span className="text-sm font-bold text-sky-600 dark:text-sky-400 mb-1">
                              {session.time}
                            </span>
                            <h3 
                              className={`text-xl sm:text-2xl font-bold transition-all ${
                                clickable 
                                  ? "cursor-pointer hover:opacity-80 flex flex-wrap items-center gap-2" 
                                  : "text-slate-800 dark:text-slate-100"
                              }`}
                              onClick={() => {
                                if (modalType === "leader") setIsLeaderModalOpen(true);
                                else if (modalType) setSelectedSessionId(modalType);
                              }}
                            >
                              <span className={
                                isLeaderSession ? "text-emerald-600" : 
                                (isArcticSession || isBlueCarbonSession) ? "text-blue-600" :
                                isPolarSession ? "text-amber-600" :
                                isAwardsSession ? "text-teal-600" : ""
                              }>
                                {session.title}
                              </span>
                              {clickable && (
                                <Badge className={`${
                                  isLeaderSession ? "bg-emerald-100 text-emerald-700" : 
                                  (isArcticSession || isBlueCarbonSession) ? "bg-blue-100 text-blue-700" :
                                  isPolarSession ? "bg-amber-100 text-amber-700" :
                                  "bg-teal-100 text-teal-700"
                                } border-none text-[10px] py-0 h-5 hover:bg-slate-100`}>
                                  상세보기
                                </Badge>
                              )}
                            </h3>
                          </div>
                          
                          {session.description && (
                            <p className="mb-6 whitespace-pre-line text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
                              {session.description}
                            </p>
                          )}

                          {/* Render Speakers if they exist using existing logic but cleaner */}
                          {(session as any).speakers && (session as any).speakers.length > 0 && (
                            <div className="grid gap-x-6 gap-y-4 pt-2 sm:grid-cols-2 lg:grid-cols-3">
                              {(session as any).speakers.map((sp: any, idx: number) => (
                                <div key={idx} className="flex items-start gap-3">
                                  <div className="mt-1 min-w-[36px] shrink-0 rounded bg-slate-100 dark:bg-slate-800 px-2 py-1 text-center text-[10px] font-bold text-slate-500 dark:text-slate-400">
                                    {sp.role}
                                  </div>
                                  <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                                      {sp.name}
                                    </span>
                                    <span className="text-xs text-slate-500 dark:text-slate-500 mt-0.5">
                                      {sp.org}
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}

                          {(session as any).subSessions && (session as any).subSessions.length > 0 && (
                            <div className="mt-6 space-y-6">
                              {(session as any).subSessions.map((sub: any, sidx: number) => (
                                <div key={sidx} className="bg-slate-50/70 dark:bg-slate-900/40 rounded-xl p-5 border border-slate-100 dark:border-slate-800">
                                  {sub.subtitle && (
                                    <h4 className="font-bold text-sky-700 dark:text-sky-300 mb-3">{sub.subtitle}</h4>
                                  )}
                                  {sub.description && (
                                    <p className="mb-5 whitespace-pre-line text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                                      {sub.description}
                                    </p>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            {page.sections.map((section) => (
              <div key={section.title} className="group">
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-1 w-12 rounded-full bg-gradient-to-r from-sky-400 to-teal-400" />
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-6 text-lg tracking-wide leading-relaxed font-medium text-slate-600 dark:text-slate-300">
                  {section.body.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
