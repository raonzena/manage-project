import { getCurrentUser, getWorkspaceList } from "@/server/queries/workspaces";
import { getNavigationSelection } from "@/components/navigation/navigation-domain";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { IssueForm } from "./_components/issue-form";
import * as styles from "./_components/issue-form.css";

export default async function NewIssuePage({
  searchParams,
}: {
  searchParams: Promise<{ workspace?: string; project?: string }>;
}) {
  const [query, workspaces, user] = await Promise.all([
    searchParams,
    getWorkspaceList(),
    getCurrentUser(),
  ]);
  const { workspace, project } = getNavigationSelection(
    workspaces,
    query.workspace,
    query.project,
  );
  if (!workspace || !project) redirect("/");
  const supabase = await createClient();
  const { data: memberships, error } = await supabase
    .from("workspace_members")
    .select("user_id, user:users!inner(id, name)")
    .eq("workspace_id", workspace.id);
  if (error) throw error;
  const members = memberships.flatMap(({ user }) =>
    Array.isArray(user) ? user : [user],
  );
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <p className={styles.eyebrow}>CREATE ISSUE</p>
        <h1 className={styles.title}>새 이슈</h1>
        <p className={styles.description}>
          문제와 완료 조건을 명확히 적어주세요.
        </p>
      </header>
      <IssueForm
        key={`${workspace.id}:${project.id}`}
        projects={workspace.projects}
        members={members}
        initialProjectId={project.id}
        currentUserId={user.id}
        workspaceId={workspace.id}
      />
    </div>
  );
}
