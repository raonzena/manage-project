"use client";

import { GNB } from "@/components/gnb";
import { Navigation } from "@/components/navigation";
import { usePathname } from "next/navigation";
import { container, main } from "./template.css";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/login" || pathname === "/sign-up") {
    return children;
  }

  return (
    <>
      <GNB />
      <div className={container}>
        <Navigation />
        <main className={main}>{children}</main>
      </div>
    </>
  );
}
