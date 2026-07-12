-- Insert Data for 30 Dec 2025
-- Run this script in MySQL

-- 1. Insert Products (Ignore if exists)
INSERT IGNORE INTO products (name) VALUES
('DORB/RBDOC'),
('DORB/RBDOC (Hipro)'),
('SOYA DOC'),
('SOYA DOC (46%)'),
('SOYA DOC (45%)'),
('SOYA DOC (47%)'),
('SOYA DOC (48%)'),
('SOYA DOC (50%)'),
('SOYA DOC (Hipro)'),
('MAIZE DOC'),
('GN DOC (45%)'),
('GN DOC (50%)'),
('GN DOC (40%)'),
('GN DOC (52%)'),
('MUSTARD DOC'),
('COTTON DOC (38%)'),
('COTTON DOC (40%)'),
('COTTON DOC (46%)');

-- 2. Insert Suppliers
INSERT INTO suppliers (name, location) SELECT 'Ritish', 'Khanna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ritish' AND location='Khanna');
INSERT INTO suppliers (name, location) SELECT 'RamdevBaba', 'Bhrahampuri' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RamdevBaba' AND location='Bhrahampuri');
INSERT INTO suppliers (name, location) SELECT 'Saibaba Naturals', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Saibaba Naturals' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Chaitanya Solv', 'Neora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora');
INSERT INTO suppliers (name, location) SELECT 'Jayshree', 'Durg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Jayshree' AND location='Durg'); -- Image typo "Drug", corrected to Durg
INSERT INTO suppliers (name, location) SELECT 'Rudrapur Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rudrapur Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Ramdev', 'Piparia' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev' AND location='Piparia');
INSERT INTO suppliers (name, location) SELECT 'Seahawk', 'Aurangabad (Bihar)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Seahawk' AND location='Aurangabad (Bihar)');
INSERT INTO suppliers (name, location) SELECT 'RamdevBaba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RamdevBaba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Novatech', 'Khargapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Novatech' AND location='Khargapur');
INSERT INTO suppliers (name, location) SELECT 'Maheshwari', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'SLS Agro', 'Kartagi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='SLS Agro' AND location='Kartagi');
INSERT INTO suppliers (name, location) SELECT 'Anmol', 'Kolkata' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol' AND location='Kolkata');
INSERT INTO suppliers (name, location) SELECT 'Avadh', 'Bahraich' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Avadh' AND location='Bahraich');
INSERT INTO suppliers (name, location) SELECT 'Ramnivas', 'Lucknow' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramnivas' AND location='Lucknow');
INSERT INTO suppliers (name, location) SELECT 'Suryamitra', 'Katni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Suryamitra' AND location='Katni');
INSERT INTO suppliers (name, location) SELECT 'Panchasheel Solv', 'Rajnandgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon');
INSERT INTO suppliers (name, location) SELECT 'Surago Agro', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Surago Agro' AND location='Bundi');

INSERT INTO suppliers (name, location) SELECT 'ADM Desh', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ADM Desh' AND location='');
INSERT INTO suppliers (name, location) SELECT 'ADM Desh', 'Warangal' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ADM Desh' AND location='Warangal');
INSERT INTO suppliers (name, location) SELECT 'Rayat Agro', 'Dharashiv' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rayat Agro' AND location='Dharashiv');
INSERT INTO suppliers (name, location) SELECT 'Shrinivasa Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shrinivasa Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Deesan Agro', 'Dhule' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Deesan Agro' AND location='Dhule');
INSERT INTO suppliers (name, location) SELECT 'Mittal Soya', 'Dewas' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mittal Soya' AND location='Dewas');
INSERT INTO suppliers (name, location) SELECT 'Shiv Group', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shiv Group' AND location='Kota');

INSERT INTO suppliers (name, location) SELECT 'Shree Ram', 'Patiala' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shree Ram' AND location='Patiala');
INSERT INTO suppliers (name, location) SELECT 'Shree Sita Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shree Sita Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Antarang', 'Jabalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Antarang' AND location='Jabalpur');
INSERT INTO suppliers (name, location) SELECT 'Sai Baba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sai Baba Solv' AND location='Nagpur');

INSERT INTO suppliers (name, location) SELECT 'Salasar', 'Harda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Salasar' AND location='Harda');
INSERT INTO suppliers (name, location) SELECT 'Narayana Agro', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Narayana Agro' AND location='Udgir');
INSERT INTO suppliers (name, location) SELECT 'Octagon Foods', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Octagon Foods' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Ekdant Soya', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ekdant Soya' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Soya Plus', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soya Plus' AND location='Latur');

INSERT INTO suppliers (name, location) SELECT 'ROC', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ROC' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'Rajesh', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rajesh' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'National Industries', 'Dhoraji' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='National Industries' AND location='Dhoraji');
INSERT INTO suppliers (name, location) SELECT 'Divya Solv', 'Kuvadva' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva'); -- Typo Kuvadra -> Kuvadva fixed
INSERT INTO suppliers (name, location) SELECT 'Nuchem', 'Bikaner' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nuchem' AND location='Bikaner');
INSERT INTO suppliers (name, location) SELECT 'Anmol Solv', 'Gomta' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol Solv' AND location='Gomta');

