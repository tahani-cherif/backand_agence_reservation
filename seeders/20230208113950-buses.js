'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('buses', [
      {
      matricule: '150 tun 2250',
      reference: '2',
      nb_place: 40,
      nb_place_reserver:0,
      prix_place:20,
      date_debut:new Date(),
      date_fin:new Date(),
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
      matricule: '200 tun 25',
      reference: '2',
      nb_place: 25,
      nb_place_reserver:15,
      prix_place:40,
      date_debut:new Date(),
      date_fin:new Date(),
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
      matricule: '100 tun 8752',
      reference: '4',
      nb_place: 50,
      nb_place_reserver:20,
      prix_place:30,
      date_debut:new Date(),
      date_fin:new Date(),
      createdAt:new Date(),
      updatedAt:new Date()
      },
      {
      matricule: '98 tun 6548',
      reference: '5',
      nb_place: 50,
      nb_place_reserver:35,
      prix_place:40,
      date_debut:new Date(),
      date_fin:new Date(),
      createdAt:new Date(),
      updatedAt:new Date()
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
