"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { isActiveMenu } from "./is-active-menu";
import {
  filterIssues,
  getSelection,
  issueViews,
  workspaces,
  type ProjectTone,
} from "./navigation-data";
import * as styles from "./navigation.css";
import ArrowDown from "@/assets/icons/arrow-down.svg";

const projectToneClassName: Record<ProjectTone, string> = {
  blue: styles.blue,
  green: styles.green,
  orange: styles.orange,
};

export function WorkspaceNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { project, workspace } = getSelection(
    searchParams.get("workspace") ?? undefined,
    searchParams.get("project") ?? undefined,
  );

  function updateSelection(nextWorkspaceId: string, nextProjectId: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("workspace", nextWorkspaceId);
    params.set("project", nextProjectId);
    router.replace(`${pathname}?${params.toString()}`);
  }

  function handleWorkspaceChange(nextWorkspaceId: string) {
    const nextSelection = getSelection(nextWorkspaceId);
    updateSelection(nextSelection.workspace.id, nextSelection.project.id);
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
            {workspace.mark}
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
            className={`${styles.projectMark} ${projectToneClassName[project.tone]}`}
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
            const count = filterIssues(project.issues, view.id).length;
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