INSERT INTO suppliers (name, location) SELECT 'Orchard Solv', 'Tiruppur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Orchard Solv' AND location='Tiruppur');
INSERT INTO suppliers (name, location) SELECT 'Kalyani', 'Malda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Kalyani' AND location='Malda');
INSERT INTO suppliers (name, location) SELECT 'Birbhum Oil', 'West Bengal' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Birbhum Oil' AND location='West Bengal');
INSERT INTO suppliers (name, location) SELECT 'Raigarh Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Raigarh Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Shivangi', 'Bilaspur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shivangi' AND location='Bilaspur');

INSERT INTO suppliers (name, location) SELECT 'RH Solv', 'Seoni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RH Solv' AND location='Seoni');
INSERT INTO suppliers (name, location) SELECT 'Patanjali Foods', 'Baran' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Patanjali Foods' AND location='Baran');
INSERT INTO suppliers (name, location) SELECT 'Thakurji Solv', 'Jalna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna');


-- 3. Insert Prices
INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES
-- DORB/RBDOC
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritish' AND location='Khanna' LIMIT 1), 11300, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritish' AND location='Khanna' LIMIT 1), 11500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Bhrahampuri' LIMIT 1), 13200, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Bhrahampuri' LIMIT 1), 15400, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Saibaba Naturals' AND location='Nagpur' LIMIT 1), 13800, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Saibaba Naturals' AND location='Nagpur' LIMIT 1), 13400, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 12800, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 15000, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Jayshree' AND location='Durg' LIMIT 1), 13100, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 13400, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 13600, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 17500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev' AND location='Piparia' LIMIT 1), 12300, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Seahawk' AND location='Aurangabad (Bihar)' LIMIT 1), 12500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba Solv' AND location='Nagpur' LIMIT 1), 13400, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Novatech' AND location='Khargapur' LIMIT 1), 12800, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad' LIMIT 1), 14200, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='SLS Agro' AND location='Kartagi' LIMIT 1), 14000, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Kolkata' LIMIT 1), 12500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Kolkata' LIMIT 1), 10300, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 13500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramnivas' AND location='Lucknow' LIMIT 1), 12000, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Suryamitra' AND location='Katni' LIMIT 1), 12500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon' LIMIT 1), 12800, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Surago Agro' AND location='Bundi' LIMIT 1), 11500, '2025-12-30'),

-- SOYA DOC
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ADM Desh' AND location='' LIMIT 1), 37500, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ADM Desh' AND location='Warangal' LIMIT 1), 37500, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rayat Agro' AND location='Dharashiv' LIMIT 1), 38000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shrinivasa Agro' AND location='Nanded' LIMIT 1), 37500, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 37000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 41000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mittal Soya' AND location='Dewas' LIMIT 1), 35000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mittal Soya' AND location='Dewas' LIMIT 1), 37500, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mittal Soya' AND location='Dewas' LIMIT 1), 39500, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 36000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 39500, '2025-12-30'),

-- MAIZE DOC
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Ram' AND location='Patiala' LIMIT 1), 17650, '2025-12-30'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Ram' AND location='Patiala' LIMIT 1), 18400, '2025-12-30'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Sita Solv' AND location='Nagpur' LIMIT 1), 19000, '2025-12-30'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Antarang' AND location='Jabalpur' LIMIT 1), 19000, '2025-12-30'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev' AND location='Piparia' LIMIT 1), 18500, '2025-12-30'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sai Baba Solv' AND location='Nagpur' LIMIT 1), 19500, '2025-12-30'),

-- SOYA DOC continued
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Salasar' AND location='Harda' LIMIT 1), 35500, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 37000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 40500, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 37000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (47%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 38000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 39000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ekdant Soya' AND location='Nanded' LIMIT 1), 38000, '2025-12-30'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soya Plus' AND location='Latur' LIMIT 1), 37500, '2025-12-30'),

-- GN DOC
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 28000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 29500, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rajesh' AND location='Rajkot' LIMIT 1), 28000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rajesh' AND location='Rajkot' LIMIT 1), 29500, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 26500, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 29000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 28000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 25500, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 27500, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 28000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 30000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 32000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 25000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 28000, '2025-12-30'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 29500, '2025-12-30'),

-- DORB bottom list
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Orchard Solv' AND location='Tiruppur' LIMIT 1), 15600, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Kalyani' AND location='Malda' LIMIT 1), 14500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Birbhum Oil' AND location='West Bengal' LIMIT 1), 12500, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Birbhum Oil' AND location='West Bengal' LIMIT 1), 11200, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 12800, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 15200, '2025-12-30'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shivangi' AND location='Bilaspur' LIMIT 1), 13000, '2025-12-30'),

-- MUSTARD DOC
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RH Solv' AND location='Seoni' LIMIT 1), 22000, '2025-12-30'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 21500, '2025-12-30'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Patanjali Foods' AND location='Baran' LIMIT 1), 21100, '2025-12-30'),

-- COTTON DOC
((SELECT id FROM products WHERE name='COTTON DOC (38%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 28000, '2025-12-30'),
((SELECT id FROM products WHERE name='COTTON DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 29900, '2025-12-30'),
((SELECT id FROM products WHERE name='COTTON DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 31000, '2025-12-30');
