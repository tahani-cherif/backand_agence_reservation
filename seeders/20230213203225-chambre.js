'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('chambres', [
      {
        type: "type 1",
        nb_place: 20,
        montant: 200,
        hotelId : 1,
        date_debut: new Date(),
        date_fin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "type 2",
        nb_place: 15,
        montant: 100,
        hotelId : 2,
        date_debut: new Date(),
        date_fin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "type 3",
        nb_place: 10,
        montant: 85,
        hotelId : 3,
        date_debut: new Date(),
        date_fin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "type 4",
        nb_place: 25,
        montant: 140,
        hotelId : 4,
        date_debut: new Date(),
        date_fin: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('chambres', null, {});
  }
};
