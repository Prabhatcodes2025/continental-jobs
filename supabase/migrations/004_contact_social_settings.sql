-- Move PRO / Manager contact values to Corporate Office and add editable social settings.

alter table public.contact_settings
  add column if not exists corporate_pro_number text,
  add column if not exists corporate_manager_number text;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public' and table_name = 'contact_settings' and column_name = 'operations_pro_number'
  ) then
    update public.contact_settings
    set
      corporate_pro_number = coalesce(corporate_pro_number, operations_pro_number),
      corporate_manager_number = coalesce(corporate_manager_number, operations_manager_number)
    where corporate_pro_number is null
       or corporate_manager_number is null;
  end if;
end $$;

insert into public.site_settings (key, value) values
('social_links', '{"facebook_url":"","instagram_url":"","youtube_url":"","linkedin_url":"","twitter_url":""}'::jsonb)
on conflict (key) do update set value = public.site_settings.value || excluded.value;
