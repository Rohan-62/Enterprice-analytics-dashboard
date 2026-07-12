-- Insert Data for 5 Jan 2026
-- Run this script in MySQL
-- Fixed version: Handles duplicates and prevents errors if run multiple times.

-- 1. Insert Products (Safe to run, ignores if name exists)
INSERT IGNORE INTO products (name) VALUES
('DORB/RBDOC'),
('DORB/RBDOC (Hipro)'),
('DORB/RBDOC (1st Quality)'),
('DORB/RBDOC (2nd Quality)'),
('DORB/RBDOC (Andhra)'),
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
INSERT INTO suppliers (name, location) SELECT 'Ritesh', 'Khanna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ritesh' AND location='Khanna');
INSERT INTO suppliers (name, location) SELECT 'Ramdev Baba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'SaiBaba Naturals', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Chaitanya Solv', 'Neora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora');
INSERT INTO suppliers (name, location) SELECT 'Jayshree', 'Durg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Jayshree' AND location='Durg');
INSERT INTO suppliers (name, location) SELECT 'Rudrapur Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rudrapur Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Sael', 'Ghazipur (UP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sael' AND location='Ghazipur (UP)');
INSERT INTO suppliers (name, location) SELECT 'Avadh', 'Bahraich' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Avadh' AND location='Bahraich');
INSERT INTO suppliers (name, location) SELECT 'Novatech', 'Khargapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Novatech' AND location='Khargapur');
INSERT INTO suppliers (name, location) SELECT 'Siddhivinayak', 'Gondia' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia');
INSERT INTO suppliers (name, location) SELECT 'SLS Agro', 'Kartagi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='SLS Agro' AND location='Kartagi');
INSERT INTO suppliers (name, location) SELECT 'Madhavi Solv', 'Raichur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Madhavi Solv' AND location='Raichur');
INSERT INTO suppliers (name, location) SELECT 'Tirupati Solv', 'Hardoi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tirupati Solv' AND location='Hardoi');
INSERT INTO suppliers (name, location) SELECT 'Surago', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Surago' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Anmol', 'Kolkata' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol' AND location='Kolkata');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bhubaneswar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bargarh' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bargarh');
INSERT INTO suppliers (name, location) SELECT 'Shivangi', 'Bilaspur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shivangi' AND location='Bilaspur');
INSERT INTO suppliers (name, location) SELECT 'Panchasheel Solv', 'Rajnandgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon');
INSERT INTO suppliers (name, location) SELECT 'Ashok Dall Mill', 'Itarsi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ashok Dall Mill' AND location='Itarsi');
INSERT INTO suppliers (name, location) SELECT 'RamdevBaba', 'Brahmapuri' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri');
INSERT INTO suppliers (name, location) SELECT 'Raigarh Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Raigarh Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Shri Krishna', 'Bargarh' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shri Krishna' AND location='Bargarh');
INSERT INTO suppliers (name, location) SELECT 'Om Shri Sai', 'Bhuvneshwar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Om Shri Sai' AND location='Bhuvneshwar');
INSERT INTO suppliers (name, location) SELECT 'Deesan Agro', 'Dhule' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Deesan Agro' AND location='Dhule');
INSERT INTO suppliers (name, location) SELECT 'Thakurji Solv', 'Jalna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna');
INSERT INTO suppliers (name, location) SELECT 'Rayat Agro', 'Dharashiv' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rayat Agro' AND location='Dharashiv');
INSERT INTO suppliers (name, location) SELECT 'KN Agri', 'Itarsi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='KN Agri' AND location='Itarsi');
INSERT INTO suppliers (name, location) SELECT 'Mittal Soya', 'Dewas' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mittal Soya' AND location='Dewas');
INSERT INTO suppliers (name, location) SELECT 'Coronation', 'Biaora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Coronation' AND location='Biaora');
INSERT INTO suppliers (name, location) SELECT 'Sachin Proteins', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir');
INSERT INTO suppliers (name, location) SELECT 'Tulja Bhavani Soya', 'Murud' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tulja Bhavani Soya' AND location='Murud');
INSERT INTO suppliers (name, location) SELECT 'Octagon Foods', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Octagon Foods' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Sree Siddarameshwara Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sree Siddarameshwara Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Phatak Solv', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Phatak Solv' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Darshana Solv', 'Barshi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Darshana Solv' AND location='Barshi');
INSERT INTO suppliers (name, location) SELECT 'Agrocean', 'Majalgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Agrocean' AND location='Majalgaon');
INSERT INTO suppliers (name, location) SELECT 'Sonai Edibles', 'Indapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sonai Edibles' AND location='Indapur');
INSERT INTO suppliers (name, location) SELECT 'ADM Desh', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ADM Desh' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Siri Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siri Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Vijay Soya', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Vijay Soya' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Shrinivasa Cattel', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shrinivasa Cattel' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Soya Plus', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soya Plus' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Salasar', 'Harda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Salasar' AND location='Harda');
INSERT INTO suppliers (name, location) SELECT 'Soyug', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soyug' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Mahesh', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Sanwaria Agro', 'Itarsi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sanwaria Agro' AND location='Itarsi');
INSERT INTO suppliers (name, location) SELECT 'Narayana Agro', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Narayana Agro' AND location='Udgir');
INSERT INTO suppliers (name, location) SELECT 'Arihant', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Arihant' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Minakshi Solv', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Minakshi Solv' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Shyamkala Agro', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Tania Industries', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tania Industries' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Aadityaa Protein', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Snehil Soya', 'Sagar (MP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Snehil Soya' AND location='Sagar (MP)');
INSERT INTO suppliers (name, location) SELECT 'Shalimar', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shalimar' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Shiv Group', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shiv Group' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'ABIS Foods', 'Rajnandgaon (CG)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)');
INSERT INTO suppliers (name, location) SELECT 'ABIS Foods', 'Badnawar (MP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Satna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Satna');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Betul' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Betul');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Satna Solv', 'Satna (MP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Satna Solv' AND location='Satna (MP)');
INSERT INTO suppliers (name, location) SELECT 'ROC', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ROC' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'National Industries', 'Dhoraji' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='National Industries' AND location='Dhoraji');
INSERT INTO suppliers (name, location) SELECT 'Anmol Solv', 'Gomta' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol Solv' AND location='Gomta');
INSERT INTO suppliers (name, location) SELECT 'Divya Solv', 'Kuvadva' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva');
INSERT INTO suppliers (name, location) SELECT 'Nuchem', 'Bikaner' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nuchem' AND location='Bikaner');
INSERT INTO suppliers (name, location) SELECT 'Ramdev', 'Rajnandgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev' AND location='Rajnandgaon');
INSERT INTO suppliers (name, location) SELECT 'Shree Sita Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shree Sita Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Saibaba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Saibaba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Antarang', 'Jabalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Antarang' AND location='Jabalpur');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Alwar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Morena' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Morena');
INSERT INTO suppliers (name, location) SELECT 'RH Solv', 'Seoni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RH Solv' AND location='Seoni');


