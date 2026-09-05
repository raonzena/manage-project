import { Suspense } from "react";
import type { NavigationWorkspace } from "./navigation-domain";
import { MobileNavigation } from "./mobile-navigation";
import { WorkspaceNavigation } from "./workspace-navigation";
import type { WorkspaceAction } from "./create-dialogs";
import * as styles from "./navigation.css";

export function Navigation({
  createProjectAction,
  createWorkspaceAction,
  currentUserId,
  workspaces,
}: {
  createProjectAction: WorkspaceAction;
  createWorkspaceAction: WorkspaceAction;
  currentUserId: string;
  workspaces: NavigationWorkspace[];
}) {
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
            createProjectAction={createProjectAction}
            createWorkspaceAction={createWorkspaceAction}
            currentUserId={currentUserId}
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
