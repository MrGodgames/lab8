-- Создать базу:
-- CREATE DATABASE lab8;
-- \c lab8

CREATE TABLE IF NOT EXISTS tech_tovar (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tech_zakaz (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS tech_sotrud (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  position TEXT NOT NULL,
  phone TEXT NOT NULL,
  hire_date DATE NOT NULL DEFAULT CURRENT_DATE
);

INSERT INTO tech_tovar (name, category, price, stock) VALUES
  ('Холодильник Atlant', 'Холодильники', 35990.00, 6),
  ('Стиральная машина LG', 'Стиральные машины', 41990.00, 3),
  ('Пылесос Xiaomi', 'Пылесосы', 9990.00, 12);

INSERT INTO tech_zakaz (customer_name, order_date, total_amount, status) VALUES
  ('Иван Петров', '2024-11-10', 45980.00, 'оформлен'),
  ('Анна Смирнова', '2024-11-12', 9990.00, 'доставлен'),
  ('Дмитрий Козлов', '2024-11-14', 35990.00, 'в пути');

INSERT INTO tech_sotrud (full_name, position, phone, hire_date) VALUES
  ('Сергей Иванов', 'менеджер', '+7-900-123-45-67', '2023-05-01'),
  ('Ольга Николаева', 'кассир', '+7-900-222-11-44', '2022-09-15'),
  ('Алексей Фомин', 'кладовщик', '+7-900-555-77-99', '2021-03-20');
