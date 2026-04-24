export const utilityLinks = [
  { label: "사전등록", href: "/register" },
  { label: "사전등록현황", href: "/registration-status" },
] as const;

export const navigationLinks = [
  { label: "행사소개", href: "/intro" },
  { label: "행사일정", href: "/schedule" },
  { label: "현장스케치", href: "/sketch" },
  { label: "해양사진전", href: "/underwater" },
  { label: "극지사진전", href: "/polar" },
  { label: "Q&A", href: "/qna" },
] as const;

export const heroContent = {
  eyebrow: "OCEAN WEEK 2026",
  title: "2026\n해양주간 Ocean Week",
  period: "2026. 6. 8(월) - 6. 10(수)",
  venue: "벡스코 2전시관 320~324호",
  description:
    "2019년 해양컨퍼런스로 출발해 2023년부터 해양주간으로 확대된 부산 대표 해양 행사로, 정부부처와 부산시, 공기업, 연구기관, 협회, 기업이 함께 모여 해양산업의 미래를 논의합니다.",
  image:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Gwangalli%20Beach%20and%20Gwangan%20Bridge%20Busan.jpg",
};

export const scheduleOverview = [
  {
    day: "DAY 1",
    date: "6월 8일(월)",
    title: "개회식 · 기관장 토크 콘서트 · 해양경제포럼",
    items: [
      "10:00~11:00 개회식 및 공연",
      "11:00~12:00 기관장 토크 콘서트",
      "13:30~14:50 해양경제포럼 - 북극항로 비연안국의 권리 (발제)",
      "15:20~16:50 해양경제포럼 - 북극항로 패널토론",
    ],
  },
  {
    day: "DAY 2",
    date: "6월 9일(화)",
    title: "블루카본 포럼 · 해상풍력 세션",
    items: [
      "10:20~12:00 블루카본의 잠재력과 탄소시장화 전략 (오전)",
      "13:30~15:00 블루카본 탄소시장 반영방안 (오후)",
      "15:30~17:00 해상풍력 특별법 시대 개막: 기회와 도전",
    ],
  },
  {
    day: "DAY 3",
    date: "6월 10일(수)",
    title: "시상식 · 리더스 서밋 · 온라인 컨퍼런스 · 극지시민강좌",
    items: [
      "10:00~11:00 제2회 대한민국해양지도자 대상\n시상식",
      "11:00~12:00 해양산업리더스 서밋",
      "14:00~15:30 온라인 컨퍼런스 ①북극항로 연관산업 발전방안",
      "16:00~17:30 온라인 컨퍼런스 ②북극항로시대 극지교육의 방향성",
      "14:00~17:00 극지시민강좌",
    ],
  },
] as const;

