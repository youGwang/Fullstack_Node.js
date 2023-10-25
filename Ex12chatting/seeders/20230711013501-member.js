'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
                                        //테이블이름
        await queryInterface.bulkInsert('member', [{
        id: 'test',
        pw: '123',
        nick: 'testnick'
      },{
        id : 'smart',
        pw: '1',
        nick : 'hihi'
      }], {});
    
  },

  async down (queryInterface, Sequelize) {
    // 전체 초기화
      await queryInterface.bulkDelete('member', null, {});
     
  }
};
