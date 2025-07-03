const { Usuario, Rol } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async ({ correo, contrasena }) => {
  if (!correo || !contrasena) {
    throw new Error('Correo y contraseña son obligatorios');
  }

  const usuario = await Usuario.findOne({
    where: { correo },
    include: [{ model: Rol, as: 'rol', attributes: ['nombre'] }]
  });

  if (!usuario) throw new Error('Correo no registrado');

  const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  if (!contrasenaValida) throw new Error('Contraseña incorrecta');

  const token = jwt.sign(
    {
      id: usuario.id,
      correo: usuario.correo,
      rol: usuario.rol.nombre // nombre del rol
    },
    process.env.JWT_SECRET || 'secreto123',
    { expiresIn: '2h' }
  );

  return {
    mensaje: `Login exitoso como ${usuario.rol.nombre}`,
    token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol.nombre
    }
  };
};

exports.verificarToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};
