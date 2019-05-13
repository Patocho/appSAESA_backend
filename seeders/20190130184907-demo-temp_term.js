'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Temp_terms',null,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Temp_terms', null, {});
  }
};
