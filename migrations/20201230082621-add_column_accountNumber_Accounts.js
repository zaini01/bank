'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Accounts','accountNumber',{type: Sequelize.STRING})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Accounts', 'accountNumber', {});
  }
};
