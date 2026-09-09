alter table public.declarations
  add column if not exists type text not null default 'love',
  add column if not exists color text not null default 'pink',
  add column if not exists effect text not null default 'none';
