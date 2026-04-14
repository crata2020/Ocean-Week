import { NextResponse } from "next/server";

import {
  createRegistrationSchema,
  getErrorMessage,
  toDatabaseRegistration,
  toRegistrationRecord,
} from "@/lib/registrations";
import { getSupabaseAdminConfig } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { registration } = createRegistrationSchema.parse(body);
    const { supabaseUrl, serviceRoleKey } = getSupabaseAdminConfig();
    const response = await fetch(
      `${supabaseUrl}/rest/v1/registrations?select=id,name,organization,title,phone_raw,email,selected_session_ids,created_at,updated_at`,
      {
        method: "POST",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(toDatabaseRegistration(registration)),
      },
    );

    if (response.status === 409) {
      return NextResponse.json(
        {
          message:
            "이미 등록된 전화번호입니다. 사전등록현황 페이지에서 기존 정보를 수정해주세요.",
        },
        { status: 409 },
      );
    }

    if (!response.ok) {
      const errorPayload = (await response.json()) as { message?: string };
      throw new Error(errorPayload.message ?? "Supabase insert failed");
    }

    const [data] = (await response.json()) as Array<{
      id: string;
      name: string;
      organization: string;
      title: string;
      phone_raw: string;
      email: string;
      selected_session_ids?: string[];
      created_at: string;
      updated_at: string;
    }>;

    return NextResponse.json({
      message: "사전등록이 완료되었습니다.",
      record: toRegistrationRecord(data),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: getErrorMessage(error, "사전등록 처리 중 오류가 발생했습니다."),
      },
      { status: 400 },
    );
  }
}
