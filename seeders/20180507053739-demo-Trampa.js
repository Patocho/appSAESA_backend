'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Trampas',null,{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Trampas', null, {});
  }
};
