'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('reservation_evenements', [
      {
      nb_place:25,
      monatnt_total:1500,
      solde:250,
      credit:350,
      date_debut: new Date(),
      date_fin: new Date(),
      evenementId: 1,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nb_place:50,
      monatnt_total:10000,
      solde:250,
      credit:350,
      date_debut: new Date(),
      date_fin: new Date(),
      evenementId: 2,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nb_place:50,
      monatnt_total:10000,
      solde:250,
      credit:350,
      date_debut: new Date(),
      date_fin: new Date(),
      evenementId: 2,
      userId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nb_place:50,
      monatnt_total:10000,
      solde:250,
      credit:350,
      date_debut: new Date(),
      date_fin: new Date(),
      evenementId: 1,
      userId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nb_place:65,
      monatnt_total:1500,
      solde:250,
      credit:350,
      date_debut: new Date(),
      date_fin: new Date(),
      evenementId: 3,
      userId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
      },
     
      

]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reservation_evenements', null, {});
  }
};
