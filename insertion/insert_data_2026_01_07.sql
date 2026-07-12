-- Insert Data for 7 Jan 2026
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
('SOYA DOC (52%)'),
('GN DOC (40%)'),
('GN DOC (45%)'),
('GN DOC (50%)'),
('GN DOC (52%)'),
('MUSTARD DOC'),
('MAIZE DOC');

-- 2. Insert Suppliers (Using Check to avoid duplicates)
INSERT INTO suppliers (name, location) SELECT 'Ramdevbaba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdevbaba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Saibaba Naturals', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Saibaba Naturals' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Ramdevbaba', 'Brahmapuri' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdevbaba' AND location='Brahmapuri');
INSERT INTO suppliers (name, location) SELECT 'Jayshree', 'Durg' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Jayshree' AND location='Durg');
INSERT INTO suppliers (name, location) SELECT 'Chaitanya Solv', 'Neora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora');
INSERT INTO suppliers (name, location) SELECT 'Rudrapur Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rudrapur Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Ritish Agro', 'Khanna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ritish Agro' AND location='Khanna');
INSERT INTO suppliers (name, location) SELECT 'Novatech', 'Kharagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Novatech' AND location='Kharagpur');
INSERT INTO suppliers (name, location) SELECT 'Avadh', 'Bahraich' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Avadh' AND location='Bahraich');
INSERT INTO suppliers (name, location) SELECT 'Ramdev Agro', 'Pipariya' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramdev Agro' AND location='Pipariya');
INSERT INTO suppliers (name, location) SELECT 'SLS Agro', 'Kartagi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='SLS Agro' AND location='Kartagi');
INSERT INTO suppliers (name, location) SELECT 'Madhavi', 'Raichur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Madhavi' AND location='Raichur');
INSERT INTO suppliers (name, location) SELECT 'Anmol', 'Burdwan' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol' AND location='Burdwan');
INSERT INTO suppliers (name, location) SELECT 'Seahawk', 'Aurangabad (Bihar)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Seahawk' AND location='Aurangabad (Bihar)');
INSERT INTO suppliers (name, location) SELECT 'Balgopal', 'Bargarh' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Balgopal' AND location='Bargarh');
INSERT INTO suppliers (name, location) SELECT 'Suryamitra', 'Katni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Suryamitra' AND location='Katni');
INSERT INTO suppliers (name, location) SELECT 'Siddhinayak', 'Gondia' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siddhinayak' AND location='Gondia');
INSERT INTO suppliers (name, location) SELECT 'Vijay', 'Vijaywada' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Vijay' AND location='Vijaywada');
INSERT INTO suppliers (name, location) SELECT 'Sree Venkata Narsimha', 'Warangal' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sree Venkata Narsimha' AND location='Warangal');
INSERT INTO suppliers (name, location) SELECT 'Srinav', 'Hyderabad' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Srinav' AND location='Hyderabad');
INSERT INTO suppliers (name, location) SELECT 'Beni', 'Gujarat' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Beni' AND location='Gujarat');
INSERT INTO suppliers (name, location) SELECT 'Shivangi', 'Bilaspur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shivangi' AND location='Bilaspur');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bargarh' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bargarh');
INSERT INTO suppliers (name, location) SELECT 'Growing Tree', 'Bhubaneswar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar');
INSERT INTO suppliers (name, location) SELECT 'GPV', 'Birbhum' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='GPV' AND location='Birbhum');
INSERT INTO suppliers (name, location) SELECT 'Surago', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Surago' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Mantora', 'Kanpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mantora' AND location='Kanpur');
INSERT INTO suppliers (name, location) SELECT 'OmKalyani', 'Malda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='OmKalyani' AND location='Malda');
INSERT INTO suppliers (name, location) SELECT 'Om Shri Sai', 'Bhubaneswar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Om Shri Sai' AND location='Bhubaneswar');
INSERT INTO suppliers (name, location) SELECT 'Raigarh Solv', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Raigarh Solv' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Panchsheel', 'Rajnandgaon' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Panchsheel' AND location='Rajnandgaon');

