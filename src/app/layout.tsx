import type { Metadata } from "next";
import { Marcellus, Noto_Sans_KR, Geist } from "next/font/google";

import { SiteHeader } from "@/components/site-header";

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const bodyFont = Noto_Sans_KR({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const displayFont = Marcellus({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "2026 해양주간",
  description: "2026 해양주간 홈페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={cn("font-sans", geist.variable)}>
      <body className={`${bodyFont.variable} ${displayFont.variable} antialiased`}>
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          <SiteHeader />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
