import { Suspense } from "react";
import { MobileNavigation } from "./mobile-navigation";
import { WorkspaceNavigation } from "./workspace-navigation";
import * as styles from "./navigation.css";

export function Navigation() {
  return (
    <>
      {/* Desktop Navigation */}
      <nav className={styles.navigation} aria-label="워크스페이스 메뉴">
        <Suspense
          fallback={
            <span className={styles.navigationLoading}>메뉴 불러오는 중</span>
          }
        >
          <WorkspaceNavigation />
        </Suspense>
      </nav>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </>
  );
}
