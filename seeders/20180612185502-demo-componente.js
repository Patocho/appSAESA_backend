'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Componentes',[
    {
      cod_comp: '11001',
      nombre_comp: 'entrada',
      poloa_comp: '3',
      polob_comp: '2',
      poloc_comp: '1',
      EquipoId:1
  },
   {
      cod_comp: '11002',
      nombre_comp: 'ssentrada',
      poloa_comp: '1',
      polob_comp: '2',
      poloc_comp: '3',
      EquipoId:1
  },

      {
      cod_comp: '12001',
      nombre_comp: 'entrada',
      poloa_comp: '3',
      polob_comp: '2',
      poloc_comp: '1',
      EquipoId:2
  },
   {
      cod_comp: '12002',
      nombre_comp: 'ssentrada',
      poloa_comp: '1',
      polob_comp: '2',
      poloc_comp: '3',
      EquipoId:2
  },

      {
      cod_comp: '13001',
      nombre_comp: 'entrada',
      poloa_comp: '3',
      polob_comp: '2',
      poloc_comp: '1',
      EquipoId:3
  },
   {
      cod_comp: '13002',
      nombre_comp: 'ssentrada',
      poloa_comp: '1',
      polob_comp: '2',
      poloc_comp: '3',
      EquipoId:3
  },
  ],{});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Componentes', null, {});

  }
};
