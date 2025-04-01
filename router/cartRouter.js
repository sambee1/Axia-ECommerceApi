const {Router} = require('express')
const authMiddleware = require('../middleware/tokenMiddleware')
const { getCart, createCart, deleteCart, updateCart } = require('../controller/cartController')


const router = Router()

.post('/cart/:id', authMiddleware, createCart)
.get('/cart', authMiddleware, getCart)
.delete('/cart/:id', authMiddleware, deleteCart)
.put('/cart/:id', authMiddleware, updateCart)


module.exports = router