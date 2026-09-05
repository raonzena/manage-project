"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Select } from "@/design-system/ui";
import { CreateProjectDialog, CreateWorkspaceDialog, type WorkspaceAction } from "./create-dialogs";
import { isActiveMenu } from "./is-active-menu";
import {
  getNavigationSelection,
  issueViews,
  matchesIssueView,
  type NavigationWorkspace,
} from "./navigation-domain";
import * as styles from "./navigation.css";

export function WorkspaceNavigation({
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
  const [createDialog, setCreateDialog] = useState<"project" | "workspace" | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { project, workspace } = getNavigationSelection(
    workspaces,
    searchParams.get("workspace"),
    searchParams.get("project"),
  );

  if (!workspace || !project) return null;

  function updateSelection(nextWorkspaceId: string, nextProjectId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("workspace", nextWorkspaceId);
    params.set("project", nextProjectId);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleWorkspaceChange(nextWorkspaceId: string) {
    const nextWorkspace = workspaces.find(({ id }) => id === nextWorkspaceId);
    const nextProject = nextWorkspace?.projects[0];
    if (nextWorkspace && nextProject) updateSelection(nextWorkspace.id, nextProject.id);
  }

  function getViewHref(viewId: string) {
    const params = new URLSearchParams({
      workspace: workspace.id,
      project: project.id,
    });
    return `/issues/${viewId}?${params.toString()}`;
  }

  function handleProjectCreated(projectId: string) {
    setCreateDialog(null);
    updateSelection(workspace.id, projectId);
  }

  return (
    <div className={styles.hierarchy}>
      <Select
        label="Workspace"
        leading={
          <span className={styles.workspaceMark}>
            {workspace.name.slice(0, 2).toUpperCase()}
          </span>
        }
        onValueChange={handleWorkspaceChange}
        options={[
          ...workspaces.map((item) => ({ label: item.name, value: item.id })),
          { label: "+ Create workspace", value: "create-workspace", onSelect: () => setCreateDialog("workspace") },
        ]}
        tone="inverse"
        value={workspace.id}
      />

      <Select
        label="Project"
        leading={<span className={styles.projectMark} />}
        onValueChange={(projectId) =>
          updateSelection(workspace.id, projectId)
        }
        options={[
          ...workspace.projects.map((item) => ({ label: item.name, value: item.id })),
          { label: "+ Create project", value: "create-project", onSelect: () => setCreateDialog("project") },
        ]}
        tone="inverse"
        value={project.id}
      />

      <section
        className={styles.issueSection}
        aria-labelledby="issue-menu-heading"
      >
        <h2 className={styles.issueHeading} id="issue-menu-heading">
          Issues
        </h2>
        <ul className={styles.issueMenuList}>
          {issueViews.map((view) => {
            const count = project.issues.filter((issue) =>
              matchesIssueView(issue, view.id, currentUserId),
            ).length;
            const isActive = isActiveMenu(pathname, `/issues/${view.id}`);

            return (
              <li key={view.id}>
                <Link
                  className={`${styles.issueMenuLink} ${
                    isActive ? styles.issueMenuActive : ""
                  }`}
                  href={getViewHref(view.id)}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span>{view.label}</span>
                  <small className={styles.issueMenuCount}>{count}</small>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      {createDialog === "workspace" ? (
        <CreateWorkspaceDialog action={createWorkspaceAction} onClose={() => setCreateDialog(null)} open />
      ) : null}
      {createDialog === "project" ? (
        <CreateProjectDialog
          action={createProjectAction}
          onClose={() => setCreateDialog(null)}
          onCreated={handleProjectCreated}
          open
          workspaceId={workspace.id}
          workspaceName={workspace.name}
        />
      ) : null}
    </div>
  );
}
