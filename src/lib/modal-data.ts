"use client";

export interface SpeakerBio {
  role: string;
  name: string;
  affiliation: string[];
  bio: string;
}

export interface ModalContent {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  themeColor: "blue" | "emerald" | "amber" | "teal";
  type: "speakers" | "text";
  speakers?: SpeakerBio[];
  body?: string[];
  sections?: { title: string; content: string[] }[];
}

export const scheduleModalData: Record<string, ModalContent> = {
  "arctic-route": {
    id: "arctic-route",
    title: "북극항로 비연안국의 권리",
    subtitle: "해양경제포럼",
    time: "6월 8일(월) | 13:30 ~ 17:00",
    themeColor: "blue",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "신형철 소장",
        affiliation: ["극지연구소"],
        bio: "신형철 소장은 대한민국의 극지과학 및 해양정책 분야 전문가로, 현재 극지연구소 소장으로 재직하며 북극 및 남극 연구, 극지 거버넌스, 해양안보 및 국제협력 분야를 총괄하고 있다. 특히 북극항로(Arctic Sea Routes)와 관련된 과학·정책 융합 연구를 선도하며, 기후변화에 따른 북극 환경 변화와 국제 해양질서 재편에 대한 연구를 수행하고 있다."
      },
      {
        role: "발제",
        name: "최수범 교수",
        affiliation: ["국민대학교 특임교수", "한국북극항로협회 사무총장"],
        bio: "해양·물류 및 북극항로 분야의 전문가로, 한국북극항로협회 사무총장을 맡아 북극항로 개발과 국제 협력, 관련 정책 연구를 주도하고 있다. 또한 국민대학교 특임교수로 활동하며 해운·물류 및 북극항로의 전략적 중요성과 미래 가능성에 대해 강의와 연구를 수행하고 있다."
      },
      {
        role: "발제",
        name: "郭培淸(궈페이칭) 교수",
        affiliation: ["중국해양대학교", "국제사무 및 공공관리학원"],
        bio: "궈페이칭(Guo Peiqing) 교수는 Ocean University of China 국제문제 및 공공행정학부에서 재직 중이다. 그는 중국 교육부가 설립한 극지센터의 집행이사를 맡고 있다. 또한 매년 칭다오와 상트페테르부르크에서 개최되는 중국-러시아 북극 워크숍의 창립자로 활동하고 있다."
      },
      {
        role: "발제",
        name: "후지오 오니시 박사",
        affiliation: ["홋카이도대학교 북극연구센터", "그룹리더"],
        bio: "Fujio Ohnishi 박사는 북극 해양과 항로 개발 분야에서 활동하는 연구자로, Hokkaido University Arctic Research Center에서 그룹리더로 재직하며 북극항로의 활용 가능성과 안전성 등을 연구하고 있다."
      },
      {
        role: "발제",
        name: "스미르노프 세르게이 마라토비치 교수",
        affiliation: ["블라디보스톡 극동연방대학"],
        bio: "세르게이 M. 스미르노프는 러시아 연방 국적의 해양 및 안보 분야 전문가이다. 2002년 조선공학 분야 기술과학 박사 학위를 취득하였으며, 현재 극동연방대학교에서 국제 연구 프로젝트의 선임 연구원으로 활동하고 있다."
      },
      {
        role: "패널",
        name: "정영두 센터장",
        affiliation: ["한국해양진흥공사 북극항로 종합지원센터"],
        bio: "2018년 한국해양진흥공사 설립과 함께 해운산업정보센터장 등을 역임했으며, 현재 북극항로종합지원센터장을 맡아 해운·물류 분야 경제안보 강화에 기여하고 있다."
      },
      {
        role: "패널",
        name: "김민수 단장",
        affiliation: ["한국해양수산개발원 북극항로 지원단"],
        bio: "북극항로 정책 및 전략 분야의 전문가로서 한국해양수산개발원(KMI) 북극항로 지원단장을 맡고 있다."
      }
    ]
  },
  "blue-carbon": {
    id: "blue-carbon",
    title: "블루카본의 잠재력과 탄소 시장화 전략",
    subtitle: "해양경제포럼",
    time: "6월 9일(화) | 10:20 ~ 15:00",
    themeColor: "blue",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "김종성 교수",
        affiliation: ["서울대학교 지구환경과학부"],
        bio: "김종성 교수는 서울대학교에서 해양생태학 박사학위를 받았으며, 갯벌의 자정 능력을 세계 최초로 정량화해 생태계 서비스 가치를 과학적으로 입증하였다. 약 300편의 SCI 논문을 발표하며 학술적 영향력을 인정받았다."
      },
      {
        role: "발제",
        name: "김영석 실장",
        affiliation: ["LG 전자 H&A 기능성 소재 사업실장"],
        bio: "기능성 유리 소재에 대한 원천기술 연구개발 및 양산화를 수행해 오고 있으며, 한국세라믹 학회 유리부회 운영위원으로 활동하고 있다."
      },
      {
        role: "발제",
        name: "Luzhen CHEN 교수",
        affiliation: ["Xiamen University"],
        bio: "블루카본(Blue Carbon) 연구 분야의 권위자로, 해양 생태계 탄소 흡수와 저장, 기후 변화 완화 전략을 중심으로 연구를 수행하고 있다."
      },
      {
        role: "발제",
        name: "Sandeep Roy Choudhury CEO",
        affiliation: ["VNV Advisory"],
        bio: "사회적 기업인 VNV Advisory Services의 공동 설립자로서 기후 금융을 통해 자연 생태계 복원 및 재생, 생물 다양성 보전에 집중하고 있다."
      },
      {
        role: "좌장(오후)",
        name: "최가영 박사",
        affiliation: ["국가녹색기술연구소"],
        bio: "해양 생태계 기반 탄소흡수원 연구를 수행하는 환경·에너지 분야 전문가로, 현재 블루카본 및 자연기반해법(NbS) 관련 연구를 수행하고 있다."
      },
      {
        role: "발제(오후)",
        name: "정여진 박사",
        affiliation: ["한국해양수산개발원"],
        bio: "연안·해양 생태계의 탄소 흡수와 저장, 블루카본 가치 평가 및 시장화를 중심으로 연구를 수행하고 있다."
      },
      {
        role: "패널",
        name: "김남진 팀장",
        affiliation: ["LG 전자 H&A기능성소재사업실"],
        bio: "기능성 유리 분말의 개발과 상용화를 주 연구 분야로 하며, 위생과 지구 환경에 이로운 소재를 연구하고 있다."
      },
      {
        role: "패널",
        name: "손승태 부장",
        affiliation: ["한국거래소 파생상품시장본부"],
        bio: "한국거래소에서 인덱스개발팀장 등을 역임하며 ESG 지수 개발을 주도했다. 금융시장과 환경·탄소 상품의 연결 고리를 전문적으로 다룬다."
      },
      {
        role: "패널",
        name: "김태선 대표",
        affiliation: ["(주)나무이엔알 (NAMU EnR)"],
        bio: "자발적 탄소시장과 탄소중립 전략 전문가로, 탄소시장 정책 자문과 국제 협력에 깊이 관여하며 정부 기관의 자문위원으로 활동하고 있다."
      }
    ]
  },
  "polar-lecture": {
    id: "polar-lecture",
    title: "극지시민강좌",
    subtitle: "Day 2 시민 참여 프로그램",
    time: "6월 9일(화) | 16:00 ~ 18:00",
    themeColor: "amber",
    type: "speakers",
    speakers: [
      {
        role: "강연",
        name: "이동화 대표",
        affiliation: ["(사)극지해양미래포럼"],
        bio: "북극·남극 해양과 북극항로 분야의 전문 지식을 바탕으로 극지 해양의 지속가능한 이용과 미래 전략을 연구하고 있다. 대중강연과 국제 포럼을 통해 극지의 중요성을 전파하고 있다."
      }
    ]
  },
  "ocean-awards": {
    id: "ocean-awards",
    title: "대한민국 해양지도자 대상 시상식",
    subtitle: "Day 3 주요 행사",
    time: "6월 10일(수) | 10:00 ~ 11:00",
    themeColor: "teal",
    type: "text",
    body: [
      "국립한국해양대학교와 국제신문은 국가발전에 헌신해 온 숨은 일꾼들을 발굴해 그들의 업적을 널리 알려 우리사회의 귀중한 본보기로 삼고자 '대한민국 해양지도자 대상'을 제정합니다."
    ],
    sections: [
      {
        title: "1. 시상부문 및 내용",
        content: ["지·산·학·연 각 부문 상패와 부상 3백만원"]
      },
      {
        title: "2. 수상자격",
        content: ["해당 부문에서 대한민국 해양 발전에 현저한 공적이 있는 개인이나 단체"]
      },
      {
        title: "3. 시상식 일정",
        content: ["2025년 5월 28일(수) 14:00 벡스코 컨벤션홀 205호"]
      },
      {
        title: "4. 후보자 추천 및 접수",
        content: [
          "접수 기간: 2025. 4. 13(일) ~ 5. 12(월)",
          "접수 방법: 이메일(kookjephoto@daum.net) 또는 우편 접수",
          "문의: 국제신문 문화사업국 051-500-5220"
        ]
      }
    ]
  }
};
