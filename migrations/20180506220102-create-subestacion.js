'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Subestacions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_se: {
        type: Sequelize.STRING
      },
      nombre_se: {
        type: Sequelize.STRING
      },
      zona_se: {
        type: Sequelize.STRING
      },
      lat_se: {
        type: Sequelize.FLOAT
      },
      long_se: {
        type: Sequelize.FLOAT
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
    return queryInterface.dropTable('Subestacions');
  }
};