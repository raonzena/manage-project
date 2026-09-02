create table users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  name text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table workspaces
  add column owner_id uuid references users(id);

create table workspace_members (
  workspace_id uuid not null references workspaces(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  role text not null,
  primary key (workspace_id, user_id),
  constraint workspace_members_role_check
    check (role in ('OWNER', 'ADMIN', 'MEMBER'))
);

alter table issues
  add column priority text,
  add column assignee_id uuid references users(id) on delete set null,
  add column reporter_id uuid references users(id) on delete set null;

create table comments (
  id uuid primary key default gen_random_uuid(),
  issue_id uuid not null references issues(id) on delete cascade,
  author_id uuid references users(id) on delete set null,
  body text not null check (length(trim(body)) > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table labels (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id) on delete cascade,
  name text not null check (length(trim(name)) > 0),
  color text not null,
  created_at timestamptz not null default now(),
  unique (workspace_id, name)
);

create table issue_labels (
  issue_id uuid not null references issues(id) on delete cascade,
  label_id uuid not null references labels(id) on delete cascade,
  primary key (issue_id, label_id)
);

create index workspace_members_user_id_idx on workspace_members(user_id);
create index issues_assignee_id_idx on issues(assignee_id);
create index issues_reporter_id_idx on issues(reporter_id);
create index comments_issue_id_created_at_idx on comments(issue_id, created_at);
create index issue_labels_label_id_idx on issue_labels(label_id);
