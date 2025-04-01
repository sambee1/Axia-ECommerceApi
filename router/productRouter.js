const {Router} = require('express')
const authMiddleware = require('../middleware/tokenMiddleware')
const {createAProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct} = require('../controller/productController')

const router = Router()

router.post('/product', authMiddleware, createAProduct)
router.get('/products', getAllProducts)
router.get('/product/:id', getOneProduct )
router.put('/product/:id', authMiddleware, updateProduct)
router.delete('/product/:id', authMiddleware, deleteProduct)



module.exports = router