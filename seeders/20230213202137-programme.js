'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('programmes', [
      {
      nom_programme:'programme 1',
      hotelId :1,
      busId :2,
      avionId :null,
      evenementId :2,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_programme:'programme 2',
      hotelId :2,
      busId :null,
      avionId :1,
      evenementId :1,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_programme:'programme 3',
      hotelId :3,
      busId :null,
      avionId :1,
      evenementId :3,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_programme:'programme 4',
      hotelId :4,
      busId :2,
      avionId :null,
      evenementId :3,
      date_debut: new Date(),
      date_fin: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
      },
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('programmes', null, {});
  }
};
