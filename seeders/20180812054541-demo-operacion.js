'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Operacions',null,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Operacions', null, {});
  }
};
