'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRols',[
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      RolId : 1,
      UserId: 1,
    },
    {
      createdAt: new Date(),
      updatedAt: new Date(),
      RolId : 1,
      UserId: 2,
    },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRols', null, {});
  }
};
