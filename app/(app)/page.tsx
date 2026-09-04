import { Badge } from "@/design-system/ui";
import { getIssueList } from "@/server/queries/issues";
import { getCurrentUser, getWorkspaceList } from "@/server/queries/workspaces";
import Link from "next/link";
import { OnboardingForm } from "./_onboarding/OnboardingForm";
import { TaskCard } from "./_dashboard/TaskCard";
import {
  formatDue,
  formatRelativeDate,
  formatToday,
  getInitials,
} from "./_dashboard/formatters";
import * as styles from "./page.css";

const statusMeta: Record<
  string,
  { label: string; tone: "neutral" | "info" | "warning" | "success" }
> = {
  TODO: { label: "할 일", tone: "neutral" },
  IN_PROGRESS: { label: "진행 중", tone: "info" },
  REVIEW: { label: "검토", tone: "warning" },
  DONE: { label: "완료", tone: "success" },
};

export default async function DashboardPage() {
  const [workspaces, user] = await Promise.all([
    getWorkspaceList(),
    getCurrentUser(),
  ]);
  if (workspaces.length === 0)
    return (
      <div className={styles.onboardingContainer}>
        <p className={styles.kicker}>Get started</p>
        <h1 className={styles.onboardingTitle}>
          팀의 첫 작업 공간을 만들어 보세요.
        </h1>
        <p className={styles.onboardingDescription}>
          워크스페이스와 첫 프로젝트를 만들면 이슈를 정리하고 팀의 진행 상황을
          한곳에서 볼 수 있습니다.
        </p>
        <OnboardingForm />
      </div>
    );

  const issues = await getIssueList();
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  weekStart.setHours(0, 0, 0, 0);
  const dueBoundary = new Date(now);
  dueBoundary.setDate(now.getDate() + 7);
  const active = issues.filter(({ status }) => status === "IN_PROGRESS");
  const dueSoon = issues.filter(
    ({ due_at, status }) =>
      status !== "DONE" &&
      due_at &&
      new Date(`${due_at}T23:59:59`) >= now &&
      new Date(`${due_at}T23:59:59`) <= dueBoundary,
  );
  const completed = issues.filter(
    ({ status, updated_at }) =>
      status === "DONE" && new Date(updated_at) >= weekStart,
  );
  const firstProject = workspaces[0].projects[0];
  const mine = firstProject
    ? issues.filter(
        ({ assignee_id, project_id }) =>
          assignee_id === user.id && project_id === firstProject.id,
      )
    : [];
  const recent = [...issues]
    .sort((a, b) => b.updated_at.localeCompare(a.updated_at))
    .slice(0, 3);
  const allMineHref = firstProject
    ? `/issues/mine?workspace=${workspaces[0].id}&project=${firstProject.id}`
    : "/issues/mine";

  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>{formatToday(now)}</p>
          <h1 className={styles.pageTitle}>
            오늘의 업무를 확인하세요, {user.name}님.
          </h1>
          <p className={styles.pageDescription}>
            진행 중인 작업과 가까운 마감일을 한눈에 확인할 수 있습니다.
          </p>
        </div>
      </header>
      <section className={styles.stats} aria-label="업무 현황">
        <TaskCard
          title="진행 중인 이슈"
          taskCount={active.length}
          trend={`${issues.length}건 중`}
          note="현재 작업 중"
          theme="active"
        />
        <TaskCard
          title="마감 임박"
          taskCount={dueSoon.length}
          trend="7일 이내"
          note="완료되지 않은 이슈"
          theme="dueSoon"
        />
        <TaskCard
          title="이번 주 완료"
          taskCount={completed.length}
          trend="이번 주"
          note="완료 처리된 이슈"
          theme="completed"
        />
      </section>
      <div className={styles.dashboardGrid}>
        <section className={styles.issuePanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>My queue</p>
              <h2 className={styles.sectionTitle}>
                내가 맡은 이슈{firstProject ? ` · ${firstProject.name}` : ""}
              </h2>
            </div>
            <Link className={styles.sectionLink} href={allMineHref}>
              전체 {mine.length}개 보기 →
            </Link>
          </div>
          <div className={styles.issueLabels} aria-hidden="true">
            <span>이슈</span>
            <span>상태</span>
            <span>담당</span>
            <span>마감</span>
          </div>
          {mine.length ? (
            <ul className={styles.issueList}>
              {mine.slice(0, 5).map((issue) => {
                const project = Array.isArray(issue.project)
                  ? issue.project[0]
                  : issue.project;
                const assignee = Array.isArray(issue.assignee)
                  ? issue.assignee[0]
                  : issue.assignee;
                const meta = statusMeta[issue.status] ?? statusMeta.TODO;
                return (
                  <li className={styles.issueRow} key={issue.id}>
                    <div className={styles.issueTitle}>
                      <code className={styles.issueKey}>
                        {project.key}-{issue.number}
                      </code>
                      <span>
                        <b className={styles.issueName}>{issue.title}</b>
                        <small className={styles.issueProject}>
                          {project.name}
                        </small>
                      </span>
                    </div>
                    <Badge className={styles.mobileSecondary} tone={meta.tone}>
                      {meta.label}
                    </Badge>
                    <span
                      className={styles.owner}
                      aria-label={`담당자 ${assignee?.name ?? "미지정"}`}
                    >
                      {getInitials(assignee?.name)}
                    </span>
                    <time
                      className={styles.issueDue}
                      dateTime={issue.due_at ?? undefined}
                    >
                      {formatDue(issue.due_at)}
                    </time>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className={styles.emptyState}>
              <strong>담당 중인 이슈가 없습니다.</strong>
              <p className={styles.emptyDescription}>
                프로젝트에서 이슈를 할당하면 여기에 표시됩니다.
              </p>
            </div>
          )}
        </section>
        <aside className={styles.focusPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Recent updates</p>
              <h2 className={`${styles.sectionTitle} ${styles.inverseTitle}`}>
                최근 변경된 이슈
              </h2>
            </div>
          </div>
          {recent.length ? (
            <ul className={styles.activity}>
              {recent.map((issue) => {
                const project = Array.isArray(issue.project)
                  ? issue.project[0]
                  : issue.project;
                const meta = statusMeta[issue.status] ?? statusMeta.TODO;
                return (
                  <li className={styles.activityItem} key={issue.id}>
                    <time className={styles.activityTime}>
                      {formatRelativeDate(issue.updated_at, now)}
                    </time>
                    <p className={styles.activityText}>
                      <code className={styles.activityIssue}>
                        {project.key}-{issue.number}
                      </code>{" "}
                      <b className={styles.activityAuthor}>{issue.title}</b> ·{" "}
                      {meta.label}
                    </p>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles.activityEmpty}>아직 등록된 이슈가 없습니다.</p>
          )}
        </aside>
      </div>
    </div>
  );
}
