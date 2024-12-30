-- Clear existing formulas first
TRUNCATE product_formulas;

-- Insert corrected formulas with per-unit quantities
WITH formula_data AS (
  SELECT 
    p.id as product_id,
    m.id as material_id,
    CASE 
      -- L Glutathione 60 Caps (per unit)
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM001' THEN 0.250 -- Total Glutathione per bottle
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM002' THEN 0.100 -- Total Vitamin C per bottle
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM004' THEN 0.005 -- Total Magnesium Stearate per bottle
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM005' THEN 0.050 -- Total MCC per bottle
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM001' THEN 1.0 -- 1 bottle per unit
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM004' THEN 1.0 -- 1 cap per unit
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM005' THEN 1.0 -- 1 desiccant per unit
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM008' THEN 1.0 -- 1 label per unit
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM009' THEN 0.0417 -- 1/24 box per unit

      -- L Glutathione 30 Caps (per unit)
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM001' THEN 0.125 -- Total Glutathione per bottle
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM002' THEN 0.050 -- Total Vitamin C per bottle
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM004' THEN 0.003 -- Total Magnesium Stearate per bottle
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM005' THEN 0.025 -- Total MCC per bottle
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM001' THEN 1.0 -- 1 bottle per unit
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM004' THEN 1.0 -- 1 cap per unit
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM005' THEN 1.0 -- 1 desiccant per unit
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM008' THEN 1.0 -- 1 label per unit
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM009' THEN 0.0417 -- 1/24 box per unit

      -- Facial Wax (per unit)
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'RM012' THEN 0.050 -- Curcumin per unit
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM002' THEN 1.0 -- 1 bottle per unit
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM004' THEN 1.0 -- 1 cap per unit
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM008' THEN 1.0 -- 1 label per unit
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM009' THEN 0.0417 -- 1/24 box per unit

      -- Bloom Hair Serum (per unit)
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'RM007' THEN 0.003 -- Hyaluronic Acid per unit
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'RM009' THEN 0.002 -- Biotin per unit
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM002' THEN 1.0 -- 1 bottle per unit
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM011' THEN 1.0 -- 1 dropper per unit
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM008' THEN 1.0 -- 1 label per unit
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM014' THEN 1.0 -- 1 carton per unit
      
      ELSE NULL
    END as quantity
  FROM products p
  CROSS JOIN materials m
)
INSERT INTO product_formulas (product_id, material_id, quantity)
SELECT 
  product_id,
  material_id,
  quantity
FROM formula_data
WHERE quantity IS NOT NULL;