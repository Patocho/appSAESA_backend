'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Img_terms',null,{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Img_terms', null, {});
  }
};