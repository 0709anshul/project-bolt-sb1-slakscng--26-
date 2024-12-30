/*
  # Add test user

  1. Changes
    - Insert test user into auth.users
    - Add corresponding entry in public.users table
  2. Security
    - User will have admin role
*/

-- Insert test user into auth.users
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  role
) VALUES (
  'test-user-id',
  'test@leumas.com',
  crypt('test123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  now(),
  now(),
  'authenticated'
);

-- Add corresponding entry in public.users
INSERT INTO public.users (
  id,
  full_name,
  organization_id,
  role_id
) VALUES (
  'test-user-id',
  'Test User',
  (SELECT id FROM organizations WHERE name = 'Leumas'),
  (SELECT id FROM roles WHERE name = 'admin')
);