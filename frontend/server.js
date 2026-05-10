const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 80;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Conexión a MariaDB
const db = mysql.createPool({
  host: 'mariadb',        // nombre del servicio en docker-compose
  user: 'acme_user',
  password: 'acme_pass',
  database: 'acme_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ─── RUTAS API REST ───────────────────────────────────────────

// GET - Obtener todos los productos
app.get('/api/productos', (req, res) => {
  db.query('SELECT * FROM productos ORDER BY fecha_ingreso DESC', (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ error: 'Error al obtener productos' });
    }
    res.json(results);
  });
});

// POST - Agregar nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, descripcion, categoria, precio, stock } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
  }

  const query = 'INSERT INTO productos (nombre, descripcion, categoria, precio, stock) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nombre, descripcion, categoria, precio, stock || 0], (err, result) => {
    if (err) {
      console.error('Error al insertar producto:', err);
      return res.status(500).json({ error: 'Error al insertar producto' });
    }
    res.status(201).json({ mensaje: 'Producto agregado correctamente', id: result.insertId });
  });
});

// DELETE - Eliminar producto por ID
app.delete('/api/productos/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM productos WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar producto' });
    }
    res.json({ mensaje: 'Producto eliminado correctamente' });
  });
});

// ─── INICIO DEL SERVIDOR ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Servidor ERP ACME corriendo en puerto ${PORT}`);
});
