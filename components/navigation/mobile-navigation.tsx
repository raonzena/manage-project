"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { isActiveMenu } from "./is-active-menu";
import {
  getNavigationSelection,
  type NavigationWorkspace,
} from "./navigation-domain";
import * as styles from "./navigation.css";

const mobileMenus = [
  { id: "overview", label: "대시보드", href: "/", icon: "●" },
  { id: "my-issues", label: "내 이슈", href: "/issues/mine", icon: "□" },
  { id: "projects", label: "프로젝트", href: "/projects", icon: "◇" },
  { id: "search", label: "검색", href: "/search", icon: "⌕" },
];

export function MobileNavigation({
  workspaces,
}: {
  workspaces: NavigationWorkspace[];
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { project, workspace } = getNavigationSelection(
    workspaces,
    searchParams.get("workspace"),
    searchParams.get("project"),
  );

  function getHref(href: string) {
    if (href !== "/issues/mine" || !workspace || !project) return href;

    const params = new URLSearchParams({
      workspace: workspace.id,
      project: project.id,
    });
    return `${href}?${params.toString()}`;
  }

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
            href={getHref(menu.href)}
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
