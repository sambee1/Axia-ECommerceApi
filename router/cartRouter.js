const {Router} = require('express')
const authMiddleware = require('../middleware/tokenMiddleware')
const { getCart, deleteCompleteCart, updateCart, deleteCartItem } = require('../controller/cartController')


const router = Router()

// .post('/cart/:id', authMiddleware, createCart)
.get('/cart', authMiddleware, getCart)
.delete('/cart/', authMiddleware, deleteCompleteCart)
.delete('/cart/:id', authMiddleware, deleteCartItem)
.put('/cart/:id', authMiddleware, updateCart)


module.exports = router