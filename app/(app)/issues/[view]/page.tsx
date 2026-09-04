import { Badge } from "@/design-system/ui";
import {
  getIssueView,
  issueViews,
  matchesIssueView,
} from "@/components/navigation/navigation-domain";
import { getIssueList } from "@/server/queries/issues";
import { getCurrentUser, getWorkspaceList } from "@/server/queries/workspaces";
import { notFound } from "next/navigation";
import * as styles from "./issue-list.css";

const statusMeta: Record<
  string,
  { label: string; tone: "neutral" | "info" | "warning" | "success" }
> = {
  TODO: { label: "할 일", tone: "neutral" },
  IN_PROGRESS: { label: "진행 중", tone: "info" },
  REVIEW: { label: "검토", tone: "warning" },
  DONE: { label: "완료", tone: "success" },
};

export function generateStaticParams() {
  return issueViews.map(({ id }) => ({ view: id }));
}

export default async function IssueListPage({
  params,
  searchParams,
}: {
  params: Promise<{ view: string }>;
  searchParams: Promise<{
    project?: string | string[];
    workspace?: string | string[];
  }>;
}) {
  const [{ view: viewId }, query, workspaces, user] = await Promise.all([
    params,
    searchParams,
    getWorkspaceList(),
    getCurrentUser(),
  ]);
  const view = getIssueView(viewId);

  if (!view) {
    notFound();
  }

  const workspace =
    workspaces.find(({ id }) => id === getQueryValue(query.workspace)) ??
    workspaces[0];
  const project =
    workspace?.projects.find(({ id }) => id === getQueryValue(query.project)) ??
    workspace?.projects[0];
  if (!workspace || !project) notFound();
  const issues = (await getIssueList(project.id)).filter((issue) =>
    matchesIssueView(issue, view.id, user.id),
  );

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.context}>
            {workspace.name} / {project.name}
          </p>
          <h1 className={styles.pageTitle}>{view.label}</h1>
          <p className={styles.pageDescription}>{view.description}</p>
        </div>
        <strong className={styles.issueTotal}>
          <span className={styles.issueTotalCount}>{issues.length}</span>
          issues
        </strong>
      </header>

      <section className={styles.panel} aria-label={`${view.label} 목록`}>
        <div className={styles.columnLabels} aria-hidden="true">
          <span>이슈</span>
          <span>상태</span>
          <span>담당</span>
          <span>마감</span>
        </div>

        {issues.length > 0 ? (
          <ul className={styles.issueList}>
            {issues.map((issue) => (
              <li className={styles.issueRow} key={issue.id}>
                <div className={styles.issueIdentity}>
                  <code className={styles.issueKey}>
                    {project.key}-{issue.number}
                  </code>
                  <strong className={styles.issueTitle}>{issue.title}</strong>
                </div>
                <Badge
                  className={styles.status}
                  tone={(statusMeta[issue.status] ?? statusMeta.TODO).tone}
                >
                  {(statusMeta[issue.status] ?? statusMeta.TODO).label}
                </Badge>
                <span
                  className={styles.owner}
                  aria-label={`담당자 ${getAssigneeName(issue.assignee)}`}
                >
                  {getAssigneeName(issue.assignee).slice(0, 2)}
                </span>
                <time
                  className={styles.due}
                  dateTime={issue.due_at ?? undefined}
                >
                  {formatDue(issue.due_at)}
                </time>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.emptyState}>
            <strong>해당하는 이슈가 없습니다.</strong>
            <p className={styles.emptyDescription}>
              다른 프로젝트나 이슈 메뉴를 선택해 보세요.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function getQueryValue(value?: string | string[]) {
  return Array.isArray(value) ? value[0] : value;
}

function getAssigneeName(
  assignee: { name: string } | { name: string }[] | null,
) {
  const value = Array.isArray(assignee) ? assignee[0] : assignee;
  return value?.name ?? "미지정";
}

function formatDue(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("ko-KR", {
        month: "short",
        day: "numeric",
      }).format(new Date(`${value}T00:00:00`))
    : "미정";
}
