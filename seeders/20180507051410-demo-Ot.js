'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ots',null ,{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Ots',null, {});
  }
};
