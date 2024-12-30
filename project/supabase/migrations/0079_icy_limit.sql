-- Create ticket category type
CREATE TYPE ticket_category AS ENUM (
  'Dispatch Request',
  'Formulation',
  'Compliance',
  'Sourcing',
  'Packaging',
  'Documentation',
  'Costing',
  'Others'
);

-- Add category column to tickets table (nullable initially)
ALTER TABLE tickets
DROP COLUMN IF EXISTS category;

ALTER TABLE tickets
ADD COLUMN category ticket_category;

-- Update existing tickets to have a default category
UPDATE tickets 
SET category = 'Others'
WHERE category IS NULL;

-- Now make the column non-null
ALTER TABLE tickets
ALTER COLUMN category SET NOT NULL;

-- Update status type constraints
ALTER TABLE tickets 
DROP CONSTRAINT IF EXISTS tickets_status_check;

ALTER TABLE tickets
ADD CONSTRAINT tickets_status_check 
CHECK (status IN ('open', 'in_progress', 'resolved'));

-- Set default status to 'open'
ALTER TABLE tickets
ALTER COLUMN status SET DEFAULT 'open';

-- Update any existing tickets with invalid status
UPDATE tickets
SET status = 'open'
WHERE status NOT IN ('open', 'in_progress', 'resolved');