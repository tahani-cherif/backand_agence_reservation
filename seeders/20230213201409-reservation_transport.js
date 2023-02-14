'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return queryInterface.bulkInsert('reservation_tarnsports', [
      {
      type : 'bus',
      id_transport:4 ,
      nb_place:25,
      monatnt_total:1500,
      solde:250,
      credit:350,
      date_debut: new Date(),
      date_fin: new Date(),
      userId: 4,
      reservationClientTransportId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      type : 'avion',
      id_transport:3,
      nb_place:50,
      monatnt_total:2500,
      solde:200,
      credit:350,
      date_debut: new Date(),
      date_fin: new Date(),
      userId: 2,
      reservationClientTransportId:2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      type : 'bus',
      id_transport:3,
      nb_place:50,
      monatnt_total:1400,
      solde:150,
      credit:250,
      date_debut: new Date(),
      date_fin: new Date(),
      userId: 1,
      reservationClientTransportId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      type : 'avion',
      id_transport:6,
      nb_place:75,
      monatnt_total:1700,
      solde:200,
      credit:340,
      date_debut: new Date(),
      date_fin: new Date(),
      userId: 3,
      reservationClientTransportId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      

],{returning: true});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('reservation_tarnsports', null, {});
  }
};
