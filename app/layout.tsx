import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/global.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rivet — 팀의 일을 연결하는 워크스페이스",
  description: "소규모 팀을 위한 이슈 및 프로젝트 관리 서비스",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko">
      <body className={inter.variable}>{children}</body>
    </html>
  );
}
