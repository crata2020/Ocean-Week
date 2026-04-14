const fs = require('fs');
const path = require('path');

const brainDir = 'C:/Users/wnsdu/.gemini/antigravity/brain/91196094-760e-4345-949b-ddaaa5364174';
const outputFile = path.join(process.cwd(), '2026_해양주간_최종산출물_보고서.html');

const images = {
  home_hero: '01_home_page_png_1776152558380.png',
  home_bottom: '02_home_bottom_partners_png_1776152571969.png',
  registration: '03_registration_form_png_1776152582087.png',
  admin_dashboard: '06_admin_dashboard_kjy_1776154301177.png',
  admin_edit: '07_registration_edit_kjy_1776154312461.png',
  intro: '10_intro_full_page_1776155003856.png',
  schedule: '09_schedule_page_png_1776154568619.png'
};

function getBase64(filename) {
  const filePath = path.join(brainDir, filename);
  try {
    const data = fs.readFileSync(filePath);
    return `data:image/png;base64,${data.toString('base64')}`;
  } catch (e) {
    console.error(`Failed to read ${filename}:`, e.message);
    return '';
  }
}

const b64 = {};
for (const key in images) {
  b64[key] = getBase64(images[key]);
}

const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>2026 해양주간 최종 산출물 보고서</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;400;700&display=swap" rel="stylesheet">
    <style>
        body { font-family: 'Pretendard', sans-serif; }
        @media print {
            .no-print { display: none; }
            .page-break { page-break-before: always; }
            body { background-color: white !important; }
            .shadow-xl { shadow: none !important; }
            .max-w-4xl { max-width: 100% !important; border: none !important; }
        }
    </style>
</head>
<body class="bg-slate-50 text-slate-900 leading-relaxed">
    <div class="max-w-4xl mx-auto px-6 py-12 bg-white shadow-xl min-h-screen">
        <!-- Header -->
        <header class="border-b-2 border-slate-900 pb-8 mb-12">
            <div class="flex justify-between items-end">
                <div>
                    <h1 class="text-4xl font-bold tracking-tight text-slate-900">2026 해양주간 프로젝트</h1>
                    <p class="text-xl text-slate-500 mt-2">최종 개발 산출물 및 시스템 가이드</p>
                </div>
                <div class="text-right">
                    <p class="text-sm font-semibold text-slate-400">REPORT NO. 2026-OCEAN-01</p>
                    <p class="text-sm text-slate-400">2026. 04. 14</p>
                </div>
            </div>
        </header>

        <!-- TOC -->
        <nav class="bg-slate-50 p-6 rounded-lg mb-12 no-print">
            <h2 class="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">목차</h2>
            <ul class="space-y-2">
                <li><a href="#section1" class="text-sky-600 hover:underline">1. 메인 홈페이지 (Home)</a></li>
                <li><a href="#section2" class="text-sky-600 hover:underline">2. 행사 소개 (Intro)</a></li>
                <li><a href="#section3" class="text-sky-600 hover:underline">3. 프로그램 일정 (Schedule)</a></li>
                <li><a href="#section4" class="text-sky-600 hover:underline">4. 사전등록 및 관리 기능 (Registration & Admin)</a></li>
            </ul>
        </nav>

        <!-- Section 1 -->
        <section id="section1" class="mb-20">
            <div class="flex items-center gap-3 mb-6">
                <span class="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">1</span>
                <h2 class="text-2xl font-bold">메인 홈페이지 (Home)</h2>
            </div>
            <p class="text-slate-600 mb-8">고급스러운 해양 이미지를 메인으로 활용하여 방문자의 시선을 압도하며, 사용자 행동 흐름에 최적화된 레이아웃을 제공합니다.</p>
            
            <div class="space-y-12">
                <div class="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                    <img src="${b64.home_hero}" class="w-full h-auto" alt="Main Home Hero">
                    <div class="p-4 bg-slate-50 text-sm text-slate-500 text-center font-medium">메인 상단 히어로 섹션</div>
                </div>
                <div class="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                    <img src="${b64.home_bottom}" class="w-full h-auto" alt="Partners">
                    <div class="p-4 bg-slate-50 text-sm text-slate-500 text-center font-medium">기관 파트너십 섹션 및 하단 전환부</div>
                </div>
            </div>
        </section>

        <div class="page-break"></div>

        <!-- Section 2 -->
        <section id="section2" class="mb-20 pt-12">
            <div class="flex items-center gap-3 mb-6">
                <span class="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">2</span>
                <h2 class="text-2xl font-bold">행사 소개 (Intro)</h2>
            </div>
            <p class="text-slate-600 mb-8">2026 해양주간의 취지, 비전, 구성 방식 등을 직관적인 인포그래픽과 타이포그래피로 안내합니다.</p>
            
            <div class="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img src="${b64.intro}" class="w-full h-auto" alt="Intro Page">
                <div class="p-4 bg-slate-50 text-sm text-slate-500 text-center font-medium">행사 개요 및 소개 전체 페이지</div>
            </div>
        </section>

        <div class="page-break"></div>

        <!-- Section 3 -->
        <section id="section3" class="mb-20 pt-12">
            <div class="flex items-center gap-3 mb-6">
                <span class="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">3</span>
                <h2 class="text-2xl font-bold">프로그램 일정 (Schedule)</h2>
            </div>
            <p class="text-slate-600 mb-8">3일간 진행되는 다양한 세션 정보를 시간대별, 장소별로 제공하여 참가자의 편의를 도모합니다.</p>
            
            <div class="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                <img src="${b64.schedule}" class="w-full h-auto" alt="Schedule Page">
                <div class="p-4 bg-slate-50 text-sm text-slate-500 text-center font-medium">3일간의 실시간 세션 일정표</div>
            </div>
        </section>

        <div class="page-break"></div>

        <!-- Section 4 -->
        <section id="section4" class="mb-20 pt-12">
            <div class="flex items-center gap-3 mb-6">
                <span class="bg-slate-900 text-white w-8 h-8 flex items-center justify-center rounded-full font-bold">4</span>
                <h2 class="text-2xl font-bold">사전등록 및 관리 기능</h2>
            </div>
            <p class="text-slate-600 mb-8">참가자 등록부터 실시간 예약 조회, 그리고 운영진을 위한 통합 대시보드 기능을 지원합니다.</p>
            
            <div class="space-y-12">
                <div class="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                    <img src="${b64.registration}" class="w-full h-auto" alt="Registration Form">
                    <div class="p-4 bg-slate-50 text-sm text-slate-500 text-center font-medium">스마트 사전등록 폼</div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div class="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        <img src="${b64.admin_dashboard}" class="w-full h-auto" alt="Admin Dashboard">
                        <div class="p-4 bg-slate-50 text-sm text-slate-500 text-center font-medium">운영진용 실시간 집계 대시보드</div>
                    </div>
                    <div class="rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        <img src="${b64.admin_edit}" class="w-full h-auto" alt="Admin Edit">
                        <div class="p-4 bg-slate-50 text-sm text-slate-500 text-center font-medium">참가자별 상세 일정 및 정보 관리</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="mt-24 pt-8 border-t border-slate-200 text-center text-slate-400 text-sm">
            <p>&copy; 2026 OCEAN WEEK Organizing Committee. All rights reserved.</p>
            <button onclick="window.print()" class="mt-4 px-6 py-2 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors no-print">
                PDF로 저장하기 / 인쇄하기
            </button>
        </footer>
    </div>
</body>
</html>
`;

fs.writeFileSync(outputFile, htmlContent);
console.log('HTML Report generated successfully!');
