-- Insert Data for 31 Dec 2025
-- Run this script in MySQL

-- 1. Insert Products (Safe to run, ignores if name exists)
INSERT IGNORE INTO products (name) VALUES
('SUN FLOWER DOC'),
('DORB/RBDOC'),
('DORB/RBDOC (Hipro)'),
('DORB/RBDOC (1st Quality)'),
('DORB/RBDOC (2nd Quality)'),
('DORB/RBDOC (Andhra)'),
('DORB/RBDOC (Pallets)'),
('SOYA DOC'),
('SOYA DOC (Hipro)'),
('SOYA DOC (46%)'),
('SOYA DOC (50%)'),
('SOYA DOC (52%)'),
('SOYA DOC (48%)'),
('SOYA DOC (47%)'),
('SOYA DOC (45%)'),
('GN DOC (45%)'),
('GN DOC (50%)'),
('GN DOC (40%)'),
('GN DOC (52%)'),
('MAIZE DOC'),
('MUSTARD DOC'),
('COTTON DOC (38%)'),
('COTTON DOC (40%)'),
('COTTON DOC (46%)');

-- 2. Insert Suppliers (Using Check to avoid duplicates)
INSERT INTO suppliers (name, location) SELECT 'MK Agro', 'Challakare' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='MK Agro' AND location='Challakare');
INSERT INTO suppliers (name, location) SELECT 'RamdevBaba', 'Brahmapuri' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri');
INSERT INTO suppliers (name, location) SELECT 'Panchasheel Solv', 'Rajnandgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon');
INSERT INTO suppliers (name, location) SELECT 'Chaitanya Solv', 'Neora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora');
INSERT INTO suppliers (name, location) SELECT 'Jayshree', 'Durg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Jayshree' AND location='Durg');
INSERT INTO suppliers (name, location) SELECT 'Maheshwari', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'Ritesh', 'Khanna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ritesh' AND location='Khanna');
INSERT INTO suppliers (name, location) SELECT 'Pep Agro', 'Kolkata' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Pep Agro' AND location='Kolkata');
INSERT INTO suppliers (name, location) SELECT 'Novatech', 'Khargapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Novatech' AND location='Khargapur');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bhubaneswar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bargarh' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bargarh');
INSERT INTO suppliers (name, location) SELECT 'SaiBaba Naturals', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Sudiksha', 'Bellary' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sudiksha' AND location='Bellary');
INSERT INTO suppliers (name, location) SELECT 'Orchard Solv', 'Tiruppur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Orchard Solv' AND location='Tiruppur');
INSERT INTO suppliers (name, location) SELECT 'Kalyani', 'Malda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Kalyani' AND location='Malda');
INSERT INTO suppliers (name, location) SELECT 'Krupalu', 'Orissa' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Krupalu' AND location='Orissa');
INSERT INTO suppliers (name, location) SELECT 'Shivangi', 'Bilaspur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shivangi' AND location='Bilaspur');
INSERT INTO suppliers (name, location) SELECT 'Siddhivinayak', 'Gondia' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia');
INSERT INTO suppliers (name, location) SELECT 'Ramdev Baba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Surago Agro', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Surago Agro' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Deesan Agro', 'Dhule' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Deesan Agro' AND location='Dhule');
INSERT INTO suppliers (name, location) SELECT 'Shyamkala Agro', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Satna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Satna');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Betul' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Betul');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Living Foods', 'Shujalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Living Foods' AND location='Shujalpur');
INSERT INTO suppliers (name, location) SELECT 'Soyug', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soyug' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Shiv Group', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shiv Group' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'ABIS Foods', 'Rajnandgaon (CG)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)');
INSERT INTO suppliers (name, location) SELECT 'ABIS Foods', 'Badnawar (MP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)');
INSERT INTO suppliers (name, location) SELECT 'Ekdant Soya', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ekdant Soya' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Mantora', 'Kanpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mantora' AND location='Kanpur');
INSERT INTO suppliers (name, location) SELECT 'Darshana Solv', 'Barshi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Darshana Solv' AND location='Barshi');
INSERT INTO suppliers (name, location) SELECT 'Narayana Agro', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Narayana Agro' AND location='Udgir');
INSERT INTO suppliers (name, location) SELECT 'Soya Plus', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soya Plus' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Beni', 'Gujarat' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Beni' AND location='Gujarat');
INSERT INTO suppliers (name, location) SELECT 'Om/Kalyani', 'Sonikpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Om/Kalyani' AND location='Sonikpur');
INSERT INTO suppliers (name, location) SELECT 'Rudrapur Solv', 'Rudrapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Fats', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Fats' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'Vijay', 'Vijaywada' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Vijay' AND location='Vijaywada');
INSERT INTO suppliers (name, location) SELECT 'ROC', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ROC' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'Rajesh', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rajesh' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'National Industries', 'Dhoraji' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='National Industries' AND location='Dhoraji');
INSERT INTO suppliers (name, location) SELECT 'Anmol Solv', 'Gomta' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol Solv' AND location='Gomta');
INSERT INTO suppliers (name, location) SELECT 'Divya Solv', 'Kuvadva' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva');
INSERT INTO suppliers (name, location) SELECT 'Nuchem', 'Bikaner' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nuchem' AND location='Bikaner');
INSERT INTO suppliers (name, location) SELECT 'Shrinivasa Cattel', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shrinivasa Cattel' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Tulja Bhavani', 'Murud' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud');
INSERT INTO suppliers (name, location) SELECT 'Minakshi Solv', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Minakshi Solv' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Octagon Foods', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Octagon Foods' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Sonai Edibles', 'Indapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sonai Edibles' AND location='Indapur');
INSERT INTO suppliers (name, location) SELECT 'Salasar', 'Harda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Salasar' AND location='Harda');
INSERT INTO suppliers (name, location) SELECT 'ADM DESH', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ADM DESH' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'ADM DESH', 'Warangal' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ADM DESH' AND location='Warangal');
INSERT INTO suppliers (name, location) SELECT 'Yashhtej Industries', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Yashhtej Industries' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Agrocean', 'Majalgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Agrocean' AND location='Majalgaon');
INSERT INTO suppliers (name, location) SELECT 'Siri Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siri Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Aadityaa Protein', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Coronation', 'Biaora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Coronation' AND location='Biaora');
INSERT INTO suppliers (name, location) SELECT 'Tania Industries', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tania Industries' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Shalimar', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shalimar' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Latur Solv', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Latur Solv' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Sachin Proteins', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir');
INSERT INTO suppliers (name, location) SELECT 'Snehil Soya', 'Sagar (MP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Snehil Soya' AND location='Sagar (MP)');
INSERT INTO suppliers (name, location) SELECT 'Amrit Refined', 'Mandsaur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur');
INSERT INTO suppliers (name, location) SELECT 'RH Solv', 'Seoni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RH Solv' AND location='Seoni');
INSERT INTO suppliers (name, location) SELECT 'Patanjali Foods', 'Baran' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Patanjali Foods' AND location='Baran');
INSERT INTO suppliers (name, location) SELECT 'Thakurji Solv', 'Jalna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna');

