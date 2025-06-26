const { Ruta, ParaderosRutas } = require('../models');

exports.crearRuta = async (datos) => {
  const { nombre, empresaId, paraderosIda, paraderosRetorno } = datos;

  // Crear la ruta
  const nuevaRuta = await Ruta.create({ nombre, empresaId });

  // Asociar paraderos de ida
  for (let i = 0; i < paraderosIda.length; i++) {
    await ParaderosRutas.create({
      rutaId: nuevaRuta.id,
      paraderoId: paraderosIda[i],
      tipo: 'ida',
      orden: i + 1
    });
  }

  // Asociar paraderos de retorno
  for (let i = 0; i < paraderosRetorno.length; i++) {
    await ParaderosRutas.create({
      rutaId: nuevaRuta.id,
      paraderoId: paraderosRetorno[i],
      tipo: 'retorno',
      orden: i + 1
    });
  }

  return nuevaRuta;
};
exports.listarRutas = async () => {
  const rutas = await Ruta.findAll({
    include: [{
      model: ParaderosRutas,
      as: 'paraderos',
      include: ['paradero']
    }]
  });
  return rutas;
};
