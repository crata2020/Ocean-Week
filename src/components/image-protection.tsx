"use client";

import { useEffect } from "react";

/**
 * 전역 이미지 보호 컴포넌트
 * - 우클릭 컨텍스트 메뉴 차단 (이미지 위에서만)
 * - 드래그 앤 드롭 저장 차단
 * - 키보드 단축키 저장 차단 (Ctrl+S)
 */
export function ImageProtection() {
  useEffect(() => {
    // 이미지 위 우클릭 차단 — 전체 document에 적용
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // img 태그 자체 또는 이미지를 포함하는 컨테이너 위에서 차단
      if (
        target.tagName === "IMG" ||
        target.closest("[data-protected]") ||
        // Next.js Image wrapper span/div도 포함
        target.closest("span[style*='display:block']") ||
        target.closest(".overflow-hidden") // 이미지 컨테이너 대부분이 overflow-hidden
      ) {
        e.preventDefault();
        return false;
      }
    };

    // 이미지 드래그 차단
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "IMG") {
        e.preventDefault();
        return false;
      }
    };

    // Ctrl+S / Cmd+S 저장 차단
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("dragstart", handleDragStart);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("dragstart", handleDragStart);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return null;
}
