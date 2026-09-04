import { GNB } from "@/components/gnb";
import { Navigation } from "@/components/navigation";
import { container, main } from "../template.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
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
