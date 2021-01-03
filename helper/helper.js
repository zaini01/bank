class Helper{
    static validate(Account,req,res){
        let idAccount = req.params.idAccount
        let idCustomer = req.params.idCustomer
        let amount = +req.body.amount
        let otherAccountId = req.body.otherAccountId
        let balance = ''
        let arr = req.body.balance.split('')
        for (let i = 4; i < arr.length; i++) {
            if (arr[i] != ',') {
                balance += arr[i]
            }
        }
        balance = +balance

        if (balance < amount) {
            let error = 'Insufficient balance'
            res.redirect(`/customers/${idCustomer}/accounts/${idAccount}/transfer?msg=${error}`)
        } else {
            if (otherAccountId) {
                Account.update({id:idAccount,balance:balance-amount},{where:{id:idAccount}})
                .then(()=>{
                    return Account.findOne({where:{id:otherAccountId}})
                })
                .then(data=>{
                    let otherAccountBalance = +data.balance
                    return Account.update({id:otherAccountId,balance:otherAccountBalance + amount},{where:{id:otherAccountId}})
                })
                .then(()=>{
                    res.redirect(`/customers/${idCustomer}/accounts`)
                })
                .catch(err=>{
                    res.send(err)
                })
            } else {
                let error = "There's no other account"
                res.redirect(`/customers/${idCustomer}/accounts/${idAccount}/transfer?msg=${error}`)
            }
        }
    }
}

module.exports = Helper