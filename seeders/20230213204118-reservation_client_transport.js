'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 

    await queryInterface.bulkInsert('reservation_client_transports', [
      {
        clientId: 1,
        reservationTarnsportId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: 2,
        reservationTarnsportId:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: 3,
        reservationTarnsportId:2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: 4,
        reservationTarnsportId:3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reservation_client_transports', null, {});
  }
};
