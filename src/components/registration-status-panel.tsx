"use client";

import React, { useState, useTransition, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { RegistrationForm } from "@/components/registration-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { registrationSessionDays, getRegistrationSessionLabel } from "@/lib/site-content";

// ... [Skipping imports, directly addressing the rendering area. Wait, I should make sure I don't break the component.]
// Let's replace the bottom half of the RegistrationStatusPanel component where the record is rendered.
import { cn } from "@/lib/utils";
import { lookupRegistrationSchema, type RegistrationRecord } from "@/lib/registrations";
import { supabase } from "@/lib/supabase-client";

type LookupErrors = Partial<Record<"name" | "phone", string[]>>;

export function RegistrationStatusPanel({ sessionCounts }: { sessionCounts?: Record<string, number> }) {
  const [lookupName, setLookupName] = useState("");
  const [lookupPhone, setLookupPhone] = useState("");
  const [lookupErrors, setLookupErrors] = useState<LookupErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [record, setRecord] = useState<RegistrationRecord | null>(null);
  const [isPending, startTransition] = useTransition();

  const [isActive, setIsActive] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [settingsLoaded, setSettingsLoaded] = useState(false);

  useEffect(() => {
    if (record?.role === "admin" && !settingsLoaded) {
      async function loadSettings() {
        // @ts-ignore
        const { data } = await supabase
          .from("site_settings")
          .select("*")
          .eq("id", "youtube_live")
          .single();
        if (data) {
          // @ts-ignore
          setIsActive(data.is_active);
          // @ts-ignore
          setYoutubeUrl(data.youtube_url || "");
        }
        setSettingsLoaded(true);
      }
      loadSettings();
    }
  }, [record?.role, settingsLoaded]);

  const handleSaveSettings = async () => {
    setIsSavingSettings(true);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "youtube_live",
          is_active: isActive,
          youtube_url: youtubeUrl,
        }),
      });
      if (res.ok) alert("메인 홈페이지 유튜브 설정이 저장되었습니다.");
      else alert("저장 중 오류가 발생했습니다.");
    } catch (error) {
      alert("네트워크 오류가 발생했습니다.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  function handleLookup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    const parsed = lookupRegistrationSchema.safeParse({
      name: lookupName,
      phone: lookupPhone,
    });

    if (!parsed.success) {
      setLookupErrors(parsed.error.flatten().fieldErrors as LookupErrors);
      setRecord(null);
      setMessage("조회 정보를 확인해주세요.");
      return;
    }

    setLookupErrors({});

    startTransition(async () => {
      const response = await fetch("/api/registrations/lookup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsed.data),
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
    <div className="flex flex-col gap-8">
      <Card className="border-border/70 bg-card shadow-[0_24px_60px_-46px_rgba(29,84,111,0.26)]">
        <CardHeader className="gap-3">
          <div className="h-1 w-16 rounded-full bg-[linear-gradient(90deg,rgba(122,201,187,0.9)_0%,rgba(52,126,191,0.9)_100%)]" />
          <Badge variant="outline" className="w-fit border-primary/20 text-primary">
            Lookup
          </Badge>
          <CardTitle className="text-2xl">등록 정보 조회</CardTitle>
          <CardDescription className="leading-7">
            이름과 전화번호가 모두 일치해야 등록 정보를 불러올 수 있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLookup} className="grid gap-5 sm:grid-cols-[1fr_1fr_auto]">
            <FieldGroup className="sm:contents">
              <Field data-invalid={Boolean(lookupErrors.name?.length)}>
                <FieldLabel htmlFor="lookup-name">이름</FieldLabel>
                <Input
                  id="lookup-name"
                  required
                  value={lookupName}
                  onChange={(event) => {
                    setLookupName(event.target.value);
                    setLookupErrors((current) => ({ ...current, name: undefined }));
                    setMessage(null);
                    setRecord(null);
                  }}
                  placeholder="등록한 이름"
                  className="h-11 bg-background"
                  aria-invalid={Boolean(lookupErrors.name?.length)}
                />
                {lookupErrors.name?.[0] ? <FieldError>{lookupErrors.name[0]}</FieldError> : null}
              </Field>

              <Field data-invalid={Boolean(lookupErrors.phone?.length)}>
                <FieldLabel htmlFor="lookup-phone">전화번호</FieldLabel>
                <Input
                  id="lookup-phone"
                  required
                  value={lookupPhone}
                  onChange={(event) => {
                    setLookupPhone(event.target.value);
                    setLookupErrors((current) => ({ ...current, phone: undefined }));
                    setMessage(null);
                    setRecord(null);
                  }}
                  placeholder="등록한 전화번호"
                  className="h-11 bg-background"
                  aria-invalid={Boolean(lookupErrors.phone?.length)}
                />
                {lookupErrors.phone?.[0] ? <FieldError>{lookupErrors.phone[0]}</FieldError> : null}
              </Field>
            </FieldGroup>

            <Button
              type="submit"
              disabled={isPending}
              size="lg"
              className="mt-auto h-11 rounded-md px-5 text-sm font-semibold"
            >
              {isPending ? "조회 중..." : "등록 조회"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {message ? (
        <div
          className={cn(
            "rounded-lg border px-4 py-4 text-sm",
            record
              ? "border-emerald-200/80 bg-emerald-50 text-emerald-800"
              : "border-destructive/20 bg-destructive/5 text-destructive",
          )}
        >
          {message}
        </div>
      ) : null}

      {record ? (
        <div className="flex flex-col gap-8">
          {record.role === "admin" && (
            <Card className="border-emerald-500/30 bg-emerald-50/30 shadow-none">
              <CardHeader className="gap-2 pb-4">
                <Badge className="w-fit bg-emerald-600 hover:bg-emerald-700">관리자 계정</Badge>
                <CardTitle className="text-xl">관리자 대시보드</CardTitle>
                <CardDescription>
                  현재 접수된 전체 행사별 사전등록 현황입니다.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-6">
                  {registrationSessionDays.map((day) => (
                    <div key={day.day} className="flex flex-col gap-3">
                      <div className="flex items-center gap-2 border-b border-emerald-500/20 pb-2">
                        <Badge className="bg-slate-700 text-white hover:bg-slate-700">{day.day}</Badge>
                        <span className="font-bold text-slate-700">{day.date}</span>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {day.sessions.map((session) => {
                          const currentCount = sessionCounts?.[session.id] || 0;
                          return (
                            <div key={session.id} className="flex flex-col gap-1 rounded-lg border border-slate-200 bg-white p-3 shadow-sm hover:border-emerald-300 transition-colors">
                              <span className="text-sm font-semibold text-slate-800">{session.title}</span>
                              <div className="flex justify-between items-center text-sm mt-1">
                                <span className="text-slate-500">{session.time}</span>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-bold text-slate-700">{currentCount}명 신청</span>
                                  <span className="text-slate-400 text-xs font-medium tracking-tight">/ 정원 {session.capacity}명</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={async () => {
                    try {
                      const response = await fetch("/api/registrations/export", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ name: lookupName, phone: lookupPhone }),
                      });
                      if (!response.ok) throw new Error("다운로드 실패");
                      
                      const blob = await response.blob();
                      const url = window.URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      
                      // 동적 파일명 생성 (예: 2026_해양주간_사전등록명단_20260414_1530.csv)
                      const now = new Date();
                      const yy = now.getFullYear();
                      const mm = String(now.getMonth() + 1).padStart(2, "0");
                      const dd = String(now.getDate()).padStart(2, "0");
                      const hh = String(now.getHours()).padStart(2, "0");
                      const min = String(now.getMinutes()).padStart(2, "0");
                      a.download = `2026_해양주간_사전등록명단_${yy}${mm}${dd}_${hh}${min}.csv`;
                      
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                      window.URL.revokeObjectURL(url);
                    } catch(err) {
                      alert("엑셀명단 다운로드에 실패했습니다.");
                    }
                  }}
                  className="w-full sm:w-auto self-start bg-emerald-600 hover:bg-emerald-700 font-semibold shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                  전체 명단 Excel 다운로드
                </Button>

                {/* 메인 홈페이지 설정 추가 */}
                <div className="mt-8 pt-6 border-t border-emerald-500/20">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">메인 홈페이지 라이브 설정</h3>
                  <div className="flex flex-col gap-5 bg-white p-5 rounded-lg border border-emerald-500/20">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border">
                      <div>
                        <p className="font-semibold text-sm">라이브 화면 켜기</p>
                        <p className="text-xs text-slate-500">메인 화면 배너 대신 유튜브 라이브를 표시합니다.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={isActive}
                          onChange={(e) => setIsActive(e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">유튜브 임베드 링크 (URL)</label>
                      <Input 
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        placeholder="예: https://www.youtube.com/embed/XXXXX"
                        className="w-full bg-white"
                      />
                      <p className="text-xs text-slate-400 mt-2">
                        * 유튜브 공유하기 {'>'} 퍼가기(Embed) 소스 코드에서 src="..." 안에 있는 주소만 복사해서 넣어주세요.
                      </p>
                    </div>

                    <Button 
                      onClick={handleSaveSettings} 
                      disabled={isSavingSettings}
                      className="w-full sm:w-auto self-start bg-slate-800 hover:bg-slate-900 text-white"
                    >
                      {isSavingSettings ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      라이브 설정 저장하기
                    </Button>
                  </div>
                </div>

              </CardContent>
            </Card>
          )}

          <Card className="border-border/70 bg-card shadow-[0_24px_60px_-46px_rgba(29,84,111,0.26)]">
            <CardHeader className="gap-3">
              <div className="h-1 w-16 rounded-full bg-[linear-gradient(90deg,rgba(52,126,191,0.95)_0%,rgba(241,187,95,0.85)_100%)]" />
              <Badge variant="outline" className="w-fit border-primary/20 text-primary">
                Registration Detail
              </Badge>
              <CardTitle className="text-2xl">등록 정보 수정</CardTitle>
              <CardDescription>
                마지막 수정: {new Date(record.updatedAt).toLocaleString("ko-KR")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 rounded-lg border border-border/70 bg-muted/30 p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">현재 선택된 일정</p>
                <div className="flex flex-col gap-4">
                  {registrationSessionDays.map((day) => {
                    const selectedInDay = day.sessions.filter(s => record.selectedSessionIds.includes(s.id));
                    if (selectedInDay.length === 0) return null;

                    return (
                      <div key={day.day} className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-1">
                          <span className="text-[11px] font-bold bg-slate-500 text-white px-1.5 py-0.5 rounded leading-none">{day.day}</span>
                          <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{day.date}</span>
                        </div>
                        <div className="flex flex-col gap-1.5 pl-1">
                          {selectedInDay.map((session) => (
                            <div key={session.id} className="flex items-center gap-3 text-sm">
                              <span className="font-bold text-sky-600 dark:text-sky-400 min-w-[100px] text-[13px]">{session.time}</span>
                              <span className="font-semibold text-slate-700 dark:text-slate-200">{session.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <RegistrationForm
                mode="update"
                recordId={record.id}
                lookupName={lookupName}
                lookupPhone={lookupPhone}
                sessionCounts={sessionCounts}
                initialValues={{
                  name: record.name,
                  organization: record.organization,
                  title: record.title,
                  phone: record.phoneRaw,
                  email: record.email,
                  selectedSessions: record.selectedSessionIds,
                  consent: true,
                }}
                onSaved={(nextRecord) => setRecord(nextRecord)}
              />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </div>
  );
}
