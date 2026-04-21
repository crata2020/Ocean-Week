"use client";

import React from "react";
import { X, User, GraduationCap, Globe, ShieldCheck, Info } from "lucide-react";
import { type ModalContent } from "@/lib/modal-data";

interface DynamicScheduleModalProps {
  content: ModalContent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DynamicScheduleModal({ content, isOpen, onClose }: DynamicScheduleModalProps) {
  if (!isOpen || !content) return null;

  const colorStyles = {
    blue: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    teal: "bg-teal-100 text-teal-700 dark:bg-teal-900/50 dark:text-teal-300",
  };

  const accentColors = {
    blue: "text-blue-600 border-blue-500",
    emerald: "text-emerald-600 border-emerald-500",
    amber: "text-amber-600 border-amber-500",
    teal: "text-teal-600 border-teal-500",
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-12 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/85 backdrop-blur-md animate-in fade-in duration-300" 
        onClick={onClose}
      />
      
      {/* Modal Card */}
      <div 
        className="relative w-full max-w-4xl rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-white/20 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Section */}
        <div className={`relative px-8 py-8 text-center border-b border-slate-100 dark:border-slate-800 shrink-0 ${
          content.themeColor === 'blue' ? 'bg-blue-50/50 dark:bg-blue-950/20' :
          content.themeColor === 'emerald' ? 'bg-emerald-50/50 dark:bg-emerald-950/20' :
          content.themeColor === 'amber' ? 'bg-amber-50/50 dark:bg-amber-950/20' :
          'bg-teal-50/50 dark:bg-teal-950/20'
        }`}>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white dark:bg-slate-800 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:rotate-90 z-20"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold mb-4 ${colorStyles[content.themeColor]}`}>
            {content.subtitle}
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            {content.title}
          </h2>
          <div className="text-base font-bold text-slate-500 dark:text-slate-400">
            {content.time}
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto flex-1 bg-white dark:bg-slate-900">
          {content.type === "speakers" ? (
            <div className="flex flex-col">
              {content.speakers?.map((speaker, index) => (
                <div 
                  key={index} 
                  className="flex flex-col md:flex-row border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-300"
                >
                  <div className="w-full md:w-[340px] p-6 sm:p-7 bg-slate-50/30 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 flex flex-row items-center justify-between gap-4 shrink-0">
                    {/* Details Container */}
                    <div className="flex flex-col items-start flex-1 min-w-0 pr-2">
                      <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
                        <span className={`text-[10px] md:text-xs font-black px-2 py-1 md:px-2.5 md:py-1 rounded-md ${colorStyles[content.themeColor]}`}>
                          {speaker.role}
                        </span>
                      </div>
                      <h4 className="text-lg md:text-xl font-black text-slate-800 dark:text-slate-100 mb-1.5 md:mb-2 w-full flex items-center gap-2 break-keep">
                        {speaker.name}
                      </h4>
                      <div className="space-y-0.5">
                        {speaker.affiliation.map((line, i) => (
                          <div key={i} className="text-xs md:text-[13px] font-bold text-slate-500 dark:text-slate-400 leading-snug break-keep">
                            {line}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Photo Container */}
                    <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 rounded-full bg-white dark:bg-slate-800 border-[3px] border-white dark:border-slate-700 shadow-sm overflow-hidden flex items-center justify-center">
                      {speaker.image ? (
                        <img 
                          src={speaker.image} 
                          alt={speaker.name} 
                          className="w-full h-full object-cover bg-white" 
                          style={{ objectPosition: (speaker as any).imagePosition || "center 20%" }} 
                        />
                      ) : (
                        <User className="w-8 h-8 md:w-10 md:h-10 text-slate-300 dark:text-slate-500" />
                      )}
                    </div>
                  </div>
                  <div className="flex-1 p-6 sm:p-8">
                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                      {speaker.bio}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 sm:p-12 space-y-10">
              {content.body && content.body.length > 0 && (
                <div className="space-y-4">
                  {content.body.map((p, i) => (
                    <p key={i} className="text-lg font-medium text-slate-700 dark:text-slate-300 leading-relaxed tracking-tight">
                      {p}
                    </p>
                  ))}
                </div>
              )}
              
              <div className="grid gap-8">
                {content.sections?.map((section, idx) => (
                  <div key={idx} className="group">
                    <h4 className={`text-xl font-bold mb-4 border-l-4 pl-4 ${accentColors[content.themeColor]}`}>
                      {section.title}
                    </h4>
                    <div className="space-y-2 pl-5">
                      {section.isTable ? (
                        <div className="mt-10 mb-12 overflow-x-auto rounded-2xl border-2 border-slate-200 dark:border-slate-800 shadow-sm">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-slate-50 dark:bg-slate-800/80">
                                <th className="p-4 font-black text-slate-700 dark:text-slate-300 border-b border-r border-slate-200 dark:border-slate-800 w-1/5 text-center">부문</th>
                                <th className="p-4 font-black text-slate-700 dark:text-slate-300 border-b border-r border-slate-200 dark:border-slate-800 w-1/4 text-center">수상자</th>
                                <th className="p-4 font-black text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 text-center">주요 공적</th>
                              </tr>
                            </thead>
                            <tbody>
                              {section.content.map((row, i) => {
                                const [col1, col2, col3] = row.split('|');
                                return (
                                  <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                    <td className="p-5 font-black text-lg text-emerald-600 dark:text-emerald-400 border-b border-r border-slate-100 dark:border-slate-800 text-center bg-emerald-50/20">{col1}</td>
                                    <td className="p-5 font-black text-xl text-slate-900 dark:text-white border-b border-r border-slate-100 dark:border-slate-800 text-center">{col2}</td>
                                    <td className="p-5 text-base font-bold text-slate-600 dark:text-slate-400 border-b border-slate-100 dark:border-slate-800 leading-relaxed">{col3}</td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        section.content.map((item, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${
                              content.themeColor === 'blue' ? 'bg-blue-400' :
                              content.themeColor === 'emerald' ? 'bg-emerald-400' :
                              content.themeColor === 'amber' ? 'bg-amber-400' :
                              'bg-teal-400'
                            }`} />
                            <p className="text-base font-medium text-slate-600 dark:text-slate-400">
                              {item}
                            </p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Accent */}
        <div className={`h-1.5 shrink-0 ${
          content.themeColor === 'blue' ? 'bg-blue-500' :
          content.themeColor === 'emerald' ? 'bg-emerald-500' :
          content.themeColor === 'amber' ? 'bg-amber-500' :
          'bg-teal-500'
        }`} />
      </div>
    </div>
  );
}
