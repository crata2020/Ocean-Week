"use client";

import { useState, useTransition } from "react";

import { RegistrationForm } from "@/components/registration-form";
import type { RegistrationRecord } from "@/lib/registrations";

export function RegistrationStatusPanel() {
  const [lookupName, setLookupName] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [record, setRecord] = useState<RegistrationRecord | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleLookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const response = await fetch("/api/registrations/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: lookupName,
          phone: lookupPhone,
        }),
      });

      const payload = (await response.json()) as {
        message?: string;
        record?: RegistrationRecord;
      };

      if (!response.ok || !payload.record) {
        setRecord(null);
        setMessage(payload.message ?? "등록 정보를 찾지 못했습니다.");
        return;
      }

      setRecord(payload.record);
      setMessage("등록 정보를 찾았습니다. 아래에서 수정 후 저장해주세요.");
    });
  }

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleLookup}
        className="grid gap-5 rounded-2xl border border-slate-200 bg-white px-6 py-6 shadow-[0_25px_60px_-45px_rgba(15,110,134,0.4)] sm:grid-cols-[1fr_1fr_auto]"
      >
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">이름</span>
          <input
            required
            value={lookupName}
            onChange={(event) => setLookupName(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-[#0f6e86]"
            placeholder="등록한 이름"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">전화번호</span>
          <input
            required
            value={lookupPhone}
            onChange={(event) => setLookupPhone(event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 px-4 text-base outline-none transition focus:border-[#0f6e86]"
            placeholder="등록한 전화번호"
          />
        </label>

        <button
          type="submit"
          disabled={isPending}
          className="mt-auto inline-flex h-12 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
        >
          {isPending ? "조회 중..." : "등록 조회"}
        </button>
      </form>

      {message ? (
        <div
          className={`rounded-md px-4 py-4 text-sm ${
            record
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          {message}
        </div>
      ) : null}

      {record ? (
        <section className="space-y-6 rounded-[1.5rem] border border-slate-200 bg-white px-6 py-8 shadow-[0_25px_60px_-45px_rgba(15,110,134,0.4)]">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#0f6e86]">
              Registration Detail
            </p>
            <h2 className="text-2xl font-semibold text-slate-900">등록 정보 수정</h2>
            <p className="text-sm text-slate-500">
              마지막 수정: {new Date(record.updatedAt).toLocaleString("ko-KR")}
            </p>
          </div>

          <RegistrationForm
            mode="update"
            recordId={record.id}
            lookupName={lookupName}
            lookupPhone={lookupPhone}
            initialValues={{
              name: record.name,
              organization: record.organization,
              title: record.title,
              phone: record.phoneRaw,
              email: record.email,
              consent: true,
            }}
            onSaved={(nextRecord) => setRecord(nextRecord)}
          />
        </section>
      ) : null}
    </div>
  );
}
