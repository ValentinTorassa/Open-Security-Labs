-- Usuarios de juguete: nombres, mails y planes inventados.
CREATE TABLE users (id INTEGER PRIMARY KEY, email TEXT NOT NULL UNIQUE, plan TEXT NOT NULL);
INSERT INTO users (email, plan) VALUES
  ('ana@example.com', 'free'),
  ('bruno@example.com', 'pro'),
  ('carla@example.com', 'free'),
  ('dario@example.com', 'admin'),
  ('elena@example.com', 'pro');
