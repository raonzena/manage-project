"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isActiveMenu } from "./is-active-menu";
import {
  issueViews,
  matchesIssueView,
} from "./navigation-domain";
import * as styles from "./navigation.css";
import ArrowDown from "@/assets/icons/arrow-down.svg";

type Workspace = {
  id: string;
  name: string;
  projects: Array<{ id: string; name: string; key: string; issues: Array<{ id: string; status: string; assignee_id: string | null; due_at: string | null }> }>;
};

export function WorkspaceNavigation({ currentUserId, workspaces }: { currentUserId: string; workspaces: Workspace[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const workspace = workspaces.find(({ id }) => id === searchParams.get("workspace")) ?? workspaces[0];
  const project = workspace?.projects.find(({ id }) => id === searchParams.get("project")) ?? workspace?.projects[0];

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

  return (
    <div className={styles.hierarchy}>
      <label className={styles.selector}>
        <span className={styles.selectorLabel}>Workspace</span>
        <span className={styles.selectorControl}>
          <span className={styles.workspaceMark} aria-hidden="true">
            {workspace.name.slice(0, 2).toUpperCase()}
          </span>
          <span className={styles.selectorValue}>
            <strong className={styles.selectorValueTitle}>
              {workspace.name}
            </strong>
          </span>
          <select
            className={styles.select}
            value={workspace.id}
            onChange={(event) => handleWorkspaceChange(event.target.value)}
          >
            {workspaces.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <span className={styles.selectorChevron} aria-hidden="true">
            <ArrowDown className={styles.selectorChevronIcon} />
          </span>
        </span>
      </label>

      <label className={styles.selector}>
        <span className={styles.selectorLabel}>Project</span>
        <span className={styles.selectorControl}>
          <span
            className={`${styles.projectMark} ${styles.green}`}
            aria-hidden="true"
          />
          <span className={styles.selectorValue}>
            <strong className={styles.selectorValueTitle}>
              {project.name}
            </strong>
          </span>
          <select
            className={styles.select}
            value={project.id}
            onChange={(event) =>
              updateSelection(workspace.id, event.target.value)
            }
          >
            {workspace.projects.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <span className={styles.selectorChevron} aria-hidden="true">
            <ArrowDown className={styles.selectorChevronIcon} />
          </span>
        </span>
      </label>

      <section
        className={styles.issueSection}
        aria-labelledby="issue-menu-heading"
      >
        <h2 className={styles.issueHeading} id="issue-menu-heading">
          Issues
        </h2>
        <ul className={styles.issueMenuList}>
          {issueViews.map((view) => {
            const count = project.issues.filter((issue) => matchesIssueView(issue, view.id, currentUserId)).length;
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
    </div>
  );
}
