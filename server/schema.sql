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

CREATE TABLE IF NOT EXISTS tech_postavshik (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL
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

INSERT INTO tech_postavshik (company_name, contact_name, phone, city) VALUES
  ('ElectroHome', 'Ирина Волкова', '+7-905-111-22-33', 'Москва'),
  ('Tech Supply', 'Артем Орлов', '+7-905-444-55-66', 'Самара'),
  ('MegaParts', 'Елена Смирнова', '+7-905-777-88-99', 'Казань');

CREATE TABLE IF NOT EXISTS odezda_tovar (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  size TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS odezda_zakaz (
  id SERIAL PRIMARY KEY,
  customer_name TEXT NOT NULL,
  order_date DATE NOT NULL DEFAULT CURRENT_DATE,
  total_amount NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS odezda_klient (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  city TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS odezda_postavshik (
  id SERIAL PRIMARY KEY,
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL
);

INSERT INTO odezda_tovar (name, category, size, price, stock) VALUES
  ('Пальто Oversize', 'Верхняя одежда', 'M', 7990.00, 8),
  ('Футболка базовая', 'Футболки', 'L', 1290.00, 25),
  ('Джинсы прямые', 'Джинсы', '32', 4590.00, 12);

INSERT INTO odezda_zakaz (customer_name, order_date, total_amount, status) VALUES
  ('Мария Орлова', '2024-11-03', 9280.00, 'оформлен'),
  ('Артем Громов', '2024-11-07', 4590.00, 'собирается'),
  ('Елена Кузина', '2024-11-09', 1290.00, 'доставлен');

INSERT INTO odezda_klient (full_name, phone, email, city) VALUES
  ('Мария Орлова', '+7-901-111-22-33', 'm.orlova@mail.ru', 'Казань'),
  ('Артем Громов', '+7-901-444-55-66', 'gromov.a@mail.ru', 'Самара'),
  ('Елена Кузина', '+7-901-777-88-99', 'kuzina.e@mail.ru', 'Екатеринбург');

INSERT INTO odezda_postavshik (company_name, contact_name, phone, city) VALUES
  ('Fashion Line', 'Ирина Волкова', '+7-903-123-45-67', 'Москва'),
  ('Textile Pro', 'Павел Климов', '+7-903-222-33-44', 'Иваново'),
  ('Style Hub', 'Антон Зуев', '+7-903-555-66-77', 'Санкт-Петербург');
