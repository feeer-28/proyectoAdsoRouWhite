const { Ruta, Empresa, ParaderosRutas, Paradero } = require('../models');
const { Op } = require('sequelize');

exports.crearRuta = async ({
  nombre,
  descripcion,
  hora_inicio,
  hora_fin,
  empresaId,
  ida = [],
  retorno = []
}) => {
  const errores = [];

  if (!nombre || !hora_inicio || !hora_fin || !empresaId) {
    errores.push('Todos los campos obligatorios deben ser llenados.');
  }

  if (nombre && nombre.trim().length < 3) {
    errores.push('El nombre debe tener al menos 3 caracteres.');
  }

  // Validar duplicado
  const existe = await Ruta.findOne({ where: { nombre, empresaId } });
  if (existe) {
    errores.push('Ya existe una ruta con ese nombre para esta empresa.');
  }

  if (errores.length > 0) {
    const error = new Error('Error de validación.');
    error.errores = errores;
    throw error;
  }

  // Crear la nueva ruta
  const nuevaRuta = await Ruta.create({
    nombre: nombre.trim(),
    descripcion: descripcion || '',
    hora_inicio,
    hora_fin,
    empresaId,
    vigente: true
  });

  console.log("Ruta creada con ID:", nuevaRuta.id);

  // Asignar paraderos de ida
  for (let i = 0; i < ida.length; i++) {
    await ParaderosRutas.create({
      rutaId: nuevaRuta.id,
      paraderoId: ida[i],
      tipo: 'ida',
      orden: i + 1
    });
  }

  // Asignar paraderos de retorno
for (let i = 0; i < retorno.length; i++) {
  try {
    await ParaderosRutas.create({
      rutaId: nuevaRuta.id,
      paraderoId: retorno[i],
      tipo: 'retorno',
      orden: i + 1
    });
  } catch (error) {
    console.error("Error al registrar paradero retorno:", retorno[i], error.message);
  }
}


  return nuevaRuta;
};

exports.listarRutas = async () => {
  const rutas = await Ruta.findAll({
    include: [
      {
        model: Empresa,
        as: 'empresa',
        attributes: ['id', 'nombre']
      },
      {
        model: Paradero,
        as: 'paraderos',
        attributes: ['id', 'nombre', 'direccion', 'latitud', 'longitud'],
        through: {
          attributes: ['tipo', 'orden']
        }
      }
    ],
    order: [['id', 'ASC']]
  });

  // 👇 Separar paraderos por tipo (ida / retorno)
  const rutasProcesadas = rutas.map(ruta => {
    const ida = [];
    const retorno = [];

    ruta.paraderos.forEach(paradero => {
      const tipo = paradero.ParaderosRutas.tipo;

      const datosParadero = {
        id: paradero.id,
        nombre: paradero.nombre,
        direccion: paradero.direccion,
        latitud: paradero.latitud,
        longitud: paradero.longitud,
        orden: paradero.ParaderosRutas.orden
      };

      if (tipo === 'ida') {
        ida.push(datosParadero);
      } else if (tipo === 'retorno') {
        retorno.push(datosParadero);
      }
    });

    // Ordenar por orden
    ida.sort((a, b) => a.orden - b.orden);
    retorno.sort((a, b) => a.orden - b.orden);

    return {
      id: ruta.id,
      nombre: ruta.nombre,
      descripcion: ruta.descripcion,
      hora_inicio: ruta.hora_inicio,
      hora_fin: ruta.hora_fin,
      vigente: ruta.vigente,
      empresa: ruta.empresa,
      paraderos: {
        ida,
        retorno
      }
    };
  });

  return rutasProcesadas;
};


exports.obtenerRutaPorId = async (rutaId) => {
  const ruta = await Ruta.findByPk(rutaId, {
    include: [
      {
        model: Empresa,
        as: 'empresa',
        attributes: ['id', 'nombre']
      },
      {
        model: ParaderosRutas,
        as: 'paraderosRutas',
        include: {
          model: Paradero,
          as: 'paradero',
          attributes: ['id', 'nombre', 'direccion', 'latitud', 'longitud']
        }
      }
    ]
  });

  if (!ruta) {
    throw new Error('Ruta no encontrada.');
  }

  return ruta;
};

exports.actualizarRuta = async (rutaId, datos) => {
  const ruta = await Ruta.findByPk(rutaId);
  if (!ruta) {
    throw new Error('Ruta no encontrada.');
  }

  const errores = [];

  if (!datos.nombre || !datos.hora_inicio || !datos.hora_fin || !datos.empresaId) {
    errores.push('Todos los campos obligatorios deben ser llenados.');
  }

  if (datos.nombre && datos.nombre.trim().length < 3) {
    errores.push('El nombre debe tener al menos 3 caracteres.');
  }

  // Validar duplicado
  const existe = await Ruta.findOne({
    where: {
      nombre: datos.nombre,
      empresaId: datos.empresaId,
      id: { [Op.ne]: rutaId }
    }
  });
  if (existe) {
    errores.push('Ya existe una ruta con ese nombre para esta empresa.');
  }

  if (errores.length > 0) {
    const error = new Error('Error de validación.');
    error.errores = errores;
    throw error;
  }

  // Actualizar la ruta
  ruta.nombre = datos.nombre.trim();
  ruta.descripcion = datos.descripcion || '';
  ruta.hora_inicio = datos.hora_inicio;
  ruta.hora_fin = datos.hora_fin;
  ruta.empresaId = datos.empresaId;

  await ruta.save();

  return ruta;
};
exports.eliminarRuta = async (rutaId) => {
  const ruta = await Ruta.findByPk(rutaId);
  if (!ruta) {
    throw new Error('Ruta no encontrada.');
  }

  // Eliminar la ruta
  await ruta.destroy();

  return { mensaje: 'Ruta eliminada exitosamente.' };
};