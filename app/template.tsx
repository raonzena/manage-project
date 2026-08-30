import { GNB } from "@/components/gnb";
import { Navigation } from "@/components/navigation";
import { container } from "./template.css";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <GNB />
      <div className={container}>
        <Navigation />
        {children}
      </div>
    </main>
  );
}
