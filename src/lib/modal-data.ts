"use client";

export interface SpeakerBio {
  role: string;
  name: string;
  affiliation: string[];
  bio: string;
  image?: string;
  imagePosition?: string;
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
  sections?: { title: string; content: string[]; isTable?: boolean }[];
}

export const scheduleModalData: Record<string, ModalContent> = {

  // ──────────────────────────────────────
  // 6월 8일 (DAY 1)
  // ──────────────────────────────────────

  "arctic-route-presentation": {
    id: "arctic-route-presentation",
    title: "북극항로 비연안국의 권리",
    subtitle: "해양경제포럼 · 한·중·일·러 전문가 발표",
    time: "6월 8일(월) | 13:30 ~ 14:50",
    themeColor: "blue",
    type: "speakers",
    speakers: [
      {
        role: "발표 · 한국",
        name: "최수범 교수",
        affiliation: ["국민대학교 특임교수", "한국북극항로협회 사무총장"],
        bio: "최수범 교수는 해양·물류 및 북극항로 분야의 전문가로, 한국북극항로협회 사무총장과 국민대학교 특임교수로 활동하고 있다. 북극항로 개발과 국제 협력, 정책 연구를 주도하며, 해운·물류와 북극항로의 전략적 중요성과 미래 가능성을 연구·강의하고 있다. 정부·학계·산업계를 잇는 가교 역할도 수행하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/choi_soo_beom.jpg"
      },
      {
        role: "발표 · 중국",
        name: "郭培淸(궈페이칭) 교수",
        affiliation: ["중국해양대학교", "국제사무 및 공공관리학원"],
        bio: "궈페이칭 교수는 중국해양대학교 국제문제 및 공공행정 분야 교수로, 중국 교육부 산하 극지센터 집행이사이자 Polar and Ocean Portal 설립자이다. 북극항로, 특히 북동·북서항로의 법적 지위와 국제정치적 의미를 중심으로 연구해 왔으며, 국제해양법과 해양정치의 관점에서 북극 질서와 협력 구조를 분석하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/gwak_bae_cheong.jpg"
      },
      {
        role: "발표 · 일본",
        name: "후지오 오니시 박사",
        affiliation: ["홋카이도대학교 북극연구센터", "그룹리더"],
        bio: "Fujio Ohnishi 박사는 홋카이도대학교 북극연구센터 그룹리더로, 북극 해양과 항로 개발, 운항 안전성, 환경 영향을 중심으로 연구하고 있다. 기후변화에 따른 해빙 감소와 북극항로의 계절적 개방이 국제 해운과 물류에 미치는 영향을 분석하며, 경제성과 리스크 관리, 지속가능한 북극 이용 방안을 함께 탐구하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/fujio_ohnishi.jpg"
      },
      {
        role: "발표 · 러시아",
        name: "스미르노프 세르게이 마라토비치 교수",
        affiliation: ["블라디보스톡 극동연방대학"],
        bio: "세르게이 M. 스미르노프 교수는 러시아의 해양·안보 분야 전문가로, 해상 운송과 물류, 북극항로의 경제적 개발, 지역 및 해양안보를 폭넓게 연구해 왔다. 러시아 해군 대령(예비역) 경력과 국제 공동연구 경험을 바탕으로 국제 물류 경로 설계와 동북아 해양 협력, 학술 교류 분야에서도 활발히 활동하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/sergei_smirnov.jpg",
        imagePosition: "60% 20%"
      }
    ]
  },

  "arctic-route-panel": {
    id: "arctic-route-panel",
    title: "북극항로 비연안국의 권리",
    subtitle: "해양경제포럼 · 한·중·일·러 발표자 + 패널 토론",
    time: "6월 8일(월) | 15:20 ~ 16:50",
    themeColor: "blue",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "신형철 소장",
        affiliation: ["극지연구소"],
        bio: "신형철 소장은 대한민국의 극지과학 및 해양정책 분야 전문가로, 현재 극지연구소 소장으로 재직하며 북극·남극 연구와 극지 거버넌스, 해양안보, 국제협력을 총괄하고 있다. 특히 북극항로와 기후변화, 국제 해양질서 재편을 연계한 과학·정책 융합 연구와 과학외교 기반의 극지 협력 모델 구축에 힘쓰고 있다.",
        image: "/images/speakers/신형철.jpg"
      },
      {
        role: "토론",
        name: "최수범 교수",
        affiliation: ["국민대학교 특임교수"],
        bio: "최수범 교수는 해양·물류 및 북극항로 분야의 전문가로, 한국북극항로협회 사무총장과 국민대학교 특임교수로 활동하고 있다. 북극항로 개발과 국제 협력, 정책 연구를 주도하며, 해운·물류와 북극항로의 전략적 중요성과 미래 가능성을 연구·강의하고 있다. 정부·학계·산업계를 잇는 가교 역할도 수행하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/choi_soo_beom.jpg"
      },
      {
        role: "토론",
        name: "郭培淸(궈페이칭) 교수",
        affiliation: ["중국해양대학교"],
        bio: "궈페이칭 교수는 중국해양대학교 국제문제 및 공공행정 분야 교수로, 중국 교육부 산하 극지센터 집행이사이자 Polar and Ocean Portal 설립자이다. 북극항로, 특히 북동·북서항로의 법적 지위와 국제정치적 의미를 중심으로 연구해 왔으며, 국제해양법과 해양정치의 관점에서 북극 질서와 협력 구조를 분석하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/gwak_bae_cheong.jpg"
      },
      {
        role: "토론",
        name: "후지오 오니시 박사",
        affiliation: ["홋카이도대학교 북극연구센터"],
        bio: "Fujio Ohnishi 박사는 홋카이도대학교 북극연구센터 그룹리더로, 북극 해양과 항로 개발, 운항 안전성, 환경 영향을 중심으로 연구하고 있다. 기후변화에 따른 해빙 감소와 북극항로의 계절적 개방이 국제 해운과 물류에 미치는 영향을 분석하며, 경제성과 리스크 관리, 지속가능한 북극 이용 방안을 함께 탐구하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/fujio_ohnishi.jpg"
      },
      {
        role: "토론",
        name: "스미르노프 세르게이 마라토비치 교수",
        affiliation: ["블라디보스톡 극동연방대학"],
        bio: "세르게이 M. 스미르노프 교수는 러시아의 해양·안보 분야 전문가로, 해상 운송과 물류, 북극항로의 경제적 개발, 지역 및 해양안보를 폭넓게 연구해 왔다. 러시아 해군 대령(예비역) 경력과 국제 공동연구 경험을 바탕으로 국제 물류 경로 설계와 동북아 해양 협력, 학술 교류 분야에서도 활발히 활동하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/sergei_smirnov.jpg",
        imagePosition: "60% 20%"
      },
      {
        role: "토론",
        name: "남형식 교수",
        affiliation: ["국립한국해양대학교"],
        bio: "남형식 교수는 국립한국해양대학교에서 해사 및 해운·물류 분야를 연구하는 전문가로, 북극항로를 포함한 글로벌 해상 운송 전략과 극지 물류를 주요 연구 주제로 삼고 있다. 기후변화에 따른 북극해 항로의 상업적 활용 가능성과 해상 안전, 국제 규제 체계를 분석하며, 실무적 전략 수립과 정책 자문에도 참여하고 있다.",
        image: "/images/speakers/남형식.jpg"
      },
      {
        role: "토론",
        name: "정영두 센터장",
        affiliation: ["한국해양진흥공사 북극항로 종합지원센터"],
        bio: "정영두 센터장은 팬오션과 켄코선박운용, 한국해양진흥공사에서 해운시장 조사와 산업 정보, ESG 및 공급망 대응 업무를 두루 수행해 온 해운·물류 전문가이다. 현재 북극항로 종합지원센터장을 맡아 북극항로와 연계한 해상 공급망 안정화와 해운·물류 분야 경제안보 강화에 기여하고 있다.",
        image: "/images/speakers/정영두.jpg"
      }
    ]
  },

  // ──────────────────────────────────────
  // 6월 9일 (DAY 2)
  // ──────────────────────────────────────

  "blue-carbon-am": {
    id: "blue-carbon-am",
    title: "블루카본의 잠재력과 탄소시장화 전략",
    subtitle: "해양경제포럼 · 한·중·인도 전문가 발제 및 토론",
    time: "6월 9일(화) | 10:20 ~ 12:00",
    themeColor: "blue",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "김종성 교수",
        affiliation: ["서울대학교 지구환경과학부"],
        bio: "김종성 교수는 서울대학교 지구환경과학부 교수로, 연안 생태계 구조와 기능, 오염물질에 대한 생물 반응, 해양 생태위해성 평가를 연구해 온 해양생태학자이다. 갯벌의 자정 능력을 정량화하고 해양 환경 관리 기법을 제안하는 등 학술적 성과를 쌓았으며, 국제학술지 편집장으로도 활동하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/kim_jong_seong.jpg",
        imagePosition: "center 0%"
      },
      {
        role: "발표",
        name: "김영석 실장",
        affiliation: ["LG전자 H&A기성성소재사업실"],
        bio: "김영석 실장은 LG전자 H&A사업본부에서 기능성 유리 소재의 원천기술 연구개발과 양산화를 수행해 온 소재 분야 전문가이다. 부산대학교에서 재료공학 박사, 핀란드 알토대학교에서 MBA를 취득했으며, 현재 기능성 소재 사업실장으로서 산업 적용성과 사업화 역량을 함께 이끌고 있다.",
        image: "/images/speakers/김영재.jpg"
      },
      {
        role: "발표",
        name: "천루전(Luzhen CHEN) 교수",
        affiliation: ["중국 샤먼대학교"],
        bio: "Luzhen Chen 교수는 Xiamen University에서 재직 중인 블루카본 연구 권위자로, 연안 습지·맹그로브·해초림 등 해양 생태계의 탄소 흡수와 저장 기능을 연구하고 있다. 기후변화 완화와 지속가능한 해양 관리, 탄소 감축 정책 설계에 필요한 과학적 근거를 제시하며 국제 공동연구와 정책 자문에도 활발히 참여하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/luzhen_chen.jpg"
      },
      {
        role: "발표",
        name: "산딥 로이 초두리 CEO",
        affiliation: ["인도 VNV 어드바이저리"],
        bio: "산딥 로이 차우두리 대표는 남아시아와 동남아시아 지역에서 기후변화 대응과 지역사회 기반 지속가능성 사업을 이끄는 사회적기업가이다. 11개국 이상에서 농촌 가구, NGO, 실행 파트너와 협력해 자연 생태계 복원과 기후 스마트 농업을 추진해 왔으며, 기후금융과 기후 솔루션 투자 분야에서도 활동하고 있다.",
        image: "/images/speakers/sandeep_roy_choudhury.jpg",
        imagePosition: "70% 20%"
      }
    ]
  },

  "blue-carbon-pm": {
    id: "blue-carbon-pm",
    title: "블루카본 탄소시장 반영방안",
    subtitle: "해양경제포럼",
    time: "6월 9일(화) | 13:30 ~ 15:00",
    themeColor: "blue",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "최가영 박사",
        affiliation: ["국가녹색기술연구소"],
        bio: "최가영 박사는 기후변화 대응과 해양 기반 탄소흡수원 연구를 수행하는 환경·에너지 분야 전문가로, 국가녹색기술연구소에서 블루카본과 자연기반해법(NbS) 연구를 수행하고 있다. 해양 생태계의 탄소 저장 기능을 분석해 탄소중립의 과학적 근거를 마련해 왔으며, 국제 협력과 정책 확산 전략 수립에도 참여하고 있다.",
        image: "/images/speakers/최가영.jpg"
      },
      {
        role: "발제",
        name: "정여진 박사",
        affiliation: ["한국해양수산개발원(KMI)"],
        bio: "정여진 박사는 블루카본과 해양 탄소시장 분야 전문가로, 한국해양수산개발원에서 연안·해양 생태계의 탄소 흡수와 저장, 블루카본 가치 평가와 시장화를 중심으로 연구하고 있다. 자발적 탄소시장과 연계한 정책 개발과 프로젝트 지원을 통해 블루카본의 경제적·환경적 가치를 확산하는 데 기여하고 있다.",
        image: "/images/speakers/정여진.png"
      },
      {
        role: "패널",
        name: "김남진 팀장",
        affiliation: ["LG전자 기능성소재사업실"],
        bio: "김남진 팀장은 부산대학교에서 재료공학을 전공하였으며, 현재 LG전자 H&A 기능성소재사업실에서 기능성 유리 분말의 개발과 상용화를 담당하고 있다. 2011년 입사 이후 다양한 기능성 유리 조성과 원천소재기술 지식재산권 확보에 힘써 왔으며, 최근에는 위생과 환경에 이로운 소재 연구에 주력하고 있다.",
        image: "/images/speakers/김남진.jpg"
      },
      {
        role: "패널",
        name: "손승태 부장",
        affiliation: ["한국거래소"],
        bio: "손승태 부장은 한국거래소에서 ESG 지수 개발과 지수시장 확대를 주도하고, 일반상품시장 운영과 관리 경험을 쌓아 온 금융시장 전문가이다. 금융시장과 환경·탄소 관련 상품의 연결 구조를 이해하고 있으며, 블루카본 탄소시장의 실무적 구조와 시장 활성화 방안을 산업계와 학계에 전달할 수 있는 전문가로 평가받고 있다.",
        image: "/images/speakers/손승태.jpg"
      },
      {
        role: "패널",
        name: "김태선 대표",
        affiliation: ["NAMU EnR"],
        bio: "김태선 대표는 블루카본과 탄소중립 시장 분야에서 금융·정책·산업을 연결하는 전문가로, NAMU EnR 대표이사로 재직하며 자발적 탄소시장과 탄소중립 전략을 중심으로 활동하고 있다. 금융공학과 파생상품 운용 경험을 바탕으로 정부·기관 자문과 국제 협력에도 참여하며 탄소시장 정책 발전에 기여하고 있다.",
        image: "/images/speakers/김태선.jpg"
      },
      {
        role: "패널",
        name: "김현성 과장",
        affiliation: ["해양수산부 해양생태과"],
        bio: "김현성 과장은 해양수산부 해양생태과에서 블루카본 정책과 해양 생태계 기반 기후변화 대응 전략을 총괄하고 있다. 염습지, 해초지, 갯벌 등 블루카본 자원의 과학적 관리와 탄소시장 연계 방안 마련에 주력하고 있으며, 정부·학계·국제기구 협력을 통해 해양 기반 탄소중립 실현 전략을 제시하고 있다.",
        image: "/images/speakers/김현성.jpg"
      }
    ]
  },

  "offshore-wind": {
    id: "offshore-wind",
    title: "해상풍력 특별법 시대 개막",
    subtitle: "해양경제포럼 · 기회와 도전, 미래전략",
    time: "6월 9일(화) | 15:30 ~ 17:00",
    themeColor: "emerald",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "이영호 교수",
        affiliation: ["국립한국해양대학교"],
        bio: "이영호 교수는 국립한국해양대학교에서 해양에너지 및 해상풍력 분야의 연구와 정책 자문을 수행해 온 전문가이다. 해양공간 활용, 해상풍력 제도 설계, 에너지 전환 전략 분야에서 축적된 연구 성과를 바탕으로 정부 및 관련 기관과의 협력 프로젝트를 이끌어 왔으며, 국내 해상풍력 산업 기반 마련에 기여하고 있다.",
        image: "/images/speakers/이영호.jpg"
      },
      {
        role: "발제",
        name: "최덕환 실장",
        affiliation: ["부산해양풍력산업협회"],
        bio: "최덕환 실장은 부산해양풍력산업협회에서 지역 중심의 해상풍력 산업 생태계 구축과 기업 지원 활동을 주도해 온 실무 전문가이다. 해상풍력 관련 정책 대응, 산업 네트워크 구축, 신규 사업 발굴 등 다양한 현장 경험을 바탕으로 국내 해상풍력 산업의 활성화와 지역 기반 산업 경쟁력 강화에 기여하고 있다.",
        image: "/images/speakers/최덕환.jpg"
      },
      {
        role: "패널",
        name: "김현도 대표",
        affiliation: ["지오뷰"],
        bio: "김현도 대표는 지오뷰를 이끌며 공간정보와 데이터 분석 기술을 활용한 해양 입지 평가 분야에서 전문성을 보유하고 있다. 해상풍력 개발에 필요한 입지 분석과 환경·사회적 영향 검토, 데이터 기반 의사결정 지원 시스템 구축을 중심으로 다양한 프로젝트를 수행하며 과학적이고 체계적인 개발 기반 마련에 힘쓰고 있다.",
        image: "/images/speakers/김현도.jpg"
      },
      {
        role: "패널",
        name: "강호근 교수",
        affiliation: ["국립한국해양대학교"],
        bio: "강호근 교수는 국립한국해양대학교 교수이자 해상풍력 그린수소암모니아연구센터장으로, 해상풍력을 활용한 친환경 에너지 생산 연구를 선도하고 있다. 해상풍력 기반 그린수소·암모니아 생산 기술, 친환경 선박 연료 전환, 부산항 및 북극항로 연계 산업 생태계 연구 등 다양한 분야에서 학술·산업 활동을 활발히 이어오고 있다.",
        image: "/images/speakers/강호근.jpg"
      },
      {
        role: "패널",
        name: "이강희 박사",
        affiliation: ["한국조선해양기자재연구원"],
        bio: "이강희 박사는 한국조선해양기자재연구원에서 부유식 해상풍력 기술 개발과 실증 연구를 중심으로 활동하고 있다. 해상풍력 기자재 및 시스템 기술 고도화, 국내외 산업 동향 분석, 지역 발전단지 조성 관련 연구를 수행하며 해상풍력 산업의 기술 경쟁력 강화와 산업 기반 확충에 기여하고 있다."
      }
    ]
  },

  // ──────────────────────────────────────
  // 6월 10일 (DAY 3)
  // ──────────────────────────────────────

  "ocean-awards": {
    id: "ocean-awards",
    title: "제2회 대한민국 해양지도자 대상 시상식",
    subtitle: "Day 3 주요 행사",
    time: "6월 10일(수) | 10:00 ~ 11:00",
    themeColor: "teal",
    type: "text",
    body: [
      "국립한국해양대학교와 국제신문은 국가발전에 헌신해 온 숨은 일꾼들을 발굴해 그들의 업적을 널리 알려 우리사회의 귀중한 본보기로 삼고자 “대한민국 해양지도자 대상”을 제정 합니다. 해양인 여러분들의 많은 관심과 참여 바랍니다."
    ],
    sections: [
      {
        title: "지·산·학·연 수상자 명단",
        isTable: true,
        content: [
          "지(地)|(선발 중)|대한민국 해양 발전에 기여한 지자체 및 공공기관 부문",
          "산(産)|(선발 중)|해양 산업 현장에서 혁신과 성장을 이끈 산업계 부문",
          "학(學)|(선발 중)|미래 해양 인재 양성과 학술 연구에 공헌한 학계 부문",
          "연(硏)|(선발 중)|해양 과학 기술 발전 및 정책 연구를 선도한 연구계 부문"
        ]
      },
      {
        title: "1. 시상부문 및 내용",
        content: ["지․산․학․연 각 부문 상패와 부상 3백만원"]
      },
      {
        title: "2. 수상자격",
        content: ["해당 부문에서 대한민국 해양 발전에 현저한 공적이 있는 개인이나 단체"]
      },
      {
        title: "3. 시상식",
        content: ["2025년 5월28일(수) 14:00 벡스코 컨벤션홀 205호"]
      },
      {
        title: "4. 수상자발표",
        content: ["2025년 5월16일(금) 개별통보(예정)"]
      },
      {
        title: "5. 후보자추천",
        content: ["본 상의 추천권자는 해당 부문 관련 각 단체장, 기관장, 대학의 총․학장 또는 개인(개인은 10명 이상 연대추천 / 단, 동일단체 소속은 2인 이내로 제한함)"]
      },
      {
        title: "6. 제출서류",
        content: [
          "․ 추천서(소정양식) 1부",
          "․ 추천사유서(소정양식) 1부",
          "․ 이력서(소정양식) 1부",
          "․ 공적서(소정양식) 1부",
          "․ 공적증빙 서류와 자료"
        ]
      },
      {
        title: "7. 제출서류 배부 및 접수",
        content: [
          "가. 제출서류 배부",
          "▸ 기간 : 2025. 4. 13(일) ~ 5.12(월)",
          "▸ 국제신문 홈페이지(www.kookje.co.kr)에서 다운로드",
          "나. 제출서류 접수",
          "▸ 기간 : 2025. 4.13(일)~5.12(월)",
          "▸ 방법 : ․ 이메일접수 kookjephoto@daum.net",
          "          ․ 우편접수 47505 부산광역시 연제구 중앙대로 1217 7층 국제신문 문화사업국",
          "            (우편접수는 접수 마감일 소인 분까지 유효함)"
        ]
      },
      {
        title: "8. 기 타",
        content: [
          "․ 제출된 서류(기본서류)는 일절 반환하지 않습니다.",
          "․ 기타 자세한 사항은 국제신문 문화사업국 051-500-5220 으로 문의 바랍니다."
        ]
      }
    ]
  },

  "summit": {
    id: "summit",
    title: "해양산업리더서밋",
    subtitle: "송상근 부산항만공사 사장 특강",
    time: "6월 10일(수) | 11:00 ~ 12:00",
    themeColor: "teal",
    type: "speakers",
    speakers: [
      {
        role: "강연",
        name: "송상근 사장",
        affiliation: ["부산항만공사"],
        bio: "송상근 사장은 해양수산부 차관을 역임한 해양 정책 및 행정 전문가로, 현재 부산항만공사(BPA) 사장으로 재직하며 세계 2위 환적항만인 부산항의 운영과 발전을 이끌고 있다. 해양수산부 부이사관, 대변인, 해양정책실장 등 주요 보직을 거치며 쌓은 풍부한 행정 경험과 글로벌 시각을 바탕으로, 부산항의 스마트·친환경 항만 구축과 글로벌 위상을 높이는 데 기여하고 있으며 지속 가능한 해양 생태계 조성을 위한 국가적 리더십을 발휘하고 있습니다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/song_sang_geun.jpg"
      }
    ]
  },

  "arctic-industry": {
    id: "arctic-industry",
    title: "북극항로 연관산업 발전방안",
    subtitle: "온라인 컨퍼런스 · 세션 ①",
    time: "6월 10일(수) | 14:00 ~ 15:30",
    themeColor: "blue",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "윤희성 교수",
        affiliation: ["국립한국해양대학교"],
        bio: "윤희성 교수는 영국 런던대학교에서 해양금융 석사, 한국해양대학교에서 경영학 박사학위를 취득했으며, 해운기업과 한국해양수산개발원을 거친 해양금융 전문가이다. 현재 한국해양대학교에서 연구와 인재양성에 힘쓰고 있으며, 인공지능 기반 해운시황 예측과 환경규제의 재무적 평가, 해양금융시장 확대를 연구하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/yun_hui_seong.jpg"
      },
      {
        role: "발제",
        name: "장하용 박사",
        affiliation: ["부산연구원"],
        bio: "장하용 박사는 부산연구원에서 해양물류와 항만경제 분야 정책 연구를 수행하는 연구자로, 북극항로의 상업적 활용 가능성과 부산항의 전략적 대응에 주목해 왔다. 글로벌 공급망 변화 속 항만 경쟁력 강화와 북극항로 연관산업 발전 방안, 물류 효율성과 비용 구조 변화 등을 지속적으로 연구하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/jang_ha_yong.png"
      },
      {
        role: "토론",
        name: "김세현 부산본부장",
        affiliation: ["한국해운협회"],
        bio: "김세현 부산본부장은 서울시립대학교에서 세무학 석사학위를 취득했으며, 한국해운협회에서 20년간 항만물류, 선원해사, 재무회계, 선화주 상생 업무를 담당해 온 해운정책 전문가이다. 현재 각종 항만·해운 관련 위원회와 자문기구에서 활동하며 해운산업 제도 개선과 정책 협력에 기여하고 있다.",
        image: "/images/speakers/김세.jpg"
      },
      {
        role: "토론",
        name: "이한성 본부장",
        affiliation: ["중소조선연구원"],
        bio: "이한성 본부장은 중소조선연구원에서 조선·해양 산업의 기술 개발과 정책 연구를 이끌어 온 전문가로, 중소형 조선소의 경쟁력 강화와 산업 생태계 발전에 기여해 왔다. 친환경 선박, 스마트 조선기술, 해양 모빌리티 등 미래 조선산업 분야와 함께 북극항로 연계 산업의 대응 전략에도 주목하고 있다."
      },
      {
        role: "토론",
        name: "이동해 센터장",
        affiliation: ["부산국제금융진흥원 해양금융센터"],
        bio: "이동해 센터장은 한국산업은행에서 30년간 국제금융 전문가로 활동하며 해양산업본부장, 해양금융종합센터장 등을 역임한 구조화금융 전문가이다. 현재 부산국제금융진흥원 해양금융센터장으로서 친환경 선대전환, 원화선박금융, 조선 공제조합 등 해양산업 지원을 위한 금융 모델 연구를 수행하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/lee_dong_hae.jpg"
      },
      {
        role: "토론",
        name: "부산항만공사",
        affiliation: ["부산항만공사"],
        bio: ""
      }
    ]
  },

  "arctic-education": {
    id: "arctic-education",
    title: "북극항로시대 극지교육의 방향성",
    subtitle: "온라인 컨퍼런스 · 세션 ②",
    time: "6월 10일(수) | 16:00 ~ 17:30",
    themeColor: "teal",
    type: "speakers",
    speakers: [
      {
        role: "좌장",
        name: "이동화 특임교수",
        affiliation: ["영산대학교"],
        bio: "이동화 특임교수는 영산대학교에서 재직하며 해양·물류 및 북극항로 관련 정책과 산업 전략 분야에서 오랜 연구와 실무 경험을 쌓아왔다. 다양한 산학협력 프로젝트와 정책 자문을 통해 북극항로 시대의 교육과 인재 양성 방향을 제시해 왔으며, 본 세션에서는 논의의 균형과 깊이를 이끄는 좌장 역할을 맡는다.",
        image: "/images/speakers/이동화.jpg"
      },
      {
        role: "발제",
        name: "박수현 국장",
        affiliation: ["국제신문"],
        bio: "박수현 국장은 국제신문에서 해양, 지역발전, 북극항로 등 주요 이슈를 심층적으로 취재해 온 언론인이다. 북극항로 시대의 도래와 이에 따른 교육 및 사회적 변화에 대한 폭넓은 시각을 바탕으로, 극지교육의 필요성과 방향성을 제시하며 공공적 관심과 사회적 확산의 중요성을 함께 전달하고 있다.",
        image: "/images/speakers/박수현122.jpg"
      },
      {
        role: "패널",
        name: "손용구 교수",
        affiliation: ["국립한국해양대학교 북극해연구센터"],
        bio: "손용구 교수는 국립한국해양대학교 북극해연구센터에서 북극해 환경, 해양과학 및 극지 연구를 수행하고 있다. 북극항로와 관련된 과학적·기술적 이해를 바탕으로 극지교육의 학문적 기반을 제시하고 있으며, 미래 세대가 갖추어야 할 연구 역량과 교육 방향에 대해서도 지속적으로 제안하고 있다.",
        image: "/images/speakers/손용구.jpg"
      },
      {
        role: "패널",
        name: "이정아 교장",
        affiliation: ["수영초등학교"],
        bio: "이정아 교장은 수영초등학교에서 학생 중심 교육과 미래 역량 기반 교육과정 운영을 이끌고 있다. 학교 현장의 풍부한 경험을 바탕으로 해양·환경 및 극지 관련 교육을 창의적으로 접목한 사례를 공유해 왔으며, 북극항로 시대에 필요한 기초교육 단계의 역할과 학교 현장의 실천 방향을 제시하고 있다."
      },
      {
        role: "패널",
        name: "전영근 교육전문가",
        affiliation: ["전 부산교육청 교육국장"],
        bio: "전영근 교육전문가는 부산광역시교육청 교육국장을 역임하며 지역 교육 정책과 교육과정 운영을 총괄해 왔다. 현장 중심의 교육 경험과 행정 전문성을 바탕으로 미래세대가 대비해야 할 극지교육의 방향성을 제시하고 있으며, 공교육 체계 안에서 이를 어떻게 실질적으로 적용할 것인지에 대한 정책적 제언을 이어가고 있다.",
        image: "/images/speakers/전영근.jpg"
      },
      {
        role: "패널",
        name: "김혜정 해설사",
        affiliation: ["극지해양미래포럼"],
        bio: "김혜정 해설사는 극지해양미래포럼에서 활동하며 극지와 해양의 중요성을 대중에게 알리는 교육·홍보 활동을 이어오고 있다. 쉽고 흥미로운 해설 경험을 바탕으로 시민과 학생을 대상으로 한 극지교육 콘텐츠 개발과 확산 전략에 대해 의견을 제시하며, 대중 친화적 교육의 가능성을 넓히는 데 기여하고 있다."
      }
    ]
  },

  "polar-lecture": {
    id: "polar-lecture",
    title: "극지시민강좌",
    subtitle: "Day 3 시민 참여 프로그램",
    time: "6월 10일(수) | 14:00 ~ 17:00",
    themeColor: "amber",
    type: "speakers",
    speakers: [
      {
        role: "강연",
        name: "이동화 대표",
        affiliation: ["(사)극지해양미래포럼"],
        bio: "이동화 대표는 북극·남극 해양과 북극항로 분야의 전문 지식을 바탕으로 연구와 정책 개발을 이끄는 전문가로, (사)극지해양미래포럼 대표를 맡고 있다. 극지 해양의 지속가능한 이용, 기후변화 영향 분석, 자원 관리와 국가 전략 수립을 주제로 정부·학계·산업계 협력을 활발히 이끌고 있다.",
        image: "/images/speakers/이동화.jpg"
      }
    ]
  }
};
