'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.bulkInsert('clients', [
     {
      full_name:'client 1',
      e_mail:'client1@gmail.com',
      cin:15054632,
      numero_telephone:22222222,
      date_naissance: new Date(),
      chambreId: 2,
      userId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      full_name:'client 2',
      e_mail:'client2@gmail.com',
      cin:21356498,
      numero_telephone:21354698,
      date_naissance: new Date(),
      chambreId: 1,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      full_name:'client 3',
      e_mail:'client3@gmail.com',
      cin:65478932,
      numero_telephone:78954623,
      date_naissance: new Date(),
      chambreId: 4,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      {
      full_name:'client 4',
      e_mail:'client4@gmail.com',
      cin:78956213,
      numero_telephone:54789213,
      date_naissance: new Date(),
      chambreId: 3,
      userId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
      },
      ], {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('clients', null, {});
  }
};
