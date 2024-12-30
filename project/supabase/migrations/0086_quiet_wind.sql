WITH formula_data AS (
  SELECT 
    p.id as product_id,
    m.id as material_id,
    CASE 
      -- L Glutathione 60 Caps
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM001' THEN 0.250
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM002' THEN 0.100
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM004' THEN 0.005
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'RM005' THEN 0.050
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM001' THEN 60.000
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM004' THEN 60.000
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM005' THEN 60.000
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM008' THEN 60.000
      WHEN p.name = 'L Glutathione 60 Caps' AND m.leumas_id = 'PM009' THEN 2.000

      -- L Glutathione 30 Caps
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM001' THEN 0.125
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM002' THEN 0.050
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM004' THEN 0.003
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'RM005' THEN 0.025
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM001' THEN 30.000
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM004' THEN 30.000
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM005' THEN 30.000
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM008' THEN 30.000
      WHEN p.name = 'L Glutathione 30 Caps' AND m.leumas_id = 'PM009' THEN 1.000

      -- Facial Wax
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'RM012' THEN 0.050
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM002' THEN 30.000
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM004' THEN 30.000
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM008' THEN 30.000
      WHEN p.name = 'Facial Wax' AND m.leumas_id = 'PM009' THEN 1.000

      -- B-Complex 60 Caps
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'RM009' THEN 0.180
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'RM004' THEN 0.005
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'RM005' THEN 0.050
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'PM001' THEN 60.000
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'PM004' THEN 60.000
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'PM005' THEN 60.000
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'PM008' THEN 60.000
      WHEN p.name = 'B-Complex 60 Caps' AND m.leumas_id = 'PM009' THEN 2.000

      -- Krill Oil 60 Caps
      WHEN p.name = 'Krill Oil 60 Caps' AND m.leumas_id = 'RM006' THEN 0.300
      WHEN p.name = 'Krill Oil 60 Caps' AND m.leumas_id = 'RM004' THEN 0.005
      WHEN p.name = 'Krill Oil 60 Caps' AND m.leumas_id = 'PM001' THEN 60.000
      WHEN p.name = 'Krill Oil 60 Caps' AND m.leumas_id = 'PM004' THEN 60.000
      WHEN p.name = 'Krill Oil 60 Caps' AND m.leumas_id = 'PM005' THEN 60.000
      WHEN p.name = 'Krill Oil 60 Caps' AND m.leumas_id = 'PM008' THEN 60.000
      WHEN p.name = 'Krill Oil 60 Caps' AND m.leumas_id = 'PM009' THEN 2.000

      -- Magnesium Bisglycinate
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'RM016' THEN 0.500
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'RM004' THEN 0.005
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'RM005' THEN 0.050
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'PM001' THEN 60.000
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'PM004' THEN 60.000
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'PM005' THEN 60.000
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'PM008' THEN 60.000
      WHEN p.name = 'Magnesium Bisglycinate' AND m.leumas_id = 'PM009' THEN 2.000

      -- Caffeine 120 mg
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'RM010' THEN 0.120
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'RM004' THEN 0.003
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'RM005' THEN 0.030
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'PM001' THEN 30.000
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'PM004' THEN 30.000
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'PM005' THEN 30.000
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'PM008' THEN 30.000
      WHEN p.name = 'Caffeine 120 mg' AND m.leumas_id = 'PM009' THEN 1.000

      -- MSM + Glucasamanie
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'RM021' THEN 0.250
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'RM004' THEN 0.005
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'RM005' THEN 0.050
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'PM001' THEN 60.000
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'PM004' THEN 60.000
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'PM005' THEN 60.000
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'PM008' THEN 60.000
      WHEN p.name = 'MSM + Glucasamanie' AND m.leumas_id = 'PM009' THEN 2.000

      -- Bloom Hair Serum
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'RM007' THEN 0.100
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'RM009' THEN 0.050
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM002' THEN 30.000
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM011' THEN 30.000
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM008' THEN 30.000
      WHEN p.name = 'Bloom Hair Serum' AND m.leumas_id = 'PM014' THEN 30.000

      -- Bloom Tablets
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'RM009' THEN 0.180
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'RM004' THEN 0.005
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'RM005' THEN 0.050
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'PM001' THEN 60.000
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'PM004' THEN 60.000
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'PM005' THEN 60.000
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'PM008' THEN 60.000
      WHEN p.name = 'Bloom Tablets' AND m.leumas_id = 'PM009' THEN 2.000

      -- SpellQ10 Capsule
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'RM002' THEN 0.100
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'RM004' THEN 0.003
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'RM005' THEN 0.030
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'PM001' THEN 30.000
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'PM004' THEN 30.000
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'PM005' THEN 30.000
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'PM008' THEN 30.000
      WHEN p.name = 'SpellQ10 Capsule' AND m.leumas_id = 'PM009' THEN 1.000

      -- Spell Forte
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'RM002' THEN 0.200
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'RM003' THEN 0.050
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'RM004' THEN 0.005
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'RM005' THEN 0.050
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'PM001' THEN 60.000
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'PM004' THEN 60.000
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'PM005' THEN 60.000
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'PM008' THEN 60.000
      WHEN p.name = 'Spell Forte' AND m.leumas_id = 'PM009' THEN 2.000
      
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