-- 3. Insert Prices
INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES
-- SUN FLOWER DOC
((SELECT id FROM products WHERE name='SUN FLOWER DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='MK Agro' AND location='Challakare' LIMIT 1), 23000, '2025-12-31'),

-- DORB/RBDOC
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri' LIMIT 1), 13200, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri' LIMIT 1), 15400, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon' LIMIT 1), 12800, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 12900, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 15200, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Jayshree' AND location='Durg' LIMIT 1), 13100, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad' LIMIT 1), 14300, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritesh' AND location='Khanna' LIMIT 1), 11400, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritesh' AND location='Khanna' LIMIT 1), 11600, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Pep Agro' AND location='Kolkata' LIMIT 1), 12700, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC (2nd Quality)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Pep Agro' AND location='Kolkata' LIMIT 1), 10200, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Novatech' AND location='Khargapur' LIMIT 1), 12800, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar' LIMIT 1), 13000, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bargarh' LIMIT 1), 12500, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur' LIMIT 1), 13525, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur' LIMIT 1), 13225, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sudiksha' AND location='Bellary' LIMIT 1), 14500, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Orchard Solv' AND location='Tiruppur' LIMIT 1), 15600, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Kalyani' AND location='Malda' LIMIT 1), 14500, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Krupalu' AND location='Orissa' LIMIT 1), 12800, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shivangi' AND location='Bilaspur' LIMIT 1), 13000, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia' LIMIT 1), 12800, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur' LIMIT 1), 13400, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Surago Agro' AND location='Bundi' LIMIT 1), 11600, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Beni' AND location='Gujarat' LIMIT 1), 11700, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Om/Kalyani' AND location='Sonikpur' LIMIT 1), 15500, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 12700, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur' LIMIT 1), 13400, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Pallets)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur' LIMIT 1), 13600, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur' LIMIT 1), 17500, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Fats' AND location='Hyderabad' LIMIT 1), 14500, '2025-12-31'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Vijay' AND location='Vijaywada' LIMIT 1), 14500, '2025-12-31'),

