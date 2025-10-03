/*
  # Add Delivery Fee Setting

  Add delivery_fee setting to site_settings table with default value of 0
*/

-- Insert delivery fee setting
INSERT INTO site_settings (id, value, type, description) VALUES
  ('delivery_fee', '50', 'number', 'Fixed delivery fee for all delivery orders')
ON CONFLICT (id) DO NOTHING;
