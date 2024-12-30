/*
  # Leumasware Production Management System Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `sku` (text, unique)
      - `description` (text)
      - `unit_price` (decimal)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `production_orders`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `status` (enum: planned, in_progress, completed, cancelled)
      - `start_date` (timestamp)
      - `end_date` (timestamp)
      - `created_by` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `inventory`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key)
      - `quantity` (integer)
      - `location` (text)
      - `last_checked` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `workers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `name` (text)
      - `role` (text)
      - `shift` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `production_lines`
      - `id` (uuid, primary key)
      - `name` (text)
      - `status` (enum: active, maintenance, inactive)
      - `current_order_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `quality_control`
      - `id` (uuid, primary key)
      - `production_order_id` (uuid, foreign key)
      - `inspector_id` (uuid, foreign key)
      - `status` (enum: passed, failed, pending)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users based on their roles
*/

-- Create custom types
CREATE TYPE production_order_status AS ENUM ('planned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE production_line_status AS ENUM ('active', 'maintenance', 'inactive');
CREATE TYPE quality_control_status AS ENUM ('passed', 'failed', 'pending');

-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    sku text UNIQUE NOT NULL,
    description text,
    unit_price decimal(10,2) NOT NULL DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create production_orders table
CREATE TABLE IF NOT EXISTS production_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid REFERENCES products(id),
    quantity integer NOT NULL DEFAULT 0,
    status production_order_status NOT NULL DEFAULT 'planned',
    start_date timestamptz,
    end_date timestamptz,
    created_by uuid REFERENCES auth.users(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id uuid REFERENCES products(id),
    quantity integer NOT NULL DEFAULT 0,
    location text NOT NULL,
    last_checked timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create workers table
CREATE TABLE IF NOT EXISTS workers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id),
    name text NOT NULL,
    role text NOT NULL,
    shift text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create production_lines table
CREATE TABLE IF NOT EXISTS production_lines (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    status production_line_status NOT NULL DEFAULT 'inactive',
    current_order_id uuid REFERENCES production_orders(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Create quality_control table
CREATE TABLE IF NOT EXISTS quality_control (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    production_order_id uuid REFERENCES production_orders(id),
    inspector_id uuid REFERENCES workers(id),
    status quality_control_status NOT NULL DEFAULT 'pending',
    notes text,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE workers ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_lines ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_control ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow authenticated read products" ON products
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read production orders" ON production_orders
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read inventory" ON inventory
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read workers" ON workers
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read production lines" ON production_lines
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read quality control" ON quality_control
    FOR SELECT TO authenticated USING (true);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating timestamps
CREATE TRIGGER update_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_production_orders_updated_at
    BEFORE UPDATE ON production_orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_workers_updated_at
    BEFORE UPDATE ON workers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_production_lines_updated_at
    BEFORE UPDATE ON production_lines
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_quality_control_updated_at
    BEFORE UPDATE ON quality_control
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at();