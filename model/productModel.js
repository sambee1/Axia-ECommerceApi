const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
    name:{
        type: String,
        required: true 
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    quantityLeft:{
        type: Number,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    
},
{timestamps:true}
)

module.exports = mongoose.model("product", productModel)