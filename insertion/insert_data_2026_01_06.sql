-- Insert Data for 6 Jan 2026
-- Run this script in MySQL

-- 1. Insert Products (Ignore if exists)
INSERT IGNORE INTO products (name) VALUES
('DORB/RBDOC'),
('DORB/RBDOC (Hipro)'),
('DORB/RBDOC (Andhra)'),
('SOYA DOC'),
('SOYA DOC (Hipro)'),
('SOYA DOC (45%)'),
('SOYA DOC (46%)'),
('SOYA DOC (48%)'),
('SOYA DOC (50%)'),
('GN DOC (45%)'),
('GN DOC (50%)'),
('GN DOC (40%)'),
('GN DOC (52%)'),
('MUSTARD DOC'),
('COTTON DOC (38%)'),
('COTTON DOC (40%)'),
('COTTON DOC (46%)');

-- 2. Insert Suppliers (Using Check to avoid duplicates)
INSERT INTO suppliers (name, location) SELECT 'Ramdev Baba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'SaiBaba Naturals', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Jayshree', 'Durg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Jayshree' AND location='Durg');
INSERT INTO suppliers (name, location) SELECT 'Chaitanya Solv', 'Neora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora');
INSERT INTO suppliers (name, location) SELECT 'Rudrapur Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rudrapur Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Abhay Solv', 'Koppal' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Abhay Solv' AND location='Koppal');
INSERT INTO suppliers (name, location) SELECT 'Ritesh', 'Khanna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ritesh' AND location='Khanna');
INSERT INTO suppliers (name, location) SELECT 'Sael', 'Ghazipur (UP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sael' AND location='Ghazipur (UP)');
INSERT INTO suppliers (name, location) SELECT 'Ramnivas', 'Lucknow' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramnivas' AND location='Lucknow');
INSERT INTO suppliers (name, location) SELECT 'Novatech', 'Khargapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Novatech' AND location='Khargapur');
INSERT INTO suppliers (name, location) SELECT 'Raigarh Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Raigarh Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Madhavi Solv', 'Raichur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Madhavi Solv' AND location='Raichur');
INSERT INTO suppliers (name, location) SELECT 'Maheshwari', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'SLS Agro', 'Kartagi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='SLS Agro' AND location='Kartagi');
INSERT INTO suppliers (name, location) SELECT 'Om Kalyani', 'Sonikpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Om Kalyani' AND location='Sonikpur');
INSERT INTO suppliers (name, location) SELECT 'Tirupati Solv', 'Hardoi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tirupati Solv' AND location='Hardoi');
INSERT INTO suppliers (name, location) SELECT 'Panchasheel Solv', 'Rajnandgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon');
INSERT INTO suppliers (name, location) SELECT 'Surago', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Surago' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Bindu Pawani', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Bindu Pawani' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'Vijay', 'Vijaywada' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Vijay' AND location='Vijaywada');
INSERT INTO suppliers (name, location) SELECT 'Sethia', 'Kolkata' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sethia' AND location='Kolkata');
INSERT INTO suppliers (name, location) SELECT 'Avadh', 'Bahraich' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Avadh' AND location='Bahraich');
INSERT INTO suppliers (name, location) SELECT 'Ashok Dall Mill', 'Itarsi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ashok Dall Mill' AND location='Itarsi');
INSERT INTO suppliers (name, location) SELECT 'Siddhivinayak', 'Gondia' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia');
INSERT INTO suppliers (name, location) SELECT 'Venkata Narsimha Solv', 'Warangal' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Venkata Narsimha Solv' AND location='Warangal');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Fats', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Fats' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'Nandadagudi Oils', 'Belgaum' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nandadagudi Oils' AND location='Belgaum');
INSERT INTO suppliers (name, location) SELECT 'Beni', 'Gujarat' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Beni' AND location='Gujarat');
INSERT INTO suppliers (name, location) SELECT 'Kalyani', 'Malda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Kalyani' AND location='Malda');
INSERT INTO suppliers (name, location) SELECT 'Om Shri Sai', 'Bhuvneshwar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Om Shri Sai' AND location='Bhuvneshwar');
INSERT INTO suppliers (name, location) SELECT 'Shri Krishna', 'Bargarh' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shri Krishna' AND location='Bargarh');
INSERT INTO suppliers (name, location) SELECT 'Shiv Group', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shiv Group' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Mahesh', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Soyug', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soyug' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Living Foods', 'Shujalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Living Foods' AND location='Shujalpur');
INSERT INTO suppliers (name, location) SELECT 'Deesan Agro', 'Dhule' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Deesan Agro' AND location='Dhule');
INSERT INTO suppliers (name, location) SELECT 'Shrinivasa Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shrinivasa Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Aadityaa Protein', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Tania Industries', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tania Industries' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'ROC', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ROC' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'National Industries', 'Dhoraji' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='National Industries' AND location='Dhoraji');
INSERT INTO suppliers (name, location) SELECT 'Divya Solv', 'Kuvadva' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva');
INSERT INTO suppliers (name, location) SELECT 'Anmol Solv', 'Gomta' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol Solv' AND location='Gomta');
INSERT INTO suppliers (name, location) SELECT 'Nuchem', 'Bikaner' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nuchem' AND location='Bikaner');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Alwar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Morena' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Morena');
INSERT INTO suppliers (name, location) SELECT 'Patanjali Foods', 'Baran' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Patanjali Foods' AND location='Baran');
INSERT INTO suppliers (name, location) SELECT 'Patanjali Foods', 'Sriganganagar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Patanjali Foods' AND location='Sriganganagar');
INSERT INTO suppliers (name, location) SELECT 'RH Solv', 'Seoni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RH Solv' AND location='Seoni');
INSERT INTO suppliers (name, location) SELECT 'Thakurji Solv', 'Jalna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna');

