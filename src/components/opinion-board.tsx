"use client";

import React, { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase-client";
import { User, Lock, Trash2, Send, Clock } from "lucide-react";

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
  const [authorName, setAuthorName] = useState("");
  const [password, setPassword] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchOpinions();
  }, [sessionId]);

  const fetchOpinions = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("conference_opinions")
      .select("id, session_id, author_name, content, created_at")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("의견 불러오기 실패:", error);
    } else {
      setOpinions(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !password.trim() || !content.trim()) {
      alert("이름, 비밀번호, 내용을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    const { error } = await supabase.from("conference_opinions").insert([
      {
        session_id: sessionId,
        author_name: authorName.trim(),
        password: password.trim(),
        content: content.trim(),
      },
    ]);

    setIsSubmitting(false);

    if (error) {
      console.error("의견 등록 실패:", error);
      alert("의견을 등록하는 중 오류가 발생했습니다.");
    } else {
      setAuthorName("");
      setPassword("");
      setContent("");
      fetchOpinions();
    }
  };

  const handleDelete = async (id: string) => {
    if (!deletePassword.trim()) {
      alert("비밀번호를 입력해주세요.");
      return;
    }

    setIsDeleting(true);
    // Since RLS doesn't easily let us check password without edge functions or specific rules, 
    // we do a simple check on the client (Note: In production, do this server-side)
    const { data, error: fetchError } = await supabase
      .from("conference_opinions")
      .select("password")
      .eq("id", id)
      .single();

    if (fetchError || !data) {
      alert("의견을 찾을 수 없습니다.");
      setIsDeleting(false);
      return;
    }

    if (data.password !== deletePassword) {
      alert("비밀번호가 일치하지 않습니다.");
      setIsDeleting(false);
      return;
    }

    const { error: deleteError } = await supabase
      .from("conference_opinions")
      .delete()
      .eq("id", id);

    setIsDeleting(false);

    if (deleteError) {
      console.error("의견 삭제 실패:", deleteError);
      alert("삭제 중 오류가 발생했습니다.");
    } else {
      setDeleteId(null);
      setDeletePassword("");
      fetchOpinions();
    }
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, "0");
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  return (
    <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <div className="h-6 w-1.5 rounded-full bg-blue-500" />
        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">
          실시간 의견 게시판
        </h3>
        <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold">
          {opinions.length}
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-5 border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="relative flex-1">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="이름 (닉네임)"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={20}
            />
          </div>
          <div className="relative flex-1">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="password"
              placeholder="비밀번호 (수정/삭제용)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              maxLength={20}
            />
          </div>
        </div>
        <div className="relative">
          <textarea
            placeholder="자유롭게 의견을 남겨주세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
            maxLength={1000}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="absolute right-3 bottom-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Opinion List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-10 text-slate-500">의견을 불러오는 중입니다...</div>
        ) : opinions.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-900/30 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-slate-500 dark:text-slate-400 font-medium">아직 등록된 의견이 없습니다.</p>
            <p className="text-sm text-slate-400 mt-1">첫 번째 의견을 남겨보세요!</p>
          </div>
        ) : (
          opinions.map((opinion) => (
            <div key={opinion.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm relative group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    {opinion.author_name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      {opinion.author_name}
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Clock className="w-3 h-3" />
                      {formatDate(opinion.created_at)}
                    </div>
                  </div>
                </div>
                
                {/* Delete Button / Form */}
                <div className="relative">
                  {deleteId === opinion.id ? (
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                      <input
                        type="password"
                        placeholder="비밀번호"
                        value={deletePassword}
                        onChange={(e) => setDeletePassword(e.target.value)}
                        className="w-20 px-2 py-1 text-xs bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded"
                        autoFocus
                      />
                      <button 
                        onClick={() => handleDelete(opinion.id)}
                        disabled={isDeleting}
                        className="text-xs font-bold text-red-500 hover:text-red-700 px-1"
                      >
                        확인
                      </button>
                      <button 
                        onClick={() => { setDeleteId(null); setDeletePassword(""); }}
                        className="text-xs text-slate-500 hover:text-slate-700 px-1"
                      >
                        취소
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteId(opinion.id)}
                      className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all p-1"
                      title="삭제"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                {opinion.content}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
