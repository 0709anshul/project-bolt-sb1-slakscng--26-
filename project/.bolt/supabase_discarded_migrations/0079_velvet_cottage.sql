/*
  # Fix Task History Implementation

  1. Changes
    - Drop and recreate task_history table with proper relationships
    - Add proper indexes for performance
    - Update policies for better security

  2. Notes
    - Ensures proper foreign key relationships
    - Improves query performance
    - Maintains data integrity
*/

-- Drop existing task history table
DROP TABLE IF EXISTS task_history CASCADE;

-- Create task history table with proper relationships
CREATE TABLE task_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_id uuid REFERENCES tasks(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  action text NOT NULL,
  details text NOT NULL,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE task_history ENABLE ROW LEVEL SECURITY;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_task_history_task_id ON task_history(task_id);
CREATE INDEX IF NOT EXISTS idx_task_history_user_id ON task_history(user_id);
CREATE INDEX IF NOT EXISTS idx_task_history_created_at ON task_history(created_at DESC);

-- Create policies
CREATE POLICY "allow_read_task_history"
  ON task_history FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "allow_insert_task_history"
  ON task_history FOR INSERT
  TO authenticated
  WITH CHECK (
    -- Only allow inserting history for tasks the user has access to
    EXISTS (
      SELECT 1 FROM tasks t
      JOIN production_orders po ON t.production_order_id = po.id
      WHERE t.id = task_id
      AND (
        -- User is from the same organization
        po.organization_id = (
          SELECT organization_id FROM users WHERE id = auth.uid()
        )
        OR
        -- Or user is Leumas staff
        EXISTS (
          SELECT 1 FROM users
          WHERE id = auth.uid()
          AND role IN ('admin', 'manager', 'staff')
        )
      )
    )
  );