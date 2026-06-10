export const YOUTUBE_LIVE_NOTICE_MESSAGE =
  "14:00부터 온라인 컨퍼런스가 진행 됩니다.";

export type YoutubeLiveHeroState =
  | { mode: "off" }
  | { mode: "video"; embedUrl: string }
  | { mode: "notice"; message: string };

export function buildYoutubeEmbedUrl(youtubeUrl: string) {
  const url = youtubeUrl.trim();

  if (!url) return "";

  const watchMatch = url.match(
    /(?:v=|youtu\.be\/|youtube\.com\/live\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  );

  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}?autoplay=1&mute=1&rel=0`;
  }

  return `${url}${url.includes("?") ? "&" : "?"}autoplay=1&mute=1`;
}

export function getYoutubeLiveHeroState({
  isActive,
  youtubeUrl,
}: {
  isActive: boolean;
  youtubeUrl?: string | null;
}): YoutubeLiveHeroState {
  if (!isActive) {
    return { mode: "off" };
  }

  const trimmedYoutubeUrl = youtubeUrl?.trim() ?? "";

  if (!trimmedYoutubeUrl) {
    return {
      mode: "notice",
      message: YOUTUBE_LIVE_NOTICE_MESSAGE,
    };
  }

  return {
    mode: "video",
    embedUrl: buildYoutubeEmbedUrl(trimmedYoutubeUrl),
  };
}

export function shouldStartHeaderCollapsed(liveHero: YoutubeLiveHeroState) {
  return liveHero.mode !== "off";
}
