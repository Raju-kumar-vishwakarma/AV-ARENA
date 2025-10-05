-- Fix: Restrict profile visibility to authenticated users only
-- This prevents public access to sensitive personal information

DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

CREATE POLICY "Profiles are viewable by authenticated users"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);