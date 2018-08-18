'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Rols',[
    {
      descripcion:"Administrador",
createdAt: new Date(),
updatedAt: new Date()
    },
    {
      descripcion:"Control de Plagas",
createdAt: new Date(),
updatedAt: new Date()
    },
    {
      descripcion:"Termografia",
createdAt: new Date(),
updatedAt: new Date()
    },

    ],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Rols', null, {});
  }
};

