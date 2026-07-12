-- Data Analytics Database Setup
-- Run this script in phpMyAdmin or MySQL CLI

-- Create Database
CREATE DATABASE IF NOT EXISTS data_analytics_db;
USE data_analytics_db;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS prices;
DROP TABLE IF EXISTS admin_users;
DROP TABLE IF EXISTS suppliers;
DROP TABLE IF EXISTS products;

-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers Table
CREATE TABLE suppliers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    location VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Prices Table
CREATE TABLE prices (
    id INT PRIMARY KEY AUTO_INCREMENT,
    product_id INT NOT NULL,
    supplier_id INT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    entry_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE,
    INDEX idx_product_date (product_id, entry_date),
    INDEX idx_supplier_date (supplier_id, entry_date)
);

-- Admin Users Table
CREATE TABLE admin_users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Products
INSERT INTO products (name) VALUES 
('DORB/RBDOC'),
('SOYA DOC (45%)'),
('SOYA DOC (46%)'),
('SOYA DOC (47%)'),
('SOYA DOC (48%)'),
('SOYA DOC (50%)'),
('SOYA DOC (HiPro)'),
('Maize DOC'),
('GN DOC (40%)'),
('GN DOC (45%)'),
('GN DOC (50%)'),
('MUSTARD DOC'),
('COTTON DOC'),
('DORB/RBDOC (Hipro)');

-- Insert Suppliers
INSERT INTO suppliers (name, location) VALUES 
('Ritish', 'Khanna'),
('RamdevBaba', 'Bhrahampuri'),
('Chaitanya Solv', 'Neora'),
('Jayshree', 'Durg'),
('Shivangi', 'Bilaspur'),
('Rudrapur Solv', 'Rudrapur'),
('Surago', 'Bundi'),
('Seahawk', 'Aurangabad (Bihar)'),
('Suryamitra', 'Katni'),
('Saibaba Naturals', 'Nagpur'),
('Ramdev Baba Solv', 'Nagpur'),
('SLS Agro', 'Kartagi'),
('Maheshwari', 'Hyderabad'),
('Kalyani', 'Malda'),
('Om Shri Sai', 'Bhuvneshwar'),
('Growing Tree', 'Bhuneshwar'),
('Bargarh', 'Bargarh'),
('Anmol', 'Kolkata'),
('Siddhivinayak', 'Gondia'),
('Aadityaa Protein', 'Nagpur'),
('Betul oil', 'Satna'),
('Betul oil', 'Betul'),
('Betul oil', 'Solapur'),
('Rayat Agro', 'Dharashiv'),
('Deesan Agro', 'Dhule'),
('Living Foods', 'Shujalpur'),
('Shiv Group', 'Kota'),
('Dhakshita Solv', 'Warangal'),
('Vijay', 'Vijaywada'),
('Abhay Solv', 'Koppal'),
('Orchard Solv', 'Tiruppur'),
('Shri Krishna', 'Bargarh'),
('Ramdev', 'Piparia'),
('Shrinivasa Cattel', 'Nanded'),
('Sachin Proteins', 'Udgir'),
('Siri Agro', 'Nanded'),
('Vijay Soya', 'Latur'),
('Tulija Bhavani Soya', 'Murud'),
('Agrocean', 'Majalgaon'),
('Kanhaiya Solv', 'Barnala'),
('Shree Ram', 'Patiala'),
('Shree Sita Solv', 'Nagpur'),
('Sai Baba Solv', 'Nagpur'),
('ROC', 'Rajkot'),
('Rajesh', 'Rajkot'),
('National Industries', 'Dhoraji'),
('Divya Solv', 'Kuvadva'),
('Nuchem', 'Bikaner'),
('Shymakala Agro', 'Nagpur'),
('Shalimar', 'Nagpur'),
('Narayana Agro', 'Udgir'),
('Minakshi Solv', 'Latur'),
('Amrit Refined', 'Mandsaur'),
('Soyug', 'Bundi'),
('Tania Industries', 'Nagpur'),
('Rajnandgaon', 'Rajnandgaon (CG)'),
('Badnawar', 'Badnawar (MP)'),
('Latur Solv', 'Latur'),
('Sree Siddarameshwara Agro', 'Nanded'),
('Snehil Soya', 'Sagar (MP)'),
('Sanwaria Agro', 'Itarsi'),
('RH Solv', 'Seoni'),
('Midiya', 'Radhanpur'),
('Patanjali Foods', 'Baran'),
('AWL (Adani)', 'Alwar'),
('AWL (Adani)', 'Bundi'),
('AWL (Adani)', 'Gohana'),
('Shiv Group', 'Kota'),
('Tirupati Solv', 'Hardoi'),
('Mantora', 'Kanpur'),
('Avadh', 'Bahraich'),
('Ashok Dall Mill', 'Itarsi'),
('AWL', 'Mantralayam'),
('AWL', 'Gohana'),
('Thakurji Solv', 'Jalna'),
('Anmol Solv', 'Gomta (Gujarat)'),
('Vinod', 'Bikaner');

-- Insert Default Admin User (password: admin123)
INSERT INTO admin_users (username, password) VALUES 
('admin', '$2y$10$DW08QOw1lUa1i0BJDQQYF.vwwsHLZudJzS2SwOHcrEy4HqR/.shrC');

-- Insert Sample Prices (for testing Daily Analysis)
-- Prices for Product ID 1 (DORB/RBDOC) on current date
INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES 
(1, 1, 3500.00, CURDATE()),
(1, 2, 3450.00, CURDATE()),
(1, 3, 3520.00, CURDATE()),
(1, 4, 3480.00, CURDATE()),
(1, 5, 3420.00, CURDATE());

-- Prices for Product ID 2 (SOYA DOC 45%) on current date
INSERT INTO prices (product_id, supplier_id, price, entry_date) VALUES 
(2, 6, 4200.00, CURDATE()),
(2, 7, 4150.00, CURDATE()),
(2, 8, 4225.00, CURDATE()),
(2, 9, 4180.00, CURDATE());

-- Verify data
SELECT 'Products count:' as info, COUNT(*) as count FROM products
UNION ALL
SELECT 'Suppliers count:', COUNT(*) FROM suppliers
UNION ALL
SELECT 'Admin users:', COUNT(*) FROM admin_users;
