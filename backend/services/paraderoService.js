const { Paradero } = require('../models');
const { fn, col, where, Op } = require('sequelize');


exports.crearParadero = async ({ nombre,direccion, latitud, longitud }) => {
  const errores = [];

  // Validación campos vacíos
  if (!nombre || direccion === '' || latitud === '' || longitud === '') {
    errores.push('Todos los campos son obligatorios.');
  }

  // Conversión segura
  const lat = parseFloat(latitud);
  const lon = parseFloat(longitud);

  // Validación latitud
  if (isNaN(lat) || lat < -90 || lat > 90) {
    errores.push('La latitud debe ser un número válido entre -90 y 90.');
  }

  // Validación longitud
  if (isNaN(lon) || lon < -180 || lon > 180) {
    errores.push('La longitud debe ser un número válido entre -180 y 180.');
  }

  // Validación nombre
  const nombreTrim = nombre.trim();
  if (nombreTrim.length < 3 || nombreTrim.length > 100) {
    errores.push('El nombre debe tener entre 3 y 100 caracteres.');
  }
  const direccionTrim = direccion.trim();
  if (direccionTrim.length < 3 || direccionTrim.length > 100) {
    errores.push('La dirección debe tener entre 3 y 100 caracteres.');
  }
  const existeNombre = await Paradero.findOne({
    where: where(fn('LOWER', col('nombre')), nombreTrim.toLowerCase())
  });
  if (existeNombre) {
    errores.push('Ya existe un paradero con ese nombre.');
  }

  // Verificación de duplicado por coordenadas
  const existeUbicacion = await Paradero.findOne({
    where: {
      latitud: lat,
      longitud: lon
    }
  });
  if (existeUbicacion) {
    errores.push('Ya existe un paradero con esa latitud y longitud.');
  }

  // Si hay errores, lanzarlos
  if (errores.length > 0) {
    const error = new Error('Validación fallida.');
    error.errores = errores;
    throw error;
  }

  // Crear paradero si todo está bien
  try {
    const paradero = await Paradero.create({
      nombre: nombreTrim,
      direccion: direccionTrim,
      latitud: lat,
      longitud: lon
    });
    return paradero;
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      throw new Error(error.errors[0].message);
    }
    throw error;
  }
};


exports.listarParaderos = async () => {
  return await Paradero.findAll({ order: [['id', 'ASC']] });
};

exports.actualizarParadero = async (id, datos) => {
  const paradero = await Paradero.findByPk(id);
  if (!paradero) {
    throw new Error('Paradero no encontrado.');
  }

  // Validar campos vacíos
  if (!datos.nombre || !datos.direccion || !datos.latitud || !datos.longitud) {
    throw new Error('Todos los campos son obligatorios.');
  }

  // Conversión segura
  const lat = parseFloat(datos.latitud);
  const lon = parseFloat(datos.longitud);

  // Validación latitud
  if (isNaN(lat) || lat < -90 || lat > 90) {
    throw new Error('La latitud debe ser un número válido entre -90 y 90.');
  }

  // Validación longitud
  if (isNaN(lon) || lon < -180 || lon > 180) {
    throw new Error('La longitud debe ser un número válido entre -180 y 180.');
  }

  // Validación nombre
  const nombreTrim = datos.nombre.trim();
  if (nombreTrim.length < 3 || nombreTrim.length > 100) {
    throw new Error('El nombre debe tener entre 3 y 100 caracteres.');
  }
  
  const direccionTrim = datos.direccion.trim();
  if (direccionTrim.length < 3 || direccionTrim.length > 100) {
    throw new Error('La dirección debe tener entre 3 y 100 caracteres.');
  }

  // Verificar duplicado por nombre
  const existeNombre = await Paradero.findOne({
    where: {
      id: { [Op.ne]: id },
      nombre: nombreTrim
    }
  });
  
  if (existeNombre) {
    throw new Error('Ya existe un paradero con ese nombre.');
  }

  // Verificar duplicado por coordenadas
  const existeUbicacion = await Paradero.findOne({
    where: {
      id: { [Op.ne]: id },
      latitud: lat,
      longitud: lon
    }
  });
  
  if (existeUbicacion) {
    throw new Error('Ya existe un paradero con esa latitud y longitud.');
  }

  // Actualizar paradero
  paradero.nombre = nombreTrim;
  paradero.direccion = direccionTrim;
  paradero.latitud = lat;
  paradero.longitud = lon;

  await paradero.save();
  
  return paradero;
};  
exports.eliminarParadero = async (id) => {
  const paradero = await Paradero.findByPk(id);
  if (!paradero) {
    throw new Error('Paradero no encontrado.');
  }

  // Verificar si el paradero está asociado a alguna ruta
  const rutasAsociadas = await paradero.getRutas();
  if (rutasAsociadas.length > 0) {
    throw new Error('No se puede eliminar el paradero porque está asociado a una o más rutas.');
  }

  await paradero.destroy();
  return { mensaje: 'Paradero eliminado exitosamente.' };
}
