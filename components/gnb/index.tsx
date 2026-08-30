import Link from "next/link";
import { gnb } from "./gnb.css";

export const GNB = () => {
  return (
    <header className={gnb}>
      <Link href="/" aria-label="TaskFlow 홈">
        TaskFlow
      </Link>

      <nav aria-label="주요 메뉴">
        <ul>
          <li>
            <Link href="/tasks">Tasks</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
