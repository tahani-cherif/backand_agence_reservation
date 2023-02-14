'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('reservations', [
    {
      montant_hotel:315,
      montant_transport :150,
      montant_evenement :200,
      montant_programme :400,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
    {
      montant_hotel:415,
      montant_transport :100,
      montant_evenement :190,
      montant_programme :550,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
    {
      montant_hotel:250,
      montant_transport :150,
      montant_evenement :120,
      montant_programme :420,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
    {
      montant_hotel:500,
      montant_transport :120,
      montant_evenement :350,
      montant_programme :700,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
     ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reservations', null, {});
  }
};
