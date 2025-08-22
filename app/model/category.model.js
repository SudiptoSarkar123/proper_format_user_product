import mongoose from 'mongoose'


const ctegorySchem = new mongoose.Schema({
    name:{type:String,unique:true},
    isActive:{type:Boolean,default:false},
})


module.exports = mongoose.model("Category",ctegorySchem)