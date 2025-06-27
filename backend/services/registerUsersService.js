const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

function validarCorreo(correo) {
  return /^[a-zA-Z0-9._%+-]+@(gmail|hotmail|outlook)\.com$/.test(correo);
}
function validarIdentificacion(identificacion) {
  return /^[0-9]{6,15}$/.test(identificacion);
}

function validarContrasena(contrasena) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(contrasena);
}

function validartelefono(telefono) {
  return /^[0-9]{10}$/.test(telefono);
}

exports.registrarUsuario = async (data, rol) => {
  const { nombre, correo, contrasena, telefono, identificacion } = data;

  if (!nombre || !correo || !contrasena || !telefono || !identificacion) {
    throw new Error('Todos los campos son obligatorios');
  }

  if (!validarCorreo(correo)) {
    throw new Error('Correo inválido. Solo se aceptan gmail, hotmail u outlook');
  }

  if (!validarContrasena(contrasena)) {
    throw new Error('Contraseña débil. Debe tener una mayúscula, una minúscula, números y mínimo 8 caracteres');
  }

  if (!validartelefono(telefono)) {
    throw new Error('El número de telefono debe tener 10 dígitos. No se permiten letras ni caracteres especiales');
  }
  if (!validarIdentificacion(identificacion)) {
    throw new Error('La identificación debe tener entre 6 y 15 dígitos numéricos, no se permiten letras ni caracteres especiales');
  }

  const yaExiste = await Usuario.findOne({ where: { correo } });
  if (yaExiste) {
    throw new Error('Este correo ya está registrado');
  }
  console.log("Contraseña recibida para hashear:", contrasena);

  const contrasenaHash = await bcrypt.hash(contrasena, 10);

  await Usuario.create({
    nombre,
    correo,
    identificacion,
    contrasena: contrasenaHash,
    telefono,
    rol // se asigna automáticamente desde la ruta
  });

  return 'Usuario registrado exitosamente como ' + rol;
};
