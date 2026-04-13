import { RegistrationStatusPanel } from "@/components/registration-status-panel";

export default function RegistrationStatusPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <section className="mb-8 rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_30px_80px_-50px_rgba(15,110,134,0.35)]">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f6e86]">
          Registration Status
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-slate-900">
          사전등록현황
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600">
          이름과 전화번호를 입력하면 등록된 정보를 조회할 수 있습니다. 조회 후 바로 같은 화면에서 수정 저장까지 진행할 수 있습니다.
        </p>
      </section>

      <RegistrationStatusPanel />
    </div>
  );
}
