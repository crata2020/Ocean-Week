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
        bio: "최수범 교수는 해양·물류 및 북극항로 분야의 전문가로, 한국북극항로협회 사무총장과 국민대학교 특임교수로 활동하고 있다. 북극항로의 전략적 중요성과 상업적 활용 가능성, 국제 협력과 정책 연구를 중심으로 정부·학계·산업계를 잇는 가교 역할을 수행하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/choi_soo_beom.jpg"
      },
      {
        role: "발표 · 중국",
        name: "郭培淸(궈페이칭) 교수",
        affiliation: ["중국해양대학교", "국제사무 및 공공관리학원"],
        bio: "궈페이칭 교수는 중국해양대학교 국제문제 및 공공행정학부 교수로, 중국 교육부 산하 극지센터 집행이사이자 Polar and Ocean Portal 설립자이다. 북극항로의 법적 지위와 국제정치, 북동·북서항로의 질서 형성과 협력 구조를 국제해양법과 해양정치의 관점에서 연구해 왔다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/gwak_bae_cheong.jpg"
      },
      {
        role: "발표 · 일본",
        name: "후지오 오니시 박사",
        affiliation: ["홋카이도대학교 북극연구센터", "그룹리더"],
        bio: "Fujio Ohnishi 박사는 홋카이도대학교 북극연구센터 그룹리더로, 북극 해양과 항로 개발, 운항 안전성, 환경 영향 등을 연구하고 있다. 기후변화에 따른 해빙 감소와 북극항로의 계절적 개방이 국제 해운과 물류에 미치는 영향, 경제성 및 리스크 관리 방안을 과학적·정책적으로 분석해 왔다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/fujio_ohnishi.jpg"
      },
      {
        role: "발표 · 러시아",
        name: "스미르노프 세르게이 마라토비치 교수",
        affiliation: ["블라디보스톡 극동연방대학"],
        bio: "세르게이 M. 스미르노프 교수는 러시아의 해양·안보 분야 전문가로, 해상운송과 물류, 북극항로의 경제적 개발, 지역 및 해양안보를 폭넓게 연구해 왔다. 러시아 해군 대령(예비역) 경력과 국제 공동연구 경험을 바탕으로 동북아 해양 협력과 국제 물류 경로 설계 분야에서도 활발히 활동하고 있다.",
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
        bio: "신형철 소장은 대한민국의 극지과학 및 해양정책 분야 전문가로, 현재 극지연구소 소장으로 재직하며 북극·남극 연구와 극지 거버넌스, 국제협력을 총괄하고 있다. 특히 북극항로와 기후변화, 국제 해양질서 재편을 연계한 과학·정책 융합 연구와 과학외교 기반의 극지 협력 모델 구축에 힘쓰고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/shin_hyung_chul.jpg"
      },
      {
        role: "토론",
        name: "최수범 교수",
        affiliation: ["국민대학교 특임교수"],
        bio: "최수범 교수는 해양·물류 및 북극항로 분야의 전문가로, 한국북극항로협회 사무총장과 국민대학교 특임교수로 활동하고 있다. 북극항로의 전략적 중요성과 상업적 활용 가능성, 국제 협력과 정책 연구를 중심으로 정부·학계·산업계를 잇는 가교 역할을 수행하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/choi_soo_beom.jpg"
      },
      {
        role: "토론",
        name: "郭培淸(궈페이칭) 교수",
        affiliation: ["중국해양대학교"],
        bio: "중국해양대학교 교수이자 교육부 극지센터 집행이사로 북극항로의 법적·정치적 체계를 연구하는 세계적 전문가입니다. 중-러 북극 워크숍과 국제 싱크탱크 ‘Polar and Ocean Portal’을 설립했으며 사하공화국 지속가능발전 위원 및 Northern Forum 친선대사로 활동했습니다. 『북극 항로의 국제문제 연구』 등 다수의 저서를 집필했으며 국제해양법 관점의 북극 질서 형성과 협력 구조 분석에 탁월한 성과를 보유하고 있습니다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/gwak_bae_cheong.jpg"
      },
      {
        role: "토론",
        name: "후지오 오니시 박사",
        affiliation: ["홋카이도대학교 북극연구센터"],
        bio: "홋카이도대학교 북극연구센터 그룹리더로 북극해 항로의 활용 가능성과 항행 안전, 환경 영향을 연구하는 핵심 연구자입니다. 기후 변화에 따른 해빙 감소가 글로벌 물류 체계에 미치는 영향을 분석하고 경제성 및 운항 리스크 관리를 위한 과학적·정책적 대안을 제시해 왔습니다. 동북아와 유럽을 잇는 전략적 해상 루트로서의 북극항로 가능성을 탐구하며 지속 가능한 이용과 환경 보전의 균형을 중시하는 연구로 주목받고 있습니다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/fujio_ohnishi.jpg"
      },
      {
        role: "토론",
        name: "스미르노프 세르게이 마라토비치 교수",
        affiliation: ["블라디보스톡 극동연방대학"],
        bio: "블라디보스톡 극동연방대학교 선임 연구원이자 예비역 러시아 해군 대령으로 해상 운송 및 북극 물류, 해양 안보 분야의 베테랑 전문가입니다. 조선공학 박사 학위와 NATO 국방대학 연수 경력을 바탕으로 한-러 공동연구센터 러시아 측 소장 등 주요 보직을 역임했습니다. 50편 이상의 학술 논문과 단행본을 통해 대두만강 물류 경로 설계 및 아태 지역 안보 전략을 연구하며 국제 학술 협력과 물류 네트워크 발전에 중추적인 역할을 담당하고 있습니다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/sergei_smirnov.jpg",
        imagePosition: "60% 20%"
      },
      {
        role: "토론",
        name: "남형식 교수",
        affiliation: ["국립한국해양대학교"],
        bio: "",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/nam_hyung_sik.jpg"
      },
      {
        role: "토론",
        name: "정영두 센터장",
        affiliation: ["한국해양진흥공사 북극항로 종합지원센터"],
        bio: "정영두 센터장은 팬오션과 켄코선박운용, 한국해양진흥공사에서 해운시장 조사와 산업 정보, ESG 및 공급망 대응 업무를 두루 수행해 온 해운·물류 전문가이다. 현재 북극항로 종합지원센터장을 맡아 북극항로와 연계한 해상 공급망 안정화와 경제안보 강화에 기여하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/jung_young_doo.jpg"
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
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/kim_young.jpg"
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
        bio: "산딥 로이 차우두리 대표는 남아시아와 동남아시아 지역에서 기후변화 대응과 지역사회 기반 지속가능성 사업을 이끄는 사회적기업가이다. 11개국 이상에서 농촌 가구, NGO, 실행 파트너와 협력해 자연 생태계 복원과 기후 스마트 농업을 추진해 왔으며, 기후금융과 기후 솔루션 투자 분야에서도 활동하고 있다."
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
        bio: "최가영 박사는 국가녹색기술연구소에서 블루카본과 자연기반해법(NbS) 연구를 수행하는 환경·에너지 분야 전문가이다. 염습지, 잘피, 맹그로브 등 해양 생태계의 탄소 저장 기능을 분석하며 탄소중립 달성을 위한 과학적 근거 마련해 왔고, 국제 기후 협력과 정책 확산 전략 수립에도 참여하고 있다."
      },
      {
        role: "발제",
        name: "정여진 박사",
        affiliation: ["한국해양수산개발원(KMI)"],
        bio: "정여진 박사는 한국해양수산개발원에서 블루카본과 해양 탄소시장 분야를 연구하는 전문가로, 연안·해양 생태계의 탄소 흡수와 저장, 가치 평가와 시장화를 중심으로 연구를 수행하고 있다. 특히 자발적 탄소시장과 연계한 정책 개발과 프로젝트 지원을 통해 블루카본의 경제적·환경적 가치를 확산하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/jung_yeo_jin.png"
      },
      {
        role: "토론",
        name: "김남진 책임연구원",
        affiliation: ["LG전자"],
        bio: "김남진 책임연구원은 부산대학교에서 재료공학을 전공하고, 현재 LG전자 H&A 기능성소재사업실에서 기능성 유리 분말의 개발과 상용화를 담당하고 있다. 2011년 입사 이후 가전에 적용 가능한 다양한 기능성 유리 조성과 원천 소재기술 지식재산권 확보에 힘써 왔으며, 최근에는 위생과 환경 친화적 소재 연구에 주력하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/kim_nam_jin.jpg"
      },
      {
        role: "토론",
        name: "손승태 부장",
        affiliation: ["한국거래소 파생상품시장본부"],
        bio: "손승태 부장은 한국거래소에서 ESG 지수 개발과 일반상품시장 운영을 수행해 온 금융시장 전문가로, 환경·탄소 관련 상품과 제도에 대한 실무 이해를 갖추고 있다. 지수개발팀장과 일반상품시장부장 등을 거치며 쌓은 경험을 바탕으로 블루카본과 탄소시장 활성화 방안을 금융시장 관점에서 제시하고 있다."
      },
      {
        role: "토론",
        name: "김태선 대표",
        affiliation: ["(주)나무이엔알 (NAMU EnR)"],
        bio: "김태선 대표는 주식회사 나무이엔알 대표이사로, 블루카본과 자발적 탄소시장, 탄소중립 전략 분야에서 금융·정책·산업을 연결하는 전문가이다. 삼성자산운용과 유진투자선물, 현대선물 등에서 금융공학과 상품운용 경험을 쌓았으며, 현재 정부·기관의 탄소시장 관련 자문과 국제 협력에도 활발히 참여하고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/kim_tae_seon.jpg"
      },
      {
        role: "토론",
        name: "김현성 과장",
        affiliation: ["해양수산부"],
        bio: ""
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
        bio: ""
      },
      {
        role: "토론",
        name: "최우진 대표",
        affiliation: ["코리오제네레이션"],
        bio: ""
      },
      {
        role: "토론",
        name: "김현도 대표",
        affiliation: ["지오뷰"],
        bio: ""
      },
      {
        role: "토론",
        name: "최덕환 실장",
        affiliation: ["한국풍력산업협회"],
        bio: ""
      },
      {
        role: "토론",
        name: "김현성 과장",
        affiliation: ["해양수산부"],
        bio: ""
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
        bio: "김세현 부산본부장은 서울시립대학교에서 세무학 석사학위를 취득했으며, 한국해운협회에서 20년간 항만물류, 선원해사, 재무회계, 선화주 상생 업무를 담당해 온 해운정책 전문가이다. 현재 각종 항만·해운 관련 위원회와 자문기구에서 활동하며 해운산업 제도 개선과 정책 협력에 기여하고 있다."
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
        name: "이동화 대표",
        affiliation: ["(사)극지해양미래포럼"],
        bio: "이동화 대표는 북극·남극 해양과 북극항로 분야의 전문 지식을 바탕으로 연구와 정책 개발을 이끄는 전문가로, (사)극지해양미래포럼 대표를 맡고 있다. 극지 해양의 지속가능한 이용, 기후변화 영향 분석, 자원 관리와 국가 전략 수립을 주제로 정부·학계·산업계 협력을 활발히 이끌고 있다.",
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/lee_dong_hwa.jpg",
        imagePosition: "center 0%"
      },
      {
        role: "발제",
        name: "박수현 국장",
        affiliation: ["국제신문"],
        bio: ""
      },
      {
        role: "토론",
        name: "부산광역시교육청 장학사",
        affiliation: ["부산광역시교육청"],
        bio: ""
      },
      {
        role: "토론",
        name: "손용구 교수",
        affiliation: ["국립한국해양대학교 북극해연구센터"],
        bio: ""
      },
      {
        role: "토론",
        name: "이정아 교장",
        affiliation: ["수영초등학교"],
        bio: ""
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
        image: "https://pjxuvjcwlhcevwrecvof.supabase.co/storage/v1/object/public/panels/lee_dong_hwa.jpg",
        imagePosition: "center 0%"
      }
    ]
  }
};
