import Link from "next/link";
import { DropdownMenu, DropdownMenuItem } from "@/design-system/ui";
import * as styles from "./gnb.css";

type GNBProps = {
  hasWorkspace: boolean;
  logoutAction: () => Promise<void>;
  user: { name: string };
};

export function GNB({ hasWorkspace, logoutAction, user }: GNBProps) {
  const initials = user.name.trim().slice(0, 2).toUpperCase() || "–";

  return (
    <header className={styles.gnb}>
      <Link className={styles.brand} href="/" aria-label="Rivet 홈">
        <span className={styles.brandMark} aria-hidden="true">
          R
        </span>
        <span>Rivet</span>
      </Link>

      <div className={styles.actions}>
        {hasWorkspace ? (
          <>
            <button className={styles.search} type="button" aria-label="검색">
              <span className={styles.searchLabel}>검색</span>
              <kbd>⌘ K</kbd>
            </button>
            <button className={styles.create} type="button">
              + 새 이슈
            </button>
          </>
        ) : null}
        <DropdownMenu
          align="end"
          ariaLabel={`${user.name} 계정 메뉴`}
          trigger={<span aria-hidden="true">{initials}</span>}
          triggerClassName={styles.avatar}
        >
          <div className={styles.account} role="presentation">
            <span className={styles.accountLabel}>내 계정</span>
            <strong className={styles.accountName}>{user.name}</strong>
          </div>
          <form action={logoutAction}>
            <DropdownMenuItem type="submit">로그아웃</DropdownMenuItem>
          </form>
        </DropdownMenu>
      </div>
    </header>
  );
}
