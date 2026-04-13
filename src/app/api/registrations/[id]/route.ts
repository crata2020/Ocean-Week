import { NextResponse } from "next/server";

import {
  getErrorMessage,
  normalizePhone,
  toDatabaseRegistration,
  toRegistrationRecord,
  updateRegistrationSchema,
} from "@/lib/registrations";
import {
  getSupabaseAdminClient,
  getSupabaseAdminConfig,
} from "@/lib/supabase-admin";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const payload = updateRegistrationSchema.parse(body);
    const supabase = getSupabaseAdminClient();

    const { data: currentRecord, error: lookupError } = await supabase
      .from("registrations")
      .select("id")
      .eq("id", id)
      .eq("name", payload.lookupName.trim())
      .eq("phone_normalized", normalizePhone(payload.lookupPhone))
      .maybeSingle();

    if (lookupError) {
      throw lookupError;
    }

    if (!currentRecord) {
      return NextResponse.json(
        {
          message:
            "조회한 정보와 일치하는 등록 건을 찾지 못했습니다. 다시 조회 후 수정해주세요.",
        },
        { status: 404 },
      );
    }

    const { supabaseUrl, serviceRoleKey } = getSupabaseAdminConfig();
    const response = await fetch(
      `${supabaseUrl}/rest/v1/registrations?id=eq.${encodeURIComponent(id)}&select=id,name,organization,title,phone_raw,email,created_at,updated_at`,
      {
        method: "PATCH",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
          "Content-Type": "application/json",
          Prefer: "return=representation",
        },
        body: JSON.stringify(toDatabaseRegistration(payload.registration)),
      },
    );

    if (response.status === 409) {
      return NextResponse.json(
        {
          message:
            "다른 등록 건에서 이미 사용 중인 전화번호입니다. 확인 후 다시 입력해주세요.",
        },
        { status: 409 },
      );
    }

    if (!response.ok) {
      const errorPayload = (await response.json()) as { message?: string };
      throw new Error(errorPayload.message ?? "Supabase update failed");
    }

    const [data] = (await response.json()) as Array<{
      id: string;
      name: string;
      organization: string;
      title: string;
      phone_raw: string;
      email: string;
      created_at: string;
      updated_at: string;
    }>;

    return NextResponse.json({
      message: "등록 정보가 수정되었습니다.",
      record: toRegistrationRecord(data),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: getErrorMessage(error, "등록 정보 수정 중 오류가 발생했습니다."),
      },
      { status: 400 },
    );
  }
}
