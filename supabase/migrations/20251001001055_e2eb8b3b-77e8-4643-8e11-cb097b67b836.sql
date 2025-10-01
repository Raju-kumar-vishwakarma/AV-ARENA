-- Fix security issue: Restrict profile access to owner and admins only
-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Profiles are viewable by authenticated users" ON public.profiles;

-- Create a new restrictive policy that allows:
-- 1. Users to view their own profile
-- 2. Admins to view all profiles (for admin management)
CREATE POLICY "Users can view own profile, admins can view all"
ON public.profiles
FOR SELECT
USING (
  auth.uid() = id 
  OR has_role(auth.uid(), 'admin'::app_role)
);