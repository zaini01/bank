const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routs = require('./routs/index')

app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(routs)

app.listen(port,()=>{
    console.log('listen port ',port);
})