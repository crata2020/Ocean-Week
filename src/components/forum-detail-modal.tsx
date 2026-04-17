"use client";

import React from "react";
import { X, User, GraduationCap, Globe, ShieldCheck } from "lucide-react";

interface SpeakerBio {
  role: string;
  name: string;
  affiliation: string[];
  bio: string;
}

const speakerBios: SpeakerBio[] = [
  {
    role: "좌장",
    name: "신형철 소장",
    affiliation: ["극지연구소"],
    bio: "신형철 소장은 대한민국의 극지과학 및 해양정책 분야 전문가로, 현재 극지연구소 소장으로 재직하며 북극 및 남극 연구, 극지 거버넌스, 해양안보 및 국제협력 분야를 총괄하고 있다. 특히 북극항로(Arctic Sea Routes)와 관련된 과학·정책 융합 연구를 선도하며, 기후변화에 따른 북극 환경 변화와 국제 해양질서 재편에 대한 연구를 수행하고 있다.\n\n신 소장은 북극이사회(Arctic Council) 및 다양한 국제 극지 협력체에서 대한민국을 대표하여 활동해 왔으며, 북극항로의 이용과 관련된 법적·정책적 쟁점, 특히 비연안국의 권리와 역할에 관한 연구와 정책 제언으로 주목받고 있다. 또한 한·중·일·러 등 동북아 국가 간 극지 협력과 거버넌스 구축을 위한 학술 및 정책 교류에도 적극 참여하고 있다.\n\n현재 그는 과학외교(science diplomacy)를 기반으로 한 극지 협력 모델을 강조하며, 지속가능한 북극 이용과 국제 규범 형성에 기여하고 있다."
  },
  {
    role: "발제",
    name: "최수범 교수",
    affiliation: ["국민대학교 특임교수", "한국북극항로협회 사무총장"],
    bio: "해양·물류 및 북극항로 분야의 전문가로, 한국북극항로협회 사무총장을 맡아 북극항로 개발과 국제 협력, 관련 정책 연구를 주도하고 있다. 또한 국민대학교 특임교수로 활동하며 해운·물류 및 북극항로의 전략적 중요성과 미래 가능성에 대해 강의와 연구를 수행하고 있다. 최교수는 정부·학계·산업계를 잇는 가교 역할을 하며, 북극항로의 상업적 활용과 국가 경쟁력 강화를 위한 다양한 자문과 프로젝트에 참여하고 있다."
  },
  {
    role: "발제",
    name: "郭培淸(궈페이칭) 교수",
    affiliation: ["중국해양대학교", "국제사무 및 공공관리학원"],
    bio: "궈페이칭(Guo Peiqing) 교수는 Ocean University of China 국제문제 및 공공행정학부에서 재직 중이다. 그는 중국 교육부가 설립한 극지센터의 집행이사를 맡고 있다. 또한 매년 칭다오와 상트페테르부르크에서 개최되는 중국-러시아 북극 워크숍의 창립자로, 이 행사는 현재 제도화되어 운영되고 있다. 아울러 국제 싱크탱크 “Polar and Ocean Portal”(www.polaroceanportal.com)의 설립자이기도 하다.\n\n그는 2022년 Sakha Republic 대통령 Aisen Nikolaev의 임명으로 사하공화국 수장 직속 ‘복지 및 지속가능발전 위원회’ 위원으로 활동하였으며, 같은 해 Northern Forum의 ‘친선대사(Goodwill Ambassador)’로도 초청받았다. 그는 북극 관련 다수의 연구 성과를 발표했으며, 그중 대표적으로 2009년 Oceanic Press에서 출판된 『북극 항로의 국제문제 연구(Research on the International Issues of Arctic Passage)』를 주저자로 집필한 바 있다.\n\n그는 북극항로, 특히 북동항로와 북서항로의 법적 지위와 국제정치적 의미를 중심으로 연구를 수행해 왔으며, 국제해양법과 해양정치의 관점에서 북극 지역의 질서 형성과 협력 구조를 분석해 왔다."
  },
  {
    role: "발제",
    name: "후지오 오니시 박사",
    affiliation: ["홋카이도대학교 북극연구센터", "그룹리더"],
    bio: "Fujio Ohnishi 박사는 북극 해양과 항로 개발 분야에서 활동하는 연구자로, Hokkaido University Arctic Research Center에서 그룹리더로 재직하며 북극항로의 활용 가능성과 안전성, 환경 영향 등을 중심으로 연구를 수행하고 있다. 그는 기후 변화에 따른 해빙 감소와 북극해 항로의 계절적 개방이 국제 해운과 물류 체계에 미치는 영향을 분석하고, 특히 북극항로의 경제성 및 운항 리스크 관리, 해상 안전 확보를 위한 과학적·정책적 접근을 강조해 왔다.\n\n또한 다양한 국제 공동연구와 학술 활동을 통해 북극권 국가 및 아시아 국가 간 협력의 중요성을 제시하며, 북극항로가 동북아와 유럽을 연결하는 전략적 해상 루트로 자리 잡을 가능성을 탐구하고 있다. 그의 연구는 지속가능한 북극 이용과 환경 보전의 균형을 중시하는 점에서 학계와 정책 분야에서 주목받고 있다."
  },
  {
    role: "발제",
    name: "스미르노프 세르게이 마라토비치 교수",
    affiliation: ["블라디보스톡 극동연방대학"],
    bio: "세르게이 M. 스미르노프는 1960년 11월 5일 러시아 블라디보스토크에서 태어난 러시아 연방 국적의 해양 및 안보 분야 전문가이다. 그는 1982년 극동국립대학교에서 동양학을 전공하였으며, 이후 2002년 극동국립공과대학교에서 조선공학 분야 기술과학 박사 학위를 취득하였다. 또한 2003년에는 미국 하와이 호놀룰루의 아시아·태평양 안보연구센터에서 최고경영자 과정을 수료하였고, 2006년에는 이탈리아 로마의 NATO 국방대학에서 선임 연구원으로 활동하였다. 그는 러시아 해군 대령(예비역)으로서 군 경력 또한 보유하고 있다.\n\n스미르노프는 아드미랄 네벨스코이 해양국립대학교에서 다양한 주요 보직을 수행해 왔다. 선임 연구원을 비롯하여 해양 국제연구센터 소장, 외국어학과 학과장, 국제처장 등을 역임하였으며, 한국해양수산개발원과 공동으로 운영되는 한-러 공동연구센터의 러시아 측 소장도 맡았다. 현재는 2022년 12월부터 공간물류 연구실에서 국제 연구 프로젝트의 선임 연구원, 전문가 및 코디네이터로 활동하고 있다.\n\n그의 주요 연구 분야는 해상 운송 및 물류, 북극 항로의 경제적 개발, 지역 및 해양 안보와 분쟁 예방, 그리고 국제 학술 협력 등으로 폭넓다. 그는 50편 이상의 학술 논문을 집필하거나 공동 저자로 참여하였으며, 최근에는 대두만강 지역의 새로운 국제 물류 경로 설계, 블라디보스토크 개방 30년의 동향과 전망, 러시아 및 아시아·태평양 지역 곡물 물류 등에 관한 연구를 발표하였다. 또한 「아시아·태평양과 ‘서구식’ 집단 안보 개념」과 같은 단행본도 출간하였다."
  },
  {
    role: "패널",
    name: "정영두 센터장",
    affiliation: ["한국해양진흥공사 북극항로 종합지원센터"],
    bio: "우리나라 최대 벌크선사인 팬오션에서 해외영업 및 해운시황 리서치 분야에서 경력을 쌓았다. 2009년부터 켄코선박운용에서 약 10년간 ‘해운시장동향’ 보고서를 발간하며 해운·물류산업 전반의 정보 제공 업무를 담당했다. 2018년 한국해양진흥공사 설립과 함께 해운산업정보센터장으로 친환경 선박 보급 촉진 및 해운시장 조사를 주도했으며, 2022년부터는 ESG경영실장으로 해운산업의 지속가능경영과 탄소중림 정책을 추진했다. 2025년 2월부터 해상공급망기획단장으로 공급망 위기대응 및 해상물류 안정화 사업을 총괄하고 있으며, 북극항로가 정부의 정책기조가 되면서 북극항로종합지원센터장을 맡아 해운·물류 분야 경제안보 강화에 기여하고 있다. 해운산업 발전에 기여한 공로로 2011년 국토해양부 장관 표창을 수상했다."
  },
  {
    role: "패널",
    name: "김민수 단장",
    affiliation: ["한국해양수산개발원 북극항로 지원단"],
    bio: "북극항로 정책 및 전략 분야의 전문가로서 한국해양수산개발원(KMI) 북극항로 지원단장을 맡고 있다. 북극항로 활성화를 위한 국가 정책 수립 지원 및 국제 협력 연구를 수행하며 해운·물류 네트워크 확장에 기여하고 있다."
  }
];

