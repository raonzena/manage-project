create table workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  created_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references workspaces(id),
  name text not null,
  created_at timestamptz not null default now()
);

create table issues (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id),
  title text not null,
  description text,
  status text not null default 'TODO',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);