const mongoose = require('mongoose')

// const cartProduct = new mongoose.Schema({
//  product:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "product",
//     required: true 
//  },
//  quantity:{
//     type:Number,
//     required: true,
//     default: 0
//  },
//  price:{
//     type:Number,
//     required: true,
//  },
//  image:{
//     type:String,
//     required:true,
//  }


// })




const cartModel = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true 
    },
    product: [
       {
         productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
         },
         quantity:{
            type:Number,
            default: 0
         },
         
        
       }
    ],
    
},
{timestamps:true}
)

module.exports = mongoose.model("cart", cartModel)