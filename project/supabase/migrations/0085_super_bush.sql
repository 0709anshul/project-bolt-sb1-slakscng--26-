-- Insert dummy materials data
INSERT INTO materials (leumas_id, name, make_description, vendor_details, unit_of_measurement, cost_per_unit, category, acceptance_criteria)
VALUES
  -- Raw Materials (RM)
  ('RM001', 'L-Glutathione', 'Pure L-Glutathione powder, USP grade', '{"name": "BioTech Solutions", "contact": "John Smith", "email": "john@biotech.com", "phone": "+91 98765 43210", "address": "Mumbai, Maharashtra"}', 'kilogram', 4500.00, 'RM', 'USP grade, Certificate of Analysis required'),
  ('RM002', 'Vitamin C', 'Ascorbic Acid, BP grade', '{"name": "VitaChem", "contact": "Sarah Lee", "email": "sarah@vitachem.com", "phone": "+91 98765 43211", "address": "Delhi, India"}', 'kilogram', 850.00, 'RM', 'BP grade, minimum 99% purity'),
  ('RM003', 'Zinc Oxide', 'Pharmaceutical grade ZnO', '{"name": "Mineral Plus", "contact": "Mike Chen", "email": "mike@mineralplus.com", "phone": "+91 98765 43212", "address": "Chennai, India"}', 'kilogram', 320.00, 'RM', 'Pharma grade, mesh size 200-300'),
  ('RM004', 'Magnesium Stearate', 'Lubricant grade', '{"name": "ChemWorks", "contact": "David Kumar", "email": "david@chemworks.com", "phone": "+91 98765 43213", "address": "Hyderabad, India"}', 'kilogram', 180.00, 'RM', 'Meets USP specifications'),
  ('RM005', 'Microcrystalline Cellulose', 'PH102 grade', '{"name": "Cellulose Corp", "contact": "Lisa Wang", "email": "lisa@cellulose.com", "phone": "+91 98765 43214", "address": "Bangalore, India"}', 'kilogram', 250.00, 'RM', 'PH102 grade, moisture content <5%'),
  ('RM006', 'Collagen Peptides', 'Hydrolyzed marine collagen', '{"name": "Marine Biotech", "contact": "Tom Wilson", "email": "tom@marinebio.com", "phone": "+91 98765 43215", "address": "Kochi, India"}', 'kilogram', 2800.00, 'RM', 'Marine source, protein content >90%'),
  ('RM007', 'Hyaluronic Acid', 'Low molecular weight', '{"name": "BioActive", "contact": "Emma Brown", "email": "emma@bioactive.com", "phone": "+91 98765 43216", "address": "Pune, India"}', 'kilogram', 5200.00, 'RM', 'Molecular weight 50-110 kDa'),
  ('RM008', 'Green Tea Extract', '98% Polyphenols', '{"name": "Herbal Extracts", "contact": "Ray Chang", "email": "ray@herbal.com", "phone": "+91 98765 43217", "address": "Kolkata, India"}', 'kilogram', 920.00, 'RM', 'EGCG content >45%'),
  ('RM009', 'Biotin', 'D-Biotin powder', '{"name": "VitaWorks", "contact": "Anna Lee", "email": "anna@vitaworks.com", "phone": "+91 98765 43218", "address": "Ahmedabad, India"}', 'kilogram', 3800.00, 'RM', 'USP grade, 98% purity'),
  ('RM010', 'Caffeine Anhydrous', 'Pure caffeine powder', '{"name": "StimChem", "contact": "Peter Zhang", "email": "peter@stimchem.com", "phone": "+91 98765 43219", "address": "Vadodara, India"}', 'kilogram', 750.00, 'RM', 'BP grade, melting point 235-237°C'),

  -- More Raw Materials
  ('RM011', 'Calcium Carbonate', 'Precipitated grade', '{"name": "MinChem", "contact": "James Wilson", "email": "james@minchem.com", "phone": "+91 98765 43220", "address": "Jaipur, India"}', 'kilogram', 120.00, 'RM', 'USP grade, particle size <10μm'),
  ('RM012', 'Curcumin Extract', '95% Curcuminoids', '{"name": "Herbal India", "contact": "Raj Sharma", "email": "raj@herbal.com", "phone": "+91 98765 43221", "address": "Indore, India"}', 'kilogram', 1850.00, 'RM', 'HPLC tested, heavy metals <1ppm'),
  ('RM013', 'Vitamin D3', 'Cholecalciferol powder', '{"name": "VitaLabs", "contact": "Mary Johnson", "email": "mary@vitalabs.com", "phone": "+91 98765 43222", "address": "Lucknow, India"}', 'kilogram', 4200.00, 'RM', 'BP grade, stability tested'),
  ('RM014', 'L-Carnitine', 'L-Carnitine L-Tartrate', '{"name": "AminoTech", "contact": "Steve Brown", "email": "steve@aminotech.com", "phone": "+91 98765 43223", "address": "Bhopal, India"}', 'kilogram', 1650.00, 'RM', 'USP grade, 98% minimum purity'),
  ('RM015', 'Ashwagandha Extract', 'KSM-66 grade', '{"name": "Ayur Extracts", "contact": "Amit Patel", "email": "amit@ayur.com", "phone": "+91 98765 43224", "address": "Nagpur, India"}', 'kilogram', 2200.00, 'RM', 'Withanolides >5%'),

  -- Packaging Materials (PM)
  ('PM001', 'HDPE Bottles 100ml', 'White HDPE with CRC cap', '{"name": "PackWell", "contact": "Bob Miller", "email": "bob@packwell.com", "phone": "+91 98765 43225", "address": "Noida, India"}', 'unit', 12.50, 'PM', 'Food grade HDPE, drop test passed'),
  ('PM002', 'Amber Glass Bottles 30ml', 'USP Type III glass', '{"name": "GlassCraft", "contact": "Helen Zhang", "email": "helen@glass.com", "phone": "+91 98765 43226", "address": "Gurgaon, India"}', 'unit', 18.75, 'PM', 'USP Type III glass, light transmission test passed'),
  ('PM003', 'Aluminum Foil', '9 micron thickness', '{"name": "FoilPack", "contact": "Chris Lee", "email": "chris@foilpack.com", "phone": "+91 98765 43227", "address": "Faridabad, India"}', 'kilogram', 450.00, 'PM', 'No pinholes, uniform thickness'),
  ('PM004', 'Child Resistant Caps', '28mm CRC caps', '{"name": "CapMakers", "contact": "Diana Chen", "email": "diana@capmakers.com", "phone": "+91 98765 43228", "address": "Thane, India"}', 'unit', 3.25, 'PM', 'CRC certification required'),
  ('PM005', 'Desiccant Sachets', '1g silica gel', '{"name": "DryTech", "contact": "Paul Wang", "email": "paul@drytech.com", "phone": "+91 98765 43229", "address": "Pune, India"}', 'unit', 1.50, 'PM', 'DMF grade silica gel'),
  ('PM006', 'Blister Films', 'PVC/PVDC film', '{"name": "FlexiPack", "contact": "Lucy Kim", "email": "lucy@flexipack.com", "phone": "+91 98765 43230", "address": "Chandigarh, India"}', 'kilogram', 580.00, 'PM', 'PVDC coating weight 60g/m²'),
  ('PM007', 'Shrink Wrap', 'PVC shrink film', '{"name": "ShrinkPro", "contact": "Mark Davis", "email": "mark@shrinkpro.com", "phone": "+91 98765 43231", "address": "Surat, India"}', 'kilogram', 280.00, 'PM', 'Thickness 40 micron'),
  ('PM008', 'Label Stock', 'Self-adhesive paper', '{"name": "LabelTech", "contact": "Jenny Wu", "email": "jenny@labeltech.com", "phone": "+91 98765 43232", "address": "Nashik, India"}', 'unit', 0.75, 'PM', 'All-temp adhesive'),
  ('PM009', 'Corrugated Boxes', 'B-flute boxes', '{"name": "BoxCraft", "contact": "Sam Thompson", "email": "sam@boxcraft.com", "phone": "+91 98765 43233", "address": "Mysore, India"}', 'unit', 35.00, 'PM', 'Burst strength >12 kg/cm²'),
  ('PM010', 'Measuring Cups', '15ml PP cups', '{"name": "PlastiCare", "contact": "Rita Patel", "email": "rita@plasticare.com", "phone": "+91 98765 43234", "address": "Rajkot, India"}', 'unit', 2.25, 'PM', 'Food grade PP, accurate graduation'),

  -- More Packaging Materials
  ('PM011', 'Bottle Droppers', 'Glass dropper with rubber bulb', '{"name": "DropTech", "contact": "Kevin Chen", "email": "kevin@droptech.com", "phone": "+91 98765 43235", "address": "Vadodara, India"}', 'unit', 4.80, 'PM', 'Calibrated drops, leak test passed'),
  ('PM012', 'Induction Seals', '28mm aluminum seals', '{"name": "SealPro", "contact": "Linda Wang", "email": "linda@sealpro.com", "phone": "+91 98765 43236", "address": "Coimbatore, India"}', 'unit', 0.45, 'PM', 'Wax-free, heat activated'),
  ('PM013', 'Spray Pumps', 'Fine mist sprayer', '{"name": "SprayTech", "contact": "George Liu", "email": "george@spraytech.com", "phone": "+91 98765 43237", "address": "Madurai, India"}', 'unit', 8.90, 'PM', 'Output 0.12ml per spray'),
  ('PM014', 'Carton Boxes', 'Printed folding cartons', '{"name": "CartonEx", "contact": "Alice Zhang", "email": "alice@cartonex.com", "phone": "+91 98765 43238", "address": "Trichy, India"}', 'unit', 15.50, 'PM', '300 GSM board, UV coated'),
  ('PM015', 'Bubble Wrap', 'Air bubble sheet', '{"name": "BubblePro", "contact": "Dave Wilson", "email": "dave@bubblepro.com", "phone": "+91 98765 43239", "address": "Salem, India"}', 'kilogram', 180.00, 'PM', 'Bubble size 10mm'),

  -- Finished Goods (FG)
  ('FG001', 'Glutathione Complex', 'Ready for packaging', NULL, 'unit', 850.00, 'FG', 'All QC parameters within limits'),
  ('FG002', 'Vitamin C Tablets', 'Coated tablets', NULL, 'unit', 120.00, 'FG', 'Dissolution >85% in 30 minutes'),
  ('FG003', 'Collagen Powder', 'Flavored powder', NULL, 'unit', 450.00, 'FG', 'Protein content verified'),
  ('FG004', 'Biotin Capsules', 'Hard gelatin capsules', NULL, 'unit', 280.00, 'FG', 'Content uniformity passed'),
  ('FG005', 'Energy Blend', 'Pre-workout powder', NULL, 'unit', 380.00, 'FG', 'Blend uniformity verified'),

  -- More Raw Materials
  ('RM016', 'Magnesium Citrate', 'USP grade powder', '{"name": "MineralTech", "contact": "Ryan Lee", "email": "ryan@mineraltech.com", "phone": "+91 98765 43240", "address": "Kanpur, India"}', 'kilogram', 750.00, 'RM', 'Assay 98-102%'),
  ('RM017', 'Zinc Picolinate', 'Chelated zinc', '{"name": "ChemNova", "contact": "Sophie Chen", "email": "sophie@chemnova.com", "phone": "+91 98765 43241", "address": "Patna, India"}', 'kilogram', 1200.00, 'RM', 'Heavy metals <10ppm'),
  ('RM018', 'Green Coffee Extract', '50% Chlorogenic acid', '{"name": "NaturEx", "contact": "Tony Stark", "email": "tony@naturex.com", "phone": "+91 98765 43242", "address": "Raipur, India"}', 'kilogram', 1850.00, 'RM', 'Standardized to 50% CA'),
  ('RM019', 'L-Theanine', '98% pure powder', '{"name": "AminoScience", "contact": "Bruce Banner", "email": "bruce@aminoscience.com", "phone": "+91 98765 43243", "address": "Ranchi, India"}', 'kilogram', 2200.00, 'RM', 'Enantiomeric purity >98%'),
  ('RM020', 'Beta Alanine', 'CarnoSyn grade', '{"name": "SportNutra", "contact": "Natasha Rom", "email": "natasha@sportnutra.com", "phone": "+91 98765 43244", "address": "Bhubaneswar, India"}', 'kilogram', 980.00, 'RM', 'Patented grade material'),

  -- More Packaging Materials
  ('PM016', 'Sachet Films', 'Four layer laminate', '{"name": "FlexiFilm", "contact": "Clint East", "email": "clint@flexifilm.com", "phone": "+91 98765 43245", "address": "Shimla, India"}', 'kilogram', 650.00, 'PM', 'MVTR <1.0 g/m²/day'),
  ('PM017', 'Measuring Scoops', '5g PP scoops', '{"name": "ScoopTech", "contact": "Thor Odinson", "email": "thor@scooptech.com", "phone": "+91 98765 43246", "address": "Dehradun, India"}', 'unit', 1.80, 'PM', 'Food grade PP material'),
  ('PM018', 'Security Seals', 'Tamper evident bands', '{"name": "SecurePack", "contact": "Steve Rogers", "email": "steve@securepack.com", "phone": "+91 98765 43247", "address": "Jammu, India"}', 'unit', 0.35, 'PM', 'Clear breakage indication'),
  ('PM019', 'Desiccant Canisters', '3g molecular sieve', '{"name": "DryTech", "contact": "Peter Parker", "email": "peter@drytech.com", "phone": "+91 98765 43248", "address": "Guwahati, India"}', 'unit', 4.20, 'PM', 'Type 4A molecular sieve'),
  ('PM020', 'Airless Pumps', '30ml dispensing pump', '{"name": "PumpTech", "contact": "Wade Wilson", "email": "wade@pumptech.com", "phone": "+91 98765 43249", "address": "Siliguri, India"}', 'unit', 22.50, 'PM', 'Output 0.25ml per stroke'),

  -- More Finished Goods
  ('FG006', 'Joint Support Complex', 'Tablet formulation', NULL, 'unit', 520.00, 'FG', 'Hardness 4-6 kp'),
  ('FG007', 'Immune Boost Powder', 'Flavored powder blend', NULL, 'unit', 680.00, 'FG', 'Moisture content <4%'),
  ('FG008', 'Beauty Collagen Drink', 'Ready to mix powder', NULL, 'unit', 890.00, 'FG', 'Dissolution <3 minutes'),
  ('FG009', 'Probiotic Complex', 'Capsule formulation', NULL, 'unit', 420.00, 'FG', 'CFU count verified'),
  ('FG010', 'Sleep Support Gummies', 'Finished gummies', NULL, 'unit', 350.00, 'FG', 'Texture and appearance checked'),

  -- Final Raw Materials
  ('RM021', 'Creatine Monohydrate', 'Creapure grade', '{"name": "CreaTech", "contact": "Scott Lang", "email": "scott@createch.com", "phone": "+91 98765 43250", "address": "Mangalore, India"}', 'kilogram', 850.00, 'RM', 'Creapure certified material'),
  ('RM022', 'Whey Protein Isolate', '90% protein', '{"name": "ProteinCo", "contact": "Carol Danvers", "email": "carol@proteinco.com", "phone": "+91 98765 43251", "address": "Visakhapatnam, India"}', 'kilogram', 980.00, 'RM', 'Protein by Kjeldahl >90%'),
  ('RM023', 'MCT Powder', 'Spray dried powder', '{"name": "LipidTech", "contact": "Stephen Strange", "email": "stephen@lipidtech.com", "phone": "+91 98765 43252", "address": "Agra, India"}', 'kilogram', 720.00, 'RM', 'C8:C10 ratio 60:40'),
  ('RM024', 'Garcinia Extract', '60% HCA', '{"name": "HerbalEx", "contact": "Wanda Max", "email": "wanda@herbalex.com", "phone": "+91 98765 43253", "address": "Varanasi, India"}', 'kilogram', 1100.00, 'RM', 'HCA content >60%'),
  ('RM025', 'Beta Glucan', 'Yeast derived', '{"name": "ImmunoTech", "contact": "Vision", "email": "vision@immunotech.com", "phone": "+91 98765 43254", "address": "Allahabad, India"}', 'kilogram', 3200.00, 'RM', 'Purity >85%');