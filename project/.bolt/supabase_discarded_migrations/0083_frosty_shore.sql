-- Drop existing function and constraints
DROP FUNCTION IF EXISTS apply_task_template CASCADE;
DROP TRIGGER IF EXISTS validate_todos_trigger ON task_template_items;
ALTER TABLE task_template_items DROP CONSTRAINT IF EXISTS todos_is_array;
ALTER TABLE task_template_items DROP CONSTRAINT IF EXISTS valid_todos_array;

-- Ensure todos column exists with default empty array
ALTER TABLE task_template_items 
ALTER COLUMN todos SET DEFAULT '[]'::jsonb;

-- Create simple function to apply template
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

    -- Create todos
    IF v_template_item.todos IS NOT NULL THEN
      INSERT INTO task_todos (task_id, description, is_private, completed)
      SELECT 
        v_task.id,
        value->>'description',
        COALESCE((value->>'is_private')::boolean, false),
        false
      FROM jsonb_array_elements(v_template_item.todos) AS value
      WHERE value->>'description' IS NOT NULL;
    END IF;

    RETURN NEXT v_task;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql;