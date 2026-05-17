import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

import { lookupRegistrationSchema, normalizePhone } from "@/lib/registrations";
import { getRegistrationSessionLabel, registrationSessionDays } from "@/lib/site-content";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const values = lookupRegistrationSchema.parse(body);
    const supabase = getSupabaseAdminClient();

    // 1. 요청자(Admin) 권한 확인
    const { data: adminData, error: adminError } = await supabase
      .from("registrations")
      .select("role")
      .eq("name", values.name.trim())
      .eq("phone_normalized", normalizePhone(values.phone))
      .maybeSingle();

    if (adminError || !adminData || (adminData as any).role !== "admin") {
      return NextResponse.json(
        { message: "권한이 없습니다. (관리자 전용 기능)" },
        { status: 403 }
      );
    }

    // 2. 전체 명단 가져오기
    const { data: allRecords, error: fetchError } = await supabase
      .from("registrations")
      .select("*")
      .order("created_at", { ascending: false });

    if (fetchError || !allRecords) {
      throw new Error("전체 데이터 조회에 실패했습니다.");
    }

    // 3. 엑셀 데이터 변환
    const headers = [
      "일자 구분",
      "구분 (세션명)",
      "이름",
      "소속(기관)",
      "직책",
      "휴대전화",
      "이메일",
      "접수 일시",
    ];

    const resolvedRows: { dayIndex: number; sessionTitle: string; rowArr: string[] }[] = [];

    // Flatten logic
    allRecords.forEach((row: any) => {
      const sessionIds = Array.isArray(row.selected_session_ids) 
        ? row.selected_session_ids 
        : [];
      
      sessionIds.forEach((sid: any) => {
        if (typeof sid !== "string") return;
        
        let foundDayIndex = 99;
        let dayLabel = "알 수 없음";
        let sessionTitleStr = "알 수 없는 세션";

        // Find the day and session info
        for (let i = 0; i < registrationSessionDays.length; i++) {
          const day = registrationSessionDays[i];
          const foundSession = day.sessions.find((s) => s.id === sid);
          if (foundSession) {
            foundDayIndex = i;
            dayLabel = `[${day.day}] ${day.date}`;
            sessionTitleStr = `${foundSession.title} (${foundSession.time})`;
            break;
          }
        }

        const formatDateTime = (dateStr: string) => {
          const d = new Date(dateStr);
          return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
        };

        const rowArr = [
          dayLabel,
          sessionTitleStr,
          row.name,
          row.organization,
          row.title,
          row.phone_raw,
          row.email,
          formatDateTime(row.created_at),
        ];

        resolvedRows.push({
          dayIndex: foundDayIndex,
          sessionTitle: sessionTitleStr,
          rowArr,
        });
      });
    });

    // 정렬 규칙: 1. Day 순 (Day 1 -> Day 2) / 2. 세션명 통일성 / 3. 접수 일자 빠른순
    resolvedRows.sort((a, b) => {
      if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
      const titleCmp = a.sessionTitle.localeCompare(b.sessionTitle);
      if (titleCmp !== 0) return titleCmp;
      return a.rowArr[7].localeCompare(b.rowArr[7]);
    });

    const data = [headers];
    resolvedRows.forEach(({ rowArr }) => {
      data.push(rowArr);
    });

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(data);

    // 열 너비 설정
    ws["!cols"] = [
      { wch: 15 }, // 일자 구분
      { wch: 35 }, // 세션명
      { wch: 10 }, // 이름
      { wch: 25 }, // 소속
      { wch: 15 }, // 직책
      { wch: 20 }, // 휴대전화
      { wch: 30 }, // 이메일
      { wch: 20 }, // 접수일시
    ];

    XLSX.utils.book_append_sheet(wb, ws, "사전등록명단");

    const excelBuffer = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    return new Response(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": 'attachment; filename="ocean_week_registrations.xlsx"',
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "명단 다운로드 중 오류가 발생했습니다." },
      { status: 400 }
    );
  }
}
