import { Badge, Button } from "@/components/ui";
import { getWorkspaceList } from "@/server/queries/workspaces";
import { TaskCard } from "./_dashboard/TaskCard";
import * as styles from "./page.css";

const issues = [
  {
    key: "MOB-142",
    title: "로그인 이후 딥링크 경로가 초기화되는 문제",
    project: "모바일 리뉴얼",
    status: "진행 중",
    tone: "info" as const,
    owner: "SY",
    due: "오늘",
  },
  {
    key: "PAY-87",
    title: "정기 결제 실패 재시도 정책 반영",
    project: "결제 시스템",
    status: "검토",
    tone: "warning" as const,
    owner: "MK",
    due: "9월 2일",
  },
  {
    key: "WEB-31",
    title: "채용 페이지 모바일 레이아웃 점검",
    project: "브랜드 사이트",
    status: "할 일",
    tone: "neutral" as const,
    owner: "HJ",
    due: "9월 4일",
  },
  {
    key: "MOB-139",
    title: "푸시 알림 설정 화면 접근성 개선",
    project: "모바일 리뉴얼",
    status: "완료",
    tone: "success" as const,
    owner: "SH",
    due: "완료",
  },
];

export default async function WorkspacesPage() {
  const workspaces = await getWorkspaceList();
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <div>
          <p className={styles.eyebrow}>2026년 8월 31일 · 월요일</p>
          <h1 className={styles.pageTitle}>좋은 아침이에요, 설화님.</h1>
          <p className={styles.pageDescription}>
            오늘 팀이 집중할 작업과 막힌 지점을 확인하세요.
          </p>
        </div>
        <Button className={styles.reportButton} tone="secondary">
          주간 보고서 보기
        </Button>
      </header>
      <section className={styles.stats} aria-label="업무 현황">
        <TaskCard
          title="진행 중인 이슈"
          taskCount={18}
          trend="+3"
          note="지난주보다 증가"
          theme="active"
        />
        <TaskCard
          title="마감 임박"
          taskCount={4}
          trend="2건"
          note="오늘 마감"
          theme="dueSoon"
        />
        <TaskCard
          title="이번 주 완료"
          taskCount={27}
          trend="+12%"
          note="완료 속도 상승"
          theme="completed"
        />
      </section>
      <div className={styles.dashboardGrid}>
        <section className={styles.issuePanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>My queue</p>
              <h2 className={styles.sectionTitle}>내가 맡은 이슈</h2>
            </div>
            <a className={styles.sectionLink} href="/tasks">
              전체 8개 보기 →
            </a>
          </div>
          <div className={styles.issueLabels} aria-hidden="true">
            <span>이슈</span>
            <span>상태</span>
            <span>담당</span>
            <span>마감</span>
          </div>
          <ul className={styles.issueList}>
            {issues.map((issue) => (
              <li className={styles.issueRow} key={issue.key}>
                <div className={styles.issueTitle}>
                  <code className={styles.issueKey}>{issue.key}</code>
                  <span>
                    <b className={styles.issueName}>{issue.title}</b>
                    <small className={styles.issueProject}>
                      {issue.project}
                    </small>
                  </span>
                </div>
                <Badge className={styles.mobileSecondary} tone={issue.tone}>
                  {issue.status}
                </Badge>
                <span className={styles.owner}>{issue.owner}</span>
                <time className={styles.issueDue}>{issue.due}</time>
              </li>
            ))}
          </ul>
        </section>
        <aside className={styles.focusPanel}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.kicker}>Team pulse</p>
              <h2 className={`${styles.sectionTitle} ${styles.inverseTitle}`}>
                이번 주 흐름
              </h2>
            </div>
          </div>
          <div className={styles.progressMeta}>
            <span>완료한 이슈</span>
            <strong className={styles.progressValue}>27 / 36</strong>
          </div>
          <div className={styles.rail} aria-label="이번 주 이슈 진행률 75%">
            <span className={styles.railValue} />
          </div>
          <ul className={styles.activity}>
            <li className={styles.activityItem}>
              <span className={styles.activityTime}>11:40</span>
              <p className={styles.activityText}>
                <b className={styles.activityAuthor}>민규</b>님이{" "}
                <code className={styles.activityIssue}>PAY-87</code>을 검토로
                옮겼어요.
              </p>
            </li>
            <li className={styles.activityItem}>
              <span className={styles.activityTime}>10:15</span>
              <p className={styles.activityText}>
                <b className={styles.activityAuthor}>서연</b>님이{" "}
                <code className={styles.activityIssue}>MOB-142</code>에 댓글을
                남겼어요.
              </p>
            </li>
            <li className={styles.activityItem}>
              <span className={styles.activityTime}>어제</span>
              <p className={styles.activityText}>
                <b className={styles.activityAuthor}>희진</b>님이 브랜드 사이트
                마일스톤을 완료했어요.
              </p>
            </li>
          </ul>
        </aside>
      </div>
      {workspaces.length > 0 && (
        <p className={styles.workspaceNote}>
          연결된 워크스페이스 {workspaces.length}개
        </p>
      )}
    </div>
  );
}
