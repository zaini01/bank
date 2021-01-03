'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Customers', 'accountNumber', {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Customers','accountNumber',{type: Sequelize.STRING})
  }
};