-- SOYA DOC
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 37000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 41000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur' LIMIT 1), 39000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Satna' LIMIT 1), 41500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Betul' LIMIT 1), 40500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Solapur' LIMIT 1), 38000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 36000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 38000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 40000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 36500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 40000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 36500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 40000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 39250, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 41000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)' LIMIT 1), 38250, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)' LIMIT 1), 40000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ekdant Soya' AND location='Nanded' LIMIT 1), 38000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 36500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Darshana Solv' AND location='Barshi' LIMIT 1), 37000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 37000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 40500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soya Plus' AND location='Solapur' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shrinivasa Cattel' AND location='Nanded' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud' LIMIT 1), 37000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud' LIMIT 1), 38500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud' LIMIT 1), 40000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Minakshi Solv' AND location='Latur' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (47%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 38500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 39500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sonai Edibles' AND location='Indapur' LIMIT 1), 38000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Salasar' AND location='Harda' LIMIT 1), 35800, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ADM DESH' AND location='Latur' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ADM DESH' AND location='Warangal' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Yashhtej Industries' AND location='Latur' LIMIT 1), 37700, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Yashhtej Industries' AND location='Latur' LIMIT 1), 40700, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Agrocean' AND location='Majalgaon' LIMIT 1), 38000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (47%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Agrocean' AND location='Majalgaon' LIMIT 1), 39000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Agrocean' AND location='Majalgaon' LIMIT 1), 40000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siri Agro' AND location='Nanded' LIMIT 1), 38001, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 41000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 35800, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 37800, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 39800, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 37000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 37500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 41000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shalimar' AND location='Nagpur' LIMIT 1), 41000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Latur Solv' AND location='Latur' LIMIT 1), 36800, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir' LIMIT 1), 38000, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir' LIMIT 1), 41500, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Snehil Soya' AND location='Sagar (MP)' LIMIT 1), 35700, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur' LIMIT 1), 35200, '2025-12-31'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur' LIMIT 1), 39000, '2025-12-31'),

-- GN DOC
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 28000, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 29500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rajesh' AND location='Rajkot' LIMIT 1), 28000, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rajesh' AND location='Rajkot' LIMIT 1), 29500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 26500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 28000, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 29000, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 25000, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 28000, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 29500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 26500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 28500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 28500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 30500, '2025-12-31'),
((SELECT id FROM products WHERE name='GN DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 32500, '2025-12-31'),

-- MUSTARD DOC
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RH Solv' AND location='Seoni' LIMIT 1), 22200, '2025-12-31'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 22500, '2025-12-31'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 21500, '2025-12-31'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Patanjali Foods' AND location='Baran' LIMIT 1), 21100, '2025-12-31'),

-- COTTON DOC
((SELECT id FROM products WHERE name='COTTON DOC (38%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 28000, '2025-12-31'),
((SELECT id FROM products WHERE name='COTTON DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 29000, '2025-12-31'),
((SELECT id FROM products WHERE name='COTTON DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 31000, '2025-12-31');
