'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Equipos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cod_eq: {
        type: Sequelize.STRING
      },
      nombre_eq: {
        type: Sequelize.STRING
      },
      ubic_tec_eq: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      posicion: {
        allowNull: false,
        type: Sequelize.STRING
      },
      tempmax: {
        allowNull: false,
        type: Sequelize.FLOAT
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Equipos');
  }
};