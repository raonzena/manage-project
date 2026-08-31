"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as styles from "./navigation.css";

const mobileMenus = [
  { id: "overview", label: "개요", href: "/", icon: "●" },
  { id: "my-issues", label: "내 이슈", href: "/tasks", icon: "□" },
  { id: "projects", label: "프로젝트", href: "/projects", icon: "◇" },
  { id: "search", label: "검색", href: "/search", icon: "⌕" },
];

function isActiveMenu(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileNavigation() {
  const pathname = usePathname();

  return (
    <nav className={styles.mobileNavigation} aria-label="모바일 메뉴">
      {mobileMenus.map((menu) => {
        const isActive = isActiveMenu(pathname, menu.href);

        return (
          <Link
            key={menu.id}
            className={`${styles.mobileNavigationLink} ${
              isActive ? styles.mobileActive : ""
            }`}
            href={menu.href}
            aria-current={isActive ? "page" : undefined}
          >
            <span className={styles.mobileNavigationIcon} aria-hidden="true">
              {menu.icon}
            </span>
            <small className={styles.mobileNavigationLabel}>{menu.label}</small>
          </Link>
        );
      })}
    </nav>
  );
}
