'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('UserRols',[
    {
      RolId : 1,
      UserId: 1,
createdAt: new Date(),
updatedAt: new Date()

    },
    {
      RolId : 2,
      UserId: 1,
createdAt: new Date(),
updatedAt: new Date()

    },
    {
      RolId : 1,
      UserId: 2,
createdAt: new Date(),
updatedAt: new Date()

    },
    {
      RolId : 3,
      UserId: 2,
createdAt: new Date(),
updatedAt: new Date()

    },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('UserRols', null, {});
  }
};
