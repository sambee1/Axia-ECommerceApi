const express = require('express');
const mongoDbConnection = require('./db/mongoConnection');
const err = require('./middleware/errorHandler')
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter')
const cartRouter = require('./router/cartRouter')

const cookieParser = require('cookie-parser');
require('dotenv').config();


const app = express()
mongoDbConnection();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser(  ))

const port = process.env.PORT
app.use("/api", userRouter)
app.use("/api", productRouter)
app.use("/api", cartRouter)


app.use(err)
app.listen(port, ()=>console.log(`Listening on port ${port}`))