INSERT INTO suppliers (name, location) SELECT 'Deesan Agro', 'Dhule' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Deesan Agro' AND location='Dhule');
INSERT INTO suppliers (name, location) SELECT 'Vijay Soya', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Vijay Soya' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Rayat Agro', 'Dharashiv' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Rayat Agro' AND location='Dharashiv');
INSERT INTO suppliers (name, location) SELECT 'Narayana Agro', 'Udgir' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Narayana Agro' AND location='Udgir');
INSERT INTO suppliers (name, location) SELECT 'Shrinivasa Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shrinivasa Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Soyug', 'Bundi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soyug' AND location='Bundi');
INSERT INTO suppliers (name, location) SELECT 'Shyamkala', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shyamkala' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Aadityaa Proteins', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Aadityaa Proteins' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Shrinivasa Cattle', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shrinivasa Cattle' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Salasar', 'Harda' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Salasar' AND location='Harda');
INSERT INTO suppliers (name, location) SELECT 'Khandwa Oils', 'Khandwa' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Khandwa Oils' AND location='Khandwa');
INSERT INTO suppliers (name, location) SELECT 'Mahesh', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Living Foods', 'Shujalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Living Foods' AND location='Shujalpur');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Satna' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Satna');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Betul' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Betul');
INSERT INTO suppliers (name, location) SELECT 'Betul Oil', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Betul Oil' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Soya Plus', 'Solapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Soya Plus' AND location='Solapur');
INSERT INTO suppliers (name, location) SELECT 'Sonai', 'Indapur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sonai' AND location='Indapur');
INSERT INTO suppliers (name, location) SELECT 'ADM DESH', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ADM DESH' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Minakshi Solv', 'Latur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Minakshi Solv' AND location='Latur');
INSERT INTO suppliers (name, location) SELECT 'Ekdant', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ekdant' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Tulja Bhavani', 'Murud' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud');
INSERT INTO suppliers (name, location) SELECT 'Siri Agro', 'Nanded' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Siri Agro' AND location='Nanded');
INSERT INTO suppliers (name, location) SELECT 'Sanwaria', 'Itarsi' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sanwaria' AND location='Itarsi');
INSERT INTO suppliers (name, location) SELECT 'Tania Industries', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Tania Industries' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Amrit Refined', 'Mandsaur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur');
INSERT INTO suppliers (name, location) SELECT 'Snehil Soya', 'Sagar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Snehil Soya' AND location='Sagar');
INSERT INTO suppliers (name, location) SELECT 'Gupta', 'Morena' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Gupta' AND location='Morena');
INSERT INTO suppliers (name, location) SELECT 'Ramjanki', 'Dewas' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Ramjanki' AND location='Dewas');
INSERT INTO suppliers (name, location) SELECT 'Coronation', 'Biaora' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Coronation' AND location='Biaora');

INSERT INTO suppliers (name, location) SELECT 'ROC', 'Rajkot' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='ROC' AND location='Rajkot');
INSERT INTO suppliers (name, location) SELECT 'National Industries', 'Dhoraji' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='National Industries' AND location='Dhoraji');
INSERT INTO suppliers (name, location) SELECT 'Divya Solv', 'Kuvadva' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva');
INSERT INTO suppliers (name, location) SELECT 'Anmol Solv', 'Gomta (Gujarat)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Anmol Solv' AND location='Gomta (Gujarat)');
INSERT INTO suppliers (name, location) SELECT 'Nuchem', 'Bikaner' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Nuchem' AND location='Bikaner');

INSERT INTO suppliers (name, location) SELECT 'RH', 'Seoni' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='RH' AND location='Seoni');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Kota' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Kota');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Alwar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar');
INSERT INTO suppliers (name, location) SELECT 'Mahesh Edible', 'Morena' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Mahesh Edible' AND location='Morena');
INSERT INTO suppliers (name, location) SELECT 'Patanjali Foods', 'Baran' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Patanjali Foods' AND location='Baran');
INSERT INTO suppliers (name, location) SELECT 'Patanjali Foods', 'Sriganganagar' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Patanjali Foods' AND location='Sriganganagar');

