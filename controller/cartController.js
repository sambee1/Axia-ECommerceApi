const cartModel = require("../model/cartModel")

const createCart = async (req, res) => {

const paramId = req.params.id
const tokenId = req.user.id
const {quantity} = req.body
userCart = cartModel.findOne(paramId)
    if(!userCart){
        try {
    const cart = new cartModel({
        user: tokenId,
        product:[{productId:paramId, quantity:quantity}]}
        )
    const savedCart = await cart.save()
    res.send(savedCart).status(200)
} catch (error) {
    console.log(error) 

}

    
}else{
    cartModel.insertOne({})
}
}



const getCart = async (req, res) => {
    try {
        const {id} = req.params
        const cart = await cartModel.findById(id)
        if(!cart){
            return res.json({Message: "Cart not found"}).status(404)
        }
        res.json(cart).status(200)
    } catch (error) {
     next({status:404, message:"No cart with such ID"})  
    }
}

const updateCart = async (req, res, next) => {
    try {
        const updates = req.body
        const {id} = req.params
        const updateCart = await cartModel.findByIdAndUpdate(id, updates, {new:true, runValidators:true})
        if(!updateCart) return next ({status:404, message:"No cart with such ID"})
            res.status(200).json(updateCart)
    } catch (error) {
       next({status:404, message:"No cart with such ID"})
    }   
}

const deleteCart = async (req, res) => {
    const {id} = req.params
    try{
        await cartModel.findByIdAndDelete(id)
        res.status(200).json({mess:"Cart deleted"})
    } catch (err){
        next({status:404, message:"No cart to be deleted with such ID"})
    }
    
}
module.exports = {createCart, getCart,  updateCart, deleteCart}