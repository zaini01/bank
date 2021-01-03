const routs = require('express').Router()
const controller = require('../controllers/controller')

routs.get('/',(req,res)=>{
    res.render('home')
})

routs.get('/customers',controller.listCustomer)

routs.get('/customers/register',controller.customerRegisterForm)
routs.post('/customers/register',controller.customerRegister)

routs.get('/customers/:idCustomer/editProfile',controller.editProfileForm)
routs.post('/customers/:idCustomer/editProfile',controller.editProfile)

routs.get('/customers/:idCustomer/accounts',controller.customerAccountsForm)
routs.post('/customers/:idCustomer/accounts',controller.addAccount)

routs.get('/customers/:idCustomer/accounts/:idAccount/transfer',controller.transferForm)
routs.post('/customers/:idCustomer/accounts/:idAccount/transfer',controller.transfer)

module.exports = routs