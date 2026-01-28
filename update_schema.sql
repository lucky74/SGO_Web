-- Run these commands in your Supabase SQL Editor to update the table

-- Add joined_date column
ALTER TABLE users ADD COLUMN joined_date DATE;

-- Add is_active column with default value true
ALTER TABLE users ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
