CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    stock INTEGER
);

UPDATE products SET name = '限定谷子A' WHERE id = 1;
UPDATE products SET name = '限定谷子B' WHERE id = 2;
UPDATE products SET name = '限定谷子C' WHERE id = 3;
