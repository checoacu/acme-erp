CREATE DATABASE IF NOT EXISTS acme_db;
USE acme_db;

CREATE TABLE IF NOT EXISTS productos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50),
    precio DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO productos (nombre, descripcion, categoria, precio, stock) VALUES
('Martillo', 'Martillo de acero con mango de madera', 'Herramientas', 4990.00, 50),
('Tornillo 1/2"', 'Tornillo hexagonal galvanizado', 'Fijaciones', 90.00, 500),
('Llave Inglesa', 'Llave ajustable 12 pulgadas', 'Herramientas', 8990.00, 30),
('Pintura Blanca 1L', 'Pintura látex interior blanco', 'Pinturas', 5990.00, 100),
('Cinta Aislante', 'Cinta aislante negra 18mm', 'Electricidad', 1490.00, 200);
