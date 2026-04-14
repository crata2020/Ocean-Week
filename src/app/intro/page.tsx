import { Badge } from "@/components/ui/badge";

export default function IntroPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans bg-slate-50 dark:bg-slate-950 pb-24">
      {/* Header */}
      <section className="relative w-full bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24 md:py-32 text-center">
          <Badge
            variant="outline"
            className="mb-8 rounded-full border-sky-300 dark:border-sky-700 bg-sky-100/50 dark:bg-sky-900/30 px-4 py-1.5 text-sm font-semibold text-sky-700 dark:text-sky-300"
          >
            Ocean Week Overview
          </Badge>
          <h1 className="font-heading text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl md:text-6xl">
            해양주간 행사개요
          </h1>
        </div>
      </section>

      {/* Content Body */}
      <section className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
        <article className="prose prose-lg sm:prose-xl dark:prose-invert max-w-none space-y-16">
          
          {/* Section 1 */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 dark:text-sky-300 pb-2 border-b-2 border-sky-100 dark:border-sky-900/50 inline-block">
              해양인의 열정과 힘을 모아 갑니다.
            </h2>
            <p className="leading-loose text-slate-700 dark:text-slate-300">
              2019년 <strong>‘해양컨퍼런스’</strong>로 출발한 본 행사는 2023년부터 <strong>‘해양주간-OCEAN WEEK’</strong>로 확대되어, 해양 분야를 아우르는 종합적인 교류의 장으로 발전해왔습니다. 정부부처, 부산광역시, 해양수산 관련 공기업, 연구기관, 협회 및 기업 등 다양한 주체가 한자리에 모여 정보 교류와 비즈니스 네트워킹을 진행하고, 이를 통해 해양산업의 미래를 함께 논의하며, 해양산업의 경쟁력 강화와 대한민국 발전에 기여하는 것을 목적으로 하고 있습니다.
            </p>
            <p className="leading-loose text-slate-700 dark:text-slate-300">
              대한민국이 세계적 해양산업 선도국으로 자리매김하기 위해 마련한 <strong>‘해양주간-OCEAN WEEK’</strong>을 통해 해양인들의 열정과 힘을 모아갈 수 있기를 응원합니다.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 dark:text-sky-300 pb-2 border-b-2 border-sky-100 dark:border-sky-900/50 inline-block">
              우리에게 던져진 과제는 많습니다.
            </h2>
            <p className="leading-loose text-slate-700 dark:text-slate-300">
              북극항로시대를 맞은 비연안국의 항행에 대한 권리, 북극항로 연관산업 발전방안, K-조선기자재산업의 방향성 모색, 블루카본의 탄소마켓 시장, 항만산업의 세계화 전략, 해운산업 발전을 위한 선박금융의 역할, 미래세대를 위한 해양교육, 해양수산업에서 빅데이터의 가치, 글로벌 물류대란 대응방안, 크루즈관광산업 현황과 미래, 해양바이오산업의 신 성장 동력 등이 그것입니다.
            </p>
            <p className="leading-loose text-slate-700 dark:text-slate-300 font-semibold bg-sky-50 dark:bg-sky-900/20 p-6 rounded-2xl border border-sky-100 dark:border-sky-800/50">
              해양주간 사무국은 각 분야의 전문가들과 함께 참여형 토론의 장을 만들어 가겠습니다. 열띤 토론 끝에 모아진 의견들은 정책제안으로 이어질 것입니다.
            </p>
          </div>

          {/* Section 3: Schedule Breakdown */}
          <div className="space-y-10 pt-8 mt-16 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 mb-12">
              2026 해양주간은 다음과 같이 구성되어 있습니다.
            </h2>
            
            {/* Day 1 */}
            <div className="relative pl-6 sm:pl-8 border-l-4 border-slate-200 dark:border-slate-800">
              <div className="absolute -left-[13px] top-1 h-5 w-5 rounded-full bg-sky-400 border-4 border-slate-50 dark:border-slate-950" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">6월 8일</h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-loose">
                <p>
                  <span className="font-bold text-sky-700 dark:text-sky-400">&lt;개회식&gt;</span>을 시작으로 <span className="font-bold text-sky-700 dark:text-sky-400">&lt;기관장 토크콘서트&gt;</span>, <span className="font-bold text-sky-700 dark:text-sky-400">&lt;해양경제 콘퍼런스&gt;</span>가 이어집니다.
                </p>
                <p>
                  <span className="font-bold text-sky-700 dark:text-sky-400">&lt;기관장 토크콘서트&gt;</span>는 해양수산부장관, 부산광역시장을 비롯하여 참여 기관장들이 무대에 등단해 <strong>‘해양수산부 이전과 해양수도 부산’</strong>을 주제로 서로의 의견을 자유롭게 나누게 됩니다.
                </p>
                <p>
                  <span className="font-bold text-sky-700 dark:text-sky-400">&lt;해양경제 콘퍼런스&gt;</span>에서는 <strong>‘북극항로’</strong> 이슈를 놓고 한국, 중국, 일본, 러시아 전문가들이 발표 및 토론을 이어갑니다. 지난 한 해 동안 북극항로 이슈를 두고 각계에서 논의가 진행되었지만, 북극항로 연안국인 러시아와 북극항로 운항 경험을 축적해가고 있는 중국, 그리고 방향성을 모색하는 한국, 일본 전문가들이 한자리에 모여 토론을 개최한 전례가 없기에, 한국, 중국, 일본, 러시아 전문가들이 토론을 벌이는 것은 최고의 이슈가 되리라 기대합니다.
                </p>
              </div>
            </div>

            {/* Day 2 */}
            <div className="relative pl-6 sm:pl-8 border-l-4 border-slate-200 dark:border-slate-800">
              <div className="absolute -left-[13px] top-1 h-5 w-5 rounded-full bg-teal-400 border-4 border-slate-50 dark:border-slate-950" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">6월 9일</h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-loose">
                <p>
                  <span className="font-bold text-teal-700 dark:text-teal-400">&lt;해양경제 컨퍼런스&gt;</span>에서는 세계적인 이슈로 등장한 <strong>‘블루카본의 잠재력과 탄소시장화 전략’</strong>에 대해 심도 깊은 이야기를 나눌 수 있는 자리를 마련합니다. 2025년 12월 23일 LG전자와 부산광역시는 블루카본 생태계 조성을 위한 업무협정을 체결한 바 있습니다. 각계 전문가와 함께 블루카본을 통한 탄소시장 진출의 방향성을 찾고자 하는 것이 이번 세션의 목적입니다.
                </p>
                <p>
                  <span className="font-bold text-teal-700 dark:text-teal-400">&lt;극지시민강좌&gt;</span><br />
                  9일 오후에는 북극항로 전문가를 초빙 시민들에게 북극항로가 부산 경제에 어떤 긍정적 영향을 주는지에 대해 이야기를 전달하는 ‘극지시민강좌’를 마련하고자 합니다.
                </p>
              </div>
            </div>

            {/* Day 3 */}
            <div className="relative pl-6 sm:pl-8 border-l-4 border-slate-200 dark:border-slate-800">
              <div className="absolute -left-[13px] top-1 h-5 w-5 rounded-full bg-blue-400 border-4 border-slate-50 dark:border-slate-950" />
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">6월 10일</h3>
              <div className="space-y-4 text-slate-700 dark:text-slate-300 leading-loose">
                <p>
                  <span className="font-bold text-blue-700 dark:text-blue-400">&lt;해양산업리더서밋&gt;</span><br />
                  해양산업관련 산·학·연 리더를 초빙하여 ‘해양산업리더서밋’을 개최합니다. 올해도 100여명의 리더들을 초빙해 네트워크를 강화할 뿐 아니라, 전문가 초청 강연을 진행합니다.<br />
                  강연에 앞서 &lt;2025년 해양주간&gt;에 제정한 <strong>‘대한민국해양지도자 대상’</strong> 시상식을 개최합니다. ‘대한민국해양지도자 대상’은 해양관련 우수한 업적을 남긴 분을 대상으로 ‘지·산·학·연’ 부문에서 각 한 명씩을 선정하여 상을 수여합니다.
                </p>
                <p>
                  <span className="font-bold text-blue-700 dark:text-blue-400">&lt;온라인 해양컨퍼런스&gt;</span><br />
                  올해로 8회째를 맞는 ‘온라인 해양콘퍼런스’는 “해양풍력 특별법 시대 개막 : 기회와 도전, 그리고 미래전략”, “북극항로 연관산업 발전방안”을 주제로 세션을 마련합니다.
                </p>
                <p>
                  <span className="font-bold text-blue-700 dark:text-blue-400">&lt;청소년 프레젠테이션대회&gt;</span><br />
                  “부산항개항 150주년-청소년이 그리는 2030 해양수도 부산의 미래”를 주제로 부산권역 청소년들을 대상으로 프레젠테이션 대회를 개최하며 시상을 합니다.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Conclusion */}
          <div className="pt-16 mt-16 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-base sm:text-lg font-bold text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex flex-col items-center">
              <span className="whitespace-nowrap">해양주간 사무국은 콘퍼런스를 준비하면서 시민들의 해양에 대한 관심과 열정을 다시금 확인하게 되었습니다.</span>
              <span className="whitespace-nowrap mt-2">대한민국의 미래는 해양에 있다는 믿음과 확신으로 해양인의 역량을 결집해 나가겠습니다.</span>
            </p>
            <p className="font-heading text-xl font-bold text-slate-800 dark:text-slate-200">
              - 2026년 해양주간 사무국
            </p>
          </div>
          
        </article>
      </section>
    </div>
  );
}
