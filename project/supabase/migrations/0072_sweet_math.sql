-- Create batch records table
CREATE TABLE batch_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  production_order_id uuid REFERENCES production_orders(id) ON DELETE CASCADE NOT NULL,
  details text NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE (production_order_id)
);

-- Enable RLS
ALTER TABLE batch_records ENABLE ROW LEVEL SECURITY;

-- Create updated_at trigger
CREATE TRIGGER update_batch_records_updated_at
  BEFORE UPDATE ON batch_records
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create policies
CREATE POLICY "Allow authenticated users to read batch records"
  ON batch_records FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin and manager to manage batch records"
  ON batch_records FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager')
    )
  );