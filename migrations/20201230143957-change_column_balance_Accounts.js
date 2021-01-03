'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Accounts', 'balance', {
      type: 'FLOAT USING CAST("balance" as FLOAT)'
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('Accounts', 'balance', {
      type: Sequelize.STRING
    });
  }
};
