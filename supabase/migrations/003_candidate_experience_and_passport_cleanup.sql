-- Client-approved candidate application update.
-- Passport copy upload is removed from the product.
-- Legacy experience text is preserved for manual review, while new numeric fields are introduced.

alter table public.candidate_applications
  add column if not exists indian_experience_years numeric,
  add column if not exists overseas_experience_years numeric;

alter table public.candidate_applications
  drop constraint if exists candidate_applications_indian_experience_non_negative,
  drop constraint if exists candidate_applications_overseas_experience_non_negative;

alter table public.candidate_applications
  add constraint candidate_applications_indian_experience_non_negative
    check (indian_experience_years is null or indian_experience_years >= 0),
  add constraint candidate_applications_overseas_experience_non_negative
    check (overseas_experience_years is null or overseas_experience_years >= 0);

update public.candidate_applications
set indian_experience_years = nullif(regexp_replace(experience_years, '[^0-9]', '', 'g'), '')::numeric
where indian_experience_years is null
  and experience_years is not null
  and experience_years ~ '[0-9]';

comment on column public.candidate_applications.experience_years is
  'Deprecated legacy text field. Review old records manually before dropping.';

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'candidate_applications'
      and column_name = 'passport_path'
  ) then
    comment on column public.candidate_applications.passport_path is
      'Deprecated. Passport copy upload was removed from the public Apply form.';
  end if;
end $$;