-- 3. Insert Prices
INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES
-- DORB/RBDOC
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur' LIMIT 1), 13700, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur' LIMIT 1), 14000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur' LIMIT 1), 13700, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Jayshree' AND location='Durg' LIMIT 1), 13700, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 13500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 15800, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 13600, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 17500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Abhay Solv' AND location='Koppal' LIMIT 1), 14900, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Abhay Solv' AND location='Koppal' LIMIT 1), 15400, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritesh' AND location='Khanna' LIMIT 1), 11700, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sael' AND location='Ghazipur (UP)' LIMIT 1), 12000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramnivas' AND location='Lucknow' LIMIT 1), 12500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Novatech' AND location='Khargapur' LIMIT 1), 13000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 13500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 15800, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Madhavi Solv' AND location='Raichur' LIMIT 1), 15000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad' LIMIT 1), 15000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='SLS Agro' AND location='Kartagi' LIMIT 1), 14500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Om Kalyani' AND location='Sonikpur' LIMIT 1), 15500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tirupati Solv' AND location='Hardoi' LIMIT 1), 12000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon' LIMIT 1), 13400, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Surago' AND location='Bundi' LIMIT 1), 11900, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Bindu Pawani' AND location='Hyderabad' LIMIT 1), 14500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Vijay' AND location='Vijaywada' LIMIT 1), 15000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sethia' AND location='Kolkata' LIMIT 1), 12000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 13800, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 12300, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ashok Dall Mill' AND location='Itarsi' LIMIT 1), 12500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia' LIMIT 1), 12800, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Venkata Narsimha Solv' AND location='Warangal' LIMIT 1), 13500, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Fats' AND location='Hyderabad' LIMIT 1), 15000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nandadagudi Oils' AND location='Belgaum' LIMIT 1), 16000, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Beni' AND location='Gujarat' LIMIT 1), 11800, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Kalyani' AND location='Malda' LIMIT 1), 14200, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Om Shri Sai' AND location='Bhuvneshwar' LIMIT 1), 13200, '2026-01-06'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shri Krishna' AND location='Bargarh' LIMIT 1), 12800, '2026-01-06'),

-- SOYA DOC
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 39000, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 42500, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 39200, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 43200, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 39000, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 42700, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 38000, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 40000, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 42000, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 38500, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 42500, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shrinivasa Agro' AND location='Nanded' LIMIT 1), 38500, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 39500, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 43000, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 39500, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 40000, '2026-01-06'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 43500, '2026-01-06'),

-- GN DOC
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 29500, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 31250, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 28500, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 31000, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 26500, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 28500, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 27000, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 29500, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 31000, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 29500, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 31500, '2026-01-06'),
((SELECT id FROM products WHERE name='GN DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 33500, '2026-01-06'),

-- MUSTARD DOC
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 21500, '2026-01-06'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Kota' LIMIT 1), 22000, '2026-01-06'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar' LIMIT 1), 22000, '2026-01-06'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Morena' LIMIT 1), 22000, '2026-01-06'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Patanjali Foods' AND location='Baran' LIMIT 1), 21500, '2026-01-06'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Patanjali Foods' AND location='Sriganganagar' LIMIT 1), 22000, '2026-01-06'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RH Solv' AND location='Seoni' LIMIT 1), 22200, '2026-01-06'),

-- COTTON DOC
((SELECT id FROM products WHERE name='COTTON DOC (38%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 28000, '2026-01-06'),
((SELECT id FROM products WHERE name='COTTON DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 29000, '2026-01-06'),
((SELECT id FROM products WHERE name='COTTON DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 31000, '2026-01-06');
