'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Subestacions',[
    {
      cod_se:"GS-TX-T-SE-018",
      nombre_se:"S/E BARRO BLANCO",
createdAt: new Date(),
updatedAt: new Date()
    },
    {
      cod_se:"GS-TX-T-SE-019",
      nombre_se:"S/E PILAUCO",
createdAt: new Date(),
updatedAt: new Date()

    },
    {
      cod_se:"GS-TX-T-SE-021",
      nombre_se:"S/E PICHIL",
createdAt: new Date(),
updatedAt: new Date()

    },
    {
      cod_se:"GS-TX-T-SE-022",
      nombre_se:"S/E OSORNO",
createdAt: new Date(),
updatedAt: new Date()

    },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Subestacions', null, {});
  }
};

