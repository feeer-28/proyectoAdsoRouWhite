'use strict';

module.exports = (sequelize, DataTypes) => {
  const ParaderosRutas = sequelize.define('ParaderosRutas', {
    paraderoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Paraderos',
        key: 'id'
      }
    },
    rutaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Rutas',
        key: 'id'
      }
    },
    tipo: {
      type: DataTypes.ENUM('ida', 'retorno'),
      allowNull: false
    },
    orden: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'ParaderosRutas',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['paraderoId', 'rutaId', 'tipo'] // 🔐 Clave única incluye tipo
      }
    ]
  });

  return ParaderosRutas;
};
