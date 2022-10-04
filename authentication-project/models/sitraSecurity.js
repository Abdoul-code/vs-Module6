const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OfficerSchema = new Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        requird:true
    },
    status:{
        type:String,
        required:true
    },
    contact:Number,
    Email:String,
    user:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
})

module.exports = mongoose.model("Officer", OfficerSchema)