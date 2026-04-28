"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Clock, MessageSquareText, Send } from "lucide-react";
import { supabase } from "@/lib/supabase-client";

interface Opinion {
  id: string;
  session_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface OpinionBoardProps {
  sessionId: string;
}

export function OpinionBoard({ sessionId }: OpinionBoardProps) {
  const [opinions, setOpinions] = useState<Opinion[]>([]);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOpinions = useCallback(async () => {
    setIsLoading(true);
    // @ts-ignore
    const { data, error } = await supabase
      .from("conference_opinions")
      .select("id, session_id, author_name, content, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("의견 불러오기 실패:", error);
    } else {
      // @ts-ignore
      setOpinions(data || []);
    }

    setIsLoading(false);
  }, [sessionId]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      fetchOpinions();
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [fetchOpinions]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!content.trim()) {
      alert("의견을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    // @ts-ignore
    const { error } = await supabase.from("conference_opinions").insert([
      {
        session_id: sessionId,
        author_name: "익명",
        password: "anonymous",
        content: content.trim(),
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error("의견 등록 실패:", error);
      alert("의견을 등록하는 중 오류가 발생했습니다.");
      return;
    }

    setContent("");
    fetchOpinions();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const pad = (value: number) => value.toString().padStart(2, "0");

    return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
  };

  return (
    <div className="mt-8 border-t border-slate-200 pt-8 dark:border-slate-800">
      <div className="mb-6 flex items-center gap-2">
        <div className="h-6 w-1.5 rounded-full bg-blue-500" />
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
          의견 남기기
        </h3>
        <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-bold text-blue-700">
          {opinions.length}
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-10 rounded-2xl border border-blue-100 bg-blue-50/40 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/50"
      >
        <div className="relative">
          <MessageSquareText className="absolute left-4 top-4 h-4 w-4 text-slate-400" />
          <textarea
            placeholder="의견을 자유롭게 남겨주세요."
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="min-h-[130px] w-full resize-none rounded-xl border border-blue-200 bg-white py-4 pl-10 pr-4 text-[15px] leading-relaxed text-slate-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>

      <div className="space-y-4">
        {isLoading ? (
          <div className="py-10 text-center text-slate-500">의견을 불러오는 중입니다...</div>
        ) : opinions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center dark:border-slate-800 dark:bg-slate-900/30">
            <p className="font-medium text-slate-500 dark:text-slate-400">아직 등록된 의견이 없습니다.</p>
            <p className="mt-1 text-sm text-slate-400">첫 번째 의견을 남겨보세요.</p>
          </div>
        ) : (
          opinions.map((opinion) => (
            <div
              key={opinion.id}
              className="rounded-xl border border-blue-100 bg-white p-6 shadow-sm ring-1 ring-slate-100/70 dark:border-slate-800 dark:bg-slate-900 dark:ring-slate-800"
            >
              <div className="mb-3 flex items-center gap-1 text-xs font-medium text-slate-400">
                <Clock className="h-3 w-3" />
                {formatDate(opinion.created_at)}
              </div>
              <p className="whitespace-pre-wrap text-[15px] font-medium leading-7 text-slate-800 dark:text-slate-100">
                {opinion.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
