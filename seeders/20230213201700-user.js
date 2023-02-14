'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
const salt = bcrypt.genSaltSync(10)
const mdpCrypt = bcrypt.hashSync('123456789', salt)

return queryInterface.bulkInsert('users', [
      {
      code_agence:'code agence 1',
      nom_agence:'agence 1',
      e_mail:'agence1@gmail.com',
      password:mdpCrypt,
      numero_telephone:97865432,
      adresse:'tunis nahej becha',
      cp_agence : '6548',
      solde: 2000,
      credit: 0,
      commition_hotel: 10,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      code_agence:'code agence 2',
      nom_agence:'agence 2',
      e_mail:'agence2@gmail.com',
      password:mdpCrypt,
      numero_telephone:32165498,
      adresse:'tunis ct',
      cp_agence : '8579',
      solde: 20000,
      credit: 0,
      commition_hotel: 50,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      code_agence:'code agence 3',
      nom_agence:'agence 3',
      e_mail:'agence3@gmail.com',
      password:mdpCrypt,
      numero_telephone:56789213,
      adresse:'sfax ct',
      cp_agence : '8965',
      solde: 15000,
      credit: 0,
      commition_hotel: 30,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      code_agence:'code agence 4',
      nom_agence:'agence 4',
      e_mail:'agence4@gmail.com',
      password:mdpCrypt,
      numero_telephone:56789213,
      adresse:'sousse ct',
      cp_agence : '7865',
      solde: 15000,
      credit: 0,
      commition_hotel: 15,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      
]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
