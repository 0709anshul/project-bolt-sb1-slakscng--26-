-- Add todo_id column to task_history
ALTER TABLE task_history
ADD COLUMN todo_id uuid REFERENCES task_todos(id) ON DELETE SET NULL;

-- Update task history policies
DROP POLICY IF EXISTS "allow_read_task_history" ON task_history;

CREATE POLICY "allow_read_task_history"
  ON task_history FOR SELECT
  TO authenticated
  USING (
    -- Allow Leumas staff to see all history
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager', 'staff')
    )
    OR
    -- For brand users, only show non-private todo history
    (
      todo_id IS NULL 
      OR NOT EXISTS (
        SELECT 1 FROM task_todos
        WHERE task_todos.id = todo_id
        AND task_todos.is_private = true
      )
    )
  );