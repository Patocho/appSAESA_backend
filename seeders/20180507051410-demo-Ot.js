'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ots',[] ,{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Ots',[], {});
  }
};