interface ForumDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForumDetailModal({ isOpen, onClose }: ForumDetailModalProps) {
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
        className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl dark:bg-slate-900 border border-white/20 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500 overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header Section */}
        <div className="relative bg-blue-50/50 dark:bg-blue-950/20 px-8 py-8 text-center border-b border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="absolute right-6 top-6 rounded-full bg-white dark:bg-slate-800 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:rotate-90 z-20"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-sm font-bold mb-4">
            해양경제포럼
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mb-2 leading-tight">
            북극항로 <span className="text-blue-600">비연안국의 권리</span>
          </h2>
          <div className="text-base font-bold text-slate-500 dark:text-slate-400">
            6월 8일(월) <span className="mx-2 text-slate-300">|</span> 13:30 ~ 17:00
          </div>
        </div>

        {/* Content Body */}
        <div className="overflow-y-auto w-full">
          <div className="flex flex-col">
            {speakerBios.map((speaker, index) => (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors duration-300`}
              >
                {/* Left Side: Name/Affiliation */}
                <div className="w-full md:w-[320px] p-6 sm:p-8 bg-slate-50/30 dark:bg-slate-900/50 border-r border-slate-100 dark:border-slate-800 flex flex-col items-start justify-center">
                  <div className="inline-flex items-center gap-2 mb-3">
                    {speaker.role === "좌장" && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    {speaker.role === "발제" && <Globe className="w-4 h-4 text-blue-600" />}
                    {speaker.role === "패널" && <User className="w-4 h-4 text-amber-600" />}
                    <span className={`text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                      speaker.role === "좌장" ? "bg-emerald-100 text-emerald-700" :
                      speaker.role === "발제" ? "bg-blue-100 text-blue-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {speaker.role}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    {speaker.name}
                  </h4>
                  {speaker.affiliation.map((line, i) => (
                    <div key={i} className="text-xs font-semibold text-slate-500 dark:text-slate-400 leading-snug">
                      {line}
                    </div>
                  ))}
                </div>

                {/* Right Side: Detailed Bio */}
                <div className="flex-1 p-6 sm:p-8">
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {speaker.bio}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Gradient */}
        <div className="h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-400 shrink-0" />
      </div>
    </div>
  );
}