INSERT INTO suppliers (name, location) SELECT 'Shree Sita Solvex', '' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Shree Sita Solvex' AND location='');
INSERT INTO suppliers (name, location) SELECT 'Sai Baba Solv', 'Nagpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Sai Baba Solv' AND location='Nagpur');
INSERT INTO suppliers (name, location) SELECT 'Antarang', 'Jabalpur' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Antarang' AND location='Jabalpur');
INSERT INTO suppliers (name, location) SELECT 'Kanhaiya Solv', 'Barnala (Punjab)' FROM DUAL WHERE NOT EXISTS (SELECT 1 FROM suppliers WHERE name='Kanhaiya Solv' AND location='Barnala (Punjab)');

-- 3. Insert Prices
INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES
-- DORB/RBDOC
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdevbaba Solv' AND location='Nagpur' LIMIT 1), 14100, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Saibaba Naturals' AND location='Nagpur' LIMIT 1), 14200, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Saibaba Naturals' AND location='Nagpur' LIMIT 1), 14500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdevbaba' AND location='Brahmapuri' LIMIT 1), 14000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdevbaba' AND location='Brahmapuri' LIMIT 1), 16200, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Jayshree' AND location='Durg' LIMIT 1), 13900, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 13900, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Chaitanya Solv' AND location='Neora' LIMIT 1), 16200, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rudrapur Solv' AND location='' LIMIT 1), 17700, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ritish Agro' AND location='Khanna' LIMIT 1), 11700, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Novatech' AND location='Kharagpur' LIMIT 1), 13000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 12300, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Avadh' AND location='Bahraich' LIMIT 1), 13800, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev Agro' AND location='Pipariya' LIMIT 1), 12500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='SLS Agro' AND location='Kartagi' LIMIT 1), 15000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Madhavi' AND location='Raichur' LIMIT 1), 15200, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Burdwan' LIMIT 1), 12500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol' AND location='Burdwan' LIMIT 1), 10200, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Seahawk' AND location='Aurangabad (Bihar)' LIMIT 1), 12500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Balgopal' AND location='Bargarh' LIMIT 1), 13000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Balgopal' AND location='Bargarh' LIMIT 1), 15500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Suryamitra' AND location='Katni' LIMIT 1), 13000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siddhinayak' AND location='Gondia' LIMIT 1), 13500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Vijay' AND location='Vijaywada' LIMIT 1), 15000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sree Venkata Narsimha' AND location='Warangal' LIMIT 1), 14500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Srinav' AND location='Hyderabad' LIMIT 1), 15000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Beni' AND location='Gujarat' LIMIT 1), 11800, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shivangi' AND location='Bilaspur' LIMIT 1), 13700, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bargarh' LIMIT 1), 13500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Growing Tree' AND location='Bhubaneswar' LIMIT 1), 14000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='GPV' AND location='Birbhum' LIMIT 1), 12500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Surago' AND location='Bundi' LIMIT 1), 12000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 13000, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='OmKalyani' AND location='Malda' LIMIT 1), 15500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Om Shri Sai' AND location='Bhubaneswar' LIMIT 1), 13500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 13500, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC (Andhra)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Raigarh Solv' AND location='' LIMIT 1), 15800, '2026-01-07'),
((SELECT id FROM products WHERE name='DORB/RBDOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Panchsheel' AND location='Rajnandgaon' LIMIT 1), 13600, '2026-01-07'),

