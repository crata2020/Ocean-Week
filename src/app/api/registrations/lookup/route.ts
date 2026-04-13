import { NextResponse } from "next/server";

import {
  getErrorMessage,
  lookupRegistrationSchema,
  normalizePhone,
  toRegistrationRecord,
} from "@/lib/registrations";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = lookupRegistrationSchema.parse(body);
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from("registrations")
      .select("id, name, organization, title, phone_raw, email, created_at, updated_at")
      .eq("name", values.name.trim())
      .eq("phone_normalized", normalizePhone(values.phone))
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return NextResponse.json(
        {
          message: "입력하신 이름과 전화번호로 등록된 정보를 찾지 못했습니다.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      record: toRegistrationRecord(data),
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: getErrorMessage(error, "등록 정보 조회 중 오류가 발생했습니다."),
      },
      { status: 400 },
    );
  }
}
