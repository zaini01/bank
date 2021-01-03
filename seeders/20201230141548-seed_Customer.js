'use strict';
const fs = require('fs')
module.exports = {
  up: (queryInterface, Sequelize) => {
    let customers = JSON.parse(fs.readFileSync('./customers.json','utf8'))
    customers.forEach(e=>{
      e.createdAt = new Date()
      e.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Customers', customers, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Customers', null, {});
  }
};
