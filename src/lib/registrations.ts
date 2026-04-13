import { z } from "zod";

const phoneError = "전화번호를 정확히 입력해주세요.";

export function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, "");

  if (digits.startsWith("82")) {
    return `0${digits.slice(2)}`;
  }

  return digits;
}

export function formatPhone(input: string) {
  const digits = normalizePhone(input);

  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }

  if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  return input;
}

const phoneSchema = z
  .string()
  .trim()
  .min(1, "전화번호를 입력해주세요.")
  .refine((value) => {
    const normalized = normalizePhone(value);
    return normalized.length >= 9 && normalized.length <= 11;
  }, phoneError);

const registrationFieldsSchema = z.object({
  name: z.string().trim().min(1, "이름을 입력해주세요."),
  organization: z.string().trim().min(1, "기관을 입력해주세요."),
  title: z.string().trim().min(1, "직책을 입력해주세요."),
  phone: phoneSchema,
  email: z.string().trim().email("이메일 형식이 올바르지 않습니다."),
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
  createdAt: string;
  updatedAt: string;
};

export function toDatabaseRegistration(values: RegistrationFormValues) {
  return {
    name: values.name.trim(),
    organization: values.organization.trim(),
    title: values.title.trim(),
    phone_raw: values.phone.trim(),
    phone_normalized: normalizePhone(values.phone),
    email: values.email.trim().toLowerCase(),
  };
}

export function toRegistrationRecord(row: {
  id: string;
  name: string;
  organization: string;
  title: string;
  phone_raw: string;
  email: string;
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
