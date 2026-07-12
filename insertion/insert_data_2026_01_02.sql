-- Insert Data for 2 Jan 2026
-- Run this script in MySQL

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
-- Only inserting suppliers that are used in this date's data
-- Standardized locations based on existing data pattern (e.g., adding state code if used previously)

INSERT INTO suppliers (name, location) SELECT 'Rudrapur Solv', 'Rudrapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur');
INSERT INTO suppliers (name, location) SELECT 'Ramdev Baba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'RamdevBaba', 'Brahmapuri' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri');
INSERT INTO suppliers (name, location) SELECT 'Chaitanya Solv', 'Neora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora');
INSERT INTO suppliers (name, location) SELECT 'Jayshree', 'Durg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Jayshree' AND location='Durg');
INSERT INTO suppliers (name, location) SELECT 'Ritesh', 'Khanna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ritesh' AND location='Khanna');
INSERT INTO suppliers (name, location) SELECT 'Madhavi Solv', 'Raichur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Madhavi Solv' AND location='Raichur');
INSERT INTO suppliers (name, location) SELECT 'Abhay Solv', 'Koppal' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Abhay Solv' AND location='Koppal');
INSERT INTO suppliers (name, location) SELECT 'Maheshwari', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'Novatech', 'Khargapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Novatech' AND location='Khargapur');
INSERT INTO suppliers (name, location) SELECT 'Anmol', 'Kolkata' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol' AND location='Kolkata');
INSERT INTO suppliers (name, location) SELECT 'Panchasheel Solv', 'Rajnandgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon');
INSERT INTO suppliers (name, location) SELECT 'Sudiksha', 'Bellary' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sudiksha' AND location='Bellary');
INSERT INTO suppliers (name, location) SELECT 'Mantora', 'Kanpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mantora' AND location='Kanpur');
INSERT INTO suppliers (name, location) SELECT 'Seahawk', 'Aurangabad (Bihar)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Seahawk' AND location='Aurangabad (Bihar)');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bhubaneswar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bargarh' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bargarh');
INSERT INTO suppliers (name, location) SELECT 'Suryamitra', 'Katni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Suryamitra' AND location='Katni');
INSERT INTO suppliers (name, location) SELECT 'Siddhivinayak', 'Gondia' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia');
INSERT INTO suppliers (name, location) SELECT 'Nandadagudi Oils', 'Belgaum' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nandadagudi Oils' AND location='Belgaum');
INSERT INTO suppliers (name, location) SELECT 'Orchard Solv', 'Tiruppur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Orchard Solv' AND location='Tiruppur');
INSERT INTO suppliers (name, location) SELECT 'Tirupati Solv', 'Hardoi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tirupati Solv' AND location='Hardoi');
INSERT INTO suppliers (name, location) SELECT 'Avadh', 'Bahraich' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Avadh' AND location='Bahraich');
INSERT INTO suppliers (name, location) SELECT 'Kalyani', 'Malda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Kalyani' AND location='Malda');
INSERT INTO suppliers (name, location) SELECT 'Surago Agro', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Surago Agro' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'AWL (Adani)', 'Mantralayam' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='AWL (Adani)' AND location='Mantralayam');
INSERT INTO suppliers (name, location) SELECT 'AWL (Adani)', 'Guhana' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='AWL (Adani)' AND location='Guhana');
INSERT INTO suppliers (name, location) SELECT 'Ashok Dall Mill', 'Itarsi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ashok Dall Mill' AND location='Itarsi');
INSERT INTO suppliers (name, location) SELECT 'Om/Kalyani', 'Sonikpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Om/Kalyani' AND location='Sonikpur');
INSERT INTO suppliers (name, location) SELECT 'Ramdev', 'Piparia' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev' AND location='Piparia');

