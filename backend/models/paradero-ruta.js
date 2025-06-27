'use strict';

module.exports = (sequelize, DataTypes) => {
    const ParaderosRutas = sequelize.define('ParaderosRutas', {
        paraderoId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Paraderos',
            key: 'id'
        }
        },
        rutaId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
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
        timestamps: false // cámbialo a true si deseas registrar createdAt y updatedAt
    });

    return ParaderosRutas;
};
