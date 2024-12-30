/*
  # Add Template Todos Support

  1. Changes
    - Add todos column to task_template_items table
    - Update apply_task_template function to handle todos

  2. Notes
    - Todos are stored as a JSONB array in the task_template_items table
    - When applying a template, todos are created for each task
*/

-- Add todos column to task_template_items
ALTER TABLE task_template_items
ADD COLUMN todos jsonb DEFAULT '[]'::jsonb;

-- Update function to handle todos when applying template
CREATE OR REPLACE FUNCTION apply_task_template(
  p_template_id uuid,
  p_production_order_id uuid,
  p_start_date date DEFAULT CURRENT_DATE
)
RETURNS SETOF tasks AS $$
DECLARE
  v_task_id uuid;
  v_todo record;
BEGIN
  -- Create tasks first
  FOR v_task_id IN
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
    RETURNING id
  LOOP
    -- Create todos for this task if any exist
    FOR v_todo IN
      SELECT 
        jsonb_array_elements(todos) as todo_data
      FROM task_template_items
      WHERE template_id = p_template_id
        AND id = v_task_id
    LOOP
      INSERT INTO task_todos (
        task_id,
        description,
        is_private,
        completed
      ) VALUES (
        v_task_id,
        (v_todo.todo_data->>'description')::text,
        (v_todo.todo_data->>'is_private')::boolean,
        false
      );
    END LOOP;

    RETURN QUERY SELECT * FROM tasks WHERE id = v_task_id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;