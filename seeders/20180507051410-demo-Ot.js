'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Ots',[
    {
      numero_ot: 1001,
      fecha_ot: '2018-04-15 15:19:06',
      trabajo: 'Control de Plagas',
      SubestacionId: 1,
createdAt: new Date(),
updatedAt: new Date()

    },
    {
      numero_ot: 1003,
      fecha_ot: '2018-04-15 15:19:06',
      trabajo: 'Termografia',
      SubestacionId: 3,
createdAt: new Date(),
updatedAt: new Date()

    },

    ],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Ots', null, {});
  }
};
