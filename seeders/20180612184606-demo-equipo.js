
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Equipos',null,{});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Equipos', null, {});
  }
};
