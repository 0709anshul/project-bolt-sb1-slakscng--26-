/*
  # Fix Template Todos Implementation

  1. Changes
    - Drop existing constraint that's causing issues
    - Add simpler validation for todos array
    - Update template application function
*/

-- Drop existing constraint
ALTER TABLE task_template_items
DROP CONSTRAINT IF EXISTS valid_todos_array;

-- Add simpler validation
ALTER TABLE task_template_items
ADD CONSTRAINT valid_todos_array
  CHECK (
    todos IS NULL 
    OR jsonb_typeof(todos) = 'array'
  );

-- Update function to handle todos correctly
CREATE OR REPLACE FUNCTION apply_task_template(
  p_template_id uuid,
  p_production_order_id uuid,
  p_start_date date DEFAULT CURRENT_DATE
)
RETURNS SETOF tasks AS $$
DECLARE
  v_task tasks;
  v_template_item record;
BEGIN
  -- Create tasks
  FOR v_template_item IN
    SELECT *
    FROM task_template_items
    WHERE template_id = p_template_id
    ORDER BY order_index
  LOOP
    -- Insert task
    INSERT INTO tasks (
      production_order_id,
      start_date,
      duration_days,
      details,
      status
    ) VALUES (
      p_production_order_id,
      p_start_date + (
        SELECT COALESCE(SUM(duration_days), 0)
        FROM task_template_items t
        WHERE t.template_id = p_template_id
        AND t.order_index < v_template_item.order_index
      ),
      v_template_item.duration_days,
      COALESCE(v_template_item.details_template, v_template_item.name),
      'pending'::task_status
    ) RETURNING * INTO v_task;

    -- Create todos if any exist
    IF v_template_item.todos IS NOT NULL AND jsonb_array_length(v_template_item.todos) > 0 THEN
      INSERT INTO task_todos (task_id, description, is_private, completed)
      SELECT 
        v_task.id,
        (todo->>'description')::text,
        COALESCE((todo->>'is_private')::boolean, false),
        false
      FROM jsonb_array_elements(v_template_item.todos) AS todo;
    END IF;

    RETURN NEXT v_task;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql;