'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Trampas',[
    {
      codigo_trampa: '00001',
      SubestacionId: 1,
      tipo:'principal'
    },
    {
      codigo_trampa: '00002',
      SubestacionId: 1,
      tipo:'principal'
    },
    {
      codigo_trampa: '00002A',
      SubestacionId: 1,
      tipo:'suplementaria'
    },
    {
      codigo_trampa: '00003',
      SubestacionId: 1,
      tipo:'principal'
    },
    {
      codigo_trampa: '00004',
      SubestacionId: 1,
      tipo:'principal'
    },

    {
      codigo_trampa: '00005',
      SubestacionId: 2,
      tipo:'principal'
    },
    {
      codigo_trampa: '00006',
      SubestacionId: 2,
      tipo:'principal'
    },
    {
      codigo_trampa: '00006A',
      SubestacionId: 2,
      tipo:'suplementaria'
    },
    {
      codigo_trampa: '00007',
      SubestacionId: 2,
      tipo:'principal'
    },
    {
      codigo_trampa: '00008',
      SubestacionId: 2,
      tipo:'principal'
    },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Trampas', null, {});
  }
};