export const registrationSessionDays = [
  {
    day: "DAY 1",
    date: "6월 8일(월)",
    sessions: [
      {
        id: "opening-ceremony",
        title: "개회식",
        time: "10:00 - 11:00",
        capacity: 100,
        description: "해양주간의 시작을 알리는 개막식 및 주요 인사 기조연설",
      },
      {
        id: "leaders-concert",
        title: "기관장 콘서트",
        time: "11:00 - 12:00",
        capacity: 100,
        description: "해양수산부 이전과 해양수도 부산의 비전을 논의하는 기관장 토크 콘서트",
      },
      {
        id: "arctic-route-session",
        title: "북극항로 세션(발제)",
        time: "13:30 - 14:50",
        capacity: 150,
        description: "북극항로 비연안국의 권리와 전략을 논의하는 한·중·일·러 전문가 발제 세션",
      },
      {
        id: "arctic-route-panel",
        title: "북극항로 세션(토론)",
        time: "15:20 - 16:50",
        capacity: 150,
        description: "국내외 전문가들이 참여하는 북극항로 전략 패널 토론",
      },
    ],
  },
  {
    day: "DAY 2",
    date: "6월 9일(화)",
    sessions: [
      {
        id: "blue-carbon-morning",
        title: "블루카본 잠재력 및 전략(오전)",
        time: "10:20 - 12:00",
        capacity: 150,
        description: "블루카본의 잠재력과 친환경 탄소시장화 패러다임 전략 모색",
      },
      {
        id: "blue-carbon-afternoon",
        title: "블루카본 탄소시장 반영(오후)",
        time: "13:30 - 15:00",
        capacity: 150,
        description: "실증 사례와 전문가 지견을 공유하는 블루카본 탄소시장 반영 방안 토론",
      },
      {
        id: "offshore-wind-session",
        title: "해상풍력 특별법 시대 개막 세션",
        time: "15:30 - 17:00",
        capacity: 150,
        description: "해상풍력 특별법 시대의 기회와 도전, 미래전략 논의",
      },
    ],
  },
  {
    day: "DAY 3",
    date: "6월 10일(수)",
    sessions: [
      {
        id: "ocean-awards",
        title: "대한민국해양지도자대상 시상식",
        time: "10:00 - 11:00",
        capacity: 200,
        description: "해양 관련 우수 업적을 기리는 지·산·학·연 부문 시상식",
      },
      {
        id: "ocean-industry-leaders-summit",
        title: "해양산업리더스 서밋",
        time: "11:00 - 12:00",
        capacity: 100,
        description: "해양산업 관련 지·산·학·연 리더 비즈니스 네트워크 교류의 장",
      },
      {
        id: "online-conference-1",
        title: "온라인 컨퍼런스: 북극항로 연관산업",
        time: "14:00 - 15:30",
        capacity: 200,
        description: "북극항로 연관산업 발전 방안 논의 (홈페이지 접속)",
      },
      {
        id: "online-conference-2",
        title: "온라인 컨퍼런스: 극지교육",
        time: "16:00 - 17:30",
        capacity: 200,
        description: "북극항로시대 극지교육의 방향성 모색 (홈페이지 접속)",
      },
      {
        id: "polar-citizen-lecture",
        title: "극지시민강좌",
        time: "14:00 - 17:00",
        capacity: 150,
        description: "북극항로와 부산 경제의 미래를 시민들에게 전달하는 강연",
      },
    ],
  },
] as const;

export const registrationSessions = registrationSessionDays.flatMap((day) =>
  day.sessions.map((session) => ({
    ...session,
    day: day.day,
    date: day.date,
  })),
);

export const registrationSessionIds = registrationSessions.map(
  (session) => session.id,
);

export function getRegistrationSessionLabel(id: string) {
  const session = registrationSessions.find((item) => item.id === id);

  if (!session) {
    return id;
  }

  return `${session.date} ${session.time} ${session.title}`;
}


export interface Partner {
  name: string;
  logo?: string;
  scale?: number;
  xOffset?: string;
  yOffset?: string;
}

