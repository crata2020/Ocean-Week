"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";

import type { RegistrationFormValues, RegistrationRecord } from "@/lib/registrations";
import { formatPhone } from "@/lib/registrations";

type RegistrationFormProps = {
  mode: "create" | "update";
  recordId?: string;
  lookupName?: string;
  lookupPhone?: string;
  initialValues?: Partial<RegistrationFormValues>;
  onSaved?: (record: RegistrationRecord) => void;
};

const emptyValues: RegistrationFormValues = {
  name: "",
  organization: "",
  title: "",
  phone: "",
  email: "",
  consent: false,
};

export function RegistrationForm({
  mode,
  recordId,
  lookupName,
  lookupPhone,
  initialValues,
  onSaved,
}: RegistrationFormProps) {
  const [values, setValues] = useState<RegistrationFormValues>({
    ...emptyValues,
    ...initialValues,
  });
  const [message, setMessage] = useState<string | null>(null);
  const [messageTone, setMessageTone] = useState<"success" | "error">("success");
  const [isPending, startTransition] = useTransition();

  const isUpdateMode = mode === "update";
  const submitLabel = isUpdateMode ? "등록 정보 수정하기" : "사전등록 접수하기";

  const actionHint = useMemo(() => {
    if (messageTone !== "error") {
      return null;
    }

    if (!message?.includes("이미 등록된 전화번호")) {
      return null;
    }

    return (
      <Link
        href="/registration-status"
        className="text-sm font-semibold text-[#0f6e86] underline underline-offset-4"
      >
        사전등록현황에서 기존 정보를 수정하기
      </Link>
    );
  }, [message, messageTone]);

  function setField<K extends keyof RegistrationFormValues>(
    key: K,
    nextValue: RegistrationFormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: nextValue,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    startTransition(async () => {
      const response = await fetch(
        isUpdateMode ? `/api/registrations/${recordId}` : "/api/registrations",
        {
          method: isUpdateMode ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(
            isUpdateMode
              ? {
                  lookupName,
                  lookupPhone,
                  registration: values,
                }
              : {
                  registration: values,
                },
          ),
        },
      );

      const payload = (await response.json()) as {
        message?: string;
        record?: RegistrationRecord;
      };

      if (!response.ok) {
        setMessageTone("error");
        setMessage(payload.message ?? "요청을 처리하지 못했습니다.");
        return;
      }

      setMessageTone("success");
      setMessage(
        isUpdateMode
          ? "등록 정보가 정상적으로 수정되었습니다."
          : "사전등록이 정상적으로 접수되었습니다.",
      );

      if (!isUpdateMode) {
        setValues(emptyValues);
      }

      if (payload.record && onSaved) {
        onSaved(payload.record);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">이름</span>
          <input
            required
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-[#0f6e86]"
            placeholder="홍길동"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">기관</span>
          <input
            required
            value={values.organization}
            onChange={(event) => setField("organization", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-[#0f6e86]"
            placeholder="기관명을 입력해주세요"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">직책</span>
          <input
            required
            value={values.title}
            onChange={(event) => setField("title", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-[#0f6e86]"
            placeholder="직책을 입력해주세요"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-slate-700">전화번호</span>
          <input
            required
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-[#0f6e86]"
            placeholder="010-1234-5678"
          />
          {values.phone ? (
            <p className="text-xs text-slate-500">정규화 기준: {formatPhone(values.phone)}</p>
          ) : null}
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-semibold text-slate-700">이메일</span>
          <input
            required
            type="email"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            className="h-12 w-full rounded-md border border-slate-300 bg-white px-4 text-base text-slate-900 outline-none transition focus:border-[#0f6e86]"
            placeholder="name@example.com"
          />
        </label>
      </div>

      <label className="flex items-start gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
        <input
          type="checkbox"
          checked={values.consent}
          onChange={(event) => setField("consent", event.target.checked)}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0f6e86] focus:ring-[#0f6e86]"
        />
        <span>
          행사 운영과 사전등록 확인을 위해 이름, 기관, 직책, 전화번호, 이메일 정보를 수집하는 데 동의합니다.
          최종 문구는 운영안 확정 후 교체할 수 있습니다.
        </span>
      </label>

      {message ? (
        <div
          className={`space-y-2 rounded-md px-4 py-4 text-sm ${
            messageTone === "success"
              ? "border border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border border-rose-200 bg-rose-50 text-rose-800"
          }`}
        >
          <p>{message}</p>
          {actionHint}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-12 items-center justify-center rounded-md bg-[#0f6e86] px-6 text-sm font-semibold text-white transition hover:bg-[#0b5567] disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {isPending ? "처리 중..." : submitLabel}
      </button>
    </form>
  );
}
