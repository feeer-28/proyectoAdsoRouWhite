'use strict';

module.exports = (sequelize, DataTypes) => {
  const Empresa = sequelize.define('Empresa', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'Empresas',
    modelName: 'Empresa',
    timestamps: false // Cámbialo a true si luego quieres guardar createdAt/updatedAt
  });

  Empresa.associate = (models) => {
    Empresa.hasMany(models.Ruta, { foreignKey: 'empresaId', as: 'rutas' });
  };

  return Empresa;
};
