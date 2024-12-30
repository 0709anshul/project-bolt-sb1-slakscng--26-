-- Drop existing task history table and recreate with proper relationships
DROP TABLE IF EXISTS task_history CASCADE;

CREATE TABLE task_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  action text NOT NULL,
  details text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE task_history ENABLE ROW LEVEL SECURITY;

-- Create simple read policy for authenticated users
CREATE POLICY "allow_read_task_history"
  ON task_history FOR SELECT
  TO authenticated
  USING (true);

-- Create insert policy for authenticated users
CREATE POLICY "allow_insert_task_history"
  ON task_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX idx_task_history_task_id ON task_history(task_id);
CREATE INDEX idx_task_history_user_id ON task_history(user_id);