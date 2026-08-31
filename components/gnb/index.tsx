import Link from "next/link";
import * as styles from "./gnb.css";

export const GNB = () => {
  return (
    <header className={styles.gnb}>
      <Link className={styles.brand} href="/" aria-label="Rivet 홈">
        <span className={styles.brandMark} aria-hidden="true">
          R
        </span>
        <span>Rivet</span>
      </Link>

      <div className={styles.actions}>
        <button className={styles.search} type="button" aria-label="검색">
          <span className={styles.searchLabel}>검색</span>
          <kbd>⌘ K</kbd>
        </button>
        <button className={styles.create} type="button">
          + 새 이슈
        </button>
        <span className={styles.avatar} aria-label="내 계정">
          SH
        </span>
      </div>
    </header>
  );
};