export const partnerLogos: Partner[] = [
  // ROW 1: Government & Academia
  { name: "해양수산부", logo: "해양수산부 1.svg", scale: 1.0 },
  { name: "부산광역시", logo: "부산광역시 1.svg", scale: 1.0 },
  { name: "부산광역시의회", logo: "부산광역시의회.svg", scale: 1.0 },
  { name: "부산광역시교육청", logo: "부산광역시교육청 1.svg", scale: 1.0 },
  { name: "부산상공회의소", logo: "부산상공회의소 1.svg", scale: 1.0 },
  { name: "국립부경대학교", logo: "국립부경대학교 1.svg", scale: 1.0 },
  { name: "한국해양대학교", logo: "한국해양대학교(최신) 1.svg", scale: 1.0 },
  { name: "영산대학교", logo: "영산대학교 1.svg", scale: 1.0 },
  { name: "한국해양수산개발원", logo: "한국해양수산개발원 1.svg", scale: 1.0 },

  // ROW 2: Research & Corporate
  { name: "한국해양과학기술원", logo: "한국해양과학기술원 1.svg", scale: 1.0 },
  { name: "한국해양진흥공사", logo: "한국해양진흥공사 로고 1.svg", scale: 1.0 },
  { name: "한국조선해양기자재연구원", logo: "한국조선해양기자재연구원 1.svg", scale: 1.0 },
  { name: "LG전자", logo: "LG 전자 1.svg", scale: 1.0 },
  { name: "LG 퓨로텍", logo: "LG-퓨로텍 1.svg", scale: 1.0 },
  { name: "HJ중공업", logo: "HJ중공업 1.svg", scale: 1.0 },
  { name: "은산해운항공", logo: "은산해운항공 1.svg", scale: 1.0 },
  { name: "부산항만공사", logo: "부산항만공사 CI (1) 1.svg", scale: 1.0 },
  { name: "한국선급", logo: "한국선급 1.svg", scale: 1.0 },

  // ROW 3: Financial & Policy
  { name: "LET'S GO 2025", logo: "선보패밀리그룹 1.svg", scale: 1.0 },
  { name: "BNK 부산은행", logo: "부산은행.svg", scale: 1.0 },
  { name: "파나시아", logo: "파나시아 1.svg", scale: 1.0 },
  { name: "부산국제금융진흥원", logo: "부산국제금융진흥원 1.svg", scale: 1.0 },
  { name: "한국해운협회", logo: "한국해운협회 1.svg", scale: 1.0 },
  { name: "부산항도선사회", logo: "부산항도선사회 1.png", scale: 2.2 },
  { name: "한국해양정책연합", logo: "한국해양정책연합 1.svg", scale: 1.0 },
  { name: "한국해양수산데이터산업협회", logo: "한국해양수산데이터산업협회 로고 1.svg", scale: 1.0 },
  { name: "극지해양미래포럼", logo: "극지해양미래포럼 1.svg", scale: 1.0 },

  // ROW 4: Associations & Tech
  { name: "(사)해양문학가협회", logo: "한국해양문학가협회 1.svg", scale: 1.0 },
  { name: "부산조선해양기자재공업협동조합", logo: "부산조선해양기자재공업협동조합 1.svg", scale: 1.0 },
  { name: "한국해기사협회", logo: "한국해기사협회 1.svg", scale: 1.0 },
  { name: "크라타연구소", logo: "크라타연구소 1.svg", scale: 1.0 },
  { name: "쇼우테크", logo: "쇼우테크 1.svg", scale: 1.0 },
  { name: "국립해양박물관", logo: "국립해양박물관 1.svg", scale: 1.0 },
  { name: "국제신문", logo: "국제신문 1.svg", scale: 1.0 },
  { name: "극지연구소", logo: "극지연구소 1.svg", scale: 1.0 },
  { name: "남해지방해양경찰청", logo: "남해지방해양경찰청 1.svg", scale: 1.0 },
];

export type ContentSlug =
  | "intro"
  | "schedule"
  | "sketch"
  | "underwater"
  | "polar"
  | "qna";

type ContentPage = {
  title: string;
  eyebrow: string;
  summary: string;
  sections: Array<{
    title: string;
    body: string[];
  }>;
};

