-- ==============================================================
-- YT Data Stores - Supabase Database Schema
-- SAFE TO RE-RUN: Will NOT delete or drop existing tables/data!
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================

-- 1. Create Profiles Table (Linked to auth.users)
-- (IF NOT EXISTS prevents deleting any existing users/profiles)
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

-- Policies for profiles (Safely recreate policies without error)
drop policy if exists "Users can view their own profile" on public.profiles;
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
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

-- 3. YouTube Channels Table (Multi-channel support per user/email)
create table if not exists public.youtube_channels (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  channel_id text not null,
  channel_title text not null,
  description text,
  custom_url text,
  thumbnail_url text,
  subscriber_count bigint default 0,
  video_count bigint default 0,
  view_count bigint default 0,
  is_selected boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, channel_id)
);

-- Enable RLS on youtube_channels
alter table public.youtube_channels enable row level security;

-- Policies for youtube_channels
drop policy if exists "Users can view their own channels" on public.youtube_channels;
create policy "Users can view their own channels"
  on public.youtube_channels for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own channels" on public.youtube_channels;
create policy "Users can insert their own channels"
  on public.youtube_channels for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own channels" on public.youtube_channels;
create policy "Users can update their own channels"
  on public.youtube_channels for update
  using (auth.uid() = user_id);

drop policy if exists "Users can delete their own channels" on public.youtube_channels;
create policy "Users can delete their own channels"
  on public.youtube_channels for delete
  using (auth.uid() = user_id);

-- 4. YouTube OAuth Tokens Table (Store Refresh Tokens securely per user)
create table if not exists public.youtube_tokens (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null unique,
  access_token text not null,
  refresh_token text not null,
  expiry_date bigint,
  scope text,
  token_type text default 'Bearer',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on youtube_tokens
alter table public.youtube_tokens enable row level security;

drop policy if exists "Users can view their own tokens" on public.youtube_tokens;
create policy "Users can view their own tokens"
  on public.youtube_tokens for select
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own tokens" on public.youtube_tokens;
create policy "Users can insert their own tokens"
  on public.youtube_tokens for insert
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own tokens" on public.youtube_tokens;
create policy "Users can update their own tokens"
  on public.youtube_tokens for update
  using (auth.uid() = user_id);
