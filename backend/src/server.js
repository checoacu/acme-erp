const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/db');

const app = express();
app.use(cors());
app.use(express.json());

// Ruta de prueba de salud del servidor
app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'acme-erp-backend' });
});

// Ruta de prueba de conexión a la BD
app.get('/db-check', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    res.json({ db_time: result.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error conectando a la base de datos' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

//rutas nuevas
const authRoutes = require('./routes/authRoutes');
const verificarToken = require('./middleware/authMiddleware');

app.use('/auth', authRoutes);

// Ejemplo de ruta protegida (acceso condicional con token)
app.get('/erp/dashboard', verificarToken, (req, res) => {
  res.json({ mensaje: `Acceso concedido a ${req.usuario.email}`, data: 'Aquí irían los recursos del ERP' });
});
