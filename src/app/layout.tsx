import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { SiteHeader } from "@/components/site-header";
import { ImageProtection } from "@/components/image-protection";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";
import { getYoutubeLiveHeroState, shouldStartHeaderCollapsed } from "@/lib/youtube-live";

import "./globals.css";

export const revalidate = 0;

const bodyFont = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const displayFont = Noto_Sans_KR({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "2026 해양주간",
  description: "2026 해양주간 공식 홈페이지 - 해양산업의 미래를 논의하는 부산 대표 해양 컨퍼런스",
  openGraph: {
    title: "2026 해양주간",
    description: "2026 해양주간 공식 홈페이지 - 해양산업의 미래를 논의하는 부산 대표 해양 컨퍼런스",
    url: "https://www.oceanweek.co.kr",
    siteName: "2026 해양주간",
    images: [
      {
        url: "https://www.oceanweek.co.kr/images/ocean-week-preview-official.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 해양주간",
    description: "2026 해양주간 공식 홈페이지 - 해양산업의 미래를 논의하는 부산 대표 해양 컨퍼런스",
    images: ["https://www.oceanweek.co.kr/images/ocean-week-preview-official.png"],
  },
};

async function getLiveHeaderCollapsed() {
  const supabaseAdmin = getSupabaseAdminClient();
  const { data: setting } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .eq("id", "youtube_live")
    .single();

  const liveSetting = setting as unknown as {
    is_active?: boolean | null;
    youtube_url?: string | null;
  } | null;

  return shouldStartHeaderCollapsed(
    getYoutubeLiveHeroState({
      isActive: Boolean(liveSetting?.is_active),
      youtubeUrl: liveSetting?.youtube_url,
    }),
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const startsCollapsed = await getLiveHeaderCollapsed();

  return (
    <html lang="ko">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen bg-background text-foreground">
          <ImageProtection />
          <SiteHeader startsCollapsed={startsCollapsed} />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
