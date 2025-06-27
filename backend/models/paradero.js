'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Paradero extends Model {
    static associate(models) {
      // Relación muchos a muchos con Ruta
      Paradero.belongsToMany(models.Ruta, {
        through: 'ParaderosRutas',
        foreignKey: 'paraderoId',
        otherKey: 'rutaId',
        as: 'rutas'
      });
    }
  }

  Paradero.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede estar vacío.' },
        len: [3, 100]
      }
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La dirección no puede estar vacía.' },
        len: [5, 200]
      }
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: -90,
        max: 90
      }
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true,
        min: -180,
        max: 180
      }
    }
  }, {
    sequelize,
    modelName: 'Paradero',
    tableName: 'Paraderos'
  });

  return Paradero;
};
