/*
  # Remove owner from task templates
  
  1. Changes
    - Remove owner_id column from task_template_items
    - Update apply_task_template function to remove owner handling
    
  2. Notes
    - Drop existing function first to avoid parameter name conflicts
    - Recreate function with simplified parameters
*/

-- Remove owner_id column from task_template_items
ALTER TABLE task_template_items 
DROP COLUMN IF EXISTS owner_id;

-- Drop existing function first
DROP FUNCTION IF EXISTS apply_task_template(uuid, uuid, date, uuid);
DROP FUNCTION IF EXISTS apply_task_template(uuid, uuid, date);

-- Recreate function with simplified parameters
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