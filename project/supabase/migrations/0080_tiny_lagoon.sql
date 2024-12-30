-- Add external dependency flag to tasks
ALTER TABLE tasks
ADD COLUMN has_external_dependency boolean NOT NULL DEFAULT false;