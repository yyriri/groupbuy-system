CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    stock INTEGER
);

INSERT INTO products (name, stock)
VALUES
('第五人格亚克力立牌', 5);

INSERT INTO products (name, stock)
VALUES
('第五人格色纸', 12),
('第五人格徽章', 20);

UPDATE products
SET stock =
CASE
    WHEN id = 1 THEN 100
    WHEN id = 2 THEN 200
    WHEN id = 3 THEN 300
END;

UPDATE products SET name = '限定谷子A' WHERE id = 1;
UPDATE products SET name = '限定谷子B' WHERE id = 2;
UPDATE products SET name = '限定谷子C' WHERE id = 3;
