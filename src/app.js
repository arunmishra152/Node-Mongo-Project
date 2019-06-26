const express = require('express')
const app = express()
require('./db/mongoose')
const userrouter = require('./router/userrouter')
const orderrouter = require('./router/orderrouter')
const port = process.env.PORT || 3003

app.use(express.json())
app.use(userrouter)
app.use(orderrouter)

app.listen(port,()=>{
    console.log('server is listening on port '+ port)
})
