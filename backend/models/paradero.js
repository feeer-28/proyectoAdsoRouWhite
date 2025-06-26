'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Paradero extends Model {
    static associate(models) {
      // asociacion ruta-paradero
      Paradero.associate = models => {
        Paradero.belongsTo(models.Ruta,{
          through: models.ParaderoRuta,
          foreignKey: 'paraderoId',
        })
    }
  }}
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
    direccion: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La dirección no puede estar vacía.' },
        len: {
          args: [5, 200],
          msg: 'La dirección debe tener entre 5 y 200 caracteres.'
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

