/*
  # Fix Task-User Relationship

  1. Changes
    - Make owner_id nullable
    - Clean up existing data
    - Add foreign key constraint to auth.users
    - Update task template function
  
  2. Security
    - Ensure proper foreign key relationship with auth.users table
*/

-- First make owner_id nullable and clean up data
ALTER TABLE tasks
ALTER COLUMN owner_id DROP NOT NULL;

UPDATE tasks 
SET owner_id = NULL 
WHERE owner_id IS NOT NULL 
AND owner_id NOT IN (SELECT id FROM auth.users);

-- Drop existing constraint if it exists
ALTER TABLE tasks 
DROP CONSTRAINT IF EXISTS tasks_owner_id_fkey;

-- Add foreign key constraint to auth.users
ALTER TABLE tasks
ADD CONSTRAINT tasks_owner_id_fkey 
  FOREIGN KEY (owner_id) 
  REFERENCES auth.users(id)
  ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_tasks_owner_id ON tasks(owner_id);

-- Update task template function to handle owner assignment
CREATE OR REPLACE FUNCTION apply_task_template(
  p_template_id uuid,
  p_production_order_id uuid,
  p_start_date date DEFAULT CURRENT_DATE
)
RETURNS SETOF tasks AS $$
BEGIN
  RETURN QUERY
  INSERT INTO tasks (
    production_order_id,
    start_date,
    duration_days,
    details,
    status
  )
  SELECT
    p_production_order_id,
    p_start_date + SUM(duration_days) OVER (
      ORDER BY order_index
      ROWS BETWEEN UNBOUNDED PRECEDING AND 1 PRECEDING
    ),
    duration_days,
    COALESCE(details_template, name),
    'pending'::task_status
  FROM task_template_items
  WHERE template_id = p_template_id
  ORDER BY order_index
  RETURNING *;
END;
$$ LANGUAGE plpgsql;