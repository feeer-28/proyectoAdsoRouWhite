const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginConRol = async ({ correo, contrasena }, rolEsperado) => {
  console.log("Recibido en login:", correo, contrasena);

  if (!correo || !contrasena) {
    throw new Error('Correo y contrasena son obligatorios');
  }

  const usuario = await Usuario.findOne({ where: { correo } });
  if (!usuario) throw new Error('Correo no registrado');

  console.log("Hash guardado:", usuario.contrasena);

  if (usuario.rol !== rolEsperado) throw new Error('Rol incorrecto');

  const contrasenaValida = await bcrypt.compare(contrasena, usuario.contrasena);
  console.log("¿Contraseña válida?", contrasenaValida);
  
  console.log("Texto ingresado:", contrasena);
console.log("Hash en DB:", usuario.contrasena);
  if (!contrasenaValida) throw new Error('Contraseña incorrecta');

    // Generar token JWT
  const token = jwt.sign(
    { id: usuario.id, correo: usuario.correo, rol: usuario.rol },
    process.env.JWT_SECRET || 'secreto123',
    { expiresIn: '2h' }
  );
  return {
    mensaje: 'Login exitoso como ' + rolEsperado, token,
    usuario: {
      id: usuario.id,
      nombre: usuario.nombre,
      correo: usuario.correo,
      rol: usuario.rol
    }
  };
};
