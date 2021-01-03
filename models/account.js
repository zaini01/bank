'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Customer)
    }
  };
  Account.init({
    type: DataTypes.STRING,
    balance:  {type: DataTypes.FLOAT,
      validate: {
        // min: {
        //   args:[500000],
        //   msg:"Minimum balance for new Accout: Rp500.000"
        // }
      }
    },
    accountNumber: DataTypes.STRING,
    CustomerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Account',
    validate:{
      validates(next){
        if (this.id == null) {
          let random = ''+((Math.floor((Math.random() + Math.floor(Math.random() * 9) + 1) * Math.floor(1000000000))))
          Account.findOne({where: {accountNumber: random}})
          .then(number => {
              if (number) {
                return isUnique(next)
              } else {
                if (this.balance == '') {this.balance = 500000}
                if (+this.balance < 500000) {
                  return next("Minimum balance for new Accout: Rp500.000");
                } else {
                  this.accountNumber = random
                  return next();
                }
              }
          })
          .catch(err => {
              return next(err);
          });
        }else{
          return next();
        }
      }
    },
    hooks:{
      afterFind:(model)=>{
        if (model && model.constructor == Array) {
          model.forEach(e=>{
            e.balance = e.balance.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})
          })
        }
      }
    }
  });
  return Account;
};