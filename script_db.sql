-- Database: DB_Ziro

-- DROP DATABASE IF EXISTS "DB_Ziro";

CREATE DATABASE "DB_Ziro"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Portuguese_Brazil.1252'
    LC_CTYPE = 'Portuguese_Brazil.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

	-- =========================
-- USERS
-- =========================

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- CATEGORIES
-- =========================

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    parent_id INT REFERENCES categories(id)
);

-- =========================
-- BRANDS
-- =========================

CREATE TABLE brands (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    logo TEXT
);

-- =========================
-- PRODUCTS
-- =========================

CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    brand_id INT REFERENCES brands(id),
    category_id INT REFERENCES categories(id),
    description TEXT,
    price NUMERIC(12,2) NOT NULL,
    old_price NUMERIC(12,2),
    rating NUMERIC(2,1),
    review_count INT DEFAULT 0,
    badge VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- PRODUCT IMAGES
-- =========================

CREATE TABLE product_images (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    position INT DEFAULT 0
);

-- =========================
-- SPEC DEFINITIONS
-- =========================

CREATE TABLE spec_definitions (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- =========================
-- PRODUCT SPECS
-- =========================

CREATE TABLE product_specs (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    spec_id INT REFERENCES spec_definitions(id),
    value TEXT
);

-- =========================
-- POWER SPECS
-- =========================

CREATE TABLE power_specs (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    tdp INT
);

-- =========================
-- PRODUCT REVIEWS
-- =========================

CREATE TABLE product_reviews (
    id SERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id),
    user_id BIGINT REFERENCES users(id),
    rating INT CHECK (rating BETWEEN 1 AND 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- WISHLIST
-- =========================

CREATE TABLE wishlists (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE wishlist_items (
    id SERIAL PRIMARY KEY,
    wishlist_id INT REFERENCES wishlists(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id)
);

-- =========================
-- CART
-- =========================

CREATE TABLE carts (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE cart_items (
    id SERIAL PRIMARY KEY,
    cart_id INT REFERENCES carts(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id),
    quantity INT DEFAULT 1,
    price_snapshot NUMERIC(12,2)
);

-- =========================
-- ORDERS
-- =========================

CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    total_price NUMERIC(12,2),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id),
    quantity INT,
    price NUMERIC(12,2)
);

-- =========================
-- COMPONENT TYPES
-- =========================

CREATE TABLE component_types (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL
);

-- =========================
-- BUILDS (PC BUILDER)
-- =========================

CREATE TABLE builds (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    name TEXT,
    total_price NUMERIC(12,2),
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE build_items (
    id SERIAL PRIMARY KEY,
    build_id BIGINT REFERENCES builds(id) ON DELETE CASCADE,
    component_type_id INT REFERENCES component_types(id),
    product_id BIGINT REFERENCES products(id)
);

-- =========================
-- COMPATIBILITY RULES
-- =========================

CREATE TABLE compatibility_rules (
    id SERIAL PRIMARY KEY,
    component_a INT REFERENCES component_types(id),
    component_b INT REFERENCES component_types(id),
    spec_key TEXT,
    rule_type TEXT
);

-- =========================
-- TRADE-IN REQUESTS
-- =========================

CREATE TABLE tradein_requests (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    product_name TEXT,
    category TEXT,
    condition TEXT,
    description TEXT,
    estimated_value NUMERIC(12,2),
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- TRADE-IN HISTORY
-- =========================

CREATE TABLE tradein_history (
    id SERIAL PRIMARY KEY,
    tradein_id BIGINT REFERENCES tradein_requests(id),
    status TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =========================
-- USER CREDITS
-- =========================

CREATE TABLE user_credits (
    id SERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    amount NUMERIC(12,2),
    source TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- =====================================================
-- CONSTRAINTS
-- =====================================================

-- evitar duplicação de especificações por produto
ALTER TABLE product_specs
ADD CONSTRAINT unique_product_spec
UNIQUE(product_id, spec_id);


-- =====================================================
-- INDEXES DE PERFORMANCE
-- =====================================================

-- PRODUCTS

CREATE INDEX idx_products_category
ON products(category_id);

CREATE INDEX idx_products_brand
ON products(brand_id);

CREATE INDEX idx_products_price
ON products(price);


-- PRODUCT SPECS

CREATE INDEX idx_product_specs_product
ON product_specs(product_id);

CREATE INDEX idx_product_specs_spec
ON product_specs(spec_id);

CREATE INDEX idx_product_specs_value
ON product_specs(value);


-- BUILD ITEMS

CREATE INDEX idx_build_items_build
ON build_items(build_id);

CREATE INDEX idx_build_items_product
ON build_items(product_id);


-- CART

CREATE INDEX idx_cart_items_cart
ON cart_items(cart_id);

CREATE INDEX idx_cart_items_product
ON cart_items(product_id);


-- ORDERS

CREATE INDEX idx_orders_user
ON orders(user_id);

CREATE INDEX idx_order_items_order
ON order_items(order_id);


-- REVIEWS

CREATE INDEX idx_reviews_product
ON product_reviews(product_id);


-- =====================================================
-- VIEW CPU ↔ MOTHERBOARD COMPATIBILITY
-- =====================================================

CREATE VIEW cpu_motherboard_compatibility AS

SELECT
    cpu.id AS cpu_id,
    mb.id AS motherboard_id

FROM products cpu

JOIN product_specs cpu_socket
ON cpu.id = cpu_socket.product_id

JOIN spec_definitions s
ON cpu_socket.spec_id = s.id
AND s.name = 'socket'

JOIN product_specs mb_socket
ON mb_socket.value = cpu_socket.value

JOIN products mb
ON mb.id = mb_socket.product_id;


-- =====================================================
-- VIEW MOTHERBOARD ↔ RAM COMPATIBILITY
-- =====================================================

CREATE VIEW motherboard_ram_compatibility AS

SELECT
    mb.id AS motherboard_id,
    ram.id AS ram_id

FROM products mb

JOIN product_specs mb_ram
ON mb.id = mb_ram.product_id

JOIN spec_definitions s
ON mb_ram.spec_id = s.id
AND s.name = 'ram_type'

JOIN product_specs ram_type
ON ram_type.value = mb_ram.value

JOIN products ram
ON ram.id = ram_type.product_id;


-- =====================================================
-- MATERIALIZED VIEW – BUILD POWER USAGE
-- =====================================================

CREATE MATERIALIZED VIEW build_power_usage AS

SELECT
    b.id AS build_id,
    SUM(ps.tdp) AS total_tdp

FROM builds b

JOIN build_items bi
ON b.id = bi.build_id

JOIN power_specs ps
ON bi.product_id = ps.product_id

GROUP BY b.id;


-- índice para materialized view

CREATE INDEX idx_build_power_usage
ON build_power_usage(build_id);


-- =====================================================
-- VIEW PSU RECOMMENDATION
-- =====================================================

CREATE VIEW recommended_psu AS

SELECT
    b.build_id,
    p.id AS psu_id

FROM build_power_usage b

JOIN power_specs ps
ON ps.tdp >= b.total_tdp * 1.25

JOIN products p
ON p.id = ps.product_id;