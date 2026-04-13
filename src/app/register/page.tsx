import { RegistrationForm } from "@/components/registration-form";
import { scheduleOverview } from "@/lib/site-content";

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-[var(--panel-strong)] px-6 py-8">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f6e86]">
              Pre-registration
            </p>
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-slate-900">
              사전등록
            </h1>
            <p className="text-base leading-8 text-slate-600">
              현재는 임시 일정 요약을 함께 노출해 두었습니다. 실제 일정 자료를 받으면 이 영역의 내용만 교체하면 됩니다.
            </p>
          </div>

          <div className="space-y-4">
            {scheduleOverview.map((item) => (
              <div
                key={item.day}
                className="rounded-xl border border-white/70 bg-white/70 px-5 py-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#0f6e86]">
                    {item.day}
                  </p>
                  <span className="text-sm font-medium text-slate-600">{item.date}</span>
                </div>
                <p className="mt-3 font-semibold text-slate-900">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  {item.items.join(" / ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <section className="rounded-[2rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_30px_80px_-50px_rgba(15,110,134,0.35)]">
          <div className="mb-8 space-y-3">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#0f6e86]">
              Registration Form
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-slate-900">
              참가자 정보 입력
            </h2>
            <p className="text-sm leading-7 text-slate-600">
              전화번호는 1건만 등록됩니다. 이미 접수된 번호라면 사전등록현황 페이지에서 조회 후 수정해주세요.
            </p>
          </div>

          <RegistrationForm mode="create" />
        </section>
      </section>
    </div>
  );
}
