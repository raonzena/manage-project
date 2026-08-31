import Link from "next/link";
import * as styles from "./navigation.css";

export function Navigation() {
  return (
    <>
      <nav className={styles.navigation} aria-label="워크스페이스 메뉴">
        <div className={styles.workspace}>
          <span className={styles.workspaceMark}>MB</span>
          <span>
            <b>모바일 리뉴얼</b>
            <small className={styles.workspaceMeta}>MOB · 12개 이슈</small>
          </span>
          <span aria-hidden="true">⌄</span>
        </div>
        <p className={styles.label}>Workspace</p>
        <ul className={styles.menu}>
          <li>
            <Link className={`${styles.menuLink} ${styles.active}`} href="/">
              <span>개요</span>
              <small className={styles.menuCount}>G</small>
            </Link>
          </li>
          <li>
            <Link className={styles.menuLink} href="/tasks">
              <span>내 이슈</span>
              <small className={styles.menuCount}>8</small>
            </Link>
          </li>
          <li>
            <Link className={styles.menuLink} href="/projects">
              <span>프로젝트</span>
              <small className={styles.menuCount}>3</small>
            </Link>
          </li>
          <li>
            <Link className={styles.menuLink} href="/team">
              <span>팀</span>
              <small className={styles.menuCount}>6</small>
            </Link>
          </li>
        </ul>
        <p className={styles.label}>Projects</p>
        <ul className={styles.projects}>
          <li>
            <Link className={styles.projectLink} href="/projects/mobile">
              <i className={`${styles.projectIndicator} ${styles.blue}`} />
              모바일 리뉴얼<span className={styles.projectCount}>12</span>
            </Link>
          </li>
          <li>
            <Link className={styles.projectLink} href="/projects/billing">
              <i className={`${styles.projectIndicator} ${styles.green}`} />
              결제 시스템<span className={styles.projectCount}>7</span>
            </Link>
          </li>
          <li>
            <Link className={styles.projectLink} href="/projects/website">
              <i className={`${styles.projectIndicator} ${styles.orange}`} />
              브랜드 사이트<span className={styles.projectCount}>4</span>
            </Link>
          </li>
        </ul>
        <div className={styles.footer}>
          <Link href="/settings">설정</Link>
          <span>⌘ ,</span>
        </div>
      </nav>
      <nav className={styles.mobileNavigation} aria-label="모바일 메뉴">
        <Link
          className={`${styles.mobileNavigationLink} ${styles.mobileActive}`}
          href="/"
        >
          <span className={styles.mobileNavigationIcon}>●</span>
          <small className={styles.mobileNavigationLabel}>개요</small>
        </Link>
        <Link className={styles.mobileNavigationLink} href="/tasks">
          <span className={styles.mobileNavigationIcon}>□</span>
          <small className={styles.mobileNavigationLabel}>내 이슈</small>
        </Link>
        <Link className={styles.mobileNavigationLink} href="/projects">
          <span className={styles.mobileNavigationIcon}>◇</span>
          <small className={styles.mobileNavigationLabel}>프로젝트</small>
        </Link>
        <Link className={styles.mobileNavigationLink} href="/search">
          <span className={styles.mobileNavigationIcon}>⌕</span>
          <small className={styles.mobileNavigationLabel}>검색</small>
        </Link>
      </nav>
    </>
  );
}
