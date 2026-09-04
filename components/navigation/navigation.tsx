import { Suspense } from "react";
import { getCurrentUser, getWorkspaceList } from "@/server/queries/workspaces";
import { MobileNavigation } from "./mobile-navigation";
import { WorkspaceNavigation } from "./workspace-navigation";
import * as styles from "./navigation.css";

export async function Navigation() {
  const [workspaces, user] = await Promise.all([
    getWorkspaceList(),
    getCurrentUser(),
  ]);
  if (workspaces.length === 0) return null;
  return (
    <>
      {/* Desktop Navigation */}
      <nav className={styles.navigation} aria-label="워크스페이스 메뉴">
        <Suspense
          fallback={
            <span className={styles.navigationLoading}>메뉴 불러오는 중</span>
          }
        >
          <WorkspaceNavigation
            currentUserId={user.id}
            workspaces={workspaces}
          />
        </Suspense>
      </nav>

      {/* Mobile Navigation */}
      <Suspense fallback={null}>
        <MobileNavigation workspaces={workspaces} />
      </Suspense>
    </>
  );
}
