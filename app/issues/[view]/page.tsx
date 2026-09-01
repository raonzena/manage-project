import { Badge } from "@/design-system/ui";
import {
  filterIssues,
  getIssueView,
  getSelection,
  issueViews,
  type IssueStatus,
} from "@/components/navigation/navigation-data";
import { notFound } from "next/navigation";
import * as styles from "./issue-list.css";

const statusTone: Record<IssueStatus, "neutral" | "info" | "warning"> = {
  "할 일": "neutral",
  "진행 중": "info",
  검토: "warning",
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
  const [{ view: viewId }, query] = await Promise.all([params, searchParams]);
  const view = getIssueView(viewId);

  if (!view) {
    notFound();
  }

  const { project, workspace } = getSelection(
    getQueryValue(query.workspace),
    getQueryValue(query.project),
  );
  const issues = filterIssues(project.issues, view.id);

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
                  <code className={styles.issueKey}>{issue.key}</code>
                  <strong className={styles.issueTitle}>{issue.title}</strong>
                </div>
                <Badge
                  className={styles.status}
                  tone={statusTone[issue.status]}
                >
                  {issue.status}
                </Badge>
                <span
                  className={styles.owner}
                  aria-label={`담당자 ${issue.owner}`}
                >
                  {issue.owner}
                </span>
                <time className={styles.due}>{issue.due}</time>
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