INSERT INTO suppliers (name, location) SELECT 'Deesan Agro', 'Dhule' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Deesan Agro' AND location='Dhule');
INSERT INTO suppliers (name, location) SELECT 'Narayana Agro', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Narayana Agro' AND location='Udgir');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Satna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Satna');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Betul' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Betul');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Soyug', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soyug' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Shiv Group', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shiv Group' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Mahesh', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Amrit Refined', 'Mandsaur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur');
INSERT INTO suppliers (name, location) SELECT 'Salasar', 'Harda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Salasar' AND location='Harda');
INSERT INTO suppliers (name, location) SELECT 'Living Foods', 'Shujalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Living Foods' AND location='Shujalpur');
INSERT INTO suppliers (name, location) SELECT 'Shrinivasa Cattel', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shrinivasa Cattel' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Soya Plus', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soya Plus' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Siri Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siri Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Thakurji Solv', 'Jalna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna');
INSERT INTO suppliers (name, location) SELECT 'Shyamkala Agro', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Snehil Soya', 'Sagar (MP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Snehil Soya' AND location='Sagar (MP)');
INSERT INTO suppliers (name, location) SELECT 'Sonai Edibles', 'Indapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sonai Edibles' AND location='Indapur');
INSERT INTO suppliers (name, location) SELECT 'Tania Industries', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tania Industries' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Aadityaa Protein', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Shalimar', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shalimar' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'ABIS Foods', 'Rajnandgaon (CG)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)');
INSERT INTO suppliers (name, location) SELECT 'ABIS Foods', 'Badnawar (MP)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)');
INSERT INTO suppliers (name, location) SELECT 'Sachin Proteins', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir');

INSERT INTO suppliers (name, location) SELECT 'ROC', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ROC' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'National Industries', 'Dhoraji' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='National Industries' AND location='Dhoraji');
INSERT INTO suppliers (name, location) SELECT 'Anmol Solv', 'Gomta' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol Solv' AND location='Gomta');
INSERT INTO suppliers (name, location) SELECT 'Divya Solv', 'Kuvadva' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva');
INSERT INTO suppliers (name, location) SELECT 'Nuchem', 'Bikaner' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nuchem' AND location='Bikaner');

INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Alwar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Morena' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Morena');
INSERT INTO suppliers (name, location) SELECT 'Patanjali Foods', 'Baran' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Patanjali Foods' AND location='Baran');
INSERT INTO suppliers (name, location) SELECT 'RH Solv', 'Seoni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RH Solv' AND location='Seoni');

INSERT INTO suppliers (name, location) SELECT 'Kanhaiya Solv', 'Barnala' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Kanhaiya Solv' AND location='Barnala');
INSERT INTO suppliers (name, location) SELECT 'Shree Ram', 'Patiala' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shree Ram' AND location='Patiala');
INSERT INTO suppliers (name, location) SELECT 'Antarang', 'Jabalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Antarang' AND location='Jabalpur');
INSERT INTO suppliers (name, location) SELECT 'Shree Sita Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shree Sita Solv' AND location='Nagpur');

-- 3. Insert Prices
INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES
-- DORB/RBDOC
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur' LIMIT 1), 13400, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur' LIMIT 1), 13600, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='Rudrapur' LIMIT 1), 17500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev Baba Solv' AND location='Nagpur' LIMIT 1), 13300, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri' LIMIT 1), 13100, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RamdevBaba' AND location='Brahmapuri' LIMIT 1), 15200, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 12900, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 15200, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Jayshree' AND location='Durg' LIMIT 1), 13100, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritesh' AND location='Khanna' LIMIT 1), 11500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritesh' AND location='Khanna' LIMIT 1), 11700, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Madhavi Solv' AND location='Raichur' LIMIT 1), 14500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Abhay Solv' AND location='Koppal' LIMIT 1), 14400, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Abhay Solv' AND location='Koppal' LIMIT 1), 14900, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Maheshwari' AND location='Hyderabad' LIMIT 1), 14300, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Novatech' AND location='Khargapur' LIMIT 1), 12800, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC (1st Quality)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Kolkata' LIMIT 1), 12500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC (2nd Quality)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Kolkata' LIMIT 1), 10200, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Panchasheel Solv' AND location='Rajnandgaon' LIMIT 1), 12800, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sudiksha' AND location='Bellary' LIMIT 1), 14100, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 12700, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Seahawk' AND location='Aurangabad (Bihar)' LIMIT 1), 12500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar' LIMIT 1), 13000, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bargarh' LIMIT 1), 12500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Suryamitra' AND location='Katni' LIMIT 1), 12500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siddhivinayak' AND location='Gondia' LIMIT 1), 12800, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nandadagudi Oils' AND location='Belgaum' LIMIT 1), 15000, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Orchard Solv' AND location='Tiruppur' LIMIT 1), 15800, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tirupati Solv' AND location='Hardoi' LIMIT 1), 11500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 12200, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 13700, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Kalyani' AND location='Malda' LIMIT 1), 14500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Surago Agro' AND location='Bundi' LIMIT 1), 11600, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='AWL (Adani)' AND location='Mantralayam' LIMIT 1), 14200, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='AWL (Adani)' AND location='Guhana' LIMIT 1), 11400, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ashok Dall Mill' AND location='Itarsi' LIMIT 1), 12300, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Om/Kalyani' AND location='Sonikpur' LIMIT 1), 15500, '2026-01-02'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev' AND location='Piparia' LIMIT 1), 12500, '2026-01-02'),

