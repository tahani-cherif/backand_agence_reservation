'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('evenements', [
      {
      nom_evenement: 'evenement 1',
      description: 'description evenement 1',
      nb_place: 50,
      nb_place_reserver: 5,
      prix_evenement : 150,
      date_debut: new Date(),
      date_fin: new Date(),
      image_evenement:null,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_evenement: 'evenement 2',
      description: 'description evenement 2',
      nb_place: 60,
      nb_place_reserver: 45,
      prix_evenement : 100,
      date_debut: new Date(),
      date_fin: new Date(),
      image_evenement:null,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_evenement: 'evenement 3',
      description: 'description evenement 3',
      nb_place: 55,
      nb_place_reserver: 45,
      prix_evenement : 190,
      date_debut: new Date(),
      date_fin: new Date(),
      image_evenement:null,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_evenement: 'evenement 4',
      description: 'description evenement 4',
      nb_place: 85,
      nb_place_reserver: 65,
      prix_evenement : 175.65,
      date_debut: new Date(),
      date_fin: new Date(),
      image_evenement:null,
      createdAt: new Date(),
      updatedAt: new Date()
      },

]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('evenements', null, {});
  }
};
