import Link from "next/link";
import { navigation } from "./navigation.css";

export function Navigation() {
  return (
    <nav className={navigation}>
      <ul>
        <li>
          <Link href="/">Overview</Link>
        </li>
        <li>
          <Link href="/tasks">Tasks</Link>
        </li>
        <li>
          <Link href="/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
}
