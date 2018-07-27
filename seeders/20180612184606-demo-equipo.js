'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Equipos',[
    {
      cod_eq: '100001',
      nombre_eq: '59bt1',
      ubic_tec_eq: 'TX-SE-016',
      SubestacionId:1,
  },
      {
      cod_eq: '100002',
      nombre_eq: '59bt2',
      ubic_tec_eq: 'TX-SE-016',
      SubestacionId:1,
  },
      {
      cod_eq: '100003',
      nombre_eq: '59bt3',
      ubic_tec_eq: 'TX-SE-016',
      SubestacionId:1,
  },
  ],{});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Equipos', null, {});
  }
};
