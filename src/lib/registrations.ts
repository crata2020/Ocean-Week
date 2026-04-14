import { z } from "zod";

import { registrationSessionIds } from "@/lib/site-content";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

const phoneError = "010-1234-5678 형식으로 휴대전화번호를 정확히 입력해주세요.";
const sessionError = "신청 가능한 일정을 한 개 이상 선택해주세요.";
const registrationSessionIdSet = new Set<string>(registrationSessionIds);

export function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("82")) {
    return `0${digits.slice(2)}`;
  }

  return digits;
}

export function formatPhone(input: string) {
  const digits = normalizePhone(input);

  if (digits.length <= 3) {
    return digits;
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }

  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
}

const phoneSchema = z
  .string()
  .trim()
  .min(1, "휴대전화번호를 입력해주세요.")
  .refine((value) => {
    const normalized = normalizePhone(value);
    return normalized.startsWith("010") && normalized.length === 11;
  }, phoneError);

const selectedSessionsSchema = z
  .array(z.string())
  .min(1, sessionError)
  .refine(
    (value) => value.every((item) => registrationSessionIdSet.has(item)),
    "선택한 일정 정보가 올바르지 않습니다.",
  );

export const registrationFieldsSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요."),
  organization: z.string().trim().min(1, "기관을 입력해주세요."),
  title: z.string().trim().min(1, "직책을 입력해주세요."),
  phone: phoneSchema,
  email: z.string().trim().email("이메일 형식이 올바르지 않습니다.").optional().or(z.literal("")),
  selectedSessions: selectedSessionsSchema,
  consent: z.boolean().refine((value) => value, "개인정보 수집 동의가 필요합니다."),
});

export const createRegistrationSchema = z.object({
  registration: registrationFieldsSchema,
});

export const lookupRegistrationSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요."),
  phone: phoneSchema,
});

export const updateRegistrationSchema = z.object({
  lookupName: z.string().trim().min(1, "조회 이름이 필요합니다."),
  lookupPhone: phoneSchema,
  registration: registrationFieldsSchema,
});

export type RegistrationFormValues = z.infer<typeof registrationFieldsSchema>;

export type RegistrationRecord = {
  id: string;
  name: string;
  organization: string;
  title: string;
  phoneRaw: string;
  email: string;
  role: string;
  selectedSessionIds: string[];
  createdAt: string;
  updatedAt: string;
};

export function toDatabaseRegistration(values: RegistrationFormValues) {
  return {
    name: values.name.trim(),
    organization: values.organization.trim(),
    title: values.title.trim(),
    phone_raw: formatPhone(values.phone),
    phone_normalized: normalizePhone(values.phone),
    email: (values.email || "").trim().toLowerCase(),
    selected_session_ids: values.selectedSessions,
  };
}

function sanitizeSelectedSessionIds(value: unknown) {
  if (!Array.isArray(value)) {
    return [] as string[];
  }

  return value.filter(
    (item): item is string => typeof item === "string" && registrationSessionIdSet.has(item),
  );
}

export function toRegistrationRecord(row: {
  id: string;
  name: string;
  organization: string;
  title: string;
  phone_raw: string;
  email: string;
  role?: string;
  selected_session_ids?: unknown;
  created_at: string;
  updated_at: string;
}): RegistrationRecord {
  return {
    id: row.id,
    name: row.name,
    organization: row.organization,
    title: row.title,
    phoneRaw: row.phone_raw,
    email: row.email,
    role: row.role ?? "guest",
    selectedSessionIds: sanitizeSelectedSessionIds(row.selected_session_ids),
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof z.ZodError) {
    return error.issues[0]?.message ?? fallback;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
}

export async function getSessionRegistrationCounts(): Promise<Record<string, number>> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase.from("registrations").select("selected_session_ids");
    
    if (error || !data) {
      return {};
    }

    const counts: Record<string, number> = {};
    
    data.forEach((row: any) => {
      const ids = row.selected_session_ids;
      if (Array.isArray(ids)) {
        ids.forEach((id) => {
          if (typeof id === "string") {
            counts[id] = (counts[id] || 0) + 1;
          }
        });
      }
    });

    return counts;
  } catch (error) {
    // Missing env variables or connection error fallback
    return {};
  }
}
