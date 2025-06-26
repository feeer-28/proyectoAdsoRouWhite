require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const rutaRouter = require('./routes/rutaRouter');
const usuarioRouter = require('./routes/usuarioRouter');
const registerRouter = require('./routes/registerRouter');
const paraderoRouter = require('./routes/paraderoRouter');

app.use(cors());
app.use(express.json());

app.use('/api/rutas', rutaRouter);
app.use('/api/usuarios', usuarioRouter);
app.use('/api/register', registerRouter);
app.use('/api/paraderos', paraderoRouter);

db.sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
