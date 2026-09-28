-- ╔══════════════════════════════════════════════════════════╗
-- ║  🎓 QA Workshop: SQL Testing สำหรับมือใหม่              ║
-- ║  Database: SQLite (ใช้ได้ทันที ไม่ต้องติดตั้ง)         ║
-- ╚══════════════════════════════════════════════════════════╝
--
-- 📚 SQL ใช้ทำอะไรใน QA?
-- 1. ตรวจสอบว่าข้อมูลถูก Save ลง Database จริงหรือไม่
-- 2. Verify ผลลัพธ์ของ API กับข้อมูลใน Database
-- 3. เตรียม Test Data ก่อนรัน Test
-- 4. ล้างข้อมูลหลัง Test เสร็จ (Cleanup)
--
-- 🛠️ วิธีรัน:
-- SQLite GUI: เปิด DB Browser for SQLite แล้ว run แต่ละ query
-- Command Line: sqlite3 qa_beginner.db < sql/beginner_exercises.sql
-- ─────────────────────────────────────────────────────────────

-- ════════════════════════════════════════════════
-- SECTION 1: สร้าง Database (Schema)
-- ════════════════════════════════════════════════

-- ลบถ้ามีอยู่แล้ว (เพื่อให้รันซ้ำได้)
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

-- ─── ตาราง customers ──────────────────────────────
CREATE TABLE customers (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,  -- รหัส Auto เพิ่มเอง
    name       TEXT    NOT NULL,                   -- ชื่อ (ห้ามว่าง)
    email      TEXT    UNIQUE NOT NULL,            -- อีเมล (ซ้ำไม่ได้)
    phone      TEXT,                               -- เบอร์โทร (ว่างได้)
    status     TEXT    DEFAULT 'active',           -- active หรือ inactive
    created_at TEXT    DEFAULT CURRENT_TIMESTAMP
);

-- ─── ตาราง products ───────────────────────────────
CREATE TABLE products (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT    NOT NULL,
    price      REAL    NOT NULL CHECK(price > 0),  -- ราคาต้องมากกว่า 0
    stock      INTEGER DEFAULT 0,
    category   TEXT
);

