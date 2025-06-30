const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async ({ correo, contrasena }) => {
  console.log("Recibido en login:", correo, contrasena);

  if (!correo || !contrasena) {
    throw new Error('Correo y contraseña son obligatorios');
  }

  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) throw new Error('Correo no registrado');

  const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!contrasenaValida) throw new Error('Contraseña incorrecta');

  // Generar token JWT
  const token = jwt.sign(
    {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol
    },
    process.env.JWT_SECRET || 'secreto123',
    { expiresIn: '2h' }
  );

  return {
    mensaje: `Login exitoso como ${usuario.rol}`,
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
};
exports.verificarToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
    return decoded; 
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};