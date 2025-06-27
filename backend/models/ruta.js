'use strict';

module.exports = (sequelize, DataTypes) => {
  const Ruta = sequelize.define('Ruta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    hora_inicio: {
      type: DataTypes.TIME,
      allowNull: false
    },
    hora_fin: {
      type: DataTypes.TIME,
      allowNull: false
    },
    vigente: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    empresaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Empresas',
        key: 'id'
      }
    }
  }, {
    tableName: 'Rutas',
    timestamps: false
  });

  Ruta.associate = (models) => {
    Ruta.belongsTo(models.Empresa, {
      foreignKey: 'empresaId',
      as: 'empresa'
    });

    Ruta.belongsToMany(models.Paradero, {
      through: 'ParaderosRutas',
      foreignKey: 'rutaId',
      otherKey: 'paraderoId',
      as: 'paraderos'
    });
  };

  return Ruta;
};