-- ─── ตาราง orders ─────────────────────────────────
CREATE TABLE orders (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_id INTEGER NOT NULL,
    status      TEXT    DEFAULT 'pending',  -- pending, paid, cancelled
    total       REAL,
    created_at  TEXT    DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

-- ─── ตาราง order_items ────────────────────────────
CREATE TABLE order_items (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    order_id   INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    qty        INTEGER NOT NULL,
    price      REAL    NOT NULL,
    FOREIGN KEY (order_id)   REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- ════════════════════════════════════════════════
-- SECTION 2: ใส่ข้อมูลทดสอบ (Test Data)
-- ════════════════════════════════════════════════

INSERT INTO customers (name, email, phone, status) VALUES
    ('สมชาย ใจดี',   'somchai@test.com',  '0812345678', 'active'),
    ('สมหญิง ดีใจ',  'somying@test.com',  '0898765432', 'active'),
    ('วิชัย เก่งมาก', 'wichai@test.com',   '0856789012', 'active'),
    ('ลูกค้า Inactive','inactive@test.com', NULL,         'inactive');

INSERT INTO products (name, price, stock, category) VALUES
    ('โน้ตบุ๊ค Lenovo',    25000.00, 10, 'Electronics'),
    ('เมาส์ Wireless',      599.00,  50, 'Electronics'),
    ('กระเป๋าผ้า',          299.00,  30, 'Accessories'),
    ('หูฟัง Bluetooth',    1890.00,  15, 'Electronics'),
    ('สินค้าหมด',            100.00,   0, 'Other');

INSERT INTO orders (customer_id, status, total) VALUES
    (1, 'paid',      25599.00),
    (1, 'paid',       1890.00),
    (2, 'pending',     299.00),
    (3, 'cancelled',   599.00);

INSERT INTO order_items (order_id, product_id, qty, price) VALUES
    (1, 1, 1, 25000.00),
    (1, 2, 1,   599.00),
    (2, 4, 1,  1890.00),
    (3, 3, 1,   299.00),
    (4, 2, 1,   599.00);

-- ════════════════════════════════════════════════
-- SECTION 3: แบบฝึกหัด
-- ════════════════════════════════════════════════

-- ─────────────────────────────────────────────
-- 🟢 LAB 1: SELECT พื้นฐาน (ดูข้อมูล)
-- ─────────────────────────────────────────────
-- คำสั่ง SQL พื้นฐาน:
-- SELECT = เลือก Column ที่ต้องการ (* = ทั้งหมด)
-- FROM   = จาก Table ไหน
-- WHERE  = เงื่อนไขกรอง

-- LAB1-01: ดูลูกค้าทั้งหมด
-- Expected: 4 แถว
SELECT * FROM customers;

-- LAB1-02: ดูเฉพาะลูกค้าที่ status = 'active'
-- Expected: 3 แถว
SELECT id, name, email
FROM   customers
WHERE  status = 'active';

-- LAB1-03: ดูสินค้าที่ราคาน้อยกว่า 1000 บาท
-- Expected: 3 รายการ
SELECT name, price, stock
FROM   products
WHERE  price < 1000
ORDER BY price ASC;  -- เรียงราคาจากน้อยไปมาก

-- LAB1-04: ดู orders ที่ status = 'paid'
-- Expected: 2 รายการ
SELECT *
FROM   orders
WHERE  status = 'paid';

-- ─────────────────────────────────────────────
-- 🟡 LAB 2: JOIN ดึงข้อมูลจากหลาย Table
-- ─────────────────────────────────────────────
-- JOIN = เชื่อม Table เข้าหากันผ่าน Key
-- INNER JOIN = เฉพาะที่มีข้อมูลทั้ง 2 Table
-- LEFT JOIN  = เอาทุกแถวของ Table ซ้าย แม้ไม่มีใน Table ขวา

-- LAB2-01: ดู orders พร้อมชื่อลูกค้า
-- (เชื่อม orders + customers)
SELECT
    o.id        AS order_id,
    c.name      AS ชื่อลูกค้า,
    c.email,
    o.status    AS สถานะ,
    o.total     AS ยอดรวม
FROM   orders    o
JOIN   customers c ON o.customer_id = c.id
ORDER BY o.id;

-- LAB2-02: ดูรายการสินค้าในแต่ละ Order
-- (เชื่อม 3 Table: order_items + orders + products)
SELECT
    oi.order_id,
    p.name      AS ชื่อสินค้า,
    oi.qty      AS จำนวน,
    oi.price    AS ราคา,
    (oi.qty * oi.price) AS รวม
FROM   order_items oi
JOIN   products    p  ON oi.product_id = p.id
JOIN   orders      o  ON oi.order_id   = o.id
ORDER BY oi.order_id;

-- ─────────────────────────────────────────────
-- 🟠 LAB 3: Aggregate Functions (สรุปข้อมูล)
-- ─────────────────────────────────────────────
-- COUNT(*) = นับจำนวนแถว
-- SUM(col) = รวมค่า
-- AVG(col) = ค่าเฉลี่ย
-- MAX(col) = ค่าสูงสุด
-- MIN(col) = ค่าต่ำสุด

-- LAB3-01: นับ orders แต่ละประเภท status
SELECT
    status,
    COUNT(*) AS จำนวน
FROM   orders
GROUP BY status;

-- LAB3-02: ยอดซื้อรวมของแต่ละลูกค้า
SELECT
    c.name          AS ลูกค้า,
    COUNT(o.id)     AS จำนวน_orders,
    SUM(o.total)    AS ยอดรวมทั้งหมด
FROM   customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name
ORDER BY ยอดรวมทั้งหมด DESC;

-- ─────────────────────────────────────────────
-- 🔴 LAB 4: QA Validation Queries (สำคัญมาก!)
-- ─────────────────────────────────────────────
-- ใช้ตรวจสอบความถูกต้องของข้อมูลหลัง Deploy

-- CHECK 1: อีเมลซ้ำกันหรือไม่?
-- Expected: 0 แถว = ไม่มีอีเมลซ้ำ ✅
SELECT email, COUNT(*) AS จำนวน
FROM   customers
GROUP BY email
HAVING COUNT(*) > 1;

-- CHECK 2: มีสินค้าราคา 0 หรือน้อยกว่าหรือไม่?
-- Expected: 0 แถว = ราคาถูกต้องทั้งหมด ✅
SELECT name, price
FROM   products
WHERE  price <= 0;

-- CHECK 3: มี order ที่ไม่มีรายการสินค้า (Orphan Order) หรือไม่?
-- Expected: 0 แถว = ทุก order มีสินค้า ✅
SELECT o.id, o.status, o.total
FROM   orders     o
LEFT JOIN order_items oi ON o.id = oi.order_id
WHERE  oi.id IS NULL;

-- CHECK 4: ยอดรวมใน orders ตรงกับ sum จาก order_items หรือไม่?
-- นี่คือ Data Integrity Check สำคัญมาก!
SELECT
    o.id,
    o.total                         AS ยอดที่บันทึก,
    SUM(oi.qty * oi.price)          AS ยอดคำนวณจาก_items,
    ROUND(o.total - SUM(oi.qty * oi.price), 2) AS ผลต่าง
FROM   orders o
JOIN   order_items oi ON o.id = oi.order_id
GROUP BY o.id, o.total
HAVING ABS(ผลต่าง) > 0.01;
-- Expected: 0 แถว = ยอดถูกต้องทั้งหมด ✅

-- ════════════════════════════════════════════════
-- 🏆 QUIZ: ลองทำเอง!
-- ════════════════════════════════════════════════

-- QUIZ 1: หาสินค้าที่ stock = 0 (หมด Stock)
-- ✏️ เขียน Query ของคุณที่นี่:


-- QUIZ 2: หา Top 3 สินค้าที่ขายได้มากที่สุด (จาก order_items)
-- ✏️ เขียน Query ของคุณที่นี่:


-- QUIZ 3: ลูกค้าคนไหนยังไม่เคยสั่งซื้อสินค้า?
-- Hint: ใช้ LEFT JOIN + WHERE IS NULL
-- ✏️ เขียน Query ของคุณที่นี่:


-- ════════════════════════════════════════════════
-- เฉลย QUIZ (ซ่อนไว้ก่อน!)
-- ════════════════════════════════════════════════
/*
-- QUIZ 1 เฉลย:
SELECT name, stock FROM products WHERE stock = 0;

-- QUIZ 2 เฉลย:
SELECT p.name, SUM(oi.qty) AS total_sold
FROM   order_items oi
JOIN   products p ON oi.product_id = p.id
GROUP BY p.id, p.name
ORDER BY total_sold DESC
LIMIT 3;

-- QUIZ 3 เฉลย:
SELECT c.name, c.email
FROM   customers c
LEFT JOIN orders o ON c.id = o.customer_id
WHERE  o.id IS NULL;
*/
