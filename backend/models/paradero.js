'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Paradero extends Model {
    static associate(models) {
      // asociaciones futuras
    }
  }
  Paradero.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre no puede estar vacío.' },
        len: {
          args: [3, 100],
          msg: 'El nombre debe tener entre 3 y 100 caracteres.'
        }
      }
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: 'La latitud debe ser un número válido.' },
        min: -90,
        max: 90
      }
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: { msg: 'La longitud debe ser un número válido.' },
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