-- SOYA DOC
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 37000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 41000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 37500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 41000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Satna' LIMIT 1), 41200, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Betul' LIMIT 1), 40200, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Solapur' LIMIT 1), 38000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 38500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 40000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 38500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 40000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 38200, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 40200, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 38500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur' LIMIT 1), 35500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur' LIMIT 1), 39300, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Salasar' AND location='Harda' LIMIT 1), 38000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 38500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 38500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 40500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shrinivasa Cattel' AND location='Nanded' LIMIT 1), 37300, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soya Plus' AND location='Solapur' LIMIT 1), 37300, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nandadagudi Oils' AND location='Belgaum' LIMIT 1), 39000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siri Agro' AND location='Nanded' LIMIT 1), 38001, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 38000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 42000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 44000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur' LIMIT 1), 37500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shyamkala Agro' AND location='Nagpur' LIMIT 1), 39000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Snehil Soya' AND location='Sagar (MP)' LIMIT 1), 38000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sonai Edibles' AND location='Indapur' LIMIT 1), 37500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 37000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 37500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 41000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 37500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Protein' AND location='Nagpur' LIMIT 1), 41000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shalimar' AND location='Nagpur' LIMIT 1), 41500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 38000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 39750, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Rajnandgaon (CG)' LIMIT 1), 41500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)' LIMIT 1), 38750, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ABIS Foods' AND location='Badnawar (MP)' LIMIT 1), 40500, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir' LIMIT 1), 38000, '2026-01-02'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sachin Proteins' AND location='Udgir' LIMIT 1), 41500, '2026-01-02'),

-- GN DOC
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 28000, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 29500, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 26500, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 28000, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 29000, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 25000, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 28000, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta' LIMIT 1), 29500, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 25500, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 27500, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 28500, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 30500, '2026-01-02'),
((SELECT id FROM products WHERE name='GN DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 32500, '2026-01-02'),

-- MUSTARD DOC
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shiv Group' AND location='Kota' LIMIT 1), 21500, '2026-01-02'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Kota' LIMIT 1), 21500, '2026-01-02'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar' LIMIT 1), 21500, '2026-01-02'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Morena' LIMIT 1), 21500, '2026-01-02'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Patanjali Foods' AND location='Baran' LIMIT 1), 21100, '2026-01-02'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 22500, '2026-01-02'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RH Solv' AND location='Seoni' LIMIT 1), 22200, '2026-01-02'),

-- MAIZE DOC
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Kanhaiya Solv' AND location='Barnala' LIMIT 1), 17250, '2026-01-02'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Ram' AND location='Patiala' LIMIT 1), 17500, '2026-01-02'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Ram' AND location='Patiala' LIMIT 1), 18250, '2026-01-02'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Antarang' AND location='Jabalpur' LIMIT 1), 19000, '2026-01-02'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Sita Solv' AND location='Nagpur' LIMIT 1), 19500, '2026-01-02'),

-- COTTON DOC
((SELECT id FROM products WHERE name='COTTON DOC (38%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 28000, '2026-01-02'),
((SELECT id FROM products WHERE name='COTTON DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 29000, '2026-01-02'),
((SELECT id FROM products WHERE name='COTTON DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Thakurji Solv' AND location='Jalna' LIMIT 1), 31000, '2026-01-02');
