const mongoose = require('mongoose')

const userModel = new mongoose.Schema({
    username: {
        type: String,
        required:true,
        unique: true
    },
    gmail: {
        type: String,
        required:true,
        unique: true
    },
    password: {
        type: String,
        required:true,
        unique: true
    },
    role:{
        type:String,
        required:true,
        enum:["admin", "user"]
    },
    cart:[
         {
                 productId:{
                    type: mongoose.Schema.Types.ObjectId,
                    
                 },
                 quantity:{
                    type:Number,
                    default: 0
                 },
                 
                
               }
    ], 
    kyc:{
        country: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        street: {
            type: String,
        }, 
        bio: {
            type: String,
        }
    }
},
{
    timestamps: true
}
)

module.exports = mongoose.model('user', userModel)