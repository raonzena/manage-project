import { getWorkspaceList } from "@/server/queries/workspaces";

export default async function WorkspacesPage() {
  const workspaces = await getWorkspaceList();

  return (
    <ul>
      {workspaces.map((workspace) => (
        <li key={workspace.id}>{workspace.name}</li>
      ))}
    </ul>
  );
}
