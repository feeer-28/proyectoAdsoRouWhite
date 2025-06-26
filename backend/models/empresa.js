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
    timestamps: false
  });

  Empresa.associate = (models) => {
    Empresa.hasMany(models.Ruta, { foreignKey: 'empresaId' });
  };

  return Empresa;
};
