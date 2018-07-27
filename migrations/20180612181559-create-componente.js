'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Componentes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_comp: {
        type: Sequelize.STRING
      },
      nombre_comp: {
        type: Sequelize.STRING
      },
      poloa_comp: {
        type: Sequelize.STRING
      },
      polob_comp: {
        type: Sequelize.STRING
      },
      poloc_comp: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Componentes');
  }
};