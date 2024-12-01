alter table "public"."profiles" enable row level security;

create policy "Enable users to access only their own data"
on "public"."profiles"
as permissive
for all
to authenticated
using ((( SELECT auth.uid() AS uid) = id));

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_profile()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$ BEGIN INSERT INTO public.profiles (id, email, first_name, last_name)
VALUES
  (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data ->> 'first_name',
    NEW.raw_user_meta_data ->> 'last_name'
  );
RETURN NEW;
END;
$function$
;
