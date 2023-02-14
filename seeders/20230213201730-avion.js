'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('avions', [
      {
      nom_avion:'avion 1',
      reference:'reference avion 1',
      point_depart:'point_depart avion 1',
      point_arrive:'point_arrive avion 1',
      nb_place:70,
      nb_place_reserver:10,
      prix_place_simple:100,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_avion:'avion 2',
      reference:'reference avion 2',
      point_depart:'point_depart avion 2',
      point_arrive:'point_arrive avion 2',
      nb_place:95,
      nb_place_reserver:15,
      prix_place_simple:150,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_avion:'avion 3',
      reference:'reference avion 3',
      point_depart:'point_depart avion 3',
      point_arrive:'point_arrive avion 3',
      nb_place:150,
      nb_place_reserver:30,
      prix_place_simple:200,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_avion:'avion 4',
      reference:'reference avion 4',
      point_depart:'point_depart avion 4',
      point_arrive:'point_arrive avion 4',
      nb_place:100,
      nb_place_reserver:0,
      prix_place_simple:190,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      
]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('avions', null, {});
  }
};