-- SOYA DOC
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 38500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Deesan Agro' AND location='Dhule' LIMIT 1), 42500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Vijay Soya' AND location='Latur' LIMIT 1), 38000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Rayat Agro' AND location='Dharashiv' LIMIT 1), 40000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 38500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Narayana Agro' AND location='Udgir' LIMIT 1), 42000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shrinivasa Agro' AND location='Nanded' LIMIT 1), 39000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 39000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soyug' AND location='Bundi' LIMIT 1), 42800, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shyamkala' AND location='Nagpur' LIMIT 1), 40500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Proteins' AND location='Nagpur' LIMIT 1), 39500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Aadityaa Proteins' AND location='Nagpur' LIMIT 1), 43000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shrinivasa Cattle' AND location='Nanded' LIMIT 1), 38800, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Salasar' AND location='Harda' LIMIT 1), 38800, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Khandwa Oils' AND location='Khandwa' LIMIT 1), 37500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Khandwa Oils' AND location='Khandwa' LIMIT 1), 39500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 40000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 39000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh' AND location='Kota' LIMIT 1), 43000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 38000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 40000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Living Foods' AND location='Shujalpur' LIMIT 1), 42000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Satna' LIMIT 1), 44200, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Betul' LIMIT 1), 43200, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Betul Oil' AND location='Solapur' LIMIT 1), 39500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Soya Plus' AND location='Solapur' LIMIT 1), 39000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sonai' AND location='Indapur' LIMIT 1), 39500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ADM DESH' AND location='' LIMIT 1), 39300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Minakshi Solv' AND location='Latur' LIMIT 1), 39500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ekdant' AND location='Nanded' LIMIT 1), 39000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud' LIMIT 1), 39000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud' LIMIT 1), 40500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tulja Bhavani' AND location='Murud' LIMIT 1), 42000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Siri Agro' AND location='Nanded' LIMIT 1), 39301, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sanwaria' AND location='Itarsi' LIMIT 1), 38700, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 39500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (46%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 40000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Tania Industries' AND location='Nagpur' LIMIT 1), 43500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur' LIMIT 1), 37300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Amrit Refined' AND location='Mandsaur' LIMIT 1), 41300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Snehil Soya' AND location='Sagar' LIMIT 1), 38000, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Gupta' AND location='Morena' LIMIT 1), 37500, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramjanki' AND location='Dewas' LIMIT 1), 38300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramjanki' AND location='Dewas' LIMIT 1), 40300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramjanki' AND location='Dewas' LIMIT 1), 42300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 38300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (48%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 40300, '2026-01-07'),
((SELECT id FROM products WHERE name='SOYA DOC (Hipro)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Coronation' AND location='Biaora' LIMIT 1), 42300, '2026-01-07'),

-- GN DOC
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 30000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='ROC' AND location='Rajkot' LIMIT 1), 31750, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 29000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 31500, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='National Industries' AND location='Dhoraji' LIMIT 1), 30500, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 27000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Divya Solv' AND location='Kuvadva' LIMIT 1), 29000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (40%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta (Gujarat)' LIMIT 1), 28000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta (Gujarat)' LIMIT 1), 30500, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Anmol Solv' AND location='Gomta (Gujarat)' LIMIT 1), 32000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (45%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 30000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (50%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 32000, '2026-01-07'),
((SELECT id FROM products WHERE name='GN DOC (52%)' LIMIT 1), (SELECT id FROM suppliers WHERE name='Nuchem' AND location='Bikaner' LIMIT 1), 34000, '2026-01-07'),

-- MUSTARD DOC
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Gupta' AND location='Morena' LIMIT 1), 21000, '2026-01-07'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='RH' AND location='Seoni' LIMIT 1), 22200, '2026-01-07'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mantora' AND location='Kanpur' LIMIT 1), 22500, '2026-01-07'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Kota' LIMIT 1), 22000, '2026-01-07'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Alwar' LIMIT 1), 22000, '2026-01-07'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Mahesh Edible' AND location='Morena' LIMIT 1), 22000, '2026-01-07'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Patanjali Foods' AND location='Baran' LIMIT 1), 21500, '2026-01-07'),
((SELECT id FROM products WHERE name='MUSTARD DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Patanjali Foods' AND location='Sriganganagar' LIMIT 1), 22000, '2026-01-07'),

-- MAIZE DOC
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Shree Sita Solvex' AND location='' LIMIT 1), 19500, '2026-01-07'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Sai Baba Solv' AND location='Nagpur' LIMIT 1), 19800, '2026-01-07'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Ramdev Agro' AND location='Pipariya' LIMIT 1), 18000, '2026-01-07'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Antarang' AND location='Jabalpur' LIMIT 1), 18500, '2026-01-07'),
((SELECT id FROM products WHERE name='MAIZE DOC' LIMIT 1), (SELECT id FROM suppliers WHERE name='Kanhaiya Solv' AND location='Barnala (Punjab)' LIMIT 1), 17350, '2026-01-07');
