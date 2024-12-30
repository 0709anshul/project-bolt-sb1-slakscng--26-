-- Create materials table
CREATE TABLE materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  leumas_id text NOT NULL UNIQUE,
  name text NOT NULL,
  make_description text,
  vendor_details jsonb,
  unit_of_measurement text NOT NULL CHECK (unit_of_measurement IN ('gram', 'kilogram', 'unit', 'millilitre', 'litre')),
  cost_per_unit decimal(10,2) NOT NULL,
  category text NOT NULL CHECK (category IN ('RM', 'PM', 'FG')),
  acceptance_criteria text,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create product formulas table
CREATE TABLE product_formulas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  material_id uuid REFERENCES materials(id) ON DELETE RESTRICT NOT NULL,
  quantity decimal(10,3) NOT NULL,
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL,
  UNIQUE(product_id, material_id)
);

-- Create material orders table
CREATE TABLE material_orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid REFERENCES materials(id) ON DELETE RESTRICT NOT NULL,
  quantity decimal(10,3) NOT NULL,
  order_date timestamptz NOT NULL,
  dispatch_date timestamptz,
  arrival_date timestamptz,
  waybill_details jsonb,
  status text NOT NULL CHECK (status IN ('pending', 'ordered', 'dispatched', 'received')),
  created_at timestamptz DEFAULT now() NOT NULL,
  updated_at timestamptz DEFAULT now() NOT NULL
);

-- Create store sections enum
CREATE TYPE store_section AS ENUM ('inward', 'brand', 'production');

-- Create inventory movements table
CREATE TABLE inventory_movements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  material_id uuid REFERENCES materials(id) ON DELETE RESTRICT NOT NULL,
  quantity decimal(10,3) NOT NULL,
  from_section store_section,
  to_section store_section NOT NULL,
  production_order_id uuid REFERENCES production_orders(id) ON DELETE SET NULL,
  moved_at timestamptz DEFAULT now() NOT NULL,
  moved_by uuid REFERENCES users(id) ON DELETE SET NULL NOT NULL,
  notes text
);

-- Create function to calculate current inventory
CREATE OR REPLACE FUNCTION get_current_inventory(p_material_id uuid, p_section store_section)
RETURNS decimal AS $$
DECLARE
  v_total decimal;
BEGIN
  SELECT COALESCE(SUM(
    CASE 
      WHEN to_section = p_section THEN quantity
      WHEN from_section = p_section THEN -quantity
      ELSE 0
    END
  ), 0)
  INTO v_total
  FROM inventory_movements
  WHERE material_id = p_material_id
  AND (to_section = p_section OR from_section = p_section);
  
  RETURN v_total;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_formulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE material_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_movements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read materials"
  ON materials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow staff manage materials"
  ON materials FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager', 'staff')
    )
  );

CREATE POLICY "Allow authenticated read formulas"
  ON product_formulas FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow staff manage formulas"
  ON product_formulas FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager', 'staff')
    )
  );

CREATE POLICY "Allow authenticated read orders"
  ON material_orders FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow staff manage orders"
  ON material_orders FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager', 'staff')
    )
  );

CREATE POLICY "Allow authenticated read movements"
  ON inventory_movements FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow staff manage movements"
  ON inventory_movements FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('admin', 'manager', 'staff')
    )
  );

-- Create indexes
CREATE INDEX idx_materials_category ON materials(category);
CREATE INDEX idx_product_formulas_product_id ON product_formulas(product_id);
CREATE INDEX idx_material_orders_material_id ON material_orders(material_id);
CREATE INDEX idx_material_orders_status ON material_orders(status);
CREATE INDEX idx_inventory_movements_material_id ON inventory_movements(material_id);
CREATE INDEX idx_inventory_movements_sections ON inventory_movements(from_section, to_section);