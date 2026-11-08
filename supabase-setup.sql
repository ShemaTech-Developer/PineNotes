-- PineNotes shared backend — run once in Supabase SQL Editor (free)
-- Table for notes (metadata only, files live in Storage)
create table if not exists public.notes (
  id text primary key,
  title text not null,
  subject text not null,
  author text not null,
  level text default '',
  tags text default '',
  description text default '',
  filename text not null,
  filesize text default '',
  mimetype text default '',
  storage_path text default '',
  public_url text default '',
  downloads int default 0,
  views int default 0,
  created_at date default current_date
);
alter table public.notes enable row level security;
drop policy if exists "public read notes" on public.notes;
drop policy if exists "public insert notes" on public.notes;
drop policy if exists "public update notes" on public.notes;
drop policy if exists "public delete notes" on public.notes;
create policy "public read notes" on public.notes for select using (true);
create policy "public insert notes" on public.notes for insert with check (true);
create policy "public update notes" on public.notes for update using (true) with check (true);
create policy "public delete notes" on public.notes for delete using (true);

-- Storage bucket for files (50 MB per file on free tier)
insert into storage.buckets (id, name, public) values ('notes','notes', true)
on conflict (id) do nothing;
-- Allow public upload/download to the bucket (anon key)
-- (If policies already exist, these are skipped harmlessly via drop+create)
drop policy if exists "public read files" on storage.objects;
drop policy if exists "public upload files" on storage.objects;
drop policy if exists "public update files" on storage.objects;
drop policy if exists "public delete files" on storage.objects;
create policy "public read files" on storage.objects for select using (bucket_id='notes');
create policy "public upload files" on storage.objects for insert with check (bucket_id='notes');
create policy "public update files" on storage.objects for update using (bucket_id='notes');
create policy "public delete files" on storage.objects for delete using (bucket_id='notes');
