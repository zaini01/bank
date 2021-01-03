const {Customer,Account} = require('../models/index')
const {Op }= require("sequelize")
const helper = require("../helper/helper")

class Controller{
    static listCustomer(req,res){
        Customer.findAll({order: [['fullName', 'ASC']]})
        .then(data=>{
            res.render('customer/list',{data})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static customerRegisterForm(req,res){
        let errors
        if (req.query.msg) {
            errors = req.query.msg.split(',')
        }

        res.render('customer/register',{errors})
    }

    static customerRegister(req,res){
        let customer = {
            identityNumber : req.body.identityNumber,
            fullName : req.body.fullName,
            address : req.body.address,
            birthDate : req.body.birthDate,
            gender : req.body.gender
        }

        Customer.create(customer)
        .then(()=>{
            res.redirect('/customers')
        })
        .catch(err=>{
            let errors = []
            err.errors.forEach(e=>{
                errors.push(e.message)
            })
            res.redirect(`/customers/register?msg=${errors}`)
        })
    }

    static editProfileForm(req,res){
        let errors
        if (req.query.msg) {
            errors = req.query.msg.split(',')
        }
        Customer.findOne({where: {id: req.params.idCustomer}})
        .then(data=>{
            let birthDate = data.birthDate.toISOString().split('T',1)
            let customer = {
                id : data.id,
                identityNumber : data.identityNumber,
                fullName : data.fullName,
                address : data.address,
                birthDate : birthDate,
                gender : data.gender
            }
            res.render('customer/editProfile',{customer,errors})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static editProfile(req,res){
        let id = req.params.idCustomer
        let customer = {
            id: id,
            identityNumber : req.body.identityNumber,
            fullName : req.body.fullName,
            address : req.body.address,
            birthDate : req.body.birthDate,
            gender : req.body.gender
        }

        Customer.update(customer,{where:{id:id}})
        .then(()=>{
            res.redirect('/customers')
        })
        .catch(err=>{
            let errors = []
            err.errors.forEach(e=>{
                errors.push(e.message)
            })
            res.redirect(`/customers/${id}/editProfile?msg=${errors}`)
        })
    }

    static customerAccountsForm(req,res){
        let errors
        if (req.query.msg) {
            errors = req.query.msg.split(',')
        }
        let id = req.params.idCustomer
        Customer.findOne({include:Account,where: {id: id}})
        .then(data=>{
            res.render('account/accounts',{data,errors})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static addAccount(req,res){
        let account = {
            type: req.body.type,
            balance: req.body.balance,
            CustomerId: req.params.idCustomer
        }

        Account.create(account)
        .then(()=>{
            res.redirect(`/customers/${account.CustomerId}/accounts`)
        })
        .catch(err=>{
            let errors = []
            err.errors.forEach(e=>{
                errors.push(e.message)
            })
            res.redirect(`/customers/${account.CustomerId}/accounts?msg=${errors}`)
        })
    }

    static transferForm(req,res){
        let error
        if (req.query.msg) {
            error = req.query.msg
        }
        let data
        let id = req.params.idAccount
        Account.findAll({where: {id : id}})
        .then(account=>{
            data = account[0]
            return Account.findAll({where:{[Op.not]:{id:id}},include:Customer})
        })
        .then(accounts=>{
            res.render('account/transfer',{data,accounts,error})
        })
        .catch(err=>{
            res.send(err)
        })
    }

    static transfer(req,res){
        helper.validate(Account,req,res)
    }
}

module.exports = Controller