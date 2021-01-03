'use strict';
const {
  Model, TableHints
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Customer.hasMany(models.Account)
    }
  };
  Customer.init({
    identityNumber: {type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Identity Number must be filled'
        },
        len: {
          args: [16,20],
          msg: "Identity Number minimum 16 characters and maximum 20 characters"
        }
      }
    },
    fullName: {type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Full Name must be filled'
        }
      }
    },
    address: DataTypes.STRING,
    birthDate: {type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Birth Date must be filled'
        }
      }
    },
    gender: DataTypes.STRING
  }, {
    hooks:{beforeCreate: (customer)=>{
      if (!customer.birthDate) {
        customer.birthDate = '2000-01-01'
      }
    },
    afterFind:(model)=>{
      if (model && model.Accounts) {
        model.Accounts.forEach(e=>{
          e.balance = e.balance.toLocaleString('en-ID', {style: 'currency', currency: 'IDR'})
        })
      }
    }
  },
    sequelize,
    validate:{
      isUnique(next){
        Customer.findOne({where: {identityNumber: this.identityNumber}})
        .then(number => {
          if (number) {
            if(number.id != this.id){
              return next("Duplicate Identity Number");
            } else {
              return next();
            }
          } else {return next();}
        })
        .catch(err => {
            return next(err);
        });
      }
    },
    modelName: 'Customer',
  });
  return Customer;
};