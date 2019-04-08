'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users',[
    {
      email:"patricio@gmail.com",
      password:"$2a$10$5wEqAYn23mrMIZdVERBlt.jzS1XFT.QLDjDIOkJJ2ik8yzzyvAkrm",
      nombre: "Patricio Suazo",
createdAt: new Date(),
updatedAt: new Date()
    },
    {
      email:"joseluis@gmail.com",
      password:"$2a$10$5wEqAYn23mrMIZdVERBlt.jzS1XFT.QLDjDIOkJJ2ik8yzzyvAkrm",
      nombre: "Jose Luis Coronado",
createdAt: new Date(),
updatedAt: new Date()
    },
    ],{});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