-- 3. Insert Prices
-- Helper variables not available in all MySQL contexts, using subqueries with LIMIT 1.

INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES
-- DORB/RBDOC
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritesh' AND location='Khanna' LIMIT 1), 11700, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur' LIMIT 1), 13300, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur' LIMIT 1), 13700, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='SaiBaba Naturals' AND location='Nagpur' LIMIT 1), 13300, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 12900, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 15200, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Jayshree' AND location='Durg' LIMIT 1), 13100, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 13600, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 17500, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sael' AND location='Ghazipur (UP)' LIMIT 1), 12000, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 13700, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 12200, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Novatech' AND location='Khargapur' LIMIT 1), 12800, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia' LIMIT 1), 12800, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='SLS Agro' AND location='Kartagi' LIMIT 1), 14400, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Madhavi Solv' AND location='Raichur' LIMIT 1), 15000, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tirupati Solv' AND location='Hardoi' LIMIT 1), 11500, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Surago' AND location='Bundi' LIMIT 1), 11900, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC (1st Quality)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Kolkata' LIMIT 1), 12500, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC (2nd Quality)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Kolkata' LIMIT 1), 10200, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar' LIMIT 1), 13000, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bargarh' LIMIT 1), 12500, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shivangi' AND location='Bilaspur' LIMIT 1), 13000, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon' LIMIT 1), 12700, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ashok Dall Mill' AND location='Itarsi' LIMIT 1), 12400, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri' LIMIT 1), 13300, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri' LIMIT 1), 15500, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 12800, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 15200, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shri Krishna' AND location='Bargarh' LIMIT 1), 12300, '2026-01-05'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Om Shri Sai' AND location='Bhuvneshwar' LIMIT 1), 12700, '2026-01-05'),

