'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      //asociar
    }
  }

  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    correo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    contrasena: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            is: /^[0-9]+$/i ,// Validación solo numbers
            is: /^\d{10}$/ // validacion 10 numbers

        }
    },
    rol: {
      type: DataTypes.ENUM('administrador', 'despachador', 'conductor', 'usuario'),
      defaultValue: 'usuario',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios',
  });

  return Usuario;
};
