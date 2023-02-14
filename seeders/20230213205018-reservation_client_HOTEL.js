'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('reservation_client_hotels', [
    {
      montant_total:250,
      clientId :1,
      reservationHotelId:1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      montant_total:350,
      clientId :2,
      reservationHotelId:3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      montant_total:400,
      clientId :3,
      reservationHotelId:4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      montant_total:350,
      clientId :4,
      reservationHotelId:2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reservation_client_hotels', null, {});
  }
};
