-- ==============================================================
-- YT Data Stores - Supabase Database Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================

-- 1. Create Profiles Table (Linked to auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS) on Profiles
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Automatically create profile on auth signup trigger
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to invoke handle_new_user
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 3. YouTube Stores Table (Upcoming Feature)
create table if not exists public.youtube_stores (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  channel_id text not null,
  channel_title text not null,
  description text,
  custom_url text,
  subscriber_count bigint default 0,
  video_count bigint default 0,
  view_count bigint default 0,
  thumbnail_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on youtube_stores
alter table public.youtube_stores enable row level security;

-- Policies for youtube_stores
create policy "Users can view their own stores"
  on public.youtube_stores for select
  using (auth.uid() = user_id);

create policy "Users can insert their own stores"
  on public.youtube_stores for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own stores"
  on public.youtube_stores for update
  using (auth.uid() = user_id);

create policy "Users can delete their own stores"
  on public.youtube_stores for delete
  using (auth.uid() = user_id);
