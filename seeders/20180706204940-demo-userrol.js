'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRols',[
    {
      RolId : 1,
      UserId: 1,
    },
    {
      RolId : 2,
      UserId: 1,
    },
    {
      RolId : 1,
      UserId: 2,
    },
    {
      RolId : 3,
      UserId: 2,
    },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRols', null, {});
  }
};