-- SOYA DOC
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 37500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 41500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 42500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 44500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rayat Agro' AND location='Dharashiv' LIMIT 1), 39000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='KN Agri' AND location='Itarsi' LIMIT 1), 37100, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='KN Agri' AND location='Itarsi' LIMIT 1), 39100, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='KN Agri' AND location='Itarsi' LIMIT 1), 41100, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mittal Soya' AND location='Dewas' LIMIT 1), 37000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mittal Soya' AND location='Dewas' LIMIT 1), 39000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mittal Soya' AND location='Dewas' LIMIT 1), 41000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 37000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 39000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 41000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir' LIMIT 1), 42000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani Soya' AND location='Murud' LIMIT 1), 38000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani Soya' AND location='Murud' LIMIT 1), 39500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani Soya' AND location='Murud' LIMIT 1), 41000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (47%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 39500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 40500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sree Siddarameshwara Agro' AND location='Nanded' LIMIT 1), 38000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Phatak Solv' AND location='Latur' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Darshana Solv' AND location='Barshi' LIMIT 1), 38000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Darshana Solv' AND location='Barshi' LIMIT 1), 41500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Agrocean' AND location='Majalgaon' LIMIT 1), 39000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (47%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Agrocean' AND location='Majalgaon' LIMIT 1), 40000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Agrocean' AND location='Majalgaon' LIMIT 1), 41000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sonai Edibles' AND location='Indapur' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ADM Desh' AND location='Latur' LIMIT 1), 38800, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siri Agro' AND location='Nanded' LIMIT 1), 38801, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Vijay Soya' AND location='Latur' LIMIT 1), 37000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shrinivasa Cattel' AND location='Nanded' LIMIT 1), 37800, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soya Plus' AND location='Solapur' LIMIT 1), 38300, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Salasar' AND location='Harda' LIMIT 1), 36500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 42200, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 38200, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 42200, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sanwaria Agro' AND location='Itarsi' LIMIT 1), 37600, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 42100, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Arihant' AND location='Latur' LIMIT 1), 39000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Minakshi Solv' AND location='Latur' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur' LIMIT 1), 40000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 39000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 42500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 39000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 42500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Snehil Soya' AND location='Sagar (MP)' LIMIT 1), 37000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shalimar' AND location='Nagpur' LIMIT 1), 42500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 42000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 39500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 41250, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 43000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)' LIMIT 1), 40250, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)' LIMIT 1), 42000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Satna' LIMIT 1), 43000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Betul' LIMIT 1), 42000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Solapur' LIMIT 1), 38800, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Satna Solv' AND location='Satna (MP)' LIMIT 1), 37700, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 38500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (47%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 39500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Octagon Foods' AND location='Latur' LIMIT 1), 40500, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sree Siddarameshwara Agro' AND location='Nanded' LIMIT 1), 38000, '2026-01-05'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Phatak Solv' AND location='Latur' LIMIT 1), 38500, '2026-01-05'),

-- GN DOC
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 28500, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 30000, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 28009, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 30500, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 29500, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 26000, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 28500, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 30000, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 26000, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 28000, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 29500, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 31500, '2026-01-05'),
((SELECT id FROM products WHERE name='GN DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 33500, '2026-01-05'),

-- MAIZE DOC
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev' AND location='Rajnandgaon' LIMIT 1), 18500, '2026-01-05'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Sita Solv' AND location='Nagpur' LIMIT 1), 19600, '2026-01-05'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Saibaba Solv' AND location='Nagpur' LIMIT 1), 19800, '2026-01-05'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Antarang' AND location='Jabalpur' LIMIT 1), 19000, '2026-01-05'),

-- MUSTARD DOC
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 21500, '2026-01-05'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar' LIMIT 1), 21500, '2026-01-05'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Kota' LIMIT 1), 21500, '2026-01-05'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Morena' LIMIT 1), 21500, '2026-01-05'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RH Solv' AND location='Seoni' LIMIT 1), 22000, '2026-01-05'),

-- COTTON DOC
((SELECT id FROM products WHERE name='COTTON DOC (38%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 28000, '2026-01-05'),
((SELECT id FROM products WHERE name='COTTON DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 29000, '2026-01-05'),
((SELECT id FROM products WHERE name='COTTON DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 31000, '2026-01-05');
