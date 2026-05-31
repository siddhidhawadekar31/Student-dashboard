-- Run this in your Supabase SQL Editor to create and seed the courses table

create extension if not exists "uuid-ossp";

create table if not exists public.courses (
  id          uuid primary key default uuid_generate_v4(),
  title       text not null,
  progress    integer not null check (progress >= 0 and progress <= 100),
  icon_name   text not null,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security (RLS) and allow public read
alter table public.courses enable row level security;

create policy "Allow public read"
  on public.courses
  for select
  using (true);

-- Seed data
insert into public.courses (title, progress, icon_name) values
  ('Advanced React Patterns',        75, 'code-2'),
  ('System Design Fundamentals',     42, 'layers'),
  ('TypeScript Deep Dive',           90, 'file-code'),
  ('Database Engineering & SQL',     28, 'database');
