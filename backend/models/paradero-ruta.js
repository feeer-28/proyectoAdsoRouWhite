
module.exports = (sequelize, DataTypes) => {
    const ParaderosRutas = sequelize.define('ParaderosRutas', {
    tipo: {
        type: DataTypes.ENUM('ida', 'retorno'),
        allowNull: false
    },
        orden: {
        type: DataTypes.INTEGER,
        allowNull: false
        }
    });

    return ParaderosRutas;
};
