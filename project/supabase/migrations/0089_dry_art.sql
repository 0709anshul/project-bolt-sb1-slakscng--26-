/*
  # Insert Additional Materials Data

  1. New Data
    - Adds next batch of raw materials (RM005-RM010)
    - Adds first batch of packaging materials (PM001-PM005)
  
  2. Changes
    - Inserts new materials with conflict handling
    - Maintains data consistency with previous migration
*/

-- Insert next batch of materials data
INSERT INTO materials (leumas_id, name, make_description, vendor_details, unit_of_measurement, cost_per_unit, category, acceptance_criteria)
VALUES
  -- Raw Materials (RM)
  ('RM005', 'Microcrystalline Cellulose', 'PH102 grade', '{"name": "Cellulose Corp", "contact": "Lisa Wang", "email": "lisa@cellulose.com", "phone": "+91 98765 43214", "address": "Bangalore, India"}', 'kilogram', 250.00, 'RM', 'PH102 grade, moisture content <5%'),
  ('RM006', 'Collagen Peptides', 'Hydrolyzed marine collagen', '{"name": "Marine Biotech", "contact": "Tom Wilson", "email": "tom@marinebio.com", "phone": "+91 98765 43215", "address": "Kochi, India"}', 'kilogram', 2800.00, 'RM', 'Marine source, protein content >90%'),
  ('RM007', 'Hyaluronic Acid', 'Low molecular weight', '{"name": "BioActive", "contact": "Emma Brown", "email": "emma@bioactive.com", "phone": "+91 98765 43216", "address": "Pune, India"}', 'kilogram', 5200.00, 'RM', 'Molecular weight 50-110 kDa'),
  ('RM008', 'Green Tea Extract', '98% Polyphenols', '{"name": "Herbal Extracts", "contact": "Ray Chang", "email": "ray@herbal.com", "phone": "+91 98765 43217", "address": "Kolkata, India"}', 'kilogram', 920.00, 'RM', 'EGCG content >45%'),
  ('RM009', 'Biotin', 'D-Biotin powder', '{"name": "VitaWorks", "contact": "Anna Lee", "email": "anna@vitaworks.com", "phone": "+91 98765 43218", "address": "Ahmedabad, India"}', 'kilogram', 3800.00, 'RM', 'USP grade, 98% purity'),
  ('RM010', 'Caffeine Anhydrous', 'Pure caffeine powder', '{"name": "StimChem", "contact": "Peter Zhang", "email": "peter@stimchem.com", "phone": "+91 98765 43219", "address": "Vadodara, India"}', 'kilogram', 750.00, 'RM', 'BP grade, melting point 235-237°C'),

  -- Packaging Materials (PM)
  ('PM001', 'HDPE Bottles 100ml', 'White HDPE with CRC cap', '{"name": "PackWell", "contact": "Bob Miller", "email": "bob@packwell.com", "phone": "+91 98765 43225", "address": "Noida, India"}', 'unit', 12.50, 'PM', 'Food grade HDPE, drop test passed'),
  ('PM002', 'Amber Glass Bottles 30ml', 'USP Type III glass', '{"name": "GlassCraft", "contact": "Helen Zhang", "email": "helen@glass.com", "phone": "+91 98765 43226", "address": "Gurgaon, India"}', 'unit', 18.75, 'PM', 'USP Type III glass, light transmission test passed'),
  ('PM003', 'Aluminum Foil', '9 micron thickness', '{"name": "FoilPack", "contact": "Chris Lee", "email": "chris@foilpack.com", "phone": "+91 98765 43227", "address": "Faridabad, India"}', 'kilogram', 450.00, 'PM', 'No pinholes, uniform thickness'),
  ('PM004', 'Child Resistant Caps', '28mm CRC caps', '{"name": "CapMakers", "contact": "Diana Chen", "email": "diana@capmakers.com", "phone": "+91 98765 43228", "address": "Thane, India"}', 'unit', 3.25, 'PM', 'CRC certification required'),
  ('PM005', 'Desiccant Sachets', '1g silica gel', '{"name": "DryTech", "contact": "Paul Wang", "email": "paul@drytech.com", "phone": "+91 98765 43229", "address": "Pune, India"}', 'unit', 1.50, 'PM', 'DMF grade silica gel')
ON CONFLICT (leumas_id) 
DO UPDATE SET
  name = EXCLUDED.name,
  make_description = EXCLUDED.make_description,
  vendor_details = EXCLUDED.vendor_details,
  unit_of_measurement = EXCLUDED.unit_of_measurement,
  cost_per_unit = EXCLUDED.cost_per_unit,
  category = EXCLUDED.category,
  acceptance_criteria = EXCLUDED.acceptance_criteria;