export const contentPages: Record<ContentSlug, ContentPage> = {
  intro: {
    title: "행사소개",
    eyebrow: "Ocean Week Overview",
    summary:
      "2026 해양주간은 해양인의 열정과 힘을 모아 대한민국 해양산업의 경쟁력을 높이고, 부산을 중심으로 해양산업의 미래를 논의하는 종합 교류 행사입니다.",
    sections: [
      {
        title: "6월 8일(월): 개회식 및 해양 전략 포럼",
        body: [
          "<개회식>을 시작으로 <기관장 토크콘서트>, <해양경제 콘퍼런스>가 이어집니다.",
          "<기관장 토크콘서트>는 해양수산부장관, 부산광역시장을 비롯하여 참여 기관장들이 무대에 등단해\n‘해양수산부 이전과 해양수도 부산’을 주제로 서로의 의견을 자유롭게 나누게 됩니다.",
          "<해양경제 콘퍼런스>에서는 ‘북극항로’ 이슈를 놓고 한국, 중국, 일본, 러시아 전문가들이 발표 및 토론을 이어갑니다.\n연안국인 러시아와 운항 경험을 축적해가는 중국, 방향성을 모색하는 한국과 일본의 전문가들이 한자리에 모여 토론을 벌이는 것은 최고의 이슈가 되리라 기대합니다.",
        ],
      },
      {
        title: "6월 9일(화): 블루카본 포럼 및 해상풍력 세션",
        body: [
          "<해양경제 컨퍼런스>에서는 세계적인 이슈로 등장한 '블루카본의 잠재력과 탄소시장화 전략'에 대해 심도 깊은 이야기를 나눕니다. 2025년 12월 23일 LG전자와 부산광역시의 업무협정을 바탕으로, 각계 전문가와 함께 블루카본을 통한 탄소시장 진출의 방향성을 찾는 것이 이번 세션의 목적입니다.",
          "오후에는 새롭게 부상하는 해상풍력 특별법 시대를 맞이하여 산업계의 대응 전략과 기회 요인을 모색하는 심층 토론이 이어집니다.",
        ],
      },
      {
        title: "6월 10일(수): 시상식 · 리더스 서밋 · 온라인 컨퍼런스 · 극지시민강좌",
        body: [
          "오전에는 <대한민국해양지도자대상 시상식>이 먼저 진행됩니다. 해양관련 우수한 업적을 남긴 분들을 대상으로\n'지·산·학·연' 부문에서 각 한 명씩을 선정하여 상을 수여합니다.",
          "<해양산업리더스 서밋>은 해양산업 관련 산·학·연 리더 100여 명을 초빙하여 개최됩니다. 상호 네트워크를 강화할 뿐 아니라, 전문가 초청 강연을 통해 산업의 미래를 함께 논의합니다.",
          "<온라인 해양컨퍼런스>는 올해로 8회째를 맞이하며, '북극항로 연관산업 발전방안'과 '북극항로시대 극지교육의 방향성' 두 세션으로 구성됩니다.\n또한 이와 병행하여 <극지시민강좌>를 통해 북극항로가 부산 경제에 미치는 긍정적 영향을 시민들에게 생생하게 전달합니다.",
        ],
      },
    ],
  },
  schedule: {
    title: "행사일정",
    eyebrow: "Program Schedule",
    summary:
      "행사는 2026년 6월 8일(월)부터 6월 10일(수)까지 부산 벡스코 2전시관 320~324호에서\n진행되며, 개회식부터 해양경제포럼, 시민강좌, 시상식, 온라인 콘퍼런스까지 3일 일정으로 구성됩니다.",
    sections: [
      {
        title: "행사장 및 운영 안내",
        body: [
          "추진안 기준 주 행사장은 벡스코 2전시관 320~324호이며, 모든 메인 프로그램이 같은 권역 안에서 이어지도록 설계되어 있습니다.",
          "6월 8일과 10일은 오전부터 오후까지 메인 세션이 이어지고, 6월 9일은 오전 블루카본 세션과 오후 시민강좌 중심으로 구성됩니다.",
        ],
      },
      {
        title: "6월 8일(월)",
        body: [
          "오전에는 개회식 및 공연과 기관장 토크 콘서트가 진행되며, 토크 콘서트의 주제는 '해양수산부 이전과 해양수도 부산의 비전'입니다. 해양수산부장관, 부산광역시장, 조승환 의원, 양재생 부산상공회의소 회장, 류동근 국립한국해양대학교 총장, 배상훈 국립부경대학교 총장, 안병길 한국해양진흥공사 사장, 최금식 선보패밀리그룹 회장이 참여 대상으로 제시되어 있습니다.",
          "오후에는 해양경제포럼 '북극항로 비연안국의 권리' 세션이 진행되며, 신형철 극지연구소 소장이 좌장을 맡고 최수범 교수, 궈페이칭 교수, 후지오 오니시 박사, 세르게이 스미르노프 교수가 발제자로 구성되어 있습니다.",
        ],
      },
      {
        title: "6월 9일(화)",
        body: [
          "오전에는 '블루카본의 잠재력과 탄소시장화 전략' 세션이 진행되며, 김종성 서울대학교 교수 좌장 아래 김영석 LG전자 실장, Luzhen Chen 교수, Sandeep Roy Choudhury CEO 등의 발제가 포함되어 있습니다.",
          "오후에는 최가영 박사 좌장의 블루카본 패널토론과 함께 극지시민강좌가 이어지며, 시민강좌에는 이동화 (사)극지해양미래포럼 대표가 강연자로 제시되어 있습니다.",
        ],
      },
      {
        title: "6월 10일(수)",
        body: [
          "오전에는 대한민국해양지도자대상 시상식과 해양산업리더스서밋이 진행되며, 리더스서밋은 해양산업 관련 산·학·연 리더 100여 명이 참여하는 네트워킹 및 초청 강연 중심 행사로 기획되어 있습니다.",
          "오후에는 온라인 해양콘퍼런스가 운영됩니다. 온라인 콘퍼런스는 '해상풍력 특별법시대 개막: 기회와 도전, 그리고 미래전략'과 '북극항로 연관산업 발전 방안' 두 세션으로 구성됩니다.",
        ],
      },
    ],
  },
  sketch: {
    title: "현장스케치",
    eyebrow: "On-site Sketch",
    summary:
      "개회식, 기관장 토크 콘서트, 해양경제포럼, 극지시민강좌, 시상식과 리더스서밋 등 3일간의 주요 장면을 현장 중심으로 기록하는 공간입니다.",
    sections: [
      {
        title: "업로드 예정 장면",
        body: [
          "행사 전에는 안내 화면으로 운영하고, 행사 기간에는 개회식 및 공연, 기관장 토크 콘서트, 북극항로 포럼, 블루카본 세션, 극지시민강좌, 시상식, 리더스서밋 현장을 순차적으로 업로드할 수 있도록 구성했습니다.",
          "프로그램별 대표 컷, 연사 스냅, 관람객 참여 장면, 현장 인터뷰 이미지 등을 카드형 목록 또는 갤러리 형태로 확장할 수 있습니다.",
        ],
      },
      {
        title: "운영 방식",
        body: [
          "행사 기간 중에는 실시간 스케치 업로드, 행사 종료 후에는 날짜별 아카이브 정리 방식으로 운영할 수 있도록 설계해 두었습니다.",
        ],
      },
    ],
  },
  underwater: {
    title: "해양사진전",
    eyebrow: "Ocean Photography Exhibition",
    summary:
      "바닷속 신비로운 생태계와 생명체들의 경이로운 순간을 기록한 전시입니다.\n화려한 산호초와 거대 바다 생물 등 렌즈로 본 바다의 깊은 아름다움을 만나보세요.",
    sections: [],
  },
  polar: {
    title: "극지사진전",
    eyebrow: "Polar Region Photography Exhibition",
    summary:
      "지구의 양 끝, 남극과 북극에서 마주한 극한의 아름다움과 생명력을 담았습니다.\n기후 위기 속에서도 끈질기게 이어지는 극지의 소중한 기록을 공유합니다.",
    sections: [],
  },
  qna: {
    title: "Q&A",
    eyebrow: "Frequently Asked Questions",
    summary:
      "행사 기본 정보, 사전등록, 시상 및 문의 내용을 추진안 기준으로 정리해 자주 묻는 질문 형태로 안내할 수 있도록 구성했습니다.",
    sections: [
      {
        title: "행사 기본 정보",
        body: [
          "2026 해양주간은 2026년 6월 8일(월)부터 6월 10일(수)까지 부산 벡스코 2전시관 320~324호에서 진행되는 것으로 추진안에 명시되어 있습니다.",
          "핵심 프로그램은 개회식, 기관장 토크 콘서트, 해양경제포럼, 블루카본 세션, 극지시민강좌, 대한민국해양지도자대상 시상식, 해양산업리더스서밋, 온라인 해양콘퍼런스입니다.",
        ],
      },
      {
        title: "사전등록 안내",
        body: [
          "사전등록은 이름, 기관, 직책, 전화번호, 이메일과 참석 일정을 입력해 접수할 수 있으며, 참석 일정은 여러 개를 함께 선택할 수 있습니다.",
          "이미 등록된 번호는 사전등록현황 페이지에서 이름과 전화번호를 입력해 조회하고, 기존 정보를 수정하는 방식으로 안내합니다.",
        ],
      },
      {
        title: "시상 및 문의 안내",
        body: [
          "추진안에는 대한민국해양지도자대상 추천서, 추천사유서, 이력서, 공적서, 증빙서류 제출 안내와 함께 국제신문 문화사업국 문의처 051-500-5220, 이메일 kookjephoto@daum.net가 포함되어 있습니다.",
          "다만 문서 내 일부 모집 일정은 2025년 기준 문안이 포함되어 있으므로, 실제 홈페이지 공개 전에는 2026년 기준 공고 일정으로 다시 확인하는 것이 필요합니다.",
        ],
      },
    ],
  },
};
