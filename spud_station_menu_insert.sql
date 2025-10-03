-- Spud Station Menu Data Insertion
-- This SQL script adds all Spud Station menu items, categories, variations, and add-ons to the database

-- First, add the new categories for Spud Station
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('baked-potatoes', 'Baked Potatoes', '🥔', 5, true),
  ('flavored-fries', 'Flavored Fries', '🍟', 6, true),
  ('milkshakes', 'Milkshakes', '🥤', 7, true),
  ('others', 'Others', '🍽️', 8, true)
ON CONFLICT (id) DO NOTHING;

-- Add Fries Add-ons category for add-ons
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('fries-addons', 'Fries Add-ons', '🧀', 9, true)
ON CONFLICT (id) DO NOTHING;

-- Insert Baked Potatoes menu items
INSERT INTO menu_items (id, name, description, base_price, category, popular, available, image_url) VALUES
  (gen_random_uuid(), 'Cheese & Butter', 'Classic baked potato with melted cheese and butter', 119.00, 'baked-potatoes', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Cheese & Corn', 'Baked potato topped with cheese and sweet corn', 129.00, 'baked-potatoes', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Cheese & Beans', 'Baked potato with cheese and beans', 129.00, 'baked-potatoes', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Chili Beans Con Carne', 'Baked potato with chili beans and meat', 139.00, 'baked-potatoes', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Cheese & Bacon', 'Baked potato with cheese and crispy bacon', 159.00, 'baked-potatoes', true, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Cheesy Chicken Pop', 'Baked potato with cheesy chicken pop', 159.00, 'baked-potatoes', true, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Creamy Chicken Mushroom', 'Baked potato with creamy chicken and mushroom', 159.00, 'baked-potatoes', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Cheese & Beef', 'Baked potato with cheese and beef', 169.00, 'baked-potatoes', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'OVERLOAD BAKED POTATO', 'The ultimate loaded baked potato with all the toppings', 199.00, 'baked-potatoes', true, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Regular Fries menu items with variations
INSERT INTO menu_items (id, name, description, base_price, category, popular, available, image_url) VALUES
  (gen_random_uuid(), 'Regular Fries', 'Crispy golden fries with your choice of flavor', 109.00, 'flavored-fries', true, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Get the Regular Fries menu item ID for variations
-- Note: In a real scenario, you would need to get the actual UUID generated
-- For this example, we'll use a placeholder approach

-- Insert Regular Fries variations
-- First, let's get the menu item ID for Regular Fries
DO $$
DECLARE
    regular_fries_id uuid;
BEGIN
    -- Get the ID of the Regular Fries menu item
    SELECT id INTO regular_fries_id 
    FROM menu_items 
    WHERE name = 'Regular Fries' AND category = 'flavored-fries';
    
    -- Insert variations for Regular Fries
    INSERT INTO variations (menu_item_id, name, price) VALUES
        (regular_fries_id, 'Cheese', 0.00),
        (regular_fries_id, 'Sour Cream', 0.00),
        (regular_fries_id, 'Barbeque', 0.00),
        (regular_fries_id, 'Chili Barbeque', 0.00);
END $$;

-- Insert Loaded Fries menu items
INSERT INTO menu_items (id, name, description, base_price, category, popular, available, image_url) VALUES
  (gen_random_uuid(), 'Soy Garlic Chicken Fries', 'Loaded fries with soy garlic chicken', 159.00, 'flavored-fries', true, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Buffalo Chicken Fries', 'Loaded fries with buffalo chicken', 159.00, 'flavored-fries', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Honey Butter Chicken Fries', 'Loaded fries with honey butter chicken', 159.00, 'flavored-fries', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Jalapeño Chicken Fries', 'Loaded fries with jalapeño chicken', 159.00, 'flavored-fries', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Beef Pepper Fries', 'Loaded fries with beef pepper', 159.00, 'flavored-fries', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Milkshakes
INSERT INTO menu_items (id, name, description, base_price, category, popular, available, image_url) VALUES
  (gen_random_uuid(), 'Banana Milkshake', 'Creamy banana milkshake', 99.00, 'milkshakes', true, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Mango Milkshake', 'Refreshing mango milkshake', 109.00, 'milkshakes', true, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Strawberry Milkshake', 'Sweet strawberry milkshake', 119.00, 'milkshakes', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Insert Other Items
INSERT INTO menu_items (id, name, description, base_price, category, popular, available, image_url) VALUES
  (gen_random_uuid(), 'BANANA PUDDING', 'Creamy banana pudding dessert', 109.00, 'others', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Coke 12 oz', 'Refreshing Coca-Cola 12 oz', 30.00, 'others', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800'),
  (gen_random_uuid(), 'Mineral Water', 'Pure mineral water', 20.00, 'others', false, true, 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=800');

-- Add Fries Add-ons to Regular Fries and Loaded Fries
DO $$
DECLARE
    regular_fries_id uuid;
    loaded_fries_ids uuid[];
    addon_id uuid;
BEGIN
    -- Get the ID of the Regular Fries menu item
    SELECT id INTO regular_fries_id 
    FROM menu_items 
    WHERE name = 'Regular Fries' AND category = 'flavored-fries';
    
    -- Get IDs of all Loaded Fries menu items
    SELECT ARRAY_AGG(id) INTO loaded_fries_ids
    FROM menu_items 
    WHERE category = 'flavored-fries' AND name != 'Regular Fries';
    
    -- Add Cheese Sauce add-on to Regular Fries
    INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
        (regular_fries_id, 'Cheese Sauce', 15.00, 'fries-addons');
    
    -- Add Mozzarella Cheese add-on to Regular Fries
    INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
        (regular_fries_id, 'Mozzarella Cheese', 30.00, 'fries-addons');
    
    -- Add add-ons to all Loaded Fries items
    IF loaded_fries_ids IS NOT NULL THEN
        FOREACH addon_id IN ARRAY loaded_fries_ids
        LOOP
            -- Add Cheese Sauce add-on
            INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
                (addon_id, 'Cheese Sauce', 15.00, 'fries-addons');
            
            -- Add Mozzarella Cheese add-on
            INSERT INTO add_ons (menu_item_id, name, price, category) VALUES
                (addon_id, 'Mozzarella Cheese', 30.00, 'fries-addons');
        END LOOP;
    END IF;
END $$;

-- Update site settings for Spud Station
UPDATE site_settings SET value = 'Spud Station' WHERE id = 'site_name';
UPDATE site_settings SET value = 'Welcome to Spud Station - Your perfect baked potato and fries destination' WHERE id = 'site_description';
UPDATE site_settings SET value = 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop' WHERE id = 'site_logo';
