const productModel = require('../model/productModel')


// Only admin can create, update and delete a product

const createAProduct = async (req, res, next) => {
    const userRole = req.user.role
if(userRole == "admin"){
    try {
        const product = new productModel({...req.body})
    const createdProduct = await product.save()
        res.send(createdProduct).status(200)
} catch (error) {
        // next({status:404, message:"Create product failed"})
        console.log(error)
    }
}else{
    res.status(500).send({message: "user not authorized"})
}
    
    
}

const getAllProducts =async (req, res, next) => {
    try {
        const products = await productModel.find()
        res.status(200).json(products)
    } catch (error) {
       next({status:500, message:"something wrong somewhere"})
    }
}

const getOneProduct = async (req, res) => {
    try {
        const {id} = req.params
        const product = await productModel.findById(id)
        if(!product){
            return res.json({Message: "Product not found"}).status(404)
        }
        res.json(product).status(200)
    } catch (error) {
     next({status:404, message:"No product with such ID"})  
    }
}

const updateProduct = async (req, res, next) => {
    const userRole = req.user.role
if(userRole == "admin"){
    try {
        const updates = req.body
        const {id} = req.params
        const updateProduct = await productModel.findByIdAndUpdate(id, updates, {new:true, runValidators:true})
        if(!updateProduct) return next ({status:404, message:"No product with such ID"})
            res.status(200).json(updateProduct)
    } catch (error) {
       next({status:404, message:"No product with such ID"})
    }   
}else{
    res.status(403).send({message: "user not authorized"})
}
    
}

const deleteProduct = async (req, res) => {
    const {id} = req.params
    const userRole = req.user.role
if(userRole == "admin"){
    try{
        await productModel.findByIdAndDelete(id)
        res.status(200).json({mess:"Product deleted"})
    } catch (err){
        next({status:404, message:"No product to be deleted with such ID"})
    }
}else{
    res.status(500).send({message: "user not authorized"})
}
    
}


module.exports = {createAProduct, getAllProducts, getOneProduct, updateProduct, deleteProduct}