-- Drop existing function
DROP FUNCTION IF EXISTS apply_task_template(uuid, uuid, date);

-- Create updated function that properly handles todos
CREATE OR REPLACE FUNCTION apply_task_template(
  p_template_id uuid,
  p_production_order_id uuid,
  p_start_date date DEFAULT CURRENT_DATE
)
RETURNS SETOF tasks AS $$
DECLARE
  v_task_id uuid;
  v_todo jsonb;
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
    -- For each task, create its todos
    FOR v_todo IN
      SELECT jsonb_array_elements(todos)
      FROM task_template_items
      WHERE template_id = p_template_id
      AND todos IS NOT NULL
      AND jsonb_array_length(todos) > 0
    LOOP
      INSERT INTO task_todos (
        task_id,
        description,
        is_private,
        completed
      ) VALUES (
        v_task_id,
        v_todo->>'description',
        COALESCE((v_todo->>'is_private')::boolean, false),
        false
      );
    END LOOP;

    RETURN QUERY SELECT * FROM tasks WHERE id = v_task_id;
  END LOOP;
END;
$$ LANGUAGE plpgsql;