import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";

import { SiteHeader } from "@/components/site-header";

import "./globals.css";

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
  metadataBase: new URL("https://www.oceanweek.co.kr"),
  title: "2026 해양주간",
  description: "2026 해양주간 공식 홈페이지 - 해양산업의 미래를 논의하는 부산 대표 해양 컨퍼런스",
  openGraph: {
    title: "2026 해양주간",
    description: "2026 해양주간 공식 홈페이지 - 해양산업의 미래를 논의하는 부산 대표 해양 컨퍼런스",
    url: "https://www.oceanweek.co.kr",
    siteName: "2026 해양주간",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "2026 해양주간 Ocean Week",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "2026 해양주간",
    description: "2026 해양주간 공식 홈페이지 - 해양산업의 미래를 논의하는 부산 대표 해양 컨퍼런스",
    images: ["/images/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`} suppressHydrationWarning>
        <div className="min-h-screen bg-background text-foreground">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
