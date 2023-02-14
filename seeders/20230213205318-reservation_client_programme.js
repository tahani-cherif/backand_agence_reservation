'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('People', [
      {
     
      montant_total:250,
      clientId:1,
      reservationTarnsportId:1,
      reservationEvenementId:1,
      reservationHotelId:1,
      programmeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
      {
     
      montant_total:700,
      clientId:2,
      reservationTarnsportId:2,
      reservationEvenementId:1,
      reservationHotelId:1,
      programmeId:1,
      createdAt: new Date(),
      updatedAt: new Date()
     },
      {
     
      montant_total:500,
      clientId:3,
      reservationTarnsportId:2,
      reservationEvenementId:2,
      reservationHotelId:2,
      programmeId:2,
      createdAt: new Date(),
      updatedAt: new Date()
     },
      {
     
      montant_total:340,
      clientId:4,
      reservationTarnsportId:1,
      reservationEvenementId:3,
      reservationHotelId:4,
      programmeId:2,
      createdAt: new Date(),
      updatedAt: new Date()
     },
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
