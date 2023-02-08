'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('hotels', [
      {
      nom_hotel: 'Laico',
      e_mail: 'Laico@Laico.tn',
      numero_telephone: '22222222',
      adresse: 'Tunis',
      nb_etoile: 4,
      prix_chambre_double: 140,
      prix_chambre_single: 250,
      prix_chambre_triple: 100,
      prix_chambre_quadruple: 240,
      prix_demi_pension: 70,
      prix_pension_complete: 90,
      prix_all_inclusive: 90,
      commision: 90,
      date_debut: new Date(),
      date_fin: new Date(),
      services_equipements: null,
      image_hotel: null,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_hotel: 'movenpick',
      e_mail: 'movenpick@movenpick.tn',
      numero_telephone: '11111111',
      adresse: 'Gammarth',
      nb_etoile: 5,
      prix_chambre_double: 200,
      prix_chambre_single: 150,
      prix_chambre_triple: 290,
      prix_chambre_quadruple: 400,
      prix_demi_pension: 80,
      prix_pension_complete: 95,
      prix_all_inclusive: 120,
      commision: 0,
      date_debut: new Date(),
      date_fin: new Date(),
      services_equipements: null,
      image_hotel: null,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_hotel: 'mouradi',
      e_mail: 'mouradi@mouradi.tn',
      numero_telephone: '33333333',
      adresse: 'Hammamet',
      nb_etoile: 4,
      prix_chambre_double: 240,
      prix_chambre_single: 150,
      prix_chambre_triple: 200,
      prix_chambre_quadruple: 320,
      prix_demi_pension: 70,
      prix_pension_complete: 90,
      prix_all_inclusive: 90,
      commision: 90,
      date_debut: new Date(),
      date_fin: new Date(),
      services_equipements: null,
      image_hotel: null,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      nom_hotel: 'Sheraton ',
      e_mail: 'sheraton@sheraton.tn',
      numero_telephone: '55555555',
      adresse: 'Tunis',
      nb_etoile: 5,
      prix_chambre_double: 140,
      prix_chambre_single: 250,
      prix_chambre_triple: 100,
      prix_chambre_quadruple: 240,
      prix_demi_pension: 70,
      prix_pension_complete: 90,
      prix_all_inclusive: 90,
      commision: 90,
      date_debut: new Date(),
      date_fin: new Date(),
      services_equipements: null,
      image_hotel: null,
      createdAt: new Date(),
      updatedAt: new Date()
      },
    ]);
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
