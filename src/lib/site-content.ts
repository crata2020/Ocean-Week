export const utilityLinks = [
  { label: "사전등록", href: "/register" },
  { label: "사전등록현황", href: "/registration-status" },
] as const;

export const navigationLinks = [
  { label: "행사소개", href: "/intro" },
  { label: "행사일정", href: "/schedule" },
  { label: "부대행사", href: "/events" },
  { label: "현장스케치", href: "/sketch" },
  { label: "부산바다사진", href: "/photos" },
  { label: "Q&A", href: "/qna" },
] as const;

export const heroContent = {
  eyebrow: "BUSAN OCEAN WEEK",
  title: "2026 해양주간 Ocean Week",
  period: "2026. 6. 8 - 6. 11",
  description:
    "해양 산업, 교육, 연구, 시민 프로그램이 한자리에 모이는 부산 대표 해양 행사입니다.",
  image:
    "https://commons.wikimedia.org/wiki/Special:FilePath/Gwangalli%20Beach%20and%20Gwangan%20Bridge%20Busan.jpg",
};

export const scheduleOverview = [
  {
    day: "DAY 1",
    date: "6월 8일",
    title: "개막 프로그램",
    items: ["개막식", "기조 행사", "해양정책 세션"],
  },
  {
    day: "DAY 2",
    date: "6월 9일",
    title: "산업·교육 프로그램",
    items: ["산학 협력 프로그램", "교육 연계 행사", "체험형 부대행사"],
  },
  {
    day: "DAY 3",
    date: "6월 10일",
    title: "시민 참여 프로그램",
    items: ["전시 및 포토존", "현장 스케치", "시민 참여 이벤트"],
  },
] as const;

export const partnerLogos = [
  "부산광역시",
  "부산광역시의회",
  "부산광역시교육청",
  "한국해양대학교",
  "부경대학교",
  "영산대학교",
  "한국해양수산개발원",
  "국립수산과학원",
  "한국해양과학기술원",
  "한국해양진흥공사",
  "해양환경공단",
  "국립해양박물관",
  "부산연구원",
  "부산항만공사",
  "한국선급",
  "한국해운협회",
  "팬아시아",
  "부산항도선사회",
  "부산항만산업총연합회",
  "한국해양정책연합",
  "한국선박관리산업협회",
  "LG전자",
  "HJ중공업",
  "은산해운항공",
] as const;

export type ContentSlug =
  | "intro"
  | "schedule"
  | "events"
  | "sketch"
  | "photos"
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
      "2026 해양주간은 부산의 해양 산업, 교육, 연구, 시민 프로그램을 연결하는 통합 행사로 기획됩니다.",
    sections: [
      {
        title: "행사 방향",
        body: [
          "해양도시 부산의 정체성을 바탕으로 산업, 학계, 시민이 함께 참여하는 열린 프로그램을 구성합니다.",
          "핵심 프로그램과 세부 안내는 확정되는 일정에 맞춰 순차적으로 업데이트할 수 있도록 구조를 분리해 두었습니다.",
        ],
      },
      {
        title: "안내 예정 정보",
        body: [
          "행사 장소, 세부 프로그램, 참여 기관, 공지사항은 운영팀에서 자료를 전달해 주시면 바로 반영할 수 있습니다.",
        ],
      },
    ],
  },
  schedule: {
    title: "행사일정",
    eyebrow: "Program Schedule",
    summary:
      "현재는 3일 구성을 기준으로 임시 일정을 배치해 두었으며, 최종 시간표를 받는 즉시 교체할 수 있게 설계했습니다.",
    sections: [
      {
        title: "운영 메모",
        body: [
          "아래 일정 카드는 프론트 설정 데이터로 관리되며, 향후 주시는 최종 일정표로 빠르게 수정할 수 있습니다.",
          "사전등록 페이지에도 동일한 요약 정보가 연결되어 참가자 안내에 사용됩니다.",
        ],
      },
    ],
  },
  events: {
    title: "부대행사",
    eyebrow: "Side Events",
    summary:
      "전시, 체험, 홍보, 연계 프로그램을 한눈에 정리할 수 있는 영역입니다.",
    sections: [
      {
        title: "예정 콘텐츠",
        body: [
          "기관별 체험 부스, 홍보 전시, 시민 참여형 이벤트, 협력 프로그램 안내를 배치할 수 있습니다.",
          "운영 확정 후 카드형 목록 또는 일정형 안내로 전환하기 쉽도록 여유 있는 레이아웃으로 구성합니다.",
        ],
      },
    ],
  },
  sketch: {
    title: "현장스케치",
    eyebrow: "On-site Sketch",
    summary:
      "행사 기간 동안 촬영한 사진과 주요 장면을 빠르게 정리해 공개하는 공간입니다.",
    sections: [
      {
        title: "업데이트 안내",
        body: [
          "행사 전에는 안내 문구를 보여주고, 행사 진행 중에는 카드형 사진 목록으로 전환할 수 있습니다.",
          "사진 교체와 추가가 쉽도록 이미지 그리드 중심으로 확장 가능한 구성을 기준으로 설계합니다.",
        ],
      },
    ],
  },
  photos: {
    title: "부산바다사진",
    eyebrow: "Busan Sea Photo",
    summary:
      "부산 바다를 주제로 한 사진 콘텐츠와 전시 관련 소식을 정리하는 메뉴입니다.",
    sections: [
      {
        title: "페이지 활용 예시",
        body: [
          "전시 안내, 출품작 소개, 현장 사진, 수상작 발표 등 운영 방식에 맞춰 다양한 콘텐츠를 담을 수 있습니다.",
          "현재는 자리표시 콘텐츠로 두고, 실제 이미지나 게시물 구조가 정해지면 바로 교체할 수 있습니다.",
        ],
      },
    ],
  },
  qna: {
    title: "Q&A",
    eyebrow: "Frequently Asked Questions",
    summary:
      "자주 묻는 질문과 등록 관련 안내를 모아두는 공간입니다.",
    sections: [
      {
        title: "등록 안내",
        body: [
          "사전등록은 이름, 기관, 직책, 전화번호, 이메일 입력 후 접수할 수 있습니다.",
          "같은 전화번호로 이미 등록된 경우에는 새 등록 대신 사전등록현황 페이지에서 수정하도록 안내합니다.",
        ],
      },
      {
        title: "수정 안내",
        body: [
          "사전등록현황 페이지에서 이름과 전화번호를 입력하면 본인 등록 정보를 조회하고 수정할 수 있습니다.",
        ],
      },
    ],
  },
};
