'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
       await queryInterface.bulkInsert('reservation_client_events', [
      {
        clientId: 1,
        reservationEvenementId :1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: 2,
        reservationEvenementId :1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: 3,
        reservationEvenementId :2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        clientId: 4,
        reservationEvenementId :3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reservation_client_events', null, {});
  }
};
