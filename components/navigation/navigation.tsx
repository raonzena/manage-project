import Link from "next/link";
import { MenuSection } from "./menu-section";
import { menuSections } from "./menu-sections";
import { MobileNavigation } from "./mobile-navigation";
import * as styles from "./navigation.css";

export function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className={styles.navigation} aria-label="워크스페이스 메뉴">
        <div className={styles.workspace}>
          <span className={styles.workspaceMark}>MB</span>
          <span>
            <b>모바일 리뉴얼</b>
            <small className={styles.workspaceMeta}>MOB · 12개 이슈</small>
          </span>
          <span aria-hidden="true">⌄</span>
        </div>

        <MenuSection {...menuSections.workspace} />
        <MenuSection {...menuSections.project} />
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </>
  );
}
