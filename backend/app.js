const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// conexión con SQLite
const db = new sqlite3.Database('./certificados.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Base de datos SQLite conectada');
  }
});

// Crear tabla para certificados
db.run(`CREATE TABLE IF NOT EXISTS certificados(
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  fecha DATE,
  archivo TEXT
)`);

// Endpoint para agregar certificados
app.post('/certificados', (req, res) => {
  const { nombre, fecha, archivo } = req.body;
  const sql = `INSERT INTO certificados(nombre, fecha, archivo) VALUES(?,?,?)`;

  db.run(sql, [nombre, fecha, archivo], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ id: this.lastID });
  });
});

// Endpoint para obtener certificados (datos desde DB)
app.get('/certificados', (req, res) => {
  db.all(`SELECT * FROM certificados`, [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Servir certificados estáticos desde la carpeta certificados
app.use('/archivos', express.static('certificados'));

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
