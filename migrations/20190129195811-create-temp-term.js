'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Temp_terms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      x1: {
        type: Sequelize.INTEGER
      },
      y1: {
        type: Sequelize.INTEGER
      },
      x2: {
        type: Sequelize.INTEGER
      },
      y2: {
        type: Sequelize.INTEGER
      },
      x3: {
        type: Sequelize.INTEGER
      },
      y3: {
        type: Sequelize.INTEGER
      },
      tem1: {
        type: Sequelize.FLOAT
      },
      tem2: {
        type: Sequelize.FLOAT
      },
      tem3: {
        type: Sequelize.FLOAT
      },
      delta12: {
        type: Sequelize.FLOAT
      },
      delta23: {
        type: Sequelize.FLOAT
      },
      delta31: {
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
    return queryInterface.dropTable('Temp_terms');
  }
};