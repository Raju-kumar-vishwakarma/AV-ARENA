-- Add new columns to profiles table for additional user information
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone_no text,
ADD COLUMN IF NOT EXISTS date_of_birth date,
ADD COLUMN IF NOT EXISTS team_members text[];

-- Add comment for clarity
COMMENT ON COLUMN public.profiles.team_members IS 'Array of team member names';