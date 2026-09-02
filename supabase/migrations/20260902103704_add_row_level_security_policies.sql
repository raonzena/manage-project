create schema if not exists private;

create function private.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = (select auth.uid())
  );
$$;

create function private.is_workspace_user(
  target_workspace_id uuid,
  target_user_id uuid
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = target_user_id
  );
$$;

create function private.is_workspace_owner(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspaces
    where id = target_workspace_id
      and owner_id = (select auth.uid())
  );
$$;

create function private.has_workspace_role(
  target_workspace_id uuid,
  allowed_roles text[]
)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.workspace_members
    where workspace_id = target_workspace_id
      and user_id = (select auth.uid())
      and role = any(allowed_roles)
  );
$$;

create function private.can_view_user(target_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    target_user_id = (select auth.uid())
    or exists (
      select 1
      from public.workspace_members as current_member
      join public.workspace_members as target_member
        on target_member.workspace_id = current_member.workspace_id
      where current_member.user_id = (select auth.uid())
        and target_member.user_id = target_user_id
    );
$$;

create function private.issue_workspace_id(target_issue_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select projects.workspace_id
  from public.issues
  join public.projects on projects.id = issues.project_id
  where issues.id = target_issue_id;
$$;

create function private.project_workspace_id(target_project_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select workspace_id
  from public.projects
  where id = target_project_id;
$$;

revoke all on schema private from public;
revoke execute on all functions in schema private from public;

grant usage on schema private to authenticated;
grant execute on function private.is_workspace_member(uuid) to authenticated;
grant execute on function private.is_workspace_user(uuid, uuid) to authenticated;
grant execute on function private.is_workspace_owner(uuid) to authenticated;
grant execute on function private.has_workspace_role(uuid, text[]) to authenticated;
grant execute on function private.can_view_user(uuid) to authenticated;
grant execute on function private.issue_workspace_id(uuid) to authenticated;
grant execute on function private.project_workspace_id(uuid) to authenticated;

alter table users enable row level security;
alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table projects enable row level security;
alter table issues enable row level security;
alter table comments enable row level security;
alter table labels enable row level security;
alter table issue_labels enable row level security;

revoke all on table users from anon, authenticated;
revoke all on table workspaces from anon, authenticated;
revoke all on table workspace_members from anon, authenticated;
revoke all on table projects from anon, authenticated;
revoke all on table issues from anon, authenticated;
revoke all on table comments from anon, authenticated;
revoke all on table labels from anon, authenticated;
revoke all on table issue_labels from anon, authenticated;

grant select, insert on table users to authenticated;
grant update (name, avatar_url) on table users to authenticated;

grant select, insert, delete on table workspaces to authenticated;
grant update (name, slug) on table workspaces to authenticated;

grant select, insert, delete on table workspace_members to authenticated;
grant update (role) on table workspace_members to authenticated;

grant select, insert, delete on table projects to authenticated;
grant update (name) on table projects to authenticated;

grant select, insert, delete on table issues to authenticated;
grant update (title, description, status, priority, assignee_id) on table issues
  to authenticated;

grant select, insert, delete on table comments to authenticated;
grant update (body) on table comments to authenticated;

grant select, insert, delete on table labels to authenticated;
grant update (name, color) on table labels to authenticated;

grant select, insert, delete on table issue_labels to authenticated;

create policy "workspace users can view profiles"
on users
for select
to authenticated
using (private.can_view_user(id));

create policy "users can create their own profile"
on users
for insert
to authenticated
with check (id = (select auth.uid()));

create policy "users can update their own profile"
on users
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()));

create policy "members can view workspaces"
on workspaces
for select
to authenticated
using (
  owner_id = (select auth.uid())
  or private.is_workspace_member(id)
);

create policy "users can create owned workspaces"
on workspaces
for insert
to authenticated
with check (owner_id = (select auth.uid()));

create policy "workspace managers can update workspaces"
on workspaces
for update
to authenticated
using (private.has_workspace_role(id, array['OWNER', 'ADMIN']))
with check (private.has_workspace_role(id, array['OWNER', 'ADMIN']));

create policy "owners can delete workspaces"
on workspaces
for delete
to authenticated
using (owner_id = (select auth.uid()));

create policy "members can view workspace memberships"
on workspace_members
for select
to authenticated
using (
  private.is_workspace_owner(workspace_id)
  or private.is_workspace_member(workspace_id)
);

create policy "workspace managers can add memberships"
on workspace_members
for insert
to authenticated
with check (
  (
    role = 'OWNER'
    and user_id = (select auth.uid())
    and private.is_workspace_owner(workspace_id)
  )
  or (
    role in ('ADMIN', 'MEMBER')
    and (
      private.is_workspace_owner(workspace_id)
      or private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN'])
    )
  )
);

create policy "workspace managers can update non-owner memberships"
on workspace_members
for update
to authenticated
using (
  role <> 'OWNER'
  and (
    private.is_workspace_owner(workspace_id)
    or private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN'])
  )
)
with check (
  role in ('ADMIN', 'MEMBER')
  and (
    private.is_workspace_owner(workspace_id)
    or private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN'])
  )
);

create policy "workspace managers can remove non-owner memberships"
on workspace_members
for delete
to authenticated
using (
  role <> 'OWNER'
  and (
    private.is_workspace_owner(workspace_id)
    or private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN'])
  )
);

create policy "members can view projects"
on projects
for select
to authenticated
using (private.is_workspace_member(workspace_id));

create policy "members can create projects"
on projects
for insert
to authenticated
with check (private.is_workspace_member(workspace_id));

create policy "members can update projects"
on projects
for update
to authenticated
using (private.is_workspace_member(workspace_id))
with check (private.is_workspace_member(workspace_id));

create policy "workspace managers can delete projects"
on projects
for delete
to authenticated
using (private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN']));

create policy "members can view issues"
on issues
for select
to authenticated
using (private.is_workspace_member(private.issue_workspace_id(id)));

create policy "members can create issues"
on issues
for insert
to authenticated
with check (
  reporter_id = (select auth.uid())
  and private.is_workspace_member(private.project_workspace_id(project_id))
  and (
    assignee_id is null
    or private.is_workspace_user(
      private.project_workspace_id(project_id),
      assignee_id
    )
  )
);

create policy "members can update issues"
on issues
for update
to authenticated
using (private.is_workspace_member(private.issue_workspace_id(id)))
with check (
  private.is_workspace_member(private.issue_workspace_id(id))
  and (
    assignee_id is null
    or private.is_workspace_user(private.issue_workspace_id(id), assignee_id)
  )
);

create policy "reporters and workspace managers can delete issues"
on issues
for delete
to authenticated
using (
  reporter_id = (select auth.uid())
  or private.has_workspace_role(
    private.issue_workspace_id(id),
    array['OWNER', 'ADMIN']
  )
);

create policy "members can view comments"
on comments
for select
to authenticated
using (private.is_workspace_member(private.issue_workspace_id(issue_id)));

create policy "members can create comments"
on comments
for insert
to authenticated
with check (
  author_id = (select auth.uid())
  and private.is_workspace_member(private.issue_workspace_id(issue_id))
);

create policy "authors can update comments"
on comments
for update
to authenticated
using (author_id = (select auth.uid()))
with check (
  author_id = (select auth.uid())
  and private.is_workspace_member(private.issue_workspace_id(issue_id))
);

create policy "authors and workspace managers can delete comments"
on comments
for delete
to authenticated
using (
  author_id = (select auth.uid())
  or private.has_workspace_role(
    private.issue_workspace_id(issue_id),
    array['OWNER', 'ADMIN']
  )
);

create policy "members can view labels"
on labels
for select
to authenticated
using (private.is_workspace_member(workspace_id));

create policy "workspace managers can create labels"
on labels
for insert
to authenticated
with check (private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN']));

create policy "workspace managers can update labels"
on labels
for update
to authenticated
using (private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN']))
with check (private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN']));

create policy "workspace managers can delete labels"
on labels
for delete
to authenticated
using (private.has_workspace_role(workspace_id, array['OWNER', 'ADMIN']));

create policy "members can view issue labels"
on issue_labels
for select
to authenticated
using (private.is_workspace_member(private.issue_workspace_id(issue_id)));

create policy "members can attach labels to issues"
on issue_labels
for insert
to authenticated
with check (
  private.is_workspace_member(private.issue_workspace_id(issue_id))
  and exists (
    select 1
    from public.labels
    where labels.id = issue_labels.label_id
      and labels.workspace_id = private.issue_workspace_id(issue_id)
  )
);

create policy "members can detach labels from issues"
on issue_labels
for delete
to authenticated
using (private.is_workspace_member(private.issue_workspace_id(issue_id)));
