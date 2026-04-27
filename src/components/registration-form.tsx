"use client";

import { useMemo, useState, useTransition } from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registrationSessionDays } from "@/lib/site-content";
import { cn } from "@/lib/utils";
import type { RegistrationFormValues, RegistrationRecord } from "@/lib/registrations";
import { formatPhone, registrationFieldsSchema } from "@/lib/registrations";

type RegistrationFormProps = {
  mode: "create" | "update";
  recordId?: string;
  lookupName?: string;
  lookupPhone?: string;
  initialValues?: Partial<RegistrationFormValues>;
  sessionCounts?: Record<string, number>;
  onSaved?: (record: RegistrationRecord) => void;
};

const emptyValues: RegistrationFormValues = {
  name: "",
  organization: "",
  title: "",
  phone: "",
  email: "",
  selectedSessions: [],
  consent: false,
};

type FieldErrors = Partial<Record<keyof RegistrationFormValues, string[]>>;

export function RegistrationForm({
  mode,
  recordId,
  lookupName,
  lookupPhone,
  initialValues,
  sessionCounts,
  onSaved,
}: RegistrationFormProps) {
  const [values, setValues] = useState<RegistrationFormValues>({
    ...emptyValues,
    ...initialValues,
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
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
        className={buttonVariants({
          variant: "link",
          size: "sm",
          className: "h-auto px-0 text-sm font-semibold",
        })}
      >
        사전등록현황에서 기존 정보를 수정하기
      </Link>
    );
  }, [message, messageTone]);

  function setField<K extends keyof RegistrationFormValues>(
    key: K,
    nextValue: RegistrationFormValues[K],
  ) {
    setMessage(null);
    setFieldErrors((current) => ({
      ...current,
      [key]: undefined,
    }));
    setValues((current) => ({
      ...current,
      [key]: nextValue,
    }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const parsed = registrationFieldsSchema.safeParse(values);

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors as FieldErrors);
      setMessageTone("error");
      setMessage("입력한 내용을 확인해주세요.");
      return;
    }

    setFieldErrors({});

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
                  registration: parsed.data,
                }
              : {
                  registration: parsed.data,
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
        setFieldErrors({});
      }

      if (payload.record && onSaved) {
        onSaved(payload.record);
      }
    });
  }

  function toggleSession(sessionId: string, checked: boolean) {
    setField(
      "selectedSessions",
      checked
        ? Array.from(new Set([...values.selectedSessions, sessionId]))
        : values.selectedSessions.filter((currentId) => currentId !== sessionId),
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-12 w-full max-w-2xl mx-auto">
      {/* Group 1: Basic Information */}
      <FieldGroup className="grid gap-8">
        <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">1. 참가자 정보</h2>
          <p className="text-sm text-slate-500 mt-1">행사 당일 본인 확인 용도로 쓰이므로 정확히 입력해 주세요.</p>
        </div>

        <Field data-invalid={Boolean(fieldErrors.name?.length)}>
          <FieldLabel htmlFor="name" className="text-base font-semibold">이름</FieldLabel>
          <Input
            id="name"
            required
            value={values.name}
            onChange={(event) => setField("name", event.target.value)}
            placeholder="예) 홍길동"
            className="h-14 text-lg bg-slate-50/50 focus:bg-white"
            aria-invalid={Boolean(fieldErrors.name?.length)}
          />
          {fieldErrors.name?.[0] ? <FieldError>{fieldErrors.name[0]}</FieldError> : null}
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <Field data-invalid={Boolean(fieldErrors.organization?.length)}>
            <FieldLabel htmlFor="organization" className="text-base font-semibold">소속 기관 (회사명)</FieldLabel>
            <Input
              id="organization"
              required
              value={values.organization}
              onChange={(event) => setField("organization", event.target.value)}
              placeholder="예) 해양수산부"
              className="h-14 text-lg bg-slate-50/50 focus:bg-white"
              aria-invalid={Boolean(fieldErrors.organization?.length)}
            />
            {fieldErrors.organization?.[0] ? (
              <FieldError>{fieldErrors.organization[0]}</FieldError>
            ) : null}
          </Field>

          <Field data-invalid={Boolean(fieldErrors.title?.length)}>
            <FieldLabel htmlFor="title" className="text-base font-semibold">직책</FieldLabel>
            <Input
              id="title"
              required
              value={values.title}
              onChange={(event) => setField("title", event.target.value)}
              placeholder="예) 실장"
              className="h-14 text-lg bg-slate-50/50 focus:bg-white"
              aria-invalid={Boolean(fieldErrors.title?.length)}
            />
            {fieldErrors.title?.[0] ? <FieldError>{fieldErrors.title[0]}</FieldError> : null}
          </Field>
        </div>

        <Field data-invalid={Boolean(fieldErrors.phone?.length)}>
          <FieldLabel htmlFor="phone" className="text-base font-semibold">휴대전화번호</FieldLabel>
          <Input
            id="phone"
            required
            value={values.phone}
            onChange={(event) => setField("phone", event.target.value)}
            placeholder="예) 01012345678 (숫자만 입력)"
            className="h-14 text-lg bg-slate-50/50 focus:bg-white"
            aria-invalid={Boolean(fieldErrors.phone?.length)}
          />
          <FieldDescription className="text-sm">
            {values.phone
              ? `입력 확인: ${formatPhone(values.phone)}`
              : "010-1234-5678 형식으로 휴대전화번호만 입력 가능합니다."}
          </FieldDescription>
          {fieldErrors.phone?.[0] ? <FieldError>{fieldErrors.phone[0]}</FieldError> : null}
        </Field>

        <Field data-invalid={Boolean(fieldErrors.email?.length)}>
          <FieldLabel htmlFor="email" className="text-base font-semibold">이메일 (선택)</FieldLabel>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="name@example.com"
            className="h-14 text-lg bg-slate-50/50 focus:bg-white"
            aria-invalid={Boolean(fieldErrors.email?.length)}
          />
          {fieldErrors.email?.[0] ? <FieldError>{fieldErrors.email[0]}</FieldError> : null}
        </Field>
      </FieldGroup>

      {/* Group 2: Schedule Selection */}
      <FieldSet className="grid gap-6">
        <div className="pb-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-end">
          <div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">2. 참석 일정 세션 선택</h2>
            <p className="text-sm text-slate-500 mt-1">원하시는 일정을 모두 체크해 주세요. 다중 선택이 가능합니다.</p>
          </div>
          <Badge variant="secondary" className="px-3 text-sm bg-sky-100 text-sky-800">
            총 {values.selectedSessions.length}개 선택됨
          </Badge>
        </div>

        <div className="grid gap-8">
          {registrationSessionDays.map((day) => (
            <div key={day.day} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Badge className="bg-slate-800 hover:bg-slate-800 text-white shadow-none text-base px-3 py-1">{day.day}</Badge>
                <span className="font-bold text-lg text-slate-700 dark:text-slate-200">{day.date}</span>
              </div>

              <div className="grid gap-1.5">
                {day.sessions.map((session) => {
                  const checked = values.selectedSessions.includes(session.id);
                  const currentCount = sessionCounts?.[session.id] || 0;
                  const remaining = Math.max(0, session.capacity - currentCount);
                  const isFull = remaining <= 0;

                  return (
                    <label
                      key={session.id}
                      htmlFor={`session-${session.id}`}
                      className={cn(
                        "relative flex items-center justify-between p-2.5 sm:p-3 rounded-lg border cursor-pointer transition-all hover:border-sky-500",
                        checked
                          ? "border-sky-500 bg-sky-50 shadow-sm dark:bg-sky-900/20"
                          : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`session-${session.id}`}
                          checked={checked}
                          onCheckedChange={(next) => toggleSession(session.id, next === true)}
                          aria-invalid={Boolean(fieldErrors.selectedSessions?.length)}
                          className="h-5 w-5 mt-0.5 border-slate-300 data-[state=checked]:bg-sky-600 data-[state=checked]:border-sky-600"
                        />
                        <div className="flex flex-col gap-0.5 mt-0.5">
                          <span className={cn("text-[14px] sm:text-[15px] font-bold leading-tight", checked ? "text-sky-900 dark:text-sky-100" : "text-slate-800 dark:text-slate-200")}>
                            {session.title}
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold text-sky-600 dark:text-sky-400">
                            {session.time}
                          </span>
                          <span className="text-[12px] leading-tight font-medium text-slate-500 dark:text-slate-400 pr-2">
                            {session.description}
                          </span>
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {fieldErrors.selectedSessions?.[0] ? (
          <FieldError className="text-base">{fieldErrors.selectedSessions[0]}</FieldError>
        ) : null}
      </FieldSet>

      {/* Group 3: Consent and Submit */}
      <div className="grid gap-8 mt-4 pt-8 border-t border-slate-200 dark:border-slate-800">
        <label
          htmlFor="consent"
          className="flex items-start gap-4 p-5 rounded-xl bg-slate-100 dark:bg-slate-900 cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <Checkbox
            id="consent"
            checked={values.consent}
            onCheckedChange={(checked) => setField("consent", checked === true)}
            aria-invalid={Boolean(fieldErrors.consent?.length)}
            className="h-6 w-6 mt-1 border-slate-400 data-[state=checked]:bg-slate-800 data-[state=checked]:border-slate-800"
          />
          <div className="flex flex-col gap-1">
            <span className="text-lg font-bold text-slate-800 dark:text-slate-100">개인정보 수집 동의</span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
              행사 운영과 사전등록 확인을 위해 이름, 기관, 직책, 휴대전화번호, 이메일 정보를 수집하고 행사 종료 후 파기하는 데 동의합니다.
            </span>
            {fieldErrors.consent?.[0] ? <FieldError>{fieldErrors.consent[0]}</FieldError> : null}
          </div>
        </label>

        {message ? (
          <div
            className={cn(
              "flex flex-col gap-2 rounded-xl border-2 px-5 py-4 text-base font-semibold",
              messageTone === "success"
                ? "border-emerald-500/50 bg-emerald-50 text-emerald-800"
                : "border-red-500/50 bg-red-50 text-red-700"
            )}
          >
            <p>{message}</p>
            {actionHint}
          </div>
        ) : null}

        <Button
          type="submit"
          disabled={isPending}
          size="lg"
          className="h-16 w-full text-xl shadow-lg rounded-xl font-bold bg-slate-900 hover:bg-slate-800 text-white"
        >
          {isPending ? "처리 중..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
