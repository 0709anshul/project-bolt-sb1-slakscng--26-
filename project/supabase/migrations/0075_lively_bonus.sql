-- Drop existing policy
DROP POLICY IF EXISTS "allow_read_task_history" ON task_history;

-- Create simple policy allowing all authenticated users to read task history
CREATE POLICY "allow_read_task_history"
  ON task_history FOR SELECT
  TO authenticated
  USING (true);

-- Remove todo_id column since we're not filtering by it anymore
ALTER TABLE task_history 
DROP COLUMN IF EXISTS todo_id;