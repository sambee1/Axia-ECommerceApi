const userModel = require("../model/userModel")

/*The userModel comes with an empty array for cart.
Each add-to-cart button click pushes the productId and quantity into the array using the updateCart function
*/
const updateCart = async (req, res, next) => {
  

    const paramId = req.params.id
    const {quantity} = req.body
    const user = req.user.id
    const cart = req.user.cart
   try{
    const updateCart = await userModel.findByIdAndUpdate(user, {
        $push:{
            cart: [{productId:paramId, quantity:quantity}]        },
    }, {new:true, runValidators:true} )
    res.status(200).json(updateCart)
   }catch(error){
     next({status:404, message:"No cart with such ID"})
   }
}


const getCart = async (req, res) => {
   try {
    const user = req.user.id
    const cart = await userModel.findById(user)
    if(!cart){
        return res.json({Message: "No item in Cart"}).status(404)
    }
    res.json(cart.cart)
   } catch (error) {
    console.log(error)
   }
}

// delete one item from the cart
const deleteCartItem = async (req, res) => {
    const paramId = req.params.id
    const user = req.user.id
    console.log(paramId)
    try{
        const updateCart = await userModel.findByIdAndUpdate({_id:user}, {
            $pull:{
                cart:{_id:paramId}
            }
        })
        res.json(updateCart.cart).status(200)
    }catch(error){
        console.log(error        )
    }
}



const deleteCompleteCart = async (req, res, next) => {
    const user = req.user.id
    try{
        const updateCart = await userModel.findByIdAndUpdate({_id:user}, {
            $set:{
                cart: []        },
        } )
        res.status(200).json(updateCart.cart)
    } catch (err){
        next({status:404, message:"Error deleting cart"})
    }
    
}
module.exports = {getCart,  updateCart, deleteCompleteCart, deleteCartItem}