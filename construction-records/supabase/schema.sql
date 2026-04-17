create table if not exists public.clients (
  id bigint primary key,
  name text not null,
  email text not null,
  phone text not null,
  address text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.projects (
  id bigint primary key,
  name text not null,
  client_id bigint not null references public.clients(id) on delete cascade,
  status text not null check (status in ('Planning', 'In Progress', 'Completed')),
  budget numeric(14, 2) not null default 0,
  spent numeric(14, 2) not null default 0,
  progress integer not null default 0 check (progress >= 0 and progress <= 100),
  start_date date not null,
  end_date date not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.expenses (
  id bigint primary key,
  project_id bigint not null references public.projects(id) on delete cascade,
  category text not null,
  description text not null,
  amount numeric(14, 2) not null default 0,
  date date not null,
  receipt boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.invoices (
  id text primary key,
  project_id bigint not null references public.projects(id) on delete cascade,
  client_id bigint not null references public.clients(id) on delete cascade,
  amount numeric(14, 2) not null default 0,
  status text not null check (status in ('Pending', 'Paid', 'Overdue')),
  issued_date date not null,
  due_date date not null,
  paid_date date null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists projects_client_id_idx on public.projects(client_id);
create index if not exists expenses_project_id_idx on public.expenses(project_id);
create index if not exists invoices_project_id_idx on public.invoices(project_id);
create index if not exists invoices_client_id_idx on public.invoices(client_id);

create table if not exists public.incomes (
  id bigint primary key,
  amount numeric(14, 2) not null default 0,
  date date not null,
  source text not null,
  notes text not null default '',
  allocated_to bigint null references public.projects(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists incomes_allocated_to_idx on public.incomes(allocated_to);

alter table public.clients enable row level security;
alter table public.projects enable row level security;
alter table public.expenses enable row level security;
alter table public.invoices enable row level security;
alter table public.incomes enable row level security;
