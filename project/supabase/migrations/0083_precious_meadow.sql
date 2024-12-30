-- Drop existing function
DROP FUNCTION IF EXISTS apply_task_template(uuid, uuid, date);

-- Create updated function with proper todo handling
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
  -- For each template item
  FOR v_template_item IN
    SELECT *
    FROM task_template_items
    WHERE template_id = p_template_id
    ORDER BY order_index
  LOOP
    -- Create the task
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
    )
    RETURNING * INTO v_task;

    -- Create todos for this specific task
    IF v_template_item.todos IS NOT NULL THEN
      INSERT INTO task_todos (
        task_id,
        description,
        is_private,
        completed
      )
      SELECT
        v_task.id,
        (todo->>'description')::text,
        COALESCE((todo->>'is_private')::boolean, false),
        false
      FROM jsonb_array_elements(v_template_item.todos) AS todo
      WHERE (todo->>'description') IS NOT NULL;
    END IF;

    RETURN NEXT v_task;
  END LOOP;

  RETURN;
END;
$$ LANGUAGE plpgsql;

-- Add index to improve performance
CREATE INDEX IF NOT EXISTS idx_task_template_items_template_id 
ON task_template_items(template_id);

-- Add index for task todos
CREATE INDEX IF NOT EXISTS idx_task_todos_task_id 
ON task_todos(task_id);