# Kanban Task Board

A clean, minimal Kanban-style task board built with React, TypeScript, and Supabase. Drag tasks across columns, set priorities and due dates, and manage your work visually — all with zero sign-up required.

**[Live Demo] (https://kanban-board-theta-lemon.vercel.app)**

---

## Features

- **Drag and drop** — move tasks between columns with smooth animations
- **Guest accounts** — anonymous auth via Supabase, no sign-up needed
- **Task management** — create, edit, and delete tasks with title, description, priority, and due date
- **Due date indicators** — overdue tasks highlight in red, tasks due within 2 days in amber
- **Board stats** — live task count and completion count in the header
- **Private by default** — Row Level Security ensures each user only sees their own tasks

## Tech Stack

- **Frontend** — React, TypeScript, Vite, Tailwind CSS
- **Database & Auth** — Supabase (PostgreSQL + anonymous auth + RLS)
- **Drag and Drop** — @dnd-kit
- **Deployment** — Vercel

## Local Setup

**1. Clone the repo**
```bash
git clone https://github.com/avneetkaur17/kanban_board.git
cd kanban_board
```

**2. Install dependencies**
```bash
npm install
```

**3. Create a `.env` file in the project root**
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**4. Set up Supabase**

Run this SQL in your Supabase SQL Editor:

```sql
create extension if not exists "uuid-ossp";

create table public.tasks (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  description text,
  status      text not null default 'todo'
                check (status in ('todo','in_progress','in_review','done')),
  priority    text not null default 'normal'
                check (priority in ('low','normal','high')),
  due_date    date,
  user_id     uuid references auth.users(id) on delete cascade not null,
  created_at  timestamptz default now() not null
);

alter table public.tasks enable row level security;

create policy "Users can only access their own tasks"
  on public.tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

grant usage on schema public to anon, authenticated;
grant all on public.tasks to anon, authenticated;
```

Then go to **Authentication → Providers → Anonymous** and toggle it ON.

**5. Start the dev server**
```bash
npm run dev
```

Open [http://localhost:5173]