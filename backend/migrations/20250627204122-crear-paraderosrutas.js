'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ParaderosRutas', {
      paraderoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Paraderos',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      rutaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Rutas',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      tipo: {
        type: Sequelize.ENUM('ida', 'retorno'),
        allowNull: false
      },
      orden: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
        await queryInterface.addConstraint('ParaderosRutas', {
      fields: ['paraderoId', 'rutaId', 'tipo'],
      type: 'unique',
      name: 'unique_paradero_ruta_tipo'
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('ParaderosRutas');
  }
};
