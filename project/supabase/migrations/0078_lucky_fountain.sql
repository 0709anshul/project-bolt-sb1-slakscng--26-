-- Add parent_order_id to track split orders
ALTER TABLE production_orders
ADD COLUMN parent_order_id uuid REFERENCES production_orders(id) ON DELETE SET NULL;

-- Add split_reason to document why the order was split
ALTER TABLE production_orders
ADD COLUMN split_reason text;

-- Create index for better query performance
CREATE INDEX idx_production_orders_parent_id ON production_orders(parent_order_id);

-- Create function to split production order
CREATE OR REPLACE FUNCTION split_production_order(
  order_id uuid,
  new_quantities integer[],
  split_reason text DEFAULT NULL
)
RETURNS SETOF production_orders AS $$
DECLARE
  original_order production_orders;
  new_order_id uuid;
  total_new_quantity integer := 0;
BEGIN
  -- Get original order
  SELECT * INTO original_order FROM production_orders WHERE id = order_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found';
  END IF;

  -- Calculate total new quantity
  SELECT sum(q) INTO total_new_quantity FROM unnest(new_quantities) q;
  
  -- Validate quantities
  IF total_new_quantity > original_order.quantity THEN
    RAISE EXCEPTION 'Total new quantities exceed original order quantity';
  END IF;

  -- Create new orders
  FOR i IN 1..array_length(new_quantities, 1) LOOP
    INSERT INTO production_orders (
      po_number,
      organization_id,
      owner_id,
      product_id,
      quantity,
      order_type,
      status,
      is_priority,
      parent_order_id,
      split_reason
    ) VALUES (
      original_order.po_number || '-' || i,
      original_order.organization_id,
      original_order.owner_id,
      original_order.product_id,
      new_quantities[i],
      original_order.order_type,
      'pending',
      original_order.is_priority,
      order_id,
      split_reason
    ) RETURNING id INTO new_order_id;

    -- Copy tasks for the new order
    INSERT INTO tasks (
      production_order_id,
      start_date,
      duration_days,
      owner_id,
      details,
      status,
      is_priority,
      internal_notes,
      proof_of_work,
      attachments
    )
    SELECT 
      new_order_id,
      start_date,
      duration_days,
      owner_id,
      details,
      'pending',
      is_priority,
      internal_notes,
      NULL,
      '[]'::jsonb
    FROM tasks
    WHERE production_order_id = order_id;

    -- Copy todos for each task
    INSERT INTO task_todos (
      task_id,
      description,
      completed,
      notes,
      is_private,
      attachments
    )
    SELECT 
      nt.id,
      tt.description,
      false,
      tt.notes,
      tt.is_private,
      '[]'::jsonb
    FROM task_todos tt
    JOIN tasks ot ON tt.task_id = ot.id
    JOIN tasks nt ON nt.production_order_id = new_order_id 
      AND nt.details = ot.details;

    RETURN QUERY SELECT * FROM production_orders WHERE id = new_order_id;
  END LOOP;

  -- Update original order quantity
  UPDATE production_orders 
  SET quantity = quantity - total_new_quantity
  WHERE id = order_id;

  RETURN;
END;
$$ LANGUAGE plpgsql;