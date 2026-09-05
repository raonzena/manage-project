import { GNB } from "@/components/gnb";
import { Navigation } from "@/components/navigation";
import { getCurrentUser, getWorkspaceList } from "@/server/queries/workspaces";
import { container, main } from "../template.css";
import { logout } from "./_lib/actions";
import { createProject, createWorkspace } from "./_lib/workspace-actions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, workspaces] = await Promise.all([
    getCurrentUser(),
    getWorkspaceList(),
  ]);

  return (
    <>
      <GNB
        hasWorkspace={workspaces.length > 0}
        logoutAction={logout}
        user={user}
      />
      <div className={container}>
        <Navigation
          createProjectAction={createProject}
          createWorkspaceAction={createWorkspace}
          currentUserId={user.id}
          workspaces={workspaces}
        />
        <main className={main}>{children}</main>
      </div>
    </>
  );